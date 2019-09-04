var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*
* websocket的网络通信
*/
var SocketMessageSender = (function (_super) {
    __extends(SocketMessageSender, _super);
    function SocketMessageSender() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    //登录
    SocketMessageSender.prototype.SendLogin = function (openid, imageUrl, nickname) {
        var msg = new com.msg.c_userLogin_1000();
        msg.openID = openid;
        if (imageUrl && nickname) {
            msg.header = new com.msg.playerHeaderInfo();
            msg.header.imageUrl = imageUrl;
            msg.header.nickName = nickname;
        }
        var buffer = com.msg.c_userLogin_1000.encode(msg).finish();
        this.SendSocketMessage(EnumNetMessage.C_UserLogin_1000, buffer);
        Log.Debug("发送login:" + msg.openID);
    };
    SocketMessageSender.prototype.SendHeartBeatPackage = function (playerID) {
        var msg = new com.msg.c_heartBeatPackage_7000();
        msg.playerID = playerID;
        var buffer = com.msg.c_heartBeatPackage_7000.encode(msg).finish();
        this.SendSocketMessage(EnumNetMessage.C_HeartBeatPackage_7000, buffer);
        Log.Debug("c_heartBeatPackage_7000:" + playerID);
    };
    return SocketMessageSender;
}(BaseMessageSender));
//# sourceMappingURL=SocketMessageSender.js.map