/*
* name;
*/
class Monster extends PlayerBase2D implements IScriptPoolObject<Monster>{

  // 组件
  public hitComp: MonsterHitComponent2D;  //被攻击
  public skillComp: MonsterSkillComponent2D;  //技能
  public monsterEffectComp: MonsterEffectComponent2D;  //特效
  public monsterMoveComp: MonsterMoveComponent2D //移动
  public monsterBulletComp: MonsterBulletComponent2D //子弹
  /** 属性组件 - 所有的怪物数据配置 都在这里，拿 */
  public attributeComp: MonsterAttributeComponent;
  private buffComp: BuffComponent;//buff组件
  private hpBarComp: MonsterHpBarComponent;//血条
  private shakeComp: MonsterShakeComponent;
  private config: MonsterConfigConfigData;
  public get BuffComp(): BuffComponent { return this.buffComp; }

  private soundEffectPlayTimeStamp: number;
  private lastHitFxPlayTimeStamp: number;//最近一次受击特效播放时间
  private readonly SoundInterval = 120;
  public goldAdd: number = 0;

  public beforeCreate(): void {
    super.beforeCreate();
    this.playerOrderZ = 1;
  }

  public initComponent(): void {
    super.initComponent();
    this.config = ConfigManager.GetInstance().GetMonsterConfig(this.playerID)
    // let url = this.config.ImagePath;
    this.viewComp = new SpineViewComponent(this.config.SpineConfigID);//new ImageViewComponent(url);//怪物试图 骨骼动画
    this.hitComp = new MonsterHitComponent2D();//怪物攻击处理
    this.skillComp = new MonsterSkillComponent2D();//怪物技能
    this.monsterEffectComp = new MonsterEffectComponent2D();//怪物特效
    this.monsterMoveComp = new MonsterMoveComponent2D();//怪物移动
    this.monsterBulletComp = new MonsterBulletComponent2D(EnumBulletOutLookType.MonsterBullet);//怪物点
    this.attributeComp = new MonsterAttributeComponent();//怪物属性
    this.buffComp = new BuffComponent();//怪物buff
    this.hpBarComp = new MonsterHpBarComponent();//怪物血条
    this.shakeComp = new MonsterShakeComponent();//怪物颤动

    this.addComponent(this.viewComp);
    this.addComponent(this.hitComp);
    this.addComponent(this.monsterEffectComp);
    this.addComponent(this.monsterMoveComp);
    this.addComponent(this.monsterBulletComp);
    this.addComponent(this.skillComp);
    this.addComponent(this.attributeComp);
    this.addComponent(this.buffComp);
    this.addComponent(this.hpBarComp)
    this.addComponent(this.shakeComp)

    this.comParent.x = this.viewWidth + 500;
    this.comParent.y = this.viewHeight + 500;

    //this.hitComp.startCheckHit();

  }

  /*
// **/
  //   public getBulletInfo(arr_BulletInfoList): void {
  //     // this.skillComp.GetSkill(EnumMonsterPowerType.BringMoney).setBulletArray(arr_BulletInfoList);
  //   }

  //怪物的碰撞大小
  public GetCollisionShapeInfo(attacking: boolean = false): CollsionShapInfo {
    let scale = this.attributeComp.Scale; //巨化后,碰撞大小改变
    let pos = CommonUtil2D.GetPosUnderTargetObj(this.comParent, StageManager.GetInstance().playerParent, this);
    // console.log(pos);
    if (this.tempBoxCollisionInfo == null) this.tempBoxCollisionInfo = new BoxCollisonInfo(null, null);
    this.tempBoxCollisionInfo.center = new Vec2(pos.x, pos.y);
    this.tempBoxCollisionInfo.size = new Vec2((attacking ? this.config.AttackingColliderSize[0] : this.config.ColliderSize[0]) * scale.x,
      (attacking ? this.config.AttackingColliderSize[1] : this.config.ColliderSize[1]) * scale.y);
    this.tempBoxCollisionInfo.rotation = this.viewComp.View.rotation
    return this.tempBoxCollisionInfo;

  }

  public Die() {
    super.Die();
    //是否有死亡触发技能, 技能结束后在回调
    let skillsOnDie = this.attributeComp.GetOnDieSkills();

    //技能结束执行回调
    let skillendCount = 0;
    let onSkillEnd = () => {
      if (skillendCount == skillsOnDie.length) {
        this.explode();//爆炸
        let monsterInfo = new MonsterDieInfo(this.playerID, this.PlayerPos, this.attributeComp.MonsterLvl, this.config, this.attributeComp.CanSpawnProp); //先记录, 在回收
        PlayerManager.GetInstance().RecycleMonster(this.playerID, this)
        monsterInfo.GoldADD += this.goldAdd;
        Facade.instance.sendNotification(NotificationNames.MONSTER_DIE, monsterInfo)
        // Log.Debug("monster die")
      }
    }

    //等待死亡技能结束
    let isNotLastMonster = true;// GameDataManager.getInstance().LevelInfo.CurMatchProgressInfo.MonsterLeftNum > 1
    if (skillsOnDie.length > 0 && isNotLastMonster) {
      for (let index = 0; index < skillsOnDie.length; index++) {
        let skillId = skillsOnDie[index].Type;
        this.skillComp.End(skillId, () => {
          skillendCount++;
          onSkillEnd();
        })
      }
    } else {
      skillendCount = skillsOnDie.length
      onSkillEnd();
    }
  }

  private explode() {
    let fx = this.monsterEffectComp.showEffect(0,  //播放特效
      EnumSpineConfigID.SkillMissileExplode,
      StageManager.GetInstance().playerParent,
      CommonUtil2D.GetPosUnderTargetObj(this.comParent, StageManager.GetInstance().playerParent),
    );
    this.monsterEffectComp.setEffectScale(3, 3, fx);
    //音效
    AudioManager.GetInstance().PlaySoundByConfigID(EnumSoundID.sound_fight_monster_01)
  }


  InitPool(pool: ScriptObjectPool<Monster>, configId: number) {
    this.playerID = configId;
    this.initComponent();
    this.comParent.visible = false;
  }

  OnSpawn(param?: any) {
    this.uId = IDGenerator.GenMonsterID();
    this.comParent.name = this.uId.toString();
    this.soundEffectPlayTimeStamp = 0
    this.lastHitFxPlayTimeStamp = 0;
    this.attributeComp.Init(param);//设置属性 只是设置默认1级的属性
    this.GoLive();
    this.hitComp.startCheckHit();
    //分裂等级
    this.state = EnumPlayerState.Live;
    this.buffComp.Reset();
    //血条
    this.hpBarComp.SetProgress(1)
    this.hpBarComp.SetSkillIcons(this.attributeComp.MonsterSkillConfigs)
    this.hpBarComp.SetActive(false)
    //缩放
    this.RefreshScale();

    //开始技能
    let skills = this.attributeComp.MonsterSkillConfigs;
    for (let index = 0; index < skills.length; index++) {
      let skillConfig = skills[index];
      this.skillComp.Start(skillConfig.Type, skillConfig)//////////////////////开始技能
    }

    if (PlayerManager.GetInstance().MainPlayer.BuffComp.ContainBuff(EnumBuffType.Weaken)) {
      //如果玩家正在弱化怪物的buff下, 新生怪物也弱化
      this.OnPauseBuff(true)
    }
    // Log.Debug("monster on spanw scale: %f, %f", this.viewComp.View.scaleX, this.viewComp.View.scaleY)
  }

  OnRecycle() {
    this.showShapCom.ShowShape(false);
    this.hitComp.stopCheckHit();
    // this.comParent.visible = false;
    this.monsterMoveComp.monsterStop();
    this.buffComp.Reset();
    //停止技能
    this.skillComp.stopAll()
    this.hpBarComp.OnRecycle(); //停止血条
    this.shakeComp.OnRecycle();//停止震动
  }

  OnDestory() {
    this.DestroyPlayer();
  }

  /**
   * 麻痹怪物
   * @param active 
   */
  public Freeze(active: boolean) {
    this.monsterMoveComp.monsterPause(active)
  }

  /**
   * 怪物受到攻击[子弹, 技能]
   * @param hitPoint 减少hp
   * 返回 true:死亡
   */
  public GetHit(hitPoint: number): boolean {
    // Log.Debug("怪物%i, uid: %i,  当前血量:%i, 受攻击减少血量%i,", this.playerID, this.UID, this.attributeComp.CurHP, hitPoint)
    let skills = this.attributeComp.MonsterSkillConfigs;
    if (this.attributeComp.ReduceHp(hitPoint)) {
      this.hpBarComp.SetProgress(0)
      //减血为0 死亡
      //送钱怪物逻辑
      let skill_Bring = this.skillComp.GetSkill(EnumMonsterPowerType.BringMoney) as BringMoneySkill;
      if (skill_Bring) {
        (this.skillComp.GetSkill(EnumMonsterPowerType.BringMoney) as BringMoneySkill).getMoney(true);
      }
      this.Die();
      return true;
    } else {
      //hp没到0
      //送钱怪物逻辑
      let skill_Bring = this.skillComp.GetSkill(EnumMonsterPowerType.BringMoney) as BringMoneySkill;
      if (skill_Bring) {
        (this.skillComp.GetSkill(EnumMonsterPowerType.BringMoney) as BringMoneySkill).getMoney(false);
      }
      this.hpBarComp.SetActive(true)
      this.hpBarComp.SetProgress(this.attributeComp.CurHP / this.attributeComp.MaxHP)
      return false;
    }
  }

  /**
   * 被玩家子弹击中
   */
  public OnBulletCollison() {
    let nowDate = Date.now();
    //1. 播放音效
    //2019-6-14 15:22:20 新需求 被击音效间隔
    if (nowDate - this.soundEffectPlayTimeStamp >= this.SoundInterval) {
      AudioManager.GetInstance().PlaySoundByConfigID(EnumSoundID.sound_fight_bullet_crash)
      this.soundEffectPlayTimeStamp = nowDate
    }
    //2. 播放特效 间隔ConstDefine.HIT_FX_PLAY_INTERVAL内不重复播放
    if (nowDate - this.lastHitFxPlayTimeStamp >= ConstDefine.HIT_FX_PLAY_INTERVAL) {
      let hitPos: Vec2 = CommonUtil2D.GetPosUnderTargetObj(this.comParent, StageManager.GetInstance().playerParent);
      hitPos.x += Math.random() * 30 * Math.pow(-1, Math.floor(Math.random() * 10));
      hitPos.y += Math.random() * 30 * Math.pow(-1, Math.floor(Math.random() * 10));
      let skeleton = this.monsterEffectComp.showEffect(0,
        EnumSpineConfigID.SkillMissileExplode,
        StageManager.GetInstance().playerParent,
        hitPos
      );

      //3. 显示血条
      let localPos = new Vec2(0, 0)
      let config = ConfigManager.GetInstance().GetSpineConfig(EnumSpineConfigID.SkillMissileExplode);
      let posY = localPos.y - config.SpineSize[1] * 0.5 + config.SpineSize[1] / 15 * this.viewComp.View.scaleX;

      this.hpBarComp.SetPosOnExpode(localPos.x, posY)
      //调整显示
      let skill = this.skillComp.GetSkill(EnumMonsterPowerType.BringMoney) as BringMoneySkill;
      if (skill) {
        skill.setPos(0 - config.SpineSize[1] / 10 * this.viewComp.View.scaleX);
      }
      //4. shake
      if (ConstDefine.USE_MODIFY) this.shakeComp.Shake();
      this.lastHitFxPlayTimeStamp = nowDate;
    }
  }

  /**
   * 恢复血量
   * @param recoverHp 
   */
  public RecoverHp(recoverHp: number) {
    if (this.attributeComp.CurHP == this.attributeComp.MaxHP) return;
    this.attributeComp.IncreaseHp(recoverHp)
    this.hpBarComp.SetProgress(this.attributeComp.CurHP / this.attributeComp.MaxHP)
  }

  /**
   * 设置子怪物的血量和大小
   * @param maxHpScale 缩放到原来的比例
   * @param sizeScale 
   */
  public ResetSizeAndHp(hpScale: number, sizeScale: number) {
    this.attributeComp.SetMaxHpAndSize(hpScale, sizeScale);
    this.RefreshScale();
  }

  /**
   * 设置位移
   * @param offset 位移值
   */
  public PushBack(offsetx: number, offsety: number) {
    let curPos = this.PlayerPos;
    let x = curPos.x + offsetx;
    let y = Math.max(0, curPos.y + offsety);//不退出屏幕
    this.setPlayerPos(x, y)
  }

  /**
   * 巨化怪物等会改变尺寸
   */
  public RefreshScale() {
    this.viewComp.setViewScale(this.attributeComp.Scale.x, this.attributeComp.Scale.y)
    //调整血条位置
    this.hpBarComp.SetPos(0, 0)
    this.showShapCom.ShowShape();
  }


  /**
   * 道具的弱化技能buff
   * @param active true:弱化. false: 强化
   */
  public OnPauseBuff(pause: boolean) {
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
    (this.viewComp as SpineViewComponent).Pause(pause)
  }

  /**
   * 游戏结束, 停止技能
   */
  public OnGameComplete() {
    this.skillComp.stopAll()
  }
}