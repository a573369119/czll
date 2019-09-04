//主域与子域内均需要有相同的定义文件
//开放域key值字段定义
class OpenDataContextKeyDefine {
    //当前完成的关卡
    public static CURRENT_COMPLETE_LEVEL: string = "CURRENT_COMPLETE_LEVEL";
    public static PLAYER_OPENID: string = "PLAYER_OPENID";
    public static PHONE_STAT: string = "PHONE_STAT";
}

//开放域cmd字段定义
class OpenDataContextCmdDefine {
    //游戏启动时设置OpenID
    public static OPENID: string = "OPENID";

    public static BATTLEUI_OPEN: string = "BATTLEUI_OPEN";
    public static BATTLEUI_CLOSE: string = "BATTLEUI_CLOSE";
    public static RESULTUI_OPEN: string = "RESULTUI_OPEN";
    public static RESULTUI_CLOSE: string = "RESULTUI_CLOSE";
    public static LEADERBOARDUI_OPEN: string = "LEADERBOARDUI_OPEN";
    public static LEADERBOARDUI_CLOSE: string = "LEADERBOARDUI_CLOSE";
    public static LEADERBOARDUI_DRAG: string = "LEADERBOARDUI_DRAG";
}