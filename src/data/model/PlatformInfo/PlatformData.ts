/*
* name;
*/
class PlatformData {
    private wechatHeader: string
    private wechatOpenID: string;
    private wechatNickName: string
    private IsPlatformDataChanged: boolean; //平台数据修改, 头像昵称修改了,需要通知服务器修改

    public set OpenID(openid: string) {
        this.wechatOpenID = openid
    }
    public get OpenID(): string {
        return this.wechatOpenID
    }

    public set UserHeader(header: string) {
        this.wechatHeader = header
    }
    public get UserHeader(): string {
        return this.wechatHeader
    }

    public set UserNickName(nickName: string) {
        this.wechatNickName = nickName
    }
    public get UserNickName(): string {
        return this.wechatNickName
    }


    public set IsChanged(changed: boolean) {
        this.IsPlatformDataChanged = changed
    }
    public get IsChanged(): boolean {
        return this.IsPlatformDataChanged
    }
}