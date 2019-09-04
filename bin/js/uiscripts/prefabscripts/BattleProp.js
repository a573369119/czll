var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*
* name;
*/
var BattleProp = (function (_super) {
    __extends(BattleProp, _super);
    function BattleProp() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //扇形半径
        _this.radius = 61;
        //线颜色
        _this.lineColor_Blue = "#00ff00";
        _this.lineColor_Red = "#ff5b49";
        //时间任务
        _this.timeTask = -1;
        //闪烁标记
        _this.isShake = false;
        return _this;
    }
    /**
     * 刷新prefab的倒计时（每次更新的时候可以直接调用此方法重置倒计时）
     * @param prop buff信息
     */
    BattleProp.prototype.RefreshPrefab = function (prop) {
        var config = ConfigManager.GetInstance().GetPropConfig(prop.BuffType);
        if (config) {
            this.propConfig = config;
            this.buffConfig = ConfigManager.GetInstance().GetBuffConfig(this.propConfig.BuffConfigID);
        }
        else {
            //没找到config，报错
            Log.Error("BattleProp 未找到对应Config：", prop.BuffType);
            return;
        }
        //记录时间戳
        this.showTimeStamp = Date.now();
        //根据配置，显示图标
        this.img_Prop.skin = this.propConfig.PropImagePath;
        // this.img_PropType.skin = this.propConfig.PropImagePath;
        //排除可能的倒计时
        if (this.timeTask != -1) {
            TimeManager.getInst().remove(this.timeTask);
            this.timeTask = -1;
        }
        //挂载循环事件
        this.timeTask = TimeManager.getInst().loop(0.02, cbhandler.gen_handler(this.Loop, this));
        //立即执行1次
        this.Loop();
    };
    /**
     * 隐藏prefab
     */
    BattleProp.prototype.HidePrefab = function () {
        //排除可能的倒计时
        if (this.timeTask != -1) {
            TimeManager.getInst().remove(this.timeTask);
            this.timeTask = -1;
        }
        this.propConfig = null;
        this.buffConfig = null;
        // this.ani1.stop();
    };
    //循环绘制
    BattleProp.prototype.Loop = function () {
        //根据配置，绘制
        if (this.buffConfig) {
            //线颜色
            var lineColor = this.buffConfig.BuffType == 1 ? this.lineColor_Blue : this.lineColor_Red;
            //进度
            var now = Date.now();
            var delta = now - this.showTimeStamp;
            var ratio = 1 - delta / (this.buffConfig.duration * 1000);
            //区间限定
            if (ratio > 1) {
                ratio = 1;
            }
            else if (ratio < 0) {
                ratio = 0;
                //停止时间
                TimeManager.getInst().remove(this.timeTask);
                this.timeTask = -1;
            }
            //绘制
            this.DrawPie(ratio, true, lineColor);
        }
        else {
            // this.ani1.stop();
            this.sp.alpha = 1;
            return;
        }
    };
    /**
     * 绘制饼状图
     * @param ratio 0~1
     * @param countDown 为true时倒计时
     */
    BattleProp.prototype.DrawPie = function (ratio, countDown, lineColor) {
        // Log.Debug("SpawnItem DrawPie " + ratio);
        //限制
        if (ratio > 1)
            ratio = 1;
        if (ratio < 0)
            ratio = 0;
        //画个环状图
        var angle = 0;
        //需要正倒计时判断
        if (!countDown) {
            angle = -360 * ratio + 270;
        }
        else {
            angle = 360 * ratio - 90;
        }
        //测试
        // angle = 270
        //清空一下
        this.img_Pie.graphics.clear();
        this.img_Pie.graphics.drawPie(this.img_Pie.width / 2, this.img_Pie.height / 2, this.radius, -90, angle, lineColor);
        // if (ratio <= 0.3) {
        //     if (!this.ani1.isPlaying) this.ani1.play(0, true);
        // } else {
        //     this.ani1.stop();
        //     this.sp.alpha = 1;
        // }
    };
    return BattleProp;
}(ui.PrefabUI.BattlePropPrefabUI));
//# sourceMappingURL=BattleProp.js.map