
module ui {
	export enum UIID {
		BackgroundUIID,
		BattleUIID,
		CommonPanelUIID,
		ExchangeUIID,
		HomePageUIID,
		InviteFriendUIID,
		InviteVerifyFriendUIID,
		LeaderboardUIID,
		LevelUIID,
		LoadingUIID,
		LotteryResultUIID,
		LotteryRewardHistUIID,
		MoneyInfoUIID,
		MoreSpawnUIID,
		ProgressUIID,
		RebornUIID,
		ResultUIID,
		SettingUIID,
		UpgradeUIID,
		VerifyUIID,
		WaitingUIID,

	}

	export class UIFactory {
		constructor() { }

		public static Create(id: UIID): ui.BaseUICtrl {
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
		}
	}
}
