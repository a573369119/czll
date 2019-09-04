/*
* name;
*/
class NotifcationStruct {
    constructor() {

    }
}

/**
 * 比赛资源加载消息体
 */
class PreloadMsgBody {
    public cb: Function;
    public progress: Function;

    constructor(finishCallback: Function, progressCallback: Function) {
        this.cb = finishCallback;
        this.progress = progressCallback;
    }
}

//通用面板数据
class CommonPanelUIParam extends ui.UIParamStruct {
    public context: string;  //显示的内容
    public callback: Function;   //回调
    constructor(id: ui.UIID, str: string, cb?: Function) {
        super(id, null);
        this.context = str;
        this.callback = cb;
    }
}

class HomepageBottomButtonState {
    public buttonID: number;    //按钮ID，按照左 中 右的顺序为0 1 2
    public selected: boolean;   //选中状态
    constructor(buttonID: number, selected: boolean) {
        this.buttonID = buttonID;
        this.selected = selected;
    }
}

//玩家获取/停止buff
class PlayerBuffInfo {
    public BuffType: EnumBuffType;
    public Active: boolean;//true:开始, false:停止
    constructor(type: EnumBuffType, active: boolean) {
        this.BuffType = type;
        this.Active = active;
    }
}

class MoreSpawnUIParam extends ui.UIParamStruct {
    public moneyType: number;   //1金币2钻石
    public spawnID: number;
    constructor(moneyType: number, spawnID: number) {
        super(ui.UIID.MoreSpawnUIID, null, null);
        this.moneyType = moneyType;
        this.spawnID = spawnID;
    }
}

class LevelUIAnimParam {
    public LevelAnimType: EnumLevelUIAnimType;
    public curLevel: number;
}