/*
* name;
*/
class BasePlayerMediator extends puremvc.Mediator {

    protected playerDic: Laya.Dictionary = new Laya.Dictionary();;

    constructor(name: string) {
        super();
        this.mediatorName = name;
    }

    onRegister() {

    }

    listNotificationInterests() {
        super.listNotificationInterests();
        return [

        ];
    }
    handleNotification(notification: puremvc.INotification) {
        super.handleNotification(notification);
        switch (notification.getName()) {

            //  case NotificationNames.CREATER_MAIN_PLAYER:
            //      {
            //          this.createPlayer();
            //          break;
            //      }
        }
    }

    // TODO 基础方法
    createPlayer() {
        console.log("createPlayer");
    }
}