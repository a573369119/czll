/*
* 电磁干扰buff :电磁干扰技能, 麻痹怪物param秒
*/
var MagnetFreezenBuff = (function () {
    function MagnetFreezenBuff() {
        this.timerId = -1;
        //////////////////////////////////////////////////////
        //逻辑, 
    }
    MagnetFreezenBuff.prototype.Start = function (parent, param, onEndCallback) {
        var _this = this;
        this.onEnd = onEndCallback;
        this.config = ConfigManager.GetInstance().GetBuffConfig(EnumBuffType.MagnetFreezen);
        ;
        // this.resetParam();
        //初始化电网池
        // GamePoolManager.Instance.InitPool<ChildPlane>(ChildPlaneWeapon.GetPoolID(), 5, ChildPlane)
        // 麻痹怪物param秒
        //间隔ns
        var duration = param;
        parent.Freeze(true);
        this.timerId = TimeManager.getInst().once(param, cbhandler.gen_handler(function () {
            parent.Freeze(false);
            _this.timerId = -1;
            // this.End(parent, null);
            _this.onEnd();
            _this.onEnd = null;
        }, this));
    };
    //连续获取buff, 刷新效果
    MagnetFreezenBuff.prototype.Refresh = function (parent, onEndCallback, param) {
        this.onEnd = onEndCallback;
        this.Stop(parent, null);
        this.Start(parent, param, this.onEnd);
    };
    MagnetFreezenBuff.prototype.Stop = function (parent, param) {
        this.End(parent, null, param);
    };
    MagnetFreezenBuff.prototype.End = function (parent, onEndComplete, param) {
        //停止发射子弹
        if (this.timerId >= 0)
            TimeManager.getInst().remove(this.timerId);
        this.timerId = -1;
        if (onEndComplete)
            onEndComplete();
        // GamePoolManager.Instance.Destory<ChildPlane>(ChildPlaneWeapon.GetPoolID());
    };
    return MagnetFreezenBuff;
}());
//# sourceMappingURL=MagnetFreezenBuff.js.map