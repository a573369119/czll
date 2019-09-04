/*
* name;
*/
class HealingSkill implements ISkillLogic {
    public static NO_HIT_LIMIT: number;// = 1;//1s内没收到伤害
    public static HEALING_RANGE_PERCENTAGE: number;//= 0.5;//进入治愈范围 
    public static OUT_HEALING_RANGE_PERCENTAGE: number;// = 0.6;//脱离治愈的范围
    public static CHECK_HIT_INTERVAL: number = 0.2;//检测收到攻击频率
    public static CHECK_Healing_INTERVAL: number = 0.2;//检测四周需要治愈的频率
    public static MAX_HEALING_NUM: number;// = 2;//最大同时治愈个数
    public static HEALING_SPEED: number;// = 0.05;//每秒满血的0.05

    private config: SkillConfigConfigData;
    private InitParam(config: SkillConfigConfigData) {
        //let config = ConfigManager.GetInstance().GetSkillConfig(EnumMonsterPowerId.Healing)
        HealingSkill.NO_HIT_LIMIT = config.Param1;
        HealingSkill.HEALING_RANGE_PERCENTAGE = config.Param2;
        if (config.Param3 <= config.Param2) config.Param3 = config.Param2 + 0.1
        HealingSkill.OUT_HEALING_RANGE_PERCENTAGE = config.Param3;
        HealingSkill.MAX_HEALING_NUM = config.Param4;
        HealingSkill.HEALING_SPEED = config.Param5;
    }

    public Start(player: Monster, ...param: any[]) {
        this.config = param[0] as SkillConfigConfigData;
        this.InitParam(this.config)
        this.reset();
        //检测多少时间没有伤害 
        //>1s, 开始治愈, 播放特效, 治愈自己&周围
        //收到攻击, 停止, 再次等待间隔
        this.checkStartSkill(player, param)
    }

    public Stop(parent: Monster, param: any) {
        this.End(parent, null, param)
    }

    public End(player: Monster, onEndComplete: Function, param: any) {
        this.stopSkill(player)
        if (onEndComplete) onEndComplete();
    }

    ///////////////////////////////////////////////////////////////////////////////////
    //

    private timerId: number;//计时
    private checkHitIntervalCount = 0;//检测受攻击间隔
    private checkHealingIntervalCount = 0;//检测受攻击间隔

    private healingMonsterId: number[];//正在被治愈怪物
    private healingOtherFx: Laya.Skeleton[];//治愈spine
    private healingSelfFx: Laya.Skeleton;//治愈自己spine

    private reset() {

        this.timerId = -1;
        this.healingMonsterId = [];
        this.checkHitIntervalCount = 0;
        this.checkHealingIntervalCount = 0;
        this.healingOtherFx = [];
        this.healingSelfFx = null;
    }

    //检测是否可以开始治愈
    private checkStartSkill(player: Monster, param: any) {
        this.timerId = -1;
        let TimeSinceLastHit = player.attributeComp.TimeSinceLastHit;
        if (player.attributeComp.TimeSinceLastHit >= HealingSkill.NO_HIT_LIMIT) {
            //可以开始治愈, 播放特效, 治愈自己 & 周围
            this.reset();
            this.timerId = TimeManager.getInst().addUpdater(cbhandler.gen_handler(this.update, this, player, param))
        } else {
            //等待下次检测
            let interval = Math.max(HealingSkill.NO_HIT_LIMIT - player.attributeComp.TimeSinceLastHit, HealingSkill.CHECK_HIT_INTERVAL);
            this.timerId = TimeManager.getInst().once(interval, cbhandler.gen_handler(this.checkStartSkill, this, player, param))
        }
    }

    private update(player: Monster, param: any, dt: number) {
        this.checkHealingIntervalCount += dt;
        this.checkHitIntervalCount += dt;
        //1. 收到攻击,停止治疗,再次等待
        if (this.checkHitIntervalCount >= HealingSkill.CHECK_HIT_INTERVAL) {
            if (player.attributeComp.TimeSinceLastHit < HealingSkill.NO_HIT_LIMIT) {
                this.stopSkill(player);
                this.checkStartSkill(player, param);//重新开始等待治愈时机
                return;
            }
            this.checkHitIntervalCount = 0;
        }

        //2.治愈周围,  检测范围内有没有未满血怪物, 
        if (this.checkHealingIntervalCount >= HealingSkill.CHECK_Healing_INTERVAL) {
            let canHealNum = HealingSkill.MAX_HEALING_NUM - this.healingMonsterId.length;
            if (canHealNum > 0) {
                //还能治愈多少怪物
                let toHealMonsters = this.GetHealingMonster(player, canHealNum, this.healingMonsterId);
                for (let index = 0; index < toHealMonsters.length; index++) {
                    let toHealMonster = toHealMonsters[index];

                    //开始特效
                    this.StartHealingOther(player, toHealMonster)
                }
            }
            this.checkHealingIntervalCount = 0;
        }

        //3. 治愈自己 满血停止治愈自己&周围
        if (!player.attributeComp.IsFull()) {
            //如果没有特效, 播放特效
            this.PlaySelfHealingFx(player, true)
            //治愈速度
            player.RecoverHp(player.attributeComp.MaxHP * HealingSkill.HEALING_SPEED * dt)
        } else {
            //停止特效播放
            this.PlaySelfHealingFx(player, false)
        }

        //4. 治愈怪物 : 当前治愈的怪物满血/远离玩家,停止治疗, 停止特效
        for (let index = this.healingMonsterId.length - 1; index >= 0; index--) {
            let uid = this.healingMonsterId[index];
            let monter = PlayerManager.GetInstance().GetMonsterByUid(uid);
            if (monter == null || monter.attributeComp.IsFull()) {
                this.StopHealingOther(player, index)//停止特效 死亡或满血
            } else {
                let inRnage = CollisionDetector.Instance.IsPlayerInCircle(player.PlayerPos, HealingSkill.OUT_HEALING_RANGE_PERCENTAGE * Laya.stage.width * 0.5, monter)
                if (!inRnage) {
                    this.StopHealingOther(player, index);//出范围
                } else {
                    monter.RecoverHp(monter.attributeComp.MaxHP * HealingSkill.HEALING_SPEED * dt)
                }
            }
        }

        //更新特效的朝向
        for (let index = 0; index < this.healingOtherFx.length; index++) {
            //    let element = this.healingOtherFx[index];
            this.UpdateHealingOtherFxPosAndRotation(player, index)
        }


    }

    //收到攻击, 停止
    private stopSkill(player: Monster) {
        if (this.timerId >= 0) TimeManager.getInst().remove(this.timerId);
        this.timerId = -1;

        //停止特效, 计时
        this.StopAllHealingOtherFx(player);
        this.PlaySelfHealingFx(player, false);

        this.reset();
    }

    //开始治愈其他怪
    private StartHealingOther(player: Monster, monster: Monster) {
        let fx = player.monsterEffectComp.showEffect(0, EnumSpineConfigID.MonsterHealOther);
        // CommonUtil2D.LookAt(fx, monster.comParent)//设置朝向
        //记录怪物id和特效
        this.healingMonsterId.push(monster.UID)
        this.healingOtherFx.push(fx)
    }
    //更新特效的位置和角度
    private UpdateHealingOtherFxPosAndRotation(player: Monster, index: number) {
        let fx = this.healingOtherFx[index]
        //设置朝向
        let uid = this.healingMonsterId[index];
        let monter = PlayerManager.GetInstance().GetMonsterByUid(uid);
        CommonUtil2D.LookAt(fx, monter.comParent)
        //设置位置
        player.monsterEffectComp.setEffectPos(player.PlayerPos.x, player.PlayerPos.y, fx)
        //设置缩放
        let dist = player.PlayerPos.dist(monter.PlayerPos)
        let config = ConfigManager.GetInstance().GetSpineConfig(EnumSpineConfigID.MonsterHealOther);
        let scale = dist / config.SpineSize[1];
        player.monsterEffectComp.setEffectScale(scale, scale, fx);
    }
    private StopHealingOther(player: Monster, index: number) {
        player.monsterEffectComp.RemoveEffect(this.healingOtherFx[index], EnumSpineConfigID.MonsterHealOther);
        //删除id和特效
        this.healingMonsterId.splice(index, 1)
        this.healingOtherFx.splice(index, 1)
    }
    //停止所有怪物的治疗
    private StopAllHealingOtherFx(player: Monster) {
        for (let index = this.healingMonsterId.length - 1; index >= 0; index--) {
            this.StopHealingOther(player, index)
        }
    }

    /**
     * 治愈自己的特效动画
     * @param active 
     */
    private PlaySelfHealingFx(player: Monster, active: boolean) {
        if (active) {
            if (this.healingSelfFx) {
                // Log.Error("当前怪物正在播放自己的治愈spine, 不需再次播放");
                return;
            }
            //挂在怪物节点
            this.healingSelfFx = player.monsterEffectComp.showEffect(0, EnumSpineConfigID.MonsterHealSelf, player.comParent, new Vec2(0, 0));
        } else {
            //停止播放
            if (this.healingSelfFx == null) { return; }
            player.monsterEffectComp.RemoveEffect(this.healingSelfFx, EnumSpineConfigID.MonsterHealSelf);
            this.healingSelfFx = null;
        }
    }

    /**
     * 获取范围内未满血的怪物
     * @param player 
     * @param num 
     */
    private GetHealingMonster(player: Monster, num: number, exceptMonsterUids: number[]): Monster[] {
        let retMonster = [];
        let count = 0;
        let range = HealingSkill.HEALING_RANGE_PERCENTAGE * Laya.stage.width * 0.5;
        let monsters = CollisionDetector.Instance.CheckMonsterInCircle(player.PlayerPos, range, exceptMonsterUids);
        for (let index = 0; index < monsters.length; index++) {
            let monster = monsters[index];
            if (monster.UID != player.UID && monster.attributeComp.CurHP < monster.attributeComp.MaxHP) {
                retMonster.push(monster);
                count++;
                if (count == num) break;
            }
        }

        return retMonster;
    }

}