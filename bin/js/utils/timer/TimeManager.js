//timeVersion1: 解决在当前node执行中删除了自己的nextNode的情况
//timeVersion2: 暂停移动和update, Laya.Tween和SPine播放需要Laya.timer.scale =0 但会导致UI Toggle等涉及Ui动画的失效.
var TimeManager = (function () {
    function TimeManager() {
        this.pool = [];
        this.pause = false;
        this.key = 0;
        this.pool = [];
        this.list = new LinkList();
        this.lateupdteList = new LinkList();
        this.speed = 1;
        this.nextNode = null;
    }
    TimeManager.getInst = function () {
        if (!this.inst) {
            this.inst = new TimeManager();
        }
        return this.inst;
    };
    TimeManager.prototype.SetSpeed = function (scale) {
        this.speed = scale;
    };
    TimeManager.prototype.Pause = function (pause) {
        this.pause = pause;
    };
    /**
     * 添加循环
     * @param interval 循环间隔
     * @param delay 延迟开始
     * @param repeat 循环次数, <=0 为无限循环
     * @param cb 回调
     * @param is_updater 设置true:update无效循环. false:按照delay,repeate参数循环
     */
    TimeManager.prototype.add = function (interval, delay, repeat, cb, is_updater, excludeFromPause) {
        if (is_updater === void 0) { is_updater = false; }
        if (excludeFromPause === void 0) { excludeFromPause = false; }
        var timerHandler = this.pool.length > 0 ? this.pool.pop() : null;
        if (timerHandler) {
            timerHandler.interval = interval;
            timerHandler.delay = delay;
            timerHandler.repeat = repeat;
            timerHandler.elapsed = 0;
            timerHandler.times = 0;
            timerHandler.is_updater = is_updater;
            timerHandler.cb = cb;
            timerHandler.excludeFromPause = excludeFromPause;
        }
        else {
            timerHandler = { interval: interval, delay: delay, repeat: repeat, elapsed: 0, times: 0, is_updater: is_updater, cb: cb, excludeFromPause: excludeFromPause };
        }
        return this.list.append(++this.key, timerHandler);
    };
    TimeManager.prototype.remove = function (key) {
        //删除的正是update()下个要执行的node, 修改nextnode timeVersion1
        if (this.nextNode && this.nextNode.key == key) {
            this.nextNode = this.nextNode.next;
        }
        var timerHandler = this.list.remove(key);
        if (timerHandler) {
            this.pool.push(timerHandler);
        }
    };
    /**
     * 间隔循环
     * @param interval 循环间隔
     * @param cb 回调
     */
    TimeManager.prototype.loop = function (interval, cb, excludeFromPause) {
        if (excludeFromPause === void 0) { excludeFromPause = false; }
        return this.add(interval, 0, 0, cb, excludeFromPause);
    };
    /**
     * 循环次数
     * @param interval 循环间隔
     * @param repeat 循环次数 <=0为无限循环
     * @param cb
     */
    TimeManager.prototype.loopTimes = function (interval, repeat, cb, excludeFromPause) {
        if (excludeFromPause === void 0) { excludeFromPause = false; }
        return this.add(interval, 0, repeat, cb, null, excludeFromPause);
    };
    TimeManager.prototype.lowframeLoop = function (cb) {
        return this.add(1 / 24, 0, 0, cb);
    };
    /**
     * 延迟循环
     * @param interval
     * @param delay 循环开始的延迟
     * @param cb
     */
    TimeManager.prototype.delayLoop = function (interval, delay, cb, excludeFromPause) {
        if (excludeFromPause === void 0) { excludeFromPause = false; }
        return this.add(interval, delay, 0, cb, null, excludeFromPause);
    };
    /**
     * 单次循环
     * @param delay
     * @param cb
     */
    TimeManager.prototype.once = function (delay, cb, excludeFromPause) {
        if (excludeFromPause === void 0) { excludeFromPause = false; }
        return this.add(0, delay, 1, cb, null, excludeFromPause);
    };
    /**
     * 添加到Update
     * @param cb
     */
    TimeManager.prototype.addUpdater = function (cb, delay, excludeFromPause) {
        if (delay === void 0) { delay = 0; }
        if (excludeFromPause === void 0) { excludeFromPause = false; }
        return this.add(0, delay, 0, cb, true, excludeFromPause);
    };
    TimeManager.prototype.update = function (dt) {
        // if (this.speed <= 0) return;////timeVersion2:
        //let pausing = this.speed <= 0;//timeVersion2:
        dt *= this.speed;
        if (!this.list.head) {
            return;
        }
        var node = this.list.head;
        while (node) {
            this.nextNode = node.next; //timeVersion1
            if (this.pause && !node.data.excludeFromPause) {
                node = this.nextNode;
                continue; //timeVersion2:
            }
            node.data.elapsed += dt; //放在末尾, 执行会完一帧.
            if (node.data.elapsed >= node.data.delay && node.data.is_updater) {
                node.data.cb.exec(dt);
                node = this.nextNode; //timeVersion1 node.next;
                continue;
            }
            if (node.data.repeat != 0 && node.data.times >= node.data.repeat) {
                this.remove(node.key);
                node = this.nextNode; //timeVersion1 node.next;
                continue;
            }
            if (node.data.elapsed >= node.data.delay + node.data.interval) {
                node.data.times++;
                node.data.elapsed = node.data.delay; //node.data.delay - dt;
                //todo fix:在timer回调函数里先remove，再add一个定时器，复用data会导致times和elpased马上被修改
                node.data.cb.exec(node.key);
            }
            //todo  next = node.next
            //node.data.elapsed += dt; //放在末尾, 执行会完一帧.
            node = this.nextNode; //timeVersion1 node.next;
        }
        this.nextNode = null;
    };
    /**
     * 添加到lateupdate
     * @param cb
     */
    TimeManager.prototype.add_lateupdater = function (cb) {
        return this.addLate(0, 0, 0, cb, true);
    };
    TimeManager.prototype.addLate = function (interval, delay, repeat, cb, is_updater, excludeFromPause) {
        if (is_updater === void 0) { is_updater = false; }
        if (excludeFromPause === void 0) { excludeFromPause = false; }
        var timerHandler = this.pool.length > 0 ? this.pool.pop() : null;
        if (timerHandler) {
            timerHandler.interval = interval;
            timerHandler.delay = delay;
            timerHandler.repeat = repeat;
            timerHandler.elapsed = 0;
            timerHandler.times = 0;
            timerHandler.is_updater = is_updater;
            timerHandler.cb = cb;
            timerHandler.excludeFromPause = excludeFromPause;
        }
        else {
            timerHandler = { interval: interval, delay: delay, repeat: repeat, elapsed: 0, times: 0, is_updater: is_updater, cb: cb, excludeFromPause: excludeFromPause };
        }
        return this.lateupdteList.append(++this.key, timerHandler);
    };
    TimeManager.prototype.removeLate = function (key) {
        var timerHandler = this.lateupdteList.remove(key);
        if (timerHandler) {
            this.pool.push(timerHandler);
        }
    };
    TimeManager.prototype.lateupdate = function () {
        if (!this.lateupdteList.head) {
            return;
        }
        var node = this.lateupdteList.head;
        while (node) {
            if (node.data.is_updater) {
                node.data.cb.exec();
                node = node.next;
                continue;
            }
            if (node.data.repeat != 0 && node.data.times >= node.data.repeat) {
                this.remove(node.key);
                node = node.next;
                continue;
            }
            node.data.times++;
            node.data.cb.exec();
            node = node.next;
        }
    };
    return TimeManager;
}());
//# sourceMappingURL=TimeManager.js.map