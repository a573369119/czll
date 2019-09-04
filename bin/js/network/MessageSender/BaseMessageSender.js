/*
* name;
*/
var BaseMessageSender = (function () {
    function BaseMessageSender() {
    }
    BaseMessageSender.prototype.SendSocketMessage = function (msgID, byteBuffer) {
        WebsocketNetworkManager.GetInstance().SendMessage(msgID, byteBuffer);
    };
    BaseMessageSender.prototype.SendHttpMsg = function (msgID, byteBuffer, onSucceed, onFail) {
        if (ConstDefine.HTTP_LOGIN) {
            HttpNetworkManager.GetInstance().SendHttpMsg(msgID, byteBuffer, onSucceed, onFail);
        }
        else {
            Log.Debug("当前配置不使用Http登录方式, 不发送http请求" + msgID);
        }
    };
    return BaseMessageSender;
}());
//# sourceMappingURL=BaseMessageSender.js.map