
/**
* Created By Code Generator
*/
module ui.uicontrollers {
    import Facade = puremvc.Facade;

    export class BattleUICtrl extends ui.BaseUICtrl {
        private readonly ProgressWidth_Max = 741;
        private readonly ProgressWidth_Min = 0;
        private readonly LevelPos_Prev = 0;
        private readonly LevelPos_Cur = 120;
        private readonly LevelPos_Next = 240;
        private readonly coinSkin = "resources/common/interface_icon_gold_02.png";

        private readonly PropImage_X = 65;
        private readonly PropImage_Height = 130;

        private levelArray: Array<ui.PrefabUI.LevelItemPrefabUI>;
        private moneyNumArray: Array<number>;

        //关卡结束标志
        private levelComplete: boolean = false;
        private playerWin: boolean = false;

        //buff图标
        private propDic: Laya.Dictionary;
        private propArray: Array<BattleProp>;
        private propTweenTaskList: Array<number>;

        //计算coin所在的位置（因为resize缘故会有变动）
        private coinPos: Vec2;

        constructor(view: View) {
            super(view);
        }

        public GetView(): ui.BattleUI {
            return this.uiView as ui.BattleUI;
        }
        /**
         * @override
         */
        public Init(parent: Laya.Sprite, id: ui.UIID) {
            super.Init(parent, id);
            this.mediatorName = ui.UIID.BattleUIID.toString();

            //ui配置
            //this.uiConfig = new WindowConfigData();
            //this.uiConfig.uiOpenAnimType = UIAnim.PopOpen;
            //this.uiConfig.uiCloseAnimType = UIAnim.PopClose;
            //this.uiConfig.depth = 0;
            //添加舞台
            parent.addChild(this.uiView)
            this.uiView.zOrder = this.uiConfig.depth;

            this.RegisterEvent();


            //自适应
            this.GetView().on(Laya.Event.RESIZE, this, () => {
                this.GetView().width = Laya.stage.width;
                this.GetView().height = Laya.stage.height;
            });

            //动画列表与数字列表
            this.moneyNumArray = new Array<number>();
            this.levelArray = new Array<ui.PrefabUI.LevelItemPrefabUI>();

            this.propDic = new Laya.Dictionary();
            this.propArray = new Array<BattleProp>();
            this.propTweenTaskList = new Array<number>();

            //计算金币图片的位置，用于确定动画坐标
            this.coinPos = this.CalGlobalCoinPos();
        }

        /**
         * @override
         */
        //ui动画执行前
        protected BeforeUIOpen(context: WindowContextDataBase = null) {
            super.BeforeUIOpen(context);
        }
        /**
        * @override
        */
        //ui打开动画完成
        protected OnUIOpened(context: WindowContextDataBase = null) {
            super.OnUIOpened(context);

            this.RefreshBattleInfo();

            //Level
            let levelAnimParam = new LevelUIAnimParam();
            levelAnimParam.LevelAnimType = EnumLevelUIAnimType.Battle;
            levelAnimParam.curLevel = GameDataManager.getInstance().LoginPlayerInfo.CurLevel;
            this.sendNotification(NotificationNames.LevelUI_PlayAnim, levelAnimParam)

            //通知动画
            PlayerManager.GetInstance().MainPlayer.EnterBattleScene();
        }
        /**
         * @override
         */
        //ui关闭动画完成
        protected OnUIHide() {
            super.OnUIHide();

            //清除等级信息
            this.DeleteLevel();
            //停止Prop的动画内容
            this.DeleteAllProp();
        }
        /**
         * @override
         */
        protected BeforeUIDestroy() {
            super.BeforeUIDestroy();
            this.RemoveEvent();
        }
        /**
         * @override
         */
        protected OnUIDestroy() {
            super.OnUIDestroy();
        }

        private RegisterEvent(): void {
            Facade.getInstance().registerMediator(this)
            this.GetView().UI_Btn_Setting.on(Laya.Event.CLICK, this, this.OnUI_Btn_SettingClick);

        }
        private RemoveEvent(): void {
            Facade.getInstance().removeMediator(this.getMediatorName());

            this.GetView().UI_Btn_Setting.off(Laya.Event.CLICK, this, this.OnUI_Btn_SettingClick);

        }
        private OnUI_Btn_SettingClick() {
            //发送暂停消息

            //然后再打开设置面板
            this.sendNotification(NotificationNames.OPENUI, UIID.SettingUIID);
        }

        /**
         * @override
         */
        listNotificationInterests(): string[] {
            return [
                NotificationNames.UI_StartGame,
                NotificationNames.UI_OnMonsterKill,
                NotificationNames.UI_RefreshMatchProgressInfo,
                NotificationNames.UI_OnPropBuff,
                NotificationNames.MATCH_COMPLETE,
                NotificationNames.HULK_COMING
            ];
        }

        /**
        * @override
        */
        handleNotification(note: puremvc.INotification): void {
            let view = this.GetView();
            switch (note.getName()) {
                case NotificationNames.UI_RefreshMatchProgressInfo: {
                    let data = note.getBody() as MatchProgressInfo;
                    //每次接收的时候刷新进度条和剩余怪物
                    //注意：传过来的数据是从0~1增加的，所以此处变成倒计数
                    this.SetProgress(1 - data.Progress);
                    view.UI_Txt_EnemyCount.text = data.MonsterLeftNum.toString();
                    if (data.Gold > 0) this.GetView().UI_Txt_CoinCount.text = GameDataUtil.NumberToString(data.Gold);//需要立刻刷新
                    break;
                }
                case NotificationNames.UI_OnMonsterKill: {
                    //怪物死亡，播放动画
                    let data = note.getBody() as MonsterDieInfo;

                    //播放怪物死亡音效
                    // AudioManager.GetInstance().PlaySound(AudioClipNames.Sound_Fight_Monster_01);
                    //震动
                    if (CommonUtil.OnMiniGame()) {
                        if (StorageManager.GetVibrateSetting()) {
                            // WechatUtil.getIntance().Vibrate();
                        }
                    }
                    //震屏
                    this.sendNotification(NotificationNames.BackgroundUI_Shake);

                    //2019-5-16 21:07:44 怪物金币掉落改为几率掉落，所以如果金币数量为0代表没有掉落，就不用播放动画了
                    if (data.GoldADD == 0) {
                        //可以在此处判断何时为正确的结束时间
                        //延时一段时间后再判断
                        TimeManager.getInst().once(0.5, cbhandler.gen_handler(() => {
                            if (this.levelComplete && this.playerWin) {
                                //根据胜败发送完成消息
                                //玩家胜利
                                this.sendNotification(NotificationNames.OPENUIWITHPARAM, new ResultUIParam(true));
                                this.levelComplete = false;
                                //发送暂停
                            }
                        }, this))
                        return;
                    } else {
                        //根据是否为点石成金，决定金币的显示数量
                        let num = data.GoldADD;
                        let coinNum = 3;
                        if (num) coinNum += num;
                        //将钱币数量保存下来，留着动画播放完毕后
                        this.moneyNumArray.push(GameDataManager.getInstance().MatchInfo.GoldNum);
                        //排序（很重要）
                        this.moneyNumArray = SortUtil.orderby(this.moneyNumArray, i => i).reverse();
                        //播放金币动画
                        MoneyAnimManager.Instance.PlayMoneyAnim_Pos_Curve(EnumMoneyAnimType.Coin, coinNum, data.Postion, this.coinPos, 500, cbhandler.gen_handler(() => {
                            //更新钱币
                            let moneyNum = this.moneyNumArray.pop();
                            if (!moneyNum) {
                                moneyNum = GameDataManager.getInstance().MatchInfo.GoldNum;
                            }
                            this.GetView().UI_Txt_CoinCount.text = GameDataUtil.NumberToString(moneyNum);
                            //可以在此处判断何时为正确的结束时间
                            if (this.levelComplete && this.playerWin) {
                                //根据胜败发送完成消息
                                //玩家胜利
                                this.sendNotification(NotificationNames.OPENUIWITHPARAM, new ResultUIParam(true));
                                this.levelComplete = false;
                                //发送暂停
                            }
                        }, this));
                    }

                    break;
                }
                case NotificationNames.MATCH_COMPLETE: {
                    //记录胜败
                    this.playerWin = note.getBody() as boolean;
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
                    let data = note.getBody() as PlayerBuffInfo;
                    this.SetPropVisible(data);
                    break;
                }
                case NotificationNames.HULK_COMING: {
                    //收到消息，巨型虫子入侵
                    view.UI_Img_Warning.alpha = 0;
                    view.UI_Img_Warning.visible = true;
                    view.UI_Anim_Warning.play(0, true, "Warning");
                    //3秒后停止
                    TimeManager.getInst().once(3, cbhandler.gen_handler(() => {
                        view.UI_Anim_Warning.stop();
                        view.UI_Img_Warning.alpha = 0;
                        view.UI_Img_Warning.visible = false;
                    }, this));
                    break;
                }
            }
        }

        private RefreshBattleInfo() {
            //UI完全打开后
            let view = this.GetView();
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
        }

        private SetCurLevel() {
            let view = this.GetView();
            //清除旧数据
            this.DeleteLevel();
            //当前
            let cur = new ui.PrefabUI.LevelItemPrefabUI();
            cur.UI_Img_CurLevel.visible = true;
            cur.UI_Img_OtherLevel.visible = false;
            cur.UI_Txt_Level.text = GameDataManager.getInstance().LevelInfo.CurLevelID.toString();
            view.UI_Box_Level.addChild(cur);
            cur.centerY = 0;
            cur.x = this.LevelPos_Cur;
            this.levelArray.push(cur);
            //下一关
            let next = new ui.PrefabUI.LevelItemPrefabUI();
            next.UI_Img_CurLevel.visible = false;
            next.UI_Img_OtherLevel.visible = true;
            next.UI_Txt_Level.text = (GameDataManager.getInstance().LevelInfo.CurLevelID + 1).toString();
            view.UI_Box_Level.addChild(next);
            next.centerY = 0;
            next.x = this.LevelPos_Next;
            this.levelArray.push(next);
            if (GameDataManager.getInstance().LevelInfo.CurLevelID != 1) {
                //第1关没有上一关
                let prev = new ui.PrefabUI.LevelItemPrefabUI();
                prev.UI_Img_CurLevel.visible = false;
                prev.UI_Img_OtherLevel.visible = true;
                prev.UI_Txt_Level.text = (GameDataManager.getInstance().LevelInfo.CurLevelID - 1).toString();
                view.UI_Box_Level.addChild(prev);
                prev.centerY = 0;
                prev.x = this.LevelPos_Prev;
                this.levelArray.push(prev);
            }
        }

        private DeleteLevel() {
            for (let i = 0; i < this.levelArray.length; i++) {
                let element = this.levelArray[i];
                element.removeSelf();
                element.destroy(true);
            }
            this.levelArray = new Array<ui.PrefabUI.LevelItemPrefabUI>();
        }

        /**
         * 设置进度条
         * @param ratio 0~1
         */
        private SetProgress(ratio: number) {
            let view = this.GetView();
            view.UI_Img_Progress.width = this.ProgressWidth_Min + (this.ProgressWidth_Max - this.ProgressWidth_Min) * ratio;
        }


        private SetPropVisible(prop: PlayerBuffInfo) {
            let view = this.GetView();
            //2019-6-13 10:00:05 新需求 道具倒计时效果

            //2.根据显示类型进行逻辑处理
            if (prop.Active) {
                //需要显示
                //可能目前已经显示，需要查找
                let propPrefab = this.propDic.get(prop.BuffType) as BattleProp;
                if (!propPrefab) {
                    //当前没有显示，需要创建
                    propPrefab = this.CreatePropPrefab(prop);
                    //保存引用
                    this.propDic.set(prop.BuffType, propPrefab);
                    //设置父子关系并放置在正确的位置上
                    view.UI_Box_Prop.addChild(propPrefab);
                    let childCount = view.UI_Box_Prop.numChildren;
                    propPrefab.x = this.PropImage_X;
                    propPrefab.y = (childCount - 1) * this.PropImage_Height;
                }
                //刷新倒计时
                propPrefab.RefreshPrefab(prop);
            } else {
                //需要隐藏
                //可能目前已经显示，需要查找
                let propPrefab = this.propDic.get(prop.BuffType) as BattleProp;
                if (!propPrefab) {
                    //没有找到，不做判断
                    Log.Debug("BattleUI 重复隐藏buff图片，不再处理：", prop.BuffType);
                    return;
                } else {
                    //正在显示，准备隐藏
                    //移除引用
                    this.propDic.remove(prop.BuffType);
                    propPrefab.removeSelf();
                    this.DeletePropImage(propPrefab);
                    //刷新其他
                    this.RefreshPropBoxChild();
                }
            }
        }

        //刷新其他内容
        private RefreshPropBoxChild() {
            let view = this.GetView();
            //防止动画播放过程中出现问题，提前停止Prop动画
            this.StopAllPropTween();
            for (var i = 0; i < view.UI_Box_Prop.numChildren; i++) {
                //将自己通过动画平滑移动到目标位置上
                let task = Tween2DUtil.to({
                    node: view.UI_Box_Prop.getChildAt(i) as Laya.Image,
                    duration: 0.3,
                    x: this.PropImage_X,
                    y: i * this.PropImage_Height,
                    onComplete: cbhandler.gen_handler(() => {
                        //动画播放完成后移除
                        this.propTweenTaskList.splice(this.propTweenTaskList.indexOf(task), 1);
                    })
                })

                this.propTweenTaskList.push(task)
            }

        }

        private DeleteAllProp() {
            for (var i = 0; i < this.propDic.keys.length; i++) {
                let key = this.propDic.keys[i];
                var prefab = this.propDic.get(key) as BattleProp;
                // prefab.removeSelf();
                this.DeletePropImage(prefab);
            }
            this.propDic = new Laya.Dictionary();
        }

        //停止所有Prop动画
        private StopAllPropTween() {
            for (var i = 0; i < this.propTweenTaskList.length; i++) {
                Tween2DUtil.kill(this.propTweenTaskList[i]);
            }
            this.propTweenTaskList = new Array<number>();
        }



        //创建buff图标
        private CreatePropPrefab(prop: PlayerBuffInfo): BattleProp {
            let prefab = this.propArray.pop();
            if (!prefab) {
                prefab = new BattleProp();
            }
            prefab.RefreshPrefab(prop);
            prefab.visible = true;

            return prefab;
        }

        //删除buff图标
        private DeletePropImage(prefab: BattleProp) {
            //进入池
            prefab.visible = false;
            prefab.HidePrefab();
            this.propArray.push(prefab);
        }

        //计算金币图标的全局坐标值
        private CalGlobalCoinPos(): Vec2 {
            let view = this.GetView();
            //因为有resize，因此需要动态计算金币图片的坐标位置
            //1.x
            let x = (Laya.stage.width - view.UI_Box_MatchInfo.width) / 2 + view.UI_Box_MatchInfo.centerX + view.UI_Img_Coin.x //+ view.UI_Img_Coin.width / 2;
            //2.y
            let y = view.UI_Box_MatchInfo.top + view.UI_Img_Coin.y //+ view.UI_Img_Coin.height / 2;

            return new Vec2(x, y);
        }
    }
}