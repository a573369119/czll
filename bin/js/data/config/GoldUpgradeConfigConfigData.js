var GoldUpgradeConfigConfigData = (function () {
    function GoldUpgradeConfigConfigData() {
    }
    GoldUpgradeConfigConfigData.prototype.LoadRowBytes = function (buffer) {
        this.ID = buffer.getFloat32();
        this.BaseSpeed = buffer.getFloat32();
        this.IncreSpeed = buffer.getFloat32();
    };
    GoldUpgradeConfigConfigData.prototype.GetID = function () { return this.ID; }; //每个表必须有唯一的主键栏位
    GoldUpgradeConfigConfigData.prototype.Print = function () {
        var log = "";
        log += " ID: " + this.ID;
        log += " BaseSpeed: " + this.BaseSpeed;
        log += " IncreSpeed: " + this.IncreSpeed;
        log += "\n";
        return log;
    };
    GoldUpgradeConfigConfigData.prototype.GetTableName = function () {
        return "GoldUpgradeConfigConfigData";
    };
    return GoldUpgradeConfigConfigData;
}());
//# sourceMappingURL=GoldUpgradeConfigConfigData.js.map