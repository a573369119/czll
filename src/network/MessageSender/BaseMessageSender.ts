/*
* name;
*/
class BaseMessageSender {
    public SendSocketMessage(msgID: number, byteBuffer: Uint8Array) {
        WebsocketNetworkManager.GetInstance().SendMessage(msgID, byteBuffer)
    }

    public SendHttpMsg(msgID: number, byteBuffer: Uint8Array, onSucceed: Function, onFail: Function) {
        if (ConstDefine.HTTP_LOGIN) {
            HttpNetworkManager.GetInstance().SendHttpMsg(msgID, byteBuffer, onSucceed, onFail)
        }
        else {
            Log.Debug("当前配置不使用Http登录方式, 不发送http请求" + msgID)
        }
    }
}