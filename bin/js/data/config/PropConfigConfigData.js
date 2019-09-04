var PropConfigConfigData = (function () {
    function PropConfigConfigData() {
    }
    PropConfigConfigData.prototype.LoadRowBytes = function (buffer) {
        this.id = buffer.getFloat32();
        this.PropImagePath = buffer.getUTFString();
        this.BuffConfigID = buffer.getFloat32();
        this.Duration = buffer.getFloat32();
        this.MoveSpeed = buffer.getFloat32();
        var ColliderSizeLen = buffer.getInt16();
        this.ColliderSize = [];
        for (var index = 0; index < ColliderSizeLen; index++) {
            this.ColliderSize.push(buffer.getFloat32());
        }
        this.SpawnWeight = buffer.getFloat32();
    };
    PropConfigConfigData.prototype.GetID = function () { return this.id; }; //每个表必须有唯一的主键栏位
    PropConfigConfigData.prototype.Print = function () {
        var log = "";
        log += " id: " + this.id;
        log += " PropImagePath: " + this.PropImagePath;
        log += " BuffConfigID: " + this.BuffConfigID;
        log += " Duration: " + this.Duration;
        log += " MoveSpeed: " + this.MoveSpeed;
        log += " ColliderSize: ";
        var ColliderSizecount = this.ColliderSize.length;
        for (var t = 0; t < ColliderSizecount; t++) {
            log += this.ColliderSize[t];
            if (t < ColliderSizecount - 1)
                log += ",";
        }
        log += " SpawnWeight: " + this.SpawnWeight;
        log += "\n";
        return log;
    };
    PropConfigConfigData.prototype.GetTableName = function () {
        return "PropConfigConfigData";
    };
    return PropConfigConfigData;
}());
//# sourceMappingURL=PropConfigConfigData.js.map