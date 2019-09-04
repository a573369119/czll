/**
* 只能初始化有无参构造函数的类, 其他构造函数需要另外类处理
* 不用new()=>T, 无法使用 new this.curtype();new类

    例子:
    let obj = new LayaScriptObjectPool<testPool>();
    obj.Init(2, testPool);
 */
class LayaScriptObjectPool<T> {
    protected m_UnusedObjects: Array<T>;
    protected curType: { new (): T } //当前脚本类型 typescript 无法new T();

    /**
     * 初始化脚本池
     * @param size 池大小 
     * @param c 脚本类型
     */
    public Init(size: number, c: new () => T) {
        this.curType = c;
        this.m_UnusedObjects = new Array<T>();
        for (let index = 0; index < size; index++) {
            let obj = new this.curType();
            this.m_UnusedObjects.push(obj);
        }
    }

    /**
     * 获取池对象
     */
    public Spawn(): T {
        let obj: T = null
        if (this.m_UnusedObjects.length > 0) {
            obj = this.m_UnusedObjects.pop();
        } else {
            obj = new this.curType();// this.factory<T>();
        }
        return obj;
    }

    /**
     * 回收池对象
     * @param obj 对象实例
     */
    public Recycle(obj: T) {
        this.m_UnusedObjects.push(obj)
    }

    /**
     * 销毁池
     */
    public Destory() {
        //todo destory
        this.m_UnusedObjects = null;
    }
}