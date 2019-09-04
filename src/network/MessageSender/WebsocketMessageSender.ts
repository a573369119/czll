/*
* websocket消息发送
* 根据初始化的Sender不同,实现不同功能的消息发送
* SingleMessageSender单机模拟网络通信/EchoMessageSender自发自收模拟网络通信/SocketMessageSender正式服务器网络通信
*/
class WebsocketMessageSender {
    private static _instance: WebsocketMessageSender;
    private curSender: ISocketMsgSender;

    public static GetInstance(): WebsocketMessageSender {
        if (WebsocketMessageSender._instance == null) {
            WebsocketMessageSender._instance = new WebsocketMessageSender();
        }
        return WebsocketMessageSender._instance;
    }

    public static GetSender(): ISocketMsgSender {
        if (WebsocketMessageSender._instance == null) {
            WebsocketMessageSender._instance = new WebsocketMessageSender();
        }
        return WebsocketMessageSender._instance.curSender;
    }

    /**
     * 初始化sender
     * @param sender 
     */
    public InitMessageSender(sender: ISocketMsgSender) {
        this.curSender = sender;
    }
}