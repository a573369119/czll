/*
* name;
*/
class MissileBulletMoveComponent2D extends BulletMoveComponent2D {

    private totalMoveDist = 0; //移动距离
    private checkCollisionCounter = 0; //计算碰撞计时

    onAdd(): void {
        this.Reset();
    }

    public Reset() {
        super.Reset();
        this.totalMoveDist = 0;
        this.checkCollisionCounter = 0;
    }

    public onbulletMoveHander(dt: number): void {
        if (this.totalMoveDist >= MissileWeapon.BULLET_MOVE_DIST) {
            //移动n距离, 
            //爆炸
            this.HideSelf();
            (this.player as MissileBullet).OnExplode();
        } else {
            let xOffset = 0;
            let yOffset = MissileWeapon.BULLET_SPEED * dt;
            this.player.movePlayer(xOffset, yOffset);
            this.totalMoveDist += yOffset;

            //间隔ns检测导弹穿透伤害
            this.checkCollisionCounter += dt;
            if (this.checkCollisionCounter > 0.1) {
                this.checkCollisionCounter = 0;
                (this.player as MissileBullet).CheckCollisionDuringMovement();
            }
        }
    }

    public onBulletOutStage(): void {
        // console.log("onBulletOutStage");
        this.HideSelf();
    }

    private HideSelf() {
        this.player.comParent.visible = false;
        GamePoolManager.Instance.Recycle<MissileBullet>(this.player as MissileBullet, MissileWeapon.GetPoolID());
    }



}
