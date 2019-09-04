/*
* name;
*/
class GameStruct {

}

//3.0产能信息
class SpawnInfo {
    public spawnID: number;     //ID
    public moneyNum: number;    //钱数
    public createTime: number;  //创建时间
    public spawnType: number;   //当前状态

    constructor(spawnID: number, moneyNum: number, createTime: number, spawnType: number) {
        this.spawnID = spawnID;
        this.moneyNum = moneyNum;
        this.createTime = createTime;
        this.spawnType = spawnType;
    }

}

class MatchProgressInfo {
    public MonsterLeftNum: number;//剩余怪物数量
    public Progress: number;//0-1当前完成进度
    public Gold: number = 0;//当前金币数量
    constructor(left: number, progress: number) {
        this.MonsterLeftNum = left;
        this.Progress = progress;
    }
}

//怪物死亡信息
class MonsterDieInfo {
    public MonsterConfigID: number;
    public Postion: Vec2;//死亡位置
    public Level: number;//怪物等级
    public GoldADD: number = 0;//添加的金币数量
    public Config: MonsterConfigConfigData;
    public CanSpawnProp: boolean;//触发道具
    constructor(id: number, pos: Vec2, level: number, config: MonsterConfigConfigData, canSpawnprop: boolean) {
        this.MonsterConfigID = id;
        this.Postion = pos;
        this.Level = level;
        this.Config = config;
        this.CanSpawnProp = canSpawnprop;
    }
}

//玩家子弹发射规则
class FireRule {
    public BulletNumsInRows: number[];//每行子弹数量 [3,3,3,2,2]从屏幕底部-顶部排列
    public Interval: number; //每行间隔时间 s秒
    public MinColumnCount: number;//最小列数
    public MaxColumnCount: number;//最大列数
    public BulletCountPerSec: number;//每秒多少子弹
    constructor(numsInRow: number[], interval: number, bulletCountPerSec: number) {
        this.BulletNumsInRows = numsInRow;
        this.Interval = interval;
        this.MaxColumnCount = this.BulletNumsInRows[0]
        this.MinColumnCount = this.BulletNumsInRows[this.BulletNumsInRows.length - 1]
        this.BulletCountPerSec = bulletCountPerSec;
    }
}