/*
* name;
*/
var CollisionDetector = (function () {
    function CollisionDetector() {
    }
    Object.defineProperty(CollisionDetector, "Instance", {
        get: function () {
            if (CollisionDetector._instace == null) {
                CollisionDetector._instace = new CollisionDetector();
            }
            return CollisionDetector._instace;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 检测两个盒子碰撞
     * @param shape1
     * @param shape2
     */
    CollisionDetector.prototype.CheckBoxCollision = function (shape1, shape2) {
        //return CommonUtil.IsBoxPointCrossed(shape1 as BoxCollisonInfo, shape2.center);
        return CommonUtil.IsBoxCrossed(shape1, shape2);
    };
    /**
     * 检测矩形和怪物碰撞
     * @param boxPos
     * @param boxCenter
     * @param attacking true:怪物主动攻击的碰撞检测 false:怪物受攻击碰撞检测
     */
    CollisionDetector.prototype.CheckMonsterCollision = function (boxCenter, boxSize, attacking, multiCheck) {
        if (attacking === void 0) { attacking = false; }
        if (multiCheck === void 0) { multiCheck = true; }
        var shape = new BoxCollisonInfo(boxCenter, boxSize);
        return this.CheckMonsterCollisionByShape(shape, attacking, multiCheck);
    };
    /**
     *
     * @param shape
     * @param attacking true:怪物主动攻击的碰撞检测 false:怪物受攻击碰撞检测
     * @param multiCheck true:检测多个碰撞, false:有一个碰撞就返回
     */
    CollisionDetector.prototype.CheckMonsterCollisionByShape = function (shape, attacking, multiCheck) {
        if (attacking === void 0) { attacking = false; }
        if (multiCheck === void 0) { multiCheck = true; }
        var collidedMonster = [];
        var monsters = PlayerManager.GetInstance().GetAllSpawnedMonster();
        for (var index = 0; index < monsters.length; index++) {
            var monster = monsters[index];
            if (!monster.IsAlive())
                continue;
            var collisionInfo = monster.GetCollisionShapeInfo(attacking);
            if (CommonUtil.IsBoxCrossed(collisionInfo, shape)) {
                collidedMonster.push(monster);
                if (!multiCheck)
                    break;
            }
        }
        return collidedMonster;
    };
    /**
     * 检测矩形和怪物子弹碰撞
     * @param boxPos
     * @param boxCenter
     */
    CollisionDetector.prototype.CheckMonsterBulletCollision = function (shape) {
        var collidedMonster = [];
        var bullets = BulletManager.GetInstance().GetAllSpawnedBullet(EnumBulletOutLookType.MonsterBullet);
        for (var index = 0; index < bullets.length; index++) {
            var bullet = bullets[index];
            var collisionInfo = bullet.GetCollisionShapeInfo();
            if (CommonUtil.IsBoxCrossed(collisionInfo, shape)) {
                return bullet;
            }
        }
        return null;
    };
    /**
     * 检测矩形和道具碰撞
     * @param shape
     */
    CollisionDetector.prototype.CheckPropCollision = function (shape) {
        var collidedProps = [];
        var props = PropManager.GetInstance().GetAll();
        for (var index = 0; index < props.length; index++) {
            var prop = props[index];
            var collisionInfo = prop.GetCollisionShapeInfo();
            if (CommonUtil.IsBoxCrossed(collisionInfo, shape)) {
                collidedProps.push(prop);
            }
        }
        return collidedProps;
    };
    /**
     * 检测扇形和怪物碰撞
     * @param boxCenter
     * @param boxSize
     * @param sectorCenter
     * @param radius
     * @param sectorAngle
     */
    CollisionDetector.prototype.CheckMonsterCollisionSectorByShape = function (shape, checkBullets) {
        if (checkBullets === void 0) { checkBullets = false; }
        var collidedMonster = [];
        var monstersOrMonsterBullets = checkBullets ?
            BulletManager.GetInstance().GetAllSpawnedBullet(EnumBulletOutLookType.MonsterBullet) :
            PlayerManager.GetInstance().GetAllSpawnedMonster();
        for (var index = 0; index < monstersOrMonsterBullets.length; index++) {
            var monster = monstersOrMonsterBullets[index];
            if (!checkBullets && !monster.IsAlive())
                continue;
            var collisionInfo = monster.GetCollisionShapeInfo();
            var collided = false;
            collided = CommonUtil.IsBoxCrossedSector(collisionInfo, shape, true);
            if (collided) {
                collidedMonster.push(monster);
                break;
            }
        }
        return collidedMonster;
    };
    /**
     * 获取圆范围内的怪物
     * @param center
     * @param radius
     */
    CollisionDetector.prototype.CheckMonsterInCircle = function (center, radius, exceptMonsterUids, maxNum) {
        var collidedMonster = [];
        var monsters = PlayerManager.GetInstance().GetAllSpawnedMonster();
        for (var index = 0; index < monsters.length; index++) {
            var monster = monsters[index];
            if (!monster.IsAlive())
                continue;
            if (exceptMonsterUids && exceptMonsterUids.indexOf(monster.UID) >= 0)
                continue; //不检测指定list上的monster
            var collisionInfo = monster.GetCollisionShapeInfo();
            var point = collisionInfo.center;
            if (CommonUtil.IsPointInCircle(point, center, radius)) {
                collidedMonster.push(monster);
                if (maxNum && collidedMonster.length == maxNum)
                    break; //达到最大数量
            }
        }
        return collidedMonster;
    };
    /**
     * 是否在圆内
     * @param center
     * @param radius
     */
    CollisionDetector.prototype.IsPlayerInCircle = function (center, radius, monster) {
        var collisionInfo = monster.GetCollisionShapeInfo();
        var point = collisionInfo.center;
        return CommonUtil.IsPointInCircle(point, center, radius);
    };
    return CollisionDetector;
}());
//# sourceMappingURL=CollisionDetector.js.map