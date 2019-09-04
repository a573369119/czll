/*
* websocket心跳
*/
var NetworkHeartBeat = (function () {
    function NetworkHeartBeat() {
        this.INTERVAL = 2; //检测间隔2s
        this.OFFLINE_THREASHOLD = 12; //12s内没有回复就断线
        this.lastState = EnumNetState.NONE;
        this.RETRY = 3; //重连尝试次数
        this.retryCount = 0;
        this.USE_HEART_BEATING = false;
        this.waitingLogin = false;
    }
    NetworkHeartBeat.GetInstance = function () {
        if (NetworkHeartBeat._instance == null) {
            NetworkHeartBeat._instance = new NetworkHeartBeat();
        }
        return NetworkHeartBeat._instance;
    };
    NetworkHeartBeat.prototype.Init = function () {
        TimeManager.getInst().addUpdater(cbhandler.gen_handler(this.Update, this));
        this.hasLogin = false;
    };
    NetworkHeartBeat.prototype.Start = function () {
        Log.Debug("开始心跳");
        this.lastSendTime = Laya.timer.currTimer;
        this.lastEchoTime = Laya.timer.currTimer;
        this.currentTime = Laya.timer.currTimer;
        this.hasLogin = true;
        this.retryCount = 0;
        this.lastState = WebsocketNetworkManager.GetInstance().NetState;
        // this.lastState = EnumNetState.CONECTED;
        if (WebsocketNetworkManager.GetInstance().NetState == EnumNetState.DISCONNECTED) {
            Log.Debug("开始心跳时候, 已经是断开状态尝试重连");
            this.reconnect();
        }
    };
    NetworkHeartBeat.prototype.Stop = function () {
        Log.Debug("停止心跳");
        this.hasLogin = false;
        this.lastSendTime = Laya.timer.currTimer;
        this.lastEchoTime = Laya.timer.currTimer;
        this.currentTime = Laya.timer.currTimer;
    };
    NetworkHeartBeat.prototype.Update = function (dt) {
        var _this = this;
        if (!this.USE_HEART_BEATING)
            return;
        //心跳检测 dt是秒, 
        var curState = WebsocketNetworkManager.GetInstance().NetState;
        // Log.Debug(curState);
        if (curState == EnumNetState.NONE) {
            Log.Debug("网络无状态返回");
            return;
        }
        if (curState == EnumNetState.CONECTED) {
            //socket已经连接, 等待login; login后定时发送心跳, 超时没有收到回复, 提示重连.
            if (!this.hasLogin) {
                if (!this.waitingLogin)
                    Log.Debug("socket已经连接, 等待login服务器");
                this.waitingLogin = true;
                return;
            }
            this.waitingLogin = false;
            if (curState == EnumNetState.CONECTED && this.lastState != EnumNetState.CONECTED) {
                Log.Debug("退出断线重连UI, 断线重连成功");
                this.retryCount = 0;
            }
            this.lastState = curState;
            //间隔INTERVAL 发送心跳
            this.currentTime = Laya.timer.currTimer;
            if (this.currentTime - this.lastSendTime >= this.INTERVAL * 1000) {
                WebsocketMessageSender.GetSender().SendHeartBeatPackage(GameDataManager.getInstance().GetLoginPlayerID());
                this.lastSendTime = Laya.timer.currTimer;
            }
            //超过OFFLINE_THREASHOLD没有收到心跳, 设置NetworkManager.GetInstance().NetState = Disconnect
            if (this.currentTime - this.lastEchoTime >= this.OFFLINE_THREASHOLD * 1000) {
                Log.Debug("Connected 发送心跳, 等待回复超时");
                WebsocketNetworkManager.GetInstance().NetState = EnumNetState.DISCONNECTED;
            }
        }
        else if (curState == EnumNetState.CONNECTING) {
            //正在重连, 等待时间超时, 继续提示重连
            if (this.lastState == EnumNetState.DISCONNECTED) {
                Log.Debug("UI显示正在重连, 断线后尝试重连");
            }
            this.lastState = curState;
            this.currentTime = Laya.timer.currTimer;
            //超过OFFLINE_THREASHOLD没有收到心跳, 设置NetworkManager.GetInstance().NetState = Disconnect
            if (this.currentTime - this.lastEchoTime >= this.OFFLINE_THREASHOLD * 1000) {
                Log.Debug("Connecting 正在重连, 等待超时, 提示重连");
                WebsocketNetworkManager.GetInstance().NetState = EnumNetState.DISCONNECTED;
            }
        }
        else {
            if (this.lastState != EnumNetState.DISCONNECTED) {
                if (this.retryCount < this.RETRY) {
                    Log.Debug("自动进行重连");
                    this.reconnect();
                }
                else {
                    //用户掉线/重连失败; 弹出ui 断线重连, 连接socket并且login
                    Log.Debug("重连超数, 弹出UI 提醒用户网络断开/重连失败, 进行重连");
                    this.lastState = EnumNetState.DISCONNECTED;
                    Facade.instance.sendNotification(NotificationNames.OPENUIWITHPARAM, new CommonPanelUIParam(ui.UIID.CommonPanelUIID, "网络断开，请点击按钮重连", function () {
                        _this.reconnect();
                    }));
                }
            }
        }
    };
    //服务器返回心跳
    NetworkHeartBeat.prototype.GetServerEcho = function () {
        //更新收包时间
        this.resetEchoTime();
    };
    NetworkHeartBeat.prototype.resetEchoTime = function () {
        this.lastEchoTime = Laya.timer.currTimer;
    };
    NetworkHeartBeat.prototype.reconnect = function () {
        this.retryCount += 1;
        this.Stop();
        //连接
        WebsocketNetworkManager.GetInstance().Connect(this.onReconnected.bind(this));
    };
    //重连成功
    NetworkHeartBeat.prototype.onReconnected = function (active, msg) {
        if (active) {
            Log.Debug("onReconnected : 重连websock 成功, 发送进入房间请求");
            this.resetEchoTime();
        }
        else {
            Log.Debug("onReconnected : 重连websock 失败" + msg);
        }
    };
    return NetworkHeartBeat;
}());
//# sourceMappingURL=NetworkHeartBeat.js.map