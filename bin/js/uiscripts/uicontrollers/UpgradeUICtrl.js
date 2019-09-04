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
        var UpgradeUICtrl = (function (_super) {
            __extends(UpgradeUICtrl, _super);
            // private readonly coinSkin = "resources/moneyinfo/img_big_coin.png";
            // private readonly graySkin = "resources/upgrade/img_gray_big.png";
            // private readonly whiteSkin = "resources/upgrade/img_white_big.png";
            function UpgradeUICtrl(view) {
                var _this = _super.call(this, view) || this;
                _this.switchFlag = 0;
                //副武器动画坐标
                _this.sideWeaponPosY_Top_2 = 0;
                _this.sideWeaponPosY_Top = 260;
                _this.sideWeaponPosY_Center = 613;
                _this.sideWeaponPosY_Bottom = 1020;
                _this.sideWeaponPosY_Bottom_2 = 1336;
                //副武器动画时间
                _this.sideWeaponAnimTime = 0.5;
                _this.rightBoxPosX_Start = -200;
                _this.rightBoxPosX_End = 0;
                _this.arrowPosX_Start = -260;
                _this.arrowPosX_End = 0;
                return _this;
            }
            UpgradeUICtrl.prototype.GetView = function () {
                return this.uiView;
            };
            /**
             * @override
             */
            UpgradeUICtrl.prototype.Init = function (parent, id) {
                var _this = this;
                _super.prototype.Init.call(this, parent, id);
                this.mediatorName = ui.UIID.UpgradeUIID.toString();
                //ui配置
                //this.uiConfig = new WindowConfigData();
                //this.uiConfig.uiOpenAnimType = UIAnim.PopOpen;
                //this.uiConfig.uiCloseAnimType = UIAnim.PopClose;
                //this.uiConfig.depth = 0;
                //添加舞台
                parent.addChild(this.uiView);
                this.uiView.zOrder = this.uiConfig.depth;
                this.RegisterEvent();
                var view = this.GetView();
                //自适应
                view.on(Laya.Event.RESIZE, this, function () {
                    _this.GetView().width = Laya.stage.width;
                    _this.GetView().height = Laya.stage.height;
                });
                //初始化相关
                //副武器定位
                this.subWeaponLocateBoxArray = new Array();
                for (var i = 0; i < view.UI_HBox_Location.numChildren; i++) {
                    var box = view.UI_HBox_Location.getChildAt(i);
                    this.subWeaponLocateBoxArray.push(box);
                }
                //池功能
                this.upgradeItemPool = new Array();
                //任务列表
                this.timeTaskArray = new Array();
                this.tweenTaskArray = new Array();
                this.subWeaponItemArray = new Array();
                this.testFloatTipGroupID = FloatTipAnimManager.Instance.CreateTipGroup(EnumFloatAnimType.UpgradeTip);
                this.floatTipGroup_L = FloatTipAnimManager.Instance.CreateTipGroup(EnumFloatAnimType.UpgradeTip);
                this.floatTipGroup_R = FloatTipAnimManager.Instance.CreateTipGroup(EnumFloatAnimType.UpgradeTip);
            };
            /**
             * @override
             */
            //ui动画执行前
            UpgradeUICtrl.prototype.BeforeUIOpen = function (context) {
                if (context === void 0) { context = null; }
                _super.prototype.BeforeUIOpen.call(this, context);
                //2019-7-5 17:35:54 打开面板前根据打开类型创建内容
                var param = context;
                if (param) {
                    this.InitUpgradeItem(param);
                }
            };
            /**
            * @override
            */
            //ui打开动画完成
            UpgradeUICtrl.prototype.OnUIOpened = function (context) {
                if (context === void 0) { context = null; }
                _super.prototype.OnUIOpened.call(this, context);
                //根据打开类型，发送消息
                switch (this.upgradeType) {
                    case EnumUpgradeUIType.Main: {
                        this.sendNotification(NotificationNames.HomepageUI_SetBottomButtonState, new HomepageBottomButtonState(2, true));
                        break;
                    }
                    case EnumUpgradeUIType.Sub: {
                        this.sendNotification(NotificationNames.HomepageUI_SetBottomButtonState, new HomepageBottomButtonState(3, true));
                        break;
                    }
                    case EnumUpgradeUIType.Money: {
                        this.sendNotification(NotificationNames.HomepageUI_SetBottomButtonState, new HomepageBottomButtonState(4, true));
                        break;
                    }
                }
            };
            /**
             * @override
             */
            //ui关闭动画完成
            UpgradeUICtrl.prototype.OnUIHide = function () {
                _super.prototype.OnUIHide.call(this);
                //根据打开类型，发送消息
                switch (this.upgradeType) {
                    case EnumUpgradeUIType.Main: {
                        this.sendNotification(NotificationNames.HomepageUI_SetBottomButtonState, new HomepageBottomButtonState(2, false));
                        break;
                    }
                    case EnumUpgradeUIType.Sub: {
                        this.sendNotification(NotificationNames.HomepageUI_SetBottomButtonState, new HomepageBottomButtonState(3, false));
                        break;
                    }
                    case EnumUpgradeUIType.Money: {
                        this.sendNotification(NotificationNames.HomepageUI_SetBottomButtonState, new HomepageBottomButtonState(4, false));
                        break;
                    }
                }
                if (this.upgradeAnimTask != -1) {
                    TimeManager.getInst().remove(this.upgradeAnimTask);
                }
                this.DeleteAllInfo();
            };
            /**
             * @override
             */
            UpgradeUICtrl.prototype.BeforeUIDestroy = function () {
                _super.prototype.BeforeUIDestroy.call(this);
                this.RemoveEvent();
            };
            /**
             * @override
             */
            UpgradeUICtrl.prototype.OnUIDestroy = function () {
                _super.prototype.OnUIDestroy.call(this);
            };
            UpgradeUICtrl.prototype.RegisterEvent = function () {
                Facade.getInstance().registerMediator(this);
                var view = this.GetView();
                view.UI_Btn_Cancel.on(Laya.Event.CLICK, this, this.OnUI_Btn_CancelClick);
                view.UI_Btn_UpgradeCost.on(Laya.Event.CLICK, this, this.OnUI_Btn_UpgradeCostClick);
            };
            UpgradeUICtrl.prototype.RemoveEvent = function () {
                Facade.getInstance().removeMediator(this.getMediatorName());
                var view = this.GetView();
                view.UI_Btn_Cancel.off(Laya.Event.CLICK, this, this.OnUI_Btn_CancelClick);
                view.UI_Btn_UpgradeCost.off(Laya.Event.CLICK, this, this.OnUI_Btn_UpgradeCostClick);
            };
            UpgradeUICtrl.prototype.OnUI_Btn_CancelClick = function () {
                //关闭面板
                this.sendNotification(NotificationNames.HIDEUI, ui.UIID.UpgradeUIID);
            };
            /**
             * 升级主武器 -mb
             */
            UpgradeUICtrl.prototype.OnUI_Btn_Upgrade_MainClick = function () {
                //3.0新需求 主武器升阶
                var mainWeapon = GameDataManager.getInstance().LoginPlayerInfo.MainWeaponInfo; //主武器
                var classUpFlag = false; //是否有下一阶
                //下一阶的配置
                var nextEvolutionConfig = ConfigManager.GetInstance().GetMainWeaponEvolutionConfig(mainWeapon.evolveLevel + 1); //下一阶的配置
                if (nextEvolutionConfig.ID == mainWeapon.evolveLevel + 1) {
                    //有下一阶
                    classUpFlag = mainWeapon.level >= nextEvolutionConfig.RequiredPowerLvl;
                }
                else {
                    //无下一阶
                    classUpFlag = false;
                }
                if (classUpFlag) {
                    //本次是升阶
                    //本地计算金币数量
                    var costMoney = nextEvolutionConfig.RequiredGoldNumber;
                    var mainEnough = costMoney <= GameDataManager.getInstance().LoginPlayerInfo.MoneyInfo.goldNum;
                    if (mainEnough) {
                        //升阶主武器
                        //关闭按钮响应，避免连续点击
                        // this.GetView().UI_Btn_UpgradeCost.mouseEnabled = false;
                        this.GetView().UI_Btn_UpgradeCost.disabled = true;
                        // 显示动画
                        // Facade.instance.sendNotification(NotificationNames.UpgradeUI_RefreshMainWeaponInfo, 1);
                        // console.log("客户端金币：" + GameDataManager.getInstance().LoginPlayerInfo.MoneyInfo.goldNum);
                        // Facade.instance.sendNotification(NotificationNames.UpgradeUI_RefreshMainWeaponInfo);
                        HttpMessageSender.GetSender().SendWeaponEvolution(GameDataManager.getInstance().LoginPlayerInfo.OpenID, GameDataManager.getInstance().LoginPlayerInfo.MainWeaponInfo.id, GameDataManager.getInstance().LoginPlayerInfo.MainWeaponInfo.evolveLevel, costMoney);
                    }
                    else {
                        //打开兑换面板
                        this.sendNotification(NotificationNames.OPENUIWITHPARAM, new ui.ExchangeUIParam(EnumDiamondExchangeType.Coin));
                    }
                }
                else {
                    //本次是升级
                    //本地计算金币数量
                    var costMoney = GameDataUtil.Upgrade_Weapon_Main(GameDataManager.getInstance().LoginPlayerInfo.MainWeaponInfo.level);
                    var mainEnough = costMoney <= GameDataManager.getInstance().LoginPlayerInfo.MoneyInfo.goldNum;
                    if (mainEnough) {
                        //升级主武器
                        //关闭按钮响应，避免连续点击
                        // this.GetView().UI_Btn_UpgradeCost.mouseEnabled = false;
                        this.GetView().UI_Btn_UpgradeCost.disabled = true;
                        // Facade.instance.sendNotification(NotificationNames.UpgradeUI_RefreshMainWeaponInfo, 1);
                        // Facade.instance.sendNotification(NotificationNames.UpgradeUI_RefreshMainWeaponInfo);
                        HttpMessageSender.GetSender().SendUpgradeWeaopnLvl(GameDataManager.getInstance().LoginPlayerInfo.OpenID, GameDataManager.getInstance().LoginPlayerInfo.MainWeaponInfo.id, GameDataManager.getInstance().LoginPlayerInfo.MainWeaponInfo.level, costMoney);
                    }
                    else {
                        //打开兑换面板
                        this.sendNotification(NotificationNames.OPENUIWITHPARAM, new ui.ExchangeUIParam(EnumDiamondExchangeType.Coin));
                    }
                }
                //播放音效
                AudioManager.GetInstance().PlaySoundByConfigID(EnumSoundID.sound_function_touch_02);
            };
            /**
             * 升级副武器 -mb
             */
            UpgradeUICtrl.prototype.OnUI_Btn_Upgrade_SubClick = function () {
                //本地计算金币数量
                var costMoney = GameDataUtil.Upgrade_Weapon_Side(GameDataManager.getInstance().LoginPlayerInfo.CurSideWeaponInfo.level);
                var subEnough = costMoney <= GameDataManager.getInstance().LoginPlayerInfo.MoneyInfo.goldNum;
                // console.log(costMoney + "|||||需要花费的金币");
                // console.log(GameDataManager.getInstance().LoginPlayerInfo.MoneyInfo.goldNum + "|||||账户中有多少");
                // console.log((GameDataManager.getInstance().LoginPlayerInfo.MoneyInfo.goldNum - costMoney) +akc "|||||剩下的金币");
                if (subEnough) {
                    //升级副武器
                    //关闭按钮响应，避免连续点击
                    // this.GetView().UI_Btn_UpgradeCost.mouseEnabled = false;
                    this.GetView().UI_Btn_UpgradeCost.disabled = true;
                    // Facade.instance.sendNotification(NotificationNames.UpgradeUI_RefreshSideWeaponInfo, 1);//绕过服务器
                    HttpMessageSender.GetSender().SendUpgradeWeaopnLvl(GameDataManager.getInstance().LoginPlayerInfo.OpenID, GameDataManager.getInstance().LoginPlayerInfo.CurSideWeaponInfo.id, GameDataManager.getInstance().LoginPlayerInfo.CurSideWeaponInfo.level, costMoney);
                }
                else {
                    //打开兑换面板
                    this.sendNotification(NotificationNames.OPENUIWITHPARAM, new ui.ExchangeUIParam(EnumDiamondExchangeType.Coin));
                }
                //播放音效
                AudioManager.GetInstance().PlaySoundByConfigID(EnumSoundID.sound_function_touch_02);
            };
            /**
             * 升级产能
             */
            UpgradeUICtrl.prototype.OnUI_Btn_Upgrade_PlaneClick = function () {
                //本地计算金币数量
                var spawnLvl = GameDataManager.getInstance().LoginPlayerInfo.SpawnLvl;
                var costMoney = GameDataUtil.Upgrade_Spawn(spawnLvl);
                var spawnEnough = costMoney <= GameDataManager.getInstance().LoginPlayerInfo.MoneyInfo.goldNum;
                if (spawnEnough) {
                    //本地计算新的金币与钻石产能等级
                    var newGoldLvl = GameDataUtil.Spawn_Coin_Lvl(spawnLvl + 1);
                    var newDiamondLvl = GameDataUtil.Spawn_Diamond_Lvl(spawnLvl + 1);
                    //升级产能
                    //关闭按钮响应，避免连续点击
                    // this.GetView().UI_Btn_UpgradeCost.mouseEnabled = false;
                    this.GetView().UI_Btn_UpgradeCost.disabled = true;
                    // Facade.instance.sendNotification(NotificationNames.UpgradeUI_RefreshSpawnInfo, 1);
                    HttpMessageSender.GetSender().SendUpgradeSpawnLvl(GameDataManager.getInstance().LoginPlayerInfo.OpenID, GameDataManager.getInstance().LoginPlayerInfo.SpawnLvl, costMoney, newGoldLvl, newDiamondLvl);
                }
                else {
                    //打开兑换面板
                    this.sendNotification(NotificationNames.OPENUIWITHPARAM, new ui.ExchangeUIParam(EnumDiamondExchangeType.Coin));
                }
                //播放音效
                AudioManager.GetInstance().PlaySoundByConfigID(EnumSoundID.sound_function_touch_02);
            };
            UpgradeUICtrl.prototype.OnUI_Btn_UpgradeCostClick = function () {
                //升级的统一按钮
                switch (this.upgradeType) {
                    case EnumUpgradeUIType.Main: {
                        this.OnUI_Btn_Upgrade_MainClick();
                        break;
                    }
                    case EnumUpgradeUIType.Sub: {
                        this.OnUI_Btn_Upgrade_SubClick();
                        break;
                    }
                    case EnumUpgradeUIType.Money: {
                        this.OnUI_Btn_Upgrade_PlaneClick();
                        break;
                    }
                    default:
                        break;
                }
            };
            /**
             * @override
             */
            UpgradeUICtrl.prototype.listNotificationInterests = function () {
                return [
                    NotificationNames.UpgradeUI_RefreshMainWeaponInfo,
                    NotificationNames.UpgradeUI_RefreshSideWeaponInfo,
                    NotificationNames.UpgradeUI_RefreshSpawnInfo,
                    NotificationNames.UpgradeUI_EquipSideWeapon,
                    NotificationNames.UI_RefreshMoneyInfo,
                    NotificationNames.UpgradeUI_RefreshWeaponEvolutionInfo,
                    NotificationNames.UpgradeUI_ElementTweenTo
                ];
            };
            /**
            * @override
            */
            UpgradeUICtrl.prototype.handleNotification = function (note) {
                var view = this.GetView();
                switch (note.getName()) {
                    case NotificationNames.UpgradeUI_RefreshMainWeaponInfo: {
                        //升级
                        //刷新主武器
                        this.RefreshMainWeaponInfo();
                        //金币
                        this.RefreshCoinInfo();
                        var result = note.getBody();
                        if (result == 1) {
                            //升级成功，播放音效
                            AudioManager.GetInstance().PlaySoundByConfigID(EnumSoundID.sound_function_upgrade_01);
                            //播放升级动画
                            // this.PlayUpgradeEffect()
                            this.PlayUpgradeEffect_Left();
                            //2019-7-8 21:16:48 飘字
                            FloatTipAnimManager.Instance.AddTip(this.floatTipGroup_L, "火力", new Vec2(0, 0), view.UI_Box_FloatTip_L);
                        }
                        //打开按键
                        this.GetView().UI_Btn_UpgradeCost.mouseEnabled = true;
                        this.GetView().UI_Btn_UpgradeCost.disabled = false;
                        break;
                    }
                    case NotificationNames.UpgradeUI_RefreshSideWeaponInfo: {
                        //升级
                        var result = note.getBody();
                        //刷新副武器
                        this.RefreshSideWeaponInfo();
                        //金币
                        this.RefreshCoinInfo();
                        //刷新副武器信息可能是切换装备，也可能是升级，因此此处若发现空值不必惊慌
                        if (result == 1) {
                            //升级成功，播放音效
                            AudioManager.GetInstance().PlaySoundByConfigID(EnumSoundID.sound_function_upgrade_01);
                            //播放升级动画
                            // this.PlayUpgradeEffect()
                            this.PlayUpgradeEffect_Left();
                            //2019-7-8 21:16:48 飘字
                            FloatTipAnimManager.Instance.AddTip(this.floatTipGroup_L, "强度", new Vec2(0, 0), view.UI_Box_FloatTip_L);
                        }
                        //打开按键
                        // this.GetView().UI_Btn_UpgradeCost.mouseEnabled = true;
                        this.GetView().UI_Btn_UpgradeCost.disabled = false;
                        break;
                    }
                    case NotificationNames.UpgradeUI_EquipSideWeapon: {
                        //刷新副武器
                        this.RefreshSideWeaponInfo();
                        this.SwitchSideWeapon();
                        break;
                    }
                    case NotificationNames.UpgradeUI_RefreshSpawnInfo: {
                        //刷新产能
                        this.RefreshSpawnInfo();
                        //金币
                        this.RefreshCoinInfo();
                        var result = note.getBody();
                        if (result == 1) {
                            //升级成功，播放音效
                            AudioManager.GetInstance().PlaySoundByConfigID(EnumSoundID.sound_function_upgrade_01);
                            //播放升级动画
                            // this.PlayUpgradeEffect()
                            this.PlayUpgradeEffect_Left();
                            //2019-7-8 21:16:48 飘字
                            FloatTipAnimManager.Instance.AddTip(this.floatTipGroup_L, "金币", new Vec2(0, 0), view.UI_Box_FloatTip_L);
                        }
                        //打开按键
                        this.GetView().UI_Btn_UpgradeCost.mouseEnabled = true;
                        this.GetView().UI_Btn_UpgradeCost.disabled = false;
                        break;
                    }
                    case NotificationNames.UI_RefreshMoneyInfo: {
                        //金币
                        this.RefreshCoinInfo();
                        break;
                    }
                    case NotificationNames.UpgradeUI_RefreshWeaponEvolutionInfo: {
                        var view_1 = this.GetView();
                        //武器升阶
                        var message = note.getBody();
                        this.HandleWeaponEvolution(message);
                        break;
                    }
                    case NotificationNames.UpgradeUI_ElementTweenTo: {
                        //跳跃
                        this.elementTweenTo(note.getBody());
                        break;
                    }
                }
            };
            //刷新主武器
            UpgradeUICtrl.prototype.RefreshMainWeaponInfo = function () {
                var view = this.GetView();
                //1.寻找当前的主武器
                var mainWeapon = GameDataManager.getInstance().LoginPlayerInfo.MainWeaponInfo;
                //2019-7-8 14:13:42 3.0新需求
                var curEvolutionConfig = ConfigManager.GetInstance().GetMainWeaponEvolutionConfig(mainWeapon.evolveLevel);
                //加载当前内容
                if (!this.leftUpgradeItem) {
                    this.leftUpgradeItem = this.CreateUpgradeItem();
                    view.UI_Box_Left.addChild(this.leftUpgradeItem);
                    this.leftUpgradeItem.pos(0, 0);
                }
                this.leftUpgradeItem.InitItem(EnumUpgradeUIType.Main, curEvolutionConfig.ID);
                //赋值面板内容并设置宽度
                this.SetTextValueAndWidth(view.UI_Txt_UpgradeInfo_Main, mainWeapon.level.toString());
                //判断当前是否需要切换为升阶面板
                var classUpFlag = false;
                //下一阶的配置
                if (!ConfigManager.GetInstance().IsMaxMainWeaponEvolutionLevel(mainWeapon.evolveLevel)) {
                    var nextEvolutionConfig = ConfigManager.GetInstance().GetMainWeaponEvolutionConfig(mainWeapon.evolveLevel + 1);
                    //有下一阶
                    classUpFlag = mainWeapon.level >= nextEvolutionConfig.RequiredPowerLvl;
                    //加载下一阶的内容
                    if (!this.rightUpgradeItem) {
                        this.rightUpgradeItem = this.CreateUpgradeItem();
                        view.UI_Box_Right.addChild(this.rightUpgradeItem);
                        this.rightUpgradeItem.pos(0, 0);
                    }
                    this.rightUpgradeItem.InitItem(EnumUpgradeUIType.Main, nextEvolutionConfig.ID);
                }
                else {
                    //无下一阶
                    classUpFlag = false;
                }
                //根据当前是否是升阶状态，决定布局
                view.UI_Img_Arrow.visible = classUpFlag;
                view.UI_Box_Right.visible = classUpFlag;
                view.UI_Box_UpgradeInfo_Main.visible = !classUpFlag;
                if (classUpFlag) {
                    view.UI_Box_Right.left = this.rightBoxPosX_Start;
                    view.UI_Img_Arrow.left = this.arrowPosX_Start;
                    this.rightBoxAnimTask = Tween2DUtil.to({
                        node: view.UI_Box_Right,
                        duration: ConstDefine.UpgradeUI_MainWeapon_RightBoxAppearTime,
                        delay: ConstDefine.Common_PanelScaleUpTime + ConstDefine.UpgradeUI_MainWeapon_ArrowAppearTime,
                        left: this.rightBoxPosX_End
                    });
                    this.arrowAnimTask = Tween2DUtil.to({
                        node: view.UI_Img_Arrow,
                        duration: ConstDefine.UpgradeUI_MainWeapon_ArrowAppearTime,
                        delay: ConstDefine.Common_PanelScaleUpTime,
                        left: this.arrowPosX_End
                    });
                    // this.tweenTaskArray.push(rightAnimTask, arrowAnimTask);
                    //升阶消耗金币 = 阶数 * 系数（已经计算完毕）
                    var nextEvolutionConfig = ConfigManager.GetInstance().GetMainWeaponEvolutionConfig(mainWeapon.evolveLevel + 1);
                    view.UI_Txt_UpgradeCost.text = GameDataUtil.NumberToString(nextEvolutionConfig.RequiredGoldNumber);
                }
                else {
                    //升级消耗金币
                    view.UI_Txt_UpgradeCost.text = GameDataUtil.NumberToString(FormulaUtil.CalcByConfig(EnumFormulaType.MainWeaponUpgradeCost, mainWeapon.level));
                }
            };
            //刷新副武器
            UpgradeUICtrl.prototype.RefreshSideWeaponInfo = function () {
                var view = this.GetView();
                var curSideWeapon = GameDataManager.getInstance().LoginPlayerInfo.CurSideWeaponInfo;
                //2019-7-8 14:13:42 3.0新需求
                //刷新各sideweapon的内容显示
                for (var i = 0; i < 6; i++) {
                    var item = this.subWeaponItemArray[i];
                    if (!item) {
                        console.error("错误信息：没有item UpgradeUICtrl");
                        return;
                    }
                    var sideWeaponID = i + 2;
                    var unlocked = GameDataUtil.CheckSideWeaponIDUnlocked(sideWeaponID);
                    item.gray = !unlocked;
                    //需要显示的内容
                    //根据ID是否与当前使用中的副武器ID相同，判断是否在主面板上
                    item.InitItem(EnumUpgradeUIType.Sub, sideWeaponID, sideWeaponID == curSideWeapon.id);
                }
                //副武器显示
                this.SetTextValueAndWidth(view.UI_Txt_UpgradeInfo_Sub, curSideWeapon.level.toString());
                //刷新副武器的升级消耗
                view.UI_Txt_UpgradeCost.text = GameDataUtil.NumberToString(GameDataUtil.Upgrade_Weapon_Side(curSideWeapon.level));
            };
            //刷新产能
            UpgradeUICtrl.prototype.RefreshSpawnInfo = function () {
                var view = this.GetView();
                //1.当前产能等级
                var spawnLvl = GameDataManager.getInstance().LoginPlayerInfo.SpawnLvl;
                //2019-7-8 14:13:42 3.0新需求
                //加载当前内容
                if (!this.leftUpgradeItem) {
                    this.leftUpgradeItem = this.CreateUpgradeItem();
                    view.UI_Box_Left.addChild(this.leftUpgradeItem);
                    this.leftUpgradeItem.pos(0, 0);
                }
                this.leftUpgradeItem.InitItem(EnumUpgradeUIType.Money);
                var spawnStr = FormulaUtil.CalcByConfig(EnumFormulaType.GoldUpgrade, spawnLvl);
                //文字内容
                this.SetTextValueAndWidth(view.UI_Txt_UpgradeInfo_Spawn, spawnStr.toString());
                //产能消耗
                view.UI_Txt_UpgradeCost.text = GameDataUtil.NumberToString(GameDataUtil.Upgrade_Spawn(spawnLvl));
            };
            //刷新金币信息
            UpgradeUICtrl.prototype.RefreshCoinInfo = function () {
                var view = this.GetView();
                switch (this.upgradeType) {
                    //主武器
                    case EnumUpgradeUIType.Main: {
                        //1.寻找当前的主武器
                        var mainWeapon = GameDataManager.getInstance().LoginPlayerInfo.MainWeaponInfo;
                        //需要根据当前是否是升阶，分别判断
                        var classUpFlag = false;
                        var nextEvolutionConfig = null;
                        //下一阶的配置
                        if (!ConfigManager.GetInstance().IsMaxMainWeaponEvolutionLevel(mainWeapon.evolveLevel)) {
                            nextEvolutionConfig = ConfigManager.GetInstance().GetMainWeaponEvolutionConfig(mainWeapon.evolveLevel + 1);
                            //有下一阶
                            classUpFlag = mainWeapon.level >= nextEvolutionConfig.RequiredPowerLvl;
                        }
                        else {
                            //无下一阶
                            classUpFlag = false;
                        }
                        if (classUpFlag) {
                            var mainEnough = nextEvolutionConfig.RequiredGoldNumber <= GameDataManager.getInstance().LoginPlayerInfo.MoneyInfo.goldNum;
                            //不再变灰，文字变红
                            view.UI_Txt_UpgradeCost.color = mainEnough ? "#FFFFFF" : "#FF0000";
                        }
                        else {
                            var mainEnough = GameDataUtil.Upgrade_Weapon_Main(mainWeapon.level) <= GameDataManager.getInstance().LoginPlayerInfo.MoneyInfo.goldNum;
                            //不再变灰，文字变红
                            view.UI_Txt_UpgradeCost.color = mainEnough ? "#FFFFFF" : "#FF0000";
                        }
                        break;
                    }
                    //副武器
                    case EnumUpgradeUIType.Sub: {
                        var curSideWeaponLevel = GameDataManager.getInstance().GetCurSideWeaponLvl();
                        //2.根据当前金币数量，决定是否能够点击升级按钮
                        var subEnough = GameDataUtil.Upgrade_Weapon_Side(curSideWeaponLevel) <= GameDataManager.getInstance().LoginPlayerInfo.MoneyInfo.goldNum;
                        //不再变灰，文字变红
                        view.UI_Txt_UpgradeCost.color = subEnough ? "#FFFFFF" : "#FF0000";
                        break;
                    }
                    //产能
                    case EnumUpgradeUIType.Money: {
                        //1.当前产能等级
                        var spawnLvl = GameDataManager.getInstance().LoginPlayerInfo.SpawnLvl;
                        //3.根据当前金币数量，决定是否能够点击升级按钮
                        var spawnEnough = GameDataUtil.Upgrade_Spawn(spawnLvl) <= GameDataManager.getInstance().LoginPlayerInfo.MoneyInfo.goldNum;
                        //不再变灰，文字变红
                        view.UI_Txt_UpgradeCost.color = spawnEnough ? "#FFFFFF" : "#FF0000";
                        break;
                    }
                    default:
                        break;
                }
            };
            //初始化副武器信息
            UpgradeUICtrl.prototype.InitSideWeaponImage = function () {
                /**
                 * 副武器的显示需求————
                 * 中间显示当前装备的副武器，上方显示上一个，下方显示下一个
                 * 每次切换时，播放滚动动画
                 */
                var view = this.GetView();
                //2019-7-8 16:42:18 3.0新需求
                for (var i = 0; i < 6; i++) {
                    var sideWeaponID = i + 2;
                    var item = this.CreateUpgradeItem();
                    var parentBox = this.GetSiedWeaponBox(sideWeaponID);
                    parentBox.addChild(item);
                    item.pos(0, 0);
                    //根据是否解锁，切换背景图片(变灰)
                    // let unlocked = GameDataUtil.CheckSideWeaponIDUnlocked(sideWeaponID);
                    // if (sideWeaponID == GameDataManager.getInstance().LoginPlayerInfo.CurSideWeaponID) {
                    //     //是当前副武器，不做变化
                    // } else {
                    //     let img = parentBox.getChildAt(0) as Laya.Image;
                    //     img.skin = unlocked ? this.graySkin : this.whiteSkin;
                    // }
                    //保存引用
                    this.subWeaponItemArray.push(item);
                }
            };
            //初始化UI 3.0功能需求
            UpgradeUICtrl.prototype.InitUpgradeItem = function (param) {
                var _this = this;
                //保存本次更新类型
                this.upgradeType = param.upgradeType;
                var view = this.GetView();
                //面板打开动画
                //主面板
                view.UI_Box_MainPanel.scale(0, 0, true);
                view.UI_Box_MainPanel.bottom = -50;
                view.UI_Box_MainPanel.alpha = 0;
                this.mainPanelTweenTask = Tween2DUtil.to({
                    node: view.UI_Box_MainPanel,
                    duration: ConstDefine.Common_PanelScaleUpTime,
                    scalex: ConstDefine.Common_PanelScaleUpMax,
                    scaley: ConstDefine.Common_PanelScaleUpMax,
                    bottom: 0,
                    alpha: 1,
                    onComplete: cbhandler.gen_handler(function () {
                        _this.mainPanelTweenTask = Tween2DUtil.to({
                            node: view.UI_Box_MainPanel,
                            duration: ConstDefine.Common_PanelScaleBounceTime,
                            scalex: 1,
                            scaley: 1,
                            onComplete: cbhandler.gen_handler(function () {
                                _this.mainPanelTweenTask = -1;
                            }, _this)
                        });
                    }, this)
                });
                //副面板
                view.UI_Box_SubPanel.visible = this.upgradeType == EnumUpgradeUIType.Sub;
                view.UI_Box_SubPanel.scale(0, 0, true);
                view.UI_Box_SubPanel.alpha = 0;
                if (this.upgradeType == EnumUpgradeUIType.Sub) {
                    //额外动画
                    this.subPanelTweenTask = Tween2DUtil.to({
                        node: view.UI_Box_SubPanel,
                        duration: ConstDefine.Common_PanelScaleUpTime,
                        delay: ConstDefine.Common_PanelScaleUpTime + ConstDefine.Common_PanelScaleBounceTime,
                        scalex: ConstDefine.Common_PanelScaleUpMax,
                        scaley: ConstDefine.Common_PanelScaleUpMax,
                        alpha: 1,
                        onComplete: cbhandler.gen_handler(function () {
                            _this.subPanelTweenTask = Tween2DUtil.to({
                                node: view.UI_Box_SubPanel,
                                duration: ConstDefine.Common_PanelScaleBounceTime,
                                scalex: 1,
                                scaley: 1,
                                onComplete: cbhandler.gen_handler(function () {
                                    _this.subPanelTweenTask = -1;
                                }, _this)
                            });
                        }, this)
                    });
                }
                //附加内容
                view.UI_Img_Arrow.visible = false;
                view.UI_Box_Right.visible = false;
                view.UI_Anim_Upgrade_Left.visible = false;
                view.UI_Anim_Upgrade_Right.visible = false;
                view.UI_Btn_UpgradeCost.mouseEnabled = true;
                view.UI_Btn_UpgradeCost.gray = false;
                //2019-8-9 10:19:46 根据打开类型，设置布局
                view.UI_Box_UpgradeInfo_Main.visible = this.upgradeType == EnumUpgradeUIType.Main;
                view.UI_Box_UpgradeInfo_Sub.visible = this.upgradeType == EnumUpgradeUIType.Sub;
                view.UI_Box_UpgradeInfo_Money.visible = this.upgradeType == EnumUpgradeUIType.Money;
                //根据类型进行初始化操作
                switch (this.upgradeType) {
                    case EnumUpgradeUIType.Main: {
                        //主武器升级，需要用到LR两个数据
                        this.RefreshMainWeaponInfo();
                        break;
                    }
                    case EnumUpgradeUIType.Sub: {
                        //副武器升级，仅需要用到数组
                        //打开时需要额外创建一下内容
                        this.InitSideWeaponImage();
                        this.RefreshSideWeaponInfo();
                        break;
                    }
                    case EnumUpgradeUIType.Money: {
                        //产能升级，需要用到L
                        this.RefreshSpawnInfo();
                        break;
                    }
                    default:
                        break;
                }
                //刷新金币信息
                this.RefreshCoinInfo();
            };
            //关闭面板，删除所有信息
            UpgradeUICtrl.prototype.DeleteAllInfo = function () {
                //清空所有的item内容
                //主
                if (this.mainPanelTweenTask != -1) {
                    Tween2DUtil.kill(this.mainPanelTweenTask);
                    this.mainPanelTweenTask = -1;
                }
                //副
                if (this.subPanelTweenTask != -1) {
                    Tween2DUtil.kill(this.subPanelTweenTask);
                    this.subPanelTweenTask = -1;
                }
                //副武器数组
                for (var i = 0; i < this.subWeaponItemArray.length; i++) {
                    this.DeleteUpgradeItem(this.subWeaponItemArray[i]);
                }
                this.subWeaponItemArray = new Array();
                //L
                if (this.leftUpgradeItem) {
                    this.DeleteUpgradeItem(this.leftUpgradeItem);
                    this.leftUpgradeItem = null;
                }
                //R
                if (this.rightUpgradeItem) {
                    this.DeleteUpgradeItem(this.rightUpgradeItem);
                    this.rightUpgradeItem = null;
                }
                //时间与动画task
                for (var i = 0; i < this.timeTaskArray.length; i++) {
                    var element = this.timeTaskArray[i];
                    TimeManager.getInst().remove(element);
                }
                this.timeTaskArray = new Array();
                for (var i = 0; i < this.tweenTaskArray.length; i++) {
                    var element = this.tweenTaskArray[i];
                    TimeManager.getInst().remove(element);
                }
                this.tweenTaskArray = new Array();
                if (this.upgradeAnimTask_L != -1) {
                    TimeManager.getInst().remove(this.upgradeAnimTask_L);
                    this.upgradeAnimTask_L = -1;
                }
                if (this.upgradeAnimTask_R != -1) {
                    TimeManager.getInst().remove(this.upgradeAnimTask_R);
                    this.upgradeAnimTask_R = -1;
                }
                if (this.rightBoxAnimTask != -1) {
                    Tween2DUtil.kill(this.rightBoxAnimTask);
                    this.rightBoxAnimTask = -1;
                }
                if (this.arrowAnimTask != -1) {
                    Tween2DUtil.kill(this.arrowAnimTask);
                    this.arrowAnimTask = -1;
                }
                //飘字特效
                FloatTipAnimManager.Instance.DeleteAllItemByGroupID(this.floatTipGroup_L);
                FloatTipAnimManager.Instance.DeleteAllItemByGroupID(this.floatTipGroup_R);
            };
            //获取副武器对应容器
            UpgradeUICtrl.prototype.GetSiedWeaponBox = function (sideWeaponID) {
                //根据传入的副武器id，寻找当前所在位置的box
                var view = this.GetView();
                var curSideweaponID = GameDataManager.getInstance().LoginPlayerInfo.CurSideWeaponID;
                if (sideWeaponID == curSideweaponID) {
                    return view.UI_Box_Left;
                }
                else {
                    //按照对应的id找到对应的索引，获取对应的box
                    var boxIndex = -1;
                    for (var i = 0; i < 6; i++) {
                        if (i + 2 != curSideweaponID) {
                            boxIndex++;
                        }
                        if (i + 2 == sideWeaponID) {
                            return this.subWeaponLocateBoxArray[boxIndex];
                        }
                    }
                    //若未找到，则抛出错误，需要检查代码
                    Log.Error("UpgradeUI GetSiedWeaponBox 查找错误，请检查代码。副武器ID：" + sideWeaponID);
                    return null;
                }
            };
            //创建item（池功能）
            UpgradeUICtrl.prototype.CreateUpgradeItem = function () {
                var item = this.upgradeItemPool.pop();
                if (item) {
                    return item;
                }
                else {
                    return new UpgradeItem();
                }
            };
            //删除item（池功能）
            UpgradeUICtrl.prototype.DeleteUpgradeItem = function (item) {
                if (item) {
                    item.removeSelf();
                    this.upgradeItemPool.push(item);
                }
            };
            //切换副武器动画
            UpgradeUICtrl.prototype.SwitchSideWeapon = function () {
                var view = this.GetView();
                //2019-7-8 20:16:54 3.0新需求
                for (var i = 0; i < this.subWeaponItemArray.length; i++) {
                    var element = this.subWeaponItemArray[i];
                    //获取对应的父容器
                    var parent_1 = this.GetSiedWeaponBox(element.sideWeaponID);
                    if (element.parent != parent_1) {
                        //设置父子关系
                        element.scaleX = 1;
                        element.scaleY = 1;
                        // element.removeSelf();
                        var aimPos = CommonUtil2D.GetPosUnderTargetObj(element, parent_1);
                        parent_1.addChild(element);
                        element.pos(aimPos.x, aimPos.y);
                        //动画
                        var task = Tween2DUtil.to({
                            node: element,
                            duration: ConstDefine.UpgradeUI_SubWeapon_SwitchTime,
                            x: 0,
                            y: 0
                        });
                        this.tweenTaskArray.push(task);
                    }
                }
            };
            /**
             * 飞机点击 反馈
             */
            UpgradeUICtrl.prototype.elementTweenTo = function (sideWeaponID) {
                var view = this.GetView();
                var _loop_1 = function (i) {
                    var element = this_1.subWeaponItemArray[i];
                    //获取对应的父容器
                    var parent_2 = this_1.GetSiedWeaponBox(sideWeaponID);
                    if (element.parent == parent_2) {
                        //获取对应的父容器
                        // console.log("变大变小");
                        AudioManager.GetInstance().PlaySoundByConfigID(EnumSoundID.sound_function_touch_03);
                        Laya.Tween.to(element, { "scaleX": 1.1, "scaleY": 1.1 }, 125, null, Laya.Handler.create(this_1, function () {
                            Laya.Tween.to(element, { "scaleX": 1, "scaleY": 1 }, 125);
                        }));
                    }
                };
                var this_1 = this;
                //2019-7-8 20:16:54 3.0新需求
                for (var i = 0; i < this.subWeaponItemArray.length; i++) {
                    _loop_1(i);
                }
            };
            UpgradeUICtrl.prototype.HandleWeaponEvolution = function (message) {
                var _this = this;
                var view = this.GetView();
                if (message.result == 1) {
                    //升阶成功
                    if (message.weaponID == 1) {
                        //主武器
                        // //2019-7-9 14:38:35 为避免动画过程中直接点击升级按钮，导致特效错位，此处临时将物体放置在目标位置，并清除动画效果
                        if (this.rightBoxAnimTask != -1) {
                            Tween2DUtil.kill(this.rightBoxAnimTask);
                            this.rightBoxAnimTask = -1;
                        }
                        if (this.arrowAnimTask != -1) {
                            Tween2DUtil.kill(this.arrowAnimTask);
                            this.arrowAnimTask = -1;
                        }
                        view.UI_Img_Arrow.left = this.arrowPosX_End;
                        view.UI_Box_Right.left = this.rightBoxPosX_End;
                        //播放升阶动画
                        // this.PlayUpgradeEffect()
                        this.PlayUpgradeEffect_Right();
                        //2019-7-8 21:16:48 飘字
                        FloatTipAnimManager.Instance.AddTip(this.floatTipGroup_R, "进阶成功", new Vec2(0, 0), view.UI_Box_FloatTip_R, false);
                        //按钮变灰
                        view.UI_Btn_UpgradeCost.gray = true;
                        //3秒钟后播放切换动画
                        var timeTask1 = TimeManager.getInst().once(ConstDefine.UpgradeUI_MainWeapon_EvolutionPauseTime, cbhandler.gen_handler(function () {
                            //金币
                            _this.RefreshCoinInfo();
                            //切换引用
                            _this.DeleteUpgradeItem(_this.leftUpgradeItem);
                            _this.leftUpgradeItem = _this.rightUpgradeItem;
                            _this.rightUpgradeItem = null;
                            //动画，右侧面板平移到左侧
                            var aimPos = CommonUtil2D.GetPosUnderTargetObj(_this.leftUpgradeItem, view.UI_Box_Left);
                            view.UI_Box_Left.addChild(_this.leftUpgradeItem);
                            _this.leftUpgradeItem.pos(aimPos.x, aimPos.y);
                            //隐藏箭头和右侧框
                            view.UI_Img_Arrow.visible = false;
                            view.UI_Box_Right.visible = false;
                            //播放动画
                            var animTask = Tween2DUtil.to({
                                node: _this.leftUpgradeItem,
                                duration: ConstDefine.UpgradeUI_MainWeapon_EvolutionEndTime,
                                x: 0,
                                y: 0,
                                onComplete: cbhandler.gen_handler(function () {
                                    //刷新主武器
                                    _this.RefreshMainWeaponInfo();
                                    //打开按键
                                    view.UI_Btn_UpgradeCost.mouseEnabled = true;
                                    //按钮变灰
                                    view.UI_Btn_UpgradeCost.gray = false;
                                }, _this)
                            });
                        }, this));
                        this.timeTaskArray.push(timeTask1);
                    }
                    else {
                    }
                    //升阶成功，播放音效
                    AudioManager.GetInstance().PlaySoundByConfigID(EnumSoundID.sound_function_upgrade_01);
                }
            };
            //播放左侧特效
            UpgradeUICtrl.prototype.PlayUpgradeEffect_Left = function () {
                var _this = this;
                var view = this.GetView();
                view.UI_Anim_Upgrade_Left.visible = true;
                view.UI_Anim_Upgrade_Left.play(0, false);
                if (this.upgradeAnimTask_L != -1) {
                    TimeManager.getInst().remove(this.upgradeAnimTask_L);
                }
                this.upgradeAnimTask_L = TimeManager.getInst().once(ConstDefine.UpgradeUI_UpgradeEffectTime_Left, cbhandler.gen_handler(function () {
                    view.UI_Anim_Upgrade_Left.visible = false;
                    _this.upgradeAnimTask_L = -1;
                }, this));
            };
            //播放右侧特效
            UpgradeUICtrl.prototype.PlayUpgradeEffect_Right = function () {
                var _this = this;
                var view = this.GetView();
                view.UI_Anim_Upgrade_Right.visible = true;
                view.UI_Anim_Upgrade_Right.play(0, false);
                if (this.upgradeAnimTask_R != -1) {
                    TimeManager.getInst().remove(this.upgradeAnimTask_R);
                }
                this.upgradeAnimTask_R = TimeManager.getInst().once(ConstDefine.UpgradeUI_UpgradeEffectTime_Right, cbhandler.gen_handler(function () {
                    view.UI_Anim_Upgrade_Right.visible = false;
                    _this.upgradeAnimTask_R = -1;
                }, this));
            };
            ///////////////////////////////////////5.0新需求
            //设置文本内容和宽度
            UpgradeUICtrl.prototype.SetTextValueAndWidth = function (text, msg) {
                text.text = msg;
                //当前字号是50，每个字符宽度为28
                text.width = msg.length * 28;
            };
            return UpgradeUICtrl;
        }(ui.BaseUICtrl));
        uicontrollers.UpgradeUICtrl = UpgradeUICtrl;
    })(uicontrollers = ui.uicontrollers || (ui.uicontrollers = {}));
})(ui || (ui = {}));
//# sourceMappingURL=UpgradeUICtrl.js.map