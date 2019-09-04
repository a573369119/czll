/*
* name;
*/
enum EnumBuffState {
    Start, //开始
    Ending, //正在执行结束动画
    Complete,//结束
}
interface IBuffLogic {
    /**
     * 技能开始
     * parent:技能所属玩家/怪物对象
     * param: 技能配置参数
     */
    Start(parent: PlayerBase2D, ...param: any[]);

    /**
     * 连续获取buff,刷新
     */
    Refresh(parent: PlayerBase2D, ...param: any[]);
    /**
     * 停止技能, 打断技能
     */
    Stop(parent: PlayerBase2D, param: any);
    /**
     * 技能释放完成
     */
    End(parent: PlayerBase2D, onEndComplete: Function, param: any);
}