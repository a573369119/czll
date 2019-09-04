/*
* name;
*/
var BasePlayerInfo = (function () {
    function BasePlayerInfo() {
    }
    BasePlayerInfo.prototype.GetPlayerID = function () {
        return this.playerID;
    };
    BasePlayerInfo.prototype.Init = function (playerInfo) {
        this.playerID = playerInfo.openId;
    };
    BasePlayerInfo.prototype.OnInit = function () {
    };
    BasePlayerInfo.prototype.OnEnter = function () {
    };
    BasePlayerInfo.prototype.OnExit = function () {
    };
    return BasePlayerInfo;
}());
//# sourceMappingURL=BasePlayerInfo.js.map