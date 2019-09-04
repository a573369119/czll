var WeaponConfigConfigData = (function () {
    function WeaponConfigConfigData() {
    }
    WeaponConfigConfigData.prototype.LoadRowBytes = function (buffer) {
        this.index = buffer.getFloat32();
        this.weaponSkin = buffer.getUTFString();
        this.weaponName = buffer.getUTFString();
        this.UnlockLevel = buffer.getFloat32();
        this.PreparingFxID = buffer.getFloat32();
        this.FiringFxID = buffer.getFloat32();
        this.EndingFxID = buffer.getFloat32();
        var TailAnimPosLen = buffer.getInt16();
        this.TailAnimPos = [];
        for (var index = 0; index < TailAnimPosLen; index++) {
            this.TailAnimPos.push(buffer.getFloat32());
        }
        var ColliderSizeLen = buffer.getInt16();
        this.ColliderSize = [];
        for (var index = 0; index < ColliderSizeLen; index++) {
            this.ColliderSize.push(buffer.getFloat32());
        }
        this.weaponPower = buffer.getFloat32();
        this.MinDuration = buffer.getFloat32();
        this.MaxDuration = buffer.getFloat32();
        this.Param1 = buffer.getFloat32();
        this.Param2 = buffer.getFloat32();
        this.Param3 = buffer.getFloat32();
        this.Param4 = buffer.getFloat32();
        this.Param5 = buffer.getFloat32();
        this.Param6 = buffer.getFloat32();
    };
    WeaponConfigConfigData.prototype.GetID = function () { return this.index; }; //每个表必须有唯一的主键栏位
    WeaponConfigConfigData.prototype.Print = function () {
        var log = "";
        log += " index: " + this.index;
        log += " weaponSkin: " + this.weaponSkin;
        log += " weaponName: " + this.weaponName;
        log += " UnlockLevel: " + this.UnlockLevel;
        log += " PreparingFxID: " + this.PreparingFxID;
        log += " FiringFxID: " + this.FiringFxID;
        log += " EndingFxID: " + this.EndingFxID;
        log += " TailAnimPos: ";
        var TailAnimPoscount = this.TailAnimPos.length;
        for (var t = 0; t < TailAnimPoscount; t++) {
            log += this.TailAnimPos[t];
            if (t < TailAnimPoscount - 1)
                log += ",";
        }
        log += " ColliderSize: ";
        var ColliderSizecount = this.ColliderSize.length;
        for (var t = 0; t < ColliderSizecount; t++) {
            log += this.ColliderSize[t];
            if (t < ColliderSizecount - 1)
                log += ",";
        }
        log += " weaponPower: " + this.weaponPower;
        log += " MinDuration: " + this.MinDuration;
        log += " MaxDuration: " + this.MaxDuration;
        log += " Param1: " + this.Param1;
        log += " Param2: " + this.Param2;
        log += " Param3: " + this.Param3;
        log += " Param4: " + this.Param4;
        log += " Param5: " + this.Param5;
        log += " Param6: " + this.Param6;
        log += "\n";
        return log;
    };
    WeaponConfigConfigData.prototype.GetTableName = function () {
        return "WeaponConfigConfigData";
    };
    return WeaponConfigConfigData;
}());
//# sourceMappingURL=WeaponConfigConfigData.js.map