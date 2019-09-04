var ui;
(function (ui) {
    var UIID;
    (function (UIID) {
        UIID[UIID["BackgroundUIID"] = 0] = "BackgroundUIID";
        UIID[UIID["BattleUIID"] = 1] = "BattleUIID";
        UIID[UIID["CommonPanelUIID"] = 2] = "CommonPanelUIID";
        UIID[UIID["ExchangeUIID"] = 3] = "ExchangeUIID";
        UIID[UIID["HomePageUIID"] = 4] = "HomePageUIID";
        UIID[UIID["InviteFriendUIID"] = 5] = "InviteFriendUIID";
        UIID[UIID["InviteVerifyFriendUIID"] = 6] = "InviteVerifyFriendUIID";
        UIID[UIID["LeaderboardUIID"] = 7] = "LeaderboardUIID";
        UIID[UIID["LevelUIID"] = 8] = "LevelUIID";
        UIID[UIID["LoadingUIID"] = 9] = "LoadingUIID";
        UIID[UIID["LotteryResultUIID"] = 10] = "LotteryResultUIID";
        UIID[UIID["LotteryRewardHistUIID"] = 11] = "LotteryRewardHistUIID";
        UIID[UIID["MoneyInfoUIID"] = 12] = "MoneyInfoUIID";
        UIID[UIID["MoreSpawnUIID"] = 13] = "MoreSpawnUIID";
        UIID[UIID["ProgressUIID"] = 14] = "ProgressUIID";
        UIID[UIID["RebornUIID"] = 15] = "RebornUIID";
        UIID[UIID["ResultUIID"] = 16] = "ResultUIID";
        UIID[UIID["SettingUIID"] = 17] = "SettingUIID";
        UIID[UIID["UpgradeUIID"] = 18] = "UpgradeUIID";
        UIID[UIID["VerifyUIID"] = 19] = "VerifyUIID";
        UIID[UIID["WaitingUIID"] = 20] = "WaitingUIID";
    })(UIID = ui.UIID || (ui.UIID = {}));
    var UIFactory = (function () {
        function UIFactory() {
        }
        UIFactory.Create = function (id) {
            switch (id) {
                case UIID.BackgroundUIID:
                    return new ui.uicontrollers.BackgroundUICtrl(new ui.BackgroundUI());
                case UIID.BattleUIID:
                    return new ui.uicontrollers.BattleUICtrl(new ui.BattleUI());
                case UIID.CommonPanelUIID:
                    return new ui.uicontrollers.CommonPanelUICtrl(new ui.CommonPanelUI());
                case UIID.ExchangeUIID:
                    return new ui.uicontrollers.ExchangeUICtrl(new ui.ExchangeUI());
                case UIID.HomePageUIID:
                    return new ui.uicontrollers.HomePageUICtrl(new ui.HomePageUI());
                case UIID.InviteFriendUIID:
                    return new ui.uicontrollers.InviteFriendUICtrl(new ui.InviteFriendUI());
                case UIID.InviteVerifyFriendUIID:
                    return new ui.uicontrollers.InviteVerifyFriendUICtrl(new ui.InviteVerifyFriendUI());
                case UIID.LeaderboardUIID:
                    return new ui.uicontrollers.LeaderboardUICtrl(new ui.LeaderboardUI());
                case UIID.LevelUIID:
                    return new ui.uicontrollers.LevelUICtrl(new ui.LevelUI());
                case UIID.LoadingUIID:
                    return new ui.uicontrollers.LoadingUICtrl(new ui.LoadingUI());
                case UIID.LotteryResultUIID:
                    return new ui.uicontrollers.LotteryResultUICtrl(new ui.LotteryResultUI());
                case UIID.LotteryRewardHistUIID:
                    return new ui.uicontrollers.LotteryRewardHistUICtrl(new ui.LotteryRewardHistUI());
                case UIID.MoneyInfoUIID:
                    return new ui.uicontrollers.MoneyInfoUICtrl(new ui.MoneyInfoUI());
                case UIID.MoreSpawnUIID:
                    return new ui.uicontrollers.MoreSpawnUICtrl(new ui.MoreSpawnUI());
                case UIID.ProgressUIID:
                    return new ui.uicontrollers.ProgressUICtrl(new ui.ProgressUI());
                case UIID.RebornUIID:
                    return new ui.uicontrollers.RebornUICtrl(new ui.RebornUI());
                case UIID.ResultUIID:
                    return new ui.uicontrollers.ResultUICtrl(new ui.ResultUI());
                case UIID.SettingUIID:
                    return new ui.uicontrollers.SettingUICtrl(new ui.SettingUI());
                case UIID.UpgradeUIID:
                    return new ui.uicontrollers.UpgradeUICtrl(new ui.UpgradeUI());
                case UIID.VerifyUIID:
                    return new ui.uicontrollers.VerifyUICtrl(new ui.VerifyUI());
                case UIID.WaitingUIID:
                    return new ui.uicontrollers.WaitingUICtrl(new ui.WaitingUI());
                default:
                    break;
            }
        };
        return UIFactory;
    }());
    ui.UIFactory = UIFactory;
})(ui || (ui = {}));
//# sourceMappingURL=UIIDDefine.js.map