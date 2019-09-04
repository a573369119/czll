var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*
* name;
*/
var ViewComponentBase2D = (function (_super) {
    __extends(ViewComponentBase2D, _super);
    function ViewComponentBase2D() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(ViewComponentBase2D.prototype, "View", {
        get: function () { return null; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewComponentBase2D.prototype, "ViewSize", {
        get: function () { return null; },
        enumerable: true,
        configurable: true
    });
    ViewComponentBase2D.prototype.onAdd = function () {
        this.showView();
    };
    ViewComponentBase2D.prototype.onRemove = function () {
        this.player = null;
        this.destoryView();
    };
    //显示
    ViewComponentBase2D.prototype.showView = function (urlOrId) {
        this.destoryView();
        this.createView(urlOrId);
        this.setPlayerView();
        this.onVewCreated();
    };
    //子类override
    ViewComponentBase2D.prototype.createView = function (urlOrId) {
    };
    ViewComponentBase2D.prototype.destoryView = function () {
    };
    ViewComponentBase2D.prototype.setPlayerView = function () {
    };
    ViewComponentBase2D.prototype.onVewCreated = function () {
    };
    //切换形象
    ViewComponentBase2D.prototype.ChangeView = function (urlOrId) {
        // this.showView(url);
    };
    //设置缩放
    ViewComponentBase2D.prototype.setViewScale = function (scaleX, scaleY) {
        // this.view.scale(scaleX, scaleY);
    };
    //设置是否显示
    ViewComponentBase2D.prototype.SetActive = function (active) {
    };
    return ViewComponentBase2D;
}(ComponentBase2D));
//# sourceMappingURL=ViewComponentBase2D.js.map