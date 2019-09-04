/*
* name;
*/
class HttpShareConfig {
    Copyright_registration_number: string
    VersionString: string
    Game_attention1: string
    Game_attention2: string
    ShareList: ShareContent[]
    isAdvertising: boolean
    BadUnitId: string
    VadUnitId: string
    pT_ResetN: string
    pT_HammerN: string
    OpenOverUI: boolean
    showShareButton: boolean

    public InitDefault() {
        this.Copyright_registration_number = "";
        this.showShareButton = false;
        HttpShareConfig.SetDefaultShareList(this);
    }

    public static SetDefaultShareList(config: HttpShareConfig) {
        config.ShareList = [
            new ShareContent("消灭那些虫子！", ResPathConst.SHARE_PIC[0]),
            // new ShareContent("我在滚铁环, 要来挑战吗?", ResPathConst.SHARE_PIC[1])
        ];
    }
}

class ShareContent {
    ShareTitle: string
    ShareImg: string

    constructor(title: string, img: string) {
        this.ShareImg = img,
            this.ShareTitle = title;
    }
}