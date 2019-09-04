var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*
* 使用Image的角色/怪物
*/
var ImageViewComponent = (function (_super) {
    __extends(ImageViewComponent, _super);
    function ImageViewComponent(imgUrl) {
        var _this = _super.call(this) || this;
        _this.img_Second = new Laya.Image();
        _this.imgUrl = imgUrl;
        return _this;
    }
    Object.defineProperty(ImageViewComponent.prototype, "ViewSize", {
        get: function () { return new Vec2(this.view.width * this.view.scaleX, this.view.height * this.view.scaleY); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ImageViewComponent.prototype, "View", {
        get: function () { return this.view; },
        enumerable: true,
        configurable: true
    });
    ImageViewComponent.prototype.createView = function () {
        this.createImageView(this.imgUrl);
    };
    //切换形象
    ImageViewComponent.prototype.ChangeView = function (urlOrId) {
        this.imgUrl = urlOrId;
        this.showView();
    };
    ImageViewComponent.prototype.getView = function () {
        return this.view;
    };
    ImageViewComponent.prototype.createImageView = function (url) {
        this.view = new Laya.Image();
        //TODO根据playerID 获取对应的皮肤
        this.view.skin = this.skinSpecial(url);
        // this.view.pivotX = this.view.width * 0.5;
        // this.view.pivotY = this.view.height * 0.5;
        this.view.anchorX = 0.5;
        this.view.anchorY = 0.5;
        this.player.comParent.addChild(this.view);
        this.player.comParent.addChild(this.img_Second);
        this.width = this.view.width;
        this.height = this.view.height;
        this.SetActive(true);
    };
    ImageViewComponent.prototype.destoryView = function () {
        if (this.view)
            this.view.destroy(true);
        this.view = null;
    };
    ImageViewComponent.prototype.setPlayerView = function () {
        this.player.viewHeight = this.view.height; //判断instage
        this.player.viewHeightHalf = this.view.height * 0.5;
        this.player.viewWidth = this.view.width;
        this.player.viewWidthHalf = this.view.width * 0.5;
    };
    //检测是否和另外一个物体碰撞了
    ImageViewComponent.prototype.checkHit = function (sp) {
        // Log.Debug("检测碰撞")
        var flag = false;
        //缩放的时候飞机的宽度不变，所以要乘以缩放系数。Y 暂时没有乘因为效果还可以
        if (Math.abs(this.player.comParent.x - sp.x) < this.player.viewHeightHalf * this.player.viewComp.view.scaleX + sp.width &&
            Math.abs(this.player.comParent.y - sp.y) < this.view.height + sp.height) {
            flag = true;
        }
        return flag;
    };
    //设置缩放
    ImageViewComponent.prototype.setViewScale = function (scaleX, scaleY) {
        this.view.scale(scaleX, scaleY);
    };
    //设置是否显示
    ImageViewComponent.prototype.SetActive = function (active) {
        // this.view.visible = active//
        this.player.setPlayerActive(active);
    };
    /**呼叫支援飞机 颜色改变 */
    ImageViewComponent.prototype.changeStyle = function (box) {
        if (!this.img_Second)
            this.img_Second = new Laya.Image();
        else
            this.img_Second.graphics.clear();
        this.img_Second.anchorX = 0.5;
        this.img_Second.anchorY = 0.5;
        this.img_Second.loadImage(this.imgUrl);
        var colorMatrix = [
            1, 0, 0, 0, 0,
            0, 1, 0, 0, 0,
            0, 0, 1, 0.5, 0,
            0, 0, 0, 1, 0,
        ];
        var colorFilter = new Laya.ColorFilter(colorMatrix);
        this.img_Second.filters = [colorFilter];
        box.addChild(this.img_Second);
        // console.log("--------------");
        // console.log("width:" + this.width + "height" + this.height);
        // console.log(this.img_Second);
        // console.log(box);
        // console.log(this.view);
    };
    /***皮肤表 */
    ImageViewComponent.prototype.skinSpecial = function (url) {
        if (GameDataManager.getInstance().LoginPlayerInfo.VerifyInfo.state == 1) {
            if (url == "resources/player/planes/role_fight_weapon_01.png") {
                url = "resources/player/planes/role_fight_weapon_01_1.png";
            }
        }
        return url;
    };
    /***更新皮肤 */
    ImageViewComponent.prototype.updataSkin = function () {
        this.view.skin = this.skinSpecial(this.view.skin);
    };
    return ImageViewComponent;
}(ViewComponentBase2D));
//# sourceMappingURL=ImageViewComponent.js.map