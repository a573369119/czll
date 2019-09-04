var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*
* name;
*/
var SkillSpawnObject = (function (_super) {
    __extends(SkillSpawnObject, _super);
    function SkillSpawnObject() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // public bulletMoveCom: BulletMoveComponent2D;
        _this.isIt = false;
        return _this;
    }
    Object.defineProperty(SkillSpawnObject.prototype, "Type", {
        get: function () { return this.skillType; },
        enumerable: true,
        configurable: true
    });
    SkillSpawnObject.prototype.InitPool = function (pool, bulletConfigID) {
        this.skillType = bulletConfigID;
        if (!this.isIt) {
            this.initComponent();
        }
    };
    SkillSpawnObject.prototype.OnSpawn = function () {
        this.uId = IDGenerator.GenBulletID();
        this.GoLive();
        this.OnSkillObjSpawn();
    };
    SkillSpawnObject.prototype.OnRecycle = function () {
        this.Die();
        this.OnSkillObjRecycle();
    };
    SkillSpawnObject.prototype.OnDestory = function () {
        this.OnSkillObjDestroy();
        this.DestroyPlayer();
    };
    // public beforeCreate(): void {
    //     super.beforeCreate();
    // }
    SkillSpawnObject.prototype.initComponent = function () {
        this.isIt = true;
        // this.bulletMoveCom = new BulletMoveComponent2D()
        // this.viewComp = new ImageViewComponent(ResPathConst.BULLET_SKIN);
        // this.addComponent(this.viewComp);
        // this.addComponent(this.bulletMoveCom);
        // this.comParent.name = "Bullet"
    };
    //子类扩展
    SkillSpawnObject.prototype.OnSkillObjSpawn = function () {
        // this.bulletMoveCom.bulletMove();
        // BulletManager.GetInstance().bulletDic.set(this, this);
    };
    SkillSpawnObject.prototype.OnSkillObjRecycle = function () {
        // this.bulletMoveCom.bulletStopMove();
        // BulletManager.GetInstance().bulletDic.remove(this);
    };
    SkillSpawnObject.prototype.OnSkillObjDestroy = function () {
    };
    //在技能开始前执行
    SkillSpawnObject.prototype.OnStart = function () {
        if (this.showShapCom == null) {
            this.showShapCom = new Show2DShapeComponent();
            this.addComponent(this.showShapCom);
        }
        this.showShapCom.ShowShape();
    };
    return SkillSpawnObject;
}(PlayerBase2D));
//# sourceMappingURL=SkillSpawnObject.js.map