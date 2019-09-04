var SkillConfigConfigData = (function () {
    function SkillConfigConfigData() {
    }
    SkillConfigConfigData.prototype.LoadRowBytes = function (buffer) {
        this.ID = buffer.getFloat32();
        this.IconPath = buffer.getUTFString();
        this.Type = buffer.getFloat32();
        this.PrepareSpineConfigID = buffer.getFloat32();
        this.FireSpineConfigID1 = buffer.getFloat32();
        this.FireSpineConfigID2 = buffer.getFloat32();
        this.TriggerOnDie = buffer.getInt32() > 0;
        this.Param1 = buffer.getFloat32();
        this.Param2 = buffer.getFloat32();
        this.Param3 = buffer.getFloat32();
        this.Param4 = buffer.getFloat32();
        this.Param5 = buffer.getFloat32();
    };
    SkillConfigConfigData.prototype.GetID = function () { return this.ID; }; //每个表必须有唯一的主键栏位
    SkillConfigConfigData.prototype.Print = function () {
        var log = "";
        log += " ID: " + this.ID;
        log += " IconPath: " + this.IconPath;
        log += " Type: " + this.Type;
        log += " PrepareSpineConfigID: " + this.PrepareSpineConfigID;
        log += " FireSpineConfigID1: " + this.FireSpineConfigID1;
        log += " FireSpineConfigID2: " + this.FireSpineConfigID2;
        log += " TriggerOnDie: " + this.TriggerOnDie;
        log += " Param1: " + this.Param1;
        log += " Param2: " + this.Param2;
        log += " Param3: " + this.Param3;
        log += " Param4: " + this.Param4;
        log += " Param5: " + this.Param5;
        log += "\n";
        return log;
    };
    SkillConfigConfigData.prototype.GetTableName = function () {
        return "SkillConfigConfigData";
    };
    return SkillConfigConfigData;
}());
//# sourceMappingURL=SkillConfigConfigData.js.map