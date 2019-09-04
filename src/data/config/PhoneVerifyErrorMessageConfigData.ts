class PhoneVerifyErrorMessageConfigData implements IByteConfig {

    public index: number;
    public errorMsg: string;

    public LoadRowBytes(buffer: Laya.Byte) {
        
        this.index = buffer.getFloat32();
        this.errorMsg = buffer.getUTFString();

    }

    public GetID(): number { return this.index }//每个表必须有唯一的主键栏位


    public Print(): string {
         let log = "";
        log += " index: " + this.index;
        log += " errorMsg: " + this.errorMsg;
        log += "\n";
        return log;
    }

    public GetTableName(): string {
        return "PhoneVerifyErrorMessageConfigData"
    }
}
