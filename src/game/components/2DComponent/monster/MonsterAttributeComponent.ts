/*
* 怪物属性:实际血量, 移动速度
*/
class MonsterAttributeComponent extends ComponentBase2D {
    private maxHP: number;
    private speed: number;
    private colliderBoxSize: Vec2;
    /**怪物数据 */
    private monsterData: MonsterSpawnData;

    private viewScale: Vec2 = null;
    private adjustScale = 1;
    private monsterSkillScale = 1;
    private curHP: number;
    private latestGetHitTime: number = 0;//最近一次收到攻击时间
    public get MonsterSpawnData(): MonsterSpawnData { return this.monsterData; }
    public get MonsterLvl(): number { return this.monsterData ? this.monsterData.Level : 1; }    //怪物等级
    // public get MonsterSkills(): number[] { return this.monsterData && this.monsterData.PowerNum > 0 ? this.monsterData.PowerId : []; }  //怪物能力
    /**
     * 怪物技能的配置表
     */
    public get MonsterSkillConfigs(): SkillConfigConfigData[] { return this.monsterData && this.monsterData.PowerNum > 0 ? this.monsterData.PowerConfigs : []; }  //怪物能力
    public get Speed(): number { return this.speed; }                                       //速度
    public get MaxHP(): number { return this.maxHP; }                                       //满血血量
    public get CurHP(): number { return this.curHP; }                                       //当前血量
    public get ColliderSize(): Vec2 { return this.colliderBoxSize.mulVec2(this.Scale); }    //碰撞盒大小
    public set Scale(value: Vec2) { this.viewScale = value; }                               //缩放大小
    public get Scale(): Vec2 {
        let scale = this.viewScale.mul(this.adjustScale).mul(this.monsterSkillScale);
        // if (scale.x > ConstDefine.ENLARGE_BUFF_SCALE) scale.x = ConstDefine.ENLARGE_BUFF_SCALE;
        // if (scale.y > ConstDefine.ENLARGE_BUFF_SCALE) scale.y = ConstDefine.ENLARGE_BUFF_SCALE;
        return scale;
    }
    public set AdjustScale(value: number) { this.adjustScale = value; }                     //enlarge道具buff调节scale
    public get AdjustScale(): number { return this.adjustScale; }
    public set AdjustScale2(value: number) { this.monsterSkillScale = value; }                     //怪物膨胀技能调节scale
    public get AdjustScale2(): number { return this.monsterSkillScale; }
    public get TimeSinceLastHit(): number { return (new Date().getTime() - this.latestGetHitTime) / 1000 } //多少s时间没有收到攻击
    public get CanSpawnProp(): boolean { return this.monsterData.CanTriggerPropSpawn; } //多少s时间没有收到攻击

    onAdd(): void {


    }
    onRemove(): void {

    }

    //初始化怪物属性
    public Init(value: MonsterSpawnData) {
        this.monsterData = value;

        let config = ConfigManager.GetInstance().GetMonsterConfig(this.player.playerID);
        if (config) {
            this.speed = config.MoveSpeed;
            this.maxHP = FormulaUtil.CalcMonsterHp(config.BaseHP, this.MonsterLvl, config.HpFormulaID);
            this.curHP = this.maxHP;
            this.viewScale = new Vec2(value.SizeScale.x, value.SizeScale.y);
            this.colliderBoxSize = new Vec2(config.ColliderSize[0], config.ColliderSize[1])
        } else {
            Log.Error("没有怪物configid:%i", this.player.playerID);
        }
    }

    /**
     * 设置子怪物的血量和大小
     * @param maxHpScale 缩放到原来的比例
     * @param sizeScale 
     */
    public SetMaxHpAndSize(maxHpScale: number, sizeScale: number) {
        this.maxHP *= maxHpScale;
        if (this.curHP > this.maxHP) this.curHP = this.maxHP;
        this.Scale = this.Scale.mul(sizeScale);
    }

    /**
     * 减血,返回是否死亡
     * @param hitpoint 
     */
    public ReduceHp(hitpoint: number): boolean {
        this.latestGetHitTime = new Date().getTime();
        this.curHP -= hitpoint;
        return this.curHP <= 0;
    }

    /**
     * 恢复多少血量
     * @param hp 
     */
    public IncreaseHp(hp: number) {
        this.curHP += hp;
        if (this.curHP > this.maxHP) this.curHP = this.maxHP;
    }

    /**
     * 是否满血
     */
    public IsFull(): boolean {
        return this.curHP >= this.maxHP;
    }

    //获取死亡时候释放的技能 reverse:true 获取非死亡释放的技能 false:死亡释放的技能
    public GetOnDieSkills(reverse: boolean = false): SkillConfigConfigData[] {
        let skillsOnDie = [];
        let skills = this.MonsterSkillConfigs;
        for (let index = 0; index < skills.length; index++) {
            //let id = skills[index];
            let config = skills[index] //ConfigManager.GetInstance().GetSkillConfig(id)
            if ((config.TriggerOnDie && !reverse) || (!config.TriggerOnDie && reverse)) skillsOnDie.push(config)
        }

        return skillsOnDie;
    }

    // //获取身上对应类型的技能
    // public GetSkill(skillId: EnumMonsterPowerType): SkillConfigConfigData {
    //     // return this.MonsterSkills.indexOf(skillId) >= 0;
    //     for (let index = 0; index < this.MonsterSkillConfigs.length; index++) {
    //         let element = this.MonsterSkillConfigs[index];
    //         if (element.Type == skillId) return element;
    //     }
    //     Log.Warn("获取技能 %s 不存在", skillId.toString())
    //     return null;
    // }

    public ContainsSkill(skillId: EnumMonsterPowerType) {
        // return this.MonsterSkills.indexOf(skillId) >= 0;
        for (let index = 0; index < this.MonsterSkillConfigs.length; index++) {
            let element = this.MonsterSkillConfigs[index];
            if (element.Type == skillId) return true;
        }
        return false;
    }

    public CopySpawnData(): MonsterSpawnData {
        return this.monsterData.Clone();
    }
}