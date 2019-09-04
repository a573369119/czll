/*
* 隔离电网技能
*/
var ElectricNetWeapon = (function () {
    function ElectricNetWeapon() {
        this.timerId = -1;
    }
    //副武器配置参数
    ElectricNetWeapon.prototype.InitWeaponParam = function (config) {
        var params = FormulaUtil.CalcSideWeaponParams(EnumSideWeaponType.ElectricNet, GameDataManager.getInstance().GetCurSideWeaponLvl(), config);
        ElectricNetWeapon.FIRE_INTERVAL = params[0];
        ElectricNetWeapon.WIDTH = params[1];
        ElectricNetWeapon.ATTACK_INTERVAL = params[2];
        ElectricNetWeapon.ATTACK_DAMAGE = params[3];
        ElectricNetWeapon.NET_DURATION = params[4]; //
        ElectricNetWeapon.MOVE_VELOCITY = config.Param6;
    };
    ElectricNetWeapon.prototype.Start = function (parent, param) {
        ElectricNetWeapon.config = param;
        this.InitWeaponParam(ElectricNetWeapon.config);
        //初始化电网池
        GamePoolManager.Instance.InitPool(ElectricNetWeapon.GetPoolID(), 5, ElectricNet);
        //1. 间隔ns发射电网, 持续5s
        //移动速度固定100, 移动到屏幕最上方, 直到消失, 
        //同一个怪物, 伤害间隔ns, 持续往上推.
        //技能消失后,怪物随机移动. 
        //间隔ns
        this.timerId = TimeManager.getInst().loop(ElectricNetWeapon.FIRE_INTERVAL, cbhandler.gen_handler(this.exeSkill, this, parent, param));
    };
    ElectricNetWeapon.prototype.Stop = function (parent, param) {
        this.End(parent, null, param);
    };
    ElectricNetWeapon.prototype.End = function (parent, onEndComplete, param) {
        //停止发射子弹
        if (this.timerId >= 0)
            TimeManager.getInst().remove(this.timerId);
        this.timerId = -1;
        //销毁已经发射的子弹
        GamePoolManager.Instance.Destory(ElectricNetWeapon.GetPoolID());
        if (onEndComplete)
            onEndComplete();
    };
    ElectricNetWeapon.prototype.exeSkill = function (player, config) {
        var bullet = GamePoolManager.Instance.Spawn(ElectricNetWeapon.GetPoolID());
        bullet.setBulletPos(player.comParent.x, player.comParent.y);
        bullet.bulletMoveCom.SpeedY = ElectricNetWeapon.MOVE_VELOCITY; //电网移动速度
        bullet.bulletMoveCom.setMoveDir(new Vec2(0, -1), true);
        // bullet.bulletMoveCom.MoveDir = 
        bullet.NetLen = ElectricNetWeapon.WIDTH; //电网大小
        bullet.Duration = ElectricNetWeapon.NET_DURATION; //存活时间
        bullet.AttackDamage = ElectricNetWeapon.ATTACK_DAMAGE;
        bullet.AttackInterval = ElectricNetWeapon.ATTACK_INTERVAL;
        bullet.start();
    };
    ElectricNetWeapon.GetPoolID = function () {
        return "ElectricNetWeapon" + ElectricNetWeapon.config.GetID();
    };
    return ElectricNetWeapon;
}());
//# sourceMappingURL=ElectricNetWeapon.js.map