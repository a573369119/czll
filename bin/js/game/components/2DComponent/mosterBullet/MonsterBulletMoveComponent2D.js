var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*
* name;
*/
var MonsterBulletMoveComponent2D = (function (_super) {
    __extends(MonsterBulletMoveComponent2D, _super);
    function MonsterBulletMoveComponent2D() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MonsterBulletMoveComponent2D.prototype.onAdd = function () {
        // this.SpeedY = 1;//怪物的子弹速度
        // this.movehelp = new MoveComponentHelp2D();
        // this.movehelp.speed = this.SpeedY;
    };
    MonsterBulletMoveComponent2D.prototype.onbulletMoveHander = function (delta) {
        // this.movehelp.getMoveSpeedOnRotation(this.player.comParent.rotation);
        // this.player.movePlayer(this.movehelp.xOffset, this.movehelp.yOffset);
        if (!this) {
            console.error("this 不存在", this);
            return;
        }
        if (!this.moveDir) {
            console.error("this 不存在 moveDir", this);
            return;
        }
        var xOffset = this.moveDir.x * this.SpeedX * delta;
        var yOffset = this.moveDir.y * this.SpeedY * delta;
        this.player.movePlayer(-xOffset, -yOffset);
    };
    MonsterBulletMoveComponent2D.prototype.onBulletOutStage = function () {
        // console.log("onBulletOutStage");
        // BulletManager.GetInstance().monsterBulletPool.Recycle(this.player as MonsterBullet)
        BulletManager.GetInstance().Recycle(this.player);
        this.player.comParent.visible = false;
    };
    return MonsterBulletMoveComponent2D;
}(BulletMoveComponent2D));
//# sourceMappingURL=MonsterBulletMoveComponent2D.js.map