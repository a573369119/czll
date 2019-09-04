/*
* name;
*/
class TimeWatch{
    private static startedTime = 0
    public static Start(){
        this.startedTime = new Date().getTime();

    }

    public static Stop(msg?:string){
        let endTime = new Date().getTime();
        Log.Debug("================================================================")
        if(msg)Log.Debug(msg)
        Log.Debug("elapsed:" + (endTime - this.startedTime)/1000)
        Log.Debug("================================================================")
    }

}