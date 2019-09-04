/*
* 道具
*/
class Prop extends PlayerBase2D implements IScriptPoolObject<Prop> {
    private propType: EnumPropType;
    public get Type(): EnumPropType { return this.propType }

    private moveCom: PropMoveComponent;
    private config: PropConfigConfigData;   //配置表
    private value: number = 1;
    public get PropBuff(): EnumBuffType { return this.config.BuffConfigID; }//道具带的buff

    public beforeCreate(): void {
        super.beforeCreate();
    }

    public initComponent(): void {

        this.moveCom = new PropMoveComponent()
        this.viewComp = new ImageViewComponent(this.config.PropImagePath);

        this.addComponent(this.viewComp);
        this.addComponent(this.moveCom);

        this.viewComp.SetActive(false);//this.comParent.visible = false; //this.viewComp.SetActive(false)
        this.comParent.name = "PropID" + EnumPropType[this.Type]
    }

    InitPool(pool: ScriptObjectPool<Prop>, type: EnumPropType) {
        this.propType = type;
        this.config = ConfigManager.GetInstance().GetPropConfig(this.propType);
        this.initComponent();
    }

    OnSpawn() {
        this.uId = IDGenerator.GenPropID();
        this.GoLive();
        this.propOnSpawn();
    }

    OnRecycle() {
        this.propOnRecycle();
        this.Die();
    }

    OnDestory() {
        this.DestroyPlayer();
        this.config = null;
    }

    public GetCollisionShapeInfo(): CollsionShapInfo {
        let size = this.config.ColliderSize;
        let pos = CommonUtil2D.GetPosUnderTargetObj(this.comParent, StageManager.GetInstance().playerParent);
        return new BoxCollisonInfo(new Vec2(pos.x, pos.y), new Vec2(size[0], size[1]))
    }
    /////////////////////////////////////////////////////////////
    //
    private timerId: number = -1;
    private timerId2: number = -1;
    //子类扩展
    protected propOnSpawn(): void {
        this.moveCom.StartMovement();
        this.startDurationTimer();
    }

    protected propOnRecycle(): void {
        this.moveCom.StopMovement();
        this.stopTimer();
    }

    //10s内未领取, 消失
    private startDurationTimer() {
        this.timerId = TimeManager.getInst().once(this.config.Duration, cbhandler.gen_handler(() => {
            this.timerId = -1;
            PropManager.GetInstance().Recycle(this.propType, this);
        }));
        this.timerId2 = TimeManager.getInst().once(this.config.Duration - 3, cbhandler.gen_handler(() => {
            this.timerId2 = -1;
            this.shake();
        }));
    }

    private shake(): void {
        let value = Math.pow(-1, this.value);
        if (value > 0) {
            value = 1;
        } else {
            value = 0;
        }
        // console.log("to alpha " + value);
        Laya.Tween.to(
            this.viewComp.View,
            {
                "alpha": value,
            },
            500,
            null,
            Laya.Handler.create(this, function () {
                if (this.value++ <= 6) this.shake();
            })
        )
    }

    private stopTimer() {
        if (this.timerId >= 0) {
            TimeManager.getInst().remove(this.timerId2);
            TimeManager.getInst().remove(this.timerId);
        }
        this.timerId = -1;
        this.timerId2 = -1
    }

}