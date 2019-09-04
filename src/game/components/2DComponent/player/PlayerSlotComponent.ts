/*
* 玩家两边给支援飞机和子飞机的位置
*/
enum EnumSlotType {
    None = 0,//
    Alliance = 1,//支援飞机道具
    ChildPlane = 2//子飞机技能
}
class PlayerSlotComponent extends ComponentBase2D {
    private planePositionSlot: EnumSlotType[];//子飞机位置索引. [1, 2, 2,0]表示第一个位置是支援飞机, 第2,3位置是子飞机, 第4位置飞机回收
    private curSlotType: EnumSlotType = EnumSlotType.None;//当前槽位占用模式, 是否有支援飞机

    public onAdd(): void {
        this.Reset();
    }

    public onReomove(): void {
        this.Reset();
    }

    public OnEnterMatch(param?: any) {
        this.Reset();
    }
    public OnExitMatch() {
        this.Reset();
    }
    public Reset() {
        this.curSlotType = EnumSlotType.None;
        this.planePositionSlot = [];
    }

    /**
     * 获取一个空槽位
     */
    public getEmpetySlot(): number {
        let slotIndex = -1;
        //1. 获取一个空slot,
        for (let index = 0; index < this.planePositionSlot.length; index++) {
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
    }

    //占用槽位
    public OccupySlot(slotIndex: number, slotType: EnumSlotType) {
        if (this.planePositionSlot[slotIndex] != EnumSlotType.None) {
            Log.Error("slot index %i 不为空, 不可以被占用")
        }

        if (this.curSlotType == EnumSlotType.None) this.curSlotType = slotType;
        this.planePositionSlot[slotIndex] = slotType;
        //添加支援飞机, 需要重置位置
        if (slotType == EnumSlotType.Alliance) {
            this.ResetSlotInterval(slotType)
        }
    }

    //强制占用槽位: 支援飞机, 一直占用第一个位置. 其他子飞机挪移
    public ForceOccupySlot(slotIndex: number, slotType: EnumSlotType) {
        //如果第一个slot被占用, 让原来的飞机挪位置 sendnotification (SlotForceOccupied, slotIndex)
        if (this.planePositionSlot[slotIndex] != EnumSlotType.None) {
            Facade.instance.sendNotification(NotificationNames.SLOT_FORCE_OCCUPIED, slotIndex)
            this.planePositionSlot[slotIndex] = EnumSlotType.None;
        }
        this.OccupySlot(slotIndex, slotType)
    }

    //清理槽位
    public ClearSlot(slotIndex: number, slotType: EnumSlotType) {
        this.planePositionSlot[slotIndex] = EnumSlotType.None;
        //回收支援飞机, 需要重置位置
        if (slotType == EnumSlotType.Alliance) {
            this.ResetSlotInterval(EnumSlotType.ChildPlane)
        }
    }

    public ResetSlotInterval(slotType: EnumSlotType) {
        if (this.curSlotType == slotType) return;
        this.curSlotType = slotType;
        //重置后, 通知所有飞机切换位置
        Facade.instance.sendNotification(NotificationNames.SLOT_INTERVAL_CHANGED, slotType)
    }

    //支援飞机的位置, 固定在第一个
    public getAlliancePlaneRelativePos(): Vec2 {
        return new Vec2(-this.player.ViewSize.x, 0);
    }

    //获取子飞机slot对应的位置
    public getChildPlaneRelativePosBySlotIndex(slotIndex: number, childPlaneViewSize: Vec2): Vec2 {

        //子飞机使用一种间隔
        let childPlaneSize = childPlaneViewSize;
        let mainPlaneSize = this.player.ViewSize;

        let parentPos = new Vec2(0, 0);// player.PlayerPos;
        let interval = 10;//子飞机之间间隔
        let left = slotIndex % 2 == 0;
        let index = Math.floor(slotIndex / 2) + 1; //1, 2...
        let childPosX = parentPos.x + (left ? -1 : 1) * ((mainPlaneSize.x - childPlaneSize.x) * 0.5 + index * (childPlaneSize.x + interval));
        let childPosY = 0;/// parentPos.y + (left ? -1 : 1) * (player.ViewSize.y + index * (childSize.y)) * 0.5;

        if (this.curSlotType == EnumSlotType.Alliance && left) {
            //有支援飞机的使用一种间隔
            childPosX -= mainPlaneSize.x - childPlaneSize.x;
        }

        return new Vec2(childPosX, childPosY);
    }
}