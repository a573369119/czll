var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GetOpenIdHandler = (function (_super) {
    __extends(GetOpenIdHandler, _super);
    function GetOpenIdHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GetOpenIdHandler.prototype.BaseMsgHandler = function (data) {
        var message = com.msg.s_getOpenId_1101.decode(data);
        //2019-6-3 16:44:07 从Proto获取OpenId
        Log.Debug("s_getOpenId_1101 通过Proto获取OpenID", message);
        if (message.openId) {
            GameDataManager.getInstance().protoOpenId = message.openId;
        }
    };
    return GetOpenIdHandler;
}(BaseMsgHandler));
//# sourceMappingURL=GetOpenIdHandler.js.map