class UpgradeWeaponLvlHandler extends BaseMsgHandler {
    public BaseMsgHandler(data: Uint8Array) {
        let message: com.msg.s_UpgradeWeaponLvl_2011 = com.msg.s_UpgradeWeaponLvl_2011.decode(data)

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
            } else {
                //副武器
                GameDataManager.getInstance().LoginPlayerInfo.AllSideWeaponList.forEach(element => {
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
        } else {
            Log.Error("武器升级失败：" + message.weaponID);
        }
    }
}
