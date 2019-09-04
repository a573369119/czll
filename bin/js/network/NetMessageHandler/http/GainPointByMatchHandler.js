var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GainPointByMatchHandler = (function (_super) {
    __extends(GainPointByMatchHandler, _super);
    function GainPointByMatchHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GainPointByMatchHandler.prototype.BaseMsgHandler = function (data) {
        var message = com.msg.s_GainPointByMatch_2053.decode(data);
        Log.Debug("获取信息 s_GainPointByMatch_2053:%o", message);
        //因比赛结束获取体力
        if (message.result == 1) {
            //获取成功
            //本地保存
            GameDataManager.getInstance().LoginPlayerInfo.MoneyInfo.pointNum = message.pointNum;
            //发送消息通知
            Facade.instance.sendNotification(NotificationNames.ResultUI_GainPower);
            Facade.instance.sendNotification(NotificationNames.UI_RefreshMoneyInfo);
        }
        else {
        }
    };
    return GainPointByMatchHandler;
}(BaseMsgHandler));
//# sourceMappingURL=GainPointByMatchHandler.js.map