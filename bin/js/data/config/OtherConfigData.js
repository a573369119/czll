var OtherConfigData = (function () {
    function OtherConfigData() {
    }
    OtherConfigData.prototype.LoadRowBytes = function (buffer) {
        this.index = buffer.getFloat32();
        this.Name = buffer.getUTFString();
        this.Value = buffer.getUTFString();
    };
    OtherConfigData.prototype.GetID = function () { return this.index; }; //每个表必须有唯一的主键栏位
    OtherConfigData.prototype.Print = function () {
        var log = "";
        log += " index: " + this.index;
        log += " Name: " + this.Name;
        log += " Value: " + this.Value;
        log += "\n";
        return log;
    };
    OtherConfigData.prototype.GetTableName = function () {
        return "OtherConfigData";
    };
    return OtherConfigData;
}());
//# sourceMappingURL=OtherConfigData.js.map