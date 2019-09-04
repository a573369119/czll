/*
* name;
*/
class MainPlayerMediator extends BasePlayerMediator {
    listNotificationInterests() {
        super.listNotificationInterests();
        return [
            NotificationNames.CREATER_MAIN_PLAYER,
            NotificationNames.ON_SIDE_WEAPON_CHANGED,
            NotificationNames.MAIN_PLAYER_DIE,
            NotificationNames.MAIN_PLAYER_REBORN,
            NotificationNames.MATCH_START,
            NotificationNames.MATCH_COMPLETE,

        ];
    }

    handleNotification(notification: puremvc.INotification) {
        super.handleNotification(notification);
        switch (notification.getName()) {

            case NotificationNames.CREATER_MAIN_PLAYER:
                {
                    this.createrMainPlayer();
                    break;
                }

            case NotificationNames.ON_SIDE_WEAPON_CHANGED:
                {
                    // let url = ConfigManager.GetInstance().GetWeaponConfig(GameDataManager.getInstance().LoginPlayerInfo.CurSideWeaponID).weaponSkin
                    PlayerManager.GetInstance().MainPlayer.ChangeView(GameDataManager.getInstance().LoginPlayerInfo.CurSideWeaponID);
                    break;
                }
            case NotificationNames.MATCH_START:
                {
                    //比赛开始
                    PlayerManager.GetInstance().MainPlayer.OnMatchStart();
                    break;
                }
            case NotificationNames.MAIN_PLAYER_DIE:
                {
                    if (GameDataManager.getInstance().MatchInfo.IsGameEnd()) {
                        Log.Warn("比赛已经结束, 但重复判定死亡")
                        return;
                    } else {
                        PlayerManager.GetInstance().MainPlayer.Die();
                        //暂停怪物, 主机, 子弹,  道具, 技能 移动
                        this.sendNotification(NotificationNames.PAUSE_MATCH, true)

                        //玩家失败
                        //2019-6-10 17:21:33 新需求 判断今天还能重生多少次
                        //2019-7-26 18:48:59 新需求 每个关卡只能主动重生1次
                        let rebornNum = StorageManager.GetRebornNum();
                        //2019-8-22 18:48:59 新需求 可以一直复活
                        rebornNum = 1;
                        //2019-6-25 14:40:21 新需求 分享总开
                        // console.log(rebornNum + "    -     " + GameDataManager.getInstance().ShareEnable);
                        // let needDia = ConfigManager.GetInstance().GetOtherConfig(1).Value.split(",")[GameDataManager.getInstance().useDiamBornTime];
                        // if (!needDia) needDia = ConfigManager.GetInstance().GetOtherConfig(1).Value.split(",")[--GameDataManager.getInstance().useDiamBornTime];//如果没有就减去次数
                        // GameDataManager.getInstance().canLookAdv = false;
                        // if ((parseInt(needDia) <= GameDataManager.getInstance().LoginPlayerInfo.MoneyInfo.diamondNum || GameDataManager.getInstance().canLookAdv) && GameDataManager.getInstance().ShareEnable) {
                        if (GameDataManager.getInstance().ShareEnable) {
                            this.sendNotification(NotificationNames.OPENUI, ui.UIID.RebornUIID);
                        } else {
                            //不能重生，直接死亡
                            //打开结算界面
                            this.sendNotification(NotificationNames.MAIN_PLAYER_REBORN, false);
                        }

                        // Facade.instance.sendNotification(NotificationNames.MATCH_COMPLETE, false)
                    }
                    break;
                }
            case NotificationNames.MAIN_PLAYER_REBORN:
                {
                    let reborn = notification.getBody();
                    //恢复移动.
                    this.sendNotification(NotificationNames.PAUSE_MATCH, false)
                    if (reborn) {
                        //复活面板打开 点击UI后复活. 否则 播放爆炸后打开UI面包,
                        PlayerManager.GetInstance().MainPlayer.Reborn();
                        Facade.instance.sendNotification(NotificationNames.MATCH_RESUME)
                    } else {
                        //没选择重生
                        //玩家爆炸
                        PlayerManager.GetInstance().MainPlayer.Explode();
                        Facade.instance.sendNotification(NotificationNames.MATCH_COMPLETE, false)
                        this.sendNotification(NotificationNames.OPENUIWITHPARAM, new ui.ResultUIParam(false));
                        //2019-6-10 17:33:59 播放动画与震屏，以及手机震动
                        this.sendNotification(NotificationNames.BackgroundUI_Shake);
                        if (CommonUtil.OnMiniGame()) {
                            WechatUtil.getIntance().Vibrate();
                        }
                    }
                    break;
                }
            case NotificationNames.MATCH_COMPLETE:
                {
                    //比赛胜负已定
                    let win = notification.getBody();
                    PlayerManager.GetInstance().MainPlayer.OnMatchComplete();
                    break;
                }


        }
    }

    createrMainPlayer() {
        var mianPlayer: MainPlayer = new MainPlayer(ConstDefine.MAIN_PLAYRE_CONFIG_ID);
        mianPlayer.initComponent();

    }
}