/*
* name;
*/
class Show2DShapeComponent extends ComponentBase2D {
    private shapeSprite: Laya.Sprite;
    private shapeInfo: CollsionShapInfo;
    private enable: boolean = false;
    public onAdd(): void {
        if (!this.enable) return;
        if (this.shapeSprite == null) {
            this.shapeSprite = new Laya.Sprite();
        }
        this.player.AddChild(this.shapeSprite)
        this.shapeSprite.visible = false;
        this.shapeSprite.zOrder = 100;
    }

    public onReomove(): void {
        if (!this.enable) return;
        if (this.shapeSprite) {
            this.shapeSprite.destroy(true)
        }
    }

    public SetShape(shape: CollsionShapInfo) {
        this.shapeInfo = shape;
    }

    public ShowShape(active: boolean = true) {
        if (!this.enable) return;
        this.shapeSprite.visible = active;
        if (!active) return;

        this.shapeSprite.graphics.clear();
        //主动攻击 面积大 先render
        this.setCollisionRegionActive(active, true)
        //被动受击
        this.setCollisionRegionActive(active, false, "#FF0000")
    }

    private setCollisionRegionActive(active: boolean, attacking: boolean = false, color: string = "#FFFF00") {
        if (!this.enable) return;
        this.shapeSprite.visible = active;
        if (!active) return;
        this.SetShape(this.player.GetCollisionShapeInfo(attacking))
        let shapeEnum = this.shapeInfo.shape;
        switch (this.shapeInfo.shape) {
            case EnumCollisionShape.Box:
                {
                    let shape = this.shapeInfo as BoxCollisonInfo;
                    let size = shape.size;
                    // this.shapeSprite.graphics.clear();
                    //x,y的原点在sprite的左上角, 但父节点的anchor都在中心, xy坐标都是相对shapeSprite
                    this.shapeSprite.graphics.drawRect(-size.x * 0.5, - size.y * 0.5, size.x, size.y, color)
                    this.shapeSprite.rotation = shape.rotation;
                    break;
                }
            case EnumCollisionShape.Circle:
                {
                    let shape = this.shapeInfo as CircleCollisonInfo;
                    let spritePos = CommonUtil2D.GetPosUnderTargetObj(this.shapeSprite, StageManager.GetInstance().playerParent)
                    let shapeLocalPos = this.shapeInfo.center.sub(spritePos)
                    this.shapeSprite.graphics.drawCircle(shapeLocalPos.x, shapeLocalPos.y, shape.radius, color)
                    break;
                }
            case EnumCollisionShape.Sector:
                {
                    let shape = this.shapeInfo as SectorCollisonInfo;
                    let spritePos = CommonUtil2D.GetPosUnderTargetObj(this.shapeSprite, StageManager.GetInstance().playerParent)
                    let shapeLocalPos = this.shapeInfo.center.sub(spritePos)
                    // this.shapeSprite.graphics.clear();
                    //角度在向右的x轴方向为0, 顺时针增加  //x,y的原点在sprite的左上角, 但父节点的anchor都在中心
                    this.shapeSprite.graphics.drawPie(shapeLocalPos.x, shapeLocalPos.y, shape.radius, -shape.sectorAngle * 0.5 - 90, shape.sectorAngle * 0.5 - 90, color)
                    this.shapeSprite.rotation = shape.rotation;
                    break;
                }
        }
    }
}