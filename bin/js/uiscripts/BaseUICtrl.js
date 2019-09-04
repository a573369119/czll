var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Mediator = puremvc.Mediator;
var Tween = Laya.Tween;
var Handler = Laya.Handler;
var Facade = puremvc.Facade;
/**
* name
*/
var ui;
(function (ui) {
    //打开ui传递参数的基类
    var WindowContextDataBase = (function () {
        function WindowContextDataBase(onOpenCallback, navLogic) {
            if (navLogic === void 0) { navLogic = true; }
            this.ExecuteNavLogic = true; // 打开UI的时候, 是否一定执行导航相关操作
            this.OnOpenCallback = onOpenCallback;
            this.ExecuteNavLogic = navLogic;
        }
        return WindowContextDataBase;
    }());
    ui.WindowContextDataBase = WindowContextDataBase;
    //UI配置
    var WindowConfigData = (function () {
        function WindowConfigData() {
            this.uiid = 0;
            this.uiOpenAnimType = UIAnim.None; //ui动画
            this.uiCloseAnimType = UIAnim.None;
            this.uiShowType = UIShowType.DoNothing; // todo
            this.depth = 0; //层级越大, 越在上面
            //每一个uiView的背景
            this.showImageBG = false;
            this.imageBGPath = "";
            this.imageBGSizeGrid = "0,0,0,0,1"; //图片的grid
        }
        return WindowConfigData;
    }());
    ui.WindowConfigData = WindowConfigData;
    var UIShowType;
    (function (UIShowType) {
        UIShowType[UIShowType["DoNothing"] = 0] = "DoNothing";
        UIShowType[UIShowType["HideOthers"] = 1] = "HideOthers";
        UIShowType[UIShowType["DestoryOthers"] = 2] = "DestoryOthers";
    })(UIShowType = ui.UIShowType || (ui.UIShowType = {}));
    var UIAutoCloseType;
    (function (UIAutoCloseType) {
        UIAutoCloseType[UIAutoCloseType["AffectedByOthers"] = 0] = "AffectedByOthers";
        UIAutoCloseType[UIAutoCloseType["NotAffectedByOthers"] = 1] = "NotAffectedByOthers";
    })(UIAutoCloseType = ui.UIAutoCloseType || (ui.UIAutoCloseType = {}));
    var UIAnim;
    (function (UIAnim) {
        UIAnim[UIAnim["None"] = 0] = "None";
        UIAnim[UIAnim["PopOpen"] = 1] = "PopOpen";
        UIAnim[UIAnim["PopClose"] = 2] = "PopClose";
        UIAnim[UIAnim["Custom"] = 3] = "Custom";
    })(UIAnim = ui.UIAnim || (ui.UIAnim = {}));
    var BaseUICtrl = (function (_super) {
        __extends(BaseUICtrl, _super);
        function BaseUICtrl(view) {
            var _this = _super.call(this) || this;
            _this.uiView = view;
            return _this;
        }
        //UI Prepare的时候使用
        BaseUICtrl.prototype.Init = function (parent, id) {
            //ui配置
            this.uiConfig = this.GetUIWindowConfigData(id);
            if (this.uiConfig.showImageBG) {
                this.uiBG = new Laya.Image();
                this.uiBG.name = "uibg";
                this.uiBG.zOrder = -1;
                this.uiBG.skin = this.uiConfig.imageBGPath;
                this.uiBG.visible = true;
                this.uiBG.width = Laya.stage.width; //全屏
                this.uiBG.height = Laya.stage.height;
                this.uiView.addChild(this.uiBG);
            }
            this.uiView.updateZOrder();
        };
        //显示UI
        BaseUICtrl.prototype.Open = function (context) {
            if (context === void 0) { context = null; }
            this.BeforeUIOpen(context);
            this.uiView.visible = true;
            var cb = this.OnUIOpened.bind(this, context);
            this.DoEnteringAnim(cb);
        };
        BaseUICtrl.prototype.BeforeUIOpen = function (context) {
            if (context === void 0) { context = null; }
        };
        BaseUICtrl.prototype.DoEnteringAnim = function (action) {
            this.ResetAnim();
            this.EnteringAnim(action);
        };
        //注意, 重载这个函数, 需要保证在complete的时候, 执行action回调,否则打开ui会失败
        BaseUICtrl.prototype.EnteringAnim = function (action) {
            var animType = this.uiConfig.uiOpenAnimType;
            if (animType != UIAnim.None) {
                this.PlayeEnterTween(animType, action);
            }
            else {
                //重载后必须执行
                if (action != null) {
                    action();
                }
            }
        };
        BaseUICtrl.prototype.OnUIOpened = function (context) {
            if (context === void 0) { context = null; }
            if (context && context.OnOpenCallback)
                context.OnOpenCallback();
        };
        //隐藏UI
        BaseUICtrl.prototype.Hide = function (callback) {
            var _this = this;
            if (callback === void 0) { callback = null; }
            this.DoExitingAnim(function () {
                _this.uiView.visible = false;
                if (callback != null)
                    callback();
                _this.OnUIHide();
            });
        };
        //强制立刻关闭
        BaseUICtrl.prototype.HideForce = function () {
            this.uiView.visible = false;
            this.OnUIHide();
        };
        BaseUICtrl.prototype.DoExitingAnim = function (action) {
            this.ResetAnim();
            this.ExitingAnim(action);
        };
        //注意, 重载这个函数, 需要保证在complete的时候, 执行action回调,否则关闭UI事件不触发
        BaseUICtrl.prototype.ExitingAnim = function (action) {
            var animType = this.uiConfig.uiCloseAnimType;
            if (animType != UIAnim.None) {
                this.PlayeExitTween(animType, action);
            }
            else {
                //重载后必须执行
                if (action != null) {
                    action();
                }
            }
        };
        BaseUICtrl.prototype.OnUIHide = function () {
        };
        BaseUICtrl.prototype.ResetAnim = function () {
        };
        //销毁UI
        BaseUICtrl.prototype.Destroy = function () {
            this.BeforeUIDestroy();
            this.uiView.removeSelf();
            this.uiView.destroy(true);
            this.uiView = null;
            this.OnUIDestroy();
        };
        BaseUICtrl.prototype.BeforeUIDestroy = function () {
            //删除背景图
            if (this.uiBG) {
                this.uiBG.removeSelf();
                this.uiBG.destroy(true);
                this.uiBG = null;
            }
        };
        BaseUICtrl.prototype.OnUIDestroy = function () {
        };
        BaseUICtrl.prototype.PlayeEnterTween = function (tweenType, action) {
            switch (tweenType) {
                case UIAnim.PopOpen:
                    var delay = 0;
                    Tween.from(this.uiView, { scaleX: 0, scaleY: 0 }, 500, Laya.Ease.strongIn, Laya.Handler.create(this, function () {
                        //重载后必须执行
                        if (action != null) {
                            action();
                        }
                    }, null), delay);
                    break;
                default:
                    Log.Error("UI打开执行未定义动画" + tweenType.toString());
                    break;
            }
        };
        BaseUICtrl.prototype.PlayeExitTween = function (tweenType, action) {
            var _this = this;
            switch (tweenType) {
                case UIAnim.PopClose:
                    var delay = 0;
                    var scaleX_1 = this.uiView.scaleX;
                    var scaleY_1 = this.uiView.scaleY;
                    Tween.to(this.uiView, { scaleX: 0, scaleY: 0 }, 200, Laya.Ease.strongIn, Laya.Handler.create(this, function () {
                        //恢复缩放,防止下次Open时候缩放值不对
                        _this.uiView.scaleX = scaleX_1;
                        _this.uiView.scaleY = scaleY_1;
                        //重载后必须执行
                        if (action != null) {
                            action();
                        }
                    }, null), delay);
                    break;
                default:
                    Log.Error("UI关闭执行未定义动画" + tweenType.toString());
                    break;
            }
        };
        //获取对应的uiconfig
        BaseUICtrl.prototype.GetUIWindowConfigData = function (uiid) {
            var configData = ConfigManager.GetInstance().GetUIConfig(uiid);
            if (configData == null || configData == undefined) {
                //有可能是空的，这说明或许是最初初始化时没有，因此生成一个默认的配置
                var windowData = new WindowConfigData();
                windowData.uiid = uiid;
                return windowData;
            }
            else {
                var windowData = new WindowConfigData();
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
        };
        return BaseUICtrl;
    }(Mediator));
    ui.BaseUICtrl = BaseUICtrl;
})(ui || (ui = {}));
//# sourceMappingURL=BaseUICtrl.js.map