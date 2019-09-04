
/**
* Created By Code Generator
*/
module ui.uicontrollers {
    import Facade = puremvc.Facade;

    export class MoneyInfoUICtrl extends ui.BaseUICtrl {
        private readonly ProgressWidth_Max = 151;
        private readonly ProgressWidth_Min = 0;

        private wechatTop: number;

        private powerTimeTask: number;
        private readonly uiAnimTime: number = 1;

        constructor(view: View) {
            super(view);
        }

        public GetView(): ui.MoneyInfoUI {
            return this.uiView as ui.MoneyInfoUI;
        }
        /**
         * @override
         */
        public Init(parent: Laya.Sprite, id: ui.UIID) {
            super.Init(parent, id);
            this.mediatorName = ui.UIID.MoneyInfoUIID.toString();

            //ui配置
            //this.uiConfig = new WindowConfigData();
            //this.uiConfig.uiOpenAnimType = UIAnim.PopOpen;
            //this.uiConfig.uiCloseAnimType = UIAnim.PopClose;
            //this.uiConfig.depth = 0;
            //添加舞台
            parent.addChild(this.uiView)
            this.uiView.zOrder = this.uiConfig.depth;

            this.RegisterEvent();

            this.powerTimeTask = -1;

            //自适应
            this.GetView().on(Laya.Event.RESIZE, this, () => {
                this.GetView().width = Laya.stage.width;
                this.GetView().height = Laya.stage.height;
            });

            //读取顶部内容
            this.wechatTop = WechatUtil.getIntance().WechatTop(); //返回距离屏幕顶部距离
        }

        /**
         * @override
         */
        //ui动画执行前
        protected BeforeUIOpen(context: WindowContextDataBase = null) {
            super.BeforeUIOpen(context);

            let view = this.GetView();
            view.UI_Anchor_Top.top = -110;
        }
        /**
        * @override
        */
        //ui打开动画完成
        protected OnUIOpened(context: WindowContextDataBase = null) {
            super.OnUIOpened(context);

            let view = this.GetView();
            //播放动画
            Tween2DUtil.to({
                node: view.UI_Anchor_Top,
                duration: this.uiAnimTime,
                top: 0 + this.wechatTop
            })

            //刷新钱币信息
            this.RefreshMoneyInfo();
        }
        /**
         * @override
         */
        //ui关闭动画完成
        protected OnUIHide() {
            super.OnUIHide();


            //取消计时
            // if (this.powerTimeTask != -1) {
            //     TimeManager.getInst().remove(this.powerTimeTask);
            //     this.powerTimeTask = -1;
            // }
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
            Facade.getInstance().registerMediator(this)
            this.GetView().UI_Btn_Add_Coin.on(Laya.Event.CLICK, this, this.OnUI_Btn_Add_CoinClick);
            this.GetView().UI_Btn_Add_Power.on(Laya.Event.CLICK, this, this.OnUI_Btn_Add_PowerClick);
            this.GetView().UI_Btn_Add_Diamond.on(Laya.Event.CLICK, this, this.OnUI_Btn_Add_DiamondClick);

        }
        private RemoveEvent(): void {
            Facade.getInstance().removeMediator(this.getMediatorName());

            this.GetView().UI_Btn_Add_Coin.off(Laya.Event.CLICK, this, this.OnUI_Btn_Add_CoinClick);
            this.GetView().UI_Btn_Add_Power.off(Laya.Event.CLICK, this, this.OnUI_Btn_Add_PowerClick);
            this.GetView().UI_Btn_Add_Diamond.off(Laya.Event.CLICK, this, this.OnUI_Btn_Add_DiamondClick);

        }
        private OnUI_Btn_Add_CoinClick() {
            this.sendNotification(NotificationNames.OPENUIWITHPARAM, new ExchangeUIParam(EnumDiamondExchangeType.Coin));
            //播放音效
            AudioManager.GetInstance().PlaySoundByConfigID(EnumSoundID.sound_function_touch_01);
        }
        private OnUI_Btn_Add_PowerClick() {
            this.sendNotification(NotificationNames.OPENUIWITHPARAM, new ExchangeUIParam(EnumDiamondExchangeType.Power));
            //播放音效
            AudioManager.GetInstance().PlaySoundByConfigID(EnumSoundID.sound_function_touch_01);
        }
        private OnUI_Btn_Add_DiamondClick() {
            //2019-6-12 17:50:21 立刻打开面板
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

        /**
         * @override
         */
        listNotificationInterests(): string[] {
            return [
                NotificationNames.UI_RefreshMoneyInfo,
            ];
        }

        /**
        * @override
        */
        handleNotification(note: puremvc.INotification): void {
            switch (note.getName()) {
                case NotificationNames.UI_RefreshMoneyInfo: {
                    //重新读取钱币信息
                    this.RefreshMoneyInfo();
                    break;
                }
            }
        }


        //刷新钱币信息
        private RefreshMoneyInfo() {
            let view = this.GetView();
            view.UI_Txt_Coin.text = GameDataUtil.NumberToString(GameDataManager.getInstance().LoginPlayerInfo.MoneyInfo.goldNum)
            view.UI_Txt_Diamond.text = GameDataUtil.NumberToString(GameDataManager.getInstance().LoginPlayerInfo.MoneyInfo.diamondNum);
            view.UI_Txt_Power.text = GameDataUtil.NumberToString(GameDataManager.getInstance().LoginPlayerInfo.MoneyInfo.pointNum);
            //根据剩余体力，判断是否需要显示倒计时
            let powerUnFull = GameDataManager.getInstance().LoginPlayerInfo.MoneyInfo.pointNum < ConstDefine.MaxValue_Power;
            view.UI_Txt_PowerCount.visible = powerUnFull;
            //如果当前没有进行时间任务，则开启时间任务
            if (powerUnFull && this.powerTimeTask == -1) {
                //立刻执行一次
                this.SecondLoopPower();
                //开启体力倒计时
                if (this.powerTimeTask == -1) this.powerTimeTask = TimeManager.getInst().loop(1, cbhandler.gen_handler(this.SecondLoopPower, this));

            }
            //2019-6-11 13:23:35 新需求 体力进度条
            let progress = GameDataManager.getInstance().LoginPlayerInfo.MoneyInfo.pointNum / ConstDefine.MaxValue_Power
            //控制在0~1之间
            if (progress > 1) {
                progress = 1;
            } else if (progress < 0) {
                progress = 0;
            }
            this.SetProgress(progress);
        }


        //体力倒计时
        private SecondLoopPower() {
            let second = ConstDefine.PowerReviewTime - (Math.floor(Date.now() / 1000) - (GameDataManager.getInstance().LoginPlayerInfo.MoneyInfo.latestPointRefreshTime as number));
            let view = this.GetView();

            //2019-6-26 14:57:19 避免可能出现的负秒数，引起显示上的错误
            if (second >= 0) {//报错，可能连View都没有
                if (!view) {
                    Log.Error("【严重】：MoneyView is Error! second >= 0", [second, view,]);
                    //取消计时
                    TimeManager.getInst().remove(this.powerTimeTask);

                    this.powerTimeTask = -1;
                    // this.Destroy();
                    return;
                }
                if (view.UI_Txt_PowerCount) view.UI_Txt_PowerCount.text = GameDataUtil.ConvertSecondToTimeStr(second, false) + " +1";
            }
            //超时判断
            if (second <= 0) {
                //取消计时
                if (this.powerTimeTask != -1) {
                    TimeManager.getInst().remove(this.powerTimeTask);
                    this.powerTimeTask = -1;
                }
                //数量判断，避免因重复执行时误操作发送消息
                if (GameDataManager.getInstance().LoginPlayerInfo.MoneyInfo.pointNum < ConstDefine.MaxValue_Power) {
                    //发送获取体力
                    HttpMessageSender.GetSender().SendGainPointByTime(GameDataManager.getInstance().LoginPlayerInfo.OpenID);
                }
            }
        }


        /**
         * 设置进度条
         * @param ratio 0~1
         */
        private SetProgress(ratio: number) {
            let view = this.GetView();
            view.UI_Img_Power_Mask.width = this.ProgressWidth_Min + (this.ProgressWidth_Max - this.ProgressWidth_Min) * ratio;
        }
    }
}