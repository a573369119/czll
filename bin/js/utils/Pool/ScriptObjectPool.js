/**
 * class testPool implements IScriptPoolObject<testPool>
 {
    InitPool(pool: ScriptObjectPool<testPool>) { }
    OnDestory() { }
    OnSpawn() { }
    OnRecycle() { }
}
    例子:
    let obj = new ScriptObjectPool<testPool>();
    obj.Init(2, testPool, param);
 */
var ScriptObjectPool = (function () {
    function ScriptObjectPool() {
    }
    /**
     * 初始化脚本池
     * @param size 池大小
     * @param c 脚本类型
     */
    ScriptObjectPool.prototype.Init = function (size, c, param, recordUsed) {
        if (recordUsed === void 0) { recordUsed = true; }
        this.param = param;
        this.curType = c;
        this.m_UnusedObjects = new Array();
        this.m_UsedObjects = new Array();
        this.recordeUsed = recordUsed;
        for (var index = 0; index < size; index++) {
            var obj = new this.curType();
            obj.InitPool(this, this.param);
            this.m_UnusedObjects.push(obj);
        }
    };
    /**
     * 获取池对象
     */
    ScriptObjectPool.prototype.Spawn = function (param) {
        var obj = null;
        if (this.m_UnusedObjects.length > 0) {
            obj = this.m_UnusedObjects.pop();
        }
        else {
            obj = new this.curType(); // this.factory<T>();
            obj.InitPool(this, this.param);
        }
        if (this.recordeUsed)
            this.m_UsedObjects.push(obj);
        obj.OnSpawn(param);
        return obj;
    };
    /**
     * 回收池对象
     * @param obj 对象实例
     */
    ScriptObjectPool.prototype.Recycle = function (obj) {
        obj.OnRecycle();
        // let indexInUnused = this.m_UnusedObjects.indexOf(obj);
        // if (indexInUnused >= 0) {
        //     Log.Error("重复回收同一个对象")
        // } else {
        this.m_UnusedObjects.push(obj);
        // }
        //todo
        if (this.recordeUsed) {
            var index = this.m_UsedObjects.indexOf(obj);
            if (index >= 0)
                this.m_UsedObjects.splice(index, 1);
        }
    };
    /**
     * 销毁池
     */
    ScriptObjectPool.prototype.Destory = function () {
        //销毁未使用的
        for (var index = 0; index < this.m_UnusedObjects.length; index++) {
            var obj = this.m_UnusedObjects[index];
            obj.OnDestory();
        }
        this.m_UnusedObjects = null; // new Array<T>();
        //销毁已经使用的
        for (var index = 0; index < this.m_UsedObjects.length; index++) {
            var obj = this.m_UsedObjects[index];
            obj.OnRecycle();
            obj.OnDestory();
        }
        this.m_UsedObjects = null; // new Array<T>();
    };
    /**
     * 获取所有当前已经Spawn的对象
     */
    ScriptObjectPool.prototype.GetAllSpawned = function () {
        return this.m_UsedObjects;
    };
    return ScriptObjectPool;
}());
//# sourceMappingURL=ScriptObjectPool.js.map