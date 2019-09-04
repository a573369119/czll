/*
* name;
*/
class ExplosionSkill implements ISkillLogic {
    private explosionBulletNum: number = 10;//发射子弹数量
    private config: SkillConfigConfigData;
    private InitParam(config: SkillConfigConfigData) {
        //let config = ConfigManager.GetInstance().GetSkillConfig(EnumMonsterPowerId.Explosion)
        this.explosionBulletNum = config.Param1;
    }

    public Start(player: Monster, ...param: any[]) {
        this.config = param[0] as SkillConfigConfigData;
        this.InitParam(this.config);
        // this.reset();
        // this.startTimer(player, param)
    }

    public Stop(player: Monster, param: any) {
        if (this.preapareFx) {
            player.monsterEffectComp.RemoveEffect(this.preapareFx, EnumSpineConfigID.MonsterPrepareExplosion)
            this.preapareFx = null;
        }
        if (this.explosionFx) {
            player.monsterEffectComp.RemoveEffect(this.explosionFx, EnumSpineConfigID.MonsterExplosion)
            this.explosionFx = null;
        }
    }

    public End(player: Monster, onEndComplete: Function, param: any) {
        // if (onEndComplete) onEndComplete();
        this.playPrepareExplosion(player, onEndComplete)
    }

    ///////////////////////////////////////////////////////////////////////////////////
    //
    private preapareFx: Laya.Skeleton = null;
    private explosionFx: Laya.Skeleton = null;
    private playPrepareExplosion(player: Monster, onEndComplete: Function) {
        player.monsterMoveComp.monsterStop();
        player.setPlayerActive(true)
        this.preapareFx = player.monsterEffectComp.showEffect(0, EnumSpineConfigID.MonsterPrepareExplosion, null, null, () => {
            this.preapareFx = null;
            this.playExplosion(player, onEndComplete);
        });
    }

    private playExplosion(player: Monster, onEndComplete: Function) {
        player.setPlayerActive(false)
        this.explosionFx = player.monsterEffectComp.showEffect(0, EnumSpineConfigID.MonsterExplosion, null, null, () => {
            this.explosionFx = null;
            this.shoot(player)
            onEndComplete();
        });
    }

    private shoot(player: Monster) {
        let circlePos = CommonUtil2D.DivideCircle(player.PlayerPos, 10, this.explosionBulletNum)
        for (let index = 0; index < circlePos.length; index++) {
            player.monsterBulletComp.skillFireByTargetPos(circlePos[index])
        }
    }



}