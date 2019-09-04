var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*
* name;
*/
var BulletComponent2D = (function (_super) {
    __extends(BulletComponent2D, _super);
    function BulletComponent2D(type) {
        var _this = _super.call(this) || this;
        _this.timer = -1;
        _this.canFire = false;
        _this.through = false; //能否穿透
        _this.bulletType = type;
        return _this;
    }
    Object.defineProperty(BulletComponent2D.prototype, "EnableFire", {
        set: function (value) { this.canFire = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BulletComponent2D.prototype, "EnableThrough", {
        set: function (value) { this.through = value; },
        enumerable: true,
        configurable: true
    });
    BulletComponent2D.prototype.onAdd = function () {
        //初始化子弹管理类
        // BulletManager.GetInstance().initManager();
        //音频播放相关
        this.curBulletSoundType = EnumBulletOutLookType.None;
    };
    BulletComponent2D.prototype.onReomove = function () {
        this.OnExitMatch();
        //音频播放相关
        this.curBulletSoundType = EnumBulletOutLookType.None;
    };
    BulletComponent2D.prototype.OnEnterMatch = function (weaponLevel) {
        _super.prototype.OnEnterMatch.call(this);
        this.weaponLvel = weaponLevel;
        this.timer = TimeManager.getInst().addUpdater(cbhandler.gen_handler(this.update, this)); //开始比赛后再update
        this.InitBeforeFire(); //比赛初始化
    };
    BulletComponent2D.prototype.OnExitMatch = function () {
        if (this.timer >= 0)
            TimeManager.getInst().remove(this.timer);
        this.timer = -1;
    };
    /**
     * 比赛初始化
     */
    BulletComponent2D.prototype.InitBeforeFire = function () {
        this.fireTimeCount = 0;
        this.curFiringRowIndex = -1;
        this.InitBulletType(this.bulletType, []);
    };
    /**
     * 设置对应子弹类型的发射规则
     * @param newBulletType
     */
    BulletComponent2D.prototype.ChangeBulletType = function (newBulletType, buffs) {
        // if (this.bulletType == newBulletType) return;
        this.InitBulletType(newBulletType, buffs);
    };
    BulletComponent2D.prototype.InitBulletType = function (newBulletType, buffs) {
        Log.Info("新子弹形态%s", EnumBulletOutLookType[newBulletType]);
        this.bulletType = newBulletType; //子弹累心
        this.bulletConfig = ConfigManager.GetInstance().GetBulletConfig(newBulletType); //子弹配置
        this.containBuffs = buffs ? buffs : []; //子弹fontain
        this.fireRule = this.calcPlayerFireRule(); //
        this.bulletXPosForMaxColumn = this.calBulletRelativeXPos(this.fireRule.MaxColumnCount, this.GetBulletInterval());
        if (this.fireRule.MaxColumnCount != this.fireRule.MinColumnCount)
            this.bulletXPosForMinColumn = this.calBulletRelativeXPos(this.fireRule.MinColumnCount, this.GetBulletInterval());
        else
            this.bulletXPosForMinColumn = this.bulletXPosForMaxColumn;
    };
    BulletComponent2D.prototype.update = function (dt) {
        //音效改为循环播放
        if (this.canFire) {
        }
        else {
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
        var targetInterval = this.fireRule.Interval;
        if (this.fireTimeCount >= targetInterval) {
            var n = Math.floor(this.fireTimeCount / targetInterval);
            this.curFiringRowIndex += n; //更新n行
            if (this.curFiringRowIndex >= this.fireRule.BulletNumsInRows.length) {
                this.curFiringRowIndex = this.curFiringRowIndex % this.fireRule.BulletNumsInRows.length;
            }
            this.fireTimeCount -= n * this.fireRule.Interval;
            //发射columsCount列子弹, 当前是偶数列?奇数列?按照对应位置排列
            var columsCount = this.fireRule.BulletNumsInRows[this.curFiringRowIndex];
            this.fire(columsCount, columsCount == this.fireRule.MaxColumnCount ? this.bulletXPosForMaxColumn : this.bulletXPosForMinColumn);
        }
    };
    //子类重载 不同武器重载
    BulletComponent2D.prototype.fire = function (columsCount, xOffsetMaxColumns) {
        //计算当前要发射的子弹, 是每秒中的第几个
        var indexInSec = this.getIndexInSec(this.curFiringRowIndex, this.fireRule);
        for (var index = 0; index < columsCount; index++) {
            var bullet = BulletManager.GetInstance().Spawn(this.bulletType);
            var pos = CommonUtil2D.GetPosUnderTargetObj(this.player.comParent, bullet.comParent.parent); //子母舰的节点不在同一个层级
            bullet.setBulletPos(pos.x, pos.y - 20); //起点位置
            bullet.bulletMoveCom.lastPosX = pos.x + xOffsetMaxColumns[index];
            bullet.bulletMoveCom.offSetX = xOffsetMaxColumns[index]; //this.posXListLev[this.baseLev - 1 + offset][index];
            bullet.bulletMoveCom.MoveDir = new Vec2(1, -1);
            bullet.bulletMoveCom.SpeedY = this.bulletConfig.MoveSpeed;
            bullet.DamageValue = FormulaUtil.CalcPlayerBulletDamage(this.weaponLvel, this.bulletType, indexInSec, this.containBuffs);
            bullet.Through = this.through;
        }
        //旧播放音频方案
        //2019-6-14 15:08:51 子弹发射不再播放音效
        // this.playSound(this.bulletType)
    };
    //子类重载 子弹之间的间隔 = 子弹图片大小 + 1
    BulletComponent2D.prototype.GetBulletInterval = function () {
        var config = ConfigManager.GetInstance().GetBulletConfig(this.bulletType);
        return config.ColliderSize[0]; //this.player.ViewSize.x + 1;
    };
    //子类重载  角色/怪物/子舰/支援飞船子弹发射规则 子类重载
    BulletComponent2D.prototype.calcPlayerFireRule = function () {
        // let weaponLvl = GameDataManager.getInstance().LoginPlayerInfo.MainWeaponInfo.level;
        return this.calcFireRule(this.weaponLvel, this.bulletType, this.containBuffs);
    };
    BulletComponent2D.prototype.calcFireRule = function (weaponLvl, bulletType, buffs) {
        var config = ConfigManager.GetInstance().GetBulletConfig(bulletType);
        var bulletCountPerSec = ConstDefine.TEST_EFFICIENCY ? ConstDefine.BULLET_PER_SEC : FormulaUtil.CalcBulletNumPerSec(weaponLvl, bulletType, buffs);
        var bulletRows = Math.min(bulletCountPerSec, config.MaxBulletRow); //每秒发送几行子弹
        var rowInterval = 1 / bulletRows; //每行发射的时间间隔 n = 1/rows 
        var bulletColumNum = Math.ceil(bulletCountPerSec / bulletRows); //每秒发送几列子弹
        var lastColumnOverFlowNum = bulletCountPerSec % bulletRows; //最后一列是否未满
        var isLasColumnFull = lastColumnOverFlowNum == 0; //最后列满
        var bulletNumInRows = []; //每行的子弹数量, 从底当上 bulletRowInSecond = [3,3,3,2,2,2,2,2] 每行多少子弹
        for (var index = 0; index < bulletRows; index++) {
            var num = bulletColumNum;
            if (!isLasColumnFull && index >= lastColumnOverFlowNum)
                num -= 1;
            bulletNumInRows.push(num); //记录每行子弹数量
        }
        return new FireRule(bulletNumInRows, rowInterval, bulletCountPerSec);
    };
    /**
     * 计算maxColumnNum列子弹每个子弹的相对位置
     * @param maxColumnNum
     *  @param interval 每个子弹之间间隔
     * 返回number[]:[-10,0,10]
     */
    BulletComponent2D.prototype.calBulletRelativeXPos = function (maxColumnNum, interval) {
        var posArray = new Array(maxColumnNum);
        //偶数, 左右排列 //奇数, 从0开始, 每个左右依次排列
        var even = maxColumnNum % 2 == 0; //偶数
        var num = maxColumnNum / 2; //左右各自列数
        if (!even) {
            num = Math.floor(num);
            posArray[num] = 0; //1. 中心位置
        }
        for (var index = 1; index <= num; index++) {
            var leftIndexInArray = num - index;
            var rightIndexInArray = num + index + (even ? -1 : 0);
            posArray[rightIndexInArray] = even ? (index - 0.5) * interval : (index * interval); //3. 右
            posArray[leftIndexInArray] = -1 * posArray[rightIndexInArray]; //2. 左 
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
    };
    //当前子弹行的第一颗子弹, 是否每秒中发射的第几颗
    BulletComponent2D.prototype.getIndexInSec = function (curRowIndex, fireRule) {
        var count = 0;
        for (var index = 0; index < this.fireRule.BulletNumsInRows.length; index++) {
            var numsInRow = this.fireRule.BulletNumsInRows[index];
            if (curRowIndex == index) {
                return count;
            }
            count += numsInRow;
        }
    };
    BulletComponent2D.prototype.playSound = function (bulletType) {
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
    };
    BulletComponent2D.prototype.stopSound = function (bulletType) {
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
    };
    return BulletComponent2D;
}(ComponentBase2D));
//# sourceMappingURL=BulletComponent2D.js.map