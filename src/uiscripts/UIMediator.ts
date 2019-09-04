/**
* name 
*/
module ui {
	export class UIMediator extends puremvc.Mediator {

		private initCallback: Function;

		public uiParentBottom: Laya.Sprite;//底层父节点, 所有ui都在游戏最底层
		public uiParentTop: Laya.Sprite;//顶层父节点, 所有ui都在游戏最顶层
		public uiParentMoneyAnim: Laya.Sprite;	//钱币动画父节点，9999高度
		public uiParent: Laya.Sprite; //UI的父节点
		private allUIDic: Laya.Dictionary;
		private showUIDic: Laya.Dictionary;

		private static _instance: UIMediator;
		public static GetInstance(): UIMediator {
			if (UIMediator._instance == null) {
				UIMediator._instance = new UIMediator();
			}
			return UIMediator._instance;
		}

		constructor() {
			super();
			Facade.getInstance().registerMediator(this);
		}

		//初始化UI, 加载图集
		//callback 初始化完成回调
		public Init(callback: () => void): void {
			this.allUIDic = new Laya.Dictionary();
			this.showUIDic = new Laya.Dictionary();
			//父节点
			this.uiParent = StageManager.GetInstance().uiParent //初始化层级管理
			this.uiParent.name = "UIParent";
			this.uiParentBottom = this.createParentNode(ZOrderDefine.BOTTOM_UI, "BottomUIParent");
			this.uiParentTop = this.createParentNode(ZOrderDefine.TOP_UI, "TopUIParent");
			this.uiParentMoneyAnim = this.createParentNode(ZOrderDefine.MONEY_ANIM, "MoneyAnimUIParent");
			// this.uiParent = new Laya.Sprite();
			// Laya.stage.addChild(this.uiParent);
			// this.uiParent.zOrder = 100 //默认0会被Scene场景遮挡


			this.initCallback = callback;

			var loadItem =
				[
					{ url: "res/atlas/resources/common.atlas", type: Laya.Loader.ATLAS },
				]

			if (loadItem.length > 0) {
				ResourceManager.GetInstance().loadResArray(loadItem, () => {
					this.onFinishInit();
				})
			} else {
				this.onFinishInit();
			}
		}

		//统一初始化的ui图集资源, 时间点可以和common图集的不同
		public GetResItem(arrItem) {
			var m_LoadItem =
				[
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
				]
			for (let i: number = 0; i < m_LoadItem.length; i++) {
				arrItem.push(m_LoadItem[i]);
			}
		}

		private onFinishInit(): void {
			if (this.initCallback != null) {
				this.initCallback();
			}
		}
		//end 初始化---

		//打开/关闭------------------------
		public Open(id: ui.UIID, context: WindowContextDataBase = null): void {
			if (this.IsShowing(id)) return;
			let config = ConfigManager.GetInstance().GetUIConfig(id);
			//图集是否加载, 否则先加载图集
			this.loadAtlasBeforeOpen(id, () => {
				let uictrl = this.prepareUI(id, this.getUIParent(config));
				this.doBeforeUIOpen(id);//打开ui前操作
				uictrl.Open(context);
				this.AddShowUI(id, uictrl);
			}, config)
		}

		private prepareUI(id: ui.UIID, parent: Laya.Sprite): ui.BaseUICtrl {
			let uictrl = this.allUIDic.get(id) as ui.BaseUICtrl;
			if (uictrl == null) {
				uictrl = ui.UIFactory.Create(id);
				uictrl.Init(parent, id);
				this.AddInstantiated(id, uictrl)
			}
			return uictrl;
		}

		/**
		 * 隐藏ui
		 * @param id 
		 * @param isAuto 是否是UI打开前, 根据配置自动关闭其他 
		 */
		public Hide(id: ui.UIID, isAuto: boolean = false): void {
			if (isAuto) {
				//自动关闭, 检测是否会被其他ui关闭
				let config = ConfigManager.GetInstance().GetUIConfig(id);
				if (config && config.uiAutoCloseType == UIAutoCloseType.NotAffectedByOthers) return;
			}
			let uictrl = this.GetShowUI(id);
			if (uictrl != null) {
				uictrl.Hide();
				this.RemoveShowUI(id);
			}
		}

		/**
		 * 隐藏全部UI
		 * @param isAuto 是否是UI打开前, 根据配置自动关闭其他 
		 */
		public HideAll(isAuto: boolean = false) {
			let idArray = this.showUIDic.keys;
			idArray.forEach(id => {
				this.Hide(id, isAuto)
			});
		}
		//end 打开/关闭---

		//销毁---
		public Destroy(id: ui.UIID): void {
			let uictrl = this.GetInstantiated(id);
			if (uictrl != null) {
				this.Hide(id);//从showuiDic删除
				uictrl.Destroy();
				this.RemoveInstantiated(id);
				this.releaseAtlasOnDestory(id)//卸载图集
				this.releaseUnpackImageOnDestory(id)//卸载散图
			}
		}

		public DestroyAll() {
			//复制所有ui的key, 防止循环中删除key
			let keys = []
			for (let index = 0; index < this.allUIDic.keys.length; index++) {
				let element = this.allUIDic.keys[index];
				keys.push(element)
			}
			//destory所有
			for (var index = 0; index < keys.length; index++) {
				var element = keys[index];
				this.Destroy(element)
			}
			this.showUIDic.clear();
			this.allUIDic.clear();
		}
		//end 销毁------

		//private tools------------------------------------------------------------------------------

		private IsShowing(id: ui.UIID): boolean {
			return this.showUIDic.get(id) != null;
		}
		private GetShowUI(id: ui.UIID): ui.BaseUICtrl {
			return this.showUIDic.get(id) as ui.BaseUICtrl;
		}
		private AddShowUI(id: ui.UIID, showui: ui.BaseUICtrl) {
			this.showUIDic.set(id, showui);
		}
		private RemoveShowUI(id: ui.UIID) {
			this.showUIDic.remove(id);
		}

		private IsInstantiated(id: ui.UIID): boolean {
			return this.allUIDic.get(id) != null;
		}
		private GetInstantiated(id: ui.UIID): ui.BaseUICtrl {
			return this.allUIDic.get(id) as ui.BaseUICtrl;
		}
		private AddInstantiated(id: ui.UIID, intanceUI: ui.BaseUICtrl) {
			this.allUIDic.set(id, intanceUI);
		}
		private RemoveInstantiated(id: ui.UIID) {
			this.allUIDic.remove(id);
		}

		/**
		 * 打开ui前操作, 关闭其他ui
		 * @param id 打开uiid
		 */
		private doBeforeUIOpen(id: ui.UIID) {
			let config = ConfigManager.GetInstance().GetUIConfig(id);
			if (config && config.uiShowType == UIShowType.HideOthers) {
				this.HideAll(true);
			}
		}

		//打开前加载图集
		private loadAtlasBeforeOpen(id: ui.UIID, comFunc: Function, config: UIInfoConfigData) {
			if (config && config.atlas != null && config.atlas.trim() != "") {
				let atlasLoaded = ResourceManager.GetInstance().checkResLoaded(config.atlas);
				if (!atlasLoaded) {
					ResourceManager.GetInstance().loadResArray([config.atlas], () => this.onAtlasLoadedForOpen(comFunc));
				} else {
					comFunc();
				}
			} else {
				//没有图集配置
				comFunc();
			}
		}
		private onAtlasLoadedForOpen(comFunc: Function) {
			comFunc();
		}
		//卸载图集
		private releaseAtlasOnDestory(id: ui.UIID) {
			let config = ConfigManager.GetInstance().GetUIConfig(id);
			if (config && config.atlas != null && config.atlas.trim() != "") {
				ResourceManager.GetInstance().release(config.atlas)
			}
		}
		//卸载ui制作中使用散图
		private releaseUnpackImageOnDestory(id: ui.UIID) {
			let config = ConfigManager.GetInstance().GetUIConfig(id);
			if (config && config.unpackImagList && config.unpackImagList.length > 0) {
				for (let index = 0; index < config.unpackImagList.length; index++) {
					let imagePath = config.unpackImagList[index].trim();
					if (imagePath != "") {
						ResourceManager.GetInstance().release(imagePath)
					}
				}
			}
		}
		//创建父节点
		private createParentNode(zorder: number, name: string): Laya.Sprite {
			let node = new Laya.Sprite();
			Laya.stage.addChild(node);
			node.name = name;
			node.zOrder = zorder;//默认0会被Scene场景遮挡
			return node;
		}
		//根据配置,获取ui节点
		private getUIParent(config: UIInfoConfigData): Laya.Sprite {
			if (config && config.parentType == 1) {
				return this.uiParentBottom
			} else if (config && config.parentType == 2) {
				return this.uiParentTop
			} else {
				return this.uiParent;
			}
		}
		//end private tools------------------------------------------------------------------------------

		//Mediator---
		/**
		 * @override
		 */
		listNotificationInterests(): string[] {
			return [
				NotificationNames.OPENUI,
				NotificationNames.OPENUIWITHPARAM,
				NotificationNames.HIDEUI,
				NotificationNames.DESTROYUI,
				NotificationNames.DESTROYALLUI,
				NotificationNames.HIDEALLUI,
			];
		}

		/**
		 * @override
		 */
		handleNotification(note: puremvc.INotification): void {
			switch (note.getName()) {
				case NotificationNames.OPENUI:
					{
						let id = note.getBody() as ui.UIID;
						this.Open(id);
						break;
					}
				case NotificationNames.OPENUIWITHPARAM:
					{
						let param = note.getBody() as ui.UIParamStruct;
						this.Open(param.ID, param);
						break;
					}
				case NotificationNames.HIDEUI:
					{
						let id = note.getBody() as ui.UIID;
						this.Hide(id);
						break;
					}
				case NotificationNames.DESTROYUI:
					{
						let id = note.getBody() as ui.UIID;
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
		}
		//end Mediator---
	}
}