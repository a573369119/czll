/*
* 预加载配置, 图集, 天空盒
*/
class PreloadCommand extends puremvc.SimpleCommand {
    execute(notification: puremvc.INotification) {
        Log.Debug("3. preload")
        TimeWatch.Start();
        super.execute(notification);

        //1. 初始化共用图集
        ui.UIMediator.GetInstance().Init(() => {
            let toloadItem: any[] = [];
            //加载配置
            let configToloadItem: any[] = [];
            ConfigManager.GetInstance().getConfig(configToloadItem);//配置表
            ResourceManager.GetInstance().loadResArray(configToloadItem, () => this.onConfigLoaded(), configToloadItem[0].type);
        })
    }

    //初始化配置, 打开Loading
    onConfigLoaded() {
        Log.Debug("on config loade")
        //配置表初始化
        this.initConfiguration();
        if (ConstDefine.USE_MODIFY) {
            this.sendNotification(NotificationNames.OPENUIWITHPARAM, new ui.UIParamStruct(ui.UIID.LoadingUIID, this.onLoadingUIOpend.bind(this)))
        } else {
            this.onLoadingUIOpend();
        }
    }

    //先加载图集,再加载spine否则同时加载图集和加载spine动画, 会导致spine的图片加载失败.
    private onLoadingUIOpend() {
        let progress1 = 0;
        //UI加载
        let toloadItem: any[] = [];
        ui.UIMediator.GetInstance().GetResItem(toloadItem)//需要统一加载的UI图集:非共用图集
        ResourceManager.GetInstance().loadResArray(toloadItem, this.AtlasLoaded.bind(this), null,
            (progress) => {
                progress1 = progress;
                Facade.instance.sendNotification(NotificationNames.LoadingUI_Progress, (progress1) / 2)
            });
    }
    //加载spine和音频资源
    private AtlasLoaded() {
        Log.Debug("on atlas loaded")
        let progress2 = 0;

        if (ConstDefine.USE_MODIFY) {
            //spine
            MatchSpineManager.Instance.PreloadAll(this.onLoaded.bind(this),
                (progress) => {
                    progress2 = progress;
                    Facade.instance.sendNotification(NotificationNames.LoadingUI_Progress, 0.5 + (progress2) / 2)
                })
        } else {
            this.onLoaded();
        }


        //音频
        if (ConstDefine.USE_MODIFY) {
            this.initSoundRes(this.onLoaded.bind(this))
        } else {
            this.initSoundRes(() => { });
            this.onLoaded();
        }
    }

    private step: number = 0;
    //初始化
    onLoaded(): void {
        Log.Debug("on spine or sound loaded")
        this.step++;
        if (this.step < 2) return;
        this.next();
    }

    private next() {
        TimeWatch.Stop("preloaded ok");
        this.facade.registerCommand(NotificationNames.GAME_INIT_COMMAND, GameInitCommand);
        this.facade.sendNotification(NotificationNames.GAME_INIT_COMMAND)
    }

    //初始化配置表
    initConfiguration() {
        ConfigManager.GetInstance().InitOnLoaded();//配置初始化
        ui.LanguageManager.GetInstance().ChangeLanguage(ui.LanguageEnum.CHN)//初始化本地语言选择
        this.initGameConst();
    }
    //根据配置表初始化游戏常量配置
    initGameConst() {
        //金币buff
        let goldBuffConfig = ConfigManager.GetInstance().GetBuffConfig(EnumBuffType.Gold)
        ConstDefine.GOLD_BUFF_REWARD_SCALE = goldBuffConfig ? goldBuffConfig.Param1 : 1;
        //巨化buff
        let enlargeBuffConfig = ConfigManager.GetInstance().GetBuffConfig(EnumBuffType.Enlarge)
        ConstDefine.ENLARGE_BUFF_SCALE = enlargeBuffConfig ? enlargeBuffConfig.Param1 : 1;
    }

    //初始化声音对象池
    initSoundRes(onComplete: Function) {
        let allconfigs = ConfigManager.GetInstance().GetAllAudioConfig()
        let urls = [];
        let nums = [];
        for (let index = 0; index < allconfigs.length; index++) {
            let config = allconfigs[index];
            urls.push(config.URL)
            nums.push(config.PoolSize)
        }

        if (CommonUtil.OnMiniGame()) {
            AudioManager.GetInstance().InitWxSoundPool(urls, nums)
            onComplete();
        } else {
            Log.Debug("start loade sound coutn: " + urls.length)
            ResourceManager.GetInstance().loadResArray(urls, () => {
                onComplete();
            }, Laya.Loader.SOUND)
        }
    }

}