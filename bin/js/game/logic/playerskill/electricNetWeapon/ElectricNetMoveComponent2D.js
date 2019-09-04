var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*
* 电网移动组件
*/
var ElectricNetMoveComponent2D = (function (_super) {
    __extends(ElectricNetMoveComponent2D, _super);
    function ElectricNetMoveComponent2D() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ElectricNetMoveComponent2D.prototype.onAdd = function () {
        this.Reset();
    };
    ElectricNetMoveComponent2D.prototype.Reset = function () {
        _super.prototype.Reset.call(this);
    };
    ElectricNetMoveComponent2D.prototype.onbulletMoveHander = function (dt) {
        if (this.player.PlayerPos.y <= 0) {
            this.player.OnNetReachEnd();
        }
        else {
            var xOffset = 0;
            var yOffset = this.SpeedY * dt;
            this.player.movePlayer(xOffset, yOffset);
            this.player.OnNetMoveTopLeft(xOffset, yOffset);
        }
    };
    ElectricNetMoveComponent2D.prototype.onBulletOutStage = function () {
        // console.log("ElectricNet OutStage");
    };
    return ElectricNetMoveComponent2D;
}(BulletMoveComponent2D));
//# sourceMappingURL=ElectricNetMoveComponent2D.js.map