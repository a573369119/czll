/*
* name;
*/
class PropManager {
    private static instance: PropManager;
    public static GetInstance(): PropManager {
        if (PropManager.instance == null) {
            PropManager.instance = new PropManager();
        }
        return PropManager.instance;
    }

    private allSpawnedPropDic: Laya.Dictionary;     //当前生成的道具
    private propIdList: number[];

    //每次进入战斗先初始化一个道具对象池
    public InitPropPool(propIdList: number[]): void {
        this.allSpawnedPropDic = new Laya.Dictionary();
        this.propIdList = propIdList;
        for (var index = 0; index < this.propIdList.length; index++) {
            let propId = this.propIdList[index];
            GamePoolManager.Instance.InitPool<Prop>(this.GetPropPoolName(propId), 2, Prop, propId);
        }
    }

    /**
     * 游戏中刷道具
     * @param propId 
     */
    public Spawn(propId: number): Prop {
        // Log.Debug("刷出道具%s", EnumPropType[propId])
        let prop = GamePoolManager.Instance.Spawn<Prop>(this.GetPropPoolName(propId))
        this.allSpawnedPropDic.set(prop.UID, prop);
        return prop;
    }

    /**
     * 返回所有spawn的道具
     */
    public GetAll(): Array<Prop> {
        return (this.allSpawnedPropDic.values as Prop[]);
    }

    /**
     * 游戏中道具回收
     * @param propId 
     * @param propObj 
     */
    public Recycle(propId: number, propObj: Prop) {
        // Log.Debug("回收道具%s", EnumPropType[propId])
        this.allSpawnedPropDic.remove(propObj.UID);
        GamePoolManager.Instance.Recycle<Prop>(propObj, this.GetPropPoolName(propId));
    }

    public Destory() {
        //退出比赛清理
        for (var index = 0; index < this.propIdList.length; index++) {
            GamePoolManager.Instance.Destory<Prop>(this.GetPropPoolName(this.propIdList[index]));
        }
        this.propIdList = null;
        this.allSpawnedPropDic = null;
    }


    //随机产生一个
    public RandomSpawn(): Prop {
        let random = Math.random();
        let propSpawnProp = ConfigManager.GetInstance().GetPropSpawnWeight();
        for (let index = 0; index < propSpawnProp.length; index++) {
            let spawnInfo = propSpawnProp[index];
            if (spawnInfo.ProbabilityRange >= random || index == propSpawnProp.length - 1) return this.Spawn(spawnInfo.Config.GetID())
        }

        // let random = Math.floor(Math.random() * this.propIdList.length);
        // return this.Spawn(this.propIdList[random])
        //random = Math.random();
        // if (random <= 0.3) return this.Spawn(EnumBuffType.Gold)
        // if (random <= 0.6) return this.Spawn(EnumBuffType.FightBack)
        //return this.Spawn(EnumBuffType.Weaken)
    }


    public PauseAll(pause: boolean) {
        // let monsters = this.GetAllSpawnedMonster();
        // for (let index = 0; index < monsters.length; index++) {
        //     let monster = monsters[index];
        //     monster.Freeze(pause)
        // }
    }

    private GetPropPoolName(propId: number): string {
        return "PropPoolName" + propId;
    }
}