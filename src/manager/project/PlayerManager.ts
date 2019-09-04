/*
* name;
*/
class PlayerManager {
    private static instance: PlayerManager;
    public static GetInstance(): PlayerManager {
        if (PlayerManager.instance == null) {
            PlayerManager.instance = new PlayerManager();
        }
        return PlayerManager.instance;
    }

    private mainPlayer: MainPlayer;             //玩家
    private allSpawnedMonsterDic: Laya.Dictionary;     //当前存活的怪物
    private monsterIDList: Array<number>;       //本关的怪物IDs


    public get MainPlayer(): MainPlayer { return this.mainPlayer; }
    public set MainPlayer(value: MainPlayer) { this.mainPlayer = value; }
    public get monsterPoolDic(): Laya.Dictionary {
        Log.Error("使用GamePoolManager.Instance.Spawn<Monster>(configID)")
        return null;
    }


    public initManager(): void {
        this.allSpawnedMonsterDic = new Laya.Dictionary();
    }

    //每次进入战斗先初始化一个本关卡怪物对象池
    public InitMonsterPool(monsterIDList: number[]): void {
        this.monsterIDList = monsterIDList;
        for (var index = 0; index < this.monsterIDList.length; index++) {
            GamePoolManager.Instance.InitPool<Monster>(this.monsterIDList[index].toString(), 10, Monster, this.monsterIDList[index]);
        }
    }

    public Destory() {
        //退出比赛清理
        for (var index = 0; index < this.monsterIDList.length; index++) {
            GamePoolManager.Instance.Destory<Monster>(this.monsterIDList[index].toString());
        }
        this.monsterIDList = null;
        this.allSpawnedMonsterDic = null;
    }


    /**
     * 游戏中刷怪, 同时记录当前刷出数量
     * @param configId 
     * @param byLevel true:关卡刷怪, false:其他/技能分裂 创建怪物
     */
    public SpawnMonster(configId: number, byLevel: boolean = false, param?: any): Monster {
        GameDataManager.getInstance().LevelInfo.OnMonsterSpawn(byLevel); //关卡刷怪的记录放到levelmediator
        let monster = GamePoolManager.Instance.Spawn<Monster>(configId.toString(), param)
        monster.AddToStage();//切换到玩家节点下
        this.allSpawnedMonsterDic.set(monster.UID, monster);
        Log.Debug("刷出怪物%i, uiid:%i， 记录刷怪数据", configId, monster.UID)
        return monster;
    }

    //根据uid获取怪物
    public GetMonsterByUid(uid: number): Monster {
        return this.allSpawnedMonsterDic.get(uid);
    }
    /**
     * 返回所有spawn的怪物
     */
    public GetAllSpawnedMonster(): Array<Monster> {
        // let monsterIds = GameDataManager.getInstance().LevelInfo.LevelSpawnDatas.MonsterIDList;
        // let monsters = []
        // for (let index = 0; index < monsterIds.length; index++) {
        //     let monsterId = monsterIds[index];
        //     let spawnedMonsters = GamePoolManager.Instance.GetAllSpawned<Monster>(monsterId.toString())
        //     if (spawnedMonsters.length > 0) monsters = monsters.concat(spawnedMonsters)
        // }
        // return monsters;

        return (this.allSpawnedMonsterDic.values as Monster[]);
    }

    /**
     * 游戏中怪物死亡回收, 记录刷出的数据
     * @param configId 
     * @param monsterObj 
     */
    public RecycleMonster(configId: number, monsterObj: Monster) {
        Log.Info("怪物%i死亡 uid:%i， 记录死亡数据", configId, monsterObj.UID)
        GameDataManager.getInstance().LevelInfo.OnMonsterDie();
        this.allSpawnedMonsterDic.remove(monsterObj.UID);
        GamePoolManager.Instance.Recycle<Monster>(monsterObj, configId.toString());
    }


    public PauseAll(pause: boolean) {
        let monsters = this.GetAllSpawnedMonster();
        for (let index = 0; index < monsters.length; index++) {
            let monster = monsters[index];
            monster.Freeze(pause)
        }
    }

}