/*
* name;
*/
var FirePowerBuff = (function () {
    function FirePowerBuff() {
        this.timerId = -1;
    }
    FirePowerBuff.prototype.Start = function (parent, param, onEndCallback) {
        var _this = this;
        this.onEnd = onEndCallback;
        this.config = ConfigManager.GetInstance().GetBuffConfig(EnumBuffType.PowerIntensified);
        ;
        //间隔ns
        this.timerId = TimeManager.getInst().once(this.config.duration, cbhandler.gen_handler(function () {
            _this.timerId = -1;
            // this.End(parent, null);
            _this.onEnd();
            _this.onEnd = null;
        }, this));
        //切换子弹
        var plane = parent;
        if (plane) {
            plane.ChangeBullet(EnumBulletOutLookType.MainPlayerBullet_PowerBuff);
        }
        else {
            Log.Error("非Plane类型无法使用buff %s", EnumBuffType.PowerIntensified);
        }
    };
    //连续获取buff, 刷新效果
    FirePowerBuff.prototype.Refresh = function (parent, onEndCallback, param) {
        this.onEnd = onEndCallback;
        this.Stop(parent, null);
        this.Start(parent, param, this.onEnd);
    };
    FirePowerBuff.prototype.Stop = function (parent, param) {
        this.End(parent, null, param);
    };
    FirePowerBuff.prototype.End = function (parent, onEndComplete, param) {
        //停止发射子弹
        if (this.timerId >= 0)
            TimeManager.getInst().remove(this.timerId);
        this.timerId = -1;
        if (onEndComplete)
            onEndComplete();
        parent.ChangeBullet(EnumBulletOutLookType.MainPlayerBullet);
    };
    return FirePowerBuff;
}());
//# sourceMappingURL=FirePowerBuff.js.map