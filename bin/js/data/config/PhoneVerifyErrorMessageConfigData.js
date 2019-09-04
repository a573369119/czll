var PhoneVerifyErrorMessageConfigData = (function () {
    function PhoneVerifyErrorMessageConfigData() {
    }
    PhoneVerifyErrorMessageConfigData.prototype.LoadRowBytes = function (buffer) {
        this.index = buffer.getFloat32();
        this.errorMsg = buffer.getUTFString();
    };
    PhoneVerifyErrorMessageConfigData.prototype.GetID = function () { return this.index; }; //每个表必须有唯一的主键栏位
    PhoneVerifyErrorMessageConfigData.prototype.Print = function () {
        var log = "";
        log += " index: " + this.index;
        log += " errorMsg: " + this.errorMsg;
        log += "\n";
        return log;
    };
    PhoneVerifyErrorMessageConfigData.prototype.GetTableName = function () {
        return "PhoneVerifyErrorMessageConfigData";
    };
    return PhoneVerifyErrorMessageConfigData;
}());
//# sourceMappingURL=PhoneVerifyErrorMessageConfigData.js.map