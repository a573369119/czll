/*
* 游戏动态数据管理
*/
class GameDataManager {
    private static _instace: GameDataManager;

    public static getInstance(): GameDataManager {
        if (GameDataManager._instace == null) {
            GameDataManager._instace = new GameDataManager();
        }
        return GameDataManager._instace;
    }

    /**是否可观看广告**/
    public canLookAdv: boolean = true;
    /**使用钻石复活几次 */
    public useDiamBornTime: number = 0;

    //平台数据临时保存
    private platformData: PlatformData;
    public get PlatformData(): PlatformData {
        return this.platformData;
    }

    //分享参数
    private static shareQueryData: ShareQueryData;
    public static get ShareQueryData(): ShareQueryData {
        if (GameDataManager.shareQueryData == null) GameDataManager.shareQueryData = new ShareQueryData();
        return GameDataManager.shareQueryData;
    }

    //游戏玩家相关
    private loginPlayerInfo: LoginPlayerInfo;
    public get LoginPlayerInfo(): LoginPlayerInfo {
        return this.loginPlayerInfo;
    }

    //关卡信息
    private levelInfo: LevelInfo;
    public get LevelInfo(): LevelInfo {
        return this.levelInfo;
    }
    //比赛信息
    private matchInfo: MatchInfo;
    public get MatchInfo(): MatchInfo {
        return this.matchInfo;
    }

    //通过Proto获取OpenId
    public protoOpenId: string;

    //大厅背景
    private hallBg: EnumSoundID;
    public get HallBg(): EnumSoundID {
        return this.hallBg;
    }

    /**
     * 数据初始化
     */
    public init() {
        this.platformData = new PlatformData();
        // this.shareQueryData = new ShareQueryData();
        this.loginPlayerInfo = new LoginPlayerInfo();
        this.levelInfo = new LevelInfo();
        this.levelInfo.OnInit();
        this.matchInfo = new MatchInfo();
        this.matchInfo.OnInit();
        this.protoOpenId = null;
        this.hallBg = Math.random() > 0.5 ? EnumSoundID.bg_hall_bgm : EnumSoundID.sound_bg_bg_01;
    }

    /**
     * 初始化玩家信息
     * @param openid 玩家平台id
     * @param playerInfo 玩家服务器信息
     */
    public InitLoginPlayer(openid: string, playerInfo: com.msg.playerInfo) {
        this.loginPlayerInfo.OpenID = openid;
        this.loginPlayerInfo.Init(playerInfo);
    }

    //获取玩家ID
    public GetLoginPlayerID(): string {
        return this.loginPlayerInfo.GetPlayerID();
    }

    public OnMathEnter() {
        this.levelInfo.OnEnter();
        this.matchInfo.OnEnter();
        AttachDataCenter.Instance.OnEnterMatch();
    }
    public OnMatchExit() {
        this.levelInfo.OnExit();
        this.matchInfo.OnExit();
    }

    //当前选择副武器的等级
    public GetCurSideWeaponLvl(): number {
        return this.loginPlayerInfo.CurSideWeaponInfo.level;
    }

    //////////////////////////////////////////
    //服务器相关时间戳 秒单位
    private serverLoginTime: number;            //服务器登录时间，用于计算离线产能
    private serverLocalDeltaTime: number = 0;   //服务器与本地的时间差，server - local
    /**设置登录时间戳，秒单位 */
    public InitServerLoginTime(loginTime: number) {
        this.serverLoginTime = loginTime;
    }
    /**获取登录时间戳，秒单位 */
    public get ServerLoginTime(): number {
        return this.serverLoginTime;
    }
    /**
     * 设置服务器时间校准
     * @param serverNow 服务器now，秒单位
     */
    public InitServerLocalDeltaTime(serverNow: number) {
        this.serverLocalDeltaTime = serverNow - Math.floor(Date.now() / 1000);
    }
    /**获取服务器时间 */
    public get ServerNowTime(): number {
        return Math.floor(Date.now() / 1000) + this.serverLocalDeltaTime;
    }

    //////////////////////////////////////////
    //服务器配置
    public InitServerConfig(config: com.msg.serverConfig) {
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

    }
    //允许分享复活的总开关
    public ShareEnable: boolean = false;
    //允许分享多倍的总开关
    public LuckyEnable: boolean = false;
    //邀请列表功能切换开关
    public InviteType: number = 0;      //0旧功能 1新功能（有转盘）
    //绑定奖励数值
    public VerifyReward: number = 100;
    //钻石兑换金币，1:20k
    public Exchange_Coin: number = 20000;
    //钻石兑换体力，1:5
    public Exchange_Power: number = 5;
    //短信息发送间隔
    public VerifyColddown: number = 300;
}