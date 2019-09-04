/*
* websock网络管理
*/
class WebsocketNetworkManager {
    private static _instance: WebsocketNetworkManager;
    public static GetInstance(): WebsocketNetworkManager {
        if (WebsocketNetworkManager._instance == null) {
            WebsocketNetworkManager._instance = new WebsocketNetworkManager();
        }
        return WebsocketNetworkManager._instance;
    }
    private wsAddress;
    private wsocket: WsConnection;
    private msgHandler: MessageHandler;
    private onOpenCallBack: Function; //socket开启回调
    private netState: EnumNetState;

    /**
     * websocket服务器地址
     */
    public get WsAddress(): string {
        return this.wsAddress;
    }
    public set WsAddress(v: string) {
        this.wsAddress = v;
    }

    /**
     * 当前websocket连接状态
     */
    public get NetState(): EnumNetState {
        return this.netState;
    }
    public set NetState(v: EnumNetState) {
        this.netState = v;
    }

    /**
     * 初始化websockt
     * @param websocketUrl websocket服务器地址
     * @param msghandler websocket消息处理类
     */
    public Init(websocketUrl: string, msghandler: MessageHandler) {
        this.wsAddress = websocketUrl;
        this.msgHandler = msghandler;
    }

    /**
     * websocket连接
     * @param cb 连接成功回调
     */
    public Connect(cb?: Function) {
        //关闭
        this.Close();
        //初始化
        this.wsocket = new WsConnection();
        this.InitSocket(this.wsocket, this.wsAddress)
        //连接
        Log.Debug("开始连接websocket")
        this.startConnect(cb);
    }

    /**
     * websocket消息发送
     * @param msgID 消息id
     * @param byteBuffer proto消息二进制 
     */
    public SendMessage(msgID: number, byteBuffer: Uint8Array) {
        // if (!ConstDefine.WS_SWITCH) return;
        this.wsocket.SendMsg(msgID, byteBuffer)
    }

    /**
     * 客户端主动关闭websocket连接
     */
    public Close() {
        if (this.wsocket) {
            Log.Debug("客户端主动断开连接")
            Facade.getInstance().sendNotification(NotificationNames.SOCKET_DISCONNECTED_COMMAND)
            this.wsocket.Close();
            this.wsocket = null;
        }
    }

    /**
     * socket初始化, 添加外部事件监听
     * @param wsocket 需要初始化的socket对象
     * @param address 连接地址
     */
    private InitSocket(wsocket: WsConnection, address: string) {
        wsocket.Init(address);
        wsocket.AddEventListener(this.onOpen.bind(this), this.onClose.bind(this), this.onMessage.bind(this), this.onError.bind(this))
    }

    /**
     * 启动socket连接
     * @param onOpenCB 连接成功回调
     */
    private startConnect(onOpenCB?: Function) {
        if (onOpenCB) this.onOpenCallBack = onOpenCB;
        this.wsocket.Connect();
        this.netState = EnumNetState.CONNECTING;
    }

    /**
     * 连接成功事件监听
     */
    private onOpen() {
        this.netState = EnumNetState.CONECTED;
        if (this.onOpenCallBack) { this.onOpenCallBack(true); this.onOpenCallBack = null }
    }

    /**
     * 消息接收事件监听
     * @param id 
     * @param buffer 
     */
    public onMessage(id: number, buffer: Uint8Array) {
        this.msgHandler.Handle(id, buffer)
    }

    /**
     * 连接关闭事件监听
     */
    private onClose() {
        this.netState = EnumNetState.DISCONNECTED;
        if (this.onOpenCallBack) { this.onOpenCallBack(false, "on close"); this.onOpenCallBack = null }
        Log.Debug("服务器断开连接")
        Facade.getInstance().sendNotification(NotificationNames.SOCKET_DISCONNECTED_COMMAND)
    }

    /**
     * 连接失败事件监听
     * @param msg 
     */
    private onError(msg) {
        this.netState = EnumNetState.DISCONNECTED;
        Log.Warn("network error:" + msg)
        if (this.onOpenCallBack) { this.onOpenCallBack(false, msg); this.onOpenCallBack = null }
    }


}