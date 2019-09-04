class CheckLotteryRewardHistroyHandler extends BaseMsgHandler {
    public BaseMsgHandler(data: Uint8Array) {
        let message: com.msg.s_CheckLotteryRewardHistroy_2303 = com.msg.s_CheckLotteryRewardHistroy_2303.decode(data)

        Log.Debug("收到 s_CheckLotteryRewardHistroy_2303:", message);

        Facade.instance.sendNotification(NotificationNames.LotteryRewardHistUI_CheckResult, message);
    }
}
