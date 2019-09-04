/*
* name;
*/
var CollisionRegionManager = /** @class */ (function () {
    function CollisionRegionManager() {
        this.scriptPoolDic = new Laya.Dictionary();
    }
    Object.defineProperty(CollisionRegionManager, "Instance", {
        get: function () {
            if (!CollisionRegionManager._inst) {
                CollisionRegionManager._inst = new CollisionRegionManager();
            }
            return CollisionRegionManager._inst;
        },
        enumerable: true,
        configurable: true
    });
    CollisionRegionManager.prototype.Refresh = function () {
    };
    return CollisionRegionManager;
}());
//# sourceMappingURL=CollisionRegionManager.js.map