/*
* name;
*/
var LevelInfo = (function () {
    function LevelInfo() {
    }
    Object.defineProperty(LevelInfo.prototype, "CurLevelID", {
        get: function () { return this.levelSpawnDatas.LevelId; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LevelInfo.prototype, "NextLevelID", {
        get: function () { return ConfigManager.GetInstance().GetLevelConfig(this.CurLevelID + 1) ? this.CurLevelID + 1 : this.CurLevelID; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LevelInfo.prototype, "LevelSpawnDatas", {
        get: function () { return this.levelSpawnDatas; },
        set: function (levelSpawnDatas) { this.levelSpawnDatas = levelSpawnDatas; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LevelInfo.prototype, "CurLiveMonsterCount", {
        get: function () { return this.curLiveMonsterCount; },
        // public get CurSpawnIndex(): number { return this.curSpawnGroupIndex; }
        set: function (value) { this.curLiveMonsterCount = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LevelInfo.prototype, "CurMatchProgressInfo", {
        get: function () { return this.curMatchProgressInfo; },
        enumerable: true,
        configurable: true
    });
    LevelInfo.prototype.OnInit = function () {
        this.reset();
    };
    LevelInfo.prototype.OnEnter = function () {
        Log.Debug("LevelInfo OnEnter");
        this.reset();
    };
    LevelInfo.prototype.OnExit = function () {
        Log.Debug("LevelInfo OnExit");
        this.reset();
    };
    LevelInfo.prototype.reset = function () {
        this.levelSpawnDatas = null;
        this.curLiveMonsterCount = 0;
        this.totalKilled = 0;
        this.totalSpawnBySkill = 0;
        this.curMatchProgressInfo = null;
        this.totalSpawnByConfig = 0;
    };
    LevelInfo.prototype.OnMonsterSpawn = function (byLevel) {
        if (GameDataManager.getInstance().MatchInfo.IsGameEnd())
            return;
        // Log.Debug("怪物刷新， 记录刷怪数据")
        this.curLiveMonsterCount++;
        if (byLevel)
            this.totalSpawnByConfig++;
        else
            this.totalSpawnBySkill++;
        this.LogLevelData();
    };
    LevelInfo.prototype.OnMonsterDie = function () {
        if (GameDataManager.getInstance().MatchInfo.IsGameEnd())
            return;
        this.curLiveMonsterCount--;
        this.totalKilled++;
        this.LogLevelData();
    };
    //获取比赛进度信息
    LevelInfo.prototype.GetCurProgress = function () {
        var unSpanwedCount = this.levelSpawnDatas.TotalMonsterCount - this.totalSpawnByConfig;
        var leftMonster = this.curLiveMonsterCount + unSpanwedCount; // 剩余怪物 = 未刷出 + 当前存活[已刷+技能产生]
        // Log.Debug("获取比赛进度, 当前剩余%i, 当前存活%i, 当前未出生%i", leftMonster, this.curLiveMonsterCount, unSpanwedCount)
        var progress = this.totalKilled / (this.levelSpawnDatas.TotalMonsterCount + this.totalSpawnBySkill); // 1 - (unSpanwedCount / this.levelSpawnDatas.TotalMonsterCount);//当前进度
        this.curMatchProgressInfo = new MatchProgressInfo(leftMonster, progress);
        return this.curMatchProgressInfo;
    };
    //////////////////////////////////////////////////////////////////////////////////////////////////////////
    //是否满屏
    LevelInfo.prototype.IsScreenFull = function () {
        return this.curLiveMonsterCount >= this.levelSpawnDatas.MaxInScreenNum;
    };
    //是否所有怪都死亡
    LevelInfo.prototype.IsGameComplete = function () {
        // return this.IslastSpawnGroup() && this.IsMonsterSpawnCompleted() && this.curLiveMonsterCount == 0;
        return this.totalSpawnByConfig == this.levelSpawnDatas.TotalMonsterCount && this.curLiveMonsterCount == 0;
    };
    LevelInfo.prototype.IsBossLevel = function () {
        return this.levelSpawnDatas.IsBossLevel;
    };
    LevelInfo.prototype.LogLevelData = function () {
        Log.Debug("总数%i 已经刷出%i, 当前存活怪物%i", this.levelSpawnDatas.TotalMonsterCount, this.totalSpawnByConfig, this.curLiveMonsterCount);
        // if (this.curGroupSpawnedMonsterCount > this.levelSpawnDatas.LevelSpawnData[this.curSpawnGroupIndex].Monsters.length) {
        //     Log.Debug("error")
        // }
    };
    return LevelInfo;
}());
//# sourceMappingURL=LevelInfo.js.map