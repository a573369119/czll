class LevelBrushConfigConfigData implements IByteConfig {

    public ID: number;
    public RefreshDuration: number;
    public MonsterNumber: number;
    public MonsterDist: string;
    public MonsterLvlRange: number[];
    public BuffSpawnNumber: number;
    public soundId: number;

    public LoadRowBytes(buffer: Laya.Byte) {
        
        this.ID = buffer.getFloat32();
        this.RefreshDuration = buffer.getFloat32();
        this.MonsterNumber = buffer.getFloat32();
        this.MonsterDist = buffer.getUTFString();
        let MonsterLvlRangeLen = buffer.getInt16();
        this.MonsterLvlRange= [];
        for (let index = 0; index < MonsterLvlRangeLen; index++) {
            this.MonsterLvlRange.push(buffer.getFloat32())
        }
        this.BuffSpawnNumber = buffer.getFloat32();
        this.soundId = buffer.getFloat32();

    }

    public GetID(): number { return this.ID }//每个表必须有唯一的主键栏位


    public Print(): string {
         let log = "";
        log += " ID: " + this.ID;
        log += " RefreshDuration: " + this.RefreshDuration;
        log += " MonsterNumber: " + this.MonsterNumber;
        log += " MonsterDist: " + this.MonsterDist;
        log += " MonsterLvlRange: ";
        let MonsterLvlRangecount = this.MonsterLvlRange.length;
        for (let t = 0; t < MonsterLvlRangecount; t++)
        {
            log += this.MonsterLvlRange[t];
            if (t < MonsterLvlRangecount - 1) log += ",";
        }
        log += " BuffSpawnNumber: " + this.BuffSpawnNumber;
        log += " soundId: " + this.soundId;
        log += "\n";
        return log;
    }

    public GetTableName(): string {
        return "LevelBrushConfigConfigData"
    }
}
