/*
* name;
*/
class FollowSkill implements ISkillLogic {
    public static CHECK_FOLLOW_INTERVAL: number = 0.2;       //检测追踪/放弃追踪间隔
    public static FOLLOW_CHECK_RANGE: number;// = 500; //检测追踪的范围半径
    public static STOP_FOLLOW_CHECK_RANGE: number;// = 600; //停止追踪的范围半径

    private config: SkillConfigConfigData;

    private InitParam(config: SkillConfigConfigData) {
        //let config = ConfigManager.GetInstance().GetSkillConfig(EnumMonsterPowerId.FollowPlayer)
        FollowSkill.FOLLOW_CHECK_RANGE = config.Param1;
        FollowSkill.STOP_FOLLOW_CHECK_RANGE = config.Param2;
    }

    public Start(player: Monster, ...param: any[]) {
        this.config = param[0] as SkillConfigConfigData;
        this.InitParam(this.config);
        this.reset();
        this.startTimer(player, param)
    }

    public Stop(parent: PlayerBase2D, param: any) {
        this.End(parent, null, param)
    }

    public End(parent: PlayerBase2D, onEndComplete: Function, param: any) {
        if (this.timerId >= 0) TimeManager.getInst().remove(this.timerId);
        this.timerId = -1;
        if (this.curTweenId >= 0) Tween2DUtil.getInst().kill(this.curTweenId)
        this.curTweenId = -1;
        if (onEndComplete) onEndComplete();
    }

    ///////////////////////////////////////////////////////////////////////////////////
    //
    private curTweenId: number;//动画id
    private timerId: number;//计时
    private isFollowing: boolean;//是否正在追踪

    //开始计时
    private startTimer(player: Monster, param: any) {
        //间隔ns
        this.timerId = TimeManager.getInst().once(FollowSkill.CHECK_FOLLOW_INTERVAL, cbhandler.gen_handler(this.exe, this, player, param));
    }

    //执行
    private exe(player: Monster, param: any) {
        let checkInRange = false;//是否检测玩家在 范围内;
        let range = 0;//检测范围
        if (this.isFollowing) {
            //当前玩家没有死亡 & 没有超出范围, 继续朝怪物前进.
            if (!GameDataManager.getInstance().MatchInfo.IsGameEnd()) {
                checkInRange = true;
                range = FollowSkill.STOP_FOLLOW_CHECK_RANGE;
            }
        } else {
            //检测范围内是否有玩家
            checkInRange = true;
            range = FollowSkill.FOLLOW_CHECK_RANGE;
        }

        if (checkInRange) {
            let mainPlayer = PlayerManager.GetInstance().MainPlayer;
            let mainPlayerPos = mainPlayer.PlayerPos;
            //如果玩家在自己前方才追踪
            let inRnage = player.comParent.y < mainPlayerPos.y && CollisionDetector.Instance.IsPlayerInCircle(player.PlayerPos, range, mainPlayer)
            if (inRnage) {
                player.monsterMoveComp.setMoveDir(mainPlayerPos.sub(player.PlayerPos))//朝向玩家移动
                this.isFollowing = true;
            } else {
                if (this.isFollowing) {
                    player.monsterMoveComp.SetRandomDir()
                }
                this.isFollowing = false;//停止追踪
            }
        }

        //继续检测追踪
        this.timerId = -1;
        this.startTimer(player, param);
    }

    private reset() {
        this.curTweenId = -1;
        this.timerId = -1;
        this.isFollowing = false;
    }
}