var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*
* name;
*/
var FloatTipItem_Lottery = (function (_super) {
    __extends(FloatTipItem_Lottery, _super);
    function FloatTipItem_Lottery() {
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
    FloatTipItem_Lottery.prototype.InitItem = function (message) {
        //1.检查信息长度，动态设置item宽度
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
    FloatTipItem_Lottery.prototype.DeleteItem = function () {
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
    /**
     * 转盘提示，出现
     */
    FloatTipItem_Lottery.prototype.LotteryTipAnim_Appear = function () {
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
    FloatTipItem_Lottery.prototype.LotteryTipAnim_Disappear = function (handler) {
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
    return FloatTipItem_Lottery;
}(ui.PrefabUI.FloatTipItemPrefab_LotteryUI));
//# sourceMappingURL=FloatTipItem_Lottery.js.map