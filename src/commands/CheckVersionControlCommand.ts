/*
* Laya版本控制
*/
class CheckVersionControlCommand extends puremvc.SimpleCommand {
    execute(notification: puremvc.Notification) {
        Log.Debug("2. laya version control")
        TimeWatch.Start();
        //hotupdate placeholder : DownloadMultiResCommand/DownloadMultiResCommand
        this.enableResourceVersionControl();
    }
    private enableResourceVersionControl() {
        //激活资源版本控制 改成http url
        let url = "version.json";//"http://192.168.136.1/version.json"//"version.json"
        Laya.ResourceVersion.enable(url, Handler.create(this, this.versionLoaded), Laya.ResourceVersion.FILENAME_VERSION);
    }

    versionLoaded() {
        this.next();
    }

    private next() {
        TimeWatch.Stop("check version ok");
        this.facade.registerCommand(NotificationNames.PRELOAD_COMMAND, PreloadCommand);
        this.facade.sendNotification(NotificationNames.PRELOAD_COMMAND)
    }
}