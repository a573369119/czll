class PlayerConfigConfigData implements IByteConfig {

    public ID: number;
    public SpineConfigID: number;
    public BirthPoint: number[];

    public LoadRowBytes(buffer: Laya.Byte) {
        
        this.ID = buffer.getFloat32();
        this.SpineConfigID = buffer.getFloat32();
        let BirthPointLen = buffer.getInt16();
        this.BirthPoint= [];
        for (let index = 0; index < BirthPointLen; index++) {
            this.BirthPoint.push(buffer.getFloat32())
        }

    }

    public GetID(): number { return this.ID }//每个表必须有唯一的主键栏位


    public Print(): string {
         let log = "";
        log += " ID: " + this.ID;
        log += " SpineConfigID: " + this.SpineConfigID;
        log += " BirthPoint: ";
        let BirthPointcount = this.BirthPoint.length;
        for (let t = 0; t < BirthPointcount; t++)
        {
            log += this.BirthPoint[t];
            if (t < BirthPointcount - 1) log += ",";
        }
        log += "\n";
        return log;
    }

    public GetTableName(): string {
        return "PlayerConfigConfigData"
    }
}
