/*
* 呼叫支援
*/
var CallAllianceBuff = (function () {
    function CallAllianceBuff() {
        this.timerId = -1;
    }
    CallAllianceBuff.prototype.Start = function (parent, param, onEndCallback) {
        this.state = EnumBuffState.Start;
        this.onEnd = onEndCallback;
        CallAllianceBuff.config = ConfigManager.GetInstance().GetBuffConfig(EnumBuffType.CallAlliance);
        ;
        // this.InitWeaponParam();
        this.resetParam();
        //初始化池
        GamePoolManager.Instance.InitPool(CallAllianceBuff.GetPoolID(), 1, AlliancePlane);
        this.StartChildPlane(parent, CallAllianceBuff.config);
        this.startTimer();
    };
    //开始计时
    CallAllianceBuff.prototype.startTimer = function () {
        var _this = this;
        this.timerId = TimeManager.getInst().once(CallAllianceBuff.config.duration, cbhandler.gen_handler(function () {
            Log.Debug("callaliance 技能到时间 %i ", _this.timerId);
            _this.timerId = -1;
            // this.End(parent, null);
            _this.onEnd();
            _this.onEnd = null;
        }, this));
    };
    //停止计时
    CallAllianceBuff.prototype.stopTimer = function () {
        if (this.timerId >= 0) {
            Log.Debug("callaliance 技能clean up %i ", this.timerId);
            TimeManager.getInst().remove(this.timerId);
        }
        this.timerId = -1;
    };
    //连续获取buff, 刷新效果
    CallAllianceBuff.prototype.Refresh = function (parent, onEndCallback, param) {
        this.onEnd = onEndCallback;
        if (this.state == EnumBuffState.Start) {
            this.stopTimer();
            this.startTimer();
        }
        else {
            //正在执行结束动画, 直接打断, 重新开始
            this.Stop(parent, null);
            this.Start(parent, param, this.onEnd);
        }
    };
    CallAllianceBuff.prototype.Stop = function (parent, param) {
        //销毁产生的子飞机
        for (var index = 0; index < this.spawnedPlane.length; index++) {
            var childPlane = this.spawnedPlane[index];
            this.StopChildPlane(childPlane);
        }
        this.cleanUp(parent, null);
        this.state = EnumBuffState.Complete;
    };
    CallAllianceBuff.prototype.End = function (parent, onEndComplete, param) {
        var _this = this;
        this.state = EnumBuffState.Ending;
        var completedCount = 0;
        var targetCount = this.spawnedPlane.length;
        //销毁产生的子飞机
        for (var index = 0; index < this.spawnedPlane.length; index++) {
            var childPlane = this.spawnedPlane[index];
            this.EndChildPlane(childPlane, function () {
                completedCount++;
                if (completedCount == targetCount)
                    _this.cleanUp(parent, onEndComplete);
            });
        }
        if (completedCount == targetCount)
            this.cleanUp(parent, onEndComplete);
    };
    CallAllianceBuff.prototype.cleanUp = function (parent, onEndComplete) {
        //停止发射子弹
        this.stopTimer();
        GamePoolManager.Instance.Destory(CallAllianceBuff.GetPoolID());
        this.state = EnumBuffState.Complete;
        if (onEndComplete)
            onEndComplete();
    };
    CallAllianceBuff.GetPoolID = function () {
        return "CallAllianceBuff" + CallAllianceBuff.config.GetID();
    };
    CallAllianceBuff.prototype.resetParam = function () {
        this.spawnedPlane = [];
    };
    //执行技能
    CallAllianceBuff.prototype.StartChildPlane = function (player, config) {
        var plane = GamePoolManager.Instance.Spawn(CallAllianceBuff.GetPoolID());
        //设置子飞机属性
        // plane.Duration = CallAllianceBuff.DURATION;//存活时间
        // plane.AttackDamage = CallAllianceBuff.ATTACK_DAMAGE;
        //开始子飞机执行逻辑  排列在主机左右, 随主机移动, 发射子弹
        plane.start(player);
        //记录产生的飞机
        this.recordChildPlane(plane);
    };
    //子飞机执行正常结束
    CallAllianceBuff.prototype.EndChildPlane = function (childPlane, OnCompleted) {
        var _this = this;
        //添加技能结束的处理, 比如淡出动画, 再回收
        childPlane.end(function () {
            //回收动作完成才删除记录
            _this.deleteChildPlaneRecord(childPlane);
            OnCompleted();
        });
    };
    //打断子飞机执行
    CallAllianceBuff.prototype.StopChildPlane = function (childPlane) {
        this.deleteChildPlaneRecord(childPlane);
        childPlane.stop();
    };
    //记录产生的子飞机
    CallAllianceBuff.prototype.recordChildPlane = function (childPlane) {
        this.spawnedPlane.push(childPlane);
    };
    //删除飞机记录
    CallAllianceBuff.prototype.deleteChildPlaneRecord = function (childPlane) {
        this.spawnedPlane.splice(this.spawnedPlane.indexOf(childPlane), 1); //删除记录
    };
    return CallAllianceBuff;
}());
//# sourceMappingURL=CallAllianceBuff.js.map