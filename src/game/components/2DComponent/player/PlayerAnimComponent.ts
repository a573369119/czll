/*
* name;
*/
class PlayerAnimComponent extends ComponentBase2D {
    onAdd(): void {

    }
    onRemove(): void {

    }

    private rebornAlphaAnimTweenId: number = -1;
    //恢复的明暗动画 duration:动画时间
    public PlayRebornAlphaAnim(onComplete: Function, duration: number) {
        this.rebornAlphaAnimTweenId = Tween2DUtil.getInst().to({
            node: this.player.viewComp.View,
            duration: 0.5, //duration / 2,
            alpha: .2,
            repeated: duration / 0.5,
            tweenFunc: TweenFunc.PingPong.easeInOut,
            onComplete: cbhandler.gen_handler(() => {
                // Log.Debug("end")
                this.rebornAlphaAnimTweenId = -1;
                if (onComplete) onComplete();
            },
                this)
        })
    }
    public StopRebornAlphaAnim() {
        if (this.rebornAlphaAnimTweenId > 0) {
            Tween2DUtil.getInst().kill(this.rebornAlphaAnimTweenId)
            this.rebornAlphaAnimTweenId = -1;
        }

    }

}