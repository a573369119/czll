/*
* name;
*/
class MainPlayer extends Plane {

  // protected bg: Laya.Image; //2D模型
  // protected effectComp: PlayerEffectComponent2D
  protected inputComp: InputComponent2D;
  // public bulletComp: BulletComponent2D;
  private skillComp: PlayerSkillComponent2D;

  private buffComp: BuffComponent;
  public hitComp: PlayerHitComponent;
  private slotComp: PlayerSlotComponent;
  private tailComp: TailComponent;
  private animComp: PlayerAnimComponent;
  public get SkillComp(): PlayerSkillComponent2D { return this.skillComp; }
  public get BuffComp(): BuffComponent { return this.buffComp; }
  public get SlotComp(): PlayerSlotComponent { return this.slotComp; }

  public GuideBubble: ui.PrefabUI.GuideItemPrefabUI;
  public playerAnimTask: number;

  public beforeCreate(): void {

    //主角的层级提高，因为特效要压过其他角色
    this.playerOrderZ = ZOrderDefine.MAINPLAYER;
  }

  public initComponent(): void {
    super.initComponent();
    //视图组件
    let weaponConfig = ConfigManager.GetInstance().GetWeaponConfig(GameDataManager.getInstance().LoginPlayerInfo.CurSideWeaponID);
    this.viewComp = new ImageViewComponent(weaponConfig.weaponSkin);
    //特效组件
    // this.effectComp = new PlayerEffectComponent2D();
    //输入控制控制组件
    this.inputComp = new InputComponent2D();
    //子弹控制
    this.bulletComp = new BulletComponent2D(EnumBulletOutLookType.MainPlayerBullet);
    //技能
    this.skillComp = new PlayerSkillComponent2D();
    this.buffComp = new BuffComponent();
    this.hitComp = new PlayerHitComponent();
    this.slotComp = new PlayerSlotComponent();
    //新手引导气泡
    this.GuideBubble = new ui.PrefabUI.GuideItemPrefabUI();
    this.comParent.addChild(this.GuideBubble);
    this.GuideBubble.centerX = 0;
    this.GuideBubble.bottom = - 200;
    this.GuideBubble.visible = false;
    //尾部动画
    this.tailComp = new TailComponent(GameDataManager.getInstance().LoginPlayerInfo.CurSideWeaponID)
    this.tailComp.SetTailPosByWeapon(weaponConfig)
    this.animComp = new PlayerAnimComponent()

    // this.addComponent(this.effectComp);
    this.addComponent(this.viewComp);
    this.addComponent(this.inputComp);
    this.addComponent(this.bulletComp);
    this.addComponent(this.skillComp);
    this.addComponent(this.buffComp);
    this.addComponent(this.hitComp);
    this.addComponent(this.slotComp);
    this.addComponent(this.tailComp);
    this.addComponent(this.animComp);

    this.comParent.name = "MainPlayers"
    // this.comParent.zOrder = 1000;

    PlayerManager.GetInstance().MainPlayer = this;
    this.MoveToBirthPoint();
    this.inputComp.SetActive(false)

    this.showShapCom.ShowShape();

    //动画任务
    this.playerAnimTask = -1;
  }

  //玩家的碰撞盒大小
  public GetCollisionShapeInfo(): CollsionShapInfo {
    let size = ConfigManager.GetInstance().GetWeaponConfig(GameDataManager.getInstance().LoginPlayerInfo.CurSideWeaponID).ColliderSize;
    let pos = CommonUtil2D.GetPosUnderTargetObj(this.comParent, StageManager.GetInstance().playerParent);
    return new BoxCollisonInfo(new Vec2(pos.x, pos.y), new Vec2(size[0], size[1]))
  }

  //玩家进入比赛处理
  public OnEnterMatch() {
    this.GoLive();
    this.bulletComp.OnEnterMatch(GameDataManager.getInstance().LoginPlayerInfo.MainWeaponInfo.level);
    this.slotComp.OnEnterMatch();
    //根据是否为第一关，决定新手引导气泡的显示状态
    this.GuideBubble.visible = GameDataManager.getInstance().LoginPlayerInfo.CurLevel == 1;
  }

  //比赛开始
  public OnMatchStart() {
    this.SetComponentOn(true, true)
    if (this.inputComp.MouseDown) this.bulletComp.EnableFire = true;

  }

  //玩家死亡
  public Die() {
    super.Die();
    this.comParent.visible = true;
    this.sendNotification(NotificationNames.BackgroundUI_BgMoveEnd);
    this.SetComponentOn(false, false)
  }

  //玩家复活
  public Reborn() {
    //3s后恢复碰撞
    this.animComp.PlayRebornAlphaAnim(() => {
      this.hitComp.SetCollisionMode(EnumPlayerCollisionMode.All)
    }, ConstDefine.REBORN_DURATION);
    // TimeManager.getInst().once(3, cbhandler.gen_handler(() => {
    // }))
    this.GoLive();
    // this.OnMatchStart();
    this.SetComponentOn(true, false)
    // this.hitComp.startCheckHit();
    this.hitComp.SetCollisionMode(EnumPlayerCollisionMode.PropOnly)
    this.sendNotification(NotificationNames.BackgroundUI_BgMoveStart);

  }

  //没选择重生
  public Explode() {
    this.comParent.visible = false;
    AudioManager.GetInstance().PlaySoundByConfigID(EnumSoundID.sound_fight_warcraft_boom)
    // AudioManager.GetInstance().PlaySound(AudioClipNames.Sound_Fight_Warcraft_Boom);
    this.effectComp.showEffect(0, EnumSpineConfigID.SkillMissileExplode, null, null, null, new Vec2(3, 3));
  }

  //比赛结算:怪物消灭, 玩家没有重生
  public OnMatchComplete() {
    this.SetComponentOn(false, true)
    //移出屏幕
    this.MoveOutOfScreen();
  }

  //玩家退出比赛处理
  public OnExitMathch() {
    this.bulletComp.OnExitMatch();
    this.slotComp.OnExitMatch();
    this.MoveToBirthPoint(); //回到出生点
    this.comParent.visible = true;//恢复可见, 爆炸中消失
    WechatUtil.getIntance().triggerGC();
    this.GuideBubble.visible = false;
  }

  //设置组件的状态, buff组件在玩家死亡后暂时保留skill&buff状态
  private SetComponentOn(active: boolean, skillAndBuffIncl: boolean) {
    if (active) {
      //this.bulletComp.EnableFire = true; //复活后不需要离开自动开火
      if (skillAndBuffIncl) this.SkillComp.Start();
      if (skillAndBuffIncl) this.buffComp.Reset();
      this.hitComp.startCheckHit();
      this.inputComp.SetActive(true)
    } else {
      this.bulletComp.EnableFire = false;
      if (skillAndBuffIncl) this.SkillComp.Stop();
      if (skillAndBuffIncl) this.BuffComp.stopAll();
      this.hitComp.stopCheckHit();
      this.inputComp.SetActive(false)
    }
  }
  //设置到出生点位置
  private MoveToBirthPoint() {
    //根据战斗状态，决定播放哪一种动画
    let config = ConfigManager.GetInstance().GetMainPlayerConfig();
    //2019-6-17 20:14:40 将飞机放在屏幕中间

    this.comParent.x = Laya.stage.width / 2;//config.BirthPoint[0];
    this.comParent.y = config.BirthPoint[1];
  }

  //从当前位置移出屏幕
  private MoveOutOfScreen() {
    //2019-6-13 14:42:06 新需求 通过动画移动到出生点
    this.CancelCameraAnim();
    this.playerAnimTask = Tween2DUtil.getInst().to({
      node: this.comParent,
      duration: 1.5,
      delay: 1,
      y: -500 - this.comParent.height,
      onComplete: cbhandler.gen_handler(() => {
        this.playerAnimTask = -1;
      }, this)
    })
  }

  public EnterHomepageScene() {
    //2019-6-13 14:42:06 新需求 通过动画移动到出生点
    //音乐初始化
    AudioManager.GetInstance().InitAudioSetting();  //音乐相关初始化
    this.CancelCameraAnim();
    let config = ConfigManager.GetInstance().GetMainPlayerConfig();
    this.comParent.x = Laya.stage.width / 2;//config.BirthPoint[0];
    this.comParent.y = 1920 + this.comParent.height;
    //消失标签
    this.sendNotification(NotificationNames.HomepageUI_HidenText);
    this.playerAnimTask = Tween2DUtil.getInst().to({
      node: this.comParent,
      duration: 1.5,
      x: Laya.stage.width / 2,//config.BirthPoint[0],
      y: config.BirthPoint[1],
      onComplete: cbhandler.gen_handler(() => {
        //2019-6-14 17:16:25 新需求 进入主页场景的动画效果
        this.sendNotification(NotificationNames.BackgroundUI_HomepageEnter);
        this.sendNotification(NotificationNames.BackgroundUI_BgMoveEnd);//-mb地图停止滚动
        this.playerAnimTask = Tween2DUtil.getInst().to({
          node: this.comParent,
          duration: 1,
          scalex: ConstDefine.Plane_Homepage_Scale,
          scaley: ConstDefine.Plane_Homepage_Scale,
          onComplete: cbhandler.gen_handler(() => {
            this.sendNotification(NotificationNames.HomepageUI_ShowText);
            this.playerAnimTask = -1;
          }, this)
        })
      }, this)
    })
  }

  public EnterBattleScene() {
    //2019-6-14 17:16:25 新需求 进入战斗场景的动画效果
    this.CancelCameraAnim();
    let config = ConfigManager.GetInstance().GetMainPlayerConfig();
    this.comParent.x = Laya.stage.width / 2;//config.BirthPoint[0];
    this.comParent.y = config.BirthPoint[1];
    this.sendNotification(NotificationNames.BackgroundUI_BattleEnter);
    //消失标签
    this.sendNotification(NotificationNames.HomepageUI_HidenText);
    //地图移动
    this.sendNotification(NotificationNames.BackgroundUI_BgMoveStart);
    this.playerAnimTask = Tween2DUtil.getInst().to({
      node: this.comParent,
      duration: 1,
      scalex: 1,
      scaley: 1,
      onComplete: cbhandler.gen_handler(() => {
        this.playerAnimTask = -1;
      }, this)
    })
  }

  private CancelCameraAnim() {
    if (this.playerAnimTask != -1) {
      Tween2DUtil.getInst().kill(this.playerAnimTask);
      this.playerAnimTask = -1;
    }
  }


  //武器切换后, 改变形象
  public ChangeView(sideWeaponID: number) {
    let config = ConfigManager.GetInstance().GetWeaponConfig(sideWeaponID);
    // this.viewComp.createView()/
    this.viewComp.ChangeView(config.weaponSkin);
    this.tailComp.SetTailPosByWeapon(config)
  }

  public SetAlpha(alpha: number) {
    // (this.viewComp.View as SpineViewComponent).view.alpha = 0.5
    //图片+ 尾部spine动画的alpha
  }


  public movePlayer(offsetX: number, offsetY: number): void {
    //判断是否在屏幕
    let posX = this.comParent.x - offsetX;
    let posY = this.comParent.y - offsetY;
    if (this.isPosInStage(posX, posY, true)) {
      this.comParent.x = posX;
      this.comParent.y = posY;
    }
  }

  /**
   * 更新皮肤
   */
  public updataSkin(): void {
    (this.viewComp as ImageViewComponent).updataSkin();
  }

}