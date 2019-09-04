/*
* 呼叫支援
*/
class CallAllianceBuff implements IBuffLogic {
    private timerId: number = -1;
    private static config: BuffConfigConfigData;
    private onEnd: Function;//stop/end回调
    private state: EnumBuffState;//buff状态

    public Start(parent: PlayerBase2D, param: any, onEndCallback: Function) {
        this.state = EnumBuffState.Start;
        this.onEnd = onEndCallback;
        CallAllianceBuff.config = ConfigManager.GetInstance().GetBuffConfig(EnumBuffType.CallAlliance);;
        // this.InitWeaponParam();
        this.resetParam();
        //初始化池
        GamePoolManager.Instance.InitPool<AlliancePlane>(CallAllianceBuff.GetPoolID(), 1, AlliancePlane)
        this.StartChildPlane(parent, CallAllianceBuff.config)

        this.startTimer();
    }

    //开始计时
    private startTimer() {
        this.timerId = TimeManager.getInst().once(CallAllianceBuff.config.duration, cbhandler.gen_handler(
            () => {
                Log.Debug("callaliance 技能到时间 %i ", this.timerId)
                this.timerId = -1;
                // this.End(parent, null);
                this.onEnd();
                this.onEnd = null;
            }, this));
    }

    //停止计时
    private stopTimer() {
        if (this.timerId >= 0) {
            Log.Debug("callaliance 技能clean up %i ", this.timerId)
            TimeManager.getInst().remove(this.timerId);
        }
        this.timerId = -1;
    }

    //连续获取buff, 刷新效果
    public Refresh(parent: PlayerBase2D, onEndCallback: Function, param: any) {
        this.onEnd = onEndCallback;
        if (this.state == EnumBuffState.Start) {
            this.stopTimer();
            this.startTimer();
        } else {
            //正在执行结束动画, 直接打断, 重新开始
            this.Stop(parent, null);
            this.Start(parent, param, this.onEnd)
        }

    }

    public Stop(parent: PlayerBase2D, param: any) {
        //销毁产生的子飞机
        for (let index = 0; index < this.spawnedPlane.length; index++) {
            let childPlane = this.spawnedPlane[index];
            this.StopChildPlane(childPlane)
        }
        this.cleanUp(parent, null);

        this.state = EnumBuffState.Complete;
    }

    public End(parent: PlayerBase2D, onEndComplete: Function, param: any) {
        this.state = EnumBuffState.Ending;
        let completedCount = 0;
        let targetCount = this.spawnedPlane.length;
        //销毁产生的子飞机
        for (let index = 0; index < this.spawnedPlane.length; index++) {
            let childPlane = this.spawnedPlane[index];
            this.EndChildPlane(childPlane, () => {
                completedCount++;
                if (completedCount == targetCount) this.cleanUp(parent, onEndComplete)
            })
        }
        if (completedCount == targetCount) this.cleanUp(parent, onEndComplete)
    }

    private cleanUp(parent: PlayerBase2D, onEndComplete: Function, ) {
        //停止发射子弹
        this.stopTimer();
        GamePoolManager.Instance.Destory<AlliancePlane>(CallAllianceBuff.GetPoolID());
        this.state = EnumBuffState.Complete;
        if (onEndComplete) onEndComplete();
    }

    public static GetPoolID(): string {
        return "CallAllianceBuff" + CallAllianceBuff.config.GetID();
    }




    //////////////////////////////////////////////////////
    //逻辑, 统一管理子飞机的发射

    private spawnedPlane: AlliancePlane[]; //产生的飞机
    private resetParam() {
        this.spawnedPlane = [];
    }


    //执行技能
    private StartChildPlane(player: PlayerBase2D, config: BuffConfigConfigData) {
        let plane = GamePoolManager.Instance.Spawn<AlliancePlane>(CallAllianceBuff.GetPoolID());
        //设置子飞机属性
        // plane.Duration = CallAllianceBuff.DURATION;//存活时间
        // plane.AttackDamage = CallAllianceBuff.ATTACK_DAMAGE;
        //开始子飞机执行逻辑  排列在主机左右, 随主机移动, 发射子弹
        plane.start(player);
        //记录产生的飞机
        this.recordChildPlane(plane)
    }

    //子飞机执行正常结束
    private EndChildPlane(childPlane: AlliancePlane, OnCompleted) {
        //添加技能结束的处理, 比如淡出动画, 再回收
        childPlane.end(() => {
            //回收动作完成才删除记录
            this.deleteChildPlaneRecord(childPlane)
            OnCompleted();
        });
    }

    //打断子飞机执行
    private StopChildPlane(childPlane: AlliancePlane) {
        this.deleteChildPlaneRecord(childPlane)
        childPlane.stop();
    }

    //记录产生的子飞机
    private recordChildPlane(childPlane: AlliancePlane) {
        this.spawnedPlane.push(childPlane);
    }

    //删除飞机记录
    private deleteChildPlaneRecord(childPlane: AlliancePlane) {
        this.spawnedPlane.splice(this.spawnedPlane.indexOf(childPlane), 1);//删除记录
    }
}