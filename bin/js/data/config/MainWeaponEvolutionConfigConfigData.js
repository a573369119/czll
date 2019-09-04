var MainWeaponEvolutionConfigConfigData = (function () {
    function MainWeaponEvolutionConfigConfigData() {
    }
    MainWeaponEvolutionConfigConfigData.prototype.LoadRowBytes = function (buffer) {
        this.ID = buffer.getFloat32();
        this.RequiredPowerLvl = buffer.getFloat32();
        this.IncreBulletNumber = buffer.getFloat32();
        this.GoldCoefficient = buffer.getFloat32();
        this.IconPath = buffer.getUTFString();
        this.WeaponName = buffer.getUTFString();
    };
    MainWeaponEvolutionConfigConfigData.prototype.GetID = function () { return this.ID; }; //每个表必须有唯一的主键栏位
    MainWeaponEvolutionConfigConfigData.prototype.Print = function () {
        var log = "";
        log += " ID: " + this.ID;
        log += " RequiredPowerLvl: " + this.RequiredPowerLvl;
        log += " IncreBulletNumber: " + this.IncreBulletNumber;
        log += " GoldCoefficient: " + this.GoldCoefficient;
        log += " IconPath: " + this.IconPath;
        log += " WeaponName: " + this.WeaponName;
        log += "\n";
        return log;
    };
    MainWeaponEvolutionConfigConfigData.prototype.GetTableName = function () {
        return "MainWeaponEvolutionConfigConfigData";
    };
    return MainWeaponEvolutionConfigConfigData;
}());
//# sourceMappingURL=MainWeaponEvolutionConfigConfigData.js.map