/*
* name;
*/
class ShakeManager {
    private static _instance: ShakeManager;
    public static GetInstance(): ShakeManager {
        if (!this._instance) {
            this._instance = new ShakeManager();
        }
        return this._instance;
    }

    /**
     * 震动
     * @param sprite 需要震动的物体
     * @param range 震动距离（像素），值越大震动范围越大，默认10(像素)
     */
    public ShakeSprite(sprite: Laya.Sprite, range?: number, cb?: cbhandler, duration: number = 0.3, intensive: boolean = false): number {
        //在一个范围内按照左、右的顺序选择一定数量的点，然后通过路径动画播放
        //暂时设定范围为-10~10，-10~10

        //1.记录原位置，最后需要回来
        let spritePos = new Vec2(sprite.x, sprite.y);
        //2.生成路径数组，保证数组的起始与结束为同一位置
        let path = this.GenRandomPos(spritePos, range, intensive);
        //3.通过动画，播放路径，并保存动画task
        let task = Tween2DUtil.path({
            node: sprite,
            duration: duration,
            x: spritePos.x,
            y: spritePos.y,
            path: path,
            onComplete: cbhandler.gen_handler(() => {
                sprite.pos(spritePos.x, spritePos.y);
                if (cb) {
                    cb.exec()
                }
            }, this)
        })
        //4.记录，防止多重震动引起偏移
        return task;
    }

    public StopShake(task: number) {
        Tween2DUtil.kill(task);
    }

    private GenRandomPos(pos: Vec2, range?: number, intensive: boolean = false): Vec2[] {
        let randomPosArray = [];
        //起始点
        randomPosArray.push(pos);
        //按照奇偶交替，随机选择
        for (var i = 0; i < 6; i++) {
            let x = pos.x;
            let y = pos.y;
            if (i % 2 == 0) {
                //偶数
                x += (Math.random() * range ? range : 10) - range ? range : 10;
            } else {
                //奇数
                x += (Math.random() * range ? range : 10) + range ? range : 10;
            }
            y += (Math.random() * 20) - 10;

            let nextPos = new Vec2(x, y);
            randomPosArray.push(nextPos);

            if (intensive) {
                // let nextPos1 = new Vec2(2 * pos.x - x, 2 * pos.y - y);
                let nextPos1 = new Vec2(pos.x - (x - pos.x) * 0.5, pos.y - (y - pos.y) * 0.5);
                randomPosArray.push(nextPos1);
            }
        }

        //结束返回起始点
        randomPosArray.push(pos);
        return randomPosArray;
    }


    //怪物
    private shakeDataDic = new Laya.Dictionary();
    public ShakeMonster(sprite: Laya.Sprite, cb?: Function, range: number = 10, duration: number = 0.3, freq: number = 0.1): number {
        let shakeData = new ShakeData(sprite, duration, range, freq, cb)
        shakeData.Start();
        this.shakeDataDic.set(shakeData.ID, shakeData)
        return shakeData.ID;
    }

    public StopShakeMonster(id: number) {
        let shakeData = this.shakeDataDic.get(id);
        if (shakeData) {
            this.shakeDataDic.remove(id)
            TimeManager.getInst().remove(id)
        }
    }
}

class ShakeData {
    private id: number;
    private sprite: Laya.Sprite;
    private originalPos: Vec2;
    private duration: number;       //震动时间
    private range: number;          //震动范围
    private frequence: number;      //震动频率
    private onCompleteCallback: Function
    public get ID(): number { return this.id }
    private timePassed: number = 0;
    private sinceLastShake: number = 0;
    public constructor(sprite: Laya.Sprite, duration: number, range: number, freq: number, cb?: Function) {
        this.sprite = sprite;
        this.originalPos = new Vec2(this.sprite.x, this.sprite.y);
        this.duration = duration;
        this.range = range;
        this.frequence = freq;
        this.onCompleteCallback = cb;
    }

    public Start() {
        this.timePassed = 0;
        this.sinceLastShake = 0;
        this.id = TimeManager.getInst().addUpdater(cbhandler.gen_handler(this.updateShake, this, this.sprite, this.originalPos, this.range, this.frequence))
    }

    private updateShake(sprite: Laya.Sprite, originPos: Vec2, range: number, freq: number, dt: number) {
        this.timePassed += dt;

        if (this.timePassed > this.duration) {
            if (this.onCompleteCallback) this.onCompleteCallback();
            this.Stop();
            return;
        }


        this.sinceLastShake += dt;
        if (this.sinceLastShake >= this.frequence) {
            let x = originPos.x + (Math.random() * 2 - 1) * range;
            let y = originPos.y + (Math.random() * 2 - 1) * range;
            sprite.pos(x, y);
            this.sinceLastShake = 0;
        }

    }

    public Stop() {
        if (this.id > 0) {
            TimeManager.getInst().remove(this.id)
        }
    }

}