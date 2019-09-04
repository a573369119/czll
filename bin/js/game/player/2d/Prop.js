var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*
* 道具
*/
var Prop = (function (_super) {
    __extends(Prop, _super);
    function Prop() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.value = 1;
        /////////////////////////////////////////////////////////////
        //
        _this.timerId = -1;
        _this.timerId2 = -1;
        return _this;
    }
    Object.defineProperty(Prop.prototype, "Type", {
        get: function () { return this.propType; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Prop.prototype, "PropBuff", {
        get: function () { return this.config.BuffConfigID; } //道具带的buff
        ,
        enumerable: true,
        configurable: true
    });
    Prop.prototype.beforeCreate = function () {
        _super.prototype.beforeCreate.call(this);
    };
    Prop.prototype.initComponent = function () {
        this.moveCom = new PropMoveComponent();
        this.viewComp = new ImageViewComponent(this.config.PropImagePath);
        this.addComponent(this.viewComp);
        this.addComponent(this.moveCom);
        this.viewComp.SetActive(false); //this.comParent.visible = false; //this.viewComp.SetActive(false)
        this.comParent.name = "PropID" + EnumPropType[this.Type];
    };
    Prop.prototype.InitPool = function (pool, type) {
        this.propType = type;
        this.config = ConfigManager.GetInstance().GetPropConfig(this.propType);
        this.initComponent();
    };
    Prop.prototype.OnSpawn = function () {
        this.uId = IDGenerator.GenPropID();
        this.GoLive();
        this.propOnSpawn();
    };
    Prop.prototype.OnRecycle = function () {
        this.propOnRecycle();
        this.Die();
    };
    Prop.prototype.OnDestory = function () {
        this.DestroyPlayer();
        this.config = null;
    };
    Prop.prototype.GetCollisionShapeInfo = function () {
        var size = this.config.ColliderSize;
        var pos = CommonUtil2D.GetPosUnderTargetObj(this.comParent, StageManager.GetInstance().playerParent);
        return new BoxCollisonInfo(new Vec2(pos.x, pos.y), new Vec2(size[0], size[1]));
    };
    //子类扩展
    Prop.prototype.propOnSpawn = function () {
        this.moveCom.StartMovement();
        this.startDurationTimer();
    };
    Prop.prototype.propOnRecycle = function () {
        this.moveCom.StopMovement();
        this.stopTimer();
    };
    //10s内未领取, 消失
    Prop.prototype.startDurationTimer = function () {
        var _this = this;
        this.timerId = TimeManager.getInst().once(this.config.Duration, cbhandler.gen_handler(function () {
            _this.timerId = -1;
            PropManager.GetInstance().Recycle(_this.propType, _this);
        }));
        this.timerId2 = TimeManager.getInst().once(this.config.Duration - 3, cbhandler.gen_handler(function () {
            _this.timerId2 = -1;
            _this.shake();
        }));
    };
    Prop.prototype.shake = function () {
        var value = Math.pow(-1, this.value);
        if (value > 0) {
            value = 1;
        }
        else {
            value = 0;
        }
        // console.log("to alpha " + value);
        Laya.Tween.to(this.viewComp.View, {
            "alpha": value,
        }, 500, null, Laya.Handler.create(this, function () {
            if (this.value++ <= 6)
                this.shake();
        }));
    };
    Prop.prototype.stopTimer = function () {
        if (this.timerId >= 0) {
            TimeManager.getInst().remove(this.timerId2);
            TimeManager.getInst().remove(this.timerId);
        }
        this.timerId = -1;
        this.timerId2 = -1;
    };
    return Prop;
}(PlayerBase2D));
//# sourceMappingURL=Prop.js.map