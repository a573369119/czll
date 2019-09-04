/*
* websocket消息发送
* 根据初始化的Sender不同,实现不同功能的消息发送
* SingleMessageSender单机模拟网络通信/EchoMessageSender自发自收模拟网络通信/SocketMessageSender正式服务器网络通信
*/
var WebsocketMessageSender = (function () {
    function WebsocketMessageSender() {
    }
    WebsocketMessageSender.GetInstance = function () {
        if (WebsocketMessageSender._instance == null) {
            WebsocketMessageSender._instance = new WebsocketMessageSender();
        }
        return WebsocketMessageSender._instance;
    };
    WebsocketMessageSender.GetSender = function () {
        if (WebsocketMessageSender._instance == null) {
            WebsocketMessageSender._instance = new WebsocketMessageSender();
        }
        return WebsocketMessageSender._instance.curSender;
    };
    /**
     * 初始化sender
     * @param sender
     */
    WebsocketMessageSender.prototype.InitMessageSender = function (sender) {
        this.curSender = sender;
    };
    return WebsocketMessageSender;
}());
//# sourceMappingURL=WebsocketMessageSender.js.map