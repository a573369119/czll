/*
* 怪物的子弹组件
*/
class MonsterBulletComponent2D extends BulletComponent2D {

    public OnEnterMatch() {
        super.OnEnterMatch(1);

    }


    public onFile(): void {
        // var bullet: MonsterBullet;
        // for (var index = 0; index < 3; index++) {
        //     bullet = BulletManager.GetInstance().monsterBulletPool.Spawn();
        //     bullet.setBulletPos(this.player.comParent.x + this.bulletPosList[index],
        //         this.player.comParent.y + 20);
        //     bullet.bulletMoveCom.movehelp.yDir = -1
        //     bullet.bulletMoveCom.movehelp.speed = 15;
        //     bullet.bulletMoveCom.bulletMove();
        // }

    }

    public skillFire(target: Laya.Sprite): Bullet {
        // //设置图片朝向
        let lookAtPos = new Vec2(target.x, target.y);
        return this.skillFireByTargetPos(lookAtPos)
    }

    public skillFireByTargetPos(targetPos: Vec2): Bullet {
        if (this.bulletConfig == null) this.bulletConfig = ConfigManager.GetInstance().GetBulletConfig(EnumBulletOutLookType.MonsterBullet)
        var monsterBullet = BulletManager.GetInstance().Spawn(EnumBulletOutLookType.MonsterBullet) as MonsterBullet
        //设置子弹位置, 把怪物位置换算成和子弹同层级, 否则attach状态下的怪物位置不对.
        let pos = CommonUtil2D.GetPosUnderTargetObj(this.player.comParent, monsterBullet.comParent.parent as Laya.Sprite);
        monsterBullet.setBulletPos(pos.x, pos.y);
        // CommonUtil2D.LookAtPos(monsterBullet.comParent, targetPos);
        // monsterBullet.comParent.rotation = 360 / this.skillFieLev * (index + 1);
        // monsterBullet
        //设置图片朝向
        monsterBullet.bulletMoveCom.setMoveDir(targetPos.sub(monsterBullet.PlayerPos).normalise(), true)
        // monsterBullet.bulletMoveCom.MoveDir = 
        monsterBullet.bulletMoveCom.SpeedX = this.bulletConfig.MoveSpeed;
        monsterBullet.bulletMoveCom.SpeedY = this.bulletConfig.MoveSpeed;
        monsterBullet.bulletMoveCom.bulletMove();

        return monsterBullet;
    }

}