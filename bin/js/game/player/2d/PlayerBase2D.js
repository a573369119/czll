var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*
* name;
*/
var PlayerBase2D = (function (_super) {
    __extends(PlayerBase2D, _super);
    function PlayerBase2D(id) {
        var _this = _super.call(this) || this;
        _this.playerOrderZ = 0; //层级 默认为0 主角的应该比这个高
        //组件结合用于全部删除
        _this.compList = Array();
        //获取碰撞区域大小
        _this.tempBoxCollisionInfo = null;
        _this.beforeCreate();
        _this.playerID = id;
        _this.compList = new Array();
        _this.initComParnet();
        return _this;
    }
    Object.defineProperty(PlayerBase2D.prototype, "Show2DShapeCom", {
        get: function () { return this.showShapCom; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlayerBase2D.prototype, "ViewSize", {
        get: function () { return this.viewComp.ViewSize; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlayerBase2D.prototype, "State", {
        get: function () { return this.state; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlayerBase2D.prototype, "UID", {
        get: function () { return this.uId; },
        enumerable: true,
        configurable: true
    });
    //创建之前做差异化
    PlayerBase2D.prototype.beforeCreate = function () {
    };
    PlayerBase2D.prototype.initComponent = function () {
        this.showShapCom = new Show2DShapeComponent();
        this.addComponent(this.showShapCom);
    };
    PlayerBase2D.prototype.initComParnet = function () {
        this.comParent = new Laya.Sprite();
        this.AddToStage();
    };
    PlayerBase2D.prototype.addComponent = function (comp) {
        comp.player = this;
        comp.onAdd();
        this.compList.push(comp);
    };
    PlayerBase2D.prototype.removeAllComponent = function () {
        if (!this.compList) {
            console.error("想要销毁的 对象不存在！");
            return;
        }
        var count = this.compList.length;
        for (var index = 0; index < count; index++) {
            this.compList[index].onReomove();
            this.compList[index] = null;
        }
        this.compList = null;
    };
    //*************************************  对外接口 */
    PlayerBase2D.prototype.AddToStage = function () {
        // CommonUtil2D.ChangeToGrandParent(this.comParent, StageManager.GetInstance().playerParent)
        // let localPos = CommonUtil2D.GetGlobalPosition(this.comParent);  //
        var localPos = CommonUtil2D.GetPosUnderTargetObj(this.comParent, StageManager.GetInstance().playerParent);
        StageManager.GetInstance().playerParent.addChild(this.comParent);
        this.comParent.pos(localPos.x, localPos.y);
        this.comParent.zOrder = this.playerOrderZ;
    };
    PlayerBase2D.prototype.RemoveFromStage = function () {
        this.comParent.removeSelf();
    };
    PlayerBase2D.prototype.isInStage = function () {
        var gobalPos = CommonUtil2D.GetGlobalPosition(this.comParent);
        return this.isPosInStage(gobalPos.x, gobalPos.y);
    };
    /**
     * 判断是否在屏幕内
     * @param posX
     * @param posY
     * @param halfIn true: 半个机身在屏幕内, false, 可以全部在外面
     */
    PlayerBase2D.prototype.isPosInStage = function (posX, posY, halfIn) {
        if (halfIn === void 0) { halfIn = false; }
        var viewWidthHalf = (halfIn ? 0 : 1) * this.viewWidthHalf;
        var viewHeightHalf = (halfIn ? 0 : 1) * this.viewHeightHalf;
        var flag = true;
        if (posX < 0 - viewWidthHalf ||
            posX > Laya.stage.width + viewWidthHalf ||
            posY < 0 - viewHeightHalf ||
            posY > Laya.stage.height + viewHeightHalf) {
            flag = false;
        }
        return flag;
    };
    PlayerBase2D.prototype.GetCollisionShapeInfo = function (attacking) {
        if (attacking === void 0) { attacking = false; }
        var pos = CommonUtil2D.GetPosUnderTargetObj(this.comParent, StageManager.GetInstance().playerParent);
        if (this.tempBoxCollisionInfo == null)
            this.tempBoxCollisionInfo = new BoxCollisonInfo(null, null);
        this.tempBoxCollisionInfo.center = new Vec2(pos.x, pos.y);
        this.tempBoxCollisionInfo.size = new Vec2(this.viewWidth, this.viewHeight);
        return new BoxCollisonInfo(new Vec2(pos.x, pos.y), new Vec2(this.viewWidth, this.viewHeight));
    };
    //出现在舞台
    PlayerBase2D.prototype.GoLive = function () {
        this.state = EnumPlayerState.Live;
        this.setPlayerActive(true);
    };
    //死亡
    PlayerBase2D.prototype.Die = function () {
        this.state = EnumPlayerState.Die;
        this.setPlayerActive(false);
    };
    PlayerBase2D.prototype.IsAlive = function () {
        return this.state == EnumPlayerState.Live;
    };
    //彻底消息
    PlayerBase2D.prototype.DestroyPlayer = function () {
        //解决退出场景后, 恢复玩家的parent节点上的y位置
        this.setPlayerActive(true);
        //销毁组件
        this.removeAllComponent();
        //销毁父节点
        this.RemoveFromStage();
        this.comParent.destroy(true);
        this.tempBoxCollisionInfo = null;
    };
    PlayerBase2D.prototype.setPlayerPos = function (posX, posY) {
        this.comParent.x = posX;
        this.comParent.y = posY;
    };
    Object.defineProperty(PlayerBase2D.prototype, "PlayerPos", {
        get: function () { return new Vec2(this.comParent.x, this.comParent.y); },
        enumerable: true,
        configurable: true
    });
    PlayerBase2D.prototype.movePlayer = function (offsetX, offsetY) {
        this.comParent.x -= offsetX;
        this.comParent.y -= offsetY;
    };
    PlayerBase2D.prototype.setPlayerActive = function (active) {
        this.comParent.visible = active;
    };
    //添加子节点
    PlayerBase2D.prototype.AddChild = function (child) {
        var localPos = CommonUtil2D.GetPosUnderTargetObj(child, this.comParent);
        this.comParent.addChild(child);
        child.pos(localPos.x, localPos.y);
    };
    return PlayerBase2D;
}(Mediator));
//# sourceMappingURL=PlayerBase2D.js.map