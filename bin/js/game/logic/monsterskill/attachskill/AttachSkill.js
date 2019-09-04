/*
* name;
*/
var AttachSkill = (function () {
    function AttachSkill() {
        this.fireBulletCount = 0; //发射的子弹数量
    }
    Object.defineProperty(AttachSkill.prototype, "Config", {
        get: function () { return this.config; },
        enumerable: true,
        configurable: true
    });
    AttachSkill.prototype.InitParam = function (config) {
        // let config = ConfigManager.GetInstance().GetSkillConfig(EnumMonsterPowerId.Attach)
        AttachSkill.ATTACH_RADIUS = config.Param1;
        AttachSkill.MAX_ATTACH_NUM = config.Param2 <= 0 ? 10000 : config.Param2;
    };
    AttachSkill.prototype.Start = function (player) {
        var param = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            param[_i - 1] = arguments[_i];
        }
        this.config = param[0];
        this.InitParam(this.config);
        this.reset();
        //没间隔ns 检测四周是否有碰到怪物; 是否同支, 否则挂在自己父节点下, 一起移动. 
        //如果自己死亡, 自己下面的子节点自由
        this.startTimer(player, param);
    };
    AttachSkill.prototype.Stop = function (player, param) {
        this.End(player, null, param);
    };
    AttachSkill.prototype.End = function (player, onEndComplete, param) {
        if (this.timerId >= 0)
            TimeManager.getInst().remove(this.timerId);
        this.timerId = -1;
        this.OnParentKill(player);
        if (onEndComplete)
            onEndComplete();
    };
    AttachSkill.prototype.startTimer = function (player, param) {
        this.timerId = TimeManager.getInst().once(AttachSkill.CHECH_ATTCH_INTERVAL, cbhandler.gen_handler(this.exe, this, player, param));
    };
    //执行
    AttachSkill.prototype.exe = function (player, param) {
        // this.reset();
        this.checkAttach(player, param);
        this.startTimer(player, param);
    };
    AttachSkill.prototype.checkAttach = function (player, param) {
        if (player.State == EnumPlayerState.Die)
            Log.Debug("玩家已经死亡UID:%i, playerID: %i", player.UID, player.playerID);
        // let monsters = PlayerManager.GetInstance().GetAllSpawnedMonster();
        // for (let index = 0; index < monsters.length; index++) {
        //     let monster = monsters[index];
        //     if (!monster.IsAlive()) continue;
        //     if (monster.UID == player.UID) continue;
        //     if (AttachDataCenter.Instance.IsUnderSameParent(player, monster)) continue;//同个父节点不检查
        //     let collisionInfo = monster.GetCollisionShapeInfo(true) as BoxCollisonInfo;
        //     if (CommonUtil.IsBoxCrossed(collisionInfo, player.GetCollisionShapeInfo() as BoxCollisonInfo)) {
        //         this.Attach(player, monster) //检测到一个就结束
        //         break;
        //     }
        // }
        AttachDataCenter.Instance.CheckAttach(AttachSkill.CHECH_ATTCH_INTERVAL, AttachSkill.MAX_ATTACH_NUM);
        // if (Math.random() > 0.6) {
        //     this.OnParentKill(player)
        // }
    };
    AttachSkill.prototype.Attach = function (parent, child) {
        AttachDataCenter.Instance.AddAttach(parent, child);
        if (!child.attributeComp.ContainsSkill(EnumMonsterPowerType.Attach) && !child.skillComp.ConstainSkill(EnumMonsterPowerType.Attach)) {
            // if (!child.skillComp.ConstainSkill(EnumMonsterPowerId.Attach)) {
            child.skillComp.Start(EnumMonsterPowerType.Attach, this.config);
        }
    };
    AttachSkill.prototype.OnParentKill = function (parent) {
        AttachDataCenter.Instance.RemoveAttach(parent);
    };
    AttachSkill.prototype.reset = function () {
        this.timerId = -1;
    };
    return AttachSkill;
}());
AttachSkill.CHECH_ATTCH_INTERVAL = 0.2; //检测吸附间隔
AttachSkill.GOLABLE_ATTACHED_MONSTER_UID = null; //已经在吸附在父节点的怪物/ 所有的怪物都吸附在一个父节点下, 方便检测是否同支
//# sourceMappingURL=AttachSkill.js.map