class InviteItem extends ui.PrefabUI.InviteItemPrefabUI {
    private itemData: com.msg.inviteDetail;
    constructor() {
        super();
        this.UI_Btn_GetReward.on(Laya.Event.CLICK, this, this.OnUI_Btn_GetRewardClick);
    }

    private OnUI_Btn_GetRewardClick() {
        if (this.itemData) {
            //点击按钮时，发送消息
            HttpMessageSender.GetSender().SendGetInviteReward(GameDataManager.getInstance().LoginPlayerInfo.OpenID, this.itemData.friendOpenID);
            //播放音效
            AudioManager.GetInstance().PlaySoundByConfigID(EnumSoundID.sound_function_touch_02);
        }
    }

    //更新渲染物体
    public RenderItem(data: com.msg.inviteDetail, index: number) {
        //2019-6-14 21:31:42 获取状态判断
        if (this.itemData && data && this.itemData.friendOpenID == data.friendOpenID) {
            if (this.itemData.rewardGained == 0 && data.rewardGained != 0) {
                //本次更新为获取，播放动画
                let worldPos = CommonUtil2D.GetGlobalPosition(this.UI_Btn_GetReward);
                MoneyAnimManager.Instance.PlayMoneyAnim_Pos_Curve(EnumMoneyAnimType.Diamond, 5, worldPos, new Vec2(ConstDefine.MoneyImgPos_Diamond.x, ConstDefine.MoneyImgPos_Diamond.y), 500);
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
            this.UI_Img_ProfileIcon.visible = true;
            this.UI_Img_ProfileIcon.loadImage(this.itemData.picUrl, 0, 0, this.UI_Img_ProfileIcon.width, this.UI_Img_ProfileIcon.height, Laya.Handler.create(this, () => {
                Log.Debug("InivteItem 加载图片完成：", this.itemData.picUrl);
            }, null, false));
            this.UI_Btn_GetReward.label = this.itemData.rewardGained < 1 ? "领取" : "已领取";
            this.UI_Btn_GetReward.gray = this.itemData.rewardGained >= 1;
            this.UI_Btn_GetReward.mouseEnabled = this.itemData.rewardGained < 1;
            this.UI_Txt_Reward.text = "+" + data.rewardNum;
        } else {
            //无值，显示默认值
            this.UI_Img_Default_Icon.visible = true;
            this.UI_Img_ProfileIcon.visible = false;
            this.UI_Btn_GetReward.label = "待邀请";
            this.UI_Btn_GetReward.gray = true;
            this.UI_Btn_GetReward.mouseEnabled = false;
            this.UI_Txt_Reward.text = "+" + (index + 1) * 10;
        }
    }

}
