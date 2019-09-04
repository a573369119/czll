/**
 * 钱币动画图片类型
 */
var EnumMoneyAnimType;
(function (EnumMoneyAnimType) {
    EnumMoneyAnimType[EnumMoneyAnimType["Coin"] = 0] = "Coin";
    EnumMoneyAnimType[EnumMoneyAnimType["Diamond"] = 1] = "Diamond";
    EnumMoneyAnimType[EnumMoneyAnimType["Power"] = 2] = "Power";
    EnumMoneyAnimType[EnumMoneyAnimType["Lottery"] = 3] = "Lottery";
    EnumMoneyAnimType[EnumMoneyAnimType["CoinAnim"] = 4] = "CoinAnim";
})(EnumMoneyAnimType || (EnumMoneyAnimType = {}));
var MoneyAnimManager = (function () {
    function MoneyAnimManager() {
        // private coinPool: Array<Laya.Image>;
        // private diamondPool: Array<Laya.Image>;
        // private powerPool: Array<Laya.Image>;
        // private turntablePool: Array<Laya.Image>;
        //时间
        this.Time_PosAnim_Straight = 0.8;
        this.Time_PosAnim_Curve = 0.8;
        this.Time_PosAnim_Step1 = 0.1;
        this.Time_PosAnim_Step2 = 0.3;
        this.Time_AlphaAnim = 1;
        //正在播放的列表
        this.coinShowList = new Array();
        this.diamondShowList = new Array();
        this.powerShowList = new Array();
        this.turntableShowList = new Array();
        this.coinAnimShowList = new Array();
        //池
        this.itemPool = new Array();
        // this.coinPool = new Array<Laya.Image>();
        // this.diamondPool = new Array<Laya.Image>();
        // this.powerPool = new Array<Laya.Image>();
        // this.turntablePool = new Array<Laya.Image>();
        //任务
        this.taskList_Anim = new Array();
        this.taskList_Time = new Array();
    }
    Object.defineProperty(MoneyAnimManager, "Instance", {
        get: function () {
            if (this._instance == null) {
                this._instance = new MoneyAnimManager();
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 在一个地方产生一定数量的钱币，在原地扩散开，然后移动到指定地点
     * @param moneyType 动画类型
     * @param num 钱币图片数量
     * @param from 起始点
     * @param to 最终点
     * @param cb
     */
    MoneyAnimManager.prototype.PlayMoneyAnim_Pos_2Step = function (moneyType, num, from, to, radius, cb) {
        var _this = this;
        if (num <= 0) {
            if (cb) {
                cb.exec();
            }
            return;
        }
        //角度平均分
        var angle = 2 * Math.PI / num;
        var _loop_1 = function () {
            //创建钱币
            var money = this_1.CreateMoney(moneyType);
            //初始化位置
            money.pos(from.x, from.y);
            //距离为50
            var path = new Vec2(from.x + Math.cos(angle * i) * radius, from.y + Math.sin(angle * i) * radius);
            //播放动画
            var animTask = this_1.Anim_To(money, this_1.Time_PosAnim_Step1, path, cbhandler.gen_handler(function () {
                //移除任务
                _this.taskList_Anim.splice(_this.taskList_Anim.indexOf(animTask), 1);
                animTask = _this.Anim_To(money, _this.Time_PosAnim_Step2, to, cbhandler.gen_handler(function () {
                    //移除任务
                    _this.taskList_Anim.splice(_this.taskList_Anim.indexOf(animTask), 1);
                    //删除钱币
                    _this.DeleteMoney(moneyType, money);
                }));
                _this.taskList_Anim.push(animTask);
            }));
            this_1.taskList_Anim.push(animTask);
        };
        var this_1 = this;
        for (var i = 0; i < num; i++) {
            _loop_1();
        }
        //完成回调
        if (cb) {
            //稍有延时
            var timeTask_1 = TimeManager.getInst().once(this.Time_PosAnim_Step1 + this.Time_PosAnim_Step2 + 0.05, cbhandler.gen_handler(function () {
                //移除任务
                _this.taskList_Time.splice(_this.taskList_Anim.indexOf(timeTask_1), 1);
                cb.exec();
            }, this));
            this.taskList_Time.push(timeTask_1);
        }
    };
    /**
     * 在一个地方产生一定数量的钱币，延曲线移动到指定地点
     * @param moneyType 动画类型
     * @param num 钱币图片数量
     * @param from 起始点
     * @param to 最终点
     * @param cb 完成回调
     * @param parent 父容器
     * @param scale 单个钱币的尺寸
     * @param animTime 动画时间基准值
     */
    MoneyAnimManager.prototype.PlayMoneyAnim_Pos_Curve = function (moneyType, num, from, to, radius, cb, parent, scale, animTime) {
        var _this = this;
        if (num <= 0) {
            if (cb) {
                cb.exec();
            }
            return;
        }
        //角度平均分
        var angle = 2 * Math.PI / num;
        //记录最长时间
        var longestTime = 0;
        var _loop_2 = function () {
            //创建钱币
            var money = this_2.CreateMoney(moneyType, parent, scale);
            //初始化位置
            money.pos(from.x, from.y);
            //距离为500
            var center = new Vec2(from.x + Math.cos(angle * i) * radius, from.y + Math.sin(angle * i) * radius);
            //通过贝塞尔曲线创建路径
            var path = CurveUtil.CreateCurvePath(from, center, to, 10);
            //时间：基础值*（0.8~1.25）
            var time = (animTime ? animTime : this_2.Time_PosAnim_Curve) * (Math.random() * 0.45 + 0.8);
            //播放动画
            var animTask = this_2.Anim_Path(money, time, to, path, cbhandler.gen_handler(function () {
                //移除任务
                _this.taskList_Anim.splice(_this.taskList_Anim.indexOf(animTask), 1);
                //删除钱币
                _this.DeleteMoney(moneyType, money);
                //播放音效
                _this.MoneySound(moneyType);
            }));
            this_2.taskList_Anim.push(animTask);
            //最长时间
            if (time > longestTime) {
                longestTime = time;
            }
        };
        var this_2 = this;
        for (var i = 0; i < num; i++) {
            _loop_2();
        }
        //完成回调
        if (cb) {
            //稍有延时（用最长时间，延后0.05秒）
            var timeTask_2 = TimeManager.getInst().once(longestTime + 0.05, cbhandler.gen_handler(function () {
                //移除任务
                _this.taskList_Time.splice(_this.taskList_Anim.indexOf(timeTask_2), 1);
                cb.exec();
            }, this));
            this.taskList_Time.push(timeTask_2);
        }
    };
    /**
     * 在一个地方产生一定数量的钱币，有间隔的直接移向目标位置
     * @param moneyType 钱币类型
     * @param num 数量
     * @param from 起始位置
     * @param to 目标位置
     * @param cb
     */
    MoneyAnimManager.prototype.PlayMoneyAnim_Pos_Straight = function (moneyType, num, from, to, cb) {
        var _this = this;
        if (num <= 0) {
            if (cb) {
                cb.exec();
            }
            return;
        }
        var _loop_3 = function () {
            //每隔0.1秒创建一个钱币，将钱币区分开
            var timeTask = TimeManager.getInst().once(0.1 * i, cbhandler.gen_handler(function () {
                //移除任务
                _this.taskList_Time.splice(_this.taskList_Anim.indexOf(timeTask), 1);
                //创建钱币
                var money = _this.CreateMoney(moneyType);
                //初始化位置
                money.pos(from.x, from.y);
                //播放动画
                //移除任务
                var animTask = _this.Anim_To(money, _this.Time_PosAnim_Straight, to, cbhandler.gen_handler(function () {
                    _this.taskList_Anim.splice(_this.taskList_Anim.indexOf(animTask), 1);
                    //删除钱币
                    _this.DeleteMoney(moneyType, money);
                }));
            }));
            this_3.taskList_Time.push(timeTask);
        };
        var this_3 = this;
        for (var i = 0; i < num; i++) {
            _loop_3();
        }
        //完成回调
        if (cb) {
            var timeTask_3 = TimeManager.getInst().once(num * (this.Time_PosAnim_Straight + 0.1) + 0.05, cbhandler.gen_handler(function () {
                //移除任务
                _this.taskList_Time.splice(_this.taskList_Anim.indexOf(timeTask_3), 1);
                cb.exec();
            }, this));
            this.taskList_Time.push(timeTask_3);
        }
    };
    /**
     * 在一个地方产生一定数量的钱币，然后向四处扩散同时透明度降低，直至消失
     */
    MoneyAnimManager.prototype.PlayMoneyAnim_Explose = function (moneyType, num, from, radius, cb) {
        var _this = this;
        if (num <= 0) {
            if (cb) {
                cb.exec();
            }
            return;
        }
        //角度平均分
        var angle = 2 * Math.PI / num;
        var _loop_4 = function () {
            //创建钱币
            var money = this_4.CreateMoney(moneyType);
            //初始化位置
            money.pos(from.x, from.y);
            //初始化透明度
            money.alpha = 1;
            //距离为100
            var to = new Vec2(from.x + Math.cos(angle * i) * radius, from.y + Math.sin(angle * i) * radius);
            //播放动画
            var animTask = this_4.Anim_To(money, this_4.Time_AlphaAnim, to, cbhandler.gen_handler(function () {
                //移除任务
                _this.taskList_Anim.splice(_this.taskList_Anim.indexOf(animTask), 1);
                //删除钱币
                _this.DeleteMoney(moneyType, money);
            }), 0);
        };
        var this_4 = this;
        for (var i = 0; i < num; i++) {
            _loop_4();
        }
        //完成回调
        if (cb) {
            var timeTask_4 = TimeManager.getInst().once(this.Time_AlphaAnim + 0.05, cbhandler.gen_handler(function () {
                //移除任务
                _this.taskList_Time.splice(_this.taskList_Anim.indexOf(timeTask_4), 1);
                cb.exec();
            }, this));
            this.taskList_Time.push(timeTask_4);
        }
    };
    /**
     * 停止所有的动画
     */
    MoneyAnimManager.prototype.StopAllMoneyAnim = function () {
        //动画列表
        for (var i = 0; i < this.taskList_Anim.length; i++) {
            var element = this.taskList_Anim[i];
            Tween2DUtil.kill(element);
        }
        this.taskList_Anim = new Array();
        //时间列表
        for (var i = 0; i < this.taskList_Time.length; i++) {
            var element = this.taskList_Time[i];
            TimeManager.getInst().remove(element);
        }
        this.taskList_Time = new Array();
    };
    //池功能
    //创建
    MoneyAnimManager.prototype.CreateMoney = function (moneyType, parent, scale) {
        var money = null;
        //从最后弹出
        money = this.itemPool.pop();
        if (!money) {
            //创建一个新的
            money = new MoneyAnimItem();
            money.anchorX = 0.5;
            money.anchorY = 0.5;
        }
        //设置尺寸
        if (scale) {
            money.scale(scale, scale);
        }
        else {
            money.scale(1, 1);
        }
        switch (moneyType) {
            case EnumMoneyAnimType.Coin: {
                //加入播放列表
                this.coinShowList.push(money);
                break;
            }
            case EnumMoneyAnimType.Diamond: {
                //加入播放列表
                this.diamondShowList.push(money);
                break;
            }
            case EnumMoneyAnimType.Power: {
                //加入播放列表
                this.powerShowList.push(money);
                break;
            }
            case EnumMoneyAnimType.Lottery: {
                //加入播放列表
                this.turntableShowList.push(money);
                break;
            }
            case EnumMoneyAnimType.CoinAnim: {
                //加入播放列表
                this.coinAnimShowList.push(money);
                break;
            }
        }
        //初始化
        money.InitItem(moneyType);
        //添加到场景中
        if (parent) {
            parent.addChild(money);
        }
        else {
            ui.UIMediator.GetInstance().uiParentMoneyAnim.addChild(money);
        }
        return money;
    };
    //销毁
    MoneyAnimManager.prototype.DeleteMoney = function (moneyType, money) {
        //移除父子关系
        money.removeSelf();
        money.DeleteItem();
        //从队列中去除
        switch (moneyType) {
            case EnumMoneyAnimType.Coin: {
                var index = this.coinShowList.indexOf(money);
                this.coinShowList.splice(index, 1);
                break;
            }
            case EnumMoneyAnimType.Diamond: {
                var index = this.diamondShowList.indexOf(money);
                this.diamondShowList.splice(index, 1);
                break;
            }
            case EnumMoneyAnimType.Power: {
                var index = this.powerShowList.indexOf(money);
                this.powerShowList.splice(index, 1);
                break;
            }
            case EnumMoneyAnimType.Lottery: {
                var index = this.turntableShowList.indexOf(money);
                this.turntableShowList.splice(index, 1);
                break;
            }
            case EnumMoneyAnimType.CoinAnim: {
                var index = this.coinAnimShowList.indexOf(money);
                this.coinAnimShowList.splice(index, 1);
                break;
            }
        }
        //入池
        this.itemPool.push(money);
    };
    //钱币音效
    MoneyAnimManager.prototype.MoneySound = function (moneyType) {
        var soundID = null;
        switch (moneyType) {
            case EnumMoneyAnimType.Coin: {
                soundID = EnumSoundID.sound_function_gold_01;
                break;
            }
            case EnumMoneyAnimType.Diamond: {
                soundID = EnumSoundID.sound_function_diamonds_01;
                break;
            }
            case EnumMoneyAnimType.Power: {
                soundID = EnumSoundID.sound_function_energy_01;
                break;
            }
            case EnumMoneyAnimType.CoinAnim: {
                soundID = EnumSoundID.sound_function_gold_01;
                break;
            }
        }
        if (soundID) {
            AudioManager.GetInstance().PlaySoundByConfigID(soundID);
        }
    };
    /**
     * 封装TweenUtil
     */
    MoneyAnimManager.prototype.Anim_To = function (node, duration, to, onComplete, alpha, scale) {
        var param = {
            node: node,
            duration: duration,
            x: to.x,
            y: to.y,
        };
        if (alpha != null) {
            param.alpha = alpha;
        }
        if (scale != null) {
            param.scalex = scale.x;
            param.scaley = scale.y;
        }
        if (onComplete != null) {
            param.onComplete = onComplete;
        }
        return Tween2DUtil.to(param);
    };
    /**
     * 延路径前进
     * @param node
     * @param duration
     * @param to
     * @param path
     * @param onComplete
     * @param alpha
     * @param scale
     */
    MoneyAnimManager.prototype.Anim_Path = function (node, duration, to, path, onComplete, alpha, scale) {
        var param = {
            node: node,
            duration: duration,
            x: to.x,
            y: to.y,
        };
        if (alpha != null) {
            param.alpha = alpha;
        }
        if (scale != null) {
            param.scalex = scale.x;
            param.scaley = scale.y;
        }
        if (onComplete != null) {
            param.onComplete = onComplete;
        }
        if (path != null) {
            param.path = path;
        }
        return Tween2DUtil.path(param);
    };
    return MoneyAnimManager;
}());
//# sourceMappingURL=MoneyAnimManager.js.map