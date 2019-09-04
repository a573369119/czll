/*
* name;
*/
class NotificationNames {
	//UI
	static OPENUI: string = "OPENUI";   												//打开UI
	static OPENUIWITHPARAM: string = "OPENUIWITHPARAM";									//打开ui带参数
	static HIDEUI: string = "HIDEUI"; 													//隐藏UI
	static HIDEALLUI: string = "HIDEALLUI";												//隐藏所有UI
	static DESTROYUI: string = "DESTROYUI";												//销毁UI
	static DESTROYALLUI: string = "DESTROYALLUI";										//销毁所有UI
	static HomePageUI_SetInteractive: string = "HomePageUI_SetInteractive";				//登录ui是否可以交互

	//背景
	static BackgroundUI_ChangeBackground: string = "BackgroundUI_ChangeBackground";		//切换背景图
	static BackgroundUI_Shake: string = "BackgroundUI_Shake";							//震屏
	static BackgroundUI_HomepageEnter: string = "BackgroundUI_HomepageEnter";					//第一次登陆，黑屏0.5秒
	static BackgroundUI_BattleEnter: string = "BackgroundUI_BattleEnter";				//进入战斗，背景放大后缩小
	//-mb
	static BackgroundUI_BgMoveStart: string = "BackgorundUI_BgMoveStart";					//背景图滚动开始
	static BackgroundUI_BgMoveEnd: string = "BackgorundUI_BgMoveEnd";						//背景图滚动结束
	static BackgroundUI_StopShakeBg: string = "BackgroundUI_StopShakeBg";					//停止背景震动

	//主页
	static HomepageUI_CreateMoneySpawn: string = "HomepageUI_CreateMoneySpawn";			//创建钱币产能
	static HomepageUI_UpdateMoneySpawn: string = "HomepageUI_UpdateMoneySpawn";			//更新钱币产能
	static HomepageUI_GainMoneySpawn: string = "HomepageUI_GainMoneySpawn";				//收获钱币产能
	static HomepageUI_RemoveMoneySpawn: string = "HomepageUI_RemoveMoneySpawn";			//移除钱币产能
	static HomepageUI_SetBottomButtonState: string = "HomepageUI_SetBottomButtonState";	//设置底部按钮状态
	static HomepageUI_UnlockNewSideweapon: string = "HomepageUI_UnlockNewSideweapon";	//提示，解锁了新的副武器
	static HomepageUI_PlaySpawnAnim: string = "HomepageUI_PlaySpawnAnim";

	//-mb5
	static HomepageUI_ShowText: string = "HomepageUI_ShowText";	//显示
	static HomepageUI_HidenText: string = "HomepageUI_HidenText"; //隐藏
	//结算
	static ResultUI_Finish: string = "ResultUI_Finish";
	static ResultUI_GainPower: string = "ResultUI_GainPower";
	//升级UI
	static UpgradeUI_RefreshMainWeaponInfo: string = "UpgradeUI_RefreshMainWeaponInfo";
	static UpgradeUI_RefreshSideWeaponInfo: string = "UpgradeUI_RefreshSideWeaponInfo";
	static UpgradeUI_RefreshSpawnInfo: string = "UpgradeUI_RefreshSpawnInfo";
	static UpgradeUI_EquipSideWeapon: string = "UpgradeUI_EquipSideWeapon";
	static UpgradeUI_RefreshWeaponEvolutionInfo: string = "UpgradeUI_RefreshWeaponEvolutionInfo";
	static UpgradeUI_ElementTweenTo: string = "UpgradUI_ElementTweenTo";	//切换飞机点击反馈
	//兑换UI
	static ExchangeUI_ExchangeResult: string = "ExchangeUI_ExchangeResult";

	//好友邀请UI
	static InviteFriendUI_RefreshFriendListInfo: string = "InviteFriendUI_RefreshFriendListInfo";		//刷新好友信息
	static InviteFriendUI_CheckInviteListComplete: string = "InviteFriendUI_CheckInviteListComplete";	//查询好友列表完毕
	static InviteFriendUI_LotteryResult: string = "InviteFriendUI_LotteryResult";						//抽奖结果
	static InviteFriendUI_RefreshLotteryNum: string = "InviteFriendUI_RefreshLotteryNum";				//刷新抽奖数量
	//LoadingUI
	static LoadingUI_Progress: string = "LoadingUI_Progress";	//接受进度，0~1
	//更多产能获取UI
	static MoreSpawnUI_Hide: string = "MoreSpawnUI_Hide";
	//等级相关
	static LevelUI_PlayAnim: string = "LevelUI_PlayAnim";
	//手机绑定UI
	static VerifyUI_GetMessageResult: string = "VerifyUI_GetMessageResult";
	static VerifyUI_VerifyResult: string = "VerifyUI_VerifyResult";
	//抽奖历史查询
	static LotteryRewardHistUI_CheckResult: string = "LotteryRewardHistUI_CheckResult";

	//UI通用
	static UI_StartGame: string = "UI_StartGame";		//通知UI，游戏开始
	static UI_RefreshMoneyInfo: string = "UI_RefreshMoneyInfo";							//刷新钱币信息
	static UI_RefreshMatchProgressInfo: string = "UI_RefreshMatchProgressInfo";			//刷新比赛进度信息
	static UI_OnMonsterKill: string = "UI_OnMonsterKill";								//通知UI怪物死亡信息
	static UI_OnPropBuff: string = "UI_OnPropBuff";										//通知UI buff获取&停止  param:PlayerBuffInfo


	//COMMAND
	static START_UP_INIT_COMMAND: string = "START_UP_INIT_COMMAND"; 					//游戏启动初始化
	static CHECK_VERSION_COMMAND: string = "CHECK_VERSION_COMMAND"; 					//laya 版本管理
	static PRELOAD_COMMAND: string = "PRELOAD_COMMAND";  								//游戏启动资源预加载
	static GAME_INIT_COMMAND: string = "GAME_INIT_COMMAND";								//游戏初始化
	static GET_PLATFORM_AUTH_COMMAND: string = "GET_PLATFORM_AUTH_COMMAND";				//平台预授权,之后才能获取平台数据
	static NETWORK_GAME_LOG_IN_COMMAND: string = "NETWORK_GAME_LOG_IN_COMMAND"; 		//网路游戏初始化
	static INIT_PLATFORM_INFO_COMMAND: string = "INIT_PLATFORM_INFO_COMMAND"; 			//游戏平台相关信息初始化
	static ENTER_LOGIN_SCENE_COMMAND: string = "ENTER_LOGIN_SCENE_COMMAND"; 			//登录主界面
	static EXIT_LOGIN_SCENE_COMMAND: string = "EXIT_LOGIN_SCENE_COMMAND";  				//退出登录主界面
	static SOCKET_DISCONNECTED_COMMAND: string = "SOCKET_DISCONNECTED_COMMAND"; 		//socket断开消息处理
	static MATCH_RES_PRELOAD_COMMAND: string = "MATCH_RES_PRELOAD_COMMAND";  			//进入游戏前资源

	//游戏
	static MATCH_ENTER_COMMAND: string = "MATCH_ENTER_COMMAND";							//进入游戏
	static MATCH_READY: string = "MATCH_READY";											//比赛准备完成
	static MATCH_START: string = "MATCH_START";											//比赛开始
	static MATCH_COMPLETE: string = "MATCH_COMPLETE";									//比赛结束
	static MATCH_RESUME: string = "MATCH_RESUME";										//玩家复活继续比赛
	static MATCH_EXIT_COMMAND: string = "MATCH_EXIT_COMMAND";							//退出游戏

	static CONTINUE_NEXT_MATCH: string = "CONTINUE_NEXT_MATCH";							//继续下场比赛
	static PAUSE_MATCH: string = "PAUSE_MATCH";											//比赛暂停

	//MainPlayer
	static CREATER_MAIN_PLAYER: string = "CREATER_MAIN_PLAYER";							//创建主角
	static ON_SIDE_WEAPON_CHANGED: string = "ON_SIDE_WEAPON_CHANGED";					//切换副武器
	static MAIN_PLAYER_DIE: string = "MAIN_PLAYER_DIE";									//主角死亡
	static MAIN_PLAYER_REBORN: string = "MAIN_PLAYER_REBORN";							//主角复活
	//子飞机
	static SLOT_FORCE_OCCUPIED: string = "SLOT_FORCE_OCCUPIED"							//槽位被抢走, 需要挪位置
	static SLOT_INTERVAL_CHANGED: string = "SLOT_INTERVAL_CHANGED"						//槽位间隔改变
	//怪物
	static CREATE_MONSTER: string = "CREATE_MONSTER";									//创建怪物
	static MONSTER_DIE: string = "MONSTER_DIE";											//怪物死亡
	static MONSTER_ENLARGE: string = "MONSTER_ENLARGE";									//怪物巨化
	static MONSTER_PAUSE: string = "MONSTER_PAUSE";										//怪物弱化
	static HULK_COMING: string = "HULK_COMING";										//巨型怪物来袭

	//WeChat
	static WeChat_VideoAd_Load_Success: string = "WeChat_VideoAd_Load_Success";		//视频拉取成功
	static WeChat_VideoAd_Load_Fail: string = "WeChat_VideoAd_Load_Fail";			//视频拉取失败
	static WeChat_VideoAd_OnClose: string = "WeChat_VideoAd_Load_OnClose";			//视频关闭，true为正常观看结束，false为手动提前结束
	static WeChat_OnKeyboardComplete: string = "WeChat_OnKeyboardComplete";			//软键盘关闭
	static WeChat_OnKeyboardConfirm: string = "WeChat_OnKeyboardConfirm";			//软键盘确定
}