/*
*  Oriented Bounding BOX 碰撞检测 SAT 分离轴定理
*  ver1. 整个个坐标系x左为正, y上为正 和Laya的不同. USING_LAYA_COORDINATE进行标记.
*  ver2. 继续cos的弧度,是逆时针反向旋转. 和laya的不同. laya是顺时针. 需要*-1
*/
class OBB {
    public USING_LAYA_COORDINATE = true;//传入的center的位置是laya坐标系, 左为正, 下为正

    private boxCollsionInfo: BoxCollisonInfo;
    private detectingAxis: Vec2[] = [];//检测轴
    public get Axis(): Vec2[] { return this.detectingAxis; }
    public get Center(): Vec2 { return this.boxCollsionInfo.center; }

    constructor(box: BoxCollisonInfo) {
        this.boxCollsionInfo = box;
        //因为laya的旋转是顺时针. 但是OBB用逆时针计算角度.
        //同时设个是角度值, 不是弧度
        let rotation = (this.USING_LAYA_COORDINATE ? -1 : 1) * this.boxCollsionInfo.rotation; //ver2.
        this.GenDetectingAxis(rotation)
    }


    //两个旋转的矩阵是否相交
    public IsCollidedWith(obb: OBB): boolean {
        let centerVec = obb.Center.sub(this.Center);//中心连线
        if (this.USING_LAYA_COORDINATE) centerVec.y *= -1; //ver1.

        //在自己的两个检测轴上检测
        for (let index = 0; index < this.Axis.length; index++) {
            let axis = this.Axis[index];
            let a = this.GetRadiusProjectionOn(axis)
            let b = obb.GetRadiusProjectionOn(axis);
            let c = Math.abs(centerVec.dot(axis));
            if (this.GetRadiusProjectionOn(axis) + obb.GetRadiusProjectionOn(axis) <= Math.abs(centerVec.dot(axis))) {
                return false;
            }
        }

        //在对方的检测轴上检测
        for (let index = 0; index < obb.Axis.length; index++) {
            let axis = obb.Axis[index];
            if (axis.equal(this.Axis[0]) || axis.equal(this.Axis[1])) continue;// 已经检测过的轴不需要重复检测
            let a = this.GetRadiusProjectionOn(axis)
            let b = obb.GetRadiusProjectionOn(axis);
            let c = Math.abs(centerVec.dot(axis));
            if (this.GetRadiusProjectionOn(axis) + obb.GetRadiusProjectionOn(axis) <= Math.abs(centerVec.dot(axis))) {
                return false;
            }
        }

        // Log.Debug("collided %o, %o", obb.boxCollsionInfo, this.boxCollsionInfo)
        return true;
    }

    //根据自己的旋转, 计算对应的两个检测轴
    private GenDetectingAxis(rotation: number) {
        let radian = rotation / 180 * Math.PI; //转成弧度
        let axis1 = new Vec2(Math.cos(radian), Math.sin(radian));   //x
        let axis2 = new Vec2(-Math.sin(radian), Math.cos(radian))   //y
        this.detectingAxis.push(axis1);
        this.detectingAxis.push(axis2);
    }

    //计算自己两个其他矩阵检测轴otherBoxAxis上的投影长, otherBoxAxis是nornalise的单位向量
    public GetRadiusProjectionOn(otherBoxAxis: Vec2): number {
        let projectionX = otherBoxAxis.dot(this.detectingAxis[0]);
        let projectionY = otherBoxAxis.dot(this.detectingAxis[1]);
        return Math.abs(projectionX) * this.boxCollsionInfo.size.x * 0.5 +
            Math.abs(projectionY) * this.boxCollsionInfo.size.y * 0.5
    }
}