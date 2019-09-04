/*
* name;
*/
class MissileWeapon implements ISkillLogic {
    private static BULLET_FIRE_POS = 150;//左右30距离
    private static FIRE_INTERVAL;// = 0.3;//发射间隔
    public static BULLET_SPEED = 1000;//导弹速度
    public static BULLET_MOVE_DIST;//= 500;//导弹移动距离
    public static BULLET_ATTACT_RADIUS;//= 100;//攻击半径
    public static BULLET_ATTACT_DAMAGE;//伤害

    private timerId: number = -1;
    private static config: WeaponConfigConfigData;

    //副武器配置参数
    private InitWeaponParam(config: WeaponConfigConfigData) {
        let params = FormulaUtil.CalcSideWeaponParams(EnumSideWeaponType.Missile, GameDataManager.getInstance().GetCurSideWeaponLvl(), config);
        MissileWeapon.FIRE_INTERVAL = params[0];
        MissileWeapon.BULLET_ATTACT_RADIUS = params[1] * 0.5;
        MissileWeapon.BULLET_ATTACT_DAMAGE = params[2];
        MissileWeapon.BULLET_MOVE_DIST = config.Param5;
    }


    public Start(parent: PlayerBase2D, param: any) {
        MissileWeapon.config = param;
        this.InitWeaponParam(MissileWeapon.config)
        GamePoolManager.Instance.InitPool<MissileBullet>(MissileWeapon.GetPoolID(), 5, MissileBullet, EnumBulletOutLookType.MISSILE_WEAPON_BULLET)

        //间隔ns
        this.timerId = TimeManager.getInst().loop(MissileWeapon.FIRE_INTERVAL, cbhandler.gen_handler(this.exeSkill, this, parent, MissileWeapon.config));
    }

    public Stop(parent: PlayerBase2D, param: any) {
        this.End(parent, null, param)
    }

    public End(parent: PlayerBase2D, onEndComplete: Function, param: any) {
        MissileWeapon.config = param;

        //停止发射子弹
        if (this.timerId >= 0) TimeManager.getInst().remove(this.timerId);
        this.timerId = -1;
        //销毁已经发射的子弹
        GamePoolManager.Instance.Destory<MissileBullet>(MissileWeapon.GetPoolID());
        if (onEndComplete) onEndComplete();
    }

    private exeSkill(player: PlayerBase2D, config: WeaponConfigConfigData) {
        //两边发射
        for (let index = 0; index < 2; index++) {
            let bullet = GamePoolManager.Instance.Spawn<MissileBullet>(MissileWeapon.GetPoolID());
            bullet.setBulletPos(player.comParent.x + (index == 0 ? 1 : -1) * MissileWeapon.BULLET_FIRE_POS, player.comParent.y);
            bullet.bulletMoveCom.bulletMove();
            bullet.AttackDamage = MissileWeapon.BULLET_ATTACT_DAMAGE;
            bullet.AttackRadius = MissileWeapon.BULLET_ATTACT_RADIUS;
        }

    }

    public static GetPoolID(): string {
        return "MissileBullet" + MissileWeapon.config.GetID();
    }
}





