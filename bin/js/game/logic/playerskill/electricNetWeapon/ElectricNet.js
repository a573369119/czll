var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*
* 隔离电网发射的电网
*/
var ElectricNet = (function (_super) {
    __extends(ElectricNet, _super);
    function ElectricNet() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isIt = false;
        _this.timerId = -1;
        _this.attackMonsterTimeCounter = 0; //攻击怪物计时
        _this.checkCollisionCounter = 0; //计算碰撞计时
        _this.COLLISION_CHECK_INTERVAL = 0.1; //碰撞检测间隔
        return _this;
    }
    ElectricNet.prototype.initComponent = function () {
        this.isIt = true;
        this.bulletMoveCom = new ElectricNetMoveComponent2D();
        this.viewComp = new ElectricNetViewComponent2D(EnumSpineConfigID.ElectricNet);
        this.fxComp = new EffectComponent2D();
        this.addComponent(this.viewComp);
        this.addComponent(this.bulletMoveCom);
        this.addComponent(this.fxComp);
        this.viewComp.SetActive(false); //初始化不显示
    };
    //重写子类的
    ElectricNet.prototype.bulletOnSpawn = function () {
        // this.start();
        this.viewComp.SetActive(true);
    };
    ElectricNet.prototype.bulletOnRecycle = function () {
        this.viewComp.SetActive(false);
        this.stop();
    };
    ElectricNet.prototype.OnDestory = function () {
        _super.prototype.OnDestory.call(this);
    };
    //获取碰撞区域大小
    ElectricNet.prototype.GetCollisionShapeInfo = function () {
        var pos = this.PlayerPos;
        return new BoxCollisonInfo(new Vec2(pos.x, pos.y), this.netSize, this.viewComp.View.rotation);
    };
    Object.defineProperty(ElectricNet.prototype, "NetLen", {
        set: function (value) { this.netSize = new Vec2(value, this.ViewSize.y); } //new Vec2(1080, 200); }//
        ,
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ElectricNet.prototype, "Duration", {
        get: function () { return this.netDuration; },
        set: function (value) { this.netDuration = value; } //10; }//
        ,
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ElectricNet.prototype, "AttackInterval", {
        get: function () { return this.attackInterval; },
        set: function (value) { this.attackInterval = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ElectricNet.prototype, "AttackDamage", {
        get: function () { return this.attackDamage; },
        set: function (value) { this.attackDamage = value; } //20; }//
        ,
        enumerable: true,
        configurable: true
    });
    //电网发射
    ElectricNet.prototype.start = function () {
        if (this.showShapCom == null) {
            this.showShapCom = new Show2DShapeComponent();
            this.addComponent(this.showShapCom);
        }
        this.showShapCom.ShowShape();
        this.hitedMonsterIds = [];
        this.timeCount = 0;
        this.checkCollisionCounter = 0;
        this.attackMonsterTimeCounter = 0;
        //1.电网, 持续5s
        this.timerId = TimeManager.getInst().addUpdater(cbhandler.gen_handler(this.update, this));
        // TimeManager.getInst().once(ElectricNetWeapon.NET_DURATION, cbhandler.gen_handler(this.end, this));
        //移动速度固定100, 移动到屏幕最上方, 直到消失, 
        this.bulletMoveCom.Reset(); //重置
        this.bulletMoveCom.bulletMove();
        //设置spine的大小
        var config = ConfigManager.GetInstance().GetSpineConfig(EnumSpineConfigID.ElectricNet);
        this.viewComp.setViewScale(this.netSize.x / config.SpineSize[0], 1); // this.netSize.y / config.SpineSize[1])
        //
        AudioManager.GetInstance().PlaySoundByConfigID(EnumSoundID.sound_fight_netting);
    };
    //技能时间到终止
    ElectricNet.prototype.end = function () {
        //添加技能结束的处理, 比如淡出动画, 再回收
        ///回收
        GamePoolManager.Instance.Recycle(this, ElectricNetWeapon.GetPoolID());
        // this.stop();
    };
    //由Recycle调用 玩家死亡/游戏结束, 立刻结束电网
    ElectricNet.prototype.stop = function () {
        if (this.timerId >= 0)
            TimeManager.getInst().remove(this.timerId);
        this.timerId = -1;
        //恢复怪物自由
        this.UnFreezAll();
        //停止移动
        this.bulletMoveCom.bulletStopMove();
        //隐藏
        this.comParent.visible = false;
        AudioManager.GetInstance().StopSoundByConfigID(EnumSoundID.sound_fight_netting);
    };
    ElectricNet.prototype.update = function (dt) {
        if (this.timeCount >= this.netDuration) {
            this.end(); //技能完成
        }
        else {
            //同一个怪物, 伤害间隔ns, 持续往上推.
            //技能消失后,怪物随机移动. 
            this.checkCollisionDuringMovement(dt); //检测碰撞
            this.attackMonstersInNet(dt); //攻击
        }
        this.timeCount += dt;
    };
    //检测怪物碰撞
    ElectricNet.prototype.checkCollisionDuringMovement = function (dt) {
        this.checkCollisionCounter += dt;
        if (this.checkCollisionCounter > this.COLLISION_CHECK_INTERVAL) {
            this.checkCollisionCounter = 0;
            var collidedMonster = CollisionDetector.Instance.CheckMonsterCollisionByShape(this.GetCollisionShapeInfo());
            for (var index = 0; index < collidedMonster.length; index++) {
                var monster = collidedMonster[index];
                if (this.hitedMonsterIds.indexOf(monster.UID) < 0) {
                    this.hitedMonsterIds.push(monster.UID);
                    Log.Debug("电网网住怪物%i, uid:%i", monster.playerID, monster.UID);
                    this.FreezeMonstersAndAttach(monster);
                }
            }
        }
    };
    //定时攻击网中的怪物
    ElectricNet.prototype.attackMonstersInNet = function (dt) {
        this.attackMonsterTimeCounter += dt;
        if (this.attackMonsterTimeCounter > this.AttackInterval) {
            this.attackMonsterTimeCounter = 0;
            //定时攻击
            for (var index = 0; index < this.hitedMonsterIds.length; index++) {
                var monsterUid = this.hitedMonsterIds[index];
                var monster = PlayerManager.GetInstance().GetMonsterByUid(monsterUid);
                if (monster) {
                    // Log.Debug("电网攻击怪物%i, uid:%i, 伤害:%i", monster.playerID, monsterUid, this.attackDamage)
                    if (monster.GetHit(this.attackDamage)) {
                        this.hitedMonsterIds.splice(this.hitedMonsterIds.indexOf(monsterUid), 1); //死亡
                    }
                }
            }
        }
    };
    //电网位移朝左上改变
    ElectricNet.prototype.OnNetMoveTopLeft = function (xOffset, yOffset) {
        for (var index = 0; index < this.hitedMonsterIds.length; index++) {
            var monsterUid = this.hitedMonsterIds[index];
            var monster = PlayerManager.GetInstance().GetMonsterByUid(monsterUid);
            if (monster)
                monster.movePlayer(xOffset, yOffset);
        }
    };
    //电网移动到最上方
    ElectricNet.prototype.OnNetReachEnd = function () {
        this.bulletMoveCom.bulletStopMove();
    };
    //麻痹/取消麻痹怪物 并和网一起移动
    ElectricNet.prototype.FreezeMonstersAndAttach = function (monster) {
        monster.Freeze(true);
    };
    //取消麻痹
    ElectricNet.prototype.UnFreezAll = function () {
        for (var index = 0; index < this.hitedMonsterIds.length; index++) {
            var monsterUid = this.hitedMonsterIds[index];
            var monster = PlayerManager.GetInstance().GetMonsterByUid(monsterUid);
            if (monster)
                monster.Freeze(false);
        }
    };
    return ElectricNet;
}(Bullet));
//# sourceMappingURL=ElectricNet.js.map