class WeaponEvolutionHandler extends BaseMsgHandler {
    public BaseMsgHandler(data: Uint8Array) {
        let message: com.msg.s_WeaponEvolution_2015 = com.msg.s_WeaponEvolution_2015.decode(data)

        Log.Debug("获取信息 s_WeaponEvolution_2015:", message);

        //主武器升阶结果
        if (message.result == 1) {
            //升阶成功

            //本地保存
            GameDataManager.getInstance().LoginPlayerInfo.MoneyInfo.goldNum = message.totalGold;
            // console.log("副武器返回金币：" + message.totalGold);
            if (message.weaponID == 1) {
                //主武器
                GameDataManager.getInstance().LoginPlayerInfo.MainWeaponInfo.evolveLevel = message.newEvolutionLvl;
            } else {
                //副武器
                let allSideWeaponList = GameDataManager.getInstance().LoginPlayerInfo.AllSideWeaponList;
                for (var i = 0; i < allSideWeaponList.length; i++) {
                    var element = allSideWeaponList[i];
                    if (element.id == message.weaponID) {
                        element.evolveLevel = message.newEvolutionLvl;
                    }
                }
                GameDataManager.getInstance().LoginPlayerInfo.AllSideWeaponList = allSideWeaponList;
            }
            //通知刷新
            Facade.instance.sendNotification(NotificationNames.UpgradeUI_RefreshWeaponEvolutionInfo, message);
            Facade.instance.sendNotification(NotificationNames.UI_RefreshMoneyInfo);

        }

    }
}
