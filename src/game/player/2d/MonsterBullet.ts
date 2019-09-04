/*
* name;
*/
class MonsterBullet extends Bullet {

    public bulletMoveCom: MonsterBulletMoveComponent2D;

    public isIt: boolean = false;

    public initComponent(): void {

        this.isIt = true;
        this.bulletMoveCom = new MonsterBulletMoveComponent2D()
        this.config = ConfigManager.GetInstance().GetBulletConfig(this.bulletType);
        this.viewComp = new ImageViewComponent(this.config.ImagePath);//(ResPathConst.BULLET_SKIN);

        this.showShapCom = new Show2DShapeComponent();
        this.addComponent(this.showShapCom);

        this.addComponent(this.viewComp);
        this.addComponent(this.bulletMoveCom);
    }


    //重写子类的
    public bulletOnRecycle(): void {

        this.bulletMoveCom.bulletStopMove();
        // BulletManager.GetInstance().Recycle(this);// .monsterBulletDic.remove(this);
    }

    public bulletOnSpawn(): void {

        // BulletManager.GetInstance().monsterBulletDic.set(this, this);
    }

}