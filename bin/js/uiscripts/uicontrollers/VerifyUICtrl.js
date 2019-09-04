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
        var VerifyUICtrl = (function (_super) {
            __extends(VerifyUICtrl, _super);
            function VerifyUICtrl(view) {
                return _super.call(this, view) || this;
            }
            VerifyUICtrl.prototype.GetView = function () {
                return this.uiView;
            };
            /**
             * @override
             */
            VerifyUICtrl.prototype.Init = function (parent, id) {
                var _this = this;
                _super.prototype.Init.call(this, parent, id);
                this.mediatorName = ui.UIID.VerifyUIID.toString();
                //ui配置
                //this.uiConfig = new WindowConfigData();
                //this.uiConfig.uiOpenAnimType = UIAnim.PopOpen;
                //this.uiConfig.uiCloseAnimType = UIAnim.PopClose;
                //this.uiConfig.depth = 0;
                //添加舞台
                parent.addChild(this.uiView);
                this.uiView.zOrder = this.uiConfig.depth;
                this.RegisterEvent();
                //自适应
                this.GetView().on(Laya.Event.RESIZE, this, function () {
                    _this.GetView().width = Laya.stage.width;
                    _this.GetView().height = Laya.stage.height;
                });
                this.timeTask = -1;
                //2019-7-17 11:04:16 根据服务器配置，UI显示数值
                var view = this.GetView();
                view.UI_Txt_DiamondNum.text = GameDataManager.getInstance().VerifyReward.toString();
                this.innerHeight = window.innerHeight;
                this.dic_num = 0;
                this.currentIndex = 0;
                this.GetView().panel.hScrollBar.elasticDistance = 0;
                this.GetView().panel.hScrollBar.rollRatio = 0;
            };
            /**
             * @override
             */
            //ui动画执行前
            VerifyUICtrl.prototype.BeforeUIOpen = function (context) {
                var _this = this;
                if (context === void 0) { context = null; }
                _super.prototype.BeforeUIOpen.call(this, context);
                var view = this.GetView();
                //每次UI打开前，需要关闭提示面板
                view.UI_Pnl_Tip.visible = false;
                //清空旧信息
                view.UI_Ipt_PhoneNumber.text = "";
                view.UI_Ipt_Verify.text = "";
                //2019-7-17 20:41:53 UI打开的时候需要判断一下，如果短信CD还没有到，先进行CD
                this.VerifyColdDown();
                //动画效果
                view.UI_Img_Scale.scale(0, 0);
                this.tweenTask = Tween2DUtil.to({
                    node: view.UI_Img_Scale,
                    duration: ConstDefine.Common_PanelScaleUpTime,
                    scalex: ConstDefine.Common_PanelScaleUpMax,
                    scaley: ConstDefine.Common_PanelScaleUpMax,
                    onComplete: cbhandler.gen_handler(function () {
                        _this.tweenTask = Tween2DUtil.to({
                            node: view.UI_Img_Scale,
                            duration: ConstDefine.Common_PanelScaleBounceTime,
                            scalex: 1,
                            scaley: 1,
                            onComplete: cbhandler.gen_handler(function () {
                                _this.tweenTask = -1;
                            }, _this)
                        });
                    }, this)
                });
            };
            /**
            * @override
            */
            //ui打开动画完成
            VerifyUICtrl.prototype.OnUIOpened = function (context) {
                if (context === void 0) { context = null; }
                _super.prototype.OnUIOpened.call(this, context);
                this.ResizeByKeyboard(false);
            };
            /**
             * @override
             */
            //ui关闭动画完成
            VerifyUICtrl.prototype.OnUIHide = function () {
                _super.prototype.OnUIHide.call(this);
                //动画相关
                if (this.tweenTask != -1) {
                    Tween2DUtil.kill(this.tweenTask);
                    this.tweenTask = -1;
                }
                if (this.timeTask != -1) {
                    TimeManager.getInst().remove(this.timeTask);
                    this.timeTask = -1;
                }
            };
            /**
             * @override
             */
            VerifyUICtrl.prototype.BeforeUIDestroy = function () {
                _super.prototype.BeforeUIDestroy.call(this);
                this.RemoveEvent();
            };
            /**
             * @override
             */
            VerifyUICtrl.prototype.OnUIDestroy = function () {
                _super.prototype.OnUIDestroy.call(this);
            };
            VerifyUICtrl.prototype.RegisterEvent = function () {
                Facade.getInstance().registerMediator(this);
                var view = this.GetView();
                view.UI_Btn_GetMessageVerify.on(Laya.Event.CLICK, this, this.OnUI_Btn_GetMessageVerifyClick);
                view.UI_Btn_Confirm_0.on(Laya.Event.CLICK, this, this.OnUI_Btn_ConfirmClick);
                view.UI_Btn_Confirm_1.on(Laya.Event.CLICK, this, this.OnUI_Btn_ConfirmClick);
                view.UI_Btn_Back.on(Laya.Event.CLICK, this, this.OnUI_Btn_BackClick);
                view.UI_Btn_Submit.on(Laya.Event.CLICK, this, this.OnUI_Btn_SubmitClick);
                Laya.stage.on(Laya.Event.MOUSE_UP, this, this.onMOuseUp);
                view.panel.on(Laya.Event.MOUSE_DOWN, this, this.onMOuseDown);
                // view.UI_Ipt_PhoneNumber.on(Laya.Event.MOUSE_DOWN, this, this.OnInputFieldClick);
                // view.UI_Ipt_PhoneNumber.on(Laya.Event.FOCUS_CHANGE, this, this.OnFocusChange);
                // view.UI_Ipt_Verify.on(Laya.Event.MOUSE_DOWN, this, this.OnInputFieldClick);
                // view.UI_Ipt_Verify.on(Laya.Event.FOCUS_CHANGE, this, this.OnFocusChange);
            };
            VerifyUICtrl.prototype.RemoveEvent = function () {
                Facade.getInstance().removeMediator(this.getMediatorName());
                var view = this.GetView();
                view.UI_Btn_GetMessageVerify.off(Laya.Event.CLICK, this, this.OnUI_Btn_GetMessageVerifyClick);
                view.UI_Btn_Confirm_0.off(Laya.Event.CLICK, this, this.OnUI_Btn_ConfirmClick);
                view.UI_Btn_Confirm_1.off(Laya.Event.CLICK, this, this.OnUI_Btn_ConfirmClick);
                view.UI_Btn_Back.off(Laya.Event.CLICK, this, this.OnUI_Btn_BackClick);
                view.UI_Btn_Submit.off(Laya.Event.CLICK, this, this.OnUI_Btn_SubmitClick);
                Laya.stage.off(Laya.Event.MOUSE_UP, this, this.onMOuseUp);
                view.panel.off(Laya.Event.MOUSE_DOWN, this, this.onMOuseDown);
                // view.UI_Ipt_PhoneNumber.off(Laya.Event.MOUSE_DOWN, this, this.OnInputFieldClick);
                // view.UI_Ipt_PhoneNumber.off(Laya.Event.FOCUS_CHANGE, this, this.OnFocusChange);
                // view.UI_Ipt_Verify.off(Laya.Event.MOUSE_DOWN, this, this.OnInputFieldClick);
                // view.UI_Ipt_Verify.off(Laya.Event.FOCUS_CHANGE, this, this.OnFocusChange);
            };
            VerifyUICtrl.prototype.OnUI_Btn_GetMessageVerifyClick = function () {
                //获取短信息验证
                var view = this.GetView();
                //获取短信验证时，需要判断手机号是否符合要求（长度，以及首位）
                var phoneNumberStr = view.UI_Ipt_PhoneNumber.text;
                var phoneCheck = phoneNumberStr.length == 11 && phoneNumberStr.charAt(0) == "1" && phoneNumberStr.charAt(1) != "2";
                if (phoneCheck) {
                    var phoneNumber = parseInt(view.UI_Ipt_PhoneNumber.text);
                    //发送信息
                    HttpMessageSender.GetSender().SendGetMessageVerifyCode(phoneNumber);
                    //关闭按钮点击
                    view.UI_Btn_GetMessageVerify.disabled = true;
                    view.UI_Img_Verify.visible = false;
                    view.UI_Txt_Verify.visible = true;
                    view.UI_Txt_Verify.text = "发送中";
                }
                else {
                    this.HandleVerifyResult(100);
                }
            };
            VerifyUICtrl.prototype.OnUI_Btn_ConfirmClick = function () {
                //二级提示面板弹出后点击确认
                var view = this.GetView();
                if (this.verifyResult == 1) {
                    //绑定成功，点击后关闭整个UI并播放动画
                    var worldPos = CommonUtil2D.GetGlobalPosition(view.UI_Btn_Confirm_1); //new Vec2(540, 1100)
                    MoneyAnimManager.Instance.PlayMoneyAnim_Pos_Curve(EnumMoneyAnimType.Diamond, 10, worldPos, new Vec2(ConstDefine.MoneyImgPos_Diamond.x, ConstDefine.MoneyImgPos_Diamond.y), 500);
                    //关闭面板
                    this.sendNotification(NotificationNames.HIDEUI, ui.UIID.VerifyUIID);
                    //打开新绑定面板
                    this.sendNotification(NotificationNames.OPENUI, ui.UIID.InviteVerifyFriendUIID);
                    //打开奖励列表
                    this.sendNotification(NotificationNames.OPENUIWITHPARAM, new ui.LotteryRewardUIParam([]));
                    //查询好友邀请列表 
                    HttpMessageSender.GetSender().SendCheckInviteList(GameDataManager.getInstance().LoginPlayerInfo.OpenID);
                    //更新机体皮肤
                    PlayerManager.GetInstance().MainPlayer.updataSkin();
                }
                else {
                    //绑定失败，隐藏提示面板
                    view.UI_Pnl_Tip.visible = false;
                }
            };
            VerifyUICtrl.prototype.OnUI_Btn_BackClick = function () {
                //关闭面板
                this.sendNotification(NotificationNames.HIDEUI, ui.UIID.VerifyUIID);
            };
            VerifyUICtrl.prototype.OnUI_Btn_SubmitClick = function () {
                //提交绑定信息
                var view = this.GetView();
                //获取短信验证时，需要判断手机号是否符合要求（长度，以及首位）
                var phoneNumberStr = view.UI_Ipt_PhoneNumber.text;
                var verifyStr = view.UI_Ipt_Verify.text;
                var phoneCheck = phoneNumberStr.length == 11 && phoneNumberStr.charAt(0) == "1" && phoneNumberStr.charAt(1) != "2";
                var verifyCheck = verifyStr.length == 4;
                if (phoneCheck && verifyCheck) {
                    var phoneNumber = parseInt(view.UI_Ipt_PhoneNumber.text);
                    var verifyCode = parseInt(view.UI_Ipt_Verify.text);
                    //发送信息
                    HttpMessageSender.GetSender().SendCheckPhoneVerify(GameDataManager.getInstance().GetLoginPlayerID(), phoneNumber, verifyCode);
                    //关闭按钮点击
                    view.UI_Btn_Submit.disabled = true;
                }
                else if (!phoneCheck) {
                    this.HandleVerifyResult(100);
                }
                else if (!verifyCheck) {
                    this.HandleVerifyResult(101);
                }
            };
            VerifyUICtrl.prototype.OnInputFieldClick = function (e) {
                if (CommonUtil.OnMiniGame()) {
                    this.ResizeByKeyboard(true);
                }
            };
            // private OnFocusChange(e: Laya.Event) {
            //     if (CommonUtil.OnMiniGame()) {
            //         this.ResizeByKeyboard(false);
            //     }
            // }
            /**
             * @override
             */
            VerifyUICtrl.prototype.listNotificationInterests = function () {
                return [
                    NotificationNames.VerifyUI_GetMessageResult,
                    NotificationNames.VerifyUI_VerifyResult,
                ];
            };
            /**
            * @override
            */
            VerifyUICtrl.prototype.handleNotification = function (note) {
                var view = this.GetView();
                switch (note.getName()) {
                    case NotificationNames.VerifyUI_GetMessageResult: {
                        //获取短信息验证结果
                        var result = note.getBody();
                        //1发送成功 0发送失败
                        if (result == 1) {
                            //发送成功，进入倒计时
                            var now = Math.floor(Date.now() / 1000);
                            StorageManager.SetLastVerifyMessageTime(now);
                            this.VerifyColdDown();
                        }
                        else {
                            //发送失败，重启鼠标点击
                            view.UI_Btn_GetMessageVerify.disabled = false;
                            view.UI_Img_Verify.visible = true;
                            view.UI_Txt_Verify.visible = false;
                        }
                        break;
                    }
                    case NotificationNames.VerifyUI_VerifyResult: {
                        //绑定结果
                        var result = note.getBody();
                        this.HandleVerifyResult(result);
                        break;
                    }
                }
            };
            //验证码按钮倒计时效果
            VerifyUICtrl.prototype.VerifyColdDown = function () {
                var view = this.GetView();
                view.UI_Btn_GetMessageVerify.disabled = true;
                view.UI_Img_Verify.visible = false;
                view.UI_Txt_Verify.visible = true;
                //取消之前的倒计时
                if (this.timeTask != -1) {
                    TimeManager.getInst().remove(this.timeTask);
                    this.timeTask = -1;
                }
                //根据上次发送短信息的时间戳，计算当前的剩余时间
                var lastTime = StorageManager.GetLastVerifyMessageTime();
                var cdTime = GameDataManager.getInstance().VerifyColddown - (Math.floor(Date.now() / 1000) - lastTime);
                if (cdTime > 0) {
                    //有剩余CD时间
                    //改变显示内容
                    view.UI_Txt_Verify.text = cdTime.toString() + "秒";
                    this.timeTask = TimeManager.getInst().loopTimes(1, cdTime, cbhandler.gen_handler(function () {
                        var lastTime = StorageManager.GetLastVerifyMessageTime();
                        var cd = GameDataManager.getInstance().VerifyColddown - (Math.floor(Date.now() / 1000) - lastTime);
                        if (cd > 0) {
                            view.UI_Txt_Verify.text = cd.toString() + "秒";
                        }
                        else {
                            //倒计时结束，恢复正常
                            view.UI_Btn_GetMessageVerify.disabled = false;
                            view.UI_Img_Verify.visible = true;
                            view.UI_Txt_Verify.visible = false;
                            // view.UI_Btn_GetMessageVerify.label = "获取验证码";
                            view.UI_Btn_Submit.disabled = false;
                        }
                    }, this));
                }
                else {
                    //倒计时结束，恢复正常
                    view.UI_Btn_GetMessageVerify.disabled = false;
                    view.UI_Img_Verify.visible = true;
                    view.UI_Txt_Verify.visible = false;
                    view.UI_Btn_Submit.disabled = false;
                }
            };
            VerifyUICtrl.prototype.HandleVerifyResult = function (result) {
                var view = this.GetView();
                //记录结果，留作点击事件判定
                this.verifyResult = result;
                //刷新UI
                view.UI_Pnl_Tip.visible = true;
                //读表找文字
                var config = ConfigManager.GetInstance().GetPhoneVerifyErrorMessageConfig(this.verifyResult);
                view.UI_Txt_Tip_Msg.text = config.errorMsg;
                if (this.verifyResult != 1) {
                    view.UI_Btn_Submit.disabled = false;
                }
            };
            VerifyUICtrl.prototype.ResizeByKeyboard = function (keyboardState) {
                var view = this.GetView();
                if (keyboardState) {
                    //呼出软键盘
                    Log.Debug("VerifyUI 呼出软键盘");
                    view.UI_Img_Scale.bottom = 1000;
                }
                else {
                    //关闭软键盘
                    Log.Debug("VerifyUI 关闭软键盘");
                    view.UI_Img_Scale.bottom = 300;
                }
            };
            /**
             * 状态 内容改变
             * index 第几页
             */
            // private showStatus(index): void {
            //     let view = this.GetView();
            //     this.currentPanel = view["info" + 1] as Laya.Image;//默认使用1
            //     if (this.currentPanel_index == 1) this.currentPanel = view["info" + 2] as Laya.Image;//如果1正在使用 那么切换使用2
            //     let infoPanle = this.currentPanel;
            //     switch (index) {
            //         case 0:
            //             (infoPanle.getChildByName('title') as Laya.Image).skin = "resources/verify/title_Top_0.png";
            //             (infoPanle.getChildByName('img_1') as Laya.Image).skin = "resources/verify/hexiezhe.png";
            //             (infoPanle.getChildByName('img_1').getChildAt(0) as Laya.Label).text = "和谐者";
            //             (infoPanle.getChildByName('img_2') as Laya.Image).skin = "resources/verify/liebianzhe.png";
            //             (infoPanle.getChildByName('img_2').getChildAt(0) as Laya.Label).text = "裂变者";
            //             (infoPanle.getChildByName('img_3') as Laya.Image).skin = "resources/verify/gongshizhe.png";
            //             (infoPanle.getChildByName('img_3').getChildAt(0) as Laya.Label).text = "共识者";
            //             (infoPanle.getChildByName('img_4') as Laya.Image).skin = "resources/verify/zhilizhe.png";
            //             (infoPanle.getChildByName('img_4').getChildAt(0) as Laya.Label).text = "治理者";
            //             break;
            //         case 1:
            //             (infoPanle.getChildByName('title') as Laya.Image).skin = "resources/verify/title_Top_0.png";
            //             (infoPanle.getChildByName('img_1') as Laya.Image).skin = "resources/verify/hexiezhe.png";
            //             (infoPanle.getChildByName('img_1').getChildAt(0) as Laya.Label).text = "和谐者";
            //             (infoPanle.getChildByName('img_2') as Laya.Image).skin = "resources/verify/liebianzhe.png";
            //             (infoPanle.getChildByName('img_2').getChildAt(0) as Laya.Label).text = "裂变者";
            //             (infoPanle.getChildByName('img_3') as Laya.Image).skin = "resources/verify/gongshizhe.png";
            //             (infoPanle.getChildByName('img_3').getChildAt(0) as Laya.Label).text = "共识者";
            //             (infoPanle.getChildByName('img_4') as Laya.Image).skin = "resources/verify/zhilizhe.png";
            //             (infoPanle.getChildByName('img_4').getChildAt(0) as Laya.Label).text = "治理者";
            //             break;
            //         case 2:
            //             (infoPanle.getChildByName('title') as Laya.Image).skin = "resources/verify/title_Top_0.png";
            //             (infoPanle.getChildByName('img_1') as Laya.Image).skin = "resources/verify/hexiezhe.png";
            //             (infoPanle.getChildByName('img_1').getChildAt(0) as Laya.Label).text = "和谐者";
            //             (infoPanle.getChildByName('img_2') as Laya.Image).skin = "resources/verify/liebianzhe.png";
            //             (infoPanle.getChildByName('img_2').getChildAt(0) as Laya.Label).text = "裂变者";
            //             (infoPanle.getChildByName('img_3') as Laya.Image).skin = "resources/verify/gongshizhe.png";
            //             (infoPanle.getChildByName('img_3').getChildAt(0) as Laya.Label).text = "共识者";
            //             (infoPanle.getChildByName('img_4') as Laya.Image).skin = "resources/verify/zhilizhe.png";
            //             (infoPanle.getChildByName('img_4').getChildAt(0) as Laya.Label).text = "治理者";
            //             break;
            //     }
            //     this.playAni();
            // }
            /**动画 */
            VerifyUICtrl.prototype.playAni = function () {
                var view = this.GetView();
                var value;
                // console.log(this.currentIndex + "滑倒");
                switch (this.currentIndex) {
                    case 0:
                        value = 0;
                        break;
                    case 1:
                        value = 810;
                        break;
                    case 2:
                        value = 1620;
                        break;
                }
                Laya.Tween.to(this.GetView().panel.hScrollBar, {
                    "value": value,
                }, 200, null, Laya.Handler.create(this, function () {
                    view.c1.skin = "resources/verify/c_1.png";
                    view.c2.skin = "resources/verify/c_1.png";
                    view.c3.skin = "resources/verify/c_1.png";
                    view["c" + (this.currentIndex + 1)].skin = "resources/verify/c2.png";
                    this.GetView().panel.hScrollBar.value = value;
                }));
            };
            VerifyUICtrl.prototype.onMOuseUp = function () {
                var value = this.GetView().panel.hScrollBar.value;
                var num = 0; //没有移动
                if (this.dic_num - value < -30) {
                    num = 1; //向右
                    this.currentIndex++;
                    if (this.currentIndex > 2)
                        this.currentIndex = 2;
                }
                else if (this.dic_num - value > 30) {
                    num = -1; //向左
                    this.currentIndex--;
                    if (this.currentIndex < 0)
                        this.currentIndex = 0;
                }
                this.playAni();
            };
            VerifyUICtrl.prototype.onMOuseDown = function () {
                var value = this.GetView().panel.hScrollBar.value;
                this.dic_num = value;
            };
            return VerifyUICtrl;
        }(ui.BaseUICtrl));
        uicontrollers.VerifyUICtrl = VerifyUICtrl;
    })(uicontrollers = ui.uicontrollers || (ui.uicontrollers = {}));
})(ui || (ui = {}));
//# sourceMappingURL=VerifyUICtrl.js.map