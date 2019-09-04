
/*
* 游戏配置管理
*/
enum ConfigTypeEnum {
    SoundConfig = 1,
    UIConfig = 2,
    LocalizationConfig = 3,
    LevelConfig = 4,
    MonsterConfig = 5,
    PlayerConfig = 6,
    SkillConfig = 7,
    WeaponConfig = 8,
    SpineConfig = 9,
    BulletConfig = 10,
    BuffConfig = 11,
    PropConfig = 12,
    FormulaConfig = 13,
    GoldUpgradeConfig = 14,
    MainWeaponEvolutionConfig = 15,
    LevelTemplateConfig = 16,
    LevelBrushConfig = 17,
    ConstConfig = 18,
    PhoneVerifyErrorMessage = 19,
    LotteryRewardConfig = 20,
    OtherConfigData = 21
}


class ConfigManager {
    private static _Instance = null;
    private m_LoadItem = [];
    private shareconfig: HttpShareConfig;
    private byteTables: ByteTableManager = new ByteTableManager();

    public static GetInstance(): ConfigManager {
        if (ConfigManager._Instance == null) {
            ConfigManager._Instance = new ConfigManager();
        }
        return ConfigManager._Instance;
    }

    public getConfig(arrItem): void {
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
            ]
        for (let i: number = 0; i < this.m_LoadItem.length; i++) {
            arrItem.push(this.m_LoadItem[i]);
        }
    }

    public InitOnLoaded(): void {
        for (let i: number = 0; i < this.m_LoadItem.length; i++) {
            let pData = ResourceManager.GetInstance().getRes(this.m_LoadItem[i].url);
            if (pData != null) {
                switch (this.m_LoadItem[i].CType) {
                    case ConfigTypeEnum.LocalizationConfig:
                        {
                            // LocalizationConfigDataManager.Init(pData.configData); //语言表
                            this.byteTables.OnTableLoaded<LocalizationConfigData>(LocalizationConfigData, pData);
                            break;
                        }
                    case ConfigTypeEnum.UIConfig:
                        {
                            //UIInfoConfigDataManager.Init(pData.configData);
                            this.byteTables.OnTableLoaded<UIInfoConfigData>(UIInfoConfigData, pData);
                            break;
                        }
                    case ConfigTypeEnum.SoundConfig:
                        {
                            //SoundConfigConfigDataManager.Init(pData.configData)
                            this.byteTables.OnTableLoaded<SoundConfigConfigData>(SoundConfigConfigData, pData);
                            break;
                        }
                    case ConfigTypeEnum.LevelConfig:
                        {
                            this.byteTables.OnTableLoaded<LevelConfigConfigData>(LevelConfigConfigData, pData);

                            break;
                        }
                    case ConfigTypeEnum.MonsterConfig:
                        {
                            this.byteTables.OnTableLoaded<MonsterConfigConfigData>(MonsterConfigConfigData, pData);
                            break;
                        }
                    case ConfigTypeEnum.PlayerConfig:
                        {
                            this.byteTables.OnTableLoaded<PlayerConfigConfigData>(PlayerConfigConfigData, pData);
                            break;
                        }
                    case ConfigTypeEnum.SkillConfig:
                        {
                            this.byteTables.OnTableLoaded<SkillConfigConfigData>(SkillConfigConfigData, pData);
                            break;
                        }
                    case ConfigTypeEnum.WeaponConfig:
                        {
                            this.byteTables.OnTableLoaded<WeaponConfigConfigData>(WeaponConfigConfigData, pData);
                            break;
                        }
                    case ConfigTypeEnum.SpineConfig:
                        {
                            this.byteTables.OnTableLoaded<SpineConfigConfigData>(SpineConfigConfigData, pData);
                            break;
                        }
                    case ConfigTypeEnum.BulletConfig:
                        {
                            this.byteTables.OnTableLoaded<BulletConfigConfigData>(BulletConfigConfigData, pData);
                            break;
                        }
                    case ConfigTypeEnum.BuffConfig:
                        {
                            this.byteTables.OnTableLoaded<BuffConfigConfigData>(BuffConfigConfigData, pData);
                            break;
                        }
                    case ConfigTypeEnum.PropConfig:
                        {
                            this.byteTables.OnTableLoaded<PropConfigConfigData>(PropConfigConfigData, pData);
                            break;
                        }
                    case ConfigTypeEnum.FormulaConfig:
                        {
                            this.byteTables.OnTableLoaded<FormulaConfigConfigData>(FormulaConfigConfigData, pData);
                            break;
                        }
                    case ConfigTypeEnum.MainWeaponEvolutionConfig:
                        {
                            this.byteTables.OnTableLoaded<MainWeaponEvolutionConfigConfigData>(MainWeaponEvolutionConfigConfigData, pData);
                            this.InitMainWeaponEvolutionConfig();
                            break;
                        }
                    case ConfigTypeEnum.LevelBrushConfig:
                        {
                            this.byteTables.OnTableLoaded<LevelBrushConfigConfigData>(LevelBrushConfigConfigData, pData);
                            break;
                        }
                    case ConfigTypeEnum.LevelTemplateConfig:
                        {
                            this.byteTables.OnTableLoaded<LevelTemplateConfigConfigData>(LevelTemplateConfigConfigData, pData);
                            this.InitMainWeaponEvolutionConfig();
                            break;
                        }
                    case ConfigTypeEnum.GoldUpgradeConfig:
                        {
                            this.byteTables.OnTableLoaded<GoldUpgradeConfigConfigData>(GoldUpgradeConfigConfigData, pData);
                            break;
                        }
                    case ConfigTypeEnum.ConstConfig:
                        {
                            this.byteTables.OnTableLoaded<ConstConfigConfigData>(ConstConfigConfigData, pData);
                            break;
                        }
                    case ConfigTypeEnum.PhoneVerifyErrorMessage:
                        {
                            this.byteTables.OnTableLoaded<PhoneVerifyErrorMessageConfigData>(PhoneVerifyErrorMessageConfigData, pData);
                            break;
                        }
                    case ConfigTypeEnum.LotteryRewardConfig:
                        {
                            this.byteTables.OnTableLoaded<LotteryRewardConfigConfigData>(LotteryRewardConfigConfigData, pData);
                            break;
                        }
                    case ConfigTypeEnum.OtherConfigData:
                        {
                            this.byteTables.OnTableLoaded<OtherConfigData>(OtherConfigData, pData);
                            break;
                        }
                }
            }
            ResourceManager.GetInstance().release(this.m_LoadItem[i].url); //加载完成卸载
        }
    }


    /**
     * 根据UIID Enum读取对应的UIConfig
     * @param uiid 
     */
    private GetConfigDataByUIID(uiid: ui.UIID): UIInfoConfigData {
        let uiList = this.byteTables.GetAll<UIInfoConfigData>(UIInfoConfigData);
        let config: UIInfoConfigData = null;
        uiList.forEach(element => {
            if (ui.UIID[element.UIID] == uiid) {
                config = element;
            }
        });
        return config;
    }


    //获取ui配置
    public GetUIConfig(uiid: ui.UIID): UIInfoConfigData {
        let config = this.GetConfigDataByUIID(uiid);//  UIInfoConfigDataManager.GetConfigDataByUIID(uiid);
        if (config) return config;
        //Log.Error("ui配置不存在, uiid:" + uiid)
        return null
    }

    //语言表
    public GetLocalizationConfig(id: number): LocalizationConfigData {
        return this.byteTables.GetConfigByID<LocalizationConfigData>(id, LocalizationConfigData);;//LocalizationConfigDataManager.GetConfigData(id)
    }

    //声音配置
    public GetAudioConfig(id: number): SoundConfigConfigData {
        return this.byteTables.GetConfigByID<SoundConfigConfigData>(id, SoundConfigConfigData);//SoundConfigConfigDataManager.GetConfigData(id);
    }
    public GetAllAudioConfig(): SoundConfigConfigData[] {
        return this.byteTables.GetAll<SoundConfigConfigData>(SoundConfigConfigData);
    }

    public SetShareConfig(config: HttpShareConfig) {
        this.shareconfig = config;
    }

    public GetShareConfig(): HttpShareConfig {
        return this.shareconfig;
    }


    //获取对应的关卡区间配置
    public GetLevelConfig(levelId: number): LevelConfigConfigData {
        let allConfig = this.byteTables.GetAll<LevelConfigConfigData>(LevelConfigConfigData);
        for (let index = 0; index < allConfig.length; index++) {
            let config = allConfig[index];
            if (config.ID < levelId) continue;
            return config;
        }
        return null;
    }

    //获取关卡最大数量
    public GetLevelMax(): number {
        let allConfig = this.byteTables.GetAll<LevelConfigConfigData>(LevelConfigConfigData);
        let maxLevel = 0;
        for (var i = 0; i < allConfig.length; i++) {
            var element = allConfig[i];
            if (maxLevel < element.ID) {
                maxLevel = element.ID;
            }
        }
        return maxLevel;
    }

    //最大关卡
    public GetMaxLevelID(): number {
        let maxId = 0;
        let allConfig = this.byteTables.GetAll<LevelConfigConfigData>(LevelConfigConfigData);
        for (let index = 0; index < allConfig.length; index++) {
            let config = allConfig[index];
            if (config.ID > maxId) maxId = config.ID;
        }
        return maxId;
    }

    public GetMonsterConfig(id: number): MonsterConfigConfigData {
        return this.byteTables.GetConfigByID<MonsterConfigConfigData>(id, MonsterConfigConfigData);
    }

    public GetAllMonsterConfig(): Array<MonsterConfigConfigData> {
        return this.byteTables.GetAll<MonsterConfigConfigData>(MonsterConfigConfigData);
    }

    public GetMainPlayerConfig(): PlayerConfigConfigData {
        return this.GetPlayerConfig(ConstDefine.MAIN_PLAYRE_CONFIG_ID);
    }

    private GetPlayerConfig(id: number): PlayerConfigConfigData {
        return this.byteTables.GetConfigByID<PlayerConfigConfigData>(id, PlayerConfigConfigData);
    }

    public GetSkillConfig(id: number): SkillConfigConfigData {
        return this.byteTables.GetConfigByID<SkillConfigConfigData>(id, SkillConfigConfigData);
    }

    public GetAllSkillConfig(): Array<SkillConfigConfigData> {
        return this.byteTables.GetAll<SkillConfigConfigData>(SkillConfigConfigData);
    }

    public GetWeaponConfig(id: number): WeaponConfigConfigData {
        return this.byteTables.GetConfigByID<WeaponConfigConfigData>(id, WeaponConfigConfigData);
    }

    public GetAllWeaponConfig(): Array<WeaponConfigConfigData> {
        return this.byteTables.GetAll<WeaponConfigConfigData>(WeaponConfigConfigData);
    }

    public GetSpineConfig(id: number): SpineConfigConfigData {
        return this.byteTables.GetConfigByID<SpineConfigConfigData>(id, SpineConfigConfigData);
    }

    public GetBulletConfig(id: number): BulletConfigConfigData {
        return this.byteTables.GetConfigByID<BulletConfigConfigData>(id, BulletConfigConfigData);
    }
    public GetBuffConfig(id: number): BuffConfigConfigData {
        return this.byteTables.GetConfigByID<BuffConfigConfigData>(id, BuffConfigConfigData);
    }
    public GetPropConfig(id: number): PropConfigConfigData {
        return this.byteTables.GetConfigByID<PropConfigConfigData>(id, PropConfigConfigData);
    }

    //获取道具的生产概率
    private PropSpawnProbability: PropSpawnWeight[] = null;
    public GetPropSpawnWeight(): PropSpawnWeight[] {
        if (this.PropSpawnProbability) return this.PropSpawnProbability;

        this.PropSpawnProbability = [];
        let all = this.byteTables.GetAll<PropConfigConfigData>(PropConfigConfigData);
        let totalWeight = 0;
        for (let index = 0; index < all.length; index++) {
            let element = all[index] as PropConfigConfigData;
            totalWeight += element.SpawnWeight;
        }
        //从小到大添加生成概率区间
        let addedProbability = 0;
        for (let index = 0; index < all.length; index++) {
            let element = all[index];
            let spawnProb = new PropSpawnWeight();
            spawnProb.Config = element;
            let prob = element.SpawnWeight / totalWeight
            spawnProb.ProbabilityRange = addedProbability + prob;
            addedProbability += prob;

            this.PropSpawnProbability.push(spawnProb)
        }

        return this.PropSpawnProbability;
    }

    public GetFormulaConfig(id: number): FormulaConfigConfigData {
        return this.byteTables.GetConfigByID<FormulaConfigConfigData>(id, FormulaConfigConfigData);
    }

    public GetGoldUpgradeConfig(): GoldUpgradeConfigConfigData {
        return this.byteTables.GetConfigByID<GoldUpgradeConfigConfigData>(1, GoldUpgradeConfigConfigData);
    }

    public GetConstConfig(constType: EnumConstConfigType) {
        return this.byteTables.GetConfigByID<ConstConfigConfigData>(constType, ConstConfigConfigData);
    }
    public GetPhoneVerifyErrorMessageConfig(id: number) {
        return this.byteTables.GetConfigByID<PhoneVerifyErrorMessageConfigData>(id, PhoneVerifyErrorMessageConfigData);
    }
    public GetLotteryRewardConfig(id: number) {
        return this.byteTables.GetConfigByID<LotteryRewardConfigConfigData>(id, LotteryRewardConfigConfigData);
    }
    public GetOtherConfig(id: number) {
        return this.byteTables.GetConfigByID<OtherConfigData>(id, OtherConfigData);
    }

    //初始化主武器进阶表
    private mainWeaponEvloveConfigList: MainWeaponEvloveConfig[] = null;
    public InitMainWeaponEvolutionConfig() {
        let allConfig = this.byteTables.GetAll<MainWeaponEvolutionConfigConfigData>(MainWeaponEvolutionConfigConfigData);
        this.mainWeaponEvloveConfigList = [null];
        let bulletNumCount = 0;
        for (let index = 0; index < allConfig.length; index++) {
            let config = allConfig[index];
            bulletNumCount += config.IncreBulletNumber;
            let weaponConfig = new MainWeaponEvloveConfig();
            weaponConfig.ID = config.GetID();
            weaponConfig.IconPath = config.IconPath;
            weaponConfig.RequiredPowerLvl = config.RequiredPowerLvl;
            weaponConfig.RequiredGoldNumber = config.ID * config.GoldCoefficient;
            weaponConfig.BulletNumber = bulletNumCount;
            weaponConfig.WeaponName = config.WeaponName;

            if (weaponConfig.ID != this.mainWeaponEvloveConfigList.length) {
                Log.Error("主武器进阶配置表的id不连续")
            }
            this.mainWeaponEvloveConfigList.push(weaponConfig);
        }
    }
    //获取主武器升级配置
    public GetMainWeaponEvolutionConfig(lvlId: number): MainWeaponEvloveConfig {
        if (lvlId > 0 && lvlId < this.mainWeaponEvloveConfigList.length) {
            return this.mainWeaponEvloveConfigList[lvlId];
        }
        Log.Error("查询的主武器进阶等级%i 不在配置表中", lvlId)

        lvlId = lvlId > 0 ? Math.min(lvlId, this.mainWeaponEvloveConfigList.length - 1) : 1;
        return this.mainWeaponEvloveConfigList[lvlId];
    }
    //判断当前进阶等级是否是最大进阶等级
    public IsMaxMainWeaponEvolutionLevel(lvlId: number): boolean {
        return lvlId >= this.mainWeaponEvloveConfigList.length - 1;
    }
    //最大进阶等级
    public GetMaxMainWeaponEvolutionLevel(): number {
        return this.mainWeaponEvloveConfigList[this.mainWeaponEvloveConfigList.length - 1].ID;
    }

    //获取关卡模板信息
    public GetLevelTemplateConfig(templateId: number): LevelTemplateConfigConfigData {
        return this.byteTables.GetConfigByID<LevelTemplateConfigConfigData>(templateId, LevelTemplateConfigConfigData);
    }

    //获取关卡刷怪信息
    public GetLevelBrushConfig(brushId: number): LevelBrushConfigConfigData {
        return this.byteTables.GetConfigByID<LevelBrushConfigConfigData>(brushId, LevelBrushConfigConfigData);
    }

}