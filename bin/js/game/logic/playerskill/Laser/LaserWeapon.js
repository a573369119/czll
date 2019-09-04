/*
* name;
*/
var LaserWeapon = (function () {
    function LaserWeapon() {
        this.timerId = -1;
    }
    //副武器配置参数
    LaserWeapon.prototype.InitWeaponParam = function (config) {
        var params = FormulaUtil.CalcSideWeaponParams(EnumSideWeaponType.Laser, GameDataManager.getInstance().GetCurSideWeaponLvl(), config);
        LaserWeapon.FIRE_INTERVAL = params[0];
        LaserWeapon.WIDTH = params[1];
        LaserWeapon.DURATION = params[2];
        LaserWeapon.ATTACK_DAMAGE = params[3];
        LaserWeapon.HEIGHT = ConfigManager.GetInstance().GetSpineConfig(EnumSpineConfigID.Laser).SpineSize[1];
        LaserWeapon.ATTACK_INTERVAL = config.Param5;
    };
    LaserWeapon.prototype.Start = function (parent, param) {
        LaserWeapon.config = param;
        this.InitWeaponParam(LaserWeapon.config);
        //初始化电网池
        GamePoolManager.Instance.InitPool(LaserWeapon.GetPoolID(), 5, Laser);
        //1. 间隔ns发射电网, 随机身左右摆动, 对碰到的敌人进行间隔攻击
        this.timerId = TimeManager.getInst().loop(LaserWeapon.FIRE_INTERVAL, cbhandler.gen_handler(this.exeSkill, this, parent, param));
    };
    LaserWeapon.prototype.Stop = function (parent, param) {
        this.End(parent, null, param);
    };
    LaserWeapon.prototype.End = function (parent, onEndComplete, param) {
        //停止发射子弹
        if (this.timerId >= 0)
            TimeManager.getInst().remove(this.timerId);
        this.timerId = -1;
        //销毁已经发射的子弹
        GamePoolManager.Instance.Destory(LaserWeapon.GetPoolID());
        if (onEndComplete)
            onEndComplete();
    };
    LaserWeapon.prototype.exeSkill = function (player, config) {
        for (var index = 0; index < 2; index++) {
            var bullet = GamePoolManager.Instance.Spawn(LaserWeapon.GetPoolID());
            // bullet.setPlayerPos(player.comParent.x + (index == 0 ? 1 : -1) * LaserWeapon.LASER_POS, player.comParent.y);
            bullet.Size = new Vec2(LaserWeapon.WIDTH, LaserWeapon.HEIGHT); //大小
            bullet.Duration = LaserWeapon.DURATION; //存活时间
            bullet.AttackInterval = LaserWeapon.ATTACK_INTERVAL; //对同个怪物的攻击频率
            bullet.AttackDamage = LaserWeapon.ATTACK_DAMAGE; //每次攻击伤害
            bullet.start(player, new Vec2((index == 0 ? 1 : -1) * LaserWeapon.LASER_POS, 0));
        }
    };
    LaserWeapon.GetPoolID = function () {
        return "LaserWeapon" + LaserWeapon.config.GetID();
    };
    return LaserWeapon;
}());
LaserWeapon.LASER_POS = 150; //左右距离
//# sourceMappingURL=LaserWeapon.js.map