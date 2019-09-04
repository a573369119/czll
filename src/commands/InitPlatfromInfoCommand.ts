/*
* 获取平台信息, 比如微信的头像, openid等
*/
class InitPlatfromInfoCommand extends puremvc.SimpleCommand {
    private wechatStepCount: number = 0;
    private wechatUserInfo: any
    private wechatOpenID: string;
    execute(notification: puremvc.INotification) {
        Log.Debug("5. InitPlatfromInfoCommand 已经获取授权, 开始获取平台信息")
        TimeWatch.Start();
        //获取平台[微信,fb]头像信息, uid信息
        // this.OnGetPlatformInfoCompleted();
        let authed = notification.getBody();

        this.wechatStepCount = 0; //完成2步: 获取头像, 获取openid后完成
        this.initHttpConnection();
        //获取微信头像信息
        WechatFuncManager.Instance.GetUserInfo(this.onGetUserInfoSuccess.bind(this), this.onGetuserInfoFail.bind(this))

        //微信:获取openid
        // WechatFuncManager.Instance.GetWechatOpenID(this.OnGetOpenID.bind(this));
        //2019-6-3 16:50:56 通过Proto获取OpenID
        WechatFuncManager.Instance.GetWechatOpenID(this.OnGetOpenIDByProto.bind(this));
    }

    private OnGetPlatformInfoCompleted() {
        // this.next();
        WechatFuncManager.Instance.GetWechatShareInfo(this.OnGetShareConfigInfo.bind(this));
    }

    private next() {
        TimeWatch.Stop("init platform Info ok");
        this.facade.registerCommand(NotificationNames.NETWORK_GAME_LOG_IN_COMMAND, NetworkGameLoginCommand);
        this.facade.sendNotification(NotificationNames.NETWORK_GAME_LOG_IN_COMMAND)
    }

    private initHttpConnection() {
        HttpNetworkManager.GetInstance().Init(ConstDefine.HTTP_LOGIN_SERVER, new MessageHandler())
        HttpMessageSender.GetInstance().InitMessageSender(ConstDefine.PLAYER_INFO_STORE_IN_LOCAL ? new HttpDummyMessageSender() : new HttpProtoMessageSender());
    }


    ///////////////////////////////////////////////////////////////////////////////////////
    ///获取平台信息

    /**
     * 获取微信玩家信息成功
     * @param userInfo 
     */
    private onGetUserInfoSuccess(userInfo) {
        this.wechatStepCount += 1;
        var nickName = userInfo.nickName
        var avatarUrl = userInfo.avatarUrl
        var gender = userInfo.gender //性别 0：未知、1：男、2：女
        var province = userInfo.province
        var city = userInfo.city
        var country = userInfo.country
        Log.Debug("获取微信头像: nickname " + nickName + " url:" + avatarUrl)
        GameDataManager.getInstance().PlatformData.UserHeader = userInfo.avatarUrl;
        GameDataManager.getInstance().PlatformData.UserNickName = userInfo.nickName;
        this.CheckWechatInfoComplete();
    }

    private onGetuserInfoFail(msg) {
        this.wechatStepCount += 1;
        Log.Warn("获取微信头像信息错误, get user info error:" + msg)
        GameDataManager.getInstance().PlatformData.UserHeader = null;
        GameDataManager.getInstance().PlatformData.UserNickName = null;
        this.CheckWechatInfoComplete();
    }

    private OnGetOpenID(openID: string) {
        this.wechatStepCount += 1;
        Log.Debug(openID ? ("获取到openId" + openID) : "获取openid为空")
        if (!openID) {
            if (CommonUtil.OnMiniGame()) {
                openID = "" + (new Date().getTime()) + "_" + Math.random()
                Log.Debug("微信上获取openid失败, 使用随机openid:" + openID)
            } else {
                //使用URL传入?openId=xxx&key2=value2
                if (ConstDefine.URL_MODE_FOR_TEST) {
                    let Request = CommonUtil.GetRequest();
                    let urlOpenId = Request[ConstDefine.URL_MODE_KEY_Player_OpenId];
                    if (urlOpenId) StorageManager.SetOpenID(urlOpenId);
                }

                openID = StorageManager.GetOpenID();//Laya.Browser.userAgent
                //测试用OpenID，有钻石
                // openID = null//"pc60.1836105588788779"// 
                if (!openID) {
                    openID = "pc6" + Math.random();
                    StorageManager.SetOpenID(openID)
                }
                Log.Debug("pc上测试, 使用固定openid:" + openID)

            }
            // //wxbSDK初始化统计
            // WxbSDKUtil.Launch();
        }

        GameDataManager.getInstance().PlatformData.OpenID = openID

        //将openID发送给子域
        if (CommonUtil.OnMiniGame()) {
            WechatUtil.wxPostMessage({
                cmd: OpenDataContextCmdDefine.OPENID,
                openid: openID
            });
        }

        this.CheckWechatInfoComplete();
    }

    //2019-6-3 16:38:31 通过proto获取到openid
    private OnGetOpenIDByProto() {
        this.wechatStepCount += 1;

        let openID = GameDataManager.getInstance().protoOpenId;
        Log.Debug(openID ? ("获取到openId" + openID) : "获取openid为空")
        if (!openID) {
            if (CommonUtil.OnMiniGame()) {
                openID = "" + (new Date().getTime()) + "_" + Math.random()
                Log.Debug("微信上获取openid失败, 使用随机openid:" + openID)
            } else {
                //使用URL传入?openId=xxx&key2=value2
                if (ConstDefine.URL_MODE_FOR_TEST) {
                    let Request = CommonUtil.GetRequest();
                    let urlOpenId = Request[ConstDefine.URL_MODE_KEY_Player_OpenId];
                    if (urlOpenId) StorageManager.SetOpenID(urlOpenId);
                }

                openID = StorageManager.GetOpenID();//Laya.Browser.userAgent
                //测试用OpenID，有钻石
                // openID = null//"pc60.1836105588788779"//
                // StorageManager.SetOpenID(openID)
                if (!openID) {
                    openID = "pc6" + Math.random();
                    StorageManager.SetOpenID(openID)
                }
                Log.Debug("pc上测试, 使用固定openid:" + openID)

            }
            // //wxbSDK初始化统计
            // WxbSDKUtil.Launch();
        }

        GameDataManager.getInstance().PlatformData.OpenID = openID
        //清空获得的内容
        GameDataManager.getInstance().protoOpenId = null;

        //将openID发送给子域
        if (CommonUtil.OnMiniGame()) {
            WechatUtil.wxPostMessage({
                cmd: OpenDataContextCmdDefine.OPENID,
                openid: openID
            });
        }

        this.CheckWechatInfoComplete();
    }



    private CheckWechatInfoComplete() {
        if (this.wechatStepCount == 2) {
            TimeWatch.Stop("get openid and head info")
            Log.Debug("获取到openid和头像信息, 发送登录信息")
            TimeWatch.Start();

            //获取昵称失败使用默认名字
            let header = GameDataManager.getInstance().PlatformData.UserHeader;
            let nickName = GameDataManager.getInstance().PlatformData.UserNickName;
            header = header ? header : ConstDefine.DEFAULT_USER_HEADER_URL;
            nickName = nickName ? nickName : ConstDefine.DEFAULT_USER_NICKNAME;
            GameDataManager.getInstance().PlatformData.UserHeader = header;
            GameDataManager.getInstance().PlatformData.UserNickName = nickName;
            //检测是否需要更新
            GameDataManager.getInstance().PlatformData.IsChanged = this.CheckWechatInfoChanged(header, nickName)

            this.OnGetPlatformInfoCompleted();
        }
    }

    /**
     * 检测微信头像是否和本地保存的一致, 不一致更新服务器保存的头像
     * @param imageUrl 
     * @param nickname 
     */
    private CheckWechatInfoChanged(imageUrl: string, nickname: string): boolean {
        let isNickNameChanged = WechatFuncManager.Instance.RecordNickName(nickname);
        let isImageChanged = WechatFuncManager.Instance.RecordWechatImage(imageUrl);
        Log.Debug("nickname " + (isNickNameChanged ? "正" : "不") + "需要更新:" + nickname);
        Log.Debug("头像 " + (isImageChanged ? "正" : "不") + "需要更新:" + "需要更新:" + isImageChanged);
        return isNickNameChanged || isImageChanged
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////

    //获取分享配置
    private OnGetShareConfigInfo(active: any, msg: any) {
        //连接网络

        TimeWatch.Stop("get share config")
        TimeWatch.Start();
        // Facade.instance.sendNotification(NotificationNames.OPENUI, ui.UIID.HomePageUIID);
        this.next();
    }
}