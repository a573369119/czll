var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*
* name;
*/
var LotteryItem = (function (_super) {
    __extends(LotteryItem, _super);
    function LotteryItem() {
        return _super.call(this) || this;
    }
    LotteryItem.prototype.InitItem = function (skin, num, width, discr) {
        if (width === void 0) { width = 120; }
        //图片
        this.UI_Img_Icon.skin = skin;
        this.UI_Img_Icon.width = width;
        this.UI_Img_Icon.height = width;
        //文字
        this.UI_Txt_Num.visible = num > 1;
        this.UI_Txt_Num.text = num.toString();
        //文字
        this.lab_descr.text = "";
    };
    return LotteryItem;
}(ui.PrefabUI.LotteryItemPrefabUI));
//# sourceMappingURL=LotteryItem.js.map