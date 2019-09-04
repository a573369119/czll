class SpineConfigConfigData implements IByteConfig {

    public id: number;
    public SpinePath: string;
    public Loop: boolean;
    public PoolSize: number;
    public SpineSize: number[];
    public SpinePivot: number[];
    public Duration: number;
    public ReplayMode: number;

    public LoadRowBytes(buffer: Laya.Byte) {
        
        this.id = buffer.getFloat32();
        this.SpinePath = buffer.getUTFString();
        this.Loop = buffer.getInt32() > 0;
        this.PoolSize = buffer.getFloat32();
        let SpineSizeLen = buffer.getInt16();
        this.SpineSize= [];
        for (let index = 0; index < SpineSizeLen; index++) {
            this.SpineSize.push(buffer.getFloat32())
        }
        let SpinePivotLen = buffer.getInt16();
        this.SpinePivot= [];
        for (let index = 0; index < SpinePivotLen; index++) {
            this.SpinePivot.push(buffer.getFloat32())
        }
        this.Duration = buffer.getFloat32();
        this.ReplayMode = buffer.getFloat32();

    }

    public GetID(): number { return this.id }//每个表必须有唯一的主键栏位


    public Print(): string {
         let log = "";
        log += " id: " + this.id;
        log += " SpinePath: " + this.SpinePath;
        log += " Loop: " + this.Loop;
        log += " PoolSize: " + this.PoolSize;
        log += " SpineSize: ";
        let SpineSizecount = this.SpineSize.length;
        for (let t = 0; t < SpineSizecount; t++)
        {
            log += this.SpineSize[t];
            if (t < SpineSizecount - 1) log += ",";
        }
        log += " SpinePivot: ";
        let SpinePivotcount = this.SpinePivot.length;
        for (let t = 0; t < SpinePivotcount; t++)
        {
            log += this.SpinePivot[t];
            if (t < SpinePivotcount - 1) log += ",";
        }
        log += " Duration: " + this.Duration;
        log += " ReplayMode: " + this.ReplayMode;
        log += "\n";
        return log;
    }

    public GetTableName(): string {
        return "SpineConfigConfigData"
    }
}
