
/**
* Created By Code Generator
*/
module ui.uicontrollers {
    import Facade = puremvc.Facade;

    export class InviteVerifyFriendUICtrl extends ui.BaseUICtrl {
        // private curListLength: number = 20;
        private tweenTask: number;

        constructor(view: View) {
            super(view);
        }

        public GetView(): ui.InviteVerifyFriendUI {
            return this.uiView as ui.InviteVerifyFriendUI;
        }
        /**
         * @override
         */
        public Init(parent: Laya.Sprite, id: ui.UIID) {
            super.Init(parent, id);
            this.mediatorName = ui.UIID.InviteVerifyFriendUIID.toString();

            //ui配置
            //this.uiConfig = new WindowConfigData();
            //this.uiConfig.uiOpenAnimType = UIAnim.PopOpen;
            //this.uiConfig.uiCloseAnimType = UIAnim.PopClose;
            //this.uiConfig.depth = 0;
            //添加舞台
            parent.addChild(this.uiView)
            this.uiView.zOrder = this.uiConfig.depth;
            // this.uiView.zOrder = 1000;//最高层

            this.RegisterEvent();

            //自适应
            this.GetView().on(Laya.Event.RESIZE, this, () => {
                this.GetView().width = Laya.stage.width;
                this.GetView().height = Laya.stage.height;
            });

            this.tweenTask = -1;

            //初始化列表
            this.InitList();

            //初始化转盘
            this.InitLottery();
        }

        /**
         * @override
         */
        //ui动画执行前
        protected BeforeUIOpen(context: WindowContextDataBase = null) {
            super.BeforeUIOpen(context);

            //动画效果
            let view = this.GetView();
            view.UI_Img_Scale.scale(0, 0);
            this.tweenTask = Tween2DUtil.to({
                node: view.UI_Img_Scale,
                duration: ConstDefine.Common_PanelScaleUpTime,
                scalex: ConstDefine.Common_PanelScaleUpMax,
                scaley: ConstDefine.Common_PanelScaleUpMax,
                onComplete: cbhandler.gen_handler(() => {
                    this.tweenTask = Tween2DUtil.to({
                        node: view.UI_Img_Scale,
                        duration: ConstDefine.Common_PanelScaleBounceTime,
                        scalex: 1,
                        scaley: 1,
                        onComplete: cbhandler.gen_handler(() => {
                            this.tweenTask = -1;
                        }, this)
                    })
                }, this)
            })
        }
        /**
        * @override
        */
        //ui打开动画完成
        protected OnUIOpened(context: WindowContextDataBase = null) {
            super.OnUIOpened(context);

            //UI打开的时候，只显示文字提示
            let view = this.GetView();
            view.UI_List_InviteFriend.visible = false;
            view.UI_Txt_CheckTip.visible = true;
            view.UI_Txt_CheckTip.text = "查询中，请稍后..."
            view.UI_Txt_InviteNum.text = "";
            view.UI_Txt_VerifyNum.text = "";

            this.sendNotification(NotificationNames.HomepageUI_SetBottomButtonState, new HomepageBottomButtonState(1, true));

            if (CommonUtil.OnMiniGame()) {
                WechatUtil.getIntance().ShowBannerAd();
            }

            this.OpenLottery();
        }
        /**
         * @override
         */
        //ui关闭动画完成
        protected OnUIHide() {
            super.OnUIHide();

            //关闭UI时，移除list内容
            // this.CloseList();

            this.sendNotification(NotificationNames.HomepageUI_SetBottomButtonState, new HomepageBottomButtonState(1, false));

            if (this.tweenTask != -1) {
                Tween2DUtil.kill(this.tweenTask);
                this.tweenTask = -1;
            }

            this.CloseList();
            this.CloseLottery();

            if (CommonUtil.OnMiniGame()) {
                WechatUtil.getIntance().HideBannerAd();
            }

        }
        /**
         * @override
         */
        protected BeforeUIDestroy() {
            super.BeforeUIDestroy();
            this.RemoveEvent();
        }
        /**
         * @override
         */
        protected OnUIDestroy() {
            super.OnUIDestroy();
        }

        private RegisterEvent(): void {
            let view = this.GetView();

            Facade.getInstance().registerMediator(this)
            view.UI_Btn_Cancel.on(Laya.Event.CLICK, this, this.OnUI_Btn_CancelClick);
            view.UI_Btn_InviteFriend.on(Laya.Event.CLICK, this, this.OnUI_Btn_InviteFriendClick);

            view.UI_Btn_Lottery.on(Laya.Event.CLICK, this, this.OnUI_Btn_LotteryClick);

            view.UI_Btn_CheckLotteryHist.on(Laya.Event.CLICK, this, this.OnUI_Btn_CheckLotteryHistClick);

            view.UI_Btn_Lottery_SpeedUp.on(Laya.Event.CLICK, this, this.OnUI_Btn_Lottery_SpeedUpClick);
            view.UI_Btn_Lottery_SpeedDown.on(Laya.Event.CLICK, this, this.OnUI_Btn_Lottery_SpeedDownClick);
        }
        private RemoveEvent(): void {
            let view = this.GetView();

            Facade.getInstance().removeMediator(this.getMediatorName());

            view.UI_Btn_Cancel.off(Laya.Event.CLICK, this, this.OnUI_Btn_CancelClick);
            view.UI_Btn_InviteFriend.off(Laya.Event.CLICK, this, this.OnUI_Btn_InviteFriendClick);

            view.UI_Btn_Lottery.off(Laya.Event.CLICK, this, this.OnUI_Btn_LotteryClick);

            view.UI_Btn_CheckLotteryHist.off(Laya.Event.CLICK, this, this.OnUI_Btn_CheckLotteryHistClick);

            view.UI_Btn_Lottery_SpeedUp.off(Laya.Event.CLICK, this, this.OnUI_Btn_Lottery_SpeedUpClick);
            view.UI_Btn_Lottery_SpeedDown.off(Laya.Event.CLICK, this, this.OnUI_Btn_Lottery_SpeedDownClick);
        }
        private OnUI_Btn_CancelClick() {
            //关闭面板
            this.sendNotification(NotificationNames.HIDEUI, UIID.InviteVerifyFriendUIID);
        }
        private OnUI_Btn_InviteFriendClick() {
            //发送分享
            if (CommonUtil.OnMiniGame()) {
                WechatUtil.getIntance().ShareWithPicAndTitle(ResPathConst.SHARE_PIC[0], "虫子来袭，消灭它们！", null, null,
                    //自己的OpenID，用于邀请别人
                    WechatConstDefine.LOGIN_QUERY_KEY + "=" + GameDataManager.getInstance().LoginPlayerInfo.OpenID
                );
            }
        }

        private OnUI_Btn_LotteryClick() {
            //点击开始抽奖
            this.localLotteryMaxNum -= 1;
            this.localLotteryNum += 1;
            this.CheckLotteryClickEnable();
            //音效
            AudioManager.GetInstance().PlaySoundByConfigID(EnumSoundID.sound_function_touch_01);
            //抽奖动画效果
            LotteryManager.Instance.LotterySpeedUp_Gird();
            //发送抽奖消息
            HttpMessageSender.GetSender().SendLottery(GameDataManager.getInstance().LoginPlayerInfo.OpenID);
            //添加时间函数
            if (this.lotteryTimeTask != -1) {
                TimeManager.getInst().remove(this.lotteryTimeTask);
            }
            this.lotteryTimeTask = TimeManager.getInst().once(3, cbhandler.gen_handler(this.LotteryTimeUp, this));
        }

        private OnUI_Btn_CheckLotteryHistClick() {
            //点击打开查询面板
            this.sendNotification(NotificationNames.OPENUI, UIID.LotteryRewardHistUIID);
            AudioManager.GetInstance().PlaySoundByConfigID(EnumSoundID.sound_function_touch_01);

        }





        private OnUI_Btn_Lottery_SpeedUpClick() {
            //测试按钮 点击加速转盘
            LotteryManager.Instance.LotterySpeedUp_Gird();
        }
        private OnUI_Btn_Lottery_SpeedDownClick() {
            //测试按钮 点击减速转盘
            let view = this.GetView();
            let result = Math.floor(Math.random() * 12);
            view.UI_Btn_Lottery.label = result.toString();
            LotteryManager.Instance.LotterySpeedDown_Gird(result, cbhandler.gen_handler(() => {
                Log.Debug("转盘停止！");
            }, this));
        }

        /**
         * @override
         */
        listNotificationInterests(): string[] {
            return [
                NotificationNames.InviteFriendUI_CheckInviteListComplete,
                NotificationNames.InviteFriendUI_RefreshFriendListInfo,
                NotificationNames.InviteFriendUI_LotteryResult,
                NotificationNames.InviteFriendUI_RefreshLotteryNum,
            ];
        }

        /**
        * @override
        */
        handleNotification(note: puremvc.INotification): void {
            let view = this.GetView();
            switch (note.getName()) {
                case NotificationNames.InviteFriendUI_CheckInviteListComplete: {
                    //查询完毕，开始显示内容
                    //打开UI时，设置list内容
                    this.OpenList();
                    view.UI_List_InviteFriend.visible = true;
                    view.UI_Txt_CheckTip.visible = false;
                    break;
                }
                case NotificationNames.InviteFriendUI_RefreshFriendListInfo: {
                    //因领奖之后状态需要刷新
                    let friendOpenID = note.getBody() as string;
                    let curList = this.GetOrderedInviteList();
                    //查找
                    for (let i = 0; i < curList.length; i++) {
                        let element = curList[i];
                        if (element.friendOpenID == friendOpenID) {
                            //更新
                            view.UI_List_InviteFriend.changeItem(i, element);
                            break;
                        }
                    }
                    break;
                }
                case NotificationNames.InviteFriendUI_LotteryResult: {
                    let configId = note.getBody() as number;

                    if (configId != -1) {
                        this.lotteryResultList.push(configId);
                    } else {
                        // this.lotteryFailedNum += 1;
                        // this.localLotteryMaxNum += 1;
                        // this.localLotteryNum -= 1;
                        // this.CheckLotteryClickEnable();
                    }
                    break;
                }
                case NotificationNames.InviteFriendUI_RefreshLotteryNum: {
                    //收到消息的时候，收到内容为新获取的奖励次数。UI内叠加显示
                    let lotteryDelta = note.getBody() as number;
                    this.localLotteryMaxNum += lotteryDelta;
                    this.CheckLotteryClickEnable();
                    break;
                }

            }
        }

        //初始化列表
        private InitList() {
            let view = this.GetView();
            //设置渲染物体
            view.UI_List_InviteFriend.itemRender = InviteVerifyItem;
            //滚动条
            view.UI_List_InviteFriend.hScrollBarSkin = "";
            //更新事件
            view.UI_List_InviteFriend.renderHandler = new Handler(this, this.RenderItem);
            //初始化数组
            view.UI_List_InviteFriend.array = [];
        }

        //更新
        private RenderItem(cell: InviteVerifyItem, index: number) {
            let data = cell.dataSource as com.msg.inviteDetail;
            //渲染
            cell.RenderItem(data, index);
        }

        //打开列表
        private OpenList() {
            let view = this.GetView();
            //根据好友邀请列表，刷新UI
            let curList = this.GetOrderedInviteList();
            //判断好友列表长度，如果比旧长度长则新增，否则只更新
            let listLength = this.GetListLength(curList.length);
            let verifyNum = 0;
            for (let i = 0; i < listLength; i++) {
                if (i < listLength - 1) {
                    view.UI_List_InviteFriend.addItem(curList[i]);
                    //判断好友是否已经绑定手机
                    if (curList[i].rewardGained >= 2) {
                        verifyNum++;
                    }
                } else {
                    //末尾的空item
                    view.UI_List_InviteFriend.addItem(null);
                }
            }
            view.UI_Txt_InviteNum.text = curList.length.toString();
            view.UI_Txt_VerifyNum.text = verifyNum.toString();
        }

        //2019-7-19 13:28:50 避免混乱，关闭面板的时候清空list
        private CloseList() {
            let view = this.GetView();
            let listLength = view.UI_List_InviteFriend.length;
            for (let i = 0; i < listLength; i++) {
                view.UI_List_InviteFriend.deleteItem(0);
            }
        }

        //获取长度
        //2019-7-16 13:48:16 新需求，总是在末尾有一个默认item
        private GetListLength(curLength: number): number {
            return curLength + 1;
        }

        //获取排好序的好友列表
        private GetOrderedInviteList(): com.msg.inviteDetail[] {
            //与服务器协议后，服务器返回的为正确顺序
            return GameDataManager.getInstance().LoginPlayerInfo.InvitedList;
        }

        //转盘部分
        private lotteryBoxArray: Array<Laya.Box>;
        private localLotteryMaxNum: number;     //每次UI打开的时候记录可以抽奖的次数，做本地动画判定用
        private localLotteryNum: number;    //抽奖点击的次数，留作验证
        private lotteryResultList: Array<number>;
        private lotteryTimeTask: number;
        // private lotteryFailedNum: number;
        private lotteryFailFloatTipGroupID: number

        //初始化
        private InitLottery() {
            let view = this.GetView();
            //1.添加引用
            this.lotteryBoxArray = new Array<Laya.Box>();
            this.lotteryBoxArray.push(view.UI_LotteryBox_0);
            this.lotteryBoxArray.push(view.UI_LotteryBox_1);
            this.lotteryBoxArray.push(view.UI_LotteryBox_2);
            this.lotteryBoxArray.push(view.UI_LotteryBox_3);
            this.lotteryBoxArray.push(view.UI_LotteryBox_4);
            this.lotteryBoxArray.push(view.UI_LotteryBox_5);
            this.lotteryBoxArray.push(view.UI_LotteryBox_6);
            this.lotteryBoxArray.push(view.UI_LotteryBox_7);
            this.lotteryBoxArray.push(view.UI_LotteryBox_8);
            this.lotteryBoxArray.push(view.UI_LotteryBox_9);
            this.lotteryBoxArray.push(view.UI_LotteryBox_10);
            this.lotteryBoxArray.push(view.UI_LotteryBox_11);
            //2.动态加载图片
            for (let i = 0; i < this.lotteryBoxArray.length; i++) {
                let box = this.lotteryBoxArray[i];
                //配置表的id从1开始
                let config = ConfigManager.GetInstance().GetLotteryRewardConfig(i + 1);
                let item = new LotteryItem();
                box.addChild(item);
                item.centerX = 0;
                item.centerY = 0;
                item.InitItem(config.rewardSkin, 0, 120);
            }
            //3.初始化转盘
            this.lotteryResultList = new Array<number>();
            //4.提示
            this.lotteryFailFloatTipGroupID = FloatTipAnimManager.Instance.CreateTipGroup(EnumFloatAnimType.LotteryTip);
        }

        private OpenLottery() {
            let view = this.GetView();

            //每次打开转盘时初始化
            LotteryManager.Instance.InitLottery_Gird(this.lotteryBoxArray, 0);

            this.localLotteryMaxNum = GameDataManager.getInstance().LoginPlayerInfo.MoneyInfo.lotteryNum;
            this.localLotteryNum = 0;

            this.CheckLotteryClickEnable();

            view.UI_Txt_InviteNum.text = "";
            view.UI_Txt_VerifyNum.text = "";
        }

        private CloseLottery() {
            //关闭转盘
            LotteryManager.Instance.CloseLottery_Gird();
        }

        private CheckLotteryClickEnable() {
            let view = this.GetView();

            view.UI_Btn_Lottery.label = this.localLotteryMaxNum.toString();
            view.UI_Btn_Lottery.disabled = this.localLotteryMaxNum <= 0;
        }

        //时间到，检查内容
        private LotteryTimeUp() {
            //发送刷新钱币的消息
            this.sendNotification(NotificationNames.UI_RefreshMoneyInfo);
            //检查数组内的数量和点击的数量是否相同
            if (this.lotteryResultList.length == this.localLotteryNum) {
                //数量匹配
                //开始减速，用最后一次的结果作为显示结果
                let result = new Array<number>();
                for (let i = 0; i < this.lotteryResultList.length; i++) {
                    let element = this.lotteryResultList[i];
                    result.push(element);
                }
                //configID从1开始，因此需要-1以匹配index
                LotteryManager.Instance.LotterySpeedDown_Gird(this.lotteryResultList[this.lotteryResultList.length - 1] - 1, cbhandler.gen_handler(() => {
                    //打开结果面板
                    this.sendNotification(NotificationNames.OPENUIWITHPARAM, new LotteryRewardUIParam(result));
                }, this));
            } else {
                //数量不匹配
                //提示抽奖失败
                Log.Debug("抽奖失败提示");
                FloatTipAnimManager.Instance.AddTip(this.lotteryFailFloatTipGroupID, "网络不好，请重试", new Vec2(150, 150), this.GetView().UI_Btn_Lottery);
                LotteryManager.Instance.LotteryStop_Gird();
                let delta = this.localLotteryNum - this.lotteryResultList.length;
                this.localLotteryMaxNum += delta;
                this.localLotteryNum -= delta;
                this.CheckLotteryClickEnable();
            }
            //清空
            // this.lotteryFailedNum = 0;
            this.lotteryResultList = new Array<number>();
            //清空点击数量
            this.localLotteryNum = 0;
        }








    }

}