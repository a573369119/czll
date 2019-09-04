/*
* name;
*/
class Bullet extends PlayerBase2D implements IScriptPoolObject<Bullet>{

    //子弹类型
    protected bulletType: EnumBulletOutLookType;
    public get Type(): EnumBulletOutLookType { return this.bulletType }
    protected config: BulletConfigConfigData;

    //子弹造成的伤害
    private damage: number;
    public get DamageValue(): number { return this.damage; }
    public set DamageValue(value: number) { this.damage = value; }

    //是否穿透
    private through: boolean//是否穿透
    public get Through(): boolean { return this.through; }
    public set Through(value: boolean) { this.through = value; }

    public bulletMoveCom: BulletMoveComponent2D;
    public owner: BulletComponent2D;
    public isIt: boolean = false;

    public beforeCreate(): void {
        super.beforeCreate();
    }

    public initComponent(): void {
        super.initComponent();
        this.isIt = true;
        this.bulletMoveCom = new BulletMoveComponent2D()
        this.config = ConfigManager.GetInstance().GetBulletConfig(this.bulletType);
        this.viewComp = new ImageViewComponent(this.config.ImagePath);

        this.addComponent(this.viewComp);
        this.addComponent(this.bulletMoveCom);

        this.comParent.name = "Bullet"
    }

    public setBulletPos(posX: number, posY: number): void {
        this.comParent.x = posX;
        this.comParent.y = posY;
    }

    //获取碰撞区域大小
    // private tempBoxCollisionInfo: BoxCollisonInfo = null;
    public GetCollisionShapeInfo(): CollsionShapInfo {
        let config = this.config//ConfigManager.GetInstance().GetBulletConfig(this.Type)
        let pos = CommonUtil2D.GetPosUnderTargetObj(this.comParent, StageManager.GetInstance().playerParent);

        if (this.tempBoxCollisionInfo == null) this.tempBoxCollisionInfo = new BoxCollisonInfo(null, null);
        this.tempBoxCollisionInfo.center = new Vec2(pos.x, pos.y);
        this.tempBoxCollisionInfo.size = new Vec2(config.ColliderSize[0], config.ColliderSize[1]);
        this.tempBoxCollisionInfo.rotation = this.viewComp.View.rotation
        return this.tempBoxCollisionInfo;// new BoxCollisonInfo(new Vec2(pos.x, pos.y), new Vec2(config.ColliderSize[0], config.ColliderSize[1]), this.viewComp.View.rotation)
    }

    InitPool(pool: ScriptObjectPool<Bullet>, bulletConfigID: number) {
        this.bulletType = bulletConfigID;
        //TODO 通过传递参数 子弹的类型
        if (!this.isIt) {
            this.initComponent();
            this.viewComp.SetActive(false)//初始化不显示
        }
    }

    OnSpawn() {
        this.uId = IDGenerator.GenBulletID();
        this.GoLive();
        // this.comParent.visible = true;
        this.bulletOnSpawn();
        if (this.showShapCom) this.showShapCom.ShowShape();
    }

    OnRecycle() {
        this.Die();
        // this.comParent.visible = false;
        this.bulletOnRecycle();
        if (this.showShapCom) this.showShapCom.ShowShape(false)
    }

    OnDestory() {
        this.DestroyPlayer();
        this.config = null;
        this.tempBoxCollisionInfo = null;
    }

    //子类扩展
    public bulletOnRecycle(): void {
        this.bulletMoveCom.bulletStopMove();
        // BulletManager.GetInstance().bulletDic.remove(this);
    }

    public bulletOnSpawn(): void {
        this.bulletMoveCom.bulletMove();
        // BulletManager.GetInstance().bulletDic.set(this, this);
    }

}