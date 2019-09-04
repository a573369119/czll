/*
* name;
*/
var HealingSkill = (function () {
    function HealingSkill() {
        this.checkHitIntervalCount = 0; //检测受攻击间隔
        this.checkHealingIntervalCount = 0; //检测受攻击间隔
    }
    HealingSkill.prototype.InitParam = function (config) {
        //let config = ConfigManager.GetInstance().GetSkillConfig(EnumMonsterPowerId.Healing)
        HealingSkill.NO_HIT_LIMIT = config.Param1;
        HealingSkill.HEALING_RANGE_PERCENTAGE = config.Param2;
        if (config.Param3 <= config.Param2)
            config.Param3 = config.Param2 + 0.1;
        HealingSkill.OUT_HEALING_RANGE_PERCENTAGE = config.Param3;
        HealingSkill.MAX_HEALING_NUM = config.Param4;
        HealingSkill.HEALING_SPEED = config.Param5;
    };
    HealingSkill.prototype.Start = function (player) {
        var param = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            param[_i - 1] = arguments[_i];
        }
        this.config = param[0];
        this.InitParam(this.config);
        this.reset();
        //检测多少时间没有伤害 
        //>1s, 开始治愈, 播放特效, 治愈自己&周围
        //收到攻击, 停止, 再次等待间隔
        this.checkStartSkill(player, param);
    };
    HealingSkill.prototype.Stop = function (parent, param) {
        this.End(parent, null, param);
    };
    HealingSkill.prototype.End = function (player, onEndComplete, param) {
        this.stopSkill(player);
        if (onEndComplete)
            onEndComplete();
    };
    HealingSkill.prototype.reset = function () {
        this.timerId = -1;
        this.healingMonsterId = [];
        this.checkHitIntervalCount = 0;
        this.checkHealingIntervalCount = 0;
        this.healingOtherFx = [];
        this.healingSelfFx = null;
    };
    //检测是否可以开始治愈
    HealingSkill.prototype.checkStartSkill = function (player, param) {
        this.timerId = -1;
        var TimeSinceLastHit = player.attributeComp.TimeSinceLastHit;
        if (player.attributeComp.TimeSinceLastHit >= HealingSkill.NO_HIT_LIMIT) {
            //可以开始治愈, 播放特效, 治愈自己 & 周围
            this.reset();
            this.timerId = TimeManager.getInst().addUpdater(cbhandler.gen_handler(this.update, this, player, param));
        }
        else {
            //等待下次检测
            var interval = Math.max(HealingSkill.NO_HIT_LIMIT - player.attributeComp.TimeSinceLastHit, HealingSkill.CHECK_HIT_INTERVAL);
            this.timerId = TimeManager.getInst().once(interval, cbhandler.gen_handler(this.checkStartSkill, this, player, param));
        }
    };
    HealingSkill.prototype.update = function (player, param, dt) {
        this.checkHealingIntervalCount += dt;
        this.checkHitIntervalCount += dt;
        //1. 收到攻击,停止治疗,再次等待
        if (this.checkHitIntervalCount >= HealingSkill.CHECK_HIT_INTERVAL) {
            if (player.attributeComp.TimeSinceLastHit < HealingSkill.NO_HIT_LIMIT) {
                this.stopSkill(player);
                this.checkStartSkill(player, param); //重新开始等待治愈时机
                return;
            }
            this.checkHitIntervalCount = 0;
        }
        //2.治愈周围,  检测范围内有没有未满血怪物, 
        if (this.checkHealingIntervalCount >= HealingSkill.CHECK_Healing_INTERVAL) {
            var canHealNum = HealingSkill.MAX_HEALING_NUM - this.healingMonsterId.length;
            if (canHealNum > 0) {
                //还能治愈多少怪物
                var toHealMonsters = this.GetHealingMonster(player, canHealNum, this.healingMonsterId);
                for (var index = 0; index < toHealMonsters.length; index++) {
                    var toHealMonster = toHealMonsters[index];
                    //开始特效
                    this.StartHealingOther(player, toHealMonster);
                }
            }
            this.checkHealingIntervalCount = 0;
        }
        //3. 治愈自己 满血停止治愈自己&周围
        if (!player.attributeComp.IsFull()) {
            //如果没有特效, 播放特效
            this.PlaySelfHealingFx(player, true);
            //治愈速度
            player.RecoverHp(player.attributeComp.MaxHP * HealingSkill.HEALING_SPEED * dt);
        }
        else {
            //停止特效播放
            this.PlaySelfHealingFx(player, false);
        }
        //4. 治愈怪物 : 当前治愈的怪物满血/远离玩家,停止治疗, 停止特效
        for (var index = this.healingMonsterId.length - 1; index >= 0; index--) {
            var uid = this.healingMonsterId[index];
            var monter = PlayerManager.GetInstance().GetMonsterByUid(uid);
            if (monter == null || monter.attributeComp.IsFull()) {
                this.StopHealingOther(player, index); //停止特效 死亡或满血
            }
            else {
                var inRnage = CollisionDetector.Instance.IsPlayerInCircle(player.PlayerPos, HealingSkill.OUT_HEALING_RANGE_PERCENTAGE * Laya.stage.width * 0.5, monter);
                if (!inRnage) {
                    this.StopHealingOther(player, index); //出范围
                }
                else {
                    monter.RecoverHp(monter.attributeComp.MaxHP * HealingSkill.HEALING_SPEED * dt);
                }
            }
        }
        //更新特效的朝向
        for (var index = 0; index < this.healingOtherFx.length; index++) {
            //    let element = this.healingOtherFx[index];
            this.UpdateHealingOtherFxPosAndRotation(player, index);
        }
    };
    //收到攻击, 停止
    HealingSkill.prototype.stopSkill = function (player) {
        if (this.timerId >= 0)
            TimeManager.getInst().remove(this.timerId);
        this.timerId = -1;
        //停止特效, 计时
        this.StopAllHealingOtherFx(player);
        this.PlaySelfHealingFx(player, false);
        this.reset();
    };
    //开始治愈其他怪
    HealingSkill.prototype.StartHealingOther = function (player, monster) {
        var fx = player.monsterEffectComp.showEffect(0, EnumSpineConfigID.MonsterHealOther);
        // CommonUtil2D.LookAt(fx, monster.comParent)//设置朝向
        //记录怪物id和特效
        this.healingMonsterId.push(monster.UID);
        this.healingOtherFx.push(fx);
    };
    //更新特效的位置和角度
    HealingSkill.prototype.UpdateHealingOtherFxPosAndRotation = function (player, index) {
        var fx = this.healingOtherFx[index];
        //设置朝向
        var uid = this.healingMonsterId[index];
        var monter = PlayerManager.GetInstance().GetMonsterByUid(uid);
        CommonUtil2D.LookAt(fx, monter.comParent);
        //设置位置
        player.monsterEffectComp.setEffectPos(player.PlayerPos.x, player.PlayerPos.y, fx);
        //设置缩放
        var dist = player.PlayerPos.dist(monter.PlayerPos);
        var config = ConfigManager.GetInstance().GetSpineConfig(EnumSpineConfigID.MonsterHealOther);
        var scale = dist / config.SpineSize[1];
        player.monsterEffectComp.setEffectScale(scale, scale, fx);
    };
    HealingSkill.prototype.StopHealingOther = function (player, index) {
        player.monsterEffectComp.RemoveEffect(this.healingOtherFx[index], EnumSpineConfigID.MonsterHealOther);
        //删除id和特效
        this.healingMonsterId.splice(index, 1);
        this.healingOtherFx.splice(index, 1);
    };
    //停止所有怪物的治疗
    HealingSkill.prototype.StopAllHealingOtherFx = function (player) {
        for (var index = this.healingMonsterId.length - 1; index >= 0; index--) {
            this.StopHealingOther(player, index);
        }
    };
    /**
     * 治愈自己的特效动画
     * @param active
     */
    HealingSkill.prototype.PlaySelfHealingFx = function (player, active) {
        if (active) {
            if (this.healingSelfFx) {
                // Log.Error("当前怪物正在播放自己的治愈spine, 不需再次播放");
                return;
            }
            //挂在怪物节点
            this.healingSelfFx = player.monsterEffectComp.showEffect(0, EnumSpineConfigID.MonsterHealSelf, player.comParent, new Vec2(0, 0));
        }
        else {
            //停止播放
            if (this.healingSelfFx == null) {
                return;
            }
            player.monsterEffectComp.RemoveEffect(this.healingSelfFx, EnumSpineConfigID.MonsterHealSelf);
            this.healingSelfFx = null;
        }
    };
    /**
     * 获取范围内未满血的怪物
     * @param player
     * @param num
     */
    HealingSkill.prototype.GetHealingMonster = function (player, num, exceptMonsterUids) {
        var retMonster = [];
        var count = 0;
        var range = HealingSkill.HEALING_RANGE_PERCENTAGE * Laya.stage.width * 0.5;
        var monsters = CollisionDetector.Instance.CheckMonsterInCircle(player.PlayerPos, range, exceptMonsterUids);
        for (var index = 0; index < monsters.length; index++) {
            var monster = monsters[index];
            if (monster.UID != player.UID && monster.attributeComp.CurHP < monster.attributeComp.MaxHP) {
                retMonster.push(monster);
                count++;
                if (count == num)
                    break;
            }
        }
        return retMonster;
    };
    return HealingSkill;
}());
HealingSkill.CHECK_HIT_INTERVAL = 0.2; //检测收到攻击频率
HealingSkill.CHECK_Healing_INTERVAL = 0.2; //检测四周需要治愈的频率
//# sourceMappingURL=HealingSkill.js.map