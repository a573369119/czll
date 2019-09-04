var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*
* name;
*/
var ui;
(function (ui) {
    var UIParamStruct = (function (_super) {
        __extends(UIParamStruct, _super);
        function UIParamStruct(id, onOpenCallback, navLogic) {
            if (navLogic === void 0) { navLogic = false; }
            var _this = _super.call(this, onOpenCallback, navLogic) || this;
            _this.ID = id;
            return _this;
        }
        return UIParamStruct;
    }(ui.WindowContextDataBase));
    ui.UIParamStruct = UIParamStruct;
    /**
     * 打开兑换面板的参数
     */
    var ExchangeUIParam = (function (_super) {
        __extends(ExchangeUIParam, _super);
        function ExchangeUIParam(exchangeType) {
            var _this = _super.call(this, ui.UIID.ExchangeUIID, null) || this;
            _this.exchangeType = exchangeType;
            return _this;
        }
        return ExchangeUIParam;
    }(UIParamStruct));
    ui.ExchangeUIParam = ExchangeUIParam;
    /**
     * 打开结算面板的参数
     */
    var ResultUIParam = (function (_super) {
        __extends(ResultUIParam, _super);
        function ResultUIParam(win) {
            var _this = _super.call(this, ui.UIID.ResultUIID, null) || this;
            _this.win = win;
            return _this;
        }
        return ResultUIParam;
    }(UIParamStruct));
    ui.ResultUIParam = ResultUIParam;
    /**
     * 打开升级面板的参数
     */
    var UpgradeUIParam = (function (_super) {
        __extends(UpgradeUIParam, _super);
        function UpgradeUIParam(upgradeType) {
            var _this = _super.call(this, ui.UIID.UpgradeUIID, null) || this;
            _this.upgradeType = upgradeType;
            return _this;
        }
        return UpgradeUIParam;
    }(UIParamStruct));
    ui.UpgradeUIParam = UpgradeUIParam;
    /**
     * 打开抽奖奖励面板的参数
     */
    var LotteryRewardUIParam = (function (_super) {
        __extends(LotteryRewardUIParam, _super);
        function LotteryRewardUIParam(rewardConfigList) {
            var _this = _super.call(this, ui.UIID.LotteryResultUIID, null) || this;
            _this.rewardConfigList = rewardConfigList;
            return _this;
        }
        return LotteryRewardUIParam;
    }(UIParamStruct));
    ui.LotteryRewardUIParam = LotteryRewardUIParam;
})(ui || (ui = {}));
//# sourceMappingURL=UIParamStruct.js.map