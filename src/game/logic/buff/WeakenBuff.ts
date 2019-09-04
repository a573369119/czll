/*
* 怪物减速
*/
class WeakenBuff implements IBuffLogic {
    private timerId: number = -1;
    private config: BuffConfigConfigData;
    private onEnd: Function;//stop/end回调
    private static weakenScale: number = -1;

    public Start(parent: PlayerBase2D, param: any, onEndCallback: Function) {
        this.onEnd = onEndCallback;
        this.config = ConfigManager.GetInstance().GetBuffConfig(EnumBuffType.Weaken);;

        //间隔ns
        this.timerId = TimeManager.getInst().once(this.config.duration, cbhandler.gen_handler(
            () => {
                this.timerId = -1;
                // this.End(parent, null);
                this.onEnd();
                this.onEnd = null;
            }, this));

        //怪物减速
        if (WeakenBuff.weakenScale < 0) WeakenBuff.weakenScale = ConfigManager.GetInstance().GetBuffConfig(EnumBuffType.Weaken).Param1;
        //MonsterMoveComponent2D.SpeedScale = WeakenBuff.weakenScale;
        Facade.instance.sendNotification(NotificationNames.MONSTER_PAUSE, WeakenBuff.weakenScale)
    }

    //连续获取buff, 刷新效果
    public Refresh(parent: PlayerBase2D, onEndCallback: Function, param: any) {
        this.onEnd = onEndCallback;
        this.Stop(parent, null);
        this.Start(parent, param, this.onEnd)
    }

    public Stop(parent: PlayerBase2D, param: any) {
        this.End(parent, null, param)
    }

    public End(parent: PlayerBase2D, onEndComplete: Function, param: any) {
        //停止发射子弹
        if (this.timerId >= 0) TimeManager.getInst().remove(this.timerId);
        this.timerId = -1;
        //MonsterMoveComponent2D.SpeedScale = 1;
        Facade.instance.sendNotification(NotificationNames.MONSTER_PAUSE, 1)
        if (onEndComplete) onEndComplete();
    }
} 