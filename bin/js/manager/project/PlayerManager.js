/*
* name;
*/
var PlayerManager = (function () {
    function PlayerManager() {
    }
    PlayerManager.GetInstance = function () {
        if (PlayerManager.instance == null) {
            PlayerManager.instance = new PlayerManager();
        }
        return PlayerManager.instance;
    };
    Object.defineProperty(PlayerManager.prototype, "MainPlayer", {
        get: function () { return this.mainPlayer; },
        set: function (value) { this.mainPlayer = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlayerManager.prototype, "monsterPoolDic", {
        get: function () {
            Log.Error("使用GamePoolManager.Instance.Spawn<Monster>(configID)");
            return null;
        },
        enumerable: true,
        configurable: true
    });
    PlayerManager.prototype.initManager = function () {
        this.allSpawnedMonsterDic = new Laya.Dictionary();
    };
    //每次进入战斗先初始化一个本关卡怪物对象池
    PlayerManager.prototype.InitMonsterPool = function (monsterIDList) {
        this.monsterIDList = monsterIDList;
        for (var index = 0; index < this.monsterIDList.length; index++) {
            GamePoolManager.Instance.InitPool(this.monsterIDList[index].toString(), 10, Monster, this.monsterIDList[index]);
        }
    };
    PlayerManager.prototype.Destory = function () {
        //退出比赛清理
        for (var index = 0; index < this.monsterIDList.length; index++) {
            GamePoolManager.Instance.Destory(this.monsterIDList[index].toString());
        }
        this.monsterIDList = null;
        this.allSpawnedMonsterDic = null;
    };
    /**
     * 游戏中刷怪, 同时记录当前刷出数量
     * @param configId
     * @param byLevel true:关卡刷怪, false:其他/技能分裂 创建怪物
     */
    PlayerManager.prototype.SpawnMonster = function (configId, byLevel, param) {
        if (byLevel === void 0) { byLevel = false; }
        GameDataManager.getInstance().LevelInfo.OnMonsterSpawn(byLevel); //关卡刷怪的记录放到levelmediator
        var monster = GamePoolManager.Instance.Spawn(configId.toString(), param);
        monster.AddToStage(); //切换到玩家节点下
        this.allSpawnedMonsterDic.set(monster.UID, monster);
        Log.Debug("刷出怪物%i, uiid:%i， 记录刷怪数据", configId, monster.UID);
        return monster;
    };
    //根据uid获取怪物
    PlayerManager.prototype.GetMonsterByUid = function (uid) {
        return this.allSpawnedMonsterDic.get(uid);
    };
    /**
     * 返回所有spawn的怪物
     */
    PlayerManager.prototype.GetAllSpawnedMonster = function () {
        // let monsterIds = GameDataManager.getInstance().LevelInfo.LevelSpawnDatas.MonsterIDList;
        // let monsters = []
        // for (let index = 0; index < monsterIds.length; index++) {
        //     let monsterId = monsterIds[index];
        //     let spawnedMonsters = GamePoolManager.Instance.GetAllSpawned<Monster>(monsterId.toString())
        //     if (spawnedMonsters.length > 0) monsters = monsters.concat(spawnedMonsters)
        // }
        // return monsters;
        return this.allSpawnedMonsterDic.values;
    };
    /**
     * 游戏中怪物死亡回收, 记录刷出的数据
     * @param configId
     * @param monsterObj
     */
    PlayerManager.prototype.RecycleMonster = function (configId, monsterObj) {
        Log.Info("怪物%i死亡 uid:%i， 记录死亡数据", configId, monsterObj.UID);
        GameDataManager.getInstance().LevelInfo.OnMonsterDie();
        this.allSpawnedMonsterDic.remove(monsterObj.UID);
        GamePoolManager.Instance.Recycle(monsterObj, configId.toString());
    };
    PlayerManager.prototype.PauseAll = function (pause) {
        var monsters = this.GetAllSpawnedMonster();
        for (var index = 0; index < monsters.length; index++) {
            var monster = monsters[index];
            monster.Freeze(pause);
        }
    };
    return PlayerManager;
}());
//# sourceMappingURL=PlayerManager.js.map