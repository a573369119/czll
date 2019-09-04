/*
* name;
*/
var ShakeManager = (function () {
    function ShakeManager() {
        //怪物
        this.shakeDataDic = new Laya.Dictionary();
    }
    ShakeManager.GetInstance = function () {
        if (!this._instance) {
            this._instance = new ShakeManager();
        }
        return this._instance;
    };
    /**
     * 震动
     * @param sprite 需要震动的物体
     * @param range 震动距离（像素），值越大震动范围越大，默认10(像素)
     */
    ShakeManager.prototype.ShakeSprite = function (sprite, range, cb, duration, intensive) {
        //在一个范围内按照左、右的顺序选择一定数量的点，然后通过路径动画播放
        //暂时设定范围为-10~10，-10~10
        if (duration === void 0) { duration = 0.3; }
        if (intensive === void 0) { intensive = false; }
        //1.记录原位置，最后需要回来
        var spritePos = new Vec2(sprite.x, sprite.y);
        //2.生成路径数组，保证数组的起始与结束为同一位置
        var path = this.GenRandomPos(spritePos, range, intensive);
        //3.通过动画，播放路径，并保存动画task
        var task = Tween2DUtil.path({
            node: sprite,
            duration: duration,
            x: spritePos.x,
            y: spritePos.y,
            path: path,
            onComplete: cbhandler.gen_handler(function () {
                sprite.pos(spritePos.x, spritePos.y);
                if (cb) {
                    cb.exec();
                }
            }, this)
        });
        //4.记录，防止多重震动引起偏移
        return task;
    };
    ShakeManager.prototype.StopShake = function (task) {
        Tween2DUtil.kill(task);
    };
    ShakeManager.prototype.GenRandomPos = function (pos, range, intensive) {
        if (intensive === void 0) { intensive = false; }
        var randomPosArray = [];
        //起始点
        randomPosArray.push(pos);
        //按照奇偶交替，随机选择
        for (var i = 0; i < 6; i++) {
            var x = pos.x;
            var y = pos.y;
            if (i % 2 == 0) {
                //偶数
                x += (Math.random() * range ? range : 10) - range ? range : 10;
            }
            else {
                //奇数
                x += (Math.random() * range ? range : 10) + range ? range : 10;
            }
            y += (Math.random() * 20) - 10;
            var nextPos = new Vec2(x, y);
            randomPosArray.push(nextPos);
            if (intensive) {
                // let nextPos1 = new Vec2(2 * pos.x - x, 2 * pos.y - y);
                var nextPos1 = new Vec2(pos.x - (x - pos.x) * 0.5, pos.y - (y - pos.y) * 0.5);
                randomPosArray.push(nextPos1);
            }
        }
        //结束返回起始点
        randomPosArray.push(pos);
        return randomPosArray;
    };
    ShakeManager.prototype.ShakeMonster = function (sprite, cb, range, duration, freq) {
        if (range === void 0) { range = 10; }
        if (duration === void 0) { duration = 0.3; }
        if (freq === void 0) { freq = 0.1; }
        var shakeData = new ShakeData(sprite, duration, range, freq, cb);
        shakeData.Start();
        this.shakeDataDic.set(shakeData.ID, shakeData);
        return shakeData.ID;
    };
    ShakeManager.prototype.StopShakeMonster = function (id) {
        var shakeData = this.shakeDataDic.get(id);
        if (shakeData) {
            this.shakeDataDic.remove(id);
            TimeManager.getInst().remove(id);
        }
    };
    return ShakeManager;
}());
var ShakeData = (function () {
    function ShakeData(sprite, duration, range, freq, cb) {
        this.timePassed = 0;
        this.sinceLastShake = 0;
        this.sprite = sprite;
        this.originalPos = new Vec2(this.sprite.x, this.sprite.y);
        this.duration = duration;
        this.range = range;
        this.frequence = freq;
        this.onCompleteCallback = cb;
    }
    Object.defineProperty(ShakeData.prototype, "ID", {
        get: function () { return this.id; },
        enumerable: true,
        configurable: true
    });
    ShakeData.prototype.Start = function () {
        this.timePassed = 0;
        this.sinceLastShake = 0;
        this.id = TimeManager.getInst().addUpdater(cbhandler.gen_handler(this.updateShake, this, this.sprite, this.originalPos, this.range, this.frequence));
    };
    ShakeData.prototype.updateShake = function (sprite, originPos, range, freq, dt) {
        this.timePassed += dt;
        if (this.timePassed > this.duration) {
            if (this.onCompleteCallback)
                this.onCompleteCallback();
            this.Stop();
            return;
        }
        this.sinceLastShake += dt;
        if (this.sinceLastShake >= this.frequence) {
            var x = originPos.x + (Math.random() * 2 - 1) * range;
            var y = originPos.y + (Math.random() * 2 - 1) * range;
            sprite.pos(x, y);
            this.sinceLastShake = 0;
        }
    };
    ShakeData.prototype.Stop = function () {
        if (this.id > 0) {
            TimeManager.getInst().remove(this.id);
        }
    };
    return ShakeData;
}());
//# sourceMappingURL=ShakeManager.js.map