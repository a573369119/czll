/*
* name;
*/
class PropMoveComponent extends RandomMovementComponent {
    protected BeforeStartMovement(): void {
        //不旋转图片
        this.ROTATE_VIEW_ON_DIR_CHANGE = false;
        super.BeforeStartMovement();
        //设置速度
        let config = ConfigManager.GetInstance().GetPropConfig((this.player as Prop).Type)
        this.speedX = config.MoveSpeed;
        this.speedY = config.MoveSpeed;
    }
}