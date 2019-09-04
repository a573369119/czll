/*
* name;
*/
var AttachDataCenter = (function () {
    function AttachDataCenter() {
        this.attachCenters = [];
        this.lastAttachCheckTime = 0;
        this.lastFrameNo = 0;
    }
    Object.defineProperty(AttachDataCenter, "Instance", {
        get: function () {
            if (AttachDataCenter._instace == null) {
                AttachDataCenter._instace = new AttachDataCenter();
            }
            return AttachDataCenter._instace;
        },
        enumerable: true,
        configurable: true
    });
    AttachDataCenter.prototype.OnEnterMatch = function () {
        this.attachCenters = [];
    };
    AttachDataCenter.prototype.AddAttach = function (parentMonster, childMonster) {
        var parent = this.GetAttachCenter(parentMonster.UID);
        if (parent == null) {
            parent = this.CreateTree(parentMonster.UID);
            this.attachCenters.push(parent);
        }
        //找到子节点
        var child = this.GetAttachCenter(childMonster.UID);
        if (child == null) {
            child = this.CreateTree(childMonster.UID);
        }
        //将子节点从父节点删除
        child.RemoveFromParent(); //todo 将子节点的父节点添加到parent
        // childMonster.comParent.removeSelf();
        //添加到新父节点
        parent.childs.push(child);
        child.parent = parent;
        //切换节点
        parentMonster.AddChild(childMonster.comParent);
        childMonster.monsterMoveComp.monsterStop();
        //设置子物体的位置.
        Log.Debug("怪物uid%i,attach到父节点%i", childMonster.UID, parentMonster.UID);
        return child;
    };
    //parentMonster死亡, 删除parentMonster下的节点
    AttachDataCenter.prototype.RemoveAttach = function (parentMonster) {
        var targetMonster = this.GetAttachCenter(parentMonster.UID);
        if (targetMonster == null)
            return; //怪物没有依附
        Log.Debug("怪物uid%i死亡删除attach, 父节点%i", parentMonster.UID, targetMonster.parent ? targetMonster.parent.uid : -1);
        //父节点删除该怪物
        targetMonster.RemoveFromParent();
        // parentMonster.comParent.removeSelf();
        //该节点的子节点, 自由
        for (var index = 0; index < targetMonster.childs.length; index++) {
            var child = targetMonster.childs[index];
            this.attachCenters.push(child);
            child.parent = null;
            //切回stage节点
            var monster = PlayerManager.GetInstance().GetMonsterByUid(child.uid);
            if (monster == null) {
                Log.Error("remove atach error");
            }
            monster.AddToStage();
            monster.monsterMoveComp.monsterRandomMove();
        }
    };
    AttachDataCenter.prototype.IsUnderSameParent = function (monster1, monster2) {
        var targetMonster1 = this.GetAttachCenter(monster1.UID);
        var targetMonster2 = this.GetAttachCenter(monster2.UID);
        return targetMonster1 && targetMonster2 && targetMonster1.IsUnderSameParent(targetMonster2);
    };
    AttachDataCenter.prototype.GetAttachCenter = function (uid) {
        for (var index = 0; index < this.attachCenters.length; index++) {
            var center = this.attachCenters[index];
            var findTree = this.findInTree(center, uid);
            if (findTree)
                return findTree;
        }
        return null;
    };
    //子树是否满
    AttachDataCenter.prototype.IsChildTreeFull = function (monster, fullNum) {
        var targetMonster1 = this.GetAttachCenter(monster.UID);
        if (targetMonster1 == null)
            return false;
        var parent = targetMonster1.GetTopParent();
        return parent.GetTotalChildCount() >= fullNum;
    };
    AttachDataCenter.prototype.findInTree = function (tree, uid) {
        if (tree.uid == uid)
            return tree;
        for (var index = 0; index < tree.childs.length; index++) {
            var child = tree.childs[index];
            var findTree = this.findInTree(child, uid);
            if (findTree)
                return findTree;
        }
        return null;
    };
    AttachDataCenter.prototype.CreateTree = function (uid) {
        var tree = new AttachTree();
        tree.uid = uid;
        return tree;
    };
    AttachDataCenter.prototype.CheckAttach = function (interval, fullNum) {
        if (fullNum === void 0) { fullNum = 100; }
        var now = new Date().getTime();
        var curFrame = Laya.timer.currFrame;
        if (now - this.lastAttachCheckTime >= interval * 1000 && curFrame > this.lastFrameNo) {
            this.lastAttachCheckTime = now;
            this.lastFrameNo = curFrame;
            // Log.Debug("检测attach")
            var attachChangedMonsters = []; //已经切换过一次的怪物, 不多次切换
            var monsters = PlayerManager.GetInstance().GetAllSpawnedMonster();
            for (var index = 0; index < monsters.length - 1; index++) {
                var monster1 = monsters[index];
                var monster1ContainAttackSkill = this.hasAttachSkill(monster1);
                if (monster1ContainAttackSkill && this.IsChildTreeFull(monster1, fullNum))
                    continue; //子树满 不能再粘附子怪
                // if (!this.hasAttachSkill(monster1)) continue;//没attach技能就跳过
                for (var j = index + 1; j < monsters.length; j++) {
                    var monster2 = monsters[j];
                    var monster2ContainAttackSkill = this.hasAttachSkill(monster2);
                    if (!monster1ContainAttackSkill && !monster2ContainAttackSkill)
                        continue; //两个都没attach技能就跳过
                    if (monster2ContainAttackSkill && this.IsChildTreeFull(monster2, fullNum))
                        continue; //另一个怪物子树也满, 不能粘附子怪
                    if (!monster1.IsAlive())
                        continue;
                    if (!monster2.IsAlive())
                        continue;
                    if (monster1.UID == monster2.UID)
                        continue;
                    if (attachChangedMonsters.indexOf(monster2.UID) >= 0)
                        continue; //已经切换过一次的不重复切换
                    if (AttachDataCenter.Instance.IsUnderSameParent(monster1, monster2))
                        continue; //同个父节点不检查
                    // let count1 = 0;
                    // let parent1 = monster1.comParent;
                    // while (parent1 != null) {
                    //     count1++;
                    //     parent1 = parent1.parent as Laya.Sprite;
                    //     if (count1 > 8) {
                    //         AttachDataCenter.Instance.IsUnderSameParent(monster1, monster2)
                    //     }
                    // }
                    // let count2 = 0;
                    // let parent2 = monster2.comParent;
                    // while (parent2 != null) {
                    //     count2++;
                    //     parent2 = parent2.parent as Laya.Sprite;
                    //     if (count1 > 8) {
                    //         AttachDataCenter.Instance.IsUnderSameParent(monster1, monster2)
                    //     }
                    // }
                    var collisionInfo = monster1.GetCollisionShapeInfo(true);
                    if (CommonUtil.IsBoxCrossed(collisionInfo, monster2.GetCollisionShapeInfo(true))) {
                        //谁有attach技能 谁是否父节点
                        if (monster1ContainAttackSkill) {
                            this.Attach(monster1, monster2); //检测到一个就结束
                        }
                        else {
                            this.Attach(monster2, monster1); //检测到一个就结束
                        }
                        attachChangedMonsters.push(monster2.UID);
                    }
                }
            }
        }
    };
    AttachDataCenter.prototype.Attach = function (parent, child) {
        AttachDataCenter.Instance.AddAttach(parent, child);
        if (!this.hasAttachSkill(child)) {
            // if (!child.skillComp.ConstainSkill(EnumMonsterPowerId.Attach)) {
            var skill = parent.skillComp.GetSkill(EnumMonsterPowerType.Attach);
            //let skillConfig = skill.Config; //parent.skillComp.GetSkill(EnumMonsterPowerType.Attach); //parent.attributeComp.GetSkill(EnumMonsterPowerType.Attach);
            child.skillComp.Start(EnumMonsterPowerType.Attach, skill.Config);
        }
    };
    AttachDataCenter.prototype.hasAttachSkill = function (monster) {
        return monster.attributeComp.ContainsSkill(EnumMonsterPowerType.Attach) || monster.skillComp.ConstainSkill(EnumMonsterPowerType.Attach);
    };
    return AttachDataCenter;
}());
//# sourceMappingURL=AttachDataCenter.js.map