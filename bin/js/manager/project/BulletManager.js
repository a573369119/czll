/*
* name;
*/
var BulletManager = (function () {
    function BulletManager() {
        this.maxMonsterBulletCount = 60;
        this.bulletIdList = []; //子弹池中id列表
        this.recycledID = [];
    }
    Object.defineProperty(BulletManager.prototype, "bullPool", {
        get: function () { Log.Error("use BulletManager.Spawn instead"); return null; },
        enumerable: true,
        configurable: true
    });
    BulletManager.GetInstance = function () {
        if (BulletManager.instance == null) {
            BulletManager.instance = new BulletManager();
        }
        return BulletManager.instance;
    };
    BulletManager.prototype.initManager = function () {
        this.monsterBulletPool = new ScriptObjectPool();
        this.monsterBulletDic = new Laya.Dictionary();
        this.monsterBulletPool.Init(this.maxMonsterBulletCount, MonsterBullet, EnumBulletOutLookType.MonsterBullet);
    };
    //每次进入战斗先初始化一个本关卡子弹对象池
    BulletManager.prototype.InitBulletPool = function (bulletIds) {
        this.allSpawnedMonsterBulletDic = new Laya.Dictionary();
        this.allSpawnedPlayerBulletDic = new Laya.Dictionary();
        this.bulletIdList = CommonUtil.RemoveRepeated(bulletIds);
        for (var index = 0; index < this.bulletIdList.length; index++) {
            var bulletId = this.bulletIdList[index];
            var config = ConfigManager.GetInstance().GetBulletConfig(bulletId);
            if (bulletId == EnumBulletOutLookType.MonsterBullet) {
                GamePoolManager.Instance.InitPool(this.GetBulletPoolName(bulletId), config.MaxBulletNum, MonsterBullet, bulletId, false);
            }
            else {
                GamePoolManager.Instance.InitPool(this.GetBulletPoolName(bulletId), config.MaxBulletNum, Bullet, bulletId, false);
            }
        }
    };
    //退出比赛, 销毁
    BulletManager.prototype.Destory = function () {
        this.RecycleAllMonsterBullet();
        this.RecycelAllPlayerBullet();
        //todo
        for (var index = 0; index < this.bulletIdList.length; index++) {
            var bulletId = this.bulletIdList[index];
            if (bulletId == EnumBulletOutLookType.MonsterBullet) {
                GamePoolManager.Instance.Destory(this.GetBulletPoolName(bulletId));
            }
            else {
                GamePoolManager.Instance.Destory(this.GetBulletPoolName(bulletId));
            }
        }
        this.bulletIdList = null;
        this.allSpawnedMonsterBulletDic = null;
        this.allSpawnedPlayerBulletDic = null;
        Log.Debug("BulletManager Destory");
    };
    BulletManager.prototype.GetBulletPoolName = function (bulletId) {
        return "BulletPool" + bulletId;
    };
    /**
     * 游戏中产生子弹
     * @param bulletId
     */
    BulletManager.prototype.Spawn = function (bulletId) {
        var bullet = null; //GamePoolManager.Instance.Spawn<Monster>(configId.toString())
        if (bulletId == EnumBulletOutLookType.MonsterBullet) {
            bullet = GamePoolManager.Instance.Spawn(this.GetBulletPoolName(bulletId));
            this.allSpawnedMonsterBulletDic.set(bullet.UID, bullet);
            Log.Debug("spawn monster bullet %i", bullet.UID);
        }
        else {
            bullet = GamePoolManager.Instance.Spawn(this.GetBulletPoolName(bulletId));
            this.allSpawnedPlayerBulletDic.set(bullet.UID, bullet);
        }
        return bullet;
    };
    /**
     * 所有子弹
     */
    BulletManager.prototype.GetAllSpawnedBullet = function (type) {
        if (type == EnumBulletOutLookType.MonsterBullet)
            return this.GetAllSpawnedMonseterBullet();
        else {
            var retBullets = [];
            var allBullets = this.allSpawnedPlayerBulletDic.values;
            for (var index = 0; index < allBullets.length; index++) {
                var element = allBullets[index];
                if (element.Type == type) {
                    retBullets.push(element);
                }
            }
            return retBullets;
        }
    };
    /**
     * 返回所有怪物子弹
     */
    BulletManager.prototype.GetAllSpawnedMonseterBullet = function () {
        if (this.allSpawnedMonsterBulletDic == null)
            return [];
        var allBullets = this.allSpawnedMonsterBulletDic.values;
        return allBullets;
    };
    /**
     * 返回所有非怪物子弹
     */
    BulletManager.prototype.GetAllSpawnedNonMonseterBullet = function () {
        if (this.allSpawnedPlayerBulletDic == null)
            return [];
        var allBullets = this.allSpawnedPlayerBulletDic.values;
        return allBullets;
    };
    /**
     * 回收子弹, 根据子弹Type判断是那种子弹
     * @param bullet 子弹
     */
    BulletManager.prototype.Recycle = function (bullet) {
        this.RecycleBullet(bullet.Type, bullet);
    };
    BulletManager.prototype.RecycleBullet = function (bulletId, bullet) {
        if (bulletId == EnumBulletOutLookType.MonsterBullet) {
            if (this.allSpawnedMonsterBulletDic == null) {
                Log.Error("");
            }
            this.allSpawnedMonsterBulletDic.remove(bullet.UID);
            GamePoolManager.Instance.Recycle(bullet, this.GetBulletPoolName(bulletId));
            Log.Debug("recycle monster bullet %i", bullet.UID);
        }
        else {
            this.allSpawnedPlayerBulletDic.remove(bullet.UID);
            GamePoolManager.Instance.Recycle(bullet, this.GetBulletPoolName(bulletId));
        }
        if (this.recycledID.indexOf(bullet.UID) >= 0) {
            Log.Debug("error");
        }
        this.recycledID.push(bullet.UID);
    };
    //回收所有的怪物子弹
    BulletManager.prototype.RecycleAllMonsterBullet = function () {
        var bullets = this.GetAllSpawnedMonseterBullet();
        //记录要删除的子弹, 防止在循环中删除
        var allBullets = [];
        for (var index = 0; index < bullets.length; index++) {
            var element = bullets[index];
            allBullets.push(element);
        }
        for (var index = 0; index < allBullets.length; index++) {
            var bullet = allBullets[index];
            this.Recycle(bullet);
        }
        this.allSpawnedMonsterBulletDic = null;
        Log.Debug("RecycleAllMonsterBullet");
    };
    //回收所有玩家子弹
    BulletManager.prototype.RecycelAllPlayerBullet = function () {
        var bullets = this.GetAllSpawnedNonMonseterBullet();
        //记录要删除的子弹, 防止在循环中删除
        var allBullets = [];
        for (var index = 0; index < bullets.length; index++) {
            var element = bullets[index];
            allBullets.push(element);
        }
        for (var index = 0; index < allBullets.length; index++) {
            var bullet = allBullets[index];
            this.Recycle(bullet);
        }
        this.allSpawnedPlayerBulletDic = null;
    };
    return BulletManager;
}());
//# sourceMappingURL=BulletManager.js.map