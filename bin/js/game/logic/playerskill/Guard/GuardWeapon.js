/*
* name;
*/
var GuardWeapon = (function () {
    function GuardWeapon() {
        this.timerId = -1;
    }
    //副武器配置参数
    GuardWeapon.prototype.InitWeaponParam = function (config) {
        var params = FormulaUtil.CalcSideWeaponParams(EnumSideWeaponType.Guard, GameDataManager.getInstance().GetCurSideWeaponLvl(), config);
        GuardWeapon.FIRE_INTERVAL = params[0];
        GuardWeapon.WIDTH = params[1];
        GuardWeapon.DURATION = params[2];
        GuardWeapon.ATTACK_DAMAGE = params[3];
        GuardWeapon.HEIGHT = ConfigManager.GetInstance().GetSpineConfig(EnumSpineConfigID.Guard).SpineSize[1];
    };
    GuardWeapon.prototype.Start = function (parent, param) {
        GuardWeapon.config = param;
        this.InitWeaponParam(GuardWeapon.config);
        //初始化电网池
        GamePoolManager.Instance.InitPool(GuardWeapon.GetPoolID(), 5, Guard);
        //1. 间隔ns发射电网, 跟随机身移动,  可抵挡一次子弹或者敌人, 抵挡后消失
        //间隔ns
        this.timerId = TimeManager.getInst().loop(GuardWeapon.FIRE_INTERVAL, cbhandler.gen_handler(this.exeSkill, this, parent, param));
    };
    GuardWeapon.prototype.Stop = function (parent, param) {
        this.End(parent, null, param);
    };
    GuardWeapon.prototype.End = function (parent, onEndComplete, param) {
        //停止发射子弹
        if (this.timerId >= 0)
            TimeManager.getInst().remove(this.timerId);
        this.timerId = -1;
        //销毁已经发射的子弹
        GamePoolManager.Instance.Destory(GuardWeapon.GetPoolID());
        if (onEndComplete)
            onEndComplete();
    };
    GuardWeapon.prototype.exeSkill = function (player, config) {
        var bullet = GamePoolManager.Instance.Spawn(GuardWeapon.GetPoolID());
        bullet.setPlayerPos(player.comParent.x, player.comParent.y);
        // GuardWeapon.WIDTH = 300;
        bullet.Size = new Vec2(GuardWeapon.WIDTH, GuardWeapon.HEIGHT); //大小
        bullet.Duration = GuardWeapon.DURATION; //存活时间
        bullet.start(player);
    };
    GuardWeapon.GetPoolID = function () {
        return "GuardWeapon" + GuardWeapon.config.GetID();
    };
    return GuardWeapon;
}());
//# sourceMappingURL=GuardWeapon.js.map