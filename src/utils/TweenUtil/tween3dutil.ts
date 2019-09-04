
class Tween3DUtil {
    private static inst: Tween3DUtil;
    private list: LinkList<Tween3DHandler>;
    private pool: Tween3DHandler[];
    private key: number;
    private timer: number;
    private speed: number;
    private animInterval: number = 0;

    private constructor() {
        this.key = 0;
        this.pool = [];
        this.list = new LinkList<Tween3DHandler>();
        this.speed = 1;
    }

    public static getInst() {
        if (!this.inst) {
            this.inst = new Tween3DUtil();
        }
        return this.inst;
    }

    setSpeed(scale: number) {
        this.speed = scale;
    }

    to(params: Tween3DParams): number {
        let node = params.node;
        if (!node || node.destroyed) {
            Log.Warn("invalid node");
            return 0;
        }

        let th: Tween3DHandler = this.pool.pop();
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
        th.repeated = params.repeated || false;
        th.path = params.path || null;
        th.completedPathCount = 1;//起始点算一个

        if (params.x != null) {
            let from = node.transform.localPosition.x;
            let delta = params.x - from;
            th.exectors.push((elapsed) => {
                let curr_x = th.tweenFunc(elapsed, from, delta, th.duration);
                let pos = th.node.transform.localPosition;
                pos.x = curr_x;
                th.node.transform.localPosition = pos;     //测试发现用node.position.x，不能移动位置
            });
        }
        if (params.y != null) {
            var from1 = node.transform.localPosition.y;
            let delta = params.y - from1;
            th.exectors.push((elapsed) => {
                let curr_y = th.tweenFunc(elapsed, from1, delta, th.duration);
                let pos = th.node.transform.localPosition;
                pos.y = curr_y;
                th.node.transform.localPosition = pos;
            });
        }
        if (params.z != null) {
            var from = node.transform.localPosition.z;
            let delta = params.z - from;
            th.exectors.push((elapsed) => {
                let curr_z = th.tweenFunc(elapsed, from, delta, th.duration);
                let pos = th.node.transform.localPosition;
                pos.z = curr_z;
                th.node.transform.localPosition = pos;
            });
        }
        if (params.rotationX != null) {
            let from = node.transform.localRotationEuler.x;
            let delta = params.rotationX - from;
            th.exectors.push((elapsed) => {
                let curr_rot = th.tweenFunc(elapsed, from, delta, th.duration);
                let rotation = th.node.transform.localRotationEuler;
                rotation.x = curr_rot;
                th.node.transform.localRotationEuler = rotation;
            });
        }
        if (params.rotationY != null) {
            let from = node.transform.localRotationEuler.y;
            let delta = params.rotationY - from;
            th.exectors.push((elapsed) => {
                let curr_rot = th.tweenFunc(elapsed, from, delta, th.duration);
                let rotation = th.node.transform.localRotationEuler;
                rotation.y = curr_rot;
                th.node.transform.localRotationEuler = rotation;
            });
        }
        if (params.rotationZ != null) {
            let from = node.transform.localRotationEuler.z;
            let delta = params.rotationZ - from;
            th.exectors.push((elapsed) => {
                let curr_rot = th.tweenFunc(elapsed, from, delta, th.duration);
                let rotation = th.node.transform.localRotationEuler;
                rotation.z = curr_rot;
                th.node.transform.localRotationEuler = rotation;
            });
        }
        // if (params.width != null) {
        //     let from = node.width;
        //     let delta = params.width - from;
        //     th.exectors.push((elapsed) => {
        //         let curr_width = th.tweenFunc(elapsed, from, delta, th.duration);
        //         th.node.width = curr_width;
        //     });
        // }
        // if (params.height != null) {
        //     let from = node.height;
        //     let delta = params.height - from;
        //     th.exectors.push((elapsed) => {
        //         let curr_height = th.tweenFunc(elapsed, from, delta, th.duration);
        //         th.node.height = curr_height;
        //     });
        // }
        // if (params.opacity != null) {
        //     let from = node.opacity;
        //     let delta = params.opacity - from;
        //     th.exectors.push((elapsed) => {
        //         let curr_opacity = th.tweenFunc(elapsed, from, delta, th.duration);
        //         th.node.opacity = curr_opacity;
        //     });
        // }
        // if (params.scalex != null) {
        //     let from = node.scaleX;
        //     let delta = params.scalex - from;
        //     th.exectors.push((elapsed) => {
        //         let curr_x = th.tweenFunc(elapsed, from, delta, th.duration);
        //         th.node.scaleX = curr_x;
        //     });
        // }
        // if (params.scaley != null) {
        //     let from = node.scaleY;
        //     let delta = params.scaley - from;
        //     th.exectors.push((elapsed) => {
        //         let curr_height = th.tweenFunc(elapsed, from, delta, th.duration);
        //         th.node.scaleY = curr_height;
        //     });
        // }
        if (!this.timer) {
            this.timer = TimeManager.getInst().addUpdater(cbhandler.gen_handler(this.update, this));
        }
        return this.list.append(++this.key, th);
    }

    from(params: Tween3DParams): number {
        let node = params.node;
        if (!node || node.destroyed) {
            Log.Warn("invalid node");
            return 0;
        }
        if (params.x != null) {
            let pos = node.transform.localPosition.clone();
            [pos.x, params.x] = [params.x, pos.x];
            node.transform.localPosition = pos
        }
        if (params.y != null) {
            let pos = node.transform.localPosition.clone();
            [pos.y, params.y] = [params.y, pos.y];
            node.transform.localPosition = pos
        }
        if (params.z != null) {
            let pos = node.transform.localPosition.clone();
            [pos.z, params.z] = [params.z, pos.z];
            node.transform.localPosition = pos
        }
        if (params.rotationX != null) {
            let rotation = node.transform.localRotationEuler.clone();
            [rotation.x, params.rotationX] = [params.rotationX, rotation.x];
            node.transform.localRotationEuler = rotation
        }
        if (params.rotationY != null) {
            let rotation = node.transform.localRotationEuler.clone();
            [rotation.y, params.rotationY] = [params.rotationY, rotation.y]
            node.transform.localRotationEuler = rotation
        }
        if (params.rotationZ != null) {
            let rotation = node.transform.localRotationEuler.clone();
            [rotation.z, params.rotationZ] = [params.rotationZ, rotation.z];
            node.transform.localRotationEuler = rotation
        }
        // if (params.rotation != null) {
        //     [node.rotation, params.rotation] = [params.rotation, node.rotation];
        // }
        // if (params.width != null) {
        //     [node.width, params.width] = [params.width, node.width];
        // }
        // if (params.height != null) {
        //     [node.height, params.height] = [params.height, node.height];
        // }
        // if (params.opacity != null) {
        //     [node.opacity, params.opacity] = [params.opacity, node.opacity];
        // }

        // if (params.scalex != null) {
        //     [node.scaleX, params.scalex] = [params.scalex, node.scaleX];
        // }
        // if (params.scaley != null) {
        //     [node.scaleY, params.scaley] = [params.scaley, node.scaleY];
        // }

        return this.to(params);
    }


    kill(key: number) {
        let tweenHandler: Tween3DHandler = this.list.remove(key);
        if (tweenHandler) {
            tweenHandler.node = null;
            tweenHandler.exectors = null;
            tweenHandler.onComplete = null;
            tweenHandler.onUpdate = null;
            tweenHandler.path = null;
            this.pool.push(tweenHandler);
        }
    }

    static from(params: Tween3DParams): number {
        return this.getInst().from(params);
    }

    static to(params: Tween3DParams): number {
        return this.getInst().to(params);
    }

    static kill(key: number) {
        this.getInst().kill(key);
    }

    private update(dt: number) {
        //保持动画的频率, 避免频繁波动, 导致帧动画不稳.
        //this.checkFPS(dt);
        //if (this.animInterval != 0) dt = this.animInterval;//统一动画频率
        dt *= this.speed;
        let node: LinkListNode<Tween3DHandler> = this.list.head;
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
                if (node.data.repeated) {
                    //重复设置
                    node.data.elapsed = (node.data.elapsed - node.data.delay) % node.data.duration;//node.data.elapsed - node.data.duration - node.data.delay;
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
    private checkFPS(dt: number) {
        this.frameCount++;
        this.timePassed += dt;
        if (this.frameCount >= this.checkInterval) {
            this.animInterval = Math.floor(this.timePassed / this.frameCount * 1000) / 1000;
            this.frameCount = 0;
            this.timePassed = 0;
        }
    }
}

type Tween3DHandler = {
    node: Laya.Sprite3D;
    elapsed: number;
    delay: number;
    duration: number;
    tweenFunc: Function;
    exectors: ((elapsed: number) => void)[];
    onUpdate?: cbhandler;
    onComplete?: cbhandler;
    repeated?: boolean;
    path?: Laya.Vector2[];
    completedPathCount?: number;
}

type Tween3DParams = {
    node: Laya.Sprite3D;
    duration: number;    //动画持续时间，单位秒
    delay?: number;      //延时多久执行
    x?: number;
    y?: number;
    z?: number;
    rotationX?: number;
    rotationY?: number;
    rotationZ?: number;
    width?: number;
    height?: number;
    opacity?: number;
    tweenFunc?: Function;
    onUpdate?: cbhandler;
    onComplete?: cbhandler;
    repeated?: boolean;
    path?: Laya.Vector2[];//跟随path走
    scalex?: number;//ui缩放
    scaley?: number;
}
