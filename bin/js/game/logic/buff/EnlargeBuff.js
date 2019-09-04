/*
* name;
*/
var EnlargeBuff = (function () {
    function EnlargeBuff() {
        this.timerId = -1;
    }
    EnlargeBuff.prototype.Start = function (parent, param, onEndCallback) {
        var _this = this;
        this.onEnd = onEndCallback;
        this.config = ConfigManager.GetInstance().GetBuffConfig(EnumBuffType.Enlarge);
        ;
        //间隔ns
        this.timerId = TimeManager.getInst().once(this.config.duration, cbhandler.gen_handler(function () {
            _this.timerId = -1;
            // this.End(parent, null);
            _this.onEnd();
            _this.onEnd = null;
        }, this));
        Facade.instance.sendNotification(NotificationNames.MONSTER_ENLARGE, true);
    };
    //连续获取buff, 刷新效果
    EnlargeBuff.prototype.Refresh = function (parent, onEndCallback, param) {
        this.onEnd = onEndCallback;
        this.Stop(parent, null);
        this.Start(parent, param, this.onEnd);
    };
    EnlargeBuff.prototype.Stop = function (parent, param) {
        this.End(parent, null, param);
    };
    EnlargeBuff.prototype.End = function (parent, onEndComplete, param) {
        //停止发射子弹
        if (this.timerId >= 0)
            TimeManager.getInst().remove(this.timerId);
        this.timerId = -1;
        Facade.instance.sendNotification(NotificationNames.MONSTER_ENLARGE, false);
        if (onEndComplete)
            onEndComplete();
    };
    return EnlargeBuff;
}());
//# sourceMappingURL=EnlargeBuff.js.map