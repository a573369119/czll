var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*
* name;
*/
var BulletMoveComponent2D = (function (_super) {
    __extends(BulletMoveComponent2D, _super);
    function BulletMoveComponent2D() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //最终的X坐标
        _this.lastPosX = 0;
        _this.offSetX = 0;
        _this.lastPosXTime = 0.1;
        return _this;
    }
    Object.defineProperty(BulletMoveComponent2D.prototype, "MoveDir", {
        get: function () { return this.moveDir; },
        set: function (dir) { this.moveDir = dir; },
        enumerable: true,
        configurable: true
    });
    BulletMoveComponent2D.prototype.onReomove = function () {
        this.bulletStopMove();
    };
    BulletMoveComponent2D.prototype.bulletMove = function () {
        this.StartMovement();
        // this.timer = TimeManager.getInst().addUpdater(cbhandler.gen_handler(this.update, this));
    };
    BulletMoveComponent2D.prototype.bulletStopMove = function () {
        this.StopMovement();
    };
    //子类扩展TODO
    BulletMoveComponent2D.prototype.OnMoveOutStage = function () {
        this.onBulletOutStage();
    };
    BulletMoveComponent2D.prototype.OnMove = function (delta) {
        this.onbulletMoveHander(delta);
    };
    BulletMoveComponent2D.prototype.onBulletOutStage = function () {
        BulletManager.GetInstance().Recycle(this.player); //.bullPool.Recycle(this.player as Bullet)
        this.player.comParent.visible = false;
    };
    BulletMoveComponent2D.prototype.onbulletMoveHander = function (delta) {
        this.checkSpeedX(delta);
        var xOffset = this.moveDir.x * this.speedX * delta;
        var yOffset = this.moveDir.y * this.speedY * delta;
        this.player.movePlayer(-xOffset, -yOffset);
        this.clampXPos();
    };
    BulletMoveComponent2D.prototype.checkSpeedX = function (delta) {
        if ((this.offSetX > 0 && this.player.comParent.x >= this.lastPosX) ||
            (this.offSetX < 0 && this.player.comParent.x <= this.lastPosX) || this.offSetX == 0) {
            this.speedX = 0;
            this.player.comParent.x = this.lastPosX;
        }
        else {
            this.speedX = this.offSetX / this.lastPosXTime;
        }
    };
    BulletMoveComponent2D.prototype.clampXPos = function () {
        if (this.speedX != 0) {
            if ((this.offSetX > 0 && this.player.comParent.x >= this.lastPosX) ||
                (this.offSetX < 0 && this.player.comParent.x <= this.lastPosX) || this.offSetX == 0) {
                this.player.comParent.x = this.lastPosX;
            }
        }
    };
    return BulletMoveComponent2D;
}(BaseMoveComponent));
//# sourceMappingURL=BulletMoveComponent2D.js.map