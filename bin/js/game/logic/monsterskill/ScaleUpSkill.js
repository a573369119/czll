/*
* 体形变化
*/
var ScaleUpSkill = (function () {
    function ScaleUpSkill() {
        this.count = 0; //计数
    }
    ScaleUpSkill.prototype.InitParam = function (config) {
        //let config = ConfigManager.GetInstance().GetSkillConfig(EnumMonsterPowerId.ScaleUp)
        ScaleUpSkill.DURATION = config.Param1;
        ScaleUpSkill.TWEEN_TIME = config.Param2;
        ScaleUpSkill.SCALE_SIZE = config.Param3;
        ScaleUpSkill.MIN_FIRE_INTERVAL = config.Param4;
        ScaleUpSkill.MAX_FIRE_INTERVAL = config.Param5;
    };
    ScaleUpSkill.prototype.Start = function (player) {
        var param = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            param[_i - 1] = arguments[_i];
        }
        this.config = param[0];
        this.InitParam(this.config);
        this.reset();
        this.startScalUpTimer(player, param);
    };
    ScaleUpSkill.prototype.Stop = function (parent, param) {
        this.End(parent, null, param);
    };
    ScaleUpSkill.prototype.End = function (parent, onEndComplete, param) {
        if (this.timerId >= 0)
            TimeManager.getInst().remove(this.timerId);
        this.timerId = -1;
        if (this.curTweenId >= 0)
            Tween2DUtil.getInst().kill(this.curTweenId);
        this.curTweenId = -1;
        if (onEndComplete)
            onEndComplete();
    };
    //开始计时
    ScaleUpSkill.prototype.startScalUpTimer = function (player, param) {
        this.interval = ScaleUpSkill.MIN_FIRE_INTERVAL + Math.random() * (ScaleUpSkill.MAX_FIRE_INTERVAL - ScaleUpSkill.MIN_FIRE_INTERVAL);
        //间隔ns
        this.timerId = TimeManager.getInst().once(this.interval, cbhandler.gen_handler(this.exe, this, player, param, true));
    };
    //开始恢复状态计时
    ScaleUpSkill.prototype.startScaleBackTimer = function (player, param) {
        //间隔ns
        this.timerId = TimeManager.getInst().once(ScaleUpSkill.DURATION, cbhandler.gen_handler(this.exe, this, player, param, false));
    };
    //执行动画
    ScaleUpSkill.prototype.exe = function (player, param, scaleUp) {
        if (scaleUp) {
            this.scaleUp(player, this.startScaleBackTimer.bind(this, player, param));
        }
        else {
            this.scaleBack(player, this.startScalUpTimer.bind(this, player, param));
        }
        // this.count++;
    };
    ScaleUpSkill.prototype.reset = function () {
        this.curTweenId = -1;
        this.timerId = -1;
        this.interval = 0;
        this.count = 0;
    };
    //放大
    ScaleUpSkill.prototype.scaleUp = function (player, onEnd) {
        player.attributeComp.AdjustScale2 = ScaleUpSkill.SCALE_SIZE;
        var targetScale = player.attributeComp.Scale; //.mul(ScaleUpSkill.SCALE_SIZE);
        this.curTweenId = Tween2DUtil.getInst().to({
            node: player.viewComp.View,
            duration: ScaleUpSkill.TWEEN_TIME,
            delay: 0,
            scalex: targetScale.x,
            scaley: targetScale.y,
            // x: targetPos.x,
            // y: targetPos.y,
            // rotation: 20,
            tweenFunc: TweenFunc.Sine.easeInOut,
            onComplete: cbhandler.gen_handler(function () {
                // player.attributeComp.Scale = targetScale
                player.RefreshScale();
                onEnd();
            }, this),
        });
    };
    //还原
    ScaleUpSkill.prototype.scaleBack = function (player, onEnd) {
        player.attributeComp.AdjustScale2 = 1;
        var targetScale = player.attributeComp.Scale;
        this.curTweenId = Tween2DUtil.getInst().to({
            node: player.viewComp.View,
            duration: ScaleUpSkill.TWEEN_TIME,
            delay: 0,
            scalex: targetScale.x,
            scaley: targetScale.y,
            // x: targetPos.x,
            // y: targetPos.y,
            // rotation: 20,
            tweenFunc: TweenFunc.Sine.easeInOut,
            onComplete: cbhandler.gen_handler(function () {
                // player.attributeComp.Scale = targetScale
                player.RefreshScale();
                onEnd();
            }, this),
        });
    };
    return ScaleUpSkill;
}());
//# sourceMappingURL=ScaleUpSkill.js.map