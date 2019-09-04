/*
* Spine对象池
*/
class SpinePoolManager {
    private static _inst: SpinePoolManager;
    private scriptPoolDic: Laya.Dictionary;

    private constructor() {
        this.scriptPoolDic = new Laya.Dictionary();
    }

    public static GetInstance() {
        if (!this._inst) {
            this._inst = new SpinePoolManager();
        }
        return this._inst;
    }

    //SpinePoolManager只在一个地方统一初始化, 不要同时在多处使用,回调会异常.
    private loadedSpinePoolCount: number = 0;
    private targetSpinePoolNum: number = 0;
    private successIds: number[];
    private failedIds: number[];
    /**
     * 
     * @param spineConfigIDs 要加载的spine配置表idlist
     * @param sizeArray 初始化的池大小
     * @param onComplete 加载回调(this.successIds, this.failedIds)
     */
    public InitPool(spineConfigIDs: number[], onComplete: Function, sizeArray?: number[], onProgress?: Function) {
        let idsToLoad = CommonUtil.RemoveRepeated(spineConfigIDs);

        this.targetSpinePoolNum = idsToLoad.length;
        this.loadedSpinePoolCount = 0;
        this.successIds = [];
        this.failedIds = [];

        for (let index = 0; index < idsToLoad.length; index++) {
            let configId = idsToLoad[index];
            let config = ConfigManager.GetInstance().GetSpineConfig(configId);
            if (config) {
                let pool = new SpineObjectPool();
                pool.Init(config.SpinePath,
                    config.PoolSize,
                    this.onSpineLoadedSuccess.bind(this),
                    this.onSpienLoadedFail.bind(this),
                    [config.id, onComplete, onProgress], [config.id, onComplete, onProgress]);
                this.scriptPoolDic.set(config.GetID(), pool);
            } else {
                Log.Error("spineConfigID:%i没有配置", configId)
            }
        }
    }

    private onSpineLoadedSuccess(url: string, args: any[]) {
        this.loadedSpinePoolCount++;
        this.successIds.push(args[0]);
        if (args[2]) {
            args[2](this.loadedSpinePoolCount / this.targetSpinePoolNum)
        }
        if (this.targetSpinePoolNum == this.loadedSpinePoolCount) {
            args[1](this.successIds, this.failedIds)
        }
    }

    private onSpienLoadedFail(url: string, errMsg: any, args: any[]) {
        this.loadedSpinePoolCount++;
        this.failedIds.push(args[0])
        if (args[2]) {
            args[2](this.loadedSpinePoolCount / this.targetSpinePoolNum)
        }
        if (this.targetSpinePoolNum == this.loadedSpinePoolCount) {
            args[1](this.successIds, this.failedIds)
        }
    }

    public Spawn(spineCOnfigID: number): Laya.Skeleton {
        let pool = this.scriptPoolDic.get(spineCOnfigID);
        if (pool) {
            return pool.Spawn();
        } else {
            Log.Error("Spawn的Spine对象池没有初始化 %i", spineCOnfigID)
            return null;
        }
    }

    public Recycle(spineConfigID: number, skeleton: Laya.Skeleton) {
        let pool = this.scriptPoolDic.get(spineConfigID) as SpineObjectPool;
        if (pool) {
            return pool.Recycle(skeleton);
        } else {
            Log.Warn("Recycle的Spine对象池没有初始化%i", spineConfigID)
            return null;
        }
    }

    public Destory(configId: number) {
        let pool = this.scriptPoolDic.get(configId) as SpineObjectPool;
        if (pool) {
            pool.Destory();
            this.scriptPoolDic.remove(configId)
        } else {
            Log.Warn("Destory的Spine对象池没有初始化%s", configId)
        }
    }

    public pause(isPause, spineConfigID) {
        let pool = this.scriptPoolDic.get(spineConfigID);
        if (pool) {
            if (isPause) pool.pause(true);
            else pool.pause(false);
        }
    }
}