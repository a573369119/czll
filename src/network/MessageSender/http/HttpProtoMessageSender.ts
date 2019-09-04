/*
* name;
*/
class HttpProtoMessageSender extends BaseMessageSender implements IHttpSender {

    //登录
    public SendLogin(openid: string, imageUrl: string, nickname: string, onSucceed?: Function, onFail?: Function) {
        let msg = new com.msg.c_userLogin_1000();
        msg.openId = openid;
        if (imageUrl && nickname) {
            msg.wxInfo = new com.msg.wxInfo();
            msg.wxInfo.imageUrl = imageUrl;
            msg.wxInfo.nickName = nickname;
        }

        // let buffer = com.msg.c_userLogin_1000.encode(msg).finish();
        // this.SendHttpMsg(EnumNetMessage.C_UserLogin_1000, buffer, onSucceed, onFail)
        // Log.Debug("http 发送login:" + msg.openID);

        let buffer = com.msg.c_userLogin_1000.encode(msg).finish();
        this.SendHttpMsg(EnumNetMessage.C_UserLogin_1000, buffer, onSucceed, onFail)
        Log.Debug("http 发送 C_UserLogin_1000:" + "openId: " + openid + "wxInfo: " + imageUrl);

    }

    public SendUserLogin(openId: string, wxInfo: com.msg.wxInfo, onSucceed?: Function, onFail?: Function) {

    }

    //钻石兑换金币与体力
    public SendExchangeWithDiamond(openid: string, type: EnumDiamondExchangeType, diamondNum: number, onSucceed?: Function, onFail?: Function) {
        let msg = new com.msg.c_ExchangeWithDiamond_2000();
        msg.openId = openid;
        msg.type = type;
        msg.diamondNum = diamondNum;

        let buffer = com.msg.c_ExchangeWithDiamond_2000.encode(msg).finish();
        this.SendHttpMsg(EnumNetMessage.C_ExchangeWithDiamond_2000, buffer, onSucceed, onFail)
        Log.Debug("http 发送 C_ExchangeWithDiamond_2000:" + "openId: " + openid);

    }

    //升级武器
    public SendUpgradeWeaopnLvl(openid: string, weaponID: number, curLvl: number, costGold: number, onSucceed?: Function, onFail?: Function) {
        let msg = new com.msg.c_UpgradeWeaponLvl_2010();
        msg.openId = openid;
        msg.weaponID = weaponID;
        msg.curLvl = curLvl;
        msg.costGold = costGold;

        let buffer = com.msg.c_UpgradeWeaponLvl_2010.encode(msg).finish();
        this.SendHttpMsg(EnumNetMessage.C_UpgradeWeaponLvl_2010, buffer, onSucceed, onFail)
        Log.Debug("http 发送 C_UpgradeWeaponLvl_2010:" + "openId: " + openid);
    }

    //升级产能
    public SendUpgradeSpawnLvl(openid: string, curLvl: number, costGold: number, newGoldSpawnLvl: number, newDiamondSpawnLvl: number, onSucceed?: Function, onFail?: Function) {
        let msg = new com.msg.c_UpgradeSpawnLvl_2012();
        msg.openId = openid;
        msg.curLvl = curLvl;
        msg.costGold = costGold;
        msg.newGoldSpawnLvl = newGoldSpawnLvl;
        msg.newDiamondSpawnLvl = newDiamondSpawnLvl;

        let buffer = com.msg.c_UpgradeSpawnLvl_2012.encode(msg).finish();
        this.SendHttpMsg(EnumNetMessage.C_UpgradeSpawnLvl_2012, buffer, onSucceed, onFail)
        Log.Debug("http 发送 C_UpgradeSpawnLvl_2012:" + "openId: " + openid);
    }

    //升阶主武器
    public SendWeaponEvolution(openid: string, weaponID: number, curEvolutionLvl: number, costGold: number, onSucceed?: Function, onFail?: Function) {
        let msg = new com.msg.c_WeaponEvolution_2014();
        msg.openId = openid;
        msg.weaponID = weaponID;
        msg.curEvolutionLvl = curEvolutionLvl;
        msg.costGold = costGold;

        let buffer = com.msg.c_WeaponEvolution_2014.encode(msg).finish();
        this.SendHttpMsg(EnumNetMessage.C_WeaponEvolution_2014, buffer, onSucceed, onFail)
        Log.Debug("http 发送 C_WeaponEvolution_2014:" + "openId: " + openid);
    }

    //更换副武器
    public SendEquipSideWeapon(openid: string, sideWeaponID: number, onSucceed?: Function, onFail?: Function) {
        let msg = new com.msg.c_EquipSideWeapon_2020();
        msg.openId = openid;
        msg.sideWeaponID = sideWeaponID;

        let buffer = com.msg.c_EquipSideWeapon_2020.encode(msg).finish();
        this.SendHttpMsg(EnumNetMessage.C_EquipSideWeapon_2020, buffer, onSucceed, onFail)
        Log.Debug("http 发送 C_EquipSideWeapon_2020:" + "openId: " + openid);
    }

    //解锁副武器
    public SendUnlockSideWeapon(openid: string, sideWeaponID: number, onSucceed?: Function, onFail?: Function) {
        let msg = new com.msg.c_UnlockSideWeapon_2022();
        msg.openId = openid;
        msg.sideWeaponID = sideWeaponID;

        let buffer = com.msg.c_UnlockSideWeapon_2022.encode(msg).finish();
        this.SendHttpMsg(EnumNetMessage.C_UnlockSideWeapon_2022, buffer, onSucceed, onFail)
        Log.Debug("http 发送 C_UnlockSideWeapon_2022:" + "openId: " + openid);
    }

    //创建钱币产能
    public SendCreateMoneySpawn(openid: string, moneyType: EnumMoneyType, onSucceed?: Function, onFail?: Function) {
        let msg = new com.msg.c_CreateMoneySpawn_2030();
        msg.openId = openid;
        msg.moneyType = moneyType as number;

        let buffer = com.msg.c_CreateMoneySpawn_2030.encode(msg).finish();
        this.SendHttpMsg(EnumNetMessage.C_CreateMoneySpawn_2030, buffer, onSucceed, onFail)
        Log.Debug("http 发送 C_CreateMoneySpawn_2030:" + "openId: " + openid);
    }

    //更新钱币产能
    public SendUpdateMoneySpawn(openid: string, spawnID: number, moneyDelta: number, onSucceed?: Function, onFail?: Function) {
        let msg = new com.msg.c_UpdateMoneySpawn_2032();
        msg.openId = openid;
        msg.spawnID = spawnID;
        msg.moneyDelta = moneyDelta;

        let buffer = com.msg.c_UpdateMoneySpawn_2032.encode(msg).finish();
        this.SendHttpMsg(EnumNetMessage.C_UpdateMoneySpawn_2032, buffer, onSucceed, onFail)
        Log.Debug("http 发送 C_UpdateMoneySpawn_2032:" + "openId: " + openid);
    }

    //收获钱币产能
    public SendGainMoneySpawn(openid: string, spawnID: number, base: number, lucky: number, onSucceed?: Function, onFail?: Function) {
        let msg = new com.msg.c_GainMoneySpawn_2034();
        msg.openId = openid;
        msg.spawnID = spawnID;
        msg.base = base;
        msg.lucky = lucky;

        let buffer = com.msg.c_GainMoneySpawn_2034.encode(msg).finish();
        this.SendHttpMsg(EnumNetMessage.C_GainMoneySpawn_2034, buffer, onSucceed, onFail)
        Log.Debug("http 发送 C_GainMoneySpawn_2034:" + "openId: " + openid);
    }

    //移除钱币产能
    public SendRemoveMoneySpawn(openid: string, spawnID: number, onSucceed?: Function, onFail?: Function) {
        let msg = new com.msg.c_RemoveMoneySpawn_2036();
        msg.openId = openid;
        msg.spawnID = spawnID;

        let buffer = com.msg.c_RemoveMoneySpawn_2036.encode(msg).finish();
        this.SendHttpMsg(EnumNetMessage.C_RemoveMoneySpawn_2036, buffer, onSucceed, onFail)
        Log.Debug("http 发送 C_RemoveMoneySpawn_2036:" + "openId: " + openid);
    }

    //因邀请进入游戏
    public SendInvitedByFriend(openid: string, inviterOpenID: string, onSucceed?: Function, onFail?: Function) {
        let msg = new com.msg.c_InvitedByFriend_2040();
        msg.openId = openid;
        msg.inviterOpenID = inviterOpenID;

        let buffer = com.msg.c_InvitedByFriend_2040.encode(msg).finish();
        this.SendHttpMsg(EnumNetMessage.C_InvitedByFriend_2040, buffer, onSucceed, onFail)
        Log.Debug("http 发送 C_InvitedByFriend_2040:" + "openId: " + openid);
    }

    //查询邀请列表
    public SendCheckInviteList(openid: string, onSucceed?: Function, onFail?: Function) {
        let msg = new com.msg.c_CheckInviteList_2042();
        msg.openId = openid;

        let buffer = com.msg.c_CheckInviteList_2042.encode(msg).finish();
        this.SendHttpMsg(EnumNetMessage.C_CheckInviteList_2042, buffer, onSucceed, onFail)
        Log.Debug("http 发送 C_CheckInviteList_2042:" + "openId: " + openid);
    }

    //领取邀请奖励
    public SendGetInviteReward(openid: string, friendOpenId: string, onSucceed?: Function, onFail?: Function) {
        let msg = new com.msg.c_GetInviteReward_2044();
        msg.openId = openid;
        msg.friendOpenId = friendOpenId;

        let buffer = com.msg.c_GetInviteReward_2044.encode(msg).finish();
        this.SendHttpMsg(EnumNetMessage.C_GetInviteReward_2044, buffer, onSucceed, onFail)
        Log.Debug("http 发送 C_GetInviteReward_2044:" + "openId: " + openid);
    }

    //领取邀请、绑定奖励
    public SendGetInviteVerifyReward(openid: string, friendOpenId: string, rewardType: number, onSucceed?: Function, onFail?: Function) {
        let msg = new com.msg.c_GetInviteVerifyReward_2046();
        msg.openId = openid;
        msg.friendOpenId = friendOpenId;
        msg.rewardType = rewardType;

        let buffer = com.msg.c_GetInviteVerifyReward_2046.encode(msg).finish();
        this.SendHttpMsg(EnumNetMessage.C_GetInviteVerifyReward_2046, buffer, onSucceed, onFail);
        Log.Debug("http 发送 C_GetInviteVerifyReward_2046:" + "openId: " + openid);
    }

    //倒计时周期结束，获取体力
    public SendGainPointByTime(openid: string, onSucceed?: Function, onFail?: Function) {
        let msg = new com.msg.c_GainPointByTime_2050();
        msg.openId = openid;

        let buffer = com.msg.c_GainPointByTime_2050.encode(msg).finish();
        this.SendHttpMsg(EnumNetMessage.C_GainPointByTime_2050, buffer, onSucceed, onFail)
        Log.Debug("http 发送 C_GainPointByTime_2050:" + "openId: " + openid);
    }

    //比赛结束，获取体力
    public SendGainPointByMatch(openid: string, curLevel: number, onSucceed?: Function, onFail?: Function) {
        let msg = new com.msg.c_GainPointByMatch_2052();
        msg.openId = openid;
        msg.curLevel = curLevel;

        let buffer = com.msg.c_GainPointByMatch_2052.encode(msg).finish();
        this.SendHttpMsg(EnumNetMessage.C_GainPointByMatch_2052, buffer, onSucceed, onFail)
        Log.Debug("http 发送 C_GainPointByMatch_2052:" + "openId: " + openid);
    }

    //关卡结算[点击继续战斗/领取奖励/十倍领取]
    public SendMatchComplete(openId: string, completedLevel: number, goldReward: number, onSucceed?: Function, onFail?: Function) {
        let msg = new com.msg.c_MatchComplete_2100();
        msg.openId = openId;
        msg.completedLevel = completedLevel;
        msg.goldReward = goldReward;

        var buffer = com.msg.c_MatchComplete_2100.encode(msg).finish();
        this.SendHttpMsg(EnumNetMessage.C_MatchComplete_2100, buffer, onSucceed, onFail)
        Log.Debug("http 发送c_MatchComplete_2100:" + "openId: " + openId + "completedLevel: " + completedLevel + "goldReward: " + goldReward);
    }

    //比赛开始
    public SendMatchStart(openId: string, onSucceed?: Function, onFail?: Function) {
        let msg = new com.msg.c_MatchStart_2101();
        msg.openId = openId;

        var buffer = com.msg.c_MatchStart_2101.encode(msg).finish();
        this.SendHttpMsg(EnumNetMessage.C_MatchStart_2101, buffer, onSucceed, onFail)
        Log.Debug("http 发送 C_MatchStart_2101:" + "openId: " + openId);
    }

    //获取短信验证码
    public SendGetMessageVerifyCode(phoneNumber: number, onSucceed?: Function, onFail?: Function) {
        let msg = new com.msg.c_GetMessageVerifyCode_2200();
        msg.phoneNumber = phoneNumber;

        var buffer = com.msg.c_GetMessageVerifyCode_2200.encode(msg).finish();
        this.SendHttpMsg(EnumNetMessage.C_GetMessageVerifyCode_2200, buffer, onSucceed, onFail)
        Log.Debug("http 发送 C_GetMessageVerifyCode_2200:" + "phonenumber: " + phoneNumber);
    }

    //发送手机绑定
    public SendCheckPhoneVerify(openId: string, phoneNumber: number, verifyCode: number, onSucceed?: Function, onFail?: Function) {
        let msg = new com.msg.c_CheckPhoneVerify_2202();
        msg.openId = openId;
        msg.phoneNumber = phoneNumber;
        msg.verifyCode = verifyCode;

        var buffer = com.msg.c_CheckPhoneVerify_2202.encode(msg).finish();
        this.SendHttpMsg(EnumNetMessage.C_CheckPhoneVerify_2202, buffer, onSucceed, onFail)
        Log.Debug("http 发送 C_CheckPhoneVerify_2202:" + "openId: " + openId);
    }

    //发送抽奖
    public SendLottery(openId: string, onSucceed?: Function, onFail?: Function) {
        let msg = new com.msg.c_Lottery_2300();
        msg.openId = openId;

        var buffer = com.msg.c_Lottery_2300.encode(msg).finish();
        this.SendHttpMsg(EnumNetMessage.C_Lottery_2300, buffer, onSucceed, onFail)
        Log.Debug("http 发送 C_Lottery_2300:" + "openId: " + openId);
    }

    //发送查询抽奖历史信息
    public SendCheckLotteryRewardHistroy(openId: string, pageIndex: number, histCount: number, onSucceed?: Function, onFail?: Function) {
        let msg = new com.msg.c_CheckLotteryRewardHistroy_2302();
        msg.openId = openId;
        msg.pageIndex = pageIndex;
        msg.histCount = histCount;

        var buffer = com.msg.c_CheckLotteryRewardHistroy_2302.encode(msg).finish();
        this.SendHttpMsg(EnumNetMessage.C_CheckLotteryRewardHistroy_2302, buffer, onSucceed, onFail)
        Log.Debug("http 发送 C_CheckLotteryRewardHistroy_2302:" + "openId: " + openId);
    }
}