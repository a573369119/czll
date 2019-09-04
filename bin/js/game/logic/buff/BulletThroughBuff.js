/*
* name;
*/
var BulletThroughBuff = (function () {
    function BulletThroughBuff() {
        this.timerId = -1;
    }
    BulletThroughBuff.prototype.Start = function (parent, param, onEndCallback) {
        var _this = this;
        this.onEnd = onEndCallback;
        this.config = ConfigManager.GetInstance().GetBuffConfig(EnumBuffType.BulletThrough);
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
            plane.SetBulletThroughable(true);
        }
        else {
            Log.Error("非Plane类型无法使用buff %s", EnumBuffType.BulletThrough);
        }
    };
    //连续获取buff, 刷新效果
    BulletThroughBuff.prototype.Refresh = function (parent, onEndCallback, param) {
        this.onEnd = onEndCallback;
        this.Stop(parent, null);
        this.Start(parent, param, this.onEnd);
    };
    BulletThroughBuff.prototype.Stop = function (parent, param) {
        this.End(parent, null, param);
    };
    BulletThroughBuff.prototype.End = function (parent, onEndComplete, param) {
        //停止发射子弹
        if (this.timerId >= 0)
            TimeManager.getInst().remove(this.timerId);
        this.timerId = -1;
        parent.SetBulletThroughable(false);
        // (parent as Plane).ChangeBullet();
        if (onEndComplete)
            onEndComplete();
    };
    return BulletThroughBuff;
}());
//# sourceMappingURL=BulletThroughBuff.js.map