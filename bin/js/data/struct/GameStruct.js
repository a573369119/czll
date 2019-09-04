/*
* name;
*/
var GameStruct = (function () {
    function GameStruct() {
    }
    return GameStruct;
}());
//3.0产能信息
var SpawnInfo = (function () {
    function SpawnInfo(spawnID, moneyNum, createTime, spawnType) {
        this.spawnID = spawnID;
        this.moneyNum = moneyNum;
        this.createTime = createTime;
        this.spawnType = spawnType;
    }
    return SpawnInfo;
}());
var MatchProgressInfo = (function () {
    function MatchProgressInfo(left, progress) {
        this.Gold = 0; //当前金币数量
        this.MonsterLeftNum = left;
        this.Progress = progress;
    }
    return MatchProgressInfo;
}());
//怪物死亡信息
var MonsterDieInfo = (function () {
    function MonsterDieInfo(id, pos, level, config, canSpawnprop) {
        this.GoldADD = 0; //添加的金币数量
        this.MonsterConfigID = id;
        this.Postion = pos;
        this.Level = level;
        this.Config = config;
        this.CanSpawnProp = canSpawnprop;
    }
    return MonsterDieInfo;
}());
//玩家子弹发射规则
var FireRule = (function () {
    function FireRule(numsInRow, interval, bulletCountPerSec) {
        this.BulletNumsInRows = numsInRow;
        this.Interval = interval;
        this.MaxColumnCount = this.BulletNumsInRows[0];
        this.MinColumnCount = this.BulletNumsInRows[this.BulletNumsInRows.length - 1];
        this.BulletCountPerSec = bulletCountPerSec;
    }
    return FireRule;
}());
//# sourceMappingURL=GameStruct.js.map