/*
* name;
*/
class LoginSceneExitCommand extends puremvc.SimpleCommand {
    execute(notification: puremvc.Notification) {
        Log.Debug("COMMAND: exit login scene")
        LoginSceneEnterCommand.InScene = false;
    }
}