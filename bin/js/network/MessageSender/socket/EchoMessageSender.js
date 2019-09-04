var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*
* 自发自收的网络通信
* 发送给echo服务器, 模拟网络传输情况.
* 发送的消息为需要的返回消息.
*/
var EchoMessageSender = (function (_super) {
    __extends(EchoMessageSender, _super);
    function EchoMessageSender() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.NETPLAYERID = 10002;
        _this.LoginPlayerID = 10001;
        _this.ROOM_ID = 10000;
        return _this;
    }
    EchoMessageSender.GetInstance = function () {
        if (EchoMessageSender._instance == null) {
            EchoMessageSender._instance = new EchoMessageSender();
        }
        return EchoMessageSender._instance;
    };
    //登录
    EchoMessageSender.prototype.SendLogin = function (sessioncod, imageUrl, nickname) {
        var playerID = this.LoginPlayerID;
        var moveSpeed = 30;
        var highscore = 1;
        var skinID = 1;
        var trailID = 1;
        var openID = "testOpenID";
        var playerInfo = this.CreateDummyPlayerInfo(openID, playerID, moveSpeed, highscore, skinID, trailID);
        var msg = new com.msg.s_userLogin_1001();
        msg.openID = openID;
        msg.playerInfo = playerInfo;
        var buffer = com.msg.s_userLogin_1001.encode(msg).finish();
        this.SendSocketMessage(EnumNetMessage.S_UserLogin_1001, buffer);
        Log.Debug("发送login:");
    };
    EchoMessageSender.prototype.CreateDummyPlayerInfo = function (openID, playerID, moveSpeed, highestScore, skinID, trailID) {
        var playerInfo = new com.msg.playerInfo();
        playerInfo.attr = new com.msg.attribute();
        playerInfo.attr.moveSpeed = moveSpeed;
        playerInfo.matchInfo = new com.msg.matchInfo();
        playerInfo.matchInfo.highestScore = highestScore;
        playerInfo.outlook = new com.msg.outlookInfo();
        playerInfo.outlook.skinID = skinID;
        playerInfo.outlook.trailID = trailID;
        playerInfo.playerID = playerID;
        playerInfo.money = new com.msg.moneyInfo();
        playerInfo.money.coinNum = 10;
        playerInfo.header = new com.msg.playerHeaderInfo();
        playerInfo.header.imageUrl = ConstDefine.DEFAULT_USER_HEADER_URL;
        playerInfo.header.nickName = ConstDefine.DEFAULT_USER_NICKNAME + "_fromServer";
        return playerInfo;
    };
    EchoMessageSender.prototype.SendHeartBeatPackage = function (playerID) {
        var msg = new com.msg.s_heartBeatPackage_7001();
        var buffer = com.msg.s_heartBeatPackage_7001.encode(msg).finish();
        this.SendSocketMessage(EnumNetMessage.S_HeartBeatPackage_7001, buffer);
        Log.Debug("c_heartBeatPackage_7000:" + playerID);
    };
    return EchoMessageSender;
}(BaseMessageSender));
//# sourceMappingURL=EchoMessageSender.js.map