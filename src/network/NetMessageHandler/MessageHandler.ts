/*
* proto消息分发中心, 交给对应的handler处理
*/
class MessageHandler {
    private handlerDic: Laya.Dictionary = new Laya.Dictionary();
    public Handle(msgid: number, byteBuffer: Uint8Array) {

        let handler = this.handlerDic.get(msgid) as BaseMsgHandler;
        if (!handler) {
            handler = MessageHandlerFactory.CreateHandler(msgid);
            if (handler == null) return;
            this.handlerDic.set(msgid, handler)
        }
        handler.BaseMsgHandler(byteBuffer)
    }
}