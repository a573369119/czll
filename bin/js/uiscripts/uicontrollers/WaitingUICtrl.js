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
        var WaitingUICtrl = (function (_super) {
            __extends(WaitingUICtrl, _super);
            function WaitingUICtrl(view) {
                var _this = _super.call(this, view) || this;
                _this.timeLine = null;
                return _this;
            }
            WaitingUICtrl.prototype.GetView = function () {
                return this.uiView;
            };
            /**
             * @override
             */
            WaitingUICtrl.prototype.Init = function (parent, id) {
                _super.prototype.Init.call(this, parent, id);
                this.mediatorName = ui.UIID.WaitingUIID.toString();
                //ui配置
                this.uiConfig = new ui.WindowConfigData();
                this.uiConfig.uiOpenAnimType = ui.UIAnim.None;
                this.uiConfig.uiCloseAnimType = ui.UIAnim.None;
                this.uiConfig.depth = 0;
                //添加舞台
                parent.addChild(this.uiView);
                this.uiView.zOrder = 102;
                this.RegisterEvent();
                this.timeLine = new Laya.TimeLine();
                this.timeLine.addLabel("loading", 0).to(this.GetView().waitingAnim, { rotation: 360 }, 2000, Laya.Ease.linearNone, 0);
            };
            /**
             * @override
             */
            //ui动画执行前
            WaitingUICtrl.prototype.BeforeUIOpen = function (context) {
                if (context === void 0) { context = null; }
                _super.prototype.BeforeUIOpen.call(this, context);
            };
            /**
            * @override
            */
            //ui打开动画完成
            WaitingUICtrl.prototype.OnUIOpened = function (context) {
                if (context === void 0) { context = null; }
                _super.prototype.OnUIOpened.call(this, context);
                this.timeLine.play("loading", true);
            };
            /**
             * @override
             */
            //ui关闭动画完成
            WaitingUICtrl.prototype.OnUIHide = function () {
                _super.prototype.OnUIHide.call(this);
                this.timeLine.pause();
            };
            /**
             * @override
             */
            WaitingUICtrl.prototype.BeforeUIDestroy = function () {
                this.RemoveEvent();
                this.timeLine.pause();
                this.timeLine.destroy();
            };
            /**
             * @override
             */
            WaitingUICtrl.prototype.OnUIDestroy = function () {
            };
            WaitingUICtrl.prototype.RegisterEvent = function () {
                Facade.getInstance().registerMediator(this);
            };
            WaitingUICtrl.prototype.RemoveEvent = function () {
                Facade.getInstance().removeMediator(this.getMediatorName());
            };
            /**
             * @override
             */
            WaitingUICtrl.prototype.listNotificationInterests = function () {
                return [];
            };
            /**
            * @override
            */
            WaitingUICtrl.prototype.handleNotification = function (note) {
                switch (note.getName()) {
                }
            };
            return WaitingUICtrl;
        }(ui.BaseUICtrl));
        uicontrollers.WaitingUICtrl = WaitingUICtrl;
    })(uicontrollers = ui.uicontrollers || (ui.uicontrollers = {}));
})(ui || (ui = {}));
//# sourceMappingURL=WaitingUICtrl.js.map