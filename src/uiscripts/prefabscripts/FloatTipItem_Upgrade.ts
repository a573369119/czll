/*
* name;
*/
class FloatTipItem_Upgrade extends ui.PrefabUI.FloatTipItemPrefab_UpgradeUI {
    constructor() {
        super();
        this.anchorX = 0.5;
        this.anchorY = 0.5;
        this.deleteTimeTask = -1;
        this.animTask = -1;
    }

    private fontSize = 40;

    public deleteTimeTask: number;
    public animTask: number;
    private aimY: number;

    /**
     * 初始化内容
     */
    public InitItem(message: string, needExtra = true) {
        //1.检查信息长度，动态设置item宽度
        this.UI_Txt_Tip.text = message;
        this.UI_Txt_Tip.right = needExtra ? 60 : 0;
        this.UI_Txt_Extra.visible = needExtra;
        //2.初始化alpha和scale
        this.alpha = 1;
        this.scale(1, 1);

        this.aimY = -1;
        this.deleteTimeTask = -1;
        this.animTask = -1;
    }

    /**
     * 删除item
     */
    public DeleteItem() {
        if (this.deleteTimeTask != -1) {
            TimeManager.getInst().remove(this.deleteTimeTask);
        }
        if (this.animTask != -1) {
            Tween2DUtil.kill(this.animTask);
        }
        this.deleteTimeTask = -1;
        this.animTask = -1;
        this.aimY = -1;
    }

    //FloatIn类型动画，从下方尺寸放大进场，然后

    /**
     * 向上浮动动画
     */
    public UpgradeTipAnim_FloatUp() {
        if (this.animTask != -1) {
            Tween2DUtil.kill(this.animTask);
            this.animTask = -1;
        }
        if (this.aimY != -1) {
            this.aimY -= this.height + 10;
        } else {
            this.aimY = this.y - this.height - 10;
        }
        this.scale(1, 1);
        this.animTask = Tween2DUtil.to({
            node: this,
            duration: 0.2,
            scalex: 1,
            scaley: 1,
            y: this.aimY,
            onComplete: cbhandler.gen_handler(() => {
                this.animTask = -1;
                this.aimY = -1;
            }, this)
        })
    }
    /**
     * 尺寸变大动画
     */
    public UpgradeTipAnim_Scale() {
        if (this.animTask != -1) {
            Tween2DUtil.kill(this.animTask);
            this.animTask = -1;
        }
        this.scale(0, 0);
        this.animTask = Tween2DUtil.to({
            node: this,
            duration: 0.2,
            scalex: 1,
            scaley: 1,
            onComplete: cbhandler.gen_handler(() => {
                this.animTask = -1
            }, this)
        })
    }
    /**
     * 透明度改变动画
     */
    public UpgradeTipAnim_Alpha(handler: cbhandler) {
        if (this.animTask != -1) {
            Tween2DUtil.kill(this.animTask);
            this.animTask = -1;
        }
        this.alpha = 1;
        this.animTask = Tween2DUtil.to({
            node: this,
            duration: 0.2,
            alpha: 0,
            onComplete: cbhandler.gen_handler(() => {
                this.animTask = -1;
                if (handler) {
                    handler.exec();
                }
            }, this)
        })
    }


}