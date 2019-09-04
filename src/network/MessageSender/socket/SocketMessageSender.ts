/*
* websocket的网络通信
*/
class SocketMessageSender extends BaseMessageSender implements ISocketMsgSender {

    //登录
    public SendLogin(openid: string, imageUrl: string, nickname: string) {
        let msg = new com.msg.c_userLogin_1000();
        msg.openID = openid;
        if (imageUrl && nickname) {
            msg.header = new com.msg.playerHeaderInfo();
            msg.header.imageUrl = imageUrl;
            msg.header.nickName = nickname;
        }

        var buffer = com.msg.c_userLogin_1000.encode(msg).finish();
        this.SendSocketMessage(EnumNetMessage.C_UserLogin_1000, buffer)
        Log.Debug("发送login:" + msg.openID);

    }

    public SendHeartBeatPackage(playerID: number) {
        let msg = new com.msg.c_heartBeatPackage_7000();
        msg.playerID = playerID;

        var buffer = com.msg.c_heartBeatPackage_7000.encode(msg).finish();
        this.SendSocketMessage(EnumNetMessage.C_HeartBeatPackage_7000, buffer)
        Log.Debug("c_heartBeatPackage_7000:" + playerID);
    }

}