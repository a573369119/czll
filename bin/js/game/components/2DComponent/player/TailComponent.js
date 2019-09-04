var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*
* name;
*/
var TailComponent = (function (_super) {
    __extends(TailComponent, _super);
    function TailComponent(sideWeaponId) {
        var _this = _super.call(this) || this;
        _this.tailAnim = null;
        _this.animCacheName = "animCacheName";
        _this.CreateAnimation(sideWeaponId);
        return _this;
    }
    TailComponent.prototype.onAdd = function () {
    };
    TailComponent.prototype.onRemove = function () {
        if (this.tailAnim) {
            this.tailAnim.destroy(true);
            this.tailAnim = null;
        }
    };
    TailComponent.prototype.CreateAnimation = function (sideWeaponId) {
        if (this.tailAnim)
            return;
        var config = ConfigManager.GetInstance().GetWeaponConfig(sideWeaponId);
        this.tailAnim = new Laya.Animation();
        //加载动画图集，加载成功后执行回调方法
        this.tailAnim.loadAtlas("res/atlas/resources/tailAnim.atlas", Laya.Handler.create(this, this.onLoaded, [config]), this.animCacheName);
    };
    TailComponent.prototype.onLoaded = function (config) {
        this.player.comParent.addChild(this.tailAnim);
        this.tailAnim.zOrder = -1; //保持在机体的底部
        this.tailAnim.interval = ConstDefine.TAIL_ANIM_INTERVAL;
        this.tailAnim.play(0, true, this.animCacheName, true);
        this.SetTailPosByWeapon(config);
    };
    TailComponent.prototype.SetTailPosByWeapon = function (config) {
        if (this.tailAnim) {
            this.tailAnim.pos(config.TailAnimPos[0] + 18, config.TailAnimPos[1]);
        }
    };
    return TailComponent;
}(ComponentBase2D));
//# sourceMappingURL=TailComponent.js.map