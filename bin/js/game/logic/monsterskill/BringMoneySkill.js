/*
* 分裂
*/
var BringMoneySkill = (function () {
    function BringMoneySkill() {
        // private splitedCount = 0;//当前是第几次分裂 0,1,2,3
        /**已获得金币数 */
        this.alreadyGet = 0;
        /**第几个 */
        this.index = 0;
        /**时间计数器 */
        this.timerCount = 0;
    }
    BringMoneySkill.prototype.InitParam = function (config) {
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
    };
    BringMoneySkill.prototype.setPos = function (y) {
        this.coinShow.y = y;
    };
    /**
     *
     * @param player monster对象
     * @param param 参数
     */
    BringMoneySkill.prototype.Start = function (player) {
        var param = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            param[_i - 1] = arguments[_i];
        }
        this.player = player;
        this.isStart = true;
        if (!this.config) {
            this.config = param[0]; //获取配置
            this.InitParam(this.config); //变量赋值
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
        this.coinShow.zOrder = ZOrderDefine.HP_BAR_ZORDER; // 1000
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
    };
    BringMoneySkill.prototype.Stop = function (parent, param) {
        this.cleanUp();
    };
    BringMoneySkill.prototype.End = function (parent, onEndComplete, param) {
        this.cleanUp();
        // this.exe(parent, param, onEndComplete)
        // if (onEndComplete) onEndComplete();
    };
    BringMoneySkill.prototype.cleanUp = function () {
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
    };
    BringMoneySkill.prototype.dieTimeLoop = function () {
        if (!this.coinShow)
            return;
        this.DIE_TIME--;
        this.setTimeString(this.DIE_TIME + "");
        if (this.DIE_TIME <= 0) {
            Laya.timer.clear(this, this.dieTimeLoop);
            this.cleanUp();
            this.player.Die(); //怪物死亡
        }
    };
    /**
     * 被攻击逻辑 + 金币
     */
    BringMoneySkill.prototype.getMoney = function (isDie) {
        // console.log("被攻击次数" + this.index++);
        this.coinShow.widthBox.visible = true;
        this.coinShow.bg_box.visible = true;
        if (!isDie) {
            //效果表现
            this.showCoin(isDie);
            //数字增加
            this.numChange(isDie);
        }
        else {
            this.showCoin(isDie);
            this.numChange(isDie);
            this.coinShow.ani1.play(0, false);
            this.player.goldAdd = Math.floor(3 + this.alreadyGet / 1000);
            if (this.player.goldAdd > 15)
                this.player.goldAdd = 15;
            Laya.timer.clear(this, this.dieTimeLoop);
        }
    };
    /**
     * 计数
     */
    BringMoneySkill.prototype.numChange = function (isDie) {
        if (isDie) {
            this.alreadyGet = this.alreadyGet * 2;
        }
        else {
            var num = this.MAIN_WEAPOEN_LEVEL * this.MAIN_WEAPONE_PERCENT;
            if (num > this.coin_Max)
                num == this.coin_Max;
            this.alreadyGet += num;
        }
        this.arr_CoinCount.push(this.alreadyGet);
        Laya.timer.loop(20, this, this.aniNumUp);
    };
    BringMoneySkill.prototype.aniNumUp = function () {
        var num = 0 + this.arr_CoinCount[this.coinCount_Index]; //数量
        num = Math.floor(num + 3 * Math.random());
        if (!this.arr_CoinCount[this.coinCount_Index + 1]) {
            Laya.timer.clear(this, this.aniNumUp);
            return;
        }
        if (num < this.arr_CoinCount[this.coinCount_Index])
            this.coinShow.leb_CoinNum.text = GameDataUtil.NumberToString(num);
        else
            this.coinShow.leb_CoinNum.text = GameDataUtil.NumberToString(this.arr_CoinCount[++this.coinCount_Index]);
        this.countWidthBox();
    };
    /**调整位置 */
    BringMoneySkill.prototype.countWidthBox = function () {
        var string = this.coinShow.leb_CoinNum.text;
        // console.log("    ds " + string.length);
        this.coinShow.widthBox.width = 50 + this.coinShow.leb_CoinNum.text.length * 20;
        this.coinShow.widthBox.x = (this.coinShow.width - this.coinShow.widthBox.width) / 2 - 8;
        // console.log(this.coinShow.widthBox.x);
    };
    /**显示金币动画 */
    BringMoneySkill.prototype.showCoin = function (isDie) {
        AudioManager.GetInstance().PlaySoundByConfigID(EnumSoundID.sound_fight_monster_gold, true);
        var num = 1 + Math.floor(2 * Math.random()); //刷新多少金币
        if (isDie)
            num += 5;
        for (var i = 0; i < num; i++) {
            var coin = Laya.Pool.getItem("coin");
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
    };
    /**上浮消失效果 */
    BringMoneySkill.prototype.ani = function (coin) {
        Laya.timer.once(400 * Math.random(), this, function () {
            this.isOK = false;
            Laya.Tween.to(coin, {
                "y": coin.y - 250 + Math.random() * 50,
                "alpha": 0,
            }, 100 + 200 * Math.random(), null, Laya.Handler.create(this, function () {
                this.recoverCoin(coin);
                this.isOK = true;
            }));
        });
    };
    /**金币动画移除*/
    BringMoneySkill.prototype.recoverCoin = function (coin) {
        coin.alpha = 1;
        coin.visible = false;
        Laya.Pool.recover("coin", coin);
        coin.removeSelf();
    };
    //执行
    BringMoneySkill.prototype.exe = function (player, param, onEnd) {
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
    };
    BringMoneySkill.prototype.reset = function () {
        // this.curTweenId = -1;
        this.isStart = false;
    };
    /**
     * 倒计时逻辑 - 两位数
     */
    BringMoneySkill.prototype.setTimeString = function (numString) {
        var len = numString.length;
        if (len > 1) {
            //可视
            this.dieTimeView.numG.visible = true;
            this.dieTimeView.numS.visible = true;
            // 位置
            this.dieTimeView.numG.x = 32;
            this.dieTimeView.numS.x = 20;
            this.dieTimeView.numS.skin = "resources/battle/num" + numString.charAt(0) + ".png";
            this.dieTimeView.numG.skin = "resources/battle/num" + numString.charAt(1) + ".png";
        }
        else {
            //可视
            this.dieTimeView.numS.visible = false;
            this.dieTimeView.numG.visible = true;
            this.dieTimeView.numG.x = 25;
            this.dieTimeView.numG.skin = "resources/battle/num" + numString.charAt(0) + ".png";
        }
    };
    return BringMoneySkill;
}());
//# sourceMappingURL=BringMoneySkill.js.map