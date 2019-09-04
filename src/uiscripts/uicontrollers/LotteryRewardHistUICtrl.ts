
/**
* Created By Code Generator
*/
module ui.uicontrollers {
    import Facade = puremvc.Facade;

    export class LotteryRewardHistUICtrl extends ui.BaseUICtrl {
        private allData: boolean;
        private page: number;
        private checking: boolean;
        private mouseDown: boolean;

        private readonly checkNum: number = 10;

        constructor(view: View) {
            super(view);
        }

        public GetView(): ui.LotteryRewardHistUI {
            return this.uiView as ui.LotteryRewardHistUI;
        }
        /**
         * @override
         */
        public Init(parent: Laya.Sprite, id: ui.UIID) {
            super.Init(parent, id);
            this.mediatorName = ui.UIID.LotteryRewardHistUIID.toString();

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

            this.InitList();
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

            //打开的时候从第一页开始
            this.page = 1;
            this.checking = true;
            this.allData = false;
            //发送查询消息
            HttpMessageSender.GetSender().SendCheckLotteryRewardHistroy(GameDataManager.getInstance().GetLoginPlayerID(), this.page, this.checkNum);
        }
        /**
         * @override
         */
        //ui关闭动画完成
        protected OnUIHide() {
            super.OnUIHide();

            //关闭UI的时候清空内容
            let view = this.GetView();
            let count = view.UI_List_Hist.length;
            for (var i = 0; i < count; i++) {
                view.UI_List_Hist.deleteItem(0);
            }
            view.UI_List_Hist.array = [];
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
            let view = this.GetView();
            Facade.getInstance().registerMediator(this)

            view.UI_Btn_Back.on(Laya.Event.CLICK, this, this.OnUI_Btn_BackClick);

            view.UI_List_Hist.on(Laya.Event.MOUSE_DOWN, this, this.OnListMouseDown);
            view.UI_List_Hist.on(Laya.Event.MOUSE_MOVE, this, this.OnListMouseMove);
            view.UI_List_Hist.on(Laya.Event.MOUSE_UP, this, this.OnListMouseUp);
            view.UI_List_Hist.on(Laya.Event.MOUSE_OUT, this, this.OnListMouseOut);
        }
        private RemoveEvent(): void {
            let view = this.GetView();
            Facade.getInstance().removeMediator(this.getMediatorName());

            view.UI_Btn_Back.off(Laya.Event.CLICK, this, this.OnUI_Btn_BackClick);

            view.UI_List_Hist.on(Laya.Event.MOUSE_DOWN, this, this.OnListMouseDown);
            view.UI_List_Hist.on(Laya.Event.MOUSE_MOVE, this, this.OnListMouseMove);
            view.UI_List_Hist.on(Laya.Event.MOUSE_UP, this, this.OnListMouseUp);
            view.UI_List_Hist.on(Laya.Event.MOUSE_OUT, this, this.OnListMouseOut);
        }
        private OnUI_Btn_BackClick() {
            this.sendNotification(NotificationNames.HIDEUI, UIID.LotteryRewardHistUIID);
        }

        private OnListMouseDown() {
            this.mouseDown = true;
        }
        private OnListMouseMove() {
            //检查是否到底、未查询状态、未查询完状态
            if (this.mouseDown && !this.allData && !this.checking && this.GetView().UI_List_Hist.scrollBar.value >= 1) {
                //可以查询下一页，发送消息并标记
                this.checking = true;
                this.page += 1;
                HttpMessageSender.GetSender().SendCheckLotteryRewardHistroy(GameDataManager.getInstance().GetLoginPlayerID(), this.page, this.checkNum);
            }
        }
        private OnListMouseUp() {
            this.mouseDown = false;
        }
        private OnListMouseOut() {
            this.mouseDown = false;
        }


        /**
         * @override
         */
        listNotificationInterests(): string[] {
            return [
                NotificationNames.LotteryRewardHistUI_CheckResult
            ];
        }

        /**
        * @override
        */
        handleNotification(note: puremvc.INotification): void {
            let view = this.GetView();
            switch (note.getName()) {
                case NotificationNames.LotteryRewardHistUI_CheckResult: {
                    //收到查询结果，做判断
                    let data = note.getBody() as com.msg.s_CheckLotteryRewardHistroy_2303;
                    if (data.result == 0) {
                        //失败
                        this.checking = false;
                        this.page -= 1;
                    } else if (data.result == 1) {
                        //成功，但是还有剩余
                        this.checking = false;
                        this.allData = false;
                    } else if (data.result == 2) {
                        //成功，且查询完毕
                        this.checking = false;
                        this.allData = true;
                    }
                    if (data.rewardHistList) {
                        //将获取到的数据添加到列表中
                        for (let i = 0; i < data.rewardHistList.length; i++) {
                            let element = data.rewardHistList[i];
                            view.UI_List_Hist.addItem(element);
                        }
                    }

                    break;
                }
            }
        }

        //初始化列表
        private InitList() {
            let view = this.GetView();
            //设置渲染物体
            view.UI_List_Hist.itemRender = LotteryHistItem;
            //滚动条
            view.UI_List_Hist.vScrollBarSkin = "";
            //更新事件
            view.UI_List_Hist.renderHandler = new Handler(this, this.RenderItem);
            //初始化数组
            view.UI_List_Hist.array = [];
        }

        //更新
        private RenderItem(cell: LotteryHistItem, index: number) {
            let data = cell.dataSource as com.msg.lotteryRewardInfo;
            //渲染
            cell.RenderItem(data, index);
        }
    }
}