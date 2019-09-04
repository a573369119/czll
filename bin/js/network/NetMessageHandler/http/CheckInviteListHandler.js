var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var CheckInviteListHandler = (function (_super) {
    __extends(CheckInviteListHandler, _super);
    function CheckInviteListHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CheckInviteListHandler.prototype.BaseMsgHandler = function (data) {
        var message = com.msg.s_CheckInviteList_2043.decode(data);
        Log.Debug("获取信息 s_CheckInviteList_2043:%o", message);
        //查询邀请列表
        if (message.inviteList) {
            //本地保存
            //排序，按照index从小到大
            var list = SortUtil.orderby(message.inviteList, function (i) { return i.index; });
            GameDataManager.getInstance().LoginPlayerInfo.InvitedList = list;
            //2019-6-12 14:37:51 通知面板刷新
            Facade.instance.sendNotification(NotificationNames.InviteFriendUI_CheckInviteListComplete);
        }
    };
    return CheckInviteListHandler;
}(BaseMsgHandler));
//# sourceMappingURL=CheckInviteListHandler.js.map