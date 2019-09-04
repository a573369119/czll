var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var View = laya.ui.View;
var Dialog = laya.ui.Dialog;
var EffectAnimation = laya.display.EffectAnimation;
var ui;
(function (ui) {
    var BackgroundUI = (function (_super) {
        __extends(BackgroundUI, _super);
        function BackgroundUI() {
            return _super.call(this) || this;
        }
        BackgroundUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.createView(ui.BackgroundUI.uiView);
        };
        return BackgroundUI;
    }(View));
    BackgroundUI.uiView = { "type": "View", "props": { "width": 1080, "height": 1920 }, "child": [{ "type": "Image", "props": { "width": 3000, "var": "UI_Img_Black_Cover", "height": 3000, "centerY": 0, "centerX": 0 } }, { "type": "Box", "props": { "y": 980, "x": 540, "width": 1080, "var": "shakBox", "height": 1960, "anchorY": 0.5, "anchorX": 0.5 }, "child": [{ "type": "Image", "props": { "y": -1180, "width": 1280, "var": "UI_Img_Background2", "left": -95, "height": 2120, "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 940, "width": 1280, "var": "UI_Img_Background", "left": -97, "height": 2120, "anchorY": 0.5, "anchorX": 0.5 } }] }] };
    ui.BackgroundUI = BackgroundUI;
})(ui || (ui = {}));
(function (ui) {
    var BattleUI = (function (_super) {
        __extends(BattleUI, _super);
        function BattleUI() {
            return _super.call(this) || this;
        }
        BattleUI.prototype.createChildren = function () {
            View.regComponent("ui.Effect.WarningEffectUI", ui.Effect.WarningEffectUI);
            _super.prototype.createChildren.call(this);
            this.createView(ui.BattleUI.uiView);
        };
        return BattleUI;
    }(View));
    BattleUI.uiView = { "type": "View", "props": { "width": 1080, "height": 1920 }, "child": [{ "type": "Button", "props": { "y": 80, "x": 30, "width": 104, "var": "UI_Btn_Setting", "stateNum": 1, "skin": "resources/common/img_setting.png", "height": 113 } }, { "type": "Box", "props": { "width": 130, "var": "UI_Box_Prop", "top": 552, "right": 95, "height": 130, "anchorY": 1, "anchorX": 0.5 } }, { "type": "Box", "props": { "width": 819, "var": "UI_Box_MatchInfo", "top": 91, "height": 316, "centerX": 19 }, "child": [{ "type": "Box", "props": { "y": 0, "x": 210, "width": 400, "visible": false, "var": "UI_Box_Level", "top": 0, "height": 160, "centerX": 0 } }, { "type": "Box", "props": { "width": 741, "name": "Progress", "height": 59, "centerY": 0, "centerX": 0 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 741, "skin": "resources/unpack/img_progress_0.png", "height": 59 } }, { "type": "Image", "props": { "y": 0, "x": 0, "width": 741, "skin": "resources/unpack/img_progress_1.png", "height": 59 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 741, "var": "UI_Img_Progress", "skin": "resources/unpack/img_progress_1.png", "renderType": "mask", "height": 59 } }] }] }, { "type": "Image", "props": { "y": 255, "x": 65, "width": 69, "var": "UI_Img_Coin", "skin": "resources/moneyinfo/img_icon_coin.png", "height": 63, "anchorY": 0.5, "anchorX": 0.5 }, "child": [{ "type": "Label", "props": { "width": 157, "var": "UI_Txt_CoinCount", "valign": "middle", "text": "88.8M", "right": -157, "height": 68, "fontSize": 48, "color": "#ffffff", "centerY": 0, "bold": true, "align": "left" } }] }, { "type": "Image", "props": { "y": 257, "x": 653, "width": 67, "skin": "resources/battle/img_insect.png", "name": "Img_Enemy", "height": 62, "anchorY": 0.5, "anchorX": 0.5 }, "child": [{ "type": "Label", "props": { "width": 98, "var": "UI_Txt_EnemyCount", "valign": "middle", "text": "888", "right": -98, "height": 68, "fontSize": 48, "color": "#ffffff", "centerY": 0, "bold": true, "anchorY": 0.5, "align": "left" } }] }] }, { "type": "Box", "props": { "y": 341, "x": 217, "width": 100, "visible": false, "name": "PosTest", "height": 100, "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "var": "UI_Img_Warning", "top": 0, "skin": "resources/battle/img_warning_frame.png", "right": 0, "left": 0, "bottom": 0, "sizeGrid": "75,75,75,75" }, "child": [{ "type": "Image", "props": { "width": 764, "top": 500, "skin": "resources/battle/img_warning_hint.png", "height": 285, "centerX": 8 }, "child": [{ "type": "Label", "props": { "valign": "middle", "top": 0, "text": "巨型虫子入侵", "right": 0, "left": 0, "fontSize": 60, "font": "黑体", "color": "#ff0400", "bottom": 0, "bold": true, "align": "center" } }] }, { "type": "Script", "props": { "var": "UI_Anim_Warning", "runtime": "ui.Effect.WarningEffectUI" } }] }] };
    ui.BattleUI = BattleUI;
})(ui || (ui = {}));
(function (ui) {
    var CommonPanelUI = (function (_super) {
        __extends(CommonPanelUI, _super);
        function CommonPanelUI() {
            return _super.call(this) || this;
        }
        CommonPanelUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.createView(ui.CommonPanelUI.uiView);
        };
        return CommonPanelUI;
    }(View));
    CommonPanelUI.uiView = { "type": "View", "props": { "width": 1080, "height": 1920 }, "child": [{ "type": "Box", "props": { "top": 0, "right": 0, "left": 0, "bottom": 0 } }, { "type": "Image", "props": { "width": 974, "skin": "resources/common/interface_common_bg.png", "height": 712, "centerY": 0, "centerX": 0, "sizeGrid": "90,90,90,90" }, "child": [{ "type": "Label", "props": { "wordWrap": true, "width": 702, "var": "txt_context", "valign": "middle", "text": "1111111111111111111111111111111111111111111111111111111111111111111", "height": 341, "fontSize": 50, "font": "黑体", "color": "#ffffff", "centerY": -76, "centerX": 0, "align": "center" } }, { "type": "Button", "props": { "width": 299, "var": "btn_exit", "stateNum": 1, "skin": "resources/common/interface_btn_orange.png", "labelSize": 50, "labelFont": "黑体", "labelColors": "#FFFFFF", "labelAlign": "center", "label": "确认", "height": 107, "centerX": 0, "bottom": 103, "sizeGrid": "50,70,50,70" } }] }] };
    ui.CommonPanelUI = CommonPanelUI;
})(ui || (ui = {}));
(function (ui) {
    var Effect;
    (function (Effect) {
        var ClickDownEffectUI = (function (_super) {
            __extends(ClickDownEffectUI, _super);
            function ClickDownEffectUI() {
                var _this = _super.call(this) || this;
                _this.effectData = ui.Effect.ClickDownEffectUI.uiView;
                return _this;
            }
            return ClickDownEffectUI;
        }(EffectAnimation));
        ClickDownEffectUI.uiView = { "type": "View", "props": {}, "child": [{ "type": "Image", "props": { "skin": "resources/unpack/img_logo.png" }, "compId": 2 }], "animations": [{ "nodes": [{ "target": 2, "keyframes": { "scaleY": [{ "value": 1, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "scaleY", "index": 0 }, { "value": 1.2, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "scaleY", "index": 1 }], "scaleX": [{ "value": 1, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "scaleX", "index": 0 }, { "value": 1.2, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "scaleX", "index": 1 }] } }], "name": "ClickDown", "id": 1, "frameRate": 120, "action": 0 }] };
        Effect.ClickDownEffectUI = ClickDownEffectUI;
    })(Effect = ui.Effect || (ui.Effect = {}));
})(ui || (ui = {}));
(function (ui) {
    var Effect;
    (function (Effect) {
        var ClickUpEffectUI = (function (_super) {
            __extends(ClickUpEffectUI, _super);
            function ClickUpEffectUI() {
                var _this = _super.call(this) || this;
                _this.effectData = ui.Effect.ClickUpEffectUI.uiView;
                return _this;
            }
            return ClickUpEffectUI;
        }(EffectAnimation));
        ClickUpEffectUI.uiView = { "type": "View", "props": {}, "child": [{ "type": "Image", "props": { "skin": "resources/unpack/img_logo.png" }, "compId": 2 }], "animations": [{ "nodes": [{ "target": 2, "keyframes": { "scaleY": [{ "value": 1.2, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "scaleY", "index": 0 }, { "value": 1, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "scaleY", "index": 1 }], "scaleX": [{ "value": 1.2, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "scaleX", "index": 0 }, { "value": 1, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "scaleX", "index": 1 }] } }], "name": "ClickUp", "id": 1, "frameRate": 120, "action": 0 }] };
        Effect.ClickUpEffectUI = ClickUpEffectUI;
    })(Effect = ui.Effect || (ui.Effect = {}));
})(ui || (ui = {}));
(function (ui) {
    var Effect;
    (function (Effect) {
        var DoubleCoinScaleEffectUI = (function (_super) {
            __extends(DoubleCoinScaleEffectUI, _super);
            function DoubleCoinScaleEffectUI() {
                var _this = _super.call(this) || this;
                _this.effectData = ui.Effect.DoubleCoinScaleEffectUI.uiView;
                return _this;
            }
            return DoubleCoinScaleEffectUI;
        }(EffectAnimation));
        DoubleCoinScaleEffectUI.uiView = { "type": "View", "props": {}, "child": [{ "type": "Label", "props": {}, "compId": 3 }], "animations": [{ "nodes": [{ "target": 3, "keyframes": { "scaleY": [{ "value": 1, "tweenMethod": "linearNone", "tween": true, "target": 3, "key": "scaleY", "index": 0 }, { "value": 1.1, "tweenMethod": "linearNone", "tween": true, "target": 3, "key": "scaleY", "index": 2 }, { "value": 1, "tweenMethod": "linearNone", "tween": true, "target": 3, "key": "scaleY", "index": 4 }], "scaleX": [{ "value": 1, "tweenMethod": "linearNone", "tween": true, "target": 3, "key": "scaleX", "index": 0 }, { "value": 1.1, "tweenMethod": "linearNone", "tween": true, "target": 3, "key": "scaleX", "index": 2 }, { "value": 1, "tweenMethod": "linearNone", "tween": true, "target": 3, "key": "scaleX", "index": 4 }] } }], "name": "ani1", "id": 1, "frameRate": 24, "action": 0 }] };
        Effect.DoubleCoinScaleEffectUI = DoubleCoinScaleEffectUI;
    })(Effect = ui.Effect || (ui.Effect = {}));
})(ui || (ui = {}));
(function (ui) {
    var Effect;
    (function (Effect) {
        var SeeSawEffectUI = (function (_super) {
            __extends(SeeSawEffectUI, _super);
            function SeeSawEffectUI() {
                var _this = _super.call(this) || this;
                _this.effectData = ui.Effect.SeeSawEffectUI.uiView;
                return _this;
            }
            return SeeSawEffectUI;
        }(EffectAnimation));
        SeeSawEffectUI.uiView = { "type": "View", "props": {}, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "skin": "resources/invitefriend/img_turntable.png", "anchorY": 0.5, "anchorX": 0.5 }, "compId": 2 }], "animations": [{ "nodes": [{ "target": 2, "keyframes": { "rotation": [{ "value": 0, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "rotation", "index": 0 }, { "value": 0, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "rotation", "index": 36 }, { "value": 15, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "rotation", "index": 40 }, { "value": -15, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "rotation", "index": 44 }, { "value": 15, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "rotation", "index": 48 }, { "value": -15, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "rotation", "index": 52 }, { "value": 0, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "rotation", "index": 56 }] } }], "name": "SeeSaw", "id": 1, "frameRate": 24, "action": 0 }] };
        Effect.SeeSawEffectUI = SeeSawEffectUI;
    })(Effect = ui.Effect || (ui.Effect = {}));
})(ui || (ui = {}));
(function (ui) {
    var Effect;
    (function (Effect) {
        var WarningEffectUI = (function (_super) {
            __extends(WarningEffectUI, _super);
            function WarningEffectUI() {
                var _this = _super.call(this) || this;
                _this.effectData = ui.Effect.WarningEffectUI.uiView;
                return _this;
            }
            return WarningEffectUI;
        }(EffectAnimation));
        WarningEffectUI.uiView = { "type": "View", "props": {}, "child": [{ "type": "Image", "props": { "skin": "resources/battle/img_warning_frame.png", "sizeGrid": "75,75,75,75" }, "compId": 2 }], "animations": [{ "nodes": [{ "target": 2, "keyframes": { "x": [{ "value": 0, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "x", "index": 0 }], "alpha": [{ "value": 0, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "alpha", "index": 0 }, { "value": 1, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "alpha", "index": 12 }, { "value": 0, "tweenMethod": "linearNone", "tween": true, "target": 2, "key": "alpha", "index": 24 }] } }], "name": "Warning", "id": 1, "frameRate": 24, "action": 0 }] };
        Effect.WarningEffectUI = WarningEffectUI;
    })(Effect = ui.Effect || (ui.Effect = {}));
})(ui || (ui = {}));
(function (ui) {
    var ExchangeUI = (function (_super) {
        __extends(ExchangeUI, _super);
        function ExchangeUI() {
            return _super.call(this) || this;
        }
        ExchangeUI.prototype.createChildren = function () {
            View.regComponent("ui.Effect.ClickDownEffectUI", ui.Effect.ClickDownEffectUI);
            View.regComponent("ui.Effect.ClickUpEffectUI", ui.Effect.ClickUpEffectUI);
            _super.prototype.createChildren.call(this);
            this.createView(ui.ExchangeUI.uiView);
        };
        return ExchangeUI;
    }(View));
    ExchangeUI.uiView = { "type": "View", "props": { "width": 1080, "height": 1920 }, "child": [{ "type": "Button", "props": { "var": "UI_Btn_Cancel", "top": 0, "stateNum": 1, "skin": "resources/common/img_black.png", "right": 0, "left": 0, "bottom": 0, "sizeGrid": "2,2,2,2" } }, { "type": "Image", "props": { "width": 843, "skin": "resources/unpack/img_panel_bg_0.png", "height": 1121, "centerY": 14, "centerX": 0, "alpha": 1 }, "child": [{ "type": "Image", "props": { "width": 244, "var": "UI_Img_Title_Coin", "top": 115, "skin": "resources/exchange/img_txt_title_coin.png", "height": 65, "centerX": 0 } }, { "type": "Image", "props": { "width": 242, "var": "UI_Img_Title_Power", "top": 115, "skin": "resources/exchange/img_txt_title_power.png", "height": 64, "centerX": 0 } }, { "type": "Image", "props": { "width": 620, "top": 241, "skin": "resources/unpack/img_bg.png", "sizeGrid": "15,15,15,15", "height": 200, "centerX": 0 }, "child": [{ "type": "Image", "props": { "width": 95, "top": 30, "skin": "resources/exchange/img_txt_diamond.png", "height": 41, "centerX": 0 } }, { "type": "Image", "props": { "width": 84, "skin": "resources/moneyinfo/img_icon_diamond.png", "height": 77, "centerY": 20, "centerX": -60 } }, { "type": "TextInput", "props": { "width": 180, "var": "UI_Ipt_DiamondNum", "valign": "middle", "type": "number", "text": "8888", "promptColor": "#ffff00", "prompt": "数量", "mouseEnabled": false, "height": 70, "fontSize": 70, "color": "#ffff00", "centerY": 20, "centerX": 60, "bold": true, "align": "center" } }, { "type": "Button", "props": { "x": 100, "width": 100, "var": "UI_Btn_Reduce", "height": 100, "centerY": 20, "anchorY": 0.5, "anchorX": 0.5 }, "child": [{ "type": "Script", "props": { "playEvent": "mousedown", "name": "d", "runtime": "ui.Effect.ClickDownEffectUI" } }, { "type": "Script", "props": { "playEvent": "mouseup", "name": "u", "runtime": "ui.Effect.ClickUpEffectUI" } }, { "type": "Script", "props": { "playEvent": "mouseout", "name": "o", "runtime": "ui.Effect.ClickUpEffectUI" } }, { "type": "Image", "props": { "width": 70, "skin": "resources/exchange/img_reduce.png", "height": 15, "centerY": 0, "centerX": 0 } }] }, { "type": "Button", "props": { "x": 520, "width": 100, "var": "UI_Btn_Add", "height": 100, "centerY": 20, "anchorY": 0.5, "anchorX": 0.5 }, "child": [{ "type": "Script", "props": { "playEvent": "mousedown", "name": "d", "runtime": "ui.Effect.ClickDownEffectUI" } }, { "type": "Script", "props": { "playEvent": "mouseup", "name": "u", "runtime": "ui.Effect.ClickUpEffectUI" } }, { "type": "Script", "props": { "playEvent": "mouseout", "name": "o", "runtime": "ui.Effect.ClickUpEffectUI" } }, { "type": "Image", "props": { "width": 73, "skin": "resources/exchange/img_add.png", "height": 72, "centerY": 0, "centerX": 0 } }] }] }, { "type": "Image", "props": { "y": 537, "x": 421, "skin": "resources/exchange/img_arrow.png", "rotation": 90, "name": "arrow", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "width": 620, "top": 618, "skin": "resources/unpack/img_bg.png", "sizeGrid": "15,15,15,15", "height": 200, "centerX": 0 }, "child": [{ "type": "Image", "props": { "width": 84, "var": "UI_Img_Power", "skin": "resources/moneyinfo/img_icon_power.png", "height": 77, "centerY": 20, "centerX": -60, "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "width": 84, "var": "UI_Img_Coin", "skin": "resources/moneyinfo/img_icon_coin.png", "height": 77, "centerY": 20, "centerX": -60, "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "width": 95, "top": 30, "skin": "resources/exchange/img_txt_gain.png", "height": 41, "centerX": 0 } }, { "type": "Label", "props": { "width": 180, "var": "UI_Txt_GainNum", "valign": "middle", "text": "15K", "height": 70, "fontSize": 70, "color": "#ffff00", "centerY": 20, "centerX": 60, "bold": true, "align": "center" } }] }, { "type": "Button", "props": { "y": 925, "x": 232, "width": 263, "var": "UI_Btn_GainDiamond", "stateNum": 1, "skin": "resources/common/img_btn_orange.png", "height": 93, "anchorY": 0.5, "anchorX": 0.5 }, "child": [{ "type": "Image", "props": { "width": 222, "skin": "resources/exchange/img_txt_invite.png", "height": 70, "centerY": 0, "centerX": 0 } }, { "type": "Script", "props": { "playEvent": "mousedown", "name": "d", "runtime": "ui.Effect.ClickDownEffectUI" } }, { "type": "Script", "props": { "playEvent": "mouseup", "name": "u", "runtime": "ui.Effect.ClickUpEffectUI" } }, { "type": "Script", "props": { "playEvent": "mouseout", "name": "o", "runtime": "ui.Effect.ClickUpEffectUI" } }] }, { "type": "Button", "props": { "y": 925, "x": 612, "width": 263, "var": "UI_Btn_Exchange", "stateNum": 1, "skin": "resources/common/img_btn_orange.png", "height": 93, "anchorY": 0.5, "anchorX": 0.5 }, "child": [{ "type": "Image", "props": { "width": 119, "skin": "resources/exchange/img_txt_exchange.png", "height": 44, "centerY": 0, "centerX": 0 } }, { "type": "Script", "props": { "y": 0, "x": 0, "playEvent": "mousedown", "name": "d", "runtime": "ui.Effect.ClickDownEffectUI" } }, { "type": "Script", "props": { "playEvent": "mouseup", "name": "u", "runtime": "ui.Effect.ClickUpEffectUI" } }, { "type": "Script", "props": { "playEvent": "mouseout", "name": "o", "runtime": "ui.Effect.ClickUpEffectUI" } }] }] }] };
    ui.ExchangeUI = ExchangeUI;
})(ui || (ui = {}));
(function (ui) {
    var HomePageUI = (function (_super) {
        __extends(HomePageUI, _super);
        function HomePageUI() {
            return _super.call(this) || this;
        }
        HomePageUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.createView(ui.HomePageUI.uiView);
        };
        return HomePageUI;
    }(Dialog));
    HomePageUI.uiView = { "type": "Dialog", "props": { "width": 1080, "height": 1920 }, "child": [{ "type": "Box", "props": { "top": 0, "right": 0, "left": 4, "bottom": 0 }, "child": [{ "type": "Button", "props": { "y": 881, "x": 286, "width": 509, "var": "UI_Btn_GameStart", "height": 639, "centerX": 0, "bottom": 400 }, "child": [{ "type": "Image", "props": { "width": 290, "var": "img_ClickToGame", "height": 56, "centerX": 0, "bottom": 22, "anchorY": 0.5, "anchorX": 0.5 }, "compId": 197, "child": [{ "type": "Image", "props": { "var": "UI_Img_PowerTxt_1", "skin": "resources/homepage/img_txt_startgame.png", "centerY": 1, "centerX": -3 } }, { "type": "Image", "props": { "var": "UI_Img_PowerTxt_0", "skin": "resources/homepage/img_txt_noenergy.png", "centerY": 0, "centerX": -2 } }] }] }, { "type": "Label", "props": { "width": 510, "visible": false, "var": "UI_Txt_CurLevel", "valign": "middle", "top": 820, "text": "当前关卡：888", "height": 60, "fontSize": 60, "font": "黑体", "color": "#ffffff", "centerX": 9, "align": "center" } }] }, { "type": "Box", "props": { "y": 0, "x": 540, "top": 0, "right": 0, "name": "Box_TopCenter", "left": 0, "height": 200, "anchorX": 0.5 }, "child": [{ "type": "Image", "props": { "width": 868, "top": 256, "skin": "resources/unpack/img_logo.png", "name": "logo", "height": 320, "centerX": -25 }, "child": [{ "type": "Label", "props": { "width": 130, "var": "UI_Txt_Version", "valign": "middle", "text": "v8.8.8", "right": 0, "height": 53, "fontSize": 30, "color": "#ffffff", "bottom": 0, "bold": true, "align": "left" } }] }] }, { "type": "Box", "props": { "width": 200, "var": "Anchor_BottomCenter", "height": 400, "centerX": 0, "bottom": 0, "anchorY": 1, "anchorX": 0.5 }, "child": [{ "type": "Image", "props": { "width": 1080, "skin": "resources/unpack/img_func_down.png", "height": 152, "centerX": 0, "bottom": 0 }, "child": [{ "type": "Button", "props": { "width": 120, "var": "UI_Btn_Leaderboard", "stateNum": 1, "skin": "resources/homepage/img_func_bg_0.png", "left": 73, "height": 120, "bottom": 98 }, "child": [{ "type": "Image", "props": { "width": 112, "skin": "resources/homepage/img_leaderboard.png", "centerY": 0, "centerX": 0 } }, { "type": "Image", "props": { "skin": "resources/homepage/img_txt_leaderboard.png", "centerX": 0, "bottom": -80 } }] }, { "type": "Button", "props": { "width": 120, "var": "UI_Btn_InviteFriend", "stateNum": 1, "skin": "resources/homepage/img_func_bg_0.png", "left": 261, "height": 120, "bottom": 98 }, "child": [{ "type": "Image", "props": { "skin": "resources/homepage/zuanshiwenzi.png", "centerX": 0, "bottom": -80 } }, { "type": "Image", "props": { "width": 120, "skin": "resources/homepage/img_zuanshi.png", "height": 120, "centerX": 0, "bottom": -2 } }, { "type": "Image", "props": { "y": -40, "width": 88, "var": "UI_Img_UpgradeArrow_Invite", "skin": "resources/homepage/img_upgrade_arrow.png", "height": 32, "centerX": 0 }, "compId": 194, "child": [{ "type": "Animation", "props": { "wrapMode": "0", "name": "arrwojump", "index": 0, "autoPlay": true, "autoAnimation": "ArrowJump" } }] }] }, { "type": "Button", "props": { "width": 210, "var": "UI_Btn_Upgrade_Main", "stateNum": 1, "skin": "resources/homepage/img_func_bg_0.png", "labelSize": 40, "labelFont": "黑体", "labelColors": "#FFFFFF", "height": 210, "centerX": 0, "bottom": 98 }, "child": [{ "type": "Image", "props": { "skin": "resources/homepage/img_main.png", "centerY": 0, "centerX": 0 } }, { "type": "Image", "props": { "skin": "resources/homepage/img_txt_main.png", "centerX": 0, "bottom": -80 } }, { "type": "Image", "props": { "y": -50, "width": 120, "var": "UI_Img_UpgradeArrow_Main", "skin": "resources/homepage/img_upgrade_arrow.png", "height": 44, "centerX": 0 }, "compId": 190, "child": [{ "type": "Animation", "props": { "wrapMode": "0", "name": "arrwojump", "index": 0, "autoPlay": true, "autoAnimation": "ArrowJump" } }] }] }, { "type": "Button", "props": { "width": 120, "var": "UI_Btn_Upgrade_Sub", "stateNum": 1, "skin": "resources/homepage/img_func_bg_0.png", "right": 261, "labelSize": 40, "labelFont": "黑体", "labelColors": "#FFFFFF", "height": 120, "bottom": 98 }, "child": [{ "type": "Image", "props": { "skin": "resources/homepage/img_sub.png", "centerY": 0, "centerX": 0 } }, { "type": "Image", "props": { "skin": "resources/homepage/img_txt_sub.png", "centerX": 0, "bottom": -80 } }, { "type": "Image", "props": { "y": -40, "width": 88, "var": "UI_Img_UpgradeArrow_Sub", "skin": "resources/homepage/img_upgrade_arrow.png", "height": 32, "centerX": 0 }, "compId": 189, "child": [{ "type": "Animation", "props": { "wrapMode": "0", "name": "arrwojump", "index": 0, "autoPlay": true, "autoAnimation": "ArrowJump" } }] }] }, { "type": "Button", "props": { "width": 120, "var": "UI_Btn_Upgrade_Money", "stateNum": 1, "skin": "resources/homepage/img_func_bg_0.png", "right": 73, "labelSize": 40, "labelFont": "黑体", "labelColors": "#FFFFFF", "height": 120, "bottom": 98 }, "child": [{ "type": "Image", "props": { "skin": "resources/homepage/img_spawn.png", "centerY": 0, "centerX": 0 } }, { "type": "Image", "props": { "skin": "resources/homepage/img_txt_spawn.png", "centerX": 0, "bottom": -80 } }, { "type": "Image", "props": { "y": -40, "width": 88, "var": "UI_Img_UpgradeArrow_Money", "skin": "resources/homepage/img_upgrade_arrow.png", "height": 32, "centerX": 0 }, "compId": 188, "child": [{ "type": "Animation", "props": { "wrapMode": "0", "name": "arrwojump", "index": 0, "autoPlay": true, "autoAnimation": "ArrowJump" } }] }] }, { "type": "Box", "props": { "width": 186, "var": "UI_Box_Coin_Pos", "right": 40, "height": 100, "bottom": 275 } }] }] }, { "type": "Box", "props": { "width": 200, "top": 0, "name": "Box_TopLeft", "left": 0, "height": 200 }, "child": [{ "type": "Button", "props": { "y": 80, "x": 30, "width": 104, "var": "UI_Btn_Setting", "stateNum": 1, "skin": "resources/common/img_setting.png", "height": 113 } }, { "type": "TextInput", "props": { "y": 137, "x": 27, "width": 417, "visible": false, "var": "UI_Ipt_SelectLevel", "type": "number", "skin": "resources/common/interface_btn_gray.png", "promptColor": "#ababab", "prompt": "点击输入关卡编号", "height": 158, "fontSize": 45, "font": "黑体", "color": "#ffffff", "align": "center", "sizeGrid": "50,70,50,70" } }, { "type": "Button", "props": { "y": 317, "x": 36, "width": 401, "visible": false, "var": "UI_Btn_EnterSelectedLevel", "stateNum": 1, "skin": "resources/common/interface_btn_green.png", "labelSize": 40, "labelFont": "黑体", "labelColors": "#FFFFFF", "label": "点击进入特定关卡", "height": 119, "sizeGrid": "50,70,50,70" } }] }, { "type": "Image", "props": { "width": 2000, "var": "UI_Img_Black_Cover", "height": 3000, "centerY": 0, "centerX": 0 } }], "animations": [{ "nodes": [{ "target": 188, "keyframes": { "y": [{ "value": -40, "tweenMethod": "linearNone", "tween": true, "target": 188, "key": "y", "index": 0 }, { "value": -50, "tweenMethod": "linearNone", "tween": true, "target": 188, "key": "y", "index": 3 }, { "value": -56, "tweenMethod": "linearNone", "tween": true, "target": 188, "key": "y", "index": 5 }, { "value": -50, "tweenMethod": "linearNone", "tween": true, "target": 188, "key": "y", "index": 7 }, { "value": -40, "tweenMethod": "linearNone", "tween": true, "target": 188, "key": "y", "index": 10 }] } }, { "target": 189, "keyframes": { "y": [{ "value": -40, "tweenMethod": "linearNone", "tween": true, "target": 189, "key": "y", "index": 0 }, { "value": -50, "tweenMethod": "linearNone", "tween": true, "target": 189, "key": "y", "index": 3 }, { "value": -56, "tweenMethod": "linearNone", "tween": true, "target": 189, "key": "y", "index": 5 }, { "value": -50, "tweenMethod": "linearNone", "tween": true, "target": 189, "key": "y", "index": 7 }, { "value": -40, "tweenMethod": "linearNone", "tween": true, "target": 189, "key": "y", "index": 10 }] } }, { "target": 190, "keyframes": { "y": [{ "value": -50, "tweenMethod": "linearNone", "tween": true, "target": 190, "key": "y", "index": 0 }, { "value": -60, "tweenMethod": "linearNone", "tween": true, "target": 190, "key": "y", "index": 3 }, { "value": -66, "tweenMethod": "linearNone", "tween": true, "target": 190, "key": "y", "index": 5 }, { "value": -60, "tweenMethod": "linearNone", "tween": true, "target": 190, "key": "y", "index": 7 }, { "value": -50, "tweenMethod": "linearNone", "tween": true, "target": 190, "key": "y", "index": 10 }] } }, { "target": 194, "keyframes": { "y": [{ "value": -40, "tweenMethod": "linearNone", "tween": true, "target": 194, "key": "y", "index": 0 }, { "value": -50, "tweenMethod": "linearNone", "tween": true, "target": 194, "key": "y", "index": 3 }, { "value": -56, "tweenMethod": "linearNone", "tween": true, "target": 194, "key": "y", "index": 5 }, { "value": -50, "tweenMethod": "linearNone", "tween": true, "target": 194, "key": "y", "index": 7 }, { "value": -40, "tweenMethod": "linearNone", "tween": true, "target": 194, "key": "y", "index": 10 }] } }], "name": "ArrowJump", "id": 2, "frameRate": 24, "action": 2 }, { "nodes": [{ "target": 197, "keyframes": { "rotation": [{ "value": 0, "tweenMethod": "linearNone", "tween": true, "target": 197, "key": "rotation", "index": 0 }, { "value": 0, "tweenMethod": "linearNone", "tween": true, "target": 197, "key": "rotation", "index": 36 }, { "value": 15, "tweenMethod": "linearNone", "tween": true, "target": 197, "key": "rotation", "index": 40 }, { "value": -15, "tweenMethod": "linearNone", "tween": true, "target": 197, "key": "rotation", "index": 44 }, { "value": 15, "tweenMethod": "linearNone", "tween": true, "target": 197, "key": "rotation", "index": 48 }, { "value": -15, "tweenMethod": "linearNone", "tween": true, "target": 197, "key": "rotation", "index": 52 }, { "value": 0, "tweenMethod": "linearNone", "tween": true, "target": 197, "key": "rotation", "index": 56 }] } }], "name": "SeeSaw", "id": 3, "frameRate": 24, "action": 2 }] };
    ui.HomePageUI = HomePageUI;
})(ui || (ui = {}));
(function (ui) {
    var InviteFriendUI = (function (_super) {
        __extends(InviteFriendUI, _super);
        function InviteFriendUI() {
            return _super.call(this) || this;
        }
        InviteFriendUI.prototype.createChildren = function () {
            View.regComponent("ui.Effect.ClickUpEffectUI", ui.Effect.ClickUpEffectUI);
            View.regComponent("ui.Effect.ClickDownEffectUI", ui.Effect.ClickDownEffectUI);
            _super.prototype.createChildren.call(this);
            this.createView(ui.InviteFriendUI.uiView);
        };
        return InviteFriendUI;
    }(View));
    InviteFriendUI.uiView = { "type": "View", "props": { "width": 1080, "height": 1920 }, "child": [{ "type": "Button", "props": { "var": "UI_Btn_Cancel", "top": 0, "stateNum": 1, "skin": "resources/common/img_black.png", "right": 0, "left": 0, "bottom": 0, "sizeGrid": "2,2,2,2" } }, { "type": "Image", "props": { "width": 843, "var": "UI_Img_Scale", "skin": "resources/unpack/img_panel_bg_0.png", "height": 1121, "centerX": 0, "bottom": 300, "anchorY": 1, "anchorX": 0.5 }, "child": [{ "type": "List", "props": { "width": 770, "var": "UI_List_InviteFriend", "top": 50, "height": 880, "centerX": 0 } }, { "type": "Label", "props": { "var": "UI_Txt_CheckTip", "valign": "middle", "top": 0, "text": "查询中，请稍后...", "right": 0, "left": 0, "fontSize": 45, "font": "黑体", "color": "#ffffff", "bottom": 0, "align": "center" } }, { "type": "Button", "props": { "y": 1004, "width": 263, "var": "UI_Btn_InviteFriend", "stateNum": 1, "skin": "resources/common/img_btn_orange.png", "sizeGrid": "40,50,40,50", "labelSize": 45, "labelFont": "黑体", "labelColors": "#ffffff", "label": "邀请好友", "height": 93, "centerX": 0, "anchorY": 0.5, "anchorX": 0.5 }, "child": [{ "type": "Script", "props": { "playEvent": "mouseup", "name": "u", "runtime": "ui.Effect.ClickUpEffectUI" } }, { "type": "Script", "props": { "playEvent": "mousedown", "name": "d", "runtime": "ui.Effect.ClickDownEffectUI" } }, { "type": "Script", "props": { "playEvent": "mouseout", "name": "o", "runtime": "ui.Effect.ClickUpEffectUI" } }] }] }] };
    ui.InviteFriendUI = InviteFriendUI;
})(ui || (ui = {}));
(function (ui) {
    var InviteVerifyFriendUI = (function (_super) {
        __extends(InviteVerifyFriendUI, _super);
        function InviteVerifyFriendUI() {
            return _super.call(this) || this;
        }
        InviteVerifyFriendUI.prototype.createChildren = function () {
            View.regComponent("ui.Effect.ClickDownEffectUI", ui.Effect.ClickDownEffectUI);
            View.regComponent("ui.Effect.ClickUpEffectUI", ui.Effect.ClickUpEffectUI);
            _super.prototype.createChildren.call(this);
            this.createView(ui.InviteVerifyFriendUI.uiView);
        };
        return InviteVerifyFriendUI;
    }(View));
    InviteVerifyFriendUI.uiView = { "type": "View", "props": { "width": 1080, "height": 1920 }, "child": [{ "type": "Button", "props": { "var": "UI_Btn_Cancel", "top": 0, "stateNum": 1, "skin": "resources/common/img_black.png", "right": 0, "left": 0, "bottom": 0, "sizeGrid": "2,2,2,2" } }, { "type": "Image", "props": { "width": 947, "var": "UI_Img_Scale", "skin": "resources/unpack/img_panel_bg_0.png", "height": 1442, "centerX": 0, "bottom": 256, "anchorY": 1, "anchorX": 0.5 }, "child": [{ "type": "Image", "props": { "width": 418, "top": 107, "skin": "resources/verify/img_txt_invite.png", "height": 91, "centerX": 6 } }, { "type": "Image", "props": { "width": 700, "top": 208, "skin": "resources/unpack/img_lottery_bg.png", "height": 700, "centerX": 0 }, "child": [{ "type": "Box", "props": { "y": 125, "x": 125, "width": 150, "var": "UI_LotteryBox_0", "height": 150, "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Box", "props": { "y": 125, "x": 275, "width": 150, "var": "UI_LotteryBox_1", "height": 150, "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Box", "props": { "y": 125, "x": 425, "width": 150, "var": "UI_LotteryBox_2", "height": 150, "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Box", "props": { "y": 125, "x": 575, "width": 150, "var": "UI_LotteryBox_3", "height": 150, "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Box", "props": { "y": 275, "x": 575, "width": 150, "var": "UI_LotteryBox_4", "height": 150, "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Box", "props": { "y": 425, "x": 575, "width": 150, "var": "UI_LotteryBox_5", "height": 150, "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Box", "props": { "y": 575, "x": 575, "width": 150, "var": "UI_LotteryBox_6", "height": 150, "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Box", "props": { "y": 575, "x": 425, "width": 150, "var": "UI_LotteryBox_7", "height": 150, "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Box", "props": { "y": 575, "x": 275, "width": 150, "var": "UI_LotteryBox_8", "height": 150, "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Box", "props": { "y": 575, "x": 125, "width": 150, "var": "UI_LotteryBox_9", "height": 150, "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Box", "props": { "y": 425, "x": 125, "width": 150, "var": "UI_LotteryBox_10", "height": 150, "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Box", "props": { "y": 275, "x": 125, "width": 150, "var": "UI_LotteryBox_11", "height": 150, "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Button", "props": { "y": 350, "x": 350, "width": 300, "var": "UI_Btn_Lottery", "stateNum": 1, "skin": "resources/invitefriend/img_btn_lottery.png", "labelSize": 100, "labelColors": "#FFFFFF", "label": "10", "height": 300, "centerY": 0, "centerX": 0, "anchorY": 0.5, "anchorX": 0.5 }, "child": [{ "type": "Script", "props": { "playEvent": "mousedown", "name": "d", "runtime": "ui.Effect.ClickDownEffectUI" } }, { "type": "Script", "props": { "playEvent": "mouseup", "name": "u", "runtime": "ui.Effect.ClickUpEffectUI" } }, { "type": "Script", "props": { "playEvent": "mouseout", "name": "o", "runtime": "ui.Effect.ClickUpEffectUI" } }] }] }, { "type": "Box", "props": { "width": 770, "var": "UI_Box_InviteList", "height": 145, "centerX": 0, "bottom": 295 }, "child": [{ "type": "Image", "props": { "width": 780, "skin": "resources/unpack/img_list_bg.png", "height": 129, "centerY": 0, "centerX": 0 }, "child": [{ "type": "List", "props": { "width": 605, "var": "UI_List_InviteFriend", "spaceX": 20, "repeatY": 1, "height": 105, "centerY": 0, "centerX": 0 } }] }, { "type": "Image", "props": { "width": 15, "skin": "resources/invitefriend/img_arrow.png", "right": 36, "height": 39, "centerY": 0, "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "width": 15, "skin": "resources/invitefriend/img_arrow.png", "rotation": 180, "left": 36, "height": 39, "centerY": 0, "anchorY": 0.5, "anchorX": 0.5 } }] }, { "type": "Label", "props": { "width": 600, "var": "UI_Txt_CheckTip", "valign": "middle", "text": "查询中，请稍后...", "height": 145, "fontSize": 45, "font": "黑体", "color": "#ffffff", "centerX": 0, "bottom": 295, "align": "center" } }, { "type": "Button", "props": { "width": 263, "var": "UI_Btn_InviteFriend", "stateNum": 1, "skin": "resources/common/img_btn_orange.png", "labelSize": 36, "labelFont": "黑体", "labelColors": "#ffffff", "label": "邀请好友", "height": 93, "centerX": 0, "bottom": 126, "anchorY": 0.5, "anchorX": 0.5 }, "child": [{ "type": "Script", "props": { "playEvent": "mouseup", "name": "u", "runtime": "ui.Effect.ClickUpEffectUI" } }, { "type": "Script", "props": { "playEvent": "mousedown", "name": "d", "runtime": "ui.Effect.ClickDownEffectUI" } }, { "type": "Script", "props": { "playEvent": "mouseout", "name": "o", "runtime": "ui.Effect.ClickUpEffectUI" } }] }, { "type": "Button", "props": { "y": -53, "x": 167, "width": 241, "visible": false, "var": "UI_Btn_Lottery_SpeedUp", "stateNum": 1, "skin": "resources/common/interface_btn_orange.png", "labelSize": 50, "labelFont": "黑体", "labelColors": "#FFFFFF", "label": "加速转盘", "height": 110, "sizeGrid": "50,70,50,70" } }, { "type": "Button", "props": { "y": -53, "x": 547, "width": 241, "visible": false, "var": "UI_Btn_Lottery_SpeedDown", "stateNum": 1, "skin": "resources/common/interface_btn_green.png", "labelSize": 50, "labelFont": "黑体", "labelColors": "#FFFFFF", "label": "减速转盘", "height": 110, "sizeGrid": "50,70,50,70" } }, { "type": "Box", "props": { "width": 500, "height": 100, "centerX": 0, "bottom": 441 }, "child": [{ "type": "Image", "props": { "x": 285, "width": 58, "skin": "resources/invitefriend/img_phone.png", "height": 86, "centerY": 0 }, "child": [{ "type": "Label", "props": { "x": 100, "width": 185, "var": "UI_Txt_VerifyNum", "valign": "middle", "text": "888", "height": 100, "fontSize": 80, "color": "#fff510", "centerY": 0 } }] }, { "type": "Image", "props": { "x": 0, "width": 89, "skin": "resources/invitefriend/img_verify.png", "height": 87, "centerY": 0 }, "child": [{ "type": "Label", "props": { "x": 100, "width": 185, "var": "UI_Txt_InviteNum", "valign": "middle", "text": "888", "height": 100, "fontSize": 80, "color": "#fff510", "centerY": 0 } }] }] }, { "type": "Button", "props": { "var": "UI_Btn_CheckLotteryHist", "top": 48, "stateNum": 1, "skin": "resources/invitefriend/img_checkhist.png", "right": 33 } }] }] };
    ui.InviteVerifyFriendUI = InviteVerifyFriendUI;
})(ui || (ui = {}));
(function (ui) {
    var LeaderboardUI = (function (_super) {
        __extends(LeaderboardUI, _super);
        function LeaderboardUI() {
            return _super.call(this) || this;
        }
        LeaderboardUI.prototype.createChildren = function () {
            View.regComponent("ui.Effect.ClickDownEffectUI", ui.Effect.ClickDownEffectUI);
            View.regComponent("ui.Effect.ClickUpEffectUI", ui.Effect.ClickUpEffectUI);
            _super.prototype.createChildren.call(this);
            this.createView(ui.LeaderboardUI.uiView);
        };
        return LeaderboardUI;
    }(View));
    LeaderboardUI.uiView = { "type": "View", "props": { "width": 1080, "height": 1920 }, "child": [{ "type": "Button", "props": { "var": "UI_Btn_Cancel", "top": 0, "stateNum": 1, "skin": "resources/common/img_black.png", "right": 0, "left": 0, "bottom": 0, "sizeGrid": "2,2,2,2" } }, { "type": "Image", "props": { "width": 948, "var": "UI_Img_Scale", "skin": "resources/unpack/img_panel_bg_0.png", "height": 1171, "centerX": 0, "bottom": 300, "anchorY": 1, "anchorX": 0.5 }, "child": [{ "type": "Image", "props": { "width": 307, "top": 110, "skin": "resources/leaderboard/interface_title_rank.png", "height": 77, "centerX": 0 } }, { "type": "Button", "props": { "y": 1035, "width": 263, "var": "UI_Btn_Invite_Friend", "stateNum": 1, "skin": "resources/common/img_btn_orange.png", "height": 93, "centerX": 0, "anchorY": 0.5, "anchorX": 0.5 }, "child": [{ "type": "Label", "props": { "valign": "middle", "top": 0, "text": "邀请好友", "right": 0, "left": 0, "fontSize": 36, "font": "黑体", "color": "#ffffff", "bottom": 0, "bold": false, "align": "center" } }, { "type": "Script", "props": { "y": 0, "x": 0, "playEvent": "mousedown", "name": "d", "runtime": "ui.Effect.ClickDownEffectUI" } }, { "type": "Script", "props": { "playEvent": "mouseup", "name": "u", "runtime": "ui.Effect.ClickUpEffectUI" } }, { "type": "Script", "props": { "playEvent": "mouseout", "name": "o", "runtime": "ui.Effect.ClickUpEffectUI" } }] }, { "type": "Image", "props": { "y": 200, "width": 780, "var": "UI_Img_SharedCanvas", "height": 750, "centerX": 0 } }] }] };
    ui.LeaderboardUI = LeaderboardUI;
})(ui || (ui = {}));
(function (ui) {
    var LevelUI = (function (_super) {
        __extends(LevelUI, _super);
        function LevelUI() {
            return _super.call(this) || this;
        }
        LevelUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.createView(ui.LevelUI.uiView);
        };
        return LevelUI;
    }(View));
    LevelUI.uiView = { "type": "View", "props": { "width": 1080, "height": 1920 }, "child": [{ "type": "Box", "props": { "width": 300, "var": "UI_Box_Level", "top": 316, "height": 150, "centerX": 0 }, "child": [{ "type": "Image", "props": { "x": -74, "width": 224, "var": "UI_Img_Prev", "skin": "resources/level/img_level_other.png", "height": 84, "centerY": 0, "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "x": 150, "width": 224, "var": "UI_Img_Cur", "skin": "resources/level/img_level_now.png", "height": 84, "centerY": -20, "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "x": 374, "width": 224, "var": "UI_Img_Next", "skin": "resources/level/img_level_other.png", "height": 84, "centerY": 0, "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Label", "props": { "y": 76, "x": 38, "width": 100, "visible": false, "valign": "middle", "text": "8888", "height": 70, "fontSize": 30, "font": "黑体", "color": "#ffffff", "bold": true, "anchorY": 0.5, "anchorX": 0.5, "align": "center" } }, { "type": "Label", "props": { "y": 76, "x": 150, "width": 100, "visible": false, "valign": "middle", "text": "88", "height": 70, "fontSize": 40, "font": "黑体", "color": "#ffffff", "bold": true, "anchorY": 0.5, "anchorX": 0.5, "align": "center" } }, { "type": "Label", "props": { "y": 75, "x": 265, "width": 100, "visible": false, "valign": "middle", "text": "888", "height": 70, "fontSize": 40, "font": "黑体", "color": "#ffffff", "bold": true, "anchorY": 0.5, "anchorX": 0.5, "align": "center" } }] }] };
    ui.LevelUI = LevelUI;
})(ui || (ui = {}));
(function (ui) {
    var LoadingUI = (function (_super) {
        __extends(LoadingUI, _super);
        function LoadingUI() {
            return _super.call(this) || this;
        }
        LoadingUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.createView(ui.LoadingUI.uiView);
        };
        return LoadingUI;
    }(View));
    LoadingUI.uiView = { "type": "View", "props": { "width": 1080, "height": 1920 }, "child": [{ "type": "Image", "props": { "var": "loadingBG", "top": 0, "right": 0, "name": "loadingBG", "left": 0, "bottom": 0 } }, { "type": "Image", "props": { "width": 883, "visible": false, "top": 255, "skin": "resources/unpack/img_logo.png", "name": "logo", "height": 360, "centerX": -25 } }, { "type": "Box", "props": { "width": 741, "var": "UI_Box_Progress", "height": 59, "centerY": 59, "centerX": 0 }, "child": [{ "type": "Image", "props": { "width": 371, "top": -69, "skin": "resources/unpack/img_loading.png", "height": 53, "centerX": 32 } }, { "type": "Image", "props": { "y": 0, "x": 0, "width": 741, "var": "UI_Progress_0", "skin": "resources/unpack/img_progress_0.png", "sizeGrid": "0,128,0,128", "height": 59, "centerY": 0, "centerX": 0 }, "child": [{ "type": "Label", "props": { "y": 17, "x": 856, "width": 46, "visible": false, "var": "UI_Txt_Progress", "valign": "middle", "text": "100%", "right": 8, "height": 24, "fontSize": 21, "font": "黑体", "color": "#8bebf6", "centerY": 0, "bold": true, "align": "center" } }] }, { "type": "Image", "props": { "y": 0, "x": 0, "width": 741, "var": "UI_Progress_1", "skin": "resources/unpack/img_progress_1.png", "sizeGrid": "0,8,0,8", "height": 59, "centerY": 0, "centerX": 0 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 0, "var": "UI_Progress_Mask", "skin": "resources/unpack/img_progress_1.png", "renderType": "mask", "height": 59 } }] }] }, { "type": "Image", "props": { "width": 908, "skin": "resources/unpack/img_message.png", "height": 171, "centerX": 0, "bottom": 103 } }] };
    ui.LoadingUI = LoadingUI;
})(ui || (ui = {}));
(function (ui) {
    var LotteryResultUI = (function (_super) {
        __extends(LotteryResultUI, _super);
        function LotteryResultUI() {
            return _super.call(this) || this;
        }
        LotteryResultUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.createView(ui.LotteryResultUI.uiView);
        };
        return LotteryResultUI;
    }(View));
    LotteryResultUI.uiView = { "type": "View", "props": { "width": 1080, "height": 1920 }, "child": [{ "type": "Button", "props": { "var": "UI_Btn_Back", "top": 0, "stateNum": 1, "skin": "resources/common/background.png", "right": 0, "left": 0, "bottom": 0, "sizeGrid": "5,5,5,5" }, "child": [{ "type": "Image", "props": { "y": 429, "x": 128, "width": 825, "var": "img_box", "skin": "resources/unpack/img_lottery_result_bg.png", "sizeGrid": "90,90,90,90", "height": 468, "centerX": 0 }, "child": [{ "type": "List", "props": { "width": 600, "var": "UI_List_LotteryReward", "repeatX": 4, "height": 300, "centerY": 17, "centerX": 0, "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "width": 400, "var": "img_GetAward", "skin": "resources/invitefriend/img_qrcode.png", "height": 400, "centerX": 0, "bottom": -439 }, "child": [{ "type": "Label", "props": { "y": 410, "width": 386, "text": "领奖平台", "height": 92, "fontSize": 48, "font": "黑体", "color": "#ffffff", "centerX": 0, "bold": true, "align": "center" } }] }, { "type": "Box", "props": { "y": 172, "x": 99, "width": 658, "visible": false, "var": "box_DieSHow", "pivotY": 1, "pivotX": 2, "height": 164 }, "child": [{ "type": "Box", "props": { "y": 13, "x": -14, "width": 183, "height": 177 }, "child": [{ "type": "Image", "props": { "y": 57, "x": 104, "width": 120, "skin": "resources/verify/buleCard.png", "height": 120, "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Label", "props": { "y": 112, "x": 56, "width": 96, "visible": true, "valign": "middle", "text": "社区蓝卡", "height": 50, "fontSize": 25, "font": "Microsoft YaHei", "color": "#dbf2ff", "align": "center" } }] }, { "type": "Box", "props": { "y": 13, "x": 138 }, "child": [{ "type": "Image", "props": { "y": 57, "x": 104, "width": 120, "skin": "resources/verify/role_fight_weapon_01.png", "height": 120, "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Label", "props": { "y": 112, "x": 56, "width": 96, "visible": true, "valign": "middle", "text": "导弹机体", "height": 50, "fontSize": 25, "font": "Microsoft YaHei", "color": "#dbf2ff", "align": "center" } }] }, { "type": "Box", "props": { "y": 13, "x": 444 }, "child": [{ "type": "Image", "props": { "y": 57, "x": 104, "width": 120, "skin": "resources/verify/zuanpanIcon.png", "height": 120, "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Label", "props": { "y": 110, "x": 53, "width": 96, "visible": true, "valign": "middle", "text": "钻盘10次", "height": 50, "fontSize": 25, "font": "Microsoft YaHei", "color": "#dbf2ff", "align": "center" } }] }, { "type": "Box", "props": { "y": 13, "x": 285 }, "child": [{ "type": "Image", "props": { "y": 57, "x": 104, "width": 120, "skin": "resources/verify/img_icon_diamond.png", "height": 120, "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Label", "props": { "y": 112, "x": 56, "width": 96, "visible": true, "valign": "middle", "text": "钻石2000", "height": 50, "fontSize": 25, "font": "Microsoft YaHei", "color": "#dbf2ff", "align": "center" } }] }] }] }] }] };
    ui.LotteryResultUI = LotteryResultUI;
})(ui || (ui = {}));
(function (ui) {
    var LotteryRewardHistUI = (function (_super) {
        __extends(LotteryRewardHistUI, _super);
        function LotteryRewardHistUI() {
            return _super.call(this) || this;
        }
        LotteryRewardHistUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.createView(ui.LotteryRewardHistUI.uiView);
        };
        return LotteryRewardHistUI;
    }(View));
    LotteryRewardHistUI.uiView = { "type": "View", "props": { "width": 1080, "height": 1920 }, "child": [{ "type": "Button", "props": { "var": "UI_Btn_Back", "top": 0, "stateNum": 1, "skin": "resources/common/background.png", "right": 0, "left": 0, "bottom": 0, "sizeGrid": "5,5,5,5" } }, { "type": "Image", "props": { "width": 784, "top": 195, "skin": "resources/unpack/img_lottery_history_bg.png", "height": 653, "centerX": 0 } }, { "type": "List", "props": { "width": 746, "var": "UI_List_Hist", "top": 360, "height": 400, "centerX": 0 } }, { "type": "Image", "props": { "width": 400, "skin": "resources/invitefriend/img_qrcode.png", "height": 400, "centerX": 0, "bottom": 500 }, "child": [{ "type": "Label", "props": { "y": 410, "width": 386, "text": "领奖平台", "height": 92, "fontSize": 48, "font": "黑体", "color": "#ffffff", "centerX": 0, "bold": true, "align": "center" } }] }] };
    ui.LotteryRewardHistUI = LotteryRewardHistUI;
})(ui || (ui = {}));
(function (ui) {
    var MoneyInfoUI = (function (_super) {
        __extends(MoneyInfoUI, _super);
        function MoneyInfoUI() {
            return _super.call(this) || this;
        }
        MoneyInfoUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.createView(ui.MoneyInfoUI.uiView);
        };
        return MoneyInfoUI;
    }(View));
    MoneyInfoUI.uiView = { "type": "View", "props": { "width": 1080, "mouseThrough": true, "mouseEnabled": true, "height": 1920 }, "child": [{ "type": "HBox", "props": { "width": 784, "var": "UI_Anchor_Top", "top": 0, "space": 0, "left": 160, "height": 160, "align": "middle" }, "child": [{ "type": "Button", "props": { "width": 240, "var": "UI_Btn_Add_Coin", "stateNum": 1, "skin": "resources/moneyinfo/img_bg.png", "left": 0, "height": 70, "bottom": 0, "sizeGrid": "16,16,16,16" }, "child": [{ "type": "Image", "props": { "width": 69, "skin": "resources/moneyinfo/img_icon_coin.png", "left": 5, "height": 63, "centerY": 0 } }, { "type": "Label", "props": { "wordWrap": true, "width": 145, "var": "UI_Txt_Coin", "valign": "top", "text": "8.88M", "height": 40, "fontSize": 40, "color": "#ffffff", "centerY": 0, "centerX": 0, "align": "center" } }, { "type": "Image", "props": { "width": 46, "skin": "resources/moneyinfo/img_icon_add.png", "right": 10, "height": 45, "centerY": 0 } }] }, { "type": "Button", "props": { "width": 240, "var": "UI_Btn_Add_Power", "stateNum": 1, "skin": "resources/moneyinfo/img_bg.png", "height": 70, "centerX": 0, "bottom": 0, "sizeGrid": "16,16,16,16" }, "child": [{ "type": "Box", "props": { "width": 159, "height": 73, "centerY": 0, "centerX": 0 }, "child": [{ "type": "Image", "props": { "width": 151, "visible": false, "skin": "resources/moneyinfo/power_progress_bg.png", "name": "progressBG", "height": 46, "centerY": 0, "centerX": 0 }, "child": [{ "type": "Image", "props": { "top": 0, "skin": "resources/moneyinfo/power_progress.png", "right": 0, "left": 0, "bottom": 0 }, "child": [{ "type": "Image", "props": { "width": 151, "var": "UI_Img_Power_Mask", "top": 0, "skin": "resources/common/img_blue.png", "renderType": "mask", "left": 0, "height": 46, "sizeGrid": "2,2,2,2" } }] }] }, { "type": "Label", "props": { "wordWrap": true, "width": 145, "var": "UI_Txt_Power", "valign": "top", "text": "8.88M", "height": 40, "fontSize": 40, "color": "#ffffff", "centerY": 0, "centerX": 0, "align": "center" } }, { "type": "Label", "props": { "x": 29, "width": 182, "var": "UI_Txt_PowerCount", "valign": "top", "text": "88:88 +1", "height": 30, "fontSize": 25, "color": "#ffffff", "centerX": 0, "bottom": -8, "align": "center" } }] }, { "type": "Image", "props": { "width": 69, "skin": "resources/moneyinfo/img_icon_power.png", "left": 5, "height": 63, "centerY": 0 } }, { "type": "Image", "props": { "width": 46, "skin": "resources/moneyinfo/img_icon_add.png", "right": 10, "height": 45, "centerY": 0 } }] }, { "type": "Button", "props": { "width": 240, "var": "UI_Btn_Add_Diamond", "stateNum": 1, "skin": "resources/moneyinfo/img_bg.png", "right": 0, "height": 70, "bottom": 0, "sizeGrid": "16,16,16,16" }, "child": [{ "type": "Image", "props": { "width": 69, "skin": "resources/moneyinfo/img_icon_diamond.png", "left": 5, "height": 63, "centerY": 0 } }, { "type": "Label", "props": { "wordWrap": true, "width": 145, "var": "UI_Txt_Diamond", "valign": "top", "text": "8.88M", "height": 40, "fontSize": 40, "color": "#ffffff", "centerY": 0, "centerX": 0, "align": "center" } }, { "type": "Image", "props": { "width": 46, "skin": "resources/moneyinfo/img_icon_add.png", "right": 10, "height": 45, "centerY": 0 } }] }] }] };
    ui.MoneyInfoUI = MoneyInfoUI;
})(ui || (ui = {}));
(function (ui) {
    var MoreSpawnUI = (function (_super) {
        __extends(MoreSpawnUI, _super);
        function MoreSpawnUI() {
            return _super.call(this) || this;
        }
        MoreSpawnUI.prototype.createChildren = function () {
            View.regComponent("ui.Effect.ClickDownEffectUI", ui.Effect.ClickDownEffectUI);
            View.regComponent("ui.Effect.ClickUpEffectUI", ui.Effect.ClickUpEffectUI);
            _super.prototype.createChildren.call(this);
            this.createView(ui.MoreSpawnUI.uiView);
        };
        return MoreSpawnUI;
    }(View));
    MoreSpawnUI.uiView = { "type": "View", "props": { "width": 1080, "height": 1920 }, "child": [{ "type": "Image", "props": { "top": 0, "skin": "resources/common/img_black.png", "right": 0, "left": 0, "bottom": 0, "sizeGrid": "2,2,2,2" } }, { "type": "Image", "props": { "width": 870, "skin": "resources/common/interface_common_bg.png", "height": 434, "centerY": 0, "centerX": 0, "sizeGrid": "90,90,90,90" }, "child": [{ "type": "Label", "props": { "width": 614, "var": "UI_Txt_Tip", "top": 114, "text": "观看视频可以五倍领取", "height": 51, "fontSize": 50, "font": "黑体", "color": "#ffffff", "centerX": 0, "align": "center" } }, { "type": "Button", "props": { "var": "UI_Btn_Normal", "stateNum": 1, "skin": "resources/common/interface_btn_green.png", "right": 150, "labelSize": 50, "labelFont": "黑体", "labelColors": "#ffffff", "label": "一倍领取", "bottom": 100, "anchorY": 0.5, "anchorX": 0.5, "sizeGrid": "50,70,50,70" }, "child": [{ "type": "Script", "props": { "y": 0, "x": 0, "playEvent": "mousedown", "name": "d", "runtime": "ui.Effect.ClickDownEffectUI" } }, { "type": "Script", "props": { "playEvent": "mouseup", "name": "u", "runtime": "ui.Effect.ClickUpEffectUI" } }, { "type": "Script", "props": { "playEvent": "mouseout", "name": "o", "runtime": "ui.Effect.ClickUpEffectUI" } }] }, { "type": "Button", "props": { "var": "UI_Btn_More", "stateNum": 1, "skin": "resources/common/interface_btn_orange.png", "left": 150, "labelSize": 50, "labelFont": "黑体", "labelColors": "#ffffff", "label": "五倍领取", "bottom": 100, "anchorY": 0.5, "anchorX": 0.5, "sizeGrid": "50,70,50,70" }, "child": [{ "type": "Script", "props": { "y": 0, "x": 0, "playEvent": "mousedown", "name": "d", "runtime": "ui.Effect.ClickDownEffectUI" } }, { "type": "Script", "props": { "playEvent": "mouseup", "name": "u", "runtime": "ui.Effect.ClickUpEffectUI" } }, { "type": "Script", "props": { "playEvent": "mouseout", "name": "o", "runtime": "ui.Effect.ClickUpEffectUI" } }] }] }] };
    ui.MoreSpawnUI = MoreSpawnUI;
})(ui || (ui = {}));
(function (ui) {
    var PrefabUI;
    (function (PrefabUI) {
        var BattlePropPrefabUI = (function (_super) {
            __extends(BattlePropPrefabUI, _super);
            function BattlePropPrefabUI() {
                return _super.call(this) || this;
            }
            BattlePropPrefabUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.PrefabUI.BattlePropPrefabUI.uiView);
            };
            return BattlePropPrefabUI;
        }(View));
        BattlePropPrefabUI.uiView = { "type": "View", "props": { "width": 128, "height": 128 }, "child": [{ "type": "Sprite", "props": { "y": 64, "x": 64, "width": 128, "var": "sp", "pivotY": 64, "pivotX": 64, "height": 128 }, "compId": 5, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 128, "var": "img_Prop", "pivotY": 0, "pivotX": 0, "height": 128 } }, { "type": "Image", "props": { "y": 0, "x": 0, "width": 128, "var": "img_Pie", "height": 128 }, "child": [{ "type": "Image", "props": { "y": 1, "x": 4, "width": 122, "skin": "resources/prop/icon_circle.png", "renderType": "mask", "pivotY": 0, "pivotX": 0, "height": 123 } }] }] }], "animations": [{ "nodes": [{ "target": 5, "keyframes": { "x": [{ "value": 64, "tweenMethod": "linearNone", "tween": true, "target": 5, "key": "x", "index": 0 }, { "value": 64, "tweenMethod": "linearNone", "tween": true, "target": 5, "key": "x", "index": 12 }, { "value": 64, "tweenMethod": "linearNone", "tween": true, "target": 5, "key": "x", "index": 26 }], "var": [{ "value": "sp", "tweenMethod": "linearNone", "tween": false, "target": 5, "key": "var", "index": 0 }, { "value": "sp", "tweenMethod": "linearNone", "tween": false, "target": 5, "key": "var", "index": 26 }], "alpha": [{ "value": 1, "tweenMethod": "linearNone", "tween": true, "target": 5, "key": "alpha", "index": 0 }, { "value": 0, "tweenMethod": "linearNone", "tween": true, "target": 5, "key": "alpha", "index": 12 }, { "value": 1, "tweenMethod": "linearNone", "tween": true, "target": 5, "key": "alpha", "index": 24 }] } }], "name": "ani1", "id": 1, "frameRate": 24, "action": 0 }] };
        PrefabUI.BattlePropPrefabUI = BattlePropPrefabUI;
    })(PrefabUI = ui.PrefabUI || (ui.PrefabUI = {}));
})(ui || (ui = {}));
(function (ui) {
    var PrefabUI;
    (function (PrefabUI) {
        var BossTestUI = (function (_super) {
            __extends(BossTestUI, _super);
            function BossTestUI() {
                return _super.call(this) || this;
            }
            BossTestUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.PrefabUI.BossTestUI.uiView);
            };
            return BossTestUI;
        }(View));
        BossTestUI.uiView = { "type": "View", "props": { "y": 175, "x": 100, "width": 200, "height": 50, "anchorY": 3.5, "anchorX": 0.5 }, "child": [{ "type": "Image", "props": { "y": 43, "x": -25, "width": 219, "var": "bg_box", "skin": "resources/battle/coin_bottom.png", "height": 70 } }, { "type": "Box", "props": { "y": 49, "x": 64, "width": 101, "var": "widthBox", "height": 51 }, "child": [{ "type": "Image", "props": { "y": 11, "x": 0, "width": 37, "skin": "resources/coinAnim/1.png", "height": 36 } }, { "type": "Label", "props": { "y": 5, "x": 38, "width": 60, "var": "leb_CoinNum", "text": "3", "height": 43, "fontSize": 36, "font": "Microsoft YaHei", "color": "#e0d4a4", "bold": true, "align": "left" } }] }, { "type": "Image", "props": { "y": 1, "x": 89, "visible": false, "skin": "resources/battle/coinMore.png", "scaleY": 1, "scaleX": 1, "pivotY": 64, "pivotX": 99, "anchorY": 0.5, "anchorX": 0.5 }, "compId": 8 }], "animations": [{ "nodes": [{ "target": 8, "keyframes": { "y": [{ "value": 1, "tweenMethod": "linearNone", "tween": true, "target": 8, "key": "y", "index": 0 }, { "value": 1, "tweenMethod": "linearNone", "tween": true, "target": 8, "key": "y", "index": 8 }], "x": [{ "value": 89, "tweenMethod": "linearNone", "tween": true, "target": 8, "key": "x", "index": 0 }, { "value": 89, "tweenMethod": "linearNone", "tween": true, "target": 8, "key": "x", "index": 8 }], "visible": [{ "value": true, "tweenMethod": "linearNone", "tween": false, "target": 8, "key": "visible", "index": 0 }], "scaleY": [{ "value": 0.1, "tweenMethod": "linearNone", "tween": true, "target": 8, "key": "scaleY", "index": 0 }, { "value": 0.5, "tweenMethod": "linearNone", "tween": true, "target": 8, "key": "scaleY", "index": 1 }, { "value": 0.8, "tweenMethod": "linearNone", "tween": true, "target": 8, "key": "scaleY", "index": 2 }, { "value": 0.9, "tweenMethod": "linearNone", "tween": true, "target": 8, "key": "scaleY", "index": 3 }, { "value": 0.95, "tweenMethod": "linearNone", "tween": true, "target": 8, "key": "scaleY", "index": 4 }, { "value": 1, "tweenMethod": "linearNone", "tween": true, "target": 8, "key": "scaleY", "index": 5 }, { "value": 1.02, "tweenMethod": "linearNone", "tween": true, "target": 8, "key": "scaleY", "index": 6 }, { "value": 1.005, "tweenMethod": "linearNone", "tween": true, "target": 8, "key": "scaleY", "index": 7 }, { "value": 1, "tweenMethod": "linearNone", "tween": true, "target": 8, "key": "scaleY", "index": 8 }], "scaleX": [{ "value": 0.1, "tweenMethod": "linearNone", "tween": true, "target": 8, "key": "scaleX", "index": 0 }, { "value": 0.5, "tweenMethod": "linearNone", "tween": true, "target": 8, "key": "scaleX", "index": 1 }, { "value": 0.8, "tweenMethod": "linearNone", "tween": true, "target": 8, "key": "scaleX", "index": 2 }, { "value": 0.9, "tweenMethod": "linearNone", "tween": true, "target": 8, "key": "scaleX", "index": 3 }, { "value": 0.95, "tweenMethod": "linearNone", "tween": true, "target": 8, "key": "scaleX", "index": 4 }, { "value": 1, "tweenMethod": "linearNone", "tween": true, "target": 8, "key": "scaleX", "index": 5 }, { "value": 1.02, "tweenMethod": "linearNone", "tween": true, "target": 8, "key": "scaleX", "index": 6 }, { "value": 1.005, "tweenMethod": "linearNone", "tween": true, "target": 8, "key": "scaleX", "index": 7 }, { "value": 1, "tweenMethod": "linearNone", "tween": true, "target": 8, "key": "scaleX", "index": 8 }], "pivotY": [{ "value": 64, "tweenMethod": "linearNone", "tween": true, "target": 8, "key": "pivotY", "index": 0 }], "pivotX": [{ "value": 99, "tweenMethod": "linearNone", "tween": true, "target": 8, "key": "pivotX", "index": 0 }], "anchorY": [{ "value": 0.5, "tweenMethod": "linearNone", "tween": true, "target": 8, "key": "anchorY", "index": 0 }], "anchorX": [{ "value": 0.5, "tweenMethod": "linearNone", "tween": true, "target": 8, "key": "anchorX", "index": 0 }] } }], "name": "ani1", "id": 1, "frameRate": 24, "action": 0 }] };
        PrefabUI.BossTestUI = BossTestUI;
    })(PrefabUI = ui.PrefabUI || (ui.PrefabUI = {}));
})(ui || (ui = {}));
(function (ui) {
    var PrefabUI;
    (function (PrefabUI) {
        var CoinAddUI = (function (_super) {
            __extends(CoinAddUI, _super);
            function CoinAddUI() {
                return _super.call(this) || this;
            }
            CoinAddUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.PrefabUI.CoinAddUI.uiView);
            };
            return CoinAddUI;
        }(View));
        CoinAddUI.uiView = { "type": "View", "props": { "y": 35, "x": 112, "width": 224, "height": 70, "anchorY": 0.5, "anchorX": 0.5 }, "child": [{ "type": "HBox", "props": { "y": 35, "x": 112, "width": 224, "space": 100, "height": 70, "anchorY": 0.5, "anchorX": 0.5 }, "child": [{ "type": "Image", "props": { "width": 224, "height": 70 }, "child": [{ "type": "Image", "props": { "y": 4, "x": 0, "width": 69, "skin": "resources/moneyinfo/img_icon_coin.png", "height": 63 } }, { "type": "Label", "props": { "width": 141, "var": "lab_money", "valign": "middle", "text": "88.8M", "right": 20, "height": 70, "fontSize": 36, "color": "#ffffff", "centerY": 0, "bold": true, "anchorY": 0.5, "anchorX": 0.5, "align": "center" } }] }] }] };
        PrefabUI.CoinAddUI = CoinAddUI;
    })(PrefabUI = ui.PrefabUI || (ui.PrefabUI = {}));
})(ui || (ui = {}));
(function (ui) {
    var PrefabUI;
    (function (PrefabUI) {
        var DieTimeUI = (function (_super) {
            __extends(DieTimeUI, _super);
            function DieTimeUI() {
                return _super.call(this) || this;
            }
            DieTimeUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.PrefabUI.DieTimeUI.uiView);
            };
            return DieTimeUI;
        }(View));
        DieTimeUI.uiView = { "type": "View", "props": { "width": 25, "height": 25 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 65, "var": "time", "skin": "resources/battle/timeBottom.png", "height": 65, "anchorY": 0.5, "anchorX": 0.5 }, "child": [{ "type": "Image", "props": { "y": 20, "x": 32, "var": "numG", "skin": "resources/battle/num3.png" } }, { "type": "Image", "props": { "y": 19, "x": 20, "var": "numS", "skin": "resources/battle/num1.png" } }] }] };
        PrefabUI.DieTimeUI = DieTimeUI;
    })(PrefabUI = ui.PrefabUI || (ui.PrefabUI = {}));
})(ui || (ui = {}));
(function (ui) {
    var PrefabUI;
    (function (PrefabUI) {
        var FloatTipItemPrefab_LotteryUI = (function (_super) {
            __extends(FloatTipItemPrefab_LotteryUI, _super);
            function FloatTipItemPrefab_LotteryUI() {
                return _super.call(this) || this;
            }
            FloatTipItemPrefab_LotteryUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.PrefabUI.FloatTipItemPrefab_LotteryUI.uiView);
            };
            return FloatTipItemPrefab_LotteryUI;
        }(View));
        FloatTipItemPrefab_LotteryUI.uiView = { "type": "View", "props": { "width": 500, "height": 60 }, "child": [{ "type": "Image", "props": { "top": 0, "skin": "resources/common/img_black.png", "right": 0, "left": 0, "bottom": 0, "sizeGrid": "2,2,2,2" } }, { "type": "Label", "props": { "var": "UI_Txt_Tip", "valign": "middle", "top": 0, "text": "网络不好，请重试", "right": 0, "left": 0, "fontSize": 36, "font": "黑体", "color": "#ffffff", "bottom": 0, "align": "center" } }] };
        PrefabUI.FloatTipItemPrefab_LotteryUI = FloatTipItemPrefab_LotteryUI;
    })(PrefabUI = ui.PrefabUI || (ui.PrefabUI = {}));
})(ui || (ui = {}));
(function (ui) {
    var PrefabUI;
    (function (PrefabUI) {
        var FloatTipItemPrefab_UpgradeUI = (function (_super) {
            __extends(FloatTipItemPrefab_UpgradeUI, _super);
            function FloatTipItemPrefab_UpgradeUI() {
                return _super.call(this) || this;
            }
            FloatTipItemPrefab_UpgradeUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.PrefabUI.FloatTipItemPrefab_UpgradeUI.uiView);
            };
            return FloatTipItemPrefab_UpgradeUI;
        }(View));
        FloatTipItemPrefab_UpgradeUI.uiView = { "type": "View", "props": { "width": 212, "height": 81 }, "child": [{ "type": "Image", "props": { "top": 0, "skin": "resources/common/img_floatTip.png", "right": 0, "left": 0, "bottom": 0 } }, { "type": "Label", "props": { "var": "UI_Txt_Tip", "valign": "middle", "top": 0, "text": "强化", "right": 60, "left": 0, "fontSize": 36, "font": "黑体", "color": "#ffffff", "bottom": 0, "align": "center" } }, { "type": "Label", "props": { "var": "UI_Txt_Extra", "valign": "middle", "top": 0, "text": "+1", "right": 0, "left": 117, "fontSize": 40, "font": "黑体", "color": "#5bffff", "bottom": 0, "align": "left" } }] };
        PrefabUI.FloatTipItemPrefab_UpgradeUI = FloatTipItemPrefab_UpgradeUI;
    })(PrefabUI = ui.PrefabUI || (ui.PrefabUI = {}));
})(ui || (ui = {}));
(function (ui) {
    var PrefabUI;
    (function (PrefabUI) {
        var GuideItemPrefabUI = (function (_super) {
            __extends(GuideItemPrefabUI, _super);
            function GuideItemPrefabUI() {
                return _super.call(this) || this;
            }
            GuideItemPrefabUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.PrefabUI.GuideItemPrefabUI.uiView);
            };
            return GuideItemPrefabUI;
        }(View));
        GuideItemPrefabUI.uiView = { "type": "View", "props": { "width": 400, "height": 56 }, "child": [{ "type": "Image", "props": { "width": 400, "top": 0, "skin": "resources/guide/img_bubble.png", "height": 56, "centerX": 0 }, "child": [{ "type": "Label", "props": { "width": 400, "valign": "top", "text": "注意不要碰到任何敌方单位", "height": 30, "fontSize": 30, "font": "黑体", "color": "#ffffff", "centerY": 4, "centerX": 0, "bold": true, "align": "center" } }] }] };
        PrefabUI.GuideItemPrefabUI = GuideItemPrefabUI;
    })(PrefabUI = ui.PrefabUI || (ui.PrefabUI = {}));
})(ui || (ui = {}));
(function (ui) {
    var PrefabUI;
    (function (PrefabUI) {
        var InviteItemPrefabUI = (function (_super) {
            __extends(InviteItemPrefabUI, _super);
            function InviteItemPrefabUI() {
                return _super.call(this) || this;
            }
            InviteItemPrefabUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.PrefabUI.InviteItemPrefabUI.uiView);
            };
            return InviteItemPrefabUI;
        }(View));
        InviteItemPrefabUI.uiView = { "type": "View", "props": { "width": 770, "height": 200 }, "child": [{ "type": "Label", "props": { "width": 115, "var": "UI_Txt_Order", "valign": "middle", "text": "100", "left": 9, "height": 162, "fontSize": 45, "font": "黑体", "color": "#ffffff", "centerY": 0, "bold": true, "align": "center" } }, { "type": "Image", "props": { "width": 109, "var": "UI_Img_Default_Icon", "skin": "resources/common/interface_icon_static_invite.png", "left": 129, "height": 99, "centerY": 0 } }, { "type": "Image", "props": { "width": 150, "var": "UI_Img_ProfileIcon", "left": 129, "height": 150, "centerY": 0 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 150, "skin": "resources/invitefriend/img_leaderboard_profile.png", "renderType": "mask", "height": 150 } }] }, { "type": "Image", "props": { "width": 148, "skin": "resources/moneyinfo/img_icon_diamond.png", "left": 264, "height": 140, "centerY": 0 }, "child": [{ "type": "Label", "props": { "width": 113, "var": "UI_Txt_Reward", "valign": "middle", "top": 0, "text": "+10", "right": -71, "fontSize": 45, "color": "#ffffff", "bottom": 0, "bold": true, "align": "center" } }] }, { "type": "Button", "props": { "width": 250, "var": "UI_Btn_GetReward", "stateNum": 1, "skin": "resources/common/interface_btn_green.png", "right": 20, "labelSize": 45, "labelFont": "黑体", "labelColors": "#FFFFFF", "labelAlign": "center", "label": "领取状态", "height": 110, "centerY": 0, "sizeGrid": "50,70,50,70" } }] };
        PrefabUI.InviteItemPrefabUI = InviteItemPrefabUI;
    })(PrefabUI = ui.PrefabUI || (ui.PrefabUI = {}));
})(ui || (ui = {}));
(function (ui) {
    var PrefabUI;
    (function (PrefabUI) {
        var InviteVerifyItemPrefabUI = (function (_super) {
            __extends(InviteVerifyItemPrefabUI, _super);
            function InviteVerifyItemPrefabUI() {
                return _super.call(this) || this;
            }
            InviteVerifyItemPrefabUI.prototype.createChildren = function () {
                View.regComponent("ui.Effect.SeeSawEffectUI", ui.Effect.SeeSawEffectUI);
                _super.prototype.createChildren.call(this);
                this.createView(ui.PrefabUI.InviteVerifyItemPrefabUI.uiView);
            };
            return InviteVerifyItemPrefabUI;
        }(View));
        InviteVerifyItemPrefabUI.uiView = { "type": "View", "props": { "width": 105, "height": 105 }, "child": [{ "type": "Label", "props": { "visible": false, "var": "UI_Txt_Order", "valign": "middle", "top": 0, "text": "100", "right": 0, "left": 0, "fontSize": 45, "font": "黑体", "color": "#ffffff", "bottom": 0, "bold": true, "align": "center" } }, { "type": "Image", "props": { "top": 0, "skin": "resources/invitefriend/img_darkblue.png", "right": 0, "left": 0, "bottom": 0 } }, { "type": "Image", "props": { "width": 58, "var": "UI_Img_Default_Icon", "top": 10, "skin": "resources/invitefriend/img_plus.png", "height": 58, "centerX": 0 } }, { "type": "Image", "props": { "y": 0, "x": 0, "width": 105, "var": "UI_Img_ProfileIcon", "height": 105 } }, { "type": "Image", "props": { "width": 69, "var": "UI_Img_Loading", "top": 6, "skin": "resources/invitefriend/img_loading.png", "rotation": 45, "height": 69, "centerX": 0, "anchorY": 0.5, "anchorX": 0.5 }, "compId": 11 }, { "type": "Image", "props": { "x": 0, "width": 105, "var": "UI_Img_RewardBG", "height": 31, "bottom": 0 }, "child": [{ "type": "Label", "props": { "width": 104, "var": "UI_Txt_RewardInfo", "valign": "middle", "text": "  +99", "height": 32, "fontSize": 30, "font": "黑体", "color": "#ffffff", "centerY": 1, "centerX": 0, "bold": true, "align": "center" } }, { "type": "Image", "props": { "y": 16, "x": 17, "var": "UI_Img_RewardIcon", "skin": "resources/moneyinfo/img_icon_lottery.png", "scaleY": 0.5, "scaleX": 0.5, "anchorY": 0.5, "anchorX": 0.5 }, "child": [{ "type": "Script", "props": { "var": "UI_Efc_SeeSaw", "runtime": "ui.Effect.SeeSawEffectUI" } }] }] }, { "type": "Button", "props": { "var": "UI_Btn_GetReward", "top": 0, "right": 0, "left": 0, "labelSize": 45, "labelFont": "黑体", "labelColors": "#FFFFFF", "labelAlign": "center", "bottom": 0 } }], "animations": [{ "nodes": [{ "target": 11, "keyframes": { "rotation": [{ "value": 0, "tweenMethod": "linearNone", "tween": true, "target": 11, "key": "rotation", "index": 0 }, { "value": 1080, "tweenMethod": "linearNone", "tween": true, "target": 11, "key": "rotation", "index": 72 }] } }], "name": "loading", "id": 1, "frameRate": 24, "action": 1 }] };
        PrefabUI.InviteVerifyItemPrefabUI = InviteVerifyItemPrefabUI;
    })(PrefabUI = ui.PrefabUI || (ui.PrefabUI = {}));
})(ui || (ui = {}));
(function (ui) {
    var PrefabUI;
    (function (PrefabUI) {
        var LevelItemPrefabUI = (function (_super) {
            __extends(LevelItemPrefabUI, _super);
            function LevelItemPrefabUI() {
                return _super.call(this) || this;
            }
            LevelItemPrefabUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.PrefabUI.LevelItemPrefabUI.uiView);
            };
            return LevelItemPrefabUI;
        }(View));
        LevelItemPrefabUI.uiView = { "type": "View", "props": { "width": 224, "height": 84 }, "child": [{ "type": "Image", "props": { "width": 224, "var": "UI_Img_CurLevel", "skin": "resources/level/img_level_now.png", "height": 84, "centerY": 0, "centerX": 0 } }, { "type": "Image", "props": { "width": 224, "var": "UI_Img_OtherLevel", "skin": "resources/level/img_level_other.png", "height": 84, "centerY": 0, "centerX": 0 } }, { "type": "Label", "props": { "width": 160, "var": "UI_Txt_Level", "valign": "top", "text": "100", "height": 40, "fontSize": 40, "color": "#ffffff", "centerY": 0, "centerX": 0, "bold": true, "align": "center" } }] };
        PrefabUI.LevelItemPrefabUI = LevelItemPrefabUI;
    })(PrefabUI = ui.PrefabUI || (ui.PrefabUI = {}));
})(ui || (ui = {}));
(function (ui) {
    var PrefabUI;
    (function (PrefabUI) {
        var LotteryHistItemPrefabUI = (function (_super) {
            __extends(LotteryHistItemPrefabUI, _super);
            function LotteryHistItemPrefabUI() {
                return _super.call(this) || this;
            }
            LotteryHistItemPrefabUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.PrefabUI.LotteryHistItemPrefabUI.uiView);
            };
            return LotteryHistItemPrefabUI;
        }(View));
        LotteryHistItemPrefabUI.uiView = { "type": "View", "props": { "width": 746, "height": 80 }, "child": [{ "type": "Image", "props": { "var": "UI_Img_BG", "top": 0, "skin": "resources/unpack/img_lottery_result_item.png", "right": 0, "left": 0, "bottom": 0 } }, { "type": "Label", "props": { "width": 260, "var": "UI_Txt_Date", "valign": "middle", "text": "2017-07-07 16:01", "left": 20, "height": 90, "fontSize": 30, "color": "#ffffff", "centerY": 0 } }, { "type": "Label", "props": { "width": 200, "var": "UI_Txt_Info", "valign": "middle", "text": "金币100K", "height": 90, "fontSize": 30, "font": "黑体", "color": "#ffffff", "centerY": 0, "centerX": 50, "align": "center" } }, { "type": "Label", "props": { "width": 180, "var": "UI_Txt_LeftTime", "valign": "middle", "text": "24小时", "right": 20, "height": 90, "fontSize": 30, "font": "黑体", "color": "#ffffff", "centerY": 0, "align": "center" } }] };
        PrefabUI.LotteryHistItemPrefabUI = LotteryHistItemPrefabUI;
    })(PrefabUI = ui.PrefabUI || (ui.PrefabUI = {}));
})(ui || (ui = {}));
(function (ui) {
    var PrefabUI;
    (function (PrefabUI) {
        var LotteryItemPrefabUI = (function (_super) {
            __extends(LotteryItemPrefabUI, _super);
            function LotteryItemPrefabUI() {
                return _super.call(this) || this;
            }
            LotteryItemPrefabUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.PrefabUI.LotteryItemPrefabUI.uiView);
            };
            return LotteryItemPrefabUI;
        }(View));
        LotteryItemPrefabUI.uiView = { "type": "View", "props": { "width": 150, "height": 150 }, "child": [{ "type": "Image", "props": { "width": 120, "var": "UI_Img_Icon", "skin": "resources/lotteryItem/1.png", "height": 120, "centerY": 0, "centerX": 0, "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "width": 150, "visible": false, "var": "UI_Img_Select", "top": 0, "skin": "resources/lotteryItem/img_selected.png", "right": 0, "left": 0, "height": 150, "bottom": 0, "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Label", "props": { "width": 50, "var": "UI_Txt_Num", "valign": "middle", "underlineColor": "#ffffff", "text": "10", "strokeColor": "#812625", "stroke": 3, "right": 0, "height": 50, "fontSize": 30, "color": "#ffffff", "bottom": 0, "align": "center" } }, { "type": "Label", "props": { "width": 235, "visible": true, "var": "lab_descr", "valign": "middle", "text": "10", "right": -45, "height": 50, "fontSize": 30, "color": "#dbf2ff", "bottom": -45, "align": "center" } }] };
        PrefabUI.LotteryItemPrefabUI = LotteryItemPrefabUI;
    })(PrefabUI = ui.PrefabUI || (ui.PrefabUI = {}));
})(ui || (ui = {}));
(function (ui) {
    var PrefabUI;
    (function (PrefabUI) {
        var MoneyAnimItemPrefabUI = (function (_super) {
            __extends(MoneyAnimItemPrefabUI, _super);
            function MoneyAnimItemPrefabUI() {
                return _super.call(this) || this;
            }
            MoneyAnimItemPrefabUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.PrefabUI.MoneyAnimItemPrefabUI.uiView);
            };
            return MoneyAnimItemPrefabUI;
        }(View));
        MoneyAnimItemPrefabUI.uiView = { "type": "View", "props": { "width": 100, "height": 100, "centerY": 0.5, "centerX": 0.5 }, "child": [{ "type": "Image", "props": { "var": "UI_Img_Icon", "skin": "resources/moneyinfo/img_icon_diamond.png", "centerY": 0, "centerX": 0, "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Animation", "props": { "y": 50, "x": 50, "var": "UI_Anim_Coin", "source": "Anim/GoldAnim.ani", "index": 0 } }] };
        PrefabUI.MoneyAnimItemPrefabUI = MoneyAnimItemPrefabUI;
    })(PrefabUI = ui.PrefabUI || (ui.PrefabUI = {}));
})(ui || (ui = {}));
(function (ui) {
    var PrefabUI;
    (function (PrefabUI) {
        var MonsterProgressPrefabUI = (function (_super) {
            __extends(MonsterProgressPrefabUI, _super);
            function MonsterProgressPrefabUI() {
                return _super.call(this) || this;
            }
            MonsterProgressPrefabUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.PrefabUI.MonsterProgressPrefabUI.uiView);
            };
            return MonsterProgressPrefabUI;
        }(View));
        MonsterProgressPrefabUI.uiView = { "type": "View", "props": { "width": 86, "height": 29 }, "child": [{ "type": "Image", "props": { "y": 193, "x": -4, "width": 100, "skin": "resources/battle/interface_fight_hpbar_bg.png", "sizeGrid": "0,17,0,17", "height": 10 }, "child": [{ "type": "Image", "props": { "y": 1, "x": 1, "width": 98, "skin": "resources/battle/interface_fight_hpbar.png", "sizeGrid": "0,9,0,13", "height": 8 }, "child": [{ "type": "Image", "props": { "y": 0, "x": -1, "width": 100, "var": "ProgressBar", "skin": "resources/common/img_blue.png", "sizeGrid": "2,2,2,2", "renderType": "mask", "height": 29 } }] }] }] };
        PrefabUI.MonsterProgressPrefabUI = MonsterProgressPrefabUI;
    })(PrefabUI = ui.PrefabUI || (ui.PrefabUI = {}));
})(ui || (ui = {}));
(function (ui) {
    var PrefabUI;
    (function (PrefabUI) {
        var SpawnItemPrefabUI = (function (_super) {
            __extends(SpawnItemPrefabUI, _super);
            function SpawnItemPrefabUI() {
                return _super.call(this) || this;
            }
            SpawnItemPrefabUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.PrefabUI.SpawnItemPrefabUI.uiView);
            };
            return SpawnItemPrefabUI;
        }(View));
        SpawnItemPrefabUI.uiView = { "type": "View", "props": { "width": 186, "height": 100 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 186, "skin": "resources/spawn/img_spawn_bg_0.png", "height": 84 } }, { "type": "Image", "props": { "y": 0, "x": 0, "width": 186, "skin": "resources/spawn/img_spawn_bg_1.png", "height": 84 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 186, "var": "UI_Img_Mask", "skin": "resources/common/img_white.jpg", "renderType": "mask", "height": 84, "sizeGrid": "2,2,2,2" } }] }, { "type": "Image", "props": { "width": 69, "var": "UI_Img_Icon", "left": 14, "height": 63, "centerY": -8 }, "child": [{ "type": "Label", "props": { "width": 104, "var": "UI_Txt_Num", "valign": "middle", "text": "88.8M", "right": -93, "height": 40, "fontSize": 24, "color": "#ffffff", "centerY": -3, "bold": false, "align": "center" } }, { "type": "Animation", "props": { "y": 31, "x": 33, "var": "ani", "source": "Anim/GoldAnim.ani" } }] }, { "type": "Image", "props": { "width": 51, "skin": "resources/spawn/img_spawn_arrow.png", "height": 38, "centerX": 0, "bottom": 0 } }, { "type": "Button", "props": { "y": 0, "x": 0, "var": "UI_Btn_GainSpawn", "top": 0, "right": 0, "left": 0, "bottom": 0 } }] };
        PrefabUI.SpawnItemPrefabUI = SpawnItemPrefabUI;
    })(PrefabUI = ui.PrefabUI || (ui.PrefabUI = {}));
})(ui || (ui = {}));
(function (ui) {
    var PrefabUI;
    (function (PrefabUI) {
        var UpgradeItemPrefabUI = (function (_super) {
            __extends(UpgradeItemPrefabUI, _super);
            function UpgradeItemPrefabUI() {
                return _super.call(this) || this;
            }
            UpgradeItemPrefabUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.PrefabUI.UpgradeItemPrefabUI.uiView);
            };
            return UpgradeItemPrefabUI;
        }(View));
        UpgradeItemPrefabUI.uiView = { "type": "View", "props": { "width": 210, "height": 273 }, "child": [{ "type": "Box", "props": { "y": 0, "x": 0, "visible": false, "var": "UI_Box_HidePool" } }, { "type": "Box", "props": { "width": 140, "var": "UI_Box_Main", "height": 100, "centerX": 0, "bottom": 0 }, "child": [{ "type": "Label", "props": { "width": 50, "var": "UI_Txt_Main", "valign": "middle", "text": "5", "strokeColor": "#ffd600", "stroke": 0, "left": -10, "height": 45, "fontSize": 45, "color": "#ffd600", "centerY": -8, "bold": true, "align": "right" }, "child": [{ "type": "Image", "props": { "width": 101, "skin": "resources/upgrade/img_txt_weapon_1.png", "right": -101, "height": 36, "bottom": 0 } }] }] }, { "type": "Box", "props": { "width": 140, "var": "UI_Box_Sub", "height": 100, "centerX": 0, "bottom": 0 }, "child": [{ "type": "Label", "props": { "x": 65, "width": 112, "var": "UI_Txt_Sub", "valign": "middle", "text": "8888", "height": 45, "fontSize": 45, "color": "#ffd600", "centerY": -8, "bold": true, "anchorY": 0, "anchorX": 0.75, "align": "center" }, "child": [{ "type": "Image", "props": { "width": 36, "var": "UI_Img_Txt_Level_Sub", "skin": "resources/upgrade/img_txt_level_game.png", "right": -36, "height": 35, "bottom": 0 } }] }, { "type": "Image", "props": { "var": "UI_Img_Txt_SubWeapon", "skin": "resources/upgrade/img_txt_weapon_2.png", "centerY": 0, "centerX": 0 } }] }, { "type": "Box", "props": { "width": 140, "var": "UI_Box_Money", "height": 100, "centerX": 0, "bottom": 0 }, "child": [{ "type": "Image", "props": { "skin": "resources/upgrade/img_txt_weapon_spawn.png", "centerY": 0, "centerX": 0 } }] }, { "type": "Image", "props": { "x": 27, "width": 157, "var": "UI_Img_Main", "skin": "resources/upgrade/img_main_weapon.png", "height": 118, "centerX": 0, "bottom": 100 }, "child": [{ "type": "HBox", "props": { "var": "UI_HBox_Main", "top": -45, "centerX": 0 } }] }, { "type": "Image", "props": { "x": 105, "var": "UI_Img_Sub", "skin": "resources/player/planes/role_fight_weapon_02.png", "scaleY": 0.5, "scaleX": 0.5, "centerX": 0, "bottom": 100, "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "x": 16, "width": 179, "var": "UI_Img_Money", "skin": "resources/upgrade/img_gold_heap.png", "height": 177, "centerX": 0, "bottom": 80 } }, { "type": "Image", "props": { "y": 0, "x": 0, "width": 57, "var": "UI_Img_Lock", "skin": "resources/upgrade/img_lock.png", "height": 74 } }, { "type": "Button", "props": { "var": "UI_Btn_Action", "top": 0, "right": 0, "left": 0, "bottom": 0 } }] };
        PrefabUI.UpgradeItemPrefabUI = UpgradeItemPrefabUI;
    })(PrefabUI = ui.PrefabUI || (ui.PrefabUI = {}));
})(ui || (ui = {}));
(function (ui) {
    var ProgressUI = (function (_super) {
        __extends(ProgressUI, _super);
        function ProgressUI() {
            return _super.call(this) || this;
        }
        ProgressUI.prototype.createChildren = function () {
            View.regComponent("Text", laya.display.Text);
            _super.prototype.createChildren.call(this);
            this.createView(ui.ProgressUI.uiView);
        };
        return ProgressUI;
    }(View));
    ProgressUI.uiView = { "type": "View", "props": { "width": 1080, "height": 1920 }, "child": [{ "type": "Box", "props": { "width": 1080, "height": 1920 }, "child": [{ "type": "Image", "props": { "var": "img_BG", "top": 0, "skin": "resources/common/background.png", "sizeGrid": "5,5,5,5", "right": 0, "left": 0, "bottom": 0 } }, { "type": "Image", "props": { "width": 38, "var": "img_progressBG", "skin": "resources/common/img_jindutiao_06.png", "sizeGrid": "24,0,24,0", "scaleY": 1.5, "scaleX": 1.5, "rotation": 90, "name": "speed", "height": 684, "centerY": 0, "centerX": 0, "anchorY": 0.5, "anchorX": 0.5 }, "child": [{ "type": "Image", "props": { "width": 26, "var": "img_progress", "skin": "resources/common/img_jindutiao_04.png", "sizeGrid": "15,0,15,0", "height": 672, "centerX": 0, "bottom": 6, "anchorY": 1, "anchorX": 0.5 } }] }, { "type": "Text", "props": { "y": 1023, "x": 387, "width": 290, "var": "txt_progress", "valign": "middle", "text": "这里有个进度条", "strokeColor": "#272727", "stroke": 4, "name": "speed", "height": 55, "fontSize": 40, "font": "黑体", "color": "#dbe8ef", "bold": true, "align": "center" } }] }] };
    ui.ProgressUI = ProgressUI;
})(ui || (ui = {}));
(function (ui) {
    var RebornUI = (function (_super) {
        __extends(RebornUI, _super);
        function RebornUI() {
            return _super.call(this) || this;
        }
        RebornUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.createView(ui.RebornUI.uiView);
        };
        return RebornUI;
    }(View));
    RebornUI.uiView = { "type": "View", "props": { "width": 1080, "height": 1920 }, "child": [{ "type": "Image", "props": { "top": 0, "skin": "resources/common/img_black.png", "right": 0, "left": 0, "bottom": 0, "sizeGrid": "2,2,2,2" }, "child": [{ "type": "Button", "props": { "width": 431, "var": "UI_Btn_Reborn", "stateNum": 1, "skin": "resources/reborn/interface_fight_resurgence.png", "height": 493, "centerY": 0, "centerX": 0, "anchorY": 0.5, "anchorX": 0.5 }, "compId": 3, "child": [{ "type": "Label", "props": { "width": 429, "var": "UI_Txt_Second", "valign": "middle", "text": "3", "height": 60, "fontSize": 50, "font": "黑体", "color": "#ffffff", "centerX": 2, "bottom": 1, "bold": false, "align": "center" } }, { "type": "Label", "props": { "y": 222, "x": -1, "width": 418, "visible": false, "var": "lab_needDia", "text": "-10", "height": 52, "fontSize": 50, "color": "#cce2c6", "align": "center" } }] }] }], "animations": [{ "nodes": [{ "target": 3, "keyframes": { "scaleY": [{ "value": 1, "tweenMethod": "linearNone", "tween": true, "target": 3, "key": "scaleY", "index": 0 }, { "value": 1.03, "tweenMethod": "linearNone", "tween": true, "target": 3, "key": "scaleY", "index": 12 }, { "value": 1, "tweenMethod": "linearNone", "tween": true, "target": 3, "key": "scaleY", "index": 24 }, { "value": 0.95, "tweenMethod": "linearNone", "tween": true, "target": 3, "key": "scaleY", "index": 36 }, { "value": 1, "tweenMethod": "linearNone", "tween": true, "target": 3, "key": "scaleY", "index": 48 }], "scaleX": [{ "value": 1, "tweenMethod": "linearNone", "tween": true, "target": 3, "key": "scaleX", "index": 0 }, { "value": 1.03, "tweenMethod": "linearNone", "tween": true, "target": 3, "key": "scaleX", "index": 12 }, { "value": 1, "tweenMethod": "linearNone", "tween": true, "target": 3, "key": "scaleX", "index": 24 }, { "value": 0.95, "tweenMethod": "linearNone", "tween": true, "target": 3, "key": "scaleX", "index": 36 }, { "value": 1, "tweenMethod": "linearNone", "tween": true, "target": 3, "key": "scaleX", "index": 48 }] } }], "name": "breath", "id": 1, "frameRate": 24, "action": 2 }] };
    ui.RebornUI = RebornUI;
})(ui || (ui = {}));
(function (ui) {
    var ResultUI = (function (_super) {
        __extends(ResultUI, _super);
        function ResultUI() {
            return _super.call(this) || this;
        }
        ResultUI.prototype.createChildren = function () {
            View.regComponent("ui.Effect.ClickDownEffectUI", ui.Effect.ClickDownEffectUI);
            View.regComponent("ui.Effect.ClickUpEffectUI", ui.Effect.ClickUpEffectUI);
            View.regComponent("ui.Effect.DoubleCoinScaleEffectUI", ui.Effect.DoubleCoinScaleEffectUI);
            _super.prototype.createChildren.call(this);
            this.createView(ui.ResultUI.uiView);
        };
        return ResultUI;
    }(View));
    ResultUI.uiView = { "type": "View", "props": { "width": 1080, "height": 1920 }, "child": [{ "type": "Image", "props": { "top": 0, "skin": "resources/common/img_black.png", "right": 0, "name": "BG", "left": 0, "bottom": 0, "sizeGrid": "2,2,2,2" } }, { "type": "Button", "props": { "y": 80, "x": 30, "width": 104, "var": "UI_Btn_Setting", "stateNum": 1, "skin": "resources/common/img_setting.png", "height": 113 } }, { "type": "Box", "props": { "y": 0, "x": 0, "width": 1083, "var": "box_AllUi", "height": 1410 }, "child": [{ "type": "Image", "props": { "y": 500, "x": 2, "width": 1080, "var": "info", "top": 500, "skin": "resources/unpack/img_panel.png", "name": "Info", "height": 455, "centerX": 0 }, "compId": 31, "child": [{ "type": "Button", "props": { "width": 252, "var": "UI_Btn_Lucky", "sizeGrid": "40,40,40,40", "labelSize": 48, "labelFont": "黑体", "labelColors": "#FFFFFF", "height": 70, "centerX": -11, "bottom": 7, "anchorY": 0.5, "anchorX": 0.5 }, "child": [{ "type": "Script", "props": { "playEvent": "mousedown", "name": "d", "runtime": "ui.Effect.ClickDownEffectUI" } }, { "type": "Script", "props": { "playEvent": "mouseup", "name": "u", "runtime": "ui.Effect.ClickUpEffectUI" } }, { "type": "Script", "props": { "playEvent": "mouseout", "name": "o", "runtime": "ui.Effect.ClickUpEffectUI" } }, { "type": "Image", "props": { "width": 59, "skin": "resources/result/img_video_icon.png", "left": 30, "height": 52, "centerY": 0 } }, { "type": "Label", "props": { "width": 126, "text": "3倍奖励", "right": 29, "height": 30, "fontSize": 40, "font": "黑体", "color": "#c9f0f9", "centerY": -5, "bold": true, "align": "center" } }] }, { "type": "HBox", "props": { "y": 158, "x": 428, "width": 224, "var": "UI_HBox_Reward", "space": 100, "height": 70 }, "child": [{ "type": "Image", "props": { "width": 224, "var": "UI_Img_Coin", "skin": "resources/moneyinfo/img_bg.png", "height": 70, "sizeGrid": "16,16,16,16" }, "child": [{ "type": "Image", "props": { "width": 69, "skin": "resources/moneyinfo/img_icon_coin.png", "height": 63 } }, { "type": "Label", "props": { "width": 141, "var": "UI_Txt_Coin", "valign": "middle", "text": "88.8M", "right": 20, "height": 70, "fontSize": 36, "color": "#ffffff", "centerY": 0, "bold": true, "anchorY": 0.5, "anchorX": 0.5, "align": "center" }, "child": [{ "type": "Script", "props": { "var": "UI_Eft_DoubleCoinScale", "runtime": "ui.Effect.DoubleCoinScaleEffectUI" } }] }] }, { "type": "Image", "props": { "width": 224, "visible": false, "var": "UI_Img_Power", "skin": "resources/moneyinfo/img_bg.png", "height": 70, "sizeGrid": "16,16,16,16" }, "child": [{ "type": "Image", "props": { "width": 69, "skin": "resources/moneyinfo/img_icon_power.png", "height": 63 } }, { "type": "Label", "props": { "width": 141, "var": "UI_Txt_Power", "valign": "middle", "text": "88.8M", "right": 20, "height": 70, "fontSize": 36, "color": "#ffffff", "centerY": 0, "bold": true, "anchorY": 0.5, "anchorX": 0.5, "align": "center" }, "child": [{ "type": "Script", "props": { "runtime": "ui.Effect.DoubleCoinScaleEffectUI" } }] }] }, { "type": "Image", "props": { "width": 224, "visible": false, "var": "UI_Img_Diamond", "skin": "resources/moneyinfo/img_bg.png", "height": 70, "sizeGrid": "16,16,16,16" }, "child": [{ "type": "Image", "props": { "width": 69, "skin": "resources/moneyinfo/img_icon_diamond.png", "height": 63 } }, { "type": "Label", "props": { "width": 141, "var": "UI_Txt_Diamond", "valign": "middle", "text": "88.8M", "right": 20, "height": 70, "fontSize": 36, "color": "#ffffff", "centerY": 0, "bold": true, "anchorY": 0.5, "anchorX": 0.5, "align": "center" }, "child": [{ "type": "Script", "props": { "runtime": "ui.Effect.DoubleCoinScaleEffectUI" } }] }] }] }] }, { "type": "Image", "props": { "y": 0, "x": 0, "width": 1089, "visible": false, "var": "img_GrowUp_Bg", "skin": "resources/common/background.png", "mouseThrough": false, "height": 3024, "sizeGrid": "5,5,5,5" }, "compId": 51 }, { "type": "Image", "props": { "y": 386, "x": 549, "width": 1080, "var": "UI_Img_Win", "top": 226, "skin": "resources/unpack/img_win.png", "height": 320, "centerX": 9, "anchorY": 0.5, "anchorX": 0.5 }, "compId": 30 }, { "type": "Image", "props": { "y": 335, "x": 173, "width": 719, "var": "UI_Img_Lose", "top": 335, "skin": "resources/unpack/img_lose.png", "height": 208, "centerX": -8 }, "compId": 29 }, { "type": "Box", "props": { "y": 1320, "x": 0, "width": 1080, "var": "buttonBox", "name": "buttonBox", "mouseThrough": false, "mouseEnabled": true, "hitTestPrior": true, "height": 100, "centerX": 0 }, "compId": 12, "child": [{ "type": "Button", "props": { "y": 50, "x": 799, "width": 263, "var": "UI_Btn_Continue", "stateNum": 1, "skin": "resources/common/img_btn_blue.png", "labelSize": 48, "labelFont": "黑体", "labelColors": "#FFFFFF", "height": 91, "anchorY": 0.5, "anchorX": 0.5 }, "child": [{ "type": "Script", "props": { "playEvent": "mousedown", "name": "d", "runtime": "ui.Effect.ClickDownEffectUI" } }, { "type": "Script", "props": { "playEvent": "mouseup", "name": "u", "runtime": "ui.Effect.ClickUpEffectUI" } }, { "type": "Script", "props": { "playEvent": "mouseout", "name": "o", "runtime": "ui.Effect.ClickUpEffectUI" } }, { "type": "Image", "props": { "width": 164, "skin": "resources/result/img_next.png", "height": 62, "centerY": 0, "centerX": 0 } }] }, { "type": "Button", "props": { "y": 50, "x": 799, "width": 263, "var": "UI_Btn_Replay", "stateNum": 1, "skin": "resources/common/img_btn_blue.png", "labelSize": 48, "labelFont": "黑体", "labelColors": "#FFFFFF", "height": 91, "anchorY": 0.5, "anchorX": 0.5 }, "child": [{ "type": "Script", "props": { "playEvent": "mousedown", "name": "d", "runtime": "ui.Effect.ClickDownEffectUI" } }, { "type": "Script", "props": { "playEvent": "mouseup", "name": "u", "runtime": "ui.Effect.ClickUpEffectUI" } }, { "type": "Script", "props": { "playEvent": "mouseout", "name": "o", "runtime": "ui.Effect.ClickUpEffectUI" } }, { "type": "Image", "props": { "width": 164, "skin": "resources/result/img_retry.png", "height": 62, "centerY": 0, "centerX": 0 } }] }, { "type": "Button", "props": { "y": 50, "x": 282, "width": 263, "var": "UI_Btn_GameOver", "stateNum": 1, "skin": "resources/common/img_btn_orange.png", "labelSize": 48, "labelFont": "黑体", "labelColors": "#FFFFFF", "height": 93, "anchorY": 0.5, "anchorX": 0.5 }, "child": [{ "type": "Script", "props": { "playEvent": "mousedown", "name": "d", "runtime": "ui.Effect.ClickDownEffectUI" } }, { "type": "Script", "props": { "playEvent": "mouseup", "name": "u", "runtime": "ui.Effect.ClickUpEffectUI" } }, { "type": "Script", "props": { "playEvent": "mouseout", "name": "o", "runtime": "ui.Effect.ClickUpEffectUI" } }, { "type": "Image", "props": { "width": 184, "skin": "resources/result/img_back.png", "height": 65, "centerY": 0, "centerX": 0 } }] }] }] }, { "type": "Image", "props": { "x": 558, "width": 677, "visible": false, "var": "img_GrowUp", "top": 600, "skin": "resources/result/tishenzhanlibg.png", "mouseThrough": false, "mouseEnabled": true, "hitTestPrior": true, "height": 376, "anchorY": 0.5, "anchorX": 0.5 }, "compId": 50, "child": [{ "type": "Image", "props": { "x": 203, "width": 143, "var": "btn_GetAward", "top": 209, "skin": "resources/result/tishenzuanshi.png", "height": 144 } }, { "type": "Label", "props": { "x": 389, "width": 364, "top": 219, "text": "点击获得", "height": 69, "fontSize": 40, "font": "Microsoft YaHei", "color": "#ffffff", "bold": true } }, { "type": "Label", "props": { "x": 381, "width": 89, "var": "lab_AwardNum", "top": 299, "text": "2000", "leading": 23, "height": 69, "fontSize": 40, "font": "Microsoft YaHei", "color": "#cfa65c", "bold": true, "align": "center" } }, { "type": "Label", "props": { "x": 488, "width": 194, "top": 299, "text": "钻石", "height": 69, "fontSize": 35, "font": "Microsoft YaHei", "color": "#ffffff", "bold": true } }] }], "animations": [{ "nodes": [{ "target": 31, "keyframes": { "x": [{ "value": 0, "tweenMethod": "linearNone", "tween": true, "target": 31, "key": "x", "index": 0 }], "height": [{ "value": 0, "tweenMethod": "linearNone", "tween": true, "target": 31, "key": "height", "index": 0 }, { "value": 445, "tweenMethod": "linearNone", "tween": true, "target": 31, "key": "height", "index": 3 }, { "value": 460, "tweenMethod": "linearNone", "tween": true, "target": 31, "key": "height", "index": 4 }, { "value": 465, "tweenMethod": "linearNone", "tween": true, "target": 31, "key": "height", "index": 5 }, { "value": 460, "tweenMethod": "linearNone", "tween": true, "target": 31, "key": "height", "index": 6 }, { "value": 455, "tweenMethod": "linearNone", "tween": true, "target": 31, "key": "height", "index": 7 }] } }, { "target": 12, "keyframes": { "y": [{ "value": 2241, "tweenMethod": "linearNone", "tween": true, "target": 12, "key": "y", "index": 0 }, { "value": 2241, "tweenMethod": "linearNone", "tween": true, "target": 12, "label": null, "key": "y", "index": 7 }, { "value": 1629, "tweenMethod": "linearNone", "tween": true, "target": 12, "key": "y", "index": 8 }, { "value": 1320, "tweenMethod": "linearNone", "tween": true, "target": 12, "key": "y", "index": 9 }, { "value": 1290, "tweenMethod": "linearNone", "tween": true, "target": 12, "key": "y", "index": 10 }, { "value": 1310, "tweenMethod": "linearNone", "tween": true, "target": 12, "key": "y", "index": 11 }, { "value": 1315, "tweenMethod": "linearNone", "tween": true, "target": 12, "key": "y", "index": 12 }, { "value": 1320, "tweenMethod": "linearNone", "tween": true, "target": 12, "key": "y", "index": 13 }], "x": [{ "value": 0, "tweenMethod": "linearNone", "tween": true, "target": 12, "key": "x", "index": 0 }, { "value": 0, "tweenMethod": "linearNone", "tween": true, "target": 12, "label": null, "key": "x", "index": 7 }] } }], "name": "ani1", "id": 1, "frameRate": 24, "action": 0 }, { "nodes": [{ "target": 30, "keyframes": { "scaleY": [{ "value": 0.5, "tweenMethod": "linearNone", "tween": true, "target": 30, "key": "scaleY", "index": 0 }, { "value": 0.8, "tweenMethod": "linearNone", "tween": true, "target": 30, "key": "scaleY", "index": 1 }, { "value": 1, "tweenMethod": "linearNone", "tween": true, "target": 30, "key": "scaleY", "index": 2 }, { "value": 1.05, "tweenMethod": "linearNone", "tween": true, "target": 30, "key": "scaleY", "index": 3 }, { "value": 1, "tweenMethod": "linearNone", "tween": true, "target": 30, "key": "scaleY", "index": 4 }], "scaleX": [{ "value": 0.5, "tweenMethod": "linearNone", "tween": true, "target": 30, "key": "scaleX", "index": 0 }, { "value": 0.8, "tweenMethod": "linearNone", "tween": true, "target": 30, "key": "scaleX", "index": 1 }, { "value": 1, "tweenMethod": "linearNone", "tween": true, "target": 30, "key": "scaleX", "index": 2 }, { "value": 1.05, "tweenMethod": "linearNone", "tween": true, "target": 30, "key": "scaleX", "index": 3 }, { "value": 1, "tweenMethod": "linearNone", "tween": true, "target": 30, "key": "scaleX", "index": 4 }] } }], "name": "ani2", "id": 2, "frameRate": 24, "action": 0 }, { "nodes": [{ "target": 29, "keyframes": { "scaleY": [{ "value": 0.5, "tweenMethod": "linearNone", "tween": true, "target": 29, "key": "scaleY", "index": 0 }, { "value": 0.8, "tweenMethod": "linearNone", "tween": true, "target": 29, "key": "scaleY", "index": 1 }, { "value": 1, "tweenMethod": "linearNone", "tween": true, "target": 29, "key": "scaleY", "index": 2 }, { "value": 1.05, "tweenMethod": "linearNone", "tween": true, "target": 29, "key": "scaleY", "index": 3 }, { "value": 1, "tweenMethod": "linearNone", "tween": true, "target": 29, "key": "scaleY", "index": 4 }], "scaleX": [{ "value": 0.5, "tweenMethod": "linearNone", "tween": true, "target": 29, "key": "scaleX", "index": 0 }, { "value": 0.8, "tweenMethod": "linearNone", "tween": true, "target": 29, "key": "scaleX", "index": 1 }, { "value": 1, "tweenMethod": "linearNone", "tween": true, "target": 29, "key": "scaleX", "index": 2 }, { "value": 1.05, "tweenMethod": "linearNone", "tween": true, "target": 29, "key": "scaleX", "index": 3 }, { "value": 1, "tweenMethod": "linearNone", "tween": true, "target": 29, "key": "scaleX", "index": 4 }] } }], "name": "ani3", "id": 3, "frameRate": 24, "action": 0 }, { "nodes": [{ "target": 50, "keyframes": { "width": [{ "value": 810, "tweenMethod": "linearNone", "tween": true, "target": 50, "key": "width", "index": 0 }], "scaleY": [{ "value": 0.1, "tweenMethod": "linearNone", "tween": true, "target": 50, "key": "scaleY", "index": 0 }, { "value": 0.5, "tweenMethod": "linearNone", "tween": true, "target": 50, "key": "scaleY", "index": 1 }, { "value": 0.8, "tweenMethod": "linearNone", "tween": true, "target": 50, "key": "scaleY", "index": 2 }, { "value": 0.9, "tweenMethod": "linearNone", "tween": true, "target": 50, "key": "scaleY", "index": 3 }, { "value": 0.95, "tweenMethod": "linearNone", "tween": true, "target": 50, "key": "scaleY", "index": 4 }, { "value": 0.98, "tweenMethod": "linearNone", "tween": true, "target": 50, "key": "scaleY", "index": 5 }, { "value": 1, "tweenMethod": "linearNone", "tween": true, "target": 50, "key": "scaleY", "index": 6 }, { "value": 1.02, "tweenMethod": "linearNone", "tween": true, "target": 50, "key": "scaleY", "index": 7 }, { "value": 1.01, "tweenMethod": "linearNone", "tween": true, "target": 50, "key": "scaleY", "index": 8 }, { "value": 1, "tweenMethod": "linearNone", "tween": true, "target": 50, "key": "scaleY", "index": 9 }], "scaleX": [{ "value": 0.1, "tweenMethod": "linearNone", "tween": true, "target": 50, "key": "scaleX", "index": 0 }, { "value": 0.5, "tweenMethod": "linearNone", "tween": true, "target": 50, "key": "scaleX", "index": 1 }, { "value": 0.8, "tweenMethod": "linearNone", "tween": true, "target": 50, "key": "scaleX", "index": 2 }, { "value": 0.9, "tweenMethod": "linearNone", "tween": true, "target": 50, "key": "scaleX", "index": 3 }, { "value": 0.95, "tweenMethod": "linearNone", "tween": true, "target": 50, "key": "scaleX", "index": 4 }, { "value": 0.98, "tweenMethod": "linearNone", "tween": true, "target": 50, "key": "scaleX", "index": 5 }, { "value": 1, "tweenMethod": "linearNone", "tween": true, "target": 50, "key": "scaleX", "index": 6 }, { "value": 1.02, "tweenMethod": "linearNone", "tween": true, "target": 50, "key": "scaleX", "index": 7 }, { "value": 1.01, "tweenMethod": "linearNone", "tween": true, "target": 50, "key": "scaleX", "index": 8 }, { "value": 1, "tweenMethod": "linearNone", "tween": true, "target": 50, "key": "scaleX", "index": 9 }], "height": [{ "value": 450, "tweenMethod": "linearNone", "tween": true, "target": 50, "key": "height", "index": 0 }] } }, { "target": 51, "keyframes": { "x": [{ "value": 0, "tweenMethod": "linearNone", "tween": true, "target": 51, "key": "x", "index": 0 }], "alpha": [{ "value": 0, "tweenMethod": "linearNone", "tween": true, "target": 51, "key": "alpha", "index": 0 }, { "value": 1, "tweenMethod": "linearNone", "tween": true, "target": 51, "key": "alpha", "index": 9 }] } }], "name": "ani4", "id": 4, "frameRate": 24, "action": 0 }, { "nodes": [{ "target": 50, "keyframes": { "x": [{ "value": 548, "tweenMethod": "linearNone", "tween": true, "target": 50, "key": "x", "index": 0 }], "scaleY": [{ "value": 1, "tweenMethod": "linearNone", "tween": true, "target": 50, "key": "scaleY", "index": 0 }, { "value": 1.02, "tweenMethod": "linearNone", "tween": true, "target": 50, "key": "scaleY", "index": 1 }, { "value": 1.01, "tweenMethod": "linearNone", "tween": true, "target": 50, "key": "scaleY", "index": 2 }, { "value": 1, "tweenMethod": "linearNone", "tween": true, "target": 50, "key": "scaleY", "index": 3 }, { "value": 0.98, "tweenMethod": "linearNone", "tween": true, "target": 50, "key": "scaleY", "index": 4 }, { "value": 0.94, "tweenMethod": "linearNone", "tween": true, "target": 50, "key": "scaleY", "index": 5 }, { "value": 0.9, "tweenMethod": "linearNone", "tween": true, "target": 50, "key": "scaleY", "index": 6 }, { "value": 0.7, "tweenMethod": "linearNone", "tween": true, "target": 50, "key": "scaleY", "index": 7 }, { "value": 0.5, "tweenMethod": "linearNone", "tween": true, "target": 50, "key": "scaleY", "index": 8 }, { "value": 0.1, "tweenMethod": "linearNone", "tween": true, "target": 50, "key": "scaleY", "index": 9 }], "scaleX": [{ "value": 1, "tweenMethod": "linearNone", "tween": true, "target": 50, "key": "scaleX", "index": 0 }, { "value": 1.02, "tweenMethod": "linearNone", "tween": true, "target": 50, "key": "scaleX", "index": 1 }, { "value": 1.01, "tweenMethod": "linearNone", "tween": true, "target": 50, "key": "scaleX", "index": 2 }, { "value": 1, "tweenMethod": "linearNone", "tween": true, "target": 50, "key": "scaleX", "index": 3 }, { "value": 0.98, "tweenMethod": "linearNone", "tween": true, "target": 50, "key": "scaleX", "index": 4 }, { "value": 0.94, "tweenMethod": "linearNone", "tween": true, "target": 50, "key": "scaleX", "index": 5 }, { "value": 0.9, "tweenMethod": "linearNone", "tween": true, "target": 50, "key": "scaleX", "index": 6 }, { "value": 0.7, "tweenMethod": "linearNone", "tween": true, "target": 50, "key": "scaleX", "index": 7 }, { "value": 0.5, "tweenMethod": "linearNone", "tween": true, "target": 50, "key": "scaleX", "index": 8 }, { "value": 0.1, "tweenMethod": "linearNone", "tween": true, "target": 50, "key": "scaleX", "index": 9 }, { "value": 0, "tweenMethod": "linearNone", "tween": true, "target": 50, "key": "scaleX", "index": 10 }] } }, { "target": 51, "keyframes": { "x": [{ "value": 0, "tweenMethod": "linearNone", "tween": true, "target": 51, "key": "x", "index": 0 }, { "value": 0, "tweenMethod": "linearNone", "tween": true, "target": 51, "key": "x", "index": 10 }], "alpha": [{ "value": 1, "tweenMethod": "linearNone", "tween": true, "target": 51, "key": "alpha", "index": 0 }, { "value": 0, "tweenMethod": "linearNone", "tween": true, "target": 51, "key": "alpha", "index": 10 }] } }], "name": "ani5", "id": 5, "frameRate": 24, "action": 0 }] };
    ui.ResultUI = ResultUI;
})(ui || (ui = {}));
(function (ui) {
    var SettingUI = (function (_super) {
        __extends(SettingUI, _super);
        function SettingUI() {
            return _super.call(this) || this;
        }
        SettingUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.createView(ui.SettingUI.uiView);
        };
        return SettingUI;
    }(View));
    SettingUI.uiView = { "type": "View", "props": { "width": 1080, "height": 1920 }, "child": [{ "type": "Button", "props": { "var": "UI_Btn_Setting", "top": 0, "stateNum": 1, "skin": "resources/common/img_black.png", "right": 0, "left": 0, "bottom": 0, "sizeGrid": "2,2,2,2" } }, { "type": "Image", "props": { "width": 914, "skin": "resources/unpack/img_panel_bg_1.png", "height": 629, "centerY": -117, "centerX": 0, "sizeGrid": "50,50,50,50" }, "child": [{ "type": "Label", "props": { "y": 180, "x": 190, "width": 248, "valign": "middle", "text": "音效开关", "height": 90, "fontSize": 48, "font": "黑体", "color": "#ffffff", "align": "center" } }, { "type": "Label", "props": { "y": 335, "x": 190, "width": 248, "valign": "middle", "text": "震动开关", "height": 90, "fontSize": 48, "font": "黑体", "color": "#ffffff", "align": "center" } }, { "type": "CheckBox", "props": { "y": 172, "x": 500, "width": 173, "var": "UI_Tgl_Music", "stateNum": 1, "skin": "resources/setting/interface_icon_button_02.png", "height": 100 } }, { "type": "CheckBox", "props": { "y": 332, "x": 500, "width": 173, "var": "UI_Tgl_Vibrate", "stateNum": 1, "skin": "resources/setting/interface_icon_button_01.png", "height": 100 } }] }] };
    ui.SettingUI = SettingUI;
})(ui || (ui = {}));
(function (ui) {
    var UpgradeUI = (function (_super) {
        __extends(UpgradeUI, _super);
        function UpgradeUI() {
            return _super.call(this) || this;
        }
        UpgradeUI.prototype.createChildren = function () {
            View.regComponent("ui.Effect.ClickDownEffectUI", ui.Effect.ClickDownEffectUI);
            View.regComponent("ui.Effect.ClickUpEffectUI", ui.Effect.ClickUpEffectUI);
            _super.prototype.createChildren.call(this);
            this.createView(ui.UpgradeUI.uiView);
        };
        return UpgradeUI;
    }(View));
    UpgradeUI.uiView = { "type": "View", "props": { "width": 1080, "height": 1920 }, "child": [{ "type": "Button", "props": { "var": "UI_Btn_Cancel", "top": 0, "stateNum": 1, "skin": "resources/common/img_black.png", "right": 0, "left": -16, "bottom": 0, "sizeGrid": "2,2,2,2" } }, { "type": "Box", "props": { "width": 1080, "right": 0, "mouseThrough": true, "left": 0, "height": 800, "bottom": 285 }, "child": [{ "type": "Image", "props": { "width": 1080, "var": "UI_Box_MainPanel", "skin": "resources/upgrade/img_panel.png", "sizeGrid": "80,40,80,40", "name": "MainPanel", "height": 328, "centerX": 0, "bottom": 0, "anchorY": 1, "anchorX": 0.5 }, "child": [{ "type": "Image", "props": { "width": 1080, "var": "UI_Box_SubPanel", "name": "SubPanel", "height": 275, "centerX": 0, "bottom": 312, "anchorY": 1, "anchorX": 0.5 }, "child": [{ "type": "HBox", "props": { "var": "UI_HBox_Location", "space": 0, "height": 273, "centerY": 0, "centerX": 0, "align": "middle" }, "child": [{ "type": "Box", "props": { "width": 210, "height": 273, "centerY": 0 }, "child": [{ "type": "Image", "props": { "width": 210, "top": 0, "skin": "resources/upgrade/img_sub_bg.png", "height": 273, "centerX": 0 } }] }, { "type": "Box", "props": { "width": 210, "height": 273, "centerY": 0 }, "child": [{ "type": "Image", "props": { "width": 210, "top": 0, "skin": "resources/upgrade/img_sub_bg.png", "height": 273, "centerX": 0 } }] }, { "type": "Box", "props": { "width": 210, "height": 273, "centerY": 0 }, "child": [{ "type": "Image", "props": { "width": 210, "top": 0, "skin": "resources/upgrade/img_sub_bg.png", "height": 273, "centerX": 0 } }] }, { "type": "Box", "props": { "width": 210, "height": 273, "centerY": 0 }, "child": [{ "type": "Image", "props": { "width": 210, "top": 0, "skin": "resources/upgrade/img_sub_bg.png", "height": 273, "centerX": 0 } }] }, { "type": "Box", "props": { "width": 210, "height": 273, "centerY": 0 }, "child": [{ "type": "Image", "props": { "width": 210, "top": 0, "skin": "resources/upgrade/img_sub_bg.png", "height": 273, "centerX": 0 } }] }] }] }, { "type": "Box", "props": { "width": 210, "var": "UI_Box_Left", "left": 80, "height": 273, "centerY": 0 } }, { "type": "Box", "props": { "width": 226, "name": "Anim_L", "left": 70, "height": 226, "centerY": -35 }, "child": [{ "type": "Animation", "props": { "y": 0, "x": 0, "width": 226, "var": "UI_Anim_Upgrade_Left", "source": "Anim/UpgradeAnim.ani", "height": 226 } }] }, { "type": "Box", "props": { "width": 360, "var": "UI_Box_UpgradeInfo_Main", "height": 50, "centerY": 0, "centerX": 0 }, "child": [{ "type": "Label", "props": { "width": 112, "var": "UI_Txt_UpgradeInfo_Main", "valign": "middle", "text": "8888", "height": 50, "fontSize": 50, "color": "#ffd600", "centerY": 0, "centerX": 0, "bold": true, "align": "center" }, "child": [{ "type": "Image", "props": { "width": 103, "skin": "resources/upgrade/img_txt_power_main.png", "left": -103, "height": 51 } }, { "type": "Image", "props": { "width": 53, "skin": "resources/upgrade/img_txt_level_weapon_0.png", "right": -53, "height": 53 } }] }] }, { "type": "Box", "props": { "width": 360, "var": "UI_Box_UpgradeInfo_Sub", "height": 50, "centerY": 0, "centerX": 0 }, "child": [{ "type": "Label", "props": { "width": 56, "var": "UI_Txt_UpgradeInfo_Sub", "valign": "middle", "text": "11", "height": 50, "fontSize": 50, "color": "#ffd600", "centerY": 0, "centerX": 0, "bold": true, "align": "center" }, "child": [{ "type": "Image", "props": { "skin": "resources/upgrade/img_txt_power_sub.png", "left": -132, "centerY": 0 } }, { "type": "Image", "props": { "skin": "resources/upgrade/img_txt_level_weapon_0.png", "right": -53, "height": 53, "centerY": 0 } }] }] }, { "type": "Box", "props": { "width": 360, "var": "UI_Box_UpgradeInfo_Money", "height": 50, "centerY": 0, "centerX": 0 }, "child": [{ "type": "Label", "props": { "width": 56, "var": "UI_Txt_UpgradeInfo_Spawn", "valign": "middle", "text": "11", "height": 50, "fontSize": 50, "color": "#ffd600", "centerY": 0, "centerX": 0, "bold": true, "align": "center" }, "child": [{ "type": "Image", "props": { "width": 124, "skin": "resources/upgrade/img_txt_spawn.png", "left": -124, "height": 53, "centerY": 0 } }, { "type": "Image", "props": { "width": 82, "skin": "resources/upgrade/img_txt_second.png", "right": -82, "height": 51, "centerY": 0 } }] }] }, { "type": "Box", "props": { "width": 86, "name": "arrow", "height": 82, "centerY": 0, "centerX": -122 }, "child": [{ "type": "Image", "props": { "width": 86, "var": "UI_Img_Arrow", "skin": "resources/upgrade/img_arrow.png", "left": 0, "height": 82, "centerY": 0 } }, { "type": "Image", "props": { "width": 86, "skin": "resources/common/img_white.jpg", "right": 0, "renderType": "mask", "name": "Mask", "height": 82, "centerY": 0, "sizeGrid": "2,2,2,2" } }] }, { "type": "Box", "props": { "width": 210, "name": "right", "left": 510, "height": 273, "centerY": 0 }, "child": [{ "type": "Box", "props": { "width": 210, "var": "UI_Box_Right", "left": 0, "height": 273, "centerY": 0 } }, { "type": "Image", "props": { "width": 210, "skin": "resources/common/img_white.jpg", "right": 0, "renderType": "mask", "name": "Mask", "height": 273, "bottom": 0, "sizeGrid": "2,2,2,2" } }] }, { "type": "Box", "props": { "y": 27, "width": 226, "name": "Anim_R", "left": 504, "height": 226, "centerY": -35 }, "child": [{ "type": "Animation", "props": { "width": 226, "var": "UI_Anim_Upgrade_Right", "source": "Anim/UpgradeAnim.ani", "height": 226 } }] }, { "type": "Box", "props": { "width": 226, "right": 50, "height": 231, "centerY": 0 }, "child": [{ "type": "Button", "props": { "width": 180, "var": "UI_Btn_UpgradeCost", "stateNum": 1, "skin": "resources/upgrade/img_cost_bg.png", "height": 64, "centerY": 0, "centerX": 0, "anchorY": 0.5, "anchorX": 0.5 }, "child": [{ "type": "Image", "props": { "width": 69, "skin": "resources/moneyinfo/img_icon_coin.png", "mouseEnabled": false, "left": -25, "height": 63, "centerY": 0 } }, { "type": "Label", "props": { "width": 125, "var": "UI_Txt_UpgradeCost", "valign": "top", "text": "8.888M", "right": 22, "mouseEnabled": false, "height": 36, "fontSize": 36, "color": "#ffffff", "centerY": 0, "align": "center" } }, { "type": "Script", "props": { "playEvent": "mousedown", "name": "d", "runtime": "ui.Effect.ClickDownEffectUI" } }, { "type": "Script", "props": { "playEvent": "mouseup", "name": "u", "runtime": "ui.Effect.ClickUpEffectUI" } }, { "type": "Script", "props": { "playEvent": "mouseout", "name": "o", "runtime": "ui.Effect.ClickUpEffectUI" } }] }] }, { "type": "Box", "props": { "width": 100, "var": "UI_Box_FloatTip_L", "left": 185, "height": 100, "centerY": -130 } }, { "type": "Box", "props": { "width": 100, "var": "UI_Box_FloatTip_R", "left": 615, "height": 100, "centerY": -130 } }] }] }, { "type": "Button", "props": { "y": 316, "x": 440, "width": 200, "visible": false, "var": "UI_Btn_Test_FloatTip", "stateNum": 1, "skin": "resources/common/img_white.jpg", "labelSize": 30, "labelFont": "黑体", "label": "浮字提示测试", "height": 100, "centerX": 0, "sizeGrid": "2,2,2,2" } }] };
    ui.UpgradeUI = UpgradeUI;
})(ui || (ui = {}));
(function (ui) {
    var VerifyUI = (function (_super) {
        __extends(VerifyUI, _super);
        function VerifyUI() {
            return _super.call(this) || this;
        }
        VerifyUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.createView(ui.VerifyUI.uiView);
        };
        return VerifyUI;
    }(View));
    VerifyUI.uiView = { "type": "View", "props": { "width": 1080, "height": 1920 }, "child": [{ "type": "Button", "props": { "var": "UI_Btn_Back", "top": 0, "right": 0, "left": 0, "bottom": 0 }, "child": [{ "type": "Image", "props": { "y": 0, "x": -4, "width": 1097, "skin": "resources/common/background.png", "height": 2484, "sizeGrid": "5,5,5,5" } }] }, { "type": "Image", "props": { "y": 1593, "width": 1033, "var": "UI_Img_Scale", "skin": "resources/verify/bg.png", "height": 1455, "centerX": 15, "anchorY": 1, "anchorX": 0.5 }, "child": [{ "type": "Image", "props": { "y": 71, "x": 252, "skin": "resources/verify/value.png" } }, { "type": "Image", "props": { "y": 993, "x": 122, "skin": "resources/verify/bottomBox.png", "name": "bottomtopBox", "cacheAs": "bitmap" }, "child": [{ "type": "Image", "props": { "y": 137, "x": 73, "skin": "resources/verify/buleCard.png" } }, { "type": "Image", "props": { "y": 131, "x": 258, "skin": "resources/verify/role_fight_weapon_01.png" } }, { "type": "Image", "props": { "y": 154, "x": 443, "skin": "resources/verify/img_icon_diamond.png" } }, { "type": "Image", "props": { "y": 145, "x": 627, "skin": "resources/verify/zuanpanIcon.png" } }, { "type": "Image", "props": { "y": 34, "x": 83, "skin": "resources/verify/title_bottom_0.png" } }, { "type": "Label", "props": { "y": 256, "x": 73, "width": 90, "text": "社区蓝卡", "name": "bulecared", "height": 30, "fontSize": 28, "font": "Microsoft YaHei", "color": "#ffffff" } }, { "type": "Label", "props": { "y": 256, "x": 262, "width": 90, "text": "导弹机体", "name": "plane", "height": 30, "fontSize": 28, "font": "Microsoft YaHei", "color": "#ffffff" } }, { "type": "Label", "props": { "y": 256, "x": 623, "width": 90, "text": "抽奖10次", "name": "bulecared", "height": 30, "fontSize": 28, "font": "Microsoft YaHei", "color": "#ffffff" } }, { "type": "Label", "props": { "y": 256, "x": 441, "width": 90, "text": "2000钻石", "name": "bulecared", "height": 30, "fontSize": 28, "font": "Microsoft YaHei", "color": "#ffffff" } }] }, { "type": "Panel", "props": { "y": 187, "x": 118, "width": 809, "var": "panel", "height": 345, "hScrollBarSkin": "resources/common/img_black.png" }, "child": [{ "type": "Image", "props": { "y": 4, "x": 0, "var": "info1", "skin": "resources/verify/bottomBox.png" }, "child": [{ "type": "Image", "props": { "y": 195, "x": 129, "skin": "resources/verify/hexiezhe.png", "name": "img_1", "anchorY": 0.5, "anchorX": 0.5 }, "child": [{ "type": "Label", "props": { "y": 107, "x": 0, "width": 127, "text": "和谐者", "height": 47, "fontSize": 30, "font": "SimHei", "color": "#ffffff", "bold": false } }] }, { "type": "Image", "props": { "y": 194, "x": 305, "width": 61, "skin": "resources/verify/liebianzhe.png", "name": "img_2", "height": 96, "anchorY": 0.5, "anchorX": 0.5 }, "child": [{ "type": "Label", "props": { "y": 106, "x": -9, "width": 77, "text": "裂变者", "height": 35, "fontSize": 30, "font": "Microsoft YaHei", "color": "#ffffff" } }] }, { "type": "Image", "props": { "y": 197, "x": 490, "skin": "resources/verify/gongshizhe.png", "name": "img_3", "anchorY": 0.5, "anchorX": 0.5 }, "child": [{ "type": "Label", "props": { "y": 108, "x": 11, "text": "共识者", "fontSize": 30, "font": "Microsoft YaHei", "color": "#ffffff" } }] }, { "type": "Image", "props": { "y": 202, "x": 679, "skin": "resources/verify/zhilizhe.png", "name": "img_4", "anchorY": 0.5, "anchorX": 0.5 }, "child": [{ "type": "Label", "props": { "y": 101, "x": 2, "text": "治理者", "fontSize": 30, "font": "Microsoft YaHei", "color": "#ffffff" } }] }, { "type": "Image", "props": { "y": 31, "x": 76, "skin": "resources/verify/title_Top_0.png", "name": "title" } }] }, { "type": "Image", "props": { "y": 4, "x": 810, "width": 805, "var": "info2", "skin": "resources/verify/bottomBox.png" }, "child": [{ "type": "Image", "props": { "y": 198, "x": 129, "skin": "resources/verify/xiezhenshouyi.png", "name": "img_1", "anchorY": 0.5, "anchorX": 0.5 }, "child": [{ "type": "Label", "props": { "y": 108, "x": -18, "width": 127, "text": "谐振收益", "height": 47, "fontSize": 30, "font": "SimHei", "color": "#ffffff", "bold": false } }] }, { "type": "Image", "props": { "y": 194, "x": 305, "width": 96, "skin": "resources/verify/wakuangshouyi.png", "name": "img_2", "height": 100, "anchorY": 0.5, "anchorX": 0.5 }, "child": [{ "type": "Label", "props": { "y": 106, "x": -16, "width": 123, "text": "挖矿收益", "height": 35, "fontSize": 30, "font": "Microsoft YaHei", "color": "#ffffff" } }] }, { "type": "Image", "props": { "y": 197, "x": 488, "skin": "resources/verify/fenhongshouyi.png", "name": "img_3", "anchorY": 0.5, "anchorX": 0.5 }, "child": [{ "type": "Label", "props": { "y": 99, "x": 6, "text": "共识者", "fontSize": 30, "font": "Microsoft YaHei", "color": "#ffffff" } }] }, { "type": "Image", "props": { "y": 202, "x": 679, "skin": "resources/verify/shequshouyi.png", "name": "img_4", "anchorY": 0.5, "anchorX": 0.5 }, "child": [{ "type": "Label", "props": { "y": 101, "x": -12, "text": "社区收益", "fontSize": 30, "font": "Microsoft YaHei", "color": "#ffffff" } }] }, { "type": "Image", "props": { "y": 31, "x": 76, "skin": "resources/verify/title2.png", "name": "title" } }] }, { "type": "Image", "props": { "y": 4, "x": 1620, "width": 805, "var": "info3", "skin": "resources/verify/bottomBox.png" }, "child": [{ "type": "Image", "props": { "y": 200, "x": 129, "skin": "resources/verify/zhiqingquan.png", "name": "img_1", "anchorY": 0.5, "anchorX": 0.5 }, "child": [{ "type": "Label", "props": { "y": 107, "x": 0, "width": 127, "text": "知情权", "height": 47, "fontSize": 30, "font": "SimHei", "color": "#ffffff", "bold": false } }] }, { "type": "Image", "props": { "y": 199, "x": 305, "width": 82, "skin": "resources/verify/tianquan.png", "name": "img_2", "height": 96, "anchorY": 0.5, "anchorX": 0.5 }, "child": [{ "type": "Label", "props": { "y": 101, "x": -3, "width": 77, "text": "提案劝", "height": 35, "fontSize": 30, "font": "Microsoft YaHei", "color": "#ffffff" } }] }, { "type": "Image", "props": { "y": 197, "x": 490, "skin": "resources/verify/toupiaoquan.png", "name": "img_3", "anchorY": 0.5, "anchorX": 0.5 }, "child": [{ "type": "Label", "props": { "y": 108, "x": 18, "text": "投票权", "fontSize": 30, "font": "Microsoft YaHei", "color": "#ffffff" } }] }, { "type": "Image", "props": { "y": 202, "x": 679, "skin": "resources/verify/tanhequan.png", "name": "img_4", "anchorY": 0.5, "anchorX": 0.5 }, "child": [{ "type": "Label", "props": { "y": 101, "x": 8, "text": "弹劾权", "fontSize": 30, "font": "Microsoft YaHei", "color": "#ffffff" } }] }, { "type": "Image", "props": { "y": 31, "x": 76, "skin": "resources/verify/title3.png", "name": "title" } }] }] }, { "type": "Image", "props": { "y": 555, "x": 118, "var": "midBox", "skin": "resources/verify/midBox.png" } }, { "type": "Box", "props": { "width": 671, "top": 588, "name": "phone", "height": 98, "centerX": -2 }, "child": [{ "type": "Image", "props": { "top": 0, "skin": "resources/verify/inputSkin.png", "right": 0, "left": 0, "height": 88 } }, { "type": "TextInput", "props": { "var": "UI_Ipt_PhoneNumber", "type": "number", "top": 0, "right": 0, "promptColor": "#d4d4d4", "prompt": "输入手机号", "left": 32, "height": 100, "fontSize": 36, "font": "黑体", "color": "#ffffff", "bottom": 0 } }] }, { "type": "Box", "props": { "width": 668, "top": 705, "name": "verify", "height": 98, "centerX": 1 }, "child": [{ "type": "Image", "props": { "width": 322, "skin": "resources/verify/inputSkin.png", "left": 0, "height": 88, "centerY": 0 } }, { "type": "TextInput", "props": { "width": 282, "var": "UI_Ipt_Verify", "type": "number", "top": 0, "promptColor": "#d4d4d4", "prompt": "验证码", "left": 32, "height": 88, "fontSize": 36, "font": "黑体", "color": "#ffffff", "bottom": 0 } }, { "type": "Button", "props": { "width": 263, "var": "UI_Btn_GetMessageVerify", "stateNum": 1, "skin": "resources/common/img_btn_orange.png", "right": 0, "labelSize": 36, "labelFont": "黑体", "labelColors": "#FFFFFF", "labelAlign": "center", "height": 93, "centerY": 0 }, "child": [{ "type": "Image", "props": { "width": 200, "var": "UI_Img_Verify", "skin": "resources/verify/img_txt_verify.png", "height": 55, "centerY": 0, "centerX": 0 } }, { "type": "Label", "props": { "var": "UI_Txt_Verify", "valign": "middle", "top": 0, "text": "label", "right": 0, "left": 0, "fontSize": 36, "font": "黑体", "color": "#ffffff", "bottom": 0, "bold": true, "align": "center" } }] }] }, { "type": "Button", "props": { "width": 263, "var": "UI_Btn_Submit", "stateNum": 1, "skin": "resources/common/img_btn_orange.png", "labelSize": 36, "labelFont": "黑体", "labelColors": "#FFFFFF", "label": "确定", "height": 93, "centerX": 5, "bottom": 530 } }, { "type": "Image", "props": { "width": 515, "visible": false, "top": 981, "skin": "resources/verify/img_txt_reward.png", "height": 52, "centerX": 841 }, "child": [{ "type": "Label", "props": { "width": 164, "var": "UI_Txt_DiamondNum", "valign": "middle", "text": "1000", "right": 68, "height": 60, "fontSize": 60, "color": "#ffea00", "bottom": 0, "bold": true, "align": "center" } }] }, { "type": "Image", "props": { "y": 505, "x": 553, "var": "c3", "skin": "resources/verify/c_1.png" } }, { "type": "Image", "props": { "y": 506, "x": 503, "var": "c2", "skin": "resources/verify/c_1.png" } }, { "type": "Image", "props": { "y": 506, "x": 453, "var": "c1", "skin": "resources/verify/c2.png" } }] }, { "type": "Image", "props": { "var": "UI_Pnl_Tip", "top": 0, "skin": "resources/common/background.png", "right": 0, "left": 0, "bottom": 0, "sizeGrid": "5,5,5,5" }, "child": [{ "type": "Button", "props": { "var": "UI_Btn_Confirm_0", "top": 0, "right": 0, "left": 0, "bottom": 0 } }, { "type": "Image", "props": { "width": 541, "skin": "resources/unpack/img_panel_bg_1.png", "sizeGrid": "60,60,60,60", "height": 367, "centerY": 0, "centerX": 0 }, "child": [{ "type": "Label", "props": { "wordWrap": true, "width": 381, "var": "UI_Txt_Tip_Msg", "valign": "middle", "top": 47, "text": "恭喜您获得　　　钻石 啊啊啊啊", "overflow": "scroll", "height": 178, "fontSize": 36, "font": "黑体", "color": "#ffffff", "centerX": 0, "align": "center" } }, { "type": "Button", "props": { "width": 263, "var": "UI_Btn_Confirm_1", "stateNum": 1, "skin": "resources/common/img_btn_orange.png", "labelSize": 36, "labelFont": "黑体", "labelColors": "#FFFFFF", "label": "确定", "height": 93, "centerX": 0, "bottom": 36, "anchorY": 0.5, "anchorX": 0.5 } }] }] }] };
    ui.VerifyUI = VerifyUI;
})(ui || (ui = {}));
(function (ui) {
    var WaitingUI = (function (_super) {
        __extends(WaitingUI, _super);
        function WaitingUI() {
            return _super.call(this) || this;
        }
        WaitingUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.createView(ui.WaitingUI.uiView);
        };
        return WaitingUI;
    }(View));
    WaitingUI.uiView = { "type": "View", "props": { "width": 1080, "height": 1920 }, "child": [{ "type": "Image", "props": { "width": 512, "var": "waitingAnim", "skin": "resources/waiting/loadingicon.png", "scaleY": 0.3, "scaleX": 0.3, "height": 512, "centerY": 0, "centerX": 0, "anchorY": 0.5, "anchorX": 0.5 } }] };
    ui.WaitingUI = WaitingUI;
})(ui || (ui = {}));
//# sourceMappingURL=layaUI.max.all.js.map