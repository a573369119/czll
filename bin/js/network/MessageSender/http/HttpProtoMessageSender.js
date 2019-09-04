var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*
* name;
*/
var HttpProtoMessageSender = (function (_super) {
    __extends(HttpProtoMessageSender, _super);
    function HttpProtoMessageSender() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    //登录
    HttpProtoMessageSender.prototype.SendLogin = function (openid, imageUrl, nickname, onSucceed, onFail) {
        var msg = new com.msg.c_userLogin_1000();
        msg.openId = openid;
        if (imageUrl && nickname) {
            msg.wxInfo = new com.msg.wxInfo();
            msg.wxInfo.imageUrl = imageUrl;
            msg.wxInfo.nickName = nickname;
        }
        // let buffer = com.msg.c_userLogin_1000.encode(msg).finish();
        // this.SendHttpMsg(EnumNetMessage.C_UserLogin_1000, buffer, onSucceed, onFail)
        // Log.Debug("http 发送login:" + msg.openID);
        var buffer = com.msg.c_userLogin_1000.encode(msg).finish();
        this.SendHttpMsg(EnumNetMessage.C_UserLogin_1000, buffer, onSucceed, onFail);
        Log.Debug("http 发送 C_UserLogin_1000:" + "openId: " + openid + "wxInfo: " + imageUrl);
    };
    HttpProtoMessageSender.prototype.SendUserLogin = function (openId, wxInfo, onSucceed, onFail) {
    };
    //钻石兑换金币与体力
    HttpProtoMessageSender.prototype.SendExchangeWithDiamond = function (openid, type, diamondNum, onSucceed, onFail) {
        var msg = new com.msg.c_ExchangeWithDiamond_2000();
        msg.openId = openid;
        msg.type = type;
        msg.diamondNum = diamondNum;
        var buffer = com.msg.c_ExchangeWithDiamond_2000.encode(msg).finish();
        this.SendHttpMsg(EnumNetMessage.C_ExchangeWithDiamond_2000, buffer, onSucceed, onFail);
        Log.Debug("http 发送 C_ExchangeWithDiamond_2000:" + "openId: " + openid);
    };
    //升级武器
    HttpProtoMessageSender.prototype.SendUpgradeWeaopnLvl = function (openid, weaponID, curLvl, costGold, onSucceed, onFail) {
        var msg = new com.msg.c_UpgradeWeaponLvl_2010();
        msg.openId = openid;
        msg.weaponID = weaponID;
        msg.curLvl = curLvl;
        msg.costGold = costGold;
        var buffer = com.msg.c_UpgradeWeaponLvl_2010.encode(msg).finish();
        this.SendHttpMsg(EnumNetMessage.C_UpgradeWeaponLvl_2010, buffer, onSucceed, onFail);
        Log.Debug("http 发送 C_UpgradeWeaponLvl_2010:" + "openId: " + openid);
    };
    //升级产能
    HttpProtoMessageSender.prototype.SendUpgradeSpawnLvl = function (openid, curLvl, costGold, newGoldSpawnLvl, newDiamondSpawnLvl, onSucceed, onFail) {
        var msg = new com.msg.c_UpgradeSpawnLvl_2012();
        msg.openId = openid;
        msg.curLvl = curLvl;
        msg.costGold = costGold;
        msg.newGoldSpawnLvl = newGoldSpawnLvl;
        msg.newDiamondSpawnLvl = newDiamondSpawnLvl;
        var buffer = com.msg.c_UpgradeSpawnLvl_2012.encode(msg).finish();
        this.SendHttpMsg(EnumNetMessage.C_UpgradeSpawnLvl_2012, buffer, onSucceed, onFail);
        Log.Debug("http 发送 C_UpgradeSpawnLvl_2012:" + "openId: " + openid);
    };
    //升阶主武器
    HttpProtoMessageSender.prototype.SendWeaponEvolution = function (openid, weaponID, curEvolutionLvl, costGold, onSucceed, onFail) {
        var msg = new com.msg.c_WeaponEvolution_2014();
        msg.openId = openid;
        msg.weaponID = weaponID;
        msg.curEvolutionLvl = curEvolutionLvl;
        msg.costGold = costGold;
        var buffer = com.msg.c_WeaponEvolution_2014.encode(msg).finish();
        this.SendHttpMsg(EnumNetMessage.C_WeaponEvolution_2014, buffer, onSucceed, onFail);
        Log.Debug("http 发送 C_WeaponEvolution_2014:" + "openId: " + openid);
    };
    //更换副武器
    HttpProtoMessageSender.prototype.SendEquipSideWeapon = function (openid, sideWeaponID, onSucceed, onFail) {
        var msg = new com.msg.c_EquipSideWeapon_2020();
        msg.openId = openid;
        msg.sideWeaponID = sideWeaponID;
        var buffer = com.msg.c_EquipSideWeapon_2020.encode(msg).finish();
        this.SendHttpMsg(EnumNetMessage.C_EquipSideWeapon_2020, buffer, onSucceed, onFail);
        Log.Debug("http 发送 C_EquipSideWeapon_2020:" + "openId: " + openid);
    };
    //解锁副武器
    HttpProtoMessageSender.prototype.SendUnlockSideWeapon = function (openid, sideWeaponID, onSucceed, onFail) {
        var msg = new com.msg.c_UnlockSideWeapon_2022();
        msg.openId = openid;
        msg.sideWeaponID = sideWeaponID;
        var buffer = com.msg.c_UnlockSideWeapon_2022.encode(msg).finish();
        this.SendHttpMsg(EnumNetMessage.C_UnlockSideWeapon_2022, buffer, onSucceed, onFail);
        Log.Debug("http 发送 C_UnlockSideWeapon_2022:" + "openId: " + openid);
    };
    //创建钱币产能
    HttpProtoMessageSender.prototype.SendCreateMoneySpawn = function (openid, moneyType, onSucceed, onFail) {
        var msg = new com.msg.c_CreateMoneySpawn_2030();
        msg.openId = openid;
        msg.moneyType = moneyType;
        var buffer = com.msg.c_CreateMoneySpawn_2030.encode(msg).finish();
        this.SendHttpMsg(EnumNetMessage.C_CreateMoneySpawn_2030, buffer, onSucceed, onFail);
        Log.Debug("http 发送 C_CreateMoneySpawn_2030:" + "openId: " + openid);
    };
    //更新钱币产能
    HttpProtoMessageSender.prototype.SendUpdateMoneySpawn = function (openid, spawnID, moneyDelta, onSucceed, onFail) {
        var msg = new com.msg.c_UpdateMoneySpawn_2032();
        msg.openId = openid;
        msg.spawnID = spawnID;
        msg.moneyDelta = moneyDelta;
        var buffer = com.msg.c_UpdateMoneySpawn_2032.encode(msg).finish();
        this.SendHttpMsg(EnumNetMessage.C_UpdateMoneySpawn_2032, buffer, onSucceed, onFail);
        Log.Debug("http 发送 C_UpdateMoneySpawn_2032:" + "openId: " + openid);
    };
    //收获钱币产能
    HttpProtoMessageSender.prototype.SendGainMoneySpawn = function (openid, spawnID, base, lucky, onSucceed, onFail) {
        var msg = new com.msg.c_GainMoneySpawn_2034();
        msg.openId = openid;
        msg.spawnID = spawnID;
        msg.base = base;
        msg.lucky = lucky;
        var buffer = com.msg.c_GainMoneySpawn_2034.encode(msg).finish();
        this.SendHttpMsg(EnumNetMessage.C_GainMoneySpawn_2034, buffer, onSucceed, onFail);
        Log.Debug("http 发送 C_GainMoneySpawn_2034:" + "openId: " + openid);
    };
    //移除钱币产能
    HttpProtoMessageSender.prototype.SendRemoveMoneySpawn = function (openid, spawnID, onSucceed, onFail) {
        var msg = new com.msg.c_RemoveMoneySpawn_2036();
        msg.openId = openid;
        msg.spawnID = spawnID;
        var buffer = com.msg.c_RemoveMoneySpawn_2036.encode(msg).finish();
        this.SendHttpMsg(EnumNetMessage.C_RemoveMoneySpawn_2036, buffer, onSucceed, onFail);
        Log.Debug("http 发送 C_RemoveMoneySpawn_2036:" + "openId: " + openid);
    };
    //因邀请进入游戏
    HttpProtoMessageSender.prototype.SendInvitedByFriend = function (openid, inviterOpenID, onSucceed, onFail) {
        var msg = new com.msg.c_InvitedByFriend_2040();
        msg.openId = openid;
        msg.inviterOpenID = inviterOpenID;
        var buffer = com.msg.c_InvitedByFriend_2040.encode(msg).finish();
        this.SendHttpMsg(EnumNetMessage.C_InvitedByFriend_2040, buffer, onSucceed, onFail);
        Log.Debug("http 发送 C_InvitedByFriend_2040:" + "openId: " + openid);
    };
    //查询邀请列表
    HttpProtoMessageSender.prototype.SendCheckInviteList = function (openid, onSucceed, onFail) {
        var msg = new com.msg.c_CheckInviteList_2042();
        msg.openId = openid;
        var buffer = com.msg.c_CheckInviteList_2042.encode(msg).finish();
        this.SendHttpMsg(EnumNetMessage.C_CheckInviteList_2042, buffer, onSucceed, onFail);
        Log.Debug("http 发送 C_CheckInviteList_2042:" + "openId: " + openid);
    };
    //领取邀请奖励
    HttpProtoMessageSender.prototype.SendGetInviteReward = function (openid, friendOpenId, onSucceed, onFail) {
        var msg = new com.msg.c_GetInviteReward_2044();
        msg.openId = openid;
        msg.friendOpenId = friendOpenId;
        var buffer = com.msg.c_GetInviteReward_2044.encode(msg).finish();
        this.SendHttpMsg(EnumNetMessage.C_GetInviteReward_2044, buffer, onSucceed, onFail);
        Log.Debug("http 发送 C_GetInviteReward_2044:" + "openId: " + openid);
    };
    //领取邀请、绑定奖励
    HttpProtoMessageSender.prototype.SendGetInviteVerifyReward = function (openid, friendOpenId, rewardType, onSucceed, onFail) {
        var msg = new com.msg.c_GetInviteVerifyReward_2046();
        msg.openId = openid;
        msg.friendOpenId = friendOpenId;
        msg.rewardType = rewardType;
        var buffer = com.msg.c_GetInviteVerifyReward_2046.encode(msg).finish();
        this.SendHttpMsg(EnumNetMessage.C_GetInviteVerifyReward_2046, buffer, onSucceed, onFail);
        Log.Debug("http 发送 C_GetInviteVerifyReward_2046:" + "openId: " + openid);
    };
    //倒计时周期结束，获取体力
    HttpProtoMessageSender.prototype.SendGainPointByTime = function (openid, onSucceed, onFail) {
        var msg = new com.msg.c_GainPointByTime_2050();
        msg.openId = openid;
        var buffer = com.msg.c_GainPointByTime_2050.encode(msg).finish();
        this.SendHttpMsg(EnumNetMessage.C_GainPointByTime_2050, buffer, onSucceed, onFail);
        Log.Debug("http 发送 C_GainPointByTime_2050:" + "openId: " + openid);
    };
    //比赛结束，获取体力
    HttpProtoMessageSender.prototype.SendGainPointByMatch = function (openid, curLevel, onSucceed, onFail) {
        var msg = new com.msg.c_GainPointByMatch_2052();
        msg.openId = openid;
        msg.curLevel = curLevel;
        var buffer = com.msg.c_GainPointByMatch_2052.encode(msg).finish();
        this.SendHttpMsg(EnumNetMessage.C_GainPointByMatch_2052, buffer, onSucceed, onFail);
        Log.Debug("http 发送 C_GainPointByMatch_2052:" + "openId: " + openid);
    };
    //关卡结算[点击继续战斗/领取奖励/十倍领取]
    HttpProtoMessageSender.prototype.SendMatchComplete = function (openId, completedLevel, goldReward, onSucceed, onFail) {
        var msg = new com.msg.c_MatchComplete_2100();
        msg.openId = openId;
        msg.completedLevel = completedLevel;
        msg.goldReward = goldReward;
        var buffer = com.msg.c_MatchComplete_2100.encode(msg).finish();
        this.SendHttpMsg(EnumNetMessage.C_MatchComplete_2100, buffer, onSucceed, onFail);
        Log.Debug("http 发送c_MatchComplete_2100:" + "openId: " + openId + "completedLevel: " + completedLevel + "goldReward: " + goldReward);
    };
    //比赛开始
    HttpProtoMessageSender.prototype.SendMatchStart = function (openId, onSucceed, onFail) {
        var msg = new com.msg.c_MatchStart_2101();
        msg.openId = openId;
        var buffer = com.msg.c_MatchStart_2101.encode(msg).finish();
        this.SendHttpMsg(EnumNetMessage.C_MatchStart_2101, buffer, onSucceed, onFail);
        Log.Debug("http 发送 C_MatchStart_2101:" + "openId: " + openId);
    };
    //获取短信验证码
    HttpProtoMessageSender.prototype.SendGetMessageVerifyCode = function (phoneNumber, onSucceed, onFail) {
        var msg = new com.msg.c_GetMessageVerifyCode_2200();
        msg.phoneNumber = phoneNumber;
        var buffer = com.msg.c_GetMessageVerifyCode_2200.encode(msg).finish();
        this.SendHttpMsg(EnumNetMessage.C_GetMessageVerifyCode_2200, buffer, onSucceed, onFail);
        Log.Debug("http 发送 C_GetMessageVerifyCode_2200:" + "phonenumber: " + phoneNumber);
    };
    //发送手机绑定
    HttpProtoMessageSender.prototype.SendCheckPhoneVerify = function (openId, phoneNumber, verifyCode, onSucceed, onFail) {
        var msg = new com.msg.c_CheckPhoneVerify_2202();
        msg.openId = openId;
        msg.phoneNumber = phoneNumber;
        msg.verifyCode = verifyCode;
        var buffer = com.msg.c_CheckPhoneVerify_2202.encode(msg).finish();
        this.SendHttpMsg(EnumNetMessage.C_CheckPhoneVerify_2202, buffer, onSucceed, onFail);
        Log.Debug("http 发送 C_CheckPhoneVerify_2202:" + "openId: " + openId);
    };
    //发送抽奖
    HttpProtoMessageSender.prototype.SendLottery = function (openId, onSucceed, onFail) {
        var msg = new com.msg.c_Lottery_2300();
        msg.openId = openId;
        var buffer = com.msg.c_Lottery_2300.encode(msg).finish();
        this.SendHttpMsg(EnumNetMessage.C_Lottery_2300, buffer, onSucceed, onFail);
        Log.Debug("http 发送 C_Lottery_2300:" + "openId: " + openId);
    };
    //发送查询抽奖历史信息
    HttpProtoMessageSender.prototype.SendCheckLotteryRewardHistroy = function (openId, pageIndex, histCount, onSucceed, onFail) {
        var msg = new com.msg.c_CheckLotteryRewardHistroy_2302();
        msg.openId = openId;
        msg.pageIndex = pageIndex;
        msg.histCount = histCount;
        var buffer = com.msg.c_CheckLotteryRewardHistroy_2302.encode(msg).finish();
        this.SendHttpMsg(EnumNetMessage.C_CheckLotteryRewardHistroy_2302, buffer, onSucceed, onFail);
        Log.Debug("http 发送 C_CheckLotteryRewardHistroy_2302:" + "openId: " + openId);
    };
    return HttpProtoMessageSender;
}(BaseMessageSender));
//# sourceMappingURL=HttpProtoMessageSender.js.map