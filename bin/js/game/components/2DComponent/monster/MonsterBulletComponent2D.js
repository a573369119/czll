var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*
* 怪物的子弹组件
*/
var MonsterBulletComponent2D = (function (_super) {
    __extends(MonsterBulletComponent2D, _super);
    function MonsterBulletComponent2D() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MonsterBulletComponent2D.prototype.OnEnterMatch = function () {
        _super.prototype.OnEnterMatch.call(this, 1);
    };
    MonsterBulletComponent2D.prototype.onFile = function () {
        // var bullet: MonsterBullet;
        // for (var index = 0; index < 3; index++) {
        //     bullet = BulletManager.GetInstance().monsterBulletPool.Spawn();
        //     bullet.setBulletPos(this.player.comParent.x + this.bulletPosList[index],
        //         this.player.comParent.y + 20);
        //     bullet.bulletMoveCom.movehelp.yDir = -1
        //     bullet.bulletMoveCom.movehelp.speed = 15;
        //     bullet.bulletMoveCom.bulletMove();
        // }
    };
    MonsterBulletComponent2D.prototype.skillFire = function (target) {
        // //设置图片朝向
        var lookAtPos = new Vec2(target.x, target.y);
        return this.skillFireByTargetPos(lookAtPos);
    };
    MonsterBulletComponent2D.prototype.skillFireByTargetPos = function (targetPos) {
        if (this.bulletConfig == null)
            this.bulletConfig = ConfigManager.GetInstance().GetBulletConfig(EnumBulletOutLookType.MonsterBullet);
        var monsterBullet = BulletManager.GetInstance().Spawn(EnumBulletOutLookType.MonsterBullet);
        //设置子弹位置, 把怪物位置换算成和子弹同层级, 否则attach状态下的怪物位置不对.
        var pos = CommonUtil2D.GetPosUnderTargetObj(this.player.comParent, monsterBullet.comParent.parent);
        monsterBullet.setBulletPos(pos.x, pos.y);
        // CommonUtil2D.LookAtPos(monsterBullet.comParent, targetPos);
        // monsterBullet.comParent.rotation = 360 / this.skillFieLev * (index + 1);
        // monsterBullet
        //设置图片朝向
        monsterBullet.bulletMoveCom.setMoveDir(targetPos.sub(monsterBullet.PlayerPos).normalise(), true);
        // monsterBullet.bulletMoveCom.MoveDir = 
        monsterBullet.bulletMoveCom.SpeedX = this.bulletConfig.MoveSpeed;
        monsterBullet.bulletMoveCom.SpeedY = this.bulletConfig.MoveSpeed;
        monsterBullet.bulletMoveCom.bulletMove();
        return monsterBullet;
    };
    return MonsterBulletComponent2D;
}(BulletComponent2D));
//# sourceMappingURL=MonsterBulletComponent2D.js.map