var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*
* name;
*/
var Bullet = (function (_super) {
    __extends(Bullet, _super);
    function Bullet() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isIt = false;
        return _this;
    }
    Object.defineProperty(Bullet.prototype, "Type", {
        get: function () { return this.bulletType; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Bullet.prototype, "DamageValue", {
        get: function () { return this.damage; },
        set: function (value) { this.damage = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Bullet.prototype, "Through", {
        get: function () { return this.through; },
        set: function (value) { this.through = value; },
        enumerable: true,
        configurable: true
    });
    Bullet.prototype.beforeCreate = function () {
        _super.prototype.beforeCreate.call(this);
    };
    Bullet.prototype.initComponent = function () {
        _super.prototype.initComponent.call(this);
        this.isIt = true;
        this.bulletMoveCom = new BulletMoveComponent2D();
        this.config = ConfigManager.GetInstance().GetBulletConfig(this.bulletType);
        this.viewComp = new ImageViewComponent(this.config.ImagePath);
        this.addComponent(this.viewComp);
        this.addComponent(this.bulletMoveCom);
        this.comParent.name = "Bullet";
    };
    Bullet.prototype.setBulletPos = function (posX, posY) {
        this.comParent.x = posX;
        this.comParent.y = posY;
    };
    //获取碰撞区域大小
    // private tempBoxCollisionInfo: BoxCollisonInfo = null;
    Bullet.prototype.GetCollisionShapeInfo = function () {
        var config = this.config; //ConfigManager.GetInstance().GetBulletConfig(this.Type)
        var pos = CommonUtil2D.GetPosUnderTargetObj(this.comParent, StageManager.GetInstance().playerParent);
        if (this.tempBoxCollisionInfo == null)
            this.tempBoxCollisionInfo = new BoxCollisonInfo(null, null);
        this.tempBoxCollisionInfo.center = new Vec2(pos.x, pos.y);
        this.tempBoxCollisionInfo.size = new Vec2(config.ColliderSize[0], config.ColliderSize[1]);
        this.tempBoxCollisionInfo.rotation = this.viewComp.View.rotation;
        return this.tempBoxCollisionInfo; // new BoxCollisonInfo(new Vec2(pos.x, pos.y), new Vec2(config.ColliderSize[0], config.ColliderSize[1]), this.viewComp.View.rotation)
    };
    Bullet.prototype.InitPool = function (pool, bulletConfigID) {
        this.bulletType = bulletConfigID;
        //TODO 通过传递参数 子弹的类型
        if (!this.isIt) {
            this.initComponent();
            this.viewComp.SetActive(false); //初始化不显示
        }
    };
    Bullet.prototype.OnSpawn = function () {
        this.uId = IDGenerator.GenBulletID();
        this.GoLive();
        // this.comParent.visible = true;
        this.bulletOnSpawn();
        if (this.showShapCom)
            this.showShapCom.ShowShape();
    };
    Bullet.prototype.OnRecycle = function () {
        this.Die();
        // this.comParent.visible = false;
        this.bulletOnRecycle();
        if (this.showShapCom)
            this.showShapCom.ShowShape(false);
    };
    Bullet.prototype.OnDestory = function () {
        this.DestroyPlayer();
        this.config = null;
        this.tempBoxCollisionInfo = null;
    };
    //子类扩展
    Bullet.prototype.bulletOnRecycle = function () {
        this.bulletMoveCom.bulletStopMove();
        // BulletManager.GetInstance().bulletDic.remove(this);
    };
    Bullet.prototype.bulletOnSpawn = function () {
        this.bulletMoveCom.bulletMove();
        // BulletManager.GetInstance().bulletDic.set(this, this);
    };
    return Bullet;
}(PlayerBase2D));
//# sourceMappingURL=Bullet.js.map