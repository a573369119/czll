var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*
* name;
*/
var Show2DShapeComponent = (function (_super) {
    __extends(Show2DShapeComponent, _super);
    function Show2DShapeComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.enable = false;
        return _this;
    }
    Show2DShapeComponent.prototype.onAdd = function () {
        if (!this.enable)
            return;
        if (this.shapeSprite == null) {
            this.shapeSprite = new Laya.Sprite();
        }
        this.player.AddChild(this.shapeSprite);
        this.shapeSprite.visible = false;
        this.shapeSprite.zOrder = 100;
    };
    Show2DShapeComponent.prototype.onReomove = function () {
        if (!this.enable)
            return;
        if (this.shapeSprite) {
            this.shapeSprite.destroy(true);
        }
    };
    Show2DShapeComponent.prototype.SetShape = function (shape) {
        this.shapeInfo = shape;
    };
    Show2DShapeComponent.prototype.ShowShape = function (active) {
        if (active === void 0) { active = true; }
        if (!this.enable)
            return;
        this.shapeSprite.visible = active;
        if (!active)
            return;
        this.shapeSprite.graphics.clear();
        //主动攻击 面积大 先render
        this.setCollisionRegionActive(active, true);
        //被动受击
        this.setCollisionRegionActive(active, false, "#FF0000");
    };
    Show2DShapeComponent.prototype.setCollisionRegionActive = function (active, attacking, color) {
        if (attacking === void 0) { attacking = false; }
        if (color === void 0) { color = "#FFFF00"; }
        if (!this.enable)
            return;
        this.shapeSprite.visible = active;
        if (!active)
            return;
        this.SetShape(this.player.GetCollisionShapeInfo(attacking));
        var shapeEnum = this.shapeInfo.shape;
        switch (this.shapeInfo.shape) {
            case EnumCollisionShape.Box:
                {
                    var shape = this.shapeInfo;
                    var size = shape.size;
                    // this.shapeSprite.graphics.clear();
                    //x,y的原点在sprite的左上角, 但父节点的anchor都在中心, xy坐标都是相对shapeSprite
                    this.shapeSprite.graphics.drawRect(-size.x * 0.5, -size.y * 0.5, size.x, size.y, color);
                    this.shapeSprite.rotation = shape.rotation;
                    break;
                }
            case EnumCollisionShape.Circle:
                {
                    var shape = this.shapeInfo;
                    var spritePos = CommonUtil2D.GetPosUnderTargetObj(this.shapeSprite, StageManager.GetInstance().playerParent);
                    var shapeLocalPos = this.shapeInfo.center.sub(spritePos);
                    this.shapeSprite.graphics.drawCircle(shapeLocalPos.x, shapeLocalPos.y, shape.radius, color);
                    break;
                }
            case EnumCollisionShape.Sector:
                {
                    var shape = this.shapeInfo;
                    var spritePos = CommonUtil2D.GetPosUnderTargetObj(this.shapeSprite, StageManager.GetInstance().playerParent);
                    var shapeLocalPos = this.shapeInfo.center.sub(spritePos);
                    // this.shapeSprite.graphics.clear();
                    //角度在向右的x轴方向为0, 顺时针增加  //x,y的原点在sprite的左上角, 但父节点的anchor都在中心
                    this.shapeSprite.graphics.drawPie(shapeLocalPos.x, shapeLocalPos.y, shape.radius, -shape.sectorAngle * 0.5 - 90, shape.sectorAngle * 0.5 - 90, color);
                    this.shapeSprite.rotation = shape.rotation;
                    break;
                }
        }
    };
    return Show2DShapeComponent;
}(ComponentBase2D));
//# sourceMappingURL=Show2DShapeComponent.js.map