/*
* name;
*/
var PlatformData = (function () {
    function PlatformData() {
    }
    Object.defineProperty(PlatformData.prototype, "OpenID", {
        get: function () {
            return this.wechatOpenID;
        },
        set: function (openid) {
            this.wechatOpenID = openid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlatformData.prototype, "UserHeader", {
        get: function () {
            return this.wechatHeader;
        },
        set: function (header) {
            this.wechatHeader = header;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlatformData.prototype, "UserNickName", {
        get: function () {
            return this.wechatNickName;
        },
        set: function (nickName) {
            this.wechatNickName = nickName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlatformData.prototype, "IsChanged", {
        get: function () {
            return this.IsPlatformDataChanged;
        },
        set: function (changed) {
            this.IsPlatformDataChanged = changed;
        },
        enumerable: true,
        configurable: true
    });
    return PlatformData;
}());
//# sourceMappingURL=PlatformData.js.map