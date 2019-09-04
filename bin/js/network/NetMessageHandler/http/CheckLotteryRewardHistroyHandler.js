var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var CheckLotteryRewardHistroyHandler = (function (_super) {
    __extends(CheckLotteryRewardHistroyHandler, _super);
    function CheckLotteryRewardHistroyHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CheckLotteryRewardHistroyHandler.prototype.BaseMsgHandler = function (data) {
        var message = com.msg.s_CheckLotteryRewardHistroy_2303.decode(data);
        Log.Debug("收到 s_CheckLotteryRewardHistroy_2303:", message);
        Facade.instance.sendNotification(NotificationNames.LotteryRewardHistUI_CheckResult, message);
    };
    return CheckLotteryRewardHistroyHandler;
}(BaseMsgHandler));
//# sourceMappingURL=CheckLotteryRewardHistroyHandler.js.map