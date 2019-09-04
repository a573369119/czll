/**
 * 钱币动画图片类型
 */
enum EnumMoneyAnimType {
    Coin,       //金币
    Diamond,    //钻石
    Power,      //体力
    Lottery,    //抽签奖励
    CoinAnim,   //金币序列动画
}

type MoneyAnimParam = {
    animType: EnumMoneyAnimType;

}

class MoneyAnimManager {
    private static _instance: MoneyAnimManager;
    public static get Instance(): MoneyAnimManager {
        if (this._instance == null) {
            this._instance = new MoneyAnimManager();
        }
        return this._instance;
    }

    constructor() {
        //正在播放的列表
        this.coinShowList = new Array<MoneyAnimItem>();
        this.diamondShowList = new Array<MoneyAnimItem>();
        this.powerShowList = new Array<MoneyAnimItem>();
        this.turntableShowList = new Array<MoneyAnimItem>();
        this.coinAnimShowList = new Array<MoneyAnimItem>();
        //池
        this.itemPool = new Array<MoneyAnimItem>();
        // this.coinPool = new Array<Laya.Image>();
        // this.diamondPool = new Array<Laya.Image>();
        // this.powerPool = new Array<Laya.Image>();
        // this.turntablePool = new Array<Laya.Image>();
        //任务
        this.taskList_Anim = new Array<number>();
        this.taskList_Time = new Array<number>();
    }

    //所需图集放在UIMediator中统一预加载

    //正在显示的动画列表
    private coinShowList: Array<MoneyAnimItem>;
    private diamondShowList: Array<MoneyAnimItem>;
    private powerShowList: Array<MoneyAnimItem>;
    private turntableShowList: Array<MoneyAnimItem>;
    private coinAnimShowList: Array<MoneyAnimItem>;
    //池
    private itemPool: Array<MoneyAnimItem>;
    // private coinPool: Array<Laya.Image>;
    // private diamondPool: Array<Laya.Image>;
    // private powerPool: Array<Laya.Image>;
    // private turntablePool: Array<Laya.Image>;

    //时间
    private Time_PosAnim_Straight: number = 0.8;
    private Time_PosAnim_Curve: number = 0.8;
    private Time_PosAnim_Step1: number = 0.1;
    private Time_PosAnim_Step2: number = 0.3;
    private Time_AlphaAnim: number = 1;

    //任务
    private taskList_Anim: Array<number>;
    private taskList_Time: Array<number>;

    /**
     * 在一个地方产生一定数量的钱币，在原地扩散开，然后移动到指定地点
     * @param moneyType 动画类型
     * @param num 钱币图片数量
     * @param from 起始点
     * @param to 最终点
     * @param cb 
     */
    public PlayMoneyAnim_Pos_2Step(moneyType: EnumMoneyAnimType, num: number, from: Vec2, to: Vec2, radius: number, cb?: cbhandler) {
        if (num <= 0) {
            if (cb) {
                cb.exec();
            }
            return;
        }
        //角度平均分
        let angle = 2 * Math.PI / num;
        for (var i = 0; i < num; i++) {
            //创建钱币
            let money = this.CreateMoney(moneyType);
            //初始化位置
            money.pos(from.x, from.y);
            //距离为50
            let path = new Vec2(from.x + Math.cos(angle * i) * radius, from.y + Math.sin(angle * i) * radius);
            //播放动画
            let animTask = this.Anim_To(money, this.Time_PosAnim_Step1, path, cbhandler.gen_handler(() => {
                //移除任务
                this.taskList_Anim.splice(this.taskList_Anim.indexOf(animTask), 1);
                animTask = this.Anim_To(money, this.Time_PosAnim_Step2, to, cbhandler.gen_handler(() => {
                    //移除任务
                    this.taskList_Anim.splice(this.taskList_Anim.indexOf(animTask), 1);
                    //删除钱币
                    this.DeleteMoney(moneyType, money);
                }));
                this.taskList_Anim.push(animTask);
            }));

            this.taskList_Anim.push(animTask);
        }
        //完成回调
        if (cb) {
            //稍有延时
            let timeTask = TimeManager.getInst().once(this.Time_PosAnim_Step1 + this.Time_PosAnim_Step2 + 0.05, cbhandler.gen_handler(() => {
                //移除任务
                this.taskList_Time.splice(this.taskList_Anim.indexOf(timeTask), 1);
                cb.exec();
            }, this));
            this.taskList_Time.push(timeTask);
        }
    }

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
    public PlayMoneyAnim_Pos_Curve(moneyType: EnumMoneyAnimType, num: number, from: Vec2, to: Vec2, radius: number, cb?: cbhandler, parent?: Laya.Sprite, scale?: number, animTime?: number) {
        if (num <= 0) {
            if (cb) {
                cb.exec();
            }
            return;
        }
        //角度平均分
        let angle = 2 * Math.PI / num;
        //记录最长时间
        let longestTime: number = 0;
        for (var i = 0; i < num; i++) {
            //创建钱币
            let money = this.CreateMoney(moneyType, parent, scale);
            //初始化位置
            money.pos(from.x, from.y);
            //距离为500
            let center = new Vec2(from.x + Math.cos(angle * i) * radius, from.y + Math.sin(angle * i) * radius);
            //通过贝塞尔曲线创建路径
            let path = CurveUtil.CreateCurvePath(from, center, to, 10);
            //时间：基础值*（0.8~1.25）
            let time = (animTime ? animTime : this.Time_PosAnim_Curve) * (Math.random() * 0.45 + 0.8);
            //播放动画
            let animTask = this.Anim_Path(money, time, to, path, cbhandler.gen_handler(() => {
                //移除任务
                this.taskList_Anim.splice(this.taskList_Anim.indexOf(animTask), 1);
                //删除钱币
                this.DeleteMoney(moneyType, money);
                //播放音效
                this.MoneySound(moneyType);
            }));
            this.taskList_Anim.push(animTask);
            //最长时间
            if (time > longestTime) {
                longestTime = time;
            }
        }
        //完成回调
        if (cb) {
            //稍有延时（用最长时间，延后0.05秒）
            let timeTask = TimeManager.getInst().once(longestTime + 0.05, cbhandler.gen_handler(() => {
                //移除任务
                this.taskList_Time.splice(this.taskList_Anim.indexOf(timeTask), 1);
                cb.exec();
            }, this));
            this.taskList_Time.push(timeTask);
        }
    }


    /**
     * 在一个地方产生一定数量的钱币，有间隔的直接移向目标位置
     * @param moneyType 钱币类型
     * @param num 数量
     * @param from 起始位置
     * @param to 目标位置
     * @param cb 
     */
    public PlayMoneyAnim_Pos_Straight(moneyType: EnumMoneyAnimType, num: number, from: Vec2, to: Vec2, cb?: cbhandler) {
        if (num <= 0) {
            if (cb) {
                cb.exec();
            }
            return;
        }
        for (var i = 0; i < num; i++) {
            //每隔0.1秒创建一个钱币，将钱币区分开
            let timeTask = TimeManager.getInst().once(0.1 * i, cbhandler.gen_handler(() => {
                //移除任务
                this.taskList_Time.splice(this.taskList_Anim.indexOf(timeTask), 1);
                //创建钱币
                let money = this.CreateMoney(moneyType);
                //初始化位置
                money.pos(from.x, from.y);
                //播放动画
                //移除任务
                let animTask = this.Anim_To(money, this.Time_PosAnim_Straight, to, cbhandler.gen_handler(() => {
                    this.taskList_Anim.splice(this.taskList_Anim.indexOf(animTask), 1);
                    //删除钱币
                    this.DeleteMoney(moneyType, money);
                }));
            }));
            this.taskList_Time.push(timeTask);

        }
        //完成回调
        if (cb) {
            let timeTask = TimeManager.getInst().once(num * (this.Time_PosAnim_Straight + 0.1) + 0.05, cbhandler.gen_handler(() => {
                //移除任务
                this.taskList_Time.splice(this.taskList_Anim.indexOf(timeTask), 1);
                cb.exec();
            }, this));
            this.taskList_Time.push(timeTask);
        }
    }

    /**
     * 在一个地方产生一定数量的钱币，然后向四处扩散同时透明度降低，直至消失
     */
    public PlayMoneyAnim_Explose(moneyType: EnumMoneyAnimType, num: number, from: Vec2, radius: number, cb: cbhandler) {
        if (num <= 0) {
            if (cb) {
                cb.exec();
            }
            return;
        }
        //角度平均分
        let angle = 2 * Math.PI / num;
        for (var i = 0; i < num; i++) {
            //创建钱币
            let money = this.CreateMoney(moneyType);
            //初始化位置
            money.pos(from.x, from.y);
            //初始化透明度
            money.alpha = 1;
            //距离为100
            let to = new Vec2(from.x + Math.cos(angle * i) * radius, from.y + Math.sin(angle * i) * radius);
            //播放动画
            let animTask = this.Anim_To(money, this.Time_AlphaAnim, to, cbhandler.gen_handler(() => {
                //移除任务
                this.taskList_Anim.splice(this.taskList_Anim.indexOf(animTask), 1);
                //删除钱币
                this.DeleteMoney(moneyType, money);
            }), 0);
        }

        //完成回调
        if (cb) {
            let timeTask = TimeManager.getInst().once(this.Time_AlphaAnim + 0.05, cbhandler.gen_handler(() => {
                //移除任务
                this.taskList_Time.splice(this.taskList_Anim.indexOf(timeTask), 1);
                cb.exec();
            }, this));
            this.taskList_Time.push(timeTask);
        }
    }

    /**
     * 停止所有的动画
     */
    public StopAllMoneyAnim() {
        //动画列表
        for (var i = 0; i < this.taskList_Anim.length; i++) {
            var element = this.taskList_Anim[i];
            Tween2DUtil.kill(element);
        }
        this.taskList_Anim = new Array<number>()
        //时间列表
        for (var i = 0; i < this.taskList_Time.length; i++) {
            var element = this.taskList_Time[i];
            TimeManager.getInst().remove(element);
        }
        this.taskList_Time = new Array<number>()
    }

    //池功能
    //创建
    private CreateMoney(moneyType: EnumMoneyAnimType, parent?: Laya.Sprite, scale?: number): MoneyAnimItem {
        let money: MoneyAnimItem = null;
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
        } else {
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
        } else {
            ui.UIMediator.GetInstance().uiParentMoneyAnim.addChild(money);
        }
        return money;
    }

    //销毁
    private DeleteMoney(moneyType: EnumMoneyAnimType, money: MoneyAnimItem) {
        //移除父子关系
        money.removeSelf();
        money.DeleteItem();
        //从队列中去除
        switch (moneyType) {
            case EnumMoneyAnimType.Coin: {
                let index = this.coinShowList.indexOf(money);
                this.coinShowList.splice(index, 1);
                break;
            }
            case EnumMoneyAnimType.Diamond: {
                let index = this.diamondShowList.indexOf(money);
                this.diamondShowList.splice(index, 1);
                break;
            }
            case EnumMoneyAnimType.Power: {
                let index = this.powerShowList.indexOf(money);
                this.powerShowList.splice(index, 1);
                break;
            }
            case EnumMoneyAnimType.Lottery: {
                let index = this.turntableShowList.indexOf(money);
                this.turntableShowList.splice(index, 1);
                break;
            }
            case EnumMoneyAnimType.CoinAnim: {
                let index = this.coinAnimShowList.indexOf(money);
                this.coinAnimShowList.splice(index, 1);
                break;
            }
        }
        //入池
        this.itemPool.push(money);
    }

    //钱币音效
    private MoneySound(moneyType: EnumMoneyAnimType) {
        let soundID: EnumSoundID = null;
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
            AudioManager.GetInstance().PlaySoundByConfigID(soundID)
        }

    }

    /**
     * 封装TweenUtil
     */
    private Anim_To(node: Laya.Sprite, duration: number, to: Vec2, onComplete?: cbhandler, alpha?: number, scale?: Vec2): number {
        let param: Tween2DParams = {
            node: node,
            duration: duration,
            x: to.x,
            y: to.y,
        }
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
    }

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
    private Anim_Path(node: Laya.Sprite, duration: number, to: Vec2, path: Vec2[], onComplete?: cbhandler, alpha?: number, scale?: Vec2): number {
        let param: Tween2DParams = {
            node: node,
            duration: duration,
            x: to.x,
            y: to.y,
        }
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
    }
}