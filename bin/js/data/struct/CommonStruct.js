var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*
* name;
*/
var CommonStruct = (function () {
    function CommonStruct() {
    }
    return CommonStruct;
}());
var Vec2 = (function () {
    function Vec2(x, y) {
        this.x = x;
        this.y = y;
    }
    Object.defineProperty(Vec2, "UPForLaya2D", {
        get: function () { return new Vec2(0, -1); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vec2, "UP", {
        get: function () { return new Vec2(0, 1); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vec2, "RIGHT", {
        get: function () { return new Vec2(1, 0); },
        enumerable: true,
        configurable: true
    });
    //返回 this.vec2 - other.Vec2
    Vec2.prototype.sub = function (other) {
        return new Vec2(this.x - other.x, this.y - other.y);
    };
    //返回 this.vec2 + other.Vec2
    Vec2.prototype.add = function (other) {
        return new Vec2(this.x + other.x, this.y + other.y);
    };
    Vec2.prototype.mul = function (scale) {
        return new Vec2(this.x * scale, this.y * scale);
    };
    Vec2.prototype.mulVec2 = function (vec2) {
        return new Vec2(this.x * vec2.x, this.y * vec2.y);
    };
    Vec2.prototype.dot = function (other) {
        return this.x * other.x + this.y * other.y;
    };
    Vec2.prototype.normalise = function () {
        var len = Math.sqrt(this.x * this.x + this.y * this.y);
        if (len > 0) {
            return new Vec2(this.x / len, this.y / len);
        }
        else {
            Log.Error("向量长度为0 %f %f, 返回(0 0)向量", this.x, this.y);
            return new Vec2(0, 0); //new Vec2(0.707, 0.707)
        }
    };
    Vec2.prototype.dist = function (to) {
        var x = to.x - this.x;
        var y = to.y - this.y;
        return Math.sqrt(x * x + y * y);
    };
    Vec2.prototype.equal = function (other) {
        return this.x == other.x && this.y == other.y;
    };
    Vec2.prototype.magnitude = function () {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    };
    Vec2.prototype.magnitudePower2 = function () {
        return this.x * this.x + this.y * this.y;
    };
    Vec2.prototype.clone = function () {
        return new Vec2(this.x, this.y);
    };
    return Vec2;
}());
var CollsionShapInfo = (function () {
    function CollsionShapInfo(center, shape) {
        this.center = center;
        this.shape = shape;
    }
    return CollsionShapInfo;
}());
var BoxCollisonInfo = (function (_super) {
    __extends(BoxCollisonInfo, _super);
    function BoxCollisonInfo(center, size, rotation) {
        if (rotation === void 0) { rotation = 0; }
        var _this = _super.call(this, center, EnumCollisionShape.Box) || this;
        _this.size = size;
        _this.rotation = rotation;
        return _this;
    }
    return BoxCollisonInfo;
}(CollsionShapInfo));
//扇形
var SectorCollisonInfo = (function (_super) {
    __extends(SectorCollisonInfo, _super);
    function SectorCollisonInfo(center, radius, angle, rotation) {
        if (rotation === void 0) { rotation = 0; }
        var _this = _super.call(this, center, EnumCollisionShape.Sector) || this;
        _this.radius = radius;
        _this.sectorAngle = angle;
        _this.rotation = rotation;
        return _this;
    }
    return SectorCollisonInfo;
}(CollsionShapInfo));
var CircleCollisonInfo = (function (_super) {
    __extends(CircleCollisonInfo, _super);
    function CircleCollisonInfo(center, radius) {
        var _this = _super.call(this, center, EnumCollisionShape.Circle) || this;
        _this.radius = radius;
        return _this;
    }
    return CircleCollisonInfo;
}(CollsionShapInfo));
//# sourceMappingURL=CommonStruct.js.map