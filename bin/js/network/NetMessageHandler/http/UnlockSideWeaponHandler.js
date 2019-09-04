var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var UnlockSideWeaponHandler = (function (_super) {
    __extends(UnlockSideWeaponHandler, _super);
    function UnlockSideWeaponHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UnlockSideWeaponHandler.prototype.BaseMsgHandler = function (data) {
        var message = com.msg.s_UnlockSideWeapon_2023.decode(data);
        Log.Debug("获取信息 s_UnlockSideWeapon_2023:%o", message);
        //解锁副武器
        if (message.result == 1) {
            //解锁成功
            //保存提示状态
            StorageManager.SetUnlockNewSideweapon(true);
            //本地保存
            GameDataManager.getInstance().LoginPlayerInfo.AllSideWeaponList.push(message.sideWeaponInfo);
            //排序
            //发送消息
            Facade.instance.sendNotification(NotificationNames.HomepageUI_UnlockNewSideweapon);
        }
        else {
            //解锁失败
            Log.Debug("解锁副武器失败");
        }
    };
    return UnlockSideWeaponHandler;
}(BaseMsgHandler));
//# sourceMappingURL=UnlockSideWeaponHandler.js.map