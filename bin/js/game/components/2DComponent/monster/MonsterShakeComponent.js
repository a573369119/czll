var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*
* name;
*/
var MonsterShakeComponent = (function (_super) {
    __extends(MonsterShakeComponent, _super);
    function MonsterShakeComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.shakeTask = -1;
        return _this;
    }
    MonsterShakeComponent.prototype.onAdd = function () {
    };
    MonsterShakeComponent.prototype.onReomove = function () {
    };
    MonsterShakeComponent.prototype.Shake = function () {
        var _this = this;
        if (this.shakeTask < 0) {
            this.shakeTask = ShakeManager.GetInstance().ShakeMonster(this.player.viewComp.View, function () {
                _this.shakeTask = -1;
            }, 5, 0.2, 0);
        }
    };
    MonsterShakeComponent.prototype.OnRecycle = function () {
        if (this.shakeTask > 0) {
            // ShakeManager.GetInstance().StopShake(this.shakeTask)
            ShakeManager.GetInstance().StopShakeMonster(this.shakeTask);
            this.shakeTask = -1;
        }
    };
    return MonsterShakeComponent;
}(ComponentBase2D));
//# sourceMappingURL=MonsterShakeComponent.js.map