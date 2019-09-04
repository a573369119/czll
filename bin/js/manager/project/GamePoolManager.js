/*
* 游戏怪物,道具,玩家对象池
*/
var GamePoolManager = (function () {
    function GamePoolManager() {
        this.scriptPoolDic = new Laya.Dictionary();
    }
    Object.defineProperty(GamePoolManager, "Instance", {
        get: function () {
            if (!GamePoolManager._inst) {
                GamePoolManager._inst = new GamePoolManager();
            }
            return GamePoolManager._inst;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 初始化池
     * @param poolName 唯一的池名字
     * @param size 池大小
     * @param type
     * @param param 初始化池对象的参数 比如对象的配置表id
     */
    GamePoolManager.prototype.InitPool = function (poolName, size, type, param, recordUsed) {
        if (recordUsed === void 0) { recordUsed = true; }
        if (this.IsExist(poolName)) {
            Log.Warn("对象池已经存在, 不需要重复Init %s", poolName);
            return;
        }
        // Log.Debug("创建对象池%s", poolName)
        var c;
        var pool = new ScriptObjectPool();
        pool.Init(size, type, param, recordUsed);
        this.scriptPoolDic.set(poolName, pool);
    };
    GamePoolManager.prototype.Spawn = function (poolName, param) {
        var c;
        var pool = this.scriptPoolDic.get(poolName);
        if (pool) {
            return pool.Spawn(param);
        }
        else {
            Log.Warn("Spawn的对象池没有初始化%s", poolName);
            return null;
        }
    };
    GamePoolManager.prototype.Recycle = function (obj, poolName) {
        var c;
        var pool = this.scriptPoolDic.get(poolName);
        if (pool) {
            return pool.Recycle(obj);
        }
        else {
            Log.Warn("Recycle的对象池没有初始化%s", poolName);
            return null;
        }
    };
    GamePoolManager.prototype.Destory = function (poolName) {
        // Log.Debug("清理对象池%s", poolName)
        var c;
        var pool = this.scriptPoolDic.get(poolName);
        if (pool) {
            pool.Destory();
            this.scriptPoolDic.remove(poolName);
        }
        else {
            Log.Warn("Destory的对象池没有初始化%s", poolName);
        }
    };
    /**
     * 获取所有已经spawn的对象
     * @param key 池对象key/configid
     */
    GamePoolManager.prototype.GetAllSpawned = function (key) {
        var pool = this.scriptPoolDic.get(key);
        if (pool) {
            return pool.GetAllSpawned();
        }
        else {
            Log.Warn("GetAllSpawned的对象池没有初始化%s", key);
            return null;
        }
    };
    GamePoolManager.prototype.IsExist = function (poolName) {
        return this.scriptPoolDic.get(poolName) != null;
    };
    return GamePoolManager;
}());
//# sourceMappingURL=GamePoolManager.js.map