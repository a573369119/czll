var ConstConfigConfigData = (function () {
    function ConstConfigConfigData() {
    }
    ConstConfigConfigData.prototype.LoadRowBytes = function (buffer) {
        this.index = buffer.getFloat32();
        this.const = buffer.getUTFString();
    };
    ConstConfigConfigData.prototype.GetID = function () { return this.index; }; //每个表必须有唯一的主键栏位
    ConstConfigConfigData.prototype.Print = function () {
        var log = "";
        log += " index: " + this.index;
        log += " const: " + this.const;
        log += "\n";
        return log;
    };
    ConstConfigConfigData.prototype.GetTableName = function () {
        return "ConstConfigConfigData";
    };
    return ConstConfigConfigData;
}());
//# sourceMappingURL=ConstConfigConfigData.js.map