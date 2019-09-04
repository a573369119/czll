var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
* Created By Code Generator
*/
var ui;
(function (ui) {
    var uicontrollers;
    (function (uicontrollers) {
        var Facade = puremvc.Facade;
        var MoneyInfoUICtrl = (function (_super) {
            __extends(MoneyInfoUICtrl, _super);
            function MoneyInfoUICtrl(view) {
                var _this = _super.call(this, view) || this;
                _this.ProgressWidth_Max = 151;
                _this.ProgressWidth_Min = 0;
                _this.uiAnimTime = 1;
                return _this;
            }
            MoneyInfoUICtrl.prototype.GetView = function () {
                return this.uiView;
            };
            /**
             * @override
             */
            MoneyInfoUICtrl.prototype.Init = function (parent, id) {
                var _this = this;
                _super.prototype.Init.call(this, parent, id);
                this.mediatorName = ui.UIID.MoneyInfoUIID.toString();
                //ui配置
                //this.uiConfig = new WindowConfigData();
                //this.uiConfig.uiOpenAnimType = UIAnim.PopOpen;
                //this.uiConfig.uiCloseAnimType = UIAnim.PopClose;
                //this.uiConfig.depth = 0;
                //添加舞台
                parent.addChild(this.uiView);
                this.uiView.zOrder = this.uiConfig.depth;
                this.RegisterEvent();
                this.powerTimeTask = -1;
                //自适应
                this.GetView().on(Laya.Event.RESIZE, this, function () {
                    _this.GetView().width = Laya.stage.width;
                    _this.GetView().height = Laya.stage.height;
                });
                //读取顶部内容
                this.wechatTop = WechatUtil.getIntance().WechatTop(); //返回距离屏幕顶部距离
            };
            /**
             * @override
             */
            //ui动画执行前
            MoneyInfoUICtrl.prototype.BeforeUIOpen = function (context) {
                if (context === void 0) { context = null; }
                _super.prototype.BeforeUIOpen.call(this, context);
                var view = this.GetView();
                view.UI_Anchor_Top.top = -110;
            };
            /**
            * @override
            */
            //ui打开动画完成
            MoneyInfoUICtrl.prototype.OnUIOpened = function (context) {
                if (context === void 0) { context = null; }
                _super.prototype.OnUIOpened.call(this, context);
                var view = this.GetView();
                //播放动画
                Tween2DUtil.to({
                    node: view.UI_Anchor_Top,
                    duration: this.uiAnimTime,
                    top: 0 + this.wechatTop
                });
                //刷新钱币信息
                this.RefreshMoneyInfo();
            };
            /**
             * @override
             */
            //ui关闭动画完成
            MoneyInfoUICtrl.prototype.OnUIHide = function () {
                _super.prototype.OnUIHide.call(this);
                //取消计时
                // if (this.powerTimeTask != -1) {
                //     TimeManager.getInst().remove(this.powerTimeTask);
                //     this.powerTimeTask = -1;
                // }
            };
            /**
             * @override
             */
            MoneyInfoUICtrl.prototype.BeforeUIDestroy = function () {
                _super.prototype.BeforeUIDestroy.call(this);
                this.RemoveEvent();
            };
            /**
             * @override
             */
            MoneyInfoUICtrl.prototype.OnUIDestroy = function () {
                _super.prototype.OnUIDestroy.call(this);
            };
            MoneyInfoUICtrl.prototype.RegisterEvent = function () {
                Facade.getInstance().registerMediator(this);
                this.GetView().UI_Btn_Add_Coin.on(Laya.Event.CLICK, this, this.OnUI_Btn_Add_CoinClick);
                this.GetView().UI_Btn_Add_Power.on(Laya.Event.CLICK, this, this.OnUI_Btn_Add_PowerClick);
                this.GetView().UI_Btn_Add_Diamond.on(Laya.Event.CLICK, this, this.OnUI_Btn_Add_DiamondClick);
            };
            MoneyInfoUICtrl.prototype.RemoveEvent = function () {
                Facade.getInstance().removeMediator(this.getMediatorName());
                this.GetView().UI_Btn_Add_Coin.off(Laya.Event.CLICK, this, this.OnUI_Btn_Add_CoinClick);
                this.GetView().UI_Btn_Add_Power.off(Laya.Event.CLICK, this, this.OnUI_Btn_Add_PowerClick);
                this.GetView().UI_Btn_Add_Diamond.off(Laya.Event.CLICK, this, this.OnUI_Btn_Add_DiamondClick);
            };
            MoneyInfoUICtrl.prototype.OnUI_Btn_Add_CoinClick = function () {
                this.sendNotification(NotificationNames.OPENUIWITHPARAM, new ui.ExchangeUIParam(EnumDiamondExchangeType.Coin));
                //播放音效
                AudioManager.GetInstance().PlaySoundByConfigID(EnumSoundID.sound_function_touch_01);
            };
            MoneyInfoUICtrl.prototype.OnUI_Btn_Add_PowerClick = function () {
                this.sendNotification(NotificationNames.OPENUIWITHPARAM, new ui.ExchangeUIParam(EnumDiamondExchangeType.Power));
                //播放音效
                AudioManager.GetInstance().PlaySoundByConfigID(EnumSoundID.sound_function_touch_01);
            };
            MoneyInfoUICtrl.prototype.OnUI_Btn_Add_DiamondClick = function () {
                //2019-6-12 17:50:21 立刻打开面板
                //2019-7-16 17:15:41 用开关进行切换判断
                if (GameDataManager.getInstance().InviteType == 0) {
                    //旧功能
                    // 打开邀请面板
                    this.sendNotification(NotificationNames.OPENUI, ui.UIID.InviteFriendUIID);
                    // 查询好友邀请列表 
                    HttpMessageSender.GetSender().SendCheckInviteList(GameDataManager.getInstance().LoginPlayerInfo.OpenID);
                }
                else {
                    //新功能（有转盘的UI
                    if (GameDataManager.getInstance().LoginPlayerInfo.VerifyInfo.state == 0) {
                        //未验证，打开验证面板
                        this.sendNotification(NotificationNames.OPENUI, ui.UIID.VerifyUIID);
                    }
                    else {
                        //已验证，打开邀请面板
                        this.sendNotification(NotificationNames.OPENUI, ui.UIID.InviteVerifyFriendUIID);
                        //查询好友邀请列表 
                        HttpMessageSender.GetSender().SendCheckInviteList(GameDataManager.getInstance().LoginPlayerInfo.OpenID);
                    }
                }
                //播放音效
                AudioManager.GetInstance().PlaySoundByConfigID(EnumSoundID.sound_function_touch_01);
            };
            /**
             * @override
             */
            MoneyInfoUICtrl.prototype.listNotificationInterests = function () {
                return [
                    NotificationNames.UI_RefreshMoneyInfo,
                ];
            };
            /**
            * @override
            */
            MoneyInfoUICtrl.prototype.handleNotification = function (note) {
                switch (note.getName()) {
                    case NotificationNames.UI_RefreshMoneyInfo: {
                        //重新读取钱币信息
                        this.RefreshMoneyInfo();
                        break;
                    }
                }
            };
            //刷新钱币信息
            MoneyInfoUICtrl.prototype.RefreshMoneyInfo = function () {
                var view = this.GetView();
                view.UI_Txt_Coin.text = GameDataUtil.NumberToString(GameDataManager.getInstance().LoginPlayerInfo.MoneyInfo.goldNum);
                view.UI_Txt_Diamond.text = GameDataUtil.NumberToString(GameDataManager.getInstance().LoginPlayerInfo.MoneyInfo.diamondNum);
                view.UI_Txt_Power.text = GameDataUtil.NumberToString(GameDataManager.getInstance().LoginPlayerInfo.MoneyInfo.pointNum);
                //根据剩余体力，判断是否需要显示倒计时
                var powerUnFull = GameDataManager.getInstance().LoginPlayerInfo.MoneyInfo.pointNum < ConstDefine.MaxValue_Power;
                view.UI_Txt_PowerCount.visible = powerUnFull;
                //如果当前没有进行时间任务，则开启时间任务
                if (powerUnFull && this.powerTimeTask == -1) {
                    //立刻执行一次
                    this.SecondLoopPower();
                    //开启体力倒计时
                    if (this.powerTimeTask == -1)
                        this.powerTimeTask = TimeManager.getInst().loop(1, cbhandler.gen_handler(this.SecondLoopPower, this));
                }
                //2019-6-11 13:23:35 新需求 体力进度条
                var progress = GameDataManager.getInstance().LoginPlayerInfo.MoneyInfo.pointNum / ConstDefine.MaxValue_Power;
                //控制在0~1之间
                if (progress > 1) {
                    progress = 1;
                }
                else if (progress < 0) {
                    progress = 0;
                }
                this.SetProgress(progress);
            };
            //体力倒计时
            MoneyInfoUICtrl.prototype.SecondLoopPower = function () {
                var second = ConstDefine.PowerReviewTime - (Math.floor(Date.now() / 1000) - GameDataManager.getInstance().LoginPlayerInfo.MoneyInfo.latestPointRefreshTime);
                var view = this.GetView();
                //2019-6-26 14:57:19 避免可能出现的负秒数，引起显示上的错误
                if (second >= 0) {
                    if (!view) {
                        Log.Error("【严重】：MoneyView is Error! second >= 0", [second, view,]);
                        //取消计时
                        TimeManager.getInst().remove(this.powerTimeTask);
                        this.powerTimeTask = -1;
                        // this.Destroy();
                        return;
                    }
                    if (view.UI_Txt_PowerCount)
                        view.UI_Txt_PowerCount.text = GameDataUtil.ConvertSecondToTimeStr(second, false) + " +1";
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
            };
            /**
             * 设置进度条
             * @param ratio 0~1
             */
            MoneyInfoUICtrl.prototype.SetProgress = function (ratio) {
                var view = this.GetView();
                view.UI_Img_Power_Mask.width = this.ProgressWidth_Min + (this.ProgressWidth_Max - this.ProgressWidth_Min) * ratio;
            };
            return MoneyInfoUICtrl;
        }(ui.BaseUICtrl));
        uicontrollers.MoneyInfoUICtrl = MoneyInfoUICtrl;
    })(uicontrollers = ui.uicontrollers || (ui.uicontrollers = {}));
})(ui || (ui = {}));
//# sourceMappingURL=MoneyInfoUICtrl.js.map