class CreateMoneySpawnHandler extends BaseMsgHandler {
    public BaseMsgHandler(data: Uint8Array) {
        let message: com.msg.s_CreateMoneySpawn_2031 = com.msg.s_CreateMoneySpawn_2031.decode(data)

        Log.Debug("获取信息 s_CreateMoneySpawn_2031:%o", message);

        //创建钱币产能
        if (message.result == 1) {
            //创建成功
            //客户端保存
            GameDataManager.getInstance().LoginPlayerInfo.MoneyInfo.spawnList.push(message.newSpawnInfo);
            //发送通知
            Facade.instance.sendNotification(NotificationNames.HomepageUI_CreateMoneySpawn, message.newSpawnInfo);
        } else {
            //创建失败
            Log.Error("创建钱币产能失败！");
        }
    }
}
