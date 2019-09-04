/*
* name;
*/
var MatchInfo = (function () {
    function MatchInfo() {
    }
    Object.defineProperty(MatchInfo.prototype, "GoldNum", {
        get: function () { return this.curGoldNum; },
        set: function (value) { this.curGoldNum = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatchInfo.prototype, "State", {
        get: function () { return this.state; },
        set: function (value) { this.state = value; },
        enumerable: true,
        configurable: true
    });
    MatchInfo.prototype.OnInit = function () {
        this.curGoldNum = 0;
        this.state = EnumMatchState.Exit;
    };
    MatchInfo.prototype.OnEnter = function () {
        Log.Debug("MatchInfo OnEnter");
        this.curGoldNum = 0;
        this.state = EnumMatchState.Enter;
    };
    MatchInfo.prototype.OnExit = function () {
        Log.Debug("MatchInfo OnExit");
        this.curGoldNum = 0;
        this.state = EnumMatchState.Exit;
    };
    MatchInfo.prototype.IsGameEnd = function () {
        return this.state == EnumMatchState.Complete || this.state == EnumMatchState.Exit;
    };
    MatchInfo.prototype.IsGameStart = function () {
        return this.state == EnumMatchState.Start;
    };
    return MatchInfo;
}());
//# sourceMappingURL=MatchInfo.js.map