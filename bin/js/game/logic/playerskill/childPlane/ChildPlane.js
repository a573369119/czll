var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*
* 子舰: 外形和属性可设置
*/
var ChildPlane = (function (_super) {
    __extends(ChildPlane, _super);
    function ChildPlane() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.curTweenId = -1; //动画id
        return _this;
    }
    ChildPlane.prototype.beforeCreate = function () {
        // this.playerOrderZ = ZOrderDefine.MAINPLAYER;
    };
    ChildPlane.prototype.initComponent = function () {
        _super.prototype.initComponent.call(this);
        //出生点
        var config = ConfigManager.GetInstance().GetMainPlayerConfig();
        this.comParent.x = config.BirthPoint[0];
        this.comParent.y = config.BirthPoint[1];
        //视图组件
        var url = ConfigManager.GetInstance().GetWeaponConfig(ConstDefine.CHILD_PLANE_CONFIG_ID).weaponSkin;
        this.viewComp = new ImageViewComponent(url);
        this.addComponent(this.viewComp);
        //子弹控制
        this.bulletComp = new BulletComponent2D(EnumBulletOutLookType.ChildPlaneBullet);
        this.addComponent(this.bulletComp);
        this.comParent.name = "ChildPlane" + CommonUtil.GetUID();
    };
    ChildPlane.prototype.InitPool = function (pool, param) {
        this.initComponent();
        this.viewComp.SetActive(false); //初始化不显示
    };
    ChildPlane.prototype.OnSpawn = function () {
        this.viewComp.SetActive(true);
        this.bulletComp.OnEnterMatch(GameDataManager.getInstance().LoginPlayerInfo.MainWeaponInfo.level);
        this.mediatorName = this.comParent.name;
        Facade.instance.registerMediator(this);
    };
    ChildPlane.prototype.OnRecycle = function () {
        this.viewComp.SetActive(false);
        this.bulletComp.OnExitMatch();
        Facade.instance.removeMediator(this.mediatorName);
    };
    ChildPlane.prototype.OnDestory = function () {
        this.DestroyPlayer();
    };
    ///////////////////////////////////////////////////////////////////////////////////
    //Mediator 
    ChildPlane.prototype.listNotificationInterests = function () {
        _super.prototype.listNotificationInterests.call(this);
        return [
            NotificationNames.SLOT_FORCE_OCCUPIED,
            NotificationNames.SLOT_INTERVAL_CHANGED,
        ];
    };
    ChildPlane.prototype.handleNotification = function (notification) {
        _super.prototype.handleNotification.call(this, notification);
        switch (notification.getName()) {
            case NotificationNames.SLOT_FORCE_OCCUPIED:
                {
                    var slotIndex = notification.getBody();
                    if (this.slotIndex == slotIndex) {
                        //自己的槽位被抢走, 需要重新找位置
                        var slotIndex_1 = PlayerManager.GetInstance().MainPlayer.SlotComp.getEmpetySlot();
                        this.PlayMoveSlotAnim(slotIndex_1);
                    }
                    break;
                }
            case NotificationNames.SLOT_INTERVAL_CHANGED:
                {
                    this.PlayMoveSlotAnim(this.slotIndex);
                    break;
                }
        }
    };
    Object.defineProperty(ChildPlane.prototype, "Duration", {
        get: function () { return this.duration; },
        set: function (value) { this.duration = value; } //10; }//
        ,
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChildPlane.prototype, "AttackDamage", {
        get: function () { return this.attackDamage; },
        set: function (value) { this.attackDamage = value; } //20; }//
        ,
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChildPlane.prototype, "SlotIndex", {
        get: function () { return this.slotIndex; },
        enumerable: true,
        configurable: true
    });
    ChildPlane.prototype.IsTimeUp = function () { return this.curLiveTimePassed >= this.duration; }; //是否存活超时
    ChildPlane.prototype.start = function (slotIndex, parent) {
        var _this = this;
        this.curLiveTimePassed = 0;
        this.curTweenId = -1;
        AudioManager.GetInstance().PlaySoundByConfigID(EnumSoundID.sound_fight_warship);
        //播放动画, 之后开始飞机发射子弹
        this.playEnterAnim(slotIndex, parent, function () {
            _this.EnableShoot(true);
        });
    };
    //玩家死亡/游戏结束, 立刻结束
    ChildPlane.prototype.stop = function () {
        this.EnableShoot(false);
        this.stopAnim();
        //回收子飞机
        GamePoolManager.Instance.Recycle(this, ChildPlaneWeapon.GetPoolID());
    };
    //技能时间到终止
    ChildPlane.prototype.end = function () {
        var _this = this;
        this.EnableShoot(false);
        //播放退出动画, 之后执行stop
        this.playExitAnim(function () {
            _this.curTweenId = -1;
            _this.stop();
        });
    };
    //技能开始前播放动画, 移动到目标位置
    ChildPlane.prototype.playEnterAnim = function (slotIndex, parent, onEnd) {
        //添加到父节点, 放在父节点位置
        parent.comParent.addChild(this.comParent);
        this.setPlayerPos(0, 0);
        //移动
        this.PlayMoveSlotAnim(slotIndex, onEnd);
    };
    //切换位置动画
    ChildPlane.prototype.PlayMoveSlotAnim = function (slotIndex, onEnd) {
        if (this.curTweenId >= 0)
            this.stopAnim();
        var targetPos = this.getPosBySlot(slotIndex);
        this.curTweenId = Tween2DUtil.getInst().to({
            node: this.comParent,
            duration: 1,
            delay: 0,
            x: targetPos.x,
            y: targetPos.y,
            // rotation: 20,
            tweenFunc: TweenFunc.Sine.easeInOut,
            onComplete: onEnd ? cbhandler.gen_handler(function () { onEnd(); }, this) : null,
        });
    };
    //技能时间到, 播放退出动画.
    ChildPlane.prototype.playExitAnim = function (onEnd) {
        if (this.curTweenId >= 0)
            this.stopAnim();
        // this.AddToStage();//切换到玩家节点下
        CommonUtil2D.ChangeToGrandParent(this.comParent, this.comParent.parent.parent);
        this.curTweenId = Tween2DUtil.getInst().to({
            node: this.comParent,
            duration: 1,
            delay: 0,
            y: -10,
            tweenFunc: TweenFunc.Sine.easeInOut,
            onComplete: cbhandler.gen_handler(function () { onEnd(); }, this)
        });
    };
    //停止当前动画
    ChildPlane.prototype.stopAnim = function () {
        if (this.curTweenId >= 0)
            Tween2DUtil.getInst().kill(this.curTweenId);
        this.curTweenId = -1;
    };
    ChildPlane.prototype.Update = function (dt) {
        this.curLiveTimePassed += dt;
    };
    ChildPlane.prototype.EnableShoot = function (active) {
        //发射子弹
        this.bulletComp.EnableFire = active;
    };
    /////////////////////////////////////////////////////////////////
    //util
    //获取子飞机目标位置, 在player节点下的位置
    ChildPlane.prototype.getPosBySlot = function (slotIndex) {
        this.slotIndex = slotIndex;
        // let childSize = this.GetSize();
        // let parentPos = new Vec2(0, 0);// player.PlayerPos;
        // let interval = 10;//子飞机之间间隔
        // let left = slotIndex % 2 == 0;
        // let index = Math.floor(slotIndex / 2) + 1; //1, 2...
        // let childPosX = parentPos.x + (left ? -1 : 1) * ((player.ViewSize.x - childSize.x) * 0.5 + index * (childSize.x + interval));
        // let childPosY = 0;/// parentPos.y + (left ? -1 : 1) * (player.ViewSize.y + index * (childSize.y)) * 0.5;
        // return new Vec2(childPosX, childPosY);
        return PlayerManager.GetInstance().MainPlayer.SlotComp.getChildPlaneRelativePosBySlotIndex(slotIndex, this.GetSize());
    };
    ChildPlane.prototype.GetSize = function () {
        return this.viewComp.ViewSize;
    };
    return ChildPlane;
}(Plane));
//# sourceMappingURL=ChildPlane.js.map