var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var InvitedByFriendHandler = (function (_super) {
    __extends(InvitedByFriendHandler, _super);
    function InvitedByFriendHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InvitedByFriendHandler.prototype.BaseMsgHandler = function (data) {
        var message = com.msg.s_InvitedByFriend_2041.decode(data);
        Log.Debug("获取信息 s_InvitedByFriend_2041:%o", message);
        //因好友邀请进入游戏
        //这是给别人的奖励，自己应该不会有什么东西
        //除非策划又改需求了
        if (message.result == 1) {
        }
        else {
        }
    };
    return InvitedByFriendHandler;
}(BaseMsgHandler));
//# sourceMappingURL=InvitedByFriendHandler.js.map