var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
* Created By Code Generator
*/
var ui;
(function (ui) {
    var uicontrollers;
    (function (uicontrollers) {
        var Facade = puremvc.Facade;
        var ClickUpEffectUICtrl = /** @class */ (function (_super) {
            __extends(ClickUpEffectUICtrl, _super);
            function ClickUpEffectUICtrl(view) {
                return _super.call(this, view) || this;
            }
            ClickUpEffectUICtrl.prototype.GetView = function () {
                return this.uiView;
            };
            /**
             * @override
             */
            ClickUpEffectUICtrl.prototype.Init = function (parent, id) {
                _super.prototype.Init.call(this, parent, id);
                this.mediatorName = ui.UIID.ClickUpEffectUIID.toString();
                //ui配置
                //this.uiConfig = new WindowConfigData();
                //this.uiConfig.uiOpenAnimType = UIAnim.PopOpen;
                //this.uiConfig.uiCloseAnimType = UIAnim.PopClose;
                //this.uiConfig.depth = 0;
                //添加舞台
                parent.addChild(this.uiView);
                this.uiView.zOrder = this.uiConfig.depth;
                this.RegisterEvent();
            };
            /**
             * @override
             */
            //ui动画执行前
            ClickUpEffectUICtrl.prototype.BeforeUIOpen = function (context) {
                if (context === void 0) { context = null; }
                _super.prototype.BeforeUIOpen.call(this, context);
            };
            /**
            * @override
            */
            //ui打开动画完成
            ClickUpEffectUICtrl.prototype.OnUIOpened = function (context) {
                if (context === void 0) { context = null; }
                _super.prototype.OnUIOpened.call(this, context);
            };
            /**
             * @override
             */
            //ui关闭动画完成
            ClickUpEffectUICtrl.prototype.OnUIHide = function () {
                _super.prototype.OnUIHide.call(this);
            };
            /**
             * @override
             */
            ClickUpEffectUICtrl.prototype.BeforeUIDestroy = function () {
                _super.prototype.BeforeUIDestroy.call(this);
                this.RemoveEvent();
            };
            /**
             * @override
             */
            ClickUpEffectUICtrl.prototype.OnUIDestroy = function () {
                _super.prototype.OnUIDestroy.call(this);
            };
            ClickUpEffectUICtrl.prototype.RegisterEvent = function () {
                Facade.getInstance().registerMediator(this);
            };
            ClickUpEffectUICtrl.prototype.RemoveEvent = function () {
                Facade.getInstance().removeMediator(this.getMediatorName());
            };
            /**
             * @override
             */
            ClickUpEffectUICtrl.prototype.listNotificationInterests = function () {
                return [];
            };
            /**
            * @override
            */
            ClickUpEffectUICtrl.prototype.handleNotification = function (note) {
                switch (note.getName()) {
                }
            };
            return ClickUpEffectUICtrl;
        }(ui.BaseUICtrl));
        uicontrollers.ClickUpEffectUICtrl = ClickUpEffectUICtrl;
    })(uicontrollers = ui.uicontrollers || (ui.uicontrollers = {}));
})(ui || (ui = {}));
//# sourceMappingURL=ClickUpEffectUICtrl.js.map