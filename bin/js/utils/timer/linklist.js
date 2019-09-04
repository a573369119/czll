var LinkList = (function () {
    function LinkList() {
        this.pool = [];
        this._head = this._tail = null;
        this.pool = [];
    }
    LinkList.prototype.spawn_node = function (key, data) {
        var node = this.pool.length > 0 ? this.pool.pop() : null;
        if (node) {
            node.key = key;
            node.data = data;
            node.next = null;
        }
        else {
            node = { key: key, data: data, next: null };
        }
        return node;
    };
    Object.defineProperty(LinkList.prototype, "head", {
        get: function () {
            return this._head;
        },
        enumerable: true,
        configurable: true
    });
    LinkList.prototype.append = function (key, data) {
        var node = this.spawn_node(key, data);
        //将node加到linklist末尾
        if (this._tail) {
            this._tail.next = node;
            this._tail = node;
        }
        else {
            this._head = this._tail = node;
        }
        return node.key;
    };
    LinkList.prototype.remove = function (key) {
        if (!key) {
            return null;
        }
        if (!this._head) {
            return null;
        }
        var prev;
        var curr = this._head;
        while (curr && curr.key != key) {
            prev = curr;
            curr = curr.next;
        }
        //没找到
        if (!curr) {
            return null;
        }
        if (!prev) {
            //curr为头节点(要区分curr是否同时为尾节点)
            this._head = curr.next;
            if (!curr.next) {
                this._tail = null;
            }
        }
        else {
            //curr非头节点(要区分curr是否为尾节点)
            prev.next = curr.next;
            if (!curr.next) {
                this._tail = prev;
            }
        }
        //清理node数据
        var data = curr.data;
        curr.next = null;
        curr.data = null;
        this.pool.push(curr);
        return data;
    };
    return LinkList;
}());
//# sourceMappingURL=linklist.js.map