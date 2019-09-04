/*
* name;
*/
class SortUtil {
    /**
     * 快速排序（从小到大排序）
     * @param arr 数组
     * @param selector 参数，例：classA=>classA.ParamB
     */
    public static orderby<Titem, Tvalue>(arr: Titem[], selector: (i: Titem) => Tvalue): Titem[] {
        if (arr.length <= 1) {
            return arr;
        }
        const pivotIndex = Math.floor(arr.length / 2);
        const pivot = arr.splice(pivotIndex, 1)[0];
        const left = [] as Titem[];
        const right = [] as Titem[];

        for (const i of arr) {
            if (selector(i) < selector(pivot)) {
                left.push(i);
            } else {
                right.push(i);
            }
        }
        return SortUtil.orderby(left, selector).concat([pivot], SortUtil.orderby(right, selector));
    }
}