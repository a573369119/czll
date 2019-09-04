var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*
* name;
*/
var Skeleton = Laya.Skeleton;
var Templet = Laya.Templet;
var EventLaya = Laya.Event;
var EnumEffectRePlayMode;
(function (EnumEffectRePlayMode) {
    EnumEffectRePlayMode[EnumEffectRePlayMode["MultiPlay"] = 1] = "MultiPlay";
    EnumEffectRePlayMode[EnumEffectRePlayMode["ReplayPrevious"] = 2] = "ReplayPrevious";
    EnumEffectRePlayMode[EnumEffectRePlayMode["NotPlay"] = 3] = "NotPlay";
})(EnumEffectRePlayMode || (EnumEffectRePlayMode = {}));
var EffectComponent2D = (function (_super) {
    __extends(EffectComponent2D, _super);
    function EffectComponent2D() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.effectZorder = 10;
        return _this;
    }
    EffectComponent2D.prototype.onAdd = function () {
        this.playingFxDic = new Laya.Dictionary();
        this.playingTimerIds = [];
        this.playingTimerCallbacks = [];
    };
    EffectComponent2D.prototype.onReomove = function () {
        this.player = null;
        //停止计时
        for (var index = 0; index < this.playingTimerIds.length; index++) {
            var timerId = this.playingTimerIds[index];
            TimeManager.getInst().remove(timerId);
        }
        this.playingTimerIds = null;
        this.playingTimerCallbacks = null;
        //回收正在播放的特效
        var keys = this.playingFxDic.keys;
        for (var index = 0; index < keys.length; index++) {
            var spineConfigID = keys[index];
            var skeletons = this.playingFxDic.get(spineConfigID);
            for (var index_1 = 0; index_1 < skeletons.length; index_1++) {
                var skeleton = skeletons[index_1];
                skeleton.stop();
                MatchSpineManager.Instance.Recycle(spineConfigID, skeleton);
            }
        }
        this.playingFxDic = null;
    };
    //播放特效
    EffectComponent2D.prototype.showEffect = function (animationName, fxConfigId, parent, pos, callback, scale) {
        this.nameOrIndex = animationName;
        var list = this.playingFxDic.get(fxConfigId);
        var fxConfig = ConfigManager.GetInstance().GetSpineConfig(fxConfigId);
        //添加重复播放的处理, //gameModify3
        if (list && list.length > 0) {
            //正在播放
            if (fxConfig.ReplayMode == EnumEffectRePlayMode.ReplayPrevious) {
                // this.playEffectHandler(list[0], this.nameOrIndex, fxConfig.Loop);
                this.completeHandler(list[0], fxConfig.Loop, parent, pos, scale);
                return list[0];
            }
            else if (fxConfig.ReplayMode == EnumEffectRePlayMode.NotPlay) {
                Log.Warn("不重复播放特效 fxID: %i", fxConfig.GetID());
                return null;
            }
            else if (fxConfig.ReplayMode == EnumEffectRePlayMode.MultiPlay) {
            }
            else {
                Log.Error("fxID: %i 配置的重播模式不存在 %i", fxConfig.GetID(), fxConfig.ReplayMode);
                return null;
            }
        }
        var fxSkeleton = MatchSpineManager.Instance.Spawn(fxConfigId);
        if (fxSkeleton) {
            //1. 记录加载的spine
            if (!list) {
                list = [];
                this.playingFxDic.set(fxConfigId, list);
            }
            list.push(fxSkeleton);
            if (!fxConfig.Loop) {
                //2. 如不是循环, 计时进行回收
                if (fxConfig.Duration <= 0)
                    Log.Error("非循环播放的特效配置时长不对 %i, 时长%i", fxConfigId, fxConfig.Duration);
                var timerId = TimeManager.getInst().once(fxConfig.Duration, cbhandler.gen_handler(this.endNonLoopFx.bind(this), this, fxConfigId, fxSkeleton));
                this.playingTimerIds.push(timerId);
                this.playingTimerCallbacks.push(callback ? callback : null);
            }
            //3. 播放特效
            this.completeHandler(fxSkeleton, fxConfig.Loop, parent, pos, scale);
            fxSkeleton.pivot(fxConfig.SpinePivot[0], fxConfig.SpinePivot[1]);
            return fxSkeleton;
        }
        else {
            Log.Error("spine对象池没有初始化, 无法播放特效id:%i", fxConfigId);
            return null;
        }
    };
    //回收播放的特效
    EffectComponent2D.prototype.RemoveEffect = function (fxSkeleton, fxSpineConfigId) {
        //删除skeleton记录
        var list = this.playingFxDic.get(fxSpineConfigId);
        if (list) {
            var index = list.indexOf(fxSkeleton);
            if (index >= 0)
                list.splice(index, 1);
            else
                Log.Error("回收的特效没有在播放list中, configID:%i", fxSpineConfigId);
            if (list.length == 0)
                this.playingFxDic.remove(fxSpineConfigId);
        }
        //回收
        MatchSpineManager.Instance.Recycle(fxSpineConfigId, fxSkeleton);
    };
    /**
     * 默认添加到player的父节点下
     * @param effectSkeleton
     * @param loop
     */
    EffectComponent2D.prototype.completeHandler = function (effectSkeleton, loop, parent, pos, scale) {
        if (!parent)
            parent = this.player.comParent.parent;
        if (effectSkeleton.parent != parent) {
            parent.addChild(effectSkeleton);
        }
        effectSkeleton.zOrder = this.effectZorder;
        //默认的话就是放到角色形象的中心点
        var posX = pos ? pos.x : this.player.comParent.x;
        var posY = pos ? pos.y : this.player.comParent.y;
        this.setEffectPos(posX, posY, effectSkeleton);
        this.setEffectScale(scale ? scale.x : 1, scale ? scale.y : 1, effectSkeleton);
        this.playEffectHandler(effectSkeleton, this.nameOrIndex, loop);
        //this.playEffectHandler("34_02");
    };
    //特效播放结束, 回收特效
    EffectComponent2D.prototype.endNonLoopFx = function (spineConfigID, fxSkeleton, timerId) {
        var callback = null;
        //删除计时
        var indexInTimer = this.playingTimerIds.indexOf(timerId);
        if (indexInTimer >= 0) {
            this.playingTimerIds.splice(indexInTimer, 1);
            callback = this.playingTimerCallbacks[indexInTimer];
            this.playingTimerCallbacks.splice(indexInTimer, 1);
        }
        this.RemoveEffect(fxSkeleton, spineConfigID);
        if (callback)
            callback(); //执行回调
        // //删除skeleton记录
        // let list = this.playingFxDic.get(spineConfigID) as Array<Laya.Skeleton>;
        // if (list) {
        //     list.splice(list.indexOf(fxSkeleton, 1));
        //     if (list.length == 0) this.playingFxDic.remove(spineConfigID)
        // }
        // //回收
        // MatchSpineManager.Instance.Recycle(spineConfigID, fxSkeleton)
    };
    //子类扩展
    EffectComponent2D.prototype.playEffectHandler = function (effectSkeleton, nameOrIndex, loop, force, start) {
        if (force === void 0) { force = true; }
        if (start === void 0) { start = 0; }
        effectSkeleton.play(nameOrIndex, loop, force, start);
    };
    EffectComponent2D.prototype.setEffectPos = function (x, y, effectSkeleton) {
        if (!effectSkeleton)
            effectSkeleton = this.playingFxDic.values[0]; //默认使用当前第一个播放的特效
        effectSkeleton.y = y;
        effectSkeleton.x = x;
    };
    EffectComponent2D.prototype.setEffectRotation = function (rotation, effectSkeleton) {
        if (!effectSkeleton)
            effectSkeleton = this.playingFxDic.values[0]; //默认使用当前第一个播放的特效
        effectSkeleton.rotation = rotation;
    };
    EffectComponent2D.prototype.setEffectScale = function (scaleX, scaleY, effectSkeleton) {
        if (!effectSkeleton)
            effectSkeleton = this.playingFxDic.values[0]; //默认使用当前第一个播放的特效
        effectSkeleton.scale(scaleX, scaleY);
    };
    return EffectComponent2D;
}(ComponentBase2D));
//# sourceMappingURL=EffectComponent2D.js.map