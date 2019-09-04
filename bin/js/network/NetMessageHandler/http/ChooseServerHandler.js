var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ChooseServerHandler = (function (_super) {
    __extends(ChooseServerHandler, _super);
    function ChooseServerHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ChooseServerHandler.prototype.BaseMsgHandler = function (data) {
        var message = com.msg.s_chooseServer_999.decode(data);
        Log.Debug("收到http消息s_chooseServer_999,  address:" + message.serverAddress);
        if (message.serverAddress && message.serverAddress != "") {
            HttpNetworkManager.GetInstance().ProtoHttpUrl = message.serverAddress;
        }
        else {
            Log.Error("获取登录服务器地址异常, 地址为:" + message.serverAddress);
        }
    };
    return ChooseServerHandler;
}(BaseMsgHandler));
//# sourceMappingURL=ChooseServerHandler.js.map