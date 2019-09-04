var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var UpdateMoneySpawnHandler = (function (_super) {
    __extends(UpdateMoneySpawnHandler, _super);
    function UpdateMoneySpawnHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UpdateMoneySpawnHandler.prototype.BaseMsgHandler = function (data) {
        var message = com.msg.s_UpdateMoneySpawn_2033.decode(data);
        Log.Debug("获取信息 s_UpdateMoneySpawn_2033:%o", message);
        //更新钱币产能
        if (message.result == 1) {
            //成功
            //客户端保存
            for (var i = 0; i < GameDataManager.getInstance().LoginPlayerInfo.MoneyInfo.spawnList.length; i++) {
                if (GameDataManager.getInstance().LoginPlayerInfo.MoneyInfo.spawnList[i].spawnID == message.spawnInfo.spawnID) {
                    GameDataManager.getInstance().LoginPlayerInfo.MoneyInfo.spawnList[i] = message.spawnInfo;
                }
            }
            //通知
            Facade.instance.sendNotification(NotificationNames.HomepageUI_UpdateMoneySpawn, message.spawnInfo);
        }
        else {
            //失败
            Log.Error("更新钱币产能失败");
        }
    };
    return UpdateMoneySpawnHandler;
}(BaseMsgHandler));
//# sourceMappingURL=UpdateMoneySpawnHandler.js.map