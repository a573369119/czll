var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*
* Laya版本控制
*/
var CheckVersionControlCommand = (function (_super) {
    __extends(CheckVersionControlCommand, _super);
    function CheckVersionControlCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CheckVersionControlCommand.prototype.execute = function (notification) {
        Log.Debug("2. laya version control");
        TimeWatch.Start();
        //hotupdate placeholder : DownloadMultiResCommand/DownloadMultiResCommand
        this.enableResourceVersionControl();
    };
    CheckVersionControlCommand.prototype.enableResourceVersionControl = function () {
        //激活资源版本控制 改成http url
        var url = "version.json"; //"http://192.168.136.1/version.json"//"version.json"
        Laya.ResourceVersion.enable(url, Handler.create(this, this.versionLoaded), Laya.ResourceVersion.FILENAME_VERSION);
    };
    CheckVersionControlCommand.prototype.versionLoaded = function () {
        this.next();
    };
    CheckVersionControlCommand.prototype.next = function () {
        TimeWatch.Stop("check version ok");
        this.facade.registerCommand(NotificationNames.PRELOAD_COMMAND, PreloadCommand);
        this.facade.sendNotification(NotificationNames.PRELOAD_COMMAND);
    };
    return CheckVersionControlCommand;
}(puremvc.SimpleCommand));
//# sourceMappingURL=CheckVersionControlCommand.js.map