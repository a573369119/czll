/*
* name;
*/
var SpawnSkill = (function () {
    function SpawnSkill() {
    }
    SpawnSkill.prototype.InitParam = function (player, config) {
        //let config = ConfigManager.GetInstance().GetSkillConfig(EnumMonsterPowerId.Spawn)
        SpawnSkill.SPAWN_INTERVAL = config.Param1;
        SpawnSkill.SIZE_HP_PERCENTAGE = config.Param2;
        this.SPAWN_MONSTER_ID = config.Param3 > 0 ? config.Param3 : player.attributeComp.MonsterSpawnData.MonsterId;
        this.spawnPowerID = ConfigManager.GetInstance().GetMonsterConfig(this.SPAWN_MONSTER_ID).MonsterSkillID;
        this.spawnPowerConfigs = [];
        for (var index = 0; index < this.spawnPowerID.length; index++) {
            var powerID = this.spawnPowerID[index];
            var skill = powerID > 0 ? ConfigManager.GetInstance().GetSkillConfig(powerID) : null;
            ;
            if (skill)
                this.spawnPowerConfigs.push(skill);
        }
    };
    SpawnSkill.prototype.Start = function (player) {
        var param = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            param[_i - 1] = arguments[_i];
        }
        this.config = param[0];
        this.InitParam(player, this.config);
        this.reset();
        this.startTimer(player, param);
    };
    SpawnSkill.prototype.Stop = function (parent, param) {
        this.End(parent, null, param);
    };
    SpawnSkill.prototype.End = function (parent, onEndComplete, param) {
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
    SpawnSkill.prototype.startTimer = function (player, param) {
        //间隔ns
        this.timerId = TimeManager.getInst().once(SpawnSkill.SPAWN_INTERVAL, cbhandler.gen_handler(this.exe, this, player, param));
    };
    //执行
    SpawnSkill.prototype.exe = function (player, param) {
        if (player.State == EnumPlayerState.Die)
            return;
        if (GameDataManager.getInstance().MatchInfo.IsGameEnd())
            return;
        if (MonsterSpawnLogic.Instance.CheckCanSpawn()) {
            //分裂一个子怪物
            var spawnInfo = player.attributeComp.CopySpawnData();
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
            var monster = PlayerManager.GetInstance().SpawnMonster(spawnInfo.MonsterId, false, spawnInfo);
            //monster.ResetSizeAndHp(SpawnSkill.SIZE_HP_PERCENTAGE, SpawnSkill.SIZE_HP_PERCENTAGE);
            monster.setPlayerPos(player.PlayerPos.x, player.PlayerPos.y);
            monster.monsterMoveComp.monsterRandomMove();
        }
        //继续等待下次的生产
        this.startTimer(player, param);
    };
    SpawnSkill.prototype.reset = function () {
        this.curTweenId = -1;
        this.timerId = -1;
    };
    return SpawnSkill;
}());
//# sourceMappingURL=SpawnSkill.js.map