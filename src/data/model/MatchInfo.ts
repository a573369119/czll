/*
* name;
*/
class MatchInfo implements IGameDta {
    private curGoldNum: number;//比赛中获取的金币数量
    private state: EnumMatchState;

    public get GoldNum(): number { return this.curGoldNum; }
    public set GoldNum(value: number) { this.curGoldNum = value; }
    public get State(): EnumMatchState { return this.state; }
    public set State(value: EnumMatchState) { this.state = value; }

    public OnInit() {
        this.curGoldNum = 0;
        this.state = EnumMatchState.Exit;
    }

    public OnEnter() {
        Log.Debug("MatchInfo OnEnter")
        this.curGoldNum = 0;
        this.state = EnumMatchState.Enter;
    }

    public OnExit() {
        Log.Debug("MatchInfo OnExit")
        this.curGoldNum = 0;
        this.state = EnumMatchState.Exit;
    }

    public IsGameEnd() {
        return this.state == EnumMatchState.Complete || this.state == EnumMatchState.Exit
    }
    public IsGameStart() {
        return this.state == EnumMatchState.Start
    }
}