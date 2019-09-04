var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*
* name;
*/
var RandomMovementComponent = (function (_super) {
    __extends(RandomMovementComponent, _super);
    function RandomMovementComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    //开始移动前设置随机方向
    RandomMovementComponent.prototype.BeforeStartMovement = function () {
        _super.prototype.BeforeStartMovement.call(this);
        this.SetRandomDir();
    };
    //移动中
    RandomMovementComponent.prototype.OnMove = function (delta) {
        //到边界, 切换方向
        var changeDir = false;
        if (this.player.PlayerPos.x <= 0) {
            this.moveDir.x = Math.abs(this.moveDir.x);
            this.moveDir.y = Math.abs(this.moveDir.y);
            changeDir = true;
        }
        if (this.player.PlayerPos.x >= Laya.stage.width) {
            this.moveDir.x = -Math.abs(this.moveDir.x);
            this.moveDir.y = Math.abs(this.moveDir.y);
            changeDir = true;
        }
        if (changeDir)
            this.setMoveDir(this.moveDir);
        //计算位移
        var xOffset = this.moveDir.x * this.speedX;
        var yOffset = this.moveDir.y * this.speedY;
        this.Move(xOffset, yOffset);
    };
    //出界 左出右入
    RandomMovementComponent.prototype.OnMoveOutStage = function () {
        // super.OnMoveOutStage();
        //左出右入
        var posx = this.player.PlayerPos.x;
        if (posx < 0) {
            posx = Laya.stage.width + this.player.viewWidthHalf + posx;
        }
        else if (posx > Laya.stage.width + this.player.viewWidthHalf) {
            posx = posx - (Laya.stage.width + this.player.viewWidthHalf);
        }
        this.moveDir.y = Math.abs(this.moveDir.y); //速度朝下
        this.player.setPlayerPos(posx, 0);
    };
    /**
     * 设置随机移动方向
     */
    RandomMovementComponent.prototype.SetRandomDir = function () {
        var lefOrRight = 1;
        var random = Math.random();
        if (random > 0.5)
            lefOrRight = -1;
        //随机移动方向   (30 - 70度之间)           
        var dir = new Vec2(lefOrRight, random * 2 + 0.5);
        this.setMoveDir(dir);
    };
    return RandomMovementComponent;
}(BaseMoveComponent));
//# sourceMappingURL=RandomMovementComponent.js.map