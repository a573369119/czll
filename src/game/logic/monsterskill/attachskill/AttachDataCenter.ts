/*
* name;
*/
class AttachDataCenter {
    private static _instace: AttachDataCenter;

    public static get Instance(): AttachDataCenter {
        if (AttachDataCenter._instace == null) {
            AttachDataCenter._instace = new AttachDataCenter();
        }
        return AttachDataCenter._instace;
    }

    public attachCenters: AttachTree[] = []

    public OnEnterMatch() {
        this.attachCenters = [];
    }

    public AddAttach(parentMonster: Monster, childMonster: Monster): AttachTree {
        let parent = this.GetAttachCenter(parentMonster.UID);
        if (parent == null) {
            parent = this.CreateTree(parentMonster.UID);
            this.attachCenters.push(parent);
        }

        //找到子节点
        let child = this.GetAttachCenter(childMonster.UID);
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
        parentMonster.AddChild(childMonster.comParent)
        childMonster.monsterMoveComp.monsterStop();
        //设置子物体的位置.

        Log.Debug("怪物uid%i,attach到父节点%i", childMonster.UID, parentMonster.UID)
        return child;
    }

    //parentMonster死亡, 删除parentMonster下的节点
    public RemoveAttach(parentMonster: Monster) {
        let targetMonster = this.GetAttachCenter(parentMonster.UID);
        if (targetMonster == null) return;//怪物没有依附

        Log.Debug("怪物uid%i死亡删除attach, 父节点%i", parentMonster.UID, targetMonster.parent ? targetMonster.parent.uid : -1)
        //父节点删除该怪物
        targetMonster.RemoveFromParent();
        // parentMonster.comParent.removeSelf();

        //该节点的子节点, 自由
        for (let index = 0; index < targetMonster.childs.length; index++) {
            let child = targetMonster.childs[index];
            this.attachCenters.push(child);
            child.parent = null;
            //切回stage节点
            let monster = PlayerManager.GetInstance().GetMonsterByUid(child.uid);
            if (monster == null) {
                Log.Error("remove atach error")
            }
            monster.AddToStage();
            monster.monsterMoveComp.monsterRandomMove();
        }
    }

    public IsUnderSameParent(monster1: Monster, monster2: Monster) {
        let targetMonster1 = this.GetAttachCenter(monster1.UID);
        let targetMonster2 = this.GetAttachCenter(monster2.UID);
        return targetMonster1 && targetMonster2 && targetMonster1.IsUnderSameParent(targetMonster2)
    }

    public GetAttachCenter(uid: number): AttachTree {
        for (let index = 0; index < this.attachCenters.length; index++) {
            let center = this.attachCenters[index];
            let findTree = this.findInTree(center, uid);
            if (findTree) return findTree;
        }
        return null;
    }

    //子树是否满
    private IsChildTreeFull(monster: Monster, fullNum: number): boolean {
        let targetMonster1 = this.GetAttachCenter(monster.UID);
        if (targetMonster1 == null) return false;
        let parent = targetMonster1.GetTopParent();
        return parent.GetTotalChildCount() >= fullNum;
    }

    private findInTree(tree: AttachTree, uid: number): AttachTree {
        if (tree.uid == uid) return tree;

        for (let index = 0; index < tree.childs.length; index++) {
            let child = tree.childs[index];
            let findTree = this.findInTree(child, uid)
            if (findTree) return findTree;
        }

        return null;
    }

    private CreateTree(uid: number): AttachTree {
        let tree = new AttachTree();
        tree.uid = uid;
        return tree;
    }


    private lastAttachCheckTime: number = 0;
    private lastFrameNo: number = 0;
    public CheckAttach(interval: number, fullNum: number = 100) {
        let now = new Date().getTime();
        let curFrame = Laya.timer.currFrame;
        if (now - this.lastAttachCheckTime >= interval * 1000 && curFrame > this.lastFrameNo) {
            this.lastAttachCheckTime = now;
            this.lastFrameNo = curFrame;
            // Log.Debug("检测attach")
            let attachChangedMonsters = []; //已经切换过一次的怪物, 不多次切换
            let monsters = PlayerManager.GetInstance().GetAllSpawnedMonster();
            for (let index = 0; index < monsters.length - 1; index++) {
                let monster1 = monsters[index];
                let monster1ContainAttackSkill = this.hasAttachSkill(monster1);
                if (monster1ContainAttackSkill && this.IsChildTreeFull(monster1, fullNum)) continue; //子树满 不能再粘附子怪
                // if (!this.hasAttachSkill(monster1)) continue;//没attach技能就跳过
                for (let j = index + 1; j < monsters.length; j++) {
                    let monster2 = monsters[j];
                    let monster2ContainAttackSkill = this.hasAttachSkill(monster2);
                    if (!monster1ContainAttackSkill && !monster2ContainAttackSkill) continue; //两个都没attach技能就跳过
                    if (monster2ContainAttackSkill && this.IsChildTreeFull(monster2, fullNum)) continue;//另一个怪物子树也满, 不能粘附子怪
                    if (!monster1.IsAlive()) continue;
                    if (!monster2.IsAlive()) continue;
                    if (monster1.UID == monster2.UID) continue;
                    if (attachChangedMonsters.indexOf(monster2.UID) >= 0) continue;//已经切换过一次的不重复切换
                    if (AttachDataCenter.Instance.IsUnderSameParent(monster1, monster2)) continue;//同个父节点不检查

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

                    let collisionInfo = monster1.GetCollisionShapeInfo(true) as BoxCollisonInfo;
                    if (CommonUtil.IsBoxCrossed(collisionInfo, monster2.GetCollisionShapeInfo(true) as BoxCollisonInfo)) {
                        //谁有attach技能 谁是否父节点
                        if (monster1ContainAttackSkill) {
                            this.Attach(monster1, monster2) //检测到一个就结束
                        } else {
                            this.Attach(monster2, monster1) //检测到一个就结束
                        }

                        attachChangedMonsters.push(monster2.UID)
                    }
                }
            }


        }

    }

    private Attach(parent: Monster, child: Monster) {
        AttachDataCenter.Instance.AddAttach(parent, child);
        if (!this.hasAttachSkill(child)) {
            // if (!child.skillComp.ConstainSkill(EnumMonsterPowerId.Attach)) {
            let skill = parent.skillComp.GetSkill(EnumMonsterPowerType.Attach) as AttachSkill;
            //let skillConfig = skill.Config; //parent.skillComp.GetSkill(EnumMonsterPowerType.Attach); //parent.attributeComp.GetSkill(EnumMonsterPowerType.Attach);
            child.skillComp.Start(EnumMonsterPowerType.Attach, skill.Config);
        }
    }
    private hasAttachSkill(monster: Monster): boolean {
        return monster.attributeComp.ContainsSkill(EnumMonsterPowerType.Attach) || monster.skillComp.ConstainSkill(EnumMonsterPowerType.Attach)
    }
}
