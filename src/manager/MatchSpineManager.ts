/*
* 比赛中使用的spine动画管理
*/
class MatchSpineManager {
    private static instance: MatchSpineManager;
    public static get Instance(): MatchSpineManager {
        if (MatchSpineManager.instance == null) {
            MatchSpineManager.instance = new MatchSpineManager();
        }
        return MatchSpineManager.instance;
    }

    private loadedSpineID: number[];
    private addToLoadSpineId(spineConfigId: number) {
        if (spineConfigId > 0 && this.loadedSpineID.indexOf(spineConfigId) < 0) {
            // console.log(spineConfigId + " [spine COnfig Id] ");
            this.loadedSpineID.push(spineConfigId)
        }
    }

    public PreloadAll(onInited: Function, onProgress?: Function) {
        //spine初始化 
        this.loadedSpineID = [];
        //副武器使用的spine建立对象池
        let sideWeaponConfigIds = CommonUtil.LoopEnum(EnumSideWeaponType); //所有子弹
        for (let index = 0; index < sideWeaponConfigIds.length; index++) {
            let sideWeaponConfig = ConfigManager.GetInstance().GetWeaponConfig(sideWeaponConfigIds[index]);
            this.addToLoadSpineId(sideWeaponConfig.PreparingFxID)
            this.addToLoadSpineId(sideWeaponConfig.FiringFxID)
            this.addToLoadSpineId(sideWeaponConfig.EndingFxID)
        }

        //主武器
        let mainWeaponSpineFxID = ConfigManager.GetInstance().GetMainPlayerConfig().SpineConfigID;
        this.addToLoadSpineId(mainWeaponSpineFxID)

        //怪物技能spine动画
        //let powerIds = CommonUtil.LoopEnum(EnumMonsterPowerId); //所有怪物技能
        let allSkillConfigs = ConfigManager.GetInstance().GetAllSkillConfig();
        for (let index = 0; index < allSkillConfigs.length; index++) {
            // let monsterPowerID = powerIds[index];
            let skillConfig = allSkillConfigs[index];//ConfigManager.GetInstance().GetSkillConfig(monsterPowerID)
            if (skillConfig) {
                this.addToLoadSpineId(skillConfig.FireSpineConfigID1)
                this.addToLoadSpineId(skillConfig.FireSpineConfigID2)
                this.addToLoadSpineId(skillConfig.PrepareSpineConfigID)
            }
        }

        //怪物spine
        let monsterConfigs = ConfigManager.GetInstance().GetAllMonsterConfig();
        for (let index = 0; index < monsterConfigs.length; index++) {
            let monsterConfig = monsterConfigs[index];
            this.addToLoadSpineId(monsterConfig.SpineConfigID)
        }

        //子弹击中目标Spine动画
        let bulletIDs = CommonUtil.LoopEnum(EnumBulletOutLookType); //所有子弹
        for (let index = 0; index < bulletIDs.length; index++) {
            if (bulletIDs[index] == EnumBulletOutLookType.None) continue;
            let bulletConfig = ConfigManager.GetInstance().GetBulletConfig(bulletIDs[index]);
            if (bulletConfig.HitFxSpineID > 0) this.addToLoadSpineId(bulletConfig.HitFxSpineID)
        }

        SpinePoolManager.GetInstance().InitPool(this.loadedSpineID, onInited, null, onProgress)
    }

    public InitBeforeMatch(levelId: number, levelSpawnDatas: LevelSpawnDatas, onInited: Function) {
        //spine初始化 
        this.loadedSpineID = [];
        //:副武器使用的spine建立对象池
        let sideWeaponConfig = ConfigManager.GetInstance().GetWeaponConfig(GameDataManager.getInstance().LoginPlayerInfo.CurSideWeaponID);
        this.addToLoadSpineId(sideWeaponConfig.PreparingFxID)
        this.addToLoadSpineId(sideWeaponConfig.FiringFxID)
        this.addToLoadSpineId(sideWeaponConfig.EndingFxID)
        //主武器
        let mainWeaponSpineFxID = ConfigManager.GetInstance().GetMainPlayerConfig().SpineConfigID;
        this.addToLoadSpineId(mainWeaponSpineFxID)
        // //怪物技能spine动画
        // let levelConfig = ConfigManager.GetInstance().GetLevelConfig(levelId);
        // let powerInfo = GameUtil.ParseDisConfigString(levelConfig.MonsterPowerIdDist);
        // for (let index = 0; index < powerInfo.length; index++) {
        //     let monsterPowerID = powerInfo[index].Key;
        //     let skillConfig = ConfigManager.GetInstance().GetSkillConfig(monsterPowerID)
        //     if (skillConfig) {
        //         this.addToLoadSpineId(skillConfig.FireSpineConfigID1)
        //         this.addToLoadSpineId(skillConfig.FireSpineConfigID2)
        //         this.addToLoadSpineId(skillConfig.PrepareSpineConfigID)
        //     }
        // }
        //怪物spine
        // let monsterIds = GameUtil.ParseDisConfigString(levelConfig.MonsterIdDist);
        // for (let index = 0; index < monsterIds.length; index++) {
        //     let monsterId = monsterIds[index].Key;
        //     let monsterConfig = ConfigManager.GetInstance().GetMonsterConfig(monsterId)
        //     this.addToLoadSpineId(monsterConfig.SpineConfigID)
        // }
        let monsterIds = levelSpawnDatas.MonsterIDList;
        for (let index = 0; index < monsterIds.length; index++) {
            let monsterId = monsterIds[index];
            let monsterConfig = ConfigManager.GetInstance().GetMonsterConfig(monsterId)
            this.addToLoadSpineId(monsterConfig.SpineConfigID)
            //怪物技能
            for (let index = 0; index < monsterConfig.MonsterSkillID.length; index++) {
                let monsterPowerID = monsterConfig.MonsterSkillID[index];
                let skillConfig = ConfigManager.GetInstance().GetSkillConfig(monsterPowerID)
                if (skillConfig) {
                    this.addToLoadSpineId(skillConfig.FireSpineConfigID1)
                    this.addToLoadSpineId(skillConfig.FireSpineConfigID2)
                    this.addToLoadSpineId(skillConfig.PrepareSpineConfigID)
                    //生产怪物
                    if (skillConfig.Type == EnumMonsterPowerType.Spawn && skillConfig.Param3 > 0) {
                        this.addToLoadSpineId(skillConfig.Param3)
                    }
                }
            }
        }
        //子弹击中目标Spine动画
        let bulletIDs = CommonUtil.LoopEnum(EnumBulletOutLookType); //所有子弹
        for (let index = 0; index < bulletIDs.length; index++) {
            if (bulletIDs[index] == EnumBulletOutLookType.None) continue;
            let bulletConfig = ConfigManager.GetInstance().GetBulletConfig(bulletIDs[index]);
            if (bulletConfig.HitFxSpineID > 0) this.addToLoadSpineId(bulletConfig.HitFxSpineID)
        }

        SpinePoolManager.GetInstance().InitPool(this.loadedSpineID, onInited)
    }


    public DestroyOnExitMatch() {
        for (let index = 0; index < this.loadedSpineID.length; index++) {
            let spineId = this.loadedSpineID[index];
            SpinePoolManager.GetInstance().Destory(spineId)
        }
        this.loadedSpineID = [];
    }

    public PauseMatch(isPause) {
        // for (let i = 0; i < this.loadedSpineID.length; i++) {
        //     let spineId = this.loadedSpineID[i];
        //     SpinePoolManager.GetInstance().pause(isPause, spineId);
        // }
    }

    public Spawn(spineConfigId: number): Laya.Skeleton {
        return SpinePoolManager.GetInstance().Spawn(spineConfigId)
    }

    public Recycle(spineConfigId: number, spineObj: Laya.Skeleton) {
        SpinePoolManager.GetInstance().Recycle(spineConfigId, spineObj);
    }
}