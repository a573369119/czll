class CheckInviteListHandler extends BaseMsgHandler {
    public BaseMsgHandler(data: Uint8Array) {
        let message: com.msg.s_CheckInviteList_2043 = com.msg.s_CheckInviteList_2043.decode(data)

        Log.Debug("获取信息 s_CheckInviteList_2043:%o", message);

        //查询邀请列表
        if (message.inviteList) {
            //本地保存
            //排序，按照index从小到大
            let list = SortUtil.orderby(message.inviteList, i => i.index);
            GameDataManager.getInstance().LoginPlayerInfo.InvitedList = list;
            //2019-6-12 14:37:51 通知面板刷新
            Facade.instance.sendNotification(NotificationNames.InviteFriendUI_CheckInviteListComplete)
        }

    }
}
