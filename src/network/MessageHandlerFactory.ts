class MessageHandlerFactory {
    public static CreateHandler(msgid: number): BaseMsgHandler {
        switch (msgid) {
            case EnumNetMessage.S_UserLogin_1001:
                {
                    return new UserLoginHandler();
                }
            case EnumNetMessage.S_GetOpenId_1101:
                {
                    return new GetOpenIdHandler();
                }
            case EnumNetMessage.S_ExchangeWithDiamond_2001:
                {
                    return new ExchangeWithDiamondHandler();
                }
            case EnumNetMessage.S_UpgradeWeaponLvl_2011:
                {
                    return new UpgradeWeaponLvlHandler();
                }
            case EnumNetMessage.S_UpgradeSpawnLvl_2013:
                {
                    return new UpgradeSpawnLvlHandler();
                }
            case EnumNetMessage.S_WeaponEvolution_2015:
                {
                    return new WeaponEvolutionHandler();
                }
            case EnumNetMessage.S_EquipSideWeapon_2021:
                {
                    return new EquipSideWeaponHandler();
                }
            case EnumNetMessage.S_UnlockSideWeapon_2023:
                {
                    return new UnlockSideWeaponHandler();
                }
            case EnumNetMessage.S_CreateMoneySpawn_2031:
                {
                    return new CreateMoneySpawnHandler();
                }
            case EnumNetMessage.S_UpdateMoneySpawn_2033:
                {
                    return new UpdateMoneySpawnHandler();
                }
            case EnumNetMessage.S_GainMoneySpawn_2035:
                {
                    return new GainMoneySpawnHandler();
                }
            case EnumNetMessage.S_RemoveMoneySpawn_2037:
                {
                    return new RemoveMoneySpawnHandler();
                }
            case EnumNetMessage.S_InvitedByFriend_2041:
                {
                    return new InvitedByFriendHandler();
                }
            case EnumNetMessage.S_CheckInviteList_2043:
                {
                    return new CheckInviteListHandler();
                }
            case EnumNetMessage.S_GetInviteReward_2045:
                {
                    return new GetInviteRewardHandler();
                }
            case EnumNetMessage.S_GetInviteVerifyReward_2047:
                {
                    return new GetInviteVerifyRewardHandler();
                }
            case EnumNetMessage.S_GainPointByTime_2051:
                {
                    return new GainPointByTimeHandler();
                }
            case EnumNetMessage.S_GainPointByMatch_2053:
                {
                    return new GainPointByMatchHandler();
                }
            case EnumNetMessage.S_MatchComplete_2100:
                {
                    return new MatchCompleteHandler();
                }
            case EnumNetMessage.S_MatchStart_2101:
                {
                    return new MatchStartHandler();
                }
            case EnumNetMessage.S_GetMessageVerifyCode_2201:
                {
                    return new GetMessageVerifyCodeHandler();
                }
            case EnumNetMessage.S_CheckPhoneVerify_2203:
                {
                    return new CheckPhoneVerifyHandler();
                }
            case EnumNetMessage.S_Lottery_2301:
                {
                    return new LotteryHandler();
                }
            case EnumNetMessage.S_CheckLotteryRewardHistroy_2303:
                {
                    return new CheckLotteryRewardHistroyHandler();
                }
            default:
                Log.Warn("msgid不存在handler:" + msgid)
                return null
        }
    }
}
