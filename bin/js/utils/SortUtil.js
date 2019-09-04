/*
* name;
*/
var SortUtil = (function () {
    function SortUtil() {
    }
    /**
     * 快速排序（从小到大排序）
     * @param arr 数组
     * @param selector 参数，例：classA=>classA.ParamB
     */
    SortUtil.orderby = function (arr, selector) {
        if (arr.length <= 1) {
            return arr;
        }
        var pivotIndex = Math.floor(arr.length / 2);
        var pivot = arr.splice(pivotIndex, 1)[0];
        var left = [];
        var right = [];
        for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
            var i = arr_1[_i];
            if (selector(i) < selector(pivot)) {
                left.push(i);
            }
            else {
                right.push(i);
            }
        }
        return SortUtil.orderby(left, selector).concat([pivot], SortUtil.orderby(right, selector));
    };
    return SortUtil;
}());
//# sourceMappingURL=SortUtil.js.map