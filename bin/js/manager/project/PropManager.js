/*
* name;
*/
var PropManager = (function () {
    function PropManager() {
    }
    PropManager.GetInstance = function () {
        if (PropManager.instance == null) {
            PropManager.instance = new PropManager();
        }
        return PropManager.instance;
    };
    //每次进入战斗先初始化一个道具对象池
    PropManager.prototype.InitPropPool = function (propIdList) {
        this.allSpawnedPropDic = new Laya.Dictionary();
        this.propIdList = propIdList;
        for (var index = 0; index < this.propIdList.length; index++) {
            var propId = this.propIdList[index];
            GamePoolManager.Instance.InitPool(this.GetPropPoolName(propId), 2, Prop, propId);
        }
    };
    /**
     * 游戏中刷道具
     * @param propId
     */
    PropManager.prototype.Spawn = function (propId) {
        // Log.Debug("刷出道具%s", EnumPropType[propId])
        var prop = GamePoolManager.Instance.Spawn(this.GetPropPoolName(propId));
        this.allSpawnedPropDic.set(prop.UID, prop);
        return prop;
    };
    /**
     * 返回所有spawn的道具
     */
    PropManager.prototype.GetAll = function () {
        return this.allSpawnedPropDic.values;
    };
    /**
     * 游戏中道具回收
     * @param propId
     * @param propObj
     */
    PropManager.prototype.Recycle = function (propId, propObj) {
        // Log.Debug("回收道具%s", EnumPropType[propId])
        this.allSpawnedPropDic.remove(propObj.UID);
        GamePoolManager.Instance.Recycle(propObj, this.GetPropPoolName(propId));
    };
    PropManager.prototype.Destory = function () {
        //退出比赛清理
        for (var index = 0; index < this.propIdList.length; index++) {
            GamePoolManager.Instance.Destory(this.GetPropPoolName(this.propIdList[index]));
        }
        this.propIdList = null;
        this.allSpawnedPropDic = null;
    };
    //随机产生一个
    PropManager.prototype.RandomSpawn = function () {
        var random = Math.random();
        var propSpawnProp = ConfigManager.GetInstance().GetPropSpawnWeight();
        for (var index = 0; index < propSpawnProp.length; index++) {
            var spawnInfo = propSpawnProp[index];
            if (spawnInfo.ProbabilityRange >= random || index == propSpawnProp.length - 1)
                return this.Spawn(spawnInfo.Config.GetID());
        }
        // let random = Math.floor(Math.random() * this.propIdList.length);
        // return this.Spawn(this.propIdList[random])
        //random = Math.random();
        // if (random <= 0.3) return this.Spawn(EnumBuffType.Gold)
        // if (random <= 0.6) return this.Spawn(EnumBuffType.FightBack)
        //return this.Spawn(EnumBuffType.Weaken)
    };
    PropManager.prototype.PauseAll = function (pause) {
        // let monsters = this.GetAllSpawnedMonster();
        // for (let index = 0; index < monsters.length; index++) {
        //     let monster = monsters[index];
        //     monster.Freeze(pause)
        // }
    };
    PropManager.prototype.GetPropPoolName = function (propId) {
        return "PropPoolName" + propId;
    };
    return PropManager;
}());
//# sourceMappingURL=PropManager.js.map