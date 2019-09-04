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
        var SettingUICtrl = (function (_super) {
            __extends(SettingUICtrl, _super);
            function SettingUICtrl(view) {
                return _super.call(this, view) || this;
            }
            SettingUICtrl.prototype.GetView = function () {
                return this.uiView;
            };
            /**
             * @override
             */
            SettingUICtrl.prototype.Init = function (parent, id) {
                var _this = this;
                _super.prototype.Init.call(this, parent, id);
                this.mediatorName = ui.UIID.SettingUIID.toString();
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
            SettingUICtrl.prototype.BeforeUIOpen = function (context) {
                if (context === void 0) { context = null; }
                _super.prototype.BeforeUIOpen.call(this, context);
                //在打开UI前，读取当前的状态
                var view = this.GetView();
                view.UI_Tgl_Music.selected = StorageManager.GetMusicSetting();
                view.UI_Tgl_Vibrate.selected = StorageManager.GetVibrateSetting();
                //根据状态显示图片
                this.SwitchTglImg(view.UI_Tgl_Music);
                this.SwitchTglImg(view.UI_Tgl_Vibrate);
            };
            /**
            * @override
            */
            //ui打开动画完成
            SettingUICtrl.prototype.OnUIOpened = function (context) {
                if (context === void 0) { context = null; }
                _super.prototype.OnUIOpened.call(this, context);
                if (!GameDataManager.getInstance().MatchInfo.IsGameEnd())
                    this.sendNotification(NotificationNames.PAUSE_MATCH, true);
            };
            /**
             * @override
             */
            //ui关闭动画完成
            SettingUICtrl.prototype.OnUIHide = function () {
                _super.prototype.OnUIHide.call(this);
            };
            /**
             * @override
             */
            SettingUICtrl.prototype.BeforeUIDestroy = function () {
                _super.prototype.BeforeUIDestroy.call(this);
                this.RemoveEvent();
            };
            /**
             * @override
             */
            SettingUICtrl.prototype.OnUIDestroy = function () {
                _super.prototype.OnUIDestroy.call(this);
            };
            SettingUICtrl.prototype.RegisterEvent = function () {
                Facade.getInstance().registerMediator(this);
                this.GetView().UI_Btn_Setting.on(Laya.Event.CLICK, this, this.OnUI_Btn_SettingClick);
                this.GetView().UI_Tgl_Music.on(Laya.Event.CLICK, this, this.OnUI_Tgl_MusicClick);
                this.GetView().UI_Tgl_Vibrate.on(Laya.Event.CLICK, this, this.OnUI_Tgl_VibrateClick);
            };
            SettingUICtrl.prototype.RemoveEvent = function () {
                Facade.getInstance().removeMediator(this.getMediatorName());
                this.GetView().UI_Btn_Setting.off(Laya.Event.CLICK, this, this.OnUI_Btn_SettingClick);
                this.GetView().UI_Tgl_Music.off(Laya.Event.CLICK, this, this.OnUI_Tgl_MusicClick);
                this.GetView().UI_Tgl_Vibrate.off(Laya.Event.CLICK, this, this.OnUI_Tgl_VibrateClick);
            };
            SettingUICtrl.prototype.OnUI_Btn_SettingClick = function () {
                //需要根据是否在战斗场景中区分，发送其他消息
                if (!GameDataManager.getInstance().MatchInfo.IsGameEnd())
                    this.sendNotification(NotificationNames.PAUSE_MATCH, false);
                //摧毁面板
                this.sendNotification(NotificationNames.DESTROYUI, ui.UIID.SettingUIID);
            };
            SettingUICtrl.prototype.OnUI_Tgl_MusicClick = function () {
                var audioOn = this.GetView().UI_Tgl_Music.selected;
                //切换选中状态
                AudioManager.GetInstance().SetMusicMute(!audioOn);
                AudioManager.GetInstance().SetSoundMute(!audioOn);
                //切换图片
                this.SwitchTglImg(this.GetView().UI_Tgl_Music);
            };
            SettingUICtrl.prototype.OnUI_Tgl_VibrateClick = function () {
                var isShake = this.GetView().UI_Tgl_Vibrate.selected;
                //切换选中状态
                StorageManager.SetVibrateSetting(this.GetView().UI_Tgl_Vibrate.selected);
                //切换图片
                this.SwitchTglImg(this.GetView().UI_Tgl_Vibrate);
                this.sendNotification(NotificationNames.BackgroundUI_StopShakeBg, isShake);
            };
            /**
             * @override
             */
            SettingUICtrl.prototype.listNotificationInterests = function () {
                return [];
            };
            /**
            * @override
            */
            SettingUICtrl.prototype.handleNotification = function (note) {
                switch (note.getName()) {
                }
            };
            //根据选中状态，显示图片
            SettingUICtrl.prototype.SwitchTglImg = function (toggle) {
                toggle.skin = toggle.selected ? "resources/setting/interface_icon_button_01.png" : "resources/setting/interface_icon_button_02.png";
            };
            return SettingUICtrl;
        }(ui.BaseUICtrl));
        uicontrollers.SettingUICtrl = SettingUICtrl;
    })(uicontrollers = ui.uicontrollers || (ui.uicontrollers = {}));
})(ui || (ui = {}));
//# sourceMappingURL=SettingUICtrl.js.map