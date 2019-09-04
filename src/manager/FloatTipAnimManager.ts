/**
 * 浮字动画类型
 */
enum EnumFloatAnimType {
    UpgradeTip,     //升级提示
    LotteryTip,     //抽奖提示
}


/**
* 浮字提示动画管理器
*/
class FloatTipAnimManager {
    private static _instance: FloatTipAnimManager;
    public static get Instance(): FloatTipAnimManager {
        if (this._instance == null) {
            this._instance = new FloatTipAnimManager();
        }
        return this._instance;
    }

    constructor() {
        this.tipGroupDic = new Laya.Dictionary();
        this.upgradeItemPool = new Array<FloatTipItem_Upgrade>();
        this.lotteryItemPool = new Array<FloatTipItem_Lottery>();
    }

    //提示组字典
    private tipGroupDic: Laya.Dictionary;
    //upgradeItem池
    private upgradeItemPool: Array<FloatTipItem_Upgrade>;
    //LotteryItem池
    private lotteryItemPool: Array<FloatTipItem_Lottery>;

    /**
     * 创建一个浮字提示组，同一个提示组内最多同时出现3条提示。
     */
    public CreateTipGroup(floatType: EnumFloatAnimType): number {
        //1.在字典中查找最后一个
        let keyLength = this.tipGroupDic.keys.length;
        let groupID: number = -1;
        if (keyLength <= 0) {
            groupID = 0
        } else {
            groupID = (this.tipGroupDic.keys[keyLength - 1] as number) + 1;
        }
        //新建一个组
        this.tipGroupDic.set(groupID, new FloatTipGroup(groupID, floatType));
        return groupID;
    }

    /**
     * 指定某个组，创建一条提示
     * @param groupID 提示组id
     * @param message 显示内容
     * @param pos 产生位置
     */
    public AddTip(groupID: number, message: string, pos: Vec2, parent?: Laya.Box, needExtra = true) {
        //1.寻找是否有这个组
        let floatTipGroup = this.tipGroupDic.get(groupID) as FloatTipGroup;
        if (!floatTipGroup) {
            Log.Error("FloatTipAnimManager 未找到指定组ID：", groupID);
            return;
        }
        floatTipGroup.AddTip(message, pos, parent, needExtra);
    }


    /**
     * 清除某个组内的所有item
     * @param groupID 组id
     */
    public DeleteAllItemByGroupID(groupID: number) {
        let floatTipGroup = this.tipGroupDic.get(groupID) as FloatTipGroup;
        if (floatTipGroup) {
            floatTipGroup.DeleteAll();
        }
    }


    //池功能：创建
    public CreateUpgradeItem(): FloatTipItem_Upgrade {
        let item = this.upgradeItemPool.pop();
        if (!item) {
            item = new FloatTipItem_Upgrade();
        }
        return item;
    }
    public CreateLotteryItem(): FloatTipItem_Lottery {
        let item = this.lotteryItemPool.pop();
        if (!item) {
            item = new FloatTipItem_Lottery();
        }
        return item;
    }

    //池功能：销毁
    public DeleteUpgradeItem(item: FloatTipItem_Upgrade) {
        item.removeSelf();
        this.upgradeItemPool.push(item);
    }
    public DeleteLotteryItem(item: FloatTipItem_Lottery) {
        item.removeSelf();
        this.lotteryItemPool.push(item);
    }
}

//提示组
class FloatTipGroup {
    public groupID: number;
    public upgradeList: Array<FloatTipItem_Upgrade>;
    public lotteryList: Array<FloatTipItem_Lottery>;

    // private tipSkin: string;
    // private tipWidth: number;
    // private tipHeight: number;
    // private tipBottom: number;
    private animType: EnumFloatAnimType;

    //图片预存
    private readonly upgradeTipSkin: string = "resources/common/img_floatTip.png";
    private readonly lotteryTipSkin: string = "resources/common/img_black.png";

    constructor(groupID: number, animType: EnumFloatAnimType) {
        this.groupID = groupID;
        this.upgradeList = new Array<FloatTipItem_Upgrade>();
        this.lotteryList = new Array<FloatTipItem_Lottery>();

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
    public AddTip(message: string, pos: Vec2, parent?: Laya.Box, needExtra = true) {
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
    }

    /**
     * 升级提示类型的相关动画
     * @param message 
     * @param pos 
     * @param parent 
     */
    private UpgradeTip_AddTip(message: string, pos: Vec2, parent?: Laya.Box, needExtra = true) {
        //0.判断并移除最后一个，其他的item向上移动
        if (this.upgradeList.length >= 3) {
            let oldItem = this.upgradeList.shift();
            oldItem.DeleteItem();
            FloatTipAnimManager.Instance.DeleteUpgradeItem(oldItem);
        }
        for (let i = 0; i < this.upgradeList.length; i++) {
            let element = this.upgradeList[i];
            element.UpgradeTipAnim_FloatUp()
        }
        //1.创建一个item
        let newItem = FloatTipAnimManager.Instance.CreateUpgradeItem();
        newItem.InitItem(message, needExtra);
        if (parent) {
            parent.addChild(newItem);
        } else {
            ui.UIMediator.GetInstance().uiParentMoneyAnim.addChild(newItem);
        }
        newItem.pos(pos.x, pos.y);
        //2.销毁时间
        newItem.deleteTimeTask = TimeManager.getInst().once(3, cbhandler.gen_handler(() => {
            //3秒后消失
            //直接排除列表中最上方的那个
            let aimItem = this.upgradeList.shift();
            if (aimItem) {
                aimItem.UpgradeTipAnim_Alpha(cbhandler.gen_handler(() => {
                    aimItem.DeleteItem();
                    FloatTipAnimManager.Instance.DeleteUpgradeItem(aimItem);
                }, this))
            }
        }, this));
        //3.初始动画
        newItem.UpgradeTipAnim_Scale();
        //4.添加新的引用
        this.upgradeList.push(newItem);
    }

    /**
     * 转盘提示类型的相关动画
     * @param message 
     * @param pos 
     * @param parent 
     */
    private LotteryTip_AddTip(message: string, pos: Vec2, parent?: Laya.Box) {
        //转盘动画，如果有上一个则立刻执行上浮消失动画。新的动画立刻出现并在0.5秒后执行上浮消失动画
        if (this.lotteryList.length >= 1) {
            let oldItem = this.lotteryList.shift();
            if (oldItem.deleteTimeTask != -1) {
                TimeManager.getInst().remove(oldItem.deleteTimeTask);
                oldItem.deleteTimeTask = -1;
            }
            oldItem.LotteryTipAnim_Disappear(cbhandler.gen_handler(() => {
                oldItem.DeleteItem();
                FloatTipAnimManager.Instance.DeleteLotteryItem(oldItem);
            }, this));
        }
        //1.创建一个item
        let newItem = FloatTipAnimManager.Instance.CreateLotteryItem();
        newItem.InitItem(message);
        if (parent) {
            parent.addChild(newItem);
        } else {
            ui.UIMediator.GetInstance().uiParentMoneyAnim.addChild(newItem);
        }
        newItem.pos(pos.x, pos.y);
        //2.销毁时间
        newItem.deleteTimeTask = TimeManager.getInst().once(0.5, cbhandler.gen_handler(() => {
            //0.5秒后消失
            //直接排除列表中最上方的那个
            let aimItem = this.lotteryList.shift();
            if (aimItem) {
                aimItem.LotteryTipAnim_Disappear(cbhandler.gen_handler(() => {
                    aimItem.DeleteItem();
                    FloatTipAnimManager.Instance.DeleteLotteryItem(aimItem);
                }, this));
            }
        }, this));
        //3.初始动画
        newItem.LotteryTipAnim_Appear();
        //4.添加新的引用
        this.lotteryList.push(newItem);
    }

    public DeleteAll() {
        //清空全部列表
        let length = this.upgradeList.length;
        for (let index = 0; index < length; index++) {
            let item = this.upgradeList.shift();
            if (item) {
                item.DeleteItem();
                FloatTipAnimManager.Instance.DeleteUpgradeItem(item);
            }
        }

        length = this.lotteryList.length;
        for (let index = 0; index < length; index++) {
            let item = this.lotteryList.shift();
            if (item) {
                item.DeleteItem();
                FloatTipAnimManager.Instance.DeleteLotteryItem(item);
            }
        }

    }


}
