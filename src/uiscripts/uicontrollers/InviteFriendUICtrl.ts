
/**
* Created By Code Generator
*/
module ui.uicontrollers {
    import Facade = puremvc.Facade;

    export class InviteFriendUICtrl extends ui.BaseUICtrl {
        private curListLength: number = 20;
        private tweenTask: number;

        constructor(view: View) {
            super(view);
        }

        public GetView(): ui.InviteFriendUI {
            return this.uiView as ui.InviteFriendUI;
        }
        /**
         * @override
         */
        public Init(parent: Laya.Sprite, id: ui.UIID) {
            super.Init(parent, id);
            this.mediatorName = ui.UIID.InviteFriendUIID.toString();

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

            this.tweenTask = -1;

            //初始化列表
            this.InitList();

        }

        /**
         * @override
         */
        //ui动画执行前
        protected BeforeUIOpen(context: WindowContextDataBase = null) {
            super.BeforeUIOpen(context);

            //动画效果
            let view = this.GetView();
            view.UI_Img_Scale.scale(0, 0);
            this.tweenTask = Tween2DUtil.to({
                node: view.UI_Img_Scale,
                duration: ConstDefine.Common_PanelScaleUpTime,
                scalex: ConstDefine.Common_PanelScaleUpMax,
                scaley: ConstDefine.Common_PanelScaleUpMax,
                onComplete: cbhandler.gen_handler(() => {
                    this.tweenTask = Tween2DUtil.to({
                        node: view.UI_Img_Scale,
                        duration: ConstDefine.Common_PanelScaleBounceTime,
                        scalex: 1,
                        scaley: 1,
                        onComplete: cbhandler.gen_handler(() => {
                            this.tweenTask = -1;
                        }, this)
                    })
                }, this)
            })
        }
        /**
        * @override
        */
        //ui打开动画完成
        protected OnUIOpened(context: WindowContextDataBase = null) {
            super.OnUIOpened(context);

            //UI打开的时候，只显示文字提示
            let view = this.GetView();
            view.UI_List_InviteFriend.visible = false;
            view.UI_Txt_CheckTip.visible = true;
            view.UI_Txt_CheckTip.text = "查询中，请稍后..."

            this.sendNotification(NotificationNames.HomepageUI_SetBottomButtonState, new HomepageBottomButtonState(1, true));
        }
        /**
         * @override
         */
        //ui关闭动画完成
        protected OnUIHide() {
            super.OnUIHide();

            //关闭UI时，移除list内容
            // this.CloseList();

            this.sendNotification(NotificationNames.HomepageUI_SetBottomButtonState, new HomepageBottomButtonState(1, false));

            if (this.tweenTask != -1) {
                Tween2DUtil.kill(this.tweenTask);
                this.tweenTask = -1;
            }
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
            this.GetView().UI_Btn_Cancel.on(Laya.Event.CLICK, this, this.OnUI_Btn_CancelClick);
            this.GetView().UI_Btn_InviteFriend.on(Laya.Event.CLICK, this, this.OnUI_Btn_InviteFriendClick);

        }
        private RemoveEvent(): void {
            Facade.getInstance().removeMediator(this.getMediatorName());

            this.GetView().UI_Btn_Cancel.off(Laya.Event.CLICK, this, this.OnUI_Btn_CancelClick);
            this.GetView().UI_Btn_InviteFriend.off(Laya.Event.CLICK, this, this.OnUI_Btn_InviteFriendClick);

        }
        private OnUI_Btn_CancelClick() {
            //关闭面板
            this.sendNotification(NotificationNames.HIDEUI, UIID.InviteFriendUIID);
        }
        private OnUI_Btn_InviteFriendClick() {
            //发送分享
            if (CommonUtil.OnMiniGame()) {
                WechatUtil.getIntance().ShareWithPicAndTitle(ResPathConst.SHARE_PIC[0], "虫子来袭，消灭它们！", null, null,
                    //自己的OpenID，用于邀请别人
                    WechatConstDefine.LOGIN_QUERY_KEY + "=" + GameDataManager.getInstance().LoginPlayerInfo.OpenID
                );
            }
        }

        /**
         * @override
         */
        listNotificationInterests(): string[] {
            return [
                NotificationNames.InviteFriendUI_CheckInviteListComplete,
                NotificationNames.InviteFriendUI_RefreshFriendListInfo,
            ];
        }

        /**
        * @override
        */
        handleNotification(note: puremvc.INotification): void {
            let view = this.GetView();
            switch (note.getName()) {
                case NotificationNames.InviteFriendUI_CheckInviteListComplete: {
                    //查询完毕，开始显示内容
                    //打开UI时，设置list内容
                    this.OpenList();
                    view.UI_List_InviteFriend.visible = true;
                    view.UI_Txt_CheckTip.visible = false;
                    break;
                }
                case NotificationNames.InviteFriendUI_RefreshFriendListInfo: {
                    //因领奖之后状态需要刷新
                    let friendOpenID = note.getBody() as string;
                    let curList = this.GetOrderedInviteList();
                    //查找
                    for (var i = 0; i < curList.length; i++) {
                        var element = curList[i];
                        if (element.friendOpenID == friendOpenID) {
                            //更新
                            view.UI_List_InviteFriend.changeItem(i, element);
                            break;
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
            view.UI_List_InviteFriend.itemRender = InviteItem;
            //滚动条
            view.UI_List_InviteFriend.vScrollBarSkin = "";
            //更新事件
            view.UI_List_InviteFriend.renderHandler = new Handler(this, this.RenderItem);
            //初始化数组
            view.UI_List_InviteFriend.array = [];
            //初始化时直接生成列表，后续只需要更新即可
            //根据好友邀请列表，刷新UI
            let curList = this.GetOrderedInviteList();
            //判断好友列表长度，如果不足20则UI显示到20，如果多于20则显示到最少的整十位数
            let listLength = this.GetListLength(curList.length);
            for (let i = 0; i < listLength; i++) {
                if (i <= curList.length - 1) {
                    //未越界
                    view.UI_List_InviteFriend.addItem(curList[i]);
                } else {
                    //越界
                    view.UI_List_InviteFriend.addItem(null);
                }
            }
            //保存当前列表长度
            this.curListLength = listLength;

        }

        //更新
        private RenderItem(cell: InviteItem, index: number) {
            let data = cell.dataSource as com.msg.inviteDetail;
            //渲染
            cell.RenderItem(data, index);
        }

        //打开列表
        private OpenList() {
            let view = this.GetView();
            //根据好友邀请列表，刷新UI
            let curList = this.GetOrderedInviteList();
            //判断好友列表长度，如果比旧长度长则新增，否则只更新
            let listLength = this.GetListLength(curList.length);
            for (let i = 0; i < listLength; i++) {
                if (i <= this.curListLength - 1) {
                    //只更新
                    if (i <= curList.length - 1) {
                        //未越界，因为需要修改的部分只有领奖状态，因此进行对比
                        let itemData = view.UI_List_InviteFriend.getItem(i) as com.msg.inviteDetail;
                        //仅有状态改变的才会修改
                        if (itemData == null || itemData.rewardGained != curList[i].rewardGained) {
                            view.UI_List_InviteFriend.changeItem(i, curList[i]);
                        }
                    } else {
                        //越界，不用管，依旧是空数据
                        // view.UI_List_InviteFriend.changeItem(i, null);
                    }
                } else {
                    //新增
                    if (i <= curList.length - 1) {
                        //未越界
                        view.UI_List_InviteFriend.addItem(curList[i]);
                    } else {
                        //越界
                        view.UI_List_InviteFriend.addItem(null);
                    }
                }
            }
            //保存当前列表长度
            this.curListLength = listLength;
        }

        //获取长度
        private GetListLength(curLength: number): number {
            let result: number = 20;
            if (curLength <= result) {
                return result;
            } else {
                return Math.round(Math.ceil(curLength / 10) * 10);
            }
        }

        //获取排好序的好友列表
        private GetOrderedInviteList(): com.msg.inviteDetail[] {
            // let curList = new Array<com.msg.inviteDetail>();
            // //按照index从小到大排序
            // for (var i = 0; i < GameDataManager.getInstance().LoginPlayerInfo.InvitedList.length; i++) {
            //     curList.push(GameDataManager.getInstance().LoginPlayerInfo.InvitedList[i]);
            // }
            // curList = SortUtil.orderby(curList, i => i.index)
            // return curList;

            //与服务器协议后，服务器返回的为正确顺序
            return GameDataManager.getInstance().LoginPlayerInfo.InvitedList;
        }
    }

}