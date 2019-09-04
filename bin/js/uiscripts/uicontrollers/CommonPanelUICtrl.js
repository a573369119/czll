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
        var CommonPanelUICtrl = (function (_super) {
            __extends(CommonPanelUICtrl, _super);
            function CommonPanelUICtrl(view) {
                return _super.call(this, view) || this;
            }
            CommonPanelUICtrl.prototype.GetView = function () {
                return this.uiView;
            };
            /**
             * @override
             */
            CommonPanelUICtrl.prototype.Init = function (parent, id) {
                _super.prototype.Init.call(this, parent, id);
                this.mediatorName = ui.UIID.CommonPanelUIID.toString();
                //添加舞台
                parent.addChild(this.uiView);
                this.uiView.zOrder = 0;
                this.RegisterEvent();
            };
            /**
             * @override
             */
            //ui动画执行前
            CommonPanelUICtrl.prototype.BeforeUIOpen = function (context) {
                if (context === void 0) { context = null; }
                _super.prototype.BeforeUIOpen.call(this, context);
            };
            /**
            * @override
            */
            //ui打开动画完成
            CommonPanelUICtrl.prototype.OnUIOpened = function (context) {
                if (context === void 0) { context = null; }
                _super.prototype.OnUIOpened.call(this, context);
                var data = context;
                this.GetView().txt_context.text = data.context;
                this.callback = data.callback;
            };
            /**
             * @override
             */
            //ui关闭动画完成
            CommonPanelUICtrl.prototype.OnUIHide = function () {
                _super.prototype.OnUIHide.call(this);
                this.GetView().txt_context.text = "";
                this.callback = null;
            };
            /**
             * @override
             */
            CommonPanelUICtrl.prototype.BeforeUIDestroy = function () {
                this.RemoveEvent();
            };
            /**
             * @override
             */
            CommonPanelUICtrl.prototype.OnUIDestroy = function () {
            };
            CommonPanelUICtrl.prototype.RegisterEvent = function () {
                Facade.getInstance().registerMediator(this);
                this.GetView().btn_exit.on(Laya.Event.CLICK, this, this.Onbtn_exitClick);
            };
            CommonPanelUICtrl.prototype.RemoveEvent = function () {
                Facade.getInstance().removeMediator(this.getMediatorName());
                this.GetView().btn_exit.off(Laya.Event.CLICK, this, this.Onbtn_exitClick);
            };
            CommonPanelUICtrl.prototype.Onbtn_exitClick = function () {
                if (this.callback) {
                    this.callback();
                }
                this.sendNotification(NotificationNames.HIDEUI, ui.UIID.CommonPanelUIID);
            };
            /**
             * @override
             */
            CommonPanelUICtrl.prototype.listNotificationInterests = function () {
                return [];
            };
            /**
            * @override
            */
            CommonPanelUICtrl.prototype.handleNotification = function (note) {
                switch (note.getName()) {
                }
            };
            return CommonPanelUICtrl;
        }(ui.BaseUICtrl));
        uicontrollers.CommonPanelUICtrl = CommonPanelUICtrl;
    })(uicontrollers = ui.uicontrollers || (ui.uicontrollers = {}));
})(ui || (ui = {}));
//# sourceMappingURL=CommonPanelUICtrl.js.map