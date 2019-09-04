var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*
* 离线单机处理Http
* 本地生成需要的返回消息, 立刻处理
*/
var HttpDummyMessageSender = (function (_super) {
    __extends(HttpDummyMessageSender, _super);
    function HttpDummyMessageSender() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HttpDummyMessageSender.prototype.SendHttpMsg = function (msgID, byteBuffer, onSucceed, onFail) {
        //离线测试
        HttpNetworkManager.GetInstance().onMessage(msgID, byteBuffer);
        // WebsocketNetworkManager.GetInstance().onMessage(msgID, byteBuffer)
        if (onSucceed)
            onSucceed();
    };
    //登录
    HttpDummyMessageSender.prototype.SendLogin = function (openid, imageUrl, nickname, onSucceed, onFail) {
        var playerInfo = CommonUtil.CreateOfflineDummyPlayerInfo(); //  this.CreateDummyPlayerInfo(openID, playerID, moveSpeed, highscore, skinID, trailID);
        var msg = new com.msg.s_userLogin_1001();
        msg.playerInfo = playerInfo;
        msg.playerInfo.openId = openid;
        msg.serverConfig = new com.msg.serverConfig();
        msg.serverConfig.shareEnable = 1;
        msg.serverConfig.luckyEnable = 1;
        msg.serverConfig.inviteType = 1;
        msg.serverConfig.verifyReward = 10;
        msg.serverConfig.exchange_Coin = 20;
        msg.serverConfig.exchange_Point = 10;
        msg.serverConfig.verifyColddown = 300;
        var buffer = com.msg.s_userLogin_1001.encode(msg).finish();
        this.SendHttpMsg(EnumNetMessage.S_UserLogin_1001, buffer, onSucceed, onFail);
        Log.Debug("http 本地测试 发送login:" + msg.playerInfo.openId);
    };
    //钻石兑换金币与体力
    HttpDummyMessageSender.prototype.SendExchangeWithDiamond = function (openid, type, diamondNum, onSucceed, onFail) {
        var msg = new com.msg.s_ExchangeWithDiamond_2001();
        msg.result = 1;
        msg.moneyInfo = GameDataManager.getInstance().LoginPlayerInfo.MoneyInfo;
        //假数据
        msg.moneyInfo.diamondNum -= diamondNum;
        switch (type) {
            case EnumDiamondExchangeType.Coin: {
                msg.moneyInfo.goldNum += GameDataUtil.DiamondExchange_Coin(diamondNum);
                break;
            }
            case EnumDiamondExchangeType.Power: {
                msg.moneyInfo.pointNum += GameDataUtil.DiamondExchange_Power(diamondNum);
                break;
            }
            default:
                break;
        }
        var buffer = com.msg.s_ExchangeWithDiamond_2001.encode(msg).finish();
        this.SendHttpMsg(EnumNetMessage.S_ExchangeWithDiamond_2001, buffer, onSucceed, onFail);
        Log.Debug("http 本地测试发送 S_ExchangeWithDiamond_2001:" + "openId: " + openid);
    };
    //升级武器
    HttpDummyMessageSender.prototype.SendUpgradeWeaopnLvl = function (openid, weaponID, curLvl, costGold, onSucceed, onFail) {
        var msg = new com.msg.s_UpgradeWeaponLvl_2011();
        msg.result = 1;
        msg.weaponID = weaponID;
        msg.newLvl = curLvl + 1;
        msg.totalGold = GameDataManager.getInstance().LoginPlayerInfo.MoneyInfo.goldNum -= costGold;
        var buffer = com.msg.s_UpgradeWeaponLvl_2011.encode(msg).finish();
        this.SendHttpMsg(EnumNetMessage.S_UpgradeWeaponLvl_2011, buffer, onSucceed, onFail);
        Log.Debug("http 本地测试发送 S_UpgradeWeaponLvl_2011:" + "openId: " + openid);
    };
    //升级产能
    HttpDummyMessageSender.prototype.SendUpgradeSpawnLvl = function (openid, curLvl, costGold, newGoldSpawnLvl, newDiamondSpawnLvl, onSucceed, onFail) {
        var msg = new com.msg.s_UpgradeSpawnLvl_2013();
        msg.result = 1;
        msg.newLvl = curLvl + 1;
        msg.totalGold = GameDataManager.getInstance().LoginPlayerInfo.MoneyInfo.goldNum -= costGold;
        var buffer = com.msg.s_UpgradeSpawnLvl_2013.encode(msg).finish();
        this.SendHttpMsg(EnumNetMessage.S_UpgradeSpawnLvl_2013, buffer, onSucceed, onFail);
        Log.Debug("http 本地测试发送 S_UpgradeSpawnLvl_2013:" + "openId: " + openid);
    };
    //升阶主武器
    HttpDummyMessageSender.prototype.SendWeaponEvolution = function (openid, weaponID, curEvolutionLvl, costGold, onSucceed, onFail) {
        var msg = new com.msg.s_WeaponEvolution_2015();
        msg.result = 1;
        msg.weaponID = weaponID;
        msg.newEvolutionLvl = curEvolutionLvl + 1;
        msg.totalGold = GameDataManager.getInstance().LoginPlayerInfo.MoneyInfo.goldNum -= costGold;
        var buffer = com.msg.s_WeaponEvolution_2015.encode(msg).finish();
        this.SendHttpMsg(EnumNetMessage.S_WeaponEvolution_2015, buffer, onSucceed, onFail);
        Log.Debug("http 本地测试发送 S_WeaponEvolution_2015:" + "openId: " + openid);
    };
    //更换副武器
    HttpDummyMessageSender.prototype.SendEquipSideWeapon = function (openid, sideWeaponID, onSucceed, onFail) {
        var msg = new com.msg.s_EquipSideWeapon_2021();
        msg.result = 1;
        msg.sideWeaponID = sideWeaponID;
        var buffer = com.msg.s_EquipSideWeapon_2021.encode(msg).finish();
        this.SendHttpMsg(EnumNetMessage.S_EquipSideWeapon_2021, buffer, onSucceed, onFail);
        Log.Debug("http 本地测试发送 S_EquipSideWeapon_2021:" + "openId: " + openid);
    };
    //解锁副武器
    HttpDummyMessageSender.prototype.SendUnlockSideWeapon = function (openid, sideWeaponID, onSucceed, onFail) {
        var msg = new com.msg.s_UnlockSideWeapon_2023();
        msg.result = 1;
        msg.sideWeaponInfo = new com.msg.weaponDetail();
        msg.sideWeaponInfo.id = sideWeaponID;
        msg.sideWeaponInfo.level = 1;
        var buffer = com.msg.s_UnlockSideWeapon_2023.encode(msg).finish();
        this.SendHttpMsg(EnumNetMessage.S_UnlockSideWeapon_2023, buffer, onSucceed, onFail);
        Log.Debug("http 本地测试发送 S_UnlockSideWeapon_2023:" + "openId: " + openid);
    };
    //创建钱币产能
    HttpDummyMessageSender.prototype.SendCreateMoneySpawn = function (openid, moneyType, onSucceed, onFail) {
        var msg = new com.msg.s_CreateMoneySpawn_2031();
        msg.result = 1;
        //假数据
        var newSpawnInfo = new com.msg.moneySpawnInfo();
        newSpawnInfo.moneyType = moneyType;
        newSpawnInfo.spawnType = 1; //正计时
        newSpawnInfo.moneyNum = 0;
        //时间戳
        newSpawnInfo.createTime = Math.floor(Date.now() / 1000);
        newSpawnInfo.latestPointRefreshTime = Math.floor(Date.now() / 1000);
        //假数据，创建的ID自+1（无视中间消失的ID
        var lastInfo = GameDataManager.getInstance().LoginPlayerInfo.MoneyInfo.spawnList[GameDataManager.getInstance().LoginPlayerInfo.MoneyInfo.spawnList.length - 1];
        if (lastInfo != null) {
            newSpawnInfo.spawnID = lastInfo.spawnID + 1;
        }
        else {
            newSpawnInfo.spawnID = 1;
        }
        msg.newSpawnInfo = newSpawnInfo;
        var buffer = com.msg.s_CreateMoneySpawn_2031.encode(msg).finish();
        this.SendHttpMsg(EnumNetMessage.S_CreateMoneySpawn_2031, buffer, onSucceed, onFail);
        // Log.Debug("http 本地测试发送 发送 S_CreateMoneySpawn_2031:" + "openId: " + openid);
    };
    //更新钱币产能
    HttpDummyMessageSender.prototype.SendUpdateMoneySpawn = function (openid, spawnID, moneyDelta, onSucceed, onFail) {
        var msg = new com.msg.s_UpdateMoneySpawn_2033();
        //假数据，从当前信息内直接查找
        var index = -1;
        for (var i = 0; i < GameDataManager.getInstance().LoginPlayerInfo.MoneyInfo.spawnList.length; i++) {
            var element = GameDataManager.getInstance().LoginPlayerInfo.MoneyInfo.spawnList[i];
            if (element.spawnID == spawnID) {
                index = i;
                break;
            }
        }
        if (index != -1) {
            msg.result = 1;
            msg.spawnInfo = GameDataManager.getInstance().LoginPlayerInfo.MoneyInfo.spawnList[index];
            if (msg.spawnInfo.moneyType == 1) {
                //金币产能
                if (msg.spawnInfo.moneyNum >= GameDataUtil.Spawn_Coin_Max(GameDataManager.getInstance().LoginPlayerInfo.SpawnLvl)) {
                    //达到单枚上限
                    //倒计时
                    msg.spawnInfo.spawnType = 2;
                }
                else {
                    //没有达到上限，继续叠加
                    msg.spawnInfo.moneyNum += GameDataUtil.Spawn_Coin(GameDataManager.getInstance().LoginPlayerInfo.SpawnLvl);
                    //再次判断，如果达到上限，则进入倒计时
                    if (msg.spawnInfo.moneyNum >= GameDataUtil.Spawn_Coin_Max(GameDataManager.getInstance().LoginPlayerInfo.SpawnLvl)) {
                        //达到单枚上限
                        //倒计时
                        msg.spawnInfo.spawnType = 2;
                    }
                }
            }
            else {
                //钻石产能
                if (msg.spawnInfo.moneyNum >= GameDataUtil.Spawn_Diamond_Max(GameDataManager.getInstance().LoginPlayerInfo.SpawnLvl)) {
                    //达到单枚上限
                    //倒计时
                    msg.spawnInfo.spawnType = 2;
                }
                else {
                    //没有达到上限，继续叠加
                    msg.spawnInfo.moneyNum += GameDataUtil.Spawn_Diamond(GameDataManager.getInstance().LoginPlayerInfo.SpawnLvl);
                    //再次判断，如果达到上限，则进入倒计时
                    if (msg.spawnInfo.moneyNum >= GameDataUtil.Spawn_Diamond_Max(GameDataManager.getInstance().LoginPlayerInfo.SpawnLvl)) {
                        //达到单枚上限
                        //倒计时
                        msg.spawnInfo.spawnType = 2;
                    }
                }
            }
            //更新时间
            msg.spawnInfo.latestPointRefreshTime = Math.floor(new Date().getTime() / 1000);
        }
        else {
            msg.result = 0;
        }
        var buffer = com.msg.s_UpdateMoneySpawn_2033.encode(msg).finish();
        this.SendHttpMsg(EnumNetMessage.S_UpdateMoneySpawn_2033, buffer, onSucceed, onFail);
        // Log.Debug("http 本地测试发送 发送 S_UpdateMoneySpawn_2033:" + "openId: " + openid);
    };
    //收获钱币产能
    HttpDummyMessageSender.prototype.SendGainMoneySpawn = function (openid, spawnID, base, lucky, onSucceed, onFail) {
        var msg = new com.msg.s_GainMoneySpawn_2035();
        //假数据，从当前信息内直接查找
        var curList = GameDataManager.getInstance().LoginPlayerInfo.MoneyInfo.spawnList;
        var aimSpawnInfoIndex = -1;
        for (var i = 0; i < curList.length; i++) {
            var element = curList[i];
            if (element.spawnID == spawnID) {
                aimSpawnInfoIndex = i;
                break;
            }
        }
        if (aimSpawnInfoIndex != -1) {
            msg.result = 1;
            msg.spawnInfo = GameDataManager.getInstance().LoginPlayerInfo.MoneyInfo.spawnList[aimSpawnInfoIndex];
            msg.spawnInfo.moneyNum = base * lucky;
        }
        else {
            msg.result = 0;
        }
        var buffer = com.msg.s_GainMoneySpawn_2035.encode(msg).finish();
        this.SendHttpMsg(EnumNetMessage.S_GainMoneySpawn_2035, buffer, onSucceed, onFail);
        // Log.Debug("http 本地测试发送 发送 S_GainMoneySpawn_2035:" + "openId: " + openid);
    };
    //移除钱币产能
    HttpDummyMessageSender.prototype.SendRemoveMoneySpawn = function (openid, spawnID, onSucceed, onFail) {
        var msg = new com.msg.s_RemoveMoneySpawn_2037();
        msg.result = 1;
        msg.spawnID = spawnID;
        var buffer = com.msg.s_RemoveMoneySpawn_2037.encode(msg).finish();
        this.SendHttpMsg(EnumNetMessage.S_RemoveMoneySpawn_2037, buffer, onSucceed, onFail);
        Log.Debug("http 本地测试发送 发送 S_RemoveMoneySpawn_2037:" + "openId: " + openid);
    };
    //因邀请进入游戏
    HttpDummyMessageSender.prototype.SendInvitedByFriend = function (openid, inviterOpenID, onSucceed, onFail) {
        var msg = new com.msg.s_InvitedByFriend_2041();
        msg.result = 1;
        var buffer = com.msg.s_InvitedByFriend_2041.encode(msg).finish();
        this.SendHttpMsg(EnumNetMessage.S_InvitedByFriend_2041, buffer, onSucceed, onFail);
        Log.Debug("http 本地测试发送 S_InvitedByFriend_2041:" + "openId: " + openid);
    };
    //查询邀请列表
    HttpDummyMessageSender.prototype.SendCheckInviteList = function (openid, onSucceed, onFail) {
        var msg = new com.msg.s_CheckInviteList_2043();
        msg.inviteList = GameDataManager.getInstance().LoginPlayerInfo.InvitedList;
        var buffer = com.msg.s_CheckInviteList_2043.encode(msg).finish();
        this.SendHttpMsg(EnumNetMessage.S_CheckInviteList_2043, buffer, onSucceed, onFail);
        Log.Debug("http 本地测试发送 S_CheckInviteList_2043:" + "openId: " + openid);
    };
    //领取邀请奖励
    HttpDummyMessageSender.prototype.SendGetInviteReward = function (openid, friendOpenId, onSucceed, onFail) {
        var msg = new com.msg.s_GetInviteReward_2045();
        var curList = GameDataManager.getInstance().LoginPlayerInfo.InvitedList;
        //能否领取
        var result = 0;
        for (var i = 0; i < curList.length; i++) {
            var element = curList[i];
            if (element.friendOpenID == friendOpenId) {
                result = 1;
                msg.rewardInfo = new com.msg.inviteDetail();
                msg.rewardInfo.friendOpenID = element.friendOpenID;
                msg.rewardInfo.index = element.index;
                msg.rewardInfo.picUrl = element.picUrl;
                msg.rewardInfo.rewardNum = element.rewardGained < 1 ? 10 : 1;
                msg.rewardInfo.rewardGained = 1;
                break;
            }
        }
        msg.result = result;
        var buffer = com.msg.s_GetInviteReward_2045.encode(msg).finish();
        this.SendHttpMsg(EnumNetMessage.S_GetInviteReward_2045, buffer, onSucceed, onFail);
        Log.Debug("http 本地测试发送 S_GetInviteReward_2045:" + "openId: " + openid);
    };
    //领取邀请、绑定奖励
    HttpDummyMessageSender.prototype.SendGetInviteVerifyReward = function (openid, friendOpenId, rewardType, onSucceed, onFail) {
        var msg = new com.msg.s_GetInviteVerifyReward_2047();
        var curList = GameDataManager.getInstance().LoginPlayerInfo.InvitedList;
        //能否领取
        var result = 0;
        for (var i = 0; i < curList.length; i++) {
            var element = curList[i];
            if (element.friendOpenID == friendOpenId) {
                result = 1;
                msg.firendInfo = new com.msg.inviteDetail();
                msg.firendInfo.friendOpenID = element.friendOpenID;
                msg.firendInfo.index = element.index;
                msg.firendInfo.picUrl = element.picUrl;
                msg.firendInfo.rewardNum = rewardType == 0 ? 10 : 1; //此处是个简易写法，实际上rewardType==3的时候应当是0
                msg.firendInfo.rewardGained = rewardType == 1 ? 2 : 3;
                msg.rewardNum = rewardType == 0 ? 10 : 1;
                break;
            }
        }
        msg.result = result;
        var buffer = com.msg.s_GetInviteVerifyReward_2047.encode(msg).finish();
        this.SendHttpMsg(EnumNetMessage.S_GetInviteVerifyReward_2047, buffer, onSucceed, onFail);
        Log.Debug("http 本地测试发送 S_GetInviteVerifyReward_2047:" + "openId: " + openid);
    };
    //倒计时周期结束，获取体力
    HttpDummyMessageSender.prototype.SendGainPointByTime = function (openid, onSucceed, onFail) {
        var msg = new com.msg.s_GainPointByTime_2051();
        msg.result = 1;
        msg.moneyInfo = GameDataManager.getInstance().LoginPlayerInfo.MoneyInfo;
        msg.moneyInfo.pointNum += 1;
        msg.moneyInfo.latestPointRefreshTime = Math.floor(Date.now() / 1000);
        var buffer = com.msg.s_GainPointByTime_2051.encode(msg).finish();
        this.SendHttpMsg(EnumNetMessage.S_GainPointByTime_2051, buffer, onSucceed, onFail);
        Log.Debug("http 本地测试发送 S_GainPointByTime_2051:" + "openId: " + openid);
    };
    //比赛结束，获取体力
    HttpDummyMessageSender.prototype.SendGainPointByMatch = function (openid, curLevel, onSucceed, onFail) {
        var msg = new com.msg.s_GainPointByMatch_2053();
        msg.result = 1;
        msg.pointNum = GameDataManager.getInstance().LoginPlayerInfo.MoneyInfo.pointNum;
        msg.pointNum += 5;
        if (msg.pointNum > 100) {
            msg.pointNum = 100;
        }
        var buffer = com.msg.s_GainPointByMatch_2053.encode(msg).finish();
        this.SendHttpMsg(EnumNetMessage.S_GainPointByMatch_2053, buffer, onSucceed, onFail);
        Log.Debug("http 本地测试发送 S_GainPointByMatch_2053:" + "openId: " + openid);
    };
    //关卡结算[点击继续战斗/领取奖励/十倍领取]
    HttpDummyMessageSender.prototype.SendMatchComplete = function (openId, completedLevel, goldReward, onSucceed, onFail) {
        var msg = new com.msg.s_MatchComplete_2100();
        msg.goldReward = goldReward;
        msg.latestUnCompletedLevelID = GameDataManager.getInstance().LoginPlayerInfo.CurLevel;
        if (completedLevel > 0) {
            var next = completedLevel + 1;
            if (ConfigManager.GetInstance().GetLevelConfig(next)) {
                msg.latestUnCompletedLevelID += 1;
            }
        }
        var buffer = com.msg.s_MatchComplete_2100.encode(msg).finish();
        this.SendHttpMsg(EnumNetMessage.S_MatchComplete_2100, buffer, onSucceed, onFail);
        Log.Debug("http 本地测试发送 s_MatchComplete_2100:" + "goldReward: " + goldReward);
    };
    //比赛开始
    HttpDummyMessageSender.prototype.SendMatchStart = function (openId, onSucceed, onFail) {
        var msg = new com.msg.s_MatchStart_2101();
        msg.curPoint = GameDataManager.getInstance().LoginPlayerInfo.MoneyInfo.pointNum;
        msg.result = msg.curPoint >= 5 ? 1 : 0;
        if (msg.curPoint == 100) {
            msg.latestPointRefreshTime = Math.floor(Date.now() / 1000);
        }
        msg.curPoint -= 5;
        var buffer = com.msg.s_MatchStart_2101.encode(msg).finish();
        this.SendHttpMsg(EnumNetMessage.S_MatchStart_2101, buffer, onSucceed, onFail);
        Log.Debug("http 本地测试发送 S_MatchStart_2101:" + "openId: " + openId);
    };
    //获取短信验证码
    HttpDummyMessageSender.prototype.SendGetMessageVerifyCode = function (phoneNumber, onSucceed, onFail) {
        var msg = new com.msg.s_GetMessageVerifyCode_2201();
        msg.result = 1;
        var buffer = com.msg.s_GetMessageVerifyCode_2201.encode(msg).finish();
        this.SendHttpMsg(EnumNetMessage.S_GetMessageVerifyCode_2201, buffer, onSucceed, onFail);
        Log.Debug("http 本地测试发送 S_GetMessageVerifyCode_2201:" + "phonenumber: " + phoneNumber);
    };
    //发送手机绑定
    HttpDummyMessageSender.prototype.SendCheckPhoneVerify = function (openId, phoneNumber, verifyCode, onSucceed, onFail) {
        var msg = new com.msg.s_CheckPhoneVerify_2203();
        msg.result = 1;
        msg.verifyReward = new com.msg.verifyInfo();
        msg.verifyReward.diamondNum = 1000;
        msg.verifyReward.lotteryNum = 1;
        var buffer = com.msg.s_CheckPhoneVerify_2203.encode(msg).finish();
        this.SendHttpMsg(EnumNetMessage.S_CheckPhoneVerify_2203, buffer, onSucceed, onFail);
        Log.Debug("http 本地测试发送 S_CheckPhoneVerify_2203:" + "openId: " + openId);
    };
    //发送抽奖
    HttpDummyMessageSender.prototype.SendLottery = function (openId, onSucceed, onFail) {
        var msg = new com.msg.s_Lottery_2301();
        msg.result = 0;
        msg.rewardConfigID = Math.floor(Math.random() * 12 + 1);
        var buffer = com.msg.s_Lottery_2301.encode(msg).finish();
        this.SendHttpMsg(EnumNetMessage.S_Lottery_2301, buffer, onSucceed, onFail);
        Log.Debug("http 本地测试发送 S_Lottery_2301:" + "openId: " + openId);
    };
    //发送查询抽奖历史信息
    HttpDummyMessageSender.prototype.SendCheckLotteryRewardHistroy = function (openId, pageIndex, histCount, onSucceed, onFail) {
        var msg = new com.msg.s_CheckLotteryRewardHistroy_2303();
        msg.result = 0;
        var buffer = com.msg.s_CheckLotteryRewardHistroy_2303.encode(msg).finish();
        this.SendHttpMsg(EnumNetMessage.S_CheckLotteryRewardHistroy_2303, buffer, onSucceed, onFail);
        Log.Debug("http 本地测试发送 S_CheckLotteryRewardHistroy_2303:" + "openId: " + openId);
    };
    return HttpDummyMessageSender;
}(BaseMessageSender));
//# sourceMappingURL=HttpDummyMessageSender.js.map