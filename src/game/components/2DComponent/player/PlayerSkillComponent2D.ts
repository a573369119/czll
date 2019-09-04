/*
* name;
*/
class PlayerSkillComponent2D extends ComponentBase2D {
    private curWeapon: ISkillLogic;
    public onAdd(): void {

    }

    public onReomove(): void {

    }

    //比赛开始, 自动执行技能播放
    public Start() {
        let curSideWeaponId = GameDataManager.getInstance().LoginPlayerInfo.CurSideWeaponID;
        Log.Debug("玩家开始技能%s", EnumSideWeaponType[curSideWeaponId])
        let config = ConfigManager.GetInstance().GetWeaponConfig(curSideWeaponId);
        this.exe(config)
    }
    //比赛结束, 停止技能
    public Stop() {
        let curSideWeaponId = GameDataManager.getInstance().LoginPlayerInfo.CurSideWeaponID;
        Log.Debug("玩家停止技能%s", EnumSideWeaponType[curSideWeaponId])
        let config = ConfigManager.GetInstance().GetWeaponConfig(curSideWeaponId);
        this.stop(config)
    }

    private exe(sideWeaponConfig: WeaponConfigConfigData) {
        if (this.curWeapon != null) {
            Log.Error("当前技能已经开始执行, 不需要重复执行")
            return;
        }
        this.curWeapon = this.getWeaponSkill(sideWeaponConfig.GetID())
        this.curWeapon.Start(this.player, sideWeaponConfig);
    }
    private stop(sideWeaponConfig: WeaponConfigConfigData) {
        if (this.curWeapon == null) { Log.Warn("技能已经停止, 不需要重复停止"); return; }
        this.curWeapon.Stop(this.player, sideWeaponConfig);
        this.curWeapon = null;
    }

    //根据id获取对应技能逻辑
    private getWeaponSkill(weaponId: number) {
        switch (weaponId) {
            case EnumSideWeaponType.Missile:
                return new MissileWeapon()
            case EnumSideWeaponType.Laser:
                return new LaserWeapon()
            case EnumSideWeaponType.Guard:
                return new GuardWeapon()
            case EnumSideWeaponType.MagnetDisturb:
                return new MagnetDisturbWeapon()
            case EnumSideWeaponType.ChildPlane:
                return new ChildPlaneWeapon()
            case EnumSideWeaponType.ElectricNet:
                return new ElectricNetWeapon()
            default:
                {
                    Log.Error("没有对应武器的技能逻辑 %i", weaponId)
                    return null
                }
        }
    }
}