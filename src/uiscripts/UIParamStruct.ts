/*
* name;
*/
module ui {
    export class UIParamStruct extends ui.WindowContextDataBase {
        ID: UIID;
        constructor(id: UIID, onOpenCallback: Function, navLogic: boolean = false) {
            super(onOpenCallback, navLogic);
            this.ID = id;
        }
    }

    /**
     * 打开兑换面板的参数
     */
    export class ExchangeUIParam extends UIParamStruct {
        exchangeType: EnumDiamondExchangeType;
        constructor(exchangeType: EnumDiamondExchangeType) {
            super(UIID.ExchangeUIID, null);
            this.exchangeType = exchangeType;
        }
    }

    /**
     * 打开结算面板的参数
     */
    export class ResultUIParam extends UIParamStruct {
        win: boolean;
        constructor(win: boolean) {
            super(UIID.ResultUIID, null);
            this.win = win;
        }
    }

    /**
     * 打开升级面板的参数
     */
    export class UpgradeUIParam extends UIParamStruct {
        upgradeType: EnumUpgradeUIType;
        constructor(upgradeType: EnumUpgradeUIType) {
            super(UIID.UpgradeUIID, null);
            this.upgradeType = upgradeType;
        }
    }

    /**
     * 打开抽奖奖励面板的参数
     */
    export class LotteryRewardUIParam extends UIParamStruct {
        rewardConfigList: Array<number>;
        constructor(rewardConfigList: Array<number>) {
            super(UIID.LotteryResultUIID, null);
            this.rewardConfigList = rewardConfigList;
        }
    }
}