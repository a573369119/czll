var LevelBrushConfigConfigData = (function () {
    function LevelBrushConfigConfigData() {
    }
    LevelBrushConfigConfigData.prototype.LoadRowBytes = function (buffer) {
        this.ID = buffer.getFloat32();
        this.RefreshDuration = buffer.getFloat32();
        this.MonsterNumber = buffer.getFloat32();
        this.MonsterDist = buffer.getUTFString();
        var MonsterLvlRangeLen = buffer.getInt16();
        this.MonsterLvlRange = [];
        for (var index = 0; index < MonsterLvlRangeLen; index++) {
            this.MonsterLvlRange.push(buffer.getFloat32());
        }
        this.BuffSpawnNumber = buffer.getFloat32();
        this.soundId = buffer.getFloat32();
    };
    LevelBrushConfigConfigData.prototype.GetID = function () { return this.ID; }; //每个表必须有唯一的主键栏位
    LevelBrushConfigConfigData.prototype.Print = function () {
        var log = "";
        log += " ID: " + this.ID;
        log += " RefreshDuration: " + this.RefreshDuration;
        log += " MonsterNumber: " + this.MonsterNumber;
        log += " MonsterDist: " + this.MonsterDist;
        log += " MonsterLvlRange: ";
        var MonsterLvlRangecount = this.MonsterLvlRange.length;
        for (var t = 0; t < MonsterLvlRangecount; t++) {
            log += this.MonsterLvlRange[t];
            if (t < MonsterLvlRangecount - 1)
                log += ",";
        }
        log += " BuffSpawnNumber: " + this.BuffSpawnNumber;
        log += " soundId: " + this.soundId;
        log += "\n";
        return log;
    };
    LevelBrushConfigConfigData.prototype.GetTableName = function () {
        return "LevelBrushConfigConfigData";
    };
    return LevelBrushConfigConfigData;
}());
//# sourceMappingURL=LevelBrushConfigConfigData.js.map