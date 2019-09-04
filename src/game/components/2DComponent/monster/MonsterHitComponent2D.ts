/*
* name;
*/
class MonsterHitComponent2D extends HitComponentBase2D {

    public checkHitHandler(): void {
        if (!this.player.isInStage()) {
            return;        //没在屏幕内, 不接受射击
        }
        let allNonMonsterBullets = BulletManager.GetInstance().GetAllSpawnedNonMonseterBullet();//.GetAllSpawnedBullet(EnumBulletOutLookType.MISSILE_WEAPON_BULLET);//搜哦呦子弹
        var count = allNonMonsterBullets.length//子弹的数量
        let monsterCollisionInfo = this.player.GetCollisionShapeInfo();//怪物形状碰撞信息
        let containFightBackBuff = PlayerManager.GetInstance().MainPlayer.BuffComp.ContainBuff(EnumBuffType.FightBack);//子弹buff

        let hittedBullet: Bullet[] = [];//记录碰撞的子弹, 统一回收
        for (var index = count - 1; index >= 0; index--) {
            if (this.player.State == EnumPlayerState.Die || GameDataManager.getInstance().MatchInfo.IsGameEnd()) break; //比赛结束, 玩家可能已经销毁, 停止检测碰撞
            //子弹
            let bullet = allNonMonsterBullets[index];

            //Log.Debug("check monster uid %i, playerid %i", this.player.UID, this.player.playerID)
            //碰撞检测，撞到了
            if ((ConstDefine.TEST_EFFICIENCY ? ConstDefine.COLLISION_CHECK : true) && CollisionDetector.Instance.CheckBoxCollision(monsterCollisionInfo, bullet.GetCollisionShapeInfo())) {
                let monster = (this.player as Monster)
                monster.OnBulletCollison();//怪物被子弹击中
                if (!monster.GetHit(bullet.DamageValue)) {//是否被打死
                    //没有死亡
                    if (containFightBackBuff) {//击退buff
                        monster.PushBack(0, -ConstDefine.FIGHTBACK_BUFF_OFFSET) //击退
                    }
                }
                if (!bullet.Through) hittedBullet.push(bullet)//如果不是穿透就回收
                // return; //gameModify4
            }
        }
        // (this.monster as Monster).getBulletInfo(hittedBullet);

        //统一回收
        let recycleCount = hittedBullet.length;
        for (let index = recycleCount - 1; index >= 0; index--) {
            let element = hittedBullet[index];
            BulletManager.GetInstance().Recycle(element);//回收子弹
        }
    }
}