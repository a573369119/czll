/*
* name;
*/
class FloatTipItem_Lottery extends ui.PrefabUI.FloatTipItemPrefab_LotteryUI {
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
    public InitItem(message: string) {
        //1.检查信息长度，动态设置item宽度

        this.UI_Txt_Tip.text = message;
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


    /**
     * 转盘提示，出现
     */
    public LotteryTipAnim_Appear() {
        if (this.animTask != -1) {
            Tween2DUtil.kill(this.animTask);
            this.animTask = -1;
        }
        //突然出现
        this.scale(1, 1);
        this.alpha = 1;
    }

    /**
     * 转盘提示，上浮消失
     */
    public LotteryTipAnim_Disappear(handler: cbhandler) {
        if (this.animTask != -1) {
            Tween2DUtil.kill(this.animTask);
            this.animTask = -1;
        }
        //突然出现
        this.scale(1, 1);
        this.alpha = 1;
        this.aimY = this.y - 300;
        this.animTask = Tween2DUtil.to({
            node: this,
            duration: 0.5,
            alpha: 0,
            y: this.aimY,
            onComplete: cbhandler.gen_handler(() => {
                this.animTask = -1;
                if (handler) {
                    handler.exec();
                }
            }, this)
        });
    }


}