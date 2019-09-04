//2019-7-9 16:01:37 由于3.0产能改为每秒钟更新，因此不再尝试每秒钟发送更新消息。通知服务器的消息有创建和收获。更新由本地计算

class SpawnItem extends ui.PrefabUI.SpawnItemPrefabUI {
    public spawnInfo: SpawnInfo;
    private timeTask: number = -1;

    //线颜色
    // private lineColor: string = "#FFFF00";        //金币
    //扇形半径
    private readonly radius = 64;
    //扇形线宽度
    private readonly lineWidth = 10;
    //内部透明圆
    // private UI_Img_Circle: Laya.Sprite;

    //更新间隔
    private interval = 0.02;

    //横向进度条
    private readonly ProgressWidth_Max = 186;
    private readonly ProgressWidth_Min = 0;


    constructor() {
        super();

        //挂载事件
        this.UI_Btn_GainSpawn.on(Laya.Event.CLICK, this, this.OnUI_Btn_GainSpawnClick);
    }


    //创建时调用
    public InitSpawnItem(spawnInfo: SpawnInfo) {
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
    }

    //更新时调用
    public UpdateSpawnItem() {
        //本地直接更新钱数和时间
        //计算增量
        let deltaNum = 0;
        let spawnLvl = GameDataManager.getInstance().LoginPlayerInfo.SpawnLvl;
        //金币 = 单位产能 * 时间
        deltaNum = FormulaUtil.CalcByConfig(EnumFormulaType.GoldUpgrade, spawnLvl) * ConstDefine.SpawnTime_Coin;
        let localMoneyNum = StorageManager.GetSpawnMoneyNum();
        localMoneyNum += deltaNum;
        // Log.Debug("SpawnItem Update Num:", localMoneyNum);
        StorageManager.SetSpawnMoneyNum(localMoneyNum);
        StorageManager.SetSpawnUpdateTime(Math.floor(Date.now() / 1000));
        this.spawnInfo.moneyNum = StorageManager.GetSpawnMoneyNum();

        let createSecond = Date.now() / 1000 - this.spawnInfo.createTime; //秒单位
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
    }

    //摧毁时调用
    public DeleteSpawnItem() {
        // //移除事件
        // this.UI_Btn_GainSpawn.off(Laya.Event.CLICK, this, this.OnUI_Btn_GainSpawnClick);
        //取消时间函数
        if (this.timeTask != -1) {
            TimeManager.getInst().remove(this.timeTask);
            this.timeTask = -1;
        }
        //清除数据v
        this.spawnInfo = null;
    }

    /**
     * 暂停时调用
     * @param pause true时暂停，false时取消暂停
     */
    private PauseSpawnItem(pause: boolean) {
        //只会有一个地方需要暂停，即为弹出更多产能面板时
        if (pause) {
            if (this.timeTask != -1) {
                TimeManager.getInst().remove(this.timeTask);
                this.timeTask = -1;
            }
        } else {
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
    }

    //刷新颜色
    private SetColor() {
        if (!this.spawnInfo) return;

        //文字颜色
        // this.UI_Txt_Num.color = this.lineColor;
        // this.UI_Txt_Time.color = this.lineColor;
    }

    //每秒循环
    //2019-7-9 16:38:37 3.0新需求，每秒钟更新产能数值，因此不再频繁发送消息，直接改为本地调用
    private SecondLoop() {
        if (!this.spawnInfo) return;

        //2019-6-5 16:51:45 如果产能数量为0，隐藏item
        //2019-6-12 15:38:30 2阶段不再是销毁阶段，一直挂机直到被收获
        //2019-6-14 10:31:56 新需求 产能为0可以显示，但是不能点击
        this.visible = this.spawnInfo.moneyNum > 0;
        this.UI_Btn_GainSpawn.mouseEnabled = this.spawnInfo.moneyNum > 0;

        //显示一个周期的剩余时间
        // let now = Date.now() / 1000;//Math.floor(Date.now() / 1000);
        // let deltaSecond = now - (this.spawnInfo.latestPointRefreshTime as number);
        let lastUpdateTime = StorageManager.GetSpawnUpdateTime();
        let now = Date.now() / 1000;
        let deltaSecond = now - lastUpdateTime; //秒单位
        // Log.Debug("SpawnItem lastUpdateTime:", lastUpdateTime, "now:", now, "deltaSecond:", deltaSecond, "leftTime:", ConstDefine.SpawnTime_Coin - deltaSecond);
        if (this.spawnInfo.spawnType == 1) {
            //产生阶段
            let leftTime: number = 0;
            //剩余时间
            leftTime = ConstDefine.SpawnTime_Coin - deltaSecond;
            //按照剩余时间发送消息
            if (leftTime <= 0) {
                //取消倒计时
                TimeManager.getInst().remove(this.timeTask);
                this.timeTask = -1;
                //直接调用更新方法
                this.UpdateSpawnItem();
            } else {
                //设置进度条
                // this.DrawPie(leftTime / ConstDefine.SpawnTime_Coin, false);
                this.SetProgress(1 - leftTime / ConstDefine.SpawnTime_Coin)
                //文字内容
                // this.UI_Txt_Time.text = GameDataUtil.ConvertSecondToTimeStr(Math.floor(leftTime));
            }
        } else {
            //销毁阶段
            //2019-6-12 15:39:42 新需求 不再销毁，一直挂着直到被收获
            //不再显示饼
            this.SetProgress(0);
            // this.DrawPie(0, true);
            //取消倒计时
            TimeManager.getInst().remove(this.timeTask);
            this.timeTask = -1;
            //不再显示倒计时时间文字
            // this.UI_Txt_Time.text = "";

        }
    }

    //点击拾取
    private OnUI_Btn_GainSpawnClick() {
        if (!this.spawnInfo) return;
        // Log.Debug("拾取产能！");
        //暂停倒计时
        this.PauseSpawnItem(true);

        //2019-6-5 13:12:38 有几率获取5倍产能
        let chance = StorageManager.GetMoreSpawnChance();
        let random = Math.random();
        //2019-6-25 14:40:21 新需求 分享总开关
        //2019-8-5 09:43:03 产能不再翻倍
        let luckyEnable = false;//GameDataManager.getInstance().LuckyEnable;//true;//
        if (random <= chance && luckyEnable) {
            //多倍领取
            Facade.instance.sendNotification(NotificationNames.OPENUIWITHPARAM, new MoreSpawnUIParam(1, this.spawnInfo.spawnID));
            //重置几率
            StorageManager.SetMoreSpawnChance(0.1);
        } else {
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
    }

    private SendGainMoneySpawn() {
        //获取本地的数据
        let base = StorageManager.GetSpawnMoneyNum();
        //发送领取信息
        HttpMessageSender.GetSender().SendGainMoneySpawn(GameDataManager.getInstance().LoginPlayerInfo.OpenID, this.spawnInfo.spawnID, base, 1, null, () => {
            //提示网络连接错误
            this.ConnectError();
        });
    }

    public PlayMoneyAnim() {
        //2019-7-26 14:25:58 新需求 动画的播放时间移到点击收获时执行，并且隐藏产能内容
        //根据产能类型与数量，播放动画
        let globalPos = CommonUtil2D.GetGlobalPosition(this);
        //金币
        MoneyAnimManager.Instance.PlayMoneyAnim_Pos_Curve(EnumMoneyAnimType.Coin, 5, new Vec2(globalPos.x, globalPos.y), new Vec2(ConstDefine.MoneyImgPos_Coin.x, ConstDefine.MoneyImgPos_Coin.y), 500);
        this.visible = false;
    }

    public ConnectError() {
        //链接失败
        this.visible = true;
        this.PauseSpawnItem(false);
    }

    /**
     * 设置进度条
     * @param ratio 0~1
     */
    private SetProgress(ratio: number) {
        this.UI_Img_Mask.width = this.ProgressWidth_Min + (this.ProgressWidth_Max - this.ProgressWidth_Min) * ratio;
    }

    // /**
    //  * 绘制饼状图
    //  * @param ratio 0~1
    //  * @param countDown 为true时倒计时
    //  */
    // private DrawPie(ratio: number, countDown: boolean) {
    //     // Log.Debug("SpawnItem DrawPie " + ratio);
    //     //限制
    //     if (ratio > 1) ratio = 1;
    //     if (ratio < 0) ratio = 0;
    //     //画个环状图
    //     let angle = 0;
    //     //需要正倒计时判断
    //     if (!countDown) {
    //         angle = -360 * ratio + 270;
    //     } else {
    //         angle = 360 * ratio - 90;
    //     }
    //     //测试
    //     // angle = 270
    //     //清空一下
    //     this.UI_Img_Pie.graphics.clear();
    //     this.UI_Img_Pie.graphics.drawPie(this.UI_Img_Pie.width / 2, this.UI_Img_Pie.height / 2, this.radius, -90, angle, this.lineColor);

    // }
}