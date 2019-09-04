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
        var InviteFriendUICtrl = (function (_super) {
            __extends(InviteFriendUICtrl, _super);
            function InviteFriendUICtrl(view) {
                var _this = _super.call(this, view) || this;
                _this.curListLength = 20;
                return _this;
            }
            InviteFriendUICtrl.prototype.GetView = function () {
                return this.uiView;
            };
            /**
             * @override
             */
            InviteFriendUICtrl.prototype.Init = function (parent, id) {
                var _this = this;
                _super.prototype.Init.call(this, parent, id);
                this.mediatorName = ui.UIID.InviteFriendUIID.toString();
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
                this.tweenTask = -1;
                //初始化列表
                this.InitList();
            };
            /**
             * @override
             */
            //ui动画执行前
            InviteFriendUICtrl.prototype.BeforeUIOpen = function (context) {
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
            InviteFriendUICtrl.prototype.OnUIOpened = function (context) {
                if (context === void 0) { context = null; }
                _super.prototype.OnUIOpened.call(this, context);
                //UI打开的时候，只显示文字提示
                var view = this.GetView();
                view.UI_List_InviteFriend.visible = false;
                view.UI_Txt_CheckTip.visible = true;
                view.UI_Txt_CheckTip.text = "查询中，请稍后...";
                this.sendNotification(NotificationNames.HomepageUI_SetBottomButtonState, new HomepageBottomButtonState(1, true));
            };
            /**
             * @override
             */
            //ui关闭动画完成
            InviteFriendUICtrl.prototype.OnUIHide = function () {
                _super.prototype.OnUIHide.call(this);
                //关闭UI时，移除list内容
                // this.CloseList();
                this.sendNotification(NotificationNames.HomepageUI_SetBottomButtonState, new HomepageBottomButtonState(1, false));
                if (this.tweenTask != -1) {
                    Tween2DUtil.kill(this.tweenTask);
                    this.tweenTask = -1;
                }
            };
            /**
             * @override
             */
            InviteFriendUICtrl.prototype.BeforeUIDestroy = function () {
                _super.prototype.BeforeUIDestroy.call(this);
                this.RemoveEvent();
            };
            /**
             * @override
             */
            InviteFriendUICtrl.prototype.OnUIDestroy = function () {
                _super.prototype.OnUIDestroy.call(this);
            };
            InviteFriendUICtrl.prototype.RegisterEvent = function () {
                Facade.getInstance().registerMediator(this);
                this.GetView().UI_Btn_Cancel.on(Laya.Event.CLICK, this, this.OnUI_Btn_CancelClick);
                this.GetView().UI_Btn_InviteFriend.on(Laya.Event.CLICK, this, this.OnUI_Btn_InviteFriendClick);
            };
            InviteFriendUICtrl.prototype.RemoveEvent = function () {
                Facade.getInstance().removeMediator(this.getMediatorName());
                this.GetView().UI_Btn_Cancel.off(Laya.Event.CLICK, this, this.OnUI_Btn_CancelClick);
                this.GetView().UI_Btn_InviteFriend.off(Laya.Event.CLICK, this, this.OnUI_Btn_InviteFriendClick);
            };
            InviteFriendUICtrl.prototype.OnUI_Btn_CancelClick = function () {
                //关闭面板
                this.sendNotification(NotificationNames.HIDEUI, ui.UIID.InviteFriendUIID);
            };
            InviteFriendUICtrl.prototype.OnUI_Btn_InviteFriendClick = function () {
                //发送分享
                if (CommonUtil.OnMiniGame()) {
                    WechatUtil.getIntance().ShareWithPicAndTitle(ResPathConst.SHARE_PIC[0], "虫子来袭，消灭它们！", null, null, 
                    //自己的OpenID，用于邀请别人
                    WechatConstDefine.LOGIN_QUERY_KEY + "=" + GameDataManager.getInstance().LoginPlayerInfo.OpenID);
                }
            };
            /**
             * @override
             */
            InviteFriendUICtrl.prototype.listNotificationInterests = function () {
                return [
                    NotificationNames.InviteFriendUI_CheckInviteListComplete,
                    NotificationNames.InviteFriendUI_RefreshFriendListInfo,
                ];
            };
            /**
            * @override
            */
            InviteFriendUICtrl.prototype.handleNotification = function (note) {
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
                }
            };
            //初始化列表
            InviteFriendUICtrl.prototype.InitList = function () {
                var view = this.GetView();
                //设置渲染物体
                view.UI_List_InviteFriend.itemRender = InviteItem;
                //滚动条
                view.UI_List_InviteFriend.vScrollBarSkin = "";
                //更新事件
                view.UI_List_InviteFriend.renderHandler = new Handler(this, this.RenderItem);
                //初始化数组
                view.UI_List_InviteFriend.array = [];
                //初始化时直接生成列表，后续只需要更新即可
                //根据好友邀请列表，刷新UI
                var curList = this.GetOrderedInviteList();
                //判断好友列表长度，如果不足20则UI显示到20，如果多于20则显示到最少的整十位数
                var listLength = this.GetListLength(curList.length);
                for (var i = 0; i < listLength; i++) {
                    if (i <= curList.length - 1) {
                        //未越界
                        view.UI_List_InviteFriend.addItem(curList[i]);
                    }
                    else {
                        //越界
                        view.UI_List_InviteFriend.addItem(null);
                    }
                }
                //保存当前列表长度
                this.curListLength = listLength;
            };
            //更新
            InviteFriendUICtrl.prototype.RenderItem = function (cell, index) {
                var data = cell.dataSource;
                //渲染
                cell.RenderItem(data, index);
            };
            //打开列表
            InviteFriendUICtrl.prototype.OpenList = function () {
                var view = this.GetView();
                //根据好友邀请列表，刷新UI
                var curList = this.GetOrderedInviteList();
                //判断好友列表长度，如果比旧长度长则新增，否则只更新
                var listLength = this.GetListLength(curList.length);
                for (var i = 0; i < listLength; i++) {
                    if (i <= this.curListLength - 1) {
                        //只更新
                        if (i <= curList.length - 1) {
                            //未越界，因为需要修改的部分只有领奖状态，因此进行对比
                            var itemData = view.UI_List_InviteFriend.getItem(i);
                            //仅有状态改变的才会修改
                            if (itemData == null || itemData.rewardGained != curList[i].rewardGained) {
                                view.UI_List_InviteFriend.changeItem(i, curList[i]);
                            }
                        }
                        else {
                        }
                    }
                    else {
                        //新增
                        if (i <= curList.length - 1) {
                            //未越界
                            view.UI_List_InviteFriend.addItem(curList[i]);
                        }
                        else {
                            //越界
                            view.UI_List_InviteFriend.addItem(null);
                        }
                    }
                }
                //保存当前列表长度
                this.curListLength = listLength;
            };
            //获取长度
            InviteFriendUICtrl.prototype.GetListLength = function (curLength) {
                var result = 20;
                if (curLength <= result) {
                    return result;
                }
                else {
                    return Math.round(Math.ceil(curLength / 10) * 10);
                }
            };
            //获取排好序的好友列表
            InviteFriendUICtrl.prototype.GetOrderedInviteList = function () {
                // let curList = new Array<com.msg.inviteDetail>();
                // //按照index从小到大排序
                // for (var i = 0; i < GameDataManager.getInstance().LoginPlayerInfo.InvitedList.length; i++) {
                //     curList.push(GameDataManager.getInstance().LoginPlayerInfo.InvitedList[i]);
                // }
                // curList = SortUtil.orderby(curList, i => i.index)
                // return curList;
                //与服务器协议后，服务器返回的为正确顺序
                return GameDataManager.getInstance().LoginPlayerInfo.InvitedList;
            };
            return InviteFriendUICtrl;
        }(ui.BaseUICtrl));
        uicontrollers.InviteFriendUICtrl = InviteFriendUICtrl;
    })(uicontrollers = ui.uicontrollers || (ui.uicontrollers = {}));
})(ui || (ui = {}));
//# sourceMappingURL=InviteFriendUICtrl.js.map