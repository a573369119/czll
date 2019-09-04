
/**
* Created By Code Generator
*/
module ui.uicontrollers {
    import Facade = puremvc.Facade;

    export class LoadingUICtrl extends ui.BaseUICtrl {
        private readonly ProgressWidth_Max = 741;
        private readonly ProgressWidth_Min = 0;

        constructor(view: View) {
            super(view);
        }

        public GetView(): ui.LoadingUI {
            return this.uiView as ui.LoadingUI;
        }
        /**
         * @override
         */
        public Init(parent: Laya.Sprite, id: ui.UIID) {
            super.Init(parent, id);
            this.GetView().loadingBG.skin = "https://czll.bingodac.com/static/background/main_bg_04.jpg";
            this.mediatorName = ui.UIID.LoadingUIID.toString();

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
        }
        /**
        * @override
        */
        //ui打开动画完成
        protected OnUIOpened(context: WindowContextDataBase = null) {
            super.OnUIOpened(context);
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

        }
        private RemoveEvent(): void {
            Facade.getInstance().removeMediator(this.getMediatorName());


        }

        /**
         * @override
         */
        listNotificationInterests(): string[] {
            return [
                NotificationNames.LoadingUI_Progress
            ];
        }

        /**
        * @override
        */
        handleNotification(note: puremvc.INotification): void {
            switch (note.getName()) {
                case NotificationNames.LoadingUI_Progress: {
                    let progress = note.getBody() as number;
                    this.SetProgress(progress);
                    //2019-6-19 17:19:01 如果进度结束了则隐藏进度条
                    if (progress >= 1) {
                        this.GetView().UI_Box_Progress.visible = false;
                    }
                    break;
                }
            }
        }

        /**
         * 设置进度条
         * @param ratio 0~1
         */
        private SetProgress(ratio: number) {
            let view = this.GetView();
            view.UI_Progress_Mask.width = this.ProgressWidth_Min + (this.ProgressWidth_Max - this.ProgressWidth_Min) * ratio;
            view.UI_Txt_Progress.text = Math.floor(ratio * 100) + "%";
        }
    }
}