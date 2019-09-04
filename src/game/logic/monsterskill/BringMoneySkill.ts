/*
* 分裂
*/
class BringMoneySkill implements ISkillLogic {
    // public static SPAWN_NUM: number;// = 2;       //分裂个数
    // public static MAX_SPLIT_NUM: number;//= 3;       //最多分裂次数
    // public static SIZE_HP_PERCENTAGE: number;//= 0.5; //子怪物的大小&血量百分比
    /**
     * 金币
     */
    public coinShow: ui.PrefabUI.BossTestUI;
    /**
     * 倒计时界面
     */
    public dieTimeView: ui.PrefabUI.DieTimeUI;
    /**怪物 */
    public player: Monster;
    public isStart: boolean;
    /**主炮等级 */
    public MAIN_WEAPOEN_LEVEL: number;//
    /**主炮系数 */
    public MAIN_WEAPONE_PERCENT: number;
    /**死亡金币翻倍系数 */
    public DIE_PERCENT: number;
    /**死亡时间 */
    public DIE_TIME: number;
    // private splitedCount = 0;//当前是第几次分裂 0,1,2,3
    /**已获得金币数 */
    private alreadyGet: number = 0;
    /**是否全部显示完毕 */
    private isOK: boolean;
    /**第几个 */
    private index: number = 0;
    /**时间计数器 */
    private timerCount: number = 0;
    /**家数队列 */
    private arr_CoinCount: Array<number>;
    /**加数队列下标 */
    private coinCount_Index: number;
    /**每次增加限额 */
    private coin_Max: number;
    /**怪物缩放 */
    private scale: Vec2;
    // private arr_BulletPos: Array<Bullet>;
    private config: SkillConfigConfigData;
    private InitParam(config: SkillConfigConfigData) {
        //let config = ConfigManager.GetInstance().GetSkillConfig(EnumMonsterPowerId.Split)
        // SplitSkill.SPAWN_NUM = config.Param1;
        // SplitSkill.MAX_SPLIT_NUM = config.Param2;
        // SplitSkill.SIZE_HP_PERCENTAGE = config.Param3;
        this.MAIN_WEAPOEN_LEVEL = GameDataManager.getInstance().LoginPlayerInfo.MainWeaponInfo.level;
        // console.log("主炮等级是" + this.MAIN_WEAPOEN_LEVEL);
        this.MAIN_WEAPONE_PERCENT = config.Param1;
        this.DIE_PERCENT = config.Param2;
        this.DIE_TIME = config.Param3;
        this.coin_Max = config.Param4;
    }

    public setPos(y): void {
        this.coinShow.y = y;
    }

    /**
     * 
     * @param player monster对象
     * @param param 参数
     */
    public Start(player: Monster, ...param: any[]) {
        this.player = player;
        this.isStart = true;
        if (!this.config) {
            this.config = param[0] as SkillConfigConfigData;//获取配置
            this.InitParam(this.config);//变量赋值
        }
        if (!this.dieTimeView) {
            this.dieTimeView = new ui.PrefabUI.DieTimeUI();
            this.player.comParent.addChild(this.dieTimeView);
            this.dieTimeView.zOrder = 100000;
        }
        //这个初始化的时候吧东西放到怪物的头上
        //初始化
        if (!this.coinShow) {
            this.coinShow = new ui.PrefabUI.BossTestUI();
            this.player.AddChild(this.coinShow);
        }
        this.coinShow.leb_CoinNum.text = "0";
        this.coinShow.widthBox.x = 58;
        this.coinShow.zOrder = ZOrderDefine.HP_BAR_ZORDER;// 1000
        this.coinShow.widthBox.visible = false;
        this.coinShow.bg_box.visible = false;
        //
        this.scale = this.player.attributeComp.Scale;
        this.arr_CoinCount = [0];
        this.coinCount_Index = 0;
        //把数据显示丢进去
        this.coinShow.pos(0, 0);
        this.dieTimeView.pos(0, 0);
        Laya.timer.loop(1000, this, this.dieTimeLoop);
        //时间初始化
        this.setTimeString(this.DIE_TIME + "");
    }

    public Stop(parent: Monster, param: any) {
        this.cleanUp();
    }

    public End(parent: Monster, onEndComplete: Function, param: any) {
        this.cleanUp();
        // this.exe(parent, param, onEndComplete)
        // if (onEndComplete) onEndComplete();
    }

    private cleanUp() {
        //接触计时器
        Laya.timer.clear(this, this.aniNumUp);
        Laya.timer.clear(this, this.dieTimeLoop);

        // if (this.curTweenId >= 0) Tween2DUtil.getInst().kill(this.curTweenId)
        // this.curTweenId = -1;
        this.isStart = false;
        if (this.coinShow) {
            this.coinShow.removeSelf();
            this.coinShow = undefined;
        }
        // console.log("怪物死亡获得金币：" + this.alreadyGet);
        GameDataManager.getInstance().MatchInfo.GoldNum += this.alreadyGet;
    }

    ///////////////////////////////////////////////////////////////////////////////////
    //
    private curTweenId: number;//动画id

    private dieTimeLoop(): void {
        if (!this.coinShow) return;
        this.DIE_TIME--;
        this.setTimeString(this.DIE_TIME + "");
        if (this.DIE_TIME <= 0) {
            Laya.timer.clear(this, this.dieTimeLoop);
            this.cleanUp();
            this.player.Die();//怪物死亡
        }
    }

    /**
     * 被攻击逻辑 + 金币
     */
    public getMoney(isDie: boolean) {
        // console.log("被攻击次数" + this.index++);
        this.coinShow.widthBox.visible = true;
        this.coinShow.bg_box.visible = true;
        if (!isDie) {
            //效果表现
            this.showCoin(isDie);
            //数字增加
            this.numChange(isDie);
        } else {
            this.showCoin(isDie);
            this.numChange(isDie);
            this.coinShow.ani1.play(0, false);
            this.player.goldAdd = Math.floor(3 + this.alreadyGet / 1000);
            if (this.player.goldAdd > 15) this.player.goldAdd = 15;
            Laya.timer.clear(this, this.dieTimeLoop);
        }
    }
    /**
     * 计数
     */
    private numChange(isDie): void {
        if (isDie) {
            this.alreadyGet = this.alreadyGet * 2;
        }
        else {
            let num = this.MAIN_WEAPOEN_LEVEL * this.MAIN_WEAPONE_PERCENT;
            if (num > this.coin_Max) num == this.coin_Max;
            this.alreadyGet += num;
        }
        this.arr_CoinCount.push(this.alreadyGet);
        Laya.timer.loop(20, this, this.aniNumUp);
    }

    private aniNumUp(): void {
        let num = 0 + this.arr_CoinCount[this.coinCount_Index];//数量
        num = Math.floor(num + 3 * Math.random());
        if (!this.arr_CoinCount[this.coinCount_Index + 1]) {
            Laya.timer.clear(this, this.aniNumUp);
            return;
        }
        if (num < this.arr_CoinCount[this.coinCount_Index]) this.coinShow.leb_CoinNum.text = GameDataUtil.NumberToString(num);
        else this.coinShow.leb_CoinNum.text = GameDataUtil.NumberToString(this.arr_CoinCount[++this.coinCount_Index]);
        this.countWidthBox();
    }


    /**调整位置 */
    private countWidthBox(): void {
        let string = this.coinShow.leb_CoinNum.text;
        // console.log("    ds " + string.length);
        this.coinShow.widthBox.width = 50 + this.coinShow.leb_CoinNum.text.length * 20;
        this.coinShow.widthBox.x = (this.coinShow.width - this.coinShow.widthBox.width) / 2 - 8;
        // console.log(this.coinShow.widthBox.x);
    }

    /**显示金币动画 */
    private showCoin(isDie): void {

        AudioManager.GetInstance().PlaySoundByConfigID(EnumSoundID.sound_fight_monster_gold, true);
        let num = 1 + Math.floor(2 * Math.random());//刷新多少金币
        if (isDie) num += 5;
        for (let i = 0; i < num; i++) {//循环获取金币
            let coin: Laya.Image = Laya.Pool.getItem("coin");
            if (!coin) {
                coin = new Laya.Image();
                coin.skin = "resources/moneyinfo/img_icon_coin.png";
                coin.width = 43;
                coin.height = 39;
                coin.anchorX = 0.5;
                coin.anchorY = 0.5;
            }
            this.coinShow.addChild(coin);
            coin.visible = true;
            coin.x = 130 + 50 * this.scale.x - (Math.random() * (100 * this.scale.x));
            coin.y = 300 - (Math.random() * 150);
            this.ani(coin);
        }
    }

    /**上浮消失效果 */
    private ani(coin): void {
        Laya.timer.once(400 * Math.random(), this, function () {
            this.isOK = false;
            Laya.Tween.to(coin,
                {
                    "y": coin.y - 250 + Math.random() * 50,
                    "alpha": 0,
                },
                100 + 200 * Math.random(),
                null,
                Laya.Handler.create(this, function () {
                    this.recoverCoin(coin);
                    this.isOK = true;
                })
            )
        })
    }

    /**金币动画移除*/
    private recoverCoin(coin: Laya.Image): void {
        coin.alpha = 1;
        coin.visible = false;
        Laya.Pool.recover("coin", coin);
        coin.removeSelf();
    }


    //执行
    private exe(player: Monster, param: any, onEnd: Function) {
        //分裂一个子怪物
        // if (this.splitedCount < SplitSkill.MAX_SPLIT_NUM) {
        //     for (let index = 0; index < SplitSkill.SPAWN_NUM; index++) {
        //         let spawnInfo = player.attributeComp.CopySpawnData();
        //         spawnInfo.CanTriggerPropSpawn = false;
        //         var monster: Monster = PlayerManager.GetInstance().SpawnMonster(spawnInfo.MonsterId, false, spawnInfo);
        //         let scale = SplitSkill.SIZE_HP_PERCENTAGE;//Math.pow(SplitSkill.SIZE_HP_PERCENTAGE, this.splitedCount + 1)
        //         monster.ResetSizeAndHp(scale, scale);
        //         monster.setPlayerPos(player.PlayerPos.x, player.PlayerPos.y);
        //         monster.skillComp.Stop(EnumMonsterPowerType.Split);
        //         monster.skillComp.Start(EnumMonsterPowerType.Split, this.config, this.splitedCount + 1) //设置第几次分裂
        //         monster.monsterMoveComp.monsterRandomMove();
        //         Log.Debug("分裂出怪物 %i", monster.UID)
        //     }
        // }

        // onEnd();
    }

    private reset() {
        // this.curTweenId = -1;
        this.isStart = false;
    }

    /**
     * 倒计时逻辑 - 两位数
     */
    private setTimeString(numString: string): void {
        let len = numString.length;
        if (len > 1) {
            //可视
            this.dieTimeView.numG.visible = true;
            this.dieTimeView.numS.visible = true;
            // 位置
            this.dieTimeView.numG.x = 32;
            this.dieTimeView.numS.x = 20;
            this.dieTimeView.numS.skin = "resources/battle/num" + numString.charAt(0) + ".png";
            this.dieTimeView.numG.skin = "resources/battle/num" + numString.charAt(1) + ".png";
        } else {
            //可视
            this.dieTimeView.numS.visible = false;
            this.dieTimeView.numG.visible = true;
            this.dieTimeView.numG.x = 25;
            this.dieTimeView.numG.skin = "resources/battle/num" + numString.charAt(0) + ".png";
        }
    }
}