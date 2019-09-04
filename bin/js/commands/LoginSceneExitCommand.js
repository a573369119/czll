var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*
* name;
*/
var LoginSceneExitCommand = (function (_super) {
    __extends(LoginSceneExitCommand, _super);
    function LoginSceneExitCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LoginSceneExitCommand.prototype.execute = function (notification) {
        Log.Debug("COMMAND: exit login scene");
        LoginSceneEnterCommand.InScene = false;
    };
    return LoginSceneExitCommand;
}(puremvc.SimpleCommand));
//# sourceMappingURL=LoginSceneExitCommand.js.map