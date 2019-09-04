
///////////////////////////////////////////注释 -mb 2019-9-4
/**
 * 音频管理
 * 
 * 
 */
enum EnumSoundPlayMode {
    MultiPlay = 1,
    InterruptCurrPlaying = 2,
    NoInterrupt = 3,
    //1:多个同时播放
    //2: 中断当前播放
    //3: 当前播放中, 不播放新声音

}

/**
 * 音乐管理器
 */
class AudioManager {
    private static _instance: AudioManager;
    public static GetInstance(): AudioManager {
        if (!this._instance) {
            this._instance = new AudioManager();
        }
        return this._instance;
    }
    private isSoundMuted = false;
    private isMusiceMuted = false;
    private curMusicUid = -1;
    private curMusicConfigId = -1;//背景配置id
    private closedMusicConfigId = -1;//关掉的音乐的id
    //游戏是否结束了 true 大厅 false游戏中
    private closedScene;//是否是一样的场景

    /**
     * 初始化，设置音乐与音效静音状态
     * 
     * 
     */
    public InitAudioSetting() {
        //失去焦点后自动停止音乐
        Laya.SoundManager.autoStopMusic = true;
        //读取配置
        this.SetMusicMute(!StorageManager.GetMusicSetting());
        this.SetSoundMute(!StorageManager.GetSoundSetting());
        //设置音量
        this.SetMusicVolume(ConstDefine.Audio_Music_Volume);
        this.SetSoundVolume(ConstDefine.Audio_Sound_Volume);
    }

    /**
     * 初始化微信对象池
     * @param urls 地址
     * @param number 表示数字 
     */
    public InitWxSoundPool(urls: string[], number: number[]) {
        urls = CommonUtil.RemoveRepeated(urls);
        for (let index = 0; index < urls.length; index++) {
            let url = urls[index]
            WechatUtil.getIntance().InitSoundPool(url, number[index])
        }
    }

    /**
     * 设置音乐静音
     * @param mute ture静音
     */
    public SetMusicMute(mute: boolean) {
        this.isMusiceMuted = mute;
        Laya.SoundManager.musicMuted = mute;
        StorageManager.SetMusicSetting(!mute);
        if (this.isMusiceMuted) {
            this.StopMusic();
        } else {
            if (this.curMusicUid <= 0) this.PlayMusicByID();
        }
    }

    /**
     * 设置音乐音量（默认为1）
     * @param volume 音乐音量，0~1
     */
    public SetMusicVolume(volume: number) {
        Laya.SoundManager.setMusicVolume(volume);
    }

    public PlayMusicByID(id?) {
        if (id == -1 || id == undefined) {
            if (GameDataManager.getInstance().MatchInfo.State == EnumMatchState.Exit) {
                id = Math.random() > 0.5 ? EnumSoundID.bg_hall_bgm : 1;//如果场景切换了，并且到了主场景就使用主场景音乐
            } else {
                let isBossLvl = GameDataManager.getInstance().LevelInfo.LevelSpawnDatas.IsBossLevel;
                if (isBossLvl) id = EnumSoundID.bg_bossfight;
                else id = EnumSoundID["bg_fight" + Math.floor(Math.random() * 2 + 1)];//如果进入战斗场景使用战斗音乐
            }
        }
        if (this.curMusicUid >= 0) this.StopMusic();//先停止之前的再播放新的
        let retUid = this.PlaySoundByConfigID(id, false)
        if (retUid != null) {
            this.curMusicUid = retUid;
            this.curMusicConfigId = id;
        }
    }

    //重播背景音乐, 从微信后台返回时候需要重播
    public RePlayCurMusic() {
        if (this.curMusicUid >= 0) this.PlayMusicByID(this.curMusicConfigId);
    }

    /**
     * 停止音乐（不包括音效）
     */
    public StopMusic() {
        if (this.curMusicUid < 0) return;
        // this.StopSoundByConfigID(this.curMusicUid)
        this.StopSoundByUID(this.curMusicUid);
        if (this.curMusicConfigId != -1) this.closedMusicConfigId = this.curMusicConfigId;
        else this.closedMusicConfigId = EnumSoundID.sound_bg_bg_01;
        this.curMusicUid = -1;
        this.curMusicConfigId = -1;
        this.closedScene = GameDataManager.getInstance().MatchInfo.IsGameEnd();
    }

    //////////////////////////////////////////////////////
    //音效

    /**
     * 设置音效静音
     * @param mute true静音
     */
    public SetSoundMute(mute: boolean) {
        this.isSoundMuted = mute;
        Laya.SoundManager.soundMuted = mute;
        StorageManager.SetSoundSetting(!mute);
    }

    /**
     * 设置音效音量（默认为1）
     * @param volume 音乐音量，0~1
     */
    public SetSoundVolume(volume: number) {
        Laya.SoundManager.setSoundVolume(volume);
    }


    private curPlayingSound: Laya.Dictionary = new Laya.Dictionary();
    private curPlayingSoundCallBack: Laya.Dictionary = new Laya.Dictionary();
    private static soundId: number = 0;
    /**
     * 
     * @param soundConfigId 
     * @param isSound 
     * @param onComplete 被stop的音频不会触发 onComplete回调
     * @param volume 0-1
     */
    public PlaySoundByConfigID(soundConfigId: EnumSoundID, isSound: boolean = true, onComplete: Function = null, volume?: number): number {
        if (isSound && this.isSoundMuted) return null;   //音效关闭
        if (!isSound && this.isMusiceMuted) return null; //背景关闭

        //如果正在播放中, 可以选择中断当前/不播放/多个同时播放
        let config = ConfigManager.GetInstance().GetAudioConfig(soundConfigId);

        switch (config.PlayMode) {
            case EnumSoundPlayMode.InterruptCurrPlaying:
                {
                    //如果正在播放中, 可以选择中断当前
                    this.StopSoundByConfigID(soundConfigId);
                    break;
                }
            case EnumSoundPlayMode.NoInterrupt:
                {
                    //如果正在播放中, 可以选择不播放
                    let playing = this.getCurPlayingSoundByConfigID(soundConfigId)
                    if (playing.length > 0) return null;;
                    break;
                }
            case EnumSoundPlayMode.MultiPlay:
                {
                    //多个同时播放
                    break;
                }
        }

        let newSoundUID = AudioManager.soundId++
        let soundChannel = this.Play(config.URL, config.Loop ? 0 : 1, this.onSoundCompleted.bind(this, newSoundUID, soundConfigId), isSound, volume) //Laya.SoundManager.playSound(config.URL, config.Loop ? 0 : 1, Handler.create(this, this.onSoundCompleted, [newSoundUID, soundConfigId]));
        let audioClipInfo = new AudioClipInfo(newSoundUID, soundConfigId, config.URL, soundChannel);
        // console.log("音乐词典", this.curPlayingSound);
        //保存记录: 唯一ID, 声音信息
        this.curPlayingSound.set(audioClipInfo.UID, audioClipInfo);
        if (!config.Loop && onComplete) {
            this.curPlayingSoundCallBack.set(audioClipInfo.UID, onComplete)
        }
        return audioClipInfo.UID;
    }

    //暂停背景
    public PauseBG(pause: boolean) {
        this.Pause(pause, this.curMusicUid)
    }

    //暂停
    public Pause(pause: boolean, soundUID: number) {
        let sound: AudioClipInfo = this.curPlayingSound.get(soundUID);
        if (sound) {
            sound.Pause(pause)
        }
    }

    //设置背景音量
    public SetBGSoundVolum(volume: number) {
        let sound: AudioClipInfo = this.curPlayingSound.get(this.curMusicUid);
        if (sound) {
            sound.SetVolume(volume)
        }
    }

    //设置音量
    public SetSoundVolum(soundUID: number, volume: number) {
        let sound: AudioClipInfo = this.curPlayingSound.get(soundUID);
        if (sound) {
            sound.SetVolume(volume)
        }
    }

    //根据唯一id停止
    public StopSoundByUID(soundUID: number) {
        let audioClipInfo = this.curPlayingSound.get(soundUID) as AudioClipInfo;
        if (audioClipInfo) {
            // this.curPlayingSound.remove(soundUID);
            this.RemoveSoundRecordByUid(soundUID)
            audioClipInfo.Stop();
            // audioClipInfo.Channel.stop();
        }
    }

    //根据配置表id停止
    public StopSoundByConfigID(soundConfigId: EnumSoundID) {
        let config = ConfigManager.GetInstance().GetAudioConfig(soundConfigId);
        // Laya.SoundManager.stopSound(config.URL);

        //停止声音
        let allSounds = this.curPlayingSound.values;
        for (let index = allSounds.length - 1; index >= 0; index--) {
            let sound = allSounds[index] as AudioClipInfo;
            if (sound.ConfigID == soundConfigId) {
                // this.curPlayingSound.remove(sound.UID)
                this.RemoveSoundRecordByUid(sound.UID)
                sound.Stop();
            }
        }
    }

    //停止所有声音
    public StopAllSound() {
        Laya.SoundManager.stopAllSound();
        //todo wechat sound stop
        if (CommonUtil.OnMiniGame()) {
            let sounds = this.curPlayingSound.values;
            for (let index = 0; index < sounds.length; index++) {
                let element = sounds[index] as AudioClipInfo;
                element.Stop()
            }
        }
        this.curPlayingSound.clear();
        this.curPlayingSoundCallBack.clear()
    }

    ///获取当前正在播放的对应配置id的声音
    private getCurPlayingSoundByConfigID(soundConfigId: number): AudioClipInfo[] {
        let result = []
        let allSounds = this.curPlayingSound.values;
        for (let index = 0; index < allSounds.length; index++) {
            let sound = allSounds[index] as AudioClipInfo;
            if (sound.ConfigID == soundConfigId) {
                result.push(sound)
                break;//暂时只用一个
            }
        }
        return result;
    }

    //loops			循环次数,0表示无限循环。
    private Play(url: string, loops?: number, complete?: Function, isSound?: boolean, volume?: number): any {
        if (CommonUtil.OnMiniGame()) {
            let isLoop = loops == 0
            if (!volume) volume = isSound ? Laya.SoundManager.soundVolume : Laya.SoundManager.musicVolume;//默认使用laya音量设置
            return WechatUtil.getIntance().PlaySound(url, isLoop, complete, volume)
        } else {
            let handler = complete ? Handler.create(this, complete) : null;
            return isSound ? Laya.SoundManager.playSound(url, loops, handler) : Laya.SoundManager.playMusic(url, loops, handler);
        }
    }

    //播放完成回调
    private onSoundCompleted(soundUID: number, soundId: EnumSoundID) {
        this.curPlayingSound.remove(soundUID);
        //执行回调
        let cb = this.curPlayingSoundCallBack.get(soundUID)
        if (cb) {
            this.curPlayingSoundCallBack.remove(soundUID)
            cb();
        }
    }

    //删除播放记录
    private RemoveSoundRecordByUid(soundUID: number) {
        this.curPlayingSound.remove(soundUID);
        this.curPlayingSoundCallBack.remove(soundUID)
    }
}


class AudioClipInfo {
    private soundUid: number;
    private soundConfigId: number;
    private soundUrl: string;
    private soundChannel: laya.media.SoundChannel;
    private wechatSoundChannel: any
    public get UID() { return this.soundUid }
    public get ConfigID() { return this.soundConfigId }
    public get Channel(): any {
        if (CommonUtil.OnMiniGame()) {
            return this.wechatSoundChannel;
        } else {
            return this.soundChannel;
        }
    }
    // public get Channel() { return CommonUtil.OnMiniGame() ? this.wechatSoundChannel : this.soundChannel }

    public constructor(soundUid: number, soundConfigId: number, soundUrl: string, channel?: any) {
        if (CommonUtil.OnMiniGame()) {
            this.wechatSoundChannel = channel;
        } else {
            this.soundChannel = channel;
        }
        this.soundUid = soundUid;
        this.soundConfigId = soundConfigId;
        this.soundUrl = soundUrl;

    }

    public SetVolume(volume: number) {
        if (CommonUtil.OnMiniGame()) {
            this.Pause(true)
            this.wechatSoundChannel.volume = volume;
            this.Pause(false)
        } else {
            if (this.soundChannel) {
                this.soundChannel.volume = volume;
            }
        }
    }

    public Pause(pause: boolean) {
        if (CommonUtil.OnMiniGame()) {
            if (pause) {
                this.wechatSoundChannel.pause();
            } else {
                this.wechatSoundChannel.play();
            }
        } else {
            if (pause) {
                this.soundChannel.pause();
            } else {
                this.soundChannel.resume();
            }
        }
    }

    public Stop() {

        if (CommonUtil.OnMiniGame()) {
            WechatUtil.getIntance().StopSound(this.wechatSoundChannel, this.soundUrl)
        } else {
            if (this.soundChannel && !this.soundChannel.isStopped) {
                this.soundChannel.stop();
            }
        }

    }
}