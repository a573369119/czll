var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*
* 网络游戏登录
*/
var NetworkGameLoginCommand = (function (_super) {
    __extends(NetworkGameLoginCommand, _super);
    function NetworkGameLoginCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NetworkGameLoginCommand.prototype.execute = function (notification) {
        Log.Debug("6. NetworkGameLoginCommand 网络游戏登录");
        TimeWatch.Start();
        if (ConstDefine.HTTP_LOGIN) {
            this.initHttpConnection();
        }
        else {
            this.initWebsocketConnection();
        }
    };
    //**网络初始化***********************************************************************/
    /**
     * 初始化http
     */
    NetworkGameLoginCommand.prototype.initHttpConnection = function () {
        if (ConstDefine.URL_MODE_FOR_TEST) {
            var Request = CommonUtil.GetRequest();
            var loginUrl = Request[ConstDefine.URL_MODE_KEY_LOGIN_URL];
            if (loginUrl)
                ConstDefine.HTTP_LOGIN_SERVER = loginUrl;
        }
        HttpNetworkManager.GetInstance().Init(ConstDefine.HTTP_LOGIN_SERVER, new MessageHandler());
        this.OnHttpInited(true, "");
    };
    /**
     * 初始化websocket
     */
    NetworkGameLoginCommand.prototype.initWebsocketConnection = function () {
        WebsocketNetworkManager.GetInstance().Init(ConstDefine.WS_LOGIN_SERVER, new MessageHandler());
        WebsocketNetworkManager.GetInstance().Connect(this.OnWebSocketInited.bind(this));
    };
    NetworkGameLoginCommand.prototype.OnWebSocketInited = function (active, msg) {
        if (active) {
            Log.Debug("连接websock成功");
            //初始化websocket消息发送
            WebsocketMessageSender.GetInstance().InitMessageSender(new SocketMessageSender());
            // //开始心跳
            NetworkHeartBeat.GetInstance().Init();
        }
        else {
            Log.Debug("连接websock 失败" + msg);
        }
        this.OnConnectionInited();
    };
    NetworkGameLoginCommand.prototype.OnHttpInited = function (active, msg) {
        //初始化http消息发送
        HttpMessageSender.GetInstance().InitMessageSender(ConstDefine.PLAYER_INFO_STORE_IN_LOCAL ? new HttpDummyMessageSender() : new HttpProtoMessageSender());
        this.OnConnectionInited();
    };
    //**end 网络初始化***********************************************************************/
    /**
     * 网络连接初始化完毕发送登录请求
     */
    NetworkGameLoginCommand.prototype.OnConnectionInited = function () {
        var _this = this;
        Log.Debug("进行网络服务器登录:");
        //如果头像有修改, 更新服务器头像信息
        var platformData = GameDataManager.getInstance().PlatformData;
        var wechatOpenID = platformData.OpenID;
        //2019-6-18 20:12:52 不再判断是否更改过，每次都发送，避免出现服务器清数据本地没有清而出现无头像和昵称的情况
        // let imageUrl = platformData.IsChanged ? platformData.UserHeader : null;
        // let nickname = platformData.IsChanged ? platformData.UserNickName : null;
        var imageUrl = platformData.UserHeader;
        var nickname = platformData.UserNickName;
        if (ConstDefine.HTTP_LOGIN) {
            // HttpMessageSender.GetSender().SendChooseServer(wechatOpenID,
            //     () => {
            HttpMessageSender.GetSender().SendLogin(wechatOpenID, imageUrl, nickname, function () {
                Log.Debug("http 登录成功 suceed openid", wechatOpenID, "imageUrl", imageUrl, "nickname", nickname);
            }, function (msg) {
                Log.Debug("http 登录失败 error:" + msg);
                // this.next();
                _this.onLoginError(platformData);
            });
        }
        else {
            WebsocketMessageSender.GetSender().SendLogin(wechatOpenID, imageUrl, nickname);
        }
    };
    /**
       * 登录失败, 使用自定义假玩家数据
       * @param platformData
       */
    NetworkGameLoginCommand.prototype.onLoginError = function (platformData) {
        //使用本地处理
        Log.Warn("登录服务器失败, 使用单机游戏模式 %s", ConstDefine.HTTP_LOGIN_SERVER);
        HttpMessageSender.GetInstance().InitMessageSender(new HttpDummyMessageSender());
        this.OnConnectionInited();
        // let playerInfo = CommonUtil.CreateOfflineDummyPlayerInfo();
        // // GameDataManager.getInstance().InitLoginPlayer(platformData.OpenID, playerInfo);
        // // GameDataManager.getInstance().GetLoginPlayerInfo().SetHeaderInfo(WechatFuncManager.Instance.GetHeaderUrl(), WechatFuncManager.Instance.GetNickName());//设置本地保存的头像信息
        // //将openID发送给子域
        // if (Laya.Browser.onWeiXin) {
        //     WechatUtil.wxPostMessage({
        //         cmd: OpenDataContextCmdDefine.OPENID,
        //         openid: platformData.OpenID
        //     });
        // }
        // this.next();
    };
    NetworkGameLoginCommand.prototype.next = function () {
        this.facade.sendNotification(NotificationNames.ENTER_LOGIN_SCENE_COMMAND, true);
    };
    return NetworkGameLoginCommand;
}(puremvc.SimpleCommand));
//# sourceMappingURL=NetworkGameLoginCommand.js.map