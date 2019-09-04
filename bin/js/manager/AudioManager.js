var EnumSoundPlayMode;
(function (EnumSoundPlayMode) {
    EnumSoundPlayMode[EnumSoundPlayMode["MultiPlay"] = 1] = "MultiPlay";
    EnumSoundPlayMode[EnumSoundPlayMode["InterruptCurrPlaying"] = 2] = "InterruptCurrPlaying";
    EnumSoundPlayMode[EnumSoundPlayMode["NoInterrupt"] = 3] = "NoInterrupt";
    //1:多个同时播放
    //2: 中断当前播放
    //3: 当前播放中, 不播放新声音
})(EnumSoundPlayMode || (EnumSoundPlayMode = {}));
/**
*  重写 音乐管理器 -mb 2019-9-4
*/
var AudioManager = (function () {
    function AudioManager() {
        this.soundManager = Laya.SoundManager;
        this.curPlayingSound = new Laya.Dictionary();
        this.curPlayingSoundCallBack = new Laya.Dictionary();
    }
    AudioManager.GetInstance = function () {
        if (!this._instance) {
            this._instance = new AudioManager();
        }
        return this._instance;
    };
    AudioManager.prototype.InitAudioSetting = function () {
        //失去焦点后自动停止音乐
        Laya.SoundManager.autoStopMusic = true;
        //读取配置
        this.SetMusicMute(!StorageManager.GetMusicSetting());
        this.SetSoundMute(!StorageManager.GetSoundSetting());
        //设置音量
        this.SetMusicVolume(ConstDefine.Audio_Music_Volume);
        this.SetSoundVolume(ConstDefine.Audio_Sound_Volume);
        //
        this.isCanPlaySound_3 = true;
    };
    /**
     * 初始化微信对象池
     */
    AudioManager.prototype.InitWxSoundPool = function (urls, nums) { };
    /**
     * 音乐音量
     */
    AudioManager.prototype.SetMusicVolume = function (number) {
        this.soundManager.musicVolume = number;
        console.log("music_V" + number);
    };
    /**
     * 音乐音量
     */
    AudioManager.prototype.SetSoundVolume = function (number) {
        this.soundManager.soundVolume = number;
        console.log("sound_V" + number);
    };
    /**
     * ture
     * 设置所有音乐 静音
     * @param mute ture静音
     */
    AudioManager.prototype.SetMusicMute = function (mute) {
        this.soundManager.muted = mute;
    };
    /**
     * 播放音乐通过id
     * @param id
     */
    AudioManager.prototype.PlayMusicByID = function (id) {
        var config = this.getSoundConfigByConfigId(id);
        if (!config)
            return;
        /**是否要循环 */
        var loopNum = config.Loop ? 0 : 1;
        if (config.Type == 1) {
            //音乐
            this.soundManager.playMusic(config.URL, loopNum);
            this.keepMusicId = id;
        }
        else {
            //音效
            if (this.isCanPlay(id))
                // this.rePlay(config.URL);
                this.soundManager.playSound(config.URL, loopNum);
        }
    };
    AudioManager.prototype.rePlay = function (url) {
        switch (url) {
            case "res/audio/sound_fight_bullet_01.mp3":
                this.soundManager.stopSound(url);
                break;
            case "res/audio/sound_fight_bullet_crash.mp3":
                this.soundManager.stopSound(url);
                break;
            case "res/audio/sound_fight_bullet_02.mp3":
                this.soundManager.stopSound(url);
                break;
            case "res/audio/sound_fight_bullet_03.mp3":
                this.soundManager.stopSound(url);
                break;
            case "res/audio/sound_fight_bullet_03.mp3":
                this.soundManager.stopSound(url);
                break;
        }
    };
    AudioManager.prototype.isCanPlay = function (id) {
        switch (id) {
            case 2:
            case 4:
            case 5:
            case 6:
            case 3:
                if (this["isCanPlaySound_" + id]) {
                    Laya.timer.once(100, this, this.onplay, [id, this["isCanPlaySound_" + id]]); //添加事件间隔
                    this.isCanPlaySound_3 = false;
                    // console.log("====================play");
                    return true;
                }
                else {
                    return false;
                }
        }
        //如果不需要特殊操作
        return true;
    };
    /**
     * 音乐播放完成
     */
    AudioManager.prototype.onplay = function (id, isCanPlaySound) {
        this.isCanPlaySound_3 = isCanPlaySound;
        // console.log("play=======================");
        Laya.timer.clear(this, this.onplay);
    };
    //重播背景音乐, 从微信后台返回时候需要重播
    AudioManager.prototype.RePlayCurMusic = function () {
        this.PlayMusicByID(this.keepMusicId);
    };
    /**
     * 停止所有声音
     */
    AudioManager.prototype.StopMusic = function () {
        this.soundManager.stopAll();
    };
    //     //////////////////////////////////////////////////////
    //音效
    /**
     * false
     * 设置音效静音
     * @param mute true静音
     */
    AudioManager.prototype.SetSoundMute = function (mute) {
        this.soundManager.muted = mute;
    };
    /**
     *
     * @param soundConfigId
     * @param isSound
     * @param onComplete 被stop的音频不会触发 onComplete回调
     * @param volume 0-1
     */
    AudioManager.prototype.PlaySoundByConfigID = function (soundConfigId, isSound, onComplete, volume) {
        if (isSound === void 0) { isSound = true; }
        if (onComplete === void 0) { onComplete = null; }
        this.PlayMusicByID(soundConfigId);
        return 1;
    };
    //暂停背景
    AudioManager.prototype.PauseBG = function (pause) {
        this.soundManager.musicMuted = pause;
    };
    //暂停
    AudioManager.prototype.Pause = function (pause, soundUID) {
        this.SetMusicMute(pause);
    };
    //设置背景音量
    AudioManager.prototype.SetBGSoundVolum = function (volume) {
        this.SetMusicVolume(volume);
    };
    //设置音量
    AudioManager.prototype.SetSoundVolum = function (soundUID, volume) {
        this.SetSoundVolume(volume);
    };
    //根据配置表id停止
    AudioManager.prototype.StopSoundByConfigID = function (soundConfigId) {
        this.soundManager.stopSound(this.getSoundConfigByConfigId(soundConfigId).URL);
    };
    //停止所有声音
    AudioManager.prototype.StopAllSound = function () {
        this.StopMusic();
    };
    /**
     * 获取配置通过配置id
     * @param configId
     */
    AudioManager.prototype.getSoundConfigByConfigId = function (configId) {
        var GetAudioConfig = ConfigManager.GetInstance().GetAudioConfig(configId);
        return GetAudioConfig;
    };
    return AudioManager;
}());
AudioManager.soundId = 0;
//# sourceMappingURL=AudioManager.js.map