/*
* 自发自收的网络通信
* 发送给echo服务器, 模拟网络传输情况. 
* 发送的消息为需要的返回消息.
*/
class EchoMessageSender extends BaseMessageSender implements ISocketMsgSender {
    private static _instance: EchoMessageSender;
    public static GetInstance(): EchoMessageSender {
        if (EchoMessageSender._instance == null) {
            EchoMessageSender._instance = new EchoMessageSender();
        }
        return EchoMessageSender._instance;
    }

    private NETPLAYERID: number = 10002
    private LoginPlayerID: number = 10001;
    private ROOM_ID: number = 10000


    //登录
    public SendLogin(sessioncod: String, imageUrl: string, nickname: string) {
        let playerID = this.LoginPlayerID;
        let moveSpeed = 30;
        let highscore = 1;
        let skinID = 1;
        let trailID = 1;
        let openID = "testOpenID";
        let playerInfo = this.CreateDummyPlayerInfo(openID, playerID, moveSpeed, highscore, skinID, trailID);

        let msg = new com.msg.s_userLogin_1001();
        msg.openID = openID;
        msg.playerInfo = playerInfo;

        var buffer = com.msg.s_userLogin_1001.encode(msg).finish();
        this.SendSocketMessage(EnumNetMessage.S_UserLogin_1001, buffer)
        Log.Debug("发送login:");
    }

    private CreateDummyPlayerInfo(openID: string, playerID: number, moveSpeed: number, highestScore: number, skinID: number, trailID: number): com.msg.playerInfo {
        let playerInfo = new com.msg.playerInfo();
        playerInfo.attr = new com.msg.attribute();
        playerInfo.attr.moveSpeed = moveSpeed;
        playerInfo.matchInfo = new com.msg.matchInfo()
        playerInfo.matchInfo.highestScore = highestScore;
        playerInfo.outlook = new com.msg.outlookInfo();
        playerInfo.outlook.skinID = skinID;
        playerInfo.outlook.trailID = trailID;
        playerInfo.playerID = playerID;
        playerInfo.money = new com.msg.moneyInfo();
        playerInfo.money.coinNum = 10;
        playerInfo.header = new com.msg.playerHeaderInfo();
        playerInfo.header.imageUrl = ConstDefine.DEFAULT_USER_HEADER_URL;
        playerInfo.header.nickName = ConstDefine.DEFAULT_USER_NICKNAME + "_fromServer"
        return playerInfo;
    }

    public SendHeartBeatPackage(playerID: number) {
        let msg = new com.msg.s_heartBeatPackage_7001();
        var buffer = com.msg.s_heartBeatPackage_7001.encode(msg).finish();
        this.SendSocketMessage(EnumNetMessage.S_HeartBeatPackage_7001, buffer)
        Log.Debug("c_heartBeatPackage_7000:" + playerID);
    }
}