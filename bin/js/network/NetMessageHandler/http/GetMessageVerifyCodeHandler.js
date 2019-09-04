var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GetMessageVerifyCodeHandler = (function (_super) {
    __extends(GetMessageVerifyCodeHandler, _super);
    function GetMessageVerifyCodeHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GetMessageVerifyCodeHandler.prototype.BaseMsgHandler = function (data) {
        var message = com.msg.s_GetMessageVerifyCode_2201.decode(data);
        Log.Debug("收到 s_GetMessageVerifyCode_2201:", message);
        //获取验证码状态
        Facade.instance.sendNotification(NotificationNames.VerifyUI_GetMessageResult, message.result);
    };
    return GetMessageVerifyCodeHandler;
}(BaseMsgHandler));
//# sourceMappingURL=GetMessageVerifyCodeHandler.js.map