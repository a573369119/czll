/*
* name;
*/
class PlatformAuthSceneCommand extends puremvc.SimpleCommand {

    execute(notification: puremvc.INotification) {
        Log.Debug("enter auth scene")

        let sysInfo = WechatUtil.getIntance().GetSystemInfoSync();
        Log.Debug("width: " + Laya.stage.width + " " + Laya.Browser.width + " " + sysInfo.windowWidth)
        Log.Debug("height: " + Laya.stage.height + " " + Laya.Browser.height + " " + sysInfo.windowHeight)
        Log.Debug("ration:" + sysInfo.pixelRatio + " " + Laya.Browser.pixelRatio)

        let actwidth = Laya.Browser.width / Laya.Browser.pixelRatio;//sysInfo.windowWidth
        let actHeight = Laya.Browser.height / Laya.Browser.pixelRatio//sysInfo.windowHeight

        let IMAGE_WIDTH = 351;
        let IMAGE_HEIGHT = 366;

        //按钮在屏幕中的宽高, 跟随屏幕缩放, 保持正中位置
        let width = IMAGE_WIDTH / Laya.stage.width * actwidth;//200 * (Laya.stage.height/actHeight * actwidth) / Laya.stage.width * actwidth;
        let height = IMAGE_HEIGHT / Laya.stage.height * actHeight;
        let left = 0.5 * actwidth - width * 0.5;//按钮左上角在屏幕上位置
        let top = 0.5 * actHeight - height * 0.5;
        let buttonInfo = {
            type: 'image',        //     type: 'text',
            image: 'res/texture/btn_auth.png', //     text: '获取用户信息',
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
        }

        WechatFuncManager.Instance.UserInfoAuth(buttonInfo, this.onSuccess.bind(this), this.onCancel.bind(this))
    }

    private onSuccess(userInfo) {
        Log.Debug("获取用户授权成功")
        Facade.getInstance().sendNotification(NotificationNames.INIT_PLATFORM_INFO_COMMAND, true)
        // //wxb授权统计
        // WxbSDKUtil.Auth();
    }
    private onCancel(msg) {
        Log.Debug("用户取消授权")
        Facade.getInstance().sendNotification(NotificationNames.INIT_PLATFORM_INFO_COMMAND, false)
    }

}