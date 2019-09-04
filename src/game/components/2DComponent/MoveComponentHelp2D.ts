/*
* name;
*/
class MoveComponentHelp2D {

    public speed: number = 0.5;
    public rotation: number = 0;
    //Y的方向  默认为 向上
    public yDir: number = 1;

    public xOffset: number = 0;
    public yOffset: number = 0;

    public getMoveSpeedOnRotation(rotation: number): void {

        this.rotation = rotation;

        if (this.rotation <= 90) {
            this.xOffset = -this.speed * Math.sin(Math.PI / 180 * this.rotation);
            this.yOffset = this.speed * Math.cos(Math.PI / 180 * this.rotation);
        }
        else if (this.rotation <= 180 && this.rotation > 90) {
            this.xOffset = -this.speed * Math.sin(Math.PI / 180 * (180 - this.rotation));
            this.yOffset = -this.speed * Math.cos(Math.PI / 180 * (180 - this.rotation));
        }
        else if (this.rotation > 180 && this.rotation <= 270) {
            this.xOffset = this.speed * Math.sin(Math.PI / 180 * (this.rotation - 180));
            this.yOffset = -this.speed * Math.cos(Math.PI / 180 * (this.rotation - 180));
        } else if (this.rotation > 270 && this.rotation <= 360) {
            this.yOffset = this.speed * Math.sin(Math.PI / 180 * (this.rotation - 270));
            this.xOffset = this.speed * Math.cos(Math.PI / 180 * (this.rotation - 270));
        }
        this.yOffset *= this.yDir;
    }

    public getMoveSpeedOnDir(dir: Vec2): void {

        this.xOffset = dir.x * this.speed;
        this.yOffset = dir.y * this.speed;

    }
}