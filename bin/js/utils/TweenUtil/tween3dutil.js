var Tween3DUtil = (function () {
    function Tween3DUtil() {
        this.animInterval = 0;
        this.checkInterval = 100;
        this.frameCount = 0;
        this.timePassed = 0;
        this.key = 0;
        this.pool = [];
        this.list = new LinkList();
        this.speed = 1;
    }
    Tween3DUtil.getInst = function () {
        if (!this.inst) {
            this.inst = new Tween3DUtil();
        }
        return this.inst;
    };
    Tween3DUtil.prototype.setSpeed = function (scale) {
        this.speed = scale;
    };
    Tween3DUtil.prototype.to = function (params) {
        var node = params.node;
        if (!node || node.destroyed) {
            Log.Warn("invalid node");
            return 0;
        }
        var th = this.pool.pop();
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
        th.completedPathCount = 1; //起始点算一个
        if (params.x != null) {
            var from_1 = node.transform.localPosition.x;
            var delta_1 = params.x - from_1;
            th.exectors.push(function (elapsed) {
                var curr_x = th.tweenFunc(elapsed, from_1, delta_1, th.duration);
                var pos = th.node.transform.localPosition;
                pos.x = curr_x;
                th.node.transform.localPosition = pos; //测试发现用node.position.x，不能移动位置
            });
        }
        if (params.y != null) {
            var from1 = node.transform.localPosition.y;
            var delta_2 = params.y - from1;
            th.exectors.push(function (elapsed) {
                var curr_y = th.tweenFunc(elapsed, from1, delta_2, th.duration);
                var pos = th.node.transform.localPosition;
                pos.y = curr_y;
                th.node.transform.localPosition = pos;
            });
        }
        if (params.z != null) {
            var from = node.transform.localPosition.z;
            var delta_3 = params.z - from;
            th.exectors.push(function (elapsed) {
                var curr_z = th.tweenFunc(elapsed, from, delta_3, th.duration);
                var pos = th.node.transform.localPosition;
                pos.z = curr_z;
                th.node.transform.localPosition = pos;
            });
        }
        if (params.rotationX != null) {
            var from_2 = node.transform.localRotationEuler.x;
            var delta_4 = params.rotationX - from_2;
            th.exectors.push(function (elapsed) {
                var curr_rot = th.tweenFunc(elapsed, from_2, delta_4, th.duration);
                var rotation = th.node.transform.localRotationEuler;
                rotation.x = curr_rot;
                th.node.transform.localRotationEuler = rotation;
            });
        }
        if (params.rotationY != null) {
            var from_3 = node.transform.localRotationEuler.y;
            var delta_5 = params.rotationY - from_3;
            th.exectors.push(function (elapsed) {
                var curr_rot = th.tweenFunc(elapsed, from_3, delta_5, th.duration);
                var rotation = th.node.transform.localRotationEuler;
                rotation.y = curr_rot;
                th.node.transform.localRotationEuler = rotation;
            });
        }
        if (params.rotationZ != null) {
            var from_4 = node.transform.localRotationEuler.z;
            var delta_6 = params.rotationZ - from_4;
            th.exectors.push(function (elapsed) {
                var curr_rot = th.tweenFunc(elapsed, from_4, delta_6, th.duration);
                var rotation = th.node.transform.localRotationEuler;
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
    };
    Tween3DUtil.prototype.from = function (params) {
        var node = params.node;
        if (!node || node.destroyed) {
            Log.Warn("invalid node");
            return 0;
        }
        if (params.x != null) {
            var pos = node.transform.localPosition.clone();
            _a = [params.x, pos.x], pos.x = _a[0], params.x = _a[1];
            node.transform.localPosition = pos;
        }
        if (params.y != null) {
            var pos = node.transform.localPosition.clone();
            _b = [params.y, pos.y], pos.y = _b[0], params.y = _b[1];
            node.transform.localPosition = pos;
        }
        if (params.z != null) {
            var pos = node.transform.localPosition.clone();
            _c = [params.z, pos.z], pos.z = _c[0], params.z = _c[1];
            node.transform.localPosition = pos;
        }
        if (params.rotationX != null) {
            var rotation = node.transform.localRotationEuler.clone();
            _d = [params.rotationX, rotation.x], rotation.x = _d[0], params.rotationX = _d[1];
            node.transform.localRotationEuler = rotation;
        }
        if (params.rotationY != null) {
            var rotation = node.transform.localRotationEuler.clone();
            _e = [params.rotationY, rotation.y], rotation.y = _e[0], params.rotationY = _e[1];
            node.transform.localRotationEuler = rotation;
        }
        if (params.rotationZ != null) {
            var rotation = node.transform.localRotationEuler.clone();
            _f = [params.rotationZ, rotation.z], rotation.z = _f[0], params.rotationZ = _f[1];
            node.transform.localRotationEuler = rotation;
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
        var _a, _b, _c, _d, _e, _f;
    };
    Tween3DUtil.prototype.kill = function (key) {
        var tweenHandler = this.list.remove(key);
        if (tweenHandler) {
            tweenHandler.node = null;
            tweenHandler.exectors = null;
            tweenHandler.onComplete = null;
            tweenHandler.onUpdate = null;
            tweenHandler.path = null;
            this.pool.push(tweenHandler);
        }
    };
    Tween3DUtil.from = function (params) {
        return this.getInst().from(params);
    };
    Tween3DUtil.to = function (params) {
        return this.getInst().to(params);
    };
    Tween3DUtil.kill = function (key) {
        this.getInst().kill(key);
    };
    Tween3DUtil.prototype.update = function (dt) {
        //保持动画的频率, 避免频繁波动, 导致帧动画不稳.
        //this.checkFPS(dt);
        //if (this.animInterval != 0) dt = this.animInterval;//统一动画频率
        dt *= this.speed;
        var node = this.list.head;
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
                    node.data.elapsed = (node.data.elapsed - node.data.delay) % node.data.duration; //node.data.elapsed - node.data.duration - node.data.delay;
                    node.data.delay = 0;
                }
                else {
                    node.data.exectors.forEach(function (func) {
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
                    node.data.onUpdate.exec(node.data.node, this.clamp01((node.data.elapsed - node.data.delay) / node.data.duration));
                }
                node.data.exectors.forEach(function (func) {
                    func(node.data.elapsed - node.data.delay);
                });
            }
            node.data.elapsed += dt;
            node = node.next;
        }
    };
    Tween3DUtil.prototype.clamp01 = function (value) {
        if (value < 0) {
            value = 0;
        }
        if (value > 1) {
            value = 1;
        }
        return value;
    };
    Tween3DUtil.prototype.checkFPS = function (dt) {
        this.frameCount++;
        this.timePassed += dt;
        if (this.frameCount >= this.checkInterval) {
            this.animInterval = Math.floor(this.timePassed / this.frameCount * 1000) / 1000;
            this.frameCount = 0;
            this.timePassed = 0;
        }
    };
    return Tween3DUtil;
}());
//# sourceMappingURL=tween3dutil.js.map