var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*
* name;
*/
var PlayerSkillComponent2D = (function (_super) {
    __extends(PlayerSkillComponent2D, _super);
    function PlayerSkillComponent2D() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PlayerSkillComponent2D.prototype.onAdd = function () {
    };
    PlayerSkillComponent2D.prototype.onReomove = function () {
    };
    //比赛开始, 自动执行技能播放
    PlayerSkillComponent2D.prototype.Start = function () {
        var curSideWeaponId = GameDataManager.getInstance().LoginPlayerInfo.CurSideWeaponID;
        Log.Debug("玩家开始技能%s", EnumSideWeaponType[curSideWeaponId]);
        var config = ConfigManager.GetInstance().GetWeaponConfig(curSideWeaponId);
        this.exe(config);
    };
    //比赛结束, 停止技能
    PlayerSkillComponent2D.prototype.Stop = function () {
        var curSideWeaponId = GameDataManager.getInstance().LoginPlayerInfo.CurSideWeaponID;
        Log.Debug("玩家停止技能%s", EnumSideWeaponType[curSideWeaponId]);
        var config = ConfigManager.GetInstance().GetWeaponConfig(curSideWeaponId);
        this.stop(config);
    };
    PlayerSkillComponent2D.prototype.exe = function (sideWeaponConfig) {
        if (this.curWeapon != null) {
            Log.Error("当前技能已经开始执行, 不需要重复执行");
            return;
        }
        this.curWeapon = this.getWeaponSkill(sideWeaponConfig.GetID());
        this.curWeapon.Start(this.player, sideWeaponConfig);
    };
    PlayerSkillComponent2D.prototype.stop = function (sideWeaponConfig) {
        if (this.curWeapon == null) {
            Log.Warn("技能已经停止, 不需要重复停止");
            return;
        }
        this.curWeapon.Stop(this.player, sideWeaponConfig);
        this.curWeapon = null;
    };
    //根据id获取对应技能逻辑
    PlayerSkillComponent2D.prototype.getWeaponSkill = function (weaponId) {
        switch (weaponId) {
            case EnumSideWeaponType.Missile:
                return new MissileWeapon();
            case EnumSideWeaponType.Laser:
                return new LaserWeapon();
            case EnumSideWeaponType.Guard:
                return new GuardWeapon();
            case EnumSideWeaponType.MagnetDisturb:
                return new MagnetDisturbWeapon();
            case EnumSideWeaponType.ChildPlane:
                return new ChildPlaneWeapon();
            case EnumSideWeaponType.ElectricNet:
                return new ElectricNetWeapon();
            default:
                {
                    Log.Error("没有对应武器的技能逻辑 %i", weaponId);
                    return null;
                }
        }
    };
    return PlayerSkillComponent2D;
}(ComponentBase2D));
//# sourceMappingURL=PlayerSkillComponent2D.js.map