
/**
* Created By Code Generator
*/
module ui.uicontrollers {
    import Facade = puremvc.Facade;

    export class SettingUICtrl extends ui.BaseUICtrl {
        constructor(view: View) {
            super(view);
        }

        public GetView(): ui.SettingUI {
            return this.uiView as ui.SettingUI;
        }
        /**
         * @override
         */
        public Init(parent: Laya.Sprite, id: ui.UIID) {
            super.Init(parent, id);
            this.mediatorName = ui.UIID.SettingUIID.toString();

            //ui配置
            //this.uiConfig = new WindowConfigData();
            //this.uiConfig.uiOpenAnimType = UIAnim.PopOpen;
            //this.uiConfig.uiCloseAnimType = UIAnim.PopClose;
            //this.uiConfig.depth = 0;
            //添加舞台
            parent.addChild(this.uiView)
            this.uiView.zOrder = this.uiConfig.depth;

            this.RegisterEvent();

            //自适应
            this.GetView().on(Laya.Event.RESIZE, this, () => {
                this.GetView().width = Laya.stage.width;
                this.GetView().height = Laya.stage.height;
            });
        }

        /**
         * @override
         */
        //ui动画执行前
        protected BeforeUIOpen(context: WindowContextDataBase = null) {
            super.BeforeUIOpen(context);

            //在打开UI前，读取当前的状态
            let view = this.GetView();
            view.UI_Tgl_Music.selected = StorageManager.GetMusicSetting();
            view.UI_Tgl_Vibrate.selected = StorageManager.GetVibrateSetting();
            //根据状态显示图片
            this.SwitchTglImg(view.UI_Tgl_Music);
            this.SwitchTglImg(view.UI_Tgl_Vibrate);
        }
        /**
        * @override
        */
        //ui打开动画完成
        protected OnUIOpened(context: WindowContextDataBase = null) {
            super.OnUIOpened(context);
            if (!GameDataManager.getInstance().MatchInfo.IsGameEnd()) this.sendNotification(NotificationNames.PAUSE_MATCH, true)
        }
        /**
         * @override
         */
        //ui关闭动画完成
        protected OnUIHide() {
            super.OnUIHide();
        }
        /**
         * @override
         */
        protected BeforeUIDestroy() {
            super.BeforeUIDestroy();
            this.RemoveEvent();
        }
        /**
         * @override
         */
        protected OnUIDestroy() {
            super.OnUIDestroy();
        }

        private RegisterEvent(): void {
            Facade.getInstance().registerMediator(this)
            this.GetView().UI_Btn_Setting.on(Laya.Event.CLICK, this, this.OnUI_Btn_SettingClick);
            this.GetView().UI_Tgl_Music.on(Laya.Event.CLICK, this, this.OnUI_Tgl_MusicClick);
            this.GetView().UI_Tgl_Vibrate.on(Laya.Event.CLICK, this, this.OnUI_Tgl_VibrateClick);
        }
        private RemoveEvent(): void {
            Facade.getInstance().removeMediator(this.getMediatorName());

            this.GetView().UI_Btn_Setting.off(Laya.Event.CLICK, this, this.OnUI_Btn_SettingClick);
            this.GetView().UI_Tgl_Music.off(Laya.Event.CLICK, this, this.OnUI_Tgl_MusicClick);
            this.GetView().UI_Tgl_Vibrate.off(Laya.Event.CLICK, this, this.OnUI_Tgl_VibrateClick);
        }
        private OnUI_Btn_SettingClick() {
            //需要根据是否在战斗场景中区分，发送其他消息
            if (!GameDataManager.getInstance().MatchInfo.IsGameEnd()) this.sendNotification(NotificationNames.PAUSE_MATCH, false)
            //摧毁面板
            this.sendNotification(NotificationNames.DESTROYUI, UIID.SettingUIID);
        }
        private OnUI_Tgl_MusicClick() {
            let audioOn = this.GetView().UI_Tgl_Music.selected;
            //切换选中状态
            AudioManager.GetInstance().SetMusicMute(!audioOn);
            AudioManager.GetInstance().SetSoundMute(!audioOn);
            //切换图片
            this.SwitchTglImg(this.GetView().UI_Tgl_Music);
        }
        private OnUI_Tgl_VibrateClick() {
            let isShake = this.GetView().UI_Tgl_Vibrate.selected;
            //切换选中状态
            StorageManager.SetVibrateSetting(this.GetView().UI_Tgl_Vibrate.selected);
            //切换图片
            this.SwitchTglImg(this.GetView().UI_Tgl_Vibrate);
            this.sendNotification(NotificationNames.BackgroundUI_StopShakeBg, isShake);

        }

        /**
         * @override
         */
        listNotificationInterests(): string[] {
            return [

            ];
        }

        /**
        * @override
        */
        handleNotification(note: puremvc.INotification): void {
            switch (note.getName()) {

            }
        }

        //根据选中状态，显示图片
        private SwitchTglImg(toggle: Laya.CheckBox) {
            toggle.skin = toggle.selected ? "resources/setting/interface_icon_button_01.png" : "resources/setting/interface_icon_button_02.png";
        }
    }
}