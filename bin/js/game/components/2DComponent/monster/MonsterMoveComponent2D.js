var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*
* name;
*/
var MonsterMoveComponent2D = (function (_super) {
    __extends(MonsterMoveComponent2D, _super);
    function MonsterMoveComponent2D() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(MonsterMoveComponent2D, "SpeedScale", {
        get: function () { return this.speedScale; },
        set: function (value) { this.speedScale = Math.max(0, value); },
        enumerable: true,
        configurable: true
    });
    //怪物如果移动的时候不转向,那么使用这个参数
    // public moveComponentHelp2D: MoveComponentHelp2D; //
    MonsterMoveComponent2D.prototype.onAdd = function () {
        // MonsterMoveComponent2D.speedScale = 1;
        // this.moveComponentHelp2D = new MoveComponentHelp2D();
        // this.moveComponentHelp2D.speed = ConfigManager.GetInstance().GetMonsterConfig(this.player.playerID).MoveSpeed;
    };
    /**
     * 暂停移动
     * @param pause true:暂停
     */
    MonsterMoveComponent2D.prototype.monsterPause = function (pause) {
        this.Pause(pause);
    };
    MonsterMoveComponent2D.prototype.monsterStop = function () {
        this.StopMovement();
    };
    MonsterMoveComponent2D.prototype.monsterRandomMove = function (delay) {
        if (delay === void 0) { delay = 0; }
        //开始移动
        this.StartMovement(delay);
    };
    MonsterMoveComponent2D.prototype.BeforeStartMovement = function () {
        _super.prototype.BeforeStartMovement.call(this);
        //设置速度
        var config = ConfigManager.GetInstance().GetMonsterConfig(this.player.playerID);
        this.speedX = config.MoveSpeed;
        this.speedY = config.MoveSpeed;
    };
    MonsterMoveComponent2D.prototype.Move = function (xOffset, yOffset) {
        this.player.movePlayer(-xOffset * MonsterMoveComponent2D.SpeedScale, -yOffset * MonsterMoveComponent2D.SpeedScale);
    };
    return MonsterMoveComponent2D;
}(RandomMovementComponent));
MonsterMoveComponent2D.speedScale = 1; //移动速度缩放,统一减弱速度使用
//# sourceMappingURL=MonsterMoveComponent2D.js.map