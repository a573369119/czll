/*
* name;
*/
var LimitInputBuff = (function () {
    function LimitInputBuff() {
        this.timerId = -1;
    }
    LimitInputBuff.prototype.Start = function (parent, param, onEndCallback) {
        var _this = this;
        this.onEnd = onEndCallback;
        this.config = ConfigManager.GetInstance().GetBuffConfig(EnumBuffType.LimitInput);
        ;
        //间隔ns
        this.timerId = TimeManager.getInst().once(this.config.duration, cbhandler.gen_handler(function () {
            _this.timerId = -1;
            // this.End(parent, null);
            _this.onEnd();
            _this.onEnd = null;
        }, this));
        InputComponent2D.InputScale = ConfigManager.GetInstance().GetBuffConfig(EnumBuffType.LimitInput).Param1;
    };
    //连续获取buff, 刷新效果
    LimitInputBuff.prototype.Refresh = function (parent, onEndCallback, param) {
        this.onEnd = onEndCallback;
        this.Stop(parent, null);
        this.Start(parent, param, this.onEnd);
    };
    LimitInputBuff.prototype.Stop = function (parent, param) {
        this.End(parent, null, param);
    };
    LimitInputBuff.prototype.End = function (parent, onEndComplete, param) {
        //停止发射子弹
        if (this.timerId >= 0)
            TimeManager.getInst().remove(this.timerId);
        this.timerId = -1;
        InputComponent2D.InputScale = 1;
        if (onEndComplete)
            onEndComplete();
    };
    return LimitInputBuff;
}());
//# sourceMappingURL=LimitInputBuff.js.map