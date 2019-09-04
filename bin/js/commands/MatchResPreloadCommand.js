var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*
*  进入游戏前, 游戏资源的预加载
*/
var MatchResPreloadCommand = (function (_super) {
    __extends(MatchResPreloadCommand, _super);
    function MatchResPreloadCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MatchResPreloadCommand.prototype.execute = function (notification) {
        MatchResPreloadCommand.IsInited = true;
        var preloadMsgBody = notification.getBody();
        var cb = preloadMsgBody.cb;
        var progressFunc = preloadMsgBody.progress;
        //初始化3d模型对象池
        PoolManger.GetInstance().Create3DPoolsByURLs([], function () {
            //需要使用的模型贴图加载
            // ResourceManager.GetInstance().createTextureArray(ResPathConst.BALL_SKIN_ARRAY, () => {
            //不在资源加载完后 马上渲染, 下一帧
            TimeManager.getInst().once(0, cbhandler.gen_handler(function () {
                if (cb)
                    cb();
            }));
            // })
        }, function (progress) {
            // Log.Debug("match res progress " + progress)
            if (progressFunc)
                progressFunc(progress);
        });
    };
    return MatchResPreloadCommand;
}(puremvc.SimpleCommand));
MatchResPreloadCommand.IsInited = false;
//# sourceMappingURL=MatchResPreloadCommand.js.map