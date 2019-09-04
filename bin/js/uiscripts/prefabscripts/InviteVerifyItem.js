var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var InviteVerifyItem = (function (_super) {
    __extends(InviteVerifyItem, _super);
    function InviteVerifyItem() {
        var _this = _super.call(this) || this;
        _this.UI_Btn_GetReward.on(Laya.Event.CLICK, _this, _this.OnUI_Btn_GetRewardClick);
        return _this;
    }
    InviteVerifyItem.prototype.OnUI_Btn_GetRewardClick = function () {
        if (this.itemData) {
            //点击按钮时，发送消息
            var rewardGained = this.itemData.rewardGained == 0 ? 1 : 2;
            HttpMessageSender.GetSender().SendGetInviteVerifyReward(GameDataManager.getInstance().LoginPlayerInfo.OpenID, this.itemData.friendOpenID, rewardGained);
            //播放音效
            AudioManager.GetInstance().PlaySoundByConfigID(EnumSoundID.sound_function_touch_02);
        }
    };
    //更新渲染物体
    InviteVerifyItem.prototype.RenderItem = function (data, index) {
        var _this = this;
        //2019-6-14 21:31:42 获取状态判断
        if (this.itemData && data && this.itemData.friendOpenID == data.friendOpenID) {
            //本次更新为获取，播放动画
            if (this.itemData.rewardGained == 0 && data.rewardGained != 0) {
                //领取邀请奖励动画
                var worldPos = CommonUtil2D.GetGlobalPosition(this.UI_Btn_GetReward);
                MoneyAnimManager.Instance.PlayMoneyAnim_Pos_Curve(EnumMoneyAnimType.Diamond, 5, worldPos, new Vec2(ConstDefine.MoneyImgPos_Diamond.x, ConstDefine.MoneyImgPos_Diamond.y), 500);
            }
            else if (this.itemData.rewardGained == 2 && data.rewardGained != 2) {
                //领取绑定奖励动画
                // Log.Debug("领取抽奖次数动画暂缺");
                var worldPos = CommonUtil2D.GetGlobalPosition(this.UI_Btn_GetReward);
                MoneyAnimManager.Instance.PlayMoneyAnim_Pos_Straight(EnumMoneyAnimType.Lottery, 1, worldPos, new Vec2(540, 820));
            }
        }
        //保存数据
        this.itemData = data;
        //显示序号
        this.UI_Txt_Order.text = (index + 1).toString();
        //显示头像与按钮状态
        if (this.itemData != null) {
            //有值，根据状态刷新
            this.UI_Img_Default_Icon.visible = false;
            this.UI_Img_Loading.visible = true;
            this.UI_Img_ProfileIcon.visible = false;
            this.UI_Img_ProfileIcon.loadImage(this.itemData.picUrl, 0, 0, this.UI_Img_ProfileIcon.width, this.UI_Img_ProfileIcon.height, Laya.Handler.create(this, function () {
                //加载完毕后切换显示
                Log.Debug("InivteItem 加载图片完成：", _this.itemData.picUrl);
                _this.UI_Img_ProfileIcon.visible = true;
                _this.UI_Img_Loading.visible = false;
            }, null, false));
            //根据信息，分别显示奖励
            //底图skin，除了已领取全部奖励的状态，其他的都需要显示底图
            this.UI_Img_RewardBG.skin = this.itemData.rewardGained == 3 ? "" : "resources/invitefriend/img_lottery_text_bg.png";
            this.UI_Txt_RewardInfo.color = this.itemData.rewardGained == 1 ? "#fd5555" : "#ffffff";
            switch (this.itemData.rewardGained) {
                case 0: {
                    //可领取邀请奖励的状态
                    this.UI_Btn_GetReward.mouseEnabled = true;
                    this.UI_Txt_RewardInfo.visible = true;
                    this.UI_Img_RewardIcon.visible = true;
                    this.UI_Txt_RewardInfo.text = "  +" + data.rewardNum;
                    this.UI_Img_RewardIcon.gray = false;
                    this.UI_Img_RewardIcon.skin = ConstDefine.IconSkin_Diamond;
                    this.UI_Efc_SeeSaw.play(0, true);
                    break;
                }
                case 1: {
                    //根据是否绑定，分别判断状态
                    this.UI_Txt_RewardInfo.visible = true;
                    this.UI_Img_RewardIcon.visible = false;
                    this.UI_Btn_GetReward.mouseEnabled = false;
                    this.UI_Txt_RewardInfo.text = "绑手机";
                    this.UI_Img_RewardIcon.gray = false;
                    this.UI_Img_RewardIcon.skin = ConstDefine.IconSkin_Lottery;
                    this.UI_Efc_SeeSaw.play(0, true);
                    break;
                }
                case 2: {
                    this.UI_Txt_RewardInfo.visible = true;
                    this.UI_Img_RewardIcon.visible = true;
                    this.UI_Btn_GetReward.mouseEnabled = true;
                    this.UI_Txt_RewardInfo.text = "  +" + data.rewardNum;
                    this.UI_Img_RewardIcon.gray = false;
                    this.UI_Img_RewardIcon.skin = ConstDefine.IconSkin_Lottery;
                    this.UI_Efc_SeeSaw.play(0, true);
                    break;
                }
                case 3: {
                    this.UI_Txt_RewardInfo.visible = false;
                    this.UI_Img_RewardIcon.visible = false;
                    this.UI_Btn_GetReward.mouseEnabled = false;
                    this.UI_Efc_SeeSaw.stop();
                    this.UI_Img_RewardIcon.gray = false;
                    break;
                }
            }
        }
        else {
            //无值，显示默认值
            this.UI_Img_RewardBG.skin = "resources/invitefriend/img_lottery_text_bg.png";
            this.UI_Txt_RewardInfo.color = "#ffffff";
            this.UI_Txt_RewardInfo.visible = true;
            this.UI_Img_RewardIcon.visible = true;
            this.UI_Img_Default_Icon.visible = true;
            this.UI_Img_Loading.visible = false;
            this.UI_Img_ProfileIcon.visible = false;
            this.UI_Btn_GetReward.mouseEnabled = false;
            this.UI_Img_RewardIcon.gray = true;
            this.UI_Txt_RewardInfo.text = "  +99";
            this.UI_Img_RewardIcon.skin = ConstDefine.IconSkin_Diamond;
            this.UI_Img_RewardIcon.rotation = 0;
            if (this.UI_Efc_SeeSaw.isPlaying) {
                this.UI_Efc_SeeSaw.stop();
            }
        }
    };
    return InviteVerifyItem;
}(ui.PrefabUI.InviteVerifyItemPrefabUI));
//# sourceMappingURL=InviteVerifyItem.js.map