var EnumWechatEnterScene;
(function (EnumWechatEnterScene) {
    EnumWechatEnterScene[EnumWechatEnterScene["ShareFromFriend"] = 1007] = "ShareFromFriend";
    EnumWechatEnterScene[EnumWechatEnterScene["ShareFromGroup"] = 1008] = "ShareFromGroup";
    EnumWechatEnterScene[EnumWechatEnterScene["QRScan"] = 1011] = "QRScan";
    EnumWechatEnterScene[EnumWechatEnterScene["QRFromPic"] = 1012] = "QRFromPic";
    EnumWechatEnterScene[EnumWechatEnterScene["ShareFromGroupWithShareTicket"] = 1044] = "ShareFromGroupWithShareTicket";
    EnumWechatEnterScene[EnumWechatEnterScene["WechatDroplist"] = 1089] = "WechatDroplist";
})(EnumWechatEnterScene || (EnumWechatEnterScene = {}));
var EnumCollisionShape;
(function (EnumCollisionShape) {
    EnumCollisionShape[EnumCollisionShape["Box"] = 0] = "Box";
    EnumCollisionShape[EnumCollisionShape["Circle"] = 1] = "Circle";
    EnumCollisionShape[EnumCollisionShape["Sector"] = 2] = "Sector";
})(EnumCollisionShape || (EnumCollisionShape = {}));
var EnumMatchState;
(function (EnumMatchState) {
    EnumMatchState[EnumMatchState["Enter"] = 0] = "Enter";
    EnumMatchState[EnumMatchState["Start"] = 1] = "Start";
    EnumMatchState[EnumMatchState["Pause"] = 2] = "Pause";
    EnumMatchState[EnumMatchState["Complete"] = 3] = "Complete";
    EnumMatchState[EnumMatchState["Exit"] = 4] = "Exit";
})(EnumMatchState || (EnumMatchState = {}));
var EnumSpawnCheckResult;
(function (EnumSpawnCheckResult) {
    EnumSpawnCheckResult[EnumSpawnCheckResult["None"] = 0] = "None";
    EnumSpawnCheckResult[EnumSpawnCheckResult["SpawnCurGroup"] = 1] = "SpawnCurGroup";
    EnumSpawnCheckResult[EnumSpawnCheckResult["SpawnNextGroup"] = 2] = "SpawnNextGroup";
})(EnumSpawnCheckResult || (EnumSpawnCheckResult = {}));
/**
* 钻石兑换的类型
*/
var EnumDiamondExchangeType;
(function (EnumDiamondExchangeType) {
    EnumDiamondExchangeType[EnumDiamondExchangeType["Coin"] = 1] = "Coin";
    EnumDiamondExchangeType[EnumDiamondExchangeType["Power"] = 2] = "Power"; //体力
})(EnumDiamondExchangeType || (EnumDiamondExchangeType = {}));
/**
 * 武器升级类型
 */
var EnumWeaopnUpgradeType;
(function (EnumWeaopnUpgradeType) {
    EnumWeaopnUpgradeType[EnumWeaopnUpgradeType["Speed"] = 1] = "Speed";
    EnumWeaopnUpgradeType[EnumWeaopnUpgradeType["Intensity"] = 2] = "Intensity";
})(EnumWeaopnUpgradeType || (EnumWeaopnUpgradeType = {}));
/**
 * 钱币类型
 */
var EnumMoneyType;
(function (EnumMoneyType) {
    EnumMoneyType[EnumMoneyType["Coin"] = 1] = "Coin";
    EnumMoneyType[EnumMoneyType["Diamond"] = 2] = "Diamond";
})(EnumMoneyType || (EnumMoneyType = {}));
/**
 * 计数缩写
 */
var EnumNumberTally;
(function (EnumNumberTally) {
    EnumNumberTally[EnumNumberTally["None"] = 0] = "None";
    EnumNumberTally[EnumNumberTally["K"] = 1] = "K";
    EnumNumberTally[EnumNumberTally["M"] = 2] = "M";
    EnumNumberTally[EnumNumberTally["G"] = 3] = "G";
    EnumNumberTally[EnumNumberTally["T"] = 4] = "T";
    EnumNumberTally[EnumNumberTally["P"] = 5] = "P";
    EnumNumberTally[EnumNumberTally["E"] = 6] = "E";
    EnumNumberTally[EnumNumberTally["Z"] = 7] = "Z";
    EnumNumberTally[EnumNumberTally["Y"] = 8] = "Y";
    EnumNumberTally[EnumNumberTally["B"] = 9] = "B";
    EnumNumberTally[EnumNumberTally["N"] = 10] = "N";
    EnumNumberTally[EnumNumberTally["D"] = 11] = "D";
})(EnumNumberTally || (EnumNumberTally = {}));
//spine动画配置id
var EnumSpineConfigID;
(function (EnumSpineConfigID) {
    // SkillMissileFire = 1,   //导弹发射
    EnumSpineConfigID[EnumSpineConfigID["SkillMissileExplode"] = 2] = "SkillMissileExplode";
    EnumSpineConfigID[EnumSpineConfigID["Laser"] = 3] = "Laser";
    EnumSpineConfigID[EnumSpineConfigID["Guard"] = 4] = "Guard";
    EnumSpineConfigID[EnumSpineConfigID["MagnetDisturb"] = 5] = "MagnetDisturb";
    EnumSpineConfigID[EnumSpineConfigID["MagnetDisturbPrepare"] = 6] = "MagnetDisturbPrepare";
    EnumSpineConfigID[EnumSpineConfigID["ElectricNet"] = 7] = "ElectricNet";
    EnumSpineConfigID[EnumSpineConfigID["MonsterHealSelf"] = 8] = "MonsterHealSelf";
    EnumSpineConfigID[EnumSpineConfigID["MonsterHealOther"] = 9] = "MonsterHealOther";
    EnumSpineConfigID[EnumSpineConfigID["MonsterPrepareExplosion"] = 10] = "MonsterPrepareExplosion";
    EnumSpineConfigID[EnumSpineConfigID["MonsterExplosion"] = 11] = "MonsterExplosion";
    EnumSpineConfigID[EnumSpineConfigID["MonsterBringMoney"] = 12] = "MonsterBringMoney";
    EnumSpineConfigID[EnumSpineConfigID["BeHurt"] = 21] = "BeHurt";
})(EnumSpineConfigID || (EnumSpineConfigID = {}));
//副武器配置id
var EnumSideWeaponType;
(function (EnumSideWeaponType) {
    EnumSideWeaponType[EnumSideWeaponType["Missile"] = 2] = "Missile";
    EnumSideWeaponType[EnumSideWeaponType["Laser"] = 3] = "Laser";
    EnumSideWeaponType[EnumSideWeaponType["Guard"] = 4] = "Guard";
    EnumSideWeaponType[EnumSideWeaponType["MagnetDisturb"] = 5] = "MagnetDisturb";
    EnumSideWeaponType[EnumSideWeaponType["ChildPlane"] = 6] = "ChildPlane";
    EnumSideWeaponType[EnumSideWeaponType["ElectricNet"] = 7] = "ElectricNet";
})(EnumSideWeaponType || (EnumSideWeaponType = {}));
//游戏物体状态:角色,怪物, 道具, 子弹
var EnumPlayerState;
(function (EnumPlayerState) {
    EnumPlayerState[EnumPlayerState["Live"] = 0] = "Live";
    EnumPlayerState[EnumPlayerState["Die"] = 1] = "Die";
})(EnumPlayerState || (EnumPlayerState = {}));
//子弹外观配置表id
var EnumBulletOutLookType;
(function (EnumBulletOutLookType) {
    EnumBulletOutLookType[EnumBulletOutLookType["None"] = 0] = "None";
    EnumBulletOutLookType[EnumBulletOutLookType["MainPlayerBullet"] = 1] = "MainPlayerBullet";
    EnumBulletOutLookType[EnumBulletOutLookType["MonsterBullet"] = 2] = "MonsterBullet";
    EnumBulletOutLookType[EnumBulletOutLookType["ChildPlaneBullet"] = 3] = "ChildPlaneBullet";
    EnumBulletOutLookType[EnumBulletOutLookType["MainPlayerBullet_PowerBuff"] = 4] = "MainPlayerBullet_PowerBuff";
    EnumBulletOutLookType[EnumBulletOutLookType["MainPlayerBullet_FightBackBuff"] = 5] = "MainPlayerBullet_FightBackBuff";
    EnumBulletOutLookType[EnumBulletOutLookType["MainPlayerBullet_GoldBuffs"] = 6] = "MainPlayerBullet_GoldBuffs";
    EnumBulletOutLookType[EnumBulletOutLookType["MISSILE_WEAPON_BULLET"] = 7] = "MISSILE_WEAPON_BULLET";
    // MainPlayerBullet_SpeedBuff = 7, //速度强化
    // MainPlayerBullet_PowerAndBackBuff = 8, //火力+击退
    // MainPlayerBullet_PowerAndGoldBuff = 9, //火力+点石
    // MainPlayerBullet_BackAndGoldBuff = 10, //点石+击退
    // MainPlayerBullet_3Buff = 11, //3种buff都有s
    // MainPlayerBullet_Through = 12//穿透子弹
})(EnumBulletOutLookType || (EnumBulletOutLookType = {}));
//buff配置表id
var EnumBuffType;
(function (EnumBuffType) {
    EnumBuffType[EnumBuffType["FireSpeedIntensified"] = 1] = "FireSpeedIntensified";
    EnumBuffType[EnumBuffType["PowerIntensified"] = 2] = "PowerIntensified";
    EnumBuffType[EnumBuffType["CallAlliance"] = 3] = "CallAlliance";
    EnumBuffType[EnumBuffType["FightBack"] = 4] = "FightBack";
    EnumBuffType[EnumBuffType["Weaken"] = 5] = "Weaken";
    EnumBuffType[EnumBuffType["BulletThrough"] = 6] = "BulletThrough";
    EnumBuffType[EnumBuffType["Gold"] = 7] = "Gold";
    EnumBuffType[EnumBuffType["Enlarge"] = 8] = "Enlarge";
    EnumBuffType[EnumBuffType["LimitInput"] = 9] = "LimitInput";
    EnumBuffType[EnumBuffType["MagnetFreezen"] = 10] = "MagnetFreezen";
})(EnumBuffType || (EnumBuffType = {}));
//道具类型
var EnumPropType;
(function (EnumPropType) {
    EnumPropType[EnumPropType["FireSpeedIntensified"] = 1] = "FireSpeedIntensified";
    EnumPropType[EnumPropType["PowerIntensified"] = 2] = "PowerIntensified";
    EnumPropType[EnumPropType["CallAlliance"] = 3] = "CallAlliance";
    EnumPropType[EnumPropType["FightBack"] = 4] = "FightBack";
    EnumPropType[EnumPropType["Weaken"] = 5] = "Weaken";
    EnumPropType[EnumPropType["BulletThrough"] = 6] = "BulletThrough";
    EnumPropType[EnumPropType["Gold"] = 7] = "Gold";
    EnumPropType[EnumPropType["Enlarge"] = 8] = "Enlarge";
    EnumPropType[EnumPropType["LimitInput"] = 9] = "LimitInput";
})(EnumPropType || (EnumPropType = {}));
var EnumMonsterPowerType;
(function (EnumMonsterPowerType) {
    EnumMonsterPowerType[EnumMonsterPowerType["ScaleUp"] = 1] = "ScaleUp";
    EnumMonsterPowerType[EnumMonsterPowerType["Healing"] = 2] = "Healing";
    EnumMonsterPowerType[EnumMonsterPowerType["Explosion"] = 3] = "Explosion";
    EnumMonsterPowerType[EnumMonsterPowerType["Split"] = 4] = "Split";
    EnumMonsterPowerType[EnumMonsterPowerType["Attach"] = 5] = "Attach";
    EnumMonsterPowerType[EnumMonsterPowerType["Spawn"] = 6] = "Spawn";
    EnumMonsterPowerType[EnumMonsterPowerType["FollowPlayer"] = 7] = "FollowPlayer";
    EnumMonsterPowerType[EnumMonsterPowerType["Attack"] = 8] = "Attack";
    EnumMonsterPowerType[EnumMonsterPowerType["BringMoney"] = 9] = "BringMoney";
})(EnumMonsterPowerType || (EnumMonsterPowerType = {}));
var EnumSoundID;
(function (EnumSoundID) {
    EnumSoundID[EnumSoundID["sound_bg_bg_01"] = 1] = "sound_bg_bg_01";
    EnumSoundID[EnumSoundID["sound_fight_bullet_01"] = 2] = "sound_fight_bullet_01";
    EnumSoundID[EnumSoundID["sound_fight_bullet_crash"] = 3] = "sound_fight_bullet_crash";
    EnumSoundID[EnumSoundID["sound_fight_bullet_02"] = 4] = "sound_fight_bullet_02";
    EnumSoundID[EnumSoundID["sound_fight_bullet_03"] = 5] = "sound_fight_bullet_03";
    EnumSoundID[EnumSoundID["sound_fight_bullet_04"] = 6] = "sound_fight_bullet_04";
    EnumSoundID[EnumSoundID["sound_fight_buff_01"] = 7] = "sound_fight_buff_01";
    EnumSoundID[EnumSoundID["sound_fight_buff_02"] = 8] = "sound_fight_buff_02";
    EnumSoundID[EnumSoundID["sound_fight_monster_gold"] = 9] = "sound_fight_monster_gold";
    EnumSoundID[EnumSoundID["sound_fight_monster_01"] = 10] = "sound_fight_monster_01";
    EnumSoundID[EnumSoundID["sound_fight_warcraft_boom"] = 11] = "sound_fight_warcraft_boom";
    EnumSoundID[EnumSoundID["sound_fight_hint_01"] = 12] = "sound_fight_hint_01";
    EnumSoundID[EnumSoundID["sound_fight_hint_02"] = 13] = "sound_fight_hint_02";
    EnumSoundID[EnumSoundID["sound_fight_succeed"] = 14] = "sound_fight_succeed";
    EnumSoundID[EnumSoundID["sound_fight_ten_award"] = 15] = "sound_fight_ten_award";
    EnumSoundID[EnumSoundID["sound_fight_guided_01"] = 16] = "sound_fight_guided_01";
    EnumSoundID[EnumSoundID["sound_fight_guided_02"] = 17] = "sound_fight_guided_02";
    EnumSoundID[EnumSoundID["sound_fight_laser"] = 18] = "sound_fight_laser";
    EnumSoundID[EnumSoundID["sound_fight_bounce"] = 19] = "sound_fight_bounce";
    EnumSoundID[EnumSoundID["sound_fight_warship"] = 20] = "sound_fight_warship";
    EnumSoundID[EnumSoundID["sound_fight_netting"] = 21] = "sound_fight_netting";
    EnumSoundID[EnumSoundID["sound_function_touch_01"] = 22] = "sound_function_touch_01";
    EnumSoundID[EnumSoundID["sound_function_touch_02"] = 23] = "sound_function_touch_02";
    EnumSoundID[EnumSoundID["sound_function_gold_01"] = 24] = "sound_function_gold_01";
    EnumSoundID[EnumSoundID["sound_function_upgrade_01"] = 25] = "sound_function_upgrade_01";
    EnumSoundID[EnumSoundID["sound_function_diamonds_01"] = 26] = "sound_function_diamonds_01";
    EnumSoundID[EnumSoundID["sound_function_energy_01"] = 27] = "sound_function_energy_01";
    EnumSoundID[EnumSoundID["bg_hall_bgm"] = 28] = "bg_hall_bgm";
    EnumSoundID[EnumSoundID["bg_fight1"] = 29] = "bg_fight1";
    EnumSoundID[EnumSoundID["bg_fight2"] = 30] = "bg_fight2";
    EnumSoundID[EnumSoundID["bg_bossfight"] = 31] = "bg_bossfight";
    EnumSoundID[EnumSoundID["sound_fight_defeat"] = 32] = "sound_fight_defeat";
    EnumSoundID[EnumSoundID["sound_function_numberup"] = 33] = "sound_function_numberup";
    EnumSoundID[EnumSoundID["sound_function_planepass"] = 34] = "sound_function_planepass";
    EnumSoundID[EnumSoundID["sound_function_touch_03"] = 35] = "sound_function_touch_03"; //6.0新加
})(EnumSoundID || (EnumSoundID = {}));
var EnumBuffEffectType;
(function (EnumBuffEffectType) {
    EnumBuffEffectType[EnumBuffEffectType["Buff"] = 1] = "Buff";
    EnumBuffEffectType[EnumBuffEffectType["Debuff"] = 2] = "Debuff";
})(EnumBuffEffectType || (EnumBuffEffectType = {}));
var EnumFormulaType;
(function (EnumFormulaType) {
    EnumFormulaType[EnumFormulaType["MonsterBlood"] = 1] = "MonsterBlood";
    EnumFormulaType[EnumFormulaType["MonsterGold"] = 2] = "MonsterGold";
    EnumFormulaType[EnumFormulaType["GoldUpgrade"] = 3] = "GoldUpgrade";
    EnumFormulaType[EnumFormulaType["DiamondUpgrade"] = 4] = "DiamondUpgrade";
    EnumFormulaType[EnumFormulaType["MainWeaponUpgradeCost"] = 5] = "MainWeaponUpgradeCost";
    EnumFormulaType[EnumFormulaType["MainWeaponBulletPower"] = 6] = "MainWeaponBulletPower";
    EnumFormulaType[EnumFormulaType["SideWeaponUpgradeCost1"] = 7] = "SideWeaponUpgradeCost1";
    EnumFormulaType[EnumFormulaType["SideWeaponUpgradeCost2"] = 8] = "SideWeaponUpgradeCost2";
    EnumFormulaType[EnumFormulaType["SideWeaponUpgradeCost3"] = 9] = "SideWeaponUpgradeCost3";
    EnumFormulaType[EnumFormulaType["SideWeaponUpgradeCost4"] = 10] = "SideWeaponUpgradeCost4";
    EnumFormulaType[EnumFormulaType["SideWeaponUpgradeCost5"] = 11] = "SideWeaponUpgradeCost5";
    EnumFormulaType[EnumFormulaType["SideWeaponUpgradeCost6"] = 12] = "SideWeaponUpgradeCost6";
    EnumFormulaType[EnumFormulaType["SideWeaponBulletPower1"] = 13] = "SideWeaponBulletPower1";
    EnumFormulaType[EnumFormulaType["SideWeaponBulletPower2"] = 14] = "SideWeaponBulletPower2";
    EnumFormulaType[EnumFormulaType["SideWeaponBulletPower3"] = 15] = "SideWeaponBulletPower3";
    EnumFormulaType[EnumFormulaType["SideWeaponBulletPower4"] = 16] = "SideWeaponBulletPower4";
    EnumFormulaType[EnumFormulaType["SideWeaponBulletPower5"] = 17] = "SideWeaponBulletPower5";
    EnumFormulaType[EnumFormulaType["SideWeaponBulletPower6"] = 18] = "SideWeaponBulletPower6";
    EnumFormulaType[EnumFormulaType["MonsterTotalLevel"] = 19] = "MonsterTotalLevel";
    EnumFormulaType[EnumFormulaType["MonsterTotalLevel2"] = 20] = "MonsterTotalLevel2";
    EnumFormulaType[EnumFormulaType["MonsterTotalLevel3"] = 21] = "MonsterTotalLevel3";
    EnumFormulaType[EnumFormulaType["MonsterTotalLevel4"] = 22] = "MonsterTotalLevel4";
    EnumFormulaType[EnumFormulaType["MonsterTotalLevel5"] = 23] = "MonsterTotalLevel5";
    EnumFormulaType[EnumFormulaType["MonsterTotalLevel6"] = 24] = "MonsterTotalLevel6";
    EnumFormulaType[EnumFormulaType["MonsterScale"] = 25] = "MonsterScale";
    EnumFormulaType[EnumFormulaType["SpawnUpgradeCost"] = 26] = "SpawnUpgradeCost";
})(EnumFormulaType || (EnumFormulaType = {}));
var EnumLevelUIAnimType;
(function (EnumLevelUIAnimType) {
    EnumLevelUIAnimType[EnumLevelUIAnimType["HomePage"] = 1] = "HomePage";
    EnumLevelUIAnimType[EnumLevelUIAnimType["Battle"] = 2] = "Battle";
    EnumLevelUIAnimType[EnumLevelUIAnimType["Result_Win"] = 3] = "Result_Win";
    EnumLevelUIAnimType[EnumLevelUIAnimType["Result_Lose"] = 4] = "Result_Lose";
})(EnumLevelUIAnimType || (EnumLevelUIAnimType = {}));
//游戏结束方式
var EnumCompleteType;
(function (EnumCompleteType) {
    EnumCompleteType[EnumCompleteType["None"] = 0] = "None";
    EnumCompleteType[EnumCompleteType["Continue"] = 1] = "Continue";
    EnumCompleteType[EnumCompleteType["Finish"] = 2] = "Finish";
    EnumCompleteType[EnumCompleteType["Lucky"] = 3] = "Lucky";
    EnumCompleteType[EnumCompleteType["Replay"] = 4] = "Replay";
})(EnumCompleteType || (EnumCompleteType = {}));
//打开升级面板的方式
var EnumUpgradeUIType;
(function (EnumUpgradeUIType) {
    EnumUpgradeUIType[EnumUpgradeUIType["Main"] = 0] = "Main";
    EnumUpgradeUIType[EnumUpgradeUIType["Sub"] = 1] = "Sub";
    EnumUpgradeUIType[EnumUpgradeUIType["Money"] = 2] = "Money";
})(EnumUpgradeUIType || (EnumUpgradeUIType = {}));
//配合常量配置表使用
var EnumConstConfigType;
(function (EnumConstConfigType) {
    /**通用UI——面板放大动画时间 */
    EnumConstConfigType[EnumConstConfigType["Common_PanelScaleUpTime"] = 0] = "Common_PanelScaleUpTime";
    /**升级UI——主武器：箭头出现时间 */
    EnumConstConfigType[EnumConstConfigType["UpgradeUI_MainWeapon_ArrowAppearTime"] = 1] = "UpgradeUI_MainWeapon_ArrowAppearTime";
    /**升级UI——主武器：右侧出现时间 */
    EnumConstConfigType[EnumConstConfigType["UpgradeUI_MainWeapon_RightBoxAppearTime"] = 2] = "UpgradeUI_MainWeapon_RightBoxAppearTime";
    /**升级UI——主武器：升阶停顿时间 */
    EnumConstConfigType[EnumConstConfigType["UpgradeUI_MainWeapon_EvolutionPauseTime"] = 3] = "UpgradeUI_MainWeapon_EvolutionPauseTime";
    /**升级UI——主武器：升阶结束后，右侧左移时间 */
    EnumConstConfigType[EnumConstConfigType["UpgradeUI_MainWeapon_EvolutionEndTime"] = 4] = "UpgradeUI_MainWeapon_EvolutionEndTime";
    /**升级UI——副武器：切换动画时间 */
    EnumConstConfigType[EnumConstConfigType["UpgradeUI_SubWeapon_SwitchTime"] = 5] = "UpgradeUI_SubWeapon_SwitchTime";
    /**升级UI——主武器：最大子弹数量 */
    EnumConstConfigType[EnumConstConfigType["UpgradeUI_MainWeapon_BulletMaxNum"] = 6] = "UpgradeUI_MainWeapon_BulletMaxNum";
    /**通用UI——面板放大回弹动画时间 */
    EnumConstConfigType[EnumConstConfigType["Common_PanelScaleBounceTime"] = 7] = "Common_PanelScaleBounceTime";
    /**通用UI——面板放大动画极限尺寸 */
    EnumConstConfigType[EnumConstConfigType["Common_PanelScaleUpMax"] = 8] = "Common_PanelScaleUpMax";
    /**主页UI——产能刷新间隔 */
    EnumConstConfigType[EnumConstConfigType["HomepageUI_Spawn_RefreshIntervalTime"] = 9] = "HomepageUI_Spawn_RefreshIntervalTime";
    /**主页UI——产能极限时间 */
    EnumConstConfigType[EnumConstConfigType["HomepageUI_Spawn_OverTime"] = 10] = "HomepageUI_Spawn_OverTime";
    /**升级UI——升级特效时间：左侧 */
    EnumConstConfigType[EnumConstConfigType["UpgradeUI_UpgradeEffectTime_Left"] = 11] = "UpgradeUI_UpgradeEffectTime_Left";
    /**升级UI——升级特效时间：右侧 */
    EnumConstConfigType[EnumConstConfigType["UpgradeUI_UpgradeEffectTime_Right"] = 12] = "UpgradeUI_UpgradeEffectTime_Right";
    /**飞机——在主页时的缩放比 */
    EnumConstConfigType[EnumConstConfigType["Plane_Homepage_Scale"] = 13] = "Plane_Homepage_Scale";
})(EnumConstConfigType || (EnumConstConfigType = {}));
//# sourceMappingURL=EnumDefine.js.map