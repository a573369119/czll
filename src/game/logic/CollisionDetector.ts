/*
* name;
*/
class CollisionDetector {
    private static _instace: CollisionDetector;

    public static get Instance(): CollisionDetector {
        if (CollisionDetector._instace == null) {
            CollisionDetector._instace = new CollisionDetector();
        }
        return CollisionDetector._instace;
    }

    /**
     * 检测两个盒子碰撞
     * @param shape1 
     * @param shape2 
     */
    public CheckBoxCollision(shape1: CollsionShapInfo, shape2: CollsionShapInfo): boolean {
        //return CommonUtil.IsBoxPointCrossed(shape1 as BoxCollisonInfo, shape2.center);
        return CommonUtil.IsBoxCrossed(shape1 as BoxCollisonInfo, shape2 as BoxCollisonInfo);

    }

    /**
     * 检测矩形和怪物碰撞
     * @param boxPos 
     * @param boxCenter 
     * @param attacking true:怪物主动攻击的碰撞检测 false:怪物受攻击碰撞检测
     */
    public CheckMonsterCollision(boxCenter: Vec2, boxSize: Vec2, attacking: boolean = false, multiCheck: boolean = true): Monster[] {
        let shape = new BoxCollisonInfo(boxCenter, boxSize);
        return this.CheckMonsterCollisionByShape(shape, attacking, multiCheck)
    }

    /**
     * 
     * @param shape 
     * @param attacking true:怪物主动攻击的碰撞检测 false:怪物受攻击碰撞检测
     * @param multiCheck true:检测多个碰撞, false:有一个碰撞就返回
     */
    public CheckMonsterCollisionByShape(shape: CollsionShapInfo, attacking: boolean = false, multiCheck: boolean = true): Monster[] {
        let collidedMonster = []
        let monsters = PlayerManager.GetInstance().GetAllSpawnedMonster();
        for (let index = 0; index < monsters.length; index++) {
            let monster = monsters[index];
            if (!monster.IsAlive()) continue;
            let collisionInfo = monster.GetCollisionShapeInfo(attacking) as BoxCollisonInfo;
            if (CommonUtil.IsBoxCrossed(collisionInfo, shape as BoxCollisonInfo)) {
                collidedMonster.push(monster)
                if (!multiCheck) break;
            }
        }
        return collidedMonster;
    }

    /**
     * 检测矩形和怪物子弹碰撞
     * @param boxPos 
     * @param boxCenter 
     */
    public CheckMonsterBulletCollision(shape: CollsionShapInfo): Bullet {
        let collidedMonster = []
        let bullets = BulletManager.GetInstance().GetAllSpawnedBullet(EnumBulletOutLookType.MonsterBullet);
        for (let index = 0; index < bullets.length; index++) {
            let bullet = bullets[index];
            let collisionInfo = bullet.GetCollisionShapeInfo() as BoxCollisonInfo;
            if (CommonUtil.IsBoxCrossed(collisionInfo, shape as BoxCollisonInfo)) {
                return bullet;
            }
        }
        return null;
    }

    /**
     * 检测矩形和道具碰撞
     * @param shape 
     */
    public CheckPropCollision(shape: CollsionShapInfo): Prop[] {
        let collidedProps = []
        let props = PropManager.GetInstance().GetAll();
        for (let index = 0; index < props.length; index++) {
            let prop = props[index];
            let collisionInfo = prop.GetCollisionShapeInfo() as BoxCollisonInfo;
            if (CommonUtil.IsBoxCrossed(collisionInfo, shape as BoxCollisonInfo)) {
                collidedProps.push(prop)
            }
        }
        return collidedProps;
    }

    /**
     * 检测扇形和怪物碰撞
     * @param boxCenter 
     * @param boxSize 
     * @param sectorCenter 
     * @param radius 
     * @param sectorAngle 
     */
    public CheckMonsterCollisionSectorByShape(shape: SectorCollisonInfo, checkBullets: boolean = false): PlayerBase2D[] {
        let collidedMonster = []
        let monstersOrMonsterBullets = checkBullets ?
            BulletManager.GetInstance().GetAllSpawnedBullet(EnumBulletOutLookType.MonsterBullet) :
            PlayerManager.GetInstance().GetAllSpawnedMonster();
        for (let index = 0; index < monstersOrMonsterBullets.length; index++) {
            let monster = monstersOrMonsterBullets[index];
            if (!checkBullets && !monster.IsAlive()) continue;
            let collisionInfo = monster.GetCollisionShapeInfo() as BoxCollisonInfo;
            let collided = false;
            collided = CommonUtil.IsBoxCrossedSector(collisionInfo, shape, true)
            if (collided) {
                collidedMonster.push(monster)
                break;
            }
            // //box的两个轴向量
            // let xAxis = CommonUtil.GetXAxisInNormalCoByAngle(collisionInfo.rotation, false); xAxis.y *= -1;
            // let yAxis = CommonUtil.GetYAxisInNormalCoByAngle(collisionInfo.rotation, false); yAxis.y *= -1;//转成laya的向量
            // let axes = [xAxis, yAxis];
            // //计算box四个角
            // for (let m = 0; m < 2; m++) {
            //     let xAxis = axes[0].mul(m == 0 ? -1 : 1);
            //     let point = collisionInfo.center.add(xAxis.mul(collisionInfo.size.x * 0.5))
            //     for (let n = 0; n < 2; n++) {
            //         let yAxis = axes[1].mul(n == 0 ? -1 : 1);
            //         let checkPoint = point.add(yAxis.mul(collisionInfo.size.y * 0.5))
            //         if (CommonUtil.IsPointInSector(checkPoint, shape.center, shape.radius, shape.sectorAngle, shape.rotation, true)) {
            //             collidedMonster.push(monster)
            //             collided = true;
            //             break;
            //         }
            //     }
            //     if (collided) break;
            // }
        }
        return collidedMonster;
    }

    /**
     * 获取圆范围内的怪物
     * @param center 
     * @param radius 
     */
    public CheckMonsterInCircle(center: Vec2, radius: number, exceptMonsterUids?: number[], maxNum?: number): Monster[] {
        let collidedMonster = []
        let monsters = PlayerManager.GetInstance().GetAllSpawnedMonster();
        for (let index = 0; index < monsters.length; index++) {
            let monster = monsters[index];
            if (!monster.IsAlive()) continue;
            if (exceptMonsterUids && exceptMonsterUids.indexOf(monster.UID) >= 0) continue;//不检测指定list上的monster
            let collisionInfo = monster.GetCollisionShapeInfo() as BoxCollisonInfo;
            let point = collisionInfo.center
            if (CommonUtil.IsPointInCircle(point, center, radius)) {
                collidedMonster.push(monster)
                if (maxNum && collidedMonster.length == maxNum) break;//达到最大数量
            }
        }
        return collidedMonster;
    }

    /**
     * 是否在圆内
     * @param center 
     * @param radius 
     */
    public IsPlayerInCircle(center: Vec2, radius: number, monster: PlayerBase2D): boolean {
        let collisionInfo = monster.GetCollisionShapeInfo() as BoxCollisonInfo;
        let point = collisionInfo.center
        return CommonUtil.IsPointInCircle(point, center, radius)
    }
}