//当前关卡的刷怪信息
class LevelSpawnDatas {
    public LevelId: number;
    public MaxInScreenNum: number;              //最大同屏数量
    public RefreshInterval: number;             //刷新每个怪的时间
    public MonsterIDList: number[];             //所有会出现的怪物id
    public TotalMonsterCount: number;           //怪物总数
    public LevelSpawnData: LevelSpawnData[];    //每波数据
    public IsBossLevel: boolean = false;// 是否boss关卡
}
//特定波次包含的怪物信息
class LevelSpawnData {
    public Monsters: MonsterSpawnData[];        //当前波次总共需要刷出的怪物信息
    public Delay: number;//刷怪之前的延迟
    public SoundId: number = -1;
}
//单个需要刷出的怪物信息
class MonsterSpawnData {
    public MonsterId: number;       //怪物id
    public Level: number;           //怪物等级
    public PowerNum: number;        //能力数量
    // public PowerId: number[];       //能力id
    public PowerConfigs: SkillConfigConfigData[];//能力配置
    public SizeScale: Vec2;       //缩放大小
    public HulkComing: boolean = false;      //是否巨型怪
    public CanTriggerPropSpawn: boolean = false;//是否触发道具生成

    public Clone(): MonsterSpawnData {
        let clone = new MonsterSpawnData();
        clone.MonsterId = this.MonsterId;
        clone.Level = this.Level;
        clone.PowerNum = this.PowerNum;
        // clone.PowerId = []
        // for (let index = 0; index < this.PowerId.length; index++) {
        //     let element = this.PowerId[index];
        //     clone.PowerId.push(element)
        // }
        clone.PowerConfigs = []
        for (let index = 0; index < this.PowerConfigs.length; index++) {
            let element = this.PowerConfigs[index];
            clone.PowerConfigs.push(element)
        }
        clone.SizeScale = new Vec2(this.SizeScale.x, this.SizeScale.y);
        clone.HulkComing = this.HulkComing;
        clone.CanTriggerPropSpawn = this.CanTriggerPropSpawn;

        return clone;
    }
}

class MonsterSpawnCheckResult {
    public Result: EnumSpawnCheckResult;//当前是否能继续刷怪
    public Monsters: MonsterSpawnData[]//可以刷的怪信息
}

/*
* 刷怪逻辑
*/
class MonsterSpawnLogic {
    private static _instance: MonsterSpawnLogic;
    public static get Instance(): MonsterSpawnLogic {
        if (MonsterSpawnLogic._instance == null) {
            MonsterSpawnLogic._instance = new MonsterSpawnLogic();
        }
        return MonsterSpawnLogic._instance;
    }

    //检测是否能继续生产
    public CheckCanSpawn(): boolean {
        let levelInfo = GameDataManager.getInstance().LevelInfo;
        return !levelInfo.IsScreenFull()
    }

    //获取整个关卡的刷怪数据
    public GetSpawnData(levelId: number): LevelSpawnDatas {
        //获取关卡配置
        let config = ConfigManager.GetInstance().GetLevelConfig(levelId);
        if (config == null) { Log.Error("关卡%i配置不存在, 无法生成刷怪数据", levelId); return null; }

        //解析配置
        let data = new LevelSpawnDatas();
        data.LevelSpawnData = [];

        //获取模板id
        let templateId = this.GetTemplateId(config, levelId);
        Log.Debug("获取templet id %i", templateId)
        //获取关卡信息
        let templateConfig = ConfigManager.GetInstance().GetLevelTemplateConfig(templateId);
        data.IsBossLevel = templateConfig.IsBossLvl;
        let isBossLvl = data.IsBossLevel;
        //波次
        let brushIds = templateConfig.FormulaID;
        let allMonsterIds = []
        let totalMonsterCount = 0;
        for (let index = 0; index < brushIds.length; index++) {
            //配置波次信息
            let levelSpawnData = new LevelSpawnData();
            let brushId = brushIds[index];
            let brushConfig = ConfigManager.GetInstance().GetLevelBrushConfig(brushId);
            let tempMonsterBrushInfo = this.BrushMonster(brushConfig, levelId);//根据配置生成波次的怪物
            levelSpawnData.Monsters = tempMonsterBrushInfo.MonsterSpawnData;
            levelSpawnData.Delay = brushConfig.RefreshDuration;
            levelSpawnData.SoundId = brushConfig.soundId;
            data.LevelSpawnData.push(levelSpawnData)
            //记录怪物id
            for (let index = 0; index < tempMonsterBrushInfo.MonsterIDList.length; index++) {
                let monsterId = tempMonsterBrushInfo.MonsterIDList[index];
                if (allMonsterIds.indexOf(monsterId) < 0) {
                    allMonsterIds.push(monsterId);
                }
            }
            //记录怪物总数
            totalMonsterCount += levelSpawnData.Monsters.length;
        }

        //检测是否有生产怪 有就添加生产的怪id
        let spawnMonsterID = []
        for (let index = 0; index < allMonsterIds.length; index++) {
            let monsterId = allMonsterIds[index];
            let monsterConfig = ConfigManager.GetInstance().GetMonsterConfig(monsterId)
            //怪物技能
            for (let index = 0; index < monsterConfig.MonsterSkillID.length; index++) {
                let monsterPowerID = monsterConfig.MonsterSkillID[index];
                let skillConfig = monsterPowerID > 0 ? ConfigManager.GetInstance().GetSkillConfig(monsterPowerID) : null;
                if (skillConfig && skillConfig.Type == EnumMonsterPowerType.Spawn) {
                    if (skillConfig.Param3 > 0 && allMonsterIds.indexOf(skillConfig.Param3) < 0) {
                        spawnMonsterID.push(skillConfig.Param3)
                    }
                }
            }
        }
        if (spawnMonsterID.length > 0) {
            allMonsterIds = allMonsterIds.concat(spawnMonsterID)
        }

        data.LevelId = levelId;
        data.MaxInScreenNum = config.MaxNumInScreen;
        data.MonsterIDList = allMonsterIds;
        data.RefreshInterval = 0.1;
        data.TotalMonsterCount = totalMonsterCount;

        //Log
        let logString = "\n";
        logString += "关卡" + levelId + "中分成" + data.LevelSpawnData.length + "波.\n";
        logString += "关卡中出现MonsterID:"
        for (let index = 0; index < data.MonsterIDList.length; index++)logString += data.MonsterIDList[index] + ",";
        logString += "\n"

        for (let index = 0; index < data.LevelSpawnData.length; index++) {
            let spawnGroup = data.LevelSpawnData[index];
            logString += "  第" + index + "波有怪物数量:" + spawnGroup.Monsters.length + "\n";
            for (let index = 0; index < spawnGroup.Monsters.length; index++) {
                let monster = spawnGroup.Monsters[index];
                let powerString = "";
                if (monster.PowerNum > 0) {
                    for (let index = 0; index < monster.PowerNum; index++)
                    { powerString += monster.PowerConfigs[index].ID; powerString += ":"; powerString += EnumMonsterPowerType[monster.PowerConfigs[index].Type]; powerString += "," }
                }

                logString += "      怪物id:" + monster.MonsterId + " 怪物等级:" + monster.Level + " 怪物能力数量:" + monster.PowerNum + " 怪物能力:" + powerString + "\n";
            }
        }
        Log.Info(logString)
        return data;
    }

    //获取关卡模板id
    private GetTemplateId(config: LevelConfigConfigData, levelId: number): number {
        // let levelId = config.ID;
        //获取模板id
        let templateId = StorageManager.GetLastestLevelTemplate(levelId);
        if (templateId < 0) {
            let templateIds = GameUtil.ParseDisConfigString(config.TemplateId);
            let randomNum = Math.random();
            let count = 0;
            for (let index = 0; index < templateIds.length; index++) {
                let selectedPowerInfo = templateIds[index];
                count += selectedPowerInfo.Percentage;
                if (index == templateIds.length - 1) count = 1;
                if (randomNum <= count) {
                    templateId = selectedPowerInfo.Key;
                    StorageManager.SetLastestLevelTemplate(levelId, templateId);
                    Log.Debug("随机获取关卡模版: %i", templateId)
                    return selectedPowerInfo.Key;
                }
            }
        } else {
            Log.Debug("获取保存的关卡模版: %i", templateId)
            return templateId;
        }


    }

    //根据配置获取刷怪数据
    private BrushMonster(levelBrushConfig: LevelBrushConfigConfigData, levelId: number): TempSpawnMonsterInfo {
        let minLevel = levelBrushConfig.MonsterLvlRange[0];
        let maxLevel = levelBrushConfig.MonsterLvlRange[1];
        let buffSpawnNum = levelBrushConfig.BuffSpawnNumber;


        let monsterIdList = [];
        let totalMonsterList: MonsterSpawnData[] = [] //刷怪数据
        //怪物分布表
        let tempGroup = levelBrushConfig.MonsterDist.split(";");
        let totalMonsterCount = 0;
        for (let index = 0; index < tempGroup.length; index++) {
            let group = tempGroup[index];
            let distInfoString = group.split(",");
            if (distInfoString.length < 3) Log.Error("Dist的配置异常%s, 来自分布配置%s", group, levelBrushConfig.MonsterDist)

            //怪物分布
            let monsterID = parseInt(distInfoString[0]);
            let monsterNum = parseInt(distInfoString[1]);
            if (monsterNum > 0) {
                let monsterSkillNum = parseInt(distInfoString[2]);
                let powerIdList = ConfigManager.GetInstance().GetMonsterConfig(monsterID).MonsterSkillID;
                monsterIdList.push(monsterID)

                for (let index = 0; index < monsterNum; index++) {
                    totalMonsterCount += monsterNum;
                    let spawnData = new MonsterSpawnData();
                    spawnData.Level = levelId + Math.round(Math.random() * (maxLevel - minLevel)) + minLevel; //设置等级
                    spawnData.MonsterId = monsterID;
                    //技能数量
                    // spawnData.PowerId = [];
                    spawnData.PowerNum = index < monsterSkillNum ? powerIdList.length : 0;
                    spawnData.PowerConfigs = [];
                    for (let index = 0; index < spawnData.PowerNum; index++) {
                        let powerId = powerIdList[index];
                        if (powerId > 0) {
                            let skillConfig = ConfigManager.GetInstance().GetSkillConfig(powerId);
                            if (skillConfig) spawnData.PowerConfigs.push(skillConfig)
                        }
                    }
                    spawnData.PowerNum = spawnData.PowerNum > 0 ? spawnData.PowerConfigs.length : 0;//刷新技能数量

                    spawnData.HulkComing = false;
                    //怪物缩放
                    let scale = this.GetMonsterScale(spawnData.Level, levelId)
                    spawnData.SizeScale = new Vec2(scale, scale);
                    //死亡触发道具
                    spawnData.CanTriggerPropSpawn = totalMonsterList.length < buffSpawnNum;

                    totalMonsterList.push(spawnData)
                }
            }


        }

        let tempMonsterInfo = new TempSpawnMonsterInfo();
        tempMonsterInfo.MonsterIDList = monsterIdList;
        tempMonsterInfo.MonsterSpawnData = totalMonsterList;
        return tempMonsterInfo;
    }

    //获取怪物缩放
    public GetMonsterScale(monsterActualLevel: number, baseLevel: number): number {
        if (monsterActualLevel == baseLevel) {
            return 1;
        } else if (monsterActualLevel < baseLevel) {
            return 0.5;
        } else if (monsterActualLevel < baseLevel + 10) {
            return 1 + 0.5;
        } else if (monsterActualLevel < baseLevel + 20) {
            return 1 + 1;
        } else {
            return 1 + 1.5;
        }
    }
}



//临时保存关卡会产生的怪物信息
class TempSpawnMonsterInfo {
    public MonsterSpawnData: MonsterSpawnData[] //所有怪物详情
    public MonsterIDList: number[];             //所有会出现的怪物配置表id
}


class DistConfigInfo {
    public Key: number;
    public Weight: number;//0-100权重
    public Percentage: number;//0-1比例 四舍五入计算出
}