var LevelConfigConfigData = (function () {
    function LevelConfigConfigData() {
    }
    LevelConfigConfigData.prototype.LoadRowBytes = function (buffer) {
        this.ID = buffer.getFloat32();
        this.TemplateId = buffer.getUTFString();
        this.MaxNumInScreen = buffer.getFloat32();
    };
    LevelConfigConfigData.prototype.GetID = function () { return this.ID; }; //每个表必须有唯一的主键栏位
    LevelConfigConfigData.prototype.Print = function () {
        var log = "";
        log += " ID: " + this.ID;
        log += " TemplateId: " + this.TemplateId;
        log += " MaxNumInScreen: " + this.MaxNumInScreen;
        log += "\n";
        return log;
    };
    LevelConfigConfigData.prototype.GetTableName = function () {
        return "LevelConfigConfigData";
    };
    return LevelConfigConfigData;
}());
//# sourceMappingURL=LevelConfigConfigData.js.map