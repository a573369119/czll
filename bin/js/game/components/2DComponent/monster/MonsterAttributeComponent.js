var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*
* 怪物属性:实际血量, 移动速度
*/
var MonsterAttributeComponent = (function (_super) {
    __extends(MonsterAttributeComponent, _super);
    function MonsterAttributeComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.viewScale = null;
        _this.adjustScale = 1;
        _this.monsterSkillScale = 1;
        _this.latestGetHitTime = 0; //最近一次收到攻击时间
        return _this;
    }
    Object.defineProperty(MonsterAttributeComponent.prototype, "MonsterSpawnData", {
        get: function () { return this.monsterData; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MonsterAttributeComponent.prototype, "MonsterLvl", {
        get: function () { return this.monsterData ? this.monsterData.Level : 1; } //怪物等级
        ,
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MonsterAttributeComponent.prototype, "MonsterSkillConfigs", {
        // public get MonsterSkills(): number[] { return this.monsterData && this.monsterData.PowerNum > 0 ? this.monsterData.PowerId : []; }  //怪物能力
        /**
         * 怪物技能的配置表
         */
        get: function () { return this.monsterData && this.monsterData.PowerNum > 0 ? this.monsterData.PowerConfigs : []; } //怪物能力
        ,
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MonsterAttributeComponent.prototype, "Speed", {
        get: function () { return this.speed; } //速度
        ,
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MonsterAttributeComponent.prototype, "MaxHP", {
        get: function () { return this.maxHP; } //满血血量
        ,
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MonsterAttributeComponent.prototype, "CurHP", {
        get: function () { return this.curHP; } //当前血量
        ,
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MonsterAttributeComponent.prototype, "ColliderSize", {
        get: function () { return this.colliderBoxSize.mulVec2(this.Scale); } //碰撞盒大小
        ,
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MonsterAttributeComponent.prototype, "Scale", {
        get: function () {
            var scale = this.viewScale.mul(this.adjustScale).mul(this.monsterSkillScale);
            // if (scale.x > ConstDefine.ENLARGE_BUFF_SCALE) scale.x = ConstDefine.ENLARGE_BUFF_SCALE;
            // if (scale.y > ConstDefine.ENLARGE_BUFF_SCALE) scale.y = ConstDefine.ENLARGE_BUFF_SCALE;
            return scale;
        },
        set: function (value) { this.viewScale = value; } //缩放大小
        ,
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MonsterAttributeComponent.prototype, "AdjustScale", {
        get: function () { return this.adjustScale; },
        set: function (value) { this.adjustScale = value; } //enlarge道具buff调节scale
        ,
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MonsterAttributeComponent.prototype, "AdjustScale2", {
        get: function () { return this.monsterSkillScale; },
        set: function (value) { this.monsterSkillScale = value; } //怪物膨胀技能调节scale
        ,
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MonsterAttributeComponent.prototype, "TimeSinceLastHit", {
        get: function () { return (new Date().getTime() - this.latestGetHitTime) / 1000; } //多少s时间没有收到攻击
        ,
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MonsterAttributeComponent.prototype, "CanSpawnProp", {
        get: function () { return this.monsterData.CanTriggerPropSpawn; } //多少s时间没有收到攻击
        ,
        enumerable: true,
        configurable: true
    });
    MonsterAttributeComponent.prototype.onAdd = function () {
    };
    MonsterAttributeComponent.prototype.onRemove = function () {
    };
    //初始化怪物属性
    MonsterAttributeComponent.prototype.Init = function (value) {
        this.monsterData = value;
        var config = ConfigManager.GetInstance().GetMonsterConfig(this.player.playerID);
        if (config) {
            this.speed = config.MoveSpeed;
            this.maxHP = FormulaUtil.CalcMonsterHp(config.BaseHP, this.MonsterLvl, config.HpFormulaID);
            this.curHP = this.maxHP;
            this.viewScale = new Vec2(value.SizeScale.x, value.SizeScale.y);
            this.colliderBoxSize = new Vec2(config.ColliderSize[0], config.ColliderSize[1]);
        }
        else {
            Log.Error("没有怪物configid:%i", this.player.playerID);
        }
    };
    /**
     * 设置子怪物的血量和大小
     * @param maxHpScale 缩放到原来的比例
     * @param sizeScale
     */
    MonsterAttributeComponent.prototype.SetMaxHpAndSize = function (maxHpScale, sizeScale) {
        this.maxHP *= maxHpScale;
        if (this.curHP > this.maxHP)
            this.curHP = this.maxHP;
        this.Scale = this.Scale.mul(sizeScale);
    };
    /**
     * 减血,返回是否死亡
     * @param hitpoint
     */
    MonsterAttributeComponent.prototype.ReduceHp = function (hitpoint) {
        this.latestGetHitTime = new Date().getTime();
        this.curHP -= hitpoint;
        return this.curHP <= 0;
    };
    /**
     * 恢复多少血量
     * @param hp
     */
    MonsterAttributeComponent.prototype.IncreaseHp = function (hp) {
        this.curHP += hp;
        if (this.curHP > this.maxHP)
            this.curHP = this.maxHP;
    };
    /**
     * 是否满血
     */
    MonsterAttributeComponent.prototype.IsFull = function () {
        return this.curHP >= this.maxHP;
    };
    //获取死亡时候释放的技能 reverse:true 获取非死亡释放的技能 false:死亡释放的技能
    MonsterAttributeComponent.prototype.GetOnDieSkills = function (reverse) {
        if (reverse === void 0) { reverse = false; }
        var skillsOnDie = [];
        var skills = this.MonsterSkillConfigs;
        for (var index = 0; index < skills.length; index++) {
            //let id = skills[index];
            var config = skills[index]; //ConfigManager.GetInstance().GetSkillConfig(id)
            if ((config.TriggerOnDie && !reverse) || (!config.TriggerOnDie && reverse))
                skillsOnDie.push(config);
        }
        return skillsOnDie;
    };
    // //获取身上对应类型的技能
    // public GetSkill(skillId: EnumMonsterPowerType): SkillConfigConfigData {
    //     // return this.MonsterSkills.indexOf(skillId) >= 0;
    //     for (let index = 0; index < this.MonsterSkillConfigs.length; index++) {
    //         let element = this.MonsterSkillConfigs[index];
    //         if (element.Type == skillId) return element;
    //     }
    //     Log.Warn("获取技能 %s 不存在", skillId.toString())
    //     return null;
    // }
    MonsterAttributeComponent.prototype.ContainsSkill = function (skillId) {
        // return this.MonsterSkills.indexOf(skillId) >= 0;
        for (var index = 0; index < this.MonsterSkillConfigs.length; index++) {
            var element = this.MonsterSkillConfigs[index];
            if (element.Type == skillId)
                return true;
        }
        return false;
    };
    MonsterAttributeComponent.prototype.CopySpawnData = function () {
        return this.monsterData.Clone();
    };
    return MonsterAttributeComponent;
}(ComponentBase2D));
//# sourceMappingURL=MonsterAttributeComponent.js.map