var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*
* name;
*/
var BuffComponent = (function (_super) {
    __extends(BuffComponent, _super);
    function BuffComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(BuffComponent.prototype, "AllBuffs", {
        get: function () { return this.runingBuffDic.keys; },
        enumerable: true,
        configurable: true
    });
    BuffComponent.prototype.onAdd = function () {
        this.Reset();
    };
    BuffComponent.prototype.onReomove = function () {
        this.stopAll();
    };
    BuffComponent.prototype.Reset = function () {
        this.runingBuffDic = new Laya.Dictionary();
    };
    BuffComponent.prototype.OnEnterMatch = function () {
    };
    BuffComponent.prototype.OnExitMatch = function () {
    };
    BuffComponent.prototype.AddBuff = function (newBuffId, param) {
        //buff重复添加, 刷新buff
        // this.stopBuff(newBuffId)
        if (this.ContainBuff(newBuffId)) {
            this.refreshBuff(newBuffId, param);
        }
        else {
            this.exeBuff(newBuffId, param);
        }
        //通知uI
        if (this.player.playerID == ConstDefine.MAIN_PLAYRE_CONFIG_ID) {
            Facade.instance.sendNotification(NotificationNames.UI_OnPropBuff, new PlayerBuffInfo(newBuffId, true));
        }
    };
    BuffComponent.prototype.ContainBuff = function (buffId) {
        return this.runingBuffDic.get(buffId) != null;
    };
    //停止所有
    BuffComponent.prototype.stopAll = function () {
        // let timers = this.runingBuffDic.values;
        // for (let index = 0; index < timers.length; index++) {
        //     let element = timers[index] as ISkillLogic;
        //     element.Stop(this.player, null)
        //     // TimeManager.getInst().remove(element);
        // }
        var buffids = this.runingBuffDic.keys;
        for (var index = buffids.length - 1; index >= 0; index--) {
            var buffId = buffids[index];
            this.stopBuff(buffId);
        }
        this.Reset();
    };
    //执行buff
    BuffComponent.prototype.exeBuff = function (buffId, param) {
        var _this = this;
        var buff = this.getBuffSkill(buffId);
        this.runingBuffDic.set(buffId, buff);
        buff.Start(this.player, param, function () {
            _this.endBuff(buffId); //buff结束/打断回调
        });
    };
    //刷新buff
    BuffComponent.prototype.refreshBuff = function (buffId, param) {
        var _this = this;
        var buff = this.runingBuffDic.get(buffId);
        if (buff) {
            buff.Refresh(this.player, function () {
                _this.endBuff(buffId); //buff结束/打断回调
            }, param);
        }
    };
    BuffComponent.prototype.endBuff = function (buffid) {
        var _this = this;
        var buff = this.runingBuffDic.get(buffid);
        if (buff) {
            buff.End(this.player, function () {
                //结束动画完成后才删除
                _this.runingBuffDic.remove(buffid);
                _this.onRemove(buffid);
            }, null);
        }
    };
    //停止buff
    BuffComponent.prototype.stopBuff = function (buffid) {
        var buff = this.runingBuffDic.get(buffid);
        if (buff) {
            this.runingBuffDic.remove(buffid);
            buff.Stop(this.player, null);
            this.onRemove(buffid);
        }
    };
    //删除buff处理
    BuffComponent.prototype.onRemove = function (buffid) {
        //通知uI
        if (this.player.playerID == ConstDefine.MAIN_PLAYRE_CONFIG_ID) {
            Facade.instance.sendNotification(NotificationNames.UI_OnPropBuff, new PlayerBuffInfo(buffid, false));
        }
    };
    //根据id获取对应技能逻辑
    BuffComponent.prototype.getBuffSkill = function (buff) {
        switch (buff) {
            case EnumBuffType.MagnetFreezen:
                return new MagnetFreezenBuff();
            case EnumBuffType.CallAlliance:
                return new CallAllianceBuff();
            case EnumBuffType.BulletThrough:
                return new BulletThroughBuff();
            case EnumBuffType.Enlarge:
                return new EnlargeBuff();
            case EnumBuffType.FightBack:
                return new FightBackBuff();
            case EnumBuffType.FireSpeedIntensified:
                return new FireSpeedBuff();
            case EnumBuffType.Gold:
                return new GoldBuff();
            case EnumBuffType.LimitInput:
                return new LimitInputBuff();
            case EnumBuffType.PowerIntensified:
                return new FirePowerBuff();
            case EnumBuffType.Weaken:
                return new WeakenBuff();
            default:
                {
                    Log.Error("没有对应武器的技能逻辑 %i", buff);
                    return null;
                }
        }
    };
    return BuffComponent;
}(ComponentBase2D));
//# sourceMappingURL=BuffComponent.js.map