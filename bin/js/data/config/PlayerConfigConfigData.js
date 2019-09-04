var PlayerConfigConfigData = (function () {
    function PlayerConfigConfigData() {
    }
    PlayerConfigConfigData.prototype.LoadRowBytes = function (buffer) {
        this.ID = buffer.getFloat32();
        this.SpineConfigID = buffer.getFloat32();
        var BirthPointLen = buffer.getInt16();
        this.BirthPoint = [];
        for (var index = 0; index < BirthPointLen; index++) {
            this.BirthPoint.push(buffer.getFloat32());
        }
    };
    PlayerConfigConfigData.prototype.GetID = function () { return this.ID; }; //每个表必须有唯一的主键栏位
    PlayerConfigConfigData.prototype.Print = function () {
        var log = "";
        log += " ID: " + this.ID;
        log += " SpineConfigID: " + this.SpineConfigID;
        log += " BirthPoint: ";
        var BirthPointcount = this.BirthPoint.length;
        for (var t = 0; t < BirthPointcount; t++) {
            log += this.BirthPoint[t];
            if (t < BirthPointcount - 1)
                log += ",";
        }
        log += "\n";
        return log;
    };
    PlayerConfigConfigData.prototype.GetTableName = function () {
        return "PlayerConfigConfigData";
    };
    return PlayerConfigConfigData;
}());
//# sourceMappingURL=PlayerConfigConfigData.js.map