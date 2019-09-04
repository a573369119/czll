class FormulaConfigConfigData implements IByteConfig {

    public index: number;
    public FormulaType: number;
    public Param1: number;
    public Param2: number;
    public Param3: number;
    public Param4: number;
    public Param5: number;
    public Param6: number;
    public Param7: number;

    public LoadRowBytes(buffer: Laya.Byte) {
        
        this.index = buffer.getFloat32();
        this.FormulaType = buffer.getFloat32();
        this.Param1 = buffer.getFloat32();
        this.Param2 = buffer.getFloat32();
        this.Param3 = buffer.getFloat32();
        this.Param4 = buffer.getFloat32();
        this.Param5 = buffer.getFloat32();
        this.Param6 = buffer.getFloat32();
        this.Param7 = buffer.getFloat32();

    }

    public GetID(): number { return this.index }//每个表必须有唯一的主键栏位


    public Print(): string {
         let log = "";
        log += " index: " + this.index;
        log += " FormulaType: " + this.FormulaType;
        log += " Param1: " + this.Param1;
        log += " Param2: " + this.Param2;
        log += " Param3: " + this.Param3;
        log += " Param4: " + this.Param4;
        log += " Param5: " + this.Param5;
        log += " Param6: " + this.Param6;
        log += " Param7: " + this.Param7;
        log += "\n";
        return log;
    }

    public GetTableName(): string {
        return "FormulaConfigConfigData"
    }
}
