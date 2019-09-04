var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*
* 游戏初始化
*/
var GameInitCommand = (function (_super) {
    __extends(GameInitCommand, _super);
    function GameInitCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GameInitCommand.prototype.execute = function (notification) {
        Log.Debug("4. Game Init");
        TimeWatch.Start();
        GameDataManager.getInstance().init(); //数据初始化, 下面的3dscene会初始化sceneInfo
        this.initTimerManager(); //初始化时间管理器
        this.initCommands(); //command初始化
        // this.initConfiguration();//配置表初始化
        this.initGameSettings(); //初始化游戏设置
        this.initDebugMode(); //初始化调试模式
        // this.initSoundRes(() => { })
        this.next();
    };
    GameInitCommand.prototype.initTimerManager = function () {
        Laya.timer.frameLoop(1, null, function () {
            // let randomOffset = Math.random()
            // if(randomOffset < 0.5) return;
            TimeManager.getInst().update(Laya.timer.delta * 0.001);
        }); //Timer
    };
    GameInitCommand.prototype.initCommands = function () {
        Facade.instance.registerCommand(NotificationNames.ENTER_LOGIN_SCENE_COMMAND, LoginSceneEnterCommand);
        Facade.instance.registerCommand(NotificationNames.EXIT_LOGIN_SCENE_COMMAND, LoginSceneExitCommand);
        Facade.instance.registerCommand(NotificationNames.MATCH_RES_PRELOAD_COMMAND, MatchResPreloadCommand);
        Facade.instance.registerCommand(NotificationNames.MATCH_ENTER_COMMAND, MatchEnterCommand);
        Facade.instance.registerCommand(NotificationNames.MATCH_EXIT_COMMAND, MatchExitCommand);
    };
    GameInitCommand.prototype.initGameSettings = function () {
        // //初始化游戏设置
        // AudioManager.GetInstance().InitAudioSetting();  //音乐相关初始化
    };
    GameInitCommand.prototype.initDebugMode = function () {
        if (!CommonUtil.OnMiniGame()) {
        }
    };
    GameInitCommand.prototype.next = function () {
        var _this = this;
        TimeWatch.Stop("gameinit ok");
        // this.facade.registerCommand(NotificationNames.INIT_PLATFORM_INFO_COMMAND, InitPlatfromInfoCommand);
        // this.facade.sendNotification(NotificationNames.INIT_PLATFORM_INFO_COMMAND)
        //检测平台授权
        this.facade.registerCommand(NotificationNames.INIT_PLATFORM_INFO_COMMAND, InitPlatfromInfoCommand);
        WechatFuncManager.Instance.CheckUserInfoAuth(function (hasAuth) {
            if (hasAuth || !CommonUtil.OnMiniGame()) {
                //已经授权 或 不在微信小游戏平台 不需要授权
                // Facade.getInstance().sendNotification(NotificationNames.HIDEUI, ui.UIID.LoadingUIID)//关闭loading
                Facade.getInstance().sendNotification(NotificationNames.INIT_PLATFORM_INFO_COMMAND, true);
            }
            else {
                //没有授权
                _this.facade.registerCommand(NotificationNames.GET_PLATFORM_AUTH_COMMAND, PlatformAuthSceneCommand);
                Facade.getInstance().sendNotification(NotificationNames.GET_PLATFORM_AUTH_COMMAND);
            }
        });
    };
    return GameInitCommand;
}(puremvc.SimpleCommand));
//# sourceMappingURL=GameInitCommand.js.map