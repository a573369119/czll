var BulletConfigConfigData = (function () {
    function BulletConfigConfigData() {
    }
    BulletConfigConfigData.prototype.LoadRowBytes = function (buffer) {
        this.id = buffer.getFloat32();
        this.BaseBulletNum = buffer.getFloat32();
        this.MaxBulletNum = buffer.getFloat32();
        this.BaseBulletDamage = buffer.getFloat32();
        this.DamageMultFactor = buffer.getFloat32();
        this.MaxBulletRow = buffer.getFloat32();
        this.ImagePath = buffer.getUTFString();
        var ColliderSizeLen = buffer.getInt16();
        this.ColliderSize = [];
        for (var index = 0; index < ColliderSizeLen; index++) {
            this.ColliderSize.push(buffer.getFloat32());
        }
        this.MoveSpeed = buffer.getFloat32();
        this.HitFxSpineID = buffer.getFloat32();
    };
    BulletConfigConfigData.prototype.GetID = function () { return this.id; }; //每个表必须有唯一的主键栏位
    BulletConfigConfigData.prototype.Print = function () {
        var log = "";
        log += " id: " + this.id;
        log += " BaseBulletNum: " + this.BaseBulletNum;
        log += " MaxBulletNum: " + this.MaxBulletNum;
        log += " BaseBulletDamage: " + this.BaseBulletDamage;
        log += " DamageMultFactor: " + this.DamageMultFactor;
        log += " MaxBulletRow: " + this.MaxBulletRow;
        log += " ImagePath: " + this.ImagePath;
        log += " ColliderSize: ";
        var ColliderSizecount = this.ColliderSize.length;
        for (var t = 0; t < ColliderSizecount; t++) {
            log += this.ColliderSize[t];
            if (t < ColliderSizecount - 1)
                log += ",";
        }
        log += " MoveSpeed: " + this.MoveSpeed;
        log += " HitFxSpineID: " + this.HitFxSpineID;
        log += "\n";
        return log;
    };
    BulletConfigConfigData.prototype.GetTableName = function () {
        return "BulletConfigConfigData";
    };
    return BulletConfigConfigData;
}());
//# sourceMappingURL=BulletConfigConfigData.js.map