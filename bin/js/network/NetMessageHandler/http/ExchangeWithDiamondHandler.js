var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ExchangeWithDiamondHandler = (function (_super) {
    __extends(ExchangeWithDiamondHandler, _super);
    function ExchangeWithDiamondHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ExchangeWithDiamondHandler.prototype.BaseMsgHandler = function (data) {
        var message = com.msg.s_ExchangeWithDiamond_2001.decode(data);
        Log.Debug("获取信息 s_ExchangeWithDiamond_2001:%o", message);
        //兑换结果
        if (message.result == 1) {
            //兑换成功
            GameDataManager.getInstance().LoginPlayerInfo.MoneyInfo = message.moneyInfo;
            //通知刷新
            Facade.instance.sendNotification(NotificationNames.UI_RefreshMoneyInfo);
            //通知兑换成功
            Facade.instance.sendNotification(NotificationNames.ExchangeUI_ExchangeResult);
        }
        else {
        }
    };
    return ExchangeWithDiamondHandler;
}(BaseMsgHandler));
//# sourceMappingURL=ExchangeWithDiamondHandler.js.map