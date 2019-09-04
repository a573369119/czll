/*
* name;
*/
var Log = (function () {
    function Log() {
    }
    Log.Debug = function (message) {
        var optionalParams = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            optionalParams[_i - 1] = arguments[_i];
        }
        var logHelper = Laya.Browser.window["LogHelper"];
        //微信默认关闭log 使用loghelper开关 / 其他使用uselog开关
        if (Laya.Browser.onWeiXin && logHelper
            || !Laya.Browser.onWeiXin && this.useLog) {
        }
        // HttpManager.getIntance().GetJson("http://192.168.1.23:8101/log?msg=" + message);
    };
    Log.Info = function (message) {
        var optionalParams = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            optionalParams[_i - 1] = arguments[_i];
        }
        var logHelper = Laya.Browser.window["LogHelper"];
        //微信默认关闭log 使用loghelper开关 / 其他使用uselog开关
        if (Laya.Browser.onWeiXin && logHelper
            || !Laya.Browser.onWeiXin && this.useLog) {
        }
        // HttpManager.getIntance().GetJson("http://192.168.1.23:8101/log?msg=" + message);
    };
    Log.Warn = function (message) {
        var optionalParams = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            optionalParams[_i - 1] = arguments[_i];
        }
        var logHelper = Laya.Browser.window["LogHelper"];
        if (Laya.Browser.onWeiXin && logHelper
            || !Laya.Browser.onWeiXin && this.useLog) {
            console.warn.apply(console, ["[WARNING]:" + message].concat(optionalParams));
        }
        // HttpManager.getIntance().GetJson("http://192.168.1.23:8101/log?msg=[WARNING]:" + message);
    };
    Log.Error = function (message) {
        var optionalParams = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            optionalParams[_i - 1] = arguments[_i];
        }
        // HttpManager.getIntance().GetJson("http://192.168.1.23:8101/log?msg=[ERROR]:" + message);
        var logHelper = Laya.Browser.window["LogHelper"];
        if (Laya.Browser.onWeiXin && logHelper
            || !Laya.Browser.onWeiXin && this.useLog) {
            console.error.apply(console, ["[ERROR]:" + message].concat(optionalParams));
        }
    };
    return Log;
}());
Log.useLog = true;
//# sourceMappingURL=Log.js.map