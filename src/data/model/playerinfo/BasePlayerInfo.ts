/*
* name;
*/
class BasePlayerInfo implements IGameDta {
    protected playerID: string;

    public GetPlayerID(): string {
        return this.playerID;
    }

    public Init(playerInfo: com.msg.playerInfo) {
        this.playerID = playerInfo.openId;
    }


    public OnInit() {

    }

    public OnEnter() {

    }

    public OnExit() {

    }

}