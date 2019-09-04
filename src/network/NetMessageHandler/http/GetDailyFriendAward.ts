class GetDailyFriendAward extends BaseMsgHandler {
    public BaseMsgHandler(data: Uint8Array) {
        let message: com.msg.s_UpgradeSpawnLvl_2307 = com.msg.s_UpgradeSpawnLvl_2307.decode(data)

        Log.Debug("获取信息 s_UpgradeSpawnLvl2307:%o", message);
        //升级产能
        //保存
        if (message.result == 1) {
            //成功
            GameDataManager.getInstance().LoginPlayerInfo.SpawnLvl = message.newLvl;
            // GameDataManager.getInstance().LoginPlayerInfo.CoinSpawnLvl = message.goldSpawnLvl;
            // GameDataManager.getInstance().LoginPlayerInfo.DiamondSpawnLvl = message.diamondSpawnLvl;
            Facade.instance.sendNotification(NotificationNames.UpgradeUI_RefreshSpawnInfo, message.result);
            //本地保存金币数量
            GameDataManager.getInstance().LoginPlayerInfo.MoneyInfo.goldNum = message.totalGold;
            //通知刷新
            Facade.instance.sendNotification(NotificationNames.UI_RefreshMoneyInfo);
        } else {
            //失败
            Log.Error("产能升级失败");
        }
    }
}
