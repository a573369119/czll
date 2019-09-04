/*
* name;
*/
var ClipFontUtli = (function () {
    function ClipFontUtli(space) {
        this.space = 0;
        this.clipArray = new Array();
        if (space != undefined && space != null) {
            this.space = space;
        }
        else {
            this.space = 0;
        }
    }
    ClipFontUtli.prototype.setClipNumber = function (count, align) {
        if (align === void 0) { align = FontClipAlign.center; }
        //部位0的位数
        var numberCount = 0;
        if (this.clipArray == undefined || this.clipArray == null || this.clipArray.length == 0) {
            Log.Debug("clipArray is error");
            return;
        }
        var clipCount = this.clipArray.length;
        var noNumberClipCount = 0;
        for (var index = clipCount - 1; index >= 0; index--) {
            if (index == 0) {
                this.clipArray[index].index = count % 10;
            }
            else {
                if (count >= (Math.pow(10, index))) {
                    numberCount = index;
                    this.clipArray[index].index = Math.floor(count / (Math.pow(10, index)));
                    count -= Math.floor(count / (Math.pow(10, index))) * (Math.pow(10, index));
                }
                else if (index < numberCount) {
                    //如果在前面存在数字那么这里显示0
                    this.clipArray[index].index = 0;
                }
                else {
                    // 这里为了不显示确保有不显示的索引
                    this.clipArray[index].index = 10;
                    ++noNumberClipCount;
                }
            }
        }
        //
        return this.getAlginCorrection(noNumberClipCount, align);
    };
    ClipFontUtli.prototype.getAlginCorrection = function (noNumberClipCount, align) {
        if (align === void 0) { align = FontClipAlign.center; }
        var AlginCorrectio = 0;
        switch (align) {
            case FontClipAlign.center: {
                AlginCorrectio = noNumberClipCount * (this.clipArray[0].width + this.space) / 2;
                break;
            }
            case FontClipAlign.left: {
                AlginCorrectio = noNumberClipCount * (this.clipArray[0].width + this.space);
            }
        }
        return AlginCorrectio;
    };
    return ClipFontUtli;
}());
var FontClipAlign;
(function (FontClipAlign) {
    FontClipAlign[FontClipAlign["center"] = 0] = "center";
    FontClipAlign[FontClipAlign["left"] = 1] = "left";
})(FontClipAlign || (FontClipAlign = {}));
//# sourceMappingURL=ClipFontUtli.js.map