/*
* 只能初始化有无参构造函数的类
例子:
    // ScriptPoolManager.GetInstance().InitPool<Laya.Image>(2, Laya.Image);
    // let image = ScriptPoolManager.GetInstance().Spawn<Laya.Image>(Laya.Image)
    // ScriptPoolManager.GetInstance().Recycle<Laya.Image>(image, Laya.Image)
*/
var ScriptPoolManager = (function () {
    function ScriptPoolManager() {
        this.scriptPoolDic = new Laya.Dictionary();
    }
    ScriptPoolManager.GetInstance = function () {
        if (!this._inst) {
            this._inst = new ScriptPoolManager();
        }
        return this._inst;
    };
    ScriptPoolManager.prototype.InitPool = function (size, type, param) {
        var c;
        var pool = new ScriptObjectPool();
        pool.Init(size, type, param);
        this.scriptPoolDic.set(type, pool);
    };
    ScriptPoolManager.prototype.Spawn = function (type) {
        var c;
        var pool = this.scriptPoolDic.get(type);
        if (pool) {
            return pool.Spawn();
        }
        else {
            Log.Warn("Spawn的对象池没有初始化");
            return null;
        }
    };
    ScriptPoolManager.prototype.Recycle = function (obj, type) {
        var c;
        var pool = this.scriptPoolDic.get(type);
        if (pool) {
            return pool.Recycle(obj);
        }
        else {
            Log.Warn("Recycle的对象池没有初始化");
            return null;
        }
    };
    ScriptPoolManager.prototype.Destory = function (type) {
        var c;
        var pool = this.scriptPoolDic.get(type);
        if (pool) {
            pool.Destory();
            this.scriptPoolDic.remove(type);
        }
        else {
            Log.Warn("Destory的对象池没有初始化");
        }
    };
    return ScriptPoolManager;
}());
//# sourceMappingURL=ScriptPoolManager.js.map