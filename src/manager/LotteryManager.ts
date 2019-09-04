/**
 * 格子转盘状态
 */
enum EnumLotteryGirdLoopState {
    None,               //默认空状态
    SpeedUp,            //加速
    SpeedMax,           //匀速
    WaittingSpeedDown,  //等待减速状态
    SpeedDown,          //减速
    StopDown,           //停止状态（拖尾消失的状态）
    Stop,               //完全停止
}

/*
* 转盘管理
*/
class LotteryManager {
    private static _instance: LotteryManager;
    public static get Instance(): LotteryManager {
        if (this._instance == null) {
            this._instance = new LotteryManager();
        }
        return this._instance;
    }
    constructor() {
        this.girdLotteryLoopTask = -1;
    }

    /*************************格子型转盘*************************/

    /**
     * 循环方法的时间间隔
     */
    private get loopInterval(): number {
        return 0.02;
    }
    /**
     * 由最低速加到最高速所需要的格子数（同样也是最高速减到最低速的格子数）
     */
    private get girdNum_SpeedChange(): number {
        return 6;
    }
    /**
     * 以最快速度持续的圈数
     */
    private get LoopNum_MaxSpeed() {
        return 6;
    }
    /**
     * 最快更新的时间间隔
     */
    private get SecondPerGird_Max(): number {
        return 0.02;
    }
    /**
     * 最慢更新的时间间隔
     */
    private get SecondPerGird_Min(): number {
        return 0.5;
    }

    //尺寸
    private get girdScale_Big(): number {
        return 1.3;
    }
    private get girdScale_Middle(): number {
        return 1.2;
    }
    private get girdScale_Small(): number {
        return 1.1;
    }
    private get girdScale_Normal(): number {
        return 1.0;
    }
    //用于动画处理和计算的字段
    private girdNum_Changing: number;               //速度变化中的格子数

    private lastGirdChangeTime: number;             //上一次格子切换的时间

    private girdList: Array<Laya.Box>;              //格子列表，可循环的
    private girdState: EnumLotteryGirdLoopState;    //格子转盘状态

    private curSelectGirdIndex: number;             //当前选中的格子序号
    private aimGirdIndex: number;                   //最终要停止的格子序号
    private speedDownGirdIndex: number;             //正确进入减速状态的格子序号

    private girdStopHandler: cbhandler;             //完成回调

    private girdLotteryLoopTask: number;            //格子循环时间任务
    /*************************圆盘型转盘*************************/

    /**
     * 初始化转盘的格子列表，需要在start方法之前调用
     */
    public InitLottery_Gird(girdList: Array<Laya.Box>, defaultSelectIndex: number = 0) {
        //初始化列表
        this.girdList = girdList;
        //设置状态
        this.curSelectGirdIndex = defaultSelectIndex;
        this.RenderSelectGird_Single(this.curSelectGirdIndex);
        this.aimGirdIndex = -1;
        this.speedDownGirdIndex = -1;
        this.girdNum_Changing = 0;
        this.SetLotteryState(EnumLotteryGirdLoopState.None);
        //挂载循环事件
        if (this.girdLotteryLoopTask != -1) {
            TimeManager.getInst().remove(this.girdLotteryLoopTask);
            this.girdLotteryLoopTask = -1;
        }
        this.girdLotteryLoopTask = TimeManager.getInst().loop(this.loopInterval, cbhandler.gen_handler(this.LotteryLoop_Gird, this));
    }

    /**
     * 关闭转盘时清空
     */
    public CloseLottery_Gird() {
        if (!this.girdList) {
            Log.Debug("LotteryManager 当前没有格子，请初始化后再调用！");
            return;
        }
        if (this.girdLotteryLoopTask != -1) {
            TimeManager.getInst().remove(this.girdLotteryLoopTask);
            this.girdLotteryLoopTask = -1;
        }
        this.girdList = null;
    }

    /**
     * 在运行过程中切换到加速状态时调用
     */
    public LotterySpeedUp_Gird() {
        if (!this.girdList) {
            Log.Debug("LotteryManager 当前没有格子，请初始化后再调用！");
            return;
        }
        //清空目标点与减速点
        this.aimGirdIndex = -1;
        this.speedDownGirdIndex = -1;
        //设置时间戳
        this.lastGirdChangeTime = Date.now();
        if (this.girdState == EnumLotteryGirdLoopState.None) {
            //由完全静止启动
            this.girdNum_Changing = 0;
            //更改状态
            this.SetLotteryState(EnumLotteryGirdLoopState.SpeedUp);
            //前进1格
            this.Lottery_SelectNextGird();
        } else {
            //中途启动
            this.girdNum_Changing = this.girdNum_SpeedChange;
            this.SetLotteryState(EnumLotteryGirdLoopState.SpeedMax);
        }
        //检查task
        if (this.girdLotteryLoopTask == -1) {
            this.girdLotteryLoopTask = TimeManager.getInst().loop(this.loopInterval, cbhandler.gen_handler(this.LotteryLoop_Gird, this));
        }
    }

    /**
     * 在运行过程中设置最终停止的目标点
     * @param aimIndex 目标index
     */
    public LotterySpeedDown_Gird(aimIndex: number, stopCB: cbhandler) {
        if (!this.girdList) {
            Log.Debug("LotteryManager 当前没有格子，请初始化后再调用！");
            return;
        }
        this.girdStopHandler = stopCB;
        this.aimGirdIndex = aimIndex;
        //计算停止点的index
        this.speedDownGirdIndex = this.CalcSpeedDownIndex();
        if (this.speedDownGirdIndex != -1) {
            //更改状态，等待减速
            this.SetLotteryState(EnumLotteryGirdLoopState.WaittingSpeedDown);
        } else {
            Log.Debug("Lottery 减速点计算错误，强制停止转盘！");
            this.SetLotteryState(EnumLotteryGirdLoopState.None);
        }
    }

    /**
     * 没有结果，直接停止
     */
    public LotteryStop_Gird() {
        if (!this.girdList) {
            Log.Debug("LotteryManager 当前没有格子，请初始化后再调用！");
            return;
        }
        this.SetLotteryState(EnumLotteryGirdLoopState.None);
    }

    /**
     * 设置状态
     * @param state 状态
     */
    private SetLotteryState(state: EnumLotteryGirdLoopState) {
        this.girdState = state;
    }

    /**
     * 每loopInterval调用一次的循环方法，根据当前状态与时间进行不同的处理
     */
    private LotteryLoop_Gird() {
        if (!this.girdList) {
            Log.Debug("LotteryManager 当前没有格子，请初始化后再调用！");
            return;
        }
        //查找当前的状态，分别处理
        switch (this.girdState) {
            case EnumLotteryGirdLoopState.None: {
                //等待开始
                break;
            }
            case EnumLotteryGirdLoopState.SpeedUp: {
                this.LotteryLoop_Gird_SpeedUp();
                break;
            }
            case EnumLotteryGirdLoopState.SpeedMax: {
                this.LotteryLoop_Gird_SpeedMax();
                break;
            }
            case EnumLotteryGirdLoopState.WaittingSpeedDown: {
                this.LotteryLoop_Gird_WaittingSpeedDown();
                break;
            }
            case EnumLotteryGirdLoopState.SpeedDown: {
                this.LotteryLoop_Gird_SpeedDown();
                break;
            }
            case EnumLotteryGirdLoopState.StopDown: {
                this.LotteryLoop_Gird_StopDown();
                break;
            }
            case EnumLotteryGirdLoopState.Stop: {
                this.LotteryLoop_Gird_Stop();
                break;
            }
            default: {
                this.LotteryLoop_Gird_None();
                break;
            }

        }
    }
    private LotteryLoop_Gird_None() {
        //空状态，不做处理
    }
    private LotteryLoop_Gird_SpeedUp() {
        //加速阶段
        //检查格子切换
        this.Lottery_CheckGirdChange_SpeedChanging(true);
        //如果加速格子数用完，则进入匀速阶段
        if (this.girdNum_Changing >= this.girdNum_SpeedChange) {
            Log.Debug("Lottery 加速格子数已走完，进入匀速模式");
            this.girdNum_Changing = this.girdNum_SpeedChange;
            this.SetLotteryState(EnumLotteryGirdLoopState.SpeedMax);
        }
    }
    private LotteryLoop_Gird_SpeedMax() {
        //匀速阶段
        //每次调用的时候只需要检查是否需要格子切换即可
        //检查格子切换
        this.Lottery_CheckGirdChange_Max();
    }
    private LotteryLoop_Gird_WaittingSpeedDown() {
        //等待减速阶段
        //检查格子切换
        this.Lottery_CheckGirdChange_Max();
        //每次调用的时候需要判断当前的格子索引和需要减速的格子索引是否相同
        if (this.curSelectGirdIndex == this.speedDownGirdIndex) {
            this.SetLotteryState(EnumLotteryGirdLoopState.SpeedDown);
            Log.Debug("进入减速状态！")
        }
    }
    private LotteryLoop_Gird_SpeedDown() {
        //减速阶段
        //检查格子切换
        this.Lottery_CheckGirdChange_SpeedChanging(false);
        //如果减速格子数用完，则进入停止模式
        if (this.girdNum_Changing <= 0) {
            Log.Debug("Lottery 减速格子数已走完，进入停止模式");
            this.girdNum_Changing = 0;
            this.SetLotteryState(EnumLotteryGirdLoopState.StopDown);
        }
    }
    private LotteryLoop_Gird_StopDown() {
        //停止动画阶段
        //每次调用的时候，需要检查时间，并逐渐减少拖尾的效果，最终达到完全停止
        this.SetLotteryState(EnumLotteryGirdLoopState.Stop);
    }
    private LotteryLoop_Gird_Stop() {
        //完全停止
        Log.Debug("Lottery 完全停止，执行回调");
        if (this.girdStopHandler) {
            this.girdStopHandler.exec();
        }
        //执行清空
        this.aimGirdIndex = -1;
        this.speedDownGirdIndex = -1;
        //执行完成，标记本次转盘结束
        if (this.girdLotteryLoopTask != -1) {
            TimeManager.getInst().remove(this.girdLotteryLoopTask);
            this.girdLotteryLoopTask = -1;
        }
        this.SetLotteryState(EnumLotteryGirdLoopState.None);
    }

    /**
     * 检查以最快速度进行更新
     */
    private Lottery_CheckGirdChange_Max() {
        let now = Date.now();
        let lastChangeDelta = now - this.lastGirdChangeTime
        let changeDelta = this.SecondPerGird_Max;   //默认为最大速度（最短更新间隔）
        if (lastChangeDelta >= this.SecondPerGird_Max * 1000) {
            //更新时间戳
            this.lastGirdChangeTime = now;
            //到了更换的时间，切换到下一个格子
            this.Lottery_SelectNextGird();
        }
    }
    /**
     * 检查以变化速度进行更新
     * @param speedUp 加速？
     */
    private Lottery_CheckGirdChange_SpeedChanging(speedUp: boolean) {
        let now = Date.now();
        let lastChangeDelta = now - this.lastGirdChangeTime
        let changeDelta = (this.SecondPerGird_Min - this.SecondPerGird_Max) /
            (this.girdNum_Changing + 1);
        if (lastChangeDelta >= changeDelta * 1000) {
            //更新时间戳
            this.lastGirdChangeTime = now;
            //到了更换的时间，切换到下一个格子
            this.Lottery_SelectNextGird();
            //变化格子数
            if (speedUp)
                this.girdNum_Changing += 1;
            else
                this.girdNum_Changing -= 1;
        }
    }

    /**
     * 选择下一个格子
     */
    private Lottery_SelectNextGird() {
        AudioManager.GetInstance().PlaySoundByConfigID(EnumSoundID.sound_function_touch_01);
        this.curSelectGirdIndex = this.GetNextGirdIndex(this.curSelectGirdIndex, 1);
        // Log.Debug("Lottery 选择下一个格子: ", this.curSelectGirdIndex);
        //渲染格子
        this.RenderSelectGird_Single(this.curSelectGirdIndex);
    }

    //工具相关
    /**循环查找下一个index */
    private GetNextGirdIndex(curIndex: number, next: number): number {
        if (!this.girdList) {
            Log.Debug("LotteryManager 当前没有格子，请初始化后再调用！");
            return -1;
        } else if (curIndex > this.girdList.length - 1 || curIndex < 0) {
            Log.Debug("LotteryManager 查找Index 越界");
            return -1;
        } else {
            //求和求余
            return (curIndex + next) % this.girdList.length;
        }
    }
    /**循环查找上一个index */
    private GetPrevGirdIndex(curIndex: number, prev: number): number {
        if (!this.girdList) {
            Log.Debug("LotteryManager 当前没有格子，请初始化后再调用！");
            return -1;
        } else if (curIndex > this.girdList.length - 1 || curIndex < 0) {
            Log.Debug("LotteryManager 查找Index 越界");
            return -1;
        } else {
            if (curIndex >= prev) {
                return curIndex - prev;
            } else {
                //求和求余
                let remainder = (prev - curIndex) % this.girdList.length;
                if (remainder == 0) {
                    return remainder;
                } else {
                    return this.girdList.length - remainder;
                }
            }
        }
    }
    /**计算降速点index */
    private CalcSpeedDownIndex(): number {
        if (this.aimGirdIndex == -1) {
            Log.Debug("Lottery 需要目标点才能计算减速点！")
            return -1;
        }
        let aim = this.GetPrevGirdIndex(this.aimGirdIndex, this.girdNum_Changing);
        Log.Debug("Lottery 目标点：", this.aimGirdIndex, "减速路程：", this.girdNum_Changing, "减速点索引：", aim);
        return aim;
    }

    //渲染格子

    //3格
    private RenderSelectGird_Triple(selectIndex: number) {
        for (let i = 0; i < this.girdList.length; i++) {
            let element = this.girdList[i];
            if (i == selectIndex) {
                element.scale(this.girdScale_Big, this.girdScale_Big);
            } else if (i == this.GetPrevGirdIndex(selectIndex, 1)) {
                element.scale(this.girdScale_Middle, this.girdScale_Middle);
            } else if (i == this.GetPrevGirdIndex(selectIndex, 2)) {
                element.scale(this.girdScale_Small, this.girdScale_Small);
            } else {
                element.scale(this.girdScale_Normal, this.girdScale_Normal);
            }
        }
    }
    //2格
    private RenderSelectGird_Double(selectIndex: number) {
        for (let i = 0; i < this.girdList.length; i++) {
            let element = this.girdList[i];
            if (i == selectIndex) {
                element.scale(this.girdScale_Big, this.girdScale_Big);
            } else if (i == this.GetPrevGirdIndex(selectIndex, 1)) {
                element.scale(this.girdScale_Middle, this.girdScale_Small);
            } else {
                element.scale(this.girdScale_Normal, this.girdScale_Normal);
            }
        }
    }
    //1格
    private RenderSelectGird_Single(selectIndex: number) {
        for (let i = 0; i < this.girdList.length; i++) {
            let element = this.girdList[i];
            if (i == selectIndex) {
                element.scale(this.girdScale_Big, this.girdScale_Big);
            } else {
                element.scale(this.girdScale_Normal, this.girdScale_Normal);
            }
        }
    }
    //0格
    private RenderSelectGird_None(selectIndex: number) {
        for (let i = 0; i < this.girdList.length; i++) {
            let element = this.girdList[i];
            element.scale(this.girdScale_Normal, this.girdScale_Normal);
        }
    }

}