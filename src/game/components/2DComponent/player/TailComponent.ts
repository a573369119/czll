/*
* name;
*/
class TailComponent extends ComponentBase2D {
    private tailAnim: Laya.Animation = null;
    private animCacheName: string = "animCacheName"
    constructor(sideWeaponId: EnumSideWeaponType) {
        super();
        this.CreateAnimation(sideWeaponId);
    }

    onAdd(): void {

    }
    onRemove(): void {
        if (this.tailAnim) {
            this.tailAnim.destroy(true)
            this.tailAnim = null;
        }
    }

    private CreateAnimation(sideWeaponId: EnumSideWeaponType) {
        if (this.tailAnim) return;
        let config = ConfigManager.GetInstance().GetWeaponConfig(sideWeaponId)
        this.tailAnim = new Laya.Animation();
        //加载动画图集，加载成功后执行回调方法
        this.tailAnim.loadAtlas("res/atlas/resources/tailAnim.atlas", Laya.Handler.create(this, this.onLoaded, [config]), this.animCacheName);
    }

    private onLoaded(config: WeaponConfigConfigData) {
        this.player.comParent.addChild(this.tailAnim);
        this.tailAnim.zOrder = -1;//保持在机体的底部
        this.tailAnim.interval = ConstDefine.TAIL_ANIM_INTERVAL;
        this.tailAnim.play(0, true, this.animCacheName, true)

        this.SetTailPosByWeapon(config)
    }

    SetTailPosByWeapon(config: WeaponConfigConfigData) {
        if (this.tailAnim) {
            this.tailAnim.pos(config.TailAnimPos[0] + 18, config.TailAnimPos[1])
        }
    }
}