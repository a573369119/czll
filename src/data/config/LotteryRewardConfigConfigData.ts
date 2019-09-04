class LotteryRewardConfigConfigData implements IByteConfig {

    public index: number;
    public rewardName: string;
    public rewardSkin: string;
    public rewardType: number;
    public rewardNum: number;

    public LoadRowBytes(buffer: Laya.Byte) {

        this.index = buffer.getFloat32();
        this.rewardName = buffer.getUTFString();
        this.rewardSkin = buffer.getUTFString();
        this.rewardType = buffer.getFloat32();
        this.rewardNum = buffer.getFloat32();
    }

    public GetID(): number { return this.index }//每个表必须有唯一的主键栏位


    public Print(): string {
        let log = "";
        log += " index: " + this.index;
        log += " rewardName: " + this.rewardName;
        log += " rewardSkin: " + this.rewardSkin;
        log += " rewardType: " + this.rewardType;
        log += " rewardNum: " + this.rewardNum;
        log += "\n";
        return log;
    }

    public GetTableName(): string {
        return "LotteryRewardConfigConfigData"
    }
}
