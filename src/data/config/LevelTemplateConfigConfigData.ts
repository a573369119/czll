class LevelTemplateConfigConfigData implements IByteConfig {

    public ID: number;
    public FormulaID: number[];
    public IsBossLvl: boolean;

    public LoadRowBytes(buffer: Laya.Byte) {
        
        this.ID = buffer.getFloat32();
        let FormulaIDLen = buffer.getInt16();
        this.FormulaID= [];
        for (let index = 0; index < FormulaIDLen; index++) {
            this.FormulaID.push(buffer.getFloat32())
        }
        this.IsBossLvl = buffer.getInt32() > 0;

    }

    public GetID(): number { return this.ID }//每个表必须有唯一的主键栏位


    public Print(): string {
         let log = "";
        log += " ID: " + this.ID;
        log += " FormulaID: ";
        let FormulaIDcount = this.FormulaID.length;
        for (let t = 0; t < FormulaIDcount; t++)
        {
            log += this.FormulaID[t];
            if (t < FormulaIDcount - 1) log += ",";
        }
        log += " IsBossLvl: " + this.IsBossLvl;
        log += "\n";
        return log;
    }

    public GetTableName(): string {
        return "LevelTemplateConfigConfigData"
    }
}
