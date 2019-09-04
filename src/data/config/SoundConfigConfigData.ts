class SoundConfigConfigData implements IByteConfig {

    public index: number;
    public URL: string;
    public Type: number;
    public Duration: number;
    public Loop: boolean;
    public PlayMode: number;
    public PoolSize: number;

    public LoadRowBytes(buffer: Laya.Byte) {
        
        this.index = buffer.getFloat32();
        this.URL = buffer.getUTFString();
        this.Type = buffer.getFloat32();
        this.Duration = buffer.getFloat32();
        this.Loop = buffer.getInt32() > 0;
        this.PlayMode = buffer.getFloat32();
        this.PoolSize = buffer.getFloat32();

    }

    public GetID(): number { return this.index }//每个表必须有唯一的主键栏位


    public Print(): string {
         let log = "";
        log += " index: " + this.index;
        log += " URL: " + this.URL;
        log += " Type: " + this.Type;
        log += " Duration: " + this.Duration;
        log += " Loop: " + this.Loop;
        log += " PlayMode: " + this.PlayMode;
        log += " PoolSize: " + this.PoolSize;
        log += "\n";
        return log;
    }

    public GetTableName(): string {
        return "SoundConfigConfigData"
    }
}
