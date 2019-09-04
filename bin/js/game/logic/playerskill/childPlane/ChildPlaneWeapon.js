/*
* 子母舰
*/
var ChildPlaneWeapon = (function () {
    function ChildPlaneWeapon() {
        this.timerId = -1;
        //////////////////////////////////////////////////////
        //逻辑, 统一管理子飞机的发射
        this.planeSpawnIntevalCount = 0; //飞机发射间隔计时
    }
    //副武器配置参数
    ChildPlaneWeapon.prototype.InitWeaponParam = function (config) {
        var params = FormulaUtil.CalcSideWeaponParams(EnumSideWeaponType.ChildPlane, GameDataManager.getInstance().GetCurSideWeaponLvl(), config);
        ChildPlaneWeapon.FIRE_INTERVAL = params[0];
        ChildPlaneWeapon.CHILD_DURATION = params[1];
        ChildPlaneWeapon.ATTACK_DAMAGE = params[2];
    };
    ChildPlaneWeapon.prototype.Start = function (parent, param) {
        ChildPlaneWeapon.config = param;
        this.InitWeaponParam(ChildPlaneWeapon.config);
        this.resetParam();
        //初始化电网池
        GamePoolManager.Instance.InitPool(ChildPlaneWeapon.GetPoolID(), 5, ChildPlane);
        //1. 间隔ns发射电网, 持续5s
        //间隔ns
        this.timerId = TimeManager.getInst().addUpdater(cbhandler.gen_handler(this.update, this, parent, param));
    };
    ChildPlaneWeapon.prototype.Stop = function (parent, param) {
        this.End(parent, null, param);
    };
    ChildPlaneWeapon.prototype.End = function (parent, onEndComplete, param) {
        //停止发射子弹
        if (this.timerId >= 0)
            TimeManager.getInst().remove(this.timerId);
        this.timerId = -1;
        //销毁产生的子飞机
        for (var index = 0; index < this.spawnedPlane.length; index++) {
            var childPlane = this.spawnedPlane[index];
            this.StopChildPlane(childPlane);
        }
        GamePoolManager.Instance.Destory(ChildPlaneWeapon.GetPoolID());
        if (onEndComplete)
            onEndComplete();
    };
    ChildPlaneWeapon.GetPoolID = function () {
        return "ChildPlaneWeapon" + ChildPlaneWeapon.config.GetID();
    };
    // private planePositionSlot: boolean[];//子飞机位置索引. [true, true, false]表示0,1位置当前有飞机, 2位置飞机已经回收
    ChildPlaneWeapon.prototype.resetParam = function () {
        this.planeSpawnIntevalCount = 0;
        this.spawnedPlane = [];
        // this.planePositionSlot = [];
    };
    ChildPlaneWeapon.prototype.update = function (player, config, dt) {
        this.planeSpawnIntevalCount += dt;
        if (this.planeSpawnIntevalCount >= ChildPlaneWeapon.FIRE_INTERVAL) {
            //发射间隔时间到
            this.StartChildPlane(player, config);
            this.planeSpawnIntevalCount = 0;
        }
        //子飞机执行update
        for (var index = 0; index < this.spawnedPlane.length; index++) {
            var childPlane = this.spawnedPlane[index];
            childPlane.Update(dt);
            //子飞机技能结束
            if (childPlane.IsTimeUp()) {
                this.EndChildPlane(childPlane);
            }
        }
    };
    //执行技能
    ChildPlaneWeapon.prototype.StartChildPlane = function (player, config) {
        var plane = GamePoolManager.Instance.Spawn(ChildPlaneWeapon.GetPoolID());
        //设置子飞机属性
        plane.Duration = ChildPlaneWeapon.CHILD_DURATION; //存活时间
        plane.AttackDamage = ChildPlaneWeapon.ATTACK_DAMAGE;
        //开始子飞机执行逻辑  排列在主机左右, 随主机移动, 发射子弹
        var slotIndex = this.getEmptySlot();
        plane.start(slotIndex, player);
        //记录产生的飞机
        this.recordChildPlane(slotIndex, plane);
    };
    //子飞机执行正常结束
    ChildPlaneWeapon.prototype.EndChildPlane = function (childPlane) {
        this.deleteChildPlaneRecord(childPlane);
        //添加技能结束的处理, 比如淡出动画, 再回收
        childPlane.end();
    };
    //打断子飞机执行
    ChildPlaneWeapon.prototype.StopChildPlane = function (childPlane) {
        this.deleteChildPlaneRecord(childPlane);
        childPlane.stop();
    };
    //记录产生的子飞机
    ChildPlaneWeapon.prototype.recordChildPlane = function (slotIndex, childPlane) {
        // this.planePositionSlot[childPlane.SlotIndex] = true;//占用
        PlayerManager.GetInstance().MainPlayer.SlotComp.OccupySlot(slotIndex, EnumSlotType.ChildPlane);
        this.spawnedPlane.push(childPlane);
    };
    //删除飞机记录
    ChildPlaneWeapon.prototype.deleteChildPlaneRecord = function (childPlane) {
        // this.planePositionSlot[childPlane.SlotIndex] = false;//解除占用
        PlayerManager.GetInstance().MainPlayer.SlotComp.ClearSlot(childPlane.SlotIndex, EnumSlotType.ChildPlane);
        this.spawnedPlane.splice(this.spawnedPlane.indexOf(childPlane), 1); //删除记录
    };
    //获取角色周围没占用的位置
    ChildPlaneWeapon.prototype.getEmptySlot = function () {
        return PlayerManager.GetInstance().MainPlayer.SlotComp.getEmpetySlot();
    };
    return ChildPlaneWeapon;
}());
//# sourceMappingURL=ChildPlaneWeapon.js.map