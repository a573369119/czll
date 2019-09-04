class LevelConfigConfigData implements IByteConfig {

    public ID: number;
    public TemplateId: string;
    public MaxNumInScreen: number;

    public LoadRowBytes(buffer: Laya.Byte) {
        
        this.ID = buffer.getFloat32();
        this.TemplateId = buffer.getUTFString();
        this.MaxNumInScreen = buffer.getFloat32();

    }

    public GetID(): number { return this.ID }//每个表必须有唯一的主键栏位


    public Print(): string {
         let log = "";
        log += " ID: " + this.ID;
        log += " TemplateId: " + this.TemplateId;
        log += " MaxNumInScreen: " + this.MaxNumInScreen;
        log += "\n";
        return log;
    }

    public GetTableName(): string {
        return "LevelConfigConfigData"
    }
}
