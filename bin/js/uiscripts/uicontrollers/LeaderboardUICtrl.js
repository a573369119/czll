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
        var LeaderboardUICtrl = (function (_super) {
            __extends(LeaderboardUICtrl, _super);
            function LeaderboardUICtrl(view) {
                return _super.call(this, view) || this;
            }
            LeaderboardUICtrl.prototype.GetView = function () {
                return this.uiView;
            };
            /**
             * @override
             */
            LeaderboardUICtrl.prototype.Init = function (parent, id) {
                var _this = this;
                _super.prototype.Init.call(this, parent, id);
                this.mediatorName = ui.UIID.LeaderboardUIID.toString();
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
                this.tweenTask = -1;
            };
            /**
             * @override
             */
            //ui动画执行前
            LeaderboardUICtrl.prototype.BeforeUIOpen = function (context) {
                var _this = this;
                if (context === void 0) { context = null; }
                _super.prototype.BeforeUIOpen.call(this, context);
                if (CommonUtil.OnMiniGame()) {
                    //1.获取子域实例
                    var wx = Laya.Browser.window.wx;
                    var leaderboardContext = wx.getOpenDataContext();
                    //2.发送子域消息
                    WechatUtil.wxPostMessage({
                        cmd: OpenDataContextCmdDefine.LEADERBOARDUI_OPEN
                    });
                    //3.渲染
                    Laya.timer.once(400, this, this.LoopRenderCanvas);
                }
                //动画效果
                var view = this.GetView();
                view.UI_Img_Scale.scale(0, 0);
                this.tweenTask = Tween2DUtil.to({
                    node: view.UI_Img_Scale,
                    duration: ConstDefine.Common_PanelScaleUpTime,
                    scalex: ConstDefine.Common_PanelScaleUpMax,
                    scaley: ConstDefine.Common_PanelScaleUpMax,
                    onComplete: cbhandler.gen_handler(function () {
                        _this.tweenTask = Tween2DUtil.to({
                            node: view.UI_Img_Scale,
                            duration: ConstDefine.Common_PanelScaleBounceTime,
                            scalex: 1,
                            scaley: 1,
                            onComplete: cbhandler.gen_handler(function () {
                                _this.tweenTask = -1;
                            }, _this)
                        });
                    }, this)
                });
            };
            /**
            * @override
            */
            //ui打开动画完成
            LeaderboardUICtrl.prototype.OnUIOpened = function (context) {
                if (context === void 0) { context = null; }
                _super.prototype.OnUIOpened.call(this, context);
                this.sendNotification(NotificationNames.HomepageUI_SetBottomButtonState, new HomepageBottomButtonState(0, true));
                if (CommonUtil.OnMiniGame()) {
                    WechatUtil.getIntance().ShowBannerAd();
                }
            };
            /**
             * @override
             */
            //ui关闭动画完成
            LeaderboardUICtrl.prototype.OnUIHide = function () {
                _super.prototype.OnUIHide.call(this);
                if (CommonUtil.OnMiniGame()) {
                    //1.获取子域示例
                    var wx = Laya.Browser.window.wx;
                    var leaderboardContext = wx.getOpenDataContext();
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
            };
            /**
             * @override
             */
            LeaderboardUICtrl.prototype.BeforeUIDestroy = function () {
                _super.prototype.BeforeUIDestroy.call(this);
                this.RemoveEvent();
            };
            /**
             * @override
             */
            LeaderboardUICtrl.prototype.OnUIDestroy = function () {
                _super.prototype.OnUIDestroy.call(this);
            };
            LeaderboardUICtrl.prototype.RegisterEvent = function () {
                Facade.getInstance().registerMediator(this);
                var view = this.GetView();
                view.UI_Btn_Cancel.on(Laya.Event.CLICK, this, this.OnUI_Btn_CancelClick);
                view.UI_Btn_Invite_Friend.on(Laya.Event.CLICK, this, this.OnUI_Btn_Invite_FriendClick);
                view.UI_Img_SharedCanvas.on(Laya.Event.MOUSE_DOWN, this, this.OnPanelMouseDown);
                view.UI_Img_SharedCanvas.on(Laya.Event.MOUSE_MOVE, this, this.OnPanelMouseMove);
                view.UI_Img_SharedCanvas.on(Laya.Event.MOUSE_UP, this, this.OnPanelMouseUp);
                view.UI_Img_SharedCanvas.on(Laya.Event.MOUSE_OUT, this, this.OnPanelMouseOut);
            };
            LeaderboardUICtrl.prototype.RemoveEvent = function () {
                Facade.getInstance().removeMediator(this.getMediatorName());
                var view = this.GetView();
                view.UI_Btn_Cancel.off(Laya.Event.CLICK, this, this.OnUI_Btn_CancelClick);
                view.UI_Btn_Invite_Friend.off(Laya.Event.CLICK, this, this.OnUI_Btn_Invite_FriendClick);
                view.UI_Img_SharedCanvas.off(Laya.Event.MOUSE_DOWN, this, this.OnPanelMouseDown);
                view.UI_Img_SharedCanvas.off(Laya.Event.MOUSE_MOVE, this, this.OnPanelMouseMove);
                view.UI_Img_SharedCanvas.off(Laya.Event.MOUSE_UP, this, this.OnPanelMouseUp);
                view.UI_Img_SharedCanvas.off(Laya.Event.MOUSE_OUT, this, this.OnPanelMouseOut);
            };
            LeaderboardUICtrl.prototype.OnUI_Btn_CancelClick = function () {
                this.sendNotification(NotificationNames.HIDEUI, ui.UIID.LeaderboardUIID);
            };
            LeaderboardUICtrl.prototype.OnUI_Btn_Invite_FriendClick = function () {
                //点击邀请好友
                //发送分享
                if (CommonUtil.OnMiniGame()) {
                    WechatUtil.getIntance().ShareWithPicAndTitle(ResPathConst.SHARE_PIC[0], "虫子来袭，消灭它们！", null, null, 
                    //自己的OpenID，用于邀请别人
                    WechatConstDefine.LOGIN_QUERY_KEY + "=" + GameDataManager.getInstance().LoginPlayerInfo.OpenID);
                }
            };
            LeaderboardUICtrl.prototype.OnPanelMouseDown = function () {
                // Log.Debug("主域拖动","Down");
                this.mouseY = Laya.stage.mouseY;
                this.mouseDown = true;
            };
            LeaderboardUICtrl.prototype.OnPanelMouseMove = function () {
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
            };
            LeaderboardUICtrl.prototype.OnPanelMouseUp = function () {
                this.mouseDown = false;
            };
            LeaderboardUICtrl.prototype.OnPanelMouseOut = function () {
                this.mouseDown = false;
            };
            /**
             * @override
             */
            LeaderboardUICtrl.prototype.listNotificationInterests = function () {
                return [];
            };
            /**
            * @override
            */
            LeaderboardUICtrl.prototype.handleNotification = function (note) {
                switch (note.getName()) {
                }
            };
            LeaderboardUICtrl.prototype.LoopRenderCanvas = function () {
                var view = this.GetView();
                Laya.Browser.window.sharedCanvas.width = view.UI_Img_SharedCanvas.width;
                Laya.Browser.window.sharedCanvas.height = view.UI_Img_SharedCanvas.height;
                this.sharedCanvas = new Laya.Texture(Laya.Browser.window.sharedCanvas);
                this.sharedCanvas.bitmap.alwaysChange = true;
                //将内容绘制到屏幕上
                view.UI_Img_SharedCanvas.graphics.drawTexture(this.sharedCanvas, 0, 0, this.sharedCanvas.width, this.sharedCanvas.height);
            };
            return LeaderboardUICtrl;
        }(ui.BaseUICtrl));
        uicontrollers.LeaderboardUICtrl = LeaderboardUICtrl;
    })(uicontrollers = ui.uicontrollers || (ui.uicontrollers = {}));
})(ui || (ui = {}));
//# sourceMappingURL=LeaderboardUICtrl.js.map