class GetOpenIdHandler extends BaseMsgHandler {
    public BaseMsgHandler(data: Uint8Array) {
        let message: com.msg.s_getOpenId_1101 = com.msg.s_getOpenId_1101.decode(data)

        //2019-6-3 16:44:07 从Proto获取OpenId
        Log.Debug("s_getOpenId_1101 通过Proto获取OpenID", message);
        if (message.openId) {
            GameDataManager.getInstance().protoOpenId = message.openId;
        }
    }
}
