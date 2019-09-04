var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*
* 使用spine的
*/
var SpineViewComponent = (function (_super) {
    __extends(SpineViewComponent, _super);
    function SpineViewComponent(spineConfigID) {
        var _this = _super.call(this) || this;
        _this.spineConfigID = spineConfigID;
        return _this;
    }
    Object.defineProperty(SpineViewComponent.prototype, "ViewSize", {
        get: function () { return new Vec2(this.viewSize.x * this.view.scaleX, this.viewSize.y * this.view.scaleY); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SpineViewComponent.prototype, "View", {
        get: function () { return this.view; },
        enumerable: true,
        configurable: true
    });
    SpineViewComponent.prototype.createView = function () {
        // let url = ConfigManager.GetInstance().GetPlayerConfig(this.player.playerID).SpinePath;
        this.createSpineView(this.spineConfigID);
    };
    //切换形象
    SpineViewComponent.prototype.ChangeView = function (urlOrId) {
        this.spineConfigID = urlOrId;
        this.showView();
    };
    SpineViewComponent.prototype.createSpineView = function (spineConfigId) {
        // this.spineConfigID = spineConfigId;
        this.view = MatchSpineManager.Instance.Spawn(spineConfigId);
        //设置尺寸大小
        var config = ConfigManager.GetInstance().GetSpineConfig(spineConfigId);
        this.viewSize = new Vec2(config.SpineSize[0], config.SpineSize[1]);
        //设置pivot
        this.view.pivot(config.SpinePivot[0], config.SpinePivot[1]);
        //添加到stage, 设置层级, 显示
        this.player.comParent.addChild(this.view);
        //this.player.comParent.zOrder = config.ZOrder;//父节点设置层级
        this.specialDeal(spineConfigId);
        // this.view.play(0, true);
        this.SetActive(true);
    };
    /**
     *  特殊处理 层级的
     * @param configId spine动画
     */
    SpineViewComponent.prototype.specialDeal = function (configId) {
        var zOrder = ZOrderDefine.VIEW_ZORDER;
        // switch (configId) {
        // case 5://电池干扰子弹 
        //     zOrder = 5;//高于怪物
        //     break;
        // }
        this.view.zOrder = zOrder;
    };
    SpineViewComponent.prototype.destoryView = function () {
        // this.view.destroy(true)
        if (this.view) {
            MatchSpineManager.Instance.Recycle(this.spineConfigID, this.view);
        }
        this.view = null;
    };
    SpineViewComponent.prototype.setPlayerView = function () {
        this.player.viewHeight = this.viewSize.y; // this.view.height;//判断instage
        this.player.viewHeightHalf = this.viewSize.y * 0.5;
        this.player.viewWidth = this.viewSize.x;
        this.player.viewWidthHalf = this.viewSize.x * 0.5;
    };
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
    SpineViewComponent.prototype.setViewScale = function (scaleX, scaleY) {
        this.view.scale(scaleX, scaleY);
    };
    //设置是否显示
    SpineViewComponent.prototype.SetActive = function (active) {
        if (active) {
            this.view.visible = true;
            this.view.play(0, true);
            var config = ConfigManager.GetInstance().GetMonsterConfig(this.player.playerID);
            //磁棒扇动
            if (config)
                this.view.playbackRate(ConstDefine.FLY_ANI_SPEED * (config.MoveSpeed) / 6);
            else {
                Log.Error("怪物Id:" + this.player.playerID + "  不存在", config);
            }
        }
        else {
            this.view.visible = false;
            this.view.stop();
        }
    };
    //暂停动画播放
    SpineViewComponent.prototype.Pause = function (pause) {
        if (pause) {
            this.view.stop();
        }
        else {
            this.view.play(0, true);
        }
    };
    return SpineViewComponent;
}(ViewComponentBase2D));
//# sourceMappingURL=SpineViewComponent.js.map