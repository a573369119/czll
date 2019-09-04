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
        var RebornUICtrl = (function (_super) {
            __extends(RebornUICtrl, _super);
            function RebornUICtrl(view) {
                return _super.call(this, view) || this;
            }
            RebornUICtrl.prototype.GetView = function () {
                return this.uiView;
            };
            /**
             * @override
             */
            RebornUICtrl.prototype.Init = function (parent, id) {
                var _this = this;
                _super.prototype.Init.call(this, parent, id);
                this.mediatorName = ui.UIID.RebornUIID.toString();
                //ui配置
                //this.uiConfig = new WindowConfigData();
                //this.uiConfig.uiOpenAnimType = UIAnim.PopOpen;
                //this.uiConfig.uiCloseAnimType = UIAnim.PopClose;
                //this.uiConfig.depth = 0;
                //添加舞台
                // parent.addChild(this.uiView)// 由于需要介于金币和最高层之间直接修改 -mb
                ui.UIMediator.GetInstance().uiParentMoneyAnim.addChild(this.uiView);
                this.uiView.zOrder = this.uiConfig.depth + 1000000000;
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
            RebornUICtrl.prototype.BeforeUIOpen = function (context) {
                if (context === void 0) { context = null; }
                _super.prototype.BeforeUIOpen.call(this, context);
            };
            /**
            * @override
            */
            //ui打开动画完成
            RebornUICtrl.prototype.OnUIOpened = function (context) {
                if (context === void 0) { context = null; }
                _super.prototype.OnUIOpened.call(this, context);
                var view = this.GetView();
                // this.useDiamToBorn();
                this.videoAdWatched = false;
                //2019-7-30 11:25:11 避免视频广告拉取失败
                if (CommonUtil.OnMiniGame() && !WechatUtil.getIntance().WxVideoAdReady) {
                    //如果打开的时候没有准备好视频广告，尝试手动拉取
                    view.UI_Btn_Reborn.visible = false;
                    WechatUtil.getIntance().LoadVideoAd();
                }
                else {
                    this.VideoReady();
                }
            };
            /**
             * @override
             */
            //ui关闭动画完成
            RebornUICtrl.prototype.OnUIHide = function () {
                _super.prototype.OnUIHide.call(this);
                //取消任务
                TimeManager.getInst().remove(this.timeLoopTask);
                TimeManager.getInst().remove(this.timeUpTask);
            };
            /**
             * @override
             */
            RebornUICtrl.prototype.BeforeUIDestroy = function () {
                _super.prototype.BeforeUIDestroy.call(this);
                this.RemoveEvent();
            };
            /**
             * @override
             */
            RebornUICtrl.prototype.OnUIDestroy = function () {
                _super.prototype.OnUIDestroy.call(this);
            };
            RebornUICtrl.prototype.RegisterEvent = function () {
                Facade.getInstance().registerMediator(this);
                this.GetView().UI_Btn_Reborn.on(Laya.Event.CLICK, this, this.OnUI_Btn_RebornClick);
            };
            RebornUICtrl.prototype.RemoveEvent = function () {
                Facade.getInstance().removeMediator(this.getMediatorName());
                this.GetView().UI_Btn_Reborn.off(Laya.Event.CLICK, this, this.OnUI_Btn_RebornClick);
            };
            RebornUICtrl.prototype.OnUI_Btn_RebornClick = function () {
                var view = this.GetView();
                // view.UI_Btn_Reborn.mouseEnabled = false;
                TimeManager.getInst().remove(this.timeLoopTask);
                TimeManager.getInst().remove(this.timeUpTask);
                //2019-6-10 17:35:24 新需求 分享复活
                if (CommonUtil.OnMiniGame()) {
                    // WechatUtil.getIntance().ShareWithPicAndTitle(ResPathConst.SHARE_PIC[0], "虫子来袭，消灭它们！", this.RebornSuccess.bind(this)
                    //     , this.RebornSuccess.bind(this),
                    //     //自己的OpenID，用于邀请别人
                    //     WechatConstDefine.LOGIN_QUERY_KEY + "=" + GameDataManager.getInstance().LoginPlayerInfo.OpenID
                    // );
                    //直接执行拉取成功的方法
                    // if (!this.isUserDiamBorn) {//微信端
                    this.VideoPlay();
                }
                else {
                    this.RebornSuccess();
                }
            };
            /**
             * @override
             */
            RebornUICtrl.prototype.listNotificationInterests = function () {
                return [
                    NotificationNames.WeChat_VideoAd_Load_Success,
                    NotificationNames.WeChat_VideoAd_Load_Fail,
                    NotificationNames.WeChat_VideoAd_OnClose,
                ];
            };
            /**
            * @override
            */
            RebornUICtrl.prototype.handleNotification = function (note) {
                var view = this.GetView();
                switch (note.getName()) {
                    case NotificationNames.WeChat_VideoAd_Load_Success: {
                        //视频拉取成功
                        if (!view.visible) {
                            break;
                        }
                        if (this.videoAdWatched) {
                            Log.Debug("RebornUI 视频已观看，不再重复处理");
                            break;
                        }
                        GameDataManager.getInstance().canLookAdv = true;
                        Log.Debug("RebornUI 视频拉取成功");
                        this.VideoReady();
                        break;
                    }
                    case NotificationNames.WeChat_VideoAd_Load_Fail: {
                        //视频拉取失败
                        if (!view.visible) {
                            break;
                        }
                        Log.Debug("RebornUI 视频拉取失败,可能是用户次数不够");
                        //打开结算界面
                        // this.TimeUpHandler();
                        GameDataManager.getInstance().canLookAdv = false;
                        // this.useDiamToBorn();
                        break;
                    }
                    case NotificationNames.WeChat_VideoAd_OnClose: {
                        //可能由其他地方引起视频加载，所以需要判断UI是否打开
                        if (!view.visible) {
                            break;
                        }
                        view.UI_Btn_Reborn.mouseEnabled = true;
                        //视频结束
                        var isEnd = note.getBody();
                        Log.Debug("RebornUI 视频观看完成，isEnd：", isEnd);
                        if (isEnd) {
                            //正常观看结束
                            this.videoAdWatched = true;
                            //视频播放后重新播放音频
                            AudioManager.GetInstance().PauseBG(false);
                            this.RebornSuccess();
                        }
                        else {
                            //中断观看结束
                            //中断观看按照不复活执行
                            this.TimeUpHandler();
                            //中断结束后需要手动重新拉取视频
                            WechatUtil.getIntance().LoadVideoAd();
                        }
                        break;
                    }
                }
            };
            //视频准备完毕
            RebornUICtrl.prototype.VideoReady = function () {
                var second = 3;
                var view = this.GetView();
                view.UI_Txt_Second.text = second.toString();
                view.UI_Btn_Reborn.visible = true;
                //倒计时3秒，之后打开结算界面
                this.timeLoopTask = TimeManager.getInst().loopTimes(1, 3, cbhandler.gen_handler(function () {
                    Log.Debug("timeLoopTask");
                    //秒数变化
                    second--;
                    view.UI_Txt_Second.text = second.toString();
                }, this), true);
                this.timeUpTask = TimeManager.getInst().once(3, cbhandler.gen_handler(this.TimeUpHandler, this), true);
            };
            //视频播放
            RebornUICtrl.prototype.VideoPlay = function () {
                var _this = this;
                var view = this.GetView();
                WechatUtil.getIntance().ShowVideoAd(cbhandler.gen_handler(function () {
                    //视频播放前停止播放音频
                    AudioManager.GetInstance().StopAllSound();
                    AudioManager.GetInstance().PauseBG(true);
                    // 播放前停止计时器
                    if (!GameDataManager.getInstance().MatchInfo.IsGameEnd()) {
                        _this.sendNotification(NotificationNames.PAUSE_MATCH, true);
                        _this.sendNotification(NotificationNames.BackgroundUI_BgMoveEnd);
                    }
                }, this));
            };
            RebornUICtrl.prototype.RebornSuccess = function () {
                Log.Debug("RebornUI reborn success");
                //复活数量-1
                var rebornNum = StorageManager.GetRebornNum();
                StorageManager.SetRebornNum(rebornNum - 1); //点了之后就减一
                // if (this.isUserDiamBorn) GameDataManager.getInstance().useDiamBornTime++;//如果是钻石复活就自加次数
                //关闭自身
                this.sendNotification(NotificationNames.HIDEUI, ui.UIID.RebornUIID);
                //复活方法
                this.sendNotification(NotificationNames.MAIN_PLAYER_REBORN, true);
            };
            RebornUICtrl.prototype.TimeUpHandler = function () {
                Log.Debug("timeUpTask");
                //打开结算界面
                this.sendNotification(NotificationNames.MAIN_PLAYER_REBORN, false);
            };
            return RebornUICtrl;
        }(ui.BaseUICtrl));
        uicontrollers.RebornUICtrl = RebornUICtrl;
    })(uicontrollers = ui.uicontrollers || (ui.uicontrollers = {}));
})(ui || (ui = {}));
//# sourceMappingURL=RebornUICtrl.js.map