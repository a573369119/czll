/*
* name;
*/
class BulletComponent2D extends ComponentBase2D {
    private bulletType: EnumBulletOutLookType; //子弹类型
    protected bulletConfig: BulletConfigConfigData;//子弹配置
    private weaponLvel: number;//子弹所属武器的等级
    public timer: number = -1;
    private canFire: boolean = false;
    public set EnableFire(value: boolean) { this.canFire = value }
    private through: boolean = false;//能否穿透
    public set EnableThrough(value: boolean) { this.through = value }
    private containBuffs: EnumBuffType[];//收到的buff

    private curBulletSoundType: EnumBulletOutLookType;  //正在播放的子弹音频类型   不和逻辑子弹类型共用，避免出现问题

    constructor(type: EnumBulletOutLookType) {
        super();
        this.bulletType = type;
    }

    public onAdd(): void {
        //初始化子弹管理类
        // BulletManager.GetInstance().initManager();

        //音频播放相关
        this.curBulletSoundType = EnumBulletOutLookType.None;
    }

    public onReomove(): void {
        this.OnExitMatch()

        //音频播放相关
        this.curBulletSoundType = EnumBulletOutLookType.None;
    }

    public OnEnterMatch(weaponLevel: number) {
        super.OnEnterMatch();
        this.weaponLvel = weaponLevel;
        this.timer = TimeManager.getInst().addUpdater(cbhandler.gen_handler(this.update, this)); //开始比赛后再update
        this.InitBeforeFire();//比赛初始化
    }

    public OnExitMatch() {
        if (this.timer >= 0) TimeManager.getInst().remove(this.timer);
        this.timer = -1
    }

    ////////////////////////////////////////////////////////////////////////////
    //比赛发射逻辑
    private fireRule: FireRule;//当前子弹发射规则
    private fireTimeCount: number;//发射时间计时
    private bulletXPosForMinColumn: number[];//小列子弹的x相对坐标[3,3,3,2,2,2,2,2] 中的2
    private bulletXPosForMaxColumn: number[];//最大列子弹的x相对坐标[3,3,3,2,2,2,2,2] 中的3
    private curFiringRowIndex: number;//当前发射的是1s中第几行子弹
    /**
     * 比赛初始化
     */
    public InitBeforeFire() {
        this.fireTimeCount = 0;
        this.curFiringRowIndex = -1;
        this.InitBulletType(this.bulletType, [])
    }

    /**
     * 设置对应子弹类型的发射规则
     * @param newBulletType 
     */
    public ChangeBulletType(newBulletType: EnumBulletOutLookType, buffs: EnumBuffType[]) {
        // if (this.bulletType == newBulletType) return;
        this.InitBulletType(newBulletType, buffs);
    }

    private InitBulletType(newBulletType: EnumBulletOutLookType, buffs: EnumBuffType[]) {
        Log.Info("新子弹形态%s", EnumBulletOutLookType[newBulletType])
        this.bulletType = newBulletType;   //子弹累心
        this.bulletConfig = ConfigManager.GetInstance().GetBulletConfig(newBulletType);//子弹配置
        this.containBuffs = buffs ? buffs : [];//子弹fontain
        this.fireRule = this.calcPlayerFireRule();//
        this.bulletXPosForMaxColumn = this.calBulletRelativeXPos(this.fireRule.MaxColumnCount, this.GetBulletInterval())
        if (this.fireRule.MaxColumnCount != this.fireRule.MinColumnCount) this.bulletXPosForMinColumn = this.calBulletRelativeXPos(this.fireRule.MinColumnCount, this.GetBulletInterval())
        else this.bulletXPosForMinColumn = this.bulletXPosForMaxColumn;
    }

    private update(dt: number): void {
        //音效改为循环播放
        if (this.canFire) {
            //播放声音
            // //防止重复播放
            // if (this.bulletType != this.curBulletSoundType) {
            //     //停止旧声音
            //     if (this.curBulletSoundType != EnumBulletOutLookType.None) {
            //         this.stopSound(this.curBulletSoundType);
            //     }
            //     //播放新声音
            //     this.curBulletSoundType = this.bulletType;
            //     this.playSound(this.curBulletSoundType)
            // }
        } else {
            // //停止声音
            // if (this.curBulletSoundType != EnumBulletOutLookType.None) {
            //     this.stopSound(this.curBulletSoundType);
            //     this.curBulletSoundType = EnumBulletOutLookType.None;
            // }
            return;
        }

        // if (!this.canFire) {
        //     return;
        // }

        this.fireTimeCount += dt;
        //检测当前fireTimeCount 是否>n, 满足条件后 发射对应行的子弹; 
        //记录当前发射的第几行RowIndex;
        let targetInterval = this.fireRule.Interval;
        if (this.fireTimeCount >= targetInterval) {
            let n = Math.floor(this.fireTimeCount / targetInterval);
            this.curFiringRowIndex += n;//更新n行
            if (this.curFiringRowIndex >= this.fireRule.BulletNumsInRows.length) {
                this.curFiringRowIndex = this.curFiringRowIndex % this.fireRule.BulletNumsInRows.length;
            }
            this.fireTimeCount -= n * this.fireRule.Interval;
            //发射columsCount列子弹, 当前是偶数列?奇数列?按照对应位置排列
            let columsCount = this.fireRule.BulletNumsInRows[this.curFiringRowIndex];
            this.fire(columsCount, columsCount == this.fireRule.MaxColumnCount ? this.bulletXPosForMaxColumn : this.bulletXPosForMinColumn)
        }
    }

    //子类重载 不同武器重载
    protected fire(columsCount: number, xOffsetMaxColumns: number[]) {
        //计算当前要发射的子弹, 是每秒中的第几个
        let indexInSec = this.getIndexInSec(this.curFiringRowIndex, this.fireRule);
        for (var index = 0; index < columsCount; index++) {
            let bullet = BulletManager.GetInstance().Spawn(this.bulletType);

            let pos = CommonUtil2D.GetPosUnderTargetObj(this.player.comParent, bullet.comParent.parent as Laya.Sprite)//子母舰的节点不在同一个层级
            bullet.setBulletPos(pos.x, pos.y - 20);//起点位置
            bullet.bulletMoveCom.lastPosX = pos.x + xOffsetMaxColumns[index];

            bullet.bulletMoveCom.offSetX = xOffsetMaxColumns[index];//this.posXListLev[this.baseLev - 1 + offset][index];
            bullet.bulletMoveCom.MoveDir = new Vec2(1, -1)
            bullet.bulletMoveCom.SpeedY = this.bulletConfig.MoveSpeed;
            bullet.DamageValue = FormulaUtil.CalcPlayerBulletDamage(this.weaponLvel, this.bulletType, indexInSec, this.containBuffs)
            bullet.Through = this.through;
            //设置子弹移动速度& 子弹威力
        }
        //旧播放音频方案
        //2019-6-14 15:08:51 子弹发射不再播放音效
        // this.playSound(this.bulletType)
    }

    //子类重载 子弹之间的间隔 = 子弹图片大小 + 1
    protected GetBulletInterval(): number {
        let config = ConfigManager.GetInstance().GetBulletConfig(this.bulletType);
        return config.ColliderSize[0];//this.player.ViewSize.x + 1;
    }

    //子类重载  角色/怪物/子舰/支援飞船子弹发射规则 子类重载
    protected calcPlayerFireRule(): FireRule {
        // let weaponLvl = GameDataManager.getInstance().LoginPlayerInfo.MainWeaponInfo.level;
        return this.calcFireRule(this.weaponLvel, this.bulletType, this.containBuffs);
    }

    private calcFireRule(weaponLvl: number, bulletType: EnumBulletOutLookType, buffs: EnumBuffType[]): FireRule {
        let config = ConfigManager.GetInstance().GetBulletConfig(bulletType);
        let bulletCountPerSec = ConstDefine.TEST_EFFICIENCY ? ConstDefine.BULLET_PER_SEC : FormulaUtil.CalcBulletNumPerSec(weaponLvl, bulletType, buffs);

        let bulletRows = Math.min(bulletCountPerSec, config.MaxBulletRow) //每秒发送几行子弹
        let rowInterval = 1 / bulletRows; //每行发射的时间间隔 n = 1/rows 
        let bulletColumNum = Math.ceil(bulletCountPerSec / bulletRows);//每秒发送几列子弹
        let lastColumnOverFlowNum = bulletCountPerSec % bulletRows;//最后一列是否未满

        let isLasColumnFull = lastColumnOverFlowNum == 0;//最后列满
        let bulletNumInRows = [];//每行的子弹数量, 从底当上 bulletRowInSecond = [3,3,3,2,2,2,2,2] 每行多少子弹
        for (let index = 0; index < bulletRows; index++) {
            let num = bulletColumNum;
            if (!isLasColumnFull && index >= lastColumnOverFlowNum) num -= 1;
            bulletNumInRows.push(num) //记录每行子弹数量
        }
        return new FireRule(bulletNumInRows, rowInterval, bulletCountPerSec);
    }

    /**
     * 计算maxColumnNum列子弹每个子弹的相对位置
     * @param maxColumnNum 
     *  @param interval 每个子弹之间间隔
     * 返回number[]:[-10,0,10]
     */
    protected calBulletRelativeXPos(maxColumnNum: number, interval: number): number[] {
        let posArray = new Array(maxColumnNum);
        //偶数, 左右排列 //奇数, 从0开始, 每个左右依次排列
        let even = maxColumnNum % 2 == 0;//偶数
        let num = maxColumnNum / 2; //左右各自列数
        if (!even) {
            num = Math.floor(num)
            posArray[num] = 0;//1. 中心位置
        }
        for (let index = 1; index <= num; index++) {
            let leftIndexInArray = num - index;
            let rightIndexInArray = num + index + (even ? -1 : 0);
            posArray[rightIndexInArray] = even ? (index - 0.5) * interval : (index * interval)//3. 右
            posArray[leftIndexInArray] = -1 * posArray[rightIndexInArray]//2. 左 
        }
        // if (!even) {
        //     //奇数, 从0开始, 每个左右依次排列
        //     let num = Math.floor(maxColumnNum / 2);
        //     let centerIndex = num;//中心位置在array上的索引位置
        //     posArray[centerIndex] = 0;//1. 中心位置
        //     for (let index = 1; index <= num; index++) {
        //         let leftIndexInArray = num - index;
        //         let rightIndexInArray = centerIndex + index;
        //         posArray[leftIndexInArray] = -index * interval ////2. 左 //if (index * 2 <= maxColumnNum) 
        //         posArray[rightIndexInArray] = index * interval//3. 右//if (index * 2 + 1 <= maxColumnNum)
        //     }
        // } else {
        //     //偶数, 左右排列
        //     let num = maxColumnNum / 2;
        //     for (let index = 1; index <= num; index++) {
        //         let leftIndexInArray = num - index;
        //         let rightIndexInArray = num + index - 1;
        //         posArray[leftIndexInArray] = -1 * (index - 0.5) * interval //2. 左 
        //         posArray[rightIndexInArray] = (index - 0.5) * interval//3. 右
        //     }
        // }

        return posArray;
    }

    //当前子弹行的第一颗子弹, 是否每秒中发射的第几颗
    private getIndexInSec(curRowIndex: number, fireRule: FireRule) {
        let count = 0;
        for (let index = 0; index < this.fireRule.BulletNumsInRows.length; index++) {
            let numsInRow = this.fireRule.BulletNumsInRows[index];
            if (curRowIndex == index) {
                return count;
            }
            count += numsInRow;
        }
    }


    private playSound(bulletType: EnumBulletOutLookType) {
        switch (bulletType) {
            case EnumBulletOutLookType.ChildPlaneBullet:
                {
                    AudioManager.GetInstance().PlaySoundByConfigID(EnumSoundID.sound_fight_bullet_01);
                    break;
                }
            case EnumBulletOutLookType.MainPlayerBullet:
                {
                    AudioManager.GetInstance().PlaySoundByConfigID(EnumSoundID.sound_fight_bullet_01);
                    break;
                }
            case EnumBulletOutLookType.MainPlayerBullet_FightBackBuff:
                {
                    AudioManager.GetInstance().PlaySoundByConfigID(EnumSoundID.sound_fight_bullet_04);
                    break;
                }
            case EnumBulletOutLookType.MainPlayerBullet_GoldBuffs:
                {
                    AudioManager.GetInstance().PlaySoundByConfigID(EnumSoundID.sound_fight_bullet_03);
                    break;
                }
            case EnumBulletOutLookType.MainPlayerBullet_PowerBuff:
                {
                    AudioManager.GetInstance().PlaySoundByConfigID(EnumSoundID.sound_fight_bullet_02);
                    break;
                }
            case EnumBulletOutLookType.MISSILE_WEAPON_BULLET:
                {
                    AudioManager.GetInstance().PlaySoundByConfigID(EnumSoundID.sound_fight_guided_01);
                    break;
                }
        }
    }

    private stopSound(bulletType: EnumBulletOutLookType) {
        switch (bulletType) {
            case EnumBulletOutLookType.ChildPlaneBullet:
                {
                    AudioManager.GetInstance().StopSoundByConfigID(EnumSoundID.sound_fight_bullet_01);
                    break;
                }
            case EnumBulletOutLookType.MainPlayerBullet:
                {
                    AudioManager.GetInstance().StopSoundByConfigID(EnumSoundID.sound_fight_bullet_01);
                    break;
                }
            case EnumBulletOutLookType.MainPlayerBullet_FightBackBuff:
                {
                    AudioManager.GetInstance().StopSoundByConfigID(EnumSoundID.sound_fight_bullet_04);
                    break;
                }
            case EnumBulletOutLookType.MainPlayerBullet_GoldBuffs:
                {
                    AudioManager.GetInstance().StopSoundByConfigID(EnumSoundID.sound_fight_bullet_03);
                    break;
                }
            case EnumBulletOutLookType.MainPlayerBullet_PowerBuff:
                {
                    AudioManager.GetInstance().StopSoundByConfigID(EnumSoundID.sound_fight_bullet_02);
                    break;
                }
            case EnumBulletOutLookType.MISSILE_WEAPON_BULLET:
                {
                    AudioManager.GetInstance().StopSoundByConfigID(EnumSoundID.sound_fight_guided_01);
                    break;
                }
        }
    }

}
