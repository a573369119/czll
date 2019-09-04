var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*
* 血条组件
*/
var MonsterHpBarComponent = (function (_super) {
    __extends(MonsterHpBarComponent, _super);
    function MonsterHpBarComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.timerId = -1; //显示计时
        return _this;
    }
    MonsterHpBarComponent.prototype.onAdd = function () {
        this.hpBarUI = new ui.PrefabUI.MonsterProgressPrefabUI();
        this.player.AddChild(this.hpBarUI);
        this.hpBarUI.anchorX = 0.5;
        this.hpBarUI.anchorY = 0.5;
        this.hpBarUI.zOrder = ZOrderDefine.HP_BAR_ZORDER; // 1000
        this.MaxWidth = this.hpBarUI.width;
        this.SetPos(0, 0);
    };
    MonsterHpBarComponent.prototype.onReomove = function () {
        this.clearTimer();
        this.hpBarUI.destroy(true);
        this.hpBarUI = null;
    };
    MonsterHpBarComponent.prototype.SetPos = function (x, y) {
        this.hpBarUI.pos(x, y);
    };
    //爆炸显示, xs后隐藏
    MonsterHpBarComponent.prototype.SetPosOnExpode = function (x, y) {
        var _this = this;
        this.hpBarUI.pos(x, y);
        this.clearTimer();
        this.SetActive(true);
        this.timerId = TimeManager.getInst().once(ConstDefine.HP_BAR_DURATION, cbhandler.gen_handler(function () {
            _this.SetActive(false);
        }));
    };
    MonsterHpBarComponent.prototype.clearTimer = function () {
        if (this.timerId > 0) {
            TimeManager.getInst().remove(this.timerId);
            this.timerId = -1;
        }
    };
    //设置进度
    MonsterHpBarComponent.prototype.SetProgress = function (percentage) {
        this.hpBarUI.ProgressBar.width = percentage * this.MaxWidth;
    };
    MonsterHpBarComponent.prototype.SetSkillIcons = function (skillConfigs) {
        var iconSize = this.hpBarUI.height; //血条高度作为正方形尺寸
        for (var index = 0; index < skillConfigs.length; index++) {
            var even = index % 2 == 0; //奇偶数
            var iconStartXPos = even ? -iconSize : this.MaxWidth; //icon起始x坐标
            //let id = skillIds[index];
            var config = skillConfigs[index]; //ConfigManager.GetInstance().GetSkillConfig(id);
            if (config) {
                var image = new Laya.Image();
                image.skin = config.IconPath;
                image.visible = false;
                image.anchorX = 0;
                image.anchorY = 0; //左上角对齐
                this.hpBarUI.addChild(image);
                var posIndex = Math.floor(index / 2); //index;
                image.pos(iconStartXPos + (even ? -1 : 1) * posIndex * iconSize, 0);
                image.size(iconSize, iconSize);
            }
        }
    };
    MonsterHpBarComponent.prototype.SetActive = function (active) {
        if (!this) {
            console.error("血条对象不存在，不可以进行设置");
            return;
        }
        ;
        this.hpBarUI.visible = active;
    };
    MonsterHpBarComponent.prototype.OnRecycle = function () {
        this.clearTimer();
        this.SetActive(false);
    };
    return MonsterHpBarComponent;
}(ComponentBase2D));
//# sourceMappingURL=MonsterHpBarComponent.js.map