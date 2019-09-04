/*
* name;
*/
class HitComponentBase2D extends ComponentBase2D {

    private timer: number = -1;
    private checkHitInterval: number = 0.1;

    public onReomove(): void {
        this.stopCheckHit();
    }

    public startCheckHit(): void {
        this.timer = TimeManager.getInst().loop(this.checkHitInterval, (cbhandler.gen_handler(this.checkHitHandler, this)));
    }

    public stopCheckHit(): void {
        if (this.timer < 0) return;
        TimeManager.getInst().remove(this.timer);
        this.timer = -1;
    }

    //子类扩展实现具体方法
    public checkHitHandler(): void {
        //TODO  this.player.viewComp.checkHit()
    }
}