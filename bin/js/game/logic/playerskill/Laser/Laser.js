var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*
* name;
*/
var Laser = (function (_super) {
    __extends(Laser, _super);
    function Laser() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.timerId = -1;
        _this.checkCollisionCounter = 0; //计算碰撞计时
        _this.COLLISION_CHECK_INTERVAL = 0.1; //碰撞检测间隔
        return _this;
    }
    // public bulletMoveCom: BulletMoveComponent2D;
    Laser.prototype.initComponent = function () {
        _super.prototype.initComponent.call(this);
        // this.bulletMoveCom = new BulletMoveComponent2D()
        this.viewComp = new ElectricNetViewComponent2D(EnumSpineConfigID.Laser);
        this.addComponent(this.viewComp);
        // this.addComponent(this.bulletMoveCom);
        this.comParent.name = "Laser";
        this.viewComp.SetActive(false); //初始化不显示
    };
    Laser.prototype.OnSkillObjSpawn = function () {
        this.viewComp.SetActive(true);
    };
    Laser.prototype.OnSkillObjRecycle = function () {
        this.viewComp.SetActive(false);
        this.stop();
    };
    Laser.prototype.OnSkillObjDestroy = function () {
    };
    Object.defineProperty(Laser.prototype, "Size", {
        get: function () { return this.laserSize; },
        set: function (value) { this.laserSize = value; } //new Vec2(30, 200); }//
        ,
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Laser.prototype, "Duration", {
        get: function () { return this.duration; },
        set: function (value) { this.duration = value; } //10; }//
        ,
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Laser.prototype, "AttackInterval", {
        get: function () { return this.attackInterval; },
        set: function (value) { this.attackInterval = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Laser.prototype, "AttackDamage", {
        get: function () { return this.attackDamage; },
        set: function (value) { this.attackDamage = value; } //20; }//
        ,
        enumerable: true,
        configurable: true
    });
    //发射
    Laser.prototype.start = function (parent, posRelativeToParent) {
        this.hitedMonsterInfos = [];
        this.timeCount = 0;
        this.checkCollisionCounter = 0;
        //添加到父节点, 放在父节点位置
        this.parent = parent.comParent;
        this.parent.addChild(this.comParent);
        this.setPlayerPos(posRelativeToParent.x, posRelativeToParent.y + 50);
        //1.电网, 持续5s
        this.timerId = TimeManager.getInst().addUpdater(cbhandler.gen_handler(this.update, this));
        //设置spine的大小
        var config = ConfigManager.GetInstance().GetSpineConfig(EnumSpineConfigID.Laser);
        this.viewComp.setViewScale(this.laserSize.x / config.SpineSize[0], 1); // this.netSize.y / config.SpineSize[1])
        AudioManager.GetInstance().PlaySoundByConfigID(EnumSoundID.sound_fight_laser);
    };
    //技能时间到终止
    Laser.prototype.end = function () {
        //添加技能结束的处理, 比如淡出动画, 再回收
        ///回收
        GamePoolManager.Instance.Recycle(this, LaserWeapon.GetPoolID());
        // this.stop();
    };
    //由Recycle调用 玩家死亡/游戏结束, 立刻结束电网
    Laser.prototype.stop = function () {
        if (this.timerId >= 0)
            TimeManager.getInst().remove(this.timerId);
        this.timerId = -1;
        CommonUtil2D.ChangeToGrandParent(this.comParent, this.parent.parent);
        //停止音效
        AudioManager.GetInstance().StopSoundByConfigID(EnumSoundID.sound_fight_laser);
    };
    Laser.prototype.update = function (dt) {
        if (this.timeCount >= this.duration) {
            this.end(); //技能完成
        }
        else {
            this.checkCollisionDuringMovement(dt); //检测碰撞
        }
        this.timeCount += dt;
    };
    //检测怪物碰撞
    Laser.prototype.checkCollisionDuringMovement = function (dt) {
        this.checkCollisionCounter += dt; //检测碰撞间隔
        if (this.checkCollisionCounter > this.COLLISION_CHECK_INTERVAL) {
            this.checkCollisionCounter = 0;
            //激光在Player层下的位置
            var pos = CommonUtil2D.GetLoalPostionUnderSameParent(this.comParent, this.parent);
            var colliderPos = new Vec2(pos.x, pos.y - this.laserSize.y * 0.5); //碰撞盒中心位置. spine的pivot在底部.
            //1. 检测碰撞
            var collidedMonster = CollisionDetector.Instance.CheckMonsterCollision(colliderPos, this.laserSize);
            var now = new Date().getTime();
            //2. 处理碰撞 记录最新的击中怪物信息
            var refreshHitedMonster = [];
            for (var index = 0; index < collidedMonster.length; index++) {
                var monster = collidedMonster[index];
                var latestHitInfo = this.GetLastHitInfo(monster.UID);
                if (latestHitInfo == null) {
                    //2.1之前没击中过
                    latestHitInfo = new LaserHitedMonsterInfo(monster.UID);
                    if (!this.HitMonster(monster))
                        refreshHitedMonster.push(latestHitInfo);
                }
                else {
                    var killed = false; //没死亡就记录
                    if (latestHitInfo.LastHitTime - now > this.AttackInterval * 1000) {
                        //2.2 攻击间隔满足
                        latestHitInfo.LastHitTime = now;
                        killed = this.HitMonster(monster);
                    }
                    if (!killed)
                        refreshHitedMonster.push(latestHitInfo);
                }
            }
            this.hitedMonsterInfos = refreshHitedMonster; //最新的击中怪物信息
        }
    };
    //是否对怪造成伤害:1. 之前没有击中, 2. 距离上次击中超过AttackInterval
    Laser.prototype.GetLastHitInfo = function (uid) {
        var find = false;
        for (var index = 0; index < this.hitedMonsterInfos.length; index++) {
            var monster = this.hitedMonsterInfos[index];
            if (monster.UId == uid) {
                return monster;
            }
        }
        return null;
    };
    //攻击怪物
    Laser.prototype.HitMonster = function (monster) {
        // Log.Debug("激光击中伤害 %i", this.attackDamage)
        return monster.GetHit(this.attackDamage);
    };
    return Laser;
}(SkillSpawnObject));
var LaserHitedMonsterInfo = (function () {
    function LaserHitedMonsterInfo(uid) {
        this.UId = uid;
        this.LastHitTime = new Date().getTime();
    }
    return LaserHitedMonsterInfo;
}());
//# sourceMappingURL=Laser.js.map