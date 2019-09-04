class GainPointByMatchHandler extends BaseMsgHandler {
    public BaseMsgHandler(data: Uint8Array) {
        let message: com.msg.s_GainPointByMatch_2053 = com.msg.s_GainPointByMatch_2053.decode(data)

        Log.Debug("获取信息 s_GainPointByMatch_2053:%o", message);

        //因比赛结束获取体力
        if (message.result == 1) {
            //获取成功
            //本地保存
            GameDataManager.getInstance().LoginPlayerInfo.MoneyInfo.pointNum = message.pointNum;
            //发送消息通知
            Facade.instance.sendNotification(NotificationNames.ResultUI_GainPower);
            Facade.instance.sendNotification(NotificationNames.UI_RefreshMoneyInfo);
        } else {
            //获取失败

        }
    }
}
