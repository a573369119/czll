/*
* name;
*/
class SkillSpawnObject extends PlayerBase2D implements IScriptPoolObject<SkillSpawnObject>{
    private skillType: EnumSideWeaponType;
    public get Type(): EnumSideWeaponType { return this.skillType }
    // public bulletMoveCom: BulletMoveComponent2D;

    public isIt: boolean = false;
    InitPool(pool: ScriptObjectPool<SkillSpawnObject>, bulletConfigID: EnumSideWeaponType) {
        this.skillType = bulletConfigID;
        if (!this.isIt) {
            this.initComponent();
        }
    }

    OnSpawn() {
        this.uId = IDGenerator.GenBulletID();
        this.GoLive();
        this.OnSkillObjSpawn();
    }

    OnRecycle() {
        this.Die();
        this.OnSkillObjRecycle();
    }

    OnDestory() {
        this.OnSkillObjDestroy();
        this.DestroyPlayer();
    }


    // public beforeCreate(): void {
    //     super.beforeCreate();
    // }

    public initComponent(): void {
        this.isIt = true;
        // this.bulletMoveCom = new BulletMoveComponent2D()
        // this.viewComp = new ImageViewComponent(ResPathConst.BULLET_SKIN);
        // this.addComponent(this.viewComp);
        // this.addComponent(this.bulletMoveCom);

        // this.comParent.name = "Bullet"
    }


    //子类扩展
    public OnSkillObjSpawn(): void {
        // this.bulletMoveCom.bulletMove();
        // BulletManager.GetInstance().bulletDic.set(this, this);
    }
    public OnSkillObjRecycle(): void {
        // this.bulletMoveCom.bulletStopMove();
        // BulletManager.GetInstance().bulletDic.remove(this);
    }

    public OnSkillObjDestroy(): void {

    }

    //在技能开始前执行
    protected OnStart() {
        if (this.showShapCom == null) {
            this.showShapCom = new Show2DShapeComponent();
            this.addComponent(this.showShapCom)
        }
        this.showShapCom.ShowShape();
    }
}