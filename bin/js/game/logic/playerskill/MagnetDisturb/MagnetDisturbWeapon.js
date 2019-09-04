/*
* name;
*/
var MagnetDisturbWeapon = (function () {
    function MagnetDisturbWeapon() {
        this.timerId = -1;
    }
    //副武器配置参数
    MagnetDisturbWeapon.prototype.InitWeaponParam = function (config) {
        var params = FormulaUtil.CalcSideWeaponParams(EnumSideWeaponType.MagnetDisturb, GameDataManager.getInstance().GetCurSideWeaponLvl(), config);
        MagnetDisturbWeapon.FIRE_INTERVAL = params[0];
        MagnetDisturbWeapon.MAX_BOUNCE_NUM = params[1];
        MagnetDisturbWeapon.ATTACK_DAMAGE = params[2];
        MagnetDisturbWeapon.ATTACK_RANGE = config.Param5 * 2; //
        MagnetDisturbWeapon.FREEZ_DURATION = config.Param6;
    };
    MagnetDisturbWeapon.prototype.Start = function (parent, param) {
        MagnetDisturbWeapon.config = param;
        this.InitWeaponParam(MagnetDisturbWeapon.config);
        //初始化电网池
        GamePoolManager.Instance.InitPool(MagnetDisturbWeapon.GetPoolID(), 5, MagenetBounce);
        //1. 间隔ns发射
        this.timerId = TimeManager.getInst().once(MagnetDisturbWeapon.FIRE_INTERVAL, cbhandler.gen_handler(this.exeSkill, this, parent));
        this.playPrepareFx(parent);
    };
    MagnetDisturbWeapon.prototype.Stop = function (parent, param) {
        this.End(parent, null, param);
    };
    MagnetDisturbWeapon.prototype.End = function (parent, onEndComplete, param) {
        this.stopPrepareFx();
        //停止发射子弹
        if (this.timerId >= 0)
            TimeManager.getInst().remove(this.timerId);
        this.timerId = -1;
        //销毁已经发射的子弹
        GamePoolManager.Instance.Destory(MagnetDisturbWeapon.GetPoolID());
        if (onEndComplete)
            onEndComplete();
    };
    MagnetDisturbWeapon.prototype.exeSkill = function (player) {
        this.stopPrepareFx();
        this.bounceToNext(0, player.PlayerPos, player);
    };
    MagnetDisturbWeapon.GetPoolID = function () {
        return "MagnetDisturbWeapon" + MagnetDisturbWeapon.config.GetID();
    };
    /**
     * 开始一次弹射
     * @param nextIndex MaxBounceNum中的第几次弹射
     * @param fromPos
     */
    MagnetDisturbWeapon.prototype.bounceToNext = function (nextIndex, fromPos, player) {
        if (nextIndex >= MagnetDisturbWeapon.MAX_BOUNCE_NUM) {
            //到达最大次数停止
            this.stopBounce(player);
            return;
        }
        var targetMonster = this.getValidMonsterInRange(fromPos, MagnetDisturbWeapon.ATTACK_RANGE);
        if (targetMonster) {
            this.exeBounce(nextIndex, fromPos, targetMonster, player);
        }
        else {
            //没有合适目标停止
            this.stopBounce(player);
        }
    };
    //执行
    MagnetDisturbWeapon.prototype.exeBounce = function (index, fromPos, targetMonster, player) {
        var _this = this;
        var bullet = GamePoolManager.Instance.Spawn(MagnetDisturbWeapon.GetPoolID());
        bullet.MaxBounceNum = MagnetDisturbWeapon.MAX_BOUNCE_NUM;
        bullet.AttackRange = MagnetDisturbWeapon.ATTACK_RANGE;
        bullet.FreezeDuration = MagnetDisturbWeapon.FREEZ_DURATION;
        bullet.AttackDamage = MagnetDisturbWeapon.ATTACK_DAMAGE; //每次攻击伤害
        bullet.SPEED = MagnetDisturbWeapon.MOVE_SPEED;
        bullet.start(index, fromPos, targetMonster, function (fininshedIndex, reachedPos) {
            //弹到目标后, 继续下一个
            _this.bounceToNext(fininshedIndex + 1, reachedPos, player);
        });
    };
    //完整连续弹射结束, 开始下个弹射计时
    MagnetDisturbWeapon.prototype.stopBounce = function (parent) {
        // Log.Debug("完整连续弹射结束, 开始下个弹射计时");
        this.timerId = TimeManager.getInst().once(MagnetDisturbWeapon.FIRE_INTERVAL, cbhandler.gen_handler(this.exeSkill, this, parent));
        this.playPrepareFx(parent);
    };
    //获取范围内没有麻痹的怪物
    MagnetDisturbWeapon.prototype.getValidMonsterInRange = function (cirleCenter, radius) {
        var monstersInRange = CollisionDetector.Instance.CheckMonsterInCircle(cirleCenter, radius);
        for (var index = 0; index < monstersInRange.length; index++) {
            var monster = monstersInRange[index];
            if (!monster.BuffComp.ContainBuff(EnumBuffType.MagnetFreezen)) {
                return monster;
            }
        }
        return null;
    };
    MagnetDisturbWeapon.prototype.playPrepareFx = function (parent) {
        if (this.curPlayingFx) {
            Log.Warn("电磁干扰的准备动画, 没有停止, 直接播放");
        }
        else {
            this.curPlayingFx = MatchSpineManager.Instance.Spawn(EnumSpineConfigID.MagnetDisturbPrepare);
        }
        parent.comParent.addChild(this.curPlayingFx);
        var config = ConfigManager.GetInstance().GetSpineConfig(EnumSpineConfigID.MagnetDisturbPrepare);
        this.curPlayingFx.pivot(config.SpinePivot[0], config.SpinePivot[1]);
        this.curPlayingFx.play(0, true);
    };
    MagnetDisturbWeapon.prototype.stopPrepareFx = function () {
        if (this.curPlayingFx) {
            this.curPlayingFx.removeSelf();
            MatchSpineManager.Instance.Recycle(EnumSpineConfigID.MagnetDisturbPrepare, this.curPlayingFx);
        }
        this.curPlayingFx = null;
    };
    return MagnetDisturbWeapon;
}());
MagnetDisturbWeapon.MOVE_SPEED = 100; // 移动速度
//# sourceMappingURL=MagnetDisturbWeapon.js.map