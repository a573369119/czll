
/**
* Created By Code Generator
*/
module ui.uicontrollers {
    import Facade = puremvc.Facade;

    export class HomePageUICtrl extends ui.BaseUICtrl {
        private spawnItem: SpawnItem;

        private readonly anchorPos_Right_Hide: Vec2 = new Vec2(1480, 960);
        private readonly anchorPos_Bottom_Hide: Vec2 = new Vec2(540, 2320);

        private readonly anchorPos_Right_Show: Vec2 = new Vec2(1080, 960);
        private readonly anchorPos_Bottom_Show: Vec2 = new Vec2(540, 1920);

        private readonly uiAnimTime: number = 1;

        //底端按钮选中状态
        private readonly btnSkin_Normal = "resources/homepage/img_func_bg_0.png";
        private readonly btnSkin_Selected = "resources/homepage/img_func_bg_1.png";

        constructor(view: View) {
            super(view);
        }

        public GetView(): ui.HomePageUI {
            return this.uiView as ui.HomePageUI;
        }
        /**
         * @override
         */
        public Init(parent: Laya.Sprite, id: ui.UIID) {
            super.Init(parent, id);
            this.mediatorName = ui.UIID.HomePageUIID.toString();
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
                // Log.Debug("HomepageUI 自适应 width", Laya.stage.width, "height", Laya.stage.height);
            });

            //如果是微信端则通知保存到云数据

            if (CommonUtil.OnMiniGame()) {
                WechatUtil.wxSetUserCloudStorage([{
                    key: OpenDataContextKeyDefine.CURRENT_COMPLETE_LEVEL,
                    value: GameDataManager.getInstance().LoginPlayerInfo.CurLevel.toString()
                }, {
                    key: OpenDataContextKeyDefine.PLAYER_OPENID,
                    value: GameDataManager.getInstance().LoginPlayerInfo.OpenID.toString()
                }, {
                    key: OpenDataContextKeyDefine.PHONE_STAT,
                    value: GameDataManager.getInstance().LoginPlayerInfo.VerifyInfo.state.toString()
                }], Handler.create(this, (res) => {
                    //成功回调
                    Log.Debug("更新最高分成功", GameDataManager.getInstance().LoginPlayerInfo.CurLevel);
                }), Handler.create(this, (res) => {
                    //失败回调
                    Log.Debug("更新最高分失败," + res);
                    // this.SetHighScore({value:OpenDataContextManager.highScore});
                }));
            }

            this.sendNotification(NotificationNames.CREATER_MAIN_PLAYER);

            let view = this.GetView();
            //初始位置
            view.Anchor_BottomCenter.bottom = -400;
            //绘制黑色内容，并立刻显示
            //2019d-7-10 21:21:37 去黑屏
            // view.UI_Img_Black_Cover.graphics.drawRect(0, 0, view.UI_Img_Black_Cover.width, view.UI_Img_Black_Cover.height, "#000000");
            // view.UI_Img_Black_Cover.visible = true;
            // view.UI_Img_Black_Cover.alpha = 1;

            //2019-6-19 19:51:18 版本号
            if (window["GameVersion"]) {
                view.UI_Txt_Version.text = window["GameVersion"];
            } else {
                view.UI_Txt_Version.text = "";
            }

            //离线检查
            this.CheckOfflineSpawn();


        }

        /**
         * @override
         */
        //ui动画执行前
        protected BeforeUIOpen(context: WindowContextDataBase = null) {
            super.BeforeUIOpen(context);

            let view = this.GetView();
            //初始位置
            view.Anchor_BottomCenter.bottom = -400;

            //通知动画
            PlayerManager.GetInstance().MainPlayer.EnterHomepageScene();
        }
        /**
        * @override
        */
        //ui打开动画完成
        protected OnUIOpened(context: WindowContextDataBase = null) {
            super.OnUIOpened(context);

            // //2019-6-3 15:04:36 根据当前的战斗状态，避免重新开始时重复开启面板导致出错
            // if(GameDataManager.getInstance().MatchInfo.State == EnumMatchState.)

            let view = this.GetView();
            // 判断当前是否是第1关，决定显示内容
            view.UI_Txt_CurLevel.text = "当前关卡：" + GameDataManager.getInstance().LoginPlayerInfo.CurLevel.toString();
            if (GameDataManager.getInstance().LoginPlayerInfo.CurLevel < 1) {
                //确保可以点击
                view.UI_Btn_GameStart.mouseEnabled = true;
            } else {
                view.UI_Btn_GameStart.mouseEnabled = false;
                view.Anchor_BottomCenter.centerX = 0;
                //播放动画
                Tween2DUtil.to({
                    node: view.Anchor_BottomCenter,
                    duration: this.uiAnimTime,
                    bottom: 0,
                })
                TimeManager.getInst().once(1, cbhandler.gen_handler(() => {
                    view.UI_Btn_GameStart.mouseEnabled = true;
                }, this))

                //刷新产能信息
                this.InitSpawnInfo();
            }
            //测试 
            // view.Anchor_BottomCenter.pos(this.anchorPos_Bottom_Show.x, this.anchorPos_Bottom_Show.y);

            this.CheckSideWeaponUnlock();

            //2019-6-11 14:17:14 升级箭头动画
            this.CheckUpgrade();

            //Level
            let levelAnimParam = new LevelUIAnimParam();
            levelAnimParam.LevelAnimType = EnumLevelUIAnimType.HomePage;
            levelAnimParam.curLevel = GameDataManager.getInstance().LoginPlayerInfo.CurLevel;
            this.sendNotification(NotificationNames.LevelUI_PlayAnim, levelAnimParam)

            AudioManager.GetInstance().PlayMusicByID(GameDataManager.getInstance().HallBg)
        }
        /**
         * @override
         */
        //ui关闭动画完成
        protected OnUIHide() {
            super.OnUIHide();

            let view = this.GetView();

            //动画关闭时，移除所有产能信息
            if (this.spawnItem) {
                this.spawnItem.DeleteSpawnItem();
                let item = this.spawnItem;
                this.spawnItem = null;
                item.destroy(true);
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
            view.UI_Btn_Setting.on(Laya.Event.CLICK, this, this.OnUI_Btn_SettingClick);
            view.UI_Btn_Leaderboard.on(Laya.Event.CLICK, this, this.OnUI_Btn_LeaderboardClick);
            view.UI_Btn_InviteFriend.on(Laya.Event.CLICK, this, this.OnUI_Btn_InviteFriendClick);
            view.UI_Btn_GameStart.on(Laya.Event.MOUSE_DOWN, this, this.OnUI_Btn_GameStartClick);

            view.UI_Btn_Upgrade_Main.on(Laya.Event.CLICK, this, this.OnUI_Btn_Upgrade_MainClick);
            view.UI_Btn_Upgrade_Sub.on(Laya.Event.CLICK, this, this.OnUI_Btn_Upgrade_SubClick);
            view.UI_Btn_Upgrade_Money.on(Laya.Event.CLICK, this, this.OnUI_Btn_Upgrade_MoneyClick);
            //测试功能
            view.UI_Btn_EnterSelectedLevel.on(Laya.Event.CLICK, this, this.OnUI_Btn_EnterSelectedLevelClick);
        }
        private RemoveEvent(): void {
            Facade.getInstance().removeMediator(this.getMediatorName());
            let view = this.GetView();
            view.UI_Btn_Setting.off(Laya.Event.CLICK, this, this.OnUI_Btn_SettingClick);
            view.UI_Btn_Leaderboard.off(Laya.Event.CLICK, this, this.OnUI_Btn_LeaderboardClick);
            view.UI_Btn_InviteFriend.off(Laya.Event.CLICK, this, this.OnUI_Btn_InviteFriendClick);
            view.UI_Btn_GameStart.off(Laya.Event.MOUSE_DOWN, this, this.OnUI_Btn_GameStartClick);

            view.UI_Btn_Upgrade_Main.off(Laya.Event.CLICK, this, this.OnUI_Btn_Upgrade_MainClick);
            view.UI_Btn_Upgrade_Sub.off(Laya.Event.CLICK, this, this.OnUI_Btn_Upgrade_SubClick);
            view.UI_Btn_Upgrade_Money.off(Laya.Event.CLICK, this, this.OnUI_Btn_Upgrade_MoneyClick);
            //测试功能
            view.UI_Btn_EnterSelectedLevel.on(Laya.Event.CLICK, this, this.OnUI_Btn_EnterSelectedLevelClick);
        }
        private OnUI_Btn_SettingClick() {
            this.sendNotification(NotificationNames.OPENUI, UIID.SettingUIID);
            //播放音效
            AudioManager.GetInstance().PlaySoundByConfigID(EnumSoundID.sound_function_touch_01);
        }
        private OnUI_Btn_LeaderboardClick() {
            //打开排行榜
            this.sendNotification(NotificationNames.OPENUI, UIID.LeaderboardUIID);
            //播放音效
            AudioManager.GetInstance().PlaySoundByConfigID(EnumSoundID.sound_function_touch_01);
        }
        private OnUI_Btn_InviteFriendClick() {
            //2019-6-12 14:36:24 新需求 点击的时候立刻打开面板，然后发送请求。等到请求完毕后再刷新内容
            //2019-7-16 10:24:31 需要根据是否验证状态，决定弹出哪个面板
            //2019-7-16 17:15:41 用开关进行切换判断
            if (GameDataManager.getInstance().InviteType == 0) {
                //旧功能
                // 打开邀请面板
                this.sendNotification(NotificationNames.OPENUI, UIID.InviteFriendUIID);
                // 查询好友邀请列表 
                HttpMessageSender.GetSender().SendCheckInviteList(GameDataManager.getInstance().LoginPlayerInfo.OpenID);
            } else {
                //新功能（有转盘的UI
                if (GameDataManager.getInstance().LoginPlayerInfo.VerifyInfo.state == 0) {
                    //未验证，打开验证面板
                    this.sendNotification(NotificationNames.OPENUI, UIID.VerifyUIID);
                } else {
                    //已验证，打开邀请面板
                    this.sendNotification(NotificationNames.OPENUI, UIID.InviteVerifyFriendUIID);
                    //查询好友邀请列表 
                    HttpMessageSender.GetSender().SendCheckInviteList(GameDataManager.getInstance().LoginPlayerInfo.OpenID);
                }
            }
            //播放音效
            AudioManager.GetInstance().PlaySoundByConfigID(EnumSoundID.sound_function_touch_01);

        }
        private OnUI_Btn_GameStartClick() {
            //检查体力
            let curPoint = GameDataManager.getInstance().LoginPlayerInfo.MoneyInfo.pointNum;
            if (curPoint >= 5) {
                //体力足够，发送请求
                HttpMessageSender.GetSender().SendMatchStart(GameDataManager.getInstance().LoginPlayerInfo.OpenID)
            } else {
                //体力不足
                //直接弹出兑换体力的面板
                this.sendNotification(NotificationNames.OPENUIWITHPARAM, new ExchangeUIParam(EnumDiamondExchangeType.Power));
            }
        }
        private OnUI_Btn_EnterSelectedLevelClick() {
            //点击进入选择关卡时
            let view = this.GetView();
            let data = view.UI_Ipt_SelectLevel.text;
            if (data) {
                let level = parseInt(data);
                GameDataManager.getInstance().LoginPlayerInfo.CurLevel = level;
                //进入选定关卡
                this.sendNotification(NotificationNames.MATCH_ENTER_COMMAND, level);
            }
        }

        private OnUI_Btn_Upgrade_MainClick() {
            //打开升级面板
            this.sendNotification(NotificationNames.OPENUIWITHPARAM, new UpgradeUIParam(EnumUpgradeUIType.Main));
            //播放音效
            AudioManager.GetInstance().PlaySoundByConfigID(EnumSoundID.sound_function_touch_01);
        }
        private OnUI_Btn_Upgrade_SubClick() {
            //打开升级面板
            this.sendNotification(NotificationNames.OPENUIWITHPARAM, new UpgradeUIParam(EnumUpgradeUIType.Sub));
            //副武器升级面板打开，刷新提示
            if (StorageManager.GetUnlockNewSideweapon()) {
                StorageManager.SetUnlockNewSideweapon(false);
                this.CheckUpgrade();
            }
            //播放音效
            AudioManager.GetInstance().PlaySoundByConfigID(EnumSoundID.sound_function_touch_01);
        }
        private OnUI_Btn_Upgrade_MoneyClick() {
            //打开升级面板
            this.sendNotification(NotificationNames.OPENUIWITHPARAM, new UpgradeUIParam(EnumUpgradeUIType.Money));
            //播放音效
            AudioManager.GetInstance().PlaySoundByConfigID(EnumSoundID.sound_function_touch_01);
        }


        /**
         * @override
         */
        listNotificationInterests(): string[] {
            return [
                NotificationNames.HomepageUI_CreateMoneySpawn,
                NotificationNames.HomepageUI_GainMoneySpawn,
                // NotificationNames.HomepageUI_UpdateMoneySpawn,
                // NotificationNames.HomepageUI_RemoveMoneySpawn,
                NotificationNames.UI_StartGame,
                NotificationNames.UI_RefreshMoneyInfo,
                NotificationNames.HomepageUI_SetBottomButtonState,
                NotificationNames.HomePageUI_SetInteractive,
                NotificationNames.HomepageUI_UnlockNewSideweapon,
                NotificationNames.HomepageUI_PlaySpawnAnim,
                NotificationNames.HomepageUI_HidenText,
                NotificationNames.HomepageUI_ShowText
            ];
        }

        /**
        * @override
        */
        handleNotification(note: puremvc.INotification): void {
            let view = this.GetView();
            switch (note.getName()) {
                case NotificationNames.HomepageUI_HidenText: {
                    //隐藏
                    this.GetView().UI_Btn_GameStart.visible = false;
                    break;
                }
                case NotificationNames.HomepageUI_ShowText: {
                    //隐藏
                    this.GetView().UI_Btn_GameStart.visible = true;
                    break;
                }
                case NotificationNames.HomepageUI_CreateMoneySpawn: {
                    //关闭面板时不接收
                    if (view.visible == false) {
                        return;
                    }
                    //创建钱币产能
                    let data = note.getBody() as com.msg.moneySpawnInfo;
                    Log.Debug("可以创建产能 type:", data.moneyType, "id:", data.spawnID);
                    this.CreateNewMoneySpawn(data, true);
                    break;
                }
                case NotificationNames.HomepageUI_GainMoneySpawn: {
                    //关闭面板时不接收
                    if (view.visible == false) {
                        return;
                    }
                    //收获钱币产能
                    let dataID = note.getBody() as number;
                    Log.Debug("可以收获产能 id:", dataID);
                    //寻找当前的内容
                    if (this.spawnItem) {
                        //2019-7-26 14:25:58 新需求 动画的播放时间移到点击收获时执行
                        //检查创建
                        this.CheckCreateSpawn();
                    }
                    break;
                }
                case NotificationNames.HomepageUI_UpdateMoneySpawn: {
                    // //关闭面板时不接收
                    // if (view.visible == false) {
                    //     return;
                    // }
                    // //更新钱币产能
                    // let data = note.getBody() as com.msg.moneySpawnInfo;
                    // Log.Debug("可以更新产能 type:", data.moneyType, "id:", data.spawnID);
                    // //寻找当前的内容
                    // let spawnItem = this.FindSpawnItemFromShowList(data.spawnID);
                    // if (spawnItem != null) {
                    //     spawnItem.UpdateSpawnItem(data);
                    // }
                    //如果产能额度已满，则再次请求创建一个新的同类型产能
                    //2019-6-12 15:50:46 进入2阶段时不再请求创建
                    // if (data.spawnType == 2) {
                    //     if (data.moneyType == 1) {
                    //         //金币
                    //         this.CheckCreateSpawn_Coin();
                    //     } else {
                    //         //钻石
                    //         this.CheckCreateSpawn_Diamond();
                    //     }
                    // }

                    //2019-7-9 17:09:55 3.0需求，不需要发送服务器协议
                    break;
                }
                case NotificationNames.HomepageUI_RemoveMoneySpawn: {
                    // //关闭面板时不接收
                    // if (view.visible == false) {
                    //     return;
                    // }
                    // //移除钱币产能
                    // let dataID = note.getBody() as number;
                    // Log.Debug("可以移除产能 id:", dataID);
                    // //寻找当前的内容
                    // let spawnItme = this.FindSpawnItemFromShowList(dataID);
                    // if (spawnItme) {
                    //     if (spawnItme.spawnInfo.moneyType == 1) {
                    //         //金币
                    //         //检查创建
                    //         this.CheckCreateSpawn_Coin();
                    //     } else {
                    //         //钻石
                    //         //检查创建
                    //         // this.CheckCreateSpawn_Diamond();
                    //     }

                    //     //从显示列表中移除
                    //     this.RemoveSpawnItemFromShowList(spawnItme.spawnInfo.spawnID);
                    //     //清除数据
                    //     spawnItme.DeleteSpawnItem();
                    //     //从视图中移除
                    //     this.DeleteSpawnItem(spawnItme);
                    // }

                    //2019-7-9 17:09:55 3.0需求，不需要发送服务器协议
                    break;
                }
                case NotificationNames.UI_StartGame: {

                    if (GameDataManager.getInstance().MatchInfo.State != EnumMatchState.Exit) {
                        //在非游戏结束时
                        return;
                    }
                    //重新读取钱币信息
                    this.sendNotification(NotificationNames.UI_RefreshMoneyInfo);
                    //开始游戏
                    let levelID = GameDataManager.getInstance().LoginPlayerInfo.CurLevel;
                    this.sendNotification(NotificationNames.MATCH_ENTER_COMMAND, levelID)
                    break;
                }
                case NotificationNames.UI_RefreshMoneyInfo: {
                    //每次接收到钱币刷新消息的时候，查看能否显示升级箭头
                    this.CheckUpgrade();
                    break;
                }
                case NotificationNames.HomepageUI_SetBottomButtonState: {
                    //根据状态显示底部按钮状态
                    let data = note.getBody() as HomepageBottomButtonState;
                    switch (data.buttonID) {
                        case 0: {
                            this.SetBtnSelectedState(view.UI_Btn_Leaderboard, data.selected);
                            break;
                        }
                        case 1: {
                            this.SetBtnSelectedState(view.UI_Btn_InviteFriend, data.selected);
                            break;
                        }
                        case 2: {
                            this.SetBtnSelectedState(view.UI_Btn_Upgrade_Main, data.selected);
                            break;
                        }
                        case 3: {
                            this.SetBtnSelectedState(view.UI_Btn_Upgrade_Sub, data.selected);
                            break;
                        }
                        case 4: {
                            this.SetBtnSelectedState(view.UI_Btn_Upgrade_Money, data.selected);
                            break;
                        }
                    }
                    break;
                }
                case NotificationNames.HomePageUI_SetInteractive: {
                    //收到消息，黑屏逐渐消失
                    //2019-6-17 13:39:27 先静止0.5秒，然后消失（0.5秒）
                    //2019-7-10 21:21:58 去黑屏
                    // Tween2DUtil.getInst().to({
                    //     node: view.UI_Img_Black_Cover,
                    //     duration: 0.5,
                    //     delay: 0.5,
                    //     alpha: 0,
                    //     onComplete: cbhandler.gen_handler(() => {
                    //         view.UI_Img_Black_Cover.visible = false;
                    //         view.UI_Img_Black_Cover.alpha = 1;
                    //     }, this)
                    // });
                    break;
                }
                case NotificationNames.HomepageUI_UnlockNewSideweapon: {
                    //收到消息后，立刻检测升级提示
                    this.CheckUpgrade();
                    break;
                }
                case NotificationNames.HomepageUI_PlaySpawnAnim: {
                    let result = note.getBody() as boolean;
                    if (result) {
                        //收到消息后，播放产能动画
                        this.spawnItem.PlayMoneyAnim();
                    } else {
                        //收到消息后，重新显示并取消暂停
                        this.spawnItem.ConnectError();
                    }
                    break;
                }
            }
        }

        //创建产能信息
        private InitSpawnInfo() {
            //遍历当前的产能信息，循环创建
            //额外复制一份列表，避免因单帧内数据变化引起长度变化
            let spawnList = new Array<com.msg.moneySpawnInfo>();
            for (var i = 0; i < GameDataManager.getInstance().LoginPlayerInfo.MoneyInfo.spawnList.length; i++) {
                spawnList.push(GameDataManager.getInstance().LoginPlayerInfo.MoneyInfo.spawnList[i]);
            }
            Log.Debug("HomepageUI 当前产能列表：", spawnList);
            for (let i = 0; i < spawnList.length; i++) {
                let element = spawnList[i];
                //将现有的内容创建到屏幕上
                this.CreateNewMoneySpawn(element, false);
            }
            //开始检查，若符合创建条件则立刻创建
            this.CheckCreateSpawn();
        }

        //检查创建产能
        private CheckCreateSpawn() {
            //检查能否创建一个新的金币产能
            //2019-8-5 12:02:11 只有一个金币产能
            let canSpawnCoin: boolean = GameDataManager.getInstance().LoginPlayerInfo.MoneyInfo.spawnList.length < 1;
            //根据检查结果，决定是否创建
            if (canSpawnCoin) {
                // Log.Debug("可以创建金币产能");
                //可以创建金币产能，发送消息
                HttpMessageSender.GetSender().SendCreateMoneySpawn(GameDataManager.getInstance().LoginPlayerInfo.OpenID, EnumMoneyType.Coin);
            }
        }

        //创建一个新的产能
        private CreateNewMoneySpawn(data: com.msg.moneySpawnInfo, isCreate: boolean) {
            //每一个都随机位置创建
            let view = this.GetView();
            //创建
            if (!this.spawnItem) {
                this.spawnItem = new SpawnItem();
                this.spawnItem.scale(1.2, 1.2);
                this.spawnItem.ani.play(0, true);
            }
            // 2019-6-12 15:32:53 新需求 金币与钻石产能位置固定
            // 2019-7-9 18:15:51 新需求 只留下金币
            //金币
            view.UI_Box_Coin_Pos.addChild(this.spawnItem);
            this.spawnItem.centerX = 0;
            this.spawnItem.centerY = 0;

            let spawnInfo = isCreate ? this.CreateSpawnInfo(data) : this.UpdateSpawnInfo(data);

            this.spawnItem.InitSpawnItem(spawnInfo);
        }

        //检查离线产能
        private CheckOfflineSpawn() {
            if (GameDataManager.getInstance().LoginPlayerInfo.MoneyInfo.spawnList.length <= 0) {
                //没有数据
                return;
            }
            //检查
            let data = GameDataManager.getInstance().LoginPlayerInfo.MoneyInfo.spawnList[0];
            let loginTime = GameDataManager.getInstance().ServerLoginTime;
            //距离创建产能24小时的时间
            let overTime = (data.createTime as number) + ConstDefine.SpawnTime_OverTime;
            //计算基准
            let calculateBase = loginTime > overTime ? overTime : loginTime;
            //本次登录（或打开UI）距离上次更新的时间差
            //2019-7-12 19:22:46 不再使用上次更新时间进行计算，直接用计算基准和创建时间进行计算。
            let offLineTime = calculateBase - (data.createTime as number);
            //避免时间出现负值
            if (offLineTime <= 0) {
                offLineTime = 0;
            }

            //计算增量
            let deltaNum = 0;
            let spawnLvl = GameDataManager.getInstance().LoginPlayerInfo.SpawnLvl;
            //金币
            deltaNum = FormulaUtil.CalcByConfig(EnumFormulaType.GoldUpgrade, spawnLvl) * offLineTime;
            //2019-7-12 19:24:31 直接采用登录时间和创建时间进行计算，不再叠加
            StorageManager.SetSpawnMoneyNum(deltaNum);
            //将更新时间设置为本地的now
            let now = Math.floor(Date.now() / 1000);
            StorageManager.SetSpawnUpdateTime(now);
        }

        //传入的是创建时的信息。根据创建时的信息和当前的时间信息，更新本地内容
        /**创建产能时调用 */
        private CreateSpawnInfo(data: com.msg.moneySpawnInfo): SpawnInfo {
            //这是一个新创建的产能，更新本地内容
            StorageManager.SetSpawnMoneyNum(0);
            let now = Math.floor(Date.now() / 1000);
            Log.Debug("HomepageUI CreateSpawnItem SeverCreateTime:", data.createTime, "LocalNow:", now, "delta:", now - (data.createTime as number));
            //2019-7-29 11:28:27 可能存在服务器与本地时间不同步，因此作为计算依据时采用服务器时间
            StorageManager.SetSpawnUpdateTime(now);

            //返回数据
            let spawnInfo = new SpawnInfo(data.spawnID, 0, data.createTime as number, 1);
            return spawnInfo;
        }

        /**更新产能时调用 */
        private UpdateSpawnInfo(data: com.msg.moneySpawnInfo): SpawnInfo {
            //这是一个旧的产能，需要判断
            let nowTime = Math.floor(Date.now() / 1000);
            //距离创建产能24小时的时间
            let overTime = (data.createTime as number) + ConstDefine.SpawnTime_OverTime;
            //计算基准
            let calculateBase = nowTime > overTime ? overTime : nowTime;
            //本次登录（或打开UI）距离上次更新的时间差
            //2019-7-12 19:22:46 不再使用上次更新时间进行计算，直接用计算基准和创建时间进行计算。
            let offLineTime = calculateBase - (data.createTime as number);
            //避免时间出现负值
            if (offLineTime <= 0) {
                offLineTime = 0;
            }

            //计算增量
            let deltaNum = 0;
            let spawnLvl = GameDataManager.getInstance().LoginPlayerInfo.SpawnLvl;
            //金币
            deltaNum = FormulaUtil.CalcByConfig(EnumFormulaType.GoldUpgrade, spawnLvl) * offLineTime;
            //2019-7-12 19:24:31 直接采用登录时间和创建时间进行计算，不再叠加
            // let localMoneyNum = StorageManager.GetSpawnMoneyNum();
            // localMoneyNum += deltaNum;
            StorageManager.SetSpawnMoneyNum(deltaNum);
            //时间
            StorageManager.SetSpawnUpdateTime(nowTime);
            //状态
            let spawnType = nowTime - (data.createTime as number) >= ConstDefine.SpawnTime_OverTime ? 2 : 1;

            //返回数据
            let spawnInfo = new SpawnInfo(data.spawnID, deltaNum, data.createTime as number, spawnType);
            return spawnInfo;
        }

        private CheckSideWeaponUnlock() {
            //如果关卡数为20的整数倍，发送解锁副武器的信息（需要判断副武器数量，避免过多发送）
            //2019-6-3 11:33:08 副武器解锁等级已经有配置，每次主UI打开时直接判断，如果需要则直接发送解锁消息
            let allSideWeaponConfig = ConfigManager.GetInstance().GetAllWeaponConfig();
            let allSideWeaponList = GameDataManager.getInstance().LoginPlayerInfo.AllSideWeaponList;
            for (let i = 0; i < allSideWeaponConfig.length; i++) {
                let config = allSideWeaponConfig[i];
                if (config.UnlockLevel == -1) {
                    //无所谓解锁的武器，如：主武器和导弹
                    continue;
                } else {
                    let completedLevel = GameDataManager.getInstance().LoginPlayerInfo.CurLevel - 1;
                    let exist = false;
                    for (let j = 0; j < allSideWeaponList.length; j++) {
                        let weaponInfo = allSideWeaponList[j];
                        if (weaponInfo.id == config.index) {
                            exist = true;
                            break;
                        }
                    }
                    if (completedLevel >= config.UnlockLevel && !exist) {
                        //达到等级需求且不存在于解锁列表中，发送解锁请求
                        HttpMessageSender.GetSender().SendUnlockSideWeapon(GameDataManager.getInstance().LoginPlayerInfo.OpenID, config.index);
                    }
                }
            }
        }

        /**
         * 检查是否能够更新
         */
        private CheckUpgrade() {
            let upgrade: boolean = false;
            let view = this.GetView();
            //主武器
            //3.0新需求 主武器升阶
            let mainWeapon = GameDataManager.getInstance().LoginPlayerInfo.MainWeaponInfo;
            let classUpFlag = false;
            //下一阶的配置
            let nextEvolutionConfig = ConfigManager.GetInstance().GetMainWeaponEvolutionConfig(mainWeapon.evolveLevel + 1);
            if (nextEvolutionConfig.ID == mainWeapon.evolveLevel + 1) {
                //有下一阶
                classUpFlag = mainWeapon.level >= nextEvolutionConfig.RequiredPowerLvl;
            } else {
                //无下一阶
                classUpFlag = false;
            }
            if (classUpFlag) {
                //本次是升阶
                //本地计算金币数量
                let costMoney = nextEvolutionConfig.RequiredGoldNumber;
                let mainEnough = costMoney <= GameDataManager.getInstance().LoginPlayerInfo.MoneyInfo.goldNum;
                Log.Debug("HomePageUI 主武器升阶检查结果", mainEnough);
                view.UI_Img_UpgradeArrow_Main.visible = mainEnough;
            } else {
                //本次是升级
                //本地计算金币数量
                let costMoney = GameDataUtil.Upgrade_Weapon_Main(GameDataManager.getInstance().LoginPlayerInfo.MainWeaponInfo.level);
                let mainEnough = GameDataUtil.Upgrade_Weapon_Main(mainWeapon.level) <= GameDataManager.getInstance().LoginPlayerInfo.MoneyInfo.goldNum;
                Log.Debug("HomePageUI 主武器升级检查结果", mainEnough);
                view.UI_Img_UpgradeArrow_Main.visible = mainEnough;
            }

            //副武器
            let curSideWeapon = GameDataManager.getInstance().LoginPlayerInfo.CurSideWeaponInfo;
            let subEnough = GameDataUtil.Upgrade_Weapon_Side(curSideWeapon.level) <= GameDataManager.getInstance().LoginPlayerInfo.MoneyInfo.goldNum;
            Log.Debug("HomePageUI 副武器升级检查结果", subEnough);
            Log.Debug("HomepageUI 副武器解锁检查结果", StorageManager.GetUnlockNewSideweapon());
            view.UI_Img_UpgradeArrow_Sub.visible = subEnough || StorageManager.GetUnlockNewSideweapon();

            //机体产能
            let spawnLvl = GameDataManager.getInstance().LoginPlayerInfo.SpawnLvl;
            let spawnEnough = GameDataUtil.Upgrade_Spawn(spawnLvl) <= GameDataManager.getInstance().LoginPlayerInfo.MoneyInfo.goldNum;
            Log.Debug("HomePageUI 产能升级检查结果", spawnEnough);
            view.UI_Img_UpgradeArrow_Money.visible = spawnEnough;

            //邀请列表
            //2019-7-16 10:07:24 好友列表有两个情况均会提示，一个是自己未绑定，一个是好友存在可领取的状态
            let inviteList = GameDataManager.getInstance().LoginPlayerInfo.InvitedList;
            let canVerify = GameDataManager.getInstance().LoginPlayerInfo.VerifyInfo.state == 0;
            let canGainInviteReward = false;
            for (var i = 0; i < inviteList.length; i++) {
                var element = inviteList[i];
                if (element.rewardGained == 0 || element.rewardGained == 2) {
                    //未领取邀请奖励，或未领取绑定奖励
                    canGainInviteReward = true;
                    break;
                }
            }

            Log.Debug("HomePageUI 邀请奖励可领取检查结果", canGainInviteReward || canVerify);
            view.UI_Img_UpgradeArrow_Invite.visible = canGainInviteReward || canVerify;

            //体力是否足够进入下一关
            view.UI_Img_PowerTxt_0.visible = GameDataManager.getInstance().LoginPlayerInfo.MoneyInfo.pointNum < 5;
            view.UI_Img_PowerTxt_1.visible = GameDataManager.getInstance().LoginPlayerInfo.MoneyInfo.pointNum >= 5;
        }


        private SetBtnSelectedState(btn: Laya.Button, selected: boolean) {
            btn.skin = selected ? this.btnSkin_Selected : this.btnSkin_Normal;
        }

    }

}