var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*
* name;
*/
var MissileBulletMoveComponent2D = (function (_super) {
    __extends(MissileBulletMoveComponent2D, _super);
    function MissileBulletMoveComponent2D() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.totalMoveDist = 0; //移动距离
        _this.checkCollisionCounter = 0; //计算碰撞计时
        return _this;
    }
    MissileBulletMoveComponent2D.prototype.onAdd = function () {
        this.Reset();
    };
    MissileBulletMoveComponent2D.prototype.Reset = function () {
        _super.prototype.Reset.call(this);
        this.totalMoveDist = 0;
        this.checkCollisionCounter = 0;
    };
    MissileBulletMoveComponent2D.prototype.onbulletMoveHander = function (dt) {
        if (this.totalMoveDist >= MissileWeapon.BULLET_MOVE_DIST) {
            //移动n距离, 
            //爆炸
            this.HideSelf();
            this.player.OnExplode();
        }
        else {
            var xOffset = 0;
            var yOffset = MissileWeapon.BULLET_SPEED * dt;
            this.player.movePlayer(xOffset, yOffset);
            this.totalMoveDist += yOffset;
            //间隔ns检测导弹穿透伤害
            this.checkCollisionCounter += dt;
            if (this.checkCollisionCounter > 0.1) {
                this.checkCollisionCounter = 0;
                this.player.CheckCollisionDuringMovement();
            }
        }
    };
    MissileBulletMoveComponent2D.prototype.onBulletOutStage = function () {
        // console.log("onBulletOutStage");
        this.HideSelf();
    };
    MissileBulletMoveComponent2D.prototype.HideSelf = function () {
        this.player.comParent.visible = false;
        GamePoolManager.Instance.Recycle(this.player, MissileWeapon.GetPoolID());
    };
    return MissileBulletMoveComponent2D;
}(BulletMoveComponent2D));
//# sourceMappingURL=MissileBulletMoveComponent2D.js.map