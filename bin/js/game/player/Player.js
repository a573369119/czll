// 角色的基类
var Player = (function () {
    //model
    function Player(id) {
        this.playerID = id;
    }
    Player.prototype.GetPlayerID = function () {
        return this.playerID;
    };
    Player.prototype.InitComponent = function () {
    };
    Player.prototype.AddComponent = function () {
    };
    Player.prototype.RemoveAllComponent = function () {
    };
    Player.prototype.SetPlayerActive = function (active) {
    };
    Player.prototype.DestroyPlayer = function () {
        //解决退出场景后, 恢复玩家的parent节点上的y位置
        this.SetPlayerActive(true);
        //销毁组件
        this.RemoveAllComponent();
        //销毁拖尾
        //销毁头像
        //销毁模型
    };
    return Player;
}());
//# sourceMappingURL=Player.js.map