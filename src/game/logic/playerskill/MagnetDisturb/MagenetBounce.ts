/*
* name;
*/
class MagenetBounce extends SkillSpawnObject implements IScriptPoolObject<MagenetBounce>{

    // public bulletMoveCom: BulletMoveComponent2D;
    public initComponent(): void {
        super.initComponent();

        // this.bulletMoveCom = new BulletMoveComponent2D()
        this.viewComp = new ElectricNetViewComponent2D(EnumSpineConfigID.MagnetDisturb);
        this.addComponent(this.viewComp);
        // this.addComponent(this.bulletMoveCom);

        this.comParent.name = "MagenetBounce"
        this.comParent.zOrder = 5;
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
    // public static BOUNCE_NUM: number;   //弹射次数
    // public static ATTACK_RANGE: number = 400;//弹射攻击范围
    // public static ATTACK_DAMAGE: number; //每次攻击伤害
    // public static FREEZ_DURATION: number = 3;//麻痹时间

    private freezDuration: number;//麻痹时间
    private attackRange: number;//攻击范围
    private attackDamage: number; //每次攻击速度
    private maxBounceNum: number;//弹射次数
    private moveSpeed: number;//移动速度
    public set FreezeDuration(value: number) { this.freezDuration = value; }//10; }//
    public get FreezeDuration(): number { return this.freezDuration; }
    public set AttackRange(value: number) { this.attackRange = value; }
    public get AttackRange(): number { return this.attackRange; }
    public set AttackDamage(value: number) { this.attackDamage = value; }//20; }//
    public get AttackDamage(): number { return this.attackDamage; }
    public set MaxBounceNum(value: number) { this.maxBounceNum = value; }//20; }//
    public get MaxBounceNum(): number { return this.maxBounceNum; }
    public set SPEED(value: number) { this.moveSpeed = value; }//20; }//
    public get SPEED(): number { return this.moveSpeed; }


    private curPlayingTweenId: number;//当前正在播放的弹射动画
    private curBounceIndex: number; //这是第几次弹射
    private fromPos: Vec2;//起点位置
    private targetMonster: Monster;//目标怪物
    private onReachMonster: Function;//技能到达怪物回调
    private curTimerId: number;//当前计时器id


    /**
     * 开始技能
     * @param bounceIndex 当前是技能中第几次跳跃, 从0开始
     * @param targetMonster 目标怪物
     * @param onSkillEnd 技能回调 onSkillEnd(this.curBounceIndex, this.targetMonster.PlayerPos);
     */
    public start(bounceIndex: number, fromPos: Vec2, targetMonster: Monster, onReachMonster: Function) {
        this.curBounceIndex = bounceIndex;
        this.fromPos = fromPos;
        this.targetMonster = targetMonster;
        this.onReachMonster = onReachMonster;
        this.curTimerId = -1;
        this.setPlayerPos(fromPos.x, fromPos.y);
        //选择攻击范围内没有麻痹的敌人, 使其麻痹3s,  连续弹射3次
        targetMonster.BuffComp.AddBuff(EnumBuffType.MagnetFreezen, this.freezDuration)
        this.setDir(targetMonster)
        this.curPlayingTweenId = this.exeBouncingAnim(fromPos, targetMonster,
            () => {
                AudioManager.GetInstance().PlaySoundByConfigID(EnumSoundID.sound_fight_bounce)
                //添加技能结束的处理, 比如淡出动画, 再回收
                this.onReachMonster(this.curBounceIndex, this.targetMonster.PlayerPos);
                //this.curTimerId = TimeManager.getInst().once()
                this.end();
            });
    }

    //技能时间到终止
    private end() {
        ///回收
        GamePoolManager.Instance.Recycle<MagenetBounce>(this, MagnetDisturbWeapon.GetPoolID());
    }

    //由Recycle调用 玩家死亡/游戏结束, 立刻结束电网
    private stop() {
        if (this.curPlayingTweenId >= 0) Tween2DUtil.getInst().kill(this.curPlayingTweenId)
        this.curPlayingTweenId = -1;
    }

    //执行弹射动画
    private exeBouncingAnim(fromPos: Vec2, targetMonster: Monster, callback: Function): number {

        let tweenId = Tween2DUtil.getInst().to({
            node: this.comParent,
            duration: 0.5,
            delay: 0,
            x: targetMonster.PlayerPos.x,
            y: targetMonster.PlayerPos.y,
            tweenFunc: TweenFunc.Sine.easeInOut,
            onComplete: cbhandler.gen_handler(() => { callback(); }, this)
        })

        return tweenId;
    }

    //设置spine方向, 对准目标
    private setDir(targetMonster: Monster) {
        CommonUtil2D.LookAt(this.comParent, targetMonster.comParent)
    }

}
