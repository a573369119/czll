
/**
* Created By Code Generator
*/
module ui.uicontrollers {
    import Facade = puremvc.Facade;

    export class LeaderboardUICtrl extends ui.BaseUICtrl {
        private mouseY: number;
        private mouseDown: boolean;
        private sharedCanvas: Laya.Texture;
        private tweenTask: number;

        constructor(view: View) {
            super(view);
        }

        public GetView(): ui.LeaderboardUI {
            return this.uiView as ui.LeaderboardUI;
        }
        /**
         * @override
         */
        public Init(parent: Laya.Sprite, id: ui.UIID) {
            super.Init(parent, id);
            this.mediatorName = ui.UIID.LeaderboardUIID.toString();

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

        }

        /**
         * @override
         */
        //ui动画执行前
        protected BeforeUIOpen(context: WindowContextDataBase = null) {
            super.BeforeUIOpen(context);

            if (CommonUtil.OnMiniGame()) {
                //1.获取子域实例
                let wx = Laya.Browser.window.wx;
                let leaderboardContext = wx.getOpenDataContext();
                //2.发送子域消息
                WechatUtil.wxPostMessage({
                    cmd: OpenDataContextCmdDefine.LEADERBOARDUI_OPEN
                });
                //3.渲染
                Laya.timer.once(400, this, this.LoopRenderCanvas);
            }

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

            this.sendNotification(NotificationNames.HomepageUI_SetBottomButtonState, new HomepageBottomButtonState(0, true));

            if (CommonUtil.OnMiniGame()) {
                WechatUtil.getIntance().ShowBannerAd();
            }
        }
        /**
         * @override
         */
        //ui关闭动画完成
        protected OnUIHide() {
            super.OnUIHide();

            if (CommonUtil.OnMiniGame()) {
                //1.获取子域示例
                let wx = Laya.Browser.window.wx;
                let leaderboardContext = wx.getOpenDataContext();
                //2.发送子域消息
                WechatUtil.wxPostMessage({ cmd: OpenDataContextCmdDefine.LEADERBOARDUI_CLOSE });
                Laya.timer.clear(this, this.LoopRenderCanvas);
                if (this.sharedCanvas != null && this.sharedCanvas != undefined) {
                    this.sharedCanvas.bitmap.alwaysChange = false;
                }
                //清空渲染内容
                this.GetView().UI_Img_SharedCanvas.graphics.clear();
                this.GetView().UI_Img_SharedCanvas.skin = "";
            }


            this.sendNotification(NotificationNames.HomepageUI_SetBottomButtonState, new HomepageBottomButtonState(0, false));

            if (this.tweenTask != -1) {
                Tween2DUtil.kill(this.tweenTask);
                this.tweenTask = -1;
            }

            if (CommonUtil.OnMiniGame()) {
                WechatUtil.getIntance().HideBannerAd();
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

            let view = this.GetView();
            view.UI_Btn_Cancel.on(Laya.Event.CLICK, this, this.OnUI_Btn_CancelClick);
            view.UI_Btn_Invite_Friend.on(Laya.Event.CLICK, this, this.OnUI_Btn_Invite_FriendClick);

            view.UI_Img_SharedCanvas.on(Laya.Event.MOUSE_DOWN, this, this.OnPanelMouseDown);
            view.UI_Img_SharedCanvas.on(Laya.Event.MOUSE_MOVE, this, this.OnPanelMouseMove);
            view.UI_Img_SharedCanvas.on(Laya.Event.MOUSE_UP, this, this.OnPanelMouseUp);
            view.UI_Img_SharedCanvas.on(Laya.Event.MOUSE_OUT, this, this.OnPanelMouseOut);

        }
        private RemoveEvent(): void {
            Facade.getInstance().removeMediator(this.getMediatorName());

            let view = this.GetView();

            view.UI_Btn_Cancel.off(Laya.Event.CLICK, this, this.OnUI_Btn_CancelClick);
            view.UI_Btn_Invite_Friend.off(Laya.Event.CLICK, this, this.OnUI_Btn_Invite_FriendClick);

            view.UI_Img_SharedCanvas.off(Laya.Event.MOUSE_DOWN, this, this.OnPanelMouseDown);
            view.UI_Img_SharedCanvas.off(Laya.Event.MOUSE_MOVE, this, this.OnPanelMouseMove);
            view.UI_Img_SharedCanvas.off(Laya.Event.MOUSE_UP, this, this.OnPanelMouseUp);
            view.UI_Img_SharedCanvas.off(Laya.Event.MOUSE_OUT, this, this.OnPanelMouseOut);


        }
        private OnUI_Btn_CancelClick() {
            this.sendNotification(NotificationNames.HIDEUI, UIID.LeaderboardUIID);
        }
        private OnUI_Btn_Invite_FriendClick() {
            //点击邀请好友
            //发送分享
            if (CommonUtil.OnMiniGame()) {
                WechatUtil.getIntance().ShareWithPicAndTitle(ResPathConst.SHARE_PIC[0], "虫子来袭，消灭它们！", null, null,
                    //自己的OpenID，用于邀请别人
                    WechatConstDefine.LOGIN_QUERY_KEY + "=" + GameDataManager.getInstance().LoginPlayerInfo.OpenID
                );
            }
        }


        private OnPanelMouseDown() {
            // Log.Debug("主域拖动","Down");
            this.mouseY = Laya.stage.mouseY;
            this.mouseDown = true;
        }
        private OnPanelMouseMove() {
            if (this.mouseDown) {
                // Log.Debug("主域拖动","Move");
                var currentY = Laya.stage.mouseY;
                var deltaY = currentY - this.mouseY;
                if (CommonUtil.OnMiniGame()) {
                    WechatUtil.wxPostMessage({
                        cmd: OpenDataContextCmdDefine.LEADERBOARDUI_DRAG,
                        deltaY: deltaY,
                    });
                }
                this.mouseY = currentY;
            }
        }
        private OnPanelMouseUp() {
            this.mouseDown = false;
        }
        private OnPanelMouseOut() {
            this.mouseDown = false;
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

        private LoopRenderCanvas() {
            let view = this.GetView();

            Laya.Browser.window.sharedCanvas.width = view.UI_Img_SharedCanvas.width;
            Laya.Browser.window.sharedCanvas.height = view.UI_Img_SharedCanvas.height;
            this.sharedCanvas = new Laya.Texture(Laya.Browser.window.sharedCanvas);
            this.sharedCanvas.bitmap.alwaysChange = true;
            //将内容绘制到屏幕上
            view.UI_Img_SharedCanvas.graphics.drawTexture(this.sharedCanvas, 0, 0, this.sharedCanvas.width, this.sharedCanvas.height);
        }

    }
}