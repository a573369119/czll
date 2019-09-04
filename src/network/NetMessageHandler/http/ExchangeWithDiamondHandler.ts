class ExchangeWithDiamondHandler extends BaseMsgHandler {
    public BaseMsgHandler(data: Uint8Array) {
        let message: com.msg.s_ExchangeWithDiamond_2001 = com.msg.s_ExchangeWithDiamond_2001.decode(data)

        Log.Debug("获取信息 s_ExchangeWithDiamond_2001:%o", message);

        //兑换结果
        if (message.result == 1) {
            //兑换成功
            GameDataManager.getInstance().LoginPlayerInfo.MoneyInfo = message.moneyInfo;
            //通知刷新
            Facade.instance.sendNotification(NotificationNames.UI_RefreshMoneyInfo);
            //通知兑换成功
            Facade.instance.sendNotification(NotificationNames.ExchangeUI_ExchangeResult);
        } else {
            //兑换失败

        }
    }
}
