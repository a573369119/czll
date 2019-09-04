/*
* 游戏中用到的计算公式
*/
class FormulaUtil {

    //计算玩家子弹每秒数量
    public static CalcBulletNumPerSec(mainWeaponLvl: number, bulletConfigID: EnumBulletOutLookType, buffs: EnumBuffType[]) {

        switch (bulletConfigID) {
            case EnumBulletOutLookType.MonsterBullet:
                {
                    let config = ConfigManager.GetInstance().GetBulletConfig(bulletConfigID);
                    Log.Error("怪物子弹的发射公式还没有, 固定用%i个子弹每秒", config.MaxBulletRow)
                    return config.MaxBulletRow;//怪物的发射规则
                }
            default: {
                // let config = ConfigManager.GetInstance().GetBulletConfig(bulletConfigID);
                // let MAX_NUM = config.MaxBulletNum;////子弹最大数量
                let evolvLvl = GameDataManager.getInstance().LoginPlayerInfo.MainWeaponInfo.evolveLevel;
                if (buffs.indexOf(EnumBuffType.FireSpeedIntensified) >= 0) {
                    evolvLvl = ConfigManager.GetInstance().GetMaxMainWeaponEvolutionLevel();  //加速buff 返回最大值
                }
                return ConfigManager.GetInstance().GetMainWeaponEvolutionConfig(evolvLvl).BulletNumber;
            }
        }

    }

    /**
     * 计算玩家子弹威力
     * @param mainWeaponLvl 武器等级
     * @param bulletConfigID 子弹类型
     * @param indexInSec 发射的子弹是每秒中的第几个
     */
    public static CalcPlayerBulletDamage(mainWeaponLvl: number, bulletConfigID: EnumBulletOutLookType, indexInSec: number, buffs: EnumBuffType[]) {
        let config = ConfigManager.GetInstance().GetBulletConfig(bulletConfigID);
        let BASE_DAMAGE = config.BaseBulletDamage;//1级伤害

        //1. 每秒子弹数量超过最大值, 增加对应子弹的威力
        let powerPlus = 1;
        let bulletInSec = this.calcBulletNum(mainWeaponLvl, config)
        let offset = bulletInSec - config.MaxBulletNum
        if (offset > 0 && indexInSec < offset) {
            powerPlus = 2
        }

        if (buffs.indexOf(EnumBuffType.PowerIntensified) >= 0) {
            //2. 火力buff
            let powerConfig = bulletConfigID == EnumBulletOutLookType.MainPlayerBullet_PowerBuff ? config : ConfigManager.GetInstance().GetBulletConfig(EnumBulletOutLookType.MainPlayerBullet_PowerBuff);
            powerPlus *= powerConfig.DamageMultFactor;
        }

        // return (BASE_DAMAGE + (mainWeaponLvl - 1) / 10) * powerPlus;
        return this.CalcByConfig(EnumFormulaType.MainWeaponBulletPower, BASE_DAMAGE, mainWeaponLvl) * powerPlus;
    }


    private static calcBulletNum(bulletLvl: number, config: BulletConfigConfigData) {
        let BASE_NUM = config.BaseBulletNum;//1级时候子弹数量
        return BASE_NUM + (bulletLvl - 1);
    }

    //计算怪物的实际血量
    public static CalcMonsterHp(baseHp: number, monsterLvl: number, formulaId: number): number {
        // return baseHp + 100 * (monsterLvl - 1)
        return this.CalcByConfig(EnumFormulaType.MonsterBlood, baseHp, monsterLvl, formulaId)//
    }

    //计算怪物的实际实际大小
    public static CalcMonsterScale(monsterLvl: number, levelConfig: LevelConfigConfigData, curLevelId: number): number {
        //let scale = levelConfig.MinScale + Math.random() * (levelConfig.MaxScale - levelConfig.MinScale);//  + Math.max(1, Math.random() * ConstDefine.ENLARGE_BUFF_SCALE);
        let scale = this.CalcByConfig(EnumFormulaType.MonsterScale, monsterLvl - curLevelId)
        return scale;//Math.min(ConstDefine.ENLARGE_BUFF_SCALE, scale)
    }

    //计算副武器参数
    public static CalcSideWeaponParams(sideWeapon: EnumSideWeaponType, curWeponLvl: number, config: WeaponConfigConfigData): number[] {
        let retArray = [];
        curWeponLvl = curWeponLvl < 1 ? 1 : curWeponLvl;
        switch (sideWeapon) {
            case EnumSideWeaponType.Missile:
                {
                    //导弹
                    //强度: =>爆炸范围&发射CD 
                    //      CD: max(2, 5 - (n - 1)/20)  秒发射一个
                    //      范围: min(1080, 50 + n - 1) 像素
                    //威力: => 伤害x 
                    //           x = 500 + (n-1)*10
                    //     
                    let MIN_CD = config.Param2;// 2;
                    let LVL1_CD = config.Param1;// 5;
                    let cd = Math.max(MIN_CD, LVL1_CD - (curWeponLvl - 1) / 20);            //储能时间

                    let MAX_BOMB_RANGE = config.Param4;// Number.MAX_VALUE;                                    //光柱范围
                    let LVL1_BOMB_RANGE = config.Param3;//50;
                    let range = Math.min(MAX_BOMB_RANGE, LVL1_BOMB_RANGE + (curWeponLvl - 1));

                    let damage = this.GetSideWeaponDamage(sideWeapon, curWeponLvl);         //每次伤害

                    retArray.push(cd);
                    retArray.push(range);
                    retArray.push(damage);
                    break;
                }
            case EnumSideWeaponType.Laser:
                {
                    //激光
                    //强度: =>储能速度, 光柱范围, 持续时间
                    //威力: => 伤害x 
                    //           x = 500 + (n-1)*10
                    //   
                    let MIN_CD = config.Param2;
                    let LVL1_CD = config.Param1;
                    let cd = Math.max(MIN_CD, LVL1_CD - (curWeponLvl - 1) / 10);            //储能时间

                    let MAX_DIAMETER = config.Param4;//Number.MAX_VALUE;                                    //光柱范围
                    let LVL1_DIAMETER = config.Param3;//5;
                    let diameter = Math.min(MAX_DIAMETER, LVL1_DIAMETER + (curWeponLvl - 1));

                    let MAX_DURATION = config.MaxDuration;                                       //最大持续5s
                    let LVL1_DURATION = config.MinDuration;
                    let duration = Math.min(MAX_DURATION, LVL1_DURATION + (curWeponLvl - 1) / 10); //持续时间

                    let damage = this.GetSideWeaponDamage(sideWeapon, curWeponLvl);         //每次伤害

                    retArray.push(cd);
                    retArray.push(diameter);
                    retArray.push(duration);
                    retArray.push(damage);
                    break;
                }
            case EnumSideWeaponType.Guard:
                {
                    //钢铁守卫
                    //强度: =>护盾范围, 生成周期
                    //      
                    //      
                    //威力: => 伤害x 
                    //         
                    let MIN_CD = config.Param2;
                    let LVL1_CD = config.Param1;
                    let cd = Math.max(MIN_CD, LVL1_CD - (curWeponLvl - 1) / 10);            //储能时间

                    let MAX_RANGE = config.Param4;// 300;                                    //护盾范围
                    let LVL1_RANGE = config.Param3;// PlayerManager.GetInstance().MainPlayer.ViewSize.x; //机身宽
                    let range = Math.min(MAX_RANGE, LVL1_RANGE + curWeponLvl * 2);

                    let MAX_DURATION = config.MaxDuration;                                       //最大持续5s
                    let duration = MAX_DURATION;//Math.min(MAX_DURATION, LVL1_DURATION + (curWeponLvl - 1) / 10); //持续时间

                    let damage = this.GetSideWeaponDamage(sideWeapon, curWeponLvl);         //每次伤害

                    retArray.push(cd);
                    retArray.push(range);
                    retArray.push(duration);
                    retArray.push(damage);
                    break;
                }
            case EnumSideWeaponType.MagnetDisturb:
                {
                    //电磁干扰
                    //强度: =>发射频率,弹射次数
                    //      
                    //      
                    //威力: => 伤害x 
                    //         
                    let MIN_CD = config.Param2;
                    let LVL1_CD = config.Param1;
                    let cd = Math.max(MIN_CD, LVL1_CD - (curWeponLvl - 1) / 10);            //发射频率

                    let MAX_BOUNCE_NUM = config.Param4;//100;                                    //弹射次数
                    let LVL1_BOUNCE_NUM = config.Param3;//3;
                    let bounceNum = Math.min(MAX_BOUNCE_NUM, LVL1_BOUNCE_NUM + (curWeponLvl - 1) * 2);

                    let damage = this.GetSideWeaponDamage(sideWeapon, curWeponLvl);         //每次伤害

                    retArray.push(cd);
                    retArray.push(bounceNum);
                    retArray.push(damage);
                    break;
                }
            case EnumSideWeaponType.ChildPlane:
                {
                    //技能和武器属性关系
                    //强度: =>发射频率&飞机持续时间  
                    //威力: => 伤害x 
                    let MIN_CD = config.Param2;
                    let LVL1_CD = config.Param1;
                    let cd = Math.max(MIN_CD, LVL1_CD - (curWeponLvl - 1) / 10);            //频率

                    let MAX_DURATION = config.MaxDuration//10; //最大持续10s
                    let LVL1_DURATION = config.MinDuration//5;
                    let duration = Math.min(MAX_DURATION, LVL1_DURATION + (curWeponLvl - 1) / 10); //持续时间

                    let damage = this.GetSideWeaponDamage(sideWeapon, curWeponLvl);         //每次伤害

                    retArray.push(cd);
                    retArray.push(duration);
                    retArray.push(damage);
                    break;
                }
            case EnumSideWeaponType.ElectricNet:
                {
                    //技能和武器属性关系
                    //强度: =>发射频率&电网宽  
                    //      频率: max(5, 10 - (n - 1)/10)  秒发射一个
                    //      宽度: min(500, 100  + 2*(n-1)) 像素
                    //威力: => 每n秒伤害x 
                    //          n = 1; x = 1000 + (n-1)*10
                    //    
                    let MIN_CD = config.Param2;
                    let LVL1_CD = config.Param1;
                    let cd = Math.max(MIN_CD, LVL1_CD - (curWeponLvl - 1) / 10);            //频率

                    let MAX_SIZE = config.Param4;//500;
                    let LVL1_SIZE = config.Param3;//100;
                    let size = Math.min(MAX_SIZE, LVL1_SIZE + 2 * (curWeponLvl - 1));       //宽度

                    let attackInterval = config.Param5;// 1;                                                 //每1s伤害一次
                    let damage = this.GetSideWeaponDamage(sideWeapon, curWeponLvl);         //每次伤害

                    let duration = config.MaxDuration;//持续时间 5

                    retArray.push(cd);
                    retArray.push(size);
                    retArray.push(attackInterval);
                    retArray.push(damage);
                    retArray.push(duration)
                    break;
                }

            default:
                {
                    Log.Error("没有副武器%s对应等级%i的参数配置", sideWeapon, curWeponLvl);
                    break;
                }

        }

        return retArray;


    }

    //计算击杀怪物获取的金币
    public static CalcMonsterReward(monsterLevel: number): number {
        return this.CalcByConfig(EnumFormulaType.MonsterGold, monsterLevel)
    }

    //副武器威力计算
    public static GetSideWeaponDamage(sideWeapon: EnumSideWeaponType, curWeponLvl: number) {
        //基础值
        let baseValue = ConfigManager.GetInstance().GetWeaponConfig(sideWeapon).weaponPower;
        return this.CalcByConfig(EnumFormulaType.SideWeaponBulletPower1 + sideWeapon - EnumSideWeaponType.Missile, baseValue, curWeponLvl);
    }


    public static CalcByConfig(formulaType: EnumFormulaType, ...param: any[]): number {
        let config = ConfigManager.GetInstance().GetFormulaConfig(formulaType)
        switch (formulaType) {
            case EnumFormulaType.MonsterBlood:
                {
                    //怪物血量公式: baseHp + 100 * (monsterLvl - 1)
                    let hpFormulaId = param[2];//血量公式id
                    if (hpFormulaId) {
                        config = ConfigManager.GetInstance().GetFormulaConfig(hpFormulaId)
                    }
                    return param[0] * config.Param1 + config.Param2 * (param[1] * config.Param3 - config.Param4)
                }
            case EnumFormulaType.MonsterGold:
                {
                    //怪物金币掉落
                    let goldNum = config.Param1 + param[0] * config.Param2 * config.Param3;
                    if (config.Param4 > 0) {
                        goldNum = Math.min(goldNum, config.Param4);
                    }
                    return goldNum;
                }
            case EnumFormulaType.DiamondUpgrade:
                {
                    //钻石产能 钻石产能升级提升 LV/20 向上取整
                    //2019-6-17 14:07:35 改为每等级提升 LV/20 + 1，向下取整
                    let lvl = param[0]
                    if (lvl <= 1) {
                        return config.Param4;
                    } else {
                        return this.CalcByConfig(formulaType, lvl - 1) + Math.floor(lvl * config.Param1 / config.Param2) + config.Param3;
                    }
                }

            case EnumFormulaType.GoldUpgrade:
                {
                    //金币产能 金币产能升级提升 LV/10 向下取整
                    //2019-6-17 14:25:46 改为每等级提升 LV/10 + 10，向下取整
                    let lvl = param[0]
                    // if (lvl <= 1) {
                    //     return config.Param4;
                    // } else {
                    //     return this.CalcByConfig(formulaType, lvl - 1) + Math.floor(lvl * config.Param1 / config.Param2) + config.Param3;
                    // }
                    //金币增长速度 = X + n*(Y-1) {其中X,Y可配置}
                    let config = ConfigManager.GetInstance().GetGoldUpgradeConfig();
                    return config.BaseSpeed + config.IncreSpeed * (lvl - 1);
                }
            case EnumFormulaType.SpawnUpgradeCost:
                {
                    let level = param[0]
                    return config.Param1 + (config.Param2 + level * config.Param3 * config.Param4) * level * config.Param5
                }
            case EnumFormulaType.MainWeaponUpgradeCost:
                {
                    let level = param[0]
                    return config.Param1 + (config.Param2 + level * config.Param3 * config.Param4) * level * config.Param5
                }
            case EnumFormulaType.MainWeaponBulletPower:
                {
                    //  return BASE_DAMAGE + (bulletLvl - 1) / 10
                    return param[0] * config.Param1 + Math.ceil(param[1] * config.Param2 / config.Param3)
                }
            case EnumFormulaType.MonsterTotalLevel:
            case EnumFormulaType.MonsterTotalLevel2:
            case EnumFormulaType.MonsterTotalLevel3:
            case EnumFormulaType.MonsterTotalLevel4:
            case EnumFormulaType.MonsterTotalLevel5:
            case EnumFormulaType.MonsterTotalLevel6:
                {
                    //怪物总等级公式
                    let curLevelId = param[0];
                    return config.Param1 + (config.Param2 + curLevelId * config.Param3) * curLevelId * config.Param4
                }
            case EnumFormulaType.SideWeaponBulletPower1:
            case EnumFormulaType.SideWeaponBulletPower2:
            case EnumFormulaType.SideWeaponBulletPower3:
            case EnumFormulaType.SideWeaponBulletPower4:
            case EnumFormulaType.SideWeaponBulletPower5:
            case EnumFormulaType.SideWeaponBulletPower6:
                {
                    //副武器威力 m+LV*n*(LV+p)/2  weaponConfigPower*param1 +LV*param2*Param3*(LV*Param4+Param5)/Param6
                    let base = param[0]
                    let lvl = param[1];
                    //return base * config.Param1 + lvl * config.Param2 * config.Param3 * (lvl * config.Param4 + config.Param5) / config.Param6
                    return base * config.Param1 + config.Param2 * (lvl - 1)
                }
            case EnumFormulaType.SideWeaponUpgradeCost1:
            case EnumFormulaType.SideWeaponUpgradeCost2:
            case EnumFormulaType.SideWeaponUpgradeCost3:
            case EnumFormulaType.SideWeaponUpgradeCost4:
            case EnumFormulaType.SideWeaponUpgradeCost5:
            case EnumFormulaType.SideWeaponUpgradeCost6:
                {
                    let level = param[0]
                    return config.Param1 + (config.Param2 + level * config.Param3 * config.Param4) * level * config.Param5
                }
            case EnumFormulaType.MonsterScale:
                {
                    let baseScale = 1;//param[0];
                    let n = param[0];
                    return config.Param1 * baseScale * (config.Param2 + n * config.Param3);
                }
        }
    }
}

class LevelFormula {
    //关卡怪物总等级计算公式
    public static CalcTotalMonsterLvl(formulaId: EnumFormulaType, curLevelId: number) {

        return FormulaUtil.CalcByConfig(formulaId, curLevelId);

        // switch (formulaId) {
        //     case 1:
        //         return 20 + (5 + curLevelId) * curLevelId
        //     default: {
        //         Log.Error("当前等级计算公式id不存在 %s", formulaId)
        //         return 20 + (5 + curLevelId) * curLevelId
        //     }
        // }
    }
}