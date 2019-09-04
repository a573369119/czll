/*
* 分裂
*/
var SplitSkill = (function () {
    function SplitSkill() {
        this.splitedCount = 0; //当前是第几次分裂 0,1,2,3
    }
    SplitSkill.prototype.InitParam = function (config) {
        //let config = ConfigManager.GetInstance().GetSkillConfig(EnumMonsterPowerId.Split)
        SplitSkill.SPAWN_NUM = config.Param1;
        SplitSkill.MAX_SPLIT_NUM = config.Param2;
        SplitSkill.SIZE_HP_PERCENTAGE = config.Param3;
    };
    SplitSkill.prototype.Start = function (player) {
        var param = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            param[_i - 1] = arguments[_i];
        }
        this.config = param[0]; //获取配置
        this.InitParam(this.config); //变量赋值
        this.splitedCount = param.length > 1 && param[1] ? param[1] : 0; //分裂次数
        this.reset();
    };
    SplitSkill.prototype.Stop = function (parent, param) {
        this.cleanUp();
    };
    SplitSkill.prototype.End = function (parent, onEndComplete, param) {
        this.cleanUp();
        this.exe(parent, param, onEndComplete);
        // if (onEndComplete) onEndComplete();
    };
    SplitSkill.prototype.cleanUp = function () {
        if (this.curTweenId >= 0)
            Tween2DUtil.getInst().kill(this.curTweenId);
        this.curTweenId = -1;
    };
    //执行
    SplitSkill.prototype.exe = function (player, param, onEnd) {
        //分裂一个子怪物
        if (this.splitedCount < SplitSkill.MAX_SPLIT_NUM) {
            for (var index = 0; index < SplitSkill.SPAWN_NUM; index++) {
                var spawnInfo = player.attributeComp.CopySpawnData();
                spawnInfo.CanTriggerPropSpawn = false;
                var monster = PlayerManager.GetInstance().SpawnMonster(spawnInfo.MonsterId, false, spawnInfo);
                var scale = SplitSkill.SIZE_HP_PERCENTAGE; //Math.pow(SplitSkill.SIZE_HP_PERCENTAGE, this.splitedCount + 1)
                monster.ResetSizeAndHp(scale, scale);
                monster.setPlayerPos(player.PlayerPos.x, player.PlayerPos.y);
                monster.skillComp.Stop(EnumMonsterPowerType.Split);
                monster.skillComp.Start(EnumMonsterPowerType.Split, this.config, this.splitedCount + 1); //设置第几次分裂
                monster.monsterMoveComp.monsterRandomMove();
                Log.Debug("分裂出怪物 %i", monster.UID);
            }
        }
        onEnd();
    };
    SplitSkill.prototype.reset = function () {
        this.curTweenId = -1;
    };
    return SplitSkill;
}());
//# sourceMappingURL=SplitSkill.js.map