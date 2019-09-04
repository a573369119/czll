/*
* 只能初始化有无参构造函数的类
例子:
    ScriptPoolManager.GetInstance().InitPool<Laya.Image>(2, Laya.Image);
    let image = ScriptPoolManager.GetInstance().Spawn<Laya.Image>(Laya.Image)
    ScriptPoolManager.GetInstance().Recycle<Laya.Image>(image, Laya.Image)
*/
var ScriptPoolManager_deprecated = (function () {
    function ScriptPoolManager_deprecated() {
        this.scriptPoolDic = new Laya.Dictionary();
    }
    ScriptPoolManager_deprecated.GetInstance = function () {
        if (!this._inst) {
            this._inst = new ScriptPoolManager_deprecated();
        }
        return this._inst;
    };
    ScriptPoolManager_deprecated.prototype.InitPool = function (size, type) {
        var c;
        var pool = new LayaScriptObjectPool();
        pool.Init(size, type);
        this.scriptPoolDic.set(type, pool);
    };
    ScriptPoolManager_deprecated.prototype.Spawn = function (type) {
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
    ScriptPoolManager_deprecated.prototype.Recycle = function (obj, type) {
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
    ScriptPoolManager_deprecated.prototype.Destory = function (type) {
        var c;
        var pool = this.scriptPoolDic.get(type);
        if (pool) {
            pool.Destory();
            this.scriptPoolDic.remove(type);
        }
        else {
            Log.Warn("Destory的对象池没有初始化");
            null;
        }
    };
    return ScriptPoolManager_deprecated;
}());
//# sourceMappingURL=ScriptPoolManager_deprecated.js.map