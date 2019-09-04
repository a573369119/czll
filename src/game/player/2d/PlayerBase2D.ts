/*
* name;
*/
class PlayerBase2D extends Mediator {

    //基础组件
    public viewComp: ViewComponentBase2D;
    protected showShapCom: Show2DShapeComponent;
    public get Show2DShapeCom(): Show2DShapeComponent { return this.showShapCom; }
    public get ViewSize(): Vec2 { return this.viewComp.ViewSize; }

    //基础属性
    protected uId: number;  //唯一id
    public playerID: number  //定义表ID
    public comParent: Laya.Sprite; //带视图类的组件容器 例如角色形象，特效等  
    public playerOrderZ = 0; //层级 默认为0 主角的应该比这个高
    protected state: EnumPlayerState;//物体状态
    public get State(): EnumPlayerState { return this.state; }

    //需要对应的viewComp传递进来
    public viewWidth: number;
    public viewHeight: number;
    public viewWidthHalf: number; //判断instage
    public viewHeightHalf: number;

    public get UID(): number { return this.uId; }
    //组件结合用于全部删除
    protected compList: Array<ComponentBase2D> = Array<ComponentBase2D>();

    //创建之前做差异化
    public beforeCreate(): void {

    }

    constructor(id?: number) {
        super();
        this.beforeCreate();
        this.playerID = id;
        this.compList = new Array<ComponentBase2D>();
        this.initComParnet();
    }


    public initComponent(): void {
        this.showShapCom = new Show2DShapeComponent();
        this.addComponent(this.showShapCom);
    }

    public initComParnet(): void {
        this.comParent = new Laya.Sprite();
        this.AddToStage();
    }

    public addComponent(comp: ComponentBase2D): void {
        comp.player = this;
        comp.onAdd();
        this.compList.push(comp);
    }

    public removeAllComponent(): void {
        if (!this.compList) { console.error("想要销毁的 对象不存在！"); return; }
        var count = this.compList.length;
        for (var index = 0; index < count; index++) {
            this.compList[index].onReomove();
            this.compList[index] = null;
        }
        this.compList = null;
    }

    //*************************************  对外接口 */
    public AddToStage() {
        // CommonUtil2D.ChangeToGrandParent(this.comParent, StageManager.GetInstance().playerParent)
        // let localPos = CommonUtil2D.GetGlobalPosition(this.comParent);  //
        let localPos = CommonUtil2D.GetPosUnderTargetObj(this.comParent, StageManager.GetInstance().playerParent)
        StageManager.GetInstance().playerParent.addChild(this.comParent);
        this.comParent.pos(localPos.x, localPos.y)
        this.comParent.zOrder = this.playerOrderZ;
    }

    public RemoveFromStage() {
        this.comParent.removeSelf()
    }

    public isInStage(): boolean {
        let gobalPos = CommonUtil2D.GetGlobalPosition(this.comParent);
        return this.isPosInStage(gobalPos.x, gobalPos.y);
    }

    /**
     * 判断是否在屏幕内
     * @param posX 
     * @param posY 
     * @param halfIn true: 半个机身在屏幕内, false, 可以全部在外面
     */
    public isPosInStage(posX: number, posY: number, halfIn: boolean = false): boolean {
        let viewWidthHalf = (halfIn ? 0 : 1) * this.viewWidthHalf;
        let viewHeightHalf = (halfIn ? 0 : 1) * this.viewHeightHalf;

        var flag: boolean = true;
        if (posX < 0 - viewWidthHalf ||
            posX > Laya.stage.width + viewWidthHalf ||
            posY < 0 - viewHeightHalf ||
            posY > Laya.stage.height + viewHeightHalf) {
            flag = false;
        }
        return flag;
    }

    //获取碰撞区域大小
    protected tempBoxCollisionInfo: BoxCollisonInfo = null;
    public GetCollisionShapeInfo(attacking: boolean = false): CollsionShapInfo {
        let pos = CommonUtil2D.GetPosUnderTargetObj(this.comParent, StageManager.GetInstance().playerParent);

        if (this.tempBoxCollisionInfo == null) this.tempBoxCollisionInfo = new BoxCollisonInfo(null, null);
        this.tempBoxCollisionInfo.center = new Vec2(pos.x, pos.y);
        this.tempBoxCollisionInfo.size = new Vec2(this.viewWidth, this.viewHeight);
        return new BoxCollisonInfo(new Vec2(pos.x, pos.y), new Vec2(this.viewWidth, this.viewHeight))
    }

    //出现在舞台
    protected GoLive() {
        this.state = EnumPlayerState.Live;
        this.setPlayerActive(true)
    }
    //死亡
    public Die() {
        this.state = EnumPlayerState.Die;
        this.setPlayerActive(false)
    }

    public IsAlive(): boolean {
        return this.state == EnumPlayerState.Live;
    }


    //彻底消息
    public DestroyPlayer(): void {
        //解决退出场景后, 恢复玩家的parent节点上的y位置
        this.setPlayerActive(true)
        //销毁组件
        this.removeAllComponent();
        //销毁父节点
        this.RemoveFromStage();
        this.comParent.destroy(true)

        this.tempBoxCollisionInfo = null;
    }

    public setPlayerPos(posX: number, posY: number): void {
        this.comParent.x = posX;
        this.comParent.y = posY;
    }
    public get PlayerPos(): Vec2 { return new Vec2(this.comParent.x, this.comParent.y) }

    public movePlayer(offsetX: number, offsetY: number): void {
        this.comParent.x -= offsetX;
        this.comParent.y -= offsetY;
    }

    public setPlayerActive(active: boolean): void {
        this.comParent.visible = active;
    }

    //添加子节点
    public AddChild(child: Laya.Sprite) {
        let localPos = CommonUtil2D.GetPosUnderTargetObj(child, this.comParent)
        this.comParent.addChild(child)
        child.pos(localPos.x, localPos.y)
    }
}
