/*
* proto消息分发中心, 交给对应的handler处理
*/
var MessageHandler = (function () {
    function MessageHandler() {
        this.handlerDic = new Laya.Dictionary();
    }
    MessageHandler.prototype.Handle = function (msgid, byteBuffer) {
        var handler = this.handlerDic.get(msgid);
        if (!handler) {
            handler = MessageHandlerFactory.CreateHandler(msgid);
            if (handler == null)
                return;
            this.handlerDic.set(msgid, handler);
        }
        handler.BaseMsgHandler(byteBuffer);
    };
    return MessageHandler;
}());
//# sourceMappingURL=MessageHandler.js.map