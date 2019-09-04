/*
* name;
*/
class InputComponent2D extends ComponentBase2D {

    private active: boolean;
    //输入相关
    private lastMouseX: number;
    private lastMouseY: number;
    private isMouseDown: boolean;
    private touchDownX: number;  //根据按下与抬起时的移动距离与时间取得的平均值
    private touchDownY: number;
    private touchDownTime: number;    //按下的时间
    private touchDownID: number;

    //角色扩展扩展相关后期剔除
    private mainPlayer: MainPlayer;
    private static inputScale: number = 1;//输入灵敏度
    public static set InputScale(value: number) { this.inputScale = Math.max(0, value) }
    public get MouseDown(): boolean { return this.isMouseDown; }

    public onAdd(): void {

        this.isMouseDown = false;
        //注册鼠标事件
        Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.mouseDown);
        Laya.stage.on(Laya.Event.MOUSE_UP, this, this.mouseUp);
        Laya.stage.on(Laya.Event.MOUSE_OUT, this, this.mouseOut);
        Laya.stage.on(Laya.Event.MOUSE_MOVE, this, this.mouseMove);
        this.active = true;

        //角色组建耦合部分
        this.mainPlayer = this.player as MainPlayer;
    }

    public _destroy(): void {
        //鼠标事件
        Laya.stage.off(Laya.Event.MOUSE_DOWN, this, this.mouseDown);
        Laya.stage.off(Laya.Event.MOUSE_UP, this, this.mouseUp);
        Laya.stage.off(Laya.Event.MOUSE_OUT, this, this.mouseOut);
        Laya.stage.off(Laya.Event.MOUSE_MOVE, this, this.mouseMove);
    }

    //鼠标按下
    private mouseDown(e: Laya.Event): void {
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
        if ((ConstDefine.TEST_EFFICIENCY ? ConstDefine.INPUT_SWITCH : true) && GameDataManager.getInstance().MatchInfo.IsGameStart()) this.mainPlayer.bulletComp.EnableFire = true;
    }
    //鼠标抬起
    private mouseUp(e: Laya.Event): void {
        if (this.isMouseDown) {
            //2018-12-13 10:21:45 要根据按下与抬起的时间进行计算平均值
            if (e.touchId != this.touchDownID) return;

            let mouseUpTime = Laya.timer.currTimer;
            let deltaTime = (mouseUpTime - this.touchDownTime) / 1000;
            // Facade.instance.sendNotification(NotificationNames.MOVE_AVERAGE_X,new MoveOnAverageLocalXMsg(GameDataManager.getInstance().GetLoginPlayerID(),this.touchDownX,deltaTime));
            this.touchDownX = 0;
            this.touchDownY = 0;
            this.isMouseDown = false;

        }

        //角色耦合部分
        this.mainPlayer.bulletComp.EnableFire = false;
        // this.mainPlayer.bulletComp.lastFireTime = 0;
    }
    //鼠标移出
    private mouseOut(e: Laya.Event): void {
        if (this.isMouseDown) {
            //2018-12-13 10:21:45 要根据按下与抬起的时间进行计算平均值
            if (e.touchId != this.touchDownID) return;

            let mouseUpTime = Laya.timer.currTimer;
            let deltaTime = (mouseUpTime - this.touchDownTime) / 1000;
            // Facade.instance.sendNotification(NotificationNames.MOVE_AVERAGE_X,new MoveOnAverageLocalXMsg(GameDataManager.getInstance().GetLoginPlayerID(),this.touchDownX,deltaTime));
            this.touchDownX = 0;
            this.touchDownY = 0;
            this.isMouseDown = false;
        }
        //角色耦合部分
        this.mainPlayer.bulletComp.EnableFire = false;
        // this.mainPlayer.bulletComp.lastFireTime = 0;
    }

    private mouseMove(e: Laya.Event): void {
        if (!this.active) return;
        if (e.touchId != this.touchDownID) return;
        if (this.isMouseDown) {
            let offsetX = this.lastMouseX - Laya.stage.mouseX;//<0 right  屏幕左上角原点
            let offsety = this.lastMouseY - Laya.stage.mouseY;
            // let DIR = ConfigManager.GetInstance().GetDIR();
            // offsetX = DIR * offsetX * GameDataManager.getInstance().GetLoginPlayerInfo().GetMatchInfo().GetSwingSpeed();

            this.lastMouseX = Laya.stage.mouseX;
            this.lastMouseY = Laya.stage.mouseY;

            this.touchDownX += Math.abs(offsetX);
            this.touchDownY += Math.abs(offsety);
            //给对应的playerid发送 滑屏信息
            // Facade.getInstance().sendNotification(NotificationNames.MOVE_ON_LOCAL_X, new MoveOnLocalXMsg(GameDataManager.getInstance().GetLoginPlayerID(), offsetX))
            if (GameDataManager.getInstance().MatchInfo.IsGameStart()) this.player.movePlayer(offsetX * InputComponent2D.inputScale, offsety * InputComponent2D.inputScale);
        }
    }

    public SetActive(active: boolean) {
        this.active = active;
    }
}