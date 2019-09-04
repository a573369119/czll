var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*
* name;
*/
var PropMoveComponent = (function (_super) {
    __extends(PropMoveComponent, _super);
    function PropMoveComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PropMoveComponent.prototype.BeforeStartMovement = function () {
        //不旋转图片
        this.ROTATE_VIEW_ON_DIR_CHANGE = false;
        _super.prototype.BeforeStartMovement.call(this);
        //设置速度
        var config = ConfigManager.GetInstance().GetPropConfig(this.player.Type);
        this.speedX = config.MoveSpeed;
        this.speedY = config.MoveSpeed;
    };
    return PropMoveComponent;
}(RandomMovementComponent));
//# sourceMappingURL=PropMoveComponent.js.map