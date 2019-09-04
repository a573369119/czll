class EquipSideWeaponHandler extends BaseMsgHandler {
    public BaseMsgHandler(data: Uint8Array) {
        let message: com.msg.s_EquipSideWeapon_2021 = com.msg.s_EquipSideWeapon_2021.decode(data)

        Log.Debug("获取信息 s_EquipSideWeapon_2021:%o", message);
        //更换副武器
        if (message.result == 1) {
            //更换成功
            //保存
            Log.Debug("角色切换武器:%s", EnumSideWeaponType[message.sideWeaponID])
            GameDataManager.getInstance().LoginPlayerInfo.CurSideWeaponID = message.sideWeaponID;
            //发送通知
            Facade.instance.sendNotification(NotificationNames.UpgradeUI_EquipSideWeapon);
            Facade.instance.sendNotification(NotificationNames.ON_SIDE_WEAPON_CHANGED);
        } else {
            //更换失败
            Log.Error("副武器更换失败");
        }
    }
}
