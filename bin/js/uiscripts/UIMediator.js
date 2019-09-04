var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
* name
*/
var ui;
(function (ui) {
    var UIMediator = (function (_super) {
        __extends(UIMediator, _super);
        function UIMediator() {
            var _this = _super.call(this) || this;
            Facade.getInstance().registerMediator(_this);
            return _this;
        }
        UIMediator.GetInstance = function () {
            if (UIMediator._instance == null) {
                UIMediator._instance = new UIMediator();
            }
            return UIMediator._instance;
        };
        //初始化UI, 加载图集
        //callback 初始化完成回调
        UIMediator.prototype.Init = function (callback) {
            var _this = this;
            this.allUIDic = new Laya.Dictionary();
            this.showUIDic = new Laya.Dictionary();
            //父节点
            this.uiParent = StageManager.GetInstance().uiParent; //初始化层级管理
            this.uiParent.name = "UIParent";
            this.uiParentBottom = this.createParentNode(ZOrderDefine.BOTTOM_UI, "BottomUIParent");
            this.uiParentTop = this.createParentNode(ZOrderDefine.TOP_UI, "TopUIParent");
            this.uiParentMoneyAnim = this.createParentNode(ZOrderDefine.MONEY_ANIM, "MoneyAnimUIParent");
            // this.uiParent = new Laya.Sprite();
            // Laya.stage.addChild(this.uiParent);
            // this.uiParent.zOrder = 100 //默认0会被Scene场景遮挡
            this.initCallback = callback;
            var loadItem = [
                { url: "res/atlas/resources/common.atlas", type: Laya.Loader.ATLAS },
            ];
            if (loadItem.length > 0) {
                ResourceManager.GetInstance().loadResArray(loadItem, function () {
                    _this.onFinishInit();
                });
            }
            else {
                this.onFinishInit();
            }
        };
        //统一初始化的ui图集资源, 时间点可以和common图集的不同
        UIMediator.prototype.GetResItem = function (arrItem) {
            var m_LoadItem = [
                // { url: "res/atlas/resources/commonPanel.atlas", type: Laya.Loader.ATLAS },
                { url: "res/atlas/resources/homepage.atlas", type: Laya.Loader.ATLAS },
                // { url: "res/atlas/resources/player.atlas", type: Laya.Loader.ATLAS },
                { url: "res/atlas/resources/waiting.atlas", type: Laya.Loader.ATLAS },
                { url: "res/atlas/resources/player/planes.atlas", type: Laya.Loader.ATLAS },
                { url: "res/atlas/resources/guide.atlas", type: Laya.Loader.ATLAS },
                { url: "res/atlas/resources/upgrade.atlas", type: Laya.Loader.ATLAS },
                { url: "res/atlas/resources/exchange.atlas", type: Laya.Loader.ATLAS },
                { url: "res/atlas/resources/invitefriend.atlas", type: Laya.Loader.ATLAS },
                { url: "res/atlas/resources/battle.atlas", type: Laya.Loader.ATLAS },
                { url: "res/atlas/resources/setting.atlas", type: Laya.Loader.ATLAS },
                { url: "res/atlas/resources/reborn.atlas", type: Laya.Loader.ATLAS },
                { url: "res/atlas/resources/moneyinfo.atlas", type: Laya.Loader.ATLAS },
                { url: "res/atlas/resources/prop.atlas", type: Laya.Loader.ATLAS },
                { url: "res/atlas/resources/level.atlas", type: Laya.Loader.ATLAS },
                { url: "res/atlas/resources/upgradeAnim.atlas", type: Laya.Loader.ATLAS },
                { url: "res/atlas/resources/result.atlas", type: Laya.Loader.ATLAS },
                { url: "res/atlas/resources/verify.atlas", type: Laya.Loader.ATLAS },
                { url: "res/atlas/resources/lotteryItem.atlas", type: Laya.Loader.ATLAS },
                { url: "res/atlas/resources/coinAnim.atlas", type: Laya.Loader.ATLAS },
                { url: "res/atlas/resources/spawn.atlas", type: Laya.Loader.ATLAS },
                // { url: "res/atlas/resources/monster.atlas", type: Laya.Loader.ATLAS },
                { url: "unpack.json", type: Laya.Loader.JSON },
            ];
            for (var i = 0; i < m_LoadItem.length; i++) {
                arrItem.push(m_LoadItem[i]);
            }
        };
        UIMediator.prototype.onFinishInit = function () {
            if (this.initCallback != null) {
                this.initCallback();
            }
        };
        //end 初始化---
        //打开/关闭------------------------
        UIMediator.prototype.Open = function (id, context) {
            var _this = this;
            if (context === void 0) { context = null; }
            if (this.IsShowing(id))
                return;
            var config = ConfigManager.GetInstance().GetUIConfig(id);
            //图集是否加载, 否则先加载图集
            this.loadAtlasBeforeOpen(id, function () {
                var uictrl = _this.prepareUI(id, _this.getUIParent(config));
                _this.doBeforeUIOpen(id); //打开ui前操作
                uictrl.Open(context);
                _this.AddShowUI(id, uictrl);
            }, config);
        };
        UIMediator.prototype.prepareUI = function (id, parent) {
            var uictrl = this.allUIDic.get(id);
            if (uictrl == null) {
                uictrl = ui.UIFactory.Create(id);
                uictrl.Init(parent, id);
                this.AddInstantiated(id, uictrl);
            }
            return uictrl;
        };
        /**
         * 隐藏ui
         * @param id
         * @param isAuto 是否是UI打开前, 根据配置自动关闭其他
         */
        UIMediator.prototype.Hide = function (id, isAuto) {
            if (isAuto === void 0) { isAuto = false; }
            if (isAuto) {
                //自动关闭, 检测是否会被其他ui关闭
                var config = ConfigManager.GetInstance().GetUIConfig(id);
                if (config && config.uiAutoCloseType == ui.UIAutoCloseType.NotAffectedByOthers)
                    return;
            }
            var uictrl = this.GetShowUI(id);
            if (uictrl != null) {
                uictrl.Hide();
                this.RemoveShowUI(id);
            }
        };
        /**
         * 隐藏全部UI
         * @param isAuto 是否是UI打开前, 根据配置自动关闭其他
         */
        UIMediator.prototype.HideAll = function (isAuto) {
            var _this = this;
            if (isAuto === void 0) { isAuto = false; }
            var idArray = this.showUIDic.keys;
            idArray.forEach(function (id) {
                _this.Hide(id, isAuto);
            });
        };
        //end 打开/关闭---
        //销毁---
        UIMediator.prototype.Destroy = function (id) {
            var uictrl = this.GetInstantiated(id);
            if (uictrl != null) {
                this.Hide(id); //从showuiDic删除
                uictrl.Destroy();
                this.RemoveInstantiated(id);
                this.releaseAtlasOnDestory(id); //卸载图集
                this.releaseUnpackImageOnDestory(id); //卸载散图
            }
        };
        UIMediator.prototype.DestroyAll = function () {
            //复制所有ui的key, 防止循环中删除key
            var keys = [];
            for (var index_1 = 0; index_1 < this.allUIDic.keys.length; index_1++) {
                var element_1 = this.allUIDic.keys[index_1];
                keys.push(element_1);
            }
            //destory所有
            for (var index = 0; index < keys.length; index++) {
                var element = keys[index];
                this.Destroy(element);
            }
            this.showUIDic.clear();
            this.allUIDic.clear();
        };
        //end 销毁------
        //private tools------------------------------------------------------------------------------
        UIMediator.prototype.IsShowing = function (id) {
            return this.showUIDic.get(id) != null;
        };
        UIMediator.prototype.GetShowUI = function (id) {
            return this.showUIDic.get(id);
        };
        UIMediator.prototype.AddShowUI = function (id, showui) {
            this.showUIDic.set(id, showui);
        };
        UIMediator.prototype.RemoveShowUI = function (id) {
            this.showUIDic.remove(id);
        };
        UIMediator.prototype.IsInstantiated = function (id) {
            return this.allUIDic.get(id) != null;
        };
        UIMediator.prototype.GetInstantiated = function (id) {
            return this.allUIDic.get(id);
        };
        UIMediator.prototype.AddInstantiated = function (id, intanceUI) {
            this.allUIDic.set(id, intanceUI);
        };
        UIMediator.prototype.RemoveInstantiated = function (id) {
            this.allUIDic.remove(id);
        };
        /**
         * 打开ui前操作, 关闭其他ui
         * @param id 打开uiid
         */
        UIMediator.prototype.doBeforeUIOpen = function (id) {
            var config = ConfigManager.GetInstance().GetUIConfig(id);
            if (config && config.uiShowType == ui.UIShowType.HideOthers) {
                this.HideAll(true);
            }
        };
        //打开前加载图集
        UIMediator.prototype.loadAtlasBeforeOpen = function (id, comFunc, config) {
            var _this = this;
            if (config && config.atlas != null && config.atlas.trim() != "") {
                var atlasLoaded = ResourceManager.GetInstance().checkResLoaded(config.atlas);
                if (!atlasLoaded) {
                    ResourceManager.GetInstance().loadResArray([config.atlas], function () { return _this.onAtlasLoadedForOpen(comFunc); });
                }
                else {
                    comFunc();
                }
            }
            else {
                //没有图集配置
                comFunc();
            }
        };
        UIMediator.prototype.onAtlasLoadedForOpen = function (comFunc) {
            comFunc();
        };
        //卸载图集
        UIMediator.prototype.releaseAtlasOnDestory = function (id) {
            var config = ConfigManager.GetInstance().GetUIConfig(id);
            if (config && config.atlas != null && config.atlas.trim() != "") {
                ResourceManager.GetInstance().release(config.atlas);
            }
        };
        //卸载ui制作中使用散图
        UIMediator.prototype.releaseUnpackImageOnDestory = function (id) {
            var config = ConfigManager.GetInstance().GetUIConfig(id);
            if (config && config.unpackImagList && config.unpackImagList.length > 0) {
                for (var index = 0; index < config.unpackImagList.length; index++) {
                    var imagePath = config.unpackImagList[index].trim();
                    if (imagePath != "") {
                        ResourceManager.GetInstance().release(imagePath);
                    }
                }
            }
        };
        //创建父节点
        UIMediator.prototype.createParentNode = function (zorder, name) {
            var node = new Laya.Sprite();
            Laya.stage.addChild(node);
            node.name = name;
            node.zOrder = zorder; //默认0会被Scene场景遮挡
            return node;
        };
        //根据配置,获取ui节点
        UIMediator.prototype.getUIParent = function (config) {
            if (config && config.parentType == 1) {
                return this.uiParentBottom;
            }
            else if (config && config.parentType == 2) {
                return this.uiParentTop;
            }
            else {
                return this.uiParent;
            }
        };
        //end private tools------------------------------------------------------------------------------
        //Mediator---
        /**
         * @override
         */
        UIMediator.prototype.listNotificationInterests = function () {
            return [
                NotificationNames.OPENUI,
                NotificationNames.OPENUIWITHPARAM,
                NotificationNames.HIDEUI,
                NotificationNames.DESTROYUI,
                NotificationNames.DESTROYALLUI,
                NotificationNames.HIDEALLUI,
            ];
        };
        /**
         * @override
         */
        UIMediator.prototype.handleNotification = function (note) {
            switch (note.getName()) {
                case NotificationNames.OPENUI:
                    {
                        var id = note.getBody();
                        this.Open(id);
                        break;
                    }
                case NotificationNames.OPENUIWITHPARAM:
                    {
                        var param = note.getBody();
                        this.Open(param.ID, param);
                        break;
                    }
                case NotificationNames.HIDEUI:
                    {
                        var id = note.getBody();
                        this.Hide(id);
                        break;
                    }
                case NotificationNames.DESTROYUI:
                    {
                        var id = note.getBody();
                        this.Destroy(id);
                        break;
                    }
                case NotificationNames.DESTROYALLUI:
                    {
                        this.DestroyAll();
                        break;
                    }
                case NotificationNames.HIDEALLUI:
                    {
                        this.HideAll();
                        break;
                    }
            }
        };
        return UIMediator;
    }(puremvc.Mediator));
    ui.UIMediator = UIMediator;
})(ui || (ui = {}));
//# sourceMappingURL=UIMediator.js.map