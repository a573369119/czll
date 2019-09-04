var LotteryRewardConfigConfigData = (function () {
    function LotteryRewardConfigConfigData() {
    }
    LotteryRewardConfigConfigData.prototype.LoadRowBytes = function (buffer) {
        this.index = buffer.getFloat32();
        this.rewardName = buffer.getUTFString();
        this.rewardSkin = buffer.getUTFString();
        this.rewardType = buffer.getFloat32();
        this.rewardNum = buffer.getFloat32();
    };
    LotteryRewardConfigConfigData.prototype.GetID = function () { return this.index; }; //每个表必须有唯一的主键栏位
    LotteryRewardConfigConfigData.prototype.Print = function () {
        var log = "";
        log += " index: " + this.index;
        log += " rewardName: " + this.rewardName;
        log += " rewardSkin: " + this.rewardSkin;
        log += " rewardType: " + this.rewardType;
        log += " rewardNum: " + this.rewardNum;
        log += "\n";
        return log;
    };
    LotteryRewardConfigConfigData.prototype.GetTableName = function () {
        return "LotteryRewardConfigConfigData";
    };
    return LotteryRewardConfigConfigData;
}());
//# sourceMappingURL=LotteryRewardConfigConfigData.js.map