/*
* name;
*/
class MonsterMoveComponent2D extends RandomMovementComponent {
    private static speedScale: number = 1;//移动速度缩放,统一减弱速度使用
    public static set SpeedScale(value: number) { this.speedScale = Math.max(0, value); }
    public static get SpeedScale(): number { return this.speedScale; }

    //怪物如果移动的时候不转向,那么使用这个参数
    // public moveComponentHelp2D: MoveComponentHelp2D; //

    onAdd(): void {
        // MonsterMoveComponent2D.speedScale = 1;
        // this.moveComponentHelp2D = new MoveComponentHelp2D();
        // this.moveComponentHelp2D.speed = ConfigManager.GetInstance().GetMonsterConfig(this.player.playerID).MoveSpeed;
    }

    /**
     * 暂停移动
     * @param pause true:暂停
     */
    public monsterPause(pause: boolean) {
        this.Pause(pause)
    }

    public monsterStop(): void {
        this.StopMovement();
    }

    public monsterRandomMove(delay: number = 0): void {
        //开始移动
        this.StartMovement(delay);
    }


    protected BeforeStartMovement(): void {
        super.BeforeStartMovement();
        //设置速度
        let config = ConfigManager.GetInstance().GetMonsterConfig(this.player.playerID);
        this.speedX = config.MoveSpeed;
        this.speedY = config.MoveSpeed;
    }

    protected Move(xOffset: number, yOffset: number) {
        this.player.movePlayer(-xOffset * MonsterMoveComponent2D.SpeedScale, -yOffset * MonsterMoveComponent2D.SpeedScale);
    }


}