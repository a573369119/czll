var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*
* name;
*/
var EnumPlayerCollisionMode;
(function (EnumPlayerCollisionMode) {
    EnumPlayerCollisionMode[EnumPlayerCollisionMode["All"] = 0] = "All";
    EnumPlayerCollisionMode[EnumPlayerCollisionMode["PropOnly"] = 1] = "PropOnly";
})(EnumPlayerCollisionMode || (EnumPlayerCollisionMode = {}));
var PlayerHitComponent = (function (_super) {
    __extends(PlayerHitComponent, _super);
    function PlayerHitComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PlayerHitComponent.prototype.SetCollisionMode = function (mode) {
        this.collisionMode = mode;
    };
    PlayerHitComponent.prototype.checkHitHandler = function () {
        if (this.player.State == EnumPlayerState.Die)
            return; //死亡不检查
        if (GameDataManager.getInstance().MatchInfo.IsGameEnd())
            return; //比赛结束不检查
        if (ConstDefine.TEST_EFFICIENCY && !ConstDefine.PLAYER_COLLISION)
            return;
        //只在all模式检测怪物碰撞
        if (this.collisionMode == EnumPlayerCollisionMode.All) {
            var size = ConfigManager.GetInstance().GetWeaponConfig(GameDataManager.getInstance().LoginPlayerInfo.CurSideWeaponID).ColliderSize;
            var colliderSize = new Vec2(size[0], size[1]);
            //怪物
            var collidedMonster = CollisionDetector.Instance.CheckMonsterCollision(this.player.PlayerPos, colliderSize, false);
            for (var index = 0; index < collidedMonster.length; index++) {
                var monster = collidedMonster[index];
                Log.Debug("玩家碰撞怪物%i, uid%i, 死亡", monster.playerID, monster.UID);
                Facade.instance.sendNotification(NotificationNames.MAIN_PLAYER_DIE);
                return;
            }
            //怪物子弹
            var colliedBullet = CollisionDetector.Instance.CheckMonsterBulletCollision(this.player.GetCollisionShapeInfo());
            if (colliedBullet) {
                Log.Debug("玩家碰撞怪物子弹%i, uid%i, 死亡", colliedBullet.playerID, colliedBullet.UID);
                Facade.instance.sendNotification(NotificationNames.MAIN_PLAYER_DIE);
                return;
            }
        }
        //道具
        var allProp = CollisionDetector.Instance.CheckPropCollision(this.player.GetCollisionShapeInfo());
        for (var index = 0; index < allProp.length; index++) {
            var prop = allProp[index];
            this.playPropSound(prop); //播放声音
            this.player.BuffComp.AddBuff(prop.PropBuff, null);
            PropManager.GetInstance().Recycle(prop.Type, prop); //回收
            Log.Debug("玩家碰到道具buff %s", EnumBuffType[prop.PropBuff]);
        }
    };
    PlayerHitComponent.prototype.startCheckHit = function () {
        _super.prototype.startCheckHit.call(this);
        this.SetCollisionMode(EnumPlayerCollisionMode.All);
    };
    PlayerHitComponent.prototype.stopCheckHit = function () {
        _super.prototype.stopCheckHit.call(this);
    };
    //播放获取道具音效
    PlayerHitComponent.prototype.playPropSound = function (prop) {
        var buffConfig = ConfigManager.GetInstance().GetBuffConfig(prop.PropBuff);
        if (buffConfig.BuffType == EnumBuffEffectType.Buff) {
            AudioManager.GetInstance().PlaySoundByConfigID(EnumSoundID.sound_fight_buff_01);
        }
        else {
            AudioManager.GetInstance().PlaySoundByConfigID(EnumSoundID.sound_fight_buff_02);
        }
    };
    return PlayerHitComponent;
}(HitComponentBase2D));
//# sourceMappingURL=PlayerHitComponent.js.map