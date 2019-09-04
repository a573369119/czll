/*
* 游戏最开始的初始化, 比如wx需要注册onshow/onhide事件等
*/
class StartupInitCommand extends puremvc.SimpleCommand {
    execute(notification: puremvc.INotification) {
        this.initGameEnging(1080, 1920);
        this.initScreenMode(Laya.Stage.SCALE_FIXED_AUTO);  //Laya.Stage.SCALE_FIXED_WIDTH
        Log.Debug("1. StartupInitCommand")
        TimeWatch.Start();
        //开启统计信息
        Laya.Stat.show();
        // Laya.DebugPanel.init();
        this.initOnStartup();
        this.next();
    }

    private initGameEnging(designWith: number, designheight: number) {

        Laya.MiniAdpter.init(true, false);
        Laya.MiniAdpter.nativefiles = ["wxlocal", "res/audio"]//微信本地目录, 音效文件微信本地加载
        /**获取屏幕高度 */
        ConstDefine.setScreenHeight();
        //初始化引擎
        Laya.init(designWith, designheight, Laya.WebGL);
        //不自动图集合并
        Laya.AtlasResourceManager._disable();
        //Laya帧率
        Laya.stage.frameRate = Laya.Stage.FRAME_FAST;

        //层级管理因为这里要开始初始化UI了 所以层级管理提前 本来是要要和
        StageManager.GetInstance().init(); //初始化层级管理



    }

    private initScreenMode(mode: string) {
        //适配模式
        Laya.stage.screenMode = Laya.Stage.SCREEN_NONE;
        Laya.stage.alignV = Laya.Stage.ALIGN_MIDDLE;
        Laya.stage.alignH = Laya.Stage.ALIGN_CENTER;
        Laya.stage.scaleMode = mode;
        //监听自适应
        // Laya.stage.event()
    }

    /**
     * 启动时候的初始化
     */
    private initOnStartup() {
        WechatFuncManager.Instance.InitWeChatShare(this.onWechatShow.bind(this));
        WechatFuncManager.Instance.RegOnHide(this.onHide.bind(this))
        WechatFuncManager.Instance.RegOnShow(this.onShow.bind(this))
        WechatFuncManager.Instance.RegOnKeyboardComplete(this.onKeyboardComplete.bind(this));
        WechatFuncManager.Instance.RegOnKeyboardConfirm(this.onKeyboardConfirm.bind(this));
        WechatFuncManager.Instance.RegVideoAd(
            cbhandler.gen_handler(this.onVideoAdLoadSuccess, this),
            cbhandler.gen_handler(this.onVideoAdLoadFail, this),
            cbhandler.gen_handler(this.onVideoClose, this));
    }

    private next() {
        TimeWatch.Stop("startupu init ok");
        this.facade.registerCommand(NotificationNames.CHECK_VERSION_COMMAND, CheckVersionControlCommand);
        this.facade.sendNotification(NotificationNames.CHECK_VERSION_COMMAND)
    }

    //////////////////////////////////////////////////////
    //微信启动注册回调

    private onWechatShow(options) {
        Log.Debug("InitWeChat注册的onshow 回调")
        if (options.query) {
            let shareOpenID = options.query[WechatConstDefine.LOGIN_QUERY_KEY]
            if (shareOpenID) {
                Log.Debug("query LOGIN_QUERY_KEY value:" + shareOpenID);
                GameDataManager.ShareQueryData.LoginQuery = shareOpenID;
            }
            let shareRoomID = options.query[WechatConstDefine.SHARE_ROOM_ID]
            if (shareRoomID) {
                Log.Debug("query SHARE_ROOM_ID value:" + shareRoomID);
                GameDataManager.ShareQueryData.ShareRoomID = shareRoomID;
            }
            let shareSceneID = options.query[WechatConstDefine.SHARE_SCENE_ID]
            if (shareSceneID) {
                Log.Debug("query SHARE_SCENE_ID value:" + shareSceneID);
                GameDataManager.ShareQueryData.ShareRoomSceneID = shareSceneID;
            }
            let sharePlayerID = options.query[WechatConstDefine.SHARE_PLAYER_ID]
            if (sharePlayerID) {
                Log.Debug("query SHARE_PLAYER_ID value:" + sharePlayerID);
                GameDataManager.ShareQueryData.ShareRoomCreatorID = sharePlayerID;
            }
            // let shareWxbCID = options.query["wxb_cid"];
            // if(shareWxbCID) {
            //     Log.Debug("query WXB CID value:" + shareWxbCID);
            // }
            // let shareWxbLevel = options.query["wxb_level"];
            // if(shareWxbLevel) {
            //     Log.Debug("query WXB Level value:" + shareWxbLevel);
            // }

            let enterScene = options.scene;
            Log.Debug("enterScene: " + options.scene)
            if (enterScene == EnumWechatEnterScene.ShareFromFriend ||
                enterScene == EnumWechatEnterScene.ShareFromGroup ||
                enterScene == EnumWechatEnterScene.ShareFromGroupWithShareTicket) {
                //点击链接进入, 同时游戏已经初始化, 同时非分享后前后台切换回来
                if (shareRoomID && shareSceneID && sharePlayerID && LoginSceneEnterCommand.BeenEntered) WechatFuncManager.Instance.CheckLoginQuery()
            }

            if (LoginSceneEnterCommand.BeenEntered) {
                NetworkHeartBeat.GetInstance().Start();
                AudioManager.GetInstance().RePlayCurMusic();
            }
            // //wxbSDK 显示统计
            // WxbSDKUtil.Show();
            // //获取新的转跳数据
            // WxbGameSDKUtil.GetNavigateGameInfo((data)=>{
            //     Facade.instance.sendNotification(NotificationNames.HomepageUI_SetNavigateBtn,data);
            // });

        }
    }
    private onHide() {
        Log.Debug("程序启动时候注册的onhide 回调")
        if (!ConstDefine.HTTP_LOGIN) NetworkHeartBeat.GetInstance().Stop();
        // //wxbSDK 隐藏统计
        // WxbSDKUtil.Hide();
        // AudioManager.GetInstance().StopMusic();
        this.pause(true);

    }
    private onShow() {
        this.pause(false);
    }
    private onKeyboardComplete(value: string) {
        Facade.instance.sendNotification(NotificationNames.WeChat_OnKeyboardComplete, value);
    }
    private onKeyboardConfirm(value: string) {
        Facade.instance.sendNotification(NotificationNames.WeChat_OnKeyboardConfirm, value);
    }
    private onVideoAdLoadSuccess() {
        //加载视频成功
        Facade.instance.sendNotification(NotificationNames.WeChat_VideoAd_Load_Success);
    }
    private onVideoAdLoadFail() {
        //加载视频失败
        Facade.instance.sendNotification(NotificationNames.WeChat_VideoAd_Load_Fail);
    }
    private onVideoClose(isEnded: boolean) {
        //关闭视频，true为正常播放，false为中途退出
        Facade.instance.sendNotification(NotificationNames.WeChat_VideoAd_OnClose, isEnded);
        this.pause(false);
    }

    private pause(isPause) {
        if (!GameDataManager.getInstance().MatchInfo) return;
        if (isPause) {
            if (!GameDataManager.getInstance().MatchInfo.IsGameEnd()) {
                this.sendNotification(NotificationNames.PAUSE_MATCH, true);
                this.sendNotification(NotificationNames.BackgroundUI_BgMoveEnd);
                // MatchSpineManager.Instance.PauseMatch(true);
            }
        } else {
            if (!GameDataManager.getInstance().MatchInfo.IsGameEnd()) {
                this.sendNotification(NotificationNames.PAUSE_MATCH, false);
                this.sendNotification(NotificationNames.BackgroundUI_BgMoveStart);
                // MatchSpineManager.Instance.PauseMatch(false);
            }
        }
    }
}