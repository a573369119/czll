/*
* name;
*/
var ExplosionSkill = (function () {
    function ExplosionSkill() {
        this.explosionBulletNum = 10; //发射子弹数量
        ///////////////////////////////////////////////////////////////////////////////////
        //
        this.preapareFx = null;
        this.explosionFx = null;
    }
    ExplosionSkill.prototype.InitParam = function (config) {
        //let config = ConfigManager.GetInstance().GetSkillConfig(EnumMonsterPowerId.Explosion)
        this.explosionBulletNum = config.Param1;
    };
    ExplosionSkill.prototype.Start = function (player) {
        var param = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            param[_i - 1] = arguments[_i];
        }
        this.config = param[0];
        this.InitParam(this.config);
        // this.reset();
        // this.startTimer(player, param)
    };
    ExplosionSkill.prototype.Stop = function (player, param) {
        if (this.preapareFx) {
            player.monsterEffectComp.RemoveEffect(this.preapareFx, EnumSpineConfigID.MonsterPrepareExplosion);
            this.preapareFx = null;
        }
        if (this.explosionFx) {
            player.monsterEffectComp.RemoveEffect(this.explosionFx, EnumSpineConfigID.MonsterExplosion);
            this.explosionFx = null;
        }
    };
    ExplosionSkill.prototype.End = function (player, onEndComplete, param) {
        // if (onEndComplete) onEndComplete();
        this.playPrepareExplosion(player, onEndComplete);
    };
    ExplosionSkill.prototype.playPrepareExplosion = function (player, onEndComplete) {
        var _this = this;
        player.monsterMoveComp.monsterStop();
        player.setPlayerActive(true);
        this.preapareFx = player.monsterEffectComp.showEffect(0, EnumSpineConfigID.MonsterPrepareExplosion, null, null, function () {
            _this.preapareFx = null;
            _this.playExplosion(player, onEndComplete);
        });
    };
    ExplosionSkill.prototype.playExplosion = function (player, onEndComplete) {
        var _this = this;
        player.setPlayerActive(false);
        this.explosionFx = player.monsterEffectComp.showEffect(0, EnumSpineConfigID.MonsterExplosion, null, null, function () {
            _this.explosionFx = null;
            _this.shoot(player);
            onEndComplete();
        });
    };
    ExplosionSkill.prototype.shoot = function (player) {
        var circlePos = CommonUtil2D.DivideCircle(player.PlayerPos, 10, this.explosionBulletNum);
        for (var index = 0; index < circlePos.length; index++) {
            player.monsterBulletComp.skillFireByTargetPos(circlePos[index]);
        }
    };
    return ExplosionSkill;
}());
//# sourceMappingURL=ExplosionSkill.js.map