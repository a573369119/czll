var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*
* name;
*/
var MagenetBounce = (function (_super) {
    __extends(MagenetBounce, _super);
    function MagenetBounce() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // public bulletMoveCom: BulletMoveComponent2D;
    MagenetBounce.prototype.initComponent = function () {
        _super.prototype.initComponent.call(this);
        // this.bulletMoveCom = new BulletMoveComponent2D()
        this.viewComp = new ElectricNetViewComponent2D(EnumSpineConfigID.MagnetDisturb);
        this.addComponent(this.viewComp);
        // this.addComponent(this.bulletMoveCom);
        this.comParent.name = "MagenetBounce";
        this.comParent.zOrder = 5;
        this.viewComp.SetActive(false); //初始化不显示
    };
    MagenetBounce.prototype.OnSkillObjSpawn = function () {
        this.viewComp.SetActive(true);
    };
    MagenetBounce.prototype.OnSkillObjRecycle = function () {
        this.viewComp.SetActive(false);
        this.stop();
    };
    MagenetBounce.prototype.OnSkillObjDestroy = function () {
    };
    Object.defineProperty(MagenetBounce.prototype, "FreezeDuration", {
        get: function () { return this.freezDuration; },
        set: function (value) { this.freezDuration = value; } //10; }//
        ,
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MagenetBounce.prototype, "AttackRange", {
        get: function () { return this.attackRange; },
        set: function (value) { this.attackRange = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MagenetBounce.prototype, "AttackDamage", {
        get: function () { return this.attackDamage; },
        set: function (value) { this.attackDamage = value; } //20; }//
        ,
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MagenetBounce.prototype, "MaxBounceNum", {
        get: function () { return this.maxBounceNum; },
        set: function (value) { this.maxBounceNum = value; } //20; }//
        ,
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MagenetBounce.prototype, "SPEED", {
        get: function () { return this.moveSpeed; },
        set: function (value) { this.moveSpeed = value; } //20; }//
        ,
        enumerable: true,
        configurable: true
    });
    /**
     * 开始技能
     * @param bounceIndex 当前是技能中第几次跳跃, 从0开始
     * @param targetMonster 目标怪物
     * @param onSkillEnd 技能回调 onSkillEnd(this.curBounceIndex, this.targetMonster.PlayerPos);
     */
    MagenetBounce.prototype.start = function (bounceIndex, fromPos, targetMonster, onReachMonster) {
        var _this = this;
        this.curBounceIndex = bounceIndex;
        this.fromPos = fromPos;
        this.targetMonster = targetMonster;
        this.onReachMonster = onReachMonster;
        this.curTimerId = -1;
        this.setPlayerPos(fromPos.x, fromPos.y);
        //选择攻击范围内没有麻痹的敌人, 使其麻痹3s,  连续弹射3次
        targetMonster.BuffComp.AddBuff(EnumBuffType.MagnetFreezen, this.freezDuration);
        this.setDir(targetMonster);
        this.curPlayingTweenId = this.exeBouncingAnim(fromPos, targetMonster, function () {
            AudioManager.GetInstance().PlaySoundByConfigID(EnumSoundID.sound_fight_bounce);
            //添加技能结束的处理, 比如淡出动画, 再回收
            _this.onReachMonster(_this.curBounceIndex, _this.targetMonster.PlayerPos);
            //this.curTimerId = TimeManager.getInst().once()
            _this.end();
        });
    };
    //技能时间到终止
    MagenetBounce.prototype.end = function () {
        ///回收
        GamePoolManager.Instance.Recycle(this, MagnetDisturbWeapon.GetPoolID());
    };
    //由Recycle调用 玩家死亡/游戏结束, 立刻结束电网
    MagenetBounce.prototype.stop = function () {
        if (this.curPlayingTweenId >= 0)
            Tween2DUtil.getInst().kill(this.curPlayingTweenId);
        this.curPlayingTweenId = -1;
    };
    //执行弹射动画
    MagenetBounce.prototype.exeBouncingAnim = function (fromPos, targetMonster, callback) {
        var tweenId = Tween2DUtil.getInst().to({
            node: this.comParent,
            duration: 0.5,
            delay: 0,
            x: targetMonster.PlayerPos.x,
            y: targetMonster.PlayerPos.y,
            tweenFunc: TweenFunc.Sine.easeInOut,
            onComplete: cbhandler.gen_handler(function () { callback(); }, this)
        });
        return tweenId;
    };
    //设置spine方向, 对准目标
    MagenetBounce.prototype.setDir = function (targetMonster) {
        CommonUtil2D.LookAt(this.comParent, targetMonster.comParent);
    };
    return MagenetBounce;
}(SkillSpawnObject));
//# sourceMappingURL=MagenetBounce.js.map