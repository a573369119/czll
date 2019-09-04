var SpineConfigConfigData = (function () {
    function SpineConfigConfigData() {
    }
    SpineConfigConfigData.prototype.LoadRowBytes = function (buffer) {
        this.id = buffer.getFloat32();
        this.SpinePath = buffer.getUTFString();
        this.Loop = buffer.getInt32() > 0;
        this.PoolSize = buffer.getFloat32();
        var SpineSizeLen = buffer.getInt16();
        this.SpineSize = [];
        for (var index = 0; index < SpineSizeLen; index++) {
            this.SpineSize.push(buffer.getFloat32());
        }
        var SpinePivotLen = buffer.getInt16();
        this.SpinePivot = [];
        for (var index = 0; index < SpinePivotLen; index++) {
            this.SpinePivot.push(buffer.getFloat32());
        }
        this.Duration = buffer.getFloat32();
        this.ReplayMode = buffer.getFloat32();
    };
    SpineConfigConfigData.prototype.GetID = function () { return this.id; }; //每个表必须有唯一的主键栏位
    SpineConfigConfigData.prototype.Print = function () {
        var log = "";
        log += " id: " + this.id;
        log += " SpinePath: " + this.SpinePath;
        log += " Loop: " + this.Loop;
        log += " PoolSize: " + this.PoolSize;
        log += " SpineSize: ";
        var SpineSizecount = this.SpineSize.length;
        for (var t = 0; t < SpineSizecount; t++) {
            log += this.SpineSize[t];
            if (t < SpineSizecount - 1)
                log += ",";
        }
        log += " SpinePivot: ";
        var SpinePivotcount = this.SpinePivot.length;
        for (var t = 0; t < SpinePivotcount; t++) {
            log += this.SpinePivot[t];
            if (t < SpinePivotcount - 1)
                log += ",";
        }
        log += " Duration: " + this.Duration;
        log += " ReplayMode: " + this.ReplayMode;
        log += "\n";
        return log;
    };
    SpineConfigConfigData.prototype.GetTableName = function () {
        return "SpineConfigConfigData";
    };
    return SpineConfigConfigData;
}());
//# sourceMappingURL=SpineConfigConfigData.js.map