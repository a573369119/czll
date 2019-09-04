class WeaponConfigConfigData implements IByteConfig {

    public index: number;
    public weaponSkin: string;
    public weaponName: string;
    public UnlockLevel: number;
    public PreparingFxID: number;
    public FiringFxID: number;
    public EndingFxID: number;
    public TailAnimPos: number[];
    public ColliderSize: number[];
    public weaponPower: number;
    public MinDuration: number;
    public MaxDuration: number;
    public Param1: number;
    public Param2: number;
    public Param3: number;
    public Param4: number;
    public Param5: number;
    public Param6: number;

    public LoadRowBytes(buffer: Laya.Byte) {
        
        this.index = buffer.getFloat32();
        this.weaponSkin = buffer.getUTFString();
        this.weaponName = buffer.getUTFString();
        this.UnlockLevel = buffer.getFloat32();
        this.PreparingFxID = buffer.getFloat32();
        this.FiringFxID = buffer.getFloat32();
        this.EndingFxID = buffer.getFloat32();
        let TailAnimPosLen = buffer.getInt16();
        this.TailAnimPos= [];
        for (let index = 0; index < TailAnimPosLen; index++) {
            this.TailAnimPos.push(buffer.getFloat32())
        }
        let ColliderSizeLen = buffer.getInt16();
        this.ColliderSize= [];
        for (let index = 0; index < ColliderSizeLen; index++) {
            this.ColliderSize.push(buffer.getFloat32())
        }
        this.weaponPower = buffer.getFloat32();
        this.MinDuration = buffer.getFloat32();
        this.MaxDuration = buffer.getFloat32();
        this.Param1 = buffer.getFloat32();
        this.Param2 = buffer.getFloat32();
        this.Param3 = buffer.getFloat32();
        this.Param4 = buffer.getFloat32();
        this.Param5 = buffer.getFloat32();
        this.Param6 = buffer.getFloat32();

    }

    public GetID(): number { return this.index }//每个表必须有唯一的主键栏位


    public Print(): string {
         let log = "";
        log += " index: " + this.index;
        log += " weaponSkin: " + this.weaponSkin;
        log += " weaponName: " + this.weaponName;
        log += " UnlockLevel: " + this.UnlockLevel;
        log += " PreparingFxID: " + this.PreparingFxID;
        log += " FiringFxID: " + this.FiringFxID;
        log += " EndingFxID: " + this.EndingFxID;
        log += " TailAnimPos: ";
        let TailAnimPoscount = this.TailAnimPos.length;
        for (let t = 0; t < TailAnimPoscount; t++)
        {
            log += this.TailAnimPos[t];
            if (t < TailAnimPoscount - 1) log += ",";
        }
        log += " ColliderSize: ";
        let ColliderSizecount = this.ColliderSize.length;
        for (let t = 0; t < ColliderSizecount; t++)
        {
            log += this.ColliderSize[t];
            if (t < ColliderSizecount - 1) log += ",";
        }
        log += " weaponPower: " + this.weaponPower;
        log += " MinDuration: " + this.MinDuration;
        log += " MaxDuration: " + this.MaxDuration;
        log += " Param1: " + this.Param1;
        log += " Param2: " + this.Param2;
        log += " Param3: " + this.Param3;
        log += " Param4: " + this.Param4;
        log += " Param5: " + this.Param5;
        log += " Param6: " + this.Param6;
        log += "\n";
        return log;
    }

    public GetTableName(): string {
        return "WeaponConfigConfigData"
    }
}
