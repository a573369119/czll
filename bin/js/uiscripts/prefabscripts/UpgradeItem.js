var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*
* name;
*/
var UpgradeItem = (function (_super) {
    __extends(UpgradeItem, _super);
    function UpgradeItem() {
        var _this = _super.call(this) || this;
        _this.bulletSkin = "resources/upgrade/img_main_bullet.png";
        _this.UI_Btn_Action.on(Laya.Event.CLICK, _this, _this.OnUI_Btn_ActionClick);
        _this.bulletPool = new Array();
        return _this;
    }
    //点击事件
    UpgradeItem.prototype.OnUI_Btn_ActionClick = function () {
        //仅为用于显示副武器内容的时候此事件才会响应
        Facade.instance.sendNotification(NotificationNames.UpgradeUI_ElementTweenTo, this.sideWeaponID); //点击立刻跳动
        //发送消息
        HttpMessageSender.GetSender().SendEquipSideWeapon(GameDataManager.getInstance().LoginPlayerInfo.OpenID, this.sideWeaponID);
    };
    /**
     * 设置item的图片以及文字
     * @param itemType 类型，主武器、副武器、产能
     * @param inMainPanel 是否在主面板中。主面板下方显示的内容与子面板中不同。默认为true。
     * @param num 副武器ID（用于发送副武器切换消息）或主武器阶数
     */
    UpgradeItem.prototype.InitItem = function (itemType, num, inMainPanel) {
        if (inMainPanel === void 0) { inMainPanel = true; }
        //显隐区分
        this.UI_Img_Main.visible = this.UI_Box_Main.visible = itemType == EnumUpgradeUIType.Main;
        this.UI_Img_Sub.visible = this.UI_Box_Sub.visible = itemType == EnumUpgradeUIType.Sub;
        this.UI_Img_Money.visible = this.UI_Box_Money.visible = itemType == EnumUpgradeUIType.Money;
        //额外处理
        switch (itemType) {
            case EnumUpgradeUIType.Main: {
                //清空子弹的数量
                var bulletNum = this.UI_HBox_Main.numChildren;
                for (var i = 0; i < bulletNum; i++) {
                    this.DeleteBulletImg(this.UI_HBox_Main.getChildAt(0));
                }
                //主武器，传入的是阶数
                this.UI_Img_Lock.visible = false;
                //根据阶数动态显示子弹数量和等级
                if (num) {
                    //显示阶数
                    this.UI_Txt_Main.text = num.toString();
                    //通过配置决定最大子弹数量
                    var bulletNum_1 = num < ConstDefine.UpgradeUI_MainWeapon_BulletMaxNum ? num : ConstDefine.UpgradeUI_MainWeapon_BulletMaxNum;
                    //动态设置间隔
                    this.UI_HBox_Main.space = this.CalBulletSpace(bulletNum_1);
                    //创建子弹
                    for (var i = 0; i < bulletNum_1; i++) {
                        var bulletImg = this.CreateBulletImg();
                        this.UI_HBox_Main.addChild(bulletImg);
                        bulletImg.y = 0;
                    }
                }
                //按钮点击
                this.UI_Btn_Action.mouseEnabled = false;
                this.gray = false;
                break;
            }
            case EnumUpgradeUIType.Sub: {
                //副武器，传入的是id
                var config = ConfigManager.GetInstance().GetWeaponConfig(num);
                this.UI_Img_Sub.skin = this.skinSpecial(config.weaponSkin);
                this.sideWeaponID = num;
                //2019-8-9 09:44:53 5.0新需求，需要进行细分
                if (inMainPanel) {
                    //在主面板上
                    this.UI_Img_Lock.visible = false;
                    this.UI_Txt_Sub.visible = false;
                    this.UI_Img_Txt_Level_Sub.visible = false;
                    this.UI_Img_Txt_SubWeapon.visible = true;
                    //图片文字
                    this.UI_Img_Txt_SubWeapon.skin = "resources/upgrade/img_txt_weapon_" + num + ".png";
                    //按钮点击
                    this.UI_Btn_Action.mouseEnabled = false;
                    this.gray = false;
                }
                else {
                    //在子面板上
                    this.UI_Txt_Sub.visible = true;
                    this.UI_Img_Txt_Level_Sub.visible = true;
                    this.UI_Img_Txt_SubWeapon.visible = false;
                    //在此处判断是否解锁，决定是否显示锁图标
                    var unlocked = GameDataUtil.CheckSideWeaponIDUnlocked(this.sideWeaponID);
                    this.UI_Img_Lock.visible = !unlocked;
                    //级与关
                    this.UI_Img_Txt_Level_Sub.skin = unlocked ? "resources/upgrade/img_txt_level_weapon_1.png" : "resources/upgrade/img_txt_level_game.png";
                    //文本
                    this.UI_Txt_Sub.text = unlocked ? GameDataUtil.CheckSideWeaponLevel(this.sideWeaponID).toString() : config.UnlockLevel.toString();
                    //动态设置文本宽度，一个字符28
                    this.UI_Txt_Sub.width = this.UI_Txt_Sub.text.length * 28;
                    //按钮点击
                    this.UI_Btn_Action.mouseEnabled = unlocked;
                    this.gray = !unlocked;
                }
                break;
            }
            case EnumUpgradeUIType.Money: {
                //金币
                this.UI_Img_Lock.visible = false;
                //按钮点击
                this.UI_Btn_Action.mouseEnabled = false;
                this.gray = false;
                break;
            }
        }
    };
    /**
     * 设置按钮是否可以点击
     * @param enable item按钮事件允许触发
     */
    UpgradeItem.prototype.SetButtonEnable = function (enable) {
        this.UI_Btn_Action.mouseEnabled = enable;
    };
    //子弹图片的池功能
    UpgradeItem.prototype.CreateBulletImg = function () {
        var bullet = this.bulletPool.pop();
        if (!bullet) {
            bullet = new Laya.Image("resources/upgrade/img_main_bullet.png");
        }
        return bullet;
    };
    UpgradeItem.prototype.DeleteBulletImg = function (bullet) {
        bullet.removeSelf();
        this.bulletPool.push(bullet);
        this.UI_Box_HidePool.addChild(bullet);
    };
    //根据子弹数量，动态计算间距
    UpgradeItem.prototype.CalBulletSpace = function (num) {
        //间距范围为40~10
        if (num == 0 || num == 1) {
            return 0;
        }
        else {
            return (50 / num) - 10;
        }
    };
    /***皮肤表 */
    UpgradeItem.prototype.skinSpecial = function (url) {
        if (GameDataManager.getInstance().LoginPlayerInfo.VerifyInfo.state == 1) {
            if (url == "resources/player/planes/role_fight_weapon_01.png") {
                url = "resources/player/planes/role_fight_weapon_01_1.png";
            }
        }
        return url;
    };
    return UpgradeItem;
}(ui.PrefabUI.UpgradeItemPrefabUI));
//# sourceMappingURL=UpgradeItem.js.map