var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*
* name;
*/
var PlatformAuthSceneCommand = (function (_super) {
    __extends(PlatformAuthSceneCommand, _super);
    function PlatformAuthSceneCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PlatformAuthSceneCommand.prototype.execute = function (notification) {
        Log.Debug("enter auth scene");
        var sysInfo = WechatUtil.getIntance().GetSystemInfoSync();
        Log.Debug("width: " + Laya.stage.width + " " + Laya.Browser.width + " " + sysInfo.windowWidth);
        Log.Debug("height: " + Laya.stage.height + " " + Laya.Browser.height + " " + sysInfo.windowHeight);
        Log.Debug("ration:" + sysInfo.pixelRatio + " " + Laya.Browser.pixelRatio);
        var actwidth = Laya.Browser.width / Laya.Browser.pixelRatio; //sysInfo.windowWidth
        var actHeight = Laya.Browser.height / Laya.Browser.pixelRatio; //sysInfo.windowHeight
        var IMAGE_WIDTH = 351;
        var IMAGE_HEIGHT = 366;
        //按钮在屏幕中的宽高, 跟随屏幕缩放, 保持正中位置
        var width = IMAGE_WIDTH / Laya.stage.width * actwidth; //200 * (Laya.stage.height/actHeight * actwidth) / Laya.stage.width * actwidth;
        var height = IMAGE_HEIGHT / Laya.stage.height * actHeight;
        var left = 0.5 * actwidth - width * 0.5; //按钮左上角在屏幕上位置
        var top = 0.5 * actHeight - height * 0.5;
        var buttonInfo = {
            type: 'image',
            image: 'res/texture/btn_auth.png',
            style: {
                left: left,
                top: top,
                width: width,
                height: height,
                // lineHeight: 40,
                // backgroundColor: '#000000',
                // color: '#ffffff', //0000 0000
                // textAlign: 'center',
                // fontSize: 16,
                borderRadius: 4
            }
        };
        WechatFuncManager.Instance.UserInfoAuth(buttonInfo, this.onSuccess.bind(this), this.onCancel.bind(this));
    };
    PlatformAuthSceneCommand.prototype.onSuccess = function (userInfo) {
        Log.Debug("获取用户授权成功");
        Facade.getInstance().sendNotification(NotificationNames.INIT_PLATFORM_INFO_COMMAND, true);
        // //wxb授权统计
        // WxbSDKUtil.Auth();
    };
    PlatformAuthSceneCommand.prototype.onCancel = function (msg) {
        Log.Debug("用户取消授权");
        Facade.getInstance().sendNotification(NotificationNames.INIT_PLATFORM_INFO_COMMAND, false);
    };
    return PlatformAuthSceneCommand;
}(puremvc.SimpleCommand));
//# sourceMappingURL=PlatformAuthSceneCommand.js.map