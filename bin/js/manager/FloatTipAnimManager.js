/**
 * 浮字动画类型
 */
var EnumFloatAnimType;
(function (EnumFloatAnimType) {
    EnumFloatAnimType[EnumFloatAnimType["UpgradeTip"] = 0] = "UpgradeTip";
    EnumFloatAnimType[EnumFloatAnimType["LotteryTip"] = 1] = "LotteryTip";
})(EnumFloatAnimType || (EnumFloatAnimType = {}));
/**
* 浮字提示动画管理器
*/
var FloatTipAnimManager = (function () {
    function FloatTipAnimManager() {
        this.tipGroupDic = new Laya.Dictionary();
        this.upgradeItemPool = new Array();
        this.lotteryItemPool = new Array();
    }
    Object.defineProperty(FloatTipAnimManager, "Instance", {
        get: function () {
            if (this._instance == null) {
                this._instance = new FloatTipAnimManager();
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 创建一个浮字提示组，同一个提示组内最多同时出现3条提示。
     */
    FloatTipAnimManager.prototype.CreateTipGroup = function (floatType) {
        //1.在字典中查找最后一个
        var keyLength = this.tipGroupDic.keys.length;
        var groupID = -1;
        if (keyLength <= 0) {
            groupID = 0;
        }
        else {
            groupID = this.tipGroupDic.keys[keyLength - 1] + 1;
        }
        //新建一个组
        this.tipGroupDic.set(groupID, new FloatTipGroup(groupID, floatType));
        return groupID;
    };
    /**
     * 指定某个组，创建一条提示
     * @param groupID 提示组id
     * @param message 显示内容
     * @param pos 产生位置
     */
    FloatTipAnimManager.prototype.AddTip = function (groupID, message, pos, parent, needExtra) {
        if (needExtra === void 0) { needExtra = true; }
        //1.寻找是否有这个组
        var floatTipGroup = this.tipGroupDic.get(groupID);
        if (!floatTipGroup) {
            Log.Error("FloatTipAnimManager 未找到指定组ID：", groupID);
            return;
        }
        floatTipGroup.AddTip(message, pos, parent, needExtra);
    };
    /**
     * 清除某个组内的所有item
     * @param groupID 组id
     */
    FloatTipAnimManager.prototype.DeleteAllItemByGroupID = function (groupID) {
        var floatTipGroup = this.tipGroupDic.get(groupID);
        if (floatTipGroup) {
            floatTipGroup.DeleteAll();
        }
    };
    //池功能：创建
    FloatTipAnimManager.prototype.CreateUpgradeItem = function () {
        var item = this.upgradeItemPool.pop();
        if (!item) {
            item = new FloatTipItem_Upgrade();
        }
        return item;
    };
    FloatTipAnimManager.prototype.CreateLotteryItem = function () {
        var item = this.lotteryItemPool.pop();
        if (!item) {
            item = new FloatTipItem_Lottery();
        }
        return item;
    };
    //池功能：销毁
    FloatTipAnimManager.prototype.DeleteUpgradeItem = function (item) {
        item.removeSelf();
        this.upgradeItemPool.push(item);
    };
    FloatTipAnimManager.prototype.DeleteLotteryItem = function (item) {
        item.removeSelf();
        this.lotteryItemPool.push(item);
    };
    return FloatTipAnimManager;
}());
//提示组
var FloatTipGroup = (function () {
    function FloatTipGroup(groupID, animType) {
        //图片预存
        this.upgradeTipSkin = "resources/common/img_floatTip.png";
        this.lotteryTipSkin = "resources/common/img_black.png";
        this.groupID = groupID;
        this.upgradeList = new Array();
        this.lotteryList = new Array();
        this.animType = animType;
        // switch (this.animType) {
        //     case EnumFloatAnimType.UpgradeTip: {
        //         this.tipSkin = this.upgradeTipSkin;
        //         this.tipBottom = 0;
        //         this.tipWidth = 106;
        //         this.tipHeight = 41;
        //         break;
        //     }
        //     case EnumFloatAnimType.LotteryTip: {
        //         this.tipSkin = this.lotteryTipSkin;
        //         this.tipBottom = 0;
        //         this.tipWidth = 500;
        //         this.tipHeight = 60;
        //         break;
        //     }
        //     default:
        //         break;
        // }
    }
    /**
     * 增加提示
     * @param message 提示内容
     * @param pos 位置(相对于parent)
     * @param parent 父节点(默认为ui.UIMediator.GetInstance().uiParentMoneyAnim)
     */
    FloatTipGroup.prototype.AddTip = function (message, pos, parent, needExtra) {
        if (needExtra === void 0) { needExtra = true; }
        switch (this.animType) {
            case EnumFloatAnimType.UpgradeTip: {
                this.UpgradeTip_AddTip(message, pos, parent, needExtra);
                break;
            }
            case EnumFloatAnimType.LotteryTip: {
                this.LotteryTip_AddTip(message, pos, parent);
                break;
            }
        }
    };
    /**
     * 升级提示类型的相关动画
     * @param message
     * @param pos
     * @param parent
     */
    FloatTipGroup.prototype.UpgradeTip_AddTip = function (message, pos, parent, needExtra) {
        var _this = this;
        if (needExtra === void 0) { needExtra = true; }
        //0.判断并移除最后一个，其他的item向上移动
        if (this.upgradeList.length >= 3) {
            var oldItem = this.upgradeList.shift();
            oldItem.DeleteItem();
            FloatTipAnimManager.Instance.DeleteUpgradeItem(oldItem);
        }
        for (var i = 0; i < this.upgradeList.length; i++) {
            var element = this.upgradeList[i];
            element.UpgradeTipAnim_FloatUp();
        }
        //1.创建一个item
        var newItem = FloatTipAnimManager.Instance.CreateUpgradeItem();
        newItem.InitItem(message, needExtra);
        if (parent) {
            parent.addChild(newItem);
        }
        else {
            ui.UIMediator.GetInstance().uiParentMoneyAnim.addChild(newItem);
        }
        newItem.pos(pos.x, pos.y);
        //2.销毁时间
        newItem.deleteTimeTask = TimeManager.getInst().once(3, cbhandler.gen_handler(function () {
            //3秒后消失
            //直接排除列表中最上方的那个
            var aimItem = _this.upgradeList.shift();
            if (aimItem) {
                aimItem.UpgradeTipAnim_Alpha(cbhandler.gen_handler(function () {
                    aimItem.DeleteItem();
                    FloatTipAnimManager.Instance.DeleteUpgradeItem(aimItem);
                }, _this));
            }
        }, this));
        //3.初始动画
        newItem.UpgradeTipAnim_Scale();
        //4.添加新的引用
        this.upgradeList.push(newItem);
    };
    /**
     * 转盘提示类型的相关动画
     * @param message
     * @param pos
     * @param parent
     */
    FloatTipGroup.prototype.LotteryTip_AddTip = function (message, pos, parent) {
        var _this = this;
        //转盘动画，如果有上一个则立刻执行上浮消失动画。新的动画立刻出现并在0.5秒后执行上浮消失动画
        if (this.lotteryList.length >= 1) {
            var oldItem_1 = this.lotteryList.shift();
            if (oldItem_1.deleteTimeTask != -1) {
                TimeManager.getInst().remove(oldItem_1.deleteTimeTask);
                oldItem_1.deleteTimeTask = -1;
            }
            oldItem_1.LotteryTipAnim_Disappear(cbhandler.gen_handler(function () {
                oldItem_1.DeleteItem();
                FloatTipAnimManager.Instance.DeleteLotteryItem(oldItem_1);
            }, this));
        }
        //1.创建一个item
        var newItem = FloatTipAnimManager.Instance.CreateLotteryItem();
        newItem.InitItem(message);
        if (parent) {
            parent.addChild(newItem);
        }
        else {
            ui.UIMediator.GetInstance().uiParentMoneyAnim.addChild(newItem);
        }
        newItem.pos(pos.x, pos.y);
        //2.销毁时间
        newItem.deleteTimeTask = TimeManager.getInst().once(0.5, cbhandler.gen_handler(function () {
            //0.5秒后消失
            //直接排除列表中最上方的那个
            var aimItem = _this.lotteryList.shift();
            if (aimItem) {
                aimItem.LotteryTipAnim_Disappear(cbhandler.gen_handler(function () {
                    aimItem.DeleteItem();
                    FloatTipAnimManager.Instance.DeleteLotteryItem(aimItem);
                }, _this));
            }
        }, this));
        //3.初始动画
        newItem.LotteryTipAnim_Appear();
        //4.添加新的引用
        this.lotteryList.push(newItem);
    };
    FloatTipGroup.prototype.DeleteAll = function () {
        //清空全部列表
        var length = this.upgradeList.length;
        for (var index = 0; index < length; index++) {
            var item = this.upgradeList.shift();
            if (item) {
                item.DeleteItem();
                FloatTipAnimManager.Instance.DeleteUpgradeItem(item);
            }
        }
        length = this.lotteryList.length;
        for (var index = 0; index < length; index++) {
            var item = this.lotteryList.shift();
            if (item) {
                item.DeleteItem();
                FloatTipAnimManager.Instance.DeleteLotteryItem(item);
            }
        }
    };
    return FloatTipGroup;
}());
//# sourceMappingURL=FloatTipAnimManager.js.map