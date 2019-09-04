var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*
* 飞机类: 角色, 子舰, 呼叫支援的飞机基类
*/
var Plane = (function (_super) {
    __extends(Plane, _super);
    function Plane() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(Plane.prototype, "BuffComp", {
        get: function () { return null; },
        enumerable: true,
        configurable: true
    });
    Plane.prototype.initComponent = function () {
        _super.prototype.initComponent.call(this);
        //特效组件
        this.effectComp = new PlayerEffectComponent2D();
        this.addComponent(this.effectComp);
    };
    //切换子弹
    Plane.prototype.ChangeBullet = function (newBullet) {
        //根据当前的buff决定使用哪种子弹
        var info = this.getBulletType();
        if (info) {
            this.bulletComp.ChangeBulletType(info.LatestBullletOutLook, info.AllRuningBulletBuff);
        }
        else {
            Log.Error("没有buff组件, 不需要切换子弹形态");
        }
    };
    //子弹是否穿透
    Plane.prototype.SetBulletThroughable = function (enable) {
        this.bulletComp.EnableThrough = enable;
    };
    //根据当前buff决定显示的子弹形态
    Plane.prototype.getBulletType = function () {
        if (!this.BuffComp)
            return null;
        var bulletInfo = new BulletBuffInfo();
        bulletInfo.AllRuningBulletBuff = []; //子弹相关的buff和最新的子弹形态
        var type = EnumBulletOutLookType.MainPlayerBullet;
        var buffs = this.BuffComp.AllBuffs;
        for (var index = 0; index < buffs.length; index++) {
            var element = buffs[index];
            if (element == EnumBuffType.Gold) {
                type = EnumBulletOutLookType.MainPlayerBullet_GoldBuffs;
                bulletInfo.AllRuningBulletBuff.push(element);
            }
            if (element == EnumBuffType.FightBack) {
                type = EnumBulletOutLookType.MainPlayerBullet_FightBackBuff;
                bulletInfo.AllRuningBulletBuff.push(element);
            }
            if (element == EnumBuffType.PowerIntensified) {
                type = EnumBulletOutLookType.MainPlayerBullet_PowerBuff;
                bulletInfo.AllRuningBulletBuff.push(element);
            }
            if (element == EnumBuffType.FireSpeedIntensified) {
                bulletInfo.AllRuningBulletBuff.push(element);
            }
        }
        //
        bulletInfo.LatestBullletOutLook = type;
        return bulletInfo;
    };
    return Plane;
}(PlayerBase2D));
var BulletBuffInfo = (function () {
    function BulletBuffInfo() {
    }
    return BulletBuffInfo;
}());
//# sourceMappingURL=Plane.js.map