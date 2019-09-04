var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
* Created By Code Generator
*/
var ui;
(function (ui) {
    var uicontrollers;
    (function (uicontrollers) {
        var Facade = puremvc.Facade;
        var LevelUICtrl = (function (_super) {
            __extends(LevelUICtrl, _super);
            function LevelUICtrl(view) {
                var _this = _super.call(this, view) || this;
                _this.boxPos_Homepage_Top = 820;
                _this.boxPos_Battle_Top = 90;
                _this.boxPos_Result_Top = 1000;
                _this.animTime_Homepage = 0.5;
                _this.animTime_Battle = 0.5;
                _this.animTime_Result = 0.5;
                //固定位置坐标
                _this.lastTextPosX = 376;
                _this.firstTextPosX = -298;
                //动画时间
                _this.animTime = 1;
                return _this;
            }
            LevelUICtrl.prototype.GetView = function () {
                return this.uiView;
            };
            /**
             * @override
             */
            LevelUICtrl.prototype.Init = function (parent, id) {
                var _this = this;
                _super.prototype.Init.call(this, parent, id);
                this.mediatorName = ui.UIID.LevelUIID.toString();
                //ui配置
                //this.uiConfig = new WindowConfigData();
                //this.uiConfig.uiOpenAnimType = UIAnim.PopOpen;
                //this.uiConfig.uiCloseAnimType = UIAnim.PopClose;
                //this.uiConfig.depth = 0;
                //添加舞台
                parent.addChild(this.uiView);
                this.uiView.zOrder = this.uiConfig.depth;
                this.RegisterEvent();
                //自适应
                this.GetView().on(Laya.Event.RESIZE, this, function () {
                    _this.GetView().width = Laya.stage.width;
                    _this.GetView().height = Laya.stage.height;
                    _this.GetView().UI_Box_Level.centerX = 0;
                });
                //动态创建文字元素，添加到数组中
                var view = this.GetView();
                this.LevelTextArray = new Array();
                for (var i = 0; i < 4; i++) {
                    var label = new Laya.Label();
                    label.color = "#FFFFFF";
                    label.font = "黑体";
                    label.bold = true;
                    label.fontSize = 30;
                    label.align = "center";
                    label.valign = "middle";
                    label.anchorX = 0.5;
                    label.anchorY = 0.5;
                    label.width = 100;
                    label.height = 70;
                    view.UI_Box_Level.addChild(label);
                    label.centerY = 0;
                    this.LevelTextArray.push(label);
                }
                this.animTask = -1;
                this.levelTask = new Array(-1, -1, -1, -1);
            };
            /**
             * @override
             */
            //ui动画执行前
            LevelUICtrl.prototype.BeforeUIOpen = function (context) {
                if (context === void 0) { context = null; }
                _super.prototype.BeforeUIOpen.call(this, context);
            };
            /**
            * @override
            */
            //ui打开动画完成
            LevelUICtrl.prototype.OnUIOpened = function (context) {
                if (context === void 0) { context = null; }
                _super.prototype.OnUIOpened.call(this, context);
            };
            /**
             * @override
             */
            //ui关闭动画完成
            LevelUICtrl.prototype.OnUIHide = function () {
                _super.prototype.OnUIHide.call(this);
            };
            /**
             * @override
             */
            LevelUICtrl.prototype.BeforeUIDestroy = function () {
                _super.prototype.BeforeUIDestroy.call(this);
                this.RemoveEvent();
            };
            /**
             * @override
             */
            LevelUICtrl.prototype.OnUIDestroy = function () {
                _super.prototype.OnUIDestroy.call(this);
            };
            LevelUICtrl.prototype.RegisterEvent = function () {
                Facade.getInstance().registerMediator(this);
            };
            LevelUICtrl.prototype.RemoveEvent = function () {
                Facade.getInstance().removeMediator(this.getMediatorName());
            };
            /**
             * @override
             */
            LevelUICtrl.prototype.listNotificationInterests = function () {
                return [
                    NotificationNames.LevelUI_PlayAnim
                ];
            };
            /**
            * @override
            */
            LevelUICtrl.prototype.handleNotification = function (note) {
                var view = this.GetView();
                switch (note.getName()) {
                    case NotificationNames.LevelUI_PlayAnim: {
                        //根据传来的内容，决定关卡进度的显示方式
                        var data = note.getBody();
                        this.PlayAnim(data);
                        break;
                    }
                }
            };
            //根据数据，显示当前的关卡进度
            LevelUICtrl.prototype.ShowCurLevel = function (curLevel) {
                //显隐设置
                this.LevelTextArray[0].alpha = curLevel > 1 ? 1 : 0;
                this.LevelTextArray[1].alpha = 1;
                this.LevelTextArray[2].alpha = curLevel < ConfigManager.GetInstance().GetLevelMax() ? 1 : 0;
                this.LevelTextArray[3].alpha = 0;
                //文字与位置确定
                for (var i = 0; i < this.LevelTextArray.length; i++) {
                    var element = this.LevelTextArray[i];
                    element.text = (curLevel + i - 1).toString();
                    //根据内容，决定字号
                    if (curLevel + i - 1 >= 1000) {
                        element.fontSize = 30;
                    }
                    else if (curLevel + i - 1 >= 100 && curLevel + i - 1 < 1000) {
                        element.fontSize = 40;
                    }
                    else {
                        element.fontSize = 45;
                    }
                    this.SetLabelPos(element, i + 1);
                }
            };
            //播放动画
            LevelUICtrl.prototype.ShowAimLevel = function (curLevel) {
                var _this = this;
                //取消动画
                this.CancelLevelAnim();
                //显示旧的
                this.ShowCurLevel(curLevel);
                //四个label分别移动到目标位置，同时改变显隐
                var view = this.GetView();
                this.levelTask[0] = Tween2DUtil.getInst().to({
                    node: this.LevelTextArray[0],
                    duration: this.animTime,
                    x: this.firstTextPosX,
                    alpha: 0,
                    onComplete: cbhandler.gen_handler(function () {
                        _this.levelTask[0] = -1;
                    }, this)
                });
                this.levelTask[1] = Tween2DUtil.getInst().to({
                    node: this.LevelTextArray[1],
                    duration: this.animTime,
                    x: view.UI_Img_Prev.x,
                    y: view.UI_Img_Prev.y,
                    alpha: 1,
                    onComplete: cbhandler.gen_handler(function () {
                        _this.levelTask[1] = -1;
                    }, this)
                });
                this.levelTask[2] = Tween2DUtil.getInst().to({
                    node: this.LevelTextArray[2],
                    duration: this.animTime,
                    x: view.UI_Img_Cur.x,
                    y: view.UI_Img_Cur.y,
                    alpha: 1,
                    onComplete: cbhandler.gen_handler(function () {
                        _this.levelTask[2] = -1;
                    }, this)
                });
                this.levelTask[3] = Tween2DUtil.getInst().to({
                    node: this.LevelTextArray[3],
                    duration: this.animTime,
                    x: view.UI_Img_Next.x,
                    y: view.UI_Img_Next.y,
                    alpha: 1,
                    onComplete: cbhandler.gen_handler(function () {
                        _this.levelTask[3] = -1;
                    }, this)
                });
            };
            //0 1 2 3 4
            LevelUICtrl.prototype.SetLabelPos = function (label, posID) {
                var view = this.GetView();
                switch (posID) {
                    case 0: {
                        label.x = this.firstTextPosX;
                        label.centerY = view.UI_Img_Prev.centerY;
                        break;
                    }
                    case 1: {
                        label.x = view.UI_Img_Prev.x;
                        label.centerY = view.UI_Img_Prev.centerY;
                        break;
                    }
                    case 2: {
                        label.x = view.UI_Img_Cur.x;
                        label.centerY = view.UI_Img_Cur.centerY;
                        break;
                    }
                    case 3: {
                        label.x = view.UI_Img_Next.x;
                        label.centerY = view.UI_Img_Next.centerY;
                        break;
                    }
                    case 4: {
                        label.x = this.lastTextPosX;
                        break;
                    }
                    default:
                        break;
                }
            };
            LevelUICtrl.prototype.PlayAnim = function (data) {
                var view = this.GetView();
                //取消旧动画
                this.CancelAnim();
                this.CancelLevelAnim();
                switch (data.LevelAnimType) {
                    case EnumLevelUIAnimType.HomePage: {
                        //主页，直接显示
                        Log.Debug("LevelUI 主页");
                        view.visible = true;
                        this.animTask = Tween2DUtil.getInst().to({
                            node: view.UI_Box_Level,
                            duration: this.animTime_Homepage,
                            top: this.boxPos_Homepage_Top,
                            scalex: 1.2,
                            scaley: 1.2
                        });
                        this.ShowCurLevel(data.curLevel);
                        break;
                    }
                    case EnumLevelUIAnimType.Battle: {
                        //战斗面板，直接显示
                        Log.Debug("LevelUI 战斗");
                        view.visible = true;
                        Tween2DUtil.getInst().to({
                            node: view.UI_Box_Level,
                            duration: this.animTime_Battle,
                            top: this.boxPos_Battle_Top,
                            scalex: 1,
                            scaley: 1
                        });
                        this.ShowCurLevel(data.curLevel);
                        break;
                    }
                    case EnumLevelUIAnimType.Result_Win: {
                        //结算面板，胜利，切换到下一个
                        //2019-8-14 20:27:47 结算面板不再显示
                        Log.Debug("LevelUI 结算 胜利");
                        // this.animTask = Tween2DUtil.getInst().to({
                        //     node: view.UI_Box_Level,
                        //     duration: this.animTime_Result,
                        //     top: this.boxPos_Result_Top,
                        //     scalex: 1.2,
                        //     scaley: 1.2,
                        //     onComplete: cbhandler.gen_handler(() => {
                        //         this.ShowAimLevel(data.curLevel);
                        //     }, this)
                        // })
                        // this.ShowCurLevel(data.curLevel);
                        view.visible = false;
                        break;
                    }
                    case EnumLevelUIAnimType.Result_Lose: {
                        //结算面板，失败，直接显示
                        Log.Debug("LevelUI 结算 失败");
                        // this.animTask = Tween2DUtil.getInst().to({
                        //     node: view.UI_Box_Level,
                        //     duration: this.animTime_Result,
                        //     top: this.boxPos_Result_Top,
                        //     scalex: 1.2,
                        //     scaley: 1.2,
                        // })
                        // this.ShowCurLevel(data.curLevel);
                        view.visible = false;
                        break;
                    }
                    default:
                        break;
                }
            };
            LevelUICtrl.prototype.CancelAnim = function () {
                if (this.animTask != -1) {
                    Tween2DUtil.getInst().kill(this.animTask);
                    this.animTask = -1;
                }
            };
            LevelUICtrl.prototype.CancelLevelAnim = function () {
                for (var i = 0; i < this.levelTask.length; i++) {
                    if (this.levelTask[i] != -1) {
                        Tween2DUtil.getInst().kill(this.levelTask[i]);
                        this.levelTask[i] = -1;
                    }
                }
            };
            return LevelUICtrl;
        }(ui.BaseUICtrl));
        uicontrollers.LevelUICtrl = LevelUICtrl;
    })(uicontrollers = ui.uicontrollers || (ui.uicontrollers = {}));
})(ui || (ui = {}));
//# sourceMappingURL=LevelUICtrl.js.map