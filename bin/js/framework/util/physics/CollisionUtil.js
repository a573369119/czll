/*
* name;
*/
var CollisionUtil = (function () {
    function CollisionUtil() {
    }
    /**
     * 检测点是否在园内
     * @param checkPoint 检测点
     * @param sectorCenter 中心
     * @param radius 半径
     */
    CollisionUtil.IsPointInCircle = function (checkPoint, sectorCenter, radius) {
        //检测点和圆形是否相交
        var distVec = sectorCenter.sub(checkPoint);
        return (distVec.x * distVec.x + distVec.y * distVec.y <= radius * radius);
    };
    /**
     * 两个圆是否相交
     * @param circle1Center
     * @param circle1Radius
     * @param circle2Center
     * @param circle2Radius
     */
    CollisionUtil.IsCirclesCrossed = function (circle1Center, circle1Radius, circle2Center, circle2Radius) {
        var dist = circle1Center.dist(circle2Center);
        return dist <= circle1Radius + circle2Radius;
    };
    /// <summary>
    /// 圆和线相交
    /// </summary>
    /// <param name="center"></param>
    /// <param name="radius"></param>
    /// <param name="point1"></param>
    /// <param name="point2"></param>
    /// <returns></returns>
    CollisionUtil.IsCirleLineCrossed = function (center, radius, point1, point2, isLayaCo) {
        if (isLayaCo === void 0) { isLayaCo = true; }
        //两个点都在园内 或者 一个点在圆内
        var dist_pint1ToCenter = point1.dist(center);
        if (dist_pint1ToCenter <= radius)
            return true;
        var dist_pint2ToCenter = point2.dist(center);
        if (dist_pint2ToCenter <= radius)
            return true;
        if (isLayaCo) {
            point1.y *= -1;
            point2.y *= -1;
            center.y *= -1;
        }
        //两个都不在圆内, 但是线段穿过圆
        var minDistToLine = this.GetMiniDistFromPointToLine(center, point1, point2);
        return minDistToLine <= radius;
    };
    /// <summary>
    /// 获取点到线的最短距离, 如果点的投影没在线上, 就是点到线段两端最短的距离
    /// 在正常坐标系内计算
    /// </summary>
    /// <param name="point"></param>
    /// <param name="linePoint1"></param>
    /// <param name="linePoint2"></param>
    /// <returns></returns>
    CollisionUtil.GetMiniDistFromPointToLine = function (point, linePoint1, linePoint2) {
        var vector_PointToLinePoint1 = point.sub(linePoint1);
        var normalVector_LinePoint2ToLinePoint1 = (linePoint2.sub(linePoint1)).normalise();
        //计算点到线段的投影
        var projOnLineLen = vector_PointToLinePoint1.dot(normalVector_LinePoint2ToLinePoint1);
        //投影是否在线段外
        var lineLen = linePoint1.dist(linePoint2);
        var projectOnLine = projOnLineLen > 0 && projOnLineLen <= lineLen;
        if (!projectOnLine) {
            //如果投影没有在线段上, 就使用点到线段两端最短的距离
            var dist_PointToLinePoint2 = (point.sub(linePoint2)).magnitude();
            return Math.min(dist_PointToLinePoint2, vector_PointToLinePoint1.magnitude());
        }
        else {
            //投影在线段上, 返回点到线段距离
            var projectionPoint = linePoint1.add(normalVector_LinePoint2ToLinePoint1.mul(projOnLineLen));
            return projectionPoint.sub(point).magnitude();
        }
    };
    /**
     * 圆是否和矩形相交
     * @param boxCollisionInfo
     * @param circleCollisionInfo
     * @param isLayaCo
     */
    CollisionUtil.IsCircleBoxCrossed = function (boxCollisionInfo, circleCollisionInfo, isLayaCo) {
        if (isLayaCo === void 0) { isLayaCo = true; }
        var cornors = this.GetBoxCorners(boxCollisionInfo, isLayaCo);
        //[Laya : 左上, 左下, 右上, 右下]
        if (this.IsCirleLineCrossed(circleCollisionInfo.center, circleCollisionInfo.radius, cornors[0], cornors[1], isLayaCo))
            return true;
        if (this.IsCirleLineCrossed(circleCollisionInfo.center, circleCollisionInfo.radius, cornors[0], cornors[2], isLayaCo))
            return true;
        if (this.IsCirleLineCrossed(circleCollisionInfo.center, circleCollisionInfo.radius, cornors[3], cornors[1], isLayaCo))
            return true;
        if (this.IsCirleLineCrossed(circleCollisionInfo.center, circleCollisionInfo.radius, cornors[3], cornors[2], isLayaCo))
            return true;
        return false;
    };
    /**
     * 返回矩阵的四个角位置
     * [Laya : 左上, 左下, 右上, 右下]
     * [其他 : 左下, 左上, 右下, 右上]
     * @param boxCollisionInfo
     * @param isLayaCo 是否laya坐标系位置(y下为正), 和旋转(顺时针为正)
     */
    CollisionUtil.GetBoxCorners = function (boxCollisionInfo, isLayaCo) {
        if (isLayaCo === void 0) { isLayaCo = true; }
        //box的两个轴向量, 如果是laya坐标系, 转到坐标系中
        var xAxis = CommonUtil.GetXAxisInNormalCoByAngle(boxCollisionInfo.rotation, !isLayaCo);
        if (isLayaCo)
            xAxis.y *= -1;
        var yAxis = CommonUtil.GetYAxisInNormalCoByAngle(boxCollisionInfo.rotation, !isLayaCo);
        if (isLayaCo)
            yAxis.y *= -1; //转成laya的向量
        var axes = [xAxis, yAxis];
        //计算box四个角[Laya : 左上, 左下, 右上, 右下]
        var boxCornerPoints = [];
        for (var m = 0; m < 2; m++) {
            var xAxis_1 = axes[0].mul(m == 0 ? -1 : 1);
            var point = boxCollisionInfo.center.add(xAxis_1.mul(boxCollisionInfo.size.x * 0.5));
            for (var n = 0; n < 2; n++) {
                var yAxis_1 = axes[1].mul(n == 0 ? -1 : 1);
                var checkPoint = point.add(yAxis_1.mul(boxCollisionInfo.size.y * 0.5));
                boxCornerPoints.push(checkPoint);
            }
        }
        return boxCornerPoints;
    };
    CollisionUtil.IsBoxCrossed = function (box1, box2) {
        //预判
        var lenX = Math.abs(box1.center.x - box2.center.x);
        if (lenX > box1.size.x + box2.size.x)
            return false;
        var lenY = Math.abs(box1.center.y - box2.center.y);
        if (lenY > box1.size.y + box2.size.y)
            return false;
        var obb = new OBB(box1);
        var obb2 = new OBB(box2);
        return obb.IsCollidedWith(obb2);
        // return CommonUtil.isBoxCrossed(box1.center, box1.size, box2.center, box2.size)
    };
    CollisionUtil.IsBoxPointCrossed = function (box1, point) {
        var halfXSize = box1.size.x * 0.5;
        var halfYSize = box1.size.y * 0.5;
        if (point.x < box1.center.x + halfXSize && point.x > box1.center.x - halfXSize
            && point.y < box1.center.y + halfYSize && point.y > box1.center.y - halfYSize) {
            return true;
        }
        return false;
    };
    /**
     * 检测点是否在扇形内 , 计算在正常坐标系内,  x右为正, y上为正, 默认扇形0度为y轴, sectorAngle左右各增加一半.
     * @param checkPoint 检测点
     * @param sectorCenter 扇形中心
     * @param radius 扇形半径
     * @param sectorAngle 扇形角度
     * @param rotation 扇形旋转角度
     * @param isLayaCo 是否laya2d坐标 laya y下为正//计算在正常坐标系内,  x右为正, y上为正
     */
    CollisionUtil.IsPointInSector = function (checkPoint, sectorCenter, radius, sectorAngle, rotation, isLayaCo) {
        if (isLayaCo === void 0) { isLayaCo = true; }
        //检测点和圆形是否相交
        var distVec = checkPoint.sub(sectorCenter);
        if (isLayaCo)
            distVec.y *= -1;
        if (distVec.magnitudePower2() <= radius * radius) {
            //点在园内的情况
            var yAxis = CommonUtil.GetYAxisInNormalCoByAngle(rotation, !isLayaCo); //根据角度获取y轴旋转后的方向
            distVec = distVec.normalise(); //单位向量才能计算出正确角度
            var dot = distVec.dot(yAxis); //计算检测点到圆心向量和扇形方向的角度
            var cos = Math.cos(sectorAngle * 0.5 / 180 * Math.PI); //sector是角度, 换成弧度
            return dot > cos;
        }
        return false;
    };
    /**
     * 直线和扇形是否相交
     * @param linePoint1 线段点
     * @param linePoint2
     * @param sectorCenter 扇形中心
     * @param radius 半径
     * @param sectorAngle 角度[0度朝向为 普通数字坐标系向上的y正轴]
     * @param rotation 扇形旋转角度[计算中使用逆时针为正]
     * @param isLayaCo 在laya坐标中: 顺时针旋转为正, 同时y向下为正.
     */
    CollisionUtil.IsLineCrossedInSector = function (linePoint1, linePoint2, sectorCenter, radius, sectorAngle, rotation, isLayaCo) {
        if (isLayaCo === void 0) { isLayaCo = true; }
        //1. 先转换点到正常坐标系
        var linePt1 = linePoint1.clone();
        var linePt2 = linePoint2.clone();
        var center = sectorCenter.clone();
        var counterClockRoation = rotation;
        if (isLayaCo) {
            linePt1.y *= -1;
            linePt2.y *= -1;
            center.y *= -1;
            counterClockRoation *= -1; //旋转角度转为逆时针
        }
        var sectorDir = CommonUtil.GetYAxisInNormalCoByAngle(counterClockRoation, true); //扇形的朝向, 0度朝向为向上的y正轴
        //2. 检测直线和扇形两边是否相交
        var leftDir = CommonUtil.RotateVector(sectorDir, sectorAngle * 0.5, true);
        var rightDir = CommonUtil.RotateVector(sectorDir, sectorAngle * 0.5, false);
        var leftDirLine = center.add(leftDir.mul(radius));
        var rightDirLine = center.add(rightDir.mul(radius));
        if (this.LineLineCrossed(center, leftDirLine, linePt1, linePt2))
            return true;
        if (this.LineLineCrossed(center, rightDirLine, linePt1, linePt2))
            return true;
        //3. 点是否在园内, 整个线段在扇形内情况
        var isPoint1InSector = this.IsPointInSector(linePt1, center, radius, sectorAngle, counterClockRoation, false);
        if (isPoint1InSector)
            return true;
        var isPoint2InSector = this.IsPointInSector(linePt2, center, radius, sectorAngle, counterClockRoation, false);
        if (isPoint2InSector)
            return true;
        //4. 直线是否和弧度相交, 扇形中心点到线段的投影点是否在线段中, 并且在扇形中.
        var protjectionPoint = this.GetProjectionPointToLine(center, linePt1, linePt2);
        if (protjectionPoint.x >= Math.min(linePt1.x, linePt2.x) && protjectionPoint.x <= Math.max(linePt1.x, linePt2.x)) {
            //检测这个点是否在扇形内, 和扇形相交的直线, 它的投影点必定在扇形内容
            var disVec = protjectionPoint.sub(center);
            if (disVec.magnitudePower2() >= radius * radius)
                return false; //距离超过半径s
            return disVec.normalise().dot(sectorDir) > Math.cos(sectorAngle * 0.5 / 180 * Math.PI);
        }
        else {
            return false; //投影点不在线段上, 此时不属于扇形
        }
    };
    /**
     * 检测矩形和扇形碰撞
     * @param collisionInfo
     * @param sectorCollisionInfo
     * @param isLayaCo
     */
    CollisionUtil.IsBoxCrossedSector = function (collisionInfo, sectorCollisionInfo, isLayaCo) {
        if (isLayaCo === void 0) { isLayaCo = true; }
        //box的两个轴向量, 如果是laya坐标系, 转到坐标系中
        var xAxis = CommonUtil.GetXAxisInNormalCoByAngle(collisionInfo.rotation, !isLayaCo);
        if (isLayaCo)
            xAxis.y *= -1;
        var yAxis = CommonUtil.GetYAxisInNormalCoByAngle(collisionInfo.rotation, !isLayaCo);
        if (isLayaCo)
            yAxis.y *= -1; //转成laya的向量
        var axes = [xAxis, yAxis];
        //计算box四个角[左上, 左下, 右上, 右下]
        var boxCornerPoints = [];
        for (var m = 0; m < 2; m++) {
            var xAxis_2 = axes[0].mul(m == 0 ? -1 : 1);
            var point = collisionInfo.center.add(xAxis_2.mul(collisionInfo.size.x * 0.5));
            for (var n = 0; n < 2; n++) {
                var yAxis_2 = axes[1].mul(n == 0 ? -1 : 1);
                var checkPoint = point.add(yAxis_2.mul(collisionInfo.size.y * 0.5));
                boxCornerPoints.push(checkPoint);
            }
        }
        //检测直线和扇形碰撞
        if (this.IsLineCrossedInSector(boxCornerPoints[0], boxCornerPoints[1], sectorCollisionInfo.center, sectorCollisionInfo.radius, sectorCollisionInfo.sectorAngle, sectorCollisionInfo.rotation, isLayaCo))
            return true;
        if (this.IsLineCrossedInSector(boxCornerPoints[0], boxCornerPoints[2], sectorCollisionInfo.center, sectorCollisionInfo.radius, sectorCollisionInfo.sectorAngle, sectorCollisionInfo.rotation, isLayaCo))
            return true;
        if (this.IsLineCrossedInSector(boxCornerPoints[3], boxCornerPoints[1], sectorCollisionInfo.center, sectorCollisionInfo.radius, sectorCollisionInfo.sectorAngle, sectorCollisionInfo.rotation, isLayaCo))
            return true;
        if (this.IsLineCrossedInSector(boxCornerPoints[3], boxCornerPoints[2], sectorCollisionInfo.center, sectorCollisionInfo.radius, sectorCollisionInfo.sectorAngle, sectorCollisionInfo.rotation, isLayaCo))
            return true;
        return false;
    };
    /**
     * 获取点在线段上的投影
     * 在正常坐标系内计算
     * @param point
     * @param linePoint1
     * @param linePoint2
     */
    CollisionUtil.GetProjectionPointToLine = function (point, linePoint1, linePoint2) {
        var vector_PointToLinePoint1 = point.sub(linePoint1);
        var normalVector_LinePoint2ToLinePoint1 = (linePoint2.sub(linePoint1)).normalise();
        //计算点到线段的投影
        var projOnLineLen = vector_PointToLinePoint1.dot(normalVector_LinePoint2ToLinePoint1);
        //投影在线段上, 返回点到线段距离
        var projectionPoint = linePoint1.add(normalVector_LinePoint2ToLinePoint1.mul(projOnLineLen));
        return projectionPoint;
    };
    //直线 p1-p2 是否相交 p3-p4
    CollisionUtil.LineLineCrossed = function (p1, p2, p3, p4) {
        var s1 = ((p4.x - p3.x) * (p1.y - p3.y) - (p4.y - p3.y) * (p1.x - p3.x))
            / ((p4.y - p3.y) * (p2.x - p1.x) - (p4.x - p3.x) * (p2.y - p1.y));
        var s2 = ((p2.x - p1.x) * (p1.y - p3.y) - (p2.y - p1.y) * (p1.x - p3.x))
            / ((p4.y - p3.y) * (p2.x - p1.x) - (p4.x - p3.x) * (p2.y - p1.y));
        return s1 > 0 && s1 < 1 && s2 > 0 && s2 < 1;
    };
    return CollisionUtil;
}());
//# sourceMappingURL=CollisionUtil.js.map