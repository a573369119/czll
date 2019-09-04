var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*
* 比赛开始前动画, 刷怪, 比赛结束判断&处理
*/
var LevelMediator = (function (_super) {
    __extends(LevelMediator, _super);
    function LevelMediator(name) {
        var _this = _super.call(this) || this;
        _this.monsterToSpawns = [];
        _this.monsterTimers = [];
        _this.mediatorName = name;
        return _this;
    }
    LevelMediator.prototype.onRegister = function () {
    };
    LevelMediator.prototype.listNotificationInterests = function () {
        _super.prototype.listNotificationInterests.call(this);
        return [
            NotificationNames.MATCH_READY,
            NotificationNames.MATCH_COMPLETE,
            NotificationNames.MATCH_RESUME,
            NotificationNames.MONSTER_DIE,
            NotificationNames.PAUSE_MATCH,
            NotificationNames.CONTINUE_NEXT_MATCH,
        ];
    };
    LevelMediator.prototype.handleNotification = function (notification) {
        var _this = this;
        _super.prototype.handleNotification.call(this, notification);
        switch (notification.getName()) {
            case NotificationNames.MATCH_READY:
                {
                    //todo 体力动画播放完成后1. 刷怪, 2.通知玩家比赛开始
                    //播放关卡音乐
                    var isBossLvl = GameDataManager.getInstance().LevelInfo.LevelSpawnDatas.IsBossLevel;
                    if (isBossLvl) {
                        AudioManager.GetInstance().PlayMusicByID(EnumSoundID.bg_bossfight);
                    }
                    else {
                        AudioManager.GetInstance().PlayMusicByID(Math.random() > 0.5 ? EnumSoundID.bg_fight1 : EnumSoundID.bg_fight2);
                    }
                    var globalPos = CommonUtil2D.GetGlobalPosition(PlayerManager.GetInstance().MainPlayer.comParent);
                    MoneyAnimManager.Instance.PlayMoneyAnim_Explose(EnumMoneyAnimType.Power, 5, globalPos, PlayerManager.GetInstance().MainPlayer.ViewSize.x, cbhandler.gen_handler(function () {
                        //比赛准备完成, 播放体力消耗动画, 结束后开始第一波刷怪
                        GameDataManager.getInstance().MatchInfo.State = EnumMatchState.Start;
                        // this.startSpawnTimer();
                        // this.spawn();//刷怪
                        _this.StartSpawnTimer();
                        _this.sendNotification(NotificationNames.MATCH_START);
                        _this.refreshBattleUI();
                    }));
                    break;
                }
            case NotificationNames.PAUSE_MATCH:
                {
                    var pause = notification.getBody();
                    TimeManager.getInst().Pause(pause);
                    break;
                }
            case NotificationNames.MATCH_COMPLETE:
                {
                    //玩家死亡, 怪物
                    var win = notification.getBody();
                    Log.Debug("MATCH_COMPLETE, win?%s", win);
                    // this.stopSpawnTimer();
                    this.ClearSpawnTimer();
                    GameDataManager.getInstance().MatchInfo.State = EnumMatchState.Complete;
                    AudioManager.GetInstance().PlaySoundByConfigID(win ? EnumSoundID.sound_fight_succeed : EnumSoundID.sound_fight_defeat);
                    break;
                }
            case NotificationNames.MATCH_RESUME:
                {
                    GameDataManager.getInstance().MatchInfo.State = EnumMatchState.Start;
                    break;
                }
            case NotificationNames.CONTINUE_NEXT_MATCH:
                {
                    //继续下场比赛
                    var levelId = notification.getBody();
                    Log.Debug("继续挑战关卡%i", levelId);
                    //2019-6-26 16:57:16 结算界面必然领取奖励，因此此处将奖励清零
                    var curGold = 0;
                    this.sendNotification(NotificationNames.MATCH_EXIT_COMMAND, true);
                    this.sendNotification(NotificationNames.MATCH_ENTER_COMMAND, levelId);
                    GameDataManager.getInstance().MatchInfo.GoldNum = curGold;
                    this.refreshBattleUI(true);
                    break;
                }
            case NotificationNames.MONSTER_DIE:
                {
                    var monsterInfo = notification.getBody();
                    //计算击杀奖励, 点石成金buff*3
                    // let monsterConfigID = monsterInfo.MonsterConfigID;
                    // let config = ConfigManager.GetInstance().GetMonsterConfig(monsterConfigID);
                    // if (config) {
                    var inGoldBuff = PlayerManager.GetInstance().MainPlayer.BuffComp.ContainBuff(EnumBuffType.Gold);
                    var rewardGold = inGoldBuff || Math.random() <= monsterInfo.Config.GoldProbability ? FormulaUtil.CalcMonsterReward(monsterInfo.Level) : 0;
                    if (inGoldBuff) {
                        rewardGold *= ConstDefine.GOLD_BUFF_REWARD_SCALE;
                        AudioManager.GetInstance().PlaySoundByConfigID(EnumSoundID.sound_fight_monster_gold);
                    }
                    GameDataManager.getInstance().MatchInfo.GoldNum += rewardGold; //奖励金币
                    // console.log("奖励金币" + rewardGold);
                    // console.log(monsterInfo.GoldADD + "ggggggggggggggggggg");
                    monsterInfo.GoldADD = 0;
                    if (rewardGold != 0)
                        monsterInfo.GoldADD += 3 + monsterInfo.GoldADD; //金币数量显示
                    this.sendNotification(NotificationNames.UI_OnMonsterKill, monsterInfo); //通知UI金币获取动画
                    // }
                    //刷新比赛进度
                    this.refreshBattleUI();
                    //胜利判定
                    if (GameDataManager.getInstance().LevelInfo.IsGameComplete()) {
                        Log.Debug("怪物都死亡, 玩家胜利");
                        if (GameDataManager.getInstance().MatchInfo.IsGameEnd()) {
                            Log.Warn("比赛已经结束, 但重复判定胜利");
                            return;
                        }
                        //停止飞行中的怪物子弹
                        BulletManager.GetInstance().RecycleAllMonsterBullet();
                        StorageManager.SetLastestLevelTemplate(GameDataManager.getInstance().LevelInfo.CurLevelID, -1); //清理关卡模板信息
                        this.facade.sendNotification(NotificationNames.MATCH_COMPLETE, true);
                    }
                    else {
                        // this.spawn();//刷怪
                        this.spawnVer2();
                        if (monsterInfo.CanSpawnProp)
                            PropSpawnLogic.Instance.TrySpawn(); //刷道具
                    }
                    break;
                }
        }
    };
    //开始新关卡
    LevelMediator.prototype.StartSpawnTimer = function () {
        this.monsterToSpawns = [];
        this.monsterTimers = [];
        var spawnDatas = GameDataManager.getInstance().LevelInfo.LevelSpawnDatas;
        var delay = 0;
        for (var index = 0; index < spawnDatas.LevelSpawnData.length; index++) {
            var spawnData = spawnDatas.LevelSpawnData[index];
            delay += spawnData.Delay;
            var timer = TimeManager.getInst().once(delay, cbhandler.gen_handler(this.spawnBrushMonsterByTimer, this, spawnData, index));
            this.monsterTimers.push(timer);
        }
        //2019-6-17 19:30:18 提示放在LevelMediator中与音效同时播放
        //2019-6-18 15:16:54 hint2的音效时机更改为仅巨型怪出现的时候播放
        //boss关卡一进入就播放警报
        if (spawnDatas.IsBossLevel) {
            this.sendNotification(NotificationNames.HULK_COMING);
            //2019-6-18 10:37:37 新需求 先暂停背景音乐，播放警告，警告结束后继续播放播放背景音乐
            AudioManager.GetInstance().SetBGSoundVolum(0);
            AudioManager.GetInstance().PlaySoundByConfigID(EnumSoundID.sound_fight_hint_02, true, function () {
                AudioManager.GetInstance().SetBGSoundVolum(ConstDefine.Audio_Music_Volume);
            });
        }
    };
    LevelMediator.prototype.ClearSpawnTimer = function () {
        for (var index = 0; index < this.monsterTimers.length; index++) {
            var timer = this.monsterTimers[index];
            TimeManager.getInst().remove(timer);
        }
    };
    //定时刷一波怪
    LevelMediator.prototype.spawnBrushMonsterByTimer = function (spawnData, index) {
        Log.Debug("定时刷怪, 波次" + index);
        this.monsterToSpawns = this.monsterToSpawns.concat(spawnData.Monsters);
        if (spawnData.SoundId > 0)
            AudioManager.GetInstance().PlaySoundByConfigID(spawnData.SoundId);
        this.spawnVer2();
    };
    LevelMediator.prototype.spawnVer2 = function () {
        if (this.monsterToSpawns.length > 0) {
            //检测是否可以刷怪
            if (MonsterSpawnLogic.Instance.CheckCanSpawn()) {
                var levelInfo = GameDataManager.getInstance().LevelInfo;
                var maxSpawnableNum = levelInfo.LevelSpawnDatas.MaxInScreenNum - levelInfo.CurLiveMonsterCount; //最大可刷怪数量
                var spawnNum = Math.min(this.monsterToSpawns.length, maxSpawnableNum); //实际生产数量
                var spawnMonster = this.monsterToSpawns.splice(0, spawnNum);
                this.sendNotification(NotificationNames.CREATE_MONSTER, spawnMonster);
            }
        }
    };
    LevelMediator.prototype.refreshBattleUI = function (refreshGold) {
        if (refreshGold === void 0) { refreshGold = false; }
        var matchProgress = GameDataManager.getInstance().LevelInfo.GetCurProgress();
        if (refreshGold)
            matchProgress.Gold = GameDataManager.getInstance().MatchInfo.GoldNum;
        this.sendNotification(NotificationNames.UI_RefreshMatchProgressInfo, matchProgress);
    };
    return LevelMediator;
}(puremvc.Mediator));
//# sourceMappingURL=LevelMediator.js.map