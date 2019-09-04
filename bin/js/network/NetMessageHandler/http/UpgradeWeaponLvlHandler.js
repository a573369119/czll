var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var UpgradeWeaponLvlHandler = (function (_super) {
    __extends(UpgradeWeaponLvlHandler, _super);
    function UpgradeWeaponLvlHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UpgradeWeaponLvlHandler.prototype.BaseMsgHandler = function (data) {
        var message = com.msg.s_UpgradeWeaponLvl_2011.decode(data);
        Log.Debug("获取信息 s_UpgradeWeaponLvl_2011:%o", message);
        Log.Debug("获取信息XXXXXXXXXXXXXXXXXXXXX：" + message.totalGold);
        //武器升级
        if (message.result == 1) {
            //保存
            if (message.weaponID == 1) {
                //主武器
                GameDataManager.getInstance().LoginPlayerInfo.MainWeaponInfo.level = message.newLvl;
                //本地保存金币数量
                GameDataManager.getInstance().LoginPlayerInfo.MoneyInfo.goldNum = message.totalGold;
                //通知刷新
                Facade.instance.sendNotification(NotificationNames.UpgradeUI_RefreshMainWeaponInfo, message.result);
                Facade.instance.sendNotification(NotificationNames.UI_RefreshMoneyInfo);
            }
            else {
                //副武器
                GameDataManager.getInstance().LoginPlayerInfo.AllSideWeaponList.forEach(function (element) {
                    if (element.id == message.weaponID) {
                        element.level = message.newLvl;
                    }
                });
                //本地扣除金币
                GameDataManager.getInstance().LoginPlayerInfo.MoneyInfo.goldNum = message.totalGold;
                //通知刷新
                Facade.instance.sendNotification(NotificationNames.UpgradeUI_RefreshSideWeaponInfo, message.result);
                Facade.instance.sendNotification(NotificationNames.UI_RefreshMoneyInfo);
            }
        }
        else {
            Log.Error("武器升级失败：" + message.weaponID);
        }
    };
    return UpgradeWeaponLvlHandler;
}(BaseMsgHandler));
//# sourceMappingURL=UpgradeWeaponLvlHandler.js.map