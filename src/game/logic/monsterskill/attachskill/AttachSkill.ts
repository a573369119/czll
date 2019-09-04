/*
* name;
*/




class AttachSkill implements ISkillLogic {
    public static ATTACH_RADIUS: number;//= 500;//吸附的半径
    public static CHECH_ATTCH_INTERVAL: number = 0.2;//检测吸附间隔
    public static MAX_ATTACH_NUM: number;//最大可吸附怪数量

    public static GOLABLE_ATTACHED_MONSTER_UID: number = null;//已经在吸附在父节点的怪物/ 所有的怪物都吸附在一个父节点下, 方便检测是否同支
    //父节点死亡, 子节点如何处理
    private config: SkillConfigConfigData;
    public get Config(): SkillConfigConfigData { return this.config; }
    private InitParam(config: SkillConfigConfigData) {
        // let config = ConfigManager.GetInstance().GetSkillConfig(EnumMonsterPowerId.Attach)
        AttachSkill.ATTACH_RADIUS = config.Param1;
        AttachSkill.MAX_ATTACH_NUM = config.Param2 <= 0 ? 10000 : config.Param2;
    }

    public Start(player: Monster, ...param: any[]) {
        this.config = param[0] as SkillConfigConfigData;
        this.InitParam(this.config);
        this.reset();

        //没间隔ns 检测四周是否有碰到怪物; 是否同支, 否则挂在自己父节点下, 一起移动. 
        //如果自己死亡, 自己下面的子节点自由

        this.startTimer(player, param)
    }

    public Stop(player: Monster, param: any) {
        this.End(player, null, param)
    }

    public End(player: Monster, onEndComplete: Function, param: any) {
        if (this.timerId >= 0) TimeManager.getInst().remove(this.timerId);
        this.timerId = -1;

        this.OnParentKill(player)
        if (onEndComplete) onEndComplete();
    }

    ///////////////////////////////////////////////////////////////////////////////////
    //
    private timerId: number;//计时
    private fireBulletCount: number = 0;//发射的子弹数量

    private startTimer(player: Monster, param: any) {
        this.timerId = TimeManager.getInst().once(AttachSkill.CHECH_ATTCH_INTERVAL, cbhandler.gen_handler(this.exe, this, player, param))
    }

    //执行
    private exe(player: Monster, param: any) {
        // this.reset();
        this.checkAttach(player, param)
        this.startTimer(player, param)
    }



    private checkAttach(player: Monster, param: any) {

        if (player.State == EnumPlayerState.Die) Log.Debug("玩家已经死亡UID:%i, playerID: %i", player.UID, player.playerID)
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
        AttachDataCenter.Instance.CheckAttach(AttachSkill.CHECH_ATTCH_INTERVAL, AttachSkill.MAX_ATTACH_NUM)


        // if (Math.random() > 0.6) {
        //     this.OnParentKill(player)
        // }
    }


    private Attach(parent: Monster, child: Monster) {
        AttachDataCenter.Instance.AddAttach(parent, child);
        if (!child.attributeComp.ContainsSkill(EnumMonsterPowerType.Attach) && !child.skillComp.ConstainSkill(EnumMonsterPowerType.Attach)) {
            // if (!child.skillComp.ConstainSkill(EnumMonsterPowerId.Attach)) {
            child.skillComp.Start(EnumMonsterPowerType.Attach, this.config);
        }

    }

    private OnParentKill(parent: Monster) {
        AttachDataCenter.Instance.RemoveAttach(parent)
    }








    private reset() {
        this.timerId = -1;
    }
}