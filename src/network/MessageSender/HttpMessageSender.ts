/*
* Http消息发送
* 根据初始化的Sender不同,实现不同功能的消息发送
* HttpDummyMessageSdner 单机模拟网络通信/ HttpProtoMessageSender 正式服务器网络通信
*/
class HttpMessageSender {
    private static _instance: HttpMessageSender;
    private curSender: IHttpSender;
    public static GetInstance(): HttpMessageSender {
        if (HttpMessageSender._instance == null) {
            HttpMessageSender._instance = new HttpMessageSender();
        }
        return HttpMessageSender._instance
    }

    public static GetSender(): IHttpSender {
        if (HttpMessageSender._instance == null) {
            HttpMessageSender._instance = new HttpMessageSender();
        }
        return HttpMessageSender._instance.curSender;
    }

    /**
     * 
     * @param sender 初始化sender
     */
    public InitMessageSender(sender: IHttpSender) {
        HttpMessageSender._instance.curSender = sender;
    }
}