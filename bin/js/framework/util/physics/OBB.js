/*
*  Oriented Bounding BOX 碰撞检测 SAT 分离轴定理
*  ver1. 整个个坐标系x左为正, y上为正 和Laya的不同. USING_LAYA_COORDINATE进行标记.
*  ver2. 继续cos的弧度,是逆时针反向旋转. 和laya的不同. laya是顺时针. 需要*-1
*/
var OBB = (function () {
    function OBB(box) {
        this.USING_LAYA_COORDINATE = true; //传入的center的位置是laya坐标系, 左为正, 下为正
        this.detectingAxis = []; //检测轴
        this.boxCollsionInfo = box;
        //因为laya的旋转是顺时针. 但是OBB用逆时针计算角度.
        //同时设个是角度值, 不是弧度
        var rotation = (this.USING_LAYA_COORDINATE ? -1 : 1) * this.boxCollsionInfo.rotation; //ver2.
        this.GenDetectingAxis(rotation);
    }
    Object.defineProperty(OBB.prototype, "Axis", {
        get: function () { return this.detectingAxis; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OBB.prototype, "Center", {
        get: function () { return this.boxCollsionInfo.center; },
        enumerable: true,
        configurable: true
    });
    //两个旋转的矩阵是否相交
    OBB.prototype.IsCollidedWith = function (obb) {
        var centerVec = obb.Center.sub(this.Center); //中心连线
        if (this.USING_LAYA_COORDINATE)
            centerVec.y *= -1; //ver1.
        //在自己的两个检测轴上检测
        for (var index = 0; index < this.Axis.length; index++) {
            var axis = this.Axis[index];
            var a = this.GetRadiusProjectionOn(axis);
            var b = obb.GetRadiusProjectionOn(axis);
            var c = Math.abs(centerVec.dot(axis));
            if (this.GetRadiusProjectionOn(axis) + obb.GetRadiusProjectionOn(axis) <= Math.abs(centerVec.dot(axis))) {
                return false;
            }
        }
        //在对方的检测轴上检测
        for (var index = 0; index < obb.Axis.length; index++) {
            var axis = obb.Axis[index];
            if (axis.equal(this.Axis[0]) || axis.equal(this.Axis[1]))
                continue; // 已经检测过的轴不需要重复检测
            var a = this.GetRadiusProjectionOn(axis);
            var b = obb.GetRadiusProjectionOn(axis);
            var c = Math.abs(centerVec.dot(axis));
            if (this.GetRadiusProjectionOn(axis) + obb.GetRadiusProjectionOn(axis) <= Math.abs(centerVec.dot(axis))) {
                return false;
            }
        }
        // Log.Debug("collided %o, %o", obb.boxCollsionInfo, this.boxCollsionInfo)
        return true;
    };
    //根据自己的旋转, 计算对应的两个检测轴
    OBB.prototype.GenDetectingAxis = function (rotation) {
        var radian = rotation / 180 * Math.PI; //转成弧度
        var axis1 = new Vec2(Math.cos(radian), Math.sin(radian)); //x
        var axis2 = new Vec2(-Math.sin(radian), Math.cos(radian)); //y
        this.detectingAxis.push(axis1);
        this.detectingAxis.push(axis2);
    };
    //计算自己两个其他矩阵检测轴otherBoxAxis上的投影长, otherBoxAxis是nornalise的单位向量
    OBB.prototype.GetRadiusProjectionOn = function (otherBoxAxis) {
        var projectionX = otherBoxAxis.dot(this.detectingAxis[0]);
        var projectionY = otherBoxAxis.dot(this.detectingAxis[1]);
        return Math.abs(projectionX) * this.boxCollsionInfo.size.x * 0.5 +
            Math.abs(projectionY) * this.boxCollsionInfo.size.y * 0.5;
    };
    return OBB;
}());
//# sourceMappingURL=OBB.js.map