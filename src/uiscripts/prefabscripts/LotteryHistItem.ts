/*
* name;
*/
class LotteryHistItem extends ui.PrefabUI.LotteryHistItemPrefabUI {
    constructor() {
        super();
    }

    public RenderItem(data: com.msg.lotteryRewardInfo, index: number) {
        //渲染item
        this.UI_Img_BG.visible = index % 2 == 0;
        //时间和内容
        let time = (data.lotteryTime as number) * 1000;// 1564661145000;//
        let lotteryDate = new Date(time);
        let lotteryStr = this.GetDateStr(lotteryDate);
        this.UI_Txt_Date.text = lotteryStr;
        //奖品名
        let config = ConfigManager.GetInstance().GetLotteryRewardConfig(data.rewardConfigID);
        this.UI_Txt_Info.text = config.rewardName;
        //超时
        let deleteTimeDelta = data.messageDeleteTime as number - Date.now() / 1000;
        let leftHour = Math.floor(deleteTimeDelta / 3600);  //剩余小时数
        let leftDay = Math.floor(leftHour / 24);
        if (leftDay > 1) {
            this.UI_Txt_LeftTime.text = leftDay + "天";
        } else if (leftHour > 1) {
            this.UI_Txt_LeftTime.text = leftHour + "小时";
        } else {
            this.UI_Txt_LeftTime.text = "即将删除";
        }
    }

    private GetDateStr(date: Date): string {
        // DateFormat的格式（即yyyy/MM/dd HH:mm:ss）就是将获得日期字符串显示的格式
        let year = date.getFullYear().toString();
        let month = ((date.getMonth() + 1) < 10 ? "0" : "") + (date.getUTCMonth() + 1).toString();
        let day = (date.getDate() < 10 ? "0" : "") + date.getDate().toString();
        let hour = (date.getHours() < 10 ? "0" : "") + date.getHours().toString();
        let minute = (date.getMinutes() < 10 ? "0" : "") + date.getMinutes().toString();
        let second = (date.getSeconds() < 10 ? "0" : "") + date.getSeconds().toString();

        return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
        // return date.toLocaleDateString()
    }
}
