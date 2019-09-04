/**
 * 游戏内使用的公式工具
 */
var GameDataUtil = (function () {
    function GameDataUtil() {
    }
    /**
     * 钻石兑换金币
     * @param diamondNum 钻石数量
     */
    GameDataUtil.DiamondExchange_Coin = function (diamondNum) {
        return diamondNum * GameDataManager.getInstance().Exchange_Coin;
    };
    /**
     * 钻石兑换体力
     * @param diamondNum 钻石数量
     */
    GameDataUtil.DiamondExchange_Power = function (diamondNum) {
        return diamondNum * GameDataManager.getInstance().Exchange_Power;
    };
    /**
     * 将数字转化为文字缩写，例如20000→“20k”
     * @param num
     */
    GameDataUtil.NumberToString = function (num) {
        //将数字修改为整数
        var int = Math.floor(num);
        //对数字求对数（10的几次幂）
        var log = Math.floor(Math.log(int) * Math.LOG10E);
        //计算当前的长度，逢3进1个计数单位，1为k，2为m，以此类推
        var a = Math.floor(log / 3);
        //获取当前对应的枚举名
        var b = EnumNumberTally[a];
        //判断是否未定义
        if (b == undefined || b == "None") {
            //未定义，没有计数单位，直接返回
            return int.toString();
        }
        else {
            //有计数单位
            //转换数字
            var result = GameDataUtil.ConvertNumber(parseFloat((num / Math.pow(10, a * 3)).toFixed(3)));
            return result + b;
        }
    };
    /**
     * 数字格式为aaa.bbb，整数部分和小数部分的长度均不超过3
     * 转换后，整数部分和小数部分的数字长度相加为3（算上小数点则为4），如aaa,aa.b,a.bb
     * @param num 传入的数字
     */
    GameDataUtil.ConvertNumber = function (num) {
        //整数部分
        var a = Math.floor(num);
        //根据整数部分的长度，保留小数部分
        if (a < 10) {
            //1位整数，小数部分保留两位（末尾不得为0）
            return parseFloat(num.toFixed(2));
        }
        else if (a >= 10 && a < 100) {
            //2位整数，小数部分保留一位（末尾不得为0）
            return parseFloat(num.toFixed(1));
        }
        else if (a >= 100 && a < 1000) {
            //3位整数，没有小数部分
            return a;
        }
        else {
            //超3位，不处理，直接返回整数部分
            return a;
        }
    };
    /**
     * 传入秒数，转换成时间格式 hh:mm:ss
     * @param fullSecond 总秒数
     * @param needHour 是否需要小时格式，默认为true
     */
    GameDataUtil.ConvertSecondToTimeStr = function (fullSecond, needHour) {
        if (needHour === void 0) { needHour = true; }
        if (needHour) {
            //时
            var hour = Math.floor(fullSecond / 3600);
            //分
            var minute = Math.floor(fullSecond / 60) - hour * 60;
            //秒
            var second = fullSecond - hour * 3600 - minute * 60;
            return (hour < 10 ? ("0" + hour) : hour) + ":" + (minute < 10 ? ("0" + minute) : minute) + ":" + (second < 10 ? ("0" + second) : second);
        }
        else {
            //分
            var minute = Math.floor(fullSecond / 60);
            //秒
            var second = fullSecond - minute * 60;
            return (minute < 10 ? ("0" + minute) : minute) + ":" + (second < 10 ? ("0" + second) : second);
        }
    };
    /**
     * 产能升级所需金币公式：50 + (100 + lvl * 10) * lvl
     * @param lvl 等级
     */
    GameDataUtil.Upgrade_Spawn = function (lvl) {
        // return 50 + (100 + lvl * 10) * lvl;
        return FormulaUtil.CalcByConfig(EnumFormulaType.SpawnUpgradeCost, lvl);
    };
    /**
     * 主武器升级所需金币公式：50 + (100 + lvl * 10) * lvl
     * @param lvl
     */
    GameDataUtil.Upgrade_Weapon_Main = function (lvl) {
        // return 50 + (100 + lvl * 10) * lvl;
        return FormulaUtil.CalcByConfig(EnumFormulaType.MainWeaponUpgradeCost, lvl);
    };
    /**
     * 副武器升级所需金币公式：50 + (100 + lvl * 10) * lvl
     * @param lvl
     */
    GameDataUtil.Upgrade_Weapon_Side = function (lvl, sideWeaponTyp) {
        if (sideWeaponTyp === void 0) { sideWeaponTyp = EnumSideWeaponType.Missile; }
        // return 50 + (100 + lvl * 10) * lvl;
        return FormulaUtil.CalcByConfig(EnumFormulaType.SideWeaponUpgradeCost1 + sideWeaponTyp - EnumSideWeaponType.Missile, lvl);
    };
    /**
     * 金币产能公式：1级时值为10，提升n/10，结果向下取整，n为当前产能等级，
     * @param spawnLvl 产能等级
     */
    GameDataUtil.Spawn_Coin_Lvl = function (spawnLvl) {
        // if (spawnLvl <= 1) {
        //     return 10;
        // } else {
        //     return this.Spawn_Coin_Lvl(spawnLvl - 1) + spawnLvl / 10;
        // }
        return FormulaUtil.CalcByConfig(EnumFormulaType.GoldUpgrade, spawnLvl);
    };
    /**
     * 单枚金币的最大产出数量 100*n n为金币产能
     * @param spawnLvl 产能等级（不是金币产能！）
     */
    GameDataUtil.Spawn_Coin_Max = function (spawnLvl) {
        return 100 * Math.floor(this.Spawn_Coin_Lvl(spawnLvl));
    };
    /**
     * 金币生产效率 每个周期生产等同于金币产能数量的金币
     * @param spawnLvl 产能等级（不是金币产能！）
     */
    GameDataUtil.Spawn_Coin = function (spawnLvl) {
        return Math.floor(this.Spawn_Coin_Lvl(spawnLvl));
    };
    /**
     * 钻石产能公式：1级时值为1，提升n/20，结果向上取整，n为当前产能等级，
     * @param spawnLvl 产能等级
     */
    GameDataUtil.Spawn_Diamond_Lvl = function (spawnLvl) {
        // if (spawnLvl <= 1) {
        //     return 1;
        // } else {
        //     return this.Spawn_Diamond_Lvl(spawnLvl - 1) + spawnLvl / 20;
        // }
        return FormulaUtil.CalcByConfig(EnumFormulaType.DiamondUpgrade, spawnLvl);
    };
    /**
     * 单枚钻石的最大产出数量 n n为钻石产能
     * @param spawnLvl 产能等级（不是钻石产能！）
     */
    GameDataUtil.Spawn_Diamond_Max = function (spawnLvl) {
        return GameDataUtil.Spawn_Diamond_Lvl(spawnLvl);
    };
    /**
     * 钻石生产效率 每个周期生产n/10向上取整数量的钻石，n为钻石产能
     * @param spawnLvl 产能等级（不是钻石产能！）
     */
    GameDataUtil.Spawn_Diamond = function (spawnLvl) {
        return Math.ceil(GameDataUtil.Spawn_Diamond_Lvl(spawnLvl) / 10);
    };
    /**
     * 主武器 子弹数量公式：1级为10，每1级提升1，最大值为100，之后每超出1个等级就将现有的1发子弹伤害翻倍
     * 公式所得的数量没有上限，请在逻辑内自行处理超出100的情况
     * @param lvl 等级
     */
    GameDataUtil.MainWeapon_BulletNum = function (lvl) {
        // return 10 + (lvl - 1) * 1;
        return FormulaUtil.CalcBulletNumPerSec(lvl, EnumBulletOutLookType.MainPlayerBullet, []);
    };
    /**
     * 主武器 子弹威力公式：1级时值为10，提升n/10，结果向下取整；
     * @param lvl
     */
    GameDataUtil.MainWeapon_BulletPower = function (lvl) {
        // return 10 + Math.floor((lvl - 1) / 10);
        return FormulaUtil.CalcPlayerBulletDamage(lvl, EnumBulletOutLookType.MainPlayerBullet, 0, []);
    };
    /**
     * 副武器 导弹 威力公式：n*10，1级可配置
     * @param basePower
     * @param lvl
     */
    GameDataUtil.SideWeapon_Power = function (basePower, lvl, sideWeaponTyp) {
        if (sideWeaponTyp === void 0) { sideWeaponTyp = EnumSideWeaponType.Missile; }
        // return basePower + (lvl - 1) * 10;
        return FormulaUtil.GetSideWeaponDamage(sideWeaponTyp, lvl);
    };
    // /**
    //  * 副武器 导弹 强度公式：n*10，1级500（可配置）
    //  * @param lvl 
    //  */
    // public static SideWeapon_Intensity(lvl: number) {
    //     return 500 + (lvl - 1) * 10;
    // }
    /**
     * 比较两个日期是否为同一天
     * 注意：只精确到天
     */
    GameDataUtil.IsSameDate = function (date1, date2) {
        return date1.getFullYear() == date2.getFullYear() && date1.getMonth() == date2.getMonth() && date1.getDate() == date2.getDate();
    };
    //根据ID，查找是否已经解锁
    GameDataUtil.CheckSideWeaponIDUnlocked = function (id) {
        var unlocked = false;
        for (var i = 0; i < GameDataManager.getInstance().LoginPlayerInfo.AllSideWeaponList.length; i++) {
            var element = GameDataManager.getInstance().LoginPlayerInfo.AllSideWeaponList[i];
            if (element.id == id) {
                unlocked = true;
                break;
            }
        }
        return unlocked;
    };
    //根据ID，查找副武器的等级
    GameDataUtil.CheckSideWeaponLevel = function (id) {
        for (var i = 0; i < GameDataManager.getInstance().LoginPlayerInfo.AllSideWeaponList.length; i++) {
            var element = GameDataManager.getInstance().LoginPlayerInfo.AllSideWeaponList[i];
            if (element.id == id) {
                return element.level;
            }
        }
        return -1;
    };
    return GameDataUtil;
}());
//# sourceMappingURL=GameDataUtil.js.map