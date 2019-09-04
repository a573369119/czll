/*
* 游戏怪物,道具,玩家对象池
*/
class GamePoolManager {
    private static _inst: GamePoolManager;
    private scriptPoolDic: Laya.Dictionary;

    private constructor() {
        this.scriptPoolDic = new Laya.Dictionary();
    }

    public static get Instance(): GamePoolManager {
        if (!GamePoolManager._inst) {
            GamePoolManager._inst = new GamePoolManager();
        }
        return GamePoolManager._inst;
    }

    /**
     * 初始化池
     * @param poolName 唯一的池名字 
     * @param size 池大小
     * @param type 
     * @param param 初始化池对象的参数 比如对象的配置表id
     */
    public InitPool<T extends IScriptPoolObject<T>>(poolName: string, size: number, type: new () => T, param?: any, recordUsed: boolean = true) {
        if (this.IsExist(poolName)) {
            Log.Warn("对象池已经存在, 不需要重复Init %s", poolName)
            return;
        }
        // Log.Debug("创建对象池%s", poolName)
        let c: new () => T;
        let pool = new ScriptObjectPool<T>();
        pool.Init(size, type, param, recordUsed)
        this.scriptPoolDic.set(poolName, pool);
    }


    public Spawn<T extends IScriptPoolObject<T>>(poolName: string, param?: any): T {
        let c: new () => T;
        let pool = this.scriptPoolDic.get(poolName) as ScriptObjectPool<T>;
        if (pool) {
            return pool.Spawn(param);
        } else {
            Log.Warn("Spawn的对象池没有初始化%s", poolName)
            return null;
        }
    }

    public Recycle<T extends IScriptPoolObject<T>>(obj: T, poolName: string) {
        let c: new () => T;
        let pool = this.scriptPoolDic.get(poolName) as ScriptObjectPool<T>;
        if (pool) {
            return pool.Recycle(obj);
        } else {
            Log.Warn("Recycle的对象池没有初始化%s", poolName)
            return null;
        }
    }

    public Destory<T extends IScriptPoolObject<T>>(poolName: string) {
        // Log.Debug("清理对象池%s", poolName)
        let c: new () => T;
        let pool = this.scriptPoolDic.get(poolName) as ScriptObjectPool<T>;
        if (pool) {
            pool.Destory();
            this.scriptPoolDic.remove(poolName)
        } else {
            Log.Warn("Destory的对象池没有初始化%s", poolName)
        }
    }

    /**
     * 获取所有已经spawn的对象
     * @param key 池对象key/configid
     */
    public GetAllSpawned<T extends IScriptPoolObject<T>>(key: string): Array<T> {
        let pool = this.scriptPoolDic.get(key) as ScriptObjectPool<T>;
        if (pool) {
            return pool.GetAllSpawned();
        } else {
            Log.Warn("GetAllSpawned的对象池没有初始化%s", key)
            return null;
        }
    }

    private IsExist(poolName: string): boolean {
        return this.scriptPoolDic.get(poolName) != null;
    }
}