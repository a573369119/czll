/*
* name;
*/
class AttackSkill implements ISkillLogic {
    public static ATTACK_INTERVAL: number;// = 2;       //攻击间隔
    public static FIRE_BULLET_COUNT: number;// = 3;    //发射子弹数量
    public static BULLET_INTERVAL: number = 0.3;    //每个子弹之间的间隔
    private config: SkillConfigConfigData;
    private InitParam(config: SkillConfigConfigData) {
        ///let config = ConfigManager.GetInstance().GetSkillConfig(EnumMonsterPowerId.Attack)
        AttackSkill.ATTACK_INTERVAL = config.Param1;
        AttackSkill.FIRE_BULLET_COUNT = config.Param2;
        //AttackSkill.BULLET_INTERVAL = config.Param3;
    }

    public Start(player: Monster, ...param: any[]) {
        this.config = param[0] as SkillConfigConfigData;
        this.InitParam(this.config);
        this.reset();
        this.startTimer(player, param)
    }

    public Stop(parent: PlayerBase2D, param: any) {
        this.End(parent, null, param)
    }

    public End(parent: PlayerBase2D, onEndComplete: Function, param: any) {
        if (this.timerId >= 0) TimeManager.getInst().remove(this.timerId);
        this.timerId = -1;
        if (onEndComplete) onEndComplete();
    }

    ///////////////////////////////////////////////////////////////////////////////////
    //
    private timerId: number;//计时
    private fireBulletCount: number = 0;//发射的子弹数量

    //开始计时
    private startTimer(player: Monster, param: any) {
        //间隔ns
        this.timerId = TimeManager.getInst().once(AttackSkill.ATTACK_INTERVAL, cbhandler.gen_handler(this.exe, this, player, param));
    }

    //执行
    private exe(player: Monster, param: any) {
        this.reset();
        this.fireBullet(player, param)
    }

    private fireBullet(player: Monster, param: any) {
        this.timerId = -1;
        player.monsterBulletComp.skillFire(PlayerManager.GetInstance().MainPlayer.comParent)
        this.fireBulletCount++;
        if (this.fireBulletCount == AttackSkill.FIRE_BULLET_COUNT) {
            this.startTimer(player, param); //开始新攻击间隔等待
        } else {
            this.timerId = TimeManager.getInst().once(AttackSkill.BULLET_INTERVAL, cbhandler.gen_handler(this.fireBullet, this, player, param));//发射子弹
        }
    }

    private reset() {
        this.timerId = -1;
        this.fireBulletCount = 0;
    }
}