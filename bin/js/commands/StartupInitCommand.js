var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*
* 游戏最开始的初始化, 比如wx需要注册onshow/onhide事件等
*/
var StartupInitCommand = (function (_super) {
    __extends(StartupInitCommand, _super);
    function StartupInitCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StartupInitCommand.prototype.execute = function (notification) {
        this.initGameEnging(1080, 1920);
        this.initScreenMode(Laya.Stage.SCALE_FIXED_AUTO); //Laya.Stage.SCALE_FIXED_WIDTH
        Log.Debug("1. StartupInitCommand");
        TimeWatch.Start();
        //开启统计信息
        Laya.Stat.show();
        // Laya.DebugPanel.init();
        this.initOnStartup();
        this.next();
    };
    StartupInitCommand.prototype.initGameEnging = function (designWith, designheight) {
        Laya.MiniAdpter.init(true, false);
        Laya.MiniAdpter.nativefiles = ["wxlocal", "res/audio"]; //微信本地目录, 音效文件微信本地加载
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
    };
    StartupInitCommand.prototype.initScreenMode = function (mode) {
        //适配模式
        Laya.stage.screenMode = Laya.Stage.SCREEN_NONE;
        Laya.stage.alignV = Laya.Stage.ALIGN_MIDDLE;
        Laya.stage.alignH = Laya.Stage.ALIGN_CENTER;
        Laya.stage.scaleMode = mode;
        //监听自适应
        // Laya.stage.event()
    };
    /**
     * 启动时候的初始化
     */
    StartupInitCommand.prototype.initOnStartup = function () {
        WechatFuncManager.Instance.InitWeChatShare(this.onWechatShow.bind(this));
        WechatFuncManager.Instance.RegOnHide(this.onHide.bind(this));
        WechatFuncManager.Instance.RegOnShow(this.onShow.bind(this));
        WechatFuncManager.Instance.RegOnKeyboardComplete(this.onKeyboardComplete.bind(this));
        WechatFuncManager.Instance.RegOnKeyboardConfirm(this.onKeyboardConfirm.bind(this));
        WechatFuncManager.Instance.RegVideoAd(cbhandler.gen_handler(this.onVideoAdLoadSuccess, this), cbhandler.gen_handler(this.onVideoAdLoadFail, this), cbhandler.gen_handler(this.onVideoClose, this));
    };
    StartupInitCommand.prototype.next = function () {
        TimeWatch.Stop("startupu init ok");
        this.facade.registerCommand(NotificationNames.CHECK_VERSION_COMMAND, CheckVersionControlCommand);
        this.facade.sendNotification(NotificationNames.CHECK_VERSION_COMMAND);
    };
    //////////////////////////////////////////////////////
    //微信启动注册回调
    StartupInitCommand.prototype.onWechatShow = function (options) {
        Log.Debug("InitWeChat注册的onshow 回调");
        if (options.query) {
            var shareOpenID = options.query[WechatConstDefine.LOGIN_QUERY_KEY];
            if (shareOpenID) {
                Log.Debug("query LOGIN_QUERY_KEY value:" + shareOpenID);
                GameDataManager.ShareQueryData.LoginQuery = shareOpenID;
            }
            var shareRoomID = options.query[WechatConstDefine.SHARE_ROOM_ID];
            if (shareRoomID) {
                Log.Debug("query SHARE_ROOM_ID value:" + shareRoomID);
                GameDataManager.ShareQueryData.ShareRoomID = shareRoomID;
            }
            var shareSceneID = options.query[WechatConstDefine.SHARE_SCENE_ID];
            if (shareSceneID) {
                Log.Debug("query SHARE_SCENE_ID value:" + shareSceneID);
                GameDataManager.ShareQueryData.ShareRoomSceneID = shareSceneID;
            }
            var sharePlayerID = options.query[WechatConstDefine.SHARE_PLAYER_ID];
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
            var enterScene = options.scene;
            Log.Debug("enterScene: " + options.scene);
            if (enterScene == EnumWechatEnterScene.ShareFromFriend ||
                enterScene == EnumWechatEnterScene.ShareFromGroup ||
                enterScene == EnumWechatEnterScene.ShareFromGroupWithShareTicket) {
                //点击链接进入, 同时游戏已经初始化, 同时非分享后前后台切换回来
                if (shareRoomID && shareSceneID && sharePlayerID && LoginSceneEnterCommand.BeenEntered)
                    WechatFuncManager.Instance.CheckLoginQuery();
            }
            if (LoginSceneEnterCommand.BeenEntered) {
                NetworkHeartBeat.GetInstance().Start();
                AudioManager.GetInstance().RePlayCurMusic();
            }
        }
    };
    StartupInitCommand.prototype.onHide = function () {
        Log.Debug("程序启动时候注册的onhide 回调");
        if (!ConstDefine.HTTP_LOGIN)
            NetworkHeartBeat.GetInstance().Stop();
        // //wxbSDK 隐藏统计
        // WxbSDKUtil.Hide();
        // AudioManager.GetInstance().StopMusic();
        this.pause(true);
    };
    StartupInitCommand.prototype.onShow = function () {
        this.pause(false);
    };
    StartupInitCommand.prototype.onKeyboardComplete = function (value) {
        Facade.instance.sendNotification(NotificationNames.WeChat_OnKeyboardComplete, value);
    };
    StartupInitCommand.prototype.onKeyboardConfirm = function (value) {
        Facade.instance.sendNotification(NotificationNames.WeChat_OnKeyboardConfirm, value);
    };
    StartupInitCommand.prototype.onVideoAdLoadSuccess = function () {
        //加载视频成功
        Facade.instance.sendNotification(NotificationNames.WeChat_VideoAd_Load_Success);
    };
    StartupInitCommand.prototype.onVideoAdLoadFail = function () {
        //加载视频失败
        Facade.instance.sendNotification(NotificationNames.WeChat_VideoAd_Load_Fail);
    };
    StartupInitCommand.prototype.onVideoClose = function (isEnded) {
        //关闭视频，true为正常播放，false为中途退出
        Facade.instance.sendNotification(NotificationNames.WeChat_VideoAd_OnClose, isEnded);
        this.pause(false);
    };
    StartupInitCommand.prototype.pause = function (isPause) {
        if (!GameDataManager.getInstance().MatchInfo)
            return;
        if (isPause) {
            if (!GameDataManager.getInstance().MatchInfo.IsGameEnd()) {
                this.sendNotification(NotificationNames.PAUSE_MATCH, true);
                this.sendNotification(NotificationNames.BackgroundUI_BgMoveEnd);
            }
        }
        else {
            if (!GameDataManager.getInstance().MatchInfo.IsGameEnd()) {
                this.sendNotification(NotificationNames.PAUSE_MATCH, false);
                this.sendNotification(NotificationNames.BackgroundUI_BgMoveStart);
            }
        }
    };
    return StartupInitCommand;
}(puremvc.SimpleCommand));
//# sourceMappingURL=StartupInitCommand.js.map