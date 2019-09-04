var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*
* name;
*/
var HitComponentBase2D = (function (_super) {
    __extends(HitComponentBase2D, _super);
    function HitComponentBase2D() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.timer = -1;
        _this.checkHitInterval = 0.1;
        return _this;
    }
    HitComponentBase2D.prototype.onReomove = function () {
        this.stopCheckHit();
    };
    HitComponentBase2D.prototype.startCheckHit = function () {
        this.timer = TimeManager.getInst().loop(this.checkHitInterval, (cbhandler.gen_handler(this.checkHitHandler, this)));
    };
    HitComponentBase2D.prototype.stopCheckHit = function () {
        if (this.timer < 0)
            return;
        TimeManager.getInst().remove(this.timer);
        this.timer = -1;
    };
    //子类扩展实现具体方法
    HitComponentBase2D.prototype.checkHitHandler = function () {
        //TODO  this.player.viewComp.checkHit()
    };
    return HitComponentBase2D;
}(ComponentBase2D));
//# sourceMappingURL=HitComponentBase2D.js.map