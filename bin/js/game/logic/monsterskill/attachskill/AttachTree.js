/*
* name;
*/
var AttachTree = (function () {
    function AttachTree() {
        this.uid = -1;
        this.childs = [];
        this.parent = null;
    }
    //顶层父节点
    AttachTree.prototype.GetTopParent = function () {
        var parent = this;
        while (parent) {
            var temp = parent.parent;
            if (temp == null)
                break; //父节点为空, 到顶
            parent = temp;
        }
        return parent;
    };
    //从父节点删除, 或者从DataCenter总删除
    AttachTree.prototype.RemoveFromParent = function () {
        var parent = this.parent;
        var attachTree = null;
        if (parent) {
            attachTree = parent.childs;
        }
        else {
            attachTree = AttachDataCenter.Instance.attachCenters;
        }
        var index = attachTree.indexOf(this);
        if (index >= 0)
            attachTree.splice(index, 1);
    };
    //是否在同个父节点
    AttachTree.prototype.IsUnderSameParent = function (tree2) {
        return this.GetTopParent() == tree2.GetTopParent();
    };
    //获取总子节点数量
    AttachTree.prototype.GetTotalChildCount = function () {
        var totalChild = 0;
        for (var index = 0; index < this.childs.length; index++) {
            var element = this.childs[index];
            totalChild += 1;
            totalChild += element.GetTotalChildCount();
        }
        return totalChild;
    };
    return AttachTree;
}());
//# sourceMappingURL=AttachTree.js.map