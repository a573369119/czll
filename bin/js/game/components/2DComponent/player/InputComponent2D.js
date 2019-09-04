var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*
* name;
*/
var InputComponent2D = (function (_super) {
    __extends(InputComponent2D, _super);
    function InputComponent2D() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(InputComponent2D, "InputScale", {
        set: function (value) { this.inputScale = Math.max(0, value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InputComponent2D.prototype, "MouseDown", {
        get: function () { return this.isMouseDown; },
        enumerable: true,
        configurable: true
    });
    InputComponent2D.prototype.onAdd = function () {
        this.isMouseDown = false;
        //注册鼠标事件
        Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.mouseDown);
        Laya.stage.on(Laya.Event.MOUSE_UP, this, this.mouseUp);
        Laya.stage.on(Laya.Event.MOUSE_OUT, this, this.mouseOut);
        Laya.stage.on(Laya.Event.MOUSE_MOVE, this, this.mouseMove);
        this.active = true;
        //角色组建耦合部分
        this.mainPlayer = this.player;
    };
    InputComponent2D.prototype._destroy = function () {
        //鼠标事件
        Laya.stage.off(Laya.Event.MOUSE_DOWN, this, this.mouseDown);
        Laya.stage.off(Laya.Event.MOUSE_UP, this, this.mouseUp);
        Laya.stage.off(Laya.Event.MOUSE_OUT, this, this.mouseOut);
        Laya.stage.off(Laya.Event.MOUSE_MOVE, this, this.mouseMove);
    };
    //鼠标按下
    InputComponent2D.prototype.mouseDown = function (e) {
        if (!this.isMouseDown) {
            this.lastMouseX = Laya.stage.mouseX;
            this.lastMouseY = Laya.stage.mouseY;
            this.touchDownID = e.touchId;
            this.touchDownX = 0;
            this.touchDownY = 0;
            this.touchDownTime = Laya.timer.currTimer;
            this.isMouseDown = true;
        }
        //角色耦合部分
        if ((ConstDefine.TEST_EFFICIENCY ? ConstDefine.INPUT_SWITCH : true) && GameDataManager.getInstance().MatchInfo.IsGameStart())
            this.mainPlayer.bulletComp.EnableFire = true;
    };
    //鼠标抬起
    InputComponent2D.prototype.mouseUp = function (e) {
        if (this.isMouseDown) {
            //2018-12-13 10:21:45 要根据按下与抬起的时间进行计算平均值
            if (e.touchId != this.touchDownID)
                return;
            var mouseUpTime = Laya.timer.currTimer;
            var deltaTime = (mouseUpTime - this.touchDownTime) / 1000;
            // Facade.instance.sendNotification(NotificationNames.MOVE_AVERAGE_X,new MoveOnAverageLocalXMsg(GameDataManager.getInstance().GetLoginPlayerID(),this.touchDownX,deltaTime));
            this.touchDownX = 0;
            this.touchDownY = 0;
            this.isMouseDown = false;
        }
        //角色耦合部分
        this.mainPlayer.bulletComp.EnableFire = false;
        // this.mainPlayer.bulletComp.lastFireTime = 0;
    };
    //鼠标移出
    InputComponent2D.prototype.mouseOut = function (e) {
        if (this.isMouseDown) {
            //2018-12-13 10:21:45 要根据按下与抬起的时间进行计算平均值
            if (e.touchId != this.touchDownID)
                return;
            var mouseUpTime = Laya.timer.currTimer;
            var deltaTime = (mouseUpTime - this.touchDownTime) / 1000;
            // Facade.instance.sendNotification(NotificationNames.MOVE_AVERAGE_X,new MoveOnAverageLocalXMsg(GameDataManager.getInstance().GetLoginPlayerID(),this.touchDownX,deltaTime));
            this.touchDownX = 0;
            this.touchDownY = 0;
            this.isMouseDown = false;
        }
        //角色耦合部分
        this.mainPlayer.bulletComp.EnableFire = false;
        // this.mainPlayer.bulletComp.lastFireTime = 0;
    };
    InputComponent2D.prototype.mouseMove = function (e) {
        if (!this.active)
            return;
        if (e.touchId != this.touchDownID)
            return;
        if (this.isMouseDown) {
            var offsetX = this.lastMouseX - Laya.stage.mouseX; //<0 right  屏幕左上角原点
            var offsety = this.lastMouseY - Laya.stage.mouseY;
            // let DIR = ConfigManager.GetInstance().GetDIR();
            // offsetX = DIR * offsetX * GameDataManager.getInstance().GetLoginPlayerInfo().GetMatchInfo().GetSwingSpeed();
            this.lastMouseX = Laya.stage.mouseX;
            this.lastMouseY = Laya.stage.mouseY;
            this.touchDownX += Math.abs(offsetX);
            this.touchDownY += Math.abs(offsety);
            //给对应的playerid发送 滑屏信息
            // Facade.getInstance().sendNotification(NotificationNames.MOVE_ON_LOCAL_X, new MoveOnLocalXMsg(GameDataManager.getInstance().GetLoginPlayerID(), offsetX))
            if (GameDataManager.getInstance().MatchInfo.IsGameStart())
                this.player.movePlayer(offsetX * InputComponent2D.inputScale, offsety * InputComponent2D.inputScale);
        }
    };
    InputComponent2D.prototype.SetActive = function (active) {
        this.active = active;
    };
    return InputComponent2D;
}(ComponentBase2D));
InputComponent2D.inputScale = 1; //输入灵敏度
//# sourceMappingURL=InputComponent2D.js.map