/*
* 单机模拟处理网络通信
* 不发送网络, 在当前类中直接生成需要的返回消息, 立刻处理消息返回. 
*/
class SingleMessageSender extends BaseMessageSender implements ISocketMsgSender {

    //单机版游戏处理消息, 不发送直接本地处理消息返回.
    public SendSocketMessage(msgID: number, byteBuffer: Uint8Array) {
        WebsocketNetworkManager.GetInstance().onMessage(msgID, byteBuffer)
    }

    //本地生成对应的返回消息,进行处理.
    // public SendPlayerMove(id: number, pos: Laya.Vector3, localx: number, rotaion: Laya.Vector3) {
    //     let msg = new com.msg.s_playerMove_3001();
    //     msg.playerID = id;
    //     var buffer = com.msg.s_playerMove_3001.encode(msg).finish();
    //     this.SendSocketMessage(EnumNetMessage.S_PlayerMove_3001, buffer)
    //     // Log.Debug("单机发送c_playerMove_3000:" + msg.playerID + "|" + CommonUtil.PrintPos(pos));
    // }

    //登录
    public SendLogin(openid: string, imageUrl: string, nickname: string) {
        Log.Error("single mode 不会发送socket登录消息");
    }

    public SendHeartBeatPackage(playerID: number) {
        Log.Error("单机不发送SendHeartBeatPackage消息")
    }
}