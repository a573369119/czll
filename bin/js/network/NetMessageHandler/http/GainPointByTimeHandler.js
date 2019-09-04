var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GainPointByTimeHandler = (function (_super) {
    __extends(GainPointByTimeHandler, _super);
    function GainPointByTimeHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GainPointByTimeHandler.prototype.BaseMsgHandler = function (data) {
        var message = com.msg.s_GainPointByTime_2051.decode(data);
        Log.Debug("获取信息 s_GainPointByTime_2051:%o", message);
        //因倒计时周期结束，获取体力
        if (message.result == 1) {
            //获取体力成功
            //本地保存
            GameDataManager.getInstance().LoginPlayerInfo.MoneyInfo = message.moneyInfo;
            //发送通知
            Facade.instance.sendNotification(NotificationNames.UI_RefreshMoneyInfo);
        }
        else {
            Log.Error("倒计时结束 获取体力失败！");
        }
    };
    return GainPointByTimeHandler;
}(BaseMsgHandler));
//# sourceMappingURL=GainPointByTimeHandler.js.map