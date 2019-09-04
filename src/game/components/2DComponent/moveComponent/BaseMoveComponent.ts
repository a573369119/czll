/*
* name;
*/
class BaseMoveComponent extends ComponentBase2D {
    protected speedX: number;
    protected speedY: number;
    public set SpeedX(value: number) { this.speedX = value; }
    public get SpeedX(): number { return this.speedX; }
    public set SpeedY(value: number) { this.speedY = value; }
    public get SpeedY(): number { return this.speedY; }

    private pause: boolean;//暂停移动
    private timer: number = -1;
    protected moveDir: Vec2 = null;  //移动方向s
    protected ROTATE_VIEW_ON_DIR_CHANGE: boolean = true;//切换方向时候, 旋转图片

    public onAdd(): void {
        this.resetParam();
    }

    public onReomove(): void {
        this.StopMovement();
    }

    public StartMovement(delay: number = 0): void {
        this.BeforeStartMovement();
        this.Pause(false)
        this.timer = TimeManager.getInst().addUpdater(cbhandler.gen_handler(this.update, this), delay);
    }

    public Pause(pause: boolean) {
        this.pause = pause;
    }

    public StopMovement(): void {
        if (this.timer >= 0) TimeManager.getInst().remove(this.timer);
        this.timer = -1;
        this.resetParam();
    }

    private resetParam() {
        this.speedX = 0;
        this.SpeedX = 0;
        this.timer = -1;
        this.moveDir = null;
    }

    private update(dt: number): void {
        if (this.pause) return;

        if (this.player.isInStage()) {
            this.OnMove(dt);
        } else {
            this.OnMoveOutStage();
        }
    }

    //设置移动方向 up:是否以屏幕顶部作为旋转标准
    public setMoveDir(dir: Vec2, up: boolean = false) {
        dir = dir.normalise();
        if (this.ROTATE_VIEW_ON_DIR_CHANGE) {
            // CommonUtil2D.LookAtPos(this.player.comParent, this.player.PlayerPos.add(dir), false);// 转parent
            //改成转image
            CommonUtil2D.LookAtPos(this.player.viewComp.View, new Vec2(this.player.viewComp.View.x, this.player.viewComp.View.y).add(dir), up);
        }
        this.moveDir = dir;
        if (this.player.Show2DShapeCom) this.player.Show2DShapeCom.ShowShape();
    }

    //子类扩展TODO
    protected BeforeStartMovement(): void {

    }

    protected OnMoveOutStage(): void {
        // this.player.comParent.visible = false;
    }

    protected OnMove(delta?: number): void {
        // this.player.movePlayer(this.speedX, this.speedY);
    }

    protected Move(xOffset: number, yOffset: number) {
        this.player.movePlayer(-xOffset, -yOffset);
    }
}