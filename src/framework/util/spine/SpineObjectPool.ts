/*
* spine对象池
*/
class SpineObjectPool {
    templet: Laya.Templet;
    protected m_Unusedskeletons: Array<Laya.Skeleton>; //未使用
    protected m_Usedskeletons: Array<Laya.Skeleton>;   //正在使用
    private animMode: number;
    /**
     * 初始化spine动画池
     * @param url spine地址
     * @param size 池大小
     * @param onSuccess 胜利回调  onSuccess(url, sucessArgs?[])
     * @param onFail 失败回调 onFail(errorMsg, failArgs?[]);
     * @param sucessArgs?: any[], 胜利回调带的参数
     * @param aniMode 动画模式，0:不支持换装,1,2支持换装
     */
    public Init(url: string, size: number, onSuccess: Function, onFail: Function, sucessArgs?: any[], failArgs?: any[], aniMode: number = 0) {
        this.m_Unusedskeletons = new Array<Laya.Skeleton>();
        this.m_Usedskeletons = new Array<Laya.Skeleton>();
        this.animMode = aniMode;

        this.templet = new Laya.Templet();
        let args1: any[] = [url, size, onSuccess]; args1.push(sucessArgs);
        let args2: any[] = [url, onFail]; args2.push(failArgs);
        this.templet.on(Laya.Event.COMPLETE, this, this.loadSuccess, args1);
        this.templet.on(Laya.Event.ERROR, this, this.loadError, args2);
        Log.Debug("load spine " + url)
        this.templet.loadAni(url);
    }
    //加载失败
    private loadError(url: string, onFail: Function, failArgs: any[], errorMsg: any) {
        Log.Error("加载spine失败%s", url)
        onFail(url, errorMsg, failArgs);
    }
    //加载成功
    private loadSuccess(url: string, size: number, onSuccess: Function, sucessArgs: any[], templet: Laya.Templet) {
        Log.Debug("on spine loaded " + url)
        for (let index = 0; index < size; index++) {
            let skeleton0 = this.templet.buildArmature(this.animMode);//从动画模板创建动画播放对象
            this.m_Unusedskeletons.push(skeleton0);
        }
        onSuccess(url, sucessArgs)
    }

    /**
     * 获取spine
     */
    public Spawn(): Laya.Skeleton {
        let obj = null;
        if (this.m_Unusedskeletons.length > 0) {
            obj = this.m_Unusedskeletons.pop();
        } else {
            obj = this.templet.buildArmature(this.animMode)
        }
        this.m_Usedskeletons.push(obj)
        return obj;
    }


    /**
     * 回收池对象
     * @param obj 对象实例
     */
    public Recycle(obj: Laya.Skeleton) {
        // obj.OnRecycle();
        obj.stop();
        obj.removeSelf();//从父节点删除
        let indexInUnused = this.m_Unusedskeletons.indexOf(obj);
        if (indexInUnused >= 0) {
            Log.Error("重复回收已经同一个Spine")
        } else {
            this.m_Unusedskeletons.push(obj)
        }
        let index = this.m_Usedskeletons.indexOf(obj)
        if (index >= 0) this.m_Usedskeletons.splice(index, 1)
    }

    /**
     * 销毁池
     */
    public Destory() {
        //销毁未使用的
        for (let index = 0; index < this.m_Unusedskeletons.length; index++) {
            let obj = this.m_Unusedskeletons[index];
            obj.destroy(true)
        }
        this.m_Unusedskeletons = null;

        //销毁已经使用的
        for (let index = 0; index < this.m_Usedskeletons.length; index++) {
            let obj = this.m_Usedskeletons[index];
            obj.stop();
            obj.removeSelf();
            obj.destroy(true)
        }
        this.m_Usedskeletons = null;

        //销毁动画模板
        this.templet.destroy();
        this.templet = null;
    }

    public pause(isPause) {
        for (let i = 0; i < this.m_Usedskeletons.length; i++) {
            let sk = this.m_Usedskeletons[i];
            if (isPause) {
                sk.paused();
            } else {
                sk.play(0, true);
            }
        }
    }


}