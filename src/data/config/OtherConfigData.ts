class OtherConfigData implements IByteConfig {

    public index: number;
    public Name: string;
    public Value: string;

    public LoadRowBytes(buffer: Laya.Byte) {

        this.index = buffer.getFloat32();
        this.Name = buffer.getUTFString();
        this.Value = buffer.getUTFString();

    }

    public GetID(): number { return this.index }//每个表必须有唯一的主键栏位


    public Print(): string {
        let log = "";
        log += " index: " + this.index;
        log += " Name: " + this.Name;
        log += " Value: " + this.Value;
        log += "\n";
        return log;
    }

    public GetTableName(): string {
        return "OtherConfigData";
    }
}
