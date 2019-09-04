/**
            if (this.id > 0) {
                Tween2DUtil.getInst().kill(this.id)
                this.id = 0;
            } else {
                this.id = Tween2DUtil.getInst().to({
                    node: this.GetView().btn_test,
                    duration: 3,
                    delay: 0,
                    x: 100,
                    y: 100,
                    rotation: 20,
                    tweenFunc: TweenFunc.Sine.easeInOut,
                    onComplete: cbhandler.gen_handler(() => {
                        Log.Debug("end")
                    },
                        this)
                })

//反复明暗3次
         Tween2DUtil.getInst().to({
            node: this.player.viewComp.View,
            duration: 2,
            alpha: .2,
            repeated: 3,
            tweenFunc: TweenFunc.PingPong.easeInOut,
            onComplete: cbhandler.gen_handler(() => {
                Log.Debug("end")
            },
                this)
        })
 */

class Tween2DUtil {
    private static inst: Tween2DUtil;
    private list: LinkList<Tween2DHandler>;
    private pool: Tween2DHandler[];
    private key: number;
    private timer: number;
    private speed: number;
    private animInterval: number = 0;

    private constructor() {
        this.key = 0;
        this.pool = [];
        this.list = new LinkList<Tween2DHandler>();
        this.speed = 1;
    }

    public static getInst() {
        if (!this.inst) {
            this.inst = new Tween2DUtil();
        }
        return this.inst;
    }

    setSpeed(scale: number) {
        this.speed = scale;
    }

    to(params: Tween2DParams): number {
        let node = params.node;
        if (!node || node.destroyed) {
            Log.Warn("invalid node");
            return 0;
        }

        let th: Tween2DHandler = this.pool.pop();
        if (!th) {
            th = {
                node: null, elapsed: null, duration: null, delay: null,
                exectors: null, tweenFunc: null, onUpdate: null, onComplete: null,
                repeated: null, path: null, completedPathCount: null,
            };
        }
        th.node = node;
        th.elapsed = 0;
        th.duration = params.duration || 1;
        th.delay = params.delay || 0;
        th.exectors = [];
        th.tweenFunc = params.tweenFunc || TweenFunc.Linear;
        th.onUpdate = params.onUpdate;
        th.onComplete = params.onComplete;
        th.repeated = params.repeated || 0;//false;
        th.path = params.path || null;
        th.completedPathCount = 1;//起始点算一个

        if (params.x != null) {
            let from = node.x;
            let delta = params.x - from;
            th.exectors.push((elapsed) => {
                let curr_x = th.tweenFunc(elapsed, from, delta, th.duration);
                th.node.x = curr_x;     //测试发现用node.position.x，不能移动位置
            });
        }
        if (params.y != null) {
            let from = node.y;
            let delta = params.y - from;
            th.exectors.push((elapsed) => {
                let curr_y = th.tweenFunc(elapsed, from, delta, th.duration);
                th.node.y = curr_y;
            });
        }
        if (params.rotation != null) {
            let from = node.rotation;
            let delta = params.rotation - from;
            th.exectors.push((elapsed) => {
                let curr_rot = th.tweenFunc(elapsed, from, delta, th.duration);
                th.node.rotation = curr_rot;
            });
        }
        if (params.width != null) {
            let from = node.width;
            let delta = params.width - from;
            th.exectors.push((elapsed) => {
                let curr_width = th.tweenFunc(elapsed, from, delta, th.duration);
                th.node.width = curr_width;
            });
        }
        if (params.height != null) {
            let from = node.height;
            let delta = params.height - from;
            th.exectors.push((elapsed) => {
                let curr_height = th.tweenFunc(elapsed, from, delta, th.duration);
                th.node.height = curr_height;
            });
        }
        if (params.bottom != null) {
            let from = (node as Laya.Box).bottom;
            let delta = params.bottom - from;
            th.exectors.push((elapsed) => {
                let curr_bottom = th.tweenFunc(elapsed, from, delta, th.duration);
                (th.node as Laya.Box).bottom = curr_bottom;
            });
        }
        if (params.top != null) {
            let from = (node as Laya.Box).top;
            let delta = params.top - from;
            th.exectors.push((elapsed) => {
                let curr_top = th.tweenFunc(elapsed, from, delta, th.duration);
                (th.node as Laya.Box).top = curr_top;
            });
        }
        if (params.left != null) {
            let from = (node as Laya.Box).left;
            let delta = params.left - from;
            th.exectors.push((elapsed) => {
                let curr_left = th.tweenFunc(elapsed, from, delta, th.duration);
                (th.node as Laya.Box).left = curr_left;
            });
        }
        if (params.right != null) {
            let from = (node as Laya.Box).right;
            let delta = params.right - from;
            th.exectors.push((elapsed) => {
                let curr_right = th.tweenFunc(elapsed, from, delta, th.duration);
                (th.node as Laya.Box).right = curr_right;
            });
        }
        if (params.alpha != null) {
            let from = node.alpha;
            let delta = params.alpha - from;
            th.exectors.push((elapsed) => {
                let curr_alpha = th.tweenFunc(elapsed, from, delta, th.duration);
                th.node.alpha = curr_alpha;
            });
        }
        if (params.scalex != null) {
            let from = node.scaleX;
            let delta = params.scalex - from;
            th.exectors.push((elapsed) => {
                let curr_x = th.tweenFunc(elapsed, from, delta, th.duration);
                th.node.scaleX = curr_x;
            });
        }
        if (params.scaley != null) {
            let from = node.scaleY;
            let delta = params.scaley - from;
            th.exectors.push((elapsed) => {
                let curr_height = th.tweenFunc(elapsed, from, delta, th.duration);
                th.node.scaleY = curr_height;
            });
        }
        if (!this.timer) {
            this.timer = TimeManager.getInst().addUpdater(cbhandler.gen_handler(this.update, this)); //TimeManager.getInst().add_updater(handler.gen_handler(this.update, this));
        }
        return this.list.append(++this.key, th);
    }

    from(params: Tween2DParams): number {
        let node = params.node;
        if (!node || node.destroyed) {
            Log.Warn("invalid node");
            return 0;
        }
        if (params.x != null) {
            [node.x, params.x] = [params.x, node.x];
        }
        if (params.y != null) {
            [node.y, params.y] = [params.y, node.y];
        }
        if (params.rotation != null) {
            [node.rotation, params.rotation] = [params.rotation, node.rotation];
        }
        if (params.width != null) {
            [node.width, params.width] = [params.width, node.width];
        }
        if (params.height != null) {
            [node.height, params.height] = [params.height, node.height];
        }
        if (params.alpha != null) {
            [node.alpha, params.alpha] = [params.alpha, node.alpha];
        }

        if (params.scalex != null) {
            [node.scaleX, params.scalex] = [params.scalex, node.scaleX];
        }
        if (params.scaley != null) {
            [node.scaleY, params.scaley] = [params.scaley, node.scaleY];
        }

        return this.to(params);
    }

    path(params: Tween2DParams): number {
        let node = params.node;
        if (!node || node.destroyed) {
            Log.Warn("invalid node");
            return 0;
        }

        if (params.path.length < 2) {
            Log.Error("path tween without enough path point < 2")
            return;
        }

        let fromPos = params.path[0];
        let toPos = params.path[1];

        node.x = fromPos.x
        node.y = fromPos.y;

        params.x = toPos.x;
        params.y = toPos.y;

        return this.toPath(params);
    }

    toPath(params: Tween2DParams): number {
        let node = params.node;
        if (!node || node.destroyed) {
            Log.Warn("invalid node");
            return 0;
        }

        let th: Tween2DHandler = this.pool.pop();
        if (!th) {
            th = {
                node: null, elapsed: null, duration: null, delay: null,
                exectors: null, tweenFunc: null, onUpdate: null, onComplete: null,
                repeated: null, path: null, completedPathCount: null,
            };
        }
        th.node = node;
        th.elapsed = 0;
        th.duration = params.duration || 1;
        th.delay = params.delay || 0;
        th.exectors = [];
        th.tweenFunc = params.tweenFunc || TweenFunc.Path.Linear;
        th.onUpdate = params.onUpdate;
        th.onComplete = params.onComplete;
        th.repeated = params.repeated || 0;// false;
        th.path = params.path || null;
        th.completedPathCount = 1;//起始点算一个

        if (params.x != null || params.y != null) {
            let fromlist = th.path;
            let count = fromlist.length;
            let deltaXlist: number[] = [];
            let deltaYlist: number[] = [];
            let durationlist: number[] = [];
            let fromXList: number[] = []
            let fromYList: number[] = []

            let total = 0;
            let dist: number[] = []
            let loopTime = th.repeated != 0 ? count : count - 1;//是否循环
            for (let index = 0; index < loopTime; index++) {
                let from = fromlist[index];
                let toIndex = index + 1
                let to = fromlist[toIndex == count ? 0 : toIndex]
                let dis = Math.sqrt(Math.pow(from.x - to.x, 2) + Math.pow(from.y - to.y, 2))
                dist.push(dis)
                total += dis;
            }

            for (let index = 0; index < loopTime; index++) {
                let from = fromlist[index];
                let toIndex = index + 1
                let to = fromlist[toIndex == count ? 0 : toIndex]
                let deltaX = to.x - from.x;
                let deltaY = to.y - from.y;
                deltaXlist.push(deltaX);
                deltaYlist.push(deltaY);
                fromXList.push(from.x)
                fromYList.push(from.y)
                durationlist.push(dist[index] / total * th.duration)
            }

            th.exectors.push((elapsed) => {
                let curr_x = th.tweenFunc(elapsed, fromXList, deltaXlist, durationlist, th.duration);
                th.node.x = curr_x;     //测试发现用node.position.x，不能移动位置
            });

            th.exectors.push((elapsed) => {
                let curr_y = th.tweenFunc(elapsed, fromYList, deltaYlist, durationlist, th.duration);
                th.node.y = curr_y;
            });
        }

        //其他的动画不用PathLinera
        let otherTweenFunc = TweenFunc.Linear;
        if (params.rotation != null) {
            let from = node.rotation;
            let delta = params.rotation - from;
            th.exectors.push((elapsed) => {
                let curr_rot = otherTweenFunc(elapsed, from, delta, th.duration);
                th.node.rotation = curr_rot;
            });
        }
        if (params.width != null) {
            let from = node.width;
            let delta = params.width - from;
            th.exectors.push((elapsed) => {
                let curr_width = otherTweenFunc(elapsed, from, delta, th.duration);
                th.node.width = curr_width;
            });
        }
        if (params.height != null) {
            let from = node.height;
            let delta = params.height - from;
            th.exectors.push((elapsed) => {
                let curr_height = otherTweenFunc(elapsed, from, delta, th.duration);
                th.node.height = curr_height;
            });
        }
        if (params.bottom != null) {
            let from = (node as Laya.Box).bottom;
            let delta = params.bottom - from;
            th.exectors.push((elapsed) => {
                let curr_bottom = th.tweenFunc(elapsed, from, delta, th.duration);
                (th.node as Laya.Box).bottom = curr_bottom;
            });
        }
        if (params.top != null) {
            let from = (node as Laya.Box).top;
            let delta = params.top - from;
            th.exectors.push((elapsed) => {
                let curr_top = th.tweenFunc(elapsed, from, delta, th.duration);
                (th.node as Laya.Box).top = curr_top;
            });
        }
        if (params.left != null) {
            let from = (node as Laya.Box).left;
            let delta = params.left - from;
            th.exectors.push((elapsed) => {
                let curr_left = th.tweenFunc(elapsed, from, delta, th.duration);
                (th.node as Laya.Box).left = curr_left;
            });
        }
        if (params.right != null) {
            let from = (node as Laya.Box).right;
            let delta = params.right - from;
            th.exectors.push((elapsed) => {
                let curr_right = th.tweenFunc(elapsed, from, delta, th.duration);
                (th.node as Laya.Box).right = curr_right;
            });
        } if (params.alpha != null) {
            let from = node.alpha;
            let delta = params.alpha - from;
            th.exectors.push((elapsed) => {
                let curr_alpha = otherTweenFunc(elapsed, from, delta, th.duration);
                th.node.alpha = curr_alpha;
            });
        }

        if (!this.timer) {
            this.timer = TimeManager.getInst().addUpdater(cbhandler.gen_handler(this.update, this));//TimeManager.getInst().add_updater(handler.gen_handler(this.update, this));
        }
        return this.list.append(++this.key, th);
    }

    kill(key: number) {
        let tweenHandler: Tween2DHandler = this.list.remove(key);
        if (tweenHandler) {
            tweenHandler.node = null;
            tweenHandler.exectors = null;
            tweenHandler.onComplete = null;
            tweenHandler.onUpdate = null;
            tweenHandler.path = null;
            this.pool.push(tweenHandler);
        }
    }

    static path(params: Tween2DParams): number {
        return this.getInst().path(params);
    }

    static from(params: Tween2DParams): number {
        return this.getInst().from(params);
    }

    static to(params: Tween2DParams): number {
        return this.getInst().to(params);
    }

    static kill(key: number) {
        this.getInst().kill(key);
    }

    private update(dt: number) {
        // //保持动画的频率, 避免频繁波动, 导致帧动画不稳.
        // this.checkFPS(dt);
        // if (this.animInterval != 0) dt = this.animInterval;//统一动画频率
        dt *= this.speed;
        let node: LinkListNode<Tween2DHandler> = this.list.head;
        if (!node) {
            if (this.timer) {
                TimeManager.getInst().remove(this.timer);
            }
            this.timer = 0;
            return;
        }
        while (node) {
            //节点已失效
            if (!node.data.node || node.data.node.destroyed) {
                this.kill(node.key);
                node = node.next;
                continue;
            }

            //执行完毕
            if (node.data.elapsed >= node.data.duration + node.data.delay) {
                if (node.data.repeated < 0 || node.data.repeated > 1) {
                    if (node.data.repeated > 0) node.data.repeated -= 1;
                    //重复设置
                    node.data.elapsed = (node.data.elapsed - node.data.delay) % node.data.duration;//改成延迟一次后, 重复/ node.data.elapsed - node.data.duration - node.data.delay;
                    node.data.delay = 0;
                } else {
                    node.data.exectors.forEach((func) => {
                        func(node.data.duration);
                    });
                    if (node.data.onComplete) {
                        node.data.onComplete.exec(node.data.node, 1);
                    }
                    this.kill(node.key);
                    node = node.next;
                    continue;
                }
            }

            //延时时间到了
            if (node.data.elapsed >= node.data.delay) {
                if (node.data.onUpdate) {
                    node.data.onUpdate.exec(
                        node.data.node,
                        this.clamp01((node.data.elapsed - node.data.delay) / node.data.duration)
                    );
                }
                node.data.exectors.forEach((func) => {
                    func(node.data.elapsed - node.data.delay);
                });
            }
            node.data.elapsed += dt;
            node = node.next;
        }
    }

    private clamp01(value: number) {
        if (value < 0) {
            value = 0;
        }
        if (value > 1) {
            value = 1;
        }
        return value;
    }

    private checkInterval: number = 100
    private frameCount: number = 0;
    private timePassed: number = 0;
    private checkFPS(dt: number) {//会导致Tween动画速度时快时慢,尤其在断点调试之后
        this.frameCount++;
        this.timePassed += dt;
        if (this.frameCount >= this.checkInterval) {
            this.animInterval = Math.floor(this.timePassed / this.frameCount * 1000) / 1000;
            this.frameCount = 0;
            this.timePassed = 0;
        }
    }
}

type Tween2DHandler = {
    node: Laya.Sprite;
    elapsed: number;
    delay: number;
    duration: number;
    tweenFunc: Function;
    exectors: ((elapsed: number) => void)[];
    onUpdate?: cbhandler;
    onComplete?: cbhandler;
    repeated?: number;
    path?: any[];// Laya.Vector2[];
    completedPathCount?: number;
}

type Tween2DParams = {
    node: Laya.Sprite | Laya.Box;
    duration: number;    //动画持续时间，单位秒
    delay?: number;      //延时多久执行
    x?: number;
    y?: number;
    rotation?: number;
    width?: number;
    height?: number;
    alpha?: number;
    bottom?: number;
    top?: number;
    left?: number;
    right?: number;
    tweenFunc?: Function;
    onUpdate?: cbhandler;
    onComplete?: cbhandler;
    repeated?: number;  //0||1 表示不重复, -1: 反复执行,
    path?: any[];//Laya.Vector2[];//跟随path走
    scalex?: number;//ui缩放
    scaley?: number;
}
