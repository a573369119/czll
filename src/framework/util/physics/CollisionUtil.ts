/*
* name;
*/
class CollisionUtil {

    /**
     * 检测点是否在园内
     * @param checkPoint 检测点
     * @param sectorCenter 中心
     * @param radius 半径
     */
    public static IsPointInCircle(checkPoint: Vec2, sectorCenter: Vec2, radius: number): boolean {
        //检测点和圆形是否相交
        let distVec = sectorCenter.sub(checkPoint);
        return (distVec.x * distVec.x + distVec.y * distVec.y <= radius * radius)
    }

    /**
     * 两个圆是否相交
     * @param circle1Center 
     * @param circle1Radius 
     * @param circle2Center 
     * @param circle2Radius 
     */
    public static IsCirclesCrossed(circle1Center: Vec2, circle1Radius: number, circle2Center: Vec2, circle2Radius: number): boolean {
        let dist = circle1Center.dist(circle2Center);
        return dist <= circle1Radius + circle2Radius;
    }

    /// <summary>
    /// 圆和线相交
    /// </summary>
    /// <param name="center"></param>
    /// <param name="radius"></param>
    /// <param name="point1"></param>
    /// <param name="point2"></param>
    /// <returns></returns>
    public static IsCirleLineCrossed(center: Vec2, radius: number, point1: Vec2, point2: Vec2, isLayaCo: boolean = true): boolean {
        //两个点都在园内 或者 一个点在圆内
        let dist_pint1ToCenter = point1.dist(center);
        if (dist_pint1ToCenter <= radius) return true;
        let dist_pint2ToCenter = point2.dist(center);
        if (dist_pint2ToCenter <= radius) return true;

        if (isLayaCo) {
            point1.y *= -1;
            point2.y *= -1;
            center.y *= -1;
        }
        //两个都不在圆内, 但是线段穿过圆
        var minDistToLine = this.GetMiniDistFromPointToLine(center, point1, point2);
        return minDistToLine <= radius;
    }

    /// <summary>
    /// 获取点到线的最短距离, 如果点的投影没在线上, 就是点到线段两端最短的距离
    /// 在正常坐标系内计算
    /// </summary>
    /// <param name="point"></param>
    /// <param name="linePoint1"></param>
    /// <param name="linePoint2"></param>
    /// <returns></returns>
    public static GetMiniDistFromPointToLine(point: Vec2, linePoint1: Vec2, linePoint2: Vec2): number {
        let vector_PointToLinePoint1 = point.sub(linePoint1);
        let normalVector_LinePoint2ToLinePoint1 = (linePoint2.sub(linePoint1)).normalise();
        //计算点到线段的投影
        let projOnLineLen = vector_PointToLinePoint1.dot(normalVector_LinePoint2ToLinePoint1);
        //投影是否在线段外
        let lineLen = linePoint1.dist(linePoint2);
        var projectOnLine = projOnLineLen > 0 && projOnLineLen <= lineLen;
        if (!projectOnLine) {
            //如果投影没有在线段上, 就使用点到线段两端最短的距离
            let dist_PointToLinePoint2 = (point.sub(linePoint2)).magnitude();
            return Math.min(dist_PointToLinePoint2, vector_PointToLinePoint1.magnitude());
        }
        else {
            //投影在线段上, 返回点到线段距离
            let projectionPoint = linePoint1.add(normalVector_LinePoint2ToLinePoint1.mul(projOnLineLen));
            return projectionPoint.sub(point).magnitude();
        }
    }


    /**
     * 圆是否和矩形相交
     * @param boxCollisionInfo 
     * @param circleCollisionInfo 
     * @param isLayaCo 
     */
    public static IsCircleBoxCrossed(boxCollisionInfo: BoxCollisonInfo, circleCollisionInfo: CircleCollisonInfo, isLayaCo: boolean = true) {
        let cornors = this.GetBoxCorners(boxCollisionInfo, isLayaCo);
        //[Laya : 左上, 左下, 右上, 右下]
        if (this.IsCirleLineCrossed(circleCollisionInfo.center, circleCollisionInfo.radius, cornors[0], cornors[1], isLayaCo)) return true;
        if (this.IsCirleLineCrossed(circleCollisionInfo.center, circleCollisionInfo.radius, cornors[0], cornors[2], isLayaCo)) return true
        if (this.IsCirleLineCrossed(circleCollisionInfo.center, circleCollisionInfo.radius, cornors[3], cornors[1], isLayaCo)) return true
        if (this.IsCirleLineCrossed(circleCollisionInfo.center, circleCollisionInfo.radius, cornors[3], cornors[2], isLayaCo)) return true
        return false;
    }


    /**
     * 返回矩阵的四个角位置 
     * [Laya : 左上, 左下, 右上, 右下]
     * [其他 : 左下, 左上, 右下, 右上]
     * @param boxCollisionInfo 
     * @param isLayaCo 是否laya坐标系位置(y下为正), 和旋转(顺时针为正)
     */
    private static GetBoxCorners(boxCollisionInfo: BoxCollisonInfo, isLayaCo: boolean = true): Vec2[] {
        //box的两个轴向量, 如果是laya坐标系, 转到坐标系中
        let xAxis = CommonUtil.GetXAxisInNormalCoByAngle(boxCollisionInfo.rotation, !isLayaCo); if (isLayaCo) xAxis.y *= -1;
        let yAxis = CommonUtil.GetYAxisInNormalCoByAngle(boxCollisionInfo.rotation, !isLayaCo); if (isLayaCo) yAxis.y *= -1;//转成laya的向量
        let axes = [xAxis, yAxis];
        //计算box四个角[Laya : 左上, 左下, 右上, 右下]
        let boxCornerPoints = [];
        for (let m = 0; m < 2; m++) {
            let xAxis = axes[0].mul(m == 0 ? -1 : 1);
            let point = boxCollisionInfo.center.add(xAxis.mul(boxCollisionInfo.size.x * 0.5))
            for (let n = 0; n < 2; n++) {
                let yAxis = axes[1].mul(n == 0 ? -1 : 1);
                let checkPoint = point.add(yAxis.mul(boxCollisionInfo.size.y * 0.5))
                boxCornerPoints.push(checkPoint);
            }
        }

        return boxCornerPoints;
    }


    public static IsBoxCrossed(box1: BoxCollisonInfo, box2: BoxCollisonInfo): boolean {
        //预判
        let lenX = Math.abs(box1.center.x - box2.center.x)
        if (lenX > box1.size.x + box2.size.x) return false;
        let lenY = Math.abs(box1.center.y - box2.center.y)
        if (lenY > box1.size.y + box2.size.y) return false;

        let obb = new OBB(box1);
        let obb2 = new OBB(box2);
        return obb.IsCollidedWith(obb2);
        // return CommonUtil.isBoxCrossed(box1.center, box1.size, box2.center, box2.size)
    }

    public static IsBoxPointCrossed(box1: BoxCollisonInfo, point: Vec2): boolean {
        let halfXSize = box1.size.x * 0.5;
        let halfYSize = box1.size.y * 0.5;
        if (point.x < box1.center.x + halfXSize && point.x > box1.center.x - halfXSize
            && point.y < box1.center.y + halfYSize && point.y > box1.center.y - halfYSize) {
            return true;
        }
        return false;
    }

    /**
     * 检测点是否在扇形内 , 计算在正常坐标系内,  x右为正, y上为正, 默认扇形0度为y轴, sectorAngle左右各增加一半.
     * @param checkPoint 检测点
     * @param sectorCenter 扇形中心
     * @param radius 扇形半径
     * @param sectorAngle 扇形角度
     * @param rotation 扇形旋转角度
     * @param isLayaCo 是否laya2d坐标 laya y下为正//计算在正常坐标系内,  x右为正, y上为正
     */
    public static IsPointInSector(checkPoint: Vec2, sectorCenter: Vec2, radius: number, sectorAngle: number, rotation: number, isLayaCo: boolean = true): boolean {
        //检测点和圆形是否相交
        let distVec = checkPoint.sub(sectorCenter);
        if (isLayaCo) distVec.y *= -1;
        if (distVec.magnitudePower2() <= radius * radius) { //if (distVec.x * distVec.x + distVec.y * distVec.y <= radius * radius) {
            //点在园内的情况
            let yAxis = CommonUtil.GetYAxisInNormalCoByAngle(rotation, !isLayaCo) //根据角度获取y轴旋转后的方向
            distVec = distVec.normalise();                                  //单位向量才能计算出正确角度
            let dot = distVec.dot(yAxis);                                   //计算检测点到圆心向量和扇形方向的角度
            let cos = Math.cos(sectorAngle * 0.5 / 180 * Math.PI);          //sector是角度, 换成弧度
            return dot > cos;
        }
        return false;
    }

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
    public static IsLineCrossedInSector(linePoint1: Vec2, linePoint2: Vec2, sectorCenter: Vec2, radius: number, sectorAngle: number, rotation: number, isLayaCo: boolean = true): boolean {
        //1. 先转换点到正常坐标系
        let linePt1 = linePoint1.clone();
        let linePt2 = linePoint2.clone();
        let center = sectorCenter.clone();
        let counterClockRoation = rotation;
        if (isLayaCo) {
            linePt1.y *= -1;
            linePt2.y *= -1;
            center.y *= -1;
            counterClockRoation *= -1;//旋转角度转为逆时针
        }
        let sectorDir = CommonUtil.GetYAxisInNormalCoByAngle(counterClockRoation, true) //扇形的朝向, 0度朝向为向上的y正轴

        //2. 检测直线和扇形两边是否相交
        let leftDir = CommonUtil.RotateVector(sectorDir, sectorAngle * 0.5, true);
        let rightDir = CommonUtil.RotateVector(sectorDir, sectorAngle * 0.5, false);
        let leftDirLine = center.add(leftDir.mul(radius));
        let rightDirLine = center.add(rightDir.mul(radius));
        if (this.LineLineCrossed(center, leftDirLine, linePt1, linePt2)) return true;
        if (this.LineLineCrossed(center, rightDirLine, linePt1, linePt2)) return true;

        //3. 点是否在园内, 整个线段在扇形内情况
        let isPoint1InSector = this.IsPointInSector(linePt1, center, radius, sectorAngle, counterClockRoation, false);
        if (isPoint1InSector) return true;
        let isPoint2InSector = this.IsPointInSector(linePt2, center, radius, sectorAngle, counterClockRoation, false);
        if (isPoint2InSector) return true;

        //4. 直线是否和弧度相交, 扇形中心点到线段的投影点是否在线段中, 并且在扇形中.
        let protjectionPoint = this.GetProjectionPointToLine(center, linePt1, linePt2)
        if (protjectionPoint.x >= Math.min(linePt1.x, linePt2.x) && protjectionPoint.x <= Math.max(linePt1.x, linePt2.x)) {
            //检测这个点是否在扇形内, 和扇形相交的直线, 它的投影点必定在扇形内容
            let disVec = protjectionPoint.sub(center);
            if (disVec.magnitudePower2() >= radius * radius) return false; //距离超过半径s
            return disVec.normalise().dot(sectorDir) > Math.cos(sectorAngle * 0.5 / 180 * Math.PI);
        } else {
            return false;//投影点不在线段上, 此时不属于扇形
        }
    }

    /**
     * 检测矩形和扇形碰撞
     * @param collisionInfo 
     * @param sectorCollisionInfo 
     * @param isLayaCo 
     */
    public static IsBoxCrossedSector(collisionInfo: BoxCollisonInfo, sectorCollisionInfo: SectorCollisonInfo, isLayaCo: boolean = true): boolean {
        //box的两个轴向量, 如果是laya坐标系, 转到坐标系中
        let xAxis = CommonUtil.GetXAxisInNormalCoByAngle(collisionInfo.rotation, !isLayaCo); if (isLayaCo) xAxis.y *= -1;
        let yAxis = CommonUtil.GetYAxisInNormalCoByAngle(collisionInfo.rotation, !isLayaCo); if (isLayaCo) yAxis.y *= -1;//转成laya的向量
        let axes = [xAxis, yAxis];
        //计算box四个角[左上, 左下, 右上, 右下]
        let boxCornerPoints = [];
        for (let m = 0; m < 2; m++) {
            let xAxis = axes[0].mul(m == 0 ? -1 : 1);
            let point = collisionInfo.center.add(xAxis.mul(collisionInfo.size.x * 0.5))
            for (let n = 0; n < 2; n++) {
                let yAxis = axes[1].mul(n == 0 ? -1 : 1);
                let checkPoint = point.add(yAxis.mul(collisionInfo.size.y * 0.5))
                boxCornerPoints.push(checkPoint);
            }
        }

        //检测直线和扇形碰撞
        if (this.IsLineCrossedInSector(boxCornerPoints[0], boxCornerPoints[1],
            sectorCollisionInfo.center, sectorCollisionInfo.radius,
            sectorCollisionInfo.sectorAngle, sectorCollisionInfo.rotation, isLayaCo)) return true;
        if (this.IsLineCrossedInSector(boxCornerPoints[0], boxCornerPoints[2],
            sectorCollisionInfo.center, sectorCollisionInfo.radius,
            sectorCollisionInfo.sectorAngle, sectorCollisionInfo.rotation, isLayaCo)) return true;
        if (this.IsLineCrossedInSector(boxCornerPoints[3], boxCornerPoints[1],
            sectorCollisionInfo.center, sectorCollisionInfo.radius,
            sectorCollisionInfo.sectorAngle, sectorCollisionInfo.rotation, isLayaCo)) return true;
        if (this.IsLineCrossedInSector(boxCornerPoints[3], boxCornerPoints[2],
            sectorCollisionInfo.center, sectorCollisionInfo.radius,
            sectorCollisionInfo.sectorAngle, sectorCollisionInfo.rotation, isLayaCo)) return true;
        return false;

    }


    /**
     * 获取点在线段上的投影
     * 在正常坐标系内计算
     * @param point 
     * @param linePoint1 
     * @param linePoint2 
     */
    public static GetProjectionPointToLine(point: Vec2, linePoint1: Vec2, linePoint2: Vec2): Vec2 {
        let vector_PointToLinePoint1 = point.sub(linePoint1);
        let normalVector_LinePoint2ToLinePoint1 = (linePoint2.sub(linePoint1)).normalise();
        //计算点到线段的投影
        let projOnLineLen = vector_PointToLinePoint1.dot(normalVector_LinePoint2ToLinePoint1);
        //投影在线段上, 返回点到线段距离
        let projectionPoint = linePoint1.add(normalVector_LinePoint2ToLinePoint1.mul(projOnLineLen));
        return projectionPoint;
    }

    //直线 p1-p2 是否相交 p3-p4
    public static LineLineCrossed(p1: Vec2, p2: Vec2, p3: Vec2, p4: Vec2) {
        var s1 = ((p4.x - p3.x) * (p1.y - p3.y) - (p4.y - p3.y) * (p1.x - p3.x))
            / ((p4.y - p3.y) * (p2.x - p1.x) - (p4.x - p3.x) * (p2.y - p1.y));
        var s2 = ((p2.x - p1.x) * (p1.y - p3.y) - (p2.y - p1.y) * (p1.x - p3.x))
            / ((p4.y - p3.y) * (p2.x - p1.x) - (p4.x - p3.x) * (p2.y - p1.y));
        return s1 > 0 && s1 < 1 && s2 > 0 && s2 < 1
    }
}