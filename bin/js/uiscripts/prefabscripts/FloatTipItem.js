var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/*
* name;
*/
var FloatTipItem = /** @class */ (function (_super) {
    __extends(FloatTipItem, _super);
    function FloatTipItem() {
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
    FloatTipItem.prototype.InitItem = function (message, skin, width, height, bottom) {
        //1.检查信息长度，动态设置item宽度
        var msgLength = GameUtil.StrLength(message);
        var msgWidth = msgLength * this.fontSize / 2 + this.fontSize;
        this.width = width > msgWidth ? width : msgWidth;
        var msgHeight = this.fontSize * 1.5;
        this.height = height > msgHeight ? height : msgHeight;
        this.UI_Img_BG.skin = skin;
        this.UI_Img_BG.bottom = bottom;
        this.UI_Txt_Tip.text = message;
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
    FloatTipItem.prototype.DeleteItem = function () {
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
    FloatTipItem.prototype.UpgradeTipAnim_FloatUp = function () {
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
    FloatTipItem.prototype.UpgradeTipAnim_Scale = function () {
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
    FloatTipItem.prototype.UpgradeTipAnim_Alpha = function (handler) {
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
    /**
     * 转盘提示，出现
     */
    FloatTipItem.prototype.LotteryTipAnim_Appear = function () {
        if (this.animTask != -1) {
            Tween2DUtil.kill(this.animTask);
            this.animTask = -1;
        }
        //突然出现
        this.scale(1, 1);
        this.alpha = 1;
    };
    /**
     * 转盘提示，上浮消失
     */
    FloatTipItem.prototype.LotteryTipAnim_Disappear = function (handler) {
        var _this = this;
        if (this.animTask != -1) {
            Tween2DUtil.kill(this.animTask);
            this.animTask = -1;
        }
        //突然出现
        this.scale(1, 1);
        this.alpha = 1;
        this.aimY = this.y - 300;
        this.animTask = Tween2DUtil.to({
            node: this,
            duration: 0.5,
            alpha: 0,
            y: this.aimY,
            onComplete: cbhandler.gen_handler(function () {
                _this.animTask = -1;
                if (handler) {
                    handler.exec();
                }
            }, this)
        });
    };
    return FloatTipItem;
}(ui.PrefabUI.FloatTipItemPrefabUI));
//# sourceMappingURL=FloatTipItem.js.map