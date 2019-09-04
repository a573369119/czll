/*
* Http使用proto进行网络连接
*/
class HttpNetworkManager {
    private static _instance: HttpNetworkManager;
    public static GetInstance(): HttpNetworkManager {
        if (HttpNetworkManager._instance == null) {
            HttpNetworkManager._instance = new HttpNetworkManager();
        }
        return HttpNetworkManager._instance;
    }
    private msgHandler: MessageHandler;
    private sendBytes: Laya.Byte;
    private recivBytes: Laya.Byte;
    private protoHttpUrl: string; //protoHttp服务器地址

    //获取/设置url属性
    public get ProtoHttpUrl(): string {
        return this.protoHttpUrl;
    }
    public set ProtoHttpUrl(v: string) {
        this.protoHttpUrl = v;
    }

    /**
     * 初始化http连接
     * @param protoHttpUrl : protoHttp服务器连接地址
     * @param msghandler  : http消息处理类
     */
    public Init(protoHttpUrl: string, msghandler: MessageHandler) {
        this.protoHttpUrl = protoHttpUrl;
        this.msgHandler = msghandler;
        this.recivBytes = new Laya.Byte();
        this.recivBytes.endian = Laya.Byte.BIG_ENDIAN;
        this.sendBytes = new Laya.Byte();
        this.sendBytes.endian = Laya.Byte.BIG_ENDIAN;
    }

    /**
     * 关闭连接
     */
    public Close() {
        this.recivBytes.clear();
        this.recivBytes = null;
        this.sendBytes.clear();
        this.sendBytes = null;
    }

    /**
     * 发送http proto消息
     * @param msgID 消息id
     * @param byteBuffer proto消息二进制 
     * @param onSucceed 成功回调
     * @param onFail 失败回调
     */
    public SendHttpMsg(msgID: number, byteBuffer: Uint8Array, onSucceed: Function, onFail: Function) {
        this.sendBytes.clear();
        //python:头四字节是四个msgID的字符
        let stringValue = msgID.toString();
        if (stringValue.length < 4) { //满4位补全0
            let add = 4 - stringValue.length;
            for (let index = 0; index < add; index++) stringValue = "0" + stringValue;
        }
        for (let index = 0; index < stringValue.length; index++) this.sendBytes.writeByte(stringValue.charCodeAt(index))
        // this.sendBytes.writeUint32(msgID);
        this.sendBytes.writeArrayBuffer(byteBuffer);

        //post消息给http服务器, 服务器返回对应的proto消息.
        HttpManager.getIntance().PostByte(this.protoHttpUrl,
            this.sendBytes.buffer,
            (data) => {
                //服务器返回proto消息回应
                if (data instanceof ArrayBuffer) {
                    this.recivBytes.clear();
                    this.recivBytes.writeArrayBuffer(data);
                    this.recivBytes.pos = 0;

                    //返回的proto消息体 4Byte消息id + protoBytesData
                    //phython头4字节是"4000"字符
                    let idString = "";
                    for (let index = 0; index < 4; index++) idString += String.fromCharCode(this.recivBytes.getByte());
                    let mainId = parseInt(idString)
                    // var mainId: number = this.recivBytes.getInt32();
                    let len: number = this.recivBytes.length - 4;
                    let mbuffer: Uint8Array = this.recivBytes.getUint8Array(this.recivBytes.pos, len)

                    //this.msgHandler.Handle(mainId, mbuffer)
                    this.onMessage(mainId, mbuffer)
                    if (onSucceed) onSucceed();
                    Log.Debug("HttpNetworkManager: sucess ons http msg, msg id:" + msgID)
                } else {
                    Log.Warn("HttpNetworkManager: return data is not bytes buffer on http msg, msg id:" + msgID)
                    if (onFail) onFail("HttpNetworkManager: return data is not bytes buffer")
                }
            },
            (errmsg) => {
                Log.Warn("HttpNetworkManager: fail on http msg:" + errmsg + " msgID:" + msgID)
                if (onFail) onFail(errmsg)
            })
    }

    //普通模式
    public SendHttpMsg_back(msgID: number, byteBuffer: Uint8Array, onSucceed: Function, onFail: Function) {
        this.sendBytes.clear();
        this.sendBytes.writeUint32(msgID);
        this.sendBytes.writeArrayBuffer(byteBuffer);

        //post消息给http服务器, 服务器返回对应的proto消息.
        HttpManager.getIntance().PostByte(this.protoHttpUrl,
            this.sendBytes.buffer,
            (data) => {
                //服务器返回proto消息回应
                if (data instanceof ArrayBuffer) {
                    this.recivBytes.clear();
                    this.recivBytes.writeArrayBuffer(data);
                    this.recivBytes.pos = 0;

                    //返回的proto消息体 4Byte消息id + protoBytesData
                    var mainId: number = this.recivBytes.getInt32();
                    let len: number = this.recivBytes.length - 4;
                    let mbuffer: Uint8Array = this.recivBytes.getUint8Array(this.recivBytes.pos, len)

                    //this.msgHandler.Handle(mainId, mbuffer)
                    this.onMessage(mainId, mbuffer)
                    if (onSucceed) onSucceed();
                    Log.Debug("HttpNetworkManager: sucess ons http msg, msg id:" + msgID)
                } else {
                    Log.Warn("HttpNetworkManager: return data is not bytes buffer on http msg, msg id:" + msgID)
                    if (onFail) onFail("HttpNetworkManager: return data is not bytes buffer")
                }
            },
            (errmsg) => {
                Log.Warn("HttpNetworkManager: fail on http msg:" + errmsg + " msgID:" + msgID)
                if (onFail) onFail(errmsg)
            })
    }

    /**
     * 消息接收事件监听
     * @param id 
     * @param buffer 
     */
    public onMessage(id: number, buffer: Uint8Array) {
        this.msgHandler.Handle(id, buffer)
    }

}