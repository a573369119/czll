class ConstConfigConfigData implements IByteConfig {

    public index: number;
    public const: string;

    public LoadRowBytes(buffer: Laya.Byte) {
        
        this.index = buffer.getFloat32();
        this.const = buffer.getUTFString();

    }

    public GetID(): number { return this.index }//每个表必须有唯一的主键栏位


    public Print(): string {
         let log = "";
        log += " index: " + this.index;
        log += " const: " + this.const;
        log += "\n";
        return log;
    }

    public GetTableName(): string {
        return "ConstConfigConfigData"
    }
}
