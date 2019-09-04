class GainMoneySpawnHandler extends BaseMsgHandler {
    public BaseMsgHandler(data: Uint8Array) {
        let message: com.msg.s_GainMoneySpawn_2035 = com.msg.s_GainMoneySpawn_2035.decode(data)

        Log.Debug("获取信息 s_GainMoneySpawn_2035:%o", message);

        //收获钱币产能
        if (message.result == 1) {
            //成功
            //客户端处理
            //本地排除已收获的内容
            let index = -1;
            for (var i = 0; i < GameDataManager.getInstance().LoginPlayerInfo.MoneyInfo.spawnList.length; i++) {
                var element = GameDataManager.getInstance().LoginPlayerInfo.MoneyInfo.spawnList[i];
                if (element.spawnID == message.spawnInfo.spawnID) {
                    index = i;
                }
            }
            if (index != -1) {
                GameDataManager.getInstance().LoginPlayerInfo.MoneyInfo.spawnList.splice(index, 1);
            }
            //并保存奖励
            if (message.spawnInfo.moneyType == 1) {
                //金币
                GameDataManager.getInstance().LoginPlayerInfo.MoneyInfo.goldNum += message.spawnInfo.moneyNum;
            } else if (message.spawnInfo.moneyType == 2) {
                //钻石
                GameDataManager.getInstance().LoginPlayerInfo.MoneyInfo.diamondNum += message.spawnInfo.moneyNum;
            }
            //通知
            Facade.instance.sendNotification(NotificationNames.HomepageUI_GainMoneySpawn, message.spawnInfo.spawnID);
            Facade.instance.sendNotification(NotificationNames.UI_RefreshMoneyInfo);
            Facade.instance.sendNotification(NotificationNames.MoreSpawnUI_Hide);
        } else {
            //失败
            Log.Error("收获钱币产能失败");
            Facade.instance.sendNotification(NotificationNames.MoreSpawnUI_Hide);
        }

    }
}
