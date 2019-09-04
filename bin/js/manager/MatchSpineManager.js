/*
* 比赛中使用的spine动画管理
*/
var MatchSpineManager = (function () {
    function MatchSpineManager() {
    }
    Object.defineProperty(MatchSpineManager, "Instance", {
        get: function () {
            if (MatchSpineManager.instance == null) {
                MatchSpineManager.instance = new MatchSpineManager();
            }
            return MatchSpineManager.instance;
        },
        enumerable: true,
        configurable: true
    });
    MatchSpineManager.prototype.addToLoadSpineId = function (spineConfigId) {
        if (spineConfigId > 0 && this.loadedSpineID.indexOf(spineConfigId) < 0) {
            // console.log(spineConfigId + " [spine COnfig Id] ");
            this.loadedSpineID.push(spineConfigId);
        }
    };
    MatchSpineManager.prototype.PreloadAll = function (onInited, onProgress) {
        //spine初始化 
        this.loadedSpineID = [];
        //副武器使用的spine建立对象池
        var sideWeaponConfigIds = CommonUtil.LoopEnum(EnumSideWeaponType); //所有子弹
        for (var index = 0; index < sideWeaponConfigIds.length; index++) {
            var sideWeaponConfig = ConfigManager.GetInstance().GetWeaponConfig(sideWeaponConfigIds[index]);
            this.addToLoadSpineId(sideWeaponConfig.PreparingFxID);
            this.addToLoadSpineId(sideWeaponConfig.FiringFxID);
            this.addToLoadSpineId(sideWeaponConfig.EndingFxID);
        }
        //主武器
        var mainWeaponSpineFxID = ConfigManager.GetInstance().GetMainPlayerConfig().SpineConfigID;
        this.addToLoadSpineId(mainWeaponSpineFxID);
        //怪物技能spine动画
        //let powerIds = CommonUtil.LoopEnum(EnumMonsterPowerId); //所有怪物技能
        var allSkillConfigs = ConfigManager.GetInstance().GetAllSkillConfig();
        for (var index = 0; index < allSkillConfigs.length; index++) {
            // let monsterPowerID = powerIds[index];
            var skillConfig = allSkillConfigs[index]; //ConfigManager.GetInstance().GetSkillConfig(monsterPowerID)
            if (skillConfig) {
                this.addToLoadSpineId(skillConfig.FireSpineConfigID1);
                this.addToLoadSpineId(skillConfig.FireSpineConfigID2);
                this.addToLoadSpineId(skillConfig.PrepareSpineConfigID);
            }
        }
        //怪物spine
        var monsterConfigs = ConfigManager.GetInstance().GetAllMonsterConfig();
        for (var index = 0; index < monsterConfigs.length; index++) {
            var monsterConfig = monsterConfigs[index];
            this.addToLoadSpineId(monsterConfig.SpineConfigID);
        }
        //子弹击中目标Spine动画
        var bulletIDs = CommonUtil.LoopEnum(EnumBulletOutLookType); //所有子弹
        for (var index = 0; index < bulletIDs.length; index++) {
            if (bulletIDs[index] == EnumBulletOutLookType.None)
                continue;
            var bulletConfig = ConfigManager.GetInstance().GetBulletConfig(bulletIDs[index]);
            if (bulletConfig.HitFxSpineID > 0)
                this.addToLoadSpineId(bulletConfig.HitFxSpineID);
        }
        SpinePoolManager.GetInstance().InitPool(this.loadedSpineID, onInited, null, onProgress);
    };
    MatchSpineManager.prototype.InitBeforeMatch = function (levelId, levelSpawnDatas, onInited) {
        //spine初始化 
        this.loadedSpineID = [];
        //:副武器使用的spine建立对象池
        var sideWeaponConfig = ConfigManager.GetInstance().GetWeaponConfig(GameDataManager.getInstance().LoginPlayerInfo.CurSideWeaponID);
        this.addToLoadSpineId(sideWeaponConfig.PreparingFxID);
        this.addToLoadSpineId(sideWeaponConfig.FiringFxID);
        this.addToLoadSpineId(sideWeaponConfig.EndingFxID);
        //主武器
        var mainWeaponSpineFxID = ConfigManager.GetInstance().GetMainPlayerConfig().SpineConfigID;
        this.addToLoadSpineId(mainWeaponSpineFxID);
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
        var monsterIds = levelSpawnDatas.MonsterIDList;
        for (var index = 0; index < monsterIds.length; index++) {
            var monsterId = monsterIds[index];
            var monsterConfig = ConfigManager.GetInstance().GetMonsterConfig(monsterId);
            this.addToLoadSpineId(monsterConfig.SpineConfigID);
            //怪物技能
            for (var index_1 = 0; index_1 < monsterConfig.MonsterSkillID.length; index_1++) {
                var monsterPowerID = monsterConfig.MonsterSkillID[index_1];
                var skillConfig = ConfigManager.GetInstance().GetSkillConfig(monsterPowerID);
                if (skillConfig) {
                    this.addToLoadSpineId(skillConfig.FireSpineConfigID1);
                    this.addToLoadSpineId(skillConfig.FireSpineConfigID2);
                    this.addToLoadSpineId(skillConfig.PrepareSpineConfigID);
                    //生产怪物
                    if (skillConfig.Type == EnumMonsterPowerType.Spawn && skillConfig.Param3 > 0) {
                        this.addToLoadSpineId(skillConfig.Param3);
                    }
                }
            }
        }
        //子弹击中目标Spine动画
        var bulletIDs = CommonUtil.LoopEnum(EnumBulletOutLookType); //所有子弹
        for (var index = 0; index < bulletIDs.length; index++) {
            if (bulletIDs[index] == EnumBulletOutLookType.None)
                continue;
            var bulletConfig = ConfigManager.GetInstance().GetBulletConfig(bulletIDs[index]);
            if (bulletConfig.HitFxSpineID > 0)
                this.addToLoadSpineId(bulletConfig.HitFxSpineID);
        }
        SpinePoolManager.GetInstance().InitPool(this.loadedSpineID, onInited);
    };
    MatchSpineManager.prototype.DestroyOnExitMatch = function () {
        for (var index = 0; index < this.loadedSpineID.length; index++) {
            var spineId = this.loadedSpineID[index];
            SpinePoolManager.GetInstance().Destory(spineId);
        }
        this.loadedSpineID = [];
    };
    MatchSpineManager.prototype.PauseMatch = function (isPause) {
        // for (let i = 0; i < this.loadedSpineID.length; i++) {
        //     let spineId = this.loadedSpineID[i];
        //     SpinePoolManager.GetInstance().pause(isPause, spineId);
        // }
    };
    MatchSpineManager.prototype.Spawn = function (spineConfigId) {
        return SpinePoolManager.GetInstance().Spawn(spineConfigId);
    };
    MatchSpineManager.prototype.Recycle = function (spineConfigId, spineObj) {
        SpinePoolManager.GetInstance().Recycle(spineConfigId, spineObj);
    };
    return MatchSpineManager;
}());
//# sourceMappingURL=MatchSpineManager.js.map