class LocalizationConfigData implements IByteConfig {

    public index: number;
    public CHN: string;
    public ENG: string;

    public LoadRowBytes(buffer: Laya.Byte) {
        
        this.index = buffer.getFloat32();
        this.CHN = buffer.getUTFString();
        this.ENG = buffer.getUTFString();

    }

    public GetID(): number { return this.index }//每个表必须有唯一的主键栏位


    public Print(): string {
         let log = "";
        log += " index: " + this.index;
        log += " CHN: " + this.CHN;
        log += " ENG: " + this.ENG;
        log += "\n";
        return log;
    }

    public GetTableName(): string {
        return "LocalizationConfigData"
    }
}
