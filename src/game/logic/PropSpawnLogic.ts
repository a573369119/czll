/*
* name;
*/
class PropSpawnLogic {
    private static _instance: PropSpawnLogic;
    public static get Instance(): PropSpawnLogic {
        if (PropSpawnLogic._instance == null) {
            PropSpawnLogic._instance = new PropSpawnLogic();
        }
        return PropSpawnLogic._instance;
    }

    private curSpawnProbability: number = ConstDefine.PROP_PROBABILITY;//当前生成道具的概率

    public TrySpawn() {
        // //每击杀一个敌人有10%的几率生成一个道具，没有生成道具则该几率变成20%，生成道具后重置为10%；
        // if (this.checkCanSpawn()) {
        //     this.curSpawnProbability = ConstDefine.PROP_PROBABILITY;
        this.spawn();
        // } else {
        //     this.curSpawnProbability += ConstDefine.PROP_PROBABILITY;
        // }
    }

    //检测是否能生成道具
    private checkCanSpawn(): boolean {
        return Math.random() <= this.curSpawnProbability
    }

    private spawn() {
        let prop = PropManager.GetInstance().RandomSpawn();
        prop.setPlayerPos(Laya.stage.width * Math.random(), 100)
    }
}