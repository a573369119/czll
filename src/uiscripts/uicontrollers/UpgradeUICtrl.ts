
/**
* Created By Code Generator
*/
module ui.uicontrollers {
    import Facade = puremvc.Facade;

    export class UpgradeUICtrl extends ui.BaseUICtrl {
        private sideWeaponImgArray: Array<Laya.Image>;
        private curSideWeaponImgIndex: number;
        private switchFlag: number = 0;

        //副武器动画坐标
        private readonly sideWeaponPosY_Top_2: number = 0;
        private readonly sideWeaponPosY_Top: number = 260;
        private readonly sideWeaponPosY_Center: number = 613;
        private readonly sideWeaponPosY_Bottom: number = 1020;
        private readonly sideWeaponPosY_Bottom_2: number = 1336;
        //副武器动画时间
        private readonly sideWeaponAnimTime: number = 0.5;

        //升级特效
        private upgradeAnimTask: number;
        private upgradeAnimTask_L: number;
        private upgradeAnimTask_R: number;

        //面板特效
        private rightBoxAnimTask: number;
        private arrowAnimTask: number;

        //新的升级面板需求相关
        private timeTaskArray: Array<number>;       //时间任务列表
        private tweenTaskArray: Array<number>;      //动画任务列表
        private mainPanelTweenTask: number;
        private subPanelTweenTask: number

        private upgradeType: EnumUpgradeUIType;       //升级类型

        private subWeaponLocateBoxArray: Array<Laya.Box>;   //副武器定位用box
        private subWeaponItemArray: Array<UpgradeItem>;     //副武器item

        private leftUpgradeItem: UpgradeItem;       //主武器和产能item
        private rightUpgradeItem: UpgradeItem;      //主武器升级item

        private upgradeItemPool: Array<UpgradeItem>;

        private testFloatTipGroupID: number;

        private readonly rightBoxPosX_Start = -200;
        private readonly rightBoxPosX_End = 0;
        private readonly arrowPosX_Start = -260;
        private readonly arrowPosX_End = 0;

        private floatTipGroup_L: number;
        private floatTipGroup_R: number;

        // private readonly coinSkin = "resources/moneyinfo/img_big_coin.png";
        // private readonly graySkin = "resources/upgrade/img_gray_big.png";
        // private readonly whiteSkin = "resources/upgrade/img_white_big.png";


        constructor(view: View) {
            super(view);
        }

        public GetView(): ui.UpgradeUI {
            return this.uiView as ui.UpgradeUI;
        }
        /**
         * @override
         */
        public Init(parent: Laya.Sprite, id: ui.UIID) {
            super.Init(parent, id);
            this.mediatorName = ui.UIID.UpgradeUIID.toString();

            //ui配置
            //this.uiConfig = new WindowConfigData();
            //this.uiConfig.uiOpenAnimType = UIAnim.PopOpen;
            //this.uiConfig.uiCloseAnimType = UIAnim.PopClose;
            //this.uiConfig.depth = 0;
            //添加舞台
            parent.addChild(this.uiView)
            this.uiView.zOrder = this.uiConfig.depth;

            this.RegisterEvent();

            let view = this.GetView();

            //自适应
            view.on(Laya.Event.RESIZE, this, () => {
                this.GetView().width = Laya.stage.width;
                this.GetView().height = Laya.stage.height;
            });

            //初始化相关

            //副武器定位
            this.subWeaponLocateBoxArray = new Array<Laya.Box>();
            for (let i = 0; i < view.UI_HBox_Location.numChildren; i++) {
                let box = view.UI_HBox_Location.getChildAt(i) as Laya.Box;
                this.subWeaponLocateBoxArray.push(box);
            }
            //池功能
            this.upgradeItemPool = new Array<UpgradeItem>();

            //任务列表
            this.timeTaskArray = new Array<number>();
            this.tweenTaskArray = new Array<number>();
            this.subWeaponItemArray = new Array<UpgradeItem>();

            this.testFloatTipGroupID = FloatTipAnimManager.Instance.CreateTipGroup(EnumFloatAnimType.UpgradeTip);
            this.floatTipGroup_L = FloatTipAnimManager.Instance.CreateTipGroup(EnumFloatAnimType.UpgradeTip);
            this.floatTipGroup_R = FloatTipAnimManager.Instance.CreateTipGroup(EnumFloatAnimType.UpgradeTip);
        }

        /**
         * @override
         */
        //ui动画执行前
        protected BeforeUIOpen(context: WindowContextDataBase = null) {
            super.BeforeUIOpen(context);

            //2019-7-5 17:35:54 打开面板前根据打开类型创建内容
            let param = context as UpgradeUIParam;
            if (param) {
                this.InitUpgradeItem(param);
            }
        }
        /**
        * @override
        */
        //ui打开动画完成
        protected OnUIOpened(context: WindowContextDataBase = null) {
            super.OnUIOpened(context);

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
        }
        /**
         * @override
         */
        //ui关闭动画完成
        protected OnUIHide() {
            super.OnUIHide();

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

            view.UI_Btn_UpgradeCost.on(Laya.Event.CLICK, this, this.OnUI_Btn_UpgradeCostClick);
        }
        private RemoveEvent(): void {
            Facade.getInstance().removeMediator(this.getMediatorName());
            let view = this.GetView();

            view.UI_Btn_Cancel.off(Laya.Event.CLICK, this, this.OnUI_Btn_CancelClick);

            view.UI_Btn_UpgradeCost.off(Laya.Event.CLICK, this, this.OnUI_Btn_UpgradeCostClick);
        }
        private OnUI_Btn_CancelClick() {
            //关闭面板
            this.sendNotification(NotificationNames.HIDEUI, UIID.UpgradeUIID);
        }
        /**
         * 升级主武器 -mb
         */
        private OnUI_Btn_Upgrade_MainClick() {

            //3.0新需求 主武器升阶
            let mainWeapon = GameDataManager.getInstance().LoginPlayerInfo.MainWeaponInfo;//主武器
            let classUpFlag = false;//是否有下一阶
            //下一阶的配置
            let nextEvolutionConfig = ConfigManager.GetInstance().GetMainWeaponEvolutionConfig(mainWeapon.evolveLevel + 1);//下一阶的配置
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
                if (mainEnough) {//钱是否够
                    //升阶主武器
                    //关闭按钮响应，避免连续点击
                    // this.GetView().UI_Btn_UpgradeCost.mouseEnabled = false;
                    this.GetView().UI_Btn_UpgradeCost.disabled = true;
                    // 显示动画
                    // Facade.instance.sendNotification(NotificationNames.UpgradeUI_RefreshMainWeaponInfo, 1);
                    // console.log("客户端金币：" + GameDataManager.getInstance().LoginPlayerInfo.MoneyInfo.goldNum);
                    // Facade.instance.sendNotification(NotificationNames.UpgradeUI_RefreshMainWeaponInfo);
                    HttpMessageSender.GetSender().SendWeaponEvolution(GameDataManager.getInstance().LoginPlayerInfo.OpenID, GameDataManager.getInstance().LoginPlayerInfo.MainWeaponInfo.id, GameDataManager.getInstance().LoginPlayerInfo.MainWeaponInfo.evolveLevel, costMoney);
                } else {
                    //打开兑换面板
                    this.sendNotification(NotificationNames.OPENUIWITHPARAM, new ExchangeUIParam(EnumDiamondExchangeType.Coin));
                }
            } else {
                //本次是升级
                //本地计算金币数量
                let costMoney = GameDataUtil.Upgrade_Weapon_Main(GameDataManager.getInstance().LoginPlayerInfo.MainWeaponInfo.level);
                let mainEnough = costMoney <= GameDataManager.getInstance().LoginPlayerInfo.MoneyInfo.goldNum;
                if (mainEnough) {
                    //升级主武器
                    //关闭按钮响应，避免连续点击
                    // this.GetView().UI_Btn_UpgradeCost.mouseEnabled = false;
                    this.GetView().UI_Btn_UpgradeCost.disabled = true;
                    // Facade.instance.sendNotification(NotificationNames.UpgradeUI_RefreshMainWeaponInfo, 1);
                    // Facade.instance.sendNotification(NotificationNames.UpgradeUI_RefreshMainWeaponInfo);
                    HttpMessageSender.GetSender().SendUpgradeWeaopnLvl(GameDataManager.getInstance().LoginPlayerInfo.OpenID, GameDataManager.getInstance().LoginPlayerInfo.MainWeaponInfo.id, GameDataManager.getInstance().LoginPlayerInfo.MainWeaponInfo.level, costMoney);
                } else {
                    //打开兑换面板
                    this.sendNotification(NotificationNames.OPENUIWITHPARAM, new ExchangeUIParam(EnumDiamondExchangeType.Coin));
                }
            }
            //播放音效
            AudioManager.GetInstance().PlaySoundByConfigID(EnumSoundID.sound_function_touch_02);
        }



        /**
         * 升级副武器 -mb
         */
        private OnUI_Btn_Upgrade_SubClick() {
            //本地计算金币数量
            let costMoney = GameDataUtil.Upgrade_Weapon_Side(GameDataManager.getInstance().LoginPlayerInfo.CurSideWeaponInfo.level);
            let subEnough = costMoney <= GameDataManager.getInstance().LoginPlayerInfo.MoneyInfo.goldNum;
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
            } else {
                //打开兑换面板
                this.sendNotification(NotificationNames.OPENUIWITHPARAM, new ExchangeUIParam(EnumDiamondExchangeType.Coin));
            }
            //播放音效
            AudioManager.GetInstance().PlaySoundByConfigID(EnumSoundID.sound_function_touch_02);
        }

        /**
         * 升级产能
         */
        private OnUI_Btn_Upgrade_PlaneClick() {
            //本地计算金币数量
            let spawnLvl = GameDataManager.getInstance().LoginPlayerInfo.SpawnLvl;
            let costMoney = GameDataUtil.Upgrade_Spawn(spawnLvl);
            let spawnEnough = costMoney <= GameDataManager.getInstance().LoginPlayerInfo.MoneyInfo.goldNum;
            if (spawnEnough) {
                //本地计算新的金币与钻石产能等级
                let newGoldLvl = GameDataUtil.Spawn_Coin_Lvl(spawnLvl + 1);
                let newDiamondLvl = GameDataUtil.Spawn_Diamond_Lvl(spawnLvl + 1);
                //升级产能
                //关闭按钮响应，避免连续点击
                // this.GetView().UI_Btn_UpgradeCost.mouseEnabled = false;
                this.GetView().UI_Btn_UpgradeCost.disabled = true;
                // Facade.instance.sendNotification(NotificationNames.UpgradeUI_RefreshSpawnInfo, 1);
                HttpMessageSender.GetSender().SendUpgradeSpawnLvl(GameDataManager.getInstance().LoginPlayerInfo.OpenID, GameDataManager.getInstance().LoginPlayerInfo.SpawnLvl, costMoney, newGoldLvl, newDiamondLvl);
            } else {
                //打开兑换面板
                this.sendNotification(NotificationNames.OPENUIWITHPARAM, new ExchangeUIParam(EnumDiamondExchangeType.Coin));
            }
            //播放音效
            AudioManager.GetInstance().PlaySoundByConfigID(EnumSoundID.sound_function_touch_02);
        }


        private OnUI_Btn_UpgradeCostClick() {
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
        }

        /**
         * @override
         */
        listNotificationInterests(): string[] {
            return [

                NotificationNames.UpgradeUI_RefreshMainWeaponInfo,
                NotificationNames.UpgradeUI_RefreshSideWeaponInfo,
                NotificationNames.UpgradeUI_RefreshSpawnInfo,
                NotificationNames.UpgradeUI_EquipSideWeapon,
                NotificationNames.UI_RefreshMoneyInfo,
                NotificationNames.UpgradeUI_RefreshWeaponEvolutionInfo,
                NotificationNames.UpgradeUI_ElementTweenTo
            ];
        }

        /**
        * @override
        */
        handleNotification(note: puremvc.INotification): void {
            let view = this.GetView();
            switch (note.getName()) {
                case NotificationNames.UpgradeUI_RefreshMainWeaponInfo: {
                    //升级
                    //刷新主武器
                    this.RefreshMainWeaponInfo();
                    //金币
                    this.RefreshCoinInfo();

                    let result = note.getBody() as number;
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
                    let result = note.getBody() as number;
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

                    let result = note.getBody() as number;
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
                    let view = this.GetView();
                    //武器升阶
                    let message = note.getBody() as com.msg.s_WeaponEvolution_2015;
                    this.HandleWeaponEvolution(message);
                    break;
                }
                case NotificationNames.UpgradeUI_ElementTweenTo: {
                    //跳跃
                    this.elementTweenTo(note.getBody());
                    break;
                }
            }
        }

        //刷新主武器
        private RefreshMainWeaponInfo() {
            let view = this.GetView();
            //1.寻找当前的主武器
            let mainWeapon = GameDataManager.getInstance().LoginPlayerInfo.MainWeaponInfo;

            //2019-7-8 14:13:42 3.0新需求
            let curEvolutionConfig = ConfigManager.GetInstance().GetMainWeaponEvolutionConfig(mainWeapon.evolveLevel)
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
            let classUpFlag: boolean = false;
            //下一阶的配置
            if (!ConfigManager.GetInstance().IsMaxMainWeaponEvolutionLevel(mainWeapon.evolveLevel)) {
                let nextEvolutionConfig = ConfigManager.GetInstance().GetMainWeaponEvolutionConfig(mainWeapon.evolveLevel + 1);
                //有下一阶
                classUpFlag = mainWeapon.level >= nextEvolutionConfig.RequiredPowerLvl;

                //加载下一阶的内容
                if (!this.rightUpgradeItem) {
                    this.rightUpgradeItem = this.CreateUpgradeItem();
                    view.UI_Box_Right.addChild(this.rightUpgradeItem);
                    this.rightUpgradeItem.pos(0, 0);
                }
                this.rightUpgradeItem.InitItem(EnumUpgradeUIType.Main, nextEvolutionConfig.ID);
            } else {
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
                })
                this.arrowAnimTask = Tween2DUtil.to({
                    node: view.UI_Img_Arrow,
                    duration: ConstDefine.UpgradeUI_MainWeapon_ArrowAppearTime,
                    delay: ConstDefine.Common_PanelScaleUpTime,
                    left: this.arrowPosX_End
                });
                // this.tweenTaskArray.push(rightAnimTask, arrowAnimTask);

                //升阶消耗金币 = 阶数 * 系数（已经计算完毕）
                let nextEvolutionConfig = ConfigManager.GetInstance().GetMainWeaponEvolutionConfig(mainWeapon.evolveLevel + 1);
                view.UI_Txt_UpgradeCost.text = GameDataUtil.NumberToString(nextEvolutionConfig.RequiredGoldNumber);

            } else {
                //升级消耗金币
                view.UI_Txt_UpgradeCost.text = GameDataUtil.NumberToString(FormulaUtil.CalcByConfig(EnumFormulaType.MainWeaponUpgradeCost, mainWeapon.level));
            }

        }

        //刷新副武器
        private RefreshSideWeaponInfo() {
            let view = this.GetView();
            let curSideWeapon: com.msg.weaponDetail = GameDataManager.getInstance().LoginPlayerInfo.CurSideWeaponInfo;
            //2019-7-8 14:13:42 3.0新需求

            //刷新各sideweapon的内容显示
            for (let i = 0; i < 6; i++) {
                let item = this.subWeaponItemArray[i];
                if (!item) { console.error("错误信息：没有item UpgradeUICtrl"); return; }
                let sideWeaponID = i + 2;
                let unlocked = GameDataUtil.CheckSideWeaponIDUnlocked(sideWeaponID);
                item.gray = !unlocked;

                //需要显示的内容
                //根据ID是否与当前使用中的副武器ID相同，判断是否在主面板上
                item.InitItem(EnumUpgradeUIType.Sub, sideWeaponID, sideWeaponID == curSideWeapon.id);
            }
            //副武器显示
            this.SetTextValueAndWidth(view.UI_Txt_UpgradeInfo_Sub, curSideWeapon.level.toString());
            //刷新副武器的升级消耗
            view.UI_Txt_UpgradeCost.text = GameDataUtil.NumberToString(GameDataUtil.Upgrade_Weapon_Side(curSideWeapon.level));
        }



        //刷新产能
        private RefreshSpawnInfo() {
            let view = this.GetView();
            //1.当前产能等级
            let spawnLvl = GameDataManager.getInstance().LoginPlayerInfo.SpawnLvl;

            //2019-7-8 14:13:42 3.0新需求
            //加载当前内容
            if (!this.leftUpgradeItem) {
                this.leftUpgradeItem = this.CreateUpgradeItem();
                view.UI_Box_Left.addChild(this.leftUpgradeItem);
                this.leftUpgradeItem.pos(0, 0);
            }
            this.leftUpgradeItem.InitItem(EnumUpgradeUIType.Money);
            let spawnStr = FormulaUtil.CalcByConfig(EnumFormulaType.GoldUpgrade, spawnLvl);
            //文字内容
            this.SetTextValueAndWidth(view.UI_Txt_UpgradeInfo_Spawn, spawnStr.toString());

            //产能消耗
            view.UI_Txt_UpgradeCost.text = GameDataUtil.NumberToString(GameDataUtil.Upgrade_Spawn(spawnLvl));
        }

        //刷新金币信息
        private RefreshCoinInfo() {
            let view = this.GetView();

            switch (this.upgradeType) {
                //主武器
                case EnumUpgradeUIType.Main: {
                    //1.寻找当前的主武器
                    let mainWeapon = GameDataManager.getInstance().LoginPlayerInfo.MainWeaponInfo;
                    //需要根据当前是否是升阶，分别判断
                    let classUpFlag = false;
                    let nextEvolutionConfig: MainWeaponEvloveConfig = null;
                    //下一阶的配置
                    if (!ConfigManager.GetInstance().IsMaxMainWeaponEvolutionLevel(mainWeapon.evolveLevel)) {
                        nextEvolutionConfig = ConfigManager.GetInstance().GetMainWeaponEvolutionConfig(mainWeapon.evolveLevel + 1);
                        //有下一阶
                        classUpFlag = mainWeapon.level >= nextEvolutionConfig.RequiredPowerLvl;
                    } else {
                        //无下一阶
                        classUpFlag = false;
                    }
                    if (classUpFlag) {
                        let mainEnough = nextEvolutionConfig.RequiredGoldNumber <= GameDataManager.getInstance().LoginPlayerInfo.MoneyInfo.goldNum;
                        //不再变灰，文字变红
                        view.UI_Txt_UpgradeCost.color = mainEnough ? "#FFFFFF" : "#FF0000";
                    } else {
                        let mainEnough = GameDataUtil.Upgrade_Weapon_Main(mainWeapon.level) <= GameDataManager.getInstance().LoginPlayerInfo.MoneyInfo.goldNum;
                        //不再变灰，文字变红
                        view.UI_Txt_UpgradeCost.color = mainEnough ? "#FFFFFF" : "#FF0000";
                    }
                    break;
                }
                //副武器
                case EnumUpgradeUIType.Sub: {
                    let curSideWeaponLevel = GameDataManager.getInstance().GetCurSideWeaponLvl();
                    //2.根据当前金币数量，决定是否能够点击升级按钮
                    let subEnough = GameDataUtil.Upgrade_Weapon_Side(curSideWeaponLevel) <= GameDataManager.getInstance().LoginPlayerInfo.MoneyInfo.goldNum;
                    //不再变灰，文字变红
                    view.UI_Txt_UpgradeCost.color = subEnough ? "#FFFFFF" : "#FF0000";

                    break;
                }
                //产能
                case EnumUpgradeUIType.Money: {
                    //1.当前产能等级
                    let spawnLvl = GameDataManager.getInstance().LoginPlayerInfo.SpawnLvl;
                    //3.根据当前金币数量，决定是否能够点击升级按钮
                    let spawnEnough = GameDataUtil.Upgrade_Spawn(spawnLvl) <= GameDataManager.getInstance().LoginPlayerInfo.MoneyInfo.goldNum;
                    //不再变灰，文字变红
                    view.UI_Txt_UpgradeCost.color = spawnEnough ? "#FFFFFF" : "#FF0000";
                    break;
                }
                default:
                    break;
            }
        }

        //初始化副武器信息
        private InitSideWeaponImage() {
            /**
             * 副武器的显示需求————
             * 中间显示当前装备的副武器，上方显示上一个，下方显示下一个
             * 每次切换时，播放滚动动画
             */
            let view = this.GetView();
            //2019-7-8 16:42:18 3.0新需求
            for (let i = 0; i < 6; i++) {
                let sideWeaponID = i + 2;
                let item = this.CreateUpgradeItem();
                let parentBox = this.GetSiedWeaponBox(sideWeaponID);
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
        }

        //初始化UI 3.0功能需求
        private InitUpgradeItem(param: UpgradeUIParam) {
            //保存本次更新类型
            this.upgradeType = param.upgradeType;
            let view = this.GetView();
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
                onComplete: cbhandler.gen_handler(() => {
                    this.mainPanelTweenTask = Tween2DUtil.to({
                        node: view.UI_Box_MainPanel,
                        duration: ConstDefine.Common_PanelScaleBounceTime,
                        scalex: 1,
                        scaley: 1,
                        onComplete: cbhandler.gen_handler(() => {
                            this.mainPanelTweenTask = -1;
                        }, this)
                    })
                }, this)
            })
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
                    onComplete: cbhandler.gen_handler(() => {
                        this.subPanelTweenTask = Tween2DUtil.to({
                            node: view.UI_Box_SubPanel,
                            duration: ConstDefine.Common_PanelScaleBounceTime,
                            scalex: 1,
                            scaley: 1,
                            onComplete: cbhandler.gen_handler(() => {
                                this.subPanelTweenTask = -1;
                            }, this)
                        })
                    }, this)
                })
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
        }


        //关闭面板，删除所有信息
        private DeleteAllInfo() {
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
            for (let i = 0; i < this.subWeaponItemArray.length; i++) {
                this.DeleteUpgradeItem(this.subWeaponItemArray[i]);
            }
            this.subWeaponItemArray = new Array<UpgradeItem>();
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
            for (let i = 0; i < this.timeTaskArray.length; i++) {
                let element = this.timeTaskArray[i];
                TimeManager.getInst().remove(element);
            }
            this.timeTaskArray = new Array<number>();

            for (let i = 0; i < this.tweenTaskArray.length; i++) {
                let element = this.tweenTaskArray[i];
                TimeManager.getInst().remove(element);
            }
            this.tweenTaskArray = new Array<number>();

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
        }

        //获取副武器对应容器
        private GetSiedWeaponBox(sideWeaponID: number): Laya.Box {
            //根据传入的副武器id，寻找当前所在位置的box
            let view = this.GetView();
            let curSideweaponID = GameDataManager.getInstance().LoginPlayerInfo.CurSideWeaponID;
            if (sideWeaponID == curSideweaponID) {
                return view.UI_Box_Left;
            } else {
                //按照对应的id找到对应的索引，获取对应的box
                let boxIndex = -1;
                for (let i = 0; i < 6; i++) {
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
        }

        //创建item（池功能）
        private CreateUpgradeItem(): UpgradeItem {
            let item = this.upgradeItemPool.pop();
            if (item) {
                return item;
            } else {
                return new UpgradeItem();
            }
        }

        //删除item（池功能）
        private DeleteUpgradeItem(item: UpgradeItem) {
            if (item) {
                item.removeSelf();
                this.upgradeItemPool.push(item);
            }
        }

        //切换副武器动画
        private SwitchSideWeapon() {
            let view = this.GetView();

            //2019-7-8 20:16:54 3.0新需求
            for (let i = 0; i < this.subWeaponItemArray.length; i++) {
                let element = this.subWeaponItemArray[i];
                //获取对应的父容器
                let parent = this.GetSiedWeaponBox(element.sideWeaponID);
                if (element.parent != parent) {
                    //设置父子关系
                    element.scaleX = 1;
                    element.scaleY = 1;
                    // element.removeSelf();
                    let aimPos = CommonUtil2D.GetPosUnderTargetObj(element, parent);
                    parent.addChild(element);
                    element.pos(aimPos.x, aimPos.y);
                    //动画
                    let task = Tween2DUtil.to({
                        node: element,
                        duration: ConstDefine.UpgradeUI_SubWeapon_SwitchTime,
                        x: 0,
                        y: 0
                    })
                    this.tweenTaskArray.push(task);
                }
            }
        }

        /**
         * 飞机点击 反馈
         */
        private elementTweenTo(sideWeaponID) {
            let view = this.GetView();
            //2019-7-8 20:16:54 3.0新需求
            for (let i = 0; i < this.subWeaponItemArray.length; i++) {
                let element = this.subWeaponItemArray[i];
                //获取对应的父容器
                let parent = this.GetSiedWeaponBox(sideWeaponID);
                if (element.parent == parent) {
                    //获取对应的父容器
                    // console.log("变大变小");
                    AudioManager.GetInstance().PlaySoundByConfigID(EnumSoundID.sound_function_touch_03);

                    Laya.Tween.to(element, { "scaleX": 1.1, "scaleY": 1.1 }, 125, null, Laya.Handler.create(this, function () {
                        Laya.Tween.to(element, { "scaleX": 1, "scaleY": 1 }, 125);
                    }));
                }
            }
        }

        private HandleWeaponEvolution(message: com.msg.s_WeaponEvolution_2015) {
            let view = this.GetView();
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
                    let timeTask1 = TimeManager.getInst().once(ConstDefine.UpgradeUI_MainWeapon_EvolutionPauseTime, cbhandler.gen_handler(() => {
                        //金币
                        this.RefreshCoinInfo();
                        //切换引用
                        this.DeleteUpgradeItem(this.leftUpgradeItem);
                        this.leftUpgradeItem = this.rightUpgradeItem;
                        this.rightUpgradeItem = null;
                        //动画，右侧面板平移到左侧
                        let aimPos = CommonUtil2D.GetPosUnderTargetObj(this.leftUpgradeItem, view.UI_Box_Left);
                        view.UI_Box_Left.addChild(this.leftUpgradeItem)
                        this.leftUpgradeItem.pos(aimPos.x, aimPos.y);
                        //隐藏箭头和右侧框
                        view.UI_Img_Arrow.visible = false;
                        view.UI_Box_Right.visible = false;
                        //播放动画
                        let animTask = Tween2DUtil.to({
                            node: this.leftUpgradeItem,
                            duration: ConstDefine.UpgradeUI_MainWeapon_EvolutionEndTime,
                            x: 0,
                            y: 0,
                            onComplete: cbhandler.gen_handler(() => {
                                //刷新主武器
                                this.RefreshMainWeaponInfo();
                                //打开按键
                                view.UI_Btn_UpgradeCost.mouseEnabled = true;
                                //按钮变灰
                                view.UI_Btn_UpgradeCost.gray = false;
                            }, this)
                        })
                    }, this))
                    this.timeTaskArray.push(timeTask1);
                } else {
                    //副武器
                    //现在没需求，不考虑
                }

                //升阶成功，播放音效
                AudioManager.GetInstance().PlaySoundByConfigID(EnumSoundID.sound_function_upgrade_01);
            }

        }


        //播放左侧特效
        private PlayUpgradeEffect_Left() {
            let view = this.GetView();
            view.UI_Anim_Upgrade_Left.visible = true;
            view.UI_Anim_Upgrade_Left.play(0, false);
            if (this.upgradeAnimTask_L != -1) {
                TimeManager.getInst().remove(this.upgradeAnimTask_L);
            }
            this.upgradeAnimTask_L = TimeManager.getInst().once(ConstDefine.UpgradeUI_UpgradeEffectTime_Left, cbhandler.gen_handler(() => {
                view.UI_Anim_Upgrade_Left.visible = false;
                this.upgradeAnimTask_L = -1;
            }, this))
        }
        //播放右侧特效
        private PlayUpgradeEffect_Right() {
            let view = this.GetView();
            view.UI_Anim_Upgrade_Right.visible = true;
            view.UI_Anim_Upgrade_Right.play(0, false);
            if (this.upgradeAnimTask_R != -1) {
                TimeManager.getInst().remove(this.upgradeAnimTask_R);
            }
            this.upgradeAnimTask_R = TimeManager.getInst().once(ConstDefine.UpgradeUI_UpgradeEffectTime_Right, cbhandler.gen_handler(() => {
                view.UI_Anim_Upgrade_Right.visible = false;
                this.upgradeAnimTask_R = -1;
            }, this))
        }


        ///////////////////////////////////////5.0新需求

        //设置文本内容和宽度
        private SetTextValueAndWidth(text: Laya.Label, msg: string) {
            text.text = msg;
            //当前字号是50，每个字符宽度为28
            text.width = msg.length * 28;
        }
    }
}