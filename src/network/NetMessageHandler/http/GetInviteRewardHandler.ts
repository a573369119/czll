class GetInviteRewardHandler extends BaseMsgHandler {
    public BaseMsgHandler(data: Uint8Array) {
        let message: com.msg.s_GetInviteReward_2045 = com.msg.s_GetInviteReward_2045.decode(data)

        Log.Debug("获取信息 s_GetInviteReward_2045:%o", message);

        //领取邀请奖励
        if (message.result == 1) {
            //领取成功
            //根据好友openid，更换状态
            for (let i = 0; i < GameDataManager.getInstance().LoginPlayerInfo.InvitedList.length; i++) {
                let element = GameDataManager.getInstance().LoginPlayerInfo.InvitedList[i];
                if (element.friendOpenID == message.rewardInfo.friendOpenID) {
                    if (element.rewardGained == 0 && message.rewardInfo.rewardGained == 1) {
                        //本次领取的是邀请奖励，是钻石
                        //本地保存钱包信息
                        GameDataManager.getInstance().LoginPlayerInfo.MoneyInfo.diamondNum += message.rewardInfo.rewardNum;
                    }
                    //保存信息
                    GameDataManager.getInstance().LoginPlayerInfo.InvitedList[i] = message.rewardInfo;
                }
            }
            //发送消息
            Facade.instance.sendNotification(NotificationNames.InviteFriendUI_RefreshFriendListInfo, message.rewardInfo.friendOpenID);
            Facade.instance.sendNotification(NotificationNames.UI_RefreshMoneyInfo);

        } else {
            //领取失败
            Log.Debug("领取奖励失败！");
        }

    }
}
