var BuffConfigConfigData = (function () {
    function BuffConfigConfigData() {
    }
    BuffConfigConfigData.prototype.LoadRowBytes = function (buffer) {
        this.id = buffer.getFloat32();
        this.duration = buffer.getFloat32();
        this.copy = buffer.getInt32() > 0;
        this.BuffType = buffer.getFloat32();
        this.BuffSource = buffer.getFloat32();
        this.Param1 = buffer.getFloat32();
    };
    BuffConfigConfigData.prototype.GetID = function () { return this.id; }; //每个表必须有唯一的主键栏位
    BuffConfigConfigData.prototype.Print = function () {
        var log = "";
        log += " id: " + this.id;
        log += " duration: " + this.duration;
        log += " copy: " + this.copy;
        log += " BuffType: " + this.BuffType;
        log += " BuffSource: " + this.BuffSource;
        log += " Param1: " + this.Param1;
        log += "\n";
        return log;
    };
    BuffConfigConfigData.prototype.GetTableName = function () {
        return "BuffConfigConfigData";
    };
    return BuffConfigConfigData;
}());
//# sourceMappingURL=BuffConfigConfigData.js.map