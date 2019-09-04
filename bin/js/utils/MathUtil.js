/*
* name;
*/
var MathUtil = (function () {
    function MathUtil() {
    }
    MathUtil.get2PointAngle = function (selfX, selfY, targetX, targetY) {
        var angle = Math.atan2((targetY - selfY), (targetX - selfX)); //弧度  
        var theta = angle * (180 / Math.PI);
        //TODO 这里每次都差90，先加上
        return theta + 90;
    };
    MathUtil.get2PointDistance = function (x1, x2, y1, y2) {
        var dx = Math.abs(x1 - x2);
        var dy = Math.abs(y1 - y2);
        var dis = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
        return dis;
    };
    return MathUtil;
}());
//# sourceMappingURL=MathUtil.js.map