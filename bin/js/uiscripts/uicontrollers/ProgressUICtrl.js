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
        var ProgressUICtrl = (function (_super) {
            __extends(ProgressUICtrl, _super);
            function ProgressUICtrl(view) {
                var _this = _super.call(this, view) || this;
                _this.progressMinValue = 30;
                //初始化参数
                _this.progressMaxValue = _this.GetView().img_progressBG.height - 12;
                // this.progressMinValue = 0;
                Log.Debug("ProgressUI 进度条长度初始化：", _this.progressMinValue, _this.progressMaxValue);
                return _this;
            }
            ProgressUICtrl.prototype.GetView = function () {
                return this.uiView;
            };
            /**
             * @override
             */
            ProgressUICtrl.prototype.Init = function (parent, id) {
                var _this = this;
                _super.prototype.Init.call(this, parent, id);
                this.mediatorName = ui.UIID.ProgressUIID.toString();
                //添加舞台
                parent.addChild(this.uiView);
                this.uiView.zOrder = 0;
                this.RegisterEvent();
                //自适应
                this.GetView().on(Laya.Event.RESIZE, this, function () {
                    _this.GetView().width = Laya.stage.width;
                    _this.GetView().height = Laya.stage.height;
                });
            };
            /**
             * @override
             */
            //ui动画执行前
            ProgressUICtrl.prototype.BeforeUIOpen = function () {
                _super.prototype.BeforeUIOpen.call(this);
                //清空进度条
                this.UpdateProgress(0);
            };
            /**
            * @override
            */
            //ui打开动画完成
            ProgressUICtrl.prototype.OnUIOpened = function () {
                _super.prototype.OnUIOpened.call(this);
            };
            /**
             * @override
             */
            //ui关闭动画完成
            ProgressUICtrl.prototype.OnUIHide = function () {
                _super.prototype.OnUIHide.call(this);
                //清空进度条
                this.UpdateProgress(0);
            };
            /**
             * @override
             */
            ProgressUICtrl.prototype.BeforeUIDestroy = function () {
                this.RemoveEvent();
            };
            /**
             * @override
             */
            ProgressUICtrl.prototype.OnUIDestroy = function () {
            };
            ProgressUICtrl.prototype.RegisterEvent = function () {
                Facade.getInstance().registerMediator(this);
            };
            ProgressUICtrl.prototype.RemoveEvent = function () {
                Facade.getInstance().removeMediator(this.getMediatorName());
            };
            /**
             * @override
             */
            ProgressUICtrl.prototype.listNotificationInterests = function () {
                return [];
            };
            /**
            * @override
            */
            ProgressUICtrl.prototype.handleNotification = function (note) {
                switch (note.getName()) {
                }
            };
            ProgressUICtrl.prototype.UpdateProgress = function (ratio) {
                this.GetView().img_progress.height = this.RatioConvertToPixel(ratio);
                Log.Debug("ProgressUI ratio", ratio, this.RatioConvertToPixel(ratio));
                this.GetView().txt_progress.text = Math.floor(ratio * 100).toString() + "%";
            };
            //比例转化为像素
            ProgressUICtrl.prototype.RatioConvertToPixel = function (ratio) {
                return (this.progressMaxValue - this.progressMinValue) * ratio + this.progressMinValue;
            };
            return ProgressUICtrl;
        }(ui.BaseUICtrl));
        uicontrollers.ProgressUICtrl = ProgressUICtrl;
    })(uicontrollers = ui.uicontrollers || (ui.uicontrollers = {}));
})(ui || (ui = {}));
//# sourceMappingURL=ProgressUICtrl.js.map