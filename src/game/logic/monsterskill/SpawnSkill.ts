/*
* name;
*/
class SpawnSkill implements ISkillLogic {
    public static SPAWN_INTERVAL: number;// = 5;       //生产间隔
    public static SIZE_HP_PERCENTAGE: number;// = 0.3; //子怪物的大小&血量百分比
    private SPAWN_MONSTER_ID: number;//生产的怪物id
    private spawnPowerID: number[];//生产怪技能
    private spawnPowerConfigs: SkillConfigConfigData[];//生产怪技能配置

    private config: SkillConfigConfigData;
    private InitParam(player: Monster, config: SkillConfigConfigData) {
        //let config = ConfigManager.GetInstance().GetSkillConfig(EnumMonsterPowerId.Spawn)
        SpawnSkill.SPAWN_INTERVAL = config.Param1;
        SpawnSkill.SIZE_HP_PERCENTAGE = config.Param2;
        this.SPAWN_MONSTER_ID = config.Param3 > 0 ? config.Param3 : player.attributeComp.MonsterSpawnData.MonsterId;
        this.spawnPowerID = ConfigManager.GetInstance().GetMonsterConfig(this.SPAWN_MONSTER_ID).MonsterSkillID;
        this.spawnPowerConfigs = [];
        for (let index = 0; index < this.spawnPowerID.length; index++) {
            let powerID = this.spawnPowerID[index];
            let skill = powerID > 0 ? ConfigManager.GetInstance().GetSkillConfig(powerID) : null;;
            if (skill) this.spawnPowerConfigs.push(skill)
        }
    }

    public Start(player: Monster, ...param: any[]) {
        this.config = param[0] as SkillConfigConfigData;
        this.InitParam(player, this.config);
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

    //开始计时
    private startTimer(player: Monster, param: any) {
        //间隔ns
        this.timerId = TimeManager.getInst().once(SpawnSkill.SPAWN_INTERVAL, cbhandler.gen_handler(this.exe, this, player, param));
    }

    //执行
    private exe(player: Monster, param: any) {
        if (player.State == EnumPlayerState.Die) return;
        if (GameDataManager.getInstance().MatchInfo.IsGameEnd()) return;

        if (MonsterSpawnLogic.Instance.CheckCanSpawn()) {
            //分裂一个子怪物
            let spawnInfo = player.attributeComp.CopySpawnData();
            spawnInfo.CanTriggerPropSpawn = false;
            //不继承能力
            spawnInfo.PowerNum = this.spawnPowerID.length;
            // spawnInfo.PowerId = this.spawnPowerID; //使用怪物自己的技能
            spawnInfo.PowerConfigs = this.spawnPowerConfigs;
            spawnInfo.MonsterId = this.SPAWN_MONSTER_ID;
            // let sizeScale = MonsterSpawnLogic.Instance.GetMonsterScale(spawnInfo.Level, GameDataManager.getInstance().LevelInfo.CurLevelID);
            // spawnInfo.SizeScale.x = sizeScale; // spawnInfo.SizeScale.mul(SpawnSkill.SIZE_HP_PERCENTAGE); //修改大小
            // spawnInfo.SizeScale.y = sizeScale;
            spawnInfo.SizeScale = spawnInfo.SizeScale.mul(SpawnSkill.SIZE_HP_PERCENTAGE); //修改大小
            var monster: Monster = PlayerManager.GetInstance().SpawnMonster(spawnInfo.MonsterId, false, spawnInfo);
            //monster.ResetSizeAndHp(SpawnSkill.SIZE_HP_PERCENTAGE, SpawnSkill.SIZE_HP_PERCENTAGE);
            monster.setPlayerPos(player.PlayerPos.x, player.PlayerPos.y);
            monster.monsterMoveComp.monsterRandomMove();
        }

        //继续等待下次的生产
        this.startTimer(player, param)
    }

    private reset() {
        this.curTweenId = -1;
        this.timerId = -1;
    }
}