/*
* 只能初始化有无参构造函数的类
例子:
    ScriptPoolManager.GetInstance().InitPool<Laya.Image>(2, Laya.Image);
    let image = ScriptPoolManager.GetInstance().Spawn<Laya.Image>(Laya.Image)
    ScriptPoolManager.GetInstance().Recycle<Laya.Image>(image, Laya.Image)
*/
class ScriptPoolManager_deprecated {
    private static _inst: ScriptPoolManager_deprecated;
    private scriptPoolDic: Laya.Dictionary;

    private constructor() {
        this.scriptPoolDic = new Laya.Dictionary();
    }

    static GetInstance() {
        if (!this._inst) {
            this._inst = new ScriptPoolManager_deprecated();
        }
        return this._inst;
    }

    public InitPool<T>(size: number, type: new () => T) {
        let c: new () => T;
        let pool = new LayaScriptObjectPool<T>();
        pool.Init(size, type)
        this.scriptPoolDic.set(type, pool);
    }

    public Spawn<T>(type: new () => T): T {
        let c: new () => T;
        let pool = this.scriptPoolDic.get(type) as LayaScriptObjectPool<T>;
        if (pool) {
            return pool.Spawn();
        } else {
            Log.Warn("Spawn的对象池没有初始化")
            return null;
        }
    }

    public Recycle<T>(obj: T, type: new () => T) {
        let c: new () => T;
        let pool = this.scriptPoolDic.get(type) as LayaScriptObjectPool<T>;
        if (pool) {
            return pool.Recycle(obj);
        } else {
            Log.Warn("Recycle的对象池没有初始化")
            return null;
        }
    }

    public Destory<T>(type: new () => T) {
        let c: new () => T;
        let pool = this.scriptPoolDic.get(type) as LayaScriptObjectPool<T>;
        if (pool) {
            pool.Destory();
            this.scriptPoolDic.remove(type)
        } else {
            Log.Warn("Destory的对象池没有初始化")
            null;
        }
    }
}