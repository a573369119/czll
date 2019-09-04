class GetMessageVerifyCodeHandler extends BaseMsgHandler {
    public BaseMsgHandler(data: Uint8Array) {
        let message: com.msg.s_GetMessageVerifyCode_2201 = com.msg.s_GetMessageVerifyCode_2201.decode(data)

        Log.Debug("收到 s_GetMessageVerifyCode_2201:", message);

        //获取验证码状态
        Facade.instance.sendNotification(NotificationNames.VerifyUI_GetMessageResult, message.result);
    }
}
