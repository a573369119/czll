/*
* name;
*/
class CurveUtil {

    /**
     * 根据起始点、结束点、中间点创建贝塞尔曲线的路径列表
     * @param p0 起始点
     * @param p1 中间点
     * @param p2 结束点
     * @param pathLength 路径长度 （包含起始点与结束点），不得小于2
     */
    public static CreateCurvePath(p0: Vec2, p1: Vec2, p2: Vec2, pathLength: number): Array<Vec2> {
        let pathList = new Array<Vec2>();
        //判断，长度不得小于2
        if (pathLength < 2) {
            return pathList;
        }
        let ratio: number = 1 / (pathLength - 1);
        for (let i = 0; i < pathLength; i++) {
            pathList.push(this.BesselCurve(p0, p1, p2, ratio * i))
        }
        return pathList;
    }

    /**
     * 二阶贝塞尔曲线
     * @param p0 起始点
     * @param p1 中间点
     * @param p2 结束点
     * @param t 0~1
     */
    private static BesselCurve(p0: Vec2, p1: Vec2, p2: Vec2, t: number): Vec2 {
        //对数值进行限制
        if (t < 0) {
            t = 0;
        } else if (t > 1) {
            t = 1;
        }
        // (1-t)^2*p0 + 2t(1-t)*p1 + t^2*p2
        let result = new Vec2(
            Math.pow(1 - t, 2) * p0.x + 2 * t * (1 - t) * p1.x + Math.pow(t, 2) * p2.x,
            Math.pow(1 - t, 2) * p0.y + 2 * t * (1 - t) * p1.y + Math.pow(t, 2) * p2.y,
        );
        return result;
    }

}