class ChooseServerHandler extends BaseMsgHandler {
    public BaseMsgHandler(data: Uint8Array) {
        let message: com.msg.s_chooseServer_999 = com.msg.s_chooseServer_999.decode(data)
        Log.Debug("收到http消息s_chooseServer_999,  address:" + message.serverAddress)

        if (message.serverAddress && message.serverAddress != "") {

            HttpNetworkManager.GetInstance().ProtoHttpUrl = message.serverAddress;

        } else {
            Log.Error("获取登录服务器地址异常, 地址为:" + message.serverAddress)
        }
    }
}
