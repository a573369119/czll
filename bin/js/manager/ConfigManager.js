/*
* 游戏配置管理
*/
var ConfigTypeEnum;
(function (ConfigTypeEnum) {
    ConfigTypeEnum[ConfigTypeEnum["SoundConfig"] = 1] = "SoundConfig";
    ConfigTypeEnum[ConfigTypeEnum["UIConfig"] = 2] = "UIConfig";
    ConfigTypeEnum[ConfigTypeEnum["LocalizationConfig"] = 3] = "LocalizationConfig";
    ConfigTypeEnum[ConfigTypeEnum["LevelConfig"] = 4] = "LevelConfig";
    ConfigTypeEnum[ConfigTypeEnum["MonsterConfig"] = 5] = "MonsterConfig";
    ConfigTypeEnum[ConfigTypeEnum["PlayerConfig"] = 6] = "PlayerConfig";
    ConfigTypeEnum[ConfigTypeEnum["SkillConfig"] = 7] = "SkillConfig";
    ConfigTypeEnum[ConfigTypeEnum["WeaponConfig"] = 8] = "WeaponConfig";
    ConfigTypeEnum[ConfigTypeEnum["SpineConfig"] = 9] = "SpineConfig";
    ConfigTypeEnum[ConfigTypeEnum["BulletConfig"] = 10] = "BulletConfig";
    ConfigTypeEnum[ConfigTypeEnum["BuffConfig"] = 11] = "BuffConfig";
    ConfigTypeEnum[ConfigTypeEnum["PropConfig"] = 12] = "PropConfig";
    ConfigTypeEnum[ConfigTypeEnum["FormulaConfig"] = 13] = "FormulaConfig";
    ConfigTypeEnum[ConfigTypeEnum["GoldUpgradeConfig"] = 14] = "GoldUpgradeConfig";
    ConfigTypeEnum[ConfigTypeEnum["MainWeaponEvolutionConfig"] = 15] = "MainWeaponEvolutionConfig";
    ConfigTypeEnum[ConfigTypeEnum["LevelTemplateConfig"] = 16] = "LevelTemplateConfig";
    ConfigTypeEnum[ConfigTypeEnum["LevelBrushConfig"] = 17] = "LevelBrushConfig";
    ConfigTypeEnum[ConfigTypeEnum["ConstConfig"] = 18] = "ConstConfig";
    ConfigTypeEnum[ConfigTypeEnum["PhoneVerifyErrorMessage"] = 19] = "PhoneVerifyErrorMessage";
    ConfigTypeEnum[ConfigTypeEnum["LotteryRewardConfig"] = 20] = "LotteryRewardConfig";
    ConfigTypeEnum[ConfigTypeEnum["OtherConfigData"] = 21] = "OtherConfigData";
})(ConfigTypeEnum || (ConfigTypeEnum = {}));
var ConfigManager = (function () {
    function ConfigManager() {
        this.m_LoadItem = [];
        this.byteTables = new ByteTableManager();
        //获取道具的生产概率
        this.PropSpawnProbability = null;
        //初始化主武器进阶表
        this.mainWeaponEvloveConfigList = null;
    }
    ConfigManager.GetInstance = function () {
        if (ConfigManager._Instance == null) {
            ConfigManager._Instance = new ConfigManager();
        }
        return ConfigManager._Instance;
    };
    ConfigManager.prototype.getConfig = function (arrItem) {
        this.m_LoadItem =
            [
                //配置url为配置表路径, CType为解析使用
                { url: "res/configs/SoundConfig.bin", type: Laya.Loader.BUFFER, CType: ConfigTypeEnum.SoundConfig },
                { url: "res/configs/UIInfo.bin", type: Laya.Loader.BUFFER, CType: ConfigTypeEnum.UIConfig },
                { url: "res/configs/Localization.bin", type: Laya.Loader.BUFFER, CType: ConfigTypeEnum.LocalizationConfig },
                { url: "res/configs/LevelConfig.bin", type: Laya.Loader.BUFFER, CType: ConfigTypeEnum.LevelConfig },
                { url: "res/configs/MonsterConfig.bin", type: Laya.Loader.BUFFER, CType: ConfigTypeEnum.MonsterConfig },
                { url: "res/configs/PlayerConfig.bin", type: Laya.Loader.BUFFER, CType: ConfigTypeEnum.PlayerConfig },
                { url: "res/configs/SkillConfig.bin", type: Laya.Loader.BUFFER, CType: ConfigTypeEnum.SkillConfig },
                { url: "res/configs/WeaponConfig.bin", type: Laya.Loader.BUFFER, CType: ConfigTypeEnum.WeaponConfig },
                { url: "res/configs/SpineConfig.bin", type: Laya.Loader.BUFFER, CType: ConfigTypeEnum.SpineConfig },
                { url: "res/configs/BulletConfig.bin", type: Laya.Loader.BUFFER, CType: ConfigTypeEnum.BulletConfig },
                { url: "res/configs/BuffConfig.bin", type: Laya.Loader.BUFFER, CType: ConfigTypeEnum.BuffConfig },
                { url: "res/configs/PropConfig.bin", type: Laya.Loader.BUFFER, CType: ConfigTypeEnum.PropConfig },
                { url: "res/configs/FormulaConfig.bin", type: Laya.Loader.BUFFER, CType: ConfigTypeEnum.FormulaConfig },
                { url: "res/configs/GoldUpgradeConfig.bin", type: Laya.Loader.BUFFER, CType: ConfigTypeEnum.GoldUpgradeConfig },
                { url: "res/configs/MainWeaponEvolutionConfig.bin", type: Laya.Loader.BUFFER, CType: ConfigTypeEnum.MainWeaponEvolutionConfig },
                { url: "res/configs/LevelTemplateConfig.bin", type: Laya.Loader.BUFFER, CType: ConfigTypeEnum.LevelTemplateConfig },
                { url: "res/configs/LevelBrushConfig.bin", type: Laya.Loader.BUFFER, CType: ConfigTypeEnum.LevelBrushConfig },
                { url: "res/configs/ConstConfig.bin", type: Laya.Loader.BUFFER, CType: ConfigTypeEnum.ConstConfig },
                { url: "res/configs/PhoneVerifyErrorMessage.bin", type: Laya.Loader.BUFFER, CType: ConfigTypeEnum.PhoneVerifyErrorMessage },
                { url: "res/configs/LotteryRewardConfig.bin", type: Laya.Loader.BUFFER, CType: ConfigTypeEnum.LotteryRewardConfig },
                { url: "res/configs/OtherConfigData.bin", type: Laya.Loader.BUFFER, CType: ConfigTypeEnum.OtherConfigData },
            ];
        for (var i = 0; i < this.m_LoadItem.length; i++) {
            arrItem.push(this.m_LoadItem[i]);
        }
    };
    ConfigManager.prototype.InitOnLoaded = function () {
        for (var i = 0; i < this.m_LoadItem.length; i++) {
            var pData = ResourceManager.GetInstance().getRes(this.m_LoadItem[i].url);
            if (pData != null) {
                switch (this.m_LoadItem[i].CType) {
                    case ConfigTypeEnum.LocalizationConfig:
                        {
                            // LocalizationConfigDataManager.Init(pData.configData); //语言表
                            this.byteTables.OnTableLoaded(LocalizationConfigData, pData);
                            break;
                        }
                    case ConfigTypeEnum.UIConfig:
                        {
                            //UIInfoConfigDataManager.Init(pData.configData);
                            this.byteTables.OnTableLoaded(UIInfoConfigData, pData);
                            break;
                        }
                    case ConfigTypeEnum.SoundConfig:
                        {
                            //SoundConfigConfigDataManager.Init(pData.configData)
                            this.byteTables.OnTableLoaded(SoundConfigConfigData, pData);
                            break;
                        }
                    case ConfigTypeEnum.LevelConfig:
                        {
                            this.byteTables.OnTableLoaded(LevelConfigConfigData, pData);
                            break;
                        }
                    case ConfigTypeEnum.MonsterConfig:
                        {
                            this.byteTables.OnTableLoaded(MonsterConfigConfigData, pData);
                            break;
                        }
                    case ConfigTypeEnum.PlayerConfig:
                        {
                            this.byteTables.OnTableLoaded(PlayerConfigConfigData, pData);
                            break;
                        }
                    case ConfigTypeEnum.SkillConfig:
                        {
                            this.byteTables.OnTableLoaded(SkillConfigConfigData, pData);
                            break;
                        }
                    case ConfigTypeEnum.WeaponConfig:
                        {
                            this.byteTables.OnTableLoaded(WeaponConfigConfigData, pData);
                            break;
                        }
                    case ConfigTypeEnum.SpineConfig:
                        {
                            this.byteTables.OnTableLoaded(SpineConfigConfigData, pData);
                            break;
                        }
                    case ConfigTypeEnum.BulletConfig:
                        {
                            this.byteTables.OnTableLoaded(BulletConfigConfigData, pData);
                            break;
                        }
                    case ConfigTypeEnum.BuffConfig:
                        {
                            this.byteTables.OnTableLoaded(BuffConfigConfigData, pData);
                            break;
                        }
                    case ConfigTypeEnum.PropConfig:
                        {
                            this.byteTables.OnTableLoaded(PropConfigConfigData, pData);
                            break;
                        }
                    case ConfigTypeEnum.FormulaConfig:
                        {
                            this.byteTables.OnTableLoaded(FormulaConfigConfigData, pData);
                            break;
                        }
                    case ConfigTypeEnum.MainWeaponEvolutionConfig:
                        {
                            this.byteTables.OnTableLoaded(MainWeaponEvolutionConfigConfigData, pData);
                            this.InitMainWeaponEvolutionConfig();
                            break;
                        }
                    case ConfigTypeEnum.LevelBrushConfig:
                        {
                            this.byteTables.OnTableLoaded(LevelBrushConfigConfigData, pData);
                            break;
                        }
                    case ConfigTypeEnum.LevelTemplateConfig:
                        {
                            this.byteTables.OnTableLoaded(LevelTemplateConfigConfigData, pData);
                            this.InitMainWeaponEvolutionConfig();
                            break;
                        }
                    case ConfigTypeEnum.GoldUpgradeConfig:
                        {
                            this.byteTables.OnTableLoaded(GoldUpgradeConfigConfigData, pData);
                            break;
                        }
                    case ConfigTypeEnum.ConstConfig:
                        {
                            this.byteTables.OnTableLoaded(ConstConfigConfigData, pData);
                            break;
                        }
                    case ConfigTypeEnum.PhoneVerifyErrorMessage:
                        {
                            this.byteTables.OnTableLoaded(PhoneVerifyErrorMessageConfigData, pData);
                            break;
                        }
                    case ConfigTypeEnum.LotteryRewardConfig:
                        {
                            this.byteTables.OnTableLoaded(LotteryRewardConfigConfigData, pData);
                            break;
                        }
                    case ConfigTypeEnum.OtherConfigData:
                        {
                            this.byteTables.OnTableLoaded(OtherConfigData, pData);
                            break;
                        }
                }
            }
            ResourceManager.GetInstance().release(this.m_LoadItem[i].url); //加载完成卸载
        }
    };
    /**
     * 根据UIID Enum读取对应的UIConfig
     * @param uiid
     */
    ConfigManager.prototype.GetConfigDataByUIID = function (uiid) {
        var uiList = this.byteTables.GetAll(UIInfoConfigData);
        var config = null;
        uiList.forEach(function (element) {
            if (ui.UIID[element.UIID] == uiid) {
                config = element;
            }
        });
        return config;
    };
    //获取ui配置
    ConfigManager.prototype.GetUIConfig = function (uiid) {
        var config = this.GetConfigDataByUIID(uiid); //  UIInfoConfigDataManager.GetConfigDataByUIID(uiid);
        if (config)
            return config;
        //Log.Error("ui配置不存在, uiid:" + uiid)
        return null;
    };
    //语言表
    ConfigManager.prototype.GetLocalizationConfig = function (id) {
        return this.byteTables.GetConfigByID(id, LocalizationConfigData);
        ; //LocalizationConfigDataManager.GetConfigData(id)
    };
    //声音配置
    ConfigManager.prototype.GetAudioConfig = function (id) {
        return this.byteTables.GetConfigByID(id, SoundConfigConfigData); //SoundConfigConfigDataManager.GetConfigData(id);
    };
    ConfigManager.prototype.GetAllAudioConfig = function () {
        return this.byteTables.GetAll(SoundConfigConfigData);
    };
    ConfigManager.prototype.SetShareConfig = function (config) {
        this.shareconfig = config;
    };
    ConfigManager.prototype.GetShareConfig = function () {
        return this.shareconfig;
    };
    //获取对应的关卡区间配置
    ConfigManager.prototype.GetLevelConfig = function (levelId) {
        var allConfig = this.byteTables.GetAll(LevelConfigConfigData);
        for (var index = 0; index < allConfig.length; index++) {
            var config = allConfig[index];
            if (config.ID < levelId)
                continue;
            return config;
        }
        return null;
    };
    //获取关卡最大数量
    ConfigManager.prototype.GetLevelMax = function () {
        var allConfig = this.byteTables.GetAll(LevelConfigConfigData);
        var maxLevel = 0;
        for (var i = 0; i < allConfig.length; i++) {
            var element = allConfig[i];
            if (maxLevel < element.ID) {
                maxLevel = element.ID;
            }
        }
        return maxLevel;
    };
    //最大关卡
    ConfigManager.prototype.GetMaxLevelID = function () {
        var maxId = 0;
        var allConfig = this.byteTables.GetAll(LevelConfigConfigData);
        for (var index = 0; index < allConfig.length; index++) {
            var config = allConfig[index];
            if (config.ID > maxId)
                maxId = config.ID;
        }
        return maxId;
    };
    ConfigManager.prototype.GetMonsterConfig = function (id) {
        return this.byteTables.GetConfigByID(id, MonsterConfigConfigData);
    };
    ConfigManager.prototype.GetAllMonsterConfig = function () {
        return this.byteTables.GetAll(MonsterConfigConfigData);
    };
    ConfigManager.prototype.GetMainPlayerConfig = function () {
        return this.GetPlayerConfig(ConstDefine.MAIN_PLAYRE_CONFIG_ID);
    };
    ConfigManager.prototype.GetPlayerConfig = function (id) {
        return this.byteTables.GetConfigByID(id, PlayerConfigConfigData);
    };
    ConfigManager.prototype.GetSkillConfig = function (id) {
        return this.byteTables.GetConfigByID(id, SkillConfigConfigData);
    };
    ConfigManager.prototype.GetAllSkillConfig = function () {
        return this.byteTables.GetAll(SkillConfigConfigData);
    };
    ConfigManager.prototype.GetWeaponConfig = function (id) {
        return this.byteTables.GetConfigByID(id, WeaponConfigConfigData);
    };
    ConfigManager.prototype.GetAllWeaponConfig = function () {
        return this.byteTables.GetAll(WeaponConfigConfigData);
    };
    ConfigManager.prototype.GetSpineConfig = function (id) {
        return this.byteTables.GetConfigByID(id, SpineConfigConfigData);
    };
    ConfigManager.prototype.GetBulletConfig = function (id) {
        return this.byteTables.GetConfigByID(id, BulletConfigConfigData);
    };
    ConfigManager.prototype.GetBuffConfig = function (id) {
        return this.byteTables.GetConfigByID(id, BuffConfigConfigData);
    };
    ConfigManager.prototype.GetPropConfig = function (id) {
        return this.byteTables.GetConfigByID(id, PropConfigConfigData);
    };
    ConfigManager.prototype.GetPropSpawnWeight = function () {
        if (this.PropSpawnProbability)
            return this.PropSpawnProbability;
        this.PropSpawnProbability = [];
        var all = this.byteTables.GetAll(PropConfigConfigData);
        var totalWeight = 0;
        for (var index = 0; index < all.length; index++) {
            var element = all[index];
            totalWeight += element.SpawnWeight;
        }
        //从小到大添加生成概率区间
        var addedProbability = 0;
        for (var index = 0; index < all.length; index++) {
            var element = all[index];
            var spawnProb = new PropSpawnWeight();
            spawnProb.Config = element;
            var prob = element.SpawnWeight / totalWeight;
            spawnProb.ProbabilityRange = addedProbability + prob;
            addedProbability += prob;
            this.PropSpawnProbability.push(spawnProb);
        }
        return this.PropSpawnProbability;
    };
    ConfigManager.prototype.GetFormulaConfig = function (id) {
        return this.byteTables.GetConfigByID(id, FormulaConfigConfigData);
    };
    ConfigManager.prototype.GetGoldUpgradeConfig = function () {
        return this.byteTables.GetConfigByID(1, GoldUpgradeConfigConfigData);
    };
    ConfigManager.prototype.GetConstConfig = function (constType) {
        return this.byteTables.GetConfigByID(constType, ConstConfigConfigData);
    };
    ConfigManager.prototype.GetPhoneVerifyErrorMessageConfig = function (id) {
        return this.byteTables.GetConfigByID(id, PhoneVerifyErrorMessageConfigData);
    };
    ConfigManager.prototype.GetLotteryRewardConfig = function (id) {
        return this.byteTables.GetConfigByID(id, LotteryRewardConfigConfigData);
    };
    ConfigManager.prototype.GetOtherConfig = function (id) {
        return this.byteTables.GetConfigByID(id, OtherConfigData);
    };
    ConfigManager.prototype.InitMainWeaponEvolutionConfig = function () {
        var allConfig = this.byteTables.GetAll(MainWeaponEvolutionConfigConfigData);
        this.mainWeaponEvloveConfigList = [null];
        var bulletNumCount = 0;
        for (var index = 0; index < allConfig.length; index++) {
            var config = allConfig[index];
            bulletNumCount += config.IncreBulletNumber;
            var weaponConfig = new MainWeaponEvloveConfig();
            weaponConfig.ID = config.GetID();
            weaponConfig.IconPath = config.IconPath;
            weaponConfig.RequiredPowerLvl = config.RequiredPowerLvl;
            weaponConfig.RequiredGoldNumber = config.ID * config.GoldCoefficient;
            weaponConfig.BulletNumber = bulletNumCount;
            weaponConfig.WeaponName = config.WeaponName;
            if (weaponConfig.ID != this.mainWeaponEvloveConfigList.length) {
                Log.Error("主武器进阶配置表的id不连续");
            }
            this.mainWeaponEvloveConfigList.push(weaponConfig);
        }
    };
    //获取主武器升级配置
    ConfigManager.prototype.GetMainWeaponEvolutionConfig = function (lvlId) {
        if (lvlId > 0 && lvlId < this.mainWeaponEvloveConfigList.length) {
            return this.mainWeaponEvloveConfigList[lvlId];
        }
        Log.Error("查询的主武器进阶等级%i 不在配置表中", lvlId);
        lvlId = lvlId > 0 ? Math.min(lvlId, this.mainWeaponEvloveConfigList.length - 1) : 1;
        return this.mainWeaponEvloveConfigList[lvlId];
    };
    //判断当前进阶等级是否是最大进阶等级
    ConfigManager.prototype.IsMaxMainWeaponEvolutionLevel = function (lvlId) {
        return lvlId >= this.mainWeaponEvloveConfigList.length - 1;
    };
    //最大进阶等级
    ConfigManager.prototype.GetMaxMainWeaponEvolutionLevel = function () {
        return this.mainWeaponEvloveConfigList[this.mainWeaponEvloveConfigList.length - 1].ID;
    };
    //获取关卡模板信息
    ConfigManager.prototype.GetLevelTemplateConfig = function (templateId) {
        return this.byteTables.GetConfigByID(templateId, LevelTemplateConfigConfigData);
    };
    //获取关卡刷怪信息
    ConfigManager.prototype.GetLevelBrushConfig = function (brushId) {
        return this.byteTables.GetConfigByID(brushId, LevelBrushConfigConfigData);
    };
    return ConfigManager;
}());
ConfigManager._Instance = null;
//# sourceMappingURL=ConfigManager.js.map