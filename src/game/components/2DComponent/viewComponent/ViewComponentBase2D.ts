/*
* name;
*/
class ViewComponentBase2D extends ComponentBase2D {

    public get View(): any { return null; }

    public get ViewSize(): Vec2 { return null; }
    onAdd(): void {
        this.showView();
    }
    onRemove(): void {
        this.player = null;
        this.destoryView();
    }


    //显示
    public showView(urlOrId?: any): void {
        this.destoryView();
        this.createView(urlOrId);
        this.setPlayerView();
        this.onVewCreated();
    }

    //子类override
    public createView(urlOrId?: any) {
    }
    protected destoryView() {
    }
    public setPlayerView(): void {
    }
    public onVewCreated(): void {
    }

    //切换形象
    public ChangeView(urlOrId?: any) {
        // this.showView(url);
    }

    //设置缩放
    public setViewScale(scaleX: number, scaleY: number): void {
        // this.view.scale(scaleX, scaleY);
    }

    //设置是否显示
    public SetActive(active: boolean) {
    }
}