class UIInfoConfigData implements IByteConfig {

    public index: number;
    public UIID: string;
    public atlas: string;
    public unpackImagList: string[];
    public uiOpenAnimType: number;
    public uiCloseAnimType: number;
    public uiAutoCloseType: number;
    public uiShowType: number;
    public depth: number;
    public showImageBG: boolean;
    public imageBGPath: string;
    public imageBGSizeGrid: string;
    public parentType: number;

    public LoadRowBytes(buffer: Laya.Byte) {
        
        this.index = buffer.getFloat32();
        this.UIID = buffer.getUTFString();
        this.atlas = buffer.getUTFString();
        let unpackImagListLen = buffer.getInt16();
        this.unpackImagList= [];
        for (let index = 0; index < unpackImagListLen; index++) {
            this.unpackImagList.push(buffer.getUTFString())
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

    }

    public GetID(): number { return this.index }//每个表必须有唯一的主键栏位


    public Print(): string {
         let log = "";
        log += " index: " + this.index;
        log += " UIID: " + this.UIID;
        log += " atlas: " + this.atlas;
        log += " unpackImagList: ";
        let unpackImagListcount = this.unpackImagList.length;
        for (let t = 0; t < unpackImagListcount; t++)
        {
            log += this.unpackImagList[t];
            if (t < unpackImagListcount - 1) log += ",";
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
    }

    public GetTableName(): string {
        return "UIInfoConfigData"
    }
}
