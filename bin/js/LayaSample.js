var WebGL = laya.webgl.WebGL;
//ps 1: 微信不要启用版本管理 ,否在声音文件的后缀带md5码, 配置的路径找不到.
//gameModify1. 添加唯一id, 否则子弹穿透伤害每个怪物一次, 不方便记录怪物id.  根据id获取怪物.
//gameModify2. 添加状态, 死亡或存活.
//gameModify3. 添加spine重复播放的处理
//gameModify4. 受击特效间隔0.1内不播放, 多次检测子弹碰撞
// 程序入口
var GameMain = (function () {
    function GameMain() {
        //所有适配模式
        this._modes = ["noscale", "exactfit", "showall", "noborder", "full", "fixedwidth", "fixedheight"];
        puremvc.Facade.getInstance().registerCommand(NotificationNames.START_UP_INIT_COMMAND, StartupInitCommand);
        puremvc.Facade.getInstance().sendNotification(NotificationNames.START_UP_INIT_COMMAND);
        // HttpManager.getIntance().PathJson("http://192.168.1.8:8101/log2", { "msg": "testmsgsss" },
        // () => {
        //     Log.Debug("success")
        // },
        // (errMsg) => {
        //     Log.Debug("fail" + errMsg)
        // })
        // HttpManager.getIntance().Patch("http://192.168.1.8:8101/log2", null, "application/json;charset=UTF-8", "json",
        //     () => {
        //         Log.Debug("success")
        //     },
        //     (errMsg) => {
        //         Log.Debug("fail" + errMsg)
        //     })
    }
    return GameMain;
}());
new GameMain();
//# sourceMappingURL=LayaSample.js.map