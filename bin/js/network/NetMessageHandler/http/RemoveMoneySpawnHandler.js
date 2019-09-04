var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var RemoveMoneySpawnHandler = (function (_super) {
    __extends(RemoveMoneySpawnHandler, _super);
    function RemoveMoneySpawnHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RemoveMoneySpawnHandler.prototype.BaseMsgHandler = function (data) {
        var message = com.msg.s_RemoveMoneySpawn_2037.decode(data);
        Log.Debug("获取信息 s_RemoveMoneySpawn_2037:%o", message);
        //移除钱币产能
        if (message.result == 1) {
            //成功
            //客户端移除
            var allList = GameDataManager.getInstance().LoginPlayerInfo.MoneyInfo.spawnList;
            var index = -1;
            for (var i = 0; i < allList.length; i++) {
                var element = allList[i];
                if (element.spawnID == message.spawnID) {
                    index = i;
                    break;
                }
            }
            //移除
            GameDataManager.getInstance().LoginPlayerInfo.MoneyInfo.spawnList.splice(index, 1);
            //通知
            Facade.instance.sendNotification(NotificationNames.HomepageUI_RemoveMoneySpawn, message.spawnID);
        }
        else {
            //失败
            Log.Error("移除钱币产能失败");
        }
    };
    return RemoveMoneySpawnHandler;
}(BaseMsgHandler));
//# sourceMappingURL=RemoveMoneySpawnHandler.js.map