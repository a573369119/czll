/*
* 本地存储
*/
var StorageManager = (function () {
    function StorageManager() {
    }
    StorageManager.GetInstance = function () {
        if (StorageManager._Instance == null) {
            StorageManager._Instance = new StorageManager();
        }
        return StorageManager._Instance;
    };
    //清空全部本地存储内容
    StorageManager.ClearAllData = function () {
        localStorage.clear();
        Log.Debug("清除本地的存储数据");
    };
    //游戏设置相关
    //获取音乐设置，若未曾存储则返回false
    StorageManager.GetMusicSetting = function () {
        var data = localStorage.getItem(ConstDefine.STORAGE_SETTINGS_MUSIC);
        // Log.Debug("StorageManager music setting",data);
        //存储格式：0或1
        if (data == null || data == undefined || data == "") {
            this.SetMusicSetting(true);
            return true;
        }
        else {
            var result = parseInt(data);
            return Boolean(result);
        }
    };
    StorageManager.SetMusicSetting = function (setting) {
        //存储格式：0或1
        var data = setting ? "1" : "0";
        // Log.Debug("StorageManager music setting",data);
        localStorage.setItem(ConstDefine.STORAGE_SETTINGS_MUSIC, data);
    };
    //获取音效设置，若未曾存储则返回false
    StorageManager.GetSoundSetting = function () {
        var data = localStorage.getItem(ConstDefine.STORAGE_SETTINGS_SOUND);
        //存储格式：0或1
        if (data == null || data == undefined || data == "") {
            this.SetSoundSetting(true);
            return true;
        }
        else {
            var result = parseInt(data);
            return Boolean(result);
        }
    };
    StorageManager.SetSoundSetting = function (setting) {
        //存储格式：0或1
        var data = setting ? "1" : "0";
        // Log.Debug("StorageManager sound setting",data);
        localStorage.setItem(ConstDefine.STORAGE_SETTINGS_SOUND, data);
    };
    //获取震动设置，若未曾存储则返回true
    StorageManager.GetVibrateSetting = function () {
        var data = localStorage.getItem(ConstDefine.STORAGE_SETTINGS_VIBRATE);
        //存储格式：0或1
        if (data == null || data == undefined || data == "") {
            this.SetVibrateSetting(true);
            return true;
        }
        else {
            var result = parseInt(data);
            return Boolean(result);
        }
    };
    StorageManager.SetVibrateSetting = function (setting) {
        //存储格式：0或1
        var data = setting ? "1" : "0";
        // Log.Debug("StorageManager sound setting",data);
        localStorage.setItem(ConstDefine.STORAGE_SETTINGS_VIBRATE, data);
    };
    //获取OpenID
    StorageManager.GetOpenID = function () {
        var data = CommonUtil.OnMiniGame() ? WechatUtil.getIntance().wxGetStorageSync(WechatConstDefine.STORAGE_WECHAT_OPEN_ID) : localStorage.getItem(WechatConstDefine.STORAGE_WECHAT_OPEN_ID);
        if (data == null || data == undefined || data == "") {
            return null;
        }
        else {
            return data;
        }
    };
    StorageManager.SetOpenID = function (openId) {
        if (CommonUtil.OnMiniGame()) {
            WechatUtil.getIntance().wxSetStorageSync(WechatConstDefine.STORAGE_WECHAT_OPEN_ID, openId);
        }
        else {
            localStorage.setItem(WechatConstDefine.STORAGE_WECHAT_OPEN_ID, openId);
        }
    };
    //保存头像
    StorageManager.GetHeaderImage = function () {
        if (CommonUtil.OnMiniGame()) {
            return WechatUtil.getIntance().wxGetStorageSync(WechatConstDefine.STORAGE_WECHAT_IMAGE);
        }
        else {
            return localStorage.getItem(WechatConstDefine.STORAGE_WECHAT_IMAGE);
        }
    };
    StorageManager.SetWechatImage = function (imageurl) {
        if (CommonUtil.OnMiniGame()) {
            WechatUtil.getIntance().wxSetStorageSync(WechatConstDefine.STORAGE_WECHAT_IMAGE, imageurl);
        }
        else {
            localStorage.setItem(WechatConstDefine.STORAGE_WECHAT_IMAGE, imageurl);
        }
    };
    //保存昵称
    StorageManager.GetNickName = function () {
        if (CommonUtil.OnMiniGame()) {
            return WechatUtil.getIntance().wxGetStorageSync(WechatConstDefine.STORAGE_WECHAT_NICKNAME);
        }
        else {
            return localStorage.getItem(WechatConstDefine.STORAGE_WECHAT_IMAGE);
        }
    };
    StorageManager.SetNickName = function (nickname) {
        if (CommonUtil.OnMiniGame()) {
            WechatUtil.getIntance().wxSetStorageSync(WechatConstDefine.STORAGE_WECHAT_NICKNAME, nickname);
        }
        else {
            localStorage.setItem(WechatConstDefine.STORAGE_WECHAT_NICKNAME, nickname);
        }
    };
    /**
     * 过关十倍奖励几率
     */
    StorageManager.GetResultLuckyChance = function () {
        var data = localStorage.getItem(ConstDefine.STORAGE_RESULT_LUCKY_CHANCE);
        //存储格式：0~1的小数
        if (data == null || data == undefined || data == "") {
            this.SetResultLuckyChance(0.1);
            return 0.1;
        }
        else {
            var result = parseFloat(data);
            return result;
        }
    };
    StorageManager.SetResultLuckyChance = function (chance) {
        localStorage.setItem(ConstDefine.STORAGE_RESULT_LUCKY_CHANCE, chance.toString());
    };
    /**
     * 过关十倍奖励数量，每天10次
     */
    StorageManager.GetResultLuckyNum = function () {
        var data = localStorage.getItem(ConstDefine.STORAGE_RESULT_LUCKY_NUM);
        //存储格式：0~10的整数
        if (data == null || data == undefined || data == "") {
            this.SetResultLuckyNum(ConstDefine.MaxValue_ResultLucky);
            return ConstDefine.MaxValue_ResultLucky;
        }
        else {
            var result = parseInt(data);
            return result;
        }
    };
    StorageManager.SetResultLuckyNum = function (num) {
        localStorage.setItem(ConstDefine.STORAGE_RESULT_LUCKY_NUM, num.toString());
    };
    /**
     * 上次过关十倍奖励时间
     */
    StorageManager.GetLastResultLuckyDate = function () {
        var data = localStorage.getItem(ConstDefine.STORAGE_RESULT_LUCKY_TIME);
        //存储格式：字符串
        if (data == null || data == undefined || data == "") {
            var yesterday = new Date(Date.now() - 86400 * 1000);
            this.SetLastResultLuckyDate(yesterday);
            return yesterday;
        }
        else {
            var result = new Date(data);
            return result;
        }
    };
    StorageManager.SetLastResultLuckyDate = function (date) {
        localStorage.setItem(ConstDefine.STORAGE_RESULT_LUCKY_TIME, date.toTimeString());
    };
    //五倍产能获取几率
    StorageManager.GetMoreSpawnChance = function () {
        var data = localStorage.getItem(ConstDefine.STORAGE_MORE_SPAWN_CHANCE);
        //存储格式：0~1的小数
        if (data == null || data == undefined || data == "") {
            this.SetResultLuckyChance(0.1);
            return 0.1;
        }
        else {
            var result = parseFloat(data);
            return result;
        }
    };
    StorageManager.SetMoreSpawnChance = function (chance) {
        localStorage.setItem(ConstDefine.STORAGE_MORE_SPAWN_CHANCE, chance.toString());
    };
    /**
     * 每天复活10次
     */
    StorageManager.GetRebornNum = function () {
        var data = localStorage.getItem(ConstDefine.STORAGE_REBORN_NUM);
        //存储格式：0~10的整数
        if (!data) {
            this.SetRebornNum(ConstDefine.MaxValue_Reborn);
            return ConstDefine.MaxValue_Reborn;
        }
        else {
            var result = parseInt(data);
            return result;
        }
    };
    StorageManager.SetRebornNum = function (num) {
        localStorage.setItem(ConstDefine.STORAGE_REBORN_NUM, num.toString());
    };
    /**
     * 上次复活日期
     */
    StorageManager.GetLastRebornDate = function () {
        var data = localStorage.getItem(ConstDefine.STORAGE_REBORN_DATE);
        //存储格式：字符串
        if (data == null || data == undefined || data == "") {
            var yesterday = new Date(Date.now() - 86400 * 1000);
            this.SetLastRebornDate(yesterday);
            return yesterday;
        }
        else {
            var result = new Date(data);
            return result;
        }
    };
    StorageManager.SetLastRebornDate = function (date) {
        localStorage.setItem(ConstDefine.STORAGE_REBORN_DATE, date.toTimeString());
    };
    /**
     * 未通关的刷怪模板
     */
    StorageManager.GetLastestLevelTemplate = function (level) {
        var data = localStorage.getItem(ConstDefine.STORAGE_LEVEL_TEMPLATE_ID + level.toString());
        //存储格式：字符串
        if (data == null || data == undefined || data == "") {
            return -1;
        }
        else {
            return parseInt(data);
        }
    };
    //记录/清理关卡模板记录
    StorageManager.SetLastestLevelTemplate = function (level, templateId) {
        Log.Debug("保存关卡模版id: level %i, templateID: %i", level, templateId);
        if (templateId < 0) {
            //清理记录
            localStorage.removeItem(ConstDefine.STORAGE_LEVEL_TEMPLATE_ID + level.toString());
        }
        else {
            localStorage.setItem(ConstDefine.STORAGE_LEVEL_TEMPLATE_ID + level.toString(), templateId.toString());
        }
    };
    /**************************3.0新需求******************************/
    /**
     * 获取产能数值
     */
    StorageManager.GetSpawnMoneyNum = function () {
        var data = localStorage.getItem(ConstDefine.STORAGE_SPAWN_MONEYNUM);
        if (data) {
            return parseInt(data);
        }
        else {
            this.SetSpawnMoneyNum(0);
            return 0;
        }
    };
    /**
     * 保存产能数额
     * @param money 钱币数
     */
    StorageManager.SetSpawnMoneyNum = function (money) {
        localStorage.setItem(ConstDefine.STORAGE_SPAWN_MONEYNUM, money.toString());
    };
    /**
     * 获取更新产能的时间戳（秒）
     */
    StorageManager.GetSpawnUpdateTime = function () {
        var timestamp = localStorage.getItem(ConstDefine.STORAGE_SPAWN_UPDATETIME);
        if (timestamp) {
            return parseInt(timestamp);
        }
        else {
            var timestamp_1 = Math.floor(Date.now() / 1000);
            this.SetSpawnUpdateTime(timestamp_1);
            return timestamp_1;
        }
    };
    /**
     * 设置更新产能的时间戳（秒）
     * @param date 更新时间戳（秒）
     */
    StorageManager.SetSpawnUpdateTime = function (timestamp) {
        localStorage.setItem(ConstDefine.STORAGE_SPAWN_UPDATETIME, timestamp.toString());
    };
    StorageManager.GetUnlockNewSideweapon = function () {
        var data = localStorage.getItem(ConstDefine.STORAGE_UNLOCK_NEW_SIDEWEAPON);
        if (data) {
            return data == "1";
        }
        else {
            this.SetUnlockNewSideweapon(false);
            return false;
        }
    };
    StorageManager.SetUnlockNewSideweapon = function (state) {
        var data = state ? "1" : "0";
        localStorage.setItem(ConstDefine.STORAGE_UNLOCK_NEW_SIDEWEAPON, data);
    };
    /**
     * 获取上一次发送验证短信的时间（秒）
     */
    StorageManager.GetLastVerifyMessageTime = function () {
        var data = localStorage.getItem(ConstDefine.STORAGE_LAST_MESSAGEVERIFYTIME);
        if (data) {
            return parseInt(data);
        }
        else {
            //从当前时间点往前倒数1000秒，避免新用户直接进CD
            var time = Math.floor(Date.now() / 1000) - 1000;
            this.SetLastVerifyMessageTime(time);
            return time;
        }
    };
    StorageManager.SetLastVerifyMessageTime = function (time) {
        localStorage.setItem(ConstDefine.STORAGE_LAST_MESSAGEVERIFYTIME, time.toString());
    };
    /**
     * 本地记录上一次复活的关卡数
     */
    StorageManager.GetLastRebornLevel = function () {
        var data = localStorage.getItem(ConstDefine.STORAGE_LAST_REBORN_LEVLE);
        if (data) {
            return parseInt(data);
        }
        else {
            this.SetLastRebornLevel(-1);
            return -1;
        }
    };
    StorageManager.SetLastRebornLevel = function (level) {
        localStorage.setItem(ConstDefine.STORAGE_LAST_REBORN_LEVLE, level.toString());
    };
    return StorageManager;
}());
StorageManager._Instance = null;
//# sourceMappingURL=StorageManager.js.map