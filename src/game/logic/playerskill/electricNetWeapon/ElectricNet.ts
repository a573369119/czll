/*
* 隔离电网发射的电网
*/
class ElectricNet extends Bullet {
    public bulletMoveCom: ElectricNetMoveComponent2D;
    public fxComp: MissileBulletEffectComponent2D;
    public isIt: boolean = false;

    public initComponent(): void {

        this.isIt = true;
        this.bulletMoveCom = new ElectricNetMoveComponent2D()
        this.viewComp = new ElectricNetViewComponent2D(EnumSpineConfigID.ElectricNet);
        this.fxComp = new EffectComponent2D();
        this.addComponent(this.viewComp);
        this.addComponent(this.bulletMoveCom);
        this.addComponent(this.fxComp);

        this.viewComp.SetActive(false)//初始化不显示

    }

    //重写子类的
    public bulletOnSpawn(): void {
        // this.start();
        this.viewComp.SetActive(true)
    }

    public bulletOnRecycle(): void {
        this.viewComp.SetActive(false)
        this.stop();
    }

    public OnDestory() {
        super.OnDestory();
    }


    //获取碰撞区域大小
    public GetCollisionShapeInfo(): CollsionShapInfo {
        let pos = this.PlayerPos;
        return new BoxCollisonInfo(new Vec2(pos.x, pos.y), this.netSize, this.viewComp.View.rotation)
    }

    //////////////////////////////////////////////////////////////////////////////////////////////////////
    //逻辑
    private netDuration: number;//存活时间
    private netSize: Vec2;//网大小
    private attackInterval: number;//对网上怪物的攻击频率
    private attackDamage: number; //每次攻击速度
    private hitedMonsterIds: number[];//网中怪物
    private timerId: number = -1;
    public set NetLen(value: number) { this.netSize = new Vec2(value, this.ViewSize.y) }//new Vec2(1080, 200); }//
    public set Duration(value: number) { this.netDuration = value; }//10; }//
    public get Duration(): number { return this.netDuration; }
    public set AttackInterval(value: number) { this.attackInterval = value; }
    public get AttackInterval(): number { return this.attackInterval; }
    public set AttackDamage(value: number) { this.attackDamage = value; }//20; }//
    public get AttackDamage(): number { return this.attackDamage; }

    private timeCount: number;//计时
    private attackMonsterTimeCounter = 0;//攻击怪物计时
    private checkCollisionCounter = 0; //计算碰撞计时
    private COLLISION_CHECK_INTERVAL = 0.1;//碰撞检测间隔

    //电网发射
    public start() {
        if (this.showShapCom == null) {
            this.showShapCom = new Show2DShapeComponent();
            this.addComponent(this.showShapCom)
        }
        this.showShapCom.ShowShape();

        this.hitedMonsterIds = []
        this.timeCount = 0;
        this.checkCollisionCounter = 0;
        this.attackMonsterTimeCounter = 0;

        //1.电网, 持续5s
        this.timerId = TimeManager.getInst().addUpdater(cbhandler.gen_handler(this.update, this))
        // TimeManager.getInst().once(ElectricNetWeapon.NET_DURATION, cbhandler.gen_handler(this.end, this));
        //移动速度固定100, 移动到屏幕最上方, 直到消失, 
        this.bulletMoveCom.Reset(); //重置
        this.bulletMoveCom.bulletMove();
        //设置spine的大小
        let config = ConfigManager.GetInstance().GetSpineConfig(EnumSpineConfigID.ElectricNet);
        this.viewComp.setViewScale(this.netSize.x / config.SpineSize[0], 1);// this.netSize.y / config.SpineSize[1])

        //
        AudioManager.GetInstance().PlaySoundByConfigID(EnumSoundID.sound_fight_netting)
    }

    //技能时间到终止
    private end() {
        //添加技能结束的处理, 比如淡出动画, 再回收

        ///回收
        GamePoolManager.Instance.Recycle<ElectricNet>(this, ElectricNetWeapon.GetPoolID());
        // this.stop();
    }

    //由Recycle调用 玩家死亡/游戏结束, 立刻结束电网
    private stop() {
        if (this.timerId >= 0) TimeManager.getInst().remove(this.timerId);
        this.timerId = -1;

        //恢复怪物自由
        this.UnFreezAll();

        //停止移动
        this.bulletMoveCom.bulletStopMove();
        //隐藏
        this.comParent.visible = false;

        AudioManager.GetInstance().StopSoundByConfigID(EnumSoundID.sound_fight_netting)
    }


    private update(dt: number) {
        if (this.timeCount >= this.netDuration) {
            this.end();//技能完成
        } else {
            //同一个怪物, 伤害间隔ns, 持续往上推.
            //技能消失后,怪物随机移动. 
            this.checkCollisionDuringMovement(dt); //检测碰撞
            this.attackMonstersInNet(dt);//攻击
        }
        this.timeCount += dt;
    }

    //检测怪物碰撞
    private checkCollisionDuringMovement(dt: number) {
        this.checkCollisionCounter += dt;
        if (this.checkCollisionCounter > this.COLLISION_CHECK_INTERVAL) {
            this.checkCollisionCounter = 0;

            let collidedMonster = CollisionDetector.Instance.CheckMonsterCollisionByShape(this.GetCollisionShapeInfo());
            for (let index = 0; index < collidedMonster.length; index++) {
                let monster = collidedMonster[index];
                if (this.hitedMonsterIds.indexOf(monster.UID) < 0) {
                    this.hitedMonsterIds.push(monster.UID)
                    Log.Debug("电网网住怪物%i, uid:%i", monster.playerID, monster.UID)
                    this.FreezeMonstersAndAttach(monster)
                }
            }
        }
    }

    //定时攻击网中的怪物
    private attackMonstersInNet(dt: number) {
        this.attackMonsterTimeCounter += dt;
        if (this.attackMonsterTimeCounter > this.AttackInterval) {
            this.attackMonsterTimeCounter = 0;
            //定时攻击
            for (let index = 0; index < this.hitedMonsterIds.length; index++) {
                let monsterUid = this.hitedMonsterIds[index];
                let monster = PlayerManager.GetInstance().GetMonsterByUid(monsterUid);
                if (monster) {
                    // Log.Debug("电网攻击怪物%i, uid:%i, 伤害:%i", monster.playerID, monsterUid, this.attackDamage)
                    if (monster.GetHit(this.attackDamage)) {
                        this.hitedMonsterIds.splice(this.hitedMonsterIds.indexOf(monsterUid), 1); //死亡
                    }
                }
            }
        }
    }

    //电网位移朝左上改变
    public OnNetMoveTopLeft(xOffset: number, yOffset: number) {
        for (let index = 0; index < this.hitedMonsterIds.length; index++) {
            let monsterUid = this.hitedMonsterIds[index];
            let monster = PlayerManager.GetInstance().GetMonsterByUid(monsterUid);
            if (monster) monster.movePlayer(xOffset, yOffset)
        }
    }

    //电网移动到最上方
    public OnNetReachEnd() {
        this.bulletMoveCom.bulletStopMove();
    }

    //麻痹/取消麻痹怪物 并和网一起移动
    private FreezeMonstersAndAttach(monster: Monster) {
        monster.Freeze(true)
    }

    //取消麻痹
    private UnFreezAll() {
        for (let index = 0; index < this.hitedMonsterIds.length; index++) {
            let monsterUid = this.hitedMonsterIds[index];
            let monster = PlayerManager.GetInstance().GetMonsterByUid(monsterUid);
            if (monster) monster.Freeze(false);
        }
    }




}