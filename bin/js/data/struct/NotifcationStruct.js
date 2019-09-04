var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*
* name;
*/
var NotifcationStruct = (function () {
    function NotifcationStruct() {
    }
    return NotifcationStruct;
}());
/**
 * 比赛资源加载消息体
 */
var PreloadMsgBody = (function () {
    function PreloadMsgBody(finishCallback, progressCallback) {
        this.cb = finishCallback;
        this.progress = progressCallback;
    }
    return PreloadMsgBody;
}());
//通用面板数据
var CommonPanelUIParam = (function (_super) {
    __extends(CommonPanelUIParam, _super);
    function CommonPanelUIParam(id, str, cb) {
        var _this = _super.call(this, id, null) || this;
        _this.context = str;
        _this.callback = cb;
        return _this;
    }
    return CommonPanelUIParam;
}(ui.UIParamStruct));
var HomepageBottomButtonState = (function () {
    function HomepageBottomButtonState(buttonID, selected) {
        this.buttonID = buttonID;
        this.selected = selected;
    }
    return HomepageBottomButtonState;
}());
//玩家获取/停止buff
var PlayerBuffInfo = (function () {
    function PlayerBuffInfo(type, active) {
        this.BuffType = type;
        this.Active = active;
    }
    return PlayerBuffInfo;
}());
var MoreSpawnUIParam = (function (_super) {
    __extends(MoreSpawnUIParam, _super);
    function MoreSpawnUIParam(moneyType, spawnID) {
        var _this = _super.call(this, ui.UIID.MoreSpawnUIID, null, null) || this;
        _this.moneyType = moneyType;
        _this.spawnID = spawnID;
        return _this;
    }
    return MoreSpawnUIParam;
}(ui.UIParamStruct));
var LevelUIAnimParam = (function () {
    function LevelUIAnimParam() {
    }
    return LevelUIAnimParam;
}());
//# sourceMappingURL=NotifcationStruct.js.map