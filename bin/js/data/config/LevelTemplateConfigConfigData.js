var LevelTemplateConfigConfigData = (function () {
    function LevelTemplateConfigConfigData() {
    }
    LevelTemplateConfigConfigData.prototype.LoadRowBytes = function (buffer) {
        this.ID = buffer.getFloat32();
        var FormulaIDLen = buffer.getInt16();
        this.FormulaID = [];
        for (var index = 0; index < FormulaIDLen; index++) {
            this.FormulaID.push(buffer.getFloat32());
        }
        this.IsBossLvl = buffer.getInt32() > 0;
    };
    LevelTemplateConfigConfigData.prototype.GetID = function () { return this.ID; }; //每个表必须有唯一的主键栏位
    LevelTemplateConfigConfigData.prototype.Print = function () {
        var log = "";
        log += " ID: " + this.ID;
        log += " FormulaID: ";
        var FormulaIDcount = this.FormulaID.length;
        for (var t = 0; t < FormulaIDcount; t++) {
            log += this.FormulaID[t];
            if (t < FormulaIDcount - 1)
                log += ",";
        }
        log += " IsBossLvl: " + this.IsBossLvl;
        log += "\n";
        return log;
    };
    LevelTemplateConfigConfigData.prototype.GetTableName = function () {
        return "LevelTemplateConfigConfigData";
    };
    return LevelTemplateConfigConfigData;
}());
//# sourceMappingURL=LevelTemplateConfigConfigData.js.map