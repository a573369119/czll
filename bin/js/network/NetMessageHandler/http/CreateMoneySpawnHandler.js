var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var CreateMoneySpawnHandler = (function (_super) {
    __extends(CreateMoneySpawnHandler, _super);
    function CreateMoneySpawnHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CreateMoneySpawnHandler.prototype.BaseMsgHandler = function (data) {
        var message = com.msg.s_CreateMoneySpawn_2031.decode(data);
        Log.Debug("获取信息 s_CreateMoneySpawn_2031:%o", message);
        //创建钱币产能
        if (message.result == 1) {
            //创建成功
            //客户端保存
            GameDataManager.getInstance().LoginPlayerInfo.MoneyInfo.spawnList.push(message.newSpawnInfo);
            //发送通知
            Facade.instance.sendNotification(NotificationNames.HomepageUI_CreateMoneySpawn, message.newSpawnInfo);
        }
        else {
            //创建失败
            Log.Error("创建钱币产能失败！");
        }
    };
    return CreateMoneySpawnHandler;
}(BaseMsgHandler));
//# sourceMappingURL=CreateMoneySpawnHandler.js.map