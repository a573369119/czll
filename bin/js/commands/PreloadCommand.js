var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*
* 预加载配置, 图集, 天空盒
*/
var PreloadCommand = (function (_super) {
    __extends(PreloadCommand, _super);
    function PreloadCommand() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.step = 0;
        return _this;
    }
    PreloadCommand.prototype.execute = function (notification) {
        var _this = this;
        Log.Debug("3. preload");
        TimeWatch.Start();
        _super.prototype.execute.call(this, notification);
        //1. 初始化共用图集
        ui.UIMediator.GetInstance().Init(function () {
            var toloadItem = [];
            //加载配置
            var configToloadItem = [];
            ConfigManager.GetInstance().getConfig(configToloadItem); //配置表
            ResourceManager.GetInstance().loadResArray(configToloadItem, function () { return _this.onConfigLoaded(); }, configToloadItem[0].type);
        });
    };
    //初始化配置, 打开Loading
    PreloadCommand.prototype.onConfigLoaded = function () {
        Log.Debug("on config loade");
        //配置表初始化
        this.initConfiguration();
        if (ConstDefine.USE_MODIFY) {
            this.sendNotification(NotificationNames.OPENUIWITHPARAM, new ui.UIParamStruct(ui.UIID.LoadingUIID, this.onLoadingUIOpend.bind(this)));
        }
        else {
            this.onLoadingUIOpend();
        }
    };
    //先加载图集,再加载spine否则同时加载图集和加载spine动画, 会导致spine的图片加载失败.
    PreloadCommand.prototype.onLoadingUIOpend = function () {
        var progress1 = 0;
        //UI加载
        var toloadItem = [];
        ui.UIMediator.GetInstance().GetResItem(toloadItem); //需要统一加载的UI图集:非共用图集
        ResourceManager.GetInstance().loadResArray(toloadItem, this.AtlasLoaded.bind(this), null, function (progress) {
            progress1 = progress;
            Facade.instance.sendNotification(NotificationNames.LoadingUI_Progress, (progress1) / 2);
        });
    };
    //加载spine和音频资源
    PreloadCommand.prototype.AtlasLoaded = function () {
        Log.Debug("on atlas loaded");
        var progress2 = 0;
        if (ConstDefine.USE_MODIFY) {
            //spine
            MatchSpineManager.Instance.PreloadAll(this.onLoaded.bind(this), function (progress) {
                progress2 = progress;
                Facade.instance.sendNotification(NotificationNames.LoadingUI_Progress, 0.5 + (progress2) / 2);
            });
        }
        else {
            this.onLoaded();
        }
        //音频
        if (ConstDefine.USE_MODIFY) {
            this.initSoundRes(this.onLoaded.bind(this));
        }
        else {
            this.initSoundRes(function () { });
            this.onLoaded();
        }
    };
    //初始化
    PreloadCommand.prototype.onLoaded = function () {
        Log.Debug("on spine or sound loaded");
        this.step++;
        if (this.step < 2)
            return;
        this.next();
    };
    PreloadCommand.prototype.next = function () {
        TimeWatch.Stop("preloaded ok");
        this.facade.registerCommand(NotificationNames.GAME_INIT_COMMAND, GameInitCommand);
        this.facade.sendNotification(NotificationNames.GAME_INIT_COMMAND);
    };
    //初始化配置表
    PreloadCommand.prototype.initConfiguration = function () {
        ConfigManager.GetInstance().InitOnLoaded(); //配置初始化
        ui.LanguageManager.GetInstance().ChangeLanguage(ui.LanguageEnum.CHN); //初始化本地语言选择
        this.initGameConst();
    };
    //根据配置表初始化游戏常量配置
    PreloadCommand.prototype.initGameConst = function () {
        //金币buff
        var goldBuffConfig = ConfigManager.GetInstance().GetBuffConfig(EnumBuffType.Gold);
        ConstDefine.GOLD_BUFF_REWARD_SCALE = goldBuffConfig ? goldBuffConfig.Param1 : 1;
        //巨化buff
        var enlargeBuffConfig = ConfigManager.GetInstance().GetBuffConfig(EnumBuffType.Enlarge);
        ConstDefine.ENLARGE_BUFF_SCALE = enlargeBuffConfig ? enlargeBuffConfig.Param1 : 1;
    };
    //初始化声音对象池
    PreloadCommand.prototype.initSoundRes = function (onComplete) {
        var allconfigs = ConfigManager.GetInstance().GetAllAudioConfig();
        var urls = [];
        var nums = [];
        for (var index = 0; index < allconfigs.length; index++) {
            var config = allconfigs[index];
            urls.push(config.URL);
            nums.push(config.PoolSize);
        }
        if (CommonUtil.OnMiniGame()) {
            AudioManager.GetInstance().InitWxSoundPool(urls, nums);
            onComplete();
        }
        else {
            Log.Debug("start loade sound coutn: " + urls.length);
            ResourceManager.GetInstance().loadResArray(urls, function () {
                onComplete();
            }, Laya.Loader.SOUND);
        }
    };
    return PreloadCommand;
}(puremvc.SimpleCommand));
//# sourceMappingURL=PreloadCommand.js.map