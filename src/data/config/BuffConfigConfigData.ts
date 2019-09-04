class BuffConfigConfigData implements IByteConfig {

    public id: number;
    public duration: number;
    public copy: boolean;
    public BuffType: number;
    public BuffSource: number;
    public Param1: number;

    public LoadRowBytes(buffer: Laya.Byte) {
        
        this.id = buffer.getFloat32();
        this.duration = buffer.getFloat32();
        this.copy = buffer.getInt32() > 0;
        this.BuffType = buffer.getFloat32();
        this.BuffSource = buffer.getFloat32();
        this.Param1 = buffer.getFloat32();

    }

    public GetID(): number { return this.id }//每个表必须有唯一的主键栏位


    public Print(): string {
         let log = "";
        log += " id: " + this.id;
        log += " duration: " + this.duration;
        log += " copy: " + this.copy;
        log += " BuffType: " + this.BuffType;
        log += " BuffSource: " + this.BuffSource;
        log += " Param1: " + this.Param1;
        log += "\n";
        return log;
    }

    public GetTableName(): string {
        return "BuffConfigConfigData"
    }
}
