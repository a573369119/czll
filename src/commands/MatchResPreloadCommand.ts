/*
*  进入游戏前, 游戏资源的预加载
*/
class MatchResPreloadCommand extends puremvc.SimpleCommand {
    public static IsInited = false;

    execute(notification: puremvc.INotification) {
        MatchResPreloadCommand.IsInited = true;
        let preloadMsgBody = notification.getBody() as PreloadMsgBody;
        let cb: Function = preloadMsgBody.cb;
        let progressFunc: Function = preloadMsgBody.progress;

        //初始化3d模型对象池
        PoolManger.GetInstance().Create3DPoolsByURLs(
            [
                //3d模型加载
                // ResPathConst.SIDE_BLOCK,
            ],
            () => {
                //需要使用的模型贴图加载
                // ResourceManager.GetInstance().createTextureArray(ResPathConst.BALL_SKIN_ARRAY, () => {
                    //不在资源加载完后 马上渲染, 下一帧
                    TimeManager.getInst().once(0, cbhandler.gen_handler(() => {
                        if (cb) cb();
                    }))
                // })
            },
            (progress) => {
                // Log.Debug("match res progress " + progress)
                if (progressFunc) progressFunc(progress)
            }
        )
    }
}