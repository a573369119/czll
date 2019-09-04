/*
* 分裂
*/
class SplitSkill implements ISkillLogic {
    public static SPAWN_NUM: number;// = 2;       //分裂个数
    public static MAX_SPLIT_NUM: number;//= 3;       //最多分裂次数
    public static SIZE_HP_PERCENTAGE: number;//= 0.5; //子怪物的大小&血量百分比

    private splitedCount = 0;//当前是第几次分裂 0,1,2,3
    private config: SkillConfigConfigData;
    private InitParam(config: SkillConfigConfigData) {
        //let config = ConfigManager.GetInstance().GetSkillConfig(EnumMonsterPowerId.Split)
        SplitSkill.SPAWN_NUM = config.Param1;
        SplitSkill.MAX_SPLIT_NUM = config.Param2;
        SplitSkill.SIZE_HP_PERCENTAGE = config.Param3;
    }
    public Start(player: Monster, ...param: any[]) {
        this.config = param[0] as SkillConfigConfigData;//获取配置
        this.InitParam(this.config);//变量赋值
        this.splitedCount = param.length > 1 && param[1] ? param[1] : 0;//分裂次数
        this.reset();
    }

    public Stop(parent: Monster, param: any) {
        this.cleanUp();
    }

    public End(parent: Monster, onEndComplete: Function, param: any) {
        this.cleanUp();
        this.exe(parent, param, onEndComplete)
        // if (onEndComplete) onEndComplete();
    }

    private cleanUp() {
        if (this.curTweenId >= 0) Tween2DUtil.getInst().kill(this.curTweenId)
        this.curTweenId = -1;
    }

    ///////////////////////////////////////////////////////////////////////////////////
    //
    private curTweenId: number;//动画id


    //执行
    private exe(player: Monster, param: any, onEnd: Function) {
        //分裂一个子怪物
        if (this.splitedCount < SplitSkill.MAX_SPLIT_NUM) {
            for (let index = 0; index < SplitSkill.SPAWN_NUM; index++) {
                let spawnInfo = player.attributeComp.CopySpawnData();
                spawnInfo.CanTriggerPropSpawn = false;
                var monster: Monster = PlayerManager.GetInstance().SpawnMonster(spawnInfo.MonsterId, false, spawnInfo);
                let scale = SplitSkill.SIZE_HP_PERCENTAGE;//Math.pow(SplitSkill.SIZE_HP_PERCENTAGE, this.splitedCount + 1)
                monster.ResetSizeAndHp(scale, scale);
                monster.setPlayerPos(player.PlayerPos.x, player.PlayerPos.y);
                monster.skillComp.Stop(EnumMonsterPowerType.Split);
                monster.skillComp.Start(EnumMonsterPowerType.Split, this.config, this.splitedCount + 1) //设置第几次分裂
                monster.monsterMoveComp.monsterRandomMove();
                Log.Debug("分裂出怪物 %i", monster.UID)
            }
        }

        onEnd();
    }

    private reset() {
        this.curTweenId = -1;
    }
}