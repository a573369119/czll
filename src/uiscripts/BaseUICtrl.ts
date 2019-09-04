import Mediator = puremvc.Mediator;
import Tween = Laya.Tween;
import Handler = Laya.Handler;
import Facade = puremvc.Facade;

/**
* name 
*/
module ui {

	//打开ui传递参数的基类
	export class WindowContextDataBase {
		public ExecuteNavLogic = true; // 打开UI的时候, 是否一定执行导航相关操作
		public OnOpenCallback: Function
		constructor(onOpenCallback: Function, navLogic: boolean = true) {
			this.OnOpenCallback = onOpenCallback;
			this.ExecuteNavLogic = navLogic;
		}
	}

	//UI配置
	export class WindowConfigData {
		public uiid: ui.UIID = 0;
		public uiOpenAnimType = UIAnim.None; //ui动画
		public uiCloseAnimType = UIAnim.None;
		public uiShowType = UIShowType.DoNothing;// todo
		public depth: number = 0;//层级越大, 越在上面
		//每一个uiView的背景
		public showImageBG: boolean = false;
		public imageBGPath: string = "";
		public imageBGSizeGrid: string = "0,0,0,0,1";	//图片的grid

	}

	export enum UIShowType {
		DoNothing,
		HideOthers,// 打开界面关闭其他界面
		DestoryOthers,
	}

	export enum UIAutoCloseType {
		AffectedByOthers = 0, //会被其他UI关闭或销毁
		NotAffectedByOthers = 1,
	}

	export enum UIAnim {
		None = 0,
		PopOpen,//由小到大, 弹出, UI需要设置anchorX和anchorY = 0.5
		PopClose,//由大到小, 关闭
		Custom,
	}

	export class BaseUICtrl extends Mediator {
		protected uiView: View;
		protected uiConfig: WindowConfigData;
		protected uiBG: Laya.Image;	//UI的背景图片，用于做动态加载
		constructor(view: View) {
			super();
			this.uiView = view;
		}

		//UI Prepare的时候使用
		public Init(parent: Laya.Sprite, id: ui.UIID) {
			//ui配置
			this.uiConfig = this.GetUIWindowConfigData(id);
			if (this.uiConfig.showImageBG) {
				this.uiBG = new Laya.Image();
				this.uiBG.name = "uibg"
				this.uiBG.zOrder = -1;
				this.uiBG.skin = this.uiConfig.imageBGPath;
				this.uiBG.visible = true;
				this.uiBG.width = Laya.stage.width; //全屏
				this.uiBG.height = Laya.stage.height;
				this.uiView.addChild(this.uiBG);
			}
			this.uiView.updateZOrder();
		}

		//显示UI
		public Open(context: WindowContextDataBase = null) {
			this.BeforeUIOpen(context);
			this.uiView.visible = true;
			let cb = this.OnUIOpened.bind(this, context)
			this.DoEnteringAnim(cb);
		}

		protected BeforeUIOpen(context: WindowContextDataBase = null) {
		}

		private DoEnteringAnim(action: () => void) {
			this.ResetAnim();
			this.EnteringAnim(action);
		}

		//注意, 重载这个函数, 需要保证在complete的时候, 执行action回调,否则打开ui会失败
		protected EnteringAnim(action: () => void) {
			let animType = this.uiConfig.uiOpenAnimType
			if (animType != UIAnim.None) {
				this.PlayeEnterTween(animType, action)
			} else {
				//重载后必须执行
				if (action != null) {
					action();
				}
			}
		}

		protected OnUIOpened(context: WindowContextDataBase = null) {
			if (context && context.OnOpenCallback) context.OnOpenCallback();
		}


		//隐藏UI
		public Hide(callback: () => void = null) {
			this.DoExitingAnim(() => {
				this.uiView.visible = false;
				if (callback != null) callback();
				this.OnUIHide();
			})
		}

		//强制立刻关闭
		public HideForce() {
			this.uiView.visible = false;
			this.OnUIHide();
		}

		private DoExitingAnim(action: () => void) {
			this.ResetAnim();
			this.ExitingAnim(action);
		}

		//注意, 重载这个函数, 需要保证在complete的时候, 执行action回调,否则关闭UI事件不触发
		protected ExitingAnim(action: () => void) {
			let animType = this.uiConfig.uiCloseAnimType
			if (animType != UIAnim.None) {
				this.PlayeExitTween(animType, action)
			} else {
				//重载后必须执行
				if (action != null) {
					action();
				}
			}
		}

		protected OnUIHide() {

		}

		protected ResetAnim() {

		}

		//销毁UI
		public Destroy() {
			this.BeforeUIDestroy();
			this.uiView.removeSelf();
			this.uiView.destroy(true);
			this.uiView = null;
			this.OnUIDestroy();
		}

		protected BeforeUIDestroy() {
			//删除背景图
			if (this.uiBG) {
				this.uiBG.removeSelf();
				this.uiBG.destroy(true);
				this.uiBG = null;
			}
		}

		protected OnUIDestroy() {

		}


		private PlayeEnterTween(tweenType: UIAnim, action: () => void) {
			switch (tweenType) {
				case UIAnim.PopOpen:
					var delay = 0;
					Tween.from(this.uiView, { scaleX: 0, scaleY: 0 }, 500, Laya.Ease.strongIn, Laya.Handler.create(this, () => {
						//重载后必须执行
						if (action != null) {
							action();
						}
					}, null), delay);
					break;

				default:
					Log.Error("UI打开执行未定义动画" + tweenType.toString())
					break;
			}
		}

		private PlayeExitTween(tweenType: UIAnim, action: () => void) {
			switch (tweenType) {
				case UIAnim.PopClose:
					var delay = 0;
					let scaleX = this.uiView.scaleX;
					let scaleY = this.uiView.scaleY;
					Tween.to(this.uiView, { scaleX: 0, scaleY: 0 }, 200, Laya.Ease.strongIn, Laya.Handler.create(this, () => {
						//恢复缩放,防止下次Open时候缩放值不对
						this.uiView.scaleX = scaleX;
						this.uiView.scaleY = scaleY;
						//重载后必须执行
						if (action != null) {
							action();
						}
					}, null), delay);
					break;

				default:
					Log.Error("UI关闭执行未定义动画" + tweenType.toString())
					break;
			}
		}

		//获取对应的uiconfig
		private GetUIWindowConfigData(uiid: ui.UIID): WindowConfigData {
			let configData = ConfigManager.GetInstance().GetUIConfig(uiid);
			if (configData == null || configData == undefined) {
				//有可能是空的，这说明或许是最初初始化时没有，因此生成一个默认的配置
				let windowData = new WindowConfigData();
				windowData.uiid = uiid;
				return windowData;
			} else {
				let windowData = new WindowConfigData();
				windowData.uiid = uiid;
				windowData.uiOpenAnimType = configData.uiOpenAnimType;
				windowData.uiCloseAnimType = configData.uiCloseAnimType;
				windowData.uiShowType = configData.uiShowType;
				windowData.depth = configData.depth;
				windowData.showImageBG = configData.showImageBG;
				windowData.imageBGPath = configData.imageBGPath;
				windowData.imageBGSizeGrid = configData.imageBGSizeGrid;

				return windowData;
			}
		}
	}
}