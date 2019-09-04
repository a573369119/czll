/*
* name;
*/
var FollowSkill = (function () {
    function FollowSkill() {
    }
    FollowSkill.prototype.InitParam = function (config) {
        //let config = ConfigManager.GetInstance().GetSkillConfig(EnumMonsterPowerId.FollowPlayer)
        FollowSkill.FOLLOW_CHECK_RANGE = config.Param1;
        FollowSkill.STOP_FOLLOW_CHECK_RANGE = config.Param2;
    };
    FollowSkill.prototype.Start = function (player) {
        var param = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            param[_i - 1] = arguments[_i];
        }
        this.config = param[0];
        this.InitParam(this.config);
        this.reset();
        this.startTimer(player, param);
    };
    FollowSkill.prototype.Stop = function (parent, param) {
        this.End(parent, null, param);
    };
    FollowSkill.prototype.End = function (parent, onEndComplete, param) {
        if (this.timerId >= 0)
            TimeManager.getInst().remove(this.timerId);
        this.timerId = -1;
        if (this.curTweenId >= 0)
            Tween2DUtil.getInst().kill(this.curTweenId);
        this.curTweenId = -1;
        if (onEndComplete)
            onEndComplete();
    };
    //开始计时
    FollowSkill.prototype.startTimer = function (player, param) {
        //间隔ns
        this.timerId = TimeManager.getInst().once(FollowSkill.CHECK_FOLLOW_INTERVAL, cbhandler.gen_handler(this.exe, this, player, param));
    };
    //执行
    FollowSkill.prototype.exe = function (player, param) {
        var checkInRange = false; //是否检测玩家在 范围内;
        var range = 0; //检测范围
        if (this.isFollowing) {
            //当前玩家没有死亡 & 没有超出范围, 继续朝怪物前进.
            if (!GameDataManager.getInstance().MatchInfo.IsGameEnd()) {
                checkInRange = true;
                range = FollowSkill.STOP_FOLLOW_CHECK_RANGE;
            }
        }
        else {
            //检测范围内是否有玩家
            checkInRange = true;
            range = FollowSkill.FOLLOW_CHECK_RANGE;
        }
        if (checkInRange) {
            var mainPlayer = PlayerManager.GetInstance().MainPlayer;
            var mainPlayerPos = mainPlayer.PlayerPos;
            //如果玩家在自己前方才追踪
            var inRnage = player.comParent.y < mainPlayerPos.y && CollisionDetector.Instance.IsPlayerInCircle(player.PlayerPos, range, mainPlayer);
            if (inRnage) {
                player.monsterMoveComp.setMoveDir(mainPlayerPos.sub(player.PlayerPos)); //朝向玩家移动
                this.isFollowing = true;
            }
            else {
                if (this.isFollowing) {
                    player.monsterMoveComp.SetRandomDir();
                }
                this.isFollowing = false; //停止追踪
            }
        }
        //继续检测追踪
        this.timerId = -1;
        this.startTimer(player, param);
    };
    FollowSkill.prototype.reset = function () {
        this.curTweenId = -1;
        this.timerId = -1;
        this.isFollowing = false;
    };
    return FollowSkill;
}());
FollowSkill.CHECK_FOLLOW_INTERVAL = 0.2; //检测追踪/放弃追踪间隔
//# sourceMappingURL=FollowSkill.js.map