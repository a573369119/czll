/*
* name;
*/
var TimeWatch = (function () {
    function TimeWatch() {
    }
    TimeWatch.Start = function () {
        this.startedTime = new Date().getTime();
    };
    TimeWatch.Stop = function (msg) {
        var endTime = new Date().getTime();
        Log.Debug("================================================================");
        if (msg)
            Log.Debug(msg);
        Log.Debug("elapsed:" + (endTime - this.startedTime) / 1000);
        Log.Debug("================================================================");
    };
    return TimeWatch;
}());
TimeWatch.startedTime = 0;
//# sourceMappingURL=TimeWatch.js.map