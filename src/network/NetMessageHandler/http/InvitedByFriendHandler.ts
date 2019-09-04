class InvitedByFriendHandler extends BaseMsgHandler {
    public BaseMsgHandler(data: Uint8Array) {
        let message: com.msg.s_InvitedByFriend_2041 = com.msg.s_InvitedByFriend_2041.decode(data)

        Log.Debug("获取信息 s_InvitedByFriend_2041:%o", message);

        //因好友邀请进入游戏
        //这是给别人的奖励，自己应该不会有什么东西
        //除非策划又改需求了
        if (message.result == 1) {
            //验证成功

        } else {
            //验证失败

        }
    }
}
