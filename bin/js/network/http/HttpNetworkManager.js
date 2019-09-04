/*
* Http使用proto进行网络连接
*/
var HttpNetworkManager = (function () {
    function HttpNetworkManager() {
    }
    HttpNetworkManager.GetInstance = function () {
        if (HttpNetworkManager._instance == null) {
            HttpNetworkManager._instance = new HttpNetworkManager();
        }
        return HttpNetworkManager._instance;
    };
    Object.defineProperty(HttpNetworkManager.prototype, "ProtoHttpUrl", {
        //获取/设置url属性
        get: function () {
            return this.protoHttpUrl;
        },
        set: function (v) {
            this.protoHttpUrl = v;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 初始化http连接
     * @param protoHttpUrl : protoHttp服务器连接地址
     * @param msghandler  : http消息处理类
     */
    HttpNetworkManager.prototype.Init = function (protoHttpUrl, msghandler) {
        this.protoHttpUrl = protoHttpUrl;
        this.msgHandler = msghandler;
        this.recivBytes = new Laya.Byte();
        this.recivBytes.endian = Laya.Byte.BIG_ENDIAN;
        this.sendBytes = new Laya.Byte();
        this.sendBytes.endian = Laya.Byte.BIG_ENDIAN;
    };
    /**
     * 关闭连接
     */
    HttpNetworkManager.prototype.Close = function () {
        this.recivBytes.clear();
        this.recivBytes = null;
        this.sendBytes.clear();
        this.sendBytes = null;
    };
    /**
     * 发送http proto消息
     * @param msgID 消息id
     * @param byteBuffer proto消息二进制
     * @param onSucceed 成功回调
     * @param onFail 失败回调
     */
    HttpNetworkManager.prototype.SendHttpMsg = function (msgID, byteBuffer, onSucceed, onFail) {
        var _this = this;
        this.sendBytes.clear();
        //python:头四字节是四个msgID的字符
        var stringValue = msgID.toString();
        if (stringValue.length < 4) {
            var add = 4 - stringValue.length;
            for (var index = 0; index < add; index++)
                stringValue = "0" + stringValue;
        }
        for (var index = 0; index < stringValue.length; index++)
            this.sendBytes.writeByte(stringValue.charCodeAt(index));
        // this.sendBytes.writeUint32(msgID);
        this.sendBytes.writeArrayBuffer(byteBuffer);
        //post消息给http服务器, 服务器返回对应的proto消息.
        HttpManager.getIntance().PostByte(this.protoHttpUrl, this.sendBytes.buffer, function (data) {
            //服务器返回proto消息回应
            if (data instanceof ArrayBuffer) {
                _this.recivBytes.clear();
                _this.recivBytes.writeArrayBuffer(data);
                _this.recivBytes.pos = 0;
                //返回的proto消息体 4Byte消息id + protoBytesData
                //phython头4字节是"4000"字符
                var idString = "";
                for (var index = 0; index < 4; index++)
                    idString += String.fromCharCode(_this.recivBytes.getByte());
                var mainId = parseInt(idString);
                // var mainId: number = this.recivBytes.getInt32();
                var len = _this.recivBytes.length - 4;
                var mbuffer = _this.recivBytes.getUint8Array(_this.recivBytes.pos, len);
                //this.msgHandler.Handle(mainId, mbuffer)
                _this.onMessage(mainId, mbuffer);
                if (onSucceed)
                    onSucceed();
                Log.Debug("HttpNetworkManager: sucess ons http msg, msg id:" + msgID);
            }
            else {
                Log.Warn("HttpNetworkManager: return data is not bytes buffer on http msg, msg id:" + msgID);
                if (onFail)
                    onFail("HttpNetworkManager: return data is not bytes buffer");
            }
        }, function (errmsg) {
            Log.Warn("HttpNetworkManager: fail on http msg:" + errmsg + " msgID:" + msgID);
            if (onFail)
                onFail(errmsg);
        });
    };
    //普通模式
    HttpNetworkManager.prototype.SendHttpMsg_back = function (msgID, byteBuffer, onSucceed, onFail) {
        var _this = this;
        this.sendBytes.clear();
        this.sendBytes.writeUint32(msgID);
        this.sendBytes.writeArrayBuffer(byteBuffer);
        //post消息给http服务器, 服务器返回对应的proto消息.
        HttpManager.getIntance().PostByte(this.protoHttpUrl, this.sendBytes.buffer, function (data) {
            //服务器返回proto消息回应
            if (data instanceof ArrayBuffer) {
                _this.recivBytes.clear();
                _this.recivBytes.writeArrayBuffer(data);
                _this.recivBytes.pos = 0;
                //返回的proto消息体 4Byte消息id + protoBytesData
                var mainId = _this.recivBytes.getInt32();
                var len = _this.recivBytes.length - 4;
                var mbuffer = _this.recivBytes.getUint8Array(_this.recivBytes.pos, len);
                //this.msgHandler.Handle(mainId, mbuffer)
                _this.onMessage(mainId, mbuffer);
                if (onSucceed)
                    onSucceed();
                Log.Debug("HttpNetworkManager: sucess ons http msg, msg id:" + msgID);
            }
            else {
                Log.Warn("HttpNetworkManager: return data is not bytes buffer on http msg, msg id:" + msgID);
                if (onFail)
                    onFail("HttpNetworkManager: return data is not bytes buffer");
            }
        }, function (errmsg) {
            Log.Warn("HttpNetworkManager: fail on http msg:" + errmsg + " msgID:" + msgID);
            if (onFail)
                onFail(errmsg);
        });
    };
    /**
     * 消息接收事件监听
     * @param id
     * @param buffer
     */
    HttpNetworkManager.prototype.onMessage = function (id, buffer) {
        this.msgHandler.Handle(id, buffer);
    };
    return HttpNetworkManager;
}());
//# sourceMappingURL=HttpNetworkManager.js.map