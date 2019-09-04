
/**
* Created By Code Generator
*/
module ui.uicontrollers {
    import Facade = puremvc.Facade;

    export class BackgroundUICtrl extends ui.BaseUICtrl {
        private bgSkinArray: Array<string>;
        private centerPos: Vec2;
        private shakeTask: number;
        /**
         * 是否震动 true为震
         */
        private isShake: boolean;

        constructor(view: View) {
            super(view);
        }

        public GetView(): ui.BackgroundUI {
            return this.uiView as ui.BackgroundUI;
        }
        /**
         * @override
         */
        public Init(parent: Laya.Sprite, id: ui.UIID) {
            super.Init(parent, id);
            this.mediatorName = ui.UIID.BackgroundUIID.toString();

            //ui配置
            //this.uiConfig = new WindowConfigData();
            //this.uiConfig.uiOpenAnimType = UIAnim.PopOpen;
            //this.uiConfig.uiCloseAnimType = UIAnim.PopClose;
            //this.uiConfig.depth = 0;
            //添加舞台
            parent.addChild(this.uiView)
            this.uiView.zOrder = this.uiConfig.depth;

            this.RegisterEvent();

            let view = this.GetView();
            this.isShake = StorageManager.GetVibrateSetting();
            //自适应
            this.GetView().on(Laya.Event.RESIZE, this, () => {
                this.GetView().width = Laya.stage.width;
                this.GetView().height = Laya.stage.height;
            });

            //背景图片自动拉伸 -mb
            view.UI_Img_Background.height = ConstDefine.screenHeigth;
            view.UI_Img_Background.width = view.UI_Img_Background.width * 1.2;
            view.UI_Img_Background2.height = ConstDefine.screenHeigth;
            view.UI_Img_Background2.width = view.UI_Img_Background2.width * 1.2;
            view.UI_Img_Background.pivotY = view.UI_Img_Background.height / 2;
            view.UI_Img_Background2.pivotY = view.UI_Img_Background2.height / 2;
            //背景图片位置
            view.UI_Img_Background.y = ConstDefine.screenHeigth / 2;
            view.UI_Img_Background2.y = view.UI_Img_Background.y - view.UI_Img_Background.height;



            this.bgSkinArray = new Array<string>();
            this.bgSkinArray.push("resources/background/main_bg_00.jpg");
            this.bgSkinArray.push("resources/background/main_bg_01.jpg");
            this.bgSkinArray.push("resources/background/main_bg_02.jpg");
            this.bgSkinArray.push("resources/background/main_bg_03.jpg");

            //记录中心位置，防止因振动偏移
            this.centerPos = new Vec2(this.GetView().shakBox.x, this.GetView().shakBox.y);
            this.shakeTask = -1;

            //绘制黑色遮罩，然后隐藏
            view.UI_Img_Black_Cover.visible = false;
            view.UI_Img_Black_Cover.graphics.drawRect(0, 0, view.UI_Img_Black_Cover.width, view.UI_Img_Black_Cover.height, "#000000");
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
                NotificationNames.BackgroundUI_ChangeBackground,
                NotificationNames.BackgroundUI_Shake,
                NotificationNames.HULK_COMING,
                NotificationNames.BackgroundUI_HomepageEnter,
                NotificationNames.BackgroundUI_BattleEnter,
                NotificationNames.BackgroundUI_BgMoveStart,
                NotificationNames.BackgroundUI_BgMoveEnd,
                NotificationNames.BackgroundUI_StopShakeBg,

            ];
        }

        /**
        * @override
        */
        handleNotification(note: puremvc.INotification): void {
            let view = this.GetView();
            switch (note.getName()) {
                case NotificationNames.BackgroundUI_StopShakeBg: {
                    this.isShake = note.getBody();
                    break;
                }
                case NotificationNames.BackgroundUI_ChangeBackground: {
                    //暂定： 从已有的四个背景图中随机选择一个
                    let skin: string = "https://czll.bingodac.com/static/background/main_bg_0" + (GameDataManager.getInstance().LoginPlayerInfo.CurLevel) % 3 + ".jpg";
                    //测试 -mb展示定循环 图片
                    view.UI_Img_Background2.skin = skin;
                    view.UI_Img_Background.skin = skin;
                    break;
                }
                case NotificationNames.BackgroundUI_Shake: {
                    //1 中止动画并复位
                    if (this.shakeTask != -1) {
                        ShakeManager.GetInstance().StopShake(this.shakeTask);
                        view.shakBox.pos(this.centerPos.x, this.centerPos.y);
                        // view.shakBox.centerX = this.centerPos.x;
                        // view.shakBox.centerY = this.centerPos.y;
                        // y方向上不用复位
                        this.shakeTask = -1;
                    }
                    //震屏
                    if (this.isShake) {
                        this.shakeTask = ShakeManager.GetInstance().ShakeSprite(view.shakBox, 20, cbhandler.gen_handler(() => {
                            this.shakeTask = -1;
                        }, this), 0.1);
                    }
                    break;
                }
                case NotificationNames.HULK_COMING: {
                    //巨型虫子入侵
                    //1秒黑屏
                    view.UI_Img_Black_Cover.visible = true;
                    TimeManager.getInst().once(1, cbhandler.gen_handler(() => {
                        view.UI_Img_Black_Cover.visible = false;
                    }, this))
                    break;
                }
                case NotificationNames.BackgroundUI_HomepageEnter: {
                    //进入主场景，放大
                    Tween2DUtil.getInst().to({
                        node: view.shakBox,
                        duration: 1,
                        scalex: 1.5,
                        scaley: 1.5,
                        onComplete: cbhandler.gen_handler(() => {
                        }, this)
                    })
                    break;
                }
                case NotificationNames.BackgroundUI_BattleEnter: {
                    //进入战斗，缩小
                    Tween2DUtil.getInst().to({
                        node: view.shakBox,
                        duration: 1,
                        scalex: 1,
                        scaley: 1,
                    })
                    break;
                }
                case NotificationNames.BackgroundUI_BgMoveStart: {
                    //地图滚动开始 -mb
                    this.backgroundUIMove(true);
                    break;
                }
                case NotificationNames.BackgroundUI_BgMoveEnd: {
                    //地图滚动结束 -mb
                    this.backgroundUIMove(false);
                    break;
                }

            }
        }
        /**
         * -mb
         * 地图移动
         * 开始 true;
         * 结束 false；
         */
        private backgroundUIMove(isStart: boolean) {
            if (isStart) {
                Laya.timer.loop(16, this, this.mapMove);
            }
            else {
                Laya.timer.clear(this, this.mapMove);
            }
        }

        /**
         * -mb
         * 地图移动逻辑
         */
        private mapMove() {
            let view = this.GetView();
            view.UI_Img_Background.y += ConstDefine.bgSpeed;
            view.UI_Img_Background2.y += ConstDefine.bgSpeed;
            if (view.UI_Img_Background.y >= view.UI_Img_Background.height / 2 + ConstDefine.screenHeigth) { view.UI_Img_Background.y = view.UI_Img_Background2.y - view.UI_Img_Background2.height; }
            if (view.UI_Img_Background2.y >= view.UI_Img_Background2.height / 2 + ConstDefine.screenHeigth) { view.UI_Img_Background2.y = view.UI_Img_Background.y - view.UI_Img_Background.height; }
        }
    }
}