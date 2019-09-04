/*
* name;
*/
class BulletMoveComponent2D extends BaseMoveComponent {

    public set MoveDir(dir: Vec2) { this.moveDir = dir; }
    public get MoveDir(): Vec2 { return this.moveDir; }

    //最终的X坐标
    public lastPosX: number = 0;
    public offSetX: number = 0;
    private lastPosXTime: number = 0.1;


    public onReomove(): void {
        this.bulletStopMove();
    }

    public bulletMove(): void {
        this.StartMovement();
        // this.timer = TimeManager.getInst().addUpdater(cbhandler.gen_handler(this.update, this));
    }

    public bulletStopMove(): void {
        this.StopMovement();
    }

    //子类扩展TODO

    protected OnMoveOutStage(): void {
        this.onBulletOutStage();
    }

    protected OnMove(delta?: number): void {
        this.onbulletMoveHander(delta)
    }


    public onBulletOutStage(): void {
        BulletManager.GetInstance().Recycle(this.player as Bullet) //.bullPool.Recycle(this.player as Bullet)
        this.player.comParent.visible = false;
    }

    public onbulletMoveHander(delta?: number): void {

        this.checkSpeedX(delta);
        let xOffset = this.moveDir.x * this.speedX * delta;
        let yOffset = this.moveDir.y * this.speedY * delta;
        this.player.movePlayer(-xOffset, -yOffset);
        this.clampXPos();
    }

    private checkSpeedX(delta?: number): void {
        if ((this.offSetX > 0 && this.player.comParent.x >= this.lastPosX) ||
            (this.offSetX < 0 && this.player.comParent.x <= this.lastPosX) || this.offSetX == 0) {
            this.speedX = 0;
            this.player.comParent.x = this.lastPosX;
        } else {
            this.speedX = this.offSetX / this.lastPosXTime;
        }
    }

    private clampXPos() {
        if (this.speedX != 0) {
            if ((this.offSetX > 0 && this.player.comParent.x >= this.lastPosX) ||
                (this.offSetX < 0 && this.player.comParent.x <= this.lastPosX) || this.offSetX == 0) {
                this.player.comParent.x = this.lastPosX;
            }
        }
    }
}