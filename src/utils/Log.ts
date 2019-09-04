/*
* name;
*/
class Log {
    private static useLog = true;
    public static Debug(message?: any, ...optionalParams: any[]): void {
        var logHelper = Laya.Browser.window["LogHelper"];
        //微信默认关闭log 使用loghelper开关 / 其他使用uselog开关
        if (Laya.Browser.onWeiXin && logHelper
            || !Laya.Browser.onWeiXin && this.useLog) {
            // console.log((Laya.timer ? ("FrameNO: " + Laya.timer.currFrame) : "") + " message:" + message, ...optionalParams);
        }
        // HttpManager.getIntance().GetJson("http://192.168.1.23:8101/log?msg=" + message);
    }

    public static Info(message?: any, ...optionalParams: any[]): void {
        var logHelper = Laya.Browser.window["LogHelper"];
        //微信默认关闭log 使用loghelper开关 / 其他使用uselog开关
        if (Laya.Browser.onWeiXin && logHelper
            || !Laya.Browser.onWeiXin && this.useLog) {
            // console.log((Laya.timer ? ("FrameNO: " + Laya.timer.currFrame) : "") + " message:" + message, ...optionalParams);
        }
        // HttpManager.getIntance().GetJson("http://192.168.1.23:8101/log?msg=" + message);
    }

    public static Warn(message?: any, ...optionalParams: any[]): void {
        var logHelper = Laya.Browser.window["LogHelper"];
        if (Laya.Browser.onWeiXin && logHelper
            || !Laya.Browser.onWeiXin && this.useLog) {
            console.warn("[WARNING]:" + message, ...optionalParams);
        }
        // HttpManager.getIntance().GetJson("http://192.168.1.23:8101/log?msg=[WARNING]:" + message);
    }

    public static Error(message?: any, ...optionalParams: any[]): void {
        // HttpManager.getIntance().GetJson("http://192.168.1.23:8101/log?msg=[ERROR]:" + message);
        var logHelper = Laya.Browser.window["LogHelper"];
        if (Laya.Browser.onWeiXin && logHelper
            || !Laya.Browser.onWeiXin && this.useLog) {
            console.error("[ERROR]:" + message, ...optionalParams);
        }
    }
}