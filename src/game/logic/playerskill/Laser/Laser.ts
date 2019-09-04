/*
* name;
*/
class Laser extends SkillSpawnObject implements IScriptPoolObject<Laser>{

    // public bulletMoveCom: BulletMoveComponent2D;
    public initComponent(): void {
        super.initComponent();

        // this.bulletMoveCom = new BulletMoveComponent2D()
        this.viewComp = new ElectricNetViewComponent2D(EnumSpineConfigID.Laser);
        this.addComponent(this.viewComp);
        // this.addComponent(this.bulletMoveCom);

        this.comParent.name = "Laser"
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

    //////////////////////////////////////////////////////////////////////////////////////////////////////
    //逻辑
    private duration: number;//存活时间
    private laserSize: Vec2;//大小
    private attackInterval: number;//对机关范围内怪物的攻击频率
    private attackDamage: number; //每次攻击速度
    private hitedMonsterInfos: LaserHitedMonsterInfo[];//网中怪物
    private timerId: number = -1;
    private parent: Laya.Sprite;//父节点
    public set Size(value: Vec2) { this.laserSize = value; }//new Vec2(30, 200); }//
    public get Size(): Vec2 { return this.laserSize; }
    public set Duration(value: number) { this.duration = value; }//10; }//
    public get Duration(): number { return this.duration; }
    public set AttackInterval(value: number) { this.attackInterval = value; }
    public get AttackInterval(): number { return this.attackInterval; }
    public set AttackDamage(value: number) { this.attackDamage = value; }//20; }//
    public get AttackDamage(): number { return this.attackDamage; }
    private timeCount: number;//计时
    private checkCollisionCounter = 0; //计算碰撞计时
    private COLLISION_CHECK_INTERVAL = 0.1;//碰撞检测间隔

    //发射
    public start(parent: PlayerBase2D, posRelativeToParent: Vec2) {
        this.hitedMonsterInfos = []
        this.timeCount = 0;
        this.checkCollisionCounter = 0;

        //添加到父节点, 放在父节点位置
        this.parent = parent.comParent;
        this.parent.addChild(this.comParent)
        this.setPlayerPos(posRelativeToParent.x, posRelativeToParent.y + 50)

        //1.电网, 持续5s
        this.timerId = TimeManager.getInst().addUpdater(cbhandler.gen_handler(this.update, this))

        //设置spine的大小
        let config = ConfigManager.GetInstance().GetSpineConfig(EnumSpineConfigID.Laser);
        this.viewComp.setViewScale(this.laserSize.x / config.SpineSize[0], 1);// this.netSize.y / config.SpineSize[1])

        AudioManager.GetInstance().PlaySoundByConfigID(EnumSoundID.sound_fight_laser)
    }

    //技能时间到终止
    private end() {
        //添加技能结束的处理, 比如淡出动画, 再回收

        ///回收
        GamePoolManager.Instance.Recycle<Laser>(this, LaserWeapon.GetPoolID());

        // this.stop();
    }

    //由Recycle调用 玩家死亡/游戏结束, 立刻结束电网
    private stop() {
        if (this.timerId >= 0) TimeManager.getInst().remove(this.timerId);
        this.timerId = -1;

        CommonUtil2D.ChangeToGrandParent(this.comParent, this.parent.parent as Laya.Sprite)

        //停止音效
        AudioManager.GetInstance().StopSoundByConfigID(EnumSoundID.sound_fight_laser)
    }

    private update(dt: number) {
        if (this.timeCount >= this.duration) {
            this.end();//技能完成
        } else {
            this.checkCollisionDuringMovement(dt); //检测碰撞
        }
        this.timeCount += dt;
    }



    //检测怪物碰撞
    private checkCollisionDuringMovement(dt: number) {

        this.checkCollisionCounter += dt;//检测碰撞间隔
        if (this.checkCollisionCounter > this.COLLISION_CHECK_INTERVAL) {
            this.checkCollisionCounter = 0;

            //激光在Player层下的位置
            let pos = CommonUtil2D.GetLoalPostionUnderSameParent(this.comParent, this.parent);
            let colliderPos = new Vec2(pos.x, pos.y - this.laserSize.y * 0.5)//碰撞盒中心位置. spine的pivot在底部.

            //1. 检测碰撞
            let collidedMonster = CollisionDetector.Instance.CheckMonsterCollision(colliderPos, this.laserSize);
            let now = new Date().getTime();
            //2. 处理碰撞 记录最新的击中怪物信息
            let refreshHitedMonster = [];
            for (let index = 0; index < collidedMonster.length; index++) {
                let monster = collidedMonster[index];
                let latestHitInfo = this.GetLastHitInfo(monster.UID);
                if (latestHitInfo == null) {
                    //2.1之前没击中过
                    latestHitInfo = new LaserHitedMonsterInfo(monster.UID);
                    if (!this.HitMonster(monster)) refreshHitedMonster.push(latestHitInfo)
                } else {
                    let killed = false; //没死亡就记录
                    if (latestHitInfo.LastHitTime - now > this.AttackInterval * 1000) {
                        //2.2 攻击间隔满足
                        latestHitInfo.LastHitTime = now;
                        killed = this.HitMonster(monster)
                    }
                    if (!killed) refreshHitedMonster.push(latestHitInfo)
                }
            }
            this.hitedMonsterInfos = refreshHitedMonster;//最新的击中怪物信息

            // //Log
            // if (this.hitedMonsterInfos.length > 0) {
            //     let logInfo = "";
            //     for (let index = 0; index < this.hitedMonsterInfos.length; index++) {
            //         let element = this.hitedMonsterInfos[index];
            //         logInfo += element.UId + ",";
            //     }
            //     Log.Debug("激光击中怪物id:%s", logInfo)
            // }

        }
    }

    //是否对怪造成伤害:1. 之前没有击中, 2. 距离上次击中超过AttackInterval
    private GetLastHitInfo(uid: number) {
        let find = false;
        for (let index = 0; index < this.hitedMonsterInfos.length; index++) {
            let monster = this.hitedMonsterInfos[index];
            if (monster.UId == uid) {
                return monster;
            }
        }
        return null;
    }

    //攻击怪物
    private HitMonster(monster: Monster): boolean {
        // Log.Debug("激光击中伤害 %i", this.attackDamage)
        return monster.GetHit(this.attackDamage)
    }
}

class LaserHitedMonsterInfo {
    public UId: number;//怪物唯一id
    public LastHitTime: number//上次击中时间 date().gettime ms
    constructor(uid: number) {
        this.UId = uid;
        this.LastHitTime = new Date().getTime();
    }
}