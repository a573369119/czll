var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MatchStartHandler = (function (_super) {
    __extends(MatchStartHandler, _super);
    function MatchStartHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MatchStartHandler.prototype.BaseMsgHandler = function (data) {
        var message = com.msg.s_MatchStart_2101.decode(data);
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
        }
        else {
        }
    };
    return MatchStartHandler;
}(BaseMsgHandler));
//# sourceMappingURL=MatchStartHandler.js.map