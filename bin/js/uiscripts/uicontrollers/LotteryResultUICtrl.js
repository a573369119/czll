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
        var LotteryResultUICtrl = (function (_super) {
            __extends(LotteryResultUICtrl, _super);
            function LotteryResultUICtrl(view) {
                return _super.call(this, view) || this;
            }
            LotteryResultUICtrl.prototype.GetView = function () {
                return this.uiView;
            };
            /**
             * @override
             */
            LotteryResultUICtrl.prototype.Init = function (parent, id) {
                var _this = this;
                _super.prototype.Init.call(this, parent, id);
                this.mediatorName = ui.UIID.LotteryResultUIID.toString();
                //ui配置
                //this.uiConfig = new WindowConfigData();
                //this.uiConfig.uiOpenAnimType = UIAnim.PopOpen;
                //this.uiConfig.uiCloseAnimType = UIAnim.PopClose;
                //this.uiConfig.depth = 0;
                //添加舞台
                parent.addChild(this.uiView);
                this.uiView.zOrder = this.uiConfig.depth;
                // this.uiView.zOrder = 10001;//大于抽奖界面
                this.RegisterEvent();
                //自适应
                this.GetView().on(Laya.Event.RESIZE, this, function () {
                    _this.GetView().width = Laya.stage.width;
                    _this.GetView().height = Laya.stage.height;
                });
                //初始化列表
                this.InitList();
                this.itemPool = new Array();
            };
            /**
             * @override
             */
            //ui动画执行前
            LotteryResultUICtrl.prototype.BeforeUIOpen = function (context) {
                if (context === void 0) { context = null; }
                _super.prototype.BeforeUIOpen.call(this, context);
                var param = context;
                //ui位置调整
                if (param.rewardConfigList.length == 0)
                    this.GetView().img_box.y = 700;
                else
                    this.GetView().img_box.y = 429;
            };
            /**
            * @override
            */
            //ui打开动画完成
            LotteryResultUICtrl.prototype.OnUIOpened = function (context) {
                if (context === void 0) { context = null; }
                _super.prototype.OnUIOpened.call(this, context);
                AudioManager.GetInstance().PlaySoundByConfigID(EnumSoundID.sound_function_touch_03);
                var param = context;
                //通过获奖信息渲染
                var itemInfoArray = new Array();
                for (var i = 0; i < param.rewardConfigList.length; i++) {
                    var element = param.rewardConfigList[i];
                    var found = false;
                    for (var j = 0; j < itemInfoArray.length; j++) {
                        var item = itemInfoArray[j];
                        if (item.configID == element) {
                            //找到了
                            item.num += 1;
                            found = true;
                        }
                    }
                    if (!found) {
                        //没找到
                        var item = { configID: element, num: 1 };
                        itemInfoArray.push(item);
                    }
                }
                var view = this.GetView();
                //创建完成，赋值给列表
                view.UI_List_LotteryReward.array = itemInfoArray;
                //设置宽高
                if (itemInfoArray.length == 0) {
                    view.box_DieSHow.visible = true;
                    view.img_GetAward.visible = false;
                }
                else {
                    view.img_GetAward.visible = true;
                    view.box_DieSHow.visible = false;
                }
                if (itemInfoArray.length < 5) {
                    view.UI_List_LotteryReward.height = 150;
                    view.UI_List_LotteryReward.width = itemInfoArray.length * 150;
                }
                else {
                    view.UI_List_LotteryReward.height = 300;
                    view.UI_List_LotteryReward.width = 600;
                }
            };
            /**
             * @override
             */
            //ui关闭动画完成
            LotteryResultUICtrl.prototype.OnUIHide = function () {
                _super.prototype.OnUIHide.call(this);
                //清除列表内容
                var view = this.GetView();
                var count = view.UI_List_LotteryReward.length;
                for (var i = 0; i < count; i++) {
                    view.UI_List_LotteryReward.deleteItem(0);
                }
                view.UI_List_LotteryReward.array = null;
            };
            /**
             * @override
             */
            LotteryResultUICtrl.prototype.BeforeUIDestroy = function () {
                _super.prototype.BeforeUIDestroy.call(this);
                this.RemoveEvent();
            };
            /**
             * @override
             */
            LotteryResultUICtrl.prototype.OnUIDestroy = function () {
                _super.prototype.OnUIDestroy.call(this);
            };
            LotteryResultUICtrl.prototype.RegisterEvent = function () {
                Facade.getInstance().registerMediator(this);
                this.GetView().UI_Btn_Back.on(Laya.Event.CLICK, this, this.OnUI_Btn_BackClick);
            };
            LotteryResultUICtrl.prototype.RemoveEvent = function () {
                Facade.getInstance().removeMediator(this.getMediatorName());
                this.GetView().UI_Btn_Back.off(Laya.Event.CLICK, this, this.OnUI_Btn_BackClick);
            };
            LotteryResultUICtrl.prototype.OnUI_Btn_BackClick = function () {
                this.sendNotification(NotificationNames.HIDEUI, ui.UIID.LotteryResultUIID);
            };
            /**
             * @override
             */
            LotteryResultUICtrl.prototype.listNotificationInterests = function () {
                return [];
            };
            /**
            * @override
            */
            LotteryResultUICtrl.prototype.handleNotification = function (note) {
                switch (note.getName()) {
                }
            };
            //初始化列表
            LotteryResultUICtrl.prototype.InitList = function () {
                var view = this.GetView();
                //设置渲染物体
                view.UI_List_LotteryReward.itemRender = LotteryItem;
                //更新事件
                view.UI_List_LotteryReward.renderHandler = new Handler(this, this.RenderItem);
                //滑动条
                view.UI_List_LotteryReward.vScrollBarSkin = "";
                //初始化数组
                // view.UI_List_LotteryReward.array = [];
            };
            //更新
            LotteryResultUICtrl.prototype.RenderItem = function (cell, index) {
                var data = cell.dataSource;
                //渲染
                var config = ConfigManager.GetInstance().GetLotteryRewardConfig(data.configID);
                //为了防止破坏以前的结构
                console.log(cell);
                cell.InitItem(config.rewardSkin, data.num, 150, config.rewardName);
            };
            LotteryResultUICtrl.prototype.CreateItem = function () {
                var item = this.itemPool.pop();
                if (!item) {
                    item = new LotteryItem();
                }
                return item;
            };
            LotteryResultUICtrl.prototype.DeleteItem = function (item) {
                item.removeSelf();
                this.itemPool.push(item);
            };
            return LotteryResultUICtrl;
        }(ui.BaseUICtrl));
        uicontrollers.LotteryResultUICtrl = LotteryResultUICtrl;
    })(uicontrollers = ui.uicontrollers || (ui.uicontrollers = {}));
})(ui || (ui = {}));
//# sourceMappingURL=LotteryResultUICtrl.js.map