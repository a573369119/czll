class BulletConfigConfigData implements IByteConfig {

    public id: number;
    public BaseBulletNum: number;
    public MaxBulletNum: number;
    public BaseBulletDamage: number;
    public DamageMultFactor: number;
    public MaxBulletRow: number;
    public ImagePath: string;
    public ColliderSize: number[];
    public MoveSpeed: number;
    public HitFxSpineID: number;

    public LoadRowBytes(buffer: Laya.Byte) {
        
        this.id = buffer.getFloat32();
        this.BaseBulletNum = buffer.getFloat32();
        this.MaxBulletNum = buffer.getFloat32();
        this.BaseBulletDamage = buffer.getFloat32();
        this.DamageMultFactor = buffer.getFloat32();
        this.MaxBulletRow = buffer.getFloat32();
        this.ImagePath = buffer.getUTFString();
        let ColliderSizeLen = buffer.getInt16();
        this.ColliderSize= [];
        for (let index = 0; index < ColliderSizeLen; index++) {
            this.ColliderSize.push(buffer.getFloat32())
        }
        this.MoveSpeed = buffer.getFloat32();
        this.HitFxSpineID = buffer.getFloat32();

    }

    public GetID(): number { return this.id }//每个表必须有唯一的主键栏位


    public Print(): string {
         let log = "";
        log += " id: " + this.id;
        log += " BaseBulletNum: " + this.BaseBulletNum;
        log += " MaxBulletNum: " + this.MaxBulletNum;
        log += " BaseBulletDamage: " + this.BaseBulletDamage;
        log += " DamageMultFactor: " + this.DamageMultFactor;
        log += " MaxBulletRow: " + this.MaxBulletRow;
        log += " ImagePath: " + this.ImagePath;
        log += " ColliderSize: ";
        let ColliderSizecount = this.ColliderSize.length;
        for (let t = 0; t < ColliderSizecount; t++)
        {
            log += this.ColliderSize[t];
            if (t < ColliderSizecount - 1) log += ",";
        }
        log += " MoveSpeed: " + this.MoveSpeed;
        log += " HitFxSpineID: " + this.HitFxSpineID;
        log += "\n";
        return log;
    }

    public GetTableName(): string {
        return "BulletConfigConfigData"
    }
}
