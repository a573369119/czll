/*
* 体形变化
*/
class ScaleUpSkill implements ISkillLogic {
    public static DURATION: number;// = 2;
    public static TWEEN_TIME: number;// = 0.5;
    public static SCALE_SIZE: number;// = 2;
    public static MIN_FIRE_INTERVAL: number;// = 5; //触发频率
    public static MAX_FIRE_INTERVAL: number;// = 8; //触发频率
    private config: SkillConfigConfigData;
    private InitParam(config: SkillConfigConfigData) {
        //let config = ConfigManager.GetInstance().GetSkillConfig(EnumMonsterPowerId.ScaleUp)
        ScaleUpSkill.DURATION = config.Param1;
        ScaleUpSkill.TWEEN_TIME = config.Param2;
        ScaleUpSkill.SCALE_SIZE = config.Param3;
        ScaleUpSkill.MIN_FIRE_INTERVAL = config.Param4;
        ScaleUpSkill.MAX_FIRE_INTERVAL = config.Param5;
    }

    public Start(player: Monster, ...param: any[]) {
        this.config = param[0] as SkillConfigConfigData;
        this.InitParam(this.config);
        this.reset();
        this.startScalUpTimer(player, param)
    }

    public Stop(parent: PlayerBase2D, param: any) {
        this.End(parent, null, param)
    }

    public End(parent: PlayerBase2D, onEndComplete: Function, param: any) {
        if (this.timerId >= 0) TimeManager.getInst().remove(this.timerId);
        this.timerId = -1;
        if (this.curTweenId >= 0) Tween2DUtil.getInst().kill(this.curTweenId)
        this.curTweenId = -1;
        if (onEndComplete) onEndComplete();
    }

    ///////////////////////////////////////////////////////////////////////////////////
    //
    private curTweenId: number;//动画id
    private timerId: number;//计时
    private interval: number;//触发间隔
    private count: number = 0;//计数

    //开始计时
    private startScalUpTimer(player: Monster, param: any) {
        this.interval = ScaleUpSkill.MIN_FIRE_INTERVAL + Math.random() * (ScaleUpSkill.MAX_FIRE_INTERVAL - ScaleUpSkill.MIN_FIRE_INTERVAL);
        //间隔ns
        this.timerId = TimeManager.getInst().once(this.interval, cbhandler.gen_handler(this.exe, this, player, param, true));
    }

    //开始恢复状态计时
    private startScaleBackTimer(player: Monster, param: any) {
        //间隔ns
        this.timerId = TimeManager.getInst().once(ScaleUpSkill.DURATION, cbhandler.gen_handler(this.exe, this, player, param, false));
    }

    //执行动画
    private exe(player: Monster, param: any, scaleUp: boolean) {
        if (scaleUp) {//(this.count % 2 == 0) {
            this.scaleUp(player, this.startScaleBackTimer.bind(this, player, param));
        } else {
            this.scaleBack(player, this.startScalUpTimer.bind(this, player, param));
        }
        // this.count++;
    }


    private reset() {
        this.curTweenId = -1;
        this.timerId = -1;
        this.interval = 0;
        this.count = 0;
    }

    //放大
    private scaleUp(player: Monster, onEnd: Function) {
        player.attributeComp.AdjustScale2 = ScaleUpSkill.SCALE_SIZE;
        let targetScale = player.attributeComp.Scale;//.mul(ScaleUpSkill.SCALE_SIZE);
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
            onComplete: cbhandler.gen_handler(
                () => {
                    // player.attributeComp.Scale = targetScale
                    player.RefreshScale();
                    onEnd();
                }, this),
        })
    }

    //还原
    private scaleBack(player: Monster, onEnd: Function) {
        player.attributeComp.AdjustScale2 = 1;
        let targetScale = player.attributeComp.Scale;
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
            onComplete: cbhandler.gen_handler(
                () => {
                    // player.attributeComp.Scale = targetScale
                    player.RefreshScale();
                    onEnd();
                }, this),
        })
    }
}