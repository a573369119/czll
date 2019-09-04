/*
* name;
*/
class MonsterShakeComponent extends ComponentBase2D {
    private shakeTask: number = -1;

    public onAdd(): void {

    }

    public onReomove(): void {

    }

    public Shake() {
        if (this.shakeTask < 0) {
            this.shakeTask = ShakeManager.GetInstance().ShakeMonster(this.player.viewComp.View,
                () => {
                    this.shakeTask = -1;
                }, 5, 0.2, 0)
        }
    }

    public OnRecycle() {
        if (this.shakeTask > 0) {
            // ShakeManager.GetInstance().StopShake(this.shakeTask)
            ShakeManager.GetInstance().StopShakeMonster(this.shakeTask)
            this.shakeTask = -1;
        }
    }
}