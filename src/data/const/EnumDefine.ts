
enum EnumWechatEnterScene {
    ShareFromFriend = 1007,//单人聊天会话中的小程序消息卡片
    ShareFromGroup = 1008,//群聊会话中的小程序消息卡片
    QRScan = 1011,//扫二维码
    QRFromPic = 1012, //长按图片识别二维码
    ShareFromGroupWithShareTicket = 1044,// 带 shareTicket 的小程序消息卡片
    WechatDroplist = 1089,// 微信聊天主界面下拉，「最近使用」栏（基础库2.2.4版本起包含「我的小程序」栏）
}

enum EnumCollisionShape {
    Box,
    Circle,
    Sector, //扇形
}

enum EnumMatchState {
    Enter,
    Start,
    Pause,
    Complete,
    Exit,
}

enum EnumSpawnCheckResult {
    None,
    SpawnCurGroup,//可以刷新当前波次的怪
    SpawnNextGroup,//可刷下一波
}

/**
* 钻石兑换的类型
*/
enum EnumDiamondExchangeType {
    Coin = 1,   //金币
    Power = 2   //体力
}

/**
 * 武器升级类型
 */
enum EnumWeaopnUpgradeType {
    Speed = 1,      //射速
    Intensity = 2,  //火力
}

/**
 * 钱币类型
 */
enum EnumMoneyType {
    Coin = 1,       //金币产能
    Diamond = 2,    //钻石产能
}



/**
 * 计数缩写
 */
enum EnumNumberTally {
    None = 0,
    K = 1,
    M = 2,
    G = 3,
    T = 4,
    P = 5,
    E = 6,
    Z = 7,
    Y = 8,
    B = 9,
    N = 10,
    D = 11
}

//spine动画配置id
enum EnumSpineConfigID {
    // SkillMissileFire = 1,   //导弹发射
    SkillMissileExplode = 2,//导弹发射爆炸
    Laser = 3,//蛇形激光
    Guard = 4,//钢铁守卫
    MagnetDisturb = 5,//电磁干扰
    MagnetDisturbPrepare = 6,//电磁干扰蓄力
    ElectricNet = 7, //电网
    MonsterHealSelf, //怪物治愈自己
    MonsterHealOther,//怪物治愈友军
    MonsterPrepareExplosion,//怪物自爆前准备
    MonsterExplosion,//怪物自爆
    MonsterBringMoney,//送钱怪物
    BeHurt = 21,//被攻击
}

//副武器配置id
enum EnumSideWeaponType {
    Missile = 2,   //导弹发射
    Laser = 3,//蛇形激光
    Guard = 4,//钢铁守卫
    MagnetDisturb = 5,//电磁干扰
    ChildPlane = 6, //子母
    ElectricNet = 7, //电网
}

//游戏物体状态:角色,怪物, 道具, 子弹
enum EnumPlayerState {
    Live, //存活
    Die,  //死亡/回收
}

//子弹外观配置表id
enum EnumBulletOutLookType {
    None = 0,   //空状态
    MainPlayerBullet = 1,  //
    MonsterBullet = 2,//怪物子弹
    ChildPlaneBullet = 3,//技能子母舰子弹
    MainPlayerBullet_PowerBuff = 4, //火力强化后
    MainPlayerBullet_FightBackBuff = 5, //击退buff
    MainPlayerBullet_GoldBuffs = 6, //点石成金
    MISSILE_WEAPON_BULLET = 7, //导弹副武器
    // MainPlayerBullet_SpeedBuff = 7, //速度强化

    // MainPlayerBullet_PowerAndBackBuff = 8, //火力+击退
    // MainPlayerBullet_PowerAndGoldBuff = 9, //火力+点石
    // MainPlayerBullet_BackAndGoldBuff = 10, //点石+击退
    // MainPlayerBullet_3Buff = 11, //3种buff都有s
    // MainPlayerBullet_Through = 12//穿透子弹
}

//buff配置表id
enum EnumBuffType {
    FireSpeedIntensified = 1,//强化射速
    PowerIntensified,// 强化火力
    CallAlliance,// 呼叫支援
    FightBack,// 击退射击
    Weaken,// 弱化病毒
    BulletThrough,// 穿透子弹
    Gold,// 点石成金
    Enlarge,// 巨化病毒
    LimitInput,// 限制移动
    MagnetFreezen,// 电磁干绕麻痹状态

}

//道具类型
enum EnumPropType {
    FireSpeedIntensified = 1,//强化射速
    PowerIntensified,// 强化火力
    CallAlliance,// 呼叫支援
    FightBack,// 击退射击
    Weaken,// 弱化病毒
    BulletThrough,// 穿透子弹
    Gold,// 点石成金
    Enlarge,// 巨化病毒
    LimitInput = 9,// 限制移动
}

enum EnumMonsterPowerType {
    ScaleUp = 1,//膨胀
    Healing,//治愈
    Explosion,//自爆
    Split, //分裂
    Attach,//吸附
    Spawn, //生产
    FollowPlayer,//追踪
    Attack,//主动攻击
    BringMoney,
}

enum EnumSoundID {
    sound_bg_bg_01 = 1,
    sound_fight_bullet_01,
    sound_fight_bullet_crash,
    sound_fight_bullet_02,
    sound_fight_bullet_03,
    sound_fight_bullet_04,
    sound_fight_buff_01,
    sound_fight_buff_02,
    sound_fight_monster_gold,
    sound_fight_monster_01,
    sound_fight_warcraft_boom,
    sound_fight_hint_01,
    sound_fight_hint_02,
    sound_fight_succeed,
    sound_fight_ten_award,
    sound_fight_guided_01,
    sound_fight_guided_02,
    sound_fight_laser,
    sound_fight_bounce,
    sound_fight_warship,
    sound_fight_netting,
    sound_function_touch_01,
    sound_function_touch_02,
    sound_function_gold_01,
    sound_function_upgrade_01,
    sound_function_diamonds_01,
    sound_function_energy_01,
    bg_hall_bgm,
    bg_fight1,
    bg_fight2,
    bg_bossfight,
    sound_fight_defeat = 32,
    sound_function_numberup,
    sound_function_planepass,
    sound_function_touch_03//6.0新加
}

enum EnumBuffEffectType {
    Buff = 1,
    Debuff = 2,
}


enum EnumFormulaType {
    MonsterBlood = 1,
    MonsterGold,
    GoldUpgrade,
    DiamondUpgrade,
    MainWeaponUpgradeCost,
    MainWeaponBulletPower,
    SideWeaponUpgradeCost1 = 7,
    SideWeaponUpgradeCost2,
    SideWeaponUpgradeCost3,
    SideWeaponUpgradeCost4,
    SideWeaponUpgradeCost5,
    SideWeaponUpgradeCost6,
    SideWeaponBulletPower1 = 13,
    SideWeaponBulletPower2,
    SideWeaponBulletPower3,
    SideWeaponBulletPower4,
    SideWeaponBulletPower5,
    SideWeaponBulletPower6,
    MonsterTotalLevel = 19,
    MonsterTotalLevel2,
    MonsterTotalLevel3,
    MonsterTotalLevel4,
    MonsterTotalLevel5,
    MonsterTotalLevel6,
    MonsterScale = 25,
    SpawnUpgradeCost = 26,
}

enum EnumLevelUIAnimType {
    HomePage = 1,   //主页，直接显示
    Battle = 2,     //战斗面板，直接显示
    Result_Win = 3,     //结算面板，胜利，切换到下一个
    Result_Lose = 4,    //结算面板，失败，直接显示
}

//游戏结束方式
enum EnumCompleteType {
    None = 0,       //初始状态，无含义
    Continue = 1,   //领取奖励，进入下一关
    Finish = 2,     //领取奖励，返回主页
    Lucky = 3,      //十倍奖励，返回主页
    Replay = 4,     //领取奖励，重新进行这一关
}

//打开升级面板的方式
enum EnumUpgradeUIType {
    Main = 0,       //主武器升级
    Sub = 1,        //副武器升级
    Money = 2,      //产能升级
}

//配合常量配置表使用
enum EnumConstConfigType {
    /**通用UI——面板放大动画时间 */
    Common_PanelScaleUpTime = 0,
    /**升级UI——主武器：箭头出现时间 */
    UpgradeUI_MainWeapon_ArrowAppearTime = 1,
    /**升级UI——主武器：右侧出现时间 */
    UpgradeUI_MainWeapon_RightBoxAppearTime = 2,
    /**升级UI——主武器：升阶停顿时间 */
    UpgradeUI_MainWeapon_EvolutionPauseTime = 3,
    /**升级UI——主武器：升阶结束后，右侧左移时间 */
    UpgradeUI_MainWeapon_EvolutionEndTime = 4,
    /**升级UI——副武器：切换动画时间 */
    UpgradeUI_SubWeapon_SwitchTime = 5,
    /**升级UI——主武器：最大子弹数量 */
    UpgradeUI_MainWeapon_BulletMaxNum = 6,
    /**通用UI——面板放大回弹动画时间 */
    Common_PanelScaleBounceTime = 7,
    /**通用UI——面板放大动画极限尺寸 */
    Common_PanelScaleUpMax = 8,
    /**主页UI——产能刷新间隔 */
    HomepageUI_Spawn_RefreshIntervalTime = 9,
    /**主页UI——产能极限时间 */
    HomepageUI_Spawn_OverTime = 10,
    /**升级UI——升级特效时间：左侧 */
    UpgradeUI_UpgradeEffectTime_Left = 11,
    /**升级UI——升级特效时间：右侧 */
    UpgradeUI_UpgradeEffectTime_Right = 12,
    /**飞机——在主页时的缩放比 */
    Plane_Homepage_Scale = 13,
}