/*
* 飞机类: 角色, 子舰, 呼叫支援的飞机基类
*/
class Plane extends PlayerBase2D {
    public bulletComp: BulletComponent2D;
    protected effectComp: PlayerEffectComponent2D;
    public get BuffComp(): BuffComponent { return null; }

    public initComponent(): void {
        super.initComponent();
        //特效组件
        this.effectComp = new PlayerEffectComponent2D();
        this.addComponent(this.effectComp);
    }

    //切换子弹
    public ChangeBullet(newBullet?: EnumBulletOutLookType) {
        //根据当前的buff决定使用哪种子弹
        let info = this.getBulletType();
        if (info) {
            this.bulletComp.ChangeBulletType(info.LatestBullletOutLook, info.AllRuningBulletBuff)
        } else {
            Log.Error("没有buff组件, 不需要切换子弹形态")
        }
    }

    //子弹是否穿透
    public SetBulletThroughable(enable: boolean) {
        this.bulletComp.EnableThrough = enable;
    }

    //根据当前buff决定显示的子弹形态
    private getBulletType(): BulletBuffInfo {
        if (!this.BuffComp) return null;
        let bulletInfo = new BulletBuffInfo();
        bulletInfo.AllRuningBulletBuff = [];//子弹相关的buff和最新的子弹形态
        let type = EnumBulletOutLookType.MainPlayerBullet;
        let buffs = this.BuffComp.AllBuffs;
        for (let index = 0; index < buffs.length; index++) {
            let element = buffs[index];
            if (element == EnumBuffType.Gold) { type = EnumBulletOutLookType.MainPlayerBullet_GoldBuffs; bulletInfo.AllRuningBulletBuff.push(element) }
            if (element == EnumBuffType.FightBack) { type = EnumBulletOutLookType.MainPlayerBullet_FightBackBuff; bulletInfo.AllRuningBulletBuff.push(element) }
            if (element == EnumBuffType.PowerIntensified) { type = EnumBulletOutLookType.MainPlayerBullet_PowerBuff; bulletInfo.AllRuningBulletBuff.push(element) }
            if (element == EnumBuffType.FireSpeedIntensified) { bulletInfo.AllRuningBulletBuff.push(element) }
        }
        //
        bulletInfo.LatestBullletOutLook = type;
        return bulletInfo;
    }

    // //根据buff获取子弹形态 Deprecate 不需要
    // private getBulletType(): EnumBulletType {
    //     if (!this.BuffComp) return null;
    //     let type = EnumBulletType.MainPlayerBullet;
    //     let buffs = this.BuffComp.AllBuffs;

    //     let count = 0;//计算火力, 点石成金, 击退的buff数量
    //     for (let index = 0; index < buffs.length; index++) {
    //         let buff = buffs[index];
    //         if (buff == EnumBuffType.PowerIntensified) {
    //             count++;
    //             if (count == 2 && type == EnumBulletType.MainPlayerBullet_FightBackBuff) { type = EnumBulletType.MainPlayerBullet_PowerAndBackBuff }
    //             else if (count == 2 && type == EnumBulletType.MainPlayerBullet_GoldBuffs) { type = EnumBulletType.MainPlayerBullet_PowerAndGoldBuff }
    //             else { type = EnumBulletType.MainPlayerBullet_PowerBuff }
    //         }
    //         if (buff == EnumBuffType.Gold) {
    //             count++;
    //             if (count == 2 && type == EnumBulletType.MainPlayerBullet_FightBackBuff) { type = EnumBulletType.MainPlayerBullet_BackAndGoldBuff }
    //             else if (count == 2 && type == EnumBulletType.MainPlayerBullet_PowerBuff) { type = EnumBulletType.MainPlayerBullet_PowerAndGoldBuff }
    //             else { type = EnumBulletType.MainPlayerBullet_GoldBuffs }
    //         }
    //         if (buff == EnumBuffType.FightBack) {
    //             count++;
    //             if (count == 2 && type == EnumBulletType.MainPlayerBullet_GoldBuffs) { type = EnumBulletType.MainPlayerBullet_BackAndGoldBuff }
    //             else if (count == 2 && type == EnumBulletType.MainPlayerBullet_PowerBuff) { type = EnumBulletType.MainPlayerBullet_PowerAndBackBuff }
    //             else { type = EnumBulletType.MainPlayerBullet_FightBackBuff }
    //         }
    //     }

    //     if (count == 0) {
    //         //穿透
    //         if (this.BuffComp.ContainBuff(EnumBuffType.BulletThrough)) type = EnumBulletType.MainPlayerBullet_Through;
    //     } else if (count == 3) {
    //         //3buff
    //         type = EnumBulletType.MainPlayerBullet_3Buff;
    //     }

    //     return type;
    // }
}

class BulletBuffInfo {
    public AllRuningBulletBuff: EnumBuffType[];//和子弹相关的buff
    public LatestBullletOutLook: EnumBulletOutLookType;//子弹的最新形态
}