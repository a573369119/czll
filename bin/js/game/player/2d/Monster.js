var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*
* name;
*/
var Monster = (function (_super) {
    __extends(Monster, _super);
    function Monster() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.SoundInterval = 120;
        _this.goldAdd = 0;
        return _this;
    }
    Object.defineProperty(Monster.prototype, "BuffComp", {
        get: function () { return this.buffComp; },
        enumerable: true,
        configurable: true
    });
    Monster.prototype.beforeCreate = function () {
        _super.prototype.beforeCreate.call(this);
        this.playerOrderZ = 1;
    };
    Monster.prototype.initComponent = function () {
        _super.prototype.initComponent.call(this);
        this.config = ConfigManager.GetInstance().GetMonsterConfig(this.playerID);
        // let url = this.config.ImagePath;
        this.viewComp = new SpineViewComponent(this.config.SpineConfigID); //new ImageViewComponent(url);//怪物试图 骨骼动画
        this.hitComp = new MonsterHitComponent2D(); //怪物攻击处理
        this.skillComp = new MonsterSkillComponent2D(); //怪物技能
        this.monsterEffectComp = new MonsterEffectComponent2D(); //怪物特效
        this.monsterMoveComp = new MonsterMoveComponent2D(); //怪物移动
        this.monsterBulletComp = new MonsterBulletComponent2D(EnumBulletOutLookType.MonsterBullet); //怪物点
        this.attributeComp = new MonsterAttributeComponent(); //怪物属性
        this.buffComp = new BuffComponent(); //怪物buff
        this.hpBarComp = new MonsterHpBarComponent(); //怪物血条
        this.shakeComp = new MonsterShakeComponent(); //怪物颤动
        this.addComponent(this.viewComp);
        this.addComponent(this.hitComp);
        this.addComponent(this.monsterEffectComp);
        this.addComponent(this.monsterMoveComp);
        this.addComponent(this.monsterBulletComp);
        this.addComponent(this.skillComp);
        this.addComponent(this.attributeComp);
        this.addComponent(this.buffComp);
        this.addComponent(this.hpBarComp);
        this.addComponent(this.shakeComp);
        this.comParent.x = this.viewWidth + 500;
        this.comParent.y = this.viewHeight + 500;
        //this.hitComp.startCheckHit();
    };
    /*
  // **/
    //   public getBulletInfo(arr_BulletInfoList): void {
    //     // this.skillComp.GetSkill(EnumMonsterPowerType.BringMoney).setBulletArray(arr_BulletInfoList);
    //   }
    //怪物的碰撞大小
    Monster.prototype.GetCollisionShapeInfo = function (attacking) {
        if (attacking === void 0) { attacking = false; }
        var scale = this.attributeComp.Scale; //巨化后,碰撞大小改变
        var pos = CommonUtil2D.GetPosUnderTargetObj(this.comParent, StageManager.GetInstance().playerParent, this);
        // console.log(pos);
        if (this.tempBoxCollisionInfo == null)
            this.tempBoxCollisionInfo = new BoxCollisonInfo(null, null);
        this.tempBoxCollisionInfo.center = new Vec2(pos.x, pos.y);
        this.tempBoxCollisionInfo.size = new Vec2((attacking ? this.config.AttackingColliderSize[0] : this.config.ColliderSize[0]) * scale.x, (attacking ? this.config.AttackingColliderSize[1] : this.config.ColliderSize[1]) * scale.y);
        this.tempBoxCollisionInfo.rotation = this.viewComp.View.rotation;
        return this.tempBoxCollisionInfo;
    };
    Monster.prototype.Die = function () {
        var _this = this;
        _super.prototype.Die.call(this);
        //是否有死亡触发技能, 技能结束后在回调
        var skillsOnDie = this.attributeComp.GetOnDieSkills();
        //技能结束执行回调
        var skillendCount = 0;
        var onSkillEnd = function () {
            if (skillendCount == skillsOnDie.length) {
                _this.explode(); //爆炸
                var monsterInfo = new MonsterDieInfo(_this.playerID, _this.PlayerPos, _this.attributeComp.MonsterLvl, _this.config, _this.attributeComp.CanSpawnProp); //先记录, 在回收
                PlayerManager.GetInstance().RecycleMonster(_this.playerID, _this);
                monsterInfo.GoldADD += _this.goldAdd;
                Facade.instance.sendNotification(NotificationNames.MONSTER_DIE, monsterInfo);
            }
        };
        //等待死亡技能结束
        var isNotLastMonster = true; // GameDataManager.getInstance().LevelInfo.CurMatchProgressInfo.MonsterLeftNum > 1
        if (skillsOnDie.length > 0 && isNotLastMonster) {
            for (var index = 0; index < skillsOnDie.length; index++) {
                var skillId = skillsOnDie[index].Type;
                this.skillComp.End(skillId, function () {
                    skillendCount++;
                    onSkillEnd();
                });
            }
        }
        else {
            skillendCount = skillsOnDie.length;
            onSkillEnd();
        }
    };
    Monster.prototype.explode = function () {
        var fx = this.monsterEffectComp.showEffect(0, //播放特效
        EnumSpineConfigID.SkillMissileExplode, StageManager.GetInstance().playerParent, CommonUtil2D.GetPosUnderTargetObj(this.comParent, StageManager.GetInstance().playerParent));
        this.monsterEffectComp.setEffectScale(3, 3, fx);
        //音效
        AudioManager.GetInstance().PlaySoundByConfigID(EnumSoundID.sound_fight_monster_01);
    };
    Monster.prototype.InitPool = function (pool, configId) {
        this.playerID = configId;
        this.initComponent();
        this.comParent.visible = false;
    };
    Monster.prototype.OnSpawn = function (param) {
        this.uId = IDGenerator.GenMonsterID();
        this.comParent.name = this.uId.toString();
        this.soundEffectPlayTimeStamp = 0;
        this.lastHitFxPlayTimeStamp = 0;
        this.attributeComp.Init(param); //设置属性 只是设置默认1级的属性
        this.GoLive();
        this.hitComp.startCheckHit();
        //分裂等级
        this.state = EnumPlayerState.Live;
        this.buffComp.Reset();
        //血条
        this.hpBarComp.SetProgress(1);
        this.hpBarComp.SetSkillIcons(this.attributeComp.MonsterSkillConfigs);
        this.hpBarComp.SetActive(false);
        //缩放
        this.RefreshScale();
        //开始技能
        var skills = this.attributeComp.MonsterSkillConfigs;
        for (var index = 0; index < skills.length; index++) {
            var skillConfig = skills[index];
            this.skillComp.Start(skillConfig.Type, skillConfig); //////////////////////开始技能
        }
        if (PlayerManager.GetInstance().MainPlayer.BuffComp.ContainBuff(EnumBuffType.Weaken)) {
            //如果玩家正在弱化怪物的buff下, 新生怪物也弱化
            this.OnPauseBuff(true);
        }
        // Log.Debug("monster on spanw scale: %f, %f", this.viewComp.View.scaleX, this.viewComp.View.scaleY)
    };
    Monster.prototype.OnRecycle = function () {
        this.showShapCom.ShowShape(false);
        this.hitComp.stopCheckHit();
        // this.comParent.visible = false;
        this.monsterMoveComp.monsterStop();
        this.buffComp.Reset();
        //停止技能
        this.skillComp.stopAll();
        this.hpBarComp.OnRecycle(); //停止血条
        this.shakeComp.OnRecycle(); //停止震动
    };
    Monster.prototype.OnDestory = function () {
        this.DestroyPlayer();
    };
    /**
     * 麻痹怪物
     * @param active
     */
    Monster.prototype.Freeze = function (active) {
        this.monsterMoveComp.monsterPause(active);
    };
    /**
     * 怪物受到攻击[子弹, 技能]
     * @param hitPoint 减少hp
     * 返回 true:死亡
     */
    Monster.prototype.GetHit = function (hitPoint) {
        // Log.Debug("怪物%i, uid: %i,  当前血量:%i, 受攻击减少血量%i,", this.playerID, this.UID, this.attributeComp.CurHP, hitPoint)
        var skills = this.attributeComp.MonsterSkillConfigs;
        if (this.attributeComp.ReduceHp(hitPoint)) {
            this.hpBarComp.SetProgress(0);
            //减血为0 死亡
            //送钱怪物逻辑
            var skill_Bring = this.skillComp.GetSkill(EnumMonsterPowerType.BringMoney);
            if (skill_Bring) {
                this.skillComp.GetSkill(EnumMonsterPowerType.BringMoney).getMoney(true);
            }
            this.Die();
            return true;
        }
        else {
            //hp没到0
            //送钱怪物逻辑
            var skill_Bring = this.skillComp.GetSkill(EnumMonsterPowerType.BringMoney);
            if (skill_Bring) {
                this.skillComp.GetSkill(EnumMonsterPowerType.BringMoney).getMoney(false);
            }
            this.hpBarComp.SetActive(true);
            this.hpBarComp.SetProgress(this.attributeComp.CurHP / this.attributeComp.MaxHP);
            return false;
        }
    };
    /**
     * 被玩家子弹击中
     */
    Monster.prototype.OnBulletCollison = function () {
        var nowDate = Date.now();
        //1. 播放音效
        //2019-6-14 15:22:20 新需求 被击音效间隔
        if (nowDate - this.soundEffectPlayTimeStamp >= this.SoundInterval) {
            AudioManager.GetInstance().PlaySoundByConfigID(EnumSoundID.sound_fight_bullet_crash);
            this.soundEffectPlayTimeStamp = nowDate;
        }
        //2. 播放特效 间隔ConstDefine.HIT_FX_PLAY_INTERVAL内不重复播放
        if (nowDate - this.lastHitFxPlayTimeStamp >= ConstDefine.HIT_FX_PLAY_INTERVAL) {
            var hitPos = CommonUtil2D.GetPosUnderTargetObj(this.comParent, StageManager.GetInstance().playerParent);
            hitPos.x += Math.random() * 30 * Math.pow(-1, Math.floor(Math.random() * 10));
            hitPos.y += Math.random() * 30 * Math.pow(-1, Math.floor(Math.random() * 10));
            var skeleton = this.monsterEffectComp.showEffect(0, EnumSpineConfigID.SkillMissileExplode, StageManager.GetInstance().playerParent, hitPos);
            //3. 显示血条
            var localPos = new Vec2(0, 0);
            var config = ConfigManager.GetInstance().GetSpineConfig(EnumSpineConfigID.SkillMissileExplode);
            var posY = localPos.y - config.SpineSize[1] * 0.5 + config.SpineSize[1] / 15 * this.viewComp.View.scaleX;
            this.hpBarComp.SetPosOnExpode(localPos.x, posY);
            //调整显示
            var skill = this.skillComp.GetSkill(EnumMonsterPowerType.BringMoney);
            if (skill) {
                skill.setPos(0 - config.SpineSize[1] / 10 * this.viewComp.View.scaleX);
            }
            //4. shake
            if (ConstDefine.USE_MODIFY)
                this.shakeComp.Shake();
            this.lastHitFxPlayTimeStamp = nowDate;
        }
    };
    /**
     * 恢复血量
     * @param recoverHp
     */
    Monster.prototype.RecoverHp = function (recoverHp) {
        if (this.attributeComp.CurHP == this.attributeComp.MaxHP)
            return;
        this.attributeComp.IncreaseHp(recoverHp);
        this.hpBarComp.SetProgress(this.attributeComp.CurHP / this.attributeComp.MaxHP);
    };
    /**
     * 设置子怪物的血量和大小
     * @param maxHpScale 缩放到原来的比例
     * @param sizeScale
     */
    Monster.prototype.ResetSizeAndHp = function (hpScale, sizeScale) {
        this.attributeComp.SetMaxHpAndSize(hpScale, sizeScale);
        this.RefreshScale();
    };
    /**
     * 设置位移
     * @param offset 位移值
     */
    Monster.prototype.PushBack = function (offsetx, offsety) {
        var curPos = this.PlayerPos;
        var x = curPos.x + offsetx;
        var y = Math.max(0, curPos.y + offsety); //不退出屏幕
        this.setPlayerPos(x, y);
    };
    /**
     * 巨化怪物等会改变尺寸
     */
    Monster.prototype.RefreshScale = function () {
        this.viewComp.setViewScale(this.attributeComp.Scale.x, this.attributeComp.Scale.y);
        //调整血条位置
        this.hpBarComp.SetPos(0, 0);
        this.showShapCom.ShowShape();
    };
    /**
     * 道具的弱化技能buff
     * @param active true:弱化. false: 强化
     */
    Monster.prototype.OnPauseBuff = function (pause) {
        //不停止怪物技能
        // //停止非死亡技能
        // let skills = this.attributeComp.GetOnDieSkills(true);//.MonsterSkills;
        // if (pause) {
        //   // this.skillComp.stopAll();
        //   for (let index = 0; index < skills.length; index++) {
        //     this.skillComp.Stop(skills[index].Type)
        //   }
        // } else {
        //   //开始技能:非死亡技能
        //   for (let index = 0; index < skills.length; index++) {
        //     this.skillComp.Start(skills[index].Type, skills[index])
        //   }
        // }
        this.viewComp.Pause(pause);
    };
    /**
     * 游戏结束, 停止技能
     */
    Monster.prototype.OnGameComplete = function () {
        this.skillComp.stopAll();
    };
    return Monster;
}(PlayerBase2D));
//# sourceMappingURL=Monster.js.map