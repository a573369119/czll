class CheckPhoneVerifyHandler extends BaseMsgHandler {
    public BaseMsgHandler(data: Uint8Array) {
        let message: com.msg.s_CheckPhoneVerify_2203 = com.msg.s_CheckPhoneVerify_2203.decode(data)

        //绑定结果
        if (message.result == 1) {
            //绑定成功，本地保存奖励
            GameDataManager.getInstance().LoginPlayerInfo.VerifyInfo.state = 1;
            if (message.verifyReward) {
                //如果有绑定奖励相关信息
                //钻石
                if (message.verifyReward.diamondNum) {
                    GameDataManager.getInstance().LoginPlayerInfo.MoneyInfo.diamondNum += message.verifyReward.diamondNum;
                }
                //金币
                if (message.verifyReward.goldNum) {
                    GameDataManager.getInstance().LoginPlayerInfo.MoneyInfo.goldNum += message.verifyReward.goldNum;
                }
                //体力
                if (message.verifyReward.pointNum) {
                    GameDataManager.getInstance().LoginPlayerInfo.MoneyInfo.pointNum += message.verifyReward.pointNum;
                }
                //抽奖次数
                if (message.verifyReward.lotteryNum) {
                    GameDataManager.getInstance().LoginPlayerInfo.MoneyInfo.lotteryNum += message.verifyReward.lotteryNum;
                }
                //发送钱币刷新消息
                Facade.instance.sendNotification(NotificationNames.UI_RefreshMoneyInfo);
            }
        }
        //发送通知
        Facade.instance.sendNotification(NotificationNames.VerifyUI_VerifyResult, message.result);
    }
}
