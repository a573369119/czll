/*
* 主界面
*/
class LoginSceneEnterCommand extends puremvc.SimpleCommand {
    public static BeenEntered = false;//是否登过一次
    public static InScene = false;
    execute(notification: puremvc.Notification) {
        let param = notification.getBody();

        Log.Debug("COMMAND: enter login scene")
        LoginSceneEnterCommand.InScene = true;

        //每日检查
        this.DailyCheck();

        //初始化该场景的视图控制器
        this.initSceneMeditar();

        //图集没有提前加载的ui, 在open之后不会离开打开, 后续逻辑需要在回调中执行,否则会被忽略
        this.sendNotification(NotificationNames.OPENUIWITHPARAM, new ui.UIParamStruct(ui.UIID.BackgroundUIID, () => {
            //此处通知更换背景
            this.sendNotification(NotificationNames.BackgroundUI_ChangeBackground);
            //然后再打开主页
            this.sendNotification(NotificationNames.OPENUIWITHPARAM, new ui.UIParamStruct(ui.UIID.HomePageUIID, () => {
                //主页第一次打开，逐渐显示
                this.sendNotification(NotificationNames.HomePageUI_SetInteractive);
                //当主页面打开的时候，同时打开钱币信息页面
                this.sendNotification(NotificationNames.OPENUI, ui.UIID.MoneyInfoUIID)
                this.sendNotification(NotificationNames.OPENUI, ui.UIID.LevelUIID);
            }));
        }));

        if (!LoginSceneEnterCommand.BeenEntered) {
            LoginSceneEnterCommand.BeenEntered = true;
            this.firstLoginCheck();
        }

        //进入场景前要预加载对应的战斗资源等
        // let levelID = 1;
        // this.sendNotification(NotificationNames.MATCH_ENTER_COMMAND, levelID)
        Facade.getInstance().sendNotification(NotificationNames.HIDEUI, ui.UIID.LoadingUIID)//关闭loading
    }

    //TODO 基类方法
    initSceneMeditar() {
        //创建主角
        this.facade.registerMediator(new MainPlayerMediator(MediatorNames.MAIN_PLAYER_MEDIATOR));
        this.facade.registerMediator(new MonsterMediator(MediatorNames.MONSTER_MEDIATOR));

    }


    //第一次登录检测:是否通过点击他人连接进入....
    private firstLoginCheck() {
        //测试模式
        //使用URL传入?openId=xxx&key2=value2
        if (ConstDefine.URL_MODE_FOR_TEST) {
            let Request = CommonUtil.GetRequest();
            let urlInviterId = Request[ConstDefine.URL_MODE_KEY_Inviter_OpenId];
            if (urlInviterId) {
                Log.Debug("LoginSceneEnterCommand 测试，URL传入他人OpenID:", urlInviterId)

                HttpMessageSender.GetSender().SendInvitedByFriend(GameDataManager.getInstance().LoginPlayerInfo.OpenID, urlInviterId);
                return;
            }
        }
        if (GameDataManager.ShareQueryData.LoginQuery) {
            //如果是，发送统计
            Log.Debug("LoginSceneEnterCommand 点击他人链接进入！")
            HttpMessageSender.GetSender().SendInvitedByFriend(GameDataManager.getInstance().LoginPlayerInfo.OpenID, GameDataManager.ShareQueryData.LoginQuery);
        }

    }


    //所有的每日更新相关逻辑可以放在此处进行处理，例如每天的过关10倍奖励领取数量重置
    private DailyCheck() {
        let now = new Date();
        //过关10倍奖励
        let lastResultLuckyDate = StorageManager.GetLastResultLuckyDate();
        if (!GameDataUtil.IsSameDate(lastResultLuckyDate, now)) {
            //不是同一天，更新奖励次数
            StorageManager.SetResultLuckyNum(ConstDefine.MaxValue_ResultLucky);
        }
        //复活10次
        // let lastRebornDate = StorageManager.GetLastRebornDate();
        // if (!GameDataUtil.IsSameDate(lastRebornDate, now)) {
        //     //不是同一天，更新复活次数
        //     StorageManager.SetRebornNum(ConstDefine.MaxValue_Reborn);
        // }
    }



}