class MonsterConfigConfigData implements IByteConfig {

    public ID: number;
    public ColliderSize: number[];
    public AttackingColliderSize: number[];
    public BaseHP: number;
    public SpineConfigID: number;
    public GoldProbability: number;
    public MoveSpeed: number;
    public MonsterSkillID: number[];
    public HpFormulaID: number;

    public LoadRowBytes(buffer: Laya.Byte) {
        
        this.ID = buffer.getFloat32();
        let ColliderSizeLen = buffer.getInt16();
        this.ColliderSize= [];
        for (let index = 0; index < ColliderSizeLen; index++) {
            this.ColliderSize.push(buffer.getFloat32())
        }
        let AttackingColliderSizeLen = buffer.getInt16();
        this.AttackingColliderSize= [];
        for (let index = 0; index < AttackingColliderSizeLen; index++) {
            this.AttackingColliderSize.push(buffer.getFloat32())
        }
        this.BaseHP = buffer.getFloat32();
        this.SpineConfigID = buffer.getInt32();
        this.GoldProbability = buffer.getFloat32();
        this.MoveSpeed = buffer.getFloat32();
        let MonsterSkillIDLen = buffer.getInt16();
        this.MonsterSkillID= [];
        for (let index = 0; index < MonsterSkillIDLen; index++) {
            this.MonsterSkillID.push(buffer.getFloat32())
        }
        this.HpFormulaID = buffer.getFloat32();

    }

    public GetID(): number { return this.ID }//每个表必须有唯一的主键栏位


    public Print(): string {
         let log = "";
        log += " ID: " + this.ID;
        log += " ColliderSize: ";
        let ColliderSizecount = this.ColliderSize.length;
        for (let t = 0; t < ColliderSizecount; t++)
        {
            log += this.ColliderSize[t];
            if (t < ColliderSizecount - 1) log += ",";
        }
        log += " AttackingColliderSize: ";
        let AttackingColliderSizecount = this.AttackingColliderSize.length;
        for (let t = 0; t < AttackingColliderSizecount; t++)
        {
            log += this.AttackingColliderSize[t];
            if (t < AttackingColliderSizecount - 1) log += ",";
        }
        log += " BaseHP: " + this.BaseHP;
        log += " SpineConfigID: " + this.SpineConfigID;
        log += " GoldProbability: " + this.GoldProbability;
        log += " MoveSpeed: " + this.MoveSpeed;
        log += " MonsterSkillID: ";
        let MonsterSkillIDcount = this.MonsterSkillID.length;
        for (let t = 0; t < MonsterSkillIDcount; t++)
        {
            log += this.MonsterSkillID[t];
            if (t < MonsterSkillIDcount - 1) log += ",";
        }
        log += " HpFormulaID: " + this.HpFormulaID;
        log += "\n";
        return log;
    }

    public GetTableName(): string {
        return "MonsterConfigConfigData"
    }
}
