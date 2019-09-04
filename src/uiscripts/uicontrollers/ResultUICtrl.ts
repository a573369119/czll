
/**
* Created By Code Generator
*/
module ui.uicontrollers {
    import Facade = puremvc.Facade;

    export class ResultUICtrl extends ui.BaseUICtrl {
        private gainLuckyReward: boolean = false;
        private completeType: EnumCompleteType = EnumCompleteType.None;
        private win: boolean = false;
        private gainPointResult: boolean = false;
        private arr_CoinAdd: Array<ui.PrefabUI.CoinAddUI>;

        private timeTaskList: Array<number>;

        private lucky: number;

        private videoAdWatched: boolean;

        constructor(view: View) {
            super(view);
        }

        public GetView(): ui.ResultUI {
            return this.uiView as ui.ResultUI;
        }
        /**
         * @override
         */
        public Init(parent: Laya.Sprite, id: ui.UIID) {
            super.Init(parent, id);
            this.mediatorName = ui.UIID.ResultUIID.toString();
            this.arr_CoinAdd = [];
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
            this.GetView().UI_HBox_Reward.zOrder = 100;
            //初始化
            this.completeType = EnumCompleteType.None
            this.timeTaskList = new Array<number>();
        }

        /**
         * @override
         */
        //ui动画执行前
        protected BeforeUIOpen(context: WindowContextDataBase = null) {
            super.BeforeUIOpen(context);
            //UI打开前，根据该场游戏决定显示内容
            this.gainPointResult = false;

            let data = context as ResultUIParam;
            this.InitLayout(data.win);

            //打开结算面板的时候直接关闭battleUI
            this.sendNotification(NotificationNames.HIDEUI, UIID.BattleUIID);
        }
        /**
        * @override
        */
        //ui打开动画完成
        protected OnUIOpened(context: WindowContextDataBase = null) {
            super.OnUIOpened(context);

            this.sendNotification(NotificationNames.OPENUI, UIID.MoneyInfoUIID);

            //Level
            let levelAnimParam = new LevelUIAnimParam();
            levelAnimParam.LevelAnimType = this.win ? EnumLevelUIAnimType.Result_Win : EnumLevelUIAnimType.Result_Lose;
            levelAnimParam.curLevel = GameDataManager.getInstance().LoginPlayerInfo.CurLevel;
            this.sendNotification(NotificationNames.LevelUI_PlayAnim, levelAnimParam)

            //重置翻倍倍率
            this.lucky = 1;
            let view = this.GetView();

            if (CommonUtil.OnMiniGame()) {
                WechatUtil.getIntance().ShowBannerAd();
            }

            AudioManager.GetInstance().StopMusic();
            this.GetView().box_AllUi.visible = true;

        }
        /**
         * @override
         */
        //ui关闭动画完成
        protected OnUIHide() {
            super.OnUIHide();

            //关闭 重置状态
            this.completeType = EnumCompleteType.None

            if (CommonUtil.OnMiniGame()) {
                WechatUtil.getIntance().HideBannerAd();
            }

            for (var i = 0; i < this.timeTaskList.length; i++) {
                var element = this.timeTaskList.pop();
                if (element != -1) {
                    TimeManager.getInst().remove(element);
                }
            }
            this.timeTaskList = new Array<number>();

            if (this.GetView().UI_Eft_DoubleCoinScale.isPlaying) {
                this.GetView().UI_Eft_DoubleCoinScale.stop();
            }

            //停止音效
            AudioManager.GetInstance().StopSoundByConfigID(EnumSoundID.sound_function_numberup);
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

            this.GetView().UI_Btn_Continue.on(Laya.Event.CLICK, this, this.OnUI_Btn_ContinueClick);
            this.GetView().UI_Btn_GameOver.on(Laya.Event.CLICK, this, this.OnUI_Btn_GameOverClick);
            this.GetView().UI_Btn_Lucky.on(Laya.Event.CLICK, this, this.OnUI_Btn_LuckyClick);
            this.GetView().UI_Btn_Replay.on(Laya.Event.CLICK, this, this.OnUI_Btn_ReplayClick);
            /**动画 */
            this.GetView().ani2.on(Laya.Event.COMPLETE, this, this.onAni);
            this.GetView().ani3.on(Laya.Event.COMPLETE, this, this.onAni);
            this.GetView().ani1.on(Laya.Event.COMPLETE, this, this.toGrowSelf);
            this.GetView().ani5.on(Laya.Event.COMPLETE, this, this.closeGrowSelf_, [false]);
            this.GetView().ani4.on(Laya.Event.COMPLETE, this, this.closeGrowSelf_, [true]);
            this.GetView().img_GrowUp.on(Laya.Event.CLICK, this, this.toShare);

            this.GetView().img_GrowUp_Bg.on(Laya.Event.CLICK, this, this.closeGrowSelf);

            this.GetView().UI_Btn_Setting.on(Laya.Event.CLICK, this, this.OnUI_Btn_SettingClick);
        }
        private RemoveEvent(): void {
            Facade.getInstance().removeMediator(this.getMediatorName());

            this.GetView().UI_Btn_Continue.off(Laya.Event.CLICK, this, this.OnUI_Btn_ContinueClick);
            this.GetView().UI_Btn_GameOver.off(Laya.Event.CLICK, this, this.OnUI_Btn_GameOverClick);
            this.GetView().UI_Btn_Lucky.off(Laya.Event.CLICK, this, this.OnUI_Btn_LuckyClick);
            this.GetView().UI_Btn_Replay.off(Laya.Event.CLICK, this, this.OnUI_Btn_ReplayClick);
            /**动画 */
            this.GetView().ani2.off(Laya.Event.COMPLETE, this, this.onAni);
            this.GetView().ani3.off(Laya.Event.COMPLETE, this, this.onAni);
            this.GetView().ani1.off(Laya.Event.COMPLETE, this, this.toGrowSelf);
            this.GetView().img_GrowUp_Bg.off(Laya.Event.COMPLETE, this, this.closeGrowSelf);
            this.GetView().ani5.off(Laya.Event.COMPLETE, this, this.closeGrowSelf_);
            this.GetView().ani4.off(Laya.Event.COMPLETE, this, this.closeGrowSelf_, );
            this.GetView().img_GrowUp.on(Laya.Event.CLICK, this, this.toShare);





            this.GetView().UI_Btn_Setting.off(Laya.Event.CLICK, this, this.OnUI_Btn_SettingClick);
        }

        //继续
        private OnUI_Btn_ContinueClick() {
            //动画类型
            this.completeType = EnumCompleteType.Continue;
            //防止多次点击
            let view = this.GetView();
            view.UI_Btn_Continue.mouseEnabled = false;
            view.UI_Btn_GameOver.mouseEnabled = false;
            view.UI_Btn_Lucky.mouseEnabled = false;
            view.UI_Btn_Replay.mouseEnabled = false;
            //挑战下一关
            let nextLevelID = GameDataManager.getInstance().LevelInfo.CurLevelID + 1;
            if (ConfigManager.GetInstance().GetLevelConfig(nextLevelID)) {
                HttpMessageSender.GetSender().SendMatchComplete(GameDataManager.getInstance().GetLoginPlayerID(),
                    GameDataManager.getInstance().LevelInfo.CurLevelID,
                    GameDataManager.getInstance().MatchInfo.GoldNum * this.lucky,//2019-6-26 16:13:46 继续比赛也领取奖励
                    null,
                    () => {
                        //网络连接失败，领取奖励继续比赛
                        GameDataManager.getInstance().LoginPlayerInfo.MoneyInfo.goldNum += GameDataManager.getInstance().MatchInfo.GoldNum * this.lucky;
                        this.sendNotification(NotificationNames.CONTINUE_NEXT_MATCH, nextLevelID);
                    }
                )

            } else {
                Log.Warn("完成最后一关,没有下一关")
            }
            //播放音效
            AudioManager.GetInstance().PlaySoundByConfigID(EnumSoundID.sound_function_touch_01);//按键音效
            Facade.instance.sendNotification(NotificationNames.BackgroundUI_ChangeBackground);
        }
        //游戏结束（普通）
        private OnUI_Btn_GameOverClick() {
            GameDataManager.getInstance().useDiamBornTime = 0;
            //动画类型
            this.completeType = EnumCompleteType.Finish;
            //防止多次点击
            let view = this.GetView();
            view.UI_Btn_Continue.mouseEnabled = false;
            view.UI_Btn_GameOver.mouseEnabled = false;
            view.UI_Btn_Lucky.mouseEnabled = false;
            view.UI_Btn_Replay.mouseEnabled = false;
            //获取奖励
            HttpMessageSender.GetSender().SendMatchComplete(GameDataManager.getInstance().GetLoginPlayerID(),
                this.win ? GameDataManager.getInstance().LevelInfo.CurLevelID : -1,
                GameDataManager.getInstance().MatchInfo.GoldNum * this.lucky,
                null,
                () => {
                    //网络连接失败 领奖励退出比赛
                    if (this.win) GameDataManager.getInstance().LoginPlayerInfo.CurLevel = GameDataManager.getInstance().LevelInfo.NextLevelID;
                    GameDataManager.getInstance().LoginPlayerInfo.MoneyInfo.goldNum += GameDataManager.getInstance().MatchInfo.GoldNum;
                    this.sendNotification(NotificationNames.MATCH_EXIT_COMMAND);
                    this.closeGrowSelf_(false);
                }
            )
            //播放音效
            AudioManager.GetInstance().PlaySoundByConfigID(EnumSoundID.sound_function_touch_01);//播放按键音
        }
        //翻倍奖励
        private OnUI_Btn_LuckyClick() {
            //动画类型
            this.completeType = EnumCompleteType.Lucky;
            //防止多次点击
            let view = this.GetView();
            // view.UI_Btn_Continue.mouseEnabled = false;
            // view.UI_Btn_GameOver.mouseEnabled = false;
            // view.UI_Btn_Replay.mouseEnabled = false;
            view.UI_Btn_Lucky.mouseEnabled = false;
            //2019-6-10 15:07:45 减少奖励次数
            let luckyNum = StorageManager.GetResultLuckyNum();
            StorageManager.SetResultLuckyNum(luckyNum - 1);
            //发送邀请
            if (CommonUtil.OnMiniGame()) {
                // WechatUtil.getIntance().ShareWithPicAndTitle(ResPathConst.SHARE_PIC[0], "虫子来袭，消灭它们！", this.InvitedSuccess.bind(this), null,
                //     //自己的OpenID，用于邀请别人
                //     WechatConstDefine.LOGIN_QUERY_KEY + "=" + GameDataManager.getInstance().LoginPlayerInfo.OpenID
                // );
                this.VideoReady();
            } else {
                //非微信环境，按照成功邀请结算
                this.VideoSuccess();
            }
            //播放音效
            AudioManager.GetInstance().PlaySoundByConfigID(EnumSoundID.sound_function_touch_01);
        }
        //重新
        private OnUI_Btn_ReplayClick() {
            //2019-6-26 18:12:26 重新开始需要加上体力校验，首先判断点击时体力够不够，如果不够先弹出面板
            if (GameDataManager.getInstance().LoginPlayerInfo.MoneyInfo.pointNum < 5) {
                //直接弹出兑换体力的面板
                this.sendNotification(NotificationNames.OPENUIWITHPARAM, new ExchangeUIParam(EnumDiamondExchangeType.Power));
            } else {
                //体力充足
                //2019-6-26 16:32:06 重新开始也要领奖
                this.completeType = EnumCompleteType.Replay;
                //防止多次点击
                let view = this.GetView();
                view.UI_Btn_Continue.mouseEnabled = false;
                view.UI_Btn_GameOver.mouseEnabled = false;
                view.UI_Btn_Lucky.mouseEnabled = false;
                view.UI_Btn_Replay.mouseEnabled = false;
                //获取奖励
                HttpMessageSender.GetSender().SendMatchComplete(GameDataManager.getInstance().GetLoginPlayerID(),
                    -1, //挑战失败
                    GameDataManager.getInstance().MatchInfo.GoldNum * this.lucky,
                    null,
                    () => {
                        //网络连接失败 领奖励重新比赛
                        GameDataManager.getInstance().LoginPlayerInfo.MoneyInfo.goldNum += GameDataManager.getInstance().MatchInfo.GoldNum * this.lucky;
                        //继续挑战当前关卡
                        this.sendNotification(NotificationNames.CONTINUE_NEXT_MATCH, GameDataManager.getInstance().LevelInfo.CurLevelID);
                    }
                )
            }
            //播放音效
            AudioManager.GetInstance().PlaySoundByConfigID(EnumSoundID.sound_function_touch_01);
        }

        private OnUI_Btn_SettingClick() {
            //发送暂停消息

            //然后再打开设置面板
            this.sendNotification(NotificationNames.OPENUI, UIID.SettingUIID);
        }

        /**
         * @override
         */
        listNotificationInterests(): string[] {
            return [
                NotificationNames.ResultUI_Finish,
                NotificationNames.ResultUI_GainPower,

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
                case NotificationNames.ResultUI_Finish: {
                    //关卡通关，播放内容
                    this.HandleComplete();
                    this.GetView().box_AllUi.visible = false;
                    break;
                }
                case NotificationNames.ResultUI_GainPower: {
                    //获取体力成功，显示动画
                    this.gainPointResult = true;
                    break;
                }
                case NotificationNames.WeChat_VideoAd_Load_Success: {
                    //视频拉取成功
                    //可能由其他地方引起视频加载，所以需要判断UI是否打开
                    if (!view.visible) {
                        break;
                    }
                    Log.Debug("ResultUI 视频拉取成功");
                    let luckyNum = StorageManager.GetResultLuckyNum();
                    this.VideoLoadSucceedHandle(luckyNum);
                    break;
                }
                case NotificationNames.WeChat_VideoAd_Load_Fail: {
                    //视频拉取失败
                    //可能由其他地方引起视频加载，所以需要判断UI是否打开
                    if (!view.visible) {
                        break;
                    }
                    Log.Debug("ResultUI 视频拉取失败");
                    this.VideoLoadFailedHandle();
                    GameDataManager.getInstance().canLookAdv = false;
                    break;
                }
                case NotificationNames.WeChat_VideoAd_OnClose: {
                    //视频结束
                    //可能由其他地方引起视频加载，所以需要判断UI是否打开
                    if (!view.visible) {
                        break;
                    }
                    let isEnd = note.getBody() as boolean;
                    Log.Debug("ResultUI 视频观看完成，isEnd：", isEnd);
                    if (isEnd) {
                        //正常观看结束
                        //视频播放后重新播放音频
                        this.VideoSuccess();
                    } else {
                        //中断观看结束
                        view.UI_Btn_Lucky.mouseEnabled = true;
                        //中断结束后需要手动重新拉取视频
                        WechatUtil.getIntance().LoadVideoAd();
                    }
                    break;
                }

            }
        }

        //根据胜负，初始化显示内容
        private InitLayout(win: boolean) {
            //保存结果
            this.win = win;
            //
            if (!this.win) GameDataManager.getInstance().useDiamBornTime = 0;
            let view = this.GetView();
            //图标
            view.UI_Img_Win.visible = this.win;
            view.UI_Img_Lose.visible = !this.win;
            if (this.win) view.ani2.play(0, false);//胜利
            else view.ani3.play(0, false);
            view.info.visible = false;
            view.buttonBox.visible = false;

            // view.ani1.play(0, false);//播放动画
            //按钮显示
            view.UI_Btn_Continue.visible = this.win;
            view.UI_Btn_Replay.visible = !this.win;
            //按钮启用
            view.UI_Btn_Continue.mouseEnabled = true;
            view.UI_Btn_GameOver.mouseEnabled = true;
            view.UI_Btn_Lucky.mouseEnabled = true;
            view.UI_Btn_Replay.mouseEnabled = true;
            //金币数量
            view.UI_Txt_Coin.text = GameDataUtil.NumberToString(GameDataManager.getInstance().MatchInfo.GoldNum);
            //2019-8-15 09:44:47 体力数量
            view.UI_Img_Power.visible = win;
            view.UI_Txt_Power.text = "5";
            //刷新HBox布局
            this.SetHBoxWidth();
            //概率十倍
            //2019-6-10 14:27:18 新需求 统一改为每天前10次固定分享十倍，之后不再显示
            let luckyNum = StorageManager.GetResultLuckyNum();

            //广告相关
            this.videoAdWatched = false;
            //2019-7-30 11:25:11 避免视频广告拉取失败
            if (CommonUtil.OnMiniGame() && !WechatUtil.getIntance().WxVideoAdReady) {
                //如果打开的时候没有准备好视频广告，尝试手动拉取
                WechatUtil.getIntance().LoadVideoAd();
            } else {
                //有准备好的视频，或者非微信平台
                //2019-6-25 14:40:21 新需求 分享总开关
                view.UI_Btn_Lucky.disabled = !(luckyNum > 0 && GameDataManager.getInstance().LuckyEnable);
            }

            //动画类型
            this.completeType = -1;
            //根据胜负，发送获取体力的消息
            if (this.win) {
                HttpMessageSender.GetSender().SendGainPointByMatch(GameDataManager.getInstance().LoginPlayerInfo.OpenID, GameDataManager.getInstance().LoginPlayerInfo.CurLevel);

                //如果是微信端则通知保存到云数据
                if (CommonUtil.OnMiniGame()) {
                    WechatUtil.wxSetUserCloudStorage([{
                        key: OpenDataContextKeyDefine.CURRENT_COMPLETE_LEVEL,
                        value: GameDataManager.getInstance().LoginPlayerInfo.CurLevel.toString()
                    }, {
                        key: OpenDataContextKeyDefine.PLAYER_OPENID,
                        value: GameDataManager.getInstance().LoginPlayerInfo.OpenID.toString()
                    }], Handler.create(this, (res) => {
                        //成功回调
                        Log.Debug("更新最高分成功", GameDataManager.getInstance().LoginPlayerInfo.CurLevel);
                    }), Handler.create(this, (res) => {
                        //失败回调
                        Log.Debug("更新最高分失败," + res);
                        // this.SetHighScore({value:OpenDataContextManager.highScore});
                    }));
                }
            }

        }

        //处理结算
        private HandleComplete() {
            let view = this.GetView();
            switch (this.completeType) {
                case EnumCompleteType.Continue: {
                    if (GameDataManager.getInstance().MatchInfo.GoldNum > 0) {
                        //领取奖励
                        this.PlayCoinAnim(10);

                        //延时继续
                        let timeTask = TimeManager.getInst().once(0.8, cbhandler.gen_handler(() => {
                            //通知服务器更新体力
                            HttpMessageSender.GetSender().SendMatchStart(GameDataManager.getInstance().LoginPlayerInfo.OpenID);
                        }, this))
                        this.timeTaskList.push();
                    } else {
                        //通知服务器更新体力
                        HttpMessageSender.GetSender().SendMatchStart(GameDataManager.getInstance().LoginPlayerInfo.OpenID);
                    }
                    break;
                }
                case EnumCompleteType.Finish: {
                    if (GameDataManager.getInstance().MatchInfo.GoldNum > 0) {
                        //领取奖励
                        this.PlayCoinAnim(10);

                        //延时退出
                        let timeTask = TimeManager.getInst().once(0.8, cbhandler.gen_handler(() => {
                            this.sendNotification(NotificationNames.MATCH_EXIT_COMMAND);
                        }, this))
                        this.timeTaskList.push(timeTask);
                    } else {
                        //立即退出
                        this.sendNotification(NotificationNames.MATCH_EXIT_COMMAND);
                    }

                    break;
                }
                case EnumCompleteType.Lucky: {
                    if (GameDataManager.getInstance().MatchInfo.GoldNum > 0) {
                        //十倍奖励
                        this.PlayCoinAnim(20);
                        //延时退出
                        let timeTask = TimeManager.getInst().once(0.8, cbhandler.gen_handler(() => {
                            this.sendNotification(NotificationNames.MATCH_EXIT_COMMAND);
                        }, this))
                        this.timeTaskList.push(timeTask);
                    } else {
                        //立即退出
                        this.sendNotification(NotificationNames.MATCH_EXIT_COMMAND);
                    }

                    break;
                }
                case EnumCompleteType.Replay: {
                    if (GameDataManager.getInstance().MatchInfo.GoldNum > 0) {
                        //领取奖励
                        this.PlayCoinAnim(10);

                        //延时继续
                        let timeTask = TimeManager.getInst().once(0.8, cbhandler.gen_handler(() => {
                            //2019-6-26 17:54:48 重新挑战也需要扣除体力
                            //通知服务器更新体力
                            HttpMessageSender.GetSender().SendMatchStart(GameDataManager.getInstance().LoginPlayerInfo.OpenID);
                            // //继续挑战当前关卡
                            // this.sendNotification(NotificationNames.CONTINUE_NEXT_MATCH, GameDataManager.getInstance().LevelInfo.CurLevelID);
                        }, this))
                        this.timeTaskList.push(timeTask);

                    } else {
                        //2019-6-26 17:54:48 重新挑战也需要扣除体力
                        //通知服务器更新体力
                        HttpMessageSender.GetSender().SendMatchStart(GameDataManager.getInstance().LoginPlayerInfo.OpenID);
                        // //继续挑战当前关卡
                        // this.sendNotification(NotificationNames.CONTINUE_NEXT_MATCH, GameDataManager.getInstance().LevelInfo.CurLevelID);
                    }
                    break;
                }

            }

            //2019-8-15 12:28:25 播放体力动画留到处理结算的时候
            if (this.win) this.PlayPointAnim();
            this.closeGrowSelf_(false);       //重制false   
        }

        private PlayPointAnim() {
            let view = this.GetView();
            let worldPos = CommonUtil2D.GetGlobalPosition(view.UI_Img_Power);
            MoneyAnimManager.Instance.PlayMoneyAnim_Pos_Curve(EnumMoneyAnimType.Power, 5, new Vec2(worldPos.x + 30, worldPos.y + 30), new Vec2(ConstDefine.MoneyImgPos_Power.x, ConstDefine.MoneyImgPos_Power.y), 500);
        }

        private PlayCoinAnim(num: number) {
            let view = this.GetView();
            let worldPos = CommonUtil2D.GetGlobalPosition(view.UI_Img_Coin);
            MoneyAnimManager.Instance.PlayMoneyAnim_Pos_Curve(EnumMoneyAnimType.Coin, num, new Vec2(worldPos.x + 30, worldPos.y + 30), new Vec2(ConstDefine.MoneyImgPos_Coin.x, ConstDefine.MoneyImgPos_Coin.y), 500);

        }

        //成功
        private VideoSuccess() {
            //设置倍率
            this.lucky = 3;
            for (let i = 0; i < this.lucky - 1; i++) {
                let add = this.arr_CoinAdd[i];
                if (!add) {
                    add = new ui.PrefabUI.CoinAddUI();
                    this.GetView().addChild(add);
                    this.arr_CoinAdd.push(add);
                    add.zOrder = 1;
                }
                add.scale(0.1, 0.1);
                add.alpha = 0.1;
                add.pos(543, 901);//位置
                add.visible = true;//可视化
                add.lab_money.text = GameDataUtil.NumberToString(GameDataManager.getInstance().MatchInfo.GoldNum);
            }
            //播放音效
            AudioManager.GetInstance().PlaySoundByConfigID(EnumSoundID.sound_function_numberup);

            //金币上浮动画
            for (let i = 0; i < this.arr_CoinAdd.length; i++) {
                Laya.timer.once(i * 500, this, function () {
                    Laya.Tween.to(this.arr_CoinAdd[i], { "scaleX": 1, "scaleY": 1, "alpha": 1, "x": this.GetView().UI_HBox_Reward.x + this.GetView().UI_Img_Coin.width / 2, "y": this.GetView().UI_HBox_Reward.y + 500 + this.GetView().UI_HBox_Reward.height / 2 }, 700, null, Laya.Handler.create(this, function () {
                        this.arr_CoinAdd[i].alpha = 0;
                    }));
                });
            }
            //播放动画
            let view = this.GetView();
            view.UI_Eft_DoubleCoinScale.play(0, true);
            let txtLucky = 1;
            let delta = (this.lucky - txtLucky) / 100;
            let timeTask1 = TimeManager.getInst().loopTimes(0.008, 100, cbhandler.gen_handler(() => {
                //每0.02秒循环1次，循环100次，共2秒
                txtLucky += delta;
                view.UI_Txt_Coin.text = GameDataUtil.NumberToString(GameDataManager.getInstance().MatchInfo.GoldNum * txtLucky);


                if (txtLucky >= this.lucky - 0.01) {//关停动画
                    view.UI_Eft_DoubleCoinScale.stop();
                    //停止音效
                    AudioManager.GetInstance().StopSoundByConfigID(EnumSoundID.sound_function_numberup);
                }
            }, this));

            let timeTask2 = TimeManager.getInst().once(3, cbhandler.gen_handler(() => {
            }, this));

            this.timeTaskList.push(timeTask1, timeTask2);

            //隐藏按钮
            view.UI_Btn_Lucky.disabled = true;

            this.videoAdWatched = true;
        }


        //视频准备完毕
        private VideoReady() {
            let view = this.GetView();
            WechatUtil.getIntance().ShowVideoAd(cbhandler.gen_handler(() => {
                //视频播放前

                // 播放前停止计时器
                if (!GameDataManager.getInstance().MatchInfo.IsGameEnd()) {
                    this.sendNotification(NotificationNames.PAUSE_MATCH, true);
                    this.sendNotification(NotificationNames.BackgroundUI_BgMoveEnd);
                    // MatchSpineManager.Instance.PauseMatch(true);
                }
            }, this));
        }

        private VideoLoadFailedHandle() {
            let view = this.GetView();
            //拉取视频失败
            //2019-6-25 14:40:21 新需求 分享总开关
            view.UI_Btn_Lucky.disabled = true;
        }

        private VideoLoadSucceedHandle(luckyNum: number) {
            let view = this.GetView();
            //拉取视频成功
            //2019-6-25 14:40:21 新需求 分享总开关
            if (this.videoAdWatched) {
                view.UI_Btn_Lucky.disabled = true;
            } else {
                view.UI_Btn_Lucky.disabled = !(luckyNum > 0 && GameDataManager.getInstance().LuckyEnable);
            }
        }


        private SetHBoxWidth() {
            let view = this.GetView();
            let rewardNum = 0;
            if (view.UI_Img_Coin.visible) rewardNum++;
            if (view.UI_Img_Power.visible) rewardNum++;
            if (view.UI_Img_Diamond.visible) rewardNum++;
            view.UI_HBox_Reward.width = rewardNum * 224 + 100 * (rewardNum - 1);
            view.UI_HBox_Reward.x = (view.info.width - view.UI_HBox_Reward.width) / 2;
        }

        /**
         * 动画完成
         */
        private onAni() {
            this.GetView().buttonBox.visible = true;
            this.GetView().info.visible = true;
            this.GetView().ani1.play(0, false);
        }

        /**
         * 显示  提升战力窗口
         */
        private toGrowSelf() {
            //0未邀请
            if (!this.win && GameDataManager.getInstance().LoginPlayerInfo.VerifyInfo.state == 0 && GameDataManager.getInstance().InviteType != 0) {
                Laya.timer.once(300, this, function () {
                    this.GetView().ani4.play(0, false);
                    this.GetView().img_GrowUp_Bg.visible = true;
                    this.GetView().img_GrowUp.visible = true;
                });
            }
        }

        /**
         *  关闭 提升战力窗口
         */
        private closeGrowSelf() {
            this.GetView().ani5.play(0, false);
        }

        private closeGrowSelf_(isTrue) {
            if (isTrue) {
                this.GetView().img_GrowUp_Bg.visible = true;
                this.GetView().img_GrowUp.visible = true;
            } else {
                this.GetView().img_GrowUp_Bg.visible = false;
                this.GetView().img_GrowUp.visible = false;

            }
        }

        /**
         * 用户分享窗口分享 
         */
        private toShare(): void {
            this.closeGrowSelf();
            //新功能（有转盘的UI
            this.sendNotification(NotificationNames.OPENUI, UIID.VerifyUIID);
            //播放音效
            AudioManager.GetInstance().PlaySoundByConfigID(EnumSoundID.sound_function_touch_01);
        }
    }
}