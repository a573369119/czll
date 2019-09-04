/*
* name;
*/
var RandomArrayUtil = (function () {
    function RandomArrayUtil() {
    }
    /**
     * 根据输入的参数返回一个乱数表（数组）。
     * @param max 生成基础数组时的长度（从0开始）。
     * @param returnNum 乱数表的长度（从0开始）。
     * @param round 取整方式，false为向下取整，true为向上取整。
     */
    RandomArrayUtil.GetRandomArray = function (max, returnNum, round) {
        //egret.log(" --- max" + max);
        //egret.log(" --- returnNum" + returnNum);
        var des = [];
        for (var i = 0; i < max; i++) {
            des.push(i);
        }
        var random;
        var temp = [];
        for (var j = 0; j < returnNum; j++) {
            //向上取整
            random = Math.ceil(Math.random() * des.length);
            //做特殊处理，如果随机出来直接为0则变为1
            random = random == 0 ? 1 : random;
            //取整方式
            random += round ? 0 : -1;
            temp.push(des[random]);
            //egret.log(" --- random" + random);
            des.splice(random, 1);
        }
        return temp;
    };
    return RandomArrayUtil;
}());
//# sourceMappingURL=RandomArrayUtil.js.map