/*
* name;
*/
class LoginPlayerInfo extends BasePlayerInfo {
    private netPlayerInfo: com.msg.playerInfo;//服务器保存信息
    private playerWxInfo: com.msg.wxInfo; //玩家微信头像,昵称信息
    protected openID: string; //微信小游戏本地获取openid

    //微信id
    public set OpenID(value: string) { this.openID = value; }
    public get OpenID(): string { return this.openID; }

    public Init(playerInfo: com.msg.playerInfo) {
        super.Init(playerInfo);
        this.netPlayerInfo = playerInfo;
        this.initLocalStorageData();
    }

    //初始化本地存储的数据
    private initLocalStorageData() {

    }

    //玩家头像信息, 服务器不返回玩家头像和昵称, 使用本地保存的头像信息
    public SetHeaderInfo(headerImage: string, nickName: string) {
        if (!headerImage) {
            Log.Error("设置玩家的头像Image为空!!!!")
        }
        if (!nickName) {
            Log.Error("设置玩家的昵称为空!!!!")
        }
        let headerInfo = new com.msg.wxInfo();
        headerInfo.imageUrl = headerImage;// ? headerImage : ConstDefine.DEFAULT_USER_HEADER_URL;
        headerInfo.nickName = nickName;// ? nickName : ConstDefine.DEFAULT_USER_NICKNAME;
        this.playerWxInfo = headerInfo;
    }

    public get PlayerHeader(): com.msg.wxInfo {
        return this.playerWxInfo;
    }

    /**
     * 钱币信息
     */
    public get MoneyInfo(): com.msg.ImoneyInfo {
        return this.netPlayerInfo.moneyInfo;
    }
    public set MoneyInfo(value: com.msg.ImoneyInfo) {
        // this.netPlayerInfo.moneyInfo = value;
        this.netPlayerInfo.moneyInfo = value;
    }

    /**
     * 主武器信息
     */
    public get MainWeaponInfo(): com.msg.IweaponDetail {
        return this.netPlayerInfo.playerWeaponInfo.mainWeapon;
    }
    public set MainWeaponInfo(mainWeapon: com.msg.IweaponDetail) {
        this.netPlayerInfo.playerWeaponInfo.mainWeapon = mainWeapon;
    }

    /**
     * 当前副武器ID
     */
    public get CurSideWeaponID(): number {
        return this.netPlayerInfo.playerWeaponInfo.curSideWeaponId;
    }
    public set CurSideWeaponID(sideWeaponID: number) {
        this.netPlayerInfo.playerWeaponInfo.curSideWeaponId = sideWeaponID;
    }

    /**
     * 当前副武器信息
     */
    public get CurSideWeaponInfo(): com.msg.IweaponDetail {
        let weapon: com.msg.weaponDetail = null;
        for (var i = 0; i < this.netPlayerInfo.playerWeaponInfo.sideWeapons.length; i++) {
            var element = this.netPlayerInfo.playerWeaponInfo.sideWeapons[i];
            if (element.id == this.netPlayerInfo.playerWeaponInfo.curSideWeaponId) {
                weapon = element;
                break;
            }
        }
        return weapon;
    }

    /**
     * 已拥有的武器列表
     */
    public get AllSideWeaponList(): Array<com.msg.IweaponDetail> {
        return this.netPlayerInfo.playerWeaponInfo.sideWeapons;
    }
    public set AllSideWeaponList(list: Array<com.msg.IweaponDetail>) {
        this.netPlayerInfo.playerWeaponInfo.sideWeapons = list;
    }

    /**
     * 金币与钻石产能等级
     */
    public get SpawnLvl(): number {
        return this.netPlayerInfo.playerWeaponInfo.spawnLvl;
    }
    public set SpawnLvl(lvl: number) {
        this.netPlayerInfo.playerWeaponInfo.spawnLvl = lvl;
    }
    // public get CoinSpawnLvl(): number {
    //     return this.netPlayerInfo.playerWeaponInfo.goldSpawnLvl;
    // }
    // public set CoinSpawnLvl(lvl: number) {
    //     this.netPlayerInfo.playerWeaponInfo.goldSpawnLvl = lvl;
    // }
    // public get DiamondSpawnLvl(): number {
    //     return this.netPlayerInfo.playerWeaponInfo.diamondSpawnLvl;
    // }
    // public set DiamondSpawnLvl(lvl: number) {
    //     this.netPlayerInfo.playerWeaponInfo.diamondSpawnLvl = lvl;
    // }


    /**
     * 邀请列表
     */
    public get InvitedList(): Array<com.msg.IinviteDetail> {
        return this.netPlayerInfo.inviteList;
    }
    public set InvitedList(value: Array<com.msg.IinviteDetail>) {
        this.netPlayerInfo.inviteList = value;
    }

    /**
     * 关卡信息
     */
    public get CurLevel(): number {
        return this.netPlayerInfo.levelInfo.latestUnCompeleteLevel;
    }
    public set CurLevel(value: number) {
        this.netPlayerInfo.levelInfo.latestUnCompeleteLevel = value;
    }

    /**
     * 验证信息
     */
    public get VerifyInfo(): com.msg.verifyInfo {
        return this.netPlayerInfo.verifyInfo;
    }
    public set VerifyInfo(value: com.msg.verifyInfo) {
        this.netPlayerInfo.verifyInfo = value;
    }

}