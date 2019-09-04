/*
* name;
*/
var PropSpawnLogic = (function () {
    function PropSpawnLogic() {
        this.curSpawnProbability = ConstDefine.PROP_PROBABILITY; //当前生成道具的概率
    }
    Object.defineProperty(PropSpawnLogic, "Instance", {
        get: function () {
            if (PropSpawnLogic._instance == null) {
                PropSpawnLogic._instance = new PropSpawnLogic();
            }
            return PropSpawnLogic._instance;
        },
        enumerable: true,
        configurable: true
    });
    PropSpawnLogic.prototype.TrySpawn = function () {
        // //每击杀一个敌人有10%的几率生成一个道具，没有生成道具则该几率变成20%，生成道具后重置为10%；
        // if (this.checkCanSpawn()) {
        //     this.curSpawnProbability = ConstDefine.PROP_PROBABILITY;
        this.spawn();
        // } else {
        //     this.curSpawnProbability += ConstDefine.PROP_PROBABILITY;
        // }
    };
    //检测是否能生成道具
    PropSpawnLogic.prototype.checkCanSpawn = function () {
        return Math.random() <= this.curSpawnProbability;
    };
    PropSpawnLogic.prototype.spawn = function () {
        var prop = PropManager.GetInstance().RandomSpawn();
        prop.setPlayerPos(Laya.stage.width * Math.random(), 100);
    };
    return PropSpawnLogic;
}());
//# sourceMappingURL=PropSpawnLogic.js.map