var LocalizationConfigData = (function () {
    function LocalizationConfigData() {
    }
    LocalizationConfigData.prototype.LoadRowBytes = function (buffer) {
        this.index = buffer.getFloat32();
        this.CHN = buffer.getUTFString();
        this.ENG = buffer.getUTFString();
    };
    LocalizationConfigData.prototype.GetID = function () { return this.index; }; //每个表必须有唯一的主键栏位
    LocalizationConfigData.prototype.Print = function () {
        var log = "";
        log += " index: " + this.index;
        log += " CHN: " + this.CHN;
        log += " ENG: " + this.ENG;
        log += "\n";
        return log;
    };
    LocalizationConfigData.prototype.GetTableName = function () {
        return "LocalizationConfigData";
    };
    return LocalizationConfigData;
}());
//# sourceMappingURL=LocalizationConfigData.js.map