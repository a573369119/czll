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
var Tween2DUtil = (function () {
    function Tween2DUtil() {
        this.animInterval = 0;
        this.checkInterval = 100;
        this.frameCount = 0;
        this.timePassed = 0;
        this.key = 0;
        this.pool = [];
        this.list = new LinkList();
        this.speed = 1;
    }
    Tween2DUtil.getInst = function () {
        if (!this.inst) {
            this.inst = new Tween2DUtil();
        }
        return this.inst;
    };
    Tween2DUtil.prototype.setSpeed = function (scale) {
        this.speed = scale;
    };
    Tween2DUtil.prototype.to = function (params) {
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
        th.repeated = params.repeated || 0; //false;
        th.path = params.path || null;
        th.completedPathCount = 1; //起始点算一个
        if (params.x != null) {
            var from_1 = node.x;
            var delta_1 = params.x - from_1;
            th.exectors.push(function (elapsed) {
                var curr_x = th.tweenFunc(elapsed, from_1, delta_1, th.duration);
                th.node.x = curr_x; //测试发现用node.position.x，不能移动位置
            });
        }
        if (params.y != null) {
            var from_2 = node.y;
            var delta_2 = params.y - from_2;
            th.exectors.push(function (elapsed) {
                var curr_y = th.tweenFunc(elapsed, from_2, delta_2, th.duration);
                th.node.y = curr_y;
            });
        }
        if (params.rotation != null) {
            var from_3 = node.rotation;
            var delta_3 = params.rotation - from_3;
            th.exectors.push(function (elapsed) {
                var curr_rot = th.tweenFunc(elapsed, from_3, delta_3, th.duration);
                th.node.rotation = curr_rot;
            });
        }
        if (params.width != null) {
            var from_4 = node.width;
            var delta_4 = params.width - from_4;
            th.exectors.push(function (elapsed) {
                var curr_width = th.tweenFunc(elapsed, from_4, delta_4, th.duration);
                th.node.width = curr_width;
            });
        }
        if (params.height != null) {
            var from_5 = node.height;
            var delta_5 = params.height - from_5;
            th.exectors.push(function (elapsed) {
                var curr_height = th.tweenFunc(elapsed, from_5, delta_5, th.duration);
                th.node.height = curr_height;
            });
        }
        if (params.bottom != null) {
            var from_6 = node.bottom;
            var delta_6 = params.bottom - from_6;
            th.exectors.push(function (elapsed) {
                var curr_bottom = th.tweenFunc(elapsed, from_6, delta_6, th.duration);
                th.node.bottom = curr_bottom;
            });
        }
        if (params.top != null) {
            var from_7 = node.top;
            var delta_7 = params.top - from_7;
            th.exectors.push(function (elapsed) {
                var curr_top = th.tweenFunc(elapsed, from_7, delta_7, th.duration);
                th.node.top = curr_top;
            });
        }
        if (params.left != null) {
            var from_8 = node.left;
            var delta_8 = params.left - from_8;
            th.exectors.push(function (elapsed) {
                var curr_left = th.tweenFunc(elapsed, from_8, delta_8, th.duration);
                th.node.left = curr_left;
            });
        }
        if (params.right != null) {
            var from_9 = node.right;
            var delta_9 = params.right - from_9;
            th.exectors.push(function (elapsed) {
                var curr_right = th.tweenFunc(elapsed, from_9, delta_9, th.duration);
                th.node.right = curr_right;
            });
        }
        if (params.alpha != null) {
            var from_10 = node.alpha;
            var delta_10 = params.alpha - from_10;
            th.exectors.push(function (elapsed) {
                var curr_alpha = th.tweenFunc(elapsed, from_10, delta_10, th.duration);
                th.node.alpha = curr_alpha;
            });
        }
        if (params.scalex != null) {
            var from_11 = node.scaleX;
            var delta_11 = params.scalex - from_11;
            th.exectors.push(function (elapsed) {
                var curr_x = th.tweenFunc(elapsed, from_11, delta_11, th.duration);
                th.node.scaleX = curr_x;
            });
        }
        if (params.scaley != null) {
            var from_12 = node.scaleY;
            var delta_12 = params.scaley - from_12;
            th.exectors.push(function (elapsed) {
                var curr_height = th.tweenFunc(elapsed, from_12, delta_12, th.duration);
                th.node.scaleY = curr_height;
            });
        }
        if (!this.timer) {
            this.timer = TimeManager.getInst().addUpdater(cbhandler.gen_handler(this.update, this)); //TimeManager.getInst().add_updater(handler.gen_handler(this.update, this));
        }
        return this.list.append(++this.key, th);
    };
    Tween2DUtil.prototype.from = function (params) {
        var node = params.node;
        if (!node || node.destroyed) {
            Log.Warn("invalid node");
            return 0;
        }
        if (params.x != null) {
            _a = [params.x, node.x], node.x = _a[0], params.x = _a[1];
        }
        if (params.y != null) {
            _b = [params.y, node.y], node.y = _b[0], params.y = _b[1];
        }
        if (params.rotation != null) {
            _c = [params.rotation, node.rotation], node.rotation = _c[0], params.rotation = _c[1];
        }
        if (params.width != null) {
            _d = [params.width, node.width], node.width = _d[0], params.width = _d[1];
        }
        if (params.height != null) {
            _e = [params.height, node.height], node.height = _e[0], params.height = _e[1];
        }
        if (params.alpha != null) {
            _f = [params.alpha, node.alpha], node.alpha = _f[0], params.alpha = _f[1];
        }
        if (params.scalex != null) {
            _g = [params.scalex, node.scaleX], node.scaleX = _g[0], params.scalex = _g[1];
        }
        if (params.scaley != null) {
            _h = [params.scaley, node.scaleY], node.scaleY = _h[0], params.scaley = _h[1];
        }
        return this.to(params);
        var _a, _b, _c, _d, _e, _f, _g, _h;
    };
    Tween2DUtil.prototype.path = function (params) {
        var node = params.node;
        if (!node || node.destroyed) {
            Log.Warn("invalid node");
            return 0;
        }
        if (params.path.length < 2) {
            Log.Error("path tween without enough path point < 2");
            return;
        }
        var fromPos = params.path[0];
        var toPos = params.path[1];
        node.x = fromPos.x;
        node.y = fromPos.y;
        params.x = toPos.x;
        params.y = toPos.y;
        return this.toPath(params);
    };
    Tween2DUtil.prototype.toPath = function (params) {
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
        th.tweenFunc = params.tweenFunc || TweenFunc.Path.Linear;
        th.onUpdate = params.onUpdate;
        th.onComplete = params.onComplete;
        th.repeated = params.repeated || 0; // false;
        th.path = params.path || null;
        th.completedPathCount = 1; //起始点算一个
        if (params.x != null || params.y != null) {
            var fromlist = th.path;
            var count = fromlist.length;
            var deltaXlist_1 = [];
            var deltaYlist_1 = [];
            var durationlist_1 = [];
            var fromXList_1 = [];
            var fromYList_1 = [];
            var total = 0;
            var dist = [];
            var loopTime = th.repeated != 0 ? count : count - 1; //是否循环
            for (var index = 0; index < loopTime; index++) {
                var from = fromlist[index];
                var toIndex = index + 1;
                var to = fromlist[toIndex == count ? 0 : toIndex];
                var dis = Math.sqrt(Math.pow(from.x - to.x, 2) + Math.pow(from.y - to.y, 2));
                dist.push(dis);
                total += dis;
            }
            for (var index = 0; index < loopTime; index++) {
                var from = fromlist[index];
                var toIndex = index + 1;
                var to = fromlist[toIndex == count ? 0 : toIndex];
                var deltaX = to.x - from.x;
                var deltaY = to.y - from.y;
                deltaXlist_1.push(deltaX);
                deltaYlist_1.push(deltaY);
                fromXList_1.push(from.x);
                fromYList_1.push(from.y);
                durationlist_1.push(dist[index] / total * th.duration);
            }
            th.exectors.push(function (elapsed) {
                var curr_x = th.tweenFunc(elapsed, fromXList_1, deltaXlist_1, durationlist_1, th.duration);
                th.node.x = curr_x; //测试发现用node.position.x，不能移动位置
            });
            th.exectors.push(function (elapsed) {
                var curr_y = th.tweenFunc(elapsed, fromYList_1, deltaYlist_1, durationlist_1, th.duration);
                th.node.y = curr_y;
            });
        }
        //其他的动画不用PathLinera
        var otherTweenFunc = TweenFunc.Linear;
        if (params.rotation != null) {
            var from_13 = node.rotation;
            var delta_13 = params.rotation - from_13;
            th.exectors.push(function (elapsed) {
                var curr_rot = otherTweenFunc(elapsed, from_13, delta_13, th.duration);
                th.node.rotation = curr_rot;
            });
        }
        if (params.width != null) {
            var from_14 = node.width;
            var delta_14 = params.width - from_14;
            th.exectors.push(function (elapsed) {
                var curr_width = otherTweenFunc(elapsed, from_14, delta_14, th.duration);
                th.node.width = curr_width;
            });
        }
        if (params.height != null) {
            var from_15 = node.height;
            var delta_15 = params.height - from_15;
            th.exectors.push(function (elapsed) {
                var curr_height = otherTweenFunc(elapsed, from_15, delta_15, th.duration);
                th.node.height = curr_height;
            });
        }
        if (params.bottom != null) {
            var from_16 = node.bottom;
            var delta_16 = params.bottom - from_16;
            th.exectors.push(function (elapsed) {
                var curr_bottom = th.tweenFunc(elapsed, from_16, delta_16, th.duration);
                th.node.bottom = curr_bottom;
            });
        }
        if (params.top != null) {
            var from_17 = node.top;
            var delta_17 = params.top - from_17;
            th.exectors.push(function (elapsed) {
                var curr_top = th.tweenFunc(elapsed, from_17, delta_17, th.duration);
                th.node.top = curr_top;
            });
        }
        if (params.left != null) {
            var from_18 = node.left;
            var delta_18 = params.left - from_18;
            th.exectors.push(function (elapsed) {
                var curr_left = th.tweenFunc(elapsed, from_18, delta_18, th.duration);
                th.node.left = curr_left;
            });
        }
        if (params.right != null) {
            var from_19 = node.right;
            var delta_19 = params.right - from_19;
            th.exectors.push(function (elapsed) {
                var curr_right = th.tweenFunc(elapsed, from_19, delta_19, th.duration);
                th.node.right = curr_right;
            });
        }
        if (params.alpha != null) {
            var from_20 = node.alpha;
            var delta_20 = params.alpha - from_20;
            th.exectors.push(function (elapsed) {
                var curr_alpha = otherTweenFunc(elapsed, from_20, delta_20, th.duration);
                th.node.alpha = curr_alpha;
            });
        }
        if (!this.timer) {
            this.timer = TimeManager.getInst().addUpdater(cbhandler.gen_handler(this.update, this)); //TimeManager.getInst().add_updater(handler.gen_handler(this.update, this));
        }
        return this.list.append(++this.key, th);
    };
    Tween2DUtil.prototype.kill = function (key) {
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
    Tween2DUtil.path = function (params) {
        return this.getInst().path(params);
    };
    Tween2DUtil.from = function (params) {
        return this.getInst().from(params);
    };
    Tween2DUtil.to = function (params) {
        return this.getInst().to(params);
    };
    Tween2DUtil.kill = function (key) {
        this.getInst().kill(key);
    };
    Tween2DUtil.prototype.update = function (dt) {
        // //保持动画的频率, 避免频繁波动, 导致帧动画不稳.
        // this.checkFPS(dt);
        // if (this.animInterval != 0) dt = this.animInterval;//统一动画频率
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
                if (node.data.repeated < 0 || node.data.repeated > 1) {
                    if (node.data.repeated > 0)
                        node.data.repeated -= 1;
                    //重复设置
                    node.data.elapsed = (node.data.elapsed - node.data.delay) % node.data.duration; //改成延迟一次后, 重复/ node.data.elapsed - node.data.duration - node.data.delay;
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
    Tween2DUtil.prototype.clamp01 = function (value) {
        if (value < 0) {
            value = 0;
        }
        if (value > 1) {
            value = 1;
        }
        return value;
    };
    Tween2DUtil.prototype.checkFPS = function (dt) {
        this.frameCount++;
        this.timePassed += dt;
        if (this.frameCount >= this.checkInterval) {
            this.animInterval = Math.floor(this.timePassed / this.frameCount * 1000) / 1000;
            this.frameCount = 0;
            this.timePassed = 0;
        }
    };
    return Tween2DUtil;
}());
//# sourceMappingURL=tween2dutil.js.map