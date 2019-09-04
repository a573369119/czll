/*
* name;
*/
var CommonUtil2D = (function () {
    function CommonUtil2D() {
    }
    //获取在newParent节点下的坐标. == 在newParent下的本地坐标 obj必须在newParent的子树上
    CommonUtil2D.GetLocalPositionUnder = function (obj, newParent, monster) {
        if (monster === void 0) { monster = null; }
        var objGolbalPos = this.GetGlobalPosition(obj);
        var parentGolbalPos = this.GetGlobalPosition(newParent);
        return new Vec2(objGolbalPos.x - parentGolbalPos.x, objGolbalPos.y - parentGolbalPos.y);
        // if (obj.destroyed) {
        //     Log.Error("destroy")
        // }
        // let find = false;
        // let parentPath = [];
        // let parent = obj;
        // let count = 0;
        // let name = "";
        // while (parent != null && parent != undefined) {
        //     name += "," + parent.name;
        //     parentPath.push(parent);
        //     if (parent == newParent) {
        //         find = true;
        //         break;
        //     }
        //     parent = parent.parent as Laya.Sprite;
        //     count++;
        //     if (count > 20) {
        //         Log.Debug("obj %o", obj)
        //         Log.Debug("monster %o", monster)
        //         Log.Debug("monster %i, %i, %i", monster.UID, monster.playerID, name)
        //         Log.Error("GetLocalPositionUnder loop errror")
        //     }
        //     if (count > 20) {
        //         Log.Error("GetLocalPositionUnder loop errror")
        //     }
        // }
        // let x = 0;
        // let y = 0;
        // //计算相对坐标
        // for (let index = 0; index < parentPath.length; index++) {
        //     let element = parentPath[index] as Laya.Sprite;
        //     x += element.x; y += element.y;
        // }
        // return find ? new Vec2(x, y) : null;
    };
    //获取在目标节点下的位置, 先统计换成stage下的本地坐标, 再计算相对位置
    CommonUtil2D.GetPosUnderTargetObj = function (obj, targetObj, monster) {
        if (monster === void 0) { monster = null; }
        if (obj.parent == targetObj)
            return new Vec2(obj.x, obj.y);
        return this.GetLocalPositionUnder(obj, targetObj);
        // let pos1 = this.GetLocalPositionUnder(obj, Laya.stage, monster)
        // if (pos1 == null) return new Vec2(0, 0);//obj没有添加到stage
        // let pos2 = this.GetLocalPositionUnder(targetObj, Laya.stage, monster)
        // if (pos2 == null) return new Vec2(0, 0);//obj没有添加到stage
        // return pos1.sub(pos2)
    };
    //设置父节点, 前提是两个父节点是统一层级的 obj.parent必须在newParent子树
    CommonUtil2D.ChangeToGrandParent = function (obj, newParent) {
        var preParentPos = new Vec2(0, 0);
        if (obj.parent) {
            var parent_1 = obj.parent;
            preParentPos.x = parent_1.x;
            preParentPos.y = parent_1.y;
        }
        newParent.addChild(obj);
        //切换父节点后 localPostion的x,y不会变, 需要重新设置
        obj.x += preParentPos.x;
        obj.y += preParentPos.y;
    };
    //获取obj在checkObj相同层下的位置, obj必须在checkObj.parent的子树下
    CommonUtil2D.GetLoalPostionUnderSameParent = function (obj, checkObj) {
        return this.GetLocalPositionUnder(obj, checkObj.parent);
    };
    //根据子物体与父物体，计算子物体的全局坐标
    CommonUtil2D.GetGlobalPosition = function (child) {
        // let localPoint = new Laya.Point(child.x, child.y);
        // let globalPos = (child.parent as Laya.Sprite).localToGlobal(localPoint);
        var localPoint = new Laya.Point(0, 0);
        var globalPos = child.localToGlobal(localPoint);
        return new Vec2(globalPos.x, globalPos.y);
    };
    /**
     * 设置from的朝向, 朝向lookat位置, from和lookat必须在同个父节点下面
     * @param from
     * @param lookAt
     */
    CommonUtil2D.LookAt = function (from, lookAt) {
        if (from.parent != lookAt.parent) {
            Log.Error("Lookat的两个物体, 必须在同个父节点下, 否则位置不在同个本地坐标系计算会出错.");
        }
        var lookAtPos = new Vec2(lookAt.x, lookAt.y);
        return this.LookAtPos(from, lookAtPos);
    };
    /**
     * 设置from的朝向
     * @param from
     * @param lookAtPos 看向的位置  注意这个位置必须和from物体在同一个层级, 同一个父节点下, 否则计算出错
     * @param screenUp 默认使用UPForLaya2D屏幕顶部作为up标准; 如果图片朝向向下比如飞机的怪物, 计算旋转就选择screenUp = false;
     */
    CommonUtil2D.LookAtPos = function (from, lookAtPos, screenUp) {
        if (screenUp === void 0) { screenUp = true; }
        var fromPos = new Vec2(from.x, from.y);
        var dir = lookAtPos.sub(fromPos).normalise(); //必须normalised  arcos只接受-1 ~1之间的值
        var dot = dir.dot(screenUp ? Vec2.UPForLaya2D : Vec2.UP);
        var angle = Math.acos(dot) / Math.PI * 180;
        angle = (screenUp ? 1 : -1) * angle; //顺时针选旋转为正, 当使用Vec2.Up作为标准时候, 旋转角度取反
        if (lookAtPos.x > from.x) {
            from.rotation = angle; //目标在右 
        }
        else {
            from.rotation = -angle; //目标在左
        }
    };
    //把圆分成n分, 每个点的位置
    CommonUtil2D.DivideCircle = function (center, radius, n) {
        var allPos = [];
        var angle = 2 * Math.PI / n;
        for (var i = 0; i < n; i++) {
            var to = new Vec2(center.x + Math.cos(angle * i) * radius, center.y + Math.sin(angle * i) * radius);
            allPos.push(to);
        }
        return allPos;
    };
    return CommonUtil2D;
}());
//# sourceMappingURL=CommonUtil2D.js.map