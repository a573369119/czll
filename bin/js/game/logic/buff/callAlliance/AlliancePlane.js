var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*
* 呼叫支援
*/
var AlliancePlane = (function (_super) {
    __extends(AlliancePlane, _super);
    function AlliancePlane() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //////////////////////////////////////////////////////////////////////////////////////////////////////
        //逻辑
        _this.curTweenId = -1; //动画id
        _this.slotIndex = -1; //所占用槽位
        return _this;
    }
    Object.defineProperty(AlliancePlane.prototype, "BuffComp", {
        get: function () { return this.buffComp; },
        enumerable: true,
        configurable: true
    });
    AlliancePlane.prototype.beforeCreate = function () {
        // this.playerOrderZ = ZOrderDefine.MAINPLAYER;
    };
    AlliancePlane.prototype.initComponent = function () {
        _super.prototype.initComponent.call(this);
        //出生点
        var config = ConfigManager.GetInstance().GetMainPlayerConfig();
        this.comParent.x = config.BirthPoint[0];
        this.comParent.y = config.BirthPoint[1];
        //视图组件
        var url = ConfigManager.GetInstance().GetWeaponConfig(GameDataManager.getInstance().LoginPlayerInfo.CurSideWeaponID).weaponSkin;
        this.viewComp = new ImageViewComponent(url);
        this.viewComp.changeStyle(this.comParent); //改变样式 -mb
        this.addComponent(this.viewComp);
        //子弹控制
        this.bulletComp = new BulletComponent2D(EnumBulletOutLookType.MainPlayerBullet);
        this.addComponent(this.bulletComp);
        //buff
        this.buffComp = new BuffComponent();
        this.addComponent(this.buffComp);
        this.comParent.name = "AlliancePlane" + CommonUtil.GetUID();
    };
    AlliancePlane.prototype.InitPool = function (pool, param) {
        this.initComponent();
        this.viewComp.SetActive(false); //初始化不显示
    };
    AlliancePlane.prototype.OnSpawn = function () {
        this.viewComp.SetActive(true);
        this.bulletComp.OnEnterMatch(GameDataManager.getInstance().LoginPlayerInfo.MainWeaponInfo.level);
        this.buffComp.Reset();
        this.mediatorName = this.comParent.name;
        Facade.instance.registerMediator(this);
    };
    AlliancePlane.prototype.OnRecycle = function () {
        this.viewComp.SetActive(false);
        this.bulletComp.OnExitMatch();
        this.buffComp.stopAll();
        Facade.instance.removeMediator(this.mediatorName);
    };
    AlliancePlane.prototype.OnDestory = function () {
        this.DestroyPlayer();
    };
    ///////////////////////////////////////////////////////////////////////////////////
    //Mediator 
    AlliancePlane.prototype.listNotificationInterests = function () {
        _super.prototype.listNotificationInterests.call(this);
        return [
            NotificationNames.UI_OnPropBuff,
        ];
    };
    AlliancePlane.prototype.handleNotification = function (notification) {
        _super.prototype.handleNotification.call(this, notification);
        switch (notification.getName()) {
            case NotificationNames.UI_OnPropBuff:
                {
                    var playerbuff = notification.getBody();
                    var buffId = playerbuff.BuffType;
                    if (playerbuff.Active) {
                        this.addBuff(buffId);
                    }
                    else {
                        this.buffComp.stopBuff(buffId);
                    }
                    break;
                }
        }
    };
    AlliancePlane.prototype.copyBuffFromMain = function () {
        var mainPlayer = PlayerManager.GetInstance().MainPlayer;
        var allbuff = mainPlayer.BuffComp.AllBuffs;
        for (var index = 0; index < allbuff.length; index++) {
            var buffId = allbuff[index];
            this.addBuff(buffId);
        }
    };
    AlliancePlane.prototype.addBuff = function (buffId) {
        var config = ConfigManager.GetInstance().GetBuffConfig(buffId);
        if (config.copy)
            this.buffComp.AddBuff(buffId, null);
        //if (buffId != EnumBuffType.CallAlliance) this.buffComp.AddBuff(buffId, null)
    };
    AlliancePlane.prototype.start = function (parent) {
        var _this = this;
        this.curTweenId = -1;
        //播放动画, 之后开始飞机发射子弹
        this.playEnterAnim(parent, function () {
            _this.EnableShoot(true);
            _this.copyBuffFromMain();
        });
    };
    //玩家死亡/游戏结束, 立刻结束
    AlliancePlane.prototype.stop = function () {
        this.EnableShoot(false);
        this.stopAnim();
        this.clearSlot();
        //回收子飞机
        GamePoolManager.Instance.Recycle(this, CallAllianceBuff.GetPoolID());
    };
    //技能时间到终止
    AlliancePlane.prototype.end = function (onEndComplete) {
        var _this = this;
        this.EnableShoot(false);
        this.clearSlot();
        //播放退出动画, 之后执行stop
        this.playExitAnim(function () {
            _this.curTweenId = -1;
            _this.stop();
            onEndComplete();
        });
    };
    //技能开始前播放动画, 移动到目标位置
    AlliancePlane.prototype.playEnterAnim = function (parent, onEnd) {
        if (this.curTweenId >= 0)
            this.stopAnim();
        //添加到父节点, 放在父节点位置
        parent.comParent.addChild(this.comParent);
        this.setPlayerPos(0, 0);
        //移动
        this.occupySlot();
        var targetPos = PlayerManager.GetInstance().MainPlayer.SlotComp.getAlliancePlaneRelativePos(); //this.TARGET_POS;
        this.curTweenId = Tween2DUtil.getInst().to({
            node: this.comParent,
            duration: 1,
            delay: 0,
            x: targetPos.x,
            y: targetPos.y,
            // rotation: 20,
            tweenFunc: TweenFunc.Sine.easeInOut,
            onComplete: cbhandler.gen_handler(function () { onEnd(); }, this)
        });
    };
    //技能时间到, 播放退出动画.
    AlliancePlane.prototype.playExitAnim = function (onEnd) {
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
            onComplete: cbhandler.gen_handler(function () {
                onEnd();
            }, this)
        });
    };
    //停止当前动画
    AlliancePlane.prototype.stopAnim = function () {
        if (this.curTweenId >= 0)
            Tween2DUtil.getInst().kill(this.curTweenId);
        this.curTweenId = -1;
    };
    AlliancePlane.prototype.EnableShoot = function (active) {
        //发射子弹
        this.bulletComp.EnableFire = active;
    };
    /////////////////////////////////////////////////////////////////
    //util
    AlliancePlane.prototype.occupySlot = function () {
        this.slotIndex = 0;
        PlayerManager.GetInstance().MainPlayer.SlotComp.ForceOccupySlot(this.slotIndex, EnumSlotType.Alliance);
    };
    AlliancePlane.prototype.clearSlot = function () {
        if (this.slotIndex >= 0) {
            PlayerManager.GetInstance().MainPlayer.SlotComp.ClearSlot(this.slotIndex, EnumSlotType.Alliance);
        }
    };
    return AlliancePlane;
}(Plane));
//# sourceMappingURL=AlliancePlane.js.map