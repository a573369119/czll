// 角色的基类
class Player {
    protected playerID;
    //model

    constructor(id: number) {
        this.playerID = id;
    }
    public GetPlayerID(): number {
        return this.playerID;
    }


    public InitComponent(): void {

    }

    public AddComponent(): void {

    }

    public RemoveAllComponent(): void {
    }



    public SetPlayerActive(active: boolean) {
    }


    public DestroyPlayer() {
        //解决退出场景后, 恢复玩家的parent节点上的y位置
        this.SetPlayerActive(true)
        //销毁组件
        this.RemoveAllComponent();

        //销毁拖尾

        //销毁头像

        //销毁模型
    }
}