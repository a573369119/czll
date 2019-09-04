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
        var SpawnItemPrefabUICtrl = /** @class */ (function (_super) {
            __extends(SpawnItemPrefabUICtrl, _super);
            function SpawnItemPrefabUICtrl(view) {
                return _super.call(this, view) || this;
            }
            SpawnItemPrefabUICtrl.prototype.GetView = function () {
                return this.uiView;
            };
            /**
             * @override
             */
            SpawnItemPrefabUICtrl.prototype.Init = function (parent, id) {
                _super.prototype.Init.call(this, parent, id);
                this.mediatorName = ui.UIID.SpawnItemPrefabUIID.toString();
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
            SpawnItemPrefabUICtrl.prototype.BeforeUIOpen = function (context) {
                if (context === void 0) { context = null; }
                _super.prototype.BeforeUIOpen.call(this, context);
            };
            /**
            * @override
            */
            //ui打开动画完成
            SpawnItemPrefabUICtrl.prototype.OnUIOpened = function (context) {
                if (context === void 0) { context = null; }
                _super.prototype.OnUIOpened.call(this, context);
            };
            /**
             * @override
             */
            //ui关闭动画完成
            SpawnItemPrefabUICtrl.prototype.OnUIHide = function () {
                _super.prototype.OnUIHide.call(this);
            };
            /**
             * @override
             */
            SpawnItemPrefabUICtrl.prototype.BeforeUIDestroy = function () {
                _super.prototype.BeforeUIDestroy.call(this);
                this.RemoveEvent();
            };
            /**
             * @override
             */
            SpawnItemPrefabUICtrl.prototype.OnUIDestroy = function () {
                _super.prototype.OnUIDestroy.call(this);
            };
            SpawnItemPrefabUICtrl.prototype.RegisterEvent = function () {
                Facade.getInstance().registerMediator(this);
                this.GetView().UI_Btn_GainSpawn.on(Laya.Event.CLICK, this, this.OnUI_Btn_GainSpawnClick);
            };
            SpawnItemPrefabUICtrl.prototype.RemoveEvent = function () {
                Facade.getInstance().removeMediator(this.getMediatorName());
                this.GetView().UI_Btn_GainSpawn.off(Laya.Event.CLICK, this, this.OnUI_Btn_GainSpawnClick);
            };
            SpawnItemPrefabUICtrl.prototype.OnUI_Btn_GainSpawnClick = function () {
            };
            /**
             * @override
             */
            SpawnItemPrefabUICtrl.prototype.listNotificationInterests = function () {
                return [];
            };
            /**
            * @override
            */
            SpawnItemPrefabUICtrl.prototype.handleNotification = function (note) {
                switch (note.getName()) {
                }
            };
            return SpawnItemPrefabUICtrl;
        }(ui.BaseUICtrl));
        uicontrollers.SpawnItemPrefabUICtrl = SpawnItemPrefabUICtrl;
    })(uicontrollers = ui.uicontrollers || (ui.uicontrollers = {}));
})(ui || (ui = {}));
//# sourceMappingURL=SpawnItemPrefabUICtrl.js.map