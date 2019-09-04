class UserLoginHandler extends BaseMsgHandler {
    public BaseMsgHandler(data: Uint8Array) {
        let message: com.msg.s_userLogin_1001 = com.msg.s_userLogin_1001.decode(data)
        Log.Debug("获取信息 s_userLogin_1001:%o", message);
        UserLoginHandler.InitLoginPlayerInfo(message.playerInfo.openId, message.playerInfo);
        //2019-7-17 10:59:53 服务器配置统一化
        if (message.serverConfig) {
            GameDataManager.getInstance().InitServerConfig(message.serverConfig);
        }
        //2019-8-5 11:12:20 校准服务器与本地时间
        GameDataManager.getInstance().InitServerLoginTime(message.loginTime as number);
        GameDataManager.getInstance().InitServerLocalDeltaTime(message.loginTime as number);

        TimeWatch.Stop("Neworklogin ok");
        if (!LoginSceneEnterCommand.BeenEntered) {
            //开始心跳 心跳包需要loginid
            if (!ConstDefine.HTTP_LOGIN) NetworkHeartBeat.GetInstance().Start();
            Facade.instance.sendNotification(NotificationNames.ENTER_LOGIN_SCENE_COMMAND);
        } else {
            Log.Debug("断线重连, 发送的登录请求, 不回到登录界面");
        }
    }

    public static InitLoginPlayerInfo(openid: string, playerInfo: com.msg.playerInfo) {
        GameDataManager.getInstance().InitLoginPlayer(openid, playerInfo);
        Log.Debug("初始化玩家信息")
        //服务器不返回玩家头像和昵称, 设置本地保存的头像信息
        GameDataManager.getInstance().LoginPlayerInfo.SetHeaderInfo(WechatFuncManager.Instance.GetHeaderUrl(), WechatFuncManager.Instance.GetNickName());
        Log.Debug("已保存玩家头像信息：" + GameDataManager.getInstance().LoginPlayerInfo.PlayerHeader.nickName + " " + GameDataManager.getInstance().LoginPlayerInfo.PlayerHeader.imageUrl);


        //将openID发送给子域
        if (Laya.Browser.onWeiXin) {
            WechatUtil.wxPostMessage({
                cmd: OpenDataContextCmdDefine.OPENID,
                openid: openid
            });
        }

    }
}
