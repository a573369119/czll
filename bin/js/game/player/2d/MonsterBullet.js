var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*
* name;
*/
var MonsterBullet = (function (_super) {
    __extends(MonsterBullet, _super);
    function MonsterBullet() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isIt = false;
        return _this;
    }
    MonsterBullet.prototype.initComponent = function () {
        this.isIt = true;
        this.bulletMoveCom = new MonsterBulletMoveComponent2D();
        this.config = ConfigManager.GetInstance().GetBulletConfig(this.bulletType);
        this.viewComp = new ImageViewComponent(this.config.ImagePath); //(ResPathConst.BULLET_SKIN);
        this.showShapCom = new Show2DShapeComponent();
        this.addComponent(this.showShapCom);
        this.addComponent(this.viewComp);
        this.addComponent(this.bulletMoveCom);
    };
    //重写子类的
    MonsterBullet.prototype.bulletOnRecycle = function () {
        this.bulletMoveCom.bulletStopMove();
        // BulletManager.GetInstance().Recycle(this);// .monsterBulletDic.remove(this);
    };
    MonsterBullet.prototype.bulletOnSpawn = function () {
        // BulletManager.GetInstance().monsterBulletDic.set(this, this);
    };
    return MonsterBullet;
}(Bullet));
//# sourceMappingURL=MonsterBullet.js.map