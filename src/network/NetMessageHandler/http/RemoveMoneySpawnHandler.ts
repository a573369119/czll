class RemoveMoneySpawnHandler extends BaseMsgHandler {
    public BaseMsgHandler(data: Uint8Array) {
        let message: com.msg.s_RemoveMoneySpawn_2037 = com.msg.s_RemoveMoneySpawn_2037.decode(data)

        Log.Debug("获取信息 s_RemoveMoneySpawn_2037:%o", message);

        //移除钱币产能
        if (message.result == 1) {
            //成功
            //客户端移除
            let allList = GameDataManager.getInstance().LoginPlayerInfo.MoneyInfo.spawnList;
            let index: number = -1;
            for (let i = 0; i < allList.length; i++) {
                let element = allList[i];
                if (element.spawnID == message.spawnID) {
                    index = i;
                    break;
                }
            }
            //移除
            GameDataManager.getInstance().LoginPlayerInfo.MoneyInfo.spawnList.splice(index, 1);
            //通知
            Facade.instance.sendNotification(NotificationNames.HomepageUI_RemoveMoneySpawn, message.spawnID);
        } else {
            //失败
            Log.Error("移除钱币产能失败");
        }

    }
}
