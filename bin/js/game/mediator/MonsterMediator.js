var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*
* name;
*/
var MonsterMediator = (function (_super) {
    __extends(MonsterMediator, _super);
    function MonsterMediator() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * 创建怪物
         * @param monsterData 怪物数据
         * @param delay 延迟移动
         * @param byLevel 是否为关卡刷怪
         */
        _this.spawnedCount = 0;
        _this.spawn = true;
        return _this;
    }
    MonsterMediator.prototype.listNotificationInterests = function () {
        _super.prototype.listNotificationInterests.call(this);
        return [
            NotificationNames.CREATE_MONSTER,
            NotificationNames.MONSTER_ENLARGE,
            NotificationNames.MONSTER_PAUSE,
            NotificationNames.MATCH_COMPLETE,
        ];
    };
    MonsterMediator.prototype.handleNotification = function (notification) {
        _super.prototype.handleNotification.call(this, notification);
        switch (notification.getName()) {
            case NotificationNames.CREATE_MONSTER:
                {
                    var param = notification.getBody();
                    if (param instanceof Array) {
                        //关卡刷怪
                        this.createrMonstersByLevel(param);
                    }
                    else {
                        this.createrMonster(param);
                    }
                    break;
                }
            case NotificationNames.MONSTER_ENLARGE:
                {
                    var enlarge = notification.getBody();
                    var monsters = PlayerManager.GetInstance().GetAllSpawnedMonster();
                    for (var index = 0; index < monsters.length; index++) {
                        var monster = monsters[index];
                        if (!monster.IsAlive())
                            continue;
                        var curScale = monster.attributeComp.Scale;
                        monster.attributeComp.AdjustScale = enlarge ? ConstDefine.ENLARGE_BUFF_SCALE : 1; //(ConstDefine.ENLARGE_BUFF_SCALE / curScale.x) : 1;
                        monster.RefreshScale();
                    }
                    break;
                }
            case NotificationNames.MONSTER_PAUSE:
                {
                    var weakenScale = notification.getBody();
                    //停止速度
                    MonsterMoveComponent2D.SpeedScale = weakenScale;
                    var monsters = PlayerManager.GetInstance().GetAllSpawnedMonster();
                    for (var index = 0; index < monsters.length; index++) {
                        var monster = monsters[index];
                        if (!monster.IsAlive())
                            continue;
                        monster.OnPauseBuff(weakenScale < 1); //弱化/恢复: 技能和spine动画
                    }
                    break;
                }
            case NotificationNames.MATCH_COMPLETE:
                {
                    //比赛结束 停止技能 不分裂
                    //let win = notification.getBody();
                    //Log.Debug("MATCH_COMPLETE, win?%s", win)
                    var monsters = PlayerManager.GetInstance().GetAllSpawnedMonster();
                    for (var index = 0; index < monsters.length; index++) {
                        var monster = monsters[index];
                        if (!monster.IsAlive())
                            continue;
                        monster.OnGameComplete();
                    }
                    break;
                }
        }
    };
    MonsterMediator.prototype.createrMonster = function (monsterData, delay, byLevel) {
        // if (this.spawnedCount == 10) return;
        // this.spawnedCount++;;
        // if (this.spawnedCount == 1) {
        //     monsterData.PowerNum = 1;
        //     monsterData.SizeScale.x *= 3;
        //     //monsterData.PowerId = [EnumMonsterPowerId.Split]// EnumMonsterPowerId.Attach,EnumMonsterPowerId.Explosion, EnumMonsterPowerId.Healing]
        //     monsterData.PowerConfigs = [ConfigManager.GetInstance().GetSkillConfig(EnumMonsterPowerType.Attach)]
        // } else {
        //     monsterData.PowerNum = 0;
        //     //monsterData.PowerId = [EnumMonsterPowerId.Split]// EnumMonsterPowerId.Attach,EnumMonsterPowerId.Explosion, EnumMonsterPowerId.Healing]
        //     monsterData.PowerConfigs = []
        // }
        if (delay === void 0) { delay = 0; }
        if (byLevel === void 0) { byLevel = false; }
        var monster = PlayerManager.GetInstance().SpawnMonster(monsterData.MonsterId, byLevel, monsterData); // monsterpool.Spawn();
        monster.comParent.x = Laya.stage.width * Math.random(); //100 + this.spawnedCount * 400;//
        monster.comParent.y = -monster.ViewSize.y * 0.5; //100;//
        monster.monsterMoveComp.monsterRandomMove(delay); //测试不移动
    };
    //关卡刷新波次怪, 依次出现每个怪
    MonsterMediator.prototype.createrMonstersByLevel = function (monsterDatas) {
        var delay = 0;
        for (var index = 0; index < monsterDatas.length; index++) {
            var element = monsterDatas[index];
            this.createrMonster(element, delay, true);
            delay += GameDataManager.getInstance().LevelInfo.LevelSpawnDatas.RefreshInterval;
        }
    };
    return MonsterMediator;
}(BasePlayerMediator));
//# sourceMappingURL=MonsterMediator.js.map