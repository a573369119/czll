var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*
* name;
*/
var LotteryHistItem = (function (_super) {
    __extends(LotteryHistItem, _super);
    function LotteryHistItem() {
        return _super.call(this) || this;
    }
    LotteryHistItem.prototype.RenderItem = function (data, index) {
        //渲染item
        this.UI_Img_BG.visible = index % 2 == 0;
        //时间和内容
        var time = data.lotteryTime * 1000; // 1564661145000;//
        var lotteryDate = new Date(time);
        var lotteryStr = this.GetDateStr(lotteryDate);
        this.UI_Txt_Date.text = lotteryStr;
        //奖品名
        var config = ConfigManager.GetInstance().GetLotteryRewardConfig(data.rewardConfigID);
        this.UI_Txt_Info.text = config.rewardName;
        //超时
        var deleteTimeDelta = data.messageDeleteTime - Date.now() / 1000;
        var leftHour = Math.floor(deleteTimeDelta / 3600); //剩余小时数
        var leftDay = Math.floor(leftHour / 24);
        if (leftDay > 1) {
            this.UI_Txt_LeftTime.text = leftDay + "天";
        }
        else if (leftHour > 1) {
            this.UI_Txt_LeftTime.text = leftHour + "小时";
        }
        else {
            this.UI_Txt_LeftTime.text = "即将删除";
        }
    };
    LotteryHistItem.prototype.GetDateStr = function (date) {
        // DateFormat的格式（即yyyy/MM/dd HH:mm:ss）就是将获得日期字符串显示的格式
        var year = date.getFullYear().toString();
        var month = ((date.getMonth() + 1) < 10 ? "0" : "") + (date.getUTCMonth() + 1).toString();
        var day = (date.getDate() < 10 ? "0" : "") + date.getDate().toString();
        var hour = (date.getHours() < 10 ? "0" : "") + date.getHours().toString();
        var minute = (date.getMinutes() < 10 ? "0" : "") + date.getMinutes().toString();
        var second = (date.getSeconds() < 10 ? "0" : "") + date.getSeconds().toString();
        return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
        // return date.toLocaleDateString()
    };
    return LotteryHistItem;
}(ui.PrefabUI.LotteryHistItemPrefabUI));
//# sourceMappingURL=LotteryHistItem.js.map