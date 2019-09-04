var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*
* 玩家两边给支援飞机和子飞机的位置
*/
var EnumSlotType;
(function (EnumSlotType) {
    EnumSlotType[EnumSlotType["None"] = 0] = "None";
    EnumSlotType[EnumSlotType["Alliance"] = 1] = "Alliance";
    EnumSlotType[EnumSlotType["ChildPlane"] = 2] = "ChildPlane"; //子飞机技能
})(EnumSlotType || (EnumSlotType = {}));
var PlayerSlotComponent = (function (_super) {
    __extends(PlayerSlotComponent, _super);
    function PlayerSlotComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.curSlotType = EnumSlotType.None; //当前槽位占用模式, 是否有支援飞机
        return _this;
    }
    PlayerSlotComponent.prototype.onAdd = function () {
        this.Reset();
    };
    PlayerSlotComponent.prototype.onReomove = function () {
        this.Reset();
    };
    PlayerSlotComponent.prototype.OnEnterMatch = function (param) {
        this.Reset();
    };
    PlayerSlotComponent.prototype.OnExitMatch = function () {
        this.Reset();
    };
    PlayerSlotComponent.prototype.Reset = function () {
        this.curSlotType = EnumSlotType.None;
        this.planePositionSlot = [];
    };
    /**
     * 获取一个空槽位
     */
    PlayerSlotComponent.prototype.getEmpetySlot = function () {
        var slotIndex = -1;
        //1. 获取一个空slot,
        for (var index = 0; index < this.planePositionSlot.length; index++) {
            if (this.planePositionSlot[index] == EnumSlotType.None) {
                slotIndex = index;
                break;
            }
        }
        //2. 没有空的, 就添加一个slot
        if (slotIndex < 0) {
            this.planePositionSlot.push(EnumSlotType.None);
            slotIndex = this.planePositionSlot.length - 1;
        }
        return slotIndex;
    };
    //占用槽位
    PlayerSlotComponent.prototype.OccupySlot = function (slotIndex, slotType) {
        if (this.planePositionSlot[slotIndex] != EnumSlotType.None) {
            Log.Error("slot index %i 不为空, 不可以被占用");
        }
        if (this.curSlotType == EnumSlotType.None)
            this.curSlotType = slotType;
        this.planePositionSlot[slotIndex] = slotType;
        //添加支援飞机, 需要重置位置
        if (slotType == EnumSlotType.Alliance) {
            this.ResetSlotInterval(slotType);
        }
    };
    //强制占用槽位: 支援飞机, 一直占用第一个位置. 其他子飞机挪移
    PlayerSlotComponent.prototype.ForceOccupySlot = function (slotIndex, slotType) {
        //如果第一个slot被占用, 让原来的飞机挪位置 sendnotification (SlotForceOccupied, slotIndex)
        if (this.planePositionSlot[slotIndex] != EnumSlotType.None) {
            Facade.instance.sendNotification(NotificationNames.SLOT_FORCE_OCCUPIED, slotIndex);
            this.planePositionSlot[slotIndex] = EnumSlotType.None;
        }
        this.OccupySlot(slotIndex, slotType);
    };
    //清理槽位
    PlayerSlotComponent.prototype.ClearSlot = function (slotIndex, slotType) {
        this.planePositionSlot[slotIndex] = EnumSlotType.None;
        //回收支援飞机, 需要重置位置
        if (slotType == EnumSlotType.Alliance) {
            this.ResetSlotInterval(EnumSlotType.ChildPlane);
        }
    };
    PlayerSlotComponent.prototype.ResetSlotInterval = function (slotType) {
        if (this.curSlotType == slotType)
            return;
        this.curSlotType = slotType;
        //重置后, 通知所有飞机切换位置
        Facade.instance.sendNotification(NotificationNames.SLOT_INTERVAL_CHANGED, slotType);
    };
    //支援飞机的位置, 固定在第一个
    PlayerSlotComponent.prototype.getAlliancePlaneRelativePos = function () {
        return new Vec2(-this.player.ViewSize.x, 0);
    };
    //获取子飞机slot对应的位置
    PlayerSlotComponent.prototype.getChildPlaneRelativePosBySlotIndex = function (slotIndex, childPlaneViewSize) {
        //子飞机使用一种间隔
        var childPlaneSize = childPlaneViewSize;
        var mainPlaneSize = this.player.ViewSize;
        var parentPos = new Vec2(0, 0); // player.PlayerPos;
        var interval = 10; //子飞机之间间隔
        var left = slotIndex % 2 == 0;
        var index = Math.floor(slotIndex / 2) + 1; //1, 2...
        var childPosX = parentPos.x + (left ? -1 : 1) * ((mainPlaneSize.x - childPlaneSize.x) * 0.5 + index * (childPlaneSize.x + interval));
        var childPosY = 0; /// parentPos.y + (left ? -1 : 1) * (player.ViewSize.y + index * (childSize.y)) * 0.5;
        if (this.curSlotType == EnumSlotType.Alliance && left) {
            //有支援飞机的使用一种间隔
            childPosX -= mainPlaneSize.x - childPlaneSize.x;
        }
        return new Vec2(childPosX, childPosY);
    };
    return PlayerSlotComponent;
}(ComponentBase2D));
//# sourceMappingURL=PlayerSlotComponent.js.map