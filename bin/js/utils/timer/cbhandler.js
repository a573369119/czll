var handler_pool = [];
var handler_pool_size = 10;
//用于绑定回调函数this指针
var cbhandler = (function () {
    function cbhandler() {
    }
    cbhandler.prototype.init = function (cb, host) {
        if (host === void 0) { host = null; }
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        this.cb = cb;
        this.host = host;
        this.args = args;
        this.times = 0;
        this.is_persist = false;
    };
    cbhandler.prototype.exec = function () {
        var extras = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            extras[_i] = arguments[_i];
        }
        //持久的handler, exec可能会执行多次，每次执行前要清理一下旧参数
        // if (this.is_persist && this.times > 0) {
        //     this.args = [];
        //     Log.Debug("handler exec", this.times, "times, clear prev args");
        // }
        //不能使用this.args = . 否则每次给args添加的参数都会累加
        //比如update()中 ...extras是dt值, 但是dt每次都赋值, 导致
        var args = this.args.concat(extras);
        this.cb.apply(this.host, args);
        this.times++;
        //临时的用完回收
        if (!this.is_persist) {
            this.release();
        }
    };
    cbhandler.prototype.retain = function () {
        this.is_persist = true;
    };
    cbhandler.prototype.release = function () {
        // this.cb = null;
        // this.host = null;
        // this.args = null;
        // this.times = null;
        // this.is_persist = false;
        // if(handler_pool.length < handler_pool_size)
        // {
        //     handler_pool.push(this);
        // }
    };
    cbhandler.gen_handler = function (cb, host) {
        if (host === void 0) { host = null; }
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        var single_handler = new cbhandler(); //handler_pool.length < 0 ? handler_pool.pop() : new handler()
        //这里要展开args, 否则会将args当数组传给wrapper, 导致其args参数变成2维数组[[]]
        single_handler.init.apply(//handler_pool.length < 0 ? handler_pool.pop() : new handler()
        single_handler, [cb, host].concat(args));
        return single_handler;
    };
    return cbhandler;
}());
// /**注意区分一次性和持久的handler */
// export function gen_handler(cb:Function, host:any = null, ...args:any[]):handler
// {
//     let single_handler:handler = handler_pool.length < 0 ? handler_pool.pop(): new handler()
//     //这里要展开args, 否则会将args当数组传给wrapper, 导致其args参数变成2维数组[[]]
//     single_handler.init(cb, host, ...args);
//     return single_handler;
// }
//# sourceMappingURL=cbhandler.js.map