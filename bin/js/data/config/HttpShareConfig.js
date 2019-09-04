/*
* name;
*/
var HttpShareConfig = (function () {
    function HttpShareConfig() {
    }
    HttpShareConfig.prototype.InitDefault = function () {
        this.Copyright_registration_number = "";
        this.showShareButton = false;
        HttpShareConfig.SetDefaultShareList(this);
    };
    HttpShareConfig.SetDefaultShareList = function (config) {
        config.ShareList = [
            new ShareContent("消灭那些虫子！", ResPathConst.SHARE_PIC[0]),
        ];
    };
    return HttpShareConfig;
}());
var ShareContent = (function () {
    function ShareContent(title, img) {
        this.ShareImg = img,
            this.ShareTitle = title;
    }
    return ShareContent;
}());
//# sourceMappingURL=HttpShareConfig.js.map