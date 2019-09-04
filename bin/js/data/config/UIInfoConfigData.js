var UIInfoConfigData = (function () {
    function UIInfoConfigData() {
    }
    UIInfoConfigData.prototype.LoadRowBytes = function (buffer) {
        this.index = buffer.getFloat32();
        this.UIID = buffer.getUTFString();
        this.atlas = buffer.getUTFString();
        var unpackImagListLen = buffer.getInt16();
        this.unpackImagList = [];
        for (var index = 0; index < unpackImagListLen; index++) {
            this.unpackImagList.push(buffer.getUTFString());
        }
        this.uiOpenAnimType = buffer.getFloat32();
        this.uiCloseAnimType = buffer.getFloat32();
        this.uiAutoCloseType = buffer.getFloat32();
        this.uiShowType = buffer.getFloat32();
        this.depth = buffer.getFloat32();
        this.showImageBG = buffer.getInt32() > 0;
        this.imageBGPath = buffer.getUTFString();
        this.imageBGSizeGrid = buffer.getUTFString();
        this.parentType = buffer.getInt32();
    };
    UIInfoConfigData.prototype.GetID = function () { return this.index; }; //每个表必须有唯一的主键栏位
    UIInfoConfigData.prototype.Print = function () {
        var log = "";
        log += " index: " + this.index;
        log += " UIID: " + this.UIID;
        log += " atlas: " + this.atlas;
        log += " unpackImagList: ";
        var unpackImagListcount = this.unpackImagList.length;
        for (var t = 0; t < unpackImagListcount; t++) {
            log += this.unpackImagList[t];
            if (t < unpackImagListcount - 1)
                log += ",";
        }
        log += " uiOpenAnimType: " + this.uiOpenAnimType;
        log += " uiCloseAnimType: " + this.uiCloseAnimType;
        log += " uiAutoCloseType: " + this.uiAutoCloseType;
        log += " uiShowType: " + this.uiShowType;
        log += " depth: " + this.depth;
        log += " showImageBG: " + this.showImageBG;
        log += " imageBGPath: " + this.imageBGPath;
        log += " imageBGSizeGrid: " + this.imageBGSizeGrid;
        log += " parentType: " + this.parentType;
        log += "\n";
        return log;
    };
    UIInfoConfigData.prototype.GetTableName = function () {
        return "UIInfoConfigData";
    };
    return UIInfoConfigData;
}());
//# sourceMappingURL=UIInfoConfigData.js.map