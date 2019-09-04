/*
* name;
*/
class ConstDefine {
    public static SPAWN_MONSTER_NUM = 1;
    public static SPAWN_BULLET_NUM_PER_SECOND = 100;
    public static SWITCH_INPUT = true;

    public static PLAYER_INFO_STORE_IN_LOCAL = false;//offline
    public static USING_2D_ENGINE = true;

    //HTTP/websocket连接设置
    public static HTTP_LOGIN = true; //如果是网络游戏, true:用http方式登录服务器 false:用websocket方式登录服务器
    //http登录服务器 "http://192.168.1.8:8090/proto";//
    public static HTTP_LOGIN_SERVER = window["HTTP_LOGIN_SERVER"] ? window["HTTP_LOGIN_SERVER"] : "https://czll.bingodac.com/myUser/interface/"//"http://mw6nzh.natappfree.cc/myUser/interface/"//
    // public static HTTP_LOGIN_SERVER = window["HTTP_LOGIN_SERVER"] ? window["HTTP_LOGIN_SERVER"] : "http://mw6nzh.natappfree.cc/myUser/interface/"//
    // public static HTTP_LOGIN_SERVER = window["HTTP_LOGIN_SERVER"] ? window["HTTP_LOGIN_SERVER"] : "http://192.168.31.45:8000/myUser/interface/"//

    public static WS_LOGIN_SERVER = ""; //websocket登录服务器. "ws://echo.websocket.org:80";

    //HttpDummyMessageSender进行本地测试使用
    public static HTTP_OFFLINE = "local" //赋值给HTTP_SERVER, 进行本地不联网测试http
    public static HTTP_OFFLINE_OPEN_ID = "HTTP_OFFLINE_OPEN_ID" //http本地测试
    public static OFFLINE_PLAYER_ID = 100000011;//http本地测试离线玩家id

    //本地设置.
    public static STORAGE_SETTINGS_MUSIC: string = "STORAGE_SETTINGS_MUSIC";        //音乐
    public static STORAGE_SETTINGS_SOUND: string = "STORAGE_SETTINGS_SOUND";        //音效
    public static STORAGE_SETTINGS_VIBRATE: string = "STORATE_SETTINGS_VIBRATE";    //震动
    //结算时的十倍几率
    public static STORAGE_RESULT_LUCKY_CHANCE: string = "STORAGE_RESULT_LUCKY_CHANCE";
    //结算时的十倍数量
    public static STORAGE_RESULT_LUCKY_NUM: string = "STORAGE_RESULT_LUCKY_NUM";
    //结算时的十倍时间戳

    public static STORAGE_RESULT_LUCKY_TIME: string = "STORAGE_RESULT_LUCKY_TIME";
    //领取产能时5/10倍概率
    public static STORAGE_MORE_SPAWN_CHANCE: string = "STORAGE_MORE_SPAWN_CHANCE";
    //每天复活10次
    public static STORAGE_REBORN_NUM: string = "STORAGE_REBORN_NUM";
    public static STORAGE_REBORN_DATE: string = "STORAGE_REBORN_DATE";
    //保存刷怪模板
    public static STORAGE_LEVEL_TEMPLATE_ID: string = "STORAGE_LEVEL_TEMPLATE_ID"
    //本地记录产能相关数据
    public static STORAGE_SPAWN_MONEYNUM: string = "STORAGE_SPAWN_MONEYNUM";
    public static STORAGE_SPAWN_UPDATETIME: string = "STORAGE_SPAWN_UPDATETIME";
    //本地记录是否成功解锁了新的副武器
    public static STORAGE_UNLOCK_NEW_SIDEWEAPON: string = "STORAGE_UNLOCK_NEW_SIDEWEAPON";
    //本地记录上一次获取短信验证码的时间
    public static STORAGE_LAST_MESSAGEVERIFYTIME: string = "STORAGE_LAST_MESSAGEVERIFYTIME";
    //本地记录上一次复活的关卡数
    public static STORAGE_LAST_REBORN_LEVLE: string = "STORAGE_LAST_REBORN_LEVLE";



    public static DEFAULT_USER_HEADER_URL = "res/texture/share/icon.png"
    public static DEFAULT_USER_NICKNAME = "DefaultName"


    public static CHILD_PLANE_CONFIG_ID = 8;//副武器子舰的配置ID
    public static PROP_PROBABILITY = 0.1;//道具刷新初始概率
    public static FIGHTBACK_BUFF_OFFSET = 10;//击退buff的击退距离
    public static ENLARGE_BUFF_SCALE = 3;//5;//巨化buff的变大参数
    public static MAIN_PLAYRE_CONFIG_ID = 0;//角色的配置id
    public static GOLD_BUFF_REWARD_SCALE = -1;//金币buff奖励倍数

    //固定位置
    public static MoneyImgPos_Coin_Battle = { x: 217, y: 341 };
    public static MoneyImgPos_Coin = { x: 196, y: 128 + WechatUtil.getIntance().WechatTop() };
    public static MoneyImgPos_Power = { x: 460, y: 128 + WechatUtil.getIntance().WechatTop() };
    public static MoneyImgPos_Diamond = { x: 745, y: 128 + WechatUtil.getIntance().WechatTop() };

    //音量相关
    public static Audio_Music_Volume = 0.45;
    public static Audio_Sound_Volume = 1;

    //图标路径相关
    //图片skin
    public static IconSkin_Coin = "resources/moneyinfo/img_icon_coin.png";
    public static IconSkin_Diamond = "resources/moneyinfo/img_icon_diamond.png";
    public static IconSkin_Power = "resources/moneyinfo/img_icon_power.png";
    public static IconSkin_Lottery = "resources/moneyinfo/img_icon_lottery.png";

    //////////////////////////////////////////////
    /**
     * 屏幕高度-mb
     */
    public static screenHeigth: number;
    public static setScreenHeight() {
        this.screenHeigth = 1080 * (Laya.Browser.clientHeight / Laya.Browser.clientWidth);
    }

    /**背景移动速度-mb */
    public static bgSpeed = 3;
    /////////////////////////////////////////////////
    /**煽动翅膀的速度  */
    public static FLY_ANI_SPEED: number = 1;

    ///////////////////////////////////////////////////
    /**数值增长速度 大于 0*/
    public static UI_CHANGE_SEEPD_GROW: number = 1;
    /**最大速度 范围 大于0.1 */
    public static UI_CHANGE_SEEPD_MAX: number = 1;

    ///////////////////动态配置常量///////////////////

    ///////////////////动态配置常量///////////////////

    /**通用UI——面板放大动画时间 */
    public static get Common_PanelScaleUpTime(): number {
        let config = ConfigManager.GetInstance().GetConstConfig(EnumConstConfigType.Common_PanelScaleUpTime);
        return parseFloat(config.const);
    }
    /**升级UI——主武器：箭头出现时间 */
    public static get UpgradeUI_MainWeapon_ArrowAppearTime(): number {
        let config = ConfigManager.GetInstance().GetConstConfig(EnumConstConfigType.UpgradeUI_MainWeapon_ArrowAppearTime);
        return parseFloat(config.const);
    }
    /**升级UI——主武器：右侧出现时间 */
    public static get UpgradeUI_MainWeapon_RightBoxAppearTime(): number {
        let config = ConfigManager.GetInstance().GetConstConfig(EnumConstConfigType.UpgradeUI_MainWeapon_RightBoxAppearTime);
        return parseFloat(config.const);
    }
    /**升级UI——主武器：升阶停顿时间 */
    public static get UpgradeUI_MainWeapon_EvolutionPauseTime(): number {
        let config = ConfigManager.GetInstance().GetConstConfig(EnumConstConfigType.UpgradeUI_MainWeapon_EvolutionPauseTime);
        return parseFloat(config.const);
    }
    /**升级UI——主武器：升阶结束后，右侧左移时间 */
    public static get UpgradeUI_MainWeapon_EvolutionEndTime(): number {
        let config = ConfigManager.GetInstance().GetConstConfig(EnumConstConfigType.UpgradeUI_MainWeapon_EvolutionEndTime);
        return parseFloat(config.const);
    }
    /**升级UI——副武器：切换动画时间 */
    public static get UpgradeUI_SubWeapon_SwitchTime(): number {
        let config = ConfigManager.GetInstance().GetConstConfig(EnumConstConfigType.UpgradeUI_SubWeapon_SwitchTime);
        return parseFloat(config.const);
    }
    /**升级UI——主武器：最大子弹数量 */
    public static get UpgradeUI_MainWeapon_BulletMaxNum(): number {
        let config = ConfigManager.GetInstance().GetConstConfig(EnumConstConfigType.UpgradeUI_MainWeapon_BulletMaxNum);
        return parseInt(config.const);
    }
    /**通用UI——面板放大回弹动画时间 */
    public static get Common_PanelScaleBounceTime(): number {
        let config = ConfigManager.GetInstance().GetConstConfig(EnumConstConfigType.Common_PanelScaleBounceTime);
        return parseFloat(config.const);
    }
    /**通用UI——面板放大动画极限尺寸 */
    public static get Common_PanelScaleUpMax(): number {
        let config = ConfigManager.GetInstance().GetConstConfig(EnumConstConfigType.Common_PanelScaleUpMax);
        return parseFloat(config.const);
    }
    /**主页UI——产能刷新间隔 */
    public static get SpawnTime_Coin(): number {
        let config = ConfigManager.GetInstance().GetConstConfig(EnumConstConfigType.HomepageUI_Spawn_RefreshIntervalTime);
        return parseFloat(config.const);
    }
    /**主页UI——产能上限时间 */
    public static get SpawnTime_OverTime(): number {
        let config = ConfigManager.GetInstance().GetConstConfig(EnumConstConfigType.HomepageUI_Spawn_OverTime);
        return parseFloat(config.const);
    }
    /**升级UI——升级特效时间：左侧 */
    public static get UpgradeUI_UpgradeEffectTime_Left(): number {
        let config = ConfigManager.GetInstance().GetConstConfig(EnumConstConfigType.UpgradeUI_UpgradeEffectTime_Left);
        return parseFloat(config.const);
    }
    /**升级UI——升级特效时间：右侧 */
    public static get UpgradeUI_UpgradeEffectTime_Right(): number {
        let config = ConfigManager.GetInstance().GetConstConfig(EnumConstConfigType.UpgradeUI_UpgradeEffectTime_Right);
        return parseFloat(config.const);
    }
    /**飞机——在主页时的缩放比 */
    public static get Plane_Homepage_Scale(): number {
        let config = ConfigManager.GetInstance().GetConstConfig(EnumConstConfigType.Plane_Homepage_Scale);
        return parseFloat(config.const);
    }
    ///////////////////公式计算常量///////////////////

    //钻石兑换金币，1:20k
    // public static Exchange_Coin: number = 20000;
    //钻石兑换体力，1:5
    // public static Exchange_Power: number = 5;

    //最大体力 100
    public static MaxValue_Power: number = 100;
    //每5分钟体力恢复1
    public static PowerReviewTime: number = 300//10//;

    //产能周期时间 金币 1秒
    // public static SpawnTime_Coin: number = 1;
    //产能周期时间 钻石 1小时→3600秒
    public static SpawnTime_Diamond: number = 3600;//15;//
    //产能极限时间 24小时→86400秒
    // public static SpawnTime_OverTime: number = 86400;//20;//

    //每日相关
    //每日最多复活次数
    public static MaxValue_Reborn: number = 1;
    //每日最多10次翻10倍奖励
    public static MaxValue_ResultLucky: number = 10;


    //URL测试模式相关
    public static URL_MODE_FOR_TEST = false;     //是否开启测试模式
    //传入格式 url?key1=value1&key2=value2
    public static URL_MODE_KEY_Player_OpenId = "openId";   //传入的是玩家自己的OpenID
    public static URL_MODE_KEY_Inviter_OpenId = "inviter";   //传入的是邀请者的OpenID
    public static URL_MODE_KEY_LOGIN_URL = "loginServer";

    public static HP_BAR_DURATION: number = 10;
    public static REBORN_DURATION: number = 4;//复活无敌时间
    public static TAIL_ANIM_INTERVAL: number = 1 / 15 * 1000; //尾部动画的帧率 转毫秒

    public static USE_MODIFY = true;

    public static HIT_FX_PLAY_INTERVAL = 0.2;//受击特效播放间隔

    public static TEST_EFFICIENCY = false;
    public static BULLET_PER_SEC = 100;
    public static COLLISION_CHECK = true;
    public static INPUT_SWITCH = true;
    public static PLAYER_COLLISION = true;
}