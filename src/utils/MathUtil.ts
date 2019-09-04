/*
* name;
*/
class MathUtil {

    public static get2PointAngle(selfX: number, selfY: number, targetX: number, targetY: number): number {

        var angle: number = Math.atan2((targetY - selfY), (targetX - selfX)) //弧度  
        var theta: number = angle * (180 / Math.PI);

        //TODO 这里每次都差90，先加上
        return theta + 90;
    }

    public static get2PointDistance(x1: number, x2: number, y1: number, y2: number): number {

        var dx: number = Math.abs(x1 - x2);
        var  dy: number = Math.abs(y1 - y2);
        var dis: number = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));

        return dis;
    }
}