/*
* 游戏动态数据管理
*/
var GameDataManager = (function () {
    function GameDataManager() {
        /**是否可观看广告**/
        this.canLookAdv = true;
        /**使用钻石复活几次 */
        this.useDiamBornTime = 0;
        this.serverLocalDeltaTime = 0; //服务器与本地的时间差，server - local
        //允许分享复活的总开关
        this.ShareEnable = false;
        //允许分享多倍的总开关
        this.LuckyEnable = false;
        //邀请列表功能切换开关
        this.InviteType = 0; //0旧功能 1新功能（有转盘）
        //绑定奖励数值
        this.VerifyReward = 100;
        //钻石兑换金币，1:20k
        this.Exchange_Coin = 20000;
        //钻石兑换体力，1:5
        this.Exchange_Power = 5;
        //短信息发送间隔
        this.VerifyColddown = 300;
    }
    GameDataManager.getInstance = function () {
        if (GameDataManager._instace == null) {
            GameDataManager._instace = new GameDataManager();
        }
        return GameDataManager._instace;
    };
    Object.defineProperty(GameDataManager.prototype, "PlatformData", {
        get: function () {
            return this.platformData;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameDataManager, "ShareQueryData", {
        get: function () {
            if (GameDataManager.shareQueryData == null)
                GameDataManager.shareQueryData = new ShareQueryData();
            return GameDataManager.shareQueryData;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameDataManager.prototype, "LoginPlayerInfo", {
        get: function () {
            return this.loginPlayerInfo;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameDataManager.prototype, "LevelInfo", {
        get: function () {
            return this.levelInfo;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameDataManager.prototype, "MatchInfo", {
        get: function () {
            return this.matchInfo;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameDataManager.prototype, "HallBg", {
        get: function () {
            return this.hallBg;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 数据初始化
     */
    GameDataManager.prototype.init = function () {
        this.platformData = new PlatformData();
        // this.shareQueryData = new ShareQueryData();
        this.loginPlayerInfo = new LoginPlayerInfo();
        this.levelInfo = new LevelInfo();
        this.levelInfo.OnInit();
        this.matchInfo = new MatchInfo();
        this.matchInfo.OnInit();
        this.protoOpenId = null;
        this.hallBg = Math.random() > 0.5 ? EnumSoundID.bg_hall_bgm : EnumSoundID.sound_bg_bg_01;
    };
    /**
     * 初始化玩家信息
     * @param openid 玩家平台id
     * @param playerInfo 玩家服务器信息
     */
    GameDataManager.prototype.InitLoginPlayer = function (openid, playerInfo) {
        this.loginPlayerInfo.OpenID = openid;
        this.loginPlayerInfo.Init(playerInfo);
    };
    //获取玩家ID
    GameDataManager.prototype.GetLoginPlayerID = function () {
        return this.loginPlayerInfo.GetPlayerID();
    };
    GameDataManager.prototype.OnMathEnter = function () {
        this.levelInfo.OnEnter();
        this.matchInfo.OnEnter();
        AttachDataCenter.Instance.OnEnterMatch();
    };
    GameDataManager.prototype.OnMatchExit = function () {
        this.levelInfo.OnExit();
        this.matchInfo.OnExit();
    };
    //当前选择副武器的等级
    GameDataManager.prototype.GetCurSideWeaponLvl = function () {
        return this.loginPlayerInfo.CurSideWeaponInfo.level;
    };
    /**设置登录时间戳，秒单位 */
    GameDataManager.prototype.InitServerLoginTime = function (loginTime) {
        this.serverLoginTime = loginTime;
    };
    Object.defineProperty(GameDataManager.prototype, "ServerLoginTime", {
        /**获取登录时间戳，秒单位 */
        get: function () {
            return this.serverLoginTime;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 设置服务器时间校准
     * @param serverNow 服务器now，秒单位
     */
    GameDataManager.prototype.InitServerLocalDeltaTime = function (serverNow) {
        this.serverLocalDeltaTime = serverNow - Math.floor(Date.now() / 1000);
    };
    Object.defineProperty(GameDataManager.prototype, "ServerNowTime", {
        /**获取服务器时间 */
        get: function () {
            return Math.floor(Date.now() / 1000) + this.serverLocalDeltaTime;
        },
        enumerable: true,
        configurable: true
    });
    //////////////////////////////////////////
    //服务器配置
    GameDataManager.prototype.InitServerConfig = function (config) {
        //2019-6-25 14:40:21 新需求 分享总开关
        this.ShareEnable = config.shareEnable == 1;
        //2019-7-14 18:40:21 新需求 多倍奖励总开关
        this.LuckyEnable = config.luckyEnable == 1;
        //2019-7-16 17:11:53 新需求 邀请功能新旧切换开关
        this.InviteType = config.inviteType;
        //2019-7-17 11:01:08 新需求 绑定奖励数值
        this.VerifyReward = config.verifyReward;
        //2019-7-17 11:01:49 新需求 钻石兑换可配置
        this.Exchange_Coin = config.exchange_Coin;
        this.Exchange_Power = config.exchange_Point;
        //2019-7-17 20:24:36 新需求 短信息发送间隔可配置
        this.VerifyColddown = config.verifyColddown;
    };
    return GameDataManager;
}());
//# sourceMappingURL=GameDataManager.js.map