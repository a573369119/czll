/*
* name;
*/
class BulletManager {

    private static instance: BulletManager;




    public get bullPool(): ScriptObjectPool<Bullet> { Log.Error("use BulletManager.Spawn instead"); return null }

    public monsterBulletDic: Laya.Dictionary //怪物发出的子弹
    public monsterBulletPool: ScriptObjectPool<MonsterBullet>;
    public maxMonsterBulletCount: number = 60;


    public static GetInstance(): BulletManager {
        if (BulletManager.instance == null) {
            BulletManager.instance = new BulletManager();
        }
        return BulletManager.instance;
    }


    public initManager(): void {
        this.monsterBulletPool = new ScriptObjectPool<MonsterBullet>();
        this.monsterBulletDic = new Laya.Dictionary();
        this.monsterBulletPool.Init(this.maxMonsterBulletCount, MonsterBullet, EnumBulletOutLookType.MonsterBullet);
    }

    private bulletIdList = []; //子弹池中id列表
    private allSpawnedMonsterBulletDic: Laya.Dictionary;     //当前发射的子弹
    private allSpawnedPlayerBulletDic: Laya.Dictionary;     //当前玩家发射的子弹
    //每次进入战斗先初始化一个本关卡子弹对象池
    public InitBulletPool(bulletIds: number[]): void {
        this.allSpawnedMonsterBulletDic = new Laya.Dictionary();
        this.allSpawnedPlayerBulletDic = new Laya.Dictionary();
        this.bulletIdList = CommonUtil.RemoveRepeated(bulletIds);
        for (var index = 0; index < this.bulletIdList.length; index++) {
            let bulletId = this.bulletIdList[index];
            let config = ConfigManager.GetInstance().GetBulletConfig(bulletId);
            if (bulletId == EnumBulletOutLookType.MonsterBullet) {
                GamePoolManager.Instance.InitPool<MonsterBullet>(this.GetBulletPoolName(bulletId), config.MaxBulletNum, MonsterBullet, bulletId, false);
            } else {
                GamePoolManager.Instance.InitPool<Bullet>(this.GetBulletPoolName(bulletId), config.MaxBulletNum, Bullet, bulletId, false);
            }
        }
    }

    //退出比赛, 销毁
    public Destory() {

        this.RecycleAllMonsterBullet();
        this.RecycelAllPlayerBullet();

        //todo
        for (var index = 0; index < this.bulletIdList.length; index++) {
            let bulletId = this.bulletIdList[index];
            if (bulletId == EnumBulletOutLookType.MonsterBullet) {
                GamePoolManager.Instance.Destory<MonsterBullet>(this.GetBulletPoolName(bulletId));
            } else {
                GamePoolManager.Instance.Destory<Bullet>(this.GetBulletPoolName(bulletId));
            }
        }

        this.bulletIdList = null;
        this.allSpawnedMonsterBulletDic = null;
        this.allSpawnedPlayerBulletDic = null;
        Log.Debug("BulletManager Destory")
    }

    private GetBulletPoolName(bulletId: number): string {
        return "BulletPool" + bulletId;
    }

    /**
     * 游戏中产生子弹
     * @param bulletId 
     */
    public Spawn(bulletId: EnumBulletOutLookType): Bullet {

        let bullet = null;//GamePoolManager.Instance.Spawn<Monster>(configId.toString())
        if (bulletId == EnumBulletOutLookType.MonsterBullet) {
            bullet = GamePoolManager.Instance.Spawn<MonsterBullet>(this.GetBulletPoolName(bulletId));
            this.allSpawnedMonsterBulletDic.set(bullet.UID, bullet);
            Log.Debug("spawn monster bullet %i", bullet.UID)
        } else {
            bullet = GamePoolManager.Instance.Spawn<Bullet>(this.GetBulletPoolName(bulletId));
            this.allSpawnedPlayerBulletDic.set(bullet.UID, bullet);
            // Log.Debug("spawn player bullet %i", bullet.UID)
        }

        return bullet;
    }


    /**
     * 所有子弹
     */
    public GetAllSpawnedBullet(type: EnumBulletOutLookType): Array<MonsterBullet> {
        if (type == EnumBulletOutLookType.MonsterBullet)
            return this.GetAllSpawnedMonseterBullet();
        else {
            let retBullets = [];
            let allBullets = this.allSpawnedPlayerBulletDic.values;
            for (let index = 0; index < allBullets.length; index++) {
                let element = allBullets[index] as Bullet;
                if (element.Type == type) {
                    retBullets.push(element)
                }
            }
            return retBullets
        }
    }

    /**
     * 返回所有怪物子弹
     */
    public GetAllSpawnedMonseterBullet(): Array<MonsterBullet> {
        if (this.allSpawnedMonsterBulletDic == null) return [];
        let allBullets = this.allSpawnedMonsterBulletDic.values;
        return allBullets
    }

    /**
     * 返回所有非怪物子弹
     */
    public GetAllSpawnedNonMonseterBullet(): Array<Bullet> {
        if (this.allSpawnedPlayerBulletDic == null) return [];
        let allBullets = this.allSpawnedPlayerBulletDic.values;
        return allBullets
    }

    /**
     * 回收子弹, 根据子弹Type判断是那种子弹
     * @param bullet 子弹
     */
    public Recycle(bullet: Bullet) {
        this.RecycleBullet(bullet.Type, bullet)
    }
    private recycledID = []
    private RecycleBullet(bulletId: EnumBulletOutLookType, bullet: Bullet) {

        if (bulletId == EnumBulletOutLookType.MonsterBullet) {
            if (this.allSpawnedMonsterBulletDic == null) {
                Log.Error("")
            }
            this.allSpawnedMonsterBulletDic.remove(bullet.UID);
            GamePoolManager.Instance.Recycle<MonsterBullet>(bullet as MonsterBullet, this.GetBulletPoolName(bulletId));
            Log.Debug("recycle monster bullet %i", bullet.UID)
        } else {
            this.allSpawnedPlayerBulletDic.remove(bullet.UID);
            GamePoolManager.Instance.Recycle<Bullet>(bullet, this.GetBulletPoolName(bulletId));
            // Log.Debug("recycle player bullet %i", bullet.UID)
        }

        if (this.recycledID.indexOf(bullet.UID) >= 0) {
            Log.Debug("error")
        }
        this.recycledID.push(bullet.UID);

    }
    //回收所有的怪物子弹
    public RecycleAllMonsterBullet() {
        let bullets = this.GetAllSpawnedMonseterBullet();
        //记录要删除的子弹, 防止在循环中删除
        let allBullets = []
        for (let index = 0; index < bullets.length; index++) {
            let element = bullets[index];
            allBullets.push(element)
        }
        for (let index = 0; index < allBullets.length; index++) {
            let bullet = allBullets[index];
            this.Recycle(bullet)
        }
        this.allSpawnedMonsterBulletDic = null;
        Log.Debug("RecycleAllMonsterBullet")
    }
    //回收所有玩家子弹
    public RecycelAllPlayerBullet() {
        let bullets = this.GetAllSpawnedNonMonseterBullet();
        //记录要删除的子弹, 防止在循环中删除
        let allBullets = []
        for (let index = 0; index < bullets.length; index++) {
            let element = bullets[index];
            allBullets.push(element)
        }
        for (let index = 0; index < allBullets.length; index++) {
            let bullet = allBullets[index];
            this.Recycle(bullet)
        }
        this.allSpawnedPlayerBulletDic = null;
    }

}