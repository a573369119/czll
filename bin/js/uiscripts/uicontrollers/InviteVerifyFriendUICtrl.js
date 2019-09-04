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
        var InviteVerifyFriendUICtrl = (function (_super) {
            __extends(InviteVerifyFriendUICtrl, _super);
            function InviteVerifyFriendUICtrl(view) {
                return _super.call(this, view) || this;
            }
            InviteVerifyFriendUICtrl.prototype.GetView = function () {
                return this.uiView;
            };
            /**
             * @override
             */
            InviteVerifyFriendUICtrl.prototype.Init = function (parent, id) {
                var _this = this;
                _super.prototype.Init.call(this, parent, id);
                this.mediatorName = ui.UIID.InviteVerifyFriendUIID.toString();
                //ui配置
                //this.uiConfig = new WindowConfigData();
                //this.uiConfig.uiOpenAnimType = UIAnim.PopOpen;
                //this.uiConfig.uiCloseAnimType = UIAnim.PopClose;
                //this.uiConfig.depth = 0;
                //添加舞台
                parent.addChild(this.uiView);
                this.uiView.zOrder = this.uiConfig.depth;
                // this.uiView.zOrder = 1000;//最高层
                this.RegisterEvent();
                //自适应
                this.GetView().on(Laya.Event.RESIZE, this, function () {
                    _this.GetView().width = Laya.stage.width;
                    _this.GetView().height = Laya.stage.height;
                });
                this.tweenTask = -1;
                //初始化列表
                this.InitList();
                //初始化转盘
                this.InitLottery();
            };
            /**
             * @override
             */
            //ui动画执行前
            InviteVerifyFriendUICtrl.prototype.BeforeUIOpen = function (context) {
                var _this = this;
                if (context === void 0) { context = null; }
                _super.prototype.BeforeUIOpen.call(this, context);
                //动画效果
                var view = this.GetView();
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
            InviteVerifyFriendUICtrl.prototype.OnUIOpened = function (context) {
                if (context === void 0) { context = null; }
                _super.prototype.OnUIOpened.call(this, context);
                //UI打开的时候，只显示文字提示
                var view = this.GetView();
                view.UI_List_InviteFriend.visible = false;
                view.UI_Txt_CheckTip.visible = true;
                view.UI_Txt_CheckTip.text = "查询中，请稍后...";
                view.UI_Txt_InviteNum.text = "";
                view.UI_Txt_VerifyNum.text = "";
                this.sendNotification(NotificationNames.HomepageUI_SetBottomButtonState, new HomepageBottomButtonState(1, true));
                if (CommonUtil.OnMiniGame()) {
                    WechatUtil.getIntance().ShowBannerAd();
                }
                this.OpenLottery();
            };
            /**
             * @override
             */
            //ui关闭动画完成
            InviteVerifyFriendUICtrl.prototype.OnUIHide = function () {
                _super.prototype.OnUIHide.call(this);
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
            };
            /**
             * @override
             */
            InviteVerifyFriendUICtrl.prototype.BeforeUIDestroy = function () {
                _super.prototype.BeforeUIDestroy.call(this);
                this.RemoveEvent();
            };
            /**
             * @override
             */
            InviteVerifyFriendUICtrl.prototype.OnUIDestroy = function () {
                _super.prototype.OnUIDestroy.call(this);
            };
            InviteVerifyFriendUICtrl.prototype.RegisterEvent = function () {
                var view = this.GetView();
                Facade.getInstance().registerMediator(this);
                view.UI_Btn_Cancel.on(Laya.Event.CLICK, this, this.OnUI_Btn_CancelClick);
                view.UI_Btn_InviteFriend.on(Laya.Event.CLICK, this, this.OnUI_Btn_InviteFriendClick);
                view.UI_Btn_Lottery.on(Laya.Event.CLICK, this, this.OnUI_Btn_LotteryClick);
                view.UI_Btn_CheckLotteryHist.on(Laya.Event.CLICK, this, this.OnUI_Btn_CheckLotteryHistClick);
                view.UI_Btn_Lottery_SpeedUp.on(Laya.Event.CLICK, this, this.OnUI_Btn_Lottery_SpeedUpClick);
                view.UI_Btn_Lottery_SpeedDown.on(Laya.Event.CLICK, this, this.OnUI_Btn_Lottery_SpeedDownClick);
            };
            InviteVerifyFriendUICtrl.prototype.RemoveEvent = function () {
                var view = this.GetView();
                Facade.getInstance().removeMediator(this.getMediatorName());
                view.UI_Btn_Cancel.off(Laya.Event.CLICK, this, this.OnUI_Btn_CancelClick);
                view.UI_Btn_InviteFriend.off(Laya.Event.CLICK, this, this.OnUI_Btn_InviteFriendClick);
                view.UI_Btn_Lottery.off(Laya.Event.CLICK, this, this.OnUI_Btn_LotteryClick);
                view.UI_Btn_CheckLotteryHist.off(Laya.Event.CLICK, this, this.OnUI_Btn_CheckLotteryHistClick);
                view.UI_Btn_Lottery_SpeedUp.off(Laya.Event.CLICK, this, this.OnUI_Btn_Lottery_SpeedUpClick);
                view.UI_Btn_Lottery_SpeedDown.off(Laya.Event.CLICK, this, this.OnUI_Btn_Lottery_SpeedDownClick);
            };
            InviteVerifyFriendUICtrl.prototype.OnUI_Btn_CancelClick = function () {
                //关闭面板
                this.sendNotification(NotificationNames.HIDEUI, ui.UIID.InviteVerifyFriendUIID);
            };
            InviteVerifyFriendUICtrl.prototype.OnUI_Btn_InviteFriendClick = function () {
                //发送分享
                if (CommonUtil.OnMiniGame()) {
                    WechatUtil.getIntance().ShareWithPicAndTitle(ResPathConst.SHARE_PIC[0], "虫子来袭，消灭它们！", null, null, 
                    //自己的OpenID，用于邀请别人
                    WechatConstDefine.LOGIN_QUERY_KEY + "=" + GameDataManager.getInstance().LoginPlayerInfo.OpenID);
                }
            };
            InviteVerifyFriendUICtrl.prototype.OnUI_Btn_LotteryClick = function () {
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
            };
            InviteVerifyFriendUICtrl.prototype.OnUI_Btn_CheckLotteryHistClick = function () {
                //点击打开查询面板
                this.sendNotification(NotificationNames.OPENUI, ui.UIID.LotteryRewardHistUIID);
                AudioManager.GetInstance().PlaySoundByConfigID(EnumSoundID.sound_function_touch_01);
            };
            InviteVerifyFriendUICtrl.prototype.OnUI_Btn_Lottery_SpeedUpClick = function () {
                //测试按钮 点击加速转盘
                LotteryManager.Instance.LotterySpeedUp_Gird();
            };
            InviteVerifyFriendUICtrl.prototype.OnUI_Btn_Lottery_SpeedDownClick = function () {
                //测试按钮 点击减速转盘
                var view = this.GetView();
                var result = Math.floor(Math.random() * 12);
                view.UI_Btn_Lottery.label = result.toString();
                LotteryManager.Instance.LotterySpeedDown_Gird(result, cbhandler.gen_handler(function () {
                    Log.Debug("转盘停止！");
                }, this));
            };
            /**
             * @override
             */
            InviteVerifyFriendUICtrl.prototype.listNotificationInterests = function () {
                return [
                    NotificationNames.InviteFriendUI_CheckInviteListComplete,
                    NotificationNames.InviteFriendUI_RefreshFriendListInfo,
                    NotificationNames.InviteFriendUI_LotteryResult,
                    NotificationNames.InviteFriendUI_RefreshLotteryNum,
                ];
            };
            /**
            * @override
            */
            InviteVerifyFriendUICtrl.prototype.handleNotification = function (note) {
                var view = this.GetView();
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
                        var friendOpenID = note.getBody();
                        var curList = this.GetOrderedInviteList();
                        //查找
                        for (var i = 0; i < curList.length; i++) {
                            var element = curList[i];
                            if (element.friendOpenID == friendOpenID) {
                                //更新
                                view.UI_List_InviteFriend.changeItem(i, element);
                                break;
                            }
                        }
                        break;
                    }
                    case NotificationNames.InviteFriendUI_LotteryResult: {
                        var configId = note.getBody();
                        if (configId != -1) {
                            this.lotteryResultList.push(configId);
                        }
                        else {
                        }
                        break;
                    }
                    case NotificationNames.InviteFriendUI_RefreshLotteryNum: {
                        //收到消息的时候，收到内容为新获取的奖励次数。UI内叠加显示
                        var lotteryDelta = note.getBody();
                        this.localLotteryMaxNum += lotteryDelta;
                        this.CheckLotteryClickEnable();
                        break;
                    }
                }
            };
            //初始化列表
            InviteVerifyFriendUICtrl.prototype.InitList = function () {
                var view = this.GetView();
                //设置渲染物体
                view.UI_List_InviteFriend.itemRender = InviteVerifyItem;
                //滚动条
                view.UI_List_InviteFriend.hScrollBarSkin = "";
                //更新事件
                view.UI_List_InviteFriend.renderHandler = new Handler(this, this.RenderItem);
                //初始化数组
                view.UI_List_InviteFriend.array = [];
            };
            //更新
            InviteVerifyFriendUICtrl.prototype.RenderItem = function (cell, index) {
                var data = cell.dataSource;
                //渲染
                cell.RenderItem(data, index);
            };
            //打开列表
            InviteVerifyFriendUICtrl.prototype.OpenList = function () {
                var view = this.GetView();
                //根据好友邀请列表，刷新UI
                var curList = this.GetOrderedInviteList();
                //判断好友列表长度，如果比旧长度长则新增，否则只更新
                var listLength = this.GetListLength(curList.length);
                var verifyNum = 0;
                for (var i = 0; i < listLength; i++) {
                    if (i < listLength - 1) {
                        view.UI_List_InviteFriend.addItem(curList[i]);
                        //判断好友是否已经绑定手机
                        if (curList[i].rewardGained >= 2) {
                            verifyNum++;
                        }
                    }
                    else {
                        //末尾的空item
                        view.UI_List_InviteFriend.addItem(null);
                    }
                }
                view.UI_Txt_InviteNum.text = curList.length.toString();
                view.UI_Txt_VerifyNum.text = verifyNum.toString();
            };
            //2019-7-19 13:28:50 避免混乱，关闭面板的时候清空list
            InviteVerifyFriendUICtrl.prototype.CloseList = function () {
                var view = this.GetView();
                var listLength = view.UI_List_InviteFriend.length;
                for (var i = 0; i < listLength; i++) {
                    view.UI_List_InviteFriend.deleteItem(0);
                }
            };
            //获取长度
            //2019-7-16 13:48:16 新需求，总是在末尾有一个默认item
            InviteVerifyFriendUICtrl.prototype.GetListLength = function (curLength) {
                return curLength + 1;
            };
            //获取排好序的好友列表
            InviteVerifyFriendUICtrl.prototype.GetOrderedInviteList = function () {
                //与服务器协议后，服务器返回的为正确顺序
                return GameDataManager.getInstance().LoginPlayerInfo.InvitedList;
            };
            //初始化
            InviteVerifyFriendUICtrl.prototype.InitLottery = function () {
                var view = this.GetView();
                //1.添加引用
                this.lotteryBoxArray = new Array();
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
                for (var i = 0; i < this.lotteryBoxArray.length; i++) {
                    var box = this.lotteryBoxArray[i];
                    //配置表的id从1开始
                    var config = ConfigManager.GetInstance().GetLotteryRewardConfig(i + 1);
                    var item = new LotteryItem();
                    box.addChild(item);
                    item.centerX = 0;
                    item.centerY = 0;
                    item.InitItem(config.rewardSkin, 0, 120);
                }
                //3.初始化转盘
                this.lotteryResultList = new Array();
                //4.提示
                this.lotteryFailFloatTipGroupID = FloatTipAnimManager.Instance.CreateTipGroup(EnumFloatAnimType.LotteryTip);
            };
            InviteVerifyFriendUICtrl.prototype.OpenLottery = function () {
                var view = this.GetView();
                //每次打开转盘时初始化
                LotteryManager.Instance.InitLottery_Gird(this.lotteryBoxArray, 0);
                this.localLotteryMaxNum = GameDataManager.getInstance().LoginPlayerInfo.MoneyInfo.lotteryNum;
                this.localLotteryNum = 0;
                this.CheckLotteryClickEnable();
                view.UI_Txt_InviteNum.text = "";
                view.UI_Txt_VerifyNum.text = "";
            };
            InviteVerifyFriendUICtrl.prototype.CloseLottery = function () {
                //关闭转盘
                LotteryManager.Instance.CloseLottery_Gird();
            };
            InviteVerifyFriendUICtrl.prototype.CheckLotteryClickEnable = function () {
                var view = this.GetView();
                view.UI_Btn_Lottery.label = this.localLotteryMaxNum.toString();
                view.UI_Btn_Lottery.disabled = this.localLotteryMaxNum <= 0;
            };
            //时间到，检查内容
            InviteVerifyFriendUICtrl.prototype.LotteryTimeUp = function () {
                var _this = this;
                //发送刷新钱币的消息
                this.sendNotification(NotificationNames.UI_RefreshMoneyInfo);
                //检查数组内的数量和点击的数量是否相同
                if (this.lotteryResultList.length == this.localLotteryNum) {
                    //数量匹配
                    //开始减速，用最后一次的结果作为显示结果
                    var result_1 = new Array();
                    for (var i = 0; i < this.lotteryResultList.length; i++) {
                        var element = this.lotteryResultList[i];
                        result_1.push(element);
                    }
                    //configID从1开始，因此需要-1以匹配index
                    LotteryManager.Instance.LotterySpeedDown_Gird(this.lotteryResultList[this.lotteryResultList.length - 1] - 1, cbhandler.gen_handler(function () {
                        //打开结果面板
                        _this.sendNotification(NotificationNames.OPENUIWITHPARAM, new ui.LotteryRewardUIParam(result_1));
                    }, this));
                }
                else {
                    //数量不匹配
                    //提示抽奖失败
                    Log.Debug("抽奖失败提示");
                    FloatTipAnimManager.Instance.AddTip(this.lotteryFailFloatTipGroupID, "网络不好，请重试", new Vec2(150, 150), this.GetView().UI_Btn_Lottery);
                    LotteryManager.Instance.LotteryStop_Gird();
                    var delta = this.localLotteryNum - this.lotteryResultList.length;
                    this.localLotteryMaxNum += delta;
                    this.localLotteryNum -= delta;
                    this.CheckLotteryClickEnable();
                }
                //清空
                // this.lotteryFailedNum = 0;
                this.lotteryResultList = new Array();
                //清空点击数量
                this.localLotteryNum = 0;
            };
            return InviteVerifyFriendUICtrl;
        }(ui.BaseUICtrl));
        uicontrollers.InviteVerifyFriendUICtrl = InviteVerifyFriendUICtrl;
    })(uicontrollers = ui.uicontrollers || (ui.uicontrollers = {}));
})(ui || (ui = {}));
//# sourceMappingURL=InviteVerifyFriendUICtrl.js.map