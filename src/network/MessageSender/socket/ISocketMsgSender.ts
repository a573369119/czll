/*
* name;
*/
interface ISocketMsgSender {

    //登录
    SendLogin(openid: string, imageUrl: string, nickname: string)
    SendHeartBeatPackage(playerID: number)
}