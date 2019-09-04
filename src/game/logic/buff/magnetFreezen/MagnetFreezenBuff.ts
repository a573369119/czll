/*
* 电磁干扰buff :电磁干扰技能, 麻痹怪物param秒
*/
class MagnetFreezenBuff implements IBuffLogic {
    public static FIRE_INTERVAL: number; //发射频率

    private timerId: number = -1;
    private config: BuffConfigConfigData;
    private onEnd: Function;//stop/end回调

    public Start(parent: PlayerBase2D, param: any, onEndCallback: Function) {
        this.onEnd = onEndCallback;
        this.config = ConfigManager.GetInstance().GetBuffConfig(EnumBuffType.MagnetFreezen);;
        // this.resetParam();
        //初始化电网池
        // GamePoolManager.Instance.InitPool<ChildPlane>(ChildPlaneWeapon.GetPoolID(), 5, ChildPlane)

        // 麻痹怪物param秒
        //间隔ns
        let duration = param;
        (parent as Monster).Freeze(true);
        this.timerId = TimeManager.getInst().once(param, cbhandler.gen_handler(
            () => {
                (parent as Monster).Freeze(false);
                this.timerId = -1;
                // this.End(parent, null);
                this.onEnd();
                this.onEnd = null;
            }, this));
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
        if (onEndComplete) onEndComplete();
        // GamePoolManager.Instance.Destory<ChildPlane>(ChildPlaneWeapon.GetPoolID());
    }




    //////////////////////////////////////////////////////
    //逻辑, 

}