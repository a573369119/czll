
/**
* Created By Code Generator
*/
module ui.uicontrollers {
    import Facade = puremvc.Facade;

    export class LevelUICtrl extends ui.BaseUICtrl {

        private readonly boxPos_Homepage_Top = 820;
        private readonly boxPos_Battle_Top = 90;
        private readonly boxPos_Result_Top = 1000;

        private readonly animTime_Homepage = 0.5;
        private readonly animTime_Battle = 0.5;
        private readonly animTime_Result = 0.5;

        private LevelTextArray: Array<Laya.Label>;
        //固定位置坐标
        private readonly lastTextPosX: number = 376;
        private readonly firstTextPosX: number = - 298;

        //动画时间
        private readonly animTime: number = 1;
        //动画任务
        private animTask: number;
        private levelTask: Array<number>;

        constructor(view: View) {
            super(view);
        }

        public GetView(): ui.LevelUI {
            return this.uiView as ui.LevelUI;
        }
        /**
         * @override
         */
        public Init(parent: Laya.Sprite, id: ui.UIID) {
            super.Init(parent, id);
            this.mediatorName = ui.UIID.LevelUIID.toString();

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
                this.GetView().UI_Box_Level.centerX = 0;
            });

            //动态创建文字元素，添加到数组中
            let view = this.GetView();
            this.LevelTextArray = new Array<Laya.Label>();
            for (var i = 0; i < 4; i++) {
                let label = new Laya.Label();
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
            this.levelTask = new Array<number>(-1, -1, -1, -1);
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
        }
        /**
         * @override
         */
        //ui关闭动画完成
        protected OnUIHide() {
            super.OnUIHide();
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

        }
        private RemoveEvent(): void {
            Facade.getInstance().removeMediator(this.getMediatorName());


        }

        /**
         * @override
         */
        listNotificationInterests(): string[] {
            return [
                NotificationNames.LevelUI_PlayAnim
            ];
        }

        /**
        * @override
        */
        handleNotification(note: puremvc.INotification): void {
            let view = this.GetView();
            switch (note.getName()) {
                case NotificationNames.LevelUI_PlayAnim: {
                    //根据传来的内容，决定关卡进度的显示方式
                    let data = note.getBody() as LevelUIAnimParam;
                    this.PlayAnim(data);
                    break;
                }
            }
        }

        //根据数据，显示当前的关卡进度
        private ShowCurLevel(curLevel: number) {
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
                } else if (curLevel + i - 1 >= 100 && curLevel + i - 1 < 1000) {
                    element.fontSize = 40;
                } else {
                    element.fontSize = 45;
                }
                this.SetLabelPos(element, i + 1);
            }
        }

        //播放动画
        private ShowAimLevel(curLevel: number) {
            //取消动画
            this.CancelLevelAnim();
            //显示旧的
            this.ShowCurLevel(curLevel);
            //四个label分别移动到目标位置，同时改变显隐
            let view = this.GetView();
            this.levelTask[0] = Tween2DUtil.getInst().to({
                node: this.LevelTextArray[0],
                duration: this.animTime,
                x: this.firstTextPosX,
                alpha: 0,
                onComplete: cbhandler.gen_handler(() => {
                    this.levelTask[0] = -1;
                }, this)
            })
            this.levelTask[1] = Tween2DUtil.getInst().to({
                node: this.LevelTextArray[1],
                duration: this.animTime,
                x: view.UI_Img_Prev.x,
                y: view.UI_Img_Prev.y,
                alpha: 1,
                onComplete: cbhandler.gen_handler(() => {
                    this.levelTask[1] = -1;
                }, this)
            })
            this.levelTask[2] = Tween2DUtil.getInst().to({
                node: this.LevelTextArray[2],
                duration: this.animTime,
                x: view.UI_Img_Cur.x,
                y: view.UI_Img_Cur.y,
                alpha: 1,
                onComplete: cbhandler.gen_handler(() => {
                    this.levelTask[2] = -1;
                }, this)
            })
            this.levelTask[3] = Tween2DUtil.getInst().to({
                node: this.LevelTextArray[3],
                duration: this.animTime,
                x: view.UI_Img_Next.x,
                y: view.UI_Img_Next.y,
                alpha: 1,
                onComplete: cbhandler.gen_handler(() => {
                    this.levelTask[3] = -1;
                }, this)
            })
        }

        //0 1 2 3 4
        private SetLabelPos(label: Laya.Label, posID: number) {
            let view = this.GetView();
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
        }

        private PlayAnim(data: LevelUIAnimParam) {
            let view = this.GetView();
            //取消旧动画
            this.CancelAnim();
            this.CancelLevelAnim();

            switch (data.LevelAnimType) {
                case EnumLevelUIAnimType.HomePage: {
                    //主页，直接显示
                    Log.Debug("LevelUI 主页")
                    view.visible = true;
                    this.animTask = Tween2DUtil.getInst().to({
                        node: view.UI_Box_Level,
                        duration: this.animTime_Homepage,
                        top: this.boxPos_Homepage_Top,
                        scalex: 1.2,
                        scaley: 1.2
                    })
                    this.ShowCurLevel(data.curLevel);
                    break;
                }
                case EnumLevelUIAnimType.Battle: {
                    //战斗面板，直接显示
                    Log.Debug("LevelUI 战斗")
                    view.visible = true;
                    Tween2DUtil.getInst().to({
                        node: view.UI_Box_Level,
                        duration: this.animTime_Battle,
                        top: this.boxPos_Battle_Top,
                        scalex: 1,
                        scaley: 1
                    })
                    this.ShowCurLevel(data.curLevel);
                    break;
                }
                case EnumLevelUIAnimType.Result_Win: {
                    //结算面板，胜利，切换到下一个
                    //2019-8-14 20:27:47 结算面板不再显示
                    Log.Debug("LevelUI 结算 胜利")
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
                    Log.Debug("LevelUI 结算 失败")
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
        }

        private CancelAnim() {
            if (this.animTask != -1) {
                Tween2DUtil.getInst().kill(this.animTask);
                this.animTask = -1;
            }
        }

        private CancelLevelAnim() {
            for (var i = 0; i < this.levelTask.length; i++) {
                if (this.levelTask[i] != -1) {
                    Tween2DUtil.getInst().kill(this.levelTask[i]);
                    this.levelTask[i] = -1;
                }
            }
        }

    }
}