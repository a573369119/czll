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
        var LotteryRewardHistUICtrl = (function (_super) {
            __extends(LotteryRewardHistUICtrl, _super);
            function LotteryRewardHistUICtrl(view) {
                var _this = _super.call(this, view) || this;
                _this.checkNum = 10;
                return _this;
            }
            LotteryRewardHistUICtrl.prototype.GetView = function () {
                return this.uiView;
            };
            /**
             * @override
             */
            LotteryRewardHistUICtrl.prototype.Init = function (parent, id) {
                var _this = this;
                _super.prototype.Init.call(this, parent, id);
                this.mediatorName = ui.UIID.LotteryRewardHistUIID.toString();
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
                this.InitList();
            };
            /**
             * @override
             */
            //ui动画执行前
            LotteryRewardHistUICtrl.prototype.BeforeUIOpen = function (context) {
                if (context === void 0) { context = null; }
                _super.prototype.BeforeUIOpen.call(this, context);
            };
            /**
            * @override
            */
            //ui打开动画完成
            LotteryRewardHistUICtrl.prototype.OnUIOpened = function (context) {
                if (context === void 0) { context = null; }
                _super.prototype.OnUIOpened.call(this, context);
                //打开的时候从第一页开始
                this.page = 1;
                this.checking = true;
                this.allData = false;
                //发送查询消息
                HttpMessageSender.GetSender().SendCheckLotteryRewardHistroy(GameDataManager.getInstance().GetLoginPlayerID(), this.page, this.checkNum);
            };
            /**
             * @override
             */
            //ui关闭动画完成
            LotteryRewardHistUICtrl.prototype.OnUIHide = function () {
                _super.prototype.OnUIHide.call(this);
                //关闭UI的时候清空内容
                var view = this.GetView();
                var count = view.UI_List_Hist.length;
                for (var i = 0; i < count; i++) {
                    view.UI_List_Hist.deleteItem(0);
                }
                view.UI_List_Hist.array = [];
            };
            /**
             * @override
             */
            LotteryRewardHistUICtrl.prototype.BeforeUIDestroy = function () {
                _super.prototype.BeforeUIDestroy.call(this);
                this.RemoveEvent();
            };
            /**
             * @override
             */
            LotteryRewardHistUICtrl.prototype.OnUIDestroy = function () {
                _super.prototype.OnUIDestroy.call(this);
            };
            LotteryRewardHistUICtrl.prototype.RegisterEvent = function () {
                var view = this.GetView();
                Facade.getInstance().registerMediator(this);
                view.UI_Btn_Back.on(Laya.Event.CLICK, this, this.OnUI_Btn_BackClick);
                view.UI_List_Hist.on(Laya.Event.MOUSE_DOWN, this, this.OnListMouseDown);
                view.UI_List_Hist.on(Laya.Event.MOUSE_MOVE, this, this.OnListMouseMove);
                view.UI_List_Hist.on(Laya.Event.MOUSE_UP, this, this.OnListMouseUp);
                view.UI_List_Hist.on(Laya.Event.MOUSE_OUT, this, this.OnListMouseOut);
            };
            LotteryRewardHistUICtrl.prototype.RemoveEvent = function () {
                var view = this.GetView();
                Facade.getInstance().removeMediator(this.getMediatorName());
                view.UI_Btn_Back.off(Laya.Event.CLICK, this, this.OnUI_Btn_BackClick);
                view.UI_List_Hist.on(Laya.Event.MOUSE_DOWN, this, this.OnListMouseDown);
                view.UI_List_Hist.on(Laya.Event.MOUSE_MOVE, this, this.OnListMouseMove);
                view.UI_List_Hist.on(Laya.Event.MOUSE_UP, this, this.OnListMouseUp);
                view.UI_List_Hist.on(Laya.Event.MOUSE_OUT, this, this.OnListMouseOut);
            };
            LotteryRewardHistUICtrl.prototype.OnUI_Btn_BackClick = function () {
                this.sendNotification(NotificationNames.HIDEUI, ui.UIID.LotteryRewardHistUIID);
            };
            LotteryRewardHistUICtrl.prototype.OnListMouseDown = function () {
                this.mouseDown = true;
            };
            LotteryRewardHistUICtrl.prototype.OnListMouseMove = function () {
                //检查是否到底、未查询状态、未查询完状态
                if (this.mouseDown && !this.allData && !this.checking && this.GetView().UI_List_Hist.scrollBar.value >= 1) {
                    //可以查询下一页，发送消息并标记
                    this.checking = true;
                    this.page += 1;
                    HttpMessageSender.GetSender().SendCheckLotteryRewardHistroy(GameDataManager.getInstance().GetLoginPlayerID(), this.page, this.checkNum);
                }
            };
            LotteryRewardHistUICtrl.prototype.OnListMouseUp = function () {
                this.mouseDown = false;
            };
            LotteryRewardHistUICtrl.prototype.OnListMouseOut = function () {
                this.mouseDown = false;
            };
            /**
             * @override
             */
            LotteryRewardHistUICtrl.prototype.listNotificationInterests = function () {
                return [
                    NotificationNames.LotteryRewardHistUI_CheckResult
                ];
            };
            /**
            * @override
            */
            LotteryRewardHistUICtrl.prototype.handleNotification = function (note) {
                var view = this.GetView();
                switch (note.getName()) {
                    case NotificationNames.LotteryRewardHistUI_CheckResult: {
                        //收到查询结果，做判断
                        var data = note.getBody();
                        if (data.result == 0) {
                            //失败
                            this.checking = false;
                            this.page -= 1;
                        }
                        else if (data.result == 1) {
                            //成功，但是还有剩余
                            this.checking = false;
                            this.allData = false;
                        }
                        else if (data.result == 2) {
                            //成功，且查询完毕
                            this.checking = false;
                            this.allData = true;
                        }
                        if (data.rewardHistList) {
                            //将获取到的数据添加到列表中
                            for (var i = 0; i < data.rewardHistList.length; i++) {
                                var element = data.rewardHistList[i];
                                view.UI_List_Hist.addItem(element);
                            }
                        }
                        break;
                    }
                }
            };
            //初始化列表
            LotteryRewardHistUICtrl.prototype.InitList = function () {
                var view = this.GetView();
                //设置渲染物体
                view.UI_List_Hist.itemRender = LotteryHistItem;
                //滚动条
                view.UI_List_Hist.vScrollBarSkin = "";
                //更新事件
                view.UI_List_Hist.renderHandler = new Handler(this, this.RenderItem);
                //初始化数组
                view.UI_List_Hist.array = [];
            };
            //更新
            LotteryRewardHistUICtrl.prototype.RenderItem = function (cell, index) {
                var data = cell.dataSource;
                //渲染
                cell.RenderItem(data, index);
            };
            return LotteryRewardHistUICtrl;
        }(ui.BaseUICtrl));
        uicontrollers.LotteryRewardHistUICtrl = LotteryRewardHistUICtrl;
    })(uicontrollers = ui.uicontrollers || (ui.uicontrollers = {}));
})(ui || (ui = {}));
//# sourceMappingURL=LotteryRewardHistUICtrl.js.map