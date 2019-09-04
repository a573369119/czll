/*
* 脚本的对象池
*/
interface IScriptPoolObject<T extends IScriptPoolObject<T>> {
    InitPool(pool: ScriptObjectPool<T>, param?: any);
    OnSpawn(param?: any);
    OnRecycle();
    OnDestory();
}

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
class ScriptObjectPool<T extends IScriptPoolObject<T>>{
    protected m_UnusedObjects: Array<T>; //未使用
    protected m_UsedObjects: Array<T>;   //正在使用
    protected curType: { new (): T } //当前脚本类型 typescript 无法new T();
    private param: any; //传递给对象的参数
    private recordeUsed: boolean;//是否记录已生产的,对于子弹等频繁spawn的会增加性能

    /**
     * 初始化脚本池
     * @param size 池大小 
     * @param c 脚本类型
     */
    public Init(size: number, c: new () => T, param?: any, recordUsed: boolean = true) {
        this.param = param;
        this.curType = c;
        this.m_UnusedObjects = new Array<T>();
        this.m_UsedObjects = new Array<T>();
        this.recordeUsed = recordUsed;
        for (let index = 0; index < size; index++) {
            let obj = new this.curType();
            obj.InitPool(this, this.param)
            this.m_UnusedObjects.push(obj);
        }
    }

    /**
     * 获取池对象
     */
    public Spawn(param?: any): T {
        let obj: T = null
        if (this.m_UnusedObjects.length > 0) {
            obj = this.m_UnusedObjects.pop();
        } else {
            obj = new this.curType();// this.factory<T>();
            obj.InitPool(this, this.param)
        }
        if (this.recordeUsed) this.m_UsedObjects.push(obj)
        obj.OnSpawn(param);
        return obj;
    }

    /**
     * 回收池对象
     * @param obj 对象实例
     */
    public Recycle(obj: T) {
        obj.OnRecycle();
        // let indexInUnused = this.m_UnusedObjects.indexOf(obj);
        // if (indexInUnused >= 0) {
        //     Log.Error("重复回收同一个对象")
        // } else {
        this.m_UnusedObjects.push(obj)
        // }
        //todo
        if (this.recordeUsed) {
            let index = this.m_UsedObjects.indexOf(obj)
            if (index >= 0) this.m_UsedObjects.splice(index, 1)
        }
    }

    /**
     * 销毁池
     */
    public Destory() {
        //销毁未使用的
        for (let index = 0; index < this.m_UnusedObjects.length; index++) {
            let obj = this.m_UnusedObjects[index];
            obj.OnDestory();
        }
        this.m_UnusedObjects = null;// new Array<T>();

        //销毁已经使用的
        for (let index = 0; index < this.m_UsedObjects.length; index++) {
            let obj = this.m_UsedObjects[index];
            obj.OnRecycle();
            obj.OnDestory();
        }
        this.m_UsedObjects = null;// new Array<T>();
    }

    /**
     * 获取所有当前已经Spawn的对象
     */
    public GetAllSpawned(): Array<T> {
        return this.m_UsedObjects;
    }
}
