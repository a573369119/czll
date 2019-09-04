/*
* 子舰: 外形和属性可设置
*/
class ChildPlane extends Plane implements IScriptPoolObject<ChildPlane> {

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
        let url = ConfigManager.GetInstance().GetWeaponConfig(ConstDefine.CHILD_PLANE_CONFIG_ID).weaponSkin;
        this.viewComp = new ImageViewComponent(url);
        this.addComponent(this.viewComp);
        //子弹控制
        this.bulletComp = new BulletComponent2D(EnumBulletOutLookType.ChildPlaneBullet);
        this.addComponent(this.bulletComp);

        this.comParent.name = "ChildPlane" + CommonUtil.GetUID();
    }


    public InitPool(pool: ScriptObjectPool<ChildPlane>, param?: any) {
        this.initComponent();
        this.viewComp.SetActive(false)//初始化不显示
    }

    public OnSpawn() {
        this.viewComp.SetActive(true)
        this.bulletComp.OnEnterMatch(GameDataManager.getInstance().LoginPlayerInfo.MainWeaponInfo.level);
        this.mediatorName = this.comParent.name;
        Facade.instance.registerMediator(this)
    }
    public OnRecycle() {
        this.viewComp.SetActive(false)
        this.bulletComp.OnExitMatch();
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
            NotificationNames.SLOT_FORCE_OCCUPIED,
            NotificationNames.SLOT_INTERVAL_CHANGED,
        ];
    }
    handleNotification(notification: puremvc.INotification) {
        super.handleNotification(notification);
        switch (notification.getName()) {

            case NotificationNames.SLOT_FORCE_OCCUPIED:
                {
                    let slotIndex = notification.getBody() as number;
                    if (this.slotIndex == slotIndex) {
                        //自己的槽位被抢走, 需要重新找位置
                        let slotIndex = PlayerManager.GetInstance().MainPlayer.SlotComp.getEmpetySlot();
                        this.PlayMoveSlotAnim(slotIndex)
                    }
                    break;
                }
            case NotificationNames.SLOT_INTERVAL_CHANGED:
                {
                    this.PlayMoveSlotAnim(this.slotIndex)
                    break;
                }
        }
    }


    //////////////////////////////////////////////////////////////////////////////////////////////////////
    //逻辑
    private duration: number;//存活时间
    private attackDamage: number; //子弹攻击伤害
    private slotIndex: number;//子飞机所在位置
    public set Duration(value: number) { this.duration = value; }//10; }//
    public get Duration(): number { return this.duration; }
    public set AttackDamage(value: number) { this.attackDamage = value; }//20; }//
    public get AttackDamage(): number { return this.attackDamage; }
    public get SlotIndex(): number { return this.slotIndex; }

    private curLiveTimePassed: number;  //当前子飞机的存活时间, 不包含入场和退出动画
    public IsTimeUp(): boolean { return this.curLiveTimePassed >= this.duration; }//是否存活超时

    private curTweenId: number = -1;//动画id

    public start(slotIndex: number, parent: PlayerBase2D) {
        this.curLiveTimePassed = 0;
        this.curTweenId = -1;
        AudioManager.GetInstance().PlaySoundByConfigID(EnumSoundID.sound_fight_warship)
        //播放动画, 之后开始飞机发射子弹
        this.playEnterAnim(slotIndex, parent, () => {
            this.EnableShoot(true);
        })
    }

    //玩家死亡/游戏结束, 立刻结束
    public stop() {
        this.EnableShoot(false);
        this.stopAnim();
        //回收子飞机
        GamePoolManager.Instance.Recycle<ChildPlane>(this, ChildPlaneWeapon.GetPoolID());
    }

    //技能时间到终止
    public end() {
        this.EnableShoot(false);
        //播放退出动画, 之后执行stop
        this.playExitAnim(() => {
            this.curTweenId = -1;
            this.stop();
        });
    }

    //技能开始前播放动画, 移动到目标位置
    private playEnterAnim(slotIndex: number, parent: PlayerBase2D, onEnd: Function) {
        //添加到父节点, 放在父节点位置
        parent.comParent.addChild(this.comParent)
        this.setPlayerPos(0, 0)

        //移动
        this.PlayMoveSlotAnim(slotIndex, onEnd)
    }
    //切换位置动画
    private PlayMoveSlotAnim(slotIndex: number, onEnd?: Function) {
        if (this.curTweenId >= 0) this.stopAnim();
        let targetPos = this.getPosBySlot(slotIndex);
        this.curTweenId = Tween2DUtil.getInst().to({
            node: this.comParent,
            duration: 1,
            delay: 0,
            x: targetPos.x,
            y: targetPos.y,
            // rotation: 20,
            tweenFunc: TweenFunc.Sine.easeInOut,
            onComplete: onEnd ? cbhandler.gen_handler(() => { onEnd(); }, this) : null,
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
            onComplete: cbhandler.gen_handler(() => { onEnd(); }, this)
        })
    }
    //停止当前动画
    private stopAnim() {
        if (this.curTweenId >= 0) Tween2DUtil.getInst().kill(this.curTweenId)
        this.curTweenId = -1;
    }


    public Update(dt: number) {
        this.curLiveTimePassed += dt;
    }


    public EnableShoot(active: boolean) {
        //发射子弹
        this.bulletComp.EnableFire = active;
    }

    /////////////////////////////////////////////////////////////////
    //util
    //获取子飞机目标位置, 在player节点下的位置
    private getPosBySlot(slotIndex: number): Vec2 {
        this.slotIndex = slotIndex;
        // let childSize = this.GetSize();

        // let parentPos = new Vec2(0, 0);// player.PlayerPos;
        // let interval = 10;//子飞机之间间隔
        // let left = slotIndex % 2 == 0;
        // let index = Math.floor(slotIndex / 2) + 1; //1, 2...
        // let childPosX = parentPos.x + (left ? -1 : 1) * ((player.ViewSize.x - childSize.x) * 0.5 + index * (childSize.x + interval));
        // let childPosY = 0;/// parentPos.y + (left ? -1 : 1) * (player.ViewSize.y + index * (childSize.y)) * 0.5;

        // return new Vec2(childPosX, childPosY);

        return PlayerManager.GetInstance().MainPlayer.SlotComp.getChildPlaneRelativePosBySlotIndex(slotIndex, this.GetSize())
    }

    public GetSize(): Vec2 {
        return this.viewComp.ViewSize;
    }
}