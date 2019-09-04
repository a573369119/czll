/*
* name;
*/
enum EnumPlayerCollisionMode {
    All,
    PropOnly,//无敌中只和道具碰撞
}

class PlayerHitComponent extends HitComponentBase2D {
    private collisionMode: EnumPlayerCollisionMode;
    public SetCollisionMode(mode: EnumPlayerCollisionMode) {
        this.collisionMode = mode;
    }
    public checkHitHandler(): void {
        if (this.player.State == EnumPlayerState.Die) return;//死亡不检查
        if (GameDataManager.getInstance().MatchInfo.IsGameEnd()) return;//比赛结束不检查
        if (ConstDefine.TEST_EFFICIENCY && !ConstDefine.PLAYER_COLLISION) return;

        //只在all模式检测怪物碰撞
        if (this.collisionMode == EnumPlayerCollisionMode.All) {
            let size = ConfigManager.GetInstance().GetWeaponConfig(GameDataManager.getInstance().LoginPlayerInfo.CurSideWeaponID).ColliderSize;
            let colliderSize = new Vec2(size[0], size[1])

            //怪物
            let collidedMonster = CollisionDetector.Instance.CheckMonsterCollision(this.player.PlayerPos, colliderSize, false);
            for (let index = 0; index < collidedMonster.length; index++) {
                let monster = collidedMonster[index];
                Log.Debug("玩家碰撞怪物%i, uid%i, 死亡", monster.playerID, monster.UID)
                Facade.instance.sendNotification(NotificationNames.MAIN_PLAYER_DIE)
                return;
            }

            //怪物子弹
            let colliedBullet = CollisionDetector.Instance.CheckMonsterBulletCollision(this.player.GetCollisionShapeInfo());
            if (colliedBullet) {
                Log.Debug("玩家碰撞怪物子弹%i, uid%i, 死亡", colliedBullet.playerID, colliedBullet.UID)
                Facade.instance.sendNotification(NotificationNames.MAIN_PLAYER_DIE)
                return;
            }
        }

        //道具
        let allProp = CollisionDetector.Instance.CheckPropCollision(this.player.GetCollisionShapeInfo())
        for (let index = 0; index < allProp.length; index++) {
            let prop = allProp[index];
            this.playPropSound(prop);    //播放声音
            (this.player as MainPlayer).BuffComp.AddBuff(prop.PropBuff, null);
            PropManager.GetInstance().Recycle(prop.Type, prop);//回收
            Log.Debug("玩家碰到道具buff %s", EnumBuffType[prop.PropBuff])
        }
    }

    public startCheckHit(): void {
        super.startCheckHit();
        this.SetCollisionMode(EnumPlayerCollisionMode.All)
    }

    public stopCheckHit(): void {
        super.stopCheckHit();
    }

    //播放获取道具音效
    private playPropSound(prop: Prop) {
        let buffConfig = ConfigManager.GetInstance().GetBuffConfig(prop.PropBuff)
        if (buffConfig.BuffType == EnumBuffEffectType.Buff) {
            AudioManager.GetInstance().PlaySoundByConfigID(EnumSoundID.sound_fight_buff_01)
        } else {
            AudioManager.GetInstance().PlaySoundByConfigID(EnumSoundID.sound_fight_buff_02)
        }
    }
}