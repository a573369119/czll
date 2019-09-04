//timeVersion1: 解决在当前node执行中删除了自己的nextNode的情况
//timeVersion2: 暂停移动和update, Laya.Tween和SPine播放需要Laya.timer.scale =0 但会导致UI Toggle等涉及Ui动画的失效.
class TimeManager {
    private static inst: TimeManager;
    private list: LinkList<TimerHandler>;
    private pool: TimerHandler[] = [];
    private key: number;
    private lateupdteList: LinkList<TimerHandler>;
    private speed: number;
    private pause: boolean = false;
    private nextNode: LinkListNode<TimerHandler>;//当前updateloop中下个等待处理的node.//timeVersion1

    private constructor() {
        this.key = 0;
        this.pool = [];
        this.list = new LinkList<TimerHandler>();
        this.lateupdteList = new LinkList<TimerHandler>();
        this.speed = 1;
        this.nextNode = null;
    }

    static getInst(): TimeManager {
        if (!this.inst) {
            this.inst = new TimeManager();
        }
        return this.inst;
    }

    SetSpeed(scale: number) {
        this.speed = scale;
    }

    public Pause(pause: boolean) {
        this.pause = pause;
    }

    /**
     * 添加循环
     * @param interval 循环间隔
     * @param delay 延迟开始
     * @param repeat 循环次数, <=0 为无限循环
     * @param cb 回调
     * @param is_updater 设置true:update无效循环. false:按照delay,repeate参数循环 
     */
    add(interval: number, delay: number, repeat: number, cb: cbhandler, is_updater: boolean = false, excludeFromPause: boolean = false): number {
        let timerHandler: TimerHandler = this.pool.length > 0 ? this.pool.pop() : null;
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
    }

    remove(key: number) {
        //删除的正是update()下个要执行的node, 修改nextnode timeVersion1
        if (this.nextNode && this.nextNode.key == key) {
            this.nextNode = this.nextNode.next;
        }
        let timerHandler: TimerHandler = this.list.remove(key);
        if (timerHandler) {
            this.pool.push(timerHandler);
        }
    }

    /**
     * 间隔循环
     * @param interval 循环间隔
     * @param cb 回调
     */
    loop(interval: number, cb: cbhandler, excludeFromPause: boolean = false): number {
        return this.add(interval, 0, 0, cb, excludeFromPause);
    }

    /**
     * 循环次数
     * @param interval 循环间隔
     * @param repeat 循环次数 <=0为无限循环
     * @param cb 
     */
    loopTimes(interval: number, repeat: number, cb: cbhandler, excludeFromPause: boolean = false): number {
        return this.add(interval, 0, repeat, cb, null, excludeFromPause);
    }

    lowframeLoop(cb: cbhandler): number {
        return this.add(1 / 24, 0, 0, cb);
    }
    /**
     * 延迟循环
     * @param interval 
     * @param delay 循环开始的延迟
     * @param cb 
     */
    delayLoop(interval: number, delay: number, cb: cbhandler, excludeFromPause: boolean = false): number {
        return this.add(interval, delay, 0, cb, null, excludeFromPause);
    }
    /**
     * 单次循环
     * @param delay 
     * @param cb 
     */
    once(delay: number, cb: cbhandler, excludeFromPause: boolean = false): number {
        return this.add(0, delay, 1, cb, null, excludeFromPause);
    }
    /**
     * 添加到Update
     * @param cb 
     */
    addUpdater(cb: cbhandler, delay: number = 0, excludeFromPause: boolean = false): number {
        return this.add(0, delay, 0, cb, true, excludeFromPause);
    }

    update(dt: number) {
        // if (this.speed <= 0) return;////timeVersion2:
        //let pausing = this.speed <= 0;//timeVersion2:

        dt *= this.speed;
        if (!this.list.head) {
            return;
        }
        let node: LinkListNode<TimerHandler> = this.list.head;
        while (node) {
            this.nextNode = node.next;//timeVersion1
            if (this.pause && !node.data.excludeFromPause) {
                node = this.nextNode
                continue;//timeVersion2:
            }

            node.data.elapsed += dt; //放在末尾, 执行会完一帧.

            if (node.data.elapsed >= node.data.delay && node.data.is_updater) {
                node.data.cb.exec(dt);
                node = this.nextNode//timeVersion1 node.next;
                continue;
            }

            if (node.data.repeat != 0 && node.data.times >= node.data.repeat) {
                this.remove(node.key);
                node = this.nextNode//timeVersion1 node.next;
                continue;
            }

            if (node.data.elapsed >= node.data.delay + node.data.interval) {
                node.data.times++;
                node.data.elapsed = node.data.delay//node.data.delay - dt;
                //todo fix:在timer回调函数里先remove，再add一个定时器，复用data会导致times和elpased马上被修改
                node.data.cb.exec(node.key);
            }

            //todo  next = node.next
            //node.data.elapsed += dt; //放在末尾, 执行会完一帧.
            node = this.nextNode//timeVersion1 node.next;
        }
        this.nextNode = null;
    }

    /**
     * 添加到lateupdate
     * @param cb 
     */
    add_lateupdater(cb: cbhandler): number {
        return this.addLate(0, 0, 0, cb, true);
    }

    addLate(interval: number, delay: number, repeat: number, cb: cbhandler, is_updater: boolean = false, excludeFromPause: boolean = false): number {
        let timerHandler: TimerHandler = this.pool.length > 0 ? this.pool.pop() : null;
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
    }

    removeLate(key: number) {
        let timerHandler: TimerHandler = this.lateupdteList.remove(key);
        if (timerHandler) {
            this.pool.push(timerHandler);
        }
    }

    lateupdate() {
        if (!this.lateupdteList.head) {
            return;
        }

        let node: LinkListNode<TimerHandler> = this.lateupdteList.head;
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
    }
}

type TimerHandler = {
    interval: number;    //执行间隔, 只执行一次的定时器值为0，单位秒
    delay: number;       //延时多久执行，单位秒
    repeat: number;      //要执行多少次，0表示无限次
    elapsed: number;     //已过去的时间
    times: number;       //已执行次数
    is_updater: boolean; //是否每帧调用
    cb: cbhandler;         //回调函数
    excludeFromPause: boolean;   //true: 即使设置speed <=0 也会执行
}