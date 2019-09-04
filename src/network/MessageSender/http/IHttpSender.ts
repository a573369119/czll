/*
* name;
*/
interface IHttpSender {
    //登录
    SendLogin(openid: string, imageUrl: string, nickname: string, onSucceed?: Function, onFail?: Function)

    //钻石兑换金币与体力
    SendExchangeWithDiamond(openid: string, type: EnumDiamondExchangeType, diamondNum: number, onSucceed?: Function, onFail?: Function);

    //升级武器
    SendUpgradeWeaopnLvl(openid: string, weaponID: number, curLvl: number, costGold: number, onSucceed?: Function, onFail?: Function);

    //升级产能
    SendUpgradeSpawnLvl(openid: string, curLvl: number, costGold: number, newGoldSpawnLvl: number, newDiamondSpawnLvl: number, onSucceed?: Function, onFail?: Function);

    //升阶武器
    SendWeaponEvolution(openid: string, weaponID: number, curEvolutionLvl: number, costGold: number, onSucceed?: Function, onFail?: Function)

    //装备副武器
    SendEquipSideWeapon(openid: string, sideWeaponID: number, onSucceed?: Function, onFail?: Function);

    //解锁副武器
    SendUnlockSideWeapon(openid: string, sideWeaponID: number, onSucceed?: Function, onFail?: Function);

    //创建钱币产能
    SendCreateMoneySpawn(openid: string, moneyType: EnumMoneyType, onSucceed?: Function, onFail?: Function);

    //更新钱币产能
    SendUpdateMoneySpawn(openid: string, spawnID: number, moneyDelta: number, onSucceed?: Function, onFail?: Function);

    //收获钱币产能
    SendGainMoneySpawn(openid: string, spawnID: number, base: number, lucky: number, onSucceed?: Function, onFail?: Function);

    //移除钱币产能
    SendRemoveMoneySpawn(openid: string, spawnID: number, onSucceed?: Function, onFail?: Function);

    //因邀请进入游戏
    SendInvitedByFriend(openid: string, inviterOpenID: string, onSucceed?: Function, onFail?: Function);

    //查询邀请列表
    SendCheckInviteList(openid: string, onSucceed?: Function, onFail?: Function);

    //领取邀请奖励
    SendGetInviteReward(openid: string, friendOpenId: string, onSucceed?: Function, onFail?: Function);

    //领取邀请、绑定奖励
    SendGetInviteVerifyReward(openid: string, friendOpenId: string, rewardType: number, onSucceed?: Function, onFail?: Function);

    //计时结束，获取体力
    SendGainPointByTime(openid: string, onSucceed?: Function, onFail?: Function);

    //比赛结束，获取体力
    SendGainPointByMatch(openid: string, curLevel: number, onSucceed?: Function, onFail?: Function);

    //比赛结算
    SendMatchComplete(openId: string, completedLevel: number, goldReward: number, onSucceed?: Function, onFail?: Function)

    //比赛开始
    SendMatchStart(openId: string, onSucceed?: Function, onFail?: Function);

    //获取短信验证码
    SendGetMessageVerifyCode(phoneNumber: number, onSucceed?: Function, onFail?: Function)

    //发送手机绑定
    SendCheckPhoneVerify(openId: string, phoneNumber: number, verifyCode: number, onSucceed?: Function, onFail?: Function)

    //发送抽奖
    SendLottery(openId: string, onSucceed?: Function, onFail?: Function)

    //发送查询抽奖历史信息
    SendCheckLotteryRewardHistroy(openId: string, pageIndex: number, histCount: number, onSucceed?: Function, onFail?: Function)
}