/*
* Http消息发送
* 根据初始化的Sender不同,实现不同功能的消息发送
* HttpDummyMessageSdner 单机模拟网络通信/ HttpProtoMessageSender 正式服务器网络通信
*/
var HttpMessageSender = (function () {
    function HttpMessageSender() {
    }
    HttpMessageSender.GetInstance = function () {
        if (HttpMessageSender._instance == null) {
            HttpMessageSender._instance = new HttpMessageSender();
        }
        return HttpMessageSender._instance;
    };
    HttpMessageSender.GetSender = function () {
        if (HttpMessageSender._instance == null) {
            HttpMessageSender._instance = new HttpMessageSender();
        }
        return HttpMessageSender._instance.curSender;
    };
    /**
     *
     * @param sender 初始化sender
     */
    HttpMessageSender.prototype.InitMessageSender = function (sender) {
        HttpMessageSender._instance.curSender = sender;
    };
    return HttpMessageSender;
}());
//# sourceMappingURL=HttpMessageSender.js.map