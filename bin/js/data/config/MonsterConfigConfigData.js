var MonsterConfigConfigData = (function () {
    function MonsterConfigConfigData() {
    }
    MonsterConfigConfigData.prototype.LoadRowBytes = function (buffer) {
        this.ID = buffer.getFloat32();
        var ColliderSizeLen = buffer.getInt16();
        this.ColliderSize = [];
        for (var index = 0; index < ColliderSizeLen; index++) {
            this.ColliderSize.push(buffer.getFloat32());
        }
        var AttackingColliderSizeLen = buffer.getInt16();
        this.AttackingColliderSize = [];
        for (var index = 0; index < AttackingColliderSizeLen; index++) {
            this.AttackingColliderSize.push(buffer.getFloat32());
        }
        this.BaseHP = buffer.getFloat32();
        this.SpineConfigID = buffer.getInt32();
        this.GoldProbability = buffer.getFloat32();
        this.MoveSpeed = buffer.getFloat32();
        var MonsterSkillIDLen = buffer.getInt16();
        this.MonsterSkillID = [];
        for (var index = 0; index < MonsterSkillIDLen; index++) {
            this.MonsterSkillID.push(buffer.getFloat32());
        }
        this.HpFormulaID = buffer.getFloat32();
    };
    MonsterConfigConfigData.prototype.GetID = function () { return this.ID; }; //每个表必须有唯一的主键栏位
    MonsterConfigConfigData.prototype.Print = function () {
        var log = "";
        log += " ID: " + this.ID;
        log += " ColliderSize: ";
        var ColliderSizecount = this.ColliderSize.length;
        for (var t = 0; t < ColliderSizecount; t++) {
            log += this.ColliderSize[t];
            if (t < ColliderSizecount - 1)
                log += ",";
        }
        log += " AttackingColliderSize: ";
        var AttackingColliderSizecount = this.AttackingColliderSize.length;
        for (var t = 0; t < AttackingColliderSizecount; t++) {
            log += this.AttackingColliderSize[t];
            if (t < AttackingColliderSizecount - 1)
                log += ",";
        }
        log += " BaseHP: " + this.BaseHP;
        log += " SpineConfigID: " + this.SpineConfigID;
        log += " GoldProbability: " + this.GoldProbability;
        log += " MoveSpeed: " + this.MoveSpeed;
        log += " MonsterSkillID: ";
        var MonsterSkillIDcount = this.MonsterSkillID.length;
        for (var t = 0; t < MonsterSkillIDcount; t++) {
            log += this.MonsterSkillID[t];
            if (t < MonsterSkillIDcount - 1)
                log += ",";
        }
        log += " HpFormulaID: " + this.HpFormulaID;
        log += "\n";
        return log;
    };
    MonsterConfigConfigData.prototype.GetTableName = function () {
        return "MonsterConfigConfigData";
    };
    return MonsterConfigConfigData;
}());
//# sourceMappingURL=MonsterConfigConfigData.js.map