
/**
* Created By Code Generator
*/
module ui.uicontrollers {
    import Facade = puremvc.Facade;

    export class CommonPanelUICtrl extends ui.BaseUICtrl {
        private callback : Function;


        constructor(view: View) {
            super(view);
        }

        public GetView():ui.CommonPanelUI {
            return this.uiView as ui.CommonPanelUI;
        }
        /**
         * @override
         */
        public Init(parent: Laya.Sprite,id:ui.UIID) {
            super.Init(parent,id);
            this.mediatorName = ui.UIID.CommonPanelUIID.toString();

            //添加舞台
            parent.addChild(this.uiView)
            this.uiView.zOrder = 0;

            this.RegisterEvent();
        }

        /**
         * @override
         */
        //ui动画执行前
        protected BeforeUIOpen(context: WindowContextDataBase = null) {
            super.BeforeUIOpen(context);
        }
        /**
        * @override
        */
        //ui打开动画完成
        protected OnUIOpened(context: WindowContextDataBase = null) {
            super.OnUIOpened(context);
            let data = context as CommonPanelUIParam;
            this.GetView().txt_context.text = data.context;
            this.callback = data.callback;
        }
        /**
         * @override
         */
        //ui关闭动画完成
        protected OnUIHide() {
            super.OnUIHide();
            this.GetView().txt_context.text = "";
            this.callback = null;
        }
        /**
         * @override
         */
        protected BeforeUIDestroy() {
            this.RemoveEvent();
        }
        /**
         * @override
         */
        protected OnUIDestroy() {

        }

        private RegisterEvent(): void {
            Facade.getInstance().registerMediator(this)
            this.GetView().btn_exit.on(Laya.Event.CLICK, this, this.Onbtn_exitClick);

        }
        private RemoveEvent(): void {
            Facade.getInstance().removeMediator(this.getMediatorName());

            this.GetView().btn_exit.off(Laya.Event.CLICK, this, this.Onbtn_exitClick);

        }
        private Onbtn_exitClick() {
            if(this.callback){
                this.callback();
            }
            this.sendNotification(NotificationNames.HIDEUI,ui.UIID.CommonPanelUIID);
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
    }
}