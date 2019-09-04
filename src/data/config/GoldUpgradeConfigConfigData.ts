class GoldUpgradeConfigConfigData implements IByteConfig {

    public ID: number;
    public BaseSpeed: number;
    public IncreSpeed: number;

    public LoadRowBytes(buffer: Laya.Byte) {
        
        this.ID = buffer.getFloat32();
        this.BaseSpeed = buffer.getFloat32();
        this.IncreSpeed = buffer.getFloat32();

    }

    public GetID(): number { return this.ID }//每个表必须有唯一的主键栏位


    public Print(): string {
         let log = "";
        log += " ID: " + this.ID;
        log += " BaseSpeed: " + this.BaseSpeed;
        log += " IncreSpeed: " + this.IncreSpeed;
        log += "\n";
        return log;
    }

    public GetTableName(): string {
        return "GoldUpgradeConfigConfigData"
    }
}
