/*
* name;
*/
class HttpManager {
    private Content_Type: string = "Content-Type"
    private static _instanc: HttpManager;

    public static getIntance(): HttpManager {
        if (HttpManager._instanc == null) {
            HttpManager._instanc = new HttpManager();
        }
        return HttpManager._instanc;
    }

    public Get(url: string, type: string, onComplete?: Function, onFail?: Function) {
        let xhr: Laya.HttpRequest = new Laya.HttpRequest();
        xhr.http.timeout = 10000;//设置超时时间；
        if (onComplete) xhr.once(Laya.Event.COMPLETE, null, onComplete);
        if (onFail) xhr.once(Laya.Event.ERROR, null, onFail);
        //xhr.on(Laya.Event.PROGRESS, this, this.processHandler);     
        xhr.send(url, "", "get", type);//"text"
    }

    public GetJson(url: string, onComplete?: Function, onFail?: Function) {
        this.Get(url, "json", onComplete, onFail)
    }

    public Post(url: string, data: any, contentType: string, responseType?: string, onComplete?: Function, onFail?: Function) {
        let xhr: Laya.HttpRequest = new Laya.HttpRequest();
        xhr.http.timeout = 10000;//设置超时时间；
        if (onComplete) xhr.once(Laya.Event.COMPLETE, null, onComplete);
        if (onFail) xhr.once(Laya.Event.ERROR, null, onFail);

        xhr.send(url, data, "post", responseType, [this.Content_Type, contentType]);//response type: "text"
    }

    public PostJson(url: string, jsonObject: any, onComplete?: Function, onFail?: Function) {
        this.Post(url, JSON.stringify(jsonObject), "application/json;charset=UTF-8", 'json', onComplete, onFail)
    }

    public PostByte(url: string, byteArray: any, onComplete?: Function, onFail?: Function) {
        this.Post(url, byteArray, "application/octet-stream;charset=UTF-8", 'arraybuffer', onComplete, onFail)
    }


    //Patch Example:
    //   HttpManager.getIntance().PostJson("http://bs5fuv.natappfree.cc/myUser/getUserinfo/",
    //         { "openid": 8 },
    //         (msg) => {
    //             Log.Debug("success return Msg json: %s ", msg.NickName)
    //             msg["NickName"] = "changed1123"
    //             Log.Debug("success return Msg modify: %s ", msg.NickName)
    //             //5是id
    //把msg的昵称修改,后返回给服务器
    //             HttpManager.getIntance().PathJson("http://bs5fuv.natappfree.cc/myUser/5/"
    //                 ,
    //                 { "NickName": "changed3" },  //只返回修改的栏位
    //                 (msg1) => {
    //                     Log.Debug("patch success %s", msg1.NickName)
    //                 },
    //                 (errMsg) => {

    //                     Log.Debug("patch fail" + errMsg)
    //                 })
    //         },

    //         (errMsg) => {
    //             Log.Debug("fail text" + errMsg)
    //         })
    //patch请求
    public PathJson(url: string, jsonObject: any, onComplete?: Function, onFail?: Function) {
        // this.Patch(url, JSON.stringify(jsonObject), "application/x-www-form-urlencoded", 'json', onComplete, onFail)
        this.Patch(url, JSON.stringify(jsonObject), "application/json;charset=UTF-8", 'json', onComplete, onFail)
    }

    public Patch(url: string, data: any, contentType: string, responseType?: string, onComplete?: Function, onFail?: Function) {
        let xhr: Laya.HttpRequest = new Laya.HttpRequest();
        xhr.http.timeout = 10000;//设置超时时间；
        if (onComplete) xhr.once(Laya.Event.COMPLETE, null, onComplete);
        if (onFail) xhr.once(Laya.Event.ERROR, null, onFail);

        xhr.send(url, data, "patch", responseType, [this.Content_Type, contentType]);//response type: "text"
    }
}