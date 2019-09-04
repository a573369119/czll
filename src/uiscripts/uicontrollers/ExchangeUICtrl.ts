
/**
* Created By Code Generator
*/
module ui.uicontrollers {
    import Facade = puremvc.Facade;

    export class ExchangeUICtrl extends ui.BaseUICtrl {
        private exchangeNum: number;
        private exchangeType: EnumDiamondExchangeType;
        private longPressTask: number;
        private remCount: number = 0;///-mb 24
        private changeNum: number = 500;

        private localDiamondNum: number;

        constructor(view: View) {
            super(view);
        }

        public GetView(): ui.ExchangeUI {
            return this.uiView as ui.ExchangeUI;
        }

        /**
         * @override
         */
        public Init(parent: Laya.Sprite, id: ui.UIID) {
            super.Init(parent, id);
            this.mediatorName = ui.UIID.ExchangeUIID.toString();

            //ui配置
            //this.uiConfig = new WindowConfigData();
            //this.uiConfig.uiOpenAnimType = UIAnim.PopOpen;
            //this.uiConfig.uiCloseAnimType = UIAnim.PopClose;
            //this.uiConfig.depth = 0;
            //添加舞台
            parent.addChild(this.uiView)
            this.uiView.zOrder = this.uiConfig.depth;

            this.RegisterEvent();

            //自适应
            this.GetView().on(Laya.Event.RESIZE, this, () => {
                this.GetView().width = Laya.stage.width;
                this.GetView().height = Laya.stage.height;
            });

        }

        /**
         * @override
         */
        //ui动画执行前
        protected BeforeUIOpen(context: WindowContextDataBase = null) {
            super.BeforeUIOpen(context);

            //确定当前是什么的兑换
            let data = context as ExchangeUIParam;
            this.exchangeType = data.exchangeType;
            //2019-7-29 18:02:22 因为动画和UI要提前显示，因此需要每次打开UI的时候保存钻石数量，用以校验按钮点击
            this.localDiamondNum = GameDataManager.getInstance().LoginPlayerInfo.MoneyInfo.diamondNum;
            //根据兑换类型改变文字描述与图片显示
            this.InitLayout();
            //每次UI打开前，初始化显示内容
            this.exchangeNum = 1;
            this.ShowExchange();
            //长按相关
            this.longPressTask = -1;
        }
        /**
        * @override
        */
        //ui打开动画完成
        protected OnUIOpened(context: WindowContextDataBase = null) {
            super.OnUIOpened(context);
        }
        /**
         * @override
         */
        //ui关闭动画完成
        protected OnUIHide() {
            super.OnUIHide();

            this.CancelBtnLongPress();
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

            this.CancelBtnLongPress();
        }

        private RegisterEvent(): void {
            Facade.getInstance().registerMediator(this)
            this.GetView().UI_Btn_Cancel.on(Laya.Event.CLICK, this, this.OnUI_Btn_CancelClick);

            this.GetView().UI_Btn_Reduce.on(Laya.Event.CLICK, this, this.OnUI_Btn_ReduceClick);
            this.GetView().UI_Btn_Add.on(Laya.Event.CLICK, this, this.OnUI_Btn_AddClick);////////////////////////////////
            this.GetView().UI_Btn_GainDiamond.on(Laya.Event.CLICK, this, this.OnUI_Btn_GainDiamondClick);
            this.GetView().UI_Btn_Exchange.on(Laya.Event.CLICK, this, this.OnUI_Btn_ExchangeClick);

            //2019-6-5 10:06:03 兑换面板长按功能，1秒后每秒叠加5，不超过上限
            this.GetView().UI_Btn_Reduce.on(Laya.Event.MOUSE_DOWN, this, this.OnUI_Btn_ReduceDown);
            this.GetView().UI_Btn_Reduce.on(Laya.Event.MOUSE_OUT, this, this.CancelBtnLongPress);
            this.GetView().UI_Btn_Reduce.on(Laya.Event.MOUSE_UP, this, this.CancelBtnLongPress);

            this.GetView().UI_Btn_Add.on(Laya.Event.MOUSE_DOWN, this, this.OnUI_Btn_AddDown);
            this.GetView().UI_Btn_Add.on(Laya.Event.MOUSE_OUT, this, this.CancelBtnLongPress);
            this.GetView().UI_Btn_Add.on(Laya.Event.MOUSE_UP, this, this.CancelBtnLongPress);
        }
        private RemoveEvent(): void {
            Facade.getInstance().removeMediator(this.getMediatorName());

            this.GetView().UI_Btn_Cancel.off(Laya.Event.CLICK, this, this.OnUI_Btn_CancelClick);
            this.GetView().UI_Btn_Reduce.off(Laya.Event.CLICK, this, this.OnUI_Btn_ReduceClick);
            this.GetView().UI_Btn_Add.off(Laya.Event.CLICK, this, this.OnUI_Btn_AddClick);
            this.GetView().UI_Btn_GainDiamond.off(Laya.Event.CLICK, this, this.OnUI_Btn_GainDiamondClick);
            this.GetView().UI_Btn_Exchange.off(Laya.Event.CLICK, this, this.OnUI_Btn_ExchangeClick);

            //2019-6-5 10:06:03 兑换面板长按功能，1秒后每秒叠加5，不超过上限
            this.GetView().UI_Btn_Reduce.off(Laya.Event.MOUSE_DOWN, this, this.OnUI_Btn_ReduceDown);
            this.GetView().UI_Btn_Reduce.off(Laya.Event.MOUSE_OUT, this, this.CancelBtnLongPress);
            this.GetView().UI_Btn_Reduce.off(Laya.Event.MOUSE_UP, this, this.CancelBtnLongPress);

            this.GetView().UI_Btn_Add.off(Laya.Event.MOUSE_DOWN, this, this.OnUI_Btn_AddDown);
            this.GetView().UI_Btn_Add.off(Laya.Event.MOUSE_OUT, this, this.CancelBtnLongPress);
            this.GetView().UI_Btn_Add.off(Laya.Event.MOUSE_UP, this, this.CancelBtnLongPress);
        }
        private OnUI_Btn_CancelClick() {
            this.sendNotification(NotificationNames.DESTROYUI, UIID.ExchangeUIID);
        }
        private OnUI_Btn_ReduceClick() {
            //数量减少
            this.exchangeNum -= 1;
            //判断不得少于0
            if (this.exchangeNum < 0) {
                this.exchangeNum = 0;
            }
            //刷新
            this.ShowExchange();
            //播放音效
            AudioManager.GetInstance().PlaySoundByConfigID(EnumSoundID.sound_function_touch_01);
        }
        private OnUI_Btn_AddClick() {
            //数量增加
            this.exchangeNum += 1;
            //判断不得大于上限
            if (this.exchangeNum > this.localDiamondNum) {
                this.exchangeNum = this.localDiamondNum;
            }
            //刷新
            this.ShowExchange();
            //播放音效
            AudioManager.GetInstance().PlaySoundByConfigID(EnumSoundID.sound_function_touch_01);
        }
        private OnUI_Btn_GainDiamondClick() {
            //跳转到邀请
            //关闭面板
            this.sendNotification(NotificationNames.DESTROYUI, UIID.ExchangeUIID);
            //2019-7-16 17:15:41 用开关进行切换判断
            if (GameDataManager.getInstance().InviteType == 0) {
                //旧功能
                // 打开邀请面板
                this.sendNotification(NotificationNames.OPENUI, UIID.InviteFriendUIID);
                // 查询好友邀请列表 
                HttpMessageSender.GetSender().SendCheckInviteList(GameDataManager.getInstance().LoginPlayerInfo.OpenID);
            } else {
                //新功能（有转盘的UI
                if (GameDataManager.getInstance().LoginPlayerInfo.VerifyInfo.state == 0) {
                    //未验证，打开验证面板
                    this.sendNotification(NotificationNames.OPENUI, UIID.VerifyUIID);
                } else {
                    //已验证，打开邀请面板
                    this.sendNotification(NotificationNames.OPENUI, UIID.InviteVerifyFriendUIID);
                    //查询好友邀请列表 
                    HttpMessageSender.GetSender().SendCheckInviteList(GameDataManager.getInstance().LoginPlayerInfo.OpenID);
                }
            }
            //播放音效
            AudioManager.GetInstance().PlaySoundByConfigID(EnumSoundID.sound_function_touch_01);
        }
        private OnUI_Btn_ExchangeClick() {
            let exchangeNum = this.exchangeNum;
            //本地记录钻石的数量，避免过多发送消息
            this.localDiamondNum -= exchangeNum;
            if (this.localDiamondNum <= 0) {
                this.localDiamondNum = 0;
            }
            this.ShowExchange();
            //发送兑换消息
            HttpMessageSender.GetSender().SendExchangeWithDiamond(GameDataManager.getInstance().LoginPlayerInfo.OpenID, this.exchangeType, exchangeNum, null, () => {
                //发送失败
                this.localDiamondNum += exchangeNum;
            });
            //播放音效
            AudioManager.GetInstance().PlaySoundByConfigID(EnumSoundID.sound_function_touch_02);

        }

        //-mb 24 
        private CancelBtnLongPress() {
            this.changeNum = 500;//复原
            this.remCount = 0;
            Laya.timer.clear(this, this.longPress);
            Laya.timer.clear(this, this.longProessOne);
        }


        private OnUI_Btn_ReduceDown() {
            // //1秒后触发长按mb24
            // this.longPressTask = TimeManager.getInst().delayLoop(1, 1, cbhandler.gen_handler(this.LongPressFunc, this, false), false);
            Laya.timer.once(300, this, this.longProessOne, [false]);
        }

        private OnUI_Btn_AddDown() {
            // //1秒后触发长按mb24
            // this.longPressTask = TimeManager.getInst().delayLoop(1, 1, cbhandler.gen_handler(this.LongPressFunc, this, true), false);
            Laya.timer.once(300, this, this.longProessOne, [true]);
        }


        /**
         * @override
         */
        listNotificationInterests(): string[] {
            return [
                NotificationNames.ExchangeUI_ExchangeResult,
            ];
        }

        /**
        * @override
        */
        handleNotification(note: puremvc.INotification): void {
            let view = this.GetView();
            switch (note.getName()) {
                case NotificationNames.ExchangeUI_ExchangeResult: {
                    //收到消息，代表兑换成功
                    // this.OnUI_Btn_CancelClick();
                    //2019-7-26 16:40:24 播放动画
                    if (this.exchangeType == EnumDiamondExchangeType.Coin) {
                        //金币动画
                        MoneyAnimManager.Instance.PlayMoneyAnim_Pos_Curve(EnumMoneyAnimType.CoinAnim, 5, new Vec2(600, 1100), new Vec2(ConstDefine.MoneyImgPos_Coin.x, ConstDefine.MoneyImgPos_Coin.y), 500, null, null, null, 0.4);
                    } else if (this.exchangeType == EnumDiamondExchangeType.Power) {
                        //体力动画
                        MoneyAnimManager.Instance.PlayMoneyAnim_Pos_Curve(EnumMoneyAnimType.Power, 5, new Vec2(600, 1100), new Vec2(ConstDefine.MoneyImgPos_Power.x, ConstDefine.MoneyImgPos_Power.y), 500, null, null, null, 0.4);
                    }
                    //每次兑换成功后，重新刷新本地数值和UI
                    // this.localDiamondNum = GameDataManager.getInstance().LoginPlayerInfo.MoneyInfo.diamondNum;
                    // if (this.exchangeNum > this.localDiamondNum) {
                    //     this.exchangeNum = this.localDiamondNum;
                    // }
                    // this.ShowExchange();
                    break;
                }
            }
        }


        //根据兑换类型，改变文字显示与图片显示
        private InitLayout() {
            let view = this.GetView();
            switch (this.exchangeType) {
                case EnumDiamondExchangeType.Coin: {
                    view.UI_Img_Title_Coin.visible = view.UI_Img_Coin.visible = true;
                    view.UI_Img_Title_Power.visible = view.UI_Img_Power.visible = false;
                    break;
                }
                case EnumDiamondExchangeType.Power: {
                    view.UI_Img_Title_Coin.visible = view.UI_Img_Coin.visible = false;
                    view.UI_Img_Title_Power.visible = view.UI_Img_Power.visible = true;
                    break;
                }
            }
        }

        //根据计数，改变显示内容
        private ShowExchange() {
            let view = this.GetView();
            //1.改变显示内容
            if (0 == this.localDiamondNum) this.exchangeNum = 0;
            view.UI_Ipt_DiamondNum.text = this.exchangeNum.toString();
            //2.根据当前的兑换类型，显示兑换数字
            switch (this.exchangeType) {
                case EnumDiamondExchangeType.Coin: {
                    let coinNum = GameDataUtil.DiamondExchange_Coin(this.exchangeNum);
                    view.UI_Txt_GainNum.text = GameDataUtil.NumberToString(coinNum);
                    break;
                }
                case EnumDiamondExchangeType.Power: {
                    let powerNum = GameDataUtil.DiamondExchange_Power(this.exchangeNum);
                    view.UI_Txt_GainNum.text = GameDataUtil.NumberToString(powerNum);
                    break;
                }
            }
            //3.根据当前的钻石剩余数量，显示提示，并且切换钻石点击按钮状态
            let diamondEnough = this.exchangeNum <= this.localDiamondNum && this.localDiamondNum > 0;
            view.UI_Btn_Exchange.mouseEnabled = diamondEnough;
            view.UI_Btn_Exchange.gray = !diamondEnough;
            // view.UI_Txt_DiamondTip.visible = !diamondEnough;
        }

        // //长按功能
        // private LongPressFunc(add: boolean) {
        //     //每秒钟叠加5/减少5，不破上限，最少是1
        //     if (add) {
        //         this.exchangeNum += 5;
        //         if (this.exchangeNum > this.localDiamondNum) {
        //             this.exchangeNum = this.localDiamondNum;
        //         }
        //     } else {
        //         this.exchangeNum -= 5;
        //         if (this.exchangeNum < 1) {
        //             this.exchangeNum = 1;
        //         }
        //     }
        //     //更新显示
        //     this.ShowExchange();
        //     //播放音效
        //     AudioManager.GetInstance().PlaySoundByConfigID(EnumSoundID.sound_function_touch_01);
        // }
        /**
         * 长安一秒mb24
         */
        private longProessOne(isAdd) {
            Laya.timer.loop(1, this, this.longPress, [isAdd]);
        }

        /**
         * 长安逻辑 -mb24
         */
        private longPress(isAdd) {
            this.remCount++;
            if (this.remCount * 30 > this.changeNum) {
                this.changeNum -= 50 * (0.5 + 0.5 * ConstDefine.UI_CHANGE_SEEPD_GROW);
                if (isAdd) this.exchangeNum++;
                else this.exchangeNum--;

                this.remCount = 0;
                if (this.changeNum <= 40 * ConstDefine.UI_CHANGE_SEEPD_MAX) this.changeNum = 50 * ConstDefine.UI_CHANGE_SEEPD_MAX;
                if (this.exchangeNum > this.localDiamondNum) this.exchangeNum = this.localDiamondNum;
                if (this.exchangeNum <= 0) this.exchangeNum = 0;

                //更新显示
                this.ShowExchange();
                //播放音效
                AudioManager.GetInstance().PlaySoundByConfigID(EnumSoundID.sound_function_touch_01);
            }
        }
    }
}