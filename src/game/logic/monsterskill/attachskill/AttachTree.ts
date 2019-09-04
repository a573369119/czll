/*
* name;
*/
class AttachTree {
    public uid: number = -1;
    public childs: AttachTree[] = [];
    public parent: AttachTree = null;

    //顶层父节点
    public GetTopParent(): AttachTree {
        let parent = this as AttachTree;
        while (parent) {
            let temp = parent.parent
            if (temp == null) break; //父节点为空, 到顶
            parent = temp;
        }
        return parent;
    }

    //从父节点删除, 或者从DataCenter总删除
    public RemoveFromParent() {
        let parent = this.parent;
        let attachTree: AttachTree[] = null;
        if (parent) {
            attachTree = parent.childs;
        } else {
            attachTree = AttachDataCenter.Instance.attachCenters;
        }
        let index = attachTree.indexOf(this)
        if (index >= 0) attachTree.splice(index, 1)
    }

    //是否在同个父节点
    public IsUnderSameParent(tree2: AttachTree): boolean {
        return this.GetTopParent() == tree2.GetTopParent();
    }

    //获取总子节点数量
    public GetTotalChildCount(): number {
        let totalChild = 0;
        for (let index = 0; index < this.childs.length; index++) {
            let element = this.childs[index];
            totalChild += 1;
            totalChild += element.GetTotalChildCount();
        }

        return totalChild;
    }
}