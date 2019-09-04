/*
* 怪物减速
*/
var WeakenBuff = (function () {
    function WeakenBuff() {
        this.timerId = -1;
    }
    WeakenBuff.prototype.Start = function (parent, param, onEndCallback) {
        var _this = this;
        this.onEnd = onEndCallback;
        this.config = ConfigManager.GetInstance().GetBuffConfig(EnumBuffType.Weaken);
        ;
        //间隔ns
        this.timerId = TimeManager.getInst().once(this.config.duration, cbhandler.gen_handler(function () {
            _this.timerId = -1;
            // this.End(parent, null);
            _this.onEnd();
            _this.onEnd = null;
        }, this));
        //怪物减速
        if (WeakenBuff.weakenScale < 0)
            WeakenBuff.weakenScale = ConfigManager.GetInstance().GetBuffConfig(EnumBuffType.Weaken).Param1;
        //MonsterMoveComponent2D.SpeedScale = WeakenBuff.weakenScale;
        Facade.instance.sendNotification(NotificationNames.MONSTER_PAUSE, WeakenBuff.weakenScale);
    };
    //连续获取buff, 刷新效果
    WeakenBuff.prototype.Refresh = function (parent, onEndCallback, param) {
        this.onEnd = onEndCallback;
        this.Stop(parent, null);
        this.Start(parent, param, this.onEnd);
    };
    WeakenBuff.prototype.Stop = function (parent, param) {
        this.End(parent, null, param);
    };
    WeakenBuff.prototype.End = function (parent, onEndComplete, param) {
        //停止发射子弹
        if (this.timerId >= 0)
            TimeManager.getInst().remove(this.timerId);
        this.timerId = -1;
        //MonsterMoveComponent2D.SpeedScale = 1;
        Facade.instance.sendNotification(NotificationNames.MONSTER_PAUSE, 1);
        if (onEndComplete)
            onEndComplete();
    };
    return WeakenBuff;
}());
WeakenBuff.weakenScale = -1;
//# sourceMappingURL=WeakenBuff.js.map