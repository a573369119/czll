var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*
* name;
*/
var MonsterHitComponent2D = (function (_super) {
    __extends(MonsterHitComponent2D, _super);
    function MonsterHitComponent2D() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MonsterHitComponent2D.prototype.checkHitHandler = function () {
        if (!this.player.isInStage()) {
            return; //没在屏幕内, 不接受射击
        }
        var allNonMonsterBullets = BulletManager.GetInstance().GetAllSpawnedNonMonseterBullet(); //.GetAllSpawnedBullet(EnumBulletOutLookType.MISSILE_WEAPON_BULLET);//搜哦呦子弹
        var count = allNonMonsterBullets.length; //子弹的数量
        var monsterCollisionInfo = this.player.GetCollisionShapeInfo(); //怪物形状碰撞信息
        var containFightBackBuff = PlayerManager.GetInstance().MainPlayer.BuffComp.ContainBuff(EnumBuffType.FightBack); //子弹buff
        var hittedBullet = []; //记录碰撞的子弹, 统一回收
        for (var index = count - 1; index >= 0; index--) {
            if (this.player.State == EnumPlayerState.Die || GameDataManager.getInstance().MatchInfo.IsGameEnd())
                break; //比赛结束, 玩家可能已经销毁, 停止检测碰撞
            //子弹
            var bullet = allNonMonsterBullets[index];
            //Log.Debug("check monster uid %i, playerid %i", this.player.UID, this.player.playerID)
            //碰撞检测，撞到了
            if ((ConstDefine.TEST_EFFICIENCY ? ConstDefine.COLLISION_CHECK : true) && CollisionDetector.Instance.CheckBoxCollision(monsterCollisionInfo, bullet.GetCollisionShapeInfo())) {
                var monster = this.player;
                monster.OnBulletCollison(); //怪物被子弹击中
                if (!monster.GetHit(bullet.DamageValue)) {
                    //没有死亡
                    if (containFightBackBuff) {
                        monster.PushBack(0, -ConstDefine.FIGHTBACK_BUFF_OFFSET); //击退
                    }
                }
                if (!bullet.Through)
                    hittedBullet.push(bullet); //如果不是穿透就回收
            }
        }
        // (this.monster as Monster).getBulletInfo(hittedBullet);
        //统一回收
        var recycleCount = hittedBullet.length;
        for (var index_1 = recycleCount - 1; index_1 >= 0; index_1--) {
            var element = hittedBullet[index_1];
            BulletManager.GetInstance().Recycle(element); //回收子弹
        }
    };
    return MonsterHitComponent2D;
}(HitComponentBase2D));
//# sourceMappingURL=MonsterHitComponent2D.js.map