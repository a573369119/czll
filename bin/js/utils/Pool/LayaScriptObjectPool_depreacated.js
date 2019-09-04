/**
* 只能初始化有无参构造函数的类, 其他构造函数需要另外类处理
* 不用new()=>T, 无法使用 new this.curtype();new类

    例子:
    let obj = new LayaScriptObjectPool<testPool>();
    obj.Init(2, testPool);
 */
var LayaScriptObjectPool = (function () {
    function LayaScriptObjectPool() {
    }
    /**
     * 初始化脚本池
     * @param size 池大小
     * @param c 脚本类型
     */
    LayaScriptObjectPool.prototype.Init = function (size, c) {
        this.curType = c;
        this.m_UnusedObjects = new Array();
        for (var index = 0; index < size; index++) {
            var obj = new this.curType();
            this.m_UnusedObjects.push(obj);
        }
    };
    /**
     * 获取池对象
     */
    LayaScriptObjectPool.prototype.Spawn = function () {
        var obj = null;
        if (this.m_UnusedObjects.length > 0) {
            obj = this.m_UnusedObjects.pop();
        }
        else {
            obj = new this.curType(); // this.factory<T>();
        }
        return obj;
    };
    /**
     * 回收池对象
     * @param obj 对象实例
     */
    LayaScriptObjectPool.prototype.Recycle = function (obj) {
        this.m_UnusedObjects.push(obj);
    };
    /**
     * 销毁池
     */
    LayaScriptObjectPool.prototype.Destory = function () {
        //todo destory
        this.m_UnusedObjects = null;
    };
    return LayaScriptObjectPool;
}());
//# sourceMappingURL=LayaScriptObjectPool_depreacated.js.map