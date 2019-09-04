var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MatchCompleteHandler = (function (_super) {
    __extends(MatchCompleteHandler, _super);
    function MatchCompleteHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MatchCompleteHandler.prototype.BaseMsgHandler = function (data) {
        var message = com.msg.s_MatchComplete_2100.decode(data);
        Log.Debug("获取信息 s_MatchComplete_2100:%o", message);
        //2019-6-26 15:57:14 结算时，所有状态都会发送领取信息
        //1.无论是否顺利过关，直接保存新返回的关卡进度
        GameDataManager.getInstance().LoginPlayerInfo.CurLevel = message.latestUnCompletedLevelID;
        //2.无论多少奖励，直接叠加
        GameDataManager.getInstance().LoginPlayerInfo.MoneyInfo.goldNum += message.goldReward;
        Facade.instance.sendNotification(NotificationNames.UI_RefreshMoneyInfo);
        Facade.instance.sendNotification(NotificationNames.ResultUI_Finish);
    };
    return MatchCompleteHandler;
}(BaseMsgHandler));
//# sourceMappingURL=MatchCompleteHandler.js.map