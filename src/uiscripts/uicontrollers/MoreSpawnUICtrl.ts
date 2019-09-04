
/**
* Created By Code Generator
*/
module ui.uicontrollers {
    import Facade = puremvc.Facade;

    export class MoreSpawnUICtrl extends ui.BaseUICtrl {
        private data: MoreSpawnUIParam;
        private video: boolean;

        constructor(view: View) {
            super(view);
        }

        public GetView(): ui.MoreSpawnUI {
            return this.uiView as ui.MoreSpawnUI;
        }
        /**
         * @override
         */
        public Init(parent: Laya.Sprite, id: ui.UIID) {
            super.Init(parent, id);
            this.mediatorName = ui.UIID.MoreSpawnUIID.toString();

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
            this.data = context as MoreSpawnUIParam;
            if (this.data) {
                this.InitLayout();
            }
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
            this.GetView().UI_Btn_Normal.on(Laya.Event.CLICK, this, this.OnUI_Btn_NormalClick);
            this.GetView().UI_Btn_More.on(Laya.Event.CLICK, this, this.OnUI_Btn_MoreClick);

        }
        private RemoveEvent(): void {
            Facade.getInstance().removeMediator(this.getMediatorName());

            this.GetView().UI_Btn_Normal.off(Laya.Event.CLICK, this, this.OnUI_Btn_NormalClick);
            this.GetView().UI_Btn_More.off(Laya.Event.CLICK, this, this.OnUI_Btn_MoreClick);

        }
        private OnUI_Btn_NormalClick() {
            this.GetView().UI_Btn_Normal.mouseEnabled = false;

            //发送播放金币动画的消息
            this.sendNotification(NotificationNames.HomepageUI_PlaySpawnAnim, true);

            //获取本地的数据
            let base = StorageManager.GetSpawnMoneyNum();
            //发送领取信息
            HttpMessageSender.GetSender().SendGainMoneySpawn(GameDataManager.getInstance().LoginPlayerInfo.OpenID, this.data.spawnID, base, 1, null, () => {
                Facade.instance.sendNotification(NotificationNames.HomepageUI_PlaySpawnAnim, false);
            });

            //立刻关闭UI
            this.sendNotification(NotificationNames.HIDEUI, UIID.MoreSpawnUIID);
        }
        private OnUI_Btn_MoreClick() {
            //点击后决定是观看视频还是发送分享
            this.GetView().UI_Btn_More.mouseEnabled = false;

            if (this.video) {
                //看视频
                WechatUtil.getIntance().ShowVideoAd(cbhandler.gen_handler(() => {
                    // 播放前停止计时器
                    if (!GameDataManager.getInstance().MatchInfo.IsGameEnd()) {
                        this.sendNotification(NotificationNames.PAUSE_MATCH, true);
                        this.sendNotification(NotificationNames.BackgroundUI_BgMoveEnd);
                        // MatchSpineManager.Instance.PauseMatch(true);
                    }
                    //视频播放前停止播放音频
                    AudioManager.GetInstance().StopAllSound();
                    AudioManager.GetInstance().StopMusic();
                }, this), cbhandler.gen_handler((isEnded) => {
                    if (isEnded) {
                        //正常观看结束
                        this.HandleVideoSuccess();
                    } else {
                        //中断观看结束
                        //重新拉取视频，并刷新UI
                        WechatUtil.getIntance().LoadVideoAd(cbhandler.gen_handler(this.ReloadAdCallback, this), cbhandler.gen_handler(this.ReloadAdCallback, this));
                    }
                }, this));
            } else {
                //分享
                if (CommonUtil.OnMiniGame()) {
                    WechatUtil.getIntance().ShareWithPicAndTitle(ResPathConst.SHARE_PIC[0], "虫子来袭，消灭它们！", () => {
                        this.HandleShareSuccess();
                    });
                } else {
                    this.HandleShareSuccess();
                }
            }
            //立刻关闭UI
            this.sendNotification(NotificationNames.HIDEUI, UIID.MoreSpawnUIID);
        }

        /**
         * @override
         */
        listNotificationInterests(): string[] {
            return [
                NotificationNames.MoreSpawnUI_Hide,
            ];
        }

        /**
        * @override
        */
        handleNotification(note: puremvc.INotification): void {
            switch (note.getName()) {
                case NotificationNames.MoreSpawnUI_Hide: {
                    if (this.GetView().visible) {
                        this.sendNotification(NotificationNames.HIDEUI, UIID.MoreSpawnUIID);
                    }
                    break;
                }
            }
        }

        private InitLayout() {
            if (this.data) {
                let view = this.GetView();
                //根据数据，进行判断并刷新布局
                if (CommonUtil.OnMiniGame() && WechatUtil.getIntance().WxVideoAdReady) {
                    //视频准备好了，0.5的概率出视频，0.5的概率出分享
                    let random = Math.random();
                    this.video = random < 0.5 ? true : false;
                } else {
                    //视频没准备好，只出分享
                    this.video = false;
                }

                view.UI_Txt_Tip.text = this.video ? "观看视频广告可以五倍领取" : "分享给好友可以十倍领取";
                view.UI_Btn_More.label = this.video ? "五倍领取" : "十倍领取";

                view.UI_Btn_More.mouseEnabled = true;
                view.UI_Btn_Normal.mouseEnabled = true;

            }
        }

        private ReloadAdCallback() {
            let view = this.GetView();
            this.video = WechatUtil.getIntance().WxVideoAdReady;
            this.InitLayout();
            view.UI_Btn_More.mouseEnabled = true;
            view.UI_Btn_Normal.mouseEnabled = true;
        }

        private HandleVideoSuccess() {
            //视频播放后重新播放音频
            AudioManager.GetInstance().PlayMusicByID(EnumSoundID.sound_bg_bg_01);

            //发送播放金币动画的消息
            this.sendNotification(NotificationNames.HomepageUI_PlaySpawnAnim, true);

            //获取本地的数据
            let base = StorageManager.GetSpawnMoneyNum();
            //发送领取消息(5倍)
            HttpMessageSender.GetSender().SendGainMoneySpawn(GameDataManager.getInstance().LoginPlayerInfo.OpenID, this.data.spawnID, base, 5, null, () => {
                Facade.instance.sendNotification(NotificationNames.HomepageUI_PlaySpawnAnim, false);
            });
        }

        private HandleShareSuccess() {
            //发送播放金币动画的消息
            this.sendNotification(NotificationNames.HomepageUI_PlaySpawnAnim, true);
            //获取本地的数据
            let base = StorageManager.GetSpawnMoneyNum();
            //发送领取消息(10倍)
            HttpMessageSender.GetSender().SendGainMoneySpawn(GameDataManager.getInstance().LoginPlayerInfo.OpenID, this.data.spawnID, base, 10, null, () => {
                Facade.instance.sendNotification(NotificationNames.HomepageUI_PlaySpawnAnim, false);
            });
        }
    }
}