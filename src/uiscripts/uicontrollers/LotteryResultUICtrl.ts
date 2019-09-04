
/**
* Created By Code Generator
*/
module ui.uicontrollers {
    import Facade = puremvc.Facade;

    export class LotteryResultUICtrl extends ui.BaseUICtrl {
        constructor(view: View) {
            super(view);
        }

        public GetView(): ui.LotteryResultUI {
            return this.uiView as ui.LotteryResultUI;
        }
        /**
         * @override
         */
        public Init(parent: Laya.Sprite, id: ui.UIID) {
            super.Init(parent, id);
            this.mediatorName = ui.UIID.LotteryResultUIID.toString();

            //ui配置
            //this.uiConfig = new WindowConfigData();
            //this.uiConfig.uiOpenAnimType = UIAnim.PopOpen;
            //this.uiConfig.uiCloseAnimType = UIAnim.PopClose;
            //this.uiConfig.depth = 0;
            //添加舞台
            parent.addChild(this.uiView)
            this.uiView.zOrder = this.uiConfig.depth;
            // this.uiView.zOrder = 10001;//大于抽奖界面
            this.RegisterEvent();

            //自适应
            this.GetView().on(Laya.Event.RESIZE, this, () => {
                this.GetView().width = Laya.stage.width;
                this.GetView().height = Laya.stage.height;
            });

            //初始化列表
            this.InitList();

            this.itemPool = new Array<LotteryItem>();
        }

        /**
         * @override
         */
        //ui动画执行前
        protected BeforeUIOpen(context: WindowContextDataBase = null) {
            super.BeforeUIOpen(context);
            let param = context as LotteryRewardUIParam;
            //ui位置调整
            if (param.rewardConfigList.length == 0) this.GetView().img_box.y = 700;
            else this.GetView().img_box.y = 429;
        }
        /**
        * @override
        */
        //ui打开动画完成
        protected OnUIOpened(context: WindowContextDataBase = null) {
            super.OnUIOpened(context);
            AudioManager.GetInstance().PlaySoundByConfigID(EnumSoundID.sound_function_touch_03);
            let param = context as LotteryRewardUIParam;
            //通过获奖信息渲染
            let itemInfoArray = new Array<LotteryItemParam>();
            for (let i = 0; i < param.rewardConfigList.length; i++) {
                let element = param.rewardConfigList[i];
                let found: boolean = false;
                for (let j = 0; j < itemInfoArray.length; j++) {
                    let item = itemInfoArray[j];
                    if (item.configID == element) {
                        //找到了
                        item.num += 1;
                        found = true;
                    }
                }
                if (!found) {
                    //没找到
                    let item = { configID: element, num: 1 };
                    itemInfoArray.push(item);
                }
            }
            let view = this.GetView();
            //创建完成，赋值给列表
            view.UI_List_LotteryReward.array = itemInfoArray;
            //设置宽高
            if (itemInfoArray.length == 0) { view.box_DieSHow.visible = true; view.img_GetAward.visible = false; } else { view.img_GetAward.visible = true; view.box_DieSHow.visible = false; }
            if (itemInfoArray.length < 5) {
                view.UI_List_LotteryReward.height = 150;
                view.UI_List_LotteryReward.width = itemInfoArray.length * 150;
            } else {
                view.UI_List_LotteryReward.height = 300;
                view.UI_List_LotteryReward.width = 600;
            }
        }
        /**
         * @override
         */
        //ui关闭动画完成
        protected OnUIHide() {
            super.OnUIHide();

            //清除列表内容
            let view = this.GetView();
            let count = view.UI_List_LotteryReward.length;
            for (var i = 0; i < count; i++) {
                view.UI_List_LotteryReward.deleteItem(0);
            }
            view.UI_List_LotteryReward.array = null;

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
            this.GetView().UI_Btn_Back.on(Laya.Event.CLICK, this, this.OnUI_Btn_BackClick);

        }
        private RemoveEvent(): void {
            Facade.getInstance().removeMediator(this.getMediatorName());

            this.GetView().UI_Btn_Back.off(Laya.Event.CLICK, this, this.OnUI_Btn_BackClick);

        }
        private OnUI_Btn_BackClick() {
            this.sendNotification(NotificationNames.HIDEUI, UIID.LotteryResultUIID);
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

        //初始化列表
        private InitList() {
            let view = this.GetView();
            //设置渲染物体
            view.UI_List_LotteryReward.itemRender = LotteryItem;
            //更新事件
            view.UI_List_LotteryReward.renderHandler = new Handler(this, this.RenderItem);
            //滑动条
            view.UI_List_LotteryReward.vScrollBarSkin = "";
            //初始化数组
            // view.UI_List_LotteryReward.array = [];
        }

        //更新
        private RenderItem(cell: LotteryItem, index: number) {
            let data = cell.dataSource as LotteryItemParam;
            //渲染
            let config = ConfigManager.GetInstance().GetLotteryRewardConfig(data.configID);
            //为了防止破坏以前的结构
            console.log(cell);
            cell.InitItem(config.rewardSkin, data.num, 150, config.rewardName);
        }

        //池功能
        private itemPool: Array<LotteryItem>;
        private CreateItem(): LotteryItem {
            let item = this.itemPool.pop();
            if (!item) {
                item = new LotteryItem();
            }
            return item;
        }
        private DeleteItem(item: LotteryItem) {
            item.removeSelf();
            this.itemPool.push(item);
        }

    }

    type LotteryItemParam = {
        configID: number,
        num: number
    }
}