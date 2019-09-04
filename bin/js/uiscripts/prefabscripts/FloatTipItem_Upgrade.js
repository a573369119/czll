var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*
* name;
*/
var FloatTipItem_Upgrade = (function (_super) {
    __extends(FloatTipItem_Upgrade, _super);
    function FloatTipItem_Upgrade() {
        var _this = _super.call(this) || this;
        _this.fontSize = 40;
        _this.anchorX = 0.5;
        _this.anchorY = 0.5;
        _this.deleteTimeTask = -1;
        _this.animTask = -1;
        return _this;
    }
    /**
     * 初始化内容
     */
    FloatTipItem_Upgrade.prototype.InitItem = function (message, needExtra) {
        if (needExtra === void 0) { needExtra = true; }
        //1.检查信息长度，动态设置item宽度
        this.UI_Txt_Tip.text = message;
        this.UI_Txt_Tip.right = needExtra ? 60 : 0;
        this.UI_Txt_Extra.visible = needExtra;
        //2.初始化alpha和scale
        this.alpha = 1;
        this.scale(1, 1);
        this.aimY = -1;
        this.deleteTimeTask = -1;
        this.animTask = -1;
    };
    /**
     * 删除item
     */
    FloatTipItem_Upgrade.prototype.DeleteItem = function () {
        if (this.deleteTimeTask != -1) {
            TimeManager.getInst().remove(this.deleteTimeTask);
        }
        if (this.animTask != -1) {
            Tween2DUtil.kill(this.animTask);
        }
        this.deleteTimeTask = -1;
        this.animTask = -1;
        this.aimY = -1;
    };
    //FloatIn类型动画，从下方尺寸放大进场，然后
    /**
     * 向上浮动动画
     */
    FloatTipItem_Upgrade.prototype.UpgradeTipAnim_FloatUp = function () {
        var _this = this;
        if (this.animTask != -1) {
            Tween2DUtil.kill(this.animTask);
            this.animTask = -1;
        }
        if (this.aimY != -1) {
            this.aimY -= this.height + 10;
        }
        else {
            this.aimY = this.y - this.height - 10;
        }
        this.scale(1, 1);
        this.animTask = Tween2DUtil.to({
            node: this,
            duration: 0.2,
            scalex: 1,
            scaley: 1,
            y: this.aimY,
            onComplete: cbhandler.gen_handler(function () {
                _this.animTask = -1;
                _this.aimY = -1;
            }, this)
        });
    };
    /**
     * 尺寸变大动画
     */
    FloatTipItem_Upgrade.prototype.UpgradeTipAnim_Scale = function () {
        var _this = this;
        if (this.animTask != -1) {
            Tween2DUtil.kill(this.animTask);
            this.animTask = -1;
        }
        this.scale(0, 0);
        this.animTask = Tween2DUtil.to({
            node: this,
            duration: 0.2,
            scalex: 1,
            scaley: 1,
            onComplete: cbhandler.gen_handler(function () {
                _this.animTask = -1;
            }, this)
        });
    };
    /**
     * 透明度改变动画
     */
    FloatTipItem_Upgrade.prototype.UpgradeTipAnim_Alpha = function (handler) {
        var _this = this;
        if (this.animTask != -1) {
            Tween2DUtil.kill(this.animTask);
            this.animTask = -1;
        }
        this.alpha = 1;
        this.animTask = Tween2DUtil.to({
            node: this,
            duration: 0.2,
            alpha: 0,
            onComplete: cbhandler.gen_handler(function () {
                _this.animTask = -1;
                if (handler) {
                    handler.exec();
                }
            }, this)
        });
    };
    return FloatTipItem_Upgrade;
}(ui.PrefabUI.FloatTipItemPrefab_UpgradeUI));
//# sourceMappingURL=FloatTipItem_Upgrade.js.map