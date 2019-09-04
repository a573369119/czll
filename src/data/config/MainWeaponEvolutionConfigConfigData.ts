class MainWeaponEvolutionConfigConfigData implements IByteConfig {

    public ID: number;
    public RequiredPowerLvl: number;
    public IncreBulletNumber: number;
    public GoldCoefficient: number;
    public IconPath: string;
    public WeaponName: string;

    public LoadRowBytes(buffer: Laya.Byte) {
        
        this.ID = buffer.getFloat32();
        this.RequiredPowerLvl = buffer.getFloat32();
        this.IncreBulletNumber = buffer.getFloat32();
        this.GoldCoefficient = buffer.getFloat32();
        this.IconPath = buffer.getUTFString();
        this.WeaponName = buffer.getUTFString();

    }

    public GetID(): number { return this.ID }//每个表必须有唯一的主键栏位


    public Print(): string {
         let log = "";
        log += " ID: " + this.ID;
        log += " RequiredPowerLvl: " + this.RequiredPowerLvl;
        log += " IncreBulletNumber: " + this.IncreBulletNumber;
        log += " GoldCoefficient: " + this.GoldCoefficient;
        log += " IconPath: " + this.IconPath;
        log += " WeaponName: " + this.WeaponName;
        log += "\n";
        return log;
    }

    public GetTableName(): string {
        return "MainWeaponEvolutionConfigConfigData"
    }
}
