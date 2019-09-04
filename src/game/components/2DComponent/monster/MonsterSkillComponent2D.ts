/*
* 初始化Start所有技能
* 死亡触发技能在死亡时候触发End()
* 在弱化buff影响下, 除了死亡技能,其他技能都停止. 
* 分裂技能需要在start的时候知道,当前是第几次分裂.
*/


class MonsterSkillComponent2D extends ComponentBase2D {

    private monster: Monster;
    /**当前正在运行的怪物技能  type */
    private curRuningSkillId: EnumMonsterPowerType[];
    /**当前正在运行的怪物技能  类 */
    private curRuningSkill: ISkillLogic[];

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~缩放技能~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    private skillScale: number = 2;
    //持续时间
    private keepScaleTime: number = 4000;
    //变化过程时间
    private scaleChangeTime: number = 2000;
    //CD时间 5-8
    private skillType1Interval: number = 5;
    private skillTpye1RandomTime: number = 3;

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~朝向玩家~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    private skillMoveToMainPlayerInterval: number = 2;




    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~朝向玩家~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    private skillFireInterval: number = 5;

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~生产怪物~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    private createMonsterInterval: number = 5;
    private childRange: number = 50;
    private childCount: number = 1;
    private childMoveTime: number = 500;
    private createChildScale: number = 0.6;

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~分裂~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    private splitChileCount = 2;
    public currentSplitLev = 1;
    private maxSplitLev = 3;
    private splitScale = 0.8;

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~治疗~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    private skillTreatmentInterval: number = 0.1;
    private skillTreatmentMaxRange: number = Laya.stage.width * 0.5;

    //-------------------------------公测Boss----------------------------



    // private static added = false;
    public onAdd(): void {
        this.monster = this.player as Monster;
        this.curRuningSkillId = []
        this.curRuningSkill = []
    }

    public onReomove(): void {
        this.stopAll();
    }
    public useSkill(): void {
        //根据怪物所拥有的类型使用技能，可能会有多技能
    }


    /**
     * 开始技能，得到怪物技能的信息，装入skill数组里面，在运行 skil技能逻辑类的star
     * @param skillId 技能的id
     * @param skillConfig 技能的配置
     * @param param //是否要参数
     */
    public Start(skillId: EnumMonsterPowerType, skillConfig: SkillConfigConfigData, param?: any) {
        Log.Debug("怪物%i, uid:%i, 开始技能%s", this.player.playerID, this.player.UID, skillId)
        this.exe(skillId, skillConfig, param)
    }

    //比赛结束, 停止技能
    public Stop(skillId: EnumMonsterPowerType) {
        //Log.Debug("怪物%i, uid:%i, stio技能%s", this.player.playerID, this.player.UID, skillId)
        this.stop(skillId)
    }

    //死亡, 停止技能
    public End(skillId: EnumMonsterPowerType, onEnd: Function) {
        //Log.Debug("怪物%i, uid:%i, end技能%s", this.player.playerID, this.player.UID, skillId)
        this.end(skillId, onEnd)
    }

    //不包含
    public ConstainSkill(skillId: EnumMonsterPowerType) {
        return this.curRuningSkillId.indexOf(skillId) >= 0;
    }

    public GetSkill(skillId: EnumMonsterPowerType): ISkillLogic {
        let index = this.curRuningSkillId.indexOf(skillId);
        return this.curRuningSkill[index];
    }

    /**
     * 技能运行类， 到 skill类中去
     * @param monsterPowerId 
     * @param skillConfig 
     * @param param 
     */
    private exe(monsterPowerId: EnumMonsterPowerType, skillConfig: SkillConfigConfigData, param?: any) {
        let index = this.curRuningSkillId.indexOf(monsterPowerId);
        if (index >= 0) {
            Log.Error("当前怪物已经开始技能%s,不重复执行", monsterPowerId)
            return;
        }
        let skill = this.getMonsterSkill(monsterPowerId)
        skill.Start(this.player as Monster, skillConfig, param);
        this.curRuningSkill.push(skill);
        this.curRuningSkillId.push(monsterPowerId);
    }

    /**
     * 根据id停止没某个技能
     * @param monsterPowerId 
     */
    private stop(monsterPowerId: EnumMonsterPowerType) {
        let index = this.curRuningSkillId.indexOf(monsterPowerId);
        if (index < 0) {
            Log.Error("当前怪物没有开始技能%s,无法停止", monsterPowerId)
            return;
        } else {
            this.curRuningSkill[index].Stop(this.player, null)
            this.curRuningSkill.splice(index, 1);
            this.curRuningSkillId.splice(index, 1);
        }
    }

    private end(monsterPowerId: EnumMonsterPowerType, onComplete: Function) {
        let index = this.curRuningSkillId.indexOf(monsterPowerId);
        if (index < 0) {
            Log.Error("当前怪物没有开始技能%s,无法End", monsterPowerId)
            return;
        } else {
            this.curRuningSkill[index].End(this.player,
                () => {
                    this.curRuningSkill.splice(index, 1);
                    this.curRuningSkillId.splice(index, 1);
                    onComplete();
                }
                , null)

        }
    }
    /**
     * stopall清除技能
     */
    public stopAll() {
        for (let index = 0; index < this.curRuningSkill.length; index++) {
            let skill = this.curRuningSkill[index];
            skill.Stop(this.player, null)
        }
        this.curRuningSkillId = [];
        this.curRuningSkill = [];
    }

    //根据id获取对应技能逻辑
    private getMonsterSkill(powerId: EnumMonsterPowerType): ISkillLogic {
        switch (powerId) {
            case EnumMonsterPowerType.ScaleUp:
                return new ScaleUpSkill();
            case EnumMonsterPowerType.Healing:
                return new HealingSkill();
            case EnumMonsterPowerType.Spawn:
                return new SpawnSkill();
            case EnumMonsterPowerType.Attach:
                return new AttachSkill();
            case EnumMonsterPowerType.Attack:
                return new AttackSkill();
            case EnumMonsterPowerType.Explosion:
                return new ExplosionSkill();
            case EnumMonsterPowerType.FollowPlayer:
                return new FollowSkill();
            case EnumMonsterPowerType.Split:
                return new SplitSkill();
            case EnumMonsterPowerType.BringMoney:
                return new BringMoneySkill();
            default:
                {
                    Log.Error("没有对应Monster的技能逻辑 %s", powerId)
                    return null
                }
        }
    }
}