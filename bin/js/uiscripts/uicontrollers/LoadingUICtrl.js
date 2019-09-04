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
        var LoadingUICtrl = (function (_super) {
            __extends(LoadingUICtrl, _super);
            function LoadingUICtrl(view) {
                var _this = _super.call(this, view) || this;
                _this.ProgressWidth_Max = 741;
                _this.ProgressWidth_Min = 0;
                return _this;
            }
            LoadingUICtrl.prototype.GetView = function () {
                return this.uiView;
            };
            /**
             * @override
             */
            LoadingUICtrl.prototype.Init = function (parent, id) {
                var _this = this;
                _super.prototype.Init.call(this, parent, id);
                this.GetView().loadingBG.skin = "https://czll.bingodac.com/static/background/main_bg_04.jpg";
                this.mediatorName = ui.UIID.LoadingUIID.toString();
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
            };
            /**
             * @override
             */
            //ui动画执行前
            LoadingUICtrl.prototype.BeforeUIOpen = function (context) {
                if (context === void 0) { context = null; }
                _super.prototype.BeforeUIOpen.call(this, context);
            };
            /**
            * @override
            */
            //ui打开动画完成
            LoadingUICtrl.prototype.OnUIOpened = function (context) {
                if (context === void 0) { context = null; }
                _super.prototype.OnUIOpened.call(this, context);
            };
            /**
             * @override
             */
            //ui关闭动画完成
            LoadingUICtrl.prototype.OnUIHide = function () {
                _super.prototype.OnUIHide.call(this);
            };
            /**
             * @override
             */
            LoadingUICtrl.prototype.BeforeUIDestroy = function () {
                _super.prototype.BeforeUIDestroy.call(this);
                this.RemoveEvent();
            };
            /**
             * @override
             */
            LoadingUICtrl.prototype.OnUIDestroy = function () {
                _super.prototype.OnUIDestroy.call(this);
            };
            LoadingUICtrl.prototype.RegisterEvent = function () {
                Facade.getInstance().registerMediator(this);
            };
            LoadingUICtrl.prototype.RemoveEvent = function () {
                Facade.getInstance().removeMediator(this.getMediatorName());
            };
            /**
             * @override
             */
            LoadingUICtrl.prototype.listNotificationInterests = function () {
                return [
                    NotificationNames.LoadingUI_Progress
                ];
            };
            /**
            * @override
            */
            LoadingUICtrl.prototype.handleNotification = function (note) {
                switch (note.getName()) {
                    case NotificationNames.LoadingUI_Progress: {
                        var progress = note.getBody();
                        this.SetProgress(progress);
                        //2019-6-19 17:19:01 如果进度结束了则隐藏进度条
                        if (progress >= 1) {
                            this.GetView().UI_Box_Progress.visible = false;
                        }
                        break;
                    }
                }
            };
            /**
             * 设置进度条
             * @param ratio 0~1
             */
            LoadingUICtrl.prototype.SetProgress = function (ratio) {
                var view = this.GetView();
                view.UI_Progress_Mask.width = this.ProgressWidth_Min + (this.ProgressWidth_Max - this.ProgressWidth_Min) * ratio;
                view.UI_Txt_Progress.text = Math.floor(ratio * 100) + "%";
            };
            return LoadingUICtrl;
        }(ui.BaseUICtrl));
        uicontrollers.LoadingUICtrl = LoadingUICtrl;
    })(uicontrollers = ui.uicontrollers || (ui.uicontrollers = {}));
})(ui || (ui = {}));
//# sourceMappingURL=LoadingUICtrl.js.map