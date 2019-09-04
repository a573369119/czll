/*
* name;
*/
class MonsterMediator extends BasePlayerMediator {

    listNotificationInterests() {
        super.listNotificationInterests();
        return [
            NotificationNames.CREATE_MONSTER,
            NotificationNames.MONSTER_ENLARGE,
            NotificationNames.MONSTER_PAUSE,
            NotificationNames.MATCH_COMPLETE,
        ];
    }

    handleNotification(notification: puremvc.INotification) {
        super.handleNotification(notification);
        switch (notification.getName()) {

            case NotificationNames.CREATE_MONSTER:
                {
                    let param = notification.getBody();
                    if (param instanceof Array) {
                        //关卡刷怪
                        this.createrMonstersByLevel(param)
                    } else {
                        this.createrMonster(param)
                    }
                    break;
                }
            case NotificationNames.MONSTER_ENLARGE:
                {
                    let enlarge = notification.getBody();
                    let monsters = PlayerManager.GetInstance().GetAllSpawnedMonster();
                    for (let index = 0; index < monsters.length; index++) {
                        let monster = monsters[index];
                        if (!monster.IsAlive()) continue;
                        let curScale = monster.attributeComp.Scale;
                        monster.attributeComp.AdjustScale = enlarge ? ConstDefine.ENLARGE_BUFF_SCALE : 1;//(ConstDefine.ENLARGE_BUFF_SCALE / curScale.x) : 1;
                        monster.RefreshScale();
                    }
                    break;
                }
            case NotificationNames.MONSTER_PAUSE:
                {
                    let weakenScale = notification.getBody();
                    //停止速度
                    MonsterMoveComponent2D.SpeedScale = weakenScale;
                    let monsters = PlayerManager.GetInstance().GetAllSpawnedMonster();
                    for (let index = 0; index < monsters.length; index++) {
                        let monster = monsters[index];
                        if (!monster.IsAlive()) continue;
                        monster.OnPauseBuff(weakenScale < 1); //弱化/恢复: 技能和spine动画
                    }
                    break;
                }
            case NotificationNames.MATCH_COMPLETE:
                {
                    //比赛结束 停止技能 不分裂
                    //let win = notification.getBody();
                    //Log.Debug("MATCH_COMPLETE, win?%s", win)
                    let monsters = PlayerManager.GetInstance().GetAllSpawnedMonster();
                    for (let index = 0; index < monsters.length; index++) {
                        let monster = monsters[index];
                        if (!monster.IsAlive()) continue;
                        monster.OnGameComplete();
                    }
                    break;
                }
        }
    }

    /**
     * 创建怪物
     * @param monsterData 怪物数据
     * @param delay 延迟移动
     * @param byLevel 是否为关卡刷怪
     */
    private spawnedCount = 0;
    createrMonster(monsterData: MonsterSpawnData, delay: number = 0, byLevel: boolean = false): void {
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

        var monster: Monster = PlayerManager.GetInstance().SpawnMonster(monsterData.MonsterId, byLevel, monsterData);// monsterpool.Spawn();
        monster.comParent.x = Laya.stage.width * Math.random();//100 + this.spawnedCount * 400;//
        monster.comParent.y = - monster.ViewSize.y * 0.5;//100;//
        monster.monsterMoveComp.monsterRandomMove(delay) //测试不移动
    }
    private spawn: boolean = true;

    //关卡刷新波次怪, 依次出现每个怪
    createrMonstersByLevel(monsterDatas: MonsterSpawnData[]) {
        let delay = 0;
        for (let index = 0; index < monsterDatas.length; index++) {
            let element = monsterDatas[index];
            this.createrMonster(element, delay, true)
            delay += GameDataManager.getInstance().LevelInfo.LevelSpawnDatas.RefreshInterval;
        }
    }



}
