var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*
* 角色服务器导弹技能发射的导弹
*/
var MissileBullet = (function (_super) {
    __extends(MissileBullet, _super);
    function MissileBullet() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isIt = false;
        return _this;
    }
    MissileBullet.prototype.initComponent = function () {
        this.isIt = true;
        this.bulletMoveCom = new MissileBulletMoveComponent2D();
        this.config = ConfigManager.GetInstance().GetBulletConfig(this.bulletType);
        this.viewComp = new ImageViewComponent(this.config.ImagePath);
        // this.viewComp = new ImageViewComponent(ResPathConst.MISSILE_BULLET_SKIN);
        this.fxComp = new EffectComponent2D();
        this.addComponent(this.viewComp);
        this.addComponent(this.bulletMoveCom);
        this.addComponent(this.fxComp);
        if (this.showShapCom == null) {
            this.showShapCom = new Show2DShapeComponent();
            this.addComponent(this.showShapCom);
        }
        this.showShapCom.ShowShape();
    };
    //重写子类的
    MissileBullet.prototype.bulletOnRecycle = function () {
        this.bulletMoveCom.bulletStopMove();
        // BulletManager.GetInstance().monsterBulletDic.remove(this);
    };
    MissileBullet.prototype.bulletOnSpawn = function () {
        this.bulletMoveCom.Reset(); //重置
        // BulletManager.GetInstance().monsterBulletDic.set(this, this);
        this.hitedMonsterIds = [];
    };
    MissileBullet.prototype.OnDestory = function () {
        _super.prototype.OnDestory.call(this);
    };
    Object.defineProperty(MissileBullet.prototype, "AttackDamage", {
        get: function () { return this.attackDamage; },
        set: function (value) { this.attackDamage = value; } //20; }//
        ,
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MissileBullet.prototype, "AttackRadius", {
        get: function () { return this.attackRadius; },
        set: function (value) { this.attackRadius = value; } //20; }//
        ,
        enumerable: true,
        configurable: true
    });
    //飞行中检测碰撞
    MissileBullet.prototype.CheckCollisionDuringMovement = function () {
        var collidedMonster = CollisionDetector.Instance.CheckMonsterCollisionByShape(this.GetCollisionShapeInfo());
        //        let collidedMonster = CollisionDetector.Instance.CheckMonsterCollision(this.PlayerPos, new Vec2(MissileWeapon.BULLET_ATTACT_RADIUS, MissileWeapon.BULLET_ATTACT_RADIUS))
        //穿透的怪物
        for (var index = 0; index < collidedMonster.length; index++) {
            var monster = collidedMonster[index];
            if (this.hitedMonsterIds.indexOf(monster.UID) < 0) {
                // Log.Debug("导弹穿透怪物%i, uid:%i", monster.playerID, monster.UID)
                // monster.Die();
                if (!this.HitMonster(monster)) {
                    this.hitedMonsterIds.push(monster.UID);
                }
            }
        }
    };
    //到达终点, 爆炸
    MissileBullet.prototype.OnExplode = function () {
        this.fxComp.showEffect(0, EnumSpineConfigID.SkillMissileExplode);
        AudioManager.GetInstance().PlaySoundByConfigID(EnumSoundID.sound_fight_guided_02);
        //穿透伤害, 爆炸伤害
        var collidedMonster = CollisionDetector.Instance.CheckMonsterCollision(this.PlayerPos, new Vec2(MissileWeapon.BULLET_ATTACT_RADIUS, MissileWeapon.BULLET_ATTACT_RADIUS));
        for (var index = 0; index < collidedMonster.length; index++) {
            var monster = collidedMonster[index];
            Log.Debug("导弹击中怪物%i, uid:%i", monster.playerID, monster.UID);
            if (!this.HitMonster(monster)) {
            }
        }
    };
    //攻击怪物
    MissileBullet.prototype.HitMonster = function (monster) {
        return monster.GetHit(this.attackDamage);
    };
    return MissileBullet;
}(Bullet));
//# sourceMappingURL=MissileBullet.js.map