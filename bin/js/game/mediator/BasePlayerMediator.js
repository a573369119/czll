var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*
* name;
*/
var BasePlayerMediator = (function (_super) {
    __extends(BasePlayerMediator, _super);
    function BasePlayerMediator(name) {
        var _this = _super.call(this) || this;
        _this.playerDic = new Laya.Dictionary();
        _this.mediatorName = name;
        return _this;
    }
    ;
    BasePlayerMediator.prototype.onRegister = function () {
    };
    BasePlayerMediator.prototype.listNotificationInterests = function () {
        _super.prototype.listNotificationInterests.call(this);
        return [];
    };
    BasePlayerMediator.prototype.handleNotification = function (notification) {
        _super.prototype.handleNotification.call(this, notification);
        switch (notification.getName()) {
        }
    };
    // TODO 基础方法
    BasePlayerMediator.prototype.createPlayer = function () {
        console.log("createPlayer");
    };
    return BasePlayerMediator;
}(puremvc.Mediator));
//# sourceMappingURL=BasePlayerMediator.js.map