/*
* 血条组件
*/
class MonsterHpBarComponent extends ComponentBase2D {
    private hpBarUI: ui.PrefabUI.MonsterProgressPrefabUI;
    private MaxWidth: number;//满血时候的ui宽
    private timerId: number = -1; //显示计时
    public onAdd(): void {
        this.hpBarUI = new ui.PrefabUI.MonsterProgressPrefabUI();
        this.player.AddChild(this.hpBarUI)
        this.hpBarUI.anchorX = 0.5;
        this.hpBarUI.anchorY = 0.5;
        this.hpBarUI.zOrder = ZOrderDefine.HP_BAR_ZORDER;// 1000
        this.MaxWidth = this.hpBarUI.width;
        this.SetPos(0, 0)
    }

    public onReomove(): void {
        this.clearTimer();
        this.hpBarUI.destroy(true);
        this.hpBarUI = null;
    }

    public SetPos(x: number, y: number) {
        this.hpBarUI.pos(x, y);
    }

    //爆炸显示, xs后隐藏
    public SetPosOnExpode(x: number, y: number) {
        this.hpBarUI.pos(x, y)
        this.clearTimer();
        this.SetActive(true)
        this.timerId = TimeManager.getInst().once(ConstDefine.HP_BAR_DURATION, cbhandler.gen_handler(() => {
            this.SetActive(false)
        }))
    }

    private clearTimer() {
        if (this.timerId > 0) {
            TimeManager.getInst().remove(this.timerId)
            this.timerId = -1;
        }
    }

    //设置进度
    public SetProgress(percentage: number) {
        this.hpBarUI.ProgressBar.width = percentage * this.MaxWidth;
    }

    public SetSkillIcons(skillConfigs: SkillConfigConfigData[]) {
        let iconSize = this.hpBarUI.height;//血条高度作为正方形尺寸
        for (let index = 0; index < skillConfigs.length; index++) {
            let even = index % 2 == 0; //奇偶数
            let iconStartXPos = even ? -iconSize : this.MaxWidth;//icon起始x坐标
            //let id = skillIds[index];
            let config = skillConfigs[index]; //ConfigManager.GetInstance().GetSkillConfig(id);
            if (config) {
                let image = new Laya.Image();
                image.skin = config.IconPath;
                image.visible = false;
                image.anchorX = 0;
                image.anchorY = 0;//左上角对齐
                this.hpBarUI.addChild(image);
                let posIndex = Math.floor(index / 2);//index;
                image.pos(iconStartXPos + (even ? -1 : 1) * posIndex * iconSize, 0)
                image.size(iconSize, iconSize)
            }
        }
    }

    public SetActive(active: boolean) {
        if (!this) { console.error("血条对象不存在，不可以进行设置"); return; };
        this.hpBarUI.visible = active;
    }

    public OnRecycle() {
        this.clearTimer();
        this.SetActive(false)
    }
}