var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*
* name;
*/
var LoginPlayerInfo = (function (_super) {
    __extends(LoginPlayerInfo, _super);
    function LoginPlayerInfo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(LoginPlayerInfo.prototype, "OpenID", {
        get: function () { return this.openID; },
        //微信id
        set: function (value) { this.openID = value; },
        enumerable: true,
        configurable: true
    });
    LoginPlayerInfo.prototype.Init = function (playerInfo) {
        _super.prototype.Init.call(this, playerInfo);
        this.netPlayerInfo = playerInfo;
        this.initLocalStorageData();
    };
    //初始化本地存储的数据
    LoginPlayerInfo.prototype.initLocalStorageData = function () {
    };
    //玩家头像信息, 服务器不返回玩家头像和昵称, 使用本地保存的头像信息
    LoginPlayerInfo.prototype.SetHeaderInfo = function (headerImage, nickName) {
        if (!headerImage) {
            Log.Error("设置玩家的头像Image为空!!!!");
        }
        if (!nickName) {
            Log.Error("设置玩家的昵称为空!!!!");
        }
        var headerInfo = new com.msg.wxInfo();
        headerInfo.imageUrl = headerImage; // ? headerImage : ConstDefine.DEFAULT_USER_HEADER_URL;
        headerInfo.nickName = nickName; // ? nickName : ConstDefine.DEFAULT_USER_NICKNAME;
        this.playerWxInfo = headerInfo;
    };
    Object.defineProperty(LoginPlayerInfo.prototype, "PlayerHeader", {
        get: function () {
            return this.playerWxInfo;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LoginPlayerInfo.prototype, "MoneyInfo", {
        /**
         * 钱币信息
         */
        get: function () {
            return this.netPlayerInfo.moneyInfo;
        },
        set: function (value) {
            // this.netPlayerInfo.moneyInfo = value;
            this.netPlayerInfo.moneyInfo = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LoginPlayerInfo.prototype, "MainWeaponInfo", {
        /**
         * 主武器信息
         */
        get: function () {
            return this.netPlayerInfo.playerWeaponInfo.mainWeapon;
        },
        set: function (mainWeapon) {
            this.netPlayerInfo.playerWeaponInfo.mainWeapon = mainWeapon;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LoginPlayerInfo.prototype, "CurSideWeaponID", {
        /**
         * 当前副武器ID
         */
        get: function () {
            return this.netPlayerInfo.playerWeaponInfo.curSideWeaponId;
        },
        set: function (sideWeaponID) {
            this.netPlayerInfo.playerWeaponInfo.curSideWeaponId = sideWeaponID;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LoginPlayerInfo.prototype, "CurSideWeaponInfo", {
        /**
         * 当前副武器信息
         */
        get: function () {
            var weapon = null;
            for (var i = 0; i < this.netPlayerInfo.playerWeaponInfo.sideWeapons.length; i++) {
                var element = this.netPlayerInfo.playerWeaponInfo.sideWeapons[i];
                if (element.id == this.netPlayerInfo.playerWeaponInfo.curSideWeaponId) {
                    weapon = element;
                    break;
                }
            }
            return weapon;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LoginPlayerInfo.prototype, "AllSideWeaponList", {
        /**
         * 已拥有的武器列表
         */
        get: function () {
            return this.netPlayerInfo.playerWeaponInfo.sideWeapons;
        },
        set: function (list) {
            this.netPlayerInfo.playerWeaponInfo.sideWeapons = list;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LoginPlayerInfo.prototype, "SpawnLvl", {
        /**
         * 金币与钻石产能等级
         */
        get: function () {
            return this.netPlayerInfo.playerWeaponInfo.spawnLvl;
        },
        set: function (lvl) {
            this.netPlayerInfo.playerWeaponInfo.spawnLvl = lvl;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LoginPlayerInfo.prototype, "InvitedList", {
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
        get: function () {
            return this.netPlayerInfo.inviteList;
        },
        set: function (value) {
            this.netPlayerInfo.inviteList = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LoginPlayerInfo.prototype, "CurLevel", {
        /**
         * 关卡信息
         */
        get: function () {
            return this.netPlayerInfo.levelInfo.latestUnCompeleteLevel;
        },
        set: function (value) {
            this.netPlayerInfo.levelInfo.latestUnCompeleteLevel = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LoginPlayerInfo.prototype, "VerifyInfo", {
        /**
         * 验证信息
         */
        get: function () {
            return this.netPlayerInfo.verifyInfo;
        },
        set: function (value) {
            this.netPlayerInfo.verifyInfo = value;
        },
        enumerable: true,
        configurable: true
    });
    return LoginPlayerInfo;
}(BasePlayerInfo));
//# sourceMappingURL=LoginPlayerInfo.js.map