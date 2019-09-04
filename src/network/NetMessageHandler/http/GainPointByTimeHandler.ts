class GainPointByTimeHandler extends BaseMsgHandler {
    public BaseMsgHandler(data: Uint8Array) {
        let message: com.msg.s_GainPointByTime_2051 = com.msg.s_GainPointByTime_2051.decode(data)
        Log.Debug("获取信息 s_GainPointByTime_2051:%o", message);

        //因倒计时周期结束，获取体力
        if (message.result == 1) {
            //获取体力成功
            //本地保存
            GameDataManager.getInstance().LoginPlayerInfo.MoneyInfo = message.moneyInfo;
            //发送通知
            Facade.instance.sendNotification(NotificationNames.UI_RefreshMoneyInfo);
        } else {
            Log.Error("倒计时结束 获取体力失败！");
        }
    }
}
