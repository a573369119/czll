/*
* 角色服务器导弹技能发射的导弹
*/
class MissileBullet extends Bullet {

    public bulletMoveCom: MissileBulletMoveComponent2D;
    public fxComp: MissileBulletEffectComponent2D;
    public isIt: boolean = false;

    private hitedMonsterIds: number[];//穿透的怪物

    public initComponent(): void {
        this.isIt = true;
        this.bulletMoveCom = new MissileBulletMoveComponent2D()
        this.config = ConfigManager.GetInstance().GetBulletConfig(this.bulletType);
        this.viewComp = new ImageViewComponent(this.config.ImagePath);
        // this.viewComp = new ImageViewComponent(ResPathConst.MISSILE_BULLET_SKIN);
        this.fxComp = new EffectComponent2D();
        this.addComponent(this.viewComp);
        this.addComponent(this.bulletMoveCom);
        this.addComponent(this.fxComp);

        if (this.showShapCom == null) {
            this.showShapCom = new Show2DShapeComponent();
            this.addComponent(this.showShapCom)
        }
        this.showShapCom.ShowShape();
    }


    //重写子类的
    public bulletOnRecycle(): void {
        this.bulletMoveCom.bulletStopMove();
        // BulletManager.GetInstance().monsterBulletDic.remove(this);
    }

    public bulletOnSpawn(): void {
        this.bulletMoveCom.Reset(); //重置
        // BulletManager.GetInstance().monsterBulletDic.set(this, this);
        this.hitedMonsterIds = []
    }

    public OnDestory() {
        super.OnDestory();
    }

    ////////////////////////////////////////////////////////////////////////////////
    ///
    private attackDamage: number; //每次攻击伤害
    public set AttackDamage(value: number) { this.attackDamage = value; }//20; }//
    public get AttackDamage(): number { return this.attackDamage; }
    private attackRadius: number; //每次攻击范围
    public set AttackRadius(value: number) { this.attackRadius = value; }//20; }//
    public get AttackRadius(): number { return this.attackRadius; }
    //飞行中检测碰撞
    public CheckCollisionDuringMovement() {
        let collidedMonster = CollisionDetector.Instance.CheckMonsterCollisionByShape(this.GetCollisionShapeInfo())
        //        let collidedMonster = CollisionDetector.Instance.CheckMonsterCollision(this.PlayerPos, new Vec2(MissileWeapon.BULLET_ATTACT_RADIUS, MissileWeapon.BULLET_ATTACT_RADIUS))
        //穿透的怪物
        for (let index = 0; index < collidedMonster.length; index++) {
            let monster = collidedMonster[index];
            if (this.hitedMonsterIds.indexOf(monster.UID) < 0) {
                // Log.Debug("导弹穿透怪物%i, uid:%i", monster.playerID, monster.UID)
                // monster.Die();
                if (!this.HitMonster(monster)) {
                    this.hitedMonsterIds.push(monster.UID)
                }
            }
        }
    }

    //到达终点, 爆炸
    public OnExplode() {
        this.fxComp.showEffect(0, EnumSpineConfigID.SkillMissileExplode);
        AudioManager.GetInstance().PlaySoundByConfigID(EnumSoundID.sound_fight_guided_02)
        //穿透伤害, 爆炸伤害
        let collidedMonster = CollisionDetector.Instance.CheckMonsterCollision(this.PlayerPos, new Vec2(MissileWeapon.BULLET_ATTACT_RADIUS, MissileWeapon.BULLET_ATTACT_RADIUS))
        for (let index = 0; index < collidedMonster.length; index++) {
            let monster = collidedMonster[index];
            Log.Debug("导弹击中怪物%i, uid:%i", monster.playerID, monster.UID)
            if (!this.HitMonster(monster)) {

            }
            // monster.Die();
        }
    }

    //攻击怪物
    private HitMonster(monster: Monster): boolean {
        return monster.GetHit(this.attackDamage)
    }
}