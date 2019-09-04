/*
* 比赛开始前动画, 刷怪, 比赛结束判断&处理
*/
class LevelMediator extends puremvc.Mediator {
    constructor(name: string) {
        super();
        this.mediatorName = name;
    }

    onRegister() {

    }

    listNotificationInterests() {
        super.listNotificationInterests();
        return [
            NotificationNames.MATCH_READY,  //比赛准备完成[创建怪物, 道具]
            NotificationNames.MATCH_COMPLETE,//比赛结束[清理场景, 道具]
            NotificationNames.MATCH_RESUME,//玩家复活比赛继续
            NotificationNames.MONSTER_DIE,//怪物死亡[创建道具, 刷新波次]
            NotificationNames.PAUSE_MATCH,
            NotificationNames.CONTINUE_NEXT_MATCH,
        ];
    }
    handleNotification(notification: puremvc.INotification) {
        super.handleNotification(notification);
        switch (notification.getName()) {

            case NotificationNames.MATCH_READY:
                {
                    //todo 体力动画播放完成后1. 刷怪, 2.通知玩家比赛开始
                    //播放关卡音乐
                    let isBossLvl = GameDataManager.getInstance().LevelInfo.LevelSpawnDatas.IsBossLevel;
                    if (isBossLvl) {
                        AudioManager.GetInstance().PlayMusicByID(EnumSoundID.bg_bossfight)
                    } else {
                        AudioManager.GetInstance().PlayMusicByID(Math.random() > 0.5 ? EnumSoundID.bg_fight1 : EnumSoundID.bg_fight2)
                    }


                    let globalPos = CommonUtil2D.GetGlobalPosition(PlayerManager.GetInstance().MainPlayer.comParent);
                    MoneyAnimManager.Instance.PlayMoneyAnim_Explose(EnumMoneyAnimType.Power, 5,
                        globalPos,
                        PlayerManager.GetInstance().MainPlayer.ViewSize.x,
                        cbhandler.gen_handler(
                            () => {
                                //比赛准备完成, 播放体力消耗动画, 结束后开始第一波刷怪
                                GameDataManager.getInstance().MatchInfo.State = EnumMatchState.Start;
                                // this.startSpawnTimer();
                                // this.spawn();//刷怪
                                this.StartSpawnTimer();
                                this.sendNotification(NotificationNames.MATCH_START)
                                this.refreshBattleUI();
                            }))
                    break;
                }
            case NotificationNames.PAUSE_MATCH:
                {
                    let pause = notification.getBody();
                    TimeManager.getInst().Pause(pause);
                    break;
                }
            case NotificationNames.MATCH_COMPLETE:
                {
                    //玩家死亡, 怪物
                    let win = notification.getBody();
                    Log.Debug("MATCH_COMPLETE, win?%s", win)
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
                    let levelId = notification.getBody();
                    Log.Debug("继续挑战关卡%i", levelId)
                    //2019-6-26 16:57:16 结算界面必然领取奖励，因此此处将奖励清零
                    let curGold = 0;
                    this.sendNotification(NotificationNames.MATCH_EXIT_COMMAND, true);
                    this.sendNotification(NotificationNames.MATCH_ENTER_COMMAND, levelId);
                    GameDataManager.getInstance().MatchInfo.GoldNum = curGold;
                    this.refreshBattleUI(true);
                    break;
                }
            case NotificationNames.MONSTER_DIE:
                {
                    let monsterInfo: MonsterDieInfo = notification.getBody();
                    //计算击杀奖励, 点石成金buff*3
                    // let monsterConfigID = monsterInfo.MonsterConfigID;
                    // let config = ConfigManager.GetInstance().GetMonsterConfig(monsterConfigID);
                    // if (config) {
                    let inGoldBuff = PlayerManager.GetInstance().MainPlayer.BuffComp.ContainBuff(EnumBuffType.Gold);
                    let rewardGold = inGoldBuff || Math.random() <= monsterInfo.Config.GoldProbability ? FormulaUtil.CalcMonsterReward(monsterInfo.Level) : 0;
                    if (inGoldBuff) {
                        rewardGold *= ConstDefine.GOLD_BUFF_REWARD_SCALE;
                        AudioManager.GetInstance().PlaySoundByConfigID(EnumSoundID.sound_fight_monster_gold)
                    }
                    GameDataManager.getInstance().MatchInfo.GoldNum += rewardGold;//奖励金币
                    // console.log("奖励金币" + rewardGold);
                    // console.log(monsterInfo.GoldADD + "ggggggggggggggggggg");
                    monsterInfo.GoldADD = 0;
                    if (rewardGold != 0) monsterInfo.GoldADD += 3 + monsterInfo.GoldADD;//金币数量显示
                    this.sendNotification(NotificationNames.UI_OnMonsterKill, monsterInfo) //通知UI金币获取动画
                    // }

                    //刷新比赛进度
                    this.refreshBattleUI();

                    //胜利判定
                    if (GameDataManager.getInstance().LevelInfo.IsGameComplete()) {
                        Log.Debug("怪物都死亡, 玩家胜利")
                        if (GameDataManager.getInstance().MatchInfo.IsGameEnd()) {
                            Log.Warn("比赛已经结束, 但重复判定胜利")
                            return;
                        }
                        //停止飞行中的怪物子弹
                        BulletManager.GetInstance().RecycleAllMonsterBullet();
                        StorageManager.SetLastestLevelTemplate(GameDataManager.getInstance().LevelInfo.CurLevelID, -1);//清理关卡模板信息
                        this.facade.sendNotification(NotificationNames.MATCH_COMPLETE, true)
                    } else {
                        // this.spawn();//刷怪
                        this.spawnVer2();
                        if (monsterInfo.CanSpawnProp) PropSpawnLogic.Instance.TrySpawn();//刷道具
                    }

                    break;
                }
        }
    }

    private monsterToSpawns: MonsterSpawnData[] = [];
    private monsterTimers: number[] = [];
    //开始新关卡
    private StartSpawnTimer() {
        this.monsterToSpawns = []
        this.monsterTimers = [];
        let spawnDatas = GameDataManager.getInstance().LevelInfo.LevelSpawnDatas;
        let delay = 0;
        for (let index = 0; index < spawnDatas.LevelSpawnData.length; index++) {
            let spawnData = spawnDatas.LevelSpawnData[index];
            delay += spawnData.Delay;
            let timer = TimeManager.getInst().once(delay, cbhandler.gen_handler(this.spawnBrushMonsterByTimer, this, spawnData, index));
            this.monsterTimers.push(timer)
        }

        //2019-6-17 19:30:18 提示放在LevelMediator中与音效同时播放
        //2019-6-18 15:16:54 hint2的音效时机更改为仅巨型怪出现的时候播放
        //boss关卡一进入就播放警报
        if (spawnDatas.IsBossLevel) {
            this.sendNotification(NotificationNames.HULK_COMING)
            //2019-6-18 10:37:37 新需求 先暂停背景音乐，播放警告，警告结束后继续播放播放背景音乐
            AudioManager.GetInstance().SetBGSoundVolum(0);
            AudioManager.GetInstance().PlaySoundByConfigID(EnumSoundID.sound_fight_hint_02, true, () => {
                AudioManager.GetInstance().SetBGSoundVolum(ConstDefine.Audio_Music_Volume);
            });
        }
    }

    private ClearSpawnTimer() {
        for (let index = 0; index < this.monsterTimers.length; index++) {
            let timer = this.monsterTimers[index];
            TimeManager.getInst().remove(timer)
        }
    }

    //定时刷一波怪
    private spawnBrushMonsterByTimer(spawnData: LevelSpawnData, index: number) {
        Log.Debug("定时刷怪, 波次" + index)
        this.monsterToSpawns = this.monsterToSpawns.concat(spawnData.Monsters);
        if (spawnData.SoundId > 0) AudioManager.GetInstance().PlaySoundByConfigID(spawnData.SoundId);
        this.spawnVer2();
    }

    private spawnVer2() {
        if (this.monsterToSpawns.length > 0) {
            //检测是否可以刷怪
            if (MonsterSpawnLogic.Instance.CheckCanSpawn()) {
                let levelInfo = GameDataManager.getInstance().LevelInfo;
                let maxSpawnableNum = levelInfo.LevelSpawnDatas.MaxInScreenNum - levelInfo.CurLiveMonsterCount;//最大可刷怪数量
                let spawnNum = Math.min(this.monsterToSpawns.length, maxSpawnableNum);//实际生产数量
                let spawnMonster = this.monsterToSpawns.splice(0, spawnNum);
                this.sendNotification(NotificationNames.CREATE_MONSTER, spawnMonster)
            }
        }
    }

    private refreshBattleUI(refreshGold: boolean = false) {
        let matchProgress = GameDataManager.getInstance().LevelInfo.GetCurProgress();
        if (refreshGold) matchProgress.Gold = GameDataManager.getInstance().MatchInfo.GoldNum;
        this.sendNotification(NotificationNames.UI_RefreshMatchProgressInfo, matchProgress)
    }

    /*
        //刷怪
        private spawn() {
            //1. 是否可以刷怪
            let result = MonsterSpawnLogic.Instance.CheckCanSpawn();
            if (result.Result != EnumSpawnCheckResult.None) {
                //2 是继续刷当前的怪, 还是新的波次
                if (result.Result == EnumSpawnCheckResult.SpawnNextGroup) {
                    GameDataManager.getInstance().LevelInfo.BeforeEnterNextSpawnGroup();//开始刷新波次的准备
                    if (GameDataManager.getInstance().LevelInfo.IslastSpawnGroup()) {
                        //是否是最后一波, 播放音效
                        let isBossLvl = GameDataManager.getInstance().LevelInfo.IsBossLevel();// GameUtil.IsBossLevel(GameDataManager.getInstance().LevelInfo.CurLevelID);
                        //2019-6-17 19:30:18 提示放在LevelMediator中与音效同时播放
                        //2019-6-18 15:16:04 非Boss关卡最后一波播放hint1音效
                        if (!isBossLvl) {
                            AudioManager.GetInstance().PlaySoundByConfigID(EnumSoundID.sound_fight_hint_01);
                        }
                    }
                }
    
                //3 创建怪物对象
                this.addSpawnData(result.Monsters)
                // this.sendNotification(NotificationNames.CREATE_MONSTER, result.Monsters)
            }
        }
    
        //开始刷怪计时
        private spawnTimer: number = -1;
        private sinceLastSpanw = 0;
        private startSpawnTimer() {
            if (this.spawnTimer > 0) {
                this.stopSpawnTimer();
            }
            this.spawnTimer = TimeManager.getInst().addUpdater(cbhandler.gen_handler(this.UpdateSpawn, this))
            this.monsterToSpawns = [];
            this.sinceLastSpanw = 0;
        }
    
        //停止刷怪计时
        private stopSpawnTimer() {
            if (this.spawnTimer > 0) {
                TimeManager.getInst().remove(this.spawnTimer);
                this.spawnTimer = -1;
            }
        }
    
        private addSpawnData(newSpanwData: MonsterSpawnData[]) {
            //记录刷怪的个数, 防止怪物正在排队出现, 但是由于curSpawnMonsterCount没更新,导致继续刷下个怪出现更多怪物. 
            for (let index = 0; index < newSpanwData.length; index++) {
                GameDataManager.getInstance().LevelInfo.OnMonsterSpawn(true);
            }
            this.monsterToSpawns = this.monsterToSpawns.concat(newSpanwData)
        }
    
        //更新刷怪
        private UpdateSpawn(dt: number) {
            if (this.monsterToSpawns.length > 0) {
                this.sinceLastSpanw += dt;
                if (this.sinceLastSpanw >= GameDataManager.getInstance().LevelInfo.LevelSpawnDatas.RefreshInterval) {
                    this.sinceLastSpanw = 0;
                    let monster = this.monsterToSpawns.pop();
                    this.sendNotification(NotificationNames.CREATE_MONSTER, [monster])
                }
            } else {
                this.sinceLastSpanw = 0;
            }
        }
        */
}