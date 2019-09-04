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
        var ResultUICtrl = (function (_super) {
            __extends(ResultUICtrl, _super);
            function ResultUICtrl(view) {
                var _this = _super.call(this, view) || this;
                _this.gainLuckyReward = false;
                _this.completeType = EnumCompleteType.None;
                _this.win = false;
                _this.gainPointResult = false;
                return _this;
            }
            ResultUICtrl.prototype.GetView = function () {
                return this.uiView;
            };
            /**
             * @override
             */
            ResultUICtrl.prototype.Init = function (parent, id) {
                var _this = this;
                _super.prototype.Init.call(this, parent, id);
                this.mediatorName = ui.UIID.ResultUIID.toString();
                this.arr_CoinAdd = [];
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
                this.GetView().UI_HBox_Reward.zOrder = 100;
                //初始化
                this.completeType = EnumCompleteType.None;
                this.timeTaskList = new Array();
            };
            /**
             * @override
             */
            //ui动画执行前
            ResultUICtrl.prototype.BeforeUIOpen = function (context) {
                if (context === void 0) { context = null; }
                _super.prototype.BeforeUIOpen.call(this, context);
                //UI打开前，根据该场游戏决定显示内容
                this.gainPointResult = false;
                var data = context;
                this.InitLayout(data.win);
                //打开结算面板的时候直接关闭battleUI
                this.sendNotification(NotificationNames.HIDEUI, ui.UIID.BattleUIID);
            };
            /**
            * @override
            */
            //ui打开动画完成
            ResultUICtrl.prototype.OnUIOpened = function (context) {
                if (context === void 0) { context = null; }
                _super.prototype.OnUIOpened.call(this, context);
                this.sendNotification(NotificationNames.OPENUI, ui.UIID.MoneyInfoUIID);
                //Level
                var levelAnimParam = new LevelUIAnimParam();
                levelAnimParam.LevelAnimType = this.win ? EnumLevelUIAnimType.Result_Win : EnumLevelUIAnimType.Result_Lose;
                levelAnimParam.curLevel = GameDataManager.getInstance().LoginPlayerInfo.CurLevel;
                this.sendNotification(NotificationNames.LevelUI_PlayAnim, levelAnimParam);
                //重置翻倍倍率
                this.lucky = 1;
                var view = this.GetView();
                if (CommonUtil.OnMiniGame()) {
                    WechatUtil.getIntance().ShowBannerAd();
                }
                AudioManager.GetInstance().StopMusic();
                this.GetView().box_AllUi.visible = true;
            };
            /**
             * @override
             */
            //ui关闭动画完成
            ResultUICtrl.prototype.OnUIHide = function () {
                _super.prototype.OnUIHide.call(this);
                //关闭 重置状态
                this.completeType = EnumCompleteType.None;
                if (CommonUtil.OnMiniGame()) {
                    WechatUtil.getIntance().HideBannerAd();
                }
                for (var i = 0; i < this.timeTaskList.length; i++) {
                    var element = this.timeTaskList.pop();
                    if (element != -1) {
                        TimeManager.getInst().remove(element);
                    }
                }
                this.timeTaskList = new Array();
                if (this.GetView().UI_Eft_DoubleCoinScale.isPlaying) {
                    this.GetView().UI_Eft_DoubleCoinScale.stop();
                }
                //停止音效
                AudioManager.GetInstance().StopSoundByConfigID(EnumSoundID.sound_function_numberup);
            };
            /**
             * @override
             */
            ResultUICtrl.prototype.BeforeUIDestroy = function () {
                _super.prototype.BeforeUIDestroy.call(this);
                this.RemoveEvent();
            };
            /**
             * @override
             */
            ResultUICtrl.prototype.OnUIDestroy = function () {
                _super.prototype.OnUIDestroy.call(this);
            };
            ResultUICtrl.prototype.RegisterEvent = function () {
                Facade.getInstance().registerMediator(this);
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
            };
            ResultUICtrl.prototype.RemoveEvent = function () {
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
                this.GetView().ani4.off(Laya.Event.COMPLETE, this, this.closeGrowSelf_);
                this.GetView().img_GrowUp.on(Laya.Event.CLICK, this, this.toShare);
                this.GetView().UI_Btn_Setting.off(Laya.Event.CLICK, this, this.OnUI_Btn_SettingClick);
            };
            //继续
            ResultUICtrl.prototype.OnUI_Btn_ContinueClick = function () {
                var _this = this;
                //动画类型
                this.completeType = EnumCompleteType.Continue;
                //防止多次点击
                var view = this.GetView();
                view.UI_Btn_Continue.mouseEnabled = false;
                view.UI_Btn_GameOver.mouseEnabled = false;
                view.UI_Btn_Lucky.mouseEnabled = false;
                view.UI_Btn_Replay.mouseEnabled = false;
                //挑战下一关
                var nextLevelID = GameDataManager.getInstance().LevelInfo.CurLevelID + 1;
                if (ConfigManager.GetInstance().GetLevelConfig(nextLevelID)) {
                    HttpMessageSender.GetSender().SendMatchComplete(GameDataManager.getInstance().GetLoginPlayerID(), GameDataManager.getInstance().LevelInfo.CurLevelID, GameDataManager.getInstance().MatchInfo.GoldNum * this.lucky, //2019-6-26 16:13:46 继续比赛也领取奖励
                    null, function () {
                        //网络连接失败，领取奖励继续比赛
                        GameDataManager.getInstance().LoginPlayerInfo.MoneyInfo.goldNum += GameDataManager.getInstance().MatchInfo.GoldNum * _this.lucky;
                        _this.sendNotification(NotificationNames.CONTINUE_NEXT_MATCH, nextLevelID);
                    });
                }
                else {
                    Log.Warn("完成最后一关,没有下一关");
                }
                //播放音效
                AudioManager.GetInstance().PlaySoundByConfigID(EnumSoundID.sound_function_touch_01);
                Facade.instance.sendNotification(NotificationNames.BackgroundUI_ChangeBackground);
            };
            //游戏结束（普通）
            ResultUICtrl.prototype.OnUI_Btn_GameOverClick = function () {
                var _this = this;
                GameDataManager.getInstance().useDiamBornTime = 0;
                //动画类型
                this.completeType = EnumCompleteType.Finish;
                //防止多次点击
                var view = this.GetView();
                view.UI_Btn_Continue.mouseEnabled = false;
                view.UI_Btn_GameOver.mouseEnabled = false;
                view.UI_Btn_Lucky.mouseEnabled = false;
                view.UI_Btn_Replay.mouseEnabled = false;
                //获取奖励
                HttpMessageSender.GetSender().SendMatchComplete(GameDataManager.getInstance().GetLoginPlayerID(), this.win ? GameDataManager.getInstance().LevelInfo.CurLevelID : -1, GameDataManager.getInstance().MatchInfo.GoldNum * this.lucky, null, function () {
                    //网络连接失败 领奖励退出比赛
                    if (_this.win)
                        GameDataManager.getInstance().LoginPlayerInfo.CurLevel = GameDataManager.getInstance().LevelInfo.NextLevelID;
                    GameDataManager.getInstance().LoginPlayerInfo.MoneyInfo.goldNum += GameDataManager.getInstance().MatchInfo.GoldNum;
                    _this.sendNotification(NotificationNames.MATCH_EXIT_COMMAND);
                    _this.closeGrowSelf_(false);
                });
                //播放音效
                AudioManager.GetInstance().PlaySoundByConfigID(EnumSoundID.sound_function_touch_01);
            };
            //翻倍奖励
            ResultUICtrl.prototype.OnUI_Btn_LuckyClick = function () {
                //动画类型
                this.completeType = EnumCompleteType.Lucky;
                //防止多次点击
                var view = this.GetView();
                // view.UI_Btn_Continue.mouseEnabled = false;
                // view.UI_Btn_GameOver.mouseEnabled = false;
                // view.UI_Btn_Replay.mouseEnabled = false;
                view.UI_Btn_Lucky.mouseEnabled = false;
                //2019-6-10 15:07:45 减少奖励次数
                var luckyNum = StorageManager.GetResultLuckyNum();
                StorageManager.SetResultLuckyNum(luckyNum - 1);
                //发送邀请
                if (CommonUtil.OnMiniGame()) {
                    // WechatUtil.getIntance().ShareWithPicAndTitle(ResPathConst.SHARE_PIC[0], "虫子来袭，消灭它们！", this.InvitedSuccess.bind(this), null,
                    //     //自己的OpenID，用于邀请别人
                    //     WechatConstDefine.LOGIN_QUERY_KEY + "=" + GameDataManager.getInstance().LoginPlayerInfo.OpenID
                    // );
                    this.VideoReady();
                }
                else {
                    //非微信环境，按照成功邀请结算
                    this.VideoSuccess();
                }
                //播放音效
                AudioManager.GetInstance().PlaySoundByConfigID(EnumSoundID.sound_function_touch_01);
            };
            //重新
            ResultUICtrl.prototype.OnUI_Btn_ReplayClick = function () {
                var _this = this;
                //2019-6-26 18:12:26 重新开始需要加上体力校验，首先判断点击时体力够不够，如果不够先弹出面板
                if (GameDataManager.getInstance().LoginPlayerInfo.MoneyInfo.pointNum < 5) {
                    //直接弹出兑换体力的面板
                    this.sendNotification(NotificationNames.OPENUIWITHPARAM, new ui.ExchangeUIParam(EnumDiamondExchangeType.Power));
                }
                else {
                    //体力充足
                    //2019-6-26 16:32:06 重新开始也要领奖
                    this.completeType = EnumCompleteType.Replay;
                    //防止多次点击
                    var view = this.GetView();
                    view.UI_Btn_Continue.mouseEnabled = false;
                    view.UI_Btn_GameOver.mouseEnabled = false;
                    view.UI_Btn_Lucky.mouseEnabled = false;
                    view.UI_Btn_Replay.mouseEnabled = false;
                    //获取奖励
                    HttpMessageSender.GetSender().SendMatchComplete(GameDataManager.getInstance().GetLoginPlayerID(), -1, //挑战失败
                    GameDataManager.getInstance().MatchInfo.GoldNum * this.lucky, null, function () {
                        //网络连接失败 领奖励重新比赛
                        GameDataManager.getInstance().LoginPlayerInfo.MoneyInfo.goldNum += GameDataManager.getInstance().MatchInfo.GoldNum * _this.lucky;
                        //继续挑战当前关卡
                        _this.sendNotification(NotificationNames.CONTINUE_NEXT_MATCH, GameDataManager.getInstance().LevelInfo.CurLevelID);
                    });
                }
                //播放音效
                AudioManager.GetInstance().PlaySoundByConfigID(EnumSoundID.sound_function_touch_01);
            };
            ResultUICtrl.prototype.OnUI_Btn_SettingClick = function () {
                //发送暂停消息
                //然后再打开设置面板
                this.sendNotification(NotificationNames.OPENUI, ui.UIID.SettingUIID);
            };
            /**
             * @override
             */
            ResultUICtrl.prototype.listNotificationInterests = function () {
                return [
                    NotificationNames.ResultUI_Finish,
                    NotificationNames.ResultUI_GainPower,
                    NotificationNames.WeChat_VideoAd_Load_Success,
                    NotificationNames.WeChat_VideoAd_Load_Fail,
                    NotificationNames.WeChat_VideoAd_OnClose,
                ];
            };
            /**
            * @override
            */
            ResultUICtrl.prototype.handleNotification = function (note) {
                var view = this.GetView();
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
                        var luckyNum = StorageManager.GetResultLuckyNum();
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
                        var isEnd = note.getBody();
                        Log.Debug("ResultUI 视频观看完成，isEnd：", isEnd);
                        if (isEnd) {
                            //正常观看结束
                            //视频播放后重新播放音频
                            this.VideoSuccess();
                        }
                        else {
                            //中断观看结束
                            view.UI_Btn_Lucky.mouseEnabled = true;
                            //中断结束后需要手动重新拉取视频
                            WechatUtil.getIntance().LoadVideoAd();
                        }
                        break;
                    }
                }
            };
            //根据胜负，初始化显示内容
            ResultUICtrl.prototype.InitLayout = function (win) {
                //保存结果
                this.win = win;
                //
                if (!this.win)
                    GameDataManager.getInstance().useDiamBornTime = 0;
                var view = this.GetView();
                //图标
                view.UI_Img_Win.visible = this.win;
                view.UI_Img_Lose.visible = !this.win;
                if (this.win)
                    view.ani2.play(0, false); //胜利
                else
                    view.ani3.play(0, false);
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
                var luckyNum = StorageManager.GetResultLuckyNum();
                //广告相关
                this.videoAdWatched = false;
                //2019-7-30 11:25:11 避免视频广告拉取失败
                if (CommonUtil.OnMiniGame() && !WechatUtil.getIntance().WxVideoAdReady) {
                    //如果打开的时候没有准备好视频广告，尝试手动拉取
                    WechatUtil.getIntance().LoadVideoAd();
                }
                else {
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
                            }], Handler.create(this, function (res) {
                            //成功回调
                            Log.Debug("更新最高分成功", GameDataManager.getInstance().LoginPlayerInfo.CurLevel);
                        }), Handler.create(this, function (res) {
                            //失败回调
                            Log.Debug("更新最高分失败," + res);
                            // this.SetHighScore({value:OpenDataContextManager.highScore});
                        }));
                    }
                }
            };
            //处理结算
            ResultUICtrl.prototype.HandleComplete = function () {
                var _this = this;
                var view = this.GetView();
                switch (this.completeType) {
                    case EnumCompleteType.Continue: {
                        if (GameDataManager.getInstance().MatchInfo.GoldNum > 0) {
                            //领取奖励
                            this.PlayCoinAnim(10);
                            //延时继续
                            var timeTask = TimeManager.getInst().once(0.8, cbhandler.gen_handler(function () {
                                //通知服务器更新体力
                                HttpMessageSender.GetSender().SendMatchStart(GameDataManager.getInstance().LoginPlayerInfo.OpenID);
                            }, this));
                            this.timeTaskList.push();
                        }
                        else {
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
                            var timeTask = TimeManager.getInst().once(0.8, cbhandler.gen_handler(function () {
                                _this.sendNotification(NotificationNames.MATCH_EXIT_COMMAND);
                            }, this));
                            this.timeTaskList.push(timeTask);
                        }
                        else {
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
                            var timeTask = TimeManager.getInst().once(0.8, cbhandler.gen_handler(function () {
                                _this.sendNotification(NotificationNames.MATCH_EXIT_COMMAND);
                            }, this));
                            this.timeTaskList.push(timeTask);
                        }
                        else {
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
                            var timeTask = TimeManager.getInst().once(0.8, cbhandler.gen_handler(function () {
                                //2019-6-26 17:54:48 重新挑战也需要扣除体力
                                //通知服务器更新体力
                                HttpMessageSender.GetSender().SendMatchStart(GameDataManager.getInstance().LoginPlayerInfo.OpenID);
                                // //继续挑战当前关卡
                                // this.sendNotification(NotificationNames.CONTINUE_NEXT_MATCH, GameDataManager.getInstance().LevelInfo.CurLevelID);
                            }, this));
                            this.timeTaskList.push(timeTask);
                        }
                        else {
                            //2019-6-26 17:54:48 重新挑战也需要扣除体力
                            //通知服务器更新体力
                            HttpMessageSender.GetSender().SendMatchStart(GameDataManager.getInstance().LoginPlayerInfo.OpenID);
                        }
                        break;
                    }
                }
                //2019-8-15 12:28:25 播放体力动画留到处理结算的时候
                if (this.win)
                    this.PlayPointAnim();
                this.closeGrowSelf_(false); //重制false   
            };
            ResultUICtrl.prototype.PlayPointAnim = function () {
                var view = this.GetView();
                var worldPos = CommonUtil2D.GetGlobalPosition(view.UI_Img_Power);
                MoneyAnimManager.Instance.PlayMoneyAnim_Pos_Curve(EnumMoneyAnimType.Power, 5, new Vec2(worldPos.x + 30, worldPos.y + 30), new Vec2(ConstDefine.MoneyImgPos_Power.x, ConstDefine.MoneyImgPos_Power.y), 500);
            };
            ResultUICtrl.prototype.PlayCoinAnim = function (num) {
                var view = this.GetView();
                var worldPos = CommonUtil2D.GetGlobalPosition(view.UI_Img_Coin);
                MoneyAnimManager.Instance.PlayMoneyAnim_Pos_Curve(EnumMoneyAnimType.Coin, num, new Vec2(worldPos.x + 30, worldPos.y + 30), new Vec2(ConstDefine.MoneyImgPos_Coin.x, ConstDefine.MoneyImgPos_Coin.y), 500);
            };
            //成功
            ResultUICtrl.prototype.VideoSuccess = function () {
                var _this = this;
                //设置倍率
                this.lucky = 3;
                for (var i = 0; i < this.lucky - 1; i++) {
                    var add = this.arr_CoinAdd[i];
                    if (!add) {
                        add = new ui.PrefabUI.CoinAddUI();
                        this.GetView().addChild(add);
                        this.arr_CoinAdd.push(add);
                        add.zOrder = 1;
                    }
                    add.scale(0.1, 0.1);
                    add.alpha = 0.1;
                    add.pos(543, 901); //位置
                    add.visible = true; //可视化
                    add.lab_money.text = GameDataUtil.NumberToString(GameDataManager.getInstance().MatchInfo.GoldNum);
                }
                //播放音效
                AudioManager.GetInstance().PlaySoundByConfigID(EnumSoundID.sound_function_numberup);
                var _loop_1 = function (i) {
                    Laya.timer.once(i * 500, this_1, function () {
                        Laya.Tween.to(this.arr_CoinAdd[i], { "scaleX": 1, "scaleY": 1, "alpha": 1, "x": this.GetView().UI_HBox_Reward.x + this.GetView().UI_Img_Coin.width / 2, "y": this.GetView().UI_HBox_Reward.y + 500 + this.GetView().UI_HBox_Reward.height / 2 }, 700, null, Laya.Handler.create(this, function () {
                            this.arr_CoinAdd[i].alpha = 0;
                        }));
                    });
                };
                var this_1 = this;
                //金币上浮动画
                for (var i = 0; i < this.arr_CoinAdd.length; i++) {
                    _loop_1(i);
                }
                //播放动画
                var view = this.GetView();
                view.UI_Eft_DoubleCoinScale.play(0, true);
                var txtLucky = 1;
                var delta = (this.lucky - txtLucky) / 100;
                var timeTask1 = TimeManager.getInst().loopTimes(0.008, 100, cbhandler.gen_handler(function () {
                    //每0.02秒循环1次，循环100次，共2秒
                    txtLucky += delta;
                    view.UI_Txt_Coin.text = GameDataUtil.NumberToString(GameDataManager.getInstance().MatchInfo.GoldNum * txtLucky);
                    if (txtLucky >= _this.lucky - 0.01) {
                        view.UI_Eft_DoubleCoinScale.stop();
                        //停止音效
                        AudioManager.GetInstance().StopSoundByConfigID(EnumSoundID.sound_function_numberup);
                    }
                }, this));
                var timeTask2 = TimeManager.getInst().once(3, cbhandler.gen_handler(function () {
                }, this));
                this.timeTaskList.push(timeTask1, timeTask2);
                //隐藏按钮
                view.UI_Btn_Lucky.disabled = true;
                this.videoAdWatched = true;
            };
            //视频准备完毕
            ResultUICtrl.prototype.VideoReady = function () {
                var _this = this;
                var view = this.GetView();
                WechatUtil.getIntance().ShowVideoAd(cbhandler.gen_handler(function () {
                    //视频播放前
                    // 播放前停止计时器
                    if (!GameDataManager.getInstance().MatchInfo.IsGameEnd()) {
                        _this.sendNotification(NotificationNames.PAUSE_MATCH, true);
                        _this.sendNotification(NotificationNames.BackgroundUI_BgMoveEnd);
                    }
                }, this));
            };
            ResultUICtrl.prototype.VideoLoadFailedHandle = function () {
                var view = this.GetView();
                //拉取视频失败
                //2019-6-25 14:40:21 新需求 分享总开关
                view.UI_Btn_Lucky.disabled = true;
            };
            ResultUICtrl.prototype.VideoLoadSucceedHandle = function (luckyNum) {
                var view = this.GetView();
                //拉取视频成功
                //2019-6-25 14:40:21 新需求 分享总开关
                if (this.videoAdWatched) {
                    view.UI_Btn_Lucky.disabled = true;
                }
                else {
                    view.UI_Btn_Lucky.disabled = !(luckyNum > 0 && GameDataManager.getInstance().LuckyEnable);
                }
            };
            ResultUICtrl.prototype.SetHBoxWidth = function () {
                var view = this.GetView();
                var rewardNum = 0;
                if (view.UI_Img_Coin.visible)
                    rewardNum++;
                if (view.UI_Img_Power.visible)
                    rewardNum++;
                if (view.UI_Img_Diamond.visible)
                    rewardNum++;
                view.UI_HBox_Reward.width = rewardNum * 224 + 100 * (rewardNum - 1);
                view.UI_HBox_Reward.x = (view.info.width - view.UI_HBox_Reward.width) / 2;
            };
            /**
             * 动画完成
             */
            ResultUICtrl.prototype.onAni = function () {
                this.GetView().buttonBox.visible = true;
                this.GetView().info.visible = true;
                this.GetView().ani1.play(0, false);
            };
            /**
             * 显示  提升战力窗口
             */
            ResultUICtrl.prototype.toGrowSelf = function () {
                //0未邀请
                if (!this.win && GameDataManager.getInstance().LoginPlayerInfo.VerifyInfo.state == 0 && GameDataManager.getInstance().InviteType != 0) {
                    Laya.timer.once(300, this, function () {
                        this.GetView().ani4.play(0, false);
                        this.GetView().img_GrowUp_Bg.visible = true;
                        this.GetView().img_GrowUp.visible = true;
                    });
                }
            };
            /**
             *  关闭 提升战力窗口
             */
            ResultUICtrl.prototype.closeGrowSelf = function () {
                this.GetView().ani5.play(0, false);
            };
            ResultUICtrl.prototype.closeGrowSelf_ = function (isTrue) {
                if (isTrue) {
                    this.GetView().img_GrowUp_Bg.visible = true;
                    this.GetView().img_GrowUp.visible = true;
                }
                else {
                    this.GetView().img_GrowUp_Bg.visible = false;
                    this.GetView().img_GrowUp.visible = false;
                }
            };
            /**
             * 用户分享窗口分享
             */
            ResultUICtrl.prototype.toShare = function () {
                this.closeGrowSelf();
                //新功能（有转盘的UI
                this.sendNotification(NotificationNames.OPENUI, ui.UIID.VerifyUIID);
                //播放音效
                AudioManager.GetInstance().PlaySoundByConfigID(EnumSoundID.sound_function_touch_01);
            };
            return ResultUICtrl;
        }(ui.BaseUICtrl));
        uicontrollers.ResultUICtrl = ResultUICtrl;
    })(uicontrollers = ui.uicontrollers || (ui.uicontrollers = {}));
})(ui || (ui = {}));
//# sourceMappingURL=ResultUICtrl.js.map