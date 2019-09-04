/*
* name;
*/
class LaserWeapon implements ISkillLogic {
    public static FIRE_INTERVAL: number; //发射频率
    public static WIDTH: number;   //直径
    public static HEIGHT: number;//长根据spineconfig配置表
    public static DURATION: number;//持续时间
    public static ATTACK_INTERVAL: number;//= 0.2;//对同个怪物的攻击频率
    public static ATTACK_DAMAGE: number; //每次攻击伤害
    public static LASER_POS = 150;//左右距离

    private timerId: number = -1;
    private static config: WeaponConfigConfigData;

    //副武器配置参数
    private InitWeaponParam(config: WeaponConfigConfigData) {
        let params = FormulaUtil.CalcSideWeaponParams(EnumSideWeaponType.Laser, GameDataManager.getInstance().GetCurSideWeaponLvl(), config);
        LaserWeapon.FIRE_INTERVAL = params[0];
        LaserWeapon.WIDTH = params[1]
        LaserWeapon.DURATION = params[2]
        LaserWeapon.ATTACK_DAMAGE = params[3]
        LaserWeapon.HEIGHT = ConfigManager.GetInstance().GetSpineConfig(EnumSpineConfigID.Laser).SpineSize[1]
        LaserWeapon.ATTACK_INTERVAL = config.Param5;
    }

    public Start(parent: PlayerBase2D, param: any) {
        LaserWeapon.config = param;
        this.InitWeaponParam(LaserWeapon.config);
        //初始化电网池
        GamePoolManager.Instance.InitPool<Laser>(LaserWeapon.GetPoolID(), 5, Laser)

        //1. 间隔ns发射电网, 随机身左右摆动, 对碰到的敌人进行间隔攻击
        this.timerId = TimeManager.getInst().loop(LaserWeapon.FIRE_INTERVAL, cbhandler.gen_handler(this.exeSkill, this, parent, param));
    }

    public Stop(parent: PlayerBase2D, param: any) {
        this.End(parent, null, param)
    }

    public End(parent: PlayerBase2D, onEndComplete: Function, param: any) {
        //停止发射子弹
        if (this.timerId >= 0) TimeManager.getInst().remove(this.timerId);
        this.timerId = -1;
        //销毁已经发射的子弹
        GamePoolManager.Instance.Destory<Laser>(LaserWeapon.GetPoolID());
        if (onEndComplete) onEndComplete();
    }

    private exeSkill(player: PlayerBase2D, config: WeaponConfigConfigData) {

        for (let index = 0; index < 2; index++) {
            let bullet = GamePoolManager.Instance.Spawn<Laser>(LaserWeapon.GetPoolID());
            // bullet.setPlayerPos(player.comParent.x + (index == 0 ? 1 : -1) * LaserWeapon.LASER_POS, player.comParent.y);
            bullet.Size = new Vec2(LaserWeapon.WIDTH, LaserWeapon.HEIGHT)//大小
            bullet.Duration = LaserWeapon.DURATION;//存活时间
            bullet.AttackInterval = LaserWeapon.ATTACK_INTERVAL//对同个怪物的攻击频率
            bullet.AttackDamage = LaserWeapon.ATTACK_DAMAGE; //每次攻击伤害
            bullet.start(player, new Vec2((index == 0 ? 1 : -1) * LaserWeapon.LASER_POS, 0));
        }
    }

    public static GetPoolID(): string {
        return "LaserWeapon" + LaserWeapon.config.GetID();
    }
}