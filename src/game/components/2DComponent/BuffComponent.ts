/*
* name;
*/
class BuffComponent extends ComponentBase2D {
    private runingBuffDic: Laya.Dictionary;//当前生效的buff
    public get AllBuffs(): EnumBuffType[] { return this.runingBuffDic.keys; }

    public onAdd(): void {
        this.Reset();
    }

    public onReomove(): void {
        this.stopAll();
    }

    public Reset() {
        this.runingBuffDic = new Laya.Dictionary();
    }

    public OnEnterMatch() {

    }
    public OnExitMatch() {

    }

    public AddBuff(newBuffId: EnumBuffType, param: any) {
        //buff重复添加, 刷新buff
        // this.stopBuff(newBuffId)
        if (this.ContainBuff(newBuffId)) {
            this.refreshBuff(newBuffId, param)
        } else {
            this.exeBuff(newBuffId, param)
        }


        //通知uI
        if (this.player.playerID == ConstDefine.MAIN_PLAYRE_CONFIG_ID) {
            Facade.instance.sendNotification(NotificationNames.UI_OnPropBuff, new PlayerBuffInfo(newBuffId, true))
        }
    }

    public ContainBuff(buffId: EnumBuffType): boolean {
        return this.runingBuffDic.get(buffId) != null;
    }

    //停止所有
    public stopAll() {
        // let timers = this.runingBuffDic.values;
        // for (let index = 0; index < timers.length; index++) {
        //     let element = timers[index] as ISkillLogic;
        //     element.Stop(this.player, null)
        //     // TimeManager.getInst().remove(element);
        // }
        let buffids = this.runingBuffDic.keys;
        for (let index = buffids.length - 1; index >= 0; index--) {
            let buffId = buffids[index] as EnumBuffType;
            this.stopBuff(buffId)
        }

        this.Reset()
    }

    //执行buff
    private exeBuff(buffId: EnumBuffType, param: any) {
        let buff = this.getBuffSkill(buffId);
        this.runingBuffDic.set(buffId, buff);
        buff.Start(this.player, param,
            () => {
                this.endBuff(buffId)//buff结束/打断回调
            })
    }

    //刷新buff
    private refreshBuff(buffId: EnumBuffType, param: any) {
        let buff = this.runingBuffDic.get(buffId);
        if (buff) {
            (buff as IBuffLogic).Refresh(this.player, () => {
                this.endBuff(buffId)//buff结束/打断回调
            }, param);
        }
    }

    private endBuff(buffid: number) {
        let buff = this.runingBuffDic.get(buffid);
        if (buff) {
            (buff as IBuffLogic).End(this.player, () => {
                //结束动画完成后才删除
                this.runingBuffDic.remove(buffid);
                this.onRemove(buffid)
            }, null);
        }
    }

    //停止buff
    public stopBuff(buffid: number) {
        let buff = this.runingBuffDic.get(buffid);
        if (buff) {
            this.runingBuffDic.remove(buffid);
            (buff as IBuffLogic).Stop(this.player, null);
            this.onRemove(buffid)
        }
    }

    //删除buff处理
    private onRemove(buffid: number) {
        //通知uI
        if (this.player.playerID == ConstDefine.MAIN_PLAYRE_CONFIG_ID) {
            Facade.instance.sendNotification(NotificationNames.UI_OnPropBuff, new PlayerBuffInfo(buffid, false))
        }
    }

    //根据id获取对应技能逻辑
    private getBuffSkill(buff: EnumBuffType): IBuffLogic {
        switch (buff) {
            case EnumBuffType.MagnetFreezen:
                return new MagnetFreezenBuff()
            case EnumBuffType.CallAlliance:
                return new CallAllianceBuff()
            case EnumBuffType.BulletThrough:
                return new BulletThroughBuff();
            case EnumBuffType.Enlarge:
                return new EnlargeBuff();
            case EnumBuffType.FightBack:
                return new FightBackBuff();
            case EnumBuffType.FireSpeedIntensified:
                return new FireSpeedBuff();
            case EnumBuffType.Gold:
                return new GoldBuff();
            case EnumBuffType.LimitInput:
                return new LimitInputBuff();
            case EnumBuffType.PowerIntensified:
                return new FirePowerBuff();
            case EnumBuffType.Weaken:
                return new WeakenBuff();
            default:
                {
                    Log.Error("没有对应武器的技能逻辑 %i", buff)
                    return null
                }
        }
    }
}