/*
* name;
*/
class MonsterBulletMoveComponent2D extends BulletMoveComponent2D {

    public movehelp: MoveComponentHelp2D;

    onAdd(): void {
        // this.SpeedY = 1;//怪物的子弹速度
        // this.movehelp = new MoveComponentHelp2D();
        // this.movehelp.speed = this.SpeedY;
    }

    public onbulletMoveHander(delta?: number): void {

        // this.movehelp.getMoveSpeedOnRotation(this.player.comParent.rotation);
        // this.player.movePlayer(this.movehelp.xOffset, this.movehelp.yOffset);
        if (!this) { console.error("this 不存在", this); return; }
        if (!this.moveDir) { console.error("this 不存在 moveDir", this); return; }
        let xOffset = this.moveDir.x * this.SpeedX * delta;
        let yOffset = this.moveDir.y * this.SpeedY * delta;
        this.player.movePlayer(-xOffset, -yOffset);

    }

    public onBulletOutStage(): void {

        // console.log("onBulletOutStage");
        // BulletManager.GetInstance().monsterBulletPool.Recycle(this.player as MonsterBullet)
        BulletManager.GetInstance().Recycle(this.player as MonsterBullet)
        this.player.comParent.visible = false;
    }


}