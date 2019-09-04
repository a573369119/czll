class MatchStartHandler extends BaseMsgHandler {
    public BaseMsgHandler(data: Uint8Array) {
        let message: com.msg.s_MatchStart_2101 = com.msg.s_MatchStart_2101.decode(data)

        Log.Debug("获取信息 s_MatchStart_2101:%o", message);

        //比赛开始
        if (message.result == 1) {
            //本地减少体力
            GameDataManager.getInstance().LoginPlayerInfo.MoneyInfo.pointNum = message.curPoint;
            if (message.latestPointRefreshTime) {
                //保存体力更新时间
                GameDataManager.getInstance().LoginPlayerInfo.MoneyInfo.latestPointRefreshTime = message.latestPointRefreshTime;
            }
            //可以开始，发送通知
            Facade.instance.sendNotification(NotificationNames.UI_StartGame);
        } else {
            //不能开始

        }
    }
}
