/*
* name;
*/
class CommonStruct {
}

class Vec2 {
    public static get UPForLaya2D(): Vec2 { return new Vec2(0, -1) }
    public static get UP(): Vec2 { return new Vec2(0, 1) }
    public static get RIGHT(): Vec2 { return new Vec2(1, 0) }

    public x;
    public y;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    //返回 this.vec2 - other.Vec2
    public sub(other: Vec2): Vec2 {
        return new Vec2(this.x - other.x, this.y - other.y)
    }
    //返回 this.vec2 + other.Vec2
    public add(other: Vec2): Vec2 {
        return new Vec2(this.x + other.x, this.y + other.y)
    }
    public mul(scale: number): Vec2 {
        return new Vec2(this.x * scale, this.y * scale)
    }
    public mulVec2(vec2: Vec2): Vec2 {
        return new Vec2(this.x * vec2.x, this.y * vec2.y)
    }
    public dot(other: Vec2): number {
        return this.x * other.x + this.y * other.y
    }
    public normalise(): Vec2 {
        let len = Math.sqrt(this.x * this.x + this.y * this.y)
        if (len > 0) {
            return new Vec2(this.x / len, this.y / len)
        } else {
            Log.Error("向量长度为0 %f %f, 返回(0 0)向量", this.x, this.y)
            return new Vec2(0, 0);//new Vec2(0.707, 0.707)
        }
    }

    public dist(to: Vec2): number {
        let x = to.x - this.x;
        let y = to.y - this.y;
        return Math.sqrt(x * x + y * y)
    }

    public equal(other: Vec2): boolean {
        return this.x == other.x && this.y == other.y;
    }

    public magnitude(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y)
    }

    public magnitudePower2(): number {
        return this.x * this.x + this.y * this.y
    }

    public clone(): Vec2 {
        return new Vec2(this.x, this.y)
    }
}

class CollsionShapInfo {
    public center: Vec2;//中心位置
    public shape: EnumCollisionShape;//碰撞形态
    constructor(center: Vec2, shape: EnumCollisionShape) {
        this.center = center;
        this.shape = shape;
    }
}

class BoxCollisonInfo extends CollsionShapInfo {
    public size: Vec2;//矩形大小
    public rotation: number;//顺时针旋转角度
    constructor(center: Vec2, size: Vec2, rotation: number = 0) {
        super(center, EnumCollisionShape.Box);
        this.size = size;
        this.rotation = rotation;
    }
}

//扇形
class SectorCollisonInfo extends CollsionShapInfo {
    public radius: number;//半径
    public sectorAngle: number;//扇形角度
    public rotation: number;//旋转 现在没考虑为0
    constructor(center: Vec2, radius: number, angle: number, rotation: number = 0) {
        super(center, EnumCollisionShape.Sector);
        this.radius = radius;
        this.sectorAngle = angle;
        this.rotation = rotation;
    }
}


class CircleCollisonInfo extends CollsionShapInfo {
    public radius: number;//半径
    constructor(center: Vec2, radius: number) {
        super(center, EnumCollisionShape.Circle);
        this.radius = radius;
    }
}