/*
* name;
*/
class LevelInfo implements IGameDta {
    private levelSpawnDatas: LevelSpawnDatas;
    private curLiveMonsterCount: number;//当前存活的monster数量

    private totalKilled: number;//总击杀
    private totalSpawnByConfig: number;//按照配置产生的怪物数量
    private totalSpawnBySkill: number;//由于技能等原因产生的怪物数量
    private curMatchProgressInfo: MatchProgressInfo;//当前比赛进度

    public get CurLevelID(): number { return this.levelSpawnDatas.LevelId }
    public get NextLevelID(): number { return ConfigManager.GetInstance().GetLevelConfig(this.CurLevelID + 1) ? this.CurLevelID + 1 : this.CurLevelID }
    public get LevelSpawnDatas() { return this.levelSpawnDatas; }
    public set LevelSpawnDatas(levelSpawnDatas: LevelSpawnDatas) { this.levelSpawnDatas = levelSpawnDatas; }
    // public get CurSpawnIndex(): number { return this.curSpawnGroupIndex; }
    public set CurLiveMonsterCount(value: number) { this.curLiveMonsterCount = value; }
    public get CurLiveMonsterCount(): number { return this.curLiveMonsterCount; }
    public get CurMatchProgressInfo() { return this.curMatchProgressInfo; }

    public OnInit() {
        this.reset();
    }

    public OnEnter() {
        Log.Debug("LevelInfo OnEnter")
        this.reset();
    }

    public OnExit() {
        Log.Debug("LevelInfo OnExit")
        this.reset();
    }

    private reset() {
        this.levelSpawnDatas = null;
        this.curLiveMonsterCount = 0;
        this.totalKilled = 0;
        this.totalSpawnBySkill = 0;
        this.curMatchProgressInfo = null;
        this.totalSpawnByConfig = 0;
    }


    public OnMonsterSpawn(byLevel: boolean) {
        if (GameDataManager.getInstance().MatchInfo.IsGameEnd()) return;
        // Log.Debug("怪物刷新， 记录刷怪数据")
        this.curLiveMonsterCount++;
        if (byLevel)
            this.totalSpawnByConfig++;
        else
            this.totalSpawnBySkill++;
        this.LogLevelData();
    }

    public OnMonsterDie() {
        if (GameDataManager.getInstance().MatchInfo.IsGameEnd()) return;
        this.curLiveMonsterCount--;
        this.totalKilled++;
        this.LogLevelData();
    }


    //获取比赛进度信息
    public GetCurProgress(): MatchProgressInfo {
        let unSpanwedCount = this.levelSpawnDatas.TotalMonsterCount - this.totalSpawnByConfig;
        let leftMonster = this.curLiveMonsterCount + unSpanwedCount;// 剩余怪物 = 未刷出 + 当前存活[已刷+技能产生]
        // Log.Debug("获取比赛进度, 当前剩余%i, 当前存活%i, 当前未出生%i", leftMonster, this.curLiveMonsterCount, unSpanwedCount)
        let progress = this.totalKilled / (this.levelSpawnDatas.TotalMonsterCount + this.totalSpawnBySkill);// 1 - (unSpanwedCount / this.levelSpawnDatas.TotalMonsterCount);//当前进度
        this.curMatchProgressInfo = new MatchProgressInfo(leftMonster, progress)
        return this.curMatchProgressInfo
    }


    //////////////////////////////////////////////////////////////////////////////////////////////////////////
    //是否满屏
    public IsScreenFull(): boolean {
        return this.curLiveMonsterCount >= this.levelSpawnDatas.MaxInScreenNum;
    }

    //是否所有怪都死亡
    public IsGameComplete(): boolean {
        // return this.IslastSpawnGroup() && this.IsMonsterSpawnCompleted() && this.curLiveMonsterCount == 0;
        return this.totalSpawnByConfig == this.levelSpawnDatas.TotalMonsterCount && this.curLiveMonsterCount == 0;
    }

    public IsBossLevel(): boolean {
        return this.levelSpawnDatas.IsBossLevel;
    }

    private LogLevelData() {
        Log.Debug("总数%i 已经刷出%i, 当前存活怪物%i",
            this.levelSpawnDatas.TotalMonsterCount,
            this.totalSpawnByConfig,
            this.curLiveMonsterCount)

        // if (this.curGroupSpawnedMonsterCount > this.levelSpawnDatas.LevelSpawnData[this.curSpawnGroupIndex].Monsters.length) {
        //     Log.Debug("error")
        // }
    }
}