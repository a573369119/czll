/**
 * 游戏内使用的公式工具
 */
class GameDataUtil {

    /**
     * 钻石兑换金币
     * @param diamondNum 钻石数量
     */
    public static DiamondExchange_Coin(diamondNum: number): number {
        return diamondNum * GameDataManager.getInstance().Exchange_Coin;
    }

    /**
     * 钻石兑换体力
     * @param diamondNum 钻石数量
     */
    public static DiamondExchange_Power(diamondNum: number): number {
        return diamondNum * GameDataManager.getInstance().Exchange_Power
    }

    /**
     * 将数字转化为文字缩写，例如20000→“20k”
     * @param num 
     */
    public static NumberToString(num: number): string {
        //将数字修改为整数
        let int = Math.floor(num);
        //对数字求对数（10的几次幂）
        let log = Math.floor(Math.log(int) * Math.LOG10E);
        //计算当前的长度，逢3进1个计数单位，1为k，2为m，以此类推
        let a = Math.floor(log / 3);
        //获取当前对应的枚举名
        let b = EnumNumberTally[a];
        //判断是否未定义
        if (b == undefined || b == "None") {
            //未定义，没有计数单位，直接返回
            return int.toString();
        } else {
            //有计数单位
            //转换数字
            let result = GameDataUtil.ConvertNumber(parseFloat((num / Math.pow(10, a * 3)).toFixed(3)));
            return result + b;
        }
    }

    /**
     * 数字格式为aaa.bbb，整数部分和小数部分的长度均不超过3
     * 转换后，整数部分和小数部分的数字长度相加为3（算上小数点则为4），如aaa,aa.b,a.bb
     * @param num 传入的数字
     */
    private static ConvertNumber(num: number): number {
        //整数部分
        let a = Math.floor(num);
        //根据整数部分的长度，保留小数部分
        if (a < 10) {
            //1位整数，小数部分保留两位（末尾不得为0）
            return parseFloat(num.toFixed(2));
        } else if (a >= 10 && a < 100) {
            //2位整数，小数部分保留一位（末尾不得为0）
            return parseFloat(num.toFixed(1));
        } else if (a >= 100 && a < 1000) {
            //3位整数，没有小数部分
            return a;
        } else {
            //超3位，不处理，直接返回整数部分
            return a;
        }
    }

    /**
     * 传入秒数，转换成时间格式 hh:mm:ss
     * @param fullSecond 总秒数
     * @param needHour 是否需要小时格式，默认为true
     */
    public static ConvertSecondToTimeStr(fullSecond: number, needHour: boolean = true): string {
        if (needHour) {
            //时
            let hour = Math.floor(fullSecond / 3600);
            //分
            let minute = Math.floor(fullSecond / 60) - hour * 60;
            //秒
            let second = fullSecond - hour * 3600 - minute * 60;

            return (hour < 10 ? ("0" + hour) : hour) + ":" + (minute < 10 ? ("0" + minute) : minute) + ":" + (second < 10 ? ("0" + second) : second);
        } else {
            //分
            let minute = Math.floor(fullSecond / 60);
            //秒
            let second = fullSecond - minute * 60;

            return (minute < 10 ? ("0" + minute) : minute) + ":" + (second < 10 ? ("0" + second) : second);
        }
    }

    /**
     * 产能升级所需金币公式：50 + (100 + lvl * 10) * lvl
     * @param lvl 等级
     */
    public static Upgrade_Spawn(lvl: number): number {
        // return 50 + (100 + lvl * 10) * lvl;
        return FormulaUtil.CalcByConfig(EnumFormulaType.SpawnUpgradeCost, lvl)
    }

    /**
     * 主武器升级所需金币公式：50 + (100 + lvl * 10) * lvl
     * @param lvl 
     */
    public static Upgrade_Weapon_Main(lvl: number): number {
        // return 50 + (100 + lvl * 10) * lvl;
        return FormulaUtil.CalcByConfig(EnumFormulaType.MainWeaponUpgradeCost, lvl)
    }

    /**
     * 副武器升级所需金币公式：50 + (100 + lvl * 10) * lvl
     * @param lvl 
     */
    public static Upgrade_Weapon_Side(lvl: number, sideWeaponTyp: EnumSideWeaponType = EnumSideWeaponType.Missile): number {
        // return 50 + (100 + lvl * 10) * lvl;
        return FormulaUtil.CalcByConfig(EnumFormulaType.SideWeaponUpgradeCost1 + sideWeaponTyp - EnumSideWeaponType.Missile, lvl)
    }

    /**
     * 金币产能公式：1级时值为10，提升n/10，结果向下取整，n为当前产能等级，
     * @param spawnLvl 产能等级
     */
    public static Spawn_Coin_Lvl(spawnLvl: number): number {
        // if (spawnLvl <= 1) {
        //     return 10;
        // } else {
        //     return this.Spawn_Coin_Lvl(spawnLvl - 1) + spawnLvl / 10;
        // }
        return FormulaUtil.CalcByConfig(EnumFormulaType.GoldUpgrade, spawnLvl)
    }

    /**
     * 单枚金币的最大产出数量 100*n n为金币产能
     * @param spawnLvl 产能等级（不是金币产能！）
     */
    public static Spawn_Coin_Max(spawnLvl: number): number {
        return 100 * Math.floor(this.Spawn_Coin_Lvl(spawnLvl));
    }

    /**
     * 金币生产效率 每个周期生产等同于金币产能数量的金币
     * @param spawnLvl 产能等级（不是金币产能！） 
     */
    public static Spawn_Coin(spawnLvl: number): number {
        return Math.floor(this.Spawn_Coin_Lvl(spawnLvl));
    }

    /**
     * 钻石产能公式：1级时值为1，提升n/20，结果向上取整，n为当前产能等级，
     * @param spawnLvl 产能等级
     */
    public static Spawn_Diamond_Lvl(spawnLvl: number): number {
        // if (spawnLvl <= 1) {
        //     return 1;
        // } else {
        //     return this.Spawn_Diamond_Lvl(spawnLvl - 1) + spawnLvl / 20;
        // }
        return FormulaUtil.CalcByConfig(EnumFormulaType.DiamondUpgrade, spawnLvl)
    }

    /**
     * 单枚钻石的最大产出数量 n n为钻石产能
     * @param spawnLvl 产能等级（不是钻石产能！） 
     */
    public static Spawn_Diamond_Max(spawnLvl: number): number {
        return GameDataUtil.Spawn_Diamond_Lvl(spawnLvl);
    }

    /**
     * 钻石生产效率 每个周期生产n/10向上取整数量的钻石，n为钻石产能
     * @param spawnLvl 产能等级（不是钻石产能！）  
     */
    public static Spawn_Diamond(spawnLvl: number): number {
        return Math.ceil(GameDataUtil.Spawn_Diamond_Lvl(spawnLvl) / 10);
    }

    /**
     * 主武器 子弹数量公式：1级为10，每1级提升1，最大值为100，之后每超出1个等级就将现有的1发子弹伤害翻倍
     * 公式所得的数量没有上限，请在逻辑内自行处理超出100的情况
     * @param lvl 等级
     */
    public static MainWeapon_BulletNum(lvl: number): number {
        // return 10 + (lvl - 1) * 1;
        return FormulaUtil.CalcBulletNumPerSec(lvl, EnumBulletOutLookType.MainPlayerBullet, []);
    }

    /**
     * 主武器 子弹威力公式：1级时值为10，提升n/10，结果向下取整；
     * @param lvl 
     */
    public static MainWeapon_BulletPower(lvl: number): number {
        // return 10 + Math.floor((lvl - 1) / 10);
        return FormulaUtil.CalcPlayerBulletDamage(lvl, EnumBulletOutLookType.MainPlayerBullet, 0, []);
    }

    /**
     * 副武器 导弹 威力公式：n*10，1级可配置
     * @param basePower 
     * @param lvl 
     */
    public static SideWeapon_Power(basePower: number, lvl: number, sideWeaponTyp: EnumSideWeaponType = EnumSideWeaponType.Missile) {
        // return basePower + (lvl - 1) * 10;
        return FormulaUtil.GetSideWeaponDamage(sideWeaponTyp, lvl);
    }

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
    public static IsSameDate(date1: Date, date2: Date): boolean {
        return date1.getFullYear() == date2.getFullYear() && date1.getMonth() == date2.getMonth() && date1.getDate() == date2.getDate();
    }


    //根据ID，查找是否已经解锁
    public static CheckSideWeaponIDUnlocked(id: number): boolean {
        let unlocked: boolean = false;
        for (let i = 0; i < GameDataManager.getInstance().LoginPlayerInfo.AllSideWeaponList.length; i++) {
            let element = GameDataManager.getInstance().LoginPlayerInfo.AllSideWeaponList[i];
            if (element.id == id) {
                unlocked = true;
                break;
            }
        }
        return unlocked;
    }

    //根据ID，查找副武器的等级
    public static CheckSideWeaponLevel(id: number): number {
        for (let i = 0; i < GameDataManager.getInstance().LoginPlayerInfo.AllSideWeaponList.length; i++) {
            let element = GameDataManager.getInstance().LoginPlayerInfo.AllSideWeaponList[i];
            if (element.id == id) {
                return element.level;
            }
        }
        return -1;
    }
}