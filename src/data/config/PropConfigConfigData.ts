class PropConfigConfigData implements IByteConfig {

    public id: number;
    public PropImagePath: string;
    public BuffConfigID: number;
    public Duration: number;
    public MoveSpeed: number;
    public ColliderSize: number[];
    public SpawnWeight: number;

    public LoadRowBytes(buffer: Laya.Byte) {
        
        this.id = buffer.getFloat32();
        this.PropImagePath = buffer.getUTFString();
        this.BuffConfigID = buffer.getFloat32();
        this.Duration = buffer.getFloat32();
        this.MoveSpeed = buffer.getFloat32();
        let ColliderSizeLen = buffer.getInt16();
        this.ColliderSize= [];
        for (let index = 0; index < ColliderSizeLen; index++) {
            this.ColliderSize.push(buffer.getFloat32())
        }
        this.SpawnWeight = buffer.getFloat32();

    }

    public GetID(): number { return this.id }//每个表必须有唯一的主键栏位


    public Print(): string {
         let log = "";
        log += " id: " + this.id;
        log += " PropImagePath: " + this.PropImagePath;
        log += " BuffConfigID: " + this.BuffConfigID;
        log += " Duration: " + this.Duration;
        log += " MoveSpeed: " + this.MoveSpeed;
        log += " ColliderSize: ";
        let ColliderSizecount = this.ColliderSize.length;
        for (let t = 0; t < ColliderSizecount; t++)
        {
            log += this.ColliderSize[t];
            if (t < ColliderSizecount - 1) log += ",";
        }
        log += " SpawnWeight: " + this.SpawnWeight;
        log += "\n";
        return log;
    }

    public GetTableName(): string {
        return "PropConfigConfigData"
    }
}
