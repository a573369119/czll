/*
* 电网移动组件
*/
class ElectricNetMoveComponent2D extends BulletMoveComponent2D {

    onAdd(): void {
        this.Reset();
    }

    public Reset() {
        super.Reset();
    }

    public onbulletMoveHander(dt: number): void {
        if (this.player.PlayerPos.y <= 0) {
            (this.player as ElectricNet).OnNetReachEnd();
        } else {
            let xOffset = 0;
            let yOffset = this.SpeedY * dt;
            this.player.movePlayer(xOffset, yOffset);
            (this.player as ElectricNet).OnNetMoveTopLeft(xOffset, yOffset)
        }
    }

    public onBulletOutStage(): void {
        // console.log("ElectricNet OutStage");
    }
}
