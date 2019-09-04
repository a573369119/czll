/*
* name;
*/
var MoveComponentHelp2D = (function () {
    function MoveComponentHelp2D() {
        this.speed = 0.5;
        this.rotation = 0;
        //Y的方向  默认为 向上
        this.yDir = 1;
        this.xOffset = 0;
        this.yOffset = 0;
    }
    MoveComponentHelp2D.prototype.getMoveSpeedOnRotation = function (rotation) {
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
        }
        else if (this.rotation > 270 && this.rotation <= 360) {
            this.yOffset = this.speed * Math.sin(Math.PI / 180 * (this.rotation - 270));
            this.xOffset = this.speed * Math.cos(Math.PI / 180 * (this.rotation - 270));
        }
        this.yOffset *= this.yDir;
    };
    MoveComponentHelp2D.prototype.getMoveSpeedOnDir = function (dir) {
        this.xOffset = dir.x * this.speed;
        this.yOffset = dir.y * this.speed;
    };
    return MoveComponentHelp2D;
}());
//# sourceMappingURL=MoveComponentHelp2D.js.map