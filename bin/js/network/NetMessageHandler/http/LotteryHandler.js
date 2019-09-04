var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var LotteryHandler = (function (_super) {
    __extends(LotteryHandler, _super);
    function LotteryHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LotteryHandler.prototype.BaseMsgHandler = function (data) {
        var message = com.msg.s_Lottery_2301.decode(data);
        Log.Debug("收到 s_CheckLotteryRewardHistroy_2303:", message);
        //收到抽奖结果
        if (message.result == 1) {
            //抽奖成功
            //抽奖次数-1
            GameDataManager.getInstance().LoginPlayerInfo.MoneyInfo.lotteryNum -= 1;
            //将configID保存到临时数组中
            Facade.instance.sendNotification(NotificationNames.InviteFriendUI_LotteryResult, message.rewardConfigID);
            //直接在此处保存数据，但不刷新
            var config = ConfigManager.GetInstance().GetLotteryRewardConfig(message.rewardConfigID);
            switch (config.rewardType) {
                case 0: {
                    //实体
                    break;
                }
                case 1: {
                    //金币
                    GameDataManager.getInstance().LoginPlayerInfo.MoneyInfo.goldNum += config.rewardNum;
                    break;
                }
                case 2: {
                    //钻石
                    GameDataManager.getInstance().LoginPlayerInfo.MoneyInfo.diamondNum += config.rewardNum;
                    break;
                }
                case 3: {
                    //体力
                    GameDataManager.getInstance().LoginPlayerInfo.MoneyInfo.pointNum += config.rewardNum;
                    break;
                }
                default:
                    break;
            }
        }
        else {
            //抽奖失败
            Facade.instance.sendNotification(NotificationNames.InviteFriendUI_LotteryResult, -1);
        }
    };
    return LotteryHandler;
}(BaseMsgHandler));
//# sourceMappingURL=LotteryHandler.js.map