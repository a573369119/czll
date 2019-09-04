/*
* name;
*/
var HttpManager = (function () {
    function HttpManager() {
        this.Content_Type = "Content-Type";
    }
    HttpManager.getIntance = function () {
        if (HttpManager._instanc == null) {
            HttpManager._instanc = new HttpManager();
        }
        return HttpManager._instanc;
    };
    HttpManager.prototype.Get = function (url, type, onComplete, onFail) {
        var xhr = new Laya.HttpRequest();
        xhr.http.timeout = 10000; //设置超时时间；
        if (onComplete)
            xhr.once(Laya.Event.COMPLETE, null, onComplete);
        if (onFail)
            xhr.once(Laya.Event.ERROR, null, onFail);
        //xhr.on(Laya.Event.PROGRESS, this, this.processHandler);     
        xhr.send(url, "", "get", type); //"text"
    };
    HttpManager.prototype.GetJson = function (url, onComplete, onFail) {
        this.Get(url, "json", onComplete, onFail);
    };
    HttpManager.prototype.Post = function (url, data, contentType, responseType, onComplete, onFail) {
        var xhr = new Laya.HttpRequest();
        xhr.http.timeout = 10000; //设置超时时间；
        if (onComplete)
            xhr.once(Laya.Event.COMPLETE, null, onComplete);
        if (onFail)
            xhr.once(Laya.Event.ERROR, null, onFail);
        xhr.send(url, data, "post", responseType, [this.Content_Type, contentType]); //response type: "text"
    };
    HttpManager.prototype.PostJson = function (url, jsonObject, onComplete, onFail) {
        this.Post(url, JSON.stringify(jsonObject), "application/json;charset=UTF-8", 'json', onComplete, onFail);
    };
    HttpManager.prototype.PostByte = function (url, byteArray, onComplete, onFail) {
        this.Post(url, byteArray, "application/octet-stream;charset=UTF-8", 'arraybuffer', onComplete, onFail);
    };
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
    HttpManager.prototype.PathJson = function (url, jsonObject, onComplete, onFail) {
        // this.Patch(url, JSON.stringify(jsonObject), "application/x-www-form-urlencoded", 'json', onComplete, onFail)
        this.Patch(url, JSON.stringify(jsonObject), "application/json;charset=UTF-8", 'json', onComplete, onFail);
    };
    HttpManager.prototype.Patch = function (url, data, contentType, responseType, onComplete, onFail) {
        var xhr = new Laya.HttpRequest();
        xhr.http.timeout = 10000; //设置超时时间；
        if (onComplete)
            xhr.once(Laya.Event.COMPLETE, null, onComplete);
        if (onFail)
            xhr.once(Laya.Event.ERROR, null, onFail);
        xhr.send(url, data, "patch", responseType, [this.Content_Type, contentType]); //response type: "text"
    };
    return HttpManager;
}());
//# sourceMappingURL=HttpManager.js.map