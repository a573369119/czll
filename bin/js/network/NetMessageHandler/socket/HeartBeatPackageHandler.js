var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var HeartBeatPackageHandler = (function (_super) {
    __extends(HeartBeatPackageHandler, _super);
    function HeartBeatPackageHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HeartBeatPackageHandler.prototype.BaseMsgHandler = function (data) {
        var message = com.msg.s_heartBeatPackage_7001.decode(data);
    };
    return HeartBeatPackageHandler;
}(BaseMsgHandler));
//# sourceMappingURL=HeartBeatPackageHandler.js.map