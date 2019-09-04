/*
* name;
*/
var MissileWeapon = (function () {
    function MissileWeapon() {
        this.timerId = -1;
    }
    //副武器配置参数
    MissileWeapon.prototype.InitWeaponParam = function (config) {
        var params = FormulaUtil.CalcSideWeaponParams(EnumSideWeaponType.Missile, GameDataManager.getInstance().GetCurSideWeaponLvl(), config);
        MissileWeapon.FIRE_INTERVAL = params[0];
        MissileWeapon.BULLET_ATTACT_RADIUS = params[1] * 0.5;
        MissileWeapon.BULLET_ATTACT_DAMAGE = params[2];
        MissileWeapon.BULLET_MOVE_DIST = config.Param5;
    };
    MissileWeapon.prototype.Start = function (parent, param) {
        MissileWeapon.config = param;
        this.InitWeaponParam(MissileWeapon.config);
        GamePoolManager.Instance.InitPool(MissileWeapon.GetPoolID(), 5, MissileBullet, EnumBulletOutLookType.MISSILE_WEAPON_BULLET);
        //间隔ns
        this.timerId = TimeManager.getInst().loop(MissileWeapon.FIRE_INTERVAL, cbhandler.gen_handler(this.exeSkill, this, parent, MissileWeapon.config));
    };
    MissileWeapon.prototype.Stop = function (parent, param) {
        this.End(parent, null, param);
    };
    MissileWeapon.prototype.End = function (parent, onEndComplete, param) {
        MissileWeapon.config = param;
        //停止发射子弹
        if (this.timerId >= 0)
            TimeManager.getInst().remove(this.timerId);
        this.timerId = -1;
        //销毁已经发射的子弹
        GamePoolManager.Instance.Destory(MissileWeapon.GetPoolID());
        if (onEndComplete)
            onEndComplete();
    };
    MissileWeapon.prototype.exeSkill = function (player, config) {
        //两边发射
        for (var index = 0; index < 2; index++) {
            var bullet = GamePoolManager.Instance.Spawn(MissileWeapon.GetPoolID());
            bullet.setBulletPos(player.comParent.x + (index == 0 ? 1 : -1) * MissileWeapon.BULLET_FIRE_POS, player.comParent.y);
            bullet.bulletMoveCom.bulletMove();
            bullet.AttackDamage = MissileWeapon.BULLET_ATTACT_DAMAGE;
            bullet.AttackRadius = MissileWeapon.BULLET_ATTACT_RADIUS;
        }
    };
    MissileWeapon.GetPoolID = function () {
        return "MissileBullet" + MissileWeapon.config.GetID();
    };
    return MissileWeapon;
}());
MissileWeapon.BULLET_FIRE_POS = 150; //左右30距离
MissileWeapon.BULLET_SPEED = 1000; //导弹速度
//# sourceMappingURL=MissileWeapon.js.map