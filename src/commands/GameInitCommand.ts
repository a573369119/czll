/*
* 游戏初始化
*/
class GameInitCommand extends puremvc.SimpleCommand {

    execute(notification: puremvc.INotification) {
        Log.Debug("4. Game Init")
        TimeWatch.Start();

        GameDataManager.getInstance().init();//数据初始化, 下面的3dscene会初始化sceneInfo
        this.initTimerManager();//初始化时间管理器
        this.initCommands();//command初始化
        // this.initConfiguration();//配置表初始化
        this.initGameSettings();//初始化游戏设置
        this.initDebugMode();   //初始化调试模式
        // this.initSoundRes(() => { })
        this.next();
    }

    initTimerManager() {

        Laya.timer.frameLoop(1, null, () => {
            // let randomOffset = Math.random()
            // if(randomOffset < 0.5) return;
            TimeManager.getInst().update(Laya.timer.delta * 0.001)
        })//Timer
    }

    initCommands() {
        Facade.instance.registerCommand(NotificationNames.ENTER_LOGIN_SCENE_COMMAND, LoginSceneEnterCommand);
        Facade.instance.registerCommand(NotificationNames.EXIT_LOGIN_SCENE_COMMAND, LoginSceneExitCommand);
        Facade.instance.registerCommand(NotificationNames.MATCH_RES_PRELOAD_COMMAND, MatchResPreloadCommand);
        Facade.instance.registerCommand(NotificationNames.MATCH_ENTER_COMMAND, MatchEnterCommand);
        Facade.instance.registerCommand(NotificationNames.MATCH_EXIT_COMMAND, MatchExitCommand);
    }




    initGameSettings() {
        // //初始化游戏设置
        // AudioManager.GetInstance().InitAudioSetting();  //音乐相关初始化
    }

    initDebugMode() {
        if (!CommonUtil.OnMiniGame()) {
            //Laya.DebugPanel.init();
        }
    }


    private next() {
        TimeWatch.Stop("gameinit ok");
        // this.facade.registerCommand(NotificationNames.INIT_PLATFORM_INFO_COMMAND, InitPlatfromInfoCommand);
        // this.facade.sendNotification(NotificationNames.INIT_PLATFORM_INFO_COMMAND)

        //检测平台授权
        this.facade.registerCommand(NotificationNames.INIT_PLATFORM_INFO_COMMAND, InitPlatfromInfoCommand);
        WechatFuncManager.Instance.CheckUserInfoAuth(
            (hasAuth) => {
                if (hasAuth || !CommonUtil.OnMiniGame()) {
                    //已经授权 或 不在微信小游戏平台 不需要授权
                    // Facade.getInstance().sendNotification(NotificationNames.HIDEUI, ui.UIID.LoadingUIID)//关闭loading
                    Facade.getInstance().sendNotification(NotificationNames.INIT_PLATFORM_INFO_COMMAND, true)
                } else {
                    //没有授权
                    this.facade.registerCommand(NotificationNames.GET_PLATFORM_AUTH_COMMAND, PlatformAuthSceneCommand);
                    Facade.getInstance().sendNotification(NotificationNames.GET_PLATFORM_AUTH_COMMAND)
                }
            })
    }
}