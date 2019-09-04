//当前关卡的刷怪信息
var LevelSpawnDatas = (function () {
    function LevelSpawnDatas() {
        this.IsBossLevel = false; // 是否boss关卡
    }
    return LevelSpawnDatas;
}());
//特定波次包含的怪物信息
var LevelSpawnData = (function () {
    function LevelSpawnData() {
        this.SoundId = -1;
    }
    return LevelSpawnData;
}());
//单个需要刷出的怪物信息
var MonsterSpawnData = (function () {
    function MonsterSpawnData() {
        this.HulkComing = false; //是否巨型怪
        this.CanTriggerPropSpawn = false; //是否触发道具生成
    }
    MonsterSpawnData.prototype.Clone = function () {
        var clone = new MonsterSpawnData();
        clone.MonsterId = this.MonsterId;
        clone.Level = this.Level;
        clone.PowerNum = this.PowerNum;
        // clone.PowerId = []
        // for (let index = 0; index < this.PowerId.length; index++) {
        //     let element = this.PowerId[index];
        //     clone.PowerId.push(element)
        // }
        clone.PowerConfigs = [];
        for (var index = 0; index < this.PowerConfigs.length; index++) {
            var element = this.PowerConfigs[index];
            clone.PowerConfigs.push(element);
        }
        clone.SizeScale = new Vec2(this.SizeScale.x, this.SizeScale.y);
        clone.HulkComing = this.HulkComing;
        clone.CanTriggerPropSpawn = this.CanTriggerPropSpawn;
        return clone;
    };
    return MonsterSpawnData;
}());
var MonsterSpawnCheckResult = (function () {
    function MonsterSpawnCheckResult() {
    }
    return MonsterSpawnCheckResult;
}());
/*
* 刷怪逻辑
*/
var MonsterSpawnLogic = (function () {
    function MonsterSpawnLogic() {
    }
    Object.defineProperty(MonsterSpawnLogic, "Instance", {
        get: function () {
            if (MonsterSpawnLogic._instance == null) {
                MonsterSpawnLogic._instance = new MonsterSpawnLogic();
            }
            return MonsterSpawnLogic._instance;
        },
        enumerable: true,
        configurable: true
    });
    //检测是否能继续生产
    MonsterSpawnLogic.prototype.CheckCanSpawn = function () {
        var levelInfo = GameDataManager.getInstance().LevelInfo;
        return !levelInfo.IsScreenFull();
    };
    //获取整个关卡的刷怪数据
    MonsterSpawnLogic.prototype.GetSpawnData = function (levelId) {
        //获取关卡配置
        var config = ConfigManager.GetInstance().GetLevelConfig(levelId);
        if (config == null) {
            Log.Error("关卡%i配置不存在, 无法生成刷怪数据", levelId);
            return null;
        }
        //解析配置
        var data = new LevelSpawnDatas();
        data.LevelSpawnData = [];
        //获取模板id
        var templateId = this.GetTemplateId(config, levelId);
        Log.Debug("获取templet id %i", templateId);
        //获取关卡信息
        var templateConfig = ConfigManager.GetInstance().GetLevelTemplateConfig(templateId);
        data.IsBossLevel = templateConfig.IsBossLvl;
        var isBossLvl = data.IsBossLevel;
        //波次
        var brushIds = templateConfig.FormulaID;
        var allMonsterIds = [];
        var totalMonsterCount = 0;
        for (var index = 0; index < brushIds.length; index++) {
            //配置波次信息
            var levelSpawnData = new LevelSpawnData();
            var brushId = brushIds[index];
            var brushConfig = ConfigManager.GetInstance().GetLevelBrushConfig(brushId);
            var tempMonsterBrushInfo = this.BrushMonster(brushConfig, levelId); //根据配置生成波次的怪物
            levelSpawnData.Monsters = tempMonsterBrushInfo.MonsterSpawnData;
            levelSpawnData.Delay = brushConfig.RefreshDuration;
            levelSpawnData.SoundId = brushConfig.soundId;
            data.LevelSpawnData.push(levelSpawnData);
            //记录怪物id
            for (var index_1 = 0; index_1 < tempMonsterBrushInfo.MonsterIDList.length; index_1++) {
                var monsterId = tempMonsterBrushInfo.MonsterIDList[index_1];
                if (allMonsterIds.indexOf(monsterId) < 0) {
                    allMonsterIds.push(monsterId);
                }
            }
            //记录怪物总数
            totalMonsterCount += levelSpawnData.Monsters.length;
        }
        //检测是否有生产怪 有就添加生产的怪id
        var spawnMonsterID = [];
        for (var index = 0; index < allMonsterIds.length; index++) {
            var monsterId = allMonsterIds[index];
            var monsterConfig = ConfigManager.GetInstance().GetMonsterConfig(monsterId);
            //怪物技能
            for (var index_2 = 0; index_2 < monsterConfig.MonsterSkillID.length; index_2++) {
                var monsterPowerID = monsterConfig.MonsterSkillID[index_2];
                var skillConfig = monsterPowerID > 0 ? ConfigManager.GetInstance().GetSkillConfig(monsterPowerID) : null;
                if (skillConfig && skillConfig.Type == EnumMonsterPowerType.Spawn) {
                    if (skillConfig.Param3 > 0 && allMonsterIds.indexOf(skillConfig.Param3) < 0) {
                        spawnMonsterID.push(skillConfig.Param3);
                    }
                }
            }
        }
        if (spawnMonsterID.length > 0) {
            allMonsterIds = allMonsterIds.concat(spawnMonsterID);
        }
        data.LevelId = levelId;
        data.MaxInScreenNum = config.MaxNumInScreen;
        data.MonsterIDList = allMonsterIds;
        data.RefreshInterval = 0.1;
        data.TotalMonsterCount = totalMonsterCount;
        //Log
        var logString = "\n";
        logString += "关卡" + levelId + "中分成" + data.LevelSpawnData.length + "波.\n";
        logString += "关卡中出现MonsterID:";
        for (var index = 0; index < data.MonsterIDList.length; index++)
            logString += data.MonsterIDList[index] + ",";
        logString += "\n";
        for (var index = 0; index < data.LevelSpawnData.length; index++) {
            var spawnGroup = data.LevelSpawnData[index];
            logString += "  第" + index + "波有怪物数量:" + spawnGroup.Monsters.length + "\n";
            for (var index_3 = 0; index_3 < spawnGroup.Monsters.length; index_3++) {
                var monster = spawnGroup.Monsters[index_3];
                var powerString = "";
                if (monster.PowerNum > 0) {
                    for (var index_4 = 0; index_4 < monster.PowerNum; index_4++) {
                        powerString += monster.PowerConfigs[index_4].ID;
                        powerString += ":";
                        powerString += EnumMonsterPowerType[monster.PowerConfigs[index_4].Type];
                        powerString += ",";
                    }
                }
                logString += "      怪物id:" + monster.MonsterId + " 怪物等级:" + monster.Level + " 怪物能力数量:" + monster.PowerNum + " 怪物能力:" + powerString + "\n";
            }
        }
        Log.Info(logString);
        return data;
    };
    //获取关卡模板id
    MonsterSpawnLogic.prototype.GetTemplateId = function (config, levelId) {
        // let levelId = config.ID;
        //获取模板id
        var templateId = StorageManager.GetLastestLevelTemplate(levelId);
        if (templateId < 0) {
            var templateIds = GameUtil.ParseDisConfigString(config.TemplateId);
            var randomNum = Math.random();
            var count = 0;
            for (var index = 0; index < templateIds.length; index++) {
                var selectedPowerInfo = templateIds[index];
                count += selectedPowerInfo.Percentage;
                if (index == templateIds.length - 1)
                    count = 1;
                if (randomNum <= count) {
                    templateId = selectedPowerInfo.Key;
                    StorageManager.SetLastestLevelTemplate(levelId, templateId);
                    Log.Debug("随机获取关卡模版: %i", templateId);
                    return selectedPowerInfo.Key;
                }
            }
        }
        else {
            Log.Debug("获取保存的关卡模版: %i", templateId);
            return templateId;
        }
    };
    //根据配置获取刷怪数据
    MonsterSpawnLogic.prototype.BrushMonster = function (levelBrushConfig, levelId) {
        var minLevel = levelBrushConfig.MonsterLvlRange[0];
        var maxLevel = levelBrushConfig.MonsterLvlRange[1];
        var buffSpawnNum = levelBrushConfig.BuffSpawnNumber;
        var monsterIdList = [];
        var totalMonsterList = []; //刷怪数据
        //怪物分布表
        var tempGroup = levelBrushConfig.MonsterDist.split(";");
        var totalMonsterCount = 0;
        for (var index = 0; index < tempGroup.length; index++) {
            var group = tempGroup[index];
            var distInfoString = group.split(",");
            if (distInfoString.length < 3)
                Log.Error("Dist的配置异常%s, 来自分布配置%s", group, levelBrushConfig.MonsterDist);
            //怪物分布
            var monsterID = parseInt(distInfoString[0]);
            var monsterNum = parseInt(distInfoString[1]);
            if (monsterNum > 0) {
                var monsterSkillNum = parseInt(distInfoString[2]);
                var powerIdList = ConfigManager.GetInstance().GetMonsterConfig(monsterID).MonsterSkillID;
                monsterIdList.push(monsterID);
                for (var index_5 = 0; index_5 < monsterNum; index_5++) {
                    totalMonsterCount += monsterNum;
                    var spawnData = new MonsterSpawnData();
                    spawnData.Level = levelId + Math.round(Math.random() * (maxLevel - minLevel)) + minLevel; //设置等级
                    spawnData.MonsterId = monsterID;
                    //技能数量
                    // spawnData.PowerId = [];
                    spawnData.PowerNum = index_5 < monsterSkillNum ? powerIdList.length : 0;
                    spawnData.PowerConfigs = [];
                    for (var index_6 = 0; index_6 < spawnData.PowerNum; index_6++) {
                        var powerId = powerIdList[index_6];
                        if (powerId > 0) {
                            var skillConfig = ConfigManager.GetInstance().GetSkillConfig(powerId);
                            if (skillConfig)
                                spawnData.PowerConfigs.push(skillConfig);
                        }
                    }
                    spawnData.PowerNum = spawnData.PowerNum > 0 ? spawnData.PowerConfigs.length : 0; //刷新技能数量
                    spawnData.HulkComing = false;
                    //怪物缩放
                    var scale = this.GetMonsterScale(spawnData.Level, levelId);
                    spawnData.SizeScale = new Vec2(scale, scale);
                    //死亡触发道具
                    spawnData.CanTriggerPropSpawn = totalMonsterList.length < buffSpawnNum;
                    totalMonsterList.push(spawnData);
                }
            }
        }
        var tempMonsterInfo = new TempSpawnMonsterInfo();
        tempMonsterInfo.MonsterIDList = monsterIdList;
        tempMonsterInfo.MonsterSpawnData = totalMonsterList;
        return tempMonsterInfo;
    };
    //获取怪物缩放
    MonsterSpawnLogic.prototype.GetMonsterScale = function (monsterActualLevel, baseLevel) {
        if (monsterActualLevel == baseLevel) {
            return 1;
        }
        else if (monsterActualLevel < baseLevel) {
            return 0.5;
        }
        else if (monsterActualLevel < baseLevel + 10) {
            return 1 + 0.5;
        }
        else if (monsterActualLevel < baseLevel + 20) {
            return 1 + 1;
        }
        else {
            return 1 + 1.5;
        }
    };
    return MonsterSpawnLogic;
}());
//临时保存关卡会产生的怪物信息
var TempSpawnMonsterInfo = (function () {
    function TempSpawnMonsterInfo() {
    }
    return TempSpawnMonsterInfo;
}());
var DistConfigInfo = (function () {
    function DistConfigInfo() {
    }
    return DistConfigInfo;
}());
//# sourceMappingURL=MonsterSpawnLogic.js.map