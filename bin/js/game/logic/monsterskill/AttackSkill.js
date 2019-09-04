/*
* name;
*/
var AttackSkill = (function () {
    function AttackSkill() {
        this.fireBulletCount = 0; //发射的子弹数量
    }
    AttackSkill.prototype.InitParam = function (config) {
        ///let config = ConfigManager.GetInstance().GetSkillConfig(EnumMonsterPowerId.Attack)
        AttackSkill.ATTACK_INTERVAL = config.Param1;
        AttackSkill.FIRE_BULLET_COUNT = config.Param2;
        //AttackSkill.BULLET_INTERVAL = config.Param3;
    };
    AttackSkill.prototype.Start = function (player) {
        var param = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            param[_i - 1] = arguments[_i];
        }
        this.config = param[0];
        this.InitParam(this.config);
        this.reset();
        this.startTimer(player, param);
    };
    AttackSkill.prototype.Stop = function (parent, param) {
        this.End(parent, null, param);
    };
    AttackSkill.prototype.End = function (parent, onEndComplete, param) {
        if (this.timerId >= 0)
            TimeManager.getInst().remove(this.timerId);
        this.timerId = -1;
        if (onEndComplete)
            onEndComplete();
    };
    //开始计时
    AttackSkill.prototype.startTimer = function (player, param) {
        //间隔ns
        this.timerId = TimeManager.getInst().once(AttackSkill.ATTACK_INTERVAL, cbhandler.gen_handler(this.exe, this, player, param));
    };
    //执行
    AttackSkill.prototype.exe = function (player, param) {
        this.reset();
        this.fireBullet(player, param);
    };
    AttackSkill.prototype.fireBullet = function (player, param) {
        this.timerId = -1;
        player.monsterBulletComp.skillFire(PlayerManager.GetInstance().MainPlayer.comParent);
        this.fireBulletCount++;
        if (this.fireBulletCount == AttackSkill.FIRE_BULLET_COUNT) {
            this.startTimer(player, param); //开始新攻击间隔等待
        }
        else {
            this.timerId = TimeManager.getInst().once(AttackSkill.BULLET_INTERVAL, cbhandler.gen_handler(this.fireBullet, this, player, param)); //发射子弹
        }
    };
    AttackSkill.prototype.reset = function () {
        this.timerId = -1;
        this.fireBulletCount = 0;
    };
    return AttackSkill;
}());
AttackSkill.BULLET_INTERVAL = 0.3; //每个子弹之间的间隔
//# sourceMappingURL=AttackSkill.js.map