var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*
* name;
*/
var PlayerAnimComponent = (function (_super) {
    __extends(PlayerAnimComponent, _super);
    function PlayerAnimComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.rebornAlphaAnimTweenId = -1;
        return _this;
    }
    PlayerAnimComponent.prototype.onAdd = function () {
    };
    PlayerAnimComponent.prototype.onRemove = function () {
    };
    //恢复的明暗动画 duration:动画时间
    PlayerAnimComponent.prototype.PlayRebornAlphaAnim = function (onComplete, duration) {
        var _this = this;
        this.rebornAlphaAnimTweenId = Tween2DUtil.getInst().to({
            node: this.player.viewComp.View,
            duration: 0.5,
            alpha: .2,
            repeated: duration / 0.5,
            tweenFunc: TweenFunc.PingPong.easeInOut,
            onComplete: cbhandler.gen_handler(function () {
                // Log.Debug("end")
                _this.rebornAlphaAnimTweenId = -1;
                if (onComplete)
                    onComplete();
            }, this)
        });
    };
    PlayerAnimComponent.prototype.StopRebornAlphaAnim = function () {
        if (this.rebornAlphaAnimTweenId > 0) {
            Tween2DUtil.getInst().kill(this.rebornAlphaAnimTweenId);
            this.rebornAlphaAnimTweenId = -1;
        }
    };
    return PlayerAnimComponent;
}(ComponentBase2D));
//# sourceMappingURL=PlayerAnimComponent.js.map