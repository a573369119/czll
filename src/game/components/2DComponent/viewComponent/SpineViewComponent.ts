/*
* 使用spine的
*/
class SpineViewComponent extends ViewComponentBase2D {

    public view: Laya.Skeleton;
    private spineConfigID: number;
    private viewSize: Vec2;//spine的碰撞盒大小
    public get ViewSize(): Vec2 { return new Vec2(this.viewSize.x * this.view.scaleX, this.viewSize.y * this.view.scaleY); }
    public get View(): any { return this.view; }
    constructor(spineConfigID: number) {
        super();
        this.spineConfigID = spineConfigID;
    }

    public createView() {
        // let url = ConfigManager.GetInstance().GetPlayerConfig(this.player.playerID).SpinePath;
        this.createSpineView(this.spineConfigID);
    }

    //切换形象
    public ChangeView(urlOrId?: any) {
        this.spineConfigID = urlOrId;
        this.showView();
    }

    protected createSpineView(spineConfigId: number) {
        // this.spineConfigID = spineConfigId;
        this.view = MatchSpineManager.Instance.Spawn(spineConfigId)
        //设置尺寸大小
        let config = ConfigManager.GetInstance().GetSpineConfig(spineConfigId);
        this.viewSize = new Vec2(config.SpineSize[0], config.SpineSize[1]);
        //设置pivot
        this.view.pivot(config.SpinePivot[0], config.SpinePivot[1]);
        //添加到stage, 设置层级, 显示
        this.player.comParent.addChild(this.view);
        //this.player.comParent.zOrder = config.ZOrder;//父节点设置层级
        this.specialDeal(spineConfigId);
        // this.view.play(0, true);
        this.SetActive(true)
    }

    /**
     *  特殊处理 层级的
     * @param configId spine动画
     */
    private specialDeal(configId): void {
        let zOrder = ZOrderDefine.VIEW_ZORDER;
        // switch (configId) {
        // case 5://电池干扰子弹 
        //     zOrder = 5;//高于怪物
        //     break;
        // }
        this.view.zOrder = zOrder;
    }

    protected destoryView() {
        // this.view.destroy(true)
        if (this.view) {
            MatchSpineManager.Instance.Recycle(this.spineConfigID, this.view)
        }
        this.view = null;
    }

    public setPlayerView(): void {
        this.player.viewHeight = this.viewSize.y;// this.view.height;//判断instage
        this.player.viewHeightHalf = this.viewSize.y * 0.5;
        this.player.viewWidth = this.viewSize.x;
        this.player.viewWidthHalf = this.viewSize.x * 0.5;
    }

    // //检测是否和另外一个物体碰撞了
    // public checkHit(sp: Laya.Sprite): boolean {
    //     // Log.Debug("检测碰撞")
    //     var flag: boolean = false;
    //     //缩放的时候飞机的宽度不变，所以要乘以缩放系数。Y 暂时没有乘因为效果还可以
    //     if (Math.abs(this.player.comParent.x - sp.x) < this.player.viewHeightHalf * (this.player.viewComp as ImageViewComponent).view.scaleX + sp.width &&
    //         Math.abs(this.player.comParent.y - sp.y) < this.view.height + sp.height) {
    //         flag = true;
    //     }
    //     return flag;

    // }

    //设置缩放
    public setViewScale(scaleX: number, scaleY: number): void {
        this.view.scale(scaleX, scaleY);
    }


    //设置是否显示
    public SetActive(active: boolean) {
        if (active) {
            this.view.visible = true;
            this.view.play(0, true);
            let config = ConfigManager.GetInstance().GetMonsterConfig(this.player.playerID);
            //磁棒扇动
            if (config) this.view.playbackRate(ConstDefine.FLY_ANI_SPEED * (config.MoveSpeed) / 6);
            else { Log.Error("怪物Id:" + this.player.playerID + "  不存在", config); }
        } else {
            this.view.visible = false
            this.view.stop();
        }
    }

    //暂停动画播放
    public Pause(pause: boolean) {
        if (pause) {
            this.view.stop();
        } else {
            this.view.play(0, true);
        }
    }
}