var FormulaConfigConfigData = (function () {
    function FormulaConfigConfigData() {
    }
    FormulaConfigConfigData.prototype.LoadRowBytes = function (buffer) {
        this.index = buffer.getFloat32();
        this.FormulaType = buffer.getFloat32();
        this.Param1 = buffer.getFloat32();
        this.Param2 = buffer.getFloat32();
        this.Param3 = buffer.getFloat32();
        this.Param4 = buffer.getFloat32();
        this.Param5 = buffer.getFloat32();
        this.Param6 = buffer.getFloat32();
        this.Param7 = buffer.getFloat32();
    };
    FormulaConfigConfigData.prototype.GetID = function () { return this.index; }; //每个表必须有唯一的主键栏位
    FormulaConfigConfigData.prototype.Print = function () {
        var log = "";
        log += " index: " + this.index;
        log += " FormulaType: " + this.FormulaType;
        log += " Param1: " + this.Param1;
        log += " Param2: " + this.Param2;
        log += " Param3: " + this.Param3;
        log += " Param4: " + this.Param4;
        log += " Param5: " + this.Param5;
        log += " Param6: " + this.Param6;
        log += " Param7: " + this.Param7;
        log += "\n";
        return log;
    };
    FormulaConfigConfigData.prototype.GetTableName = function () {
        return "FormulaConfigConfigData";
    };
    return FormulaConfigConfigData;
}());
//# sourceMappingURL=FormulaConfigConfigData.js.map