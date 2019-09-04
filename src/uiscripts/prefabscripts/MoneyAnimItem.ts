/*
* name;
*/
class MoneyAnimItem extends ui.PrefabUI.MoneyAnimItemPrefabUI {
    //金币动画相关
    constructor() {
        super();
    }


    public InitItem(moneyType: EnumMoneyAnimType) {
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
    }

    public DeleteItem() {
        if (this.UI_Anim_Coin.isPlaying) {
            this.UI_Anim_Coin.stop();
        }
        //回收前，重置状态
        this.scale(1, 1);
        this.alpha = 1;
        this.rotation = 0;
        //切换可视状态
        this.visible = false;
    }

}