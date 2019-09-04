/*
* 强化射速
*/
var FireSpeedBuff = (function () {
    function FireSpeedBuff() {
        this.timerId = -1;
    }
    FireSpeedBuff.prototype.Start = function (parent, param, onEndCallback) {
        var _this = this;
        this.onEnd = onEndCallback;
        this.config = ConfigManager.GetInstance().GetBuffConfig(EnumBuffType.FireSpeedIntensified);
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
            plane.ChangeBullet();
        }
        else {
            Log.Error("非Plane类型无法使用buff %s", EnumBuffType.FireSpeedIntensified);
        }
    };
    //连续获取buff, 刷新效果
    FireSpeedBuff.prototype.Refresh = function (parent, onEndCallback, param) {
        this.onEnd = onEndCallback;
        this.Stop(parent, null);
        this.Start(parent, param, this.onEnd);
    };
    FireSpeedBuff.prototype.Stop = function (parent, param) {
        this.End(parent, null, param);
    };
    FireSpeedBuff.prototype.End = function (parent, onEndComplete, param) {
        //停止发射子弹
        if (this.timerId >= 0)
            TimeManager.getInst().remove(this.timerId);
        this.timerId = -1;
        if (onEndComplete)
            onEndComplete();
        parent.ChangeBullet(EnumBulletOutLookType.MainPlayerBullet);
    };
    return FireSpeedBuff;
}());
//# sourceMappingURL=FireSpeedBuff.js.map