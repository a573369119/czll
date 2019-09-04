/*
* name;
*/
import Skeleton = Laya.Skeleton;
import Templet = Laya.Templet;
import EventLaya = Laya.Event;
enum EnumEffectRePlayMode {
    MultiPlay = 1,//可同时播放
    ReplayPrevious = 2, //replay原来的
    NotPlay = 3,//不播放新的
}

class EffectComponent2D extends ComponentBase2D {

    private nameOrIndex: any;
    private effectZorder: number = 10;

    private playingFxDic: Laya.Dictionary;// 存储正在播放的特效<fxSpineConfigID,  List<Laya.Skeleton>>
    private playingTimerIds: number[];//计时中的特效播放
    private playingTimerCallbacks: Function[];//计时中的特效播放结束回调

    onAdd(): void {
        this.playingFxDic = new Laya.Dictionary();
        this.playingTimerIds = []
        this.playingTimerCallbacks = [];
    }
    onReomove(): void {
        this.player = null;

        //停止计时
        for (let index = 0; index < this.playingTimerIds.length; index++) {
            let timerId = this.playingTimerIds[index];
            TimeManager.getInst().remove(timerId)
        }
        this.playingTimerIds = null;
        this.playingTimerCallbacks = null;

        //回收正在播放的特效
        let keys = this.playingFxDic.keys;
        for (let index = 0; index < keys.length; index++) {
            let spineConfigID = keys[index];
            let skeletons = this.playingFxDic.get(spineConfigID);
            for (let index = 0; index < skeletons.length; index++) {
                let skeleton = skeletons[index] as Laya.Skeleton;
                skeleton.stop();
                MatchSpineManager.Instance.Recycle(spineConfigID, skeleton);
            }
        }
        this.playingFxDic = null;
    }

    //播放特效
    public showEffect(animationName: any, fxConfigId: EnumSpineConfigID, parent?: Laya.Sprite, pos?: Vec2, callback?: Function, scale?: Vec2): Laya.Skeleton {
        this.nameOrIndex = animationName;


        let list = this.playingFxDic.get(fxConfigId) as Laya.Skeleton[];
        let fxConfig = ConfigManager.GetInstance().GetSpineConfig(fxConfigId);

        //添加重复播放的处理, //gameModify3
        if (list && list.length > 0) {
            //正在播放
            if (fxConfig.ReplayMode == EnumEffectRePlayMode.ReplayPrevious) {
                // this.playEffectHandler(list[0], this.nameOrIndex, fxConfig.Loop);
                this.completeHandler(list[0], fxConfig.Loop, parent, pos, scale)
                return list[0];
            } else if (fxConfig.ReplayMode == EnumEffectRePlayMode.NotPlay) {
                Log.Warn("不重复播放特效 fxID: %i", fxConfig.GetID())
                return null;
            } else if (fxConfig.ReplayMode == EnumEffectRePlayMode.MultiPlay) {

            } else {
                Log.Error("fxID: %i 配置的重播模式不存在 %i", fxConfig.GetID(), fxConfig.ReplayMode)
                return null;
            }
        }


        let fxSkeleton = MatchSpineManager.Instance.Spawn(fxConfigId)
        if (fxSkeleton) {
            //1. 记录加载的spine

            if (!list) { list = []; this.playingFxDic.set(fxConfigId, list); }
            list.push(fxSkeleton);



            if (!fxConfig.Loop) {
                //2. 如不是循环, 计时进行回收
                if (fxConfig.Duration <= 0) Log.Error("非循环播放的特效配置时长不对 %i, 时长%i", fxConfigId, fxConfig.Duration)
                let timerId = TimeManager.getInst().once(fxConfig.Duration, cbhandler.gen_handler(this.endNonLoopFx.bind(this), this, fxConfigId, fxSkeleton))
                this.playingTimerIds.push(timerId)
                this.playingTimerCallbacks.push(callback ? callback : null)
            }

            //3. 播放特效
            this.completeHandler(fxSkeleton, fxConfig.Loop, parent, pos, scale)
            fxSkeleton.pivot(fxConfig.SpinePivot[0], fxConfig.SpinePivot[1]);
            return fxSkeleton;
        } else {
            Log.Error("spine对象池没有初始化, 无法播放特效id:%i", fxConfigId)
            return null;
        }
    }

    //回收播放的特效
    public RemoveEffect(fxSkeleton: Laya.Skeleton, fxSpineConfigId: EnumSpineConfigID) {
        //删除skeleton记录
        let list = this.playingFxDic.get(fxSpineConfigId) as Array<Laya.Skeleton>;
        if (list) {
            let index = list.indexOf(fxSkeleton)
            if (index >= 0) list.splice(index, 1); else Log.Error("回收的特效没有在播放list中, configID:%i", fxSpineConfigId);
            if (list.length == 0) this.playingFxDic.remove(fxSpineConfigId)
        }
        //回收
        MatchSpineManager.Instance.Recycle(fxSpineConfigId, fxSkeleton)
    }

    /**
     * 默认添加到player的父节点下
     * @param effectSkeleton 
     * @param loop 
     */
    private completeHandler(effectSkeleton: Laya.Skeleton, loop: boolean, parent?: Laya.Node, pos?: Vec2, scale?: Vec2): void {
        if (!parent) parent = this.player.comParent.parent;
        if (effectSkeleton.parent != parent) {
            parent.addChild(effectSkeleton);
        }
        effectSkeleton.zOrder = this.effectZorder;
        //默认的话就是放到角色形象的中心点
        let posX = pos ? pos.x : this.player.comParent.x;
        let posY = pos ? pos.y : this.player.comParent.y;
        this.setEffectPos(posX, posY, effectSkeleton);
        this.setEffectScale(scale ? scale.x : 1, scale ? scale.y : 1, effectSkeleton)
        this.playEffectHandler(effectSkeleton, this.nameOrIndex, loop);
        //this.playEffectHandler("34_02");
    }

    //特效播放结束, 回收特效
    private endNonLoopFx(spineConfigID: number, fxSkeleton: Laya.Skeleton, timerId: number) {
        let callback = null;
        //删除计时
        let indexInTimer = this.playingTimerIds.indexOf(timerId);
        if (indexInTimer >= 0) {
            this.playingTimerIds.splice(indexInTimer, 1);
            callback = this.playingTimerCallbacks[indexInTimer]
            this.playingTimerCallbacks.splice(indexInTimer, 1)
        }
        this.RemoveEffect(fxSkeleton, spineConfigID)
        if (callback) callback();//执行回调
        // //删除skeleton记录
        // let list = this.playingFxDic.get(spineConfigID) as Array<Laya.Skeleton>;
        // if (list) {
        //     list.splice(list.indexOf(fxSkeleton, 1));
        //     if (list.length == 0) this.playingFxDic.remove(spineConfigID)
        // }
        // //回收
        // MatchSpineManager.Instance.Recycle(spineConfigID, fxSkeleton)
    }

    //子类扩展
    protected playEffectHandler(effectSkeleton: Laya.Skeleton, nameOrIndex: any, loop: boolean, force: boolean = true, start: number = 0): void {
        effectSkeleton.play(nameOrIndex, loop, force, start);
    }


    public setEffectPos(x?: number, y?: number, effectSkeleton?: Laya.Skeleton): void {
        if (!effectSkeleton) effectSkeleton = this.playingFxDic.values[0] //默认使用当前第一个播放的特效
        effectSkeleton.y = y;
        effectSkeleton.x = x;
    }

    public setEffectRotation(rotation: number, effectSkeleton?: Laya.Skeleton): void {
        if (!effectSkeleton) effectSkeleton = this.playingFxDic.values[0] //默认使用当前第一个播放的特效
        effectSkeleton.rotation = rotation;
    }

    public setEffectScale(scaleX: number, scaleY: number, effectSkeleton?: Laya.Skeleton): void {
        if (!effectSkeleton) effectSkeleton = this.playingFxDic.values[0] //默认使用当前第一个播放的特效
        effectSkeleton.scale(scaleX, scaleY);
    }




}