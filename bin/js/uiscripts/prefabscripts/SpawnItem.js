//2019-7-9 16:01:37 由于3.0产能改为每秒钟更新，因此不再尝试每秒钟发送更新消息。通知服务器的消息有创建和收获。更新由本地计算
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var SpawnItem = (function (_super) {
    __extends(SpawnItem, _super);
    function SpawnItem() {
        var _this = _super.call(this) || this;
        _this.timeTask = -1;
        //线颜色
        // private lineColor: string = "#FFFF00";        //金币
        //扇形半径
        _this.radius = 64;
        //扇形线宽度
        _this.lineWidth = 10;
        //内部透明圆
        // private UI_Img_Circle: Laya.Sprite;
        //更新间隔
        _this.interval = 0.02;
        //横向进度条
        _this.ProgressWidth_Max = 186;
        _this.ProgressWidth_Min = 0;
        //挂载事件
        _this.UI_Btn_GainSpawn.on(Laya.Event.CLICK, _this, _this.OnUI_Btn_GainSpawnClick);
        return _this;
    }
    //创建时调用
    SpawnItem.prototype.InitSpawnItem = function (spawnInfo) {
        this.spawnInfo = spawnInfo;
        //金币
        // this.UI_Img_Icon.skin = ConstDefine.IconSkin_Coin;
        Log.Debug("SpawnItem Init Num:", this.spawnInfo.moneyNum);
        //显示数量
        this.UI_Txt_Num.text = GameDataUtil.NumberToString(this.spawnInfo.moneyNum);
        //刷新颜色
        this.SetColor();
        //取消时间函数
        if (this.timeTask != -1) {
            TimeManager.getInst().remove(this.timeTask);
            this.timeTask = -1;
        }
        //时间任务
        this.timeTask = TimeManager.getInst().loop(this.interval, cbhandler.gen_handler(this.SecondLoop, this));
        //调用一次，立刻刷新
        this.SecondLoop();
    };
    //更新时调用
    SpawnItem.prototype.UpdateSpawnItem = function () {
        //本地直接更新钱数和时间
        //计算增量
        var deltaNum = 0;
        var spawnLvl = GameDataManager.getInstance().LoginPlayerInfo.SpawnLvl;
        //金币 = 单位产能 * 时间
        deltaNum = FormulaUtil.CalcByConfig(EnumFormulaType.GoldUpgrade, spawnLvl) * ConstDefine.SpawnTime_Coin;
        var localMoneyNum = StorageManager.GetSpawnMoneyNum();
        localMoneyNum += deltaNum;
        // Log.Debug("SpawnItem Update Num:", localMoneyNum);
        StorageManager.SetSpawnMoneyNum(localMoneyNum);
        StorageManager.SetSpawnUpdateTime(Math.floor(Date.now() / 1000));
        this.spawnInfo.moneyNum = StorageManager.GetSpawnMoneyNum();
        var createSecond = Date.now() / 1000 - this.spawnInfo.createTime; //秒单位
        //计算创建状态
        this.spawnInfo.spawnType = createSecond >= ConstDefine.SpawnTime_OverTime ? 2 : 1;
        //显示数量
        this.UI_Txt_Num.text = GameDataUtil.NumberToString(this.spawnInfo.moneyNum);
        //取消时间函数
        if (this.timeTask != -1) {
            TimeManager.getInst().remove(this.timeTask);
            this.timeTask = -1;
        }
        //时间任务
        this.timeTask = TimeManager.getInst().loop(this.interval, cbhandler.gen_handler(this.SecondLoop, this));
        //调用一次，立刻刷新
        this.SecondLoop();
    };
    //摧毁时调用
    SpawnItem.prototype.DeleteSpawnItem = function () {
        // //移除事件
        // this.UI_Btn_GainSpawn.off(Laya.Event.CLICK, this, this.OnUI_Btn_GainSpawnClick);
        //取消时间函数
        if (this.timeTask != -1) {
            TimeManager.getInst().remove(this.timeTask);
            this.timeTask = -1;
        }
        //清除数据v
        this.spawnInfo = null;
    };
    /**
     * 暂停时调用
     * @param pause true时暂停，false时取消暂停
     */
    SpawnItem.prototype.PauseSpawnItem = function (pause) {
        //只会有一个地方需要暂停，即为弹出更多产能面板时
        if (pause) {
            if (this.timeTask != -1) {
                TimeManager.getInst().remove(this.timeTask);
                this.timeTask = -1;
            }
        }
        else {
            //取消旧时间函数
            if (this.timeTask != -1) {
                TimeManager.getInst().remove(this.timeTask);
                this.timeTask = -1;
            }
            //时间任务
            this.timeTask = TimeManager.getInst().loop(this.interval, cbhandler.gen_handler(this.SecondLoop, this));
            //调用一次，立刻刷新
            this.SecondLoop();
        }
    };
    //刷新颜色
    SpawnItem.prototype.SetColor = function () {
        if (!this.spawnInfo)
            return;
        //文字颜色
        // this.UI_Txt_Num.color = this.lineColor;
        // this.UI_Txt_Time.color = this.lineColor;
    };
    //每秒循环
    //2019-7-9 16:38:37 3.0新需求，每秒钟更新产能数值，因此不再频繁发送消息，直接改为本地调用
    SpawnItem.prototype.SecondLoop = function () {
        if (!this.spawnInfo)
            return;
        //2019-6-5 16:51:45 如果产能数量为0，隐藏item
        //2019-6-12 15:38:30 2阶段不再是销毁阶段，一直挂机直到被收获
        //2019-6-14 10:31:56 新需求 产能为0可以显示，但是不能点击
        this.visible = this.spawnInfo.moneyNum > 0;
        this.UI_Btn_GainSpawn.mouseEnabled = this.spawnInfo.moneyNum > 0;
        //显示一个周期的剩余时间
        // let now = Date.now() / 1000;//Math.floor(Date.now() / 1000);
        // let deltaSecond = now - (this.spawnInfo.latestPointRefreshTime as number);
        var lastUpdateTime = StorageManager.GetSpawnUpdateTime();
        var now = Date.now() / 1000;
        var deltaSecond = now - lastUpdateTime; //秒单位
        // Log.Debug("SpawnItem lastUpdateTime:", lastUpdateTime, "now:", now, "deltaSecond:", deltaSecond, "leftTime:", ConstDefine.SpawnTime_Coin - deltaSecond);
        if (this.spawnInfo.spawnType == 1) {
            //产生阶段
            var leftTime = 0;
            //剩余时间
            leftTime = ConstDefine.SpawnTime_Coin - deltaSecond;
            //按照剩余时间发送消息
            if (leftTime <= 0) {
                //取消倒计时
                TimeManager.getInst().remove(this.timeTask);
                this.timeTask = -1;
                //直接调用更新方法
                this.UpdateSpawnItem();
            }
            else {
                //设置进度条
                // this.DrawPie(leftTime / ConstDefine.SpawnTime_Coin, false);
                this.SetProgress(1 - leftTime / ConstDefine.SpawnTime_Coin);
            }
        }
        else {
            //销毁阶段
            //2019-6-12 15:39:42 新需求 不再销毁，一直挂着直到被收获
            //不再显示饼
            this.SetProgress(0);
            // this.DrawPie(0, true);
            //取消倒计时
            TimeManager.getInst().remove(this.timeTask);
            this.timeTask = -1;
        }
    };
    //点击拾取
    SpawnItem.prototype.OnUI_Btn_GainSpawnClick = function () {
        if (!this.spawnInfo)
            return;
        // Log.Debug("拾取产能！");
        //暂停倒计时
        this.PauseSpawnItem(true);
        //2019-6-5 13:12:38 有几率获取5倍产能
        var chance = StorageManager.GetMoreSpawnChance();
        var random = Math.random();
        //2019-6-25 14:40:21 新需求 分享总开关
        //2019-8-5 09:43:03 产能不再翻倍
        var luckyEnable = false; //GameDataManager.getInstance().LuckyEnable;//true;//
        if (random <= chance && luckyEnable) {
            //多倍领取
            Facade.instance.sendNotification(NotificationNames.OPENUIWITHPARAM, new MoreSpawnUIParam(1, this.spawnInfo.spawnID));
            //重置几率
            StorageManager.SetMoreSpawnChance(0.1);
        }
        else {
            //直接领取
            //叠加几率
            chance += 0.2;
            StorageManager.SetMoreSpawnChance(chance);
            //播放动画
            this.PlayMoneyAnim();
            //发送消息
            this.SendGainMoneySpawn();
        }
        // if (CommonUtil.OnMiniGame()) {
        // } else {
        //     //播放动画
        //     this.PlayMoneyAnim();
        //     //发送消息
        //     this.SendGainMoneySpawn();
        // }
        //播放音效
        AudioManager.GetInstance().PlaySoundByConfigID(EnumSoundID.sound_function_touch_02);
    };
    SpawnItem.prototype.SendGainMoneySpawn = function () {
        var _this = this;
        //获取本地的数据
        var base = StorageManager.GetSpawnMoneyNum();
        //发送领取信息
        HttpMessageSender.GetSender().SendGainMoneySpawn(GameDataManager.getInstance().LoginPlayerInfo.OpenID, this.spawnInfo.spawnID, base, 1, null, function () {
            //提示网络连接错误
            _this.ConnectError();
        });
    };
    SpawnItem.prototype.PlayMoneyAnim = function () {
        //2019-7-26 14:25:58 新需求 动画的播放时间移到点击收获时执行，并且隐藏产能内容
        //根据产能类型与数量，播放动画
        var globalPos = CommonUtil2D.GetGlobalPosition(this);
        //金币
        MoneyAnimManager.Instance.PlayMoneyAnim_Pos_Curve(EnumMoneyAnimType.Coin, 5, new Vec2(globalPos.x, globalPos.y), new Vec2(ConstDefine.MoneyImgPos_Coin.x, ConstDefine.MoneyImgPos_Coin.y), 500);
        this.visible = false;
    };
    SpawnItem.prototype.ConnectError = function () {
        //链接失败
        this.visible = true;
        this.PauseSpawnItem(false);
    };
    /**
     * 设置进度条
     * @param ratio 0~1
     */
    SpawnItem.prototype.SetProgress = function (ratio) {
        this.UI_Img_Mask.width = this.ProgressWidth_Min + (this.ProgressWidth_Max - this.ProgressWidth_Min) * ratio;
    };
    return SpawnItem;
}(ui.PrefabUI.SpawnItemPrefabUI));
//# sourceMappingURL=SpawnItem.js.map