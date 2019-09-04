class LotteryHandler extends BaseMsgHandler {
    public BaseMsgHandler(data: Uint8Array) {
        let message: com.msg.s_Lottery_2301 = com.msg.s_Lottery_2301.decode(data)

        Log.Debug("收到 s_CheckLotteryRewardHistroy_2303:", message);

        //收到抽奖结果
        if (message.result == 1) {
            //抽奖成功
            //抽奖次数-1
            GameDataManager.getInstance().LoginPlayerInfo.MoneyInfo.lotteryNum -= 1;
            //将configID保存到临时数组中
            Facade.instance.sendNotification(NotificationNames.InviteFriendUI_LotteryResult, message.rewardConfigID);
            //直接在此处保存数据，但不刷新
            let config = ConfigManager.GetInstance().GetLotteryRewardConfig(message.rewardConfigID);
            switch (config.rewardType) {
                case 0: {
                    //实体
                    break;
                }
                case 1: {
                    //金币
                    GameDataManager.getInstance().LoginPlayerInfo.MoneyInfo.goldNum += config.rewardNum;
                    break;
                }
                case 2: {
                    //钻石
                    GameDataManager.getInstance().LoginPlayerInfo.MoneyInfo.diamondNum += config.rewardNum;
                    break;
                }
                case 3: {
                    //体力
                    GameDataManager.getInstance().LoginPlayerInfo.MoneyInfo.pointNum += config.rewardNum;
                    break;
                }
                default:
                    break;
            }
        } else {
            //抽奖失败
            Facade.instance.sendNotification(NotificationNames.InviteFriendUI_LotteryResult, -1);
        }
    }
}
