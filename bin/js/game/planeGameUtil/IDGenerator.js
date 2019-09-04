/*
* 产生唯一id
*/
var IDGenerator = (function () {
    function IDGenerator() {
    }
    IDGenerator.GenMonsterID = function () {
        var id = IDGenerator.MONSTER_ID_BASE + ++IDGenerator.monsterIdCount;
        if (id >= Number.MAX_VALUE - 1) {
            IDGenerator.monsterIdCount = 0;
            id = IDGenerator.MONSTER_ID_BASE + ++IDGenerator.monsterIdCount;
        }
        return id;
    };
    IDGenerator.GenPropID = function () {
        var id = IDGenerator.PROP_ID_BASE + ++IDGenerator.propIdCount;
        if (id >= Number.MAX_VALUE - 1) {
            IDGenerator.propIdCount = 0;
            id = IDGenerator.PROP_ID_BASE + ++IDGenerator.propIdCount;
        }
        return id;
    };
    IDGenerator.GenBulletID = function () {
        var id = IDGenerator.BULLET_ID_BASE + ++IDGenerator.bulletIdCount;
        if (id >= Number.MAX_VALUE - 1) {
            IDGenerator.bulletIdCount = 0;
            id = IDGenerator.BULLET_ID_BASE + ++IDGenerator.bulletIdCount;
        }
        return id;
    };
    return IDGenerator;
}());
IDGenerator.MONSTER_ID_BASE = 10000;
IDGenerator.PROP_ID_BASE = 20000;
IDGenerator.BULLET_ID_BASE = 30000;
IDGenerator.monsterIdCount = 0;
IDGenerator.propIdCount = 0;
IDGenerator.bulletIdCount = 0;
//# sourceMappingURL=IDGenerator.js.map