/*
* 呼叫支援
*/
class AlliancePlane extends Plane implements IScriptPoolObject<AlliancePlane> {
    private buffComp: BuffComponent;
    public get BuffComp(): BuffComponent { return this.buffComp; }
    public beforeCreate(): void {
        // this.playerOrderZ = ZOrderDefine.MAINPLAYER;
    }

    public initComponent(): void {
        super.initComponent();
        //出生点
        let config = ConfigManager.GetInstance().GetMainPlayerConfig();
        this.comParent.x = config.BirthPoint[0];
        this.comParent.y = config.BirthPoint[1];

        //视图组件
        let url = ConfigManager.GetInstance().GetWeaponConfig(GameDataManager.getInstance().LoginPlayerInfo.CurSideWeaponID).weaponSkin;
        this.viewComp = new ImageViewComponent(url);
        (this.viewComp as ImageViewComponent).changeStyle(this.comParent);//改变样式 -mb
        this.addComponent(this.viewComp);
        //子弹控制
        this.bulletComp = new BulletComponent2D(EnumBulletOutLookType.MainPlayerBullet);
        this.addComponent(this.bulletComp);
        //buff
        this.buffComp = new BuffComponent();
        this.addComponent(this.buffComp);

        this.comParent.name = "AlliancePlane" + CommonUtil.GetUID();
    }


    public InitPool(pool: ScriptObjectPool<AlliancePlane>, param?: any) {
        this.initComponent();
        this.viewComp.SetActive(false)//初始化不显示
    }

    public OnSpawn() {
        this.viewComp.SetActive(true)
        this.bulletComp.OnEnterMatch(GameDataManager.getInstance().LoginPlayerInfo.MainWeaponInfo.level);
        this.buffComp.Reset();
        this.mediatorName = this.comParent.name;
        Facade.instance.registerMediator(this)
    }
    public OnRecycle() {
        this.viewComp.SetActive(false)
        this.bulletComp.OnExitMatch();
        this.buffComp.stopAll();
        Facade.instance.removeMediator(this.mediatorName)
    }
    public OnDestory() {
        this.DestroyPlayer();
    }
    ///////////////////////////////////////////////////////////////////////////////////
    //Mediator 
    listNotificationInterests() {
        super.listNotificationInterests();
        return [
            NotificationNames.UI_OnPropBuff,
        ];
    }
    handleNotification(notification: puremvc.INotification) {
        super.handleNotification(notification);
        switch (notification.getName()) {

            case NotificationNames.UI_OnPropBuff:
                {
                    let playerbuff = notification.getBody() as PlayerBuffInfo;
                    let buffId = playerbuff.BuffType;
                    if (playerbuff.Active) {
                        this.addBuff(buffId)
                    } else {
                        this.buffComp.stopBuff(buffId)
                    }
                    break;
                }
        }
    }

    private copyBuffFromMain() {
        let mainPlayer = PlayerManager.GetInstance().MainPlayer;
        let allbuff = mainPlayer.BuffComp.AllBuffs;
        for (let index = 0; index < allbuff.length; index++) {
            let buffId = allbuff[index];
            this.addBuff(buffId)
        }
    }

    private addBuff(buffId: EnumBuffType) {
        let config = ConfigManager.GetInstance().GetBuffConfig(buffId);
        if (config.copy) this.buffComp.AddBuff(buffId, null)
        //if (buffId != EnumBuffType.CallAlliance) this.buffComp.AddBuff(buffId, null)
    }
    //////////////////////////////////////////////////////////////////////////////////////////////////////
    //逻辑

    private curTweenId: number = -1;//动画id
    private slotIndex: number = -1;//所占用槽位

    public start(parent: PlayerBase2D) {
        this.curTweenId = -1;
        //播放动画, 之后开始飞机发射子弹
        this.playEnterAnim(parent, () => {
            this.EnableShoot(true);
            this.copyBuffFromMain();
        })
    }

    //玩家死亡/游戏结束, 立刻结束
    public stop() {
        this.EnableShoot(false);
        this.stopAnim();
        this.clearSlot();
        //回收子飞机
        GamePoolManager.Instance.Recycle<AlliancePlane>(this, CallAllianceBuff.GetPoolID());
    }

    //技能时间到终止
    public end(onEndComplete: Function) {
        this.EnableShoot(false);
        this.clearSlot();
        //播放退出动画, 之后执行stop
        this.playExitAnim(() => {
            this.curTweenId = -1;
            this.stop();
            onEndComplete();
        });
    }

    //技能开始前播放动画, 移动到目标位置
    private playEnterAnim(parent: PlayerBase2D, onEnd: Function) {
        if (this.curTweenId >= 0) this.stopAnim();

        //添加到父节点, 放在父节点位置
        parent.comParent.addChild(this.comParent)
        this.setPlayerPos(0, 0)

        //移动
        this.occupySlot();
        let targetPos = PlayerManager.GetInstance().MainPlayer.SlotComp.getAlliancePlaneRelativePos(); //this.TARGET_POS;
        this.curTweenId = Tween2DUtil.getInst().to({
            node: this.comParent,
            duration: 1,
            delay: 0,
            x: targetPos.x,
            y: targetPos.y,
            // rotation: 20,
            tweenFunc: TweenFunc.Sine.easeInOut,
            onComplete: cbhandler.gen_handler(() => { onEnd(); }, this)
        })

    }
    //技能时间到, 播放退出动画.
    private playExitAnim(onEnd: Function) {
        if (this.curTweenId >= 0) this.stopAnim();
        // this.AddToStage();//切换到玩家节点下
        CommonUtil2D.ChangeToGrandParent(this.comParent, this.comParent.parent.parent as Laya.Sprite)

        this.curTweenId = Tween2DUtil.getInst().to({
            node: this.comParent,
            duration: 1,
            delay: 0,
            y: -10, //出屏幕
            tweenFunc: TweenFunc.Sine.easeInOut,
            onComplete: cbhandler.gen_handler(() => {
                onEnd();
            }, this)
        })
    }
    //停止当前动画
    private stopAnim() {
        if (this.curTweenId >= 0) Tween2DUtil.getInst().kill(this.curTweenId)
        this.curTweenId = -1;
    }

    public EnableShoot(active: boolean) {
        //发射子弹
        this.bulletComp.EnableFire = active;
    }

    /////////////////////////////////////////////////////////////////
    //util
    private occupySlot() {
        this.slotIndex = 0;
        PlayerManager.GetInstance().MainPlayer.SlotComp.ForceOccupySlot(this.slotIndex, EnumSlotType.Alliance)
    }
    private clearSlot() {
        if (this.slotIndex >= 0) {
            PlayerManager.GetInstance().MainPlayer.SlotComp.ClearSlot(this.slotIndex, EnumSlotType.Alliance)
        }
    }
}