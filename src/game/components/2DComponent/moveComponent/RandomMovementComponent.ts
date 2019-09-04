/*
* name;
*/
class RandomMovementComponent extends BaseMoveComponent {

    //开始移动前设置随机方向
    protected BeforeStartMovement(): void {
        super.BeforeStartMovement();
        this.SetRandomDir();
    }

    //移动中
    protected OnMove(delta?: number): void {

        //到边界, 切换方向
        let changeDir = false;
        if (this.player.PlayerPos.x <= 0) { this.moveDir.x = Math.abs(this.moveDir.x); this.moveDir.y = Math.abs(this.moveDir.y); changeDir = true; }
        if (this.player.PlayerPos.x >= Laya.stage.width) { this.moveDir.x = -Math.abs(this.moveDir.x); this.moveDir.y = Math.abs(this.moveDir.y); changeDir = true; }
        if (changeDir) this.setMoveDir(this.moveDir)

        //计算位移
        let xOffset = this.moveDir.x * this.speedX;
        let yOffset = this.moveDir.y * this.speedY;
        this.Move(xOffset, yOffset)
    }

    //出界 左出右入
    protected OnMoveOutStage(): void {
        // super.OnMoveOutStage();
        //左出右入
        let posx = this.player.PlayerPos.x;
        if (posx < 0) {
            posx = Laya.stage.width + this.player.viewWidthHalf + posx;
        } else if (posx > Laya.stage.width + this.player.viewWidthHalf) {
            posx = posx - (Laya.stage.width + this.player.viewWidthHalf);
        }
        this.moveDir.y = Math.abs(this.moveDir.y);//速度朝下
        this.player.setPlayerPos(posx, 0)
    }


    /**
     * 设置随机移动方向
     */
    public SetRandomDir() {
        var lefOrRight: number = 1;
        var random: number = Math.random();
        if (random > 0.5) lefOrRight = -1;
        //随机移动方向   (30 - 70度之间)           
        let dir = new Vec2(lefOrRight, random * 2 + 0.5)
        this.setMoveDir(dir)
    }
}