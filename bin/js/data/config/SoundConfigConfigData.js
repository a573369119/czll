var SoundConfigConfigData = (function () {
    function SoundConfigConfigData() {
    }
    SoundConfigConfigData.prototype.LoadRowBytes = function (buffer) {
        this.index = buffer.getFloat32();
        this.URL = buffer.getUTFString();
        this.Type = buffer.getFloat32();
        this.Duration = buffer.getFloat32();
        this.Loop = buffer.getInt32() > 0;
        this.PlayMode = buffer.getFloat32();
        this.PoolSize = buffer.getFloat32();
    };
    SoundConfigConfigData.prototype.GetID = function () { return this.index; }; //每个表必须有唯一的主键栏位
    SoundConfigConfigData.prototype.Print = function () {
        var log = "";
        log += " index: " + this.index;
        log += " URL: " + this.URL;
        log += " Type: " + this.Type;
        log += " Duration: " + this.Duration;
        log += " Loop: " + this.Loop;
        log += " PlayMode: " + this.PlayMode;
        log += " PoolSize: " + this.PoolSize;
        log += "\n";
        return log;
    };
    SoundConfigConfigData.prototype.GetTableName = function () {
        return "SoundConfigConfigData";
    };
    return SoundConfigConfigData;
}());
//# sourceMappingURL=SoundConfigConfigData.js.map