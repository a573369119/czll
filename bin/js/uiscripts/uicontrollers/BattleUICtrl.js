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
        var BattleUICtrl = (function (_super) {
            __extends(BattleUICtrl, _super);
            function BattleUICtrl(view) {
                var _this = _super.call(this, view) || this;
                _this.ProgressWidth_Max = 741;
                _this.ProgressWidth_Min = 0;
                _this.LevelPos_Prev = 0;
                _this.LevelPos_Cur = 120;
                _this.LevelPos_Next = 240;
                _this.coinSkin = "resources/common/interface_icon_gold_02.png";
                _this.PropImage_X = 65;
                _this.PropImage_Height = 130;
                //关卡结束标志
                _this.levelComplete = false;
                _this.playerWin = false;
                return _this;
            }
            BattleUICtrl.prototype.GetView = function () {
                return this.uiView;
            };
            /**
             * @override
             */
            BattleUICtrl.prototype.Init = function (parent, id) {
                var _this = this;
                _super.prototype.Init.call(this, parent, id);
                this.mediatorName = ui.UIID.BattleUIID.toString();
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
                });
                //动画列表与数字列表
                this.moneyNumArray = new Array();
                this.levelArray = new Array();
                this.propDic = new Laya.Dictionary();
                this.propArray = new Array();
                this.propTweenTaskList = new Array();
                //计算金币图片的位置，用于确定动画坐标
                this.coinPos = this.CalGlobalCoinPos();
            };
            /**
             * @override
             */
            //ui动画执行前
            BattleUICtrl.prototype.BeforeUIOpen = function (context) {
                if (context === void 0) { context = null; }
                _super.prototype.BeforeUIOpen.call(this, context);
            };
            /**
            * @override
            */
            //ui打开动画完成
            BattleUICtrl.prototype.OnUIOpened = function (context) {
                if (context === void 0) { context = null; }
                _super.prototype.OnUIOpened.call(this, context);
                this.RefreshBattleInfo();
                //Level
                var levelAnimParam = new LevelUIAnimParam();
                levelAnimParam.LevelAnimType = EnumLevelUIAnimType.Battle;
                levelAnimParam.curLevel = GameDataManager.getInstance().LoginPlayerInfo.CurLevel;
                this.sendNotification(NotificationNames.LevelUI_PlayAnim, levelAnimParam);
                //通知动画
                PlayerManager.GetInstance().MainPlayer.EnterBattleScene();
            };
            /**
             * @override
             */
            //ui关闭动画完成
            BattleUICtrl.prototype.OnUIHide = function () {
                _super.prototype.OnUIHide.call(this);
                //清除等级信息
                this.DeleteLevel();
                //停止Prop的动画内容
                this.DeleteAllProp();
            };
            /**
             * @override
             */
            BattleUICtrl.prototype.BeforeUIDestroy = function () {
                _super.prototype.BeforeUIDestroy.call(this);
                this.RemoveEvent();
            };
            /**
             * @override
             */
            BattleUICtrl.prototype.OnUIDestroy = function () {
                _super.prototype.OnUIDestroy.call(this);
            };
            BattleUICtrl.prototype.RegisterEvent = function () {
                Facade.getInstance().registerMediator(this);
                this.GetView().UI_Btn_Setting.on(Laya.Event.CLICK, this, this.OnUI_Btn_SettingClick);
            };
            BattleUICtrl.prototype.RemoveEvent = function () {
                Facade.getInstance().removeMediator(this.getMediatorName());
                this.GetView().UI_Btn_Setting.off(Laya.Event.CLICK, this, this.OnUI_Btn_SettingClick);
            };
            BattleUICtrl.prototype.OnUI_Btn_SettingClick = function () {
                //发送暂停消息
                //然后再打开设置面板
                this.sendNotification(NotificationNames.OPENUI, ui.UIID.SettingUIID);
            };
            /**
             * @override
             */
            BattleUICtrl.prototype.listNotificationInterests = function () {
                return [
                    NotificationNames.UI_StartGame,
                    NotificationNames.UI_OnMonsterKill,
                    NotificationNames.UI_RefreshMatchProgressInfo,
                    NotificationNames.UI_OnPropBuff,
                    NotificationNames.MATCH_COMPLETE,
                    NotificationNames.HULK_COMING
                ];
            };
            /**
            * @override
            */
            BattleUICtrl.prototype.handleNotification = function (note) {
                var _this = this;
                var view = this.GetView();
                switch (note.getName()) {
                    case NotificationNames.UI_RefreshMatchProgressInfo: {
                        var data = note.getBody();
                        //每次接收的时候刷新进度条和剩余怪物
                        //注意：传过来的数据是从0~1增加的，所以此处变成倒计数
                        this.SetProgress(1 - data.Progress);
                        view.UI_Txt_EnemyCount.text = data.MonsterLeftNum.toString();
                        if (data.Gold > 0)
                            this.GetView().UI_Txt_CoinCount.text = GameDataUtil.NumberToString(data.Gold); //需要立刻刷新
                        break;
                    }
                    case NotificationNames.UI_OnMonsterKill: {
                        //怪物死亡，播放动画
                        var data = note.getBody();
                        //播放怪物死亡音效
                        // AudioManager.GetInstance().PlaySound(AudioClipNames.Sound_Fight_Monster_01);
                        //震动
                        if (CommonUtil.OnMiniGame()) {
                            if (StorageManager.GetVibrateSetting()) {
                            }
                        }
                        //震屏
                        this.sendNotification(NotificationNames.BackgroundUI_Shake);
                        //2019-5-16 21:07:44 怪物金币掉落改为几率掉落，所以如果金币数量为0代表没有掉落，就不用播放动画了
                        if (data.GoldADD == 0) {
                            //可以在此处判断何时为正确的结束时间
                            //延时一段时间后再判断
                            TimeManager.getInst().once(0.5, cbhandler.gen_handler(function () {
                                if (_this.levelComplete && _this.playerWin) {
                                    //根据胜败发送完成消息
                                    //玩家胜利
                                    _this.sendNotification(NotificationNames.OPENUIWITHPARAM, new ui.ResultUIParam(true));
                                    _this.levelComplete = false;
                                }
                            }, this));
                            return;
                        }
                        else {
                            //根据是否为点石成金，决定金币的显示数量
                            var num = data.GoldADD;
                            var coinNum = 3;
                            if (num)
                                coinNum += num;
                            //将钱币数量保存下来，留着动画播放完毕后
                            this.moneyNumArray.push(GameDataManager.getInstance().MatchInfo.GoldNum);
                            //排序（很重要）
                            this.moneyNumArray = SortUtil.orderby(this.moneyNumArray, function (i) { return i; }).reverse();
                            //播放金币动画
                            MoneyAnimManager.Instance.PlayMoneyAnim_Pos_Curve(EnumMoneyAnimType.Coin, coinNum, data.Postion, this.coinPos, 500, cbhandler.gen_handler(function () {
                                //更新钱币
                                var moneyNum = _this.moneyNumArray.pop();
                                if (!moneyNum) {
                                    moneyNum = GameDataManager.getInstance().MatchInfo.GoldNum;
                                }
                                _this.GetView().UI_Txt_CoinCount.text = GameDataUtil.NumberToString(moneyNum);
                                //可以在此处判断何时为正确的结束时间
                                if (_this.levelComplete && _this.playerWin) {
                                    //根据胜败发送完成消息
                                    //玩家胜利
                                    _this.sendNotification(NotificationNames.OPENUIWITHPARAM, new ui.ResultUIParam(true));
                                    _this.levelComplete = false;
                                }
                            }, this));
                        }
                        break;
                    }
                    case NotificationNames.MATCH_COMPLETE: {
                        //记录胜败
                        this.playerWin = note.getBody();
                        //记录已经完成
                        this.levelComplete = true;
                        break;
                    }
                    case NotificationNames.UI_StartGame: {
                        //关闭面板时不接收
                        // if (view.visible == false) {
                        //     return;
                        // }
                        if (GameDataManager.getInstance().MatchInfo.State != EnumMatchState.Complete) {
                            //在非游戏结束时
                            return;
                        }
                        //继续挑战
                        Facade.instance.sendNotification(NotificationNames.CONTINUE_NEXT_MATCH, GameDataManager.getInstance().LoginPlayerInfo.CurLevel);
                        //重刷新信息
                        this.RefreshBattleInfo();
                        break;
                    }
                    case NotificationNames.UI_OnPropBuff: {
                        var data = note.getBody();
                        this.SetPropVisible(data);
                        break;
                    }
                    case NotificationNames.HULK_COMING: {
                        //收到消息，巨型虫子入侵
                        view.UI_Img_Warning.alpha = 0;
                        view.UI_Img_Warning.visible = true;
                        view.UI_Anim_Warning.play(0, true, "Warning");
                        //3秒后停止
                        TimeManager.getInst().once(3, cbhandler.gen_handler(function () {
                            view.UI_Anim_Warning.stop();
                            view.UI_Img_Warning.alpha = 0;
                            view.UI_Img_Warning.visible = false;
                        }, this));
                        break;
                    }
                }
            };
            BattleUICtrl.prototype.RefreshBattleInfo = function () {
                //UI完全打开后
                var view = this.GetView();
                //设置关卡
                this.SetCurLevel();
                //读取金币
                view.UI_Txt_CoinCount.text = GameDataUtil.NumberToString(GameDataManager.getInstance().MatchInfo.GoldNum);
                //关卡结束标志
                this.levelComplete = false;
                this.playerWin = false;
                //进度条
                this.SetProgress(1);
                //警告
                view.UI_Img_Warning.visible = false;
                //怪物提示
                view.UI_Txt_EnemyCount.text = "";
            };
            BattleUICtrl.prototype.SetCurLevel = function () {
                var view = this.GetView();
                //清除旧数据
                this.DeleteLevel();
                //当前
                var cur = new ui.PrefabUI.LevelItemPrefabUI();
                cur.UI_Img_CurLevel.visible = true;
                cur.UI_Img_OtherLevel.visible = false;
                cur.UI_Txt_Level.text = GameDataManager.getInstance().LevelInfo.CurLevelID.toString();
                view.UI_Box_Level.addChild(cur);
                cur.centerY = 0;
                cur.x = this.LevelPos_Cur;
                this.levelArray.push(cur);
                //下一关
                var next = new ui.PrefabUI.LevelItemPrefabUI();
                next.UI_Img_CurLevel.visible = false;
                next.UI_Img_OtherLevel.visible = true;
                next.UI_Txt_Level.text = (GameDataManager.getInstance().LevelInfo.CurLevelID + 1).toString();
                view.UI_Box_Level.addChild(next);
                next.centerY = 0;
                next.x = this.LevelPos_Next;
                this.levelArray.push(next);
                if (GameDataManager.getInstance().LevelInfo.CurLevelID != 1) {
                    //第1关没有上一关
                    var prev = new ui.PrefabUI.LevelItemPrefabUI();
                    prev.UI_Img_CurLevel.visible = false;
                    prev.UI_Img_OtherLevel.visible = true;
                    prev.UI_Txt_Level.text = (GameDataManager.getInstance().LevelInfo.CurLevelID - 1).toString();
                    view.UI_Box_Level.addChild(prev);
                    prev.centerY = 0;
                    prev.x = this.LevelPos_Prev;
                    this.levelArray.push(prev);
                }
            };
            BattleUICtrl.prototype.DeleteLevel = function () {
                for (var i = 0; i < this.levelArray.length; i++) {
                    var element = this.levelArray[i];
                    element.removeSelf();
                    element.destroy(true);
                }
                this.levelArray = new Array();
            };
            /**
             * 设置进度条
             * @param ratio 0~1
             */
            BattleUICtrl.prototype.SetProgress = function (ratio) {
                var view = this.GetView();
                view.UI_Img_Progress.width = this.ProgressWidth_Min + (this.ProgressWidth_Max - this.ProgressWidth_Min) * ratio;
            };
            BattleUICtrl.prototype.SetPropVisible = function (prop) {
                var view = this.GetView();
                //2019-6-13 10:00:05 新需求 道具倒计时效果
                //2.根据显示类型进行逻辑处理
                if (prop.Active) {
                    //需要显示
                    //可能目前已经显示，需要查找
                    var propPrefab = this.propDic.get(prop.BuffType);
                    if (!propPrefab) {
                        //当前没有显示，需要创建
                        propPrefab = this.CreatePropPrefab(prop);
                        //保存引用
                        this.propDic.set(prop.BuffType, propPrefab);
                        //设置父子关系并放置在正确的位置上
                        view.UI_Box_Prop.addChild(propPrefab);
                        var childCount = view.UI_Box_Prop.numChildren;
                        propPrefab.x = this.PropImage_X;
                        propPrefab.y = (childCount - 1) * this.PropImage_Height;
                    }
                    //刷新倒计时
                    propPrefab.RefreshPrefab(prop);
                }
                else {
                    //需要隐藏
                    //可能目前已经显示，需要查找
                    var propPrefab = this.propDic.get(prop.BuffType);
                    if (!propPrefab) {
                        //没有找到，不做判断
                        Log.Debug("BattleUI 重复隐藏buff图片，不再处理：", prop.BuffType);
                        return;
                    }
                    else {
                        //正在显示，准备隐藏
                        //移除引用
                        this.propDic.remove(prop.BuffType);
                        propPrefab.removeSelf();
                        this.DeletePropImage(propPrefab);
                        //刷新其他
                        this.RefreshPropBoxChild();
                    }
                }
            };
            //刷新其他内容
            BattleUICtrl.prototype.RefreshPropBoxChild = function () {
                var _this = this;
                var view = this.GetView();
                //防止动画播放过程中出现问题，提前停止Prop动画
                this.StopAllPropTween();
                var _loop_1 = function () {
                    //将自己通过动画平滑移动到目标位置上
                    var task = Tween2DUtil.to({
                        node: view.UI_Box_Prop.getChildAt(i),
                        duration: 0.3,
                        x: this_1.PropImage_X,
                        y: i * this_1.PropImage_Height,
                        onComplete: cbhandler.gen_handler(function () {
                            //动画播放完成后移除
                            _this.propTweenTaskList.splice(_this.propTweenTaskList.indexOf(task), 1);
                        })
                    });
                    this_1.propTweenTaskList.push(task);
                };
                var this_1 = this;
                for (var i = 0; i < view.UI_Box_Prop.numChildren; i++) {
                    _loop_1();
                }
            };
            BattleUICtrl.prototype.DeleteAllProp = function () {
                for (var i = 0; i < this.propDic.keys.length; i++) {
                    var key = this.propDic.keys[i];
                    var prefab = this.propDic.get(key);
                    // prefab.removeSelf();
                    this.DeletePropImage(prefab);
                }
                this.propDic = new Laya.Dictionary();
            };
            //停止所有Prop动画
            BattleUICtrl.prototype.StopAllPropTween = function () {
                for (var i = 0; i < this.propTweenTaskList.length; i++) {
                    Tween2DUtil.kill(this.propTweenTaskList[i]);
                }
                this.propTweenTaskList = new Array();
            };
            //创建buff图标
            BattleUICtrl.prototype.CreatePropPrefab = function (prop) {
                var prefab = this.propArray.pop();
                if (!prefab) {
                    prefab = new BattleProp();
                }
                prefab.RefreshPrefab(prop);
                prefab.visible = true;
                return prefab;
            };
            //删除buff图标
            BattleUICtrl.prototype.DeletePropImage = function (prefab) {
                //进入池
                prefab.visible = false;
                prefab.HidePrefab();
                this.propArray.push(prefab);
            };
            //计算金币图标的全局坐标值
            BattleUICtrl.prototype.CalGlobalCoinPos = function () {
                var view = this.GetView();
                //因为有resize，因此需要动态计算金币图片的坐标位置
                //1.x
                var x = (Laya.stage.width - view.UI_Box_MatchInfo.width) / 2 + view.UI_Box_MatchInfo.centerX + view.UI_Img_Coin.x; //+ view.UI_Img_Coin.width / 2;
                //2.y
                var y = view.UI_Box_MatchInfo.top + view.UI_Img_Coin.y; //+ view.UI_Img_Coin.height / 2;
                return new Vec2(x, y);
            };
            return BattleUICtrl;
        }(ui.BaseUICtrl));
        uicontrollers.BattleUICtrl = BattleUICtrl;
    })(uicontrollers = ui.uicontrollers || (ui.uicontrollers = {}));
})(ui || (ui = {}));
//# sourceMappingURL=BattleUICtrl.js.map