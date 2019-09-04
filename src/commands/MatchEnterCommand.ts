/*
* name;
*/
class MatchEnterCommand extends puremvc.SimpleCommand {
    execute(notification: puremvc.Notification) {
        Log.Debug("进入比赛前检测是否需要下载资源")
        TimeWatch.Start();
        let levelID = notification.getBody();
        //防止服务器关卡越界
        let maxLevelId = ConfigManager.GetInstance().GetMaxLevelID();
        let playerInfo = GameDataManager.getInstance().LoginPlayerInfo.CurLevel
        if (levelID > maxLevelId) {
            Log.Warn("关卡id越界, 最大关卡%i, 进入关卡%i", maxLevelId, levelID)
            levelID = maxLevelId;
            GameDataManager.getInstance().LoginPlayerInfo.CurLevel = levelID;
        }

        // TimeWatch.Start();
        this.checkDownloadRes(levelID);
    }
    protected checkDownloadRes(levelID: number) {
        // Facade.getInstance().sendNotification(NotificationNames.DOWNLOAD_MULTI_RES_COMMAND, () => {
        //     this.checkSkinRes();
        // })
        this.enter(levelID)
    }

    protected enter(levelID: number) {
        TimeWatch.Stop("比赛初始化")
        TimeWatch.Start();
        //关闭主界面, 打开战斗UI
        this.sendNotification(NotificationNames.HIDEUI, ui.UIID.HomePageUIID)
        this.sendNotification(NotificationNames.DESTROYUI, ui.UIID.MoneyInfoUIID)
        //初始化关卡,关卡波次数据
        this.facade.registerMediator(new LevelMediator(MediatorNames.LEVEL_MEDIATOR));
        GameDataManager.getInstance().OnMathEnter();
        let spawndDatas = MonsterSpawnLogic.Instance.GetSpawnData(levelID)
        GameDataManager.getInstance().LevelInfo.LevelSpawnDatas = spawndDatas;
        //spine对象池加载
        if (!ConstDefine.USE_MODIFY) MatchSpineManager.Instance.InitBeforeMatch(levelID, spawndDatas, this.onSpineLoaded.bind(this))

        //打开战斗UI
        this.sendNotification(NotificationNames.OPENUI, ui.UIID.BattleUIID);

        //子弹初始化
        BulletManager.GetInstance().initManager();
        let bulletIDs = CommonUtil.LoopEnum(EnumBulletOutLookType); //所有子弹
        BulletManager.GetInstance().InitBulletPool(bulletIDs)
        //道具初始化
        let propIds = CommonUtil.LoopEnum(EnumPropType); //所有道具
        PropManager.GetInstance().InitPropPool(propIds);
        //玩家进入比赛
        PlayerManager.GetInstance().MainPlayer.OnEnterMatch();
        //刷新复活次数
        StorageManager.SetRebornNum(ConstDefine.MaxValue_Reborn);

        if (ConstDefine.USE_MODIFY) this.onSpineLoaded();
    }

    private onSpineLoaded() {
        TimeWatch.Stop("比赛Spine加载完成, 初始化怪物")
        TimeWatch.Start();
        //怪物初始化
        PlayerManager.GetInstance().initManager();
        PlayerManager.GetInstance().InitMonsterPool(GameDataManager.getInstance().LevelInfo.LevelSpawnDatas.MonsterIDList);
        TimeWatch.Stop("比赛初始化完成")
        //通知开始刷怪
        this.sendNotification(NotificationNames.MATCH_READY)
    }
}

class MatchExitCommand extends puremvc.SimpleCommand {
    execute(notification: puremvc.Notification) {
        Log.Debug("退出比赛")
        let continueToNext = notification.getBody() ? notification.getBody() : false;

        //清理场景: 怪物, 道具, 特效, 倒计时
        PlayerManager.GetInstance().Destory();
        BulletManager.GetInstance().Destory();
        PropManager.GetInstance().Destory();
        if (!ConstDefine.USE_MODIFY) MatchSpineManager.Instance.DestroyOnExitMatch();
        GameDataManager.getInstance().OnMatchExit();

        this.facade.removeMediator(MediatorNames.LEVEL_MEDIATOR);

        //恢复角色的初始化位置
        PlayerManager.GetInstance().MainPlayer.OnExitMathch();

        //隐藏战斗UI
        this.sendNotification(NotificationNames.HIDEUI, ui.UIID.BattleUIID);
        this.sendNotification(NotificationNames.HIDEUI, ui.UIID.ResultUIID);

        //if (!continueToNext) {
        this.sendNotification(NotificationNames.OPENUI, ui.UIID.HomePageUIID)  //打开主UI
        //}
    }
}