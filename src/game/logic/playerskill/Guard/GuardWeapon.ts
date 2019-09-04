/*
* name;
*/
class GuardWeapon implements ISkillLogic {
    public static FIRE_INTERVAL: number; //发射频率
    public static WIDTH: number;   //护盾范围
    public static HEIGHT: number;//长 根据配置表
    public static DURATION: number;//持续时间
    public static ATTACK_DAMAGE: number; //每次攻击伤害

    private timerId: number = -1;
    private static config: WeaponConfigConfigData;

    //副武器配置参数
    private InitWeaponParam(config: WeaponConfigConfigData) {
        let params = FormulaUtil.CalcSideWeaponParams(EnumSideWeaponType.Guard, GameDataManager.getInstance().GetCurSideWeaponLvl(), config);
        GuardWeapon.FIRE_INTERVAL = params[0];
        GuardWeapon.WIDTH = params[1]
        GuardWeapon.DURATION = params[2]
        GuardWeapon.ATTACK_DAMAGE = params[3]
        GuardWeapon.HEIGHT = ConfigManager.GetInstance().GetSpineConfig(EnumSpineConfigID.Guard).SpineSize[1]
    }

    public Start(parent: PlayerBase2D, param: any) {
        GuardWeapon.config = param;
        this.InitWeaponParam(GuardWeapon.config);
        //初始化电网池
        GamePoolManager.Instance.InitPool<Guard>(GuardWeapon.GetPoolID(), 5, Guard)

        //1. 间隔ns发射电网, 跟随机身移动,  可抵挡一次子弹或者敌人, 抵挡后消失
        //间隔ns
        this.timerId = TimeManager.getInst().loop(GuardWeapon.FIRE_INTERVAL, cbhandler.gen_handler(this.exeSkill, this, parent, param));
    }

    public Stop(parent: PlayerBase2D, param: any) {
        this.End(parent, null, param)
    }

    public End(parent: PlayerBase2D, onEndComplete: Function, param: any) {
        //停止发射子弹
        if (this.timerId >= 0) TimeManager.getInst().remove(this.timerId);
        this.timerId = -1;
        //销毁已经发射的子弹
        GamePoolManager.Instance.Destory<Guard>(GuardWeapon.GetPoolID());
        if (onEndComplete) onEndComplete();
    }

    private exeSkill(player: PlayerBase2D, config: WeaponConfigConfigData) {

        let bullet = GamePoolManager.Instance.Spawn<Guard>(GuardWeapon.GetPoolID());
        bullet.setPlayerPos(player.comParent.x, player.comParent.y);
        // GuardWeapon.WIDTH = 300;
        bullet.Size = new Vec2(GuardWeapon.WIDTH, GuardWeapon.HEIGHT)//大小
        bullet.Duration = GuardWeapon.DURATION;//存活时间
        bullet.start(player);

    }

    public static GetPoolID(): string {
        return "GuardWeapon" + GuardWeapon.config.GetID();
    }
}