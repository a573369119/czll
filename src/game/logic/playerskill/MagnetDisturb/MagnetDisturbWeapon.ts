/*
* name;
*/
class MagnetDisturbWeapon implements ISkillLogic {
    public static FIRE_INTERVAL: number; //发射频率
    public static MAX_BOUNCE_NUM: number;   //弹射次数
    public static ATTACK_RANGE: number;//= 400 * 2;//弹射攻击范围
    public static ATTACK_DAMAGE: number; //每次攻击伤害
    public static FREEZ_DURATION: number;//= 3;//麻痹时间
    public static MOVE_SPEED: number = 100;// 移动速度

    private timerId: number = -1;
    private static config: WeaponConfigConfigData;

    //副武器配置参数
    private InitWeaponParam(config: WeaponConfigConfigData) {
        let params = FormulaUtil.CalcSideWeaponParams(EnumSideWeaponType.MagnetDisturb, GameDataManager.getInstance().GetCurSideWeaponLvl(), config);
        MagnetDisturbWeapon.FIRE_INTERVAL = params[0];
        MagnetDisturbWeapon.MAX_BOUNCE_NUM = params[1]
        MagnetDisturbWeapon.ATTACK_DAMAGE = params[2]
        MagnetDisturbWeapon.ATTACK_RANGE = config.Param5 * 2;//
        MagnetDisturbWeapon.FREEZ_DURATION = config.Param6;
    }

    public Start(parent: PlayerBase2D, param: any) {
        MagnetDisturbWeapon.config = param;
        this.InitWeaponParam(MagnetDisturbWeapon.config);
        //初始化电网池
        GamePoolManager.Instance.InitPool<MagenetBounce>(MagnetDisturbWeapon.GetPoolID(), 5, MagenetBounce)

        //1. 间隔ns发射
        this.timerId = TimeManager.getInst().once(MagnetDisturbWeapon.FIRE_INTERVAL, cbhandler.gen_handler(this.exeSkill, this, parent));
        this.playPrepareFx(parent);
    }

    public Stop(parent: PlayerBase2D, param: any) {
        this.End(parent, null, param)
    }

    public End(parent: PlayerBase2D, onEndComplete: Function, param: any) {
        this.stopPrepareFx();
        //停止发射子弹
        if (this.timerId >= 0) TimeManager.getInst().remove(this.timerId);
        this.timerId = -1;
        //销毁已经发射的子弹
        GamePoolManager.Instance.Destory<MagenetBounce>(MagnetDisturbWeapon.GetPoolID());
        if (onEndComplete) onEndComplete();
    }

    private exeSkill(player: PlayerBase2D) {
        this.stopPrepareFx();
        this.bounceToNext(0, player.PlayerPos, player)
    }

    public static GetPoolID(): string {
        return "MagnetDisturbWeapon" + MagnetDisturbWeapon.config.GetID();
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////
    //逻辑

    private curBounceCount: number; //已经弹射几次

    /**
     * 开始一次弹射
     * @param nextIndex MaxBounceNum中的第几次弹射
     * @param fromPos 
     */
    private bounceToNext(nextIndex: number, fromPos: Vec2, player: PlayerBase2D) {
        if (nextIndex >= MagnetDisturbWeapon.MAX_BOUNCE_NUM) {
            //到达最大次数停止
            this.stopBounce(player);
            return;
        }

        let targetMonster = this.getValidMonsterInRange(fromPos, MagnetDisturbWeapon.ATTACK_RANGE);
        if (targetMonster) {
            this.exeBounce(nextIndex, fromPos, targetMonster, player)
        } else {
            //没有合适目标停止
            this.stopBounce(player);
        }
    }

    //执行
    private exeBounce(index: number, fromPos: Vec2, targetMonster: Monster, player: PlayerBase2D) {
        let bullet = GamePoolManager.Instance.Spawn<MagenetBounce>(MagnetDisturbWeapon.GetPoolID());
        bullet.MaxBounceNum = MagnetDisturbWeapon.MAX_BOUNCE_NUM;
        bullet.AttackRange = MagnetDisturbWeapon.ATTACK_RANGE;
        bullet.FreezeDuration = MagnetDisturbWeapon.FREEZ_DURATION;
        bullet.AttackDamage = MagnetDisturbWeapon.ATTACK_DAMAGE; //每次攻击伤害
        bullet.SPEED = MagnetDisturbWeapon.MOVE_SPEED;
        bullet.start(index, fromPos, targetMonster,
            (fininshedIndex: number, reachedPos: Vec2) => {
                //弹到目标后, 继续下一个
                this.bounceToNext(fininshedIndex + 1, reachedPos, player);
            });
    }


    //完整连续弹射结束, 开始下个弹射计时
    private stopBounce(parent: PlayerBase2D) {
        // Log.Debug("完整连续弹射结束, 开始下个弹射计时");
        this.timerId = TimeManager.getInst().once(MagnetDisturbWeapon.FIRE_INTERVAL, cbhandler.gen_handler(this.exeSkill, this, parent));
        this.playPrepareFx(parent);
    }


    //获取范围内没有麻痹的怪物
    private getValidMonsterInRange(cirleCenter: Vec2, radius: number): Monster {
        let monstersInRange = CollisionDetector.Instance.CheckMonsterInCircle(cirleCenter, radius);
        for (let index = 0; index < monstersInRange.length; index++) {
            let monster = monstersInRange[index];
            if (!monster.BuffComp.ContainBuff(EnumBuffType.MagnetFreezen)) {
                return monster;
            }
        }
        return null;
    }

    private curPlayingFx: Laya.Skeleton;
    private playPrepareFx(parent: PlayerBase2D) {
        if (this.curPlayingFx) {
            Log.Warn("电磁干扰的准备动画, 没有停止, 直接播放")
        } else {
            this.curPlayingFx = MatchSpineManager.Instance.Spawn(EnumSpineConfigID.MagnetDisturbPrepare)
        }
        parent.comParent.addChild(this.curPlayingFx);
        let config = ConfigManager.GetInstance().GetSpineConfig(EnumSpineConfigID.MagnetDisturbPrepare);
        this.curPlayingFx.pivot(config.SpinePivot[0], config.SpinePivot[1]);
        this.curPlayingFx.play(0, true)
    }

    private stopPrepareFx() {
        if (this.curPlayingFx) {
            this.curPlayingFx.removeSelf();
            MatchSpineManager.Instance.Recycle(EnumSpineConfigID.MagnetDisturbPrepare, this.curPlayingFx)
        }
        this.curPlayingFx = null;
    }
}  