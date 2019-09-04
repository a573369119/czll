/*
* websock网络管理
*/
var WebsocketNetworkManager = (function () {
    function WebsocketNetworkManager() {
    }
    WebsocketNetworkManager.GetInstance = function () {
        if (WebsocketNetworkManager._instance == null) {
            WebsocketNetworkManager._instance = new WebsocketNetworkManager();
        }
        return WebsocketNetworkManager._instance;
    };
    Object.defineProperty(WebsocketNetworkManager.prototype, "WsAddress", {
        /**
         * websocket服务器地址
         */
        get: function () {
            return this.wsAddress;
        },
        set: function (v) {
            this.wsAddress = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WebsocketNetworkManager.prototype, "NetState", {
        /**
         * 当前websocket连接状态
         */
        get: function () {
            return this.netState;
        },
        set: function (v) {
            this.netState = v;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 初始化websockt
     * @param websocketUrl websocket服务器地址
     * @param msghandler websocket消息处理类
     */
    WebsocketNetworkManager.prototype.Init = function (websocketUrl, msghandler) {
        this.wsAddress = websocketUrl;
        this.msgHandler = msghandler;
    };
    /**
     * websocket连接
     * @param cb 连接成功回调
     */
    WebsocketNetworkManager.prototype.Connect = function (cb) {
        //关闭
        this.Close();
        //初始化
        this.wsocket = new WsConnection();
        this.InitSocket(this.wsocket, this.wsAddress);
        //连接
        Log.Debug("开始连接websocket");
        this.startConnect(cb);
    };
    /**
     * websocket消息发送
     * @param msgID 消息id
     * @param byteBuffer proto消息二进制
     */
    WebsocketNetworkManager.prototype.SendMessage = function (msgID, byteBuffer) {
        // if (!ConstDefine.WS_SWITCH) return;
        this.wsocket.SendMsg(msgID, byteBuffer);
    };
    /**
     * 客户端主动关闭websocket连接
     */
    WebsocketNetworkManager.prototype.Close = function () {
        if (this.wsocket) {
            Log.Debug("客户端主动断开连接");
            Facade.getInstance().sendNotification(NotificationNames.SOCKET_DISCONNECTED_COMMAND);
            this.wsocket.Close();
            this.wsocket = null;
        }
    };
    /**
     * socket初始化, 添加外部事件监听
     * @param wsocket 需要初始化的socket对象
     * @param address 连接地址
     */
    WebsocketNetworkManager.prototype.InitSocket = function (wsocket, address) {
        wsocket.Init(address);
        wsocket.AddEventListener(this.onOpen.bind(this), this.onClose.bind(this), this.onMessage.bind(this), this.onError.bind(this));
    };
    /**
     * 启动socket连接
     * @param onOpenCB 连接成功回调
     */
    WebsocketNetworkManager.prototype.startConnect = function (onOpenCB) {
        if (onOpenCB)
            this.onOpenCallBack = onOpenCB;
        this.wsocket.Connect();
        this.netState = EnumNetState.CONNECTING;
    };
    /**
     * 连接成功事件监听
     */
    WebsocketNetworkManager.prototype.onOpen = function () {
        this.netState = EnumNetState.CONECTED;
        if (this.onOpenCallBack) {
            this.onOpenCallBack(true);
            this.onOpenCallBack = null;
        }
    };
    /**
     * 消息接收事件监听
     * @param id
     * @param buffer
     */
    WebsocketNetworkManager.prototype.onMessage = function (id, buffer) {
        this.msgHandler.Handle(id, buffer);
    };
    /**
     * 连接关闭事件监听
     */
    WebsocketNetworkManager.prototype.onClose = function () {
        this.netState = EnumNetState.DISCONNECTED;
        if (this.onOpenCallBack) {
            this.onOpenCallBack(false, "on close");
            this.onOpenCallBack = null;
        }
        Log.Debug("服务器断开连接");
        Facade.getInstance().sendNotification(NotificationNames.SOCKET_DISCONNECTED_COMMAND);
    };
    /**
     * 连接失败事件监听
     * @param msg
     */
    WebsocketNetworkManager.prototype.onError = function (msg) {
        this.netState = EnumNetState.DISCONNECTED;
        Log.Warn("network error:" + msg);
        if (this.onOpenCallBack) {
            this.onOpenCallBack(false, msg);
            this.onOpenCallBack = null;
        }
    };
    return WebsocketNetworkManager;
}());
//# sourceMappingURL=WebsocketNetworkManager.js.map