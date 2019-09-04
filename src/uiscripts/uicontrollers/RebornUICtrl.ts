
/**
* Created By Code Generator
*/
module ui.uicontrollers {
    import Facade = puremvc.Facade;

    export class RebornUICtrl extends ui.BaseUICtrl {
        private timeLoopTask: number;
        private timeUpTask: number;
        // private isUserDiamBorn: boolean = false;

        private videoAdWatched: boolean;

        constructor(view: View) {
            super(view);
        }

        public GetView(): ui.RebornUI {
            return this.uiView as ui.RebornUI;
        }
        /**
         * @override
         */
        public Init(parent: Laya.Sprite, id: ui.UIID) {
            super.Init(parent, id);
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

            let view = this.GetView();


            // this.useDiamToBorn();
            this.videoAdWatched = false;
            //2019-7-30 11:25:11 避免视频广告拉取失败
            if (CommonUtil.OnMiniGame() && !WechatUtil.getIntance().WxVideoAdReady) {
                //如果打开的时候没有准备好视频广告，尝试手动拉取
                view.UI_Btn_Reborn.visible = false;
                WechatUtil.getIntance().LoadVideoAd();
            } else {
                this.VideoReady();
            }

        }
        /**
         * @override
         */
        //ui关闭动画完成
        protected OnUIHide() {
            super.OnUIHide();

            //取消任务
            TimeManager.getInst().remove(this.timeLoopTask);
            TimeManager.getInst().remove(this.timeUpTask);
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
            this.GetView().UI_Btn_Reborn.on(Laya.Event.CLICK, this, this.OnUI_Btn_RebornClick);

        }
        private RemoveEvent(): void {
            Facade.getInstance().removeMediator(this.getMediatorName());

            this.GetView().UI_Btn_Reborn.off(Laya.Event.CLICK, this, this.OnUI_Btn_RebornClick);

        }
        private OnUI_Btn_RebornClick() {
            let view = this.GetView();
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
                // } else {
                //发送钻石扣除 - 复活不需要消耗体力
                //TO DO
                // this.RebornSuccess();
                // }
            } else {
                this.RebornSuccess();
            }

        }

        /**
         * @override
         */
        listNotificationInterests(): string[] {
            return [
                NotificationNames.WeChat_VideoAd_Load_Success,
                NotificationNames.WeChat_VideoAd_Load_Fail,
                NotificationNames.WeChat_VideoAd_OnClose,
            ];
        }

        /**
        * @override
        */
        handleNotification(note: puremvc.INotification): void {
            let view = this.GetView();
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
                    let isEnd = note.getBody() as boolean;
                    Log.Debug("RebornUI 视频观看完成，isEnd：", isEnd);
                    if (isEnd) {
                        //正常观看结束
                        this.videoAdWatched = true;
                        //视频播放后重新播放音频
                        AudioManager.GetInstance().PauseBG(false);
                        this.RebornSuccess();
                    } else {
                        //中断观看结束
                        //中断观看按照不复活执行
                        this.TimeUpHandler();
                        //中断结束后需要手动重新拉取视频
                        WechatUtil.getIntance().LoadVideoAd();
                    }
                    break;
                }
            }
        }

        //视频准备完毕
        private VideoReady() {
            let second = 3;
            let view = this.GetView();
            view.UI_Txt_Second.text = second.toString();
            view.UI_Btn_Reborn.visible = true;
            //倒计时3秒，之后打开结算界面
            this.timeLoopTask = TimeManager.getInst().loopTimes(1, 3, cbhandler.gen_handler(() => {
                Log.Debug("timeLoopTask")
                //秒数变化
                second--;
                view.UI_Txt_Second.text = second.toString();
            }, this), true)
            this.timeUpTask = TimeManager.getInst().once(3, cbhandler.gen_handler(this.TimeUpHandler, this), true);
        }

        //视频播放
        private VideoPlay() {
            let view = this.GetView();
            WechatUtil.getIntance().ShowVideoAd(cbhandler.gen_handler(() => {
                //视频播放前停止播放音频
                AudioManager.GetInstance().StopAllSound();
                AudioManager.GetInstance().PauseBG(true);
                // 播放前停止计时器
                if (!GameDataManager.getInstance().MatchInfo.IsGameEnd()) {
                    this.sendNotification(NotificationNames.PAUSE_MATCH, true);
                    this.sendNotification(NotificationNames.BackgroundUI_BgMoveEnd);
                    // MatchSpineManager.Instance.PauseMatch(true);
                }
            }, this));
        }


        private RebornSuccess() {
            Log.Debug("RebornUI reborn success")
            //复活数量-1
            let rebornNum = StorageManager.GetRebornNum();
            StorageManager.SetRebornNum(rebornNum - 1);//点了之后就减一
            // if (this.isUserDiamBorn) GameDataManager.getInstance().useDiamBornTime++;//如果是钻石复活就自加次数
            //关闭自身
            this.sendNotification(NotificationNames.HIDEUI, UIID.RebornUIID);
            //复活方法
            this.sendNotification(NotificationNames.MAIN_PLAYER_REBORN, true)
        }

        private TimeUpHandler() {
            Log.Debug("timeUpTask")
            //打开结算界面
            this.sendNotification(NotificationNames.MAIN_PLAYER_REBORN, false)

        }

        // /**
        //  * 使用钻石复活
        //  */
        // private useDiamToBorn() {
        //     //
        //     if (!WechatUtil.getIntance().WxVideoAdReady) {
        //         //如果打开的时候没有准备好视频广告，尝试手动拉取
        //         let needDia = ConfigManager.GetInstance().GetOtherConfig(1).Value.split(",")[GameDataManager.getInstance().useDiamBornTime];
        //         this.GetView().lab_needDia.visible = true;
        //         this.GetView().lab_needDia.text = "-" + needDia;

        //         if (parseInt(needDia) <= GameDataManager.getInstance().LoginPlayerInfo.MoneyInfo.diamondNum && !GameDataManager.getInstance().canLookAdv) {//给如果不可以看视频 、并且钻石足够
        //             this.isUserDiamBorn = true;
        //         } else {//可以看视频
        //             this.GetView().lab_needDia.visible = true;
        //         }
        //         //修改样式
        //     }
        // }

    }
}