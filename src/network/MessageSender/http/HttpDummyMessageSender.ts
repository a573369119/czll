/*
* 离线单机处理Http
* 本地生成需要的返回消息, 立刻处理
*/
class HttpDummyMessageSender extends BaseMessageSender implements IHttpSender {


    public SendHttpMsg(msgID: number, byteBuffer: Uint8Array, onSucceed: Function, onFail: Function) {
        //离线测试
        HttpNetworkManager.GetInstance().onMessage(msgID, byteBuffer)
        // WebsocketNetworkManager.GetInstance().onMessage(msgID, byteBuffer)
        if (onSucceed) onSucceed();
    }

    //登录
    public SendLogin(openid: string, imageUrl: string, nickname: string, onSucceed?: Function, onFail?: Function) {

        let playerInfo = CommonUtil.CreateOfflineDummyPlayerInfo();//  this.CreateDummyPlayerInfo(openID, playerID, moveSpeed, highscore, skinID, trailID);

        let msg = new com.msg.s_userLogin_1001();
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

        let buffer = com.msg.s_userLogin_1001.encode(msg).finish();
        this.SendHttpMsg(EnumNetMessage.S_UserLogin_1001, buffer, onSucceed, onFail)
        Log.Debug("http 本地测试 发送login:" + msg.playerInfo.openId);
    }

    //钻石兑换金币与体力
    public SendExchangeWithDiamond(openid: string, type: EnumDiamondExchangeType, diamondNum: number, onSucceed?: Function, onFail?: Function) {
        let msg = new com.msg.s_ExchangeWithDiamond_2001();
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
        let buffer = com.msg.s_ExchangeWithDiamond_2001.encode(msg).finish();
        this.SendHttpMsg(EnumNetMessage.S_ExchangeWithDiamond_2001, buffer, onSucceed, onFail)
        Log.Debug("http 本地测试发送 S_ExchangeWithDiamond_2001:" + "openId: " + openid);
    }

    //升级武器
    public SendUpgradeWeaopnLvl(openid: string, weaponID: number, curLvl: number, costGold: number, onSucceed?: Function, onFail?: Function) {
        let msg = new com.msg.s_UpgradeWeaponLvl_2011();
        msg.result = 1;
        msg.weaponID = weaponID;
        msg.newLvl = curLvl + 1;
        msg.totalGold = GameDataManager.getInstance().LoginPlayerInfo.MoneyInfo.goldNum -= costGold;

        let buffer = com.msg.s_UpgradeWeaponLvl_2011.encode(msg).finish();
        this.SendHttpMsg(EnumNetMessage.S_UpgradeWeaponLvl_2011, buffer, onSucceed, onFail)
        Log.Debug("http 本地测试发送 S_UpgradeWeaponLvl_2011:" + "openId: " + openid);
    }

    //升级产能
    public SendUpgradeSpawnLvl(openid: string, curLvl: number, costGold: number, newGoldSpawnLvl: number, newDiamondSpawnLvl: number, onSucceed?: Function, onFail?: Function) {
        let msg = new com.msg.s_UpgradeSpawnLvl_2013();
        msg.result = 1;
        msg.newLvl = curLvl + 1;
        msg.totalGold = GameDataManager.getInstance().LoginPlayerInfo.MoneyInfo.goldNum -= costGold;

        let buffer = com.msg.s_UpgradeSpawnLvl_2013.encode(msg).finish();
        this.SendHttpMsg(EnumNetMessage.S_UpgradeSpawnLvl_2013, buffer, onSucceed, onFail)
        Log.Debug("http 本地测试发送 S_UpgradeSpawnLvl_2013:" + "openId: " + openid);
    }

    //升阶主武器
    public SendWeaponEvolution(openid: string, weaponID: number, curEvolutionLvl: number, costGold: number, onSucceed?: Function, onFail?: Function) {
        let msg = new com.msg.s_WeaponEvolution_2015();
        msg.result = 1;
        msg.weaponID = weaponID;
        msg.newEvolutionLvl = curEvolutionLvl + 1;
        msg.totalGold = GameDataManager.getInstance().LoginPlayerInfo.MoneyInfo.goldNum -= costGold;

        let buffer = com.msg.s_WeaponEvolution_2015.encode(msg).finish();
        this.SendHttpMsg(EnumNetMessage.S_WeaponEvolution_2015, buffer, onSucceed, onFail)
        Log.Debug("http 本地测试发送 S_WeaponEvolution_2015:" + "openId: " + openid);
    }

    //更换副武器
    public SendEquipSideWeapon(openid: string, sideWeaponID: number, onSucceed?: Function, onFail?: Function) {
        let msg = new com.msg.s_EquipSideWeapon_2021();
        msg.result = 1;
        msg.sideWeaponID = sideWeaponID;

        let buffer = com.msg.s_EquipSideWeapon_2021.encode(msg).finish();
        this.SendHttpMsg(EnumNetMessage.S_EquipSideWeapon_2021, buffer, onSucceed, onFail)
        Log.Debug("http 本地测试发送 S_EquipSideWeapon_2021:" + "openId: " + openid);

    }

    //解锁副武器
    public SendUnlockSideWeapon(openid: string, sideWeaponID: number, onSucceed?: Function, onFail?: Function) {
        let msg = new com.msg.s_UnlockSideWeapon_2023();
        msg.result = 1;
        msg.sideWeaponInfo = new com.msg.weaponDetail();
        msg.sideWeaponInfo.id = sideWeaponID;
        msg.sideWeaponInfo.level = 1;

        let buffer = com.msg.s_UnlockSideWeapon_2023.encode(msg).finish();
        this.SendHttpMsg(EnumNetMessage.S_UnlockSideWeapon_2023, buffer, onSucceed, onFail)
        Log.Debug("http 本地测试发送 S_UnlockSideWeapon_2023:" + "openId: " + openid);
    }

    //创建钱币产能
    public SendCreateMoneySpawn(openid: string, moneyType: EnumMoneyType, onSucceed?: Function, onFail?: Function) {
        let msg = new com.msg.s_CreateMoneySpawn_2031();
        msg.result = 1;
        //假数据
        let newSpawnInfo = new com.msg.moneySpawnInfo();
        newSpawnInfo.moneyType = moneyType;
        newSpawnInfo.spawnType = 1;     //正计时
        newSpawnInfo.moneyNum = 0;
        //时间戳
        newSpawnInfo.createTime = Math.floor(Date.now() / 1000);
        newSpawnInfo.latestPointRefreshTime = Math.floor(Date.now() / 1000);

        //假数据，创建的ID自+1（无视中间消失的ID
        let lastInfo = GameDataManager.getInstance().LoginPlayerInfo.MoneyInfo.spawnList[GameDataManager.getInstance().LoginPlayerInfo.MoneyInfo.spawnList.length - 1];
        if (lastInfo != null) {
            newSpawnInfo.spawnID = lastInfo.spawnID + 1;
        } else {
            newSpawnInfo.spawnID = 1;
        }
        msg.newSpawnInfo = newSpawnInfo;

        let buffer = com.msg.s_CreateMoneySpawn_2031.encode(msg).finish();
        this.SendHttpMsg(EnumNetMessage.S_CreateMoneySpawn_2031, buffer, onSucceed, onFail)
        // Log.Debug("http 本地测试发送 发送 S_CreateMoneySpawn_2031:" + "openId: " + openid);
    }

    //更新钱币产能
    public SendUpdateMoneySpawn(openid: string, spawnID: number, moneyDelta: number, onSucceed?: Function, onFail?: Function) {
        let msg = new com.msg.s_UpdateMoneySpawn_2033();
        //假数据，从当前信息内直接查找
        let index = -1;
        for (let i = 0; i < GameDataManager.getInstance().LoginPlayerInfo.MoneyInfo.spawnList.length; i++) {
            let element = GameDataManager.getInstance().LoginPlayerInfo.MoneyInfo.spawnList[i];
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
                } else {
                    //没有达到上限，继续叠加
                    msg.spawnInfo.moneyNum += GameDataUtil.Spawn_Coin(GameDataManager.getInstance().LoginPlayerInfo.SpawnLvl);
                    //再次判断，如果达到上限，则进入倒计时
                    if (msg.spawnInfo.moneyNum >= GameDataUtil.Spawn_Coin_Max(GameDataManager.getInstance().LoginPlayerInfo.SpawnLvl)) {
                        //达到单枚上限
                        //倒计时
                        msg.spawnInfo.spawnType = 2;
                    }
                }
            } else {
                //钻石产能
                if (msg.spawnInfo.moneyNum >= GameDataUtil.Spawn_Diamond_Max(GameDataManager.getInstance().LoginPlayerInfo.SpawnLvl)) {
                    //达到单枚上限
                    //倒计时
                    msg.spawnInfo.spawnType = 2;
                } else {
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
        } else {
            msg.result = 0;
        }

        let buffer = com.msg.s_UpdateMoneySpawn_2033.encode(msg).finish();
        this.SendHttpMsg(EnumNetMessage.S_UpdateMoneySpawn_2033, buffer, onSucceed, onFail)
        // Log.Debug("http 本地测试发送 发送 S_UpdateMoneySpawn_2033:" + "openId: " + openid);
    }

    //收获钱币产能
    public SendGainMoneySpawn(openid: string, spawnID: number, base: number, lucky: number, onSucceed?: Function, onFail?: Function) {
        let msg = new com.msg.s_GainMoneySpawn_2035();
        //假数据，从当前信息内直接查找
        let curList = GameDataManager.getInstance().LoginPlayerInfo.MoneyInfo.spawnList;
        let aimSpawnInfoIndex: number = -1;
        for (let i = 0; i < curList.length; i++) {
            let element = curList[i];
            if (element.spawnID == spawnID) {
                aimSpawnInfoIndex = i;
                break;
            }
        }
        if (aimSpawnInfoIndex != -1) {
            msg.result = 1;
            msg.spawnInfo = GameDataManager.getInstance().LoginPlayerInfo.MoneyInfo.spawnList[aimSpawnInfoIndex];
            msg.spawnInfo.moneyNum = base * lucky;
        } else {
            msg.result = 0;
        }

        let buffer = com.msg.s_GainMoneySpawn_2035.encode(msg).finish();
        this.SendHttpMsg(EnumNetMessage.S_GainMoneySpawn_2035, buffer, onSucceed, onFail)
        // Log.Debug("http 本地测试发送 发送 S_GainMoneySpawn_2035:" + "openId: " + openid);
    }

    //移除钱币产能
    public SendRemoveMoneySpawn(openid: string, spawnID: number, onSucceed?: Function, onFail?: Function) {
        let msg = new com.msg.s_RemoveMoneySpawn_2037();
        msg.result = 1;
        msg.spawnID = spawnID

        let buffer = com.msg.s_RemoveMoneySpawn_2037.encode(msg).finish();
        this.SendHttpMsg(EnumNetMessage.S_RemoveMoneySpawn_2037, buffer, onSucceed, onFail)
        Log.Debug("http 本地测试发送 发送 S_RemoveMoneySpawn_2037:" + "openId: " + openid);
    }

    //因邀请进入游戏
    public SendInvitedByFriend(openid: string, inviterOpenID: string, onSucceed?: Function, onFail?: Function) {
        let msg = new com.msg.s_InvitedByFriend_2041();
        msg.result = 1;

        let buffer = com.msg.s_InvitedByFriend_2041.encode(msg).finish();
        this.SendHttpMsg(EnumNetMessage.S_InvitedByFriend_2041, buffer, onSucceed, onFail)
        Log.Debug("http 本地测试发送 S_InvitedByFriend_2041:" + "openId: " + openid);
    }

    //查询邀请列表
    public SendCheckInviteList(openid: string, onSucceed?: Function, onFail?: Function) {
        let msg = new com.msg.s_CheckInviteList_2043();
        msg.inviteList = GameDataManager.getInstance().LoginPlayerInfo.InvitedList;

        let buffer = com.msg.s_CheckInviteList_2043.encode(msg).finish();
        this.SendHttpMsg(EnumNetMessage.S_CheckInviteList_2043, buffer, onSucceed, onFail)
        Log.Debug("http 本地测试发送 S_CheckInviteList_2043:" + "openId: " + openid);
    }

    //领取邀请奖励
    public SendGetInviteReward(openid: string, friendOpenId: string, onSucceed?: Function, onFail?: Function) {
        let msg = new com.msg.s_GetInviteReward_2045();
        let curList = GameDataManager.getInstance().LoginPlayerInfo.InvitedList;
        //能否领取
        let result: number = 0;
        for (let i = 0; i < curList.length; i++) {
            let element = curList[i];
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

        let buffer = com.msg.s_GetInviteReward_2045.encode(msg).finish();
        this.SendHttpMsg(EnumNetMessage.S_GetInviteReward_2045, buffer, onSucceed, onFail)
        Log.Debug("http 本地测试发送 S_GetInviteReward_2045:" + "openId: " + openid);
    }

    //领取邀请、绑定奖励
    public SendGetInviteVerifyReward(openid: string, friendOpenId: string, rewardType: number, onSucceed?: Function, onFail?: Function) {
        let msg = new com.msg.s_GetInviteVerifyReward_2047();
        let curList = GameDataManager.getInstance().LoginPlayerInfo.InvitedList;
        //能否领取
        let result: number = 0;
        for (let i = 0; i < curList.length; i++) {
            let element = curList[i];
            if (element.friendOpenID == friendOpenId) {
                result = 1;
                msg.firendInfo = new com.msg.inviteDetail();
                msg.firendInfo.friendOpenID = element.friendOpenID;
                msg.firendInfo.index = element.index;
                msg.firendInfo.picUrl = element.picUrl;
                msg.firendInfo.rewardNum = rewardType == 0 ? 10 : 1;    //此处是个简易写法，实际上rewardType==3的时候应当是0
                msg.firendInfo.rewardGained = rewardType == 1 ? 2 : 3;
                msg.rewardNum = rewardType == 0 ? 10 : 1;
                break;
            }
        }
        msg.result = result;

        let buffer = com.msg.s_GetInviteVerifyReward_2047.encode(msg).finish();
        this.SendHttpMsg(EnumNetMessage.S_GetInviteVerifyReward_2047, buffer, onSucceed, onFail)
        Log.Debug("http 本地测试发送 S_GetInviteVerifyReward_2047:" + "openId: " + openid);
    }


    //倒计时周期结束，获取体力
    public SendGainPointByTime(openid: string, onSucceed?: Function, onFail?: Function) {
        let msg = new com.msg.s_GainPointByTime_2051();
        msg.result = 1;
        msg.moneyInfo = GameDataManager.getInstance().LoginPlayerInfo.MoneyInfo;
        msg.moneyInfo.pointNum += 1;
        msg.moneyInfo.latestPointRefreshTime = Math.floor(Date.now() / 1000);

        let buffer = com.msg.s_GainPointByTime_2051.encode(msg).finish();
        this.SendHttpMsg(EnumNetMessage.S_GainPointByTime_2051, buffer, onSucceed, onFail)
        Log.Debug("http 本地测试发送 S_GainPointByTime_2051:" + "openId: " + openid);
    }

    //比赛结束，获取体力
    public SendGainPointByMatch(openid: string, curLevel: number, onSucceed?: Function, onFail?: Function) {
        let msg = new com.msg.s_GainPointByMatch_2053();
        msg.result = 1;
        msg.pointNum = GameDataManager.getInstance().LoginPlayerInfo.MoneyInfo.pointNum;
        msg.pointNum += 5;
        if (msg.pointNum > 100) {
            msg.pointNum = 100;
        }

        let buffer = com.msg.s_GainPointByMatch_2053.encode(msg).finish();
        this.SendHttpMsg(EnumNetMessage.S_GainPointByMatch_2053, buffer, onSucceed, onFail)
        Log.Debug("http 本地测试发送 S_GainPointByMatch_2053:" + "openId: " + openid);
    }

    //关卡结算[点击继续战斗/领取奖励/十倍领取]
    public SendMatchComplete(openId: string, completedLevel: number, goldReward: number, onSucceed?: Function, onFail?: Function) {
        let msg = new com.msg.s_MatchComplete_2100();
        msg.goldReward = goldReward;
        msg.latestUnCompletedLevelID = GameDataManager.getInstance().LoginPlayerInfo.CurLevel;
        if (completedLevel > 0) {
            let next = completedLevel + 1;
            if (ConfigManager.GetInstance().GetLevelConfig(next)) {
                msg.latestUnCompletedLevelID += 1;
            }
        }
        var buffer = com.msg.s_MatchComplete_2100.encode(msg).finish();
        this.SendHttpMsg(EnumNetMessage.S_MatchComplete_2100, buffer, onSucceed, onFail)
        Log.Debug("http 本地测试发送 s_MatchComplete_2100:" + "goldReward: " + goldReward);
    }

    //比赛开始
    public SendMatchStart(openId: string, onSucceed?: Function, onFail?: Function) {
        let msg = new com.msg.s_MatchStart_2101();
        msg.curPoint = GameDataManager.getInstance().LoginPlayerInfo.MoneyInfo.pointNum;
        msg.result = msg.curPoint >= 5 ? 1 : 0;
        if (msg.curPoint == 100) {
            msg.latestPointRefreshTime = Math.floor(Date.now() / 1000);
        }
        msg.curPoint -= 5;

        var buffer = com.msg.s_MatchStart_2101.encode(msg).finish();
        this.SendHttpMsg(EnumNetMessage.S_MatchStart_2101, buffer, onSucceed, onFail)
        Log.Debug("http 本地测试发送 S_MatchStart_2101:" + "openId: " + openId);
    }


    //获取短信验证码
    public SendGetMessageVerifyCode(phoneNumber: number, onSucceed?: Function, onFail?: Function) {
        let msg = new com.msg.s_GetMessageVerifyCode_2201();
        msg.result = 1;

        var buffer = com.msg.s_GetMessageVerifyCode_2201.encode(msg).finish();
        this.SendHttpMsg(EnumNetMessage.S_GetMessageVerifyCode_2201, buffer, onSucceed, onFail)
        Log.Debug("http 本地测试发送 S_GetMessageVerifyCode_2201:" + "phonenumber: " + phoneNumber);
    }

    //发送手机绑定
    public SendCheckPhoneVerify(openId: string, phoneNumber: number, verifyCode: number, onSucceed?: Function, onFail?: Function) {
        let msg = new com.msg.s_CheckPhoneVerify_2203();
        msg.result = 1;
        msg.verifyReward = new com.msg.verifyInfo();
        msg.verifyReward.diamondNum = 1000;
        msg.verifyReward.lotteryNum = 1;

        var buffer = com.msg.s_CheckPhoneVerify_2203.encode(msg).finish();
        this.SendHttpMsg(EnumNetMessage.S_CheckPhoneVerify_2203, buffer, onSucceed, onFail)
        Log.Debug("http 本地测试发送 S_CheckPhoneVerify_2203:" + "openId: " + openId);
    }


    //发送抽奖
    public SendLottery(openId: string, onSucceed?: Function, onFail?: Function) {
        let msg = new com.msg.s_Lottery_2301();
        msg.result = 0;
        msg.rewardConfigID = Math.floor(Math.random() * 12 + 1);

        var buffer = com.msg.s_Lottery_2301.encode(msg).finish();
        this.SendHttpMsg(EnumNetMessage.S_Lottery_2301, buffer, onSucceed, onFail)
        Log.Debug("http 本地测试发送 S_Lottery_2301:" + "openId: " + openId);
    }

    //发送查询抽奖历史信息
    public SendCheckLotteryRewardHistroy(openId: string, pageIndex: number, histCount: number, onSucceed?: Function, onFail?: Function) {
        let msg = new com.msg.s_CheckLotteryRewardHistroy_2303();
        msg.result = 0;

        var buffer = com.msg.s_CheckLotteryRewardHistroy_2303.encode(msg).finish();
        this.SendHttpMsg(EnumNetMessage.S_CheckLotteryRewardHistroy_2303, buffer, onSucceed, onFail)
        Log.Debug("http 本地测试发送 S_CheckLotteryRewardHistroy_2303:" + "openId: " + openId);
    }

}