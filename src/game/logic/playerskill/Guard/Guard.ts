/*
* name;
*/
class Guard extends SkillSpawnObject implements IScriptPoolObject<Guard>{

    // public bulletMoveCom: BulletMoveComponent2D;
    public initComponent(): void {
        super.initComponent();

        // this.bulletMoveCom = new BulletMoveComponent2D()
        this.viewComp = new ElectricNetViewComponent2D(EnumSpineConfigID.Guard);
        this.addComponent(this.viewComp);
        // this.addComponent(this.bulletMoveCom);

        this.comParent.name = "Guard"
        this.viewComp.SetActive(false)//初始化不显示
    }

    public OnSkillObjSpawn(): void {
        this.viewComp.SetActive(true)
    }
    public OnSkillObjRecycle(): void {
        this.viewComp.SetActive(false)
        this.stop();
    }

    public OnSkillObjDestroy(): void {

    }

    //获取碰撞区域大小
    public GetCollisionShapeInfo(): CollsionShapInfo {
        //角色大小
        let size = ConfigManager.GetInstance().GetWeaponConfig(GameDataManager.getInstance().LoginPlayerInfo.CurSideWeaponID).ColliderSize;
        //守卫的位置
        let center = CommonUtil2D.GetPosUnderTargetObj(this.comParent, StageManager.GetInstance().playerParent);
        center.y -= size[1] * 0.5; //中心位置在角色顶部中心
        let radius = this.guardSize.x * 0.5;//半径
        return new SectorCollisonInfo(new Vec2(center.x, center.y), radius, this.sectorAngle, this.viewComp.View.rotation)
    }

    //////////////////////////////////////////////////////////////////////////////////////////////////////
    //逻辑
    private duration: number;//存活时间
    private guardSize: Vec2;//大小
    private sectorAngle: number = 90;//扇形角度
    private hitedMonsterIds: number[];//网中怪物
    private timerId: number = -1;
    private parent: Laya.Sprite;//父节点
    public set Size(value: Vec2) { this.guardSize = value; }//new Vec2(100, 200); }//
    public get Size(): Vec2 { return this.guardSize; }
    public set Duration(value: number) { this.duration = value; }//10; }//
    public get Duration(): number { return this.duration; }

    private timeCount: number;//计时
    private checkCollisionCounter = 0; //计算碰撞计时
    private COLLISION_CHECK_INTERVAL = 0.1;//碰撞检测间隔

    //发射
    public start(parent: PlayerBase2D) {
        this.OnStart();
        this.hitedMonsterIds = []
        this.timeCount = 0;
        this.checkCollisionCounter = 0;

        //添加到父节点, 放在父节点位置
        this.parent = parent.comParent;
        this.parent.addChild(this.comParent)
        this.setPlayerPos(0, 0)

        //1.电网, 持续5s
        this.timerId = TimeManager.getInst().addUpdater(cbhandler.gen_handler(this.update, this))

        //设置spine的大小
        let config = ConfigManager.GetInstance().GetSpineConfig(EnumSpineConfigID.Guard);
        this.viewComp.setViewScale(this.guardSize.x / config.SpineSize[0], 1);// this.netSize.y / config.SpineSize[1])
    }

    //技能时间到终止
    private end() {
        //添加技能结束的处理, 比如淡出动画, 再回收

        ///回收
        GamePoolManager.Instance.Recycle<Guard>(this, GuardWeapon.GetPoolID());
        // this.stop();
    }

    //由Recycle调用 玩家死亡/游戏结束, 立刻结束电网
    private stop() {
        if (this.timerId >= 0) TimeManager.getInst().remove(this.timerId);
        this.timerId = -1;

        // this.comParent.removeSelf(); Recycle回调, 已经删除自己
        // CommonUtil2D.ChangeToGrandParent(this.comParent, this.parent.parent as Laya.Sprite)
    }

    private update(dt: number) {
        if (this.timeCount >= this.duration) {
            this.end();//技能完成
        } else {
            this.checkCollisionDuringMovement(dt); //检测碰撞
            // this.attackMonstersInNet(dt);//攻击
        }
        this.timeCount += dt;
    }


    //检测怪物碰撞
    private checkCollisionDuringMovement(dt: number) {

        this.checkCollisionCounter += dt;//检测碰撞间隔
        if (this.checkCollisionCounter > this.COLLISION_CHECK_INTERVAL) {
            this.checkCollisionCounter = 0;

            //激光在Player层下的位置
            // let pos = CommonUtil2D.GetLoalPostionUnderSameParent(this.comParent, this.parent);
            // let colliderPos = new Vec2(pos.x, pos.y - this.guardSize.y * 0.5)//碰撞盒中心位置. spine的pivot在底部.
            let guardCollisionInfo = this.GetCollisionShapeInfo() as SectorCollisonInfo;
            // guardCollisionInfo.center.y -= guardCollisionInfo.size.y * 0.5;
            // let radius = this.guardSize.x;//+ guardCollisionInfo.size.y * 0.5;//半径
            //1. 检测碰撞
            let collidedMonster = CollisionDetector.Instance.CheckMonsterCollisionSectorByShape(guardCollisionInfo);//(guardCollisionInfo.center, guardCollisionInfo.radius, guardCollisionInfo.sectorAngle);
            //2. 处理碰撞 记录最新的击中怪物信息
            for (let index = 0; index < collidedMonster.length; index++) {
                let monster = collidedMonster[index] as Monster;
                monster.GetHit(monster.attributeComp.CurHP)
                this.end();//技能结束
                Log.Debug("钢铁守卫击中怪物id:%i, uid:%i", monster.playerID, monster.UID)
                return;
            }

            //检测子弹碰撞
            let collidedBullets = CollisionDetector.Instance.CheckMonsterCollisionSectorByShape(guardCollisionInfo, true);//(guardCollisionInfo.center, guardCollisionInfo.radius, guardCollisionInfo.sectorAngle, true);
            for (let index = 0; index < collidedBullets.length; index++) {
                let bullet = collidedBullets[index] as Bullet;
                this.end();//技能结束
                BulletManager.GetInstance().Recycle(bullet);
                Log.Debug("钢铁守卫击中子弹, uid:%i", bullet.UID)
                return;
            }

        }
    }
}