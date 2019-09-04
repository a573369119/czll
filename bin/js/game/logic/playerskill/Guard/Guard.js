var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*
* name;
*/
var Guard = (function (_super) {
    __extends(Guard, _super);
    function Guard() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.sectorAngle = 90; //扇形角度
        _this.timerId = -1;
        _this.checkCollisionCounter = 0; //计算碰撞计时
        _this.COLLISION_CHECK_INTERVAL = 0.1; //碰撞检测间隔
        return _this;
    }
    // public bulletMoveCom: BulletMoveComponent2D;
    Guard.prototype.initComponent = function () {
        _super.prototype.initComponent.call(this);
        // this.bulletMoveCom = new BulletMoveComponent2D()
        this.viewComp = new ElectricNetViewComponent2D(EnumSpineConfigID.Guard);
        this.addComponent(this.viewComp);
        // this.addComponent(this.bulletMoveCom);
        this.comParent.name = "Guard";
        this.viewComp.SetActive(false); //初始化不显示
    };
    Guard.prototype.OnSkillObjSpawn = function () {
        this.viewComp.SetActive(true);
    };
    Guard.prototype.OnSkillObjRecycle = function () {
        this.viewComp.SetActive(false);
        this.stop();
    };
    Guard.prototype.OnSkillObjDestroy = function () {
    };
    //获取碰撞区域大小
    Guard.prototype.GetCollisionShapeInfo = function () {
        //角色大小
        var size = ConfigManager.GetInstance().GetWeaponConfig(GameDataManager.getInstance().LoginPlayerInfo.CurSideWeaponID).ColliderSize;
        //守卫的位置
        var center = CommonUtil2D.GetPosUnderTargetObj(this.comParent, StageManager.GetInstance().playerParent);
        center.y -= size[1] * 0.5; //中心位置在角色顶部中心
        var radius = this.guardSize.x * 0.5; //半径
        return new SectorCollisonInfo(new Vec2(center.x, center.y), radius, this.sectorAngle, this.viewComp.View.rotation);
    };
    Object.defineProperty(Guard.prototype, "Size", {
        get: function () { return this.guardSize; },
        set: function (value) { this.guardSize = value; } //new Vec2(100, 200); }//
        ,
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Guard.prototype, "Duration", {
        get: function () { return this.duration; },
        set: function (value) { this.duration = value; } //10; }//
        ,
        enumerable: true,
        configurable: true
    });
    //发射
    Guard.prototype.start = function (parent) {
        this.OnStart();
        this.hitedMonsterIds = [];
        this.timeCount = 0;
        this.checkCollisionCounter = 0;
        //添加到父节点, 放在父节点位置
        this.parent = parent.comParent;
        this.parent.addChild(this.comParent);
        this.setPlayerPos(0, 0);
        //1.电网, 持续5s
        this.timerId = TimeManager.getInst().addUpdater(cbhandler.gen_handler(this.update, this));
        //设置spine的大小
        var config = ConfigManager.GetInstance().GetSpineConfig(EnumSpineConfigID.Guard);
        this.viewComp.setViewScale(this.guardSize.x / config.SpineSize[0], 1); // this.netSize.y / config.SpineSize[1])
    };
    //技能时间到终止
    Guard.prototype.end = function () {
        //添加技能结束的处理, 比如淡出动画, 再回收
        ///回收
        GamePoolManager.Instance.Recycle(this, GuardWeapon.GetPoolID());
        // this.stop();
    };
    //由Recycle调用 玩家死亡/游戏结束, 立刻结束电网
    Guard.prototype.stop = function () {
        if (this.timerId >= 0)
            TimeManager.getInst().remove(this.timerId);
        this.timerId = -1;
        // this.comParent.removeSelf(); Recycle回调, 已经删除自己
        // CommonUtil2D.ChangeToGrandParent(this.comParent, this.parent.parent as Laya.Sprite)
    };
    Guard.prototype.update = function (dt) {
        if (this.timeCount >= this.duration) {
            this.end(); //技能完成
        }
        else {
            this.checkCollisionDuringMovement(dt); //检测碰撞
        }
        this.timeCount += dt;
    };
    //检测怪物碰撞
    Guard.prototype.checkCollisionDuringMovement = function (dt) {
        this.checkCollisionCounter += dt; //检测碰撞间隔
        if (this.checkCollisionCounter > this.COLLISION_CHECK_INTERVAL) {
            this.checkCollisionCounter = 0;
            //激光在Player层下的位置
            // let pos = CommonUtil2D.GetLoalPostionUnderSameParent(this.comParent, this.parent);
            // let colliderPos = new Vec2(pos.x, pos.y - this.guardSize.y * 0.5)//碰撞盒中心位置. spine的pivot在底部.
            var guardCollisionInfo = this.GetCollisionShapeInfo();
            // guardCollisionInfo.center.y -= guardCollisionInfo.size.y * 0.5;
            // let radius = this.guardSize.x;//+ guardCollisionInfo.size.y * 0.5;//半径
            //1. 检测碰撞
            var collidedMonster = CollisionDetector.Instance.CheckMonsterCollisionSectorByShape(guardCollisionInfo); //(guardCollisionInfo.center, guardCollisionInfo.radius, guardCollisionInfo.sectorAngle);
            //2. 处理碰撞 记录最新的击中怪物信息
            for (var index = 0; index < collidedMonster.length; index++) {
                var monster = collidedMonster[index];
                monster.GetHit(monster.attributeComp.CurHP);
                this.end(); //技能结束
                Log.Debug("钢铁守卫击中怪物id:%i, uid:%i", monster.playerID, monster.UID);
                return;
            }
            //检测子弹碰撞
            var collidedBullets = CollisionDetector.Instance.CheckMonsterCollisionSectorByShape(guardCollisionInfo, true); //(guardCollisionInfo.center, guardCollisionInfo.radius, guardCollisionInfo.sectorAngle, true);
            for (var index = 0; index < collidedBullets.length; index++) {
                var bullet = collidedBullets[index];
                this.end(); //技能结束
                BulletManager.GetInstance().Recycle(bullet);
                Log.Debug("钢铁守卫击中子弹, uid:%i", bullet.UID);
                return;
            }
        }
    };
    return Guard;
}(SkillSpawnObject));
//# sourceMappingURL=Guard.js.map