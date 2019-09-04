class UpdateMoneySpawnHandler extends BaseMsgHandler {
    public BaseMsgHandler(data: Uint8Array) {
        let message: com.msg.s_UpdateMoneySpawn_2033 = com.msg.s_UpdateMoneySpawn_2033.decode(data)

        Log.Debug("获取信息 s_UpdateMoneySpawn_2033:%o", message);

        //更新钱币产能
        if (message.result == 1) {
            //成功
            //客户端保存
            for (let i = 0; i < GameDataManager.getInstance().LoginPlayerInfo.MoneyInfo.spawnList.length; i++) {
                if (GameDataManager.getInstance().LoginPlayerInfo.MoneyInfo.spawnList[i].spawnID == message.spawnInfo.spawnID) {
                    GameDataManager.getInstance().LoginPlayerInfo.MoneyInfo.spawnList[i] = message.spawnInfo;
                }
            }
            //通知
            Facade.instance.sendNotification(NotificationNames.HomepageUI_UpdateMoneySpawn, message.spawnInfo);
        } else {
            //失败
            Log.Error("更新钱币产能失败");
        }

    }
}
