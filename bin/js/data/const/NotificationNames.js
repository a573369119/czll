/*
* name;
*/
var NotificationNames = (function () {
    function NotificationNames() {
    }
    return NotificationNames;
}());
//UI
NotificationNames.OPENUI = "OPENUI"; //打开UI
NotificationNames.OPENUIWITHPARAM = "OPENUIWITHPARAM"; //打开ui带参数
NotificationNames.HIDEUI = "HIDEUI"; //隐藏UI
NotificationNames.HIDEALLUI = "HIDEALLUI"; //隐藏所有UI
NotificationNames.DESTROYUI = "DESTROYUI"; //销毁UI
NotificationNames.DESTROYALLUI = "DESTROYALLUI"; //销毁所有UI
NotificationNames.HomePageUI_SetInteractive = "HomePageUI_SetInteractive"; //登录ui是否可以交互
//背景
NotificationNames.BackgroundUI_ChangeBackground = "BackgroundUI_ChangeBackground"; //切换背景图
NotificationNames.BackgroundUI_Shake = "BackgroundUI_Shake"; //震屏
NotificationNames.BackgroundUI_HomepageEnter = "BackgroundUI_HomepageEnter"; //第一次登陆，黑屏0.5秒
NotificationNames.BackgroundUI_BattleEnter = "BackgroundUI_BattleEnter"; //进入战斗，背景放大后缩小
//-mb
NotificationNames.BackgroundUI_BgMoveStart = "BackgorundUI_BgMoveStart"; //背景图滚动开始
NotificationNames.BackgroundUI_BgMoveEnd = "BackgorundUI_BgMoveEnd"; //背景图滚动结束
NotificationNames.BackgroundUI_StopShakeBg = "BackgroundUI_StopShakeBg"; //停止背景震动
//主页
NotificationNames.HomepageUI_CreateMoneySpawn = "HomepageUI_CreateMoneySpawn"; //创建钱币产能
NotificationNames.HomepageUI_UpdateMoneySpawn = "HomepageUI_UpdateMoneySpawn"; //更新钱币产能
NotificationNames.HomepageUI_GainMoneySpawn = "HomepageUI_GainMoneySpawn"; //收获钱币产能
NotificationNames.HomepageUI_RemoveMoneySpawn = "HomepageUI_RemoveMoneySpawn"; //移除钱币产能
NotificationNames.HomepageUI_SetBottomButtonState = "HomepageUI_SetBottomButtonState"; //设置底部按钮状态
NotificationNames.HomepageUI_UnlockNewSideweapon = "HomepageUI_UnlockNewSideweapon"; //提示，解锁了新的副武器
NotificationNames.HomepageUI_PlaySpawnAnim = "HomepageUI_PlaySpawnAnim";
//-mb5
NotificationNames.HomepageUI_ShowText = "HomepageUI_ShowText"; //显示
NotificationNames.HomepageUI_HidenText = "HomepageUI_HidenText"; //隐藏
//结算
NotificationNames.ResultUI_Finish = "ResultUI_Finish";
NotificationNames.ResultUI_GainPower = "ResultUI_GainPower";
//升级UI
NotificationNames.UpgradeUI_RefreshMainWeaponInfo = "UpgradeUI_RefreshMainWeaponInfo";
NotificationNames.UpgradeUI_RefreshSideWeaponInfo = "UpgradeUI_RefreshSideWeaponInfo";
NotificationNames.UpgradeUI_RefreshSpawnInfo = "UpgradeUI_RefreshSpawnInfo";
NotificationNames.UpgradeUI_EquipSideWeapon = "UpgradeUI_EquipSideWeapon";
NotificationNames.UpgradeUI_RefreshWeaponEvolutionInfo = "UpgradeUI_RefreshWeaponEvolutionInfo";
NotificationNames.UpgradeUI_ElementTweenTo = "UpgradUI_ElementTweenTo"; //切换飞机点击反馈
//兑换UI
NotificationNames.ExchangeUI_ExchangeResult = "ExchangeUI_ExchangeResult";
//好友邀请UI
NotificationNames.InviteFriendUI_RefreshFriendListInfo = "InviteFriendUI_RefreshFriendListInfo"; //刷新好友信息
NotificationNames.InviteFriendUI_CheckInviteListComplete = "InviteFriendUI_CheckInviteListComplete"; //查询好友列表完毕
NotificationNames.InviteFriendUI_LotteryResult = "InviteFriendUI_LotteryResult"; //抽奖结果
NotificationNames.InviteFriendUI_RefreshLotteryNum = "InviteFriendUI_RefreshLotteryNum"; //刷新抽奖数量
//LoadingUI
NotificationNames.LoadingUI_Progress = "LoadingUI_Progress"; //接受进度，0~1
//更多产能获取UI
NotificationNames.MoreSpawnUI_Hide = "MoreSpawnUI_Hide";
//等级相关
NotificationNames.LevelUI_PlayAnim = "LevelUI_PlayAnim";
//手机绑定UI
NotificationNames.VerifyUI_GetMessageResult = "VerifyUI_GetMessageResult";
NotificationNames.VerifyUI_VerifyResult = "VerifyUI_VerifyResult";
//抽奖历史查询
NotificationNames.LotteryRewardHistUI_CheckResult = "LotteryRewardHistUI_CheckResult";
//UI通用
NotificationNames.UI_StartGame = "UI_StartGame"; //通知UI，游戏开始
NotificationNames.UI_RefreshMoneyInfo = "UI_RefreshMoneyInfo"; //刷新钱币信息
NotificationNames.UI_RefreshMatchProgressInfo = "UI_RefreshMatchProgressInfo"; //刷新比赛进度信息
NotificationNames.UI_OnMonsterKill = "UI_OnMonsterKill"; //通知UI怪物死亡信息
NotificationNames.UI_OnPropBuff = "UI_OnPropBuff"; //通知UI buff获取&停止  param:PlayerBuffInfo
//COMMAND
NotificationNames.START_UP_INIT_COMMAND = "START_UP_INIT_COMMAND"; //游戏启动初始化
NotificationNames.CHECK_VERSION_COMMAND = "CHECK_VERSION_COMMAND"; //laya 版本管理
NotificationNames.PRELOAD_COMMAND = "PRELOAD_COMMAND"; //游戏启动资源预加载
NotificationNames.GAME_INIT_COMMAND = "GAME_INIT_COMMAND"; //游戏初始化
NotificationNames.GET_PLATFORM_AUTH_COMMAND = "GET_PLATFORM_AUTH_COMMAND"; //平台预授权,之后才能获取平台数据
NotificationNames.NETWORK_GAME_LOG_IN_COMMAND = "NETWORK_GAME_LOG_IN_COMMAND"; //网路游戏初始化
NotificationNames.INIT_PLATFORM_INFO_COMMAND = "INIT_PLATFORM_INFO_COMMAND"; //游戏平台相关信息初始化
NotificationNames.ENTER_LOGIN_SCENE_COMMAND = "ENTER_LOGIN_SCENE_COMMAND"; //登录主界面
NotificationNames.EXIT_LOGIN_SCENE_COMMAND = "EXIT_LOGIN_SCENE_COMMAND"; //退出登录主界面
NotificationNames.SOCKET_DISCONNECTED_COMMAND = "SOCKET_DISCONNECTED_COMMAND"; //socket断开消息处理
NotificationNames.MATCH_RES_PRELOAD_COMMAND = "MATCH_RES_PRELOAD_COMMAND"; //进入游戏前资源
//游戏
NotificationNames.MATCH_ENTER_COMMAND = "MATCH_ENTER_COMMAND"; //进入游戏
NotificationNames.MATCH_READY = "MATCH_READY"; //比赛准备完成
NotificationNames.MATCH_START = "MATCH_START"; //比赛开始
NotificationNames.MATCH_COMPLETE = "MATCH_COMPLETE"; //比赛结束
NotificationNames.MATCH_RESUME = "MATCH_RESUME"; //玩家复活继续比赛
NotificationNames.MATCH_EXIT_COMMAND = "MATCH_EXIT_COMMAND"; //退出游戏
NotificationNames.CONTINUE_NEXT_MATCH = "CONTINUE_NEXT_MATCH"; //继续下场比赛
NotificationNames.PAUSE_MATCH = "PAUSE_MATCH"; //比赛暂停
//MainPlayer
NotificationNames.CREATER_MAIN_PLAYER = "CREATER_MAIN_PLAYER"; //创建主角
NotificationNames.ON_SIDE_WEAPON_CHANGED = "ON_SIDE_WEAPON_CHANGED"; //切换副武器
NotificationNames.MAIN_PLAYER_DIE = "MAIN_PLAYER_DIE"; //主角死亡
NotificationNames.MAIN_PLAYER_REBORN = "MAIN_PLAYER_REBORN"; //主角复活
//子飞机
NotificationNames.SLOT_FORCE_OCCUPIED = "SLOT_FORCE_OCCUPIED"; //槽位被抢走, 需要挪位置
NotificationNames.SLOT_INTERVAL_CHANGED = "SLOT_INTERVAL_CHANGED"; //槽位间隔改变
//怪物
NotificationNames.CREATE_MONSTER = "CREATE_MONSTER"; //创建怪物
NotificationNames.MONSTER_DIE = "MONSTER_DIE"; //怪物死亡
NotificationNames.MONSTER_ENLARGE = "MONSTER_ENLARGE"; //怪物巨化
NotificationNames.MONSTER_PAUSE = "MONSTER_PAUSE"; //怪物弱化
NotificationNames.HULK_COMING = "HULK_COMING"; //巨型怪物来袭
//WeChat
NotificationNames.WeChat_VideoAd_Load_Success = "WeChat_VideoAd_Load_Success"; //视频拉取成功
NotificationNames.WeChat_VideoAd_Load_Fail = "WeChat_VideoAd_Load_Fail"; //视频拉取失败
NotificationNames.WeChat_VideoAd_OnClose = "WeChat_VideoAd_Load_OnClose"; //视频关闭，true为正常观看结束，false为手动提前结束
NotificationNames.WeChat_OnKeyboardComplete = "WeChat_OnKeyboardComplete"; //软键盘关闭
NotificationNames.WeChat_OnKeyboardConfirm = "WeChat_OnKeyboardConfirm"; //软键盘确定
//# sourceMappingURL=NotificationNames.js.map