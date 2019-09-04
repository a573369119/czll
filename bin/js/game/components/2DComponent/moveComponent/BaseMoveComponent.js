var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*
* name;
*/
var BaseMoveComponent = (function (_super) {
    __extends(BaseMoveComponent, _super);
    function BaseMoveComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.timer = -1;
        _this.moveDir = null; //移动方向s
        _this.ROTATE_VIEW_ON_DIR_CHANGE = true; //切换方向时候, 旋转图片
        return _this;
    }
    Object.defineProperty(BaseMoveComponent.prototype, "SpeedX", {
        get: function () { return this.speedX; },
        set: function (value) { this.speedX = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseMoveComponent.prototype, "SpeedY", {
        get: function () { return this.speedY; },
        set: function (value) { this.speedY = value; },
        enumerable: true,
        configurable: true
    });
    BaseMoveComponent.prototype.onAdd = function () {
        this.resetParam();
    };
    BaseMoveComponent.prototype.onReomove = function () {
        this.StopMovement();
    };
    BaseMoveComponent.prototype.StartMovement = function (delay) {
        if (delay === void 0) { delay = 0; }
        this.BeforeStartMovement();
        this.Pause(false);
        this.timer = TimeManager.getInst().addUpdater(cbhandler.gen_handler(this.update, this), delay);
    };
    BaseMoveComponent.prototype.Pause = function (pause) {
        this.pause = pause;
    };
    BaseMoveComponent.prototype.StopMovement = function () {
        if (this.timer >= 0)
            TimeManager.getInst().remove(this.timer);
        this.timer = -1;
        this.resetParam();
    };
    BaseMoveComponent.prototype.resetParam = function () {
        this.speedX = 0;
        this.SpeedX = 0;
        this.timer = -1;
        this.moveDir = null;
    };
    BaseMoveComponent.prototype.update = function (dt) {
        if (this.pause)
            return;
        if (this.player.isInStage()) {
            this.OnMove(dt);
        }
        else {
            this.OnMoveOutStage();
        }
    };
    //设置移动方向 up:是否以屏幕顶部作为旋转标准
    BaseMoveComponent.prototype.setMoveDir = function (dir, up) {
        if (up === void 0) { up = false; }
        dir = dir.normalise();
        if (this.ROTATE_VIEW_ON_DIR_CHANGE) {
            // CommonUtil2D.LookAtPos(this.player.comParent, this.player.PlayerPos.add(dir), false);// 转parent
            //改成转image
            CommonUtil2D.LookAtPos(this.player.viewComp.View, new Vec2(this.player.viewComp.View.x, this.player.viewComp.View.y).add(dir), up);
        }
        this.moveDir = dir;
        if (this.player.Show2DShapeCom)
            this.player.Show2DShapeCom.ShowShape();
    };
    //子类扩展TODO
    BaseMoveComponent.prototype.BeforeStartMovement = function () {
    };
    BaseMoveComponent.prototype.OnMoveOutStage = function () {
        // this.player.comParent.visible = false;
    };
    BaseMoveComponent.prototype.OnMove = function (delta) {
        // this.player.movePlayer(this.speedX, this.speedY);
    };
    BaseMoveComponent.prototype.Move = function (xOffset, yOffset) {
        this.player.movePlayer(-xOffset, -yOffset);
    };
    return BaseMoveComponent;
}(ComponentBase2D));
//# sourceMappingURL=BaseMoveComponent.js.map