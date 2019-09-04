
/**
* Created By Code Generator
*/
module ui.uicontrollers {
    import Facade = puremvc.Facade;


    export class WaitingUICtrl extends ui.BaseUICtrl {
        private timeLine: Laya.TimeLine = null;
        constructor(view: View) {
            super(view);
        }

        public GetView(): ui.WaitingUI {
            return this.uiView as ui.WaitingUI;
        }
        /**
         * @override
         */
        public Init(parent: Laya.Sprite, id: ui.UIID) {
            super.Init(parent, id);
            this.mediatorName = ui.UIID.WaitingUIID.toString();

            //ui配置
            this.uiConfig = new WindowConfigData();
            this.uiConfig.uiOpenAnimType = UIAnim.None;
            this.uiConfig.uiCloseAnimType = UIAnim.None;
            this.uiConfig.depth = 0;
            //添加舞台
            parent.addChild(this.uiView)
            this.uiView.zOrder = 102;

            this.RegisterEvent();

            this.timeLine = new Laya.TimeLine();
            this.timeLine.addLabel("loading", 0).to(this.GetView().waitingAnim, { rotation: 360 }, 2000, Laya.Ease.linearNone, 0)

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
            this.timeLine.play("loading", true)
        }
        /**
         * @override
         */
        //ui关闭动画完成
        protected OnUIHide() {
            super.OnUIHide();
            this.timeLine.pause()
        }
        /**
         * @override
         */
        protected BeforeUIDestroy() {
            this.RemoveEvent();
            this.timeLine.pause();
            this.timeLine.destroy();
        }
        /**
         * @override
         */
        protected OnUIDestroy() {

        }

        private RegisterEvent(): void {
            Facade.getInstance().registerMediator(this)

        }
        private RemoveEvent(): void {
            Facade.getInstance().removeMediator(this.getMediatorName());


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