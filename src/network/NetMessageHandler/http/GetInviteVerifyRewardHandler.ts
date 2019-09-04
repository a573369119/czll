class GetInviteVerifyRewardHandler extends BaseMsgHandler {
    public BaseMsgHandler(data: Uint8Array) {
        let message: com.msg.s_GetInviteVerifyReward_2047 = com.msg.s_GetInviteVerifyReward_2047.decode(data)


        //领取邀请奖励
        if (message.result == 1) {
            //领取成功
            //根据好友openid，更换状态
            for (let i = 0; i < GameDataManager.getInstance().LoginPlayerInfo.InvitedList.length; i++) {
                let element = GameDataManager.getInstance().LoginPlayerInfo.InvitedList[i];
                if (element.friendOpenID == message.firendInfo.friendOpenID) {
                    if (element.rewardGained == 0 && message.firendInfo.rewardGained == 1) {
                        //本次领取的是邀请奖励，是钻石
                        //本地保存钱包信息
                        GameDataManager.getInstance().LoginPlayerInfo.MoneyInfo.diamondNum += message.rewardNum;
                    } else if (element.rewardGained == 2 && message.firendInfo.rewardGained == 3) {
                        //本次领取的是绑定奖励，是抽奖次数
                        //本地保存抽奖信息
                        GameDataManager.getInstance().LoginPlayerInfo.MoneyInfo.lotteryNum += message.rewardNum;
                        //单独发送消息刷新
                        Facade.instance.sendNotification(NotificationNames.InviteFriendUI_RefreshLotteryNum, message.rewardNum);
                    }
                    //保存信息
                    GameDataManager.getInstance().LoginPlayerInfo.InvitedList[i] = message.firendInfo;
                }
            }
            //发送消息
            Facade.instance.sendNotification(NotificationNames.InviteFriendUI_RefreshFriendListInfo, message.firendInfo.friendOpenID);
            Facade.instance.sendNotification(NotificationNames.UI_RefreshMoneyInfo);
        } else {
            //领取失败
            Log.Debug("领取奖励失败！");
        }

    }
}