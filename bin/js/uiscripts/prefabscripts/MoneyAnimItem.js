var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*
* name;
*/
var MoneyAnimItem = (function (_super) {
    __extends(MoneyAnimItem, _super);
    //金币动画相关
    function MoneyAnimItem() {
        return _super.call(this) || this;
    }
    MoneyAnimItem.prototype.InitItem = function (moneyType) {
        //2019-7-26 16:19:00 新加入序列动画
        this.UI_Anim_Coin.visible = moneyType == EnumMoneyAnimType.CoinAnim;
        this.UI_Img_Icon.visible = moneyType != EnumMoneyAnimType.CoinAnim;
        switch (moneyType) {
            case EnumMoneyAnimType.Coin: {
                //金币
                this.UI_Img_Icon.skin = ConstDefine.IconSkin_Coin;
                break;
            }
            case EnumMoneyAnimType.Diamond: {
                //钻石
                this.UI_Img_Icon.skin = ConstDefine.IconSkin_Diamond;
                break;
            }
            case EnumMoneyAnimType.Power: {
                //体力
                this.UI_Img_Icon.skin = ConstDefine.IconSkin_Power;
                break;
            }
            case EnumMoneyAnimType.Lottery: {
                //转盘
                this.UI_Img_Icon.skin = ConstDefine.IconSkin_Lottery;
                break;
            }
            case EnumMoneyAnimType.CoinAnim: {
                //金币序列动画
                this.UI_Anim_Coin.play(0, true);
                break;
            }
        }
        //切换可视状态
        this.visible = true;
        this.alpha = 1;
    };
    MoneyAnimItem.prototype.DeleteItem = function () {
        if (this.UI_Anim_Coin.isPlaying) {
            this.UI_Anim_Coin.stop();
        }
        //回收前，重置状态
        this.scale(1, 1);
        this.alpha = 1;
        this.rotation = 0;
        //切换可视状态
        this.visible = false;
    };
    return MoneyAnimItem;
}(ui.PrefabUI.MoneyAnimItemPrefabUI));
//# sourceMappingURL=MoneyAnimItem.js.map