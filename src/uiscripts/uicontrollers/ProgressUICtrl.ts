
/**
* Created By Code Generator
*/
module ui.uicontrollers {
    import Facade = puremvc.Facade;

    export class ProgressUICtrl extends ui.BaseUICtrl {

        private readonly progressMaxValue: number;
        private readonly progressMinValue: number = 30;

        constructor(view: View) {
            super(view);
            //初始化参数
            this.progressMaxValue = this.GetView().img_progressBG.height - 12;
            // this.progressMinValue = 0;
            Log.Debug("ProgressUI 进度条长度初始化：", this.progressMinValue, this.progressMaxValue);
        }

        public GetView(): ui.ProgressUI {
            return this.uiView as ui.ProgressUI;
        }
        /**
         * @override
         */
        public Init(parent: Laya.Sprite, id: ui.UIID) {
            super.Init(parent, id);
            this.mediatorName = ui.UIID.ProgressUIID.toString();

            //添加舞台
            parent.addChild(this.uiView)
            this.uiView.zOrder = 0;

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
        protected BeforeUIOpen() {
            super.BeforeUIOpen();
            //清空进度条
            this.UpdateProgress(0);
        }
        /**
        * @override
        */
        //ui打开动画完成
        protected OnUIOpened() {
            super.OnUIOpened();
        }
        /**
         * @override
         */
        //ui关闭动画完成
        protected OnUIHide() {
            super.OnUIHide();
            //清空进度条
            this.UpdateProgress(0);
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

        }
        private RemoveEvent(): void {
            Facade.getInstance().removeMediator(this.getMediatorName());


        }

        /**
         * @override
         */
        listNotificationInterests(): string[] {
            return [
                // NotificationNames.ProgressUI_UpdateProgress,
            ];
        }

        /**
        * @override
        */
        handleNotification(note: puremvc.INotification): void {
            switch (note.getName()) {
                // case NotificationNames.ProgressUI_UpdateProgress:
                //     this.UpdateProgress(note.getBody() as number);
                // break;
            }
        }

        private UpdateProgress(ratio: number) {
            this.GetView().img_progress.height = this.RatioConvertToPixel(ratio);
            Log.Debug("ProgressUI ratio", ratio, this.RatioConvertToPixel(ratio));
            this.GetView().txt_progress.text = Math.floor(ratio * 100).toString() + "%";
        }

        //比例转化为像素
        private RatioConvertToPixel(ratio: number) {
            return (this.progressMaxValue - this.progressMinValue) * ratio + this.progressMinValue;
        }
    }
}