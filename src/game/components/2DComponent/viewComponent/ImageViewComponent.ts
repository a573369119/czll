/*
* 使用Image的角色/怪物
*/
class ImageViewComponent extends ViewComponentBase2D {
    //TODO 暂时对外
    public view: Laya.Image;
    public img_Second: Laya.Image = new Laya.Image();
    public get ViewSize(): Vec2 { return new Vec2(this.view.width * this.view.scaleX, this.view.height * this.view.scaleY); }
    public get View(): any { return this.view; }
    private imgUrl: string;
    private width: number;//记录大小
    private height: number;
    constructor(imgUrl: string) {
        super();
        this.imgUrl = imgUrl;
    }

    public createView() {
        this.createImageView(this.imgUrl);
    }

    //切换形象
    public ChangeView(urlOrId?: any) {
        this.imgUrl = urlOrId;
        this.showView();
    }

    public getView(): Laya.Image {
        return this.view;
    }

    protected createImageView(url: string) {

        this.view = new Laya.Image();
        //TODO根据playerID 获取对应的皮肤
        this.view.skin = this.skinSpecial(url);
        // this.view.pivotX = this.view.width * 0.5;
        // this.view.pivotY = this.view.height * 0.5;
        this.view.anchorX = 0.5;
        this.view.anchorY = 0.5;
        this.player.comParent.addChild(this.view);
        this.player.comParent.addChild(this.img_Second);
        this.width = this.view.width;
        this.height = this.view.height;
        this.SetActive(true)
    }

    protected destoryView() {
        if (this.view) this.view.destroy(true)
        this.view = null;
    }

    public setPlayerView(): void {
        this.player.viewHeight = this.view.height;//判断instage
        this.player.viewHeightHalf = this.view.height * 0.5;
        this.player.viewWidth = this.view.width;
        this.player.viewWidthHalf = this.view.width * 0.5;
    }

    //检测是否和另外一个物体碰撞了
    public checkHit(sp: Laya.Sprite): boolean {
        // Log.Debug("检测碰撞")
        var flag: boolean = false;
        //缩放的时候飞机的宽度不变，所以要乘以缩放系数。Y 暂时没有乘因为效果还可以
        if (Math.abs(this.player.comParent.x - sp.x) < this.player.viewHeightHalf * (this.player.viewComp as ImageViewComponent).view.scaleX + sp.width &&
            Math.abs(this.player.comParent.y - sp.y) < this.view.height + sp.height) {
            flag = true;
        }
        return flag;

    }

    //设置缩放
    public setViewScale(scaleX: number, scaleY: number): void {
        this.view.scale(scaleX, scaleY);
    }

    //设置是否显示
    public SetActive(active: boolean) {
        // this.view.visible = active//
        this.player.setPlayerActive(active)
    }

    /**呼叫支援飞机 颜色改变 */
    public changeStyle(box): void {
        if (!this.img_Second) this.img_Second = new Laya.Image();
        else this.img_Second.graphics.clear();
        this.img_Second.anchorX = 0.5;
        this.img_Second.anchorY = 0.5;
        this.img_Second.loadImage(this.imgUrl);
        var colorMatrix = [
            1, 0, 0, 0, 0, //R
            0, 1, 0, 0, 0, //G
            0, 0, 1, 0.5, 0, //B
            0, 0, 0, 1, 0, //A
        ];
        let colorFilter = new Laya.ColorFilter(colorMatrix);
        this.img_Second.filters = [colorFilter];
        box.addChild(this.img_Second);
        // console.log("--------------");
        // console.log("width:" + this.width + "height" + this.height);
        // console.log(this.img_Second);
        // console.log(box);
        // console.log(this.view);
    }

    /***皮肤表 */
    public skinSpecial(url): string {
        if (GameDataManager.getInstance().LoginPlayerInfo.VerifyInfo.state == 1) {
            if (url == "resources/player/planes/role_fight_weapon_01.png") {//变异飞机1
                url = "resources/player/planes/role_fight_weapon_01_1.png";
            }
        }
        return url;
    }

    /***更新皮肤 */
    public updataSkin(): void {
        this.view.skin = this.skinSpecial(this.view.skin);
    }
}