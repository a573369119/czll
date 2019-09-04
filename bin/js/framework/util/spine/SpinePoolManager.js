/*
* Spine对象池
*/
var SpinePoolManager = (function () {
    function SpinePoolManager() {
        //SpinePoolManager只在一个地方统一初始化, 不要同时在多处使用,回调会异常.
        this.loadedSpinePoolCount = 0;
        this.targetSpinePoolNum = 0;
        this.scriptPoolDic = new Laya.Dictionary();
    }
    SpinePoolManager.GetInstance = function () {
        if (!this._inst) {
            this._inst = new SpinePoolManager();
        }
        return this._inst;
    };
    /**
     *
     * @param spineConfigIDs 要加载的spine配置表idlist
     * @param sizeArray 初始化的池大小
     * @param onComplete 加载回调(this.successIds, this.failedIds)
     */
    SpinePoolManager.prototype.InitPool = function (spineConfigIDs, onComplete, sizeArray, onProgress) {
        var idsToLoad = CommonUtil.RemoveRepeated(spineConfigIDs);
        this.targetSpinePoolNum = idsToLoad.length;
        this.loadedSpinePoolCount = 0;
        this.successIds = [];
        this.failedIds = [];
        for (var index = 0; index < idsToLoad.length; index++) {
            var configId = idsToLoad[index];
            var config = ConfigManager.GetInstance().GetSpineConfig(configId);
            if (config) {
                var pool = new SpineObjectPool();
                pool.Init(config.SpinePath, config.PoolSize, this.onSpineLoadedSuccess.bind(this), this.onSpienLoadedFail.bind(this), [config.id, onComplete, onProgress], [config.id, onComplete, onProgress]);
                this.scriptPoolDic.set(config.GetID(), pool);
            }
            else {
                Log.Error("spineConfigID:%i没有配置", configId);
            }
        }
    };
    SpinePoolManager.prototype.onSpineLoadedSuccess = function (url, args) {
        this.loadedSpinePoolCount++;
        this.successIds.push(args[0]);
        if (args[2]) {
            args[2](this.loadedSpinePoolCount / this.targetSpinePoolNum);
        }
        if (this.targetSpinePoolNum == this.loadedSpinePoolCount) {
            args[1](this.successIds, this.failedIds);
        }
    };
    SpinePoolManager.prototype.onSpienLoadedFail = function (url, errMsg, args) {
        this.loadedSpinePoolCount++;
        this.failedIds.push(args[0]);
        if (args[2]) {
            args[2](this.loadedSpinePoolCount / this.targetSpinePoolNum);
        }
        if (this.targetSpinePoolNum == this.loadedSpinePoolCount) {
            args[1](this.successIds, this.failedIds);
        }
    };
    SpinePoolManager.prototype.Spawn = function (spineCOnfigID) {
        var pool = this.scriptPoolDic.get(spineCOnfigID);
        if (pool) {
            return pool.Spawn();
        }
        else {
            Log.Error("Spawn的Spine对象池没有初始化 %i", spineCOnfigID);
            return null;
        }
    };
    SpinePoolManager.prototype.Recycle = function (spineConfigID, skeleton) {
        var pool = this.scriptPoolDic.get(spineConfigID);
        if (pool) {
            return pool.Recycle(skeleton);
        }
        else {
            Log.Warn("Recycle的Spine对象池没有初始化%i", spineConfigID);
            return null;
        }
    };
    SpinePoolManager.prototype.Destory = function (configId) {
        var pool = this.scriptPoolDic.get(configId);
        if (pool) {
            pool.Destory();
            this.scriptPoolDic.remove(configId);
        }
        else {
            Log.Warn("Destory的Spine对象池没有初始化%s", configId);
        }
    };
    SpinePoolManager.prototype.pause = function (isPause, spineConfigID) {
        var pool = this.scriptPoolDic.get(spineConfigID);
        if (pool) {
            if (isPause)
                pool.pause(true);
            else
                pool.pause(false);
        }
    };
    return SpinePoolManager;
}());
//# sourceMappingURL=SpinePoolManager.js.map