/*
* 本地存储
*/
class StorageManager {
    private static _Instance = null;
    public static GetInstance(): StorageManager {
        if (StorageManager._Instance == null) {
            StorageManager._Instance = new StorageManager();
        }
        return StorageManager._Instance;
    }

    //清空全部本地存储内容
    public static ClearAllData() {
        localStorage.clear();
        Log.Debug("清除本地的存储数据");
    }

    //游戏设置相关
    //获取音乐设置，若未曾存储则返回false
    public static GetMusicSetting(): boolean {
        let data = localStorage.getItem(ConstDefine.STORAGE_SETTINGS_MUSIC);
        // Log.Debug("StorageManager music setting",data);
        //存储格式：0或1
        if (data == null || data == undefined || data == "") {
            this.SetMusicSetting(true);
            return true;
        } else {
            let result: number = parseInt(data);
            return Boolean(result);
        }
    }
    public static SetMusicSetting(setting: boolean) {
        //存储格式：0或1
        let data: string = setting ? "1" : "0";
        // Log.Debug("StorageManager music setting",data);
        localStorage.setItem(ConstDefine.STORAGE_SETTINGS_MUSIC, data);
    }

    //获取音效设置，若未曾存储则返回false
    public static GetSoundSetting(): boolean {
        let data = localStorage.getItem(ConstDefine.STORAGE_SETTINGS_SOUND);
        //存储格式：0或1
        if (data == null || data == undefined || data == "") {
            this.SetSoundSetting(true);
            return true;
        } else {
            let result: number = parseInt(data);
            return Boolean(result);
        }
    }
    public static SetSoundSetting(setting: boolean) {
        //存储格式：0或1
        let data: string = setting ? "1" : "0";
        // Log.Debug("StorageManager sound setting",data);
        localStorage.setItem(ConstDefine.STORAGE_SETTINGS_SOUND, data);
    }

    //获取震动设置，若未曾存储则返回true
    public static GetVibrateSetting(): boolean {
        let data = localStorage.getItem(ConstDefine.STORAGE_SETTINGS_VIBRATE);
        //存储格式：0或1
        if (data == null || data == undefined || data == "") {
            this.SetVibrateSetting(true);
            return true;
        } else {
            let result: number = parseInt(data);
            return Boolean(result);
        }
    }
    public static SetVibrateSetting(setting: boolean) {
        //存储格式：0或1
        let data: string = setting ? "1" : "0";
        // Log.Debug("StorageManager sound setting",data);
        localStorage.setItem(ConstDefine.STORAGE_SETTINGS_VIBRATE, data);
    }

    //获取OpenID
    public static GetOpenID(): string {
        let data = CommonUtil.OnMiniGame() ? WechatUtil.getIntance().wxGetStorageSync(WechatConstDefine.STORAGE_WECHAT_OPEN_ID) : localStorage.getItem(WechatConstDefine.STORAGE_WECHAT_OPEN_ID);
        if (data == null || data == undefined || data == "") {
            return null;
        } else {
            return data;
        }
    }

    public static SetOpenID(openId: string) {
        if (CommonUtil.OnMiniGame()) {
            WechatUtil.getIntance().wxSetStorageSync(WechatConstDefine.STORAGE_WECHAT_OPEN_ID, openId);
        } else {
            localStorage.setItem(WechatConstDefine.STORAGE_WECHAT_OPEN_ID, openId);
        }
    }

    //保存头像
    public static GetHeaderImage(): string {
        if (CommonUtil.OnMiniGame()) {
            return WechatUtil.getIntance().wxGetStorageSync(WechatConstDefine.STORAGE_WECHAT_IMAGE);
        } else {
            return localStorage.getItem(WechatConstDefine.STORAGE_WECHAT_IMAGE);
        }
    }

    public static SetWechatImage(imageurl: string) {
        if (CommonUtil.OnMiniGame()) {
            WechatUtil.getIntance().wxSetStorageSync(WechatConstDefine.STORAGE_WECHAT_IMAGE, imageurl);
        } else {
            localStorage.setItem(WechatConstDefine.STORAGE_WECHAT_IMAGE, imageurl);
        }
    }

    //保存昵称
    public static GetNickName(): string {
        if (CommonUtil.OnMiniGame()) {
            return WechatUtil.getIntance().wxGetStorageSync(WechatConstDefine.STORAGE_WECHAT_NICKNAME);
        } else {
            return localStorage.getItem(WechatConstDefine.STORAGE_WECHAT_IMAGE);
        }
    }

    public static SetNickName(nickname: string) {
        if (CommonUtil.OnMiniGame()) {
            WechatUtil.getIntance().wxSetStorageSync(WechatConstDefine.STORAGE_WECHAT_NICKNAME, nickname);
        } else {
            localStorage.setItem(WechatConstDefine.STORAGE_WECHAT_NICKNAME, nickname);
        }
    }

    /**
     * 过关十倍奖励几率
     */
    public static GetResultLuckyChance(): number {
        let data = localStorage.getItem(ConstDefine.STORAGE_RESULT_LUCKY_CHANCE);
        //存储格式：0~1的小数
        if (data == null || data == undefined || data == "") {
            this.SetResultLuckyChance(0.1);
            return 0.1;
        } else {
            let result: number = parseFloat(data);
            return result;
        }
    }
    public static SetResultLuckyChance(chance: number) {
        localStorage.setItem(ConstDefine.STORAGE_RESULT_LUCKY_CHANCE, chance.toString());
    }

    /**
     * 过关十倍奖励数量，每天10次
     */
    public static GetResultLuckyNum(): number {
        let data = localStorage.getItem(ConstDefine.STORAGE_RESULT_LUCKY_NUM);
        //存储格式：0~10的整数
        if (data == null || data == undefined || data == "") {
            this.SetResultLuckyNum(ConstDefine.MaxValue_ResultLucky);
            return ConstDefine.MaxValue_ResultLucky;
        } else {
            let result: number = parseInt(data);
            return result;
        }
    }
    public static SetResultLuckyNum(num: number) {
        localStorage.setItem(ConstDefine.STORAGE_RESULT_LUCKY_NUM, num.toString());
    }

    /**
     * 上次过关十倍奖励时间
     */
    public static GetLastResultLuckyDate(): Date {
        let data = localStorage.getItem(ConstDefine.STORAGE_RESULT_LUCKY_TIME);
        //存储格式：字符串
        if (data == null || data == undefined || data == "") {
            let yesterday = new Date(Date.now() - 86400 * 1000);
            this.SetLastResultLuckyDate(yesterday);
            return yesterday;
        } else {
            let result: Date = new Date(data);
            return result;
        }
    }
    public static SetLastResultLuckyDate(date: Date) {
        localStorage.setItem(ConstDefine.STORAGE_RESULT_LUCKY_TIME, date.toTimeString());
    }

    //五倍产能获取几率
    public static GetMoreSpawnChance(): number {
        let data = localStorage.getItem(ConstDefine.STORAGE_MORE_SPAWN_CHANCE);
        //存储格式：0~1的小数
        if (data == null || data == undefined || data == "") {
            this.SetResultLuckyChance(0.1);
            return 0.1;
        } else {
            let result: number = parseFloat(data);
            return result;
        }
    }
    public static SetMoreSpawnChance(chance: number) {
        localStorage.setItem(ConstDefine.STORAGE_MORE_SPAWN_CHANCE, chance.toString());
    }

    /**
     * 每天复活10次
     */
    public static GetRebornNum(): number {
        let data = localStorage.getItem(ConstDefine.STORAGE_REBORN_NUM);
        //存储格式：0~10的整数
        if (!data) {
            this.SetRebornNum(ConstDefine.MaxValue_Reborn);
            return ConstDefine.MaxValue_Reborn;
        } else {
            let result: number = parseInt(data);
            return result;
        }
    }
    public static SetRebornNum(num: number) {
        localStorage.setItem(ConstDefine.STORAGE_REBORN_NUM, num.toString());
    }
    /**
     * 上次复活日期
     */
    public static GetLastRebornDate(): Date {
        let data = localStorage.getItem(ConstDefine.STORAGE_REBORN_DATE);
        //存储格式：字符串
        if (data == null || data == undefined || data == "") {
            let yesterday = new Date(Date.now() - 86400 * 1000);
            this.SetLastRebornDate(yesterday);
            return yesterday;
        } else {
            let result: Date = new Date(data);
            return result;
        }
    }
    public static SetLastRebornDate(date: Date) {
        localStorage.setItem(ConstDefine.STORAGE_REBORN_DATE, date.toTimeString());
    }

    /**
     * 未通关的刷怪模板
     */
    public static GetLastestLevelTemplate(level: number): number {
        let data = localStorage.getItem(ConstDefine.STORAGE_LEVEL_TEMPLATE_ID + level.toString());
        //存储格式：字符串
        if (data == null || data == undefined || data == "") {
            return -1;
        } else {
            return parseInt(data);
        }
    }
    //记录/清理关卡模板记录
    public static SetLastestLevelTemplate(level: number, templateId: number) {
        Log.Debug("保存关卡模版id: level %i, templateID: %i", level, templateId)
        if (templateId < 0) {
            //清理记录
            localStorage.removeItem(ConstDefine.STORAGE_LEVEL_TEMPLATE_ID + level.toString());
        } else {
            localStorage.setItem(ConstDefine.STORAGE_LEVEL_TEMPLATE_ID + level.toString(), templateId.toString());
        }

    }


    /**************************3.0新需求******************************/

    /**
     * 获取产能数值
     */
    public static GetSpawnMoneyNum(): number {
        let data = localStorage.getItem(ConstDefine.STORAGE_SPAWN_MONEYNUM);
        if (data) {
            return parseInt(data);
        } else {
            this.SetSpawnMoneyNum(0);
            return 0;
        }
    }

    /**
     * 保存产能数额
     * @param money 钱币数
     */
    public static SetSpawnMoneyNum(money: number) {
        localStorage.setItem(ConstDefine.STORAGE_SPAWN_MONEYNUM, money.toString());
    }

    /**
     * 获取更新产能的时间戳（秒）
     */
    public static GetSpawnUpdateTime(): number {
        let timestamp = localStorage.getItem(ConstDefine.STORAGE_SPAWN_UPDATETIME);
        if (timestamp) {
            return parseInt(timestamp);
        } else {
            let timestamp = Math.floor(Date.now() / 1000);
            this.SetSpawnUpdateTime(timestamp);
            return timestamp;
        }
    }

    /**
     * 设置更新产能的时间戳（秒）
     * @param date 更新时间戳（秒）
     */
    public static SetSpawnUpdateTime(timestamp: number | Long) {
        localStorage.setItem(ConstDefine.STORAGE_SPAWN_UPDATETIME, timestamp.toString());
    }




    public static GetUnlockNewSideweapon(): boolean {
        let data = localStorage.getItem(ConstDefine.STORAGE_UNLOCK_NEW_SIDEWEAPON);
        if (data) {
            return data == "1";
        } else {
            this.SetUnlockNewSideweapon(false);
            return false;
        }
    }

    public static SetUnlockNewSideweapon(state: boolean) {
        let data = state ? "1" : "0";
        localStorage.setItem(ConstDefine.STORAGE_UNLOCK_NEW_SIDEWEAPON, data);
    }

    /**
     * 获取上一次发送验证短信的时间（秒）
     */
    public static GetLastVerifyMessageTime() {
        let data = localStorage.getItem(ConstDefine.STORAGE_LAST_MESSAGEVERIFYTIME);
        if (data) {
            return parseInt(data);
        } else {
            //从当前时间点往前倒数1000秒，避免新用户直接进CD
            let time = Math.floor(Date.now() / 1000) - 1000;
            this.SetLastVerifyMessageTime(time);
            return time;
        }
    }
    public static SetLastVerifyMessageTime(time: number) {
        localStorage.setItem(ConstDefine.STORAGE_LAST_MESSAGEVERIFYTIME, time.toString());
    }

    /**
     * 本地记录上一次复活的关卡数
     */
    public static GetLastRebornLevel(): number {
        let data = localStorage.getItem(ConstDefine.STORAGE_LAST_REBORN_LEVLE);
        if (data) {
            return parseInt(data);
        } else {
            this.SetLastRebornLevel(-1);
            return -1;
        }
    }
    public static SetLastRebornLevel(level: number) {
        localStorage.setItem(ConstDefine.STORAGE_LAST_REBORN_LEVLE, level.toString());
    }
}