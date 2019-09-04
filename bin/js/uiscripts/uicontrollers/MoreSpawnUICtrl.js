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
        var MoreSpawnUICtrl = (function (_super) {
            __extends(MoreSpawnUICtrl, _super);
            function MoreSpawnUICtrl(view) {
                return _super.call(this, view) || this;
            }
            MoreSpawnUICtrl.prototype.GetView = function () {
                return this.uiView;
            };
            /**
             * @override
             */
            MoreSpawnUICtrl.prototype.Init = function (parent, id) {
                var _this = this;
                _super.prototype.Init.call(this, parent, id);
                this.mediatorName = ui.UIID.MoreSpawnUIID.toString();
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
            };
            /**
             * @override
             */
            //ui动画执行前
            MoreSpawnUICtrl.prototype.BeforeUIOpen = function (context) {
                if (context === void 0) { context = null; }
                _super.prototype.BeforeUIOpen.call(this, context);
                this.data = context;
                if (this.data) {
                    this.InitLayout();
                }
            };
            /**
            * @override
            */
            //ui打开动画完成
            MoreSpawnUICtrl.prototype.OnUIOpened = function (context) {
                if (context === void 0) { context = null; }
                _super.prototype.OnUIOpened.call(this, context);
            };
            /**
             * @override
             */
            //ui关闭动画完成
            MoreSpawnUICtrl.prototype.OnUIHide = function () {
                _super.prototype.OnUIHide.call(this);
            };
            /**
             * @override
             */
            MoreSpawnUICtrl.prototype.BeforeUIDestroy = function () {
                _super.prototype.BeforeUIDestroy.call(this);
                this.RemoveEvent();
            };
            /**
             * @override
             */
            MoreSpawnUICtrl.prototype.OnUIDestroy = function () {
                _super.prototype.OnUIDestroy.call(this);
            };
            MoreSpawnUICtrl.prototype.RegisterEvent = function () {
                Facade.getInstance().registerMediator(this);
                this.GetView().UI_Btn_Normal.on(Laya.Event.CLICK, this, this.OnUI_Btn_NormalClick);
                this.GetView().UI_Btn_More.on(Laya.Event.CLICK, this, this.OnUI_Btn_MoreClick);
            };
            MoreSpawnUICtrl.prototype.RemoveEvent = function () {
                Facade.getInstance().removeMediator(this.getMediatorName());
                this.GetView().UI_Btn_Normal.off(Laya.Event.CLICK, this, this.OnUI_Btn_NormalClick);
                this.GetView().UI_Btn_More.off(Laya.Event.CLICK, this, this.OnUI_Btn_MoreClick);
            };
            MoreSpawnUICtrl.prototype.OnUI_Btn_NormalClick = function () {
                this.GetView().UI_Btn_Normal.mouseEnabled = false;
                //发送播放金币动画的消息
                this.sendNotification(NotificationNames.HomepageUI_PlaySpawnAnim, true);
                //获取本地的数据
                var base = StorageManager.GetSpawnMoneyNum();
                //发送领取信息
                HttpMessageSender.GetSender().SendGainMoneySpawn(GameDataManager.getInstance().LoginPlayerInfo.OpenID, this.data.spawnID, base, 1, null, function () {
                    Facade.instance.sendNotification(NotificationNames.HomepageUI_PlaySpawnAnim, false);
                });
                //立刻关闭UI
                this.sendNotification(NotificationNames.HIDEUI, ui.UIID.MoreSpawnUIID);
            };
            MoreSpawnUICtrl.prototype.OnUI_Btn_MoreClick = function () {
                var _this = this;
                //点击后决定是观看视频还是发送分享
                this.GetView().UI_Btn_More.mouseEnabled = false;
                if (this.video) {
                    //看视频
                    WechatUtil.getIntance().ShowVideoAd(cbhandler.gen_handler(function () {
                        // 播放前停止计时器
                        if (!GameDataManager.getInstance().MatchInfo.IsGameEnd()) {
                            _this.sendNotification(NotificationNames.PAUSE_MATCH, true);
                            _this.sendNotification(NotificationNames.BackgroundUI_BgMoveEnd);
                        }
                        //视频播放前停止播放音频
                        AudioManager.GetInstance().StopAllSound();
                        AudioManager.GetInstance().StopMusic();
                    }, this), cbhandler.gen_handler(function (isEnded) {
                        if (isEnded) {
                            //正常观看结束
                            _this.HandleVideoSuccess();
                        }
                        else {
                            //中断观看结束
                            //重新拉取视频，并刷新UI
                            WechatUtil.getIntance().LoadVideoAd(cbhandler.gen_handler(_this.ReloadAdCallback, _this), cbhandler.gen_handler(_this.ReloadAdCallback, _this));
                        }
                    }, this));
                }
                else {
                    //分享
                    if (CommonUtil.OnMiniGame()) {
                        WechatUtil.getIntance().ShareWithPicAndTitle(ResPathConst.SHARE_PIC[0], "虫子来袭，消灭它们！", function () {
                            _this.HandleShareSuccess();
                        });
                    }
                    else {
                        this.HandleShareSuccess();
                    }
                }
                //立刻关闭UI
                this.sendNotification(NotificationNames.HIDEUI, ui.UIID.MoreSpawnUIID);
            };
            /**
             * @override
             */
            MoreSpawnUICtrl.prototype.listNotificationInterests = function () {
                return [
                    NotificationNames.MoreSpawnUI_Hide,
                ];
            };
            /**
            * @override
            */
            MoreSpawnUICtrl.prototype.handleNotification = function (note) {
                switch (note.getName()) {
                    case NotificationNames.MoreSpawnUI_Hide: {
                        if (this.GetView().visible) {
                            this.sendNotification(NotificationNames.HIDEUI, ui.UIID.MoreSpawnUIID);
                        }
                        break;
                    }
                }
            };
            MoreSpawnUICtrl.prototype.InitLayout = function () {
                if (this.data) {
                    var view = this.GetView();
                    //根据数据，进行判断并刷新布局
                    if (CommonUtil.OnMiniGame() && WechatUtil.getIntance().WxVideoAdReady) {
                        //视频准备好了，0.5的概率出视频，0.5的概率出分享
                        var random = Math.random();
                        this.video = random < 0.5 ? true : false;
                    }
                    else {
                        //视频没准备好，只出分享
                        this.video = false;
                    }
                    view.UI_Txt_Tip.text = this.video ? "观看视频广告可以五倍领取" : "分享给好友可以十倍领取";
                    view.UI_Btn_More.label = this.video ? "五倍领取" : "十倍领取";
                    view.UI_Btn_More.mouseEnabled = true;
                    view.UI_Btn_Normal.mouseEnabled = true;
                }
            };
            MoreSpawnUICtrl.prototype.ReloadAdCallback = function () {
                var view = this.GetView();
                this.video = WechatUtil.getIntance().WxVideoAdReady;
                this.InitLayout();
                view.UI_Btn_More.mouseEnabled = true;
                view.UI_Btn_Normal.mouseEnabled = true;
            };
            MoreSpawnUICtrl.prototype.HandleVideoSuccess = function () {
                //视频播放后重新播放音频
                AudioManager.GetInstance().PlayMusicByID(EnumSoundID.sound_bg_bg_01);
                //发送播放金币动画的消息
                this.sendNotification(NotificationNames.HomepageUI_PlaySpawnAnim, true);
                //获取本地的数据
                var base = StorageManager.GetSpawnMoneyNum();
                //发送领取消息(5倍)
                HttpMessageSender.GetSender().SendGainMoneySpawn(GameDataManager.getInstance().LoginPlayerInfo.OpenID, this.data.spawnID, base, 5, null, function () {
                    Facade.instance.sendNotification(NotificationNames.HomepageUI_PlaySpawnAnim, false);
                });
            };
            MoreSpawnUICtrl.prototype.HandleShareSuccess = function () {
                //发送播放金币动画的消息
                this.sendNotification(NotificationNames.HomepageUI_PlaySpawnAnim, true);
                //获取本地的数据
                var base = StorageManager.GetSpawnMoneyNum();
                //发送领取消息(10倍)
                HttpMessageSender.GetSender().SendGainMoneySpawn(GameDataManager.getInstance().LoginPlayerInfo.OpenID, this.data.spawnID, base, 10, null, function () {
                    Facade.instance.sendNotification(NotificationNames.HomepageUI_PlaySpawnAnim, false);
                });
            };
            return MoreSpawnUICtrl;
        }(ui.BaseUICtrl));
        uicontrollers.MoreSpawnUICtrl = MoreSpawnUICtrl;
    })(uicontrollers = ui.uicontrollers || (ui.uicontrollers = {}));
})(ui || (ui = {}));
//# sourceMappingURL=MoreSpawnUICtrl.js.map