/*
* 初始化Start所有技能
* 死亡触发技能在死亡时候触发End()
* 在弱化buff影响下, 除了死亡技能,其他技能都停止.
* 分裂技能需要在start的时候知道,当前是第几次分裂.
*/
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MonsterSkillComponent2D = (function (_super) {
    __extends(MonsterSkillComponent2D, _super);
    function MonsterSkillComponent2D() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~缩放技能~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        _this.skillScale = 2;
        //持续时间
        _this.keepScaleTime = 4000;
        //变化过程时间
        _this.scaleChangeTime = 2000;
        //CD时间 5-8
        _this.skillType1Interval = 5;
        _this.skillTpye1RandomTime = 3;
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~朝向玩家~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        _this.skillMoveToMainPlayerInterval = 2;
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~朝向玩家~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        _this.skillFireInterval = 5;
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~生产怪物~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        _this.createMonsterInterval = 5;
        _this.childRange = 50;
        _this.childCount = 1;
        _this.childMoveTime = 500;
        _this.createChildScale = 0.6;
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~分裂~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        _this.splitChileCount = 2;
        _this.currentSplitLev = 1;
        _this.maxSplitLev = 3;
        _this.splitScale = 0.8;
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~治疗~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        _this.skillTreatmentInterval = 0.1;
        _this.skillTreatmentMaxRange = Laya.stage.width * 0.5;
        return _this;
    }
    //-------------------------------公测Boss----------------------------
    // private static added = false;
    MonsterSkillComponent2D.prototype.onAdd = function () {
        this.monster = this.player;
        this.curRuningSkillId = [];
        this.curRuningSkill = [];
    };
    MonsterSkillComponent2D.prototype.onReomove = function () {
        this.stopAll();
    };
    MonsterSkillComponent2D.prototype.useSkill = function () {
        //根据怪物所拥有的类型使用技能，可能会有多技能
    };
    /**
     * 开始技能，得到怪物技能的信息，装入skill数组里面，在运行 skil技能逻辑类的star
     * @param skillId 技能的id
     * @param skillConfig 技能的配置
     * @param param //是否要参数
     */
    MonsterSkillComponent2D.prototype.Start = function (skillId, skillConfig, param) {
        Log.Debug("怪物%i, uid:%i, 开始技能%s", this.player.playerID, this.player.UID, skillId);
        this.exe(skillId, skillConfig, param);
    };
    //比赛结束, 停止技能
    MonsterSkillComponent2D.prototype.Stop = function (skillId) {
        //Log.Debug("怪物%i, uid:%i, stio技能%s", this.player.playerID, this.player.UID, skillId)
        this.stop(skillId);
    };
    //死亡, 停止技能
    MonsterSkillComponent2D.prototype.End = function (skillId, onEnd) {
        //Log.Debug("怪物%i, uid:%i, end技能%s", this.player.playerID, this.player.UID, skillId)
        this.end(skillId, onEnd);
    };
    //不包含
    MonsterSkillComponent2D.prototype.ConstainSkill = function (skillId) {
        return this.curRuningSkillId.indexOf(skillId) >= 0;
    };
    MonsterSkillComponent2D.prototype.GetSkill = function (skillId) {
        var index = this.curRuningSkillId.indexOf(skillId);
        return this.curRuningSkill[index];
    };
    /**
     * 技能运行类， 到 skill类中去
     * @param monsterPowerId
     * @param skillConfig
     * @param param
     */
    MonsterSkillComponent2D.prototype.exe = function (monsterPowerId, skillConfig, param) {
        var index = this.curRuningSkillId.indexOf(monsterPowerId);
        if (index >= 0) {
            Log.Error("当前怪物已经开始技能%s,不重复执行", monsterPowerId);
            return;
        }
        var skill = this.getMonsterSkill(monsterPowerId);
        skill.Start(this.player, skillConfig, param);
        this.curRuningSkill.push(skill);
        this.curRuningSkillId.push(monsterPowerId);
    };
    /**
     * 根据id停止没某个技能
     * @param monsterPowerId
     */
    MonsterSkillComponent2D.prototype.stop = function (monsterPowerId) {
        var index = this.curRuningSkillId.indexOf(monsterPowerId);
        if (index < 0) {
            Log.Error("当前怪物没有开始技能%s,无法停止", monsterPowerId);
            return;
        }
        else {
            this.curRuningSkill[index].Stop(this.player, null);
            this.curRuningSkill.splice(index, 1);
            this.curRuningSkillId.splice(index, 1);
        }
    };
    MonsterSkillComponent2D.prototype.end = function (monsterPowerId, onComplete) {
        var _this = this;
        var index = this.curRuningSkillId.indexOf(monsterPowerId);
        if (index < 0) {
            Log.Error("当前怪物没有开始技能%s,无法End", monsterPowerId);
            return;
        }
        else {
            this.curRuningSkill[index].End(this.player, function () {
                _this.curRuningSkill.splice(index, 1);
                _this.curRuningSkillId.splice(index, 1);
                onComplete();
            }, null);
        }
    };
    /**
     * stopall清除技能
     */
    MonsterSkillComponent2D.prototype.stopAll = function () {
        for (var index = 0; index < this.curRuningSkill.length; index++) {
            var skill = this.curRuningSkill[index];
            skill.Stop(this.player, null);
        }
        this.curRuningSkillId = [];
        this.curRuningSkill = [];
    };
    //根据id获取对应技能逻辑
    MonsterSkillComponent2D.prototype.getMonsterSkill = function (powerId) {
        switch (powerId) {
            case EnumMonsterPowerType.ScaleUp:
                return new ScaleUpSkill();
            case EnumMonsterPowerType.Healing:
                return new HealingSkill();
            case EnumMonsterPowerType.Spawn:
                return new SpawnSkill();
            case EnumMonsterPowerType.Attach:
                return new AttachSkill();
            case EnumMonsterPowerType.Attack:
                return new AttackSkill();
            case EnumMonsterPowerType.Explosion:
                return new ExplosionSkill();
            case EnumMonsterPowerType.FollowPlayer:
                return new FollowSkill();
            case EnumMonsterPowerType.Split:
                return new SplitSkill();
            case EnumMonsterPowerType.BringMoney:
                return new BringMoneySkill();
            default:
                {
                    Log.Error("没有对应Monster的技能逻辑 %s", powerId);
                    return null;
                }
        }
    };
    return MonsterSkillComponent2D;
}(ComponentBase2D));
//# sourceMappingURL=MonsterSkillComponent2D.js.map