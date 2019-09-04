/*
* name;
*/
var ConstDefine = (function () {
    function ConstDefine() {
    }
    ConstDefine.setScreenHeight = function () {
        this.screenHeigth = 1080 * (Laya.Browser.clientHeight / Laya.Browser.clientWidth);
    };
    Object.defineProperty(ConstDefine, "Common_PanelScaleUpTime", {
        ///////////////////动态配置常量///////////////////
        ///////////////////动态配置常量///////////////////
        /**通用UI——面板放大动画时间 */
        get: function () {
            var config = ConfigManager.GetInstance().GetConstConfig(EnumConstConfigType.Common_PanelScaleUpTime);
            return parseFloat(config.const);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConstDefine, "UpgradeUI_MainWeapon_ArrowAppearTime", {
        /**升级UI——主武器：箭头出现时间 */
        get: function () {
            var config = ConfigManager.GetInstance().GetConstConfig(EnumConstConfigType.UpgradeUI_MainWeapon_ArrowAppearTime);
            return parseFloat(config.const);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConstDefine, "UpgradeUI_MainWeapon_RightBoxAppearTime", {
        /**升级UI——主武器：右侧出现时间 */
        get: function () {
            var config = ConfigManager.GetInstance().GetConstConfig(EnumConstConfigType.UpgradeUI_MainWeapon_RightBoxAppearTime);
            return parseFloat(config.const);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConstDefine, "UpgradeUI_MainWeapon_EvolutionPauseTime", {
        /**升级UI——主武器：升阶停顿时间 */
        get: function () {
            var config = ConfigManager.GetInstance().GetConstConfig(EnumConstConfigType.UpgradeUI_MainWeapon_EvolutionPauseTime);
            return parseFloat(config.const);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConstDefine, "UpgradeUI_MainWeapon_EvolutionEndTime", {
        /**升级UI——主武器：升阶结束后，右侧左移时间 */
        get: function () {
            var config = ConfigManager.GetInstance().GetConstConfig(EnumConstConfigType.UpgradeUI_MainWeapon_EvolutionEndTime);
            return parseFloat(config.const);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConstDefine, "UpgradeUI_SubWeapon_SwitchTime", {
        /**升级UI——副武器：切换动画时间 */
        get: function () {
            var config = ConfigManager.GetInstance().GetConstConfig(EnumConstConfigType.UpgradeUI_SubWeapon_SwitchTime);
            return parseFloat(config.const);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConstDefine, "UpgradeUI_MainWeapon_BulletMaxNum", {
        /**升级UI——主武器：最大子弹数量 */
        get: function () {
            var config = ConfigManager.GetInstance().GetConstConfig(EnumConstConfigType.UpgradeUI_MainWeapon_BulletMaxNum);
            return parseInt(config.const);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConstDefine, "Common_PanelScaleBounceTime", {
        /**通用UI——面板放大回弹动画时间 */
        get: function () {
            var config = ConfigManager.GetInstance().GetConstConfig(EnumConstConfigType.Common_PanelScaleBounceTime);
            return parseFloat(config.const);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConstDefine, "Common_PanelScaleUpMax", {
        /**通用UI——面板放大动画极限尺寸 */
        get: function () {
            var config = ConfigManager.GetInstance().GetConstConfig(EnumConstConfigType.Common_PanelScaleUpMax);
            return parseFloat(config.const);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConstDefine, "SpawnTime_Coin", {
        /**主页UI——产能刷新间隔 */
        get: function () {
            var config = ConfigManager.GetInstance().GetConstConfig(EnumConstConfigType.HomepageUI_Spawn_RefreshIntervalTime);
            return parseFloat(config.const);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConstDefine, "SpawnTime_OverTime", {
        /**主页UI——产能上限时间 */
        get: function () {
            var config = ConfigManager.GetInstance().GetConstConfig(EnumConstConfigType.HomepageUI_Spawn_OverTime);
            return parseFloat(config.const);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConstDefine, "UpgradeUI_UpgradeEffectTime_Left", {
        /**升级UI——升级特效时间：左侧 */
        get: function () {
            var config = ConfigManager.GetInstance().GetConstConfig(EnumConstConfigType.UpgradeUI_UpgradeEffectTime_Left);
            return parseFloat(config.const);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConstDefine, "UpgradeUI_UpgradeEffectTime_Right", {
        /**升级UI——升级特效时间：右侧 */
        get: function () {
            var config = ConfigManager.GetInstance().GetConstConfig(EnumConstConfigType.UpgradeUI_UpgradeEffectTime_Right);
            return parseFloat(config.const);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConstDefine, "Plane_Homepage_Scale", {
        /**飞机——在主页时的缩放比 */
        get: function () {
            var config = ConfigManager.GetInstance().GetConstConfig(EnumConstConfigType.Plane_Homepage_Scale);
            return parseFloat(config.const);
        },
        enumerable: true,
        configurable: true
    });
    return ConstDefine;
}());
ConstDefine.SPAWN_MONSTER_NUM = 1;
ConstDefine.SPAWN_BULLET_NUM_PER_SECOND = 100;
ConstDefine.SWITCH_INPUT = true;
ConstDefine.PLAYER_INFO_STORE_IN_LOCAL = false; //offline
ConstDefine.USING_2D_ENGINE = true;
//HTTP/websocket连接设置
ConstDefine.HTTP_LOGIN = true; //如果是网络游戏, true:用http方式登录服务器 false:用websocket方式登录服务器
//http登录服务器 "http://192.168.1.8:8090/proto";//
ConstDefine.HTTP_LOGIN_SERVER = window["HTTP_LOGIN_SERVER"] ? window["HTTP_LOGIN_SERVER"] : "https://czll.bingodac.com/myUser/interface/"; //"http://mw6nzh.natappfree.cc/myUser/interface/"//
// public static HTTP_LOGIN_SERVER = window["HTTP_LOGIN_SERVER"] ? window["HTTP_LOGIN_SERVER"] : "http://mw6nzh.natappfree.cc/myUser/interface/"//
// public static HTTP_LOGIN_SERVER = window["HTTP_LOGIN_SERVER"] ? window["HTTP_LOGIN_SERVER"] : "http://192.168.31.45:8000/myUser/interface/"//
ConstDefine.WS_LOGIN_SERVER = ""; //websocket登录服务器. "ws://echo.websocket.org:80";
//HttpDummyMessageSender进行本地测试使用
ConstDefine.HTTP_OFFLINE = "local"; //赋值给HTTP_SERVER, 进行本地不联网测试http
ConstDefine.HTTP_OFFLINE_OPEN_ID = "HTTP_OFFLINE_OPEN_ID"; //http本地测试
ConstDefine.OFFLINE_PLAYER_ID = 100000011; //http本地测试离线玩家id
//本地设置.
ConstDefine.STORAGE_SETTINGS_MUSIC = "STORAGE_SETTINGS_MUSIC"; //音乐
ConstDefine.STORAGE_SETTINGS_SOUND = "STORAGE_SETTINGS_SOUND"; //音效
ConstDefine.STORAGE_SETTINGS_VIBRATE = "STORATE_SETTINGS_VIBRATE"; //震动
//结算时的十倍几率
ConstDefine.STORAGE_RESULT_LUCKY_CHANCE = "STORAGE_RESULT_LUCKY_CHANCE";
//结算时的十倍数量
ConstDefine.STORAGE_RESULT_LUCKY_NUM = "STORAGE_RESULT_LUCKY_NUM";
//结算时的十倍时间戳
ConstDefine.STORAGE_RESULT_LUCKY_TIME = "STORAGE_RESULT_LUCKY_TIME";
//领取产能时5/10倍概率
ConstDefine.STORAGE_MORE_SPAWN_CHANCE = "STORAGE_MORE_SPAWN_CHANCE";
//每天复活10次
ConstDefine.STORAGE_REBORN_NUM = "STORAGE_REBORN_NUM";
ConstDefine.STORAGE_REBORN_DATE = "STORAGE_REBORN_DATE";
//保存刷怪模板
ConstDefine.STORAGE_LEVEL_TEMPLATE_ID = "STORAGE_LEVEL_TEMPLATE_ID";
//本地记录产能相关数据
ConstDefine.STORAGE_SPAWN_MONEYNUM = "STORAGE_SPAWN_MONEYNUM";
ConstDefine.STORAGE_SPAWN_UPDATETIME = "STORAGE_SPAWN_UPDATETIME";
//本地记录是否成功解锁了新的副武器
ConstDefine.STORAGE_UNLOCK_NEW_SIDEWEAPON = "STORAGE_UNLOCK_NEW_SIDEWEAPON";
//本地记录上一次获取短信验证码的时间
ConstDefine.STORAGE_LAST_MESSAGEVERIFYTIME = "STORAGE_LAST_MESSAGEVERIFYTIME";
//本地记录上一次复活的关卡数
ConstDefine.STORAGE_LAST_REBORN_LEVLE = "STORAGE_LAST_REBORN_LEVLE";
ConstDefine.DEFAULT_USER_HEADER_URL = "res/texture/share/icon.png";
ConstDefine.DEFAULT_USER_NICKNAME = "DefaultName";
ConstDefine.CHILD_PLANE_CONFIG_ID = 8; //副武器子舰的配置ID
ConstDefine.PROP_PROBABILITY = 0.1; //道具刷新初始概率
ConstDefine.FIGHTBACK_BUFF_OFFSET = 10; //击退buff的击退距离
ConstDefine.ENLARGE_BUFF_SCALE = 3; //5;//巨化buff的变大参数
ConstDefine.MAIN_PLAYRE_CONFIG_ID = 0; //角色的配置id
ConstDefine.GOLD_BUFF_REWARD_SCALE = -1; //金币buff奖励倍数
//固定位置
ConstDefine.MoneyImgPos_Coin_Battle = { x: 217, y: 341 };
ConstDefine.MoneyImgPos_Coin = { x: 196, y: 128 + WechatUtil.getIntance().WechatTop() };
ConstDefine.MoneyImgPos_Power = { x: 460, y: 128 + WechatUtil.getIntance().WechatTop() };
ConstDefine.MoneyImgPos_Diamond = { x: 745, y: 128 + WechatUtil.getIntance().WechatTop() };
//音量相关
ConstDefine.Audio_Music_Volume = 0.45;
ConstDefine.Audio_Sound_Volume = 1;
//图标路径相关
//图片skin
ConstDefine.IconSkin_Coin = "resources/moneyinfo/img_icon_coin.png";
ConstDefine.IconSkin_Diamond = "resources/moneyinfo/img_icon_diamond.png";
ConstDefine.IconSkin_Power = "resources/moneyinfo/img_icon_power.png";
ConstDefine.IconSkin_Lottery = "resources/moneyinfo/img_icon_lottery.png";
/**背景移动速度-mb */
ConstDefine.bgSpeed = 3;
/////////////////////////////////////////////////
/**煽动翅膀的速度  */
ConstDefine.FLY_ANI_SPEED = 1;
///////////////////////////////////////////////////
/**数值增长速度 大于 0*/
ConstDefine.UI_CHANGE_SEEPD_GROW = 1;
/**最大速度 范围 大于0.1 */
ConstDefine.UI_CHANGE_SEEPD_MAX = 1;
///////////////////公式计算常量///////////////////
//钻石兑换金币，1:20k
// public static Exchange_Coin: number = 20000;
//钻石兑换体力，1:5
// public static Exchange_Power: number = 5;
//最大体力 100
ConstDefine.MaxValue_Power = 100;
//每5分钟体力恢复1
ConstDefine.PowerReviewTime = 300; //10//;
//产能周期时间 金币 1秒
// public static SpawnTime_Coin: number = 1;
//产能周期时间 钻石 1小时→3600秒
ConstDefine.SpawnTime_Diamond = 3600; //15;//
//产能极限时间 24小时→86400秒
// public static SpawnTime_OverTime: number = 86400;//20;//
//每日相关
//每日最多复活次数
ConstDefine.MaxValue_Reborn = 1;
//每日最多10次翻10倍奖励
ConstDefine.MaxValue_ResultLucky = 10;
//URL测试模式相关
ConstDefine.URL_MODE_FOR_TEST = false; //是否开启测试模式
//传入格式 url?key1=value1&key2=value2
ConstDefine.URL_MODE_KEY_Player_OpenId = "openId"; //传入的是玩家自己的OpenID
ConstDefine.URL_MODE_KEY_Inviter_OpenId = "inviter"; //传入的是邀请者的OpenID
ConstDefine.URL_MODE_KEY_LOGIN_URL = "loginServer";
ConstDefine.HP_BAR_DURATION = 10;
ConstDefine.REBORN_DURATION = 4; //复活无敌时间
ConstDefine.TAIL_ANIM_INTERVAL = 1 / 15 * 1000; //尾部动画的帧率 转毫秒
ConstDefine.USE_MODIFY = true;
ConstDefine.HIT_FX_PLAY_INTERVAL = 0.2; //受击特效播放间隔
ConstDefine.TEST_EFFICIENCY = false;
ConstDefine.BULLET_PER_SEC = 100;
ConstDefine.COLLISION_CHECK = true;
ConstDefine.INPUT_SWITCH = true;
ConstDefine.PLAYER_COLLISION = true;
//# sourceMappingURL=ConstDefine.js.map