/*
* name;
*/
var WechatFuncManager = (function () {
    function WechatFuncManager() {
    }
    Object.defineProperty(WechatFuncManager, "Instance", {
        get: function () {
            if (WechatFuncManager._Instance == null) {
                WechatFuncManager._Instance = new WechatFuncManager();
            }
            return WechatFuncManager._Instance;
        },
        enumerable: true,
        configurable: true
    });
    //获取微信openid
    WechatFuncManager.prototype.GetWechatOpenID = function (cb) {
        if (!CommonUtil.OnMiniGame()) {
            // Facade.getInstance().sendNotification(NotificationNames.GET_OPEN_ID, null)
            if (cb)
                cb(null);
            return;
        }
        //getopenID
        var openID = GameDataManager.getInstance().LoginPlayerInfo.OpenID;
        if (!openID) {
            var openID_1 = StorageManager.GetOpenID();
            if (openID_1) {
                //本地保存了openid
                Log.Debug("use local storage openid:" + openID_1);
                if (cb)
                    cb(openID_1);
            }
            else {
                //没有保存
                WechatFuncManager.Instance.GetOpenID(function (openid, sessionCode) {
                    Log.Debug("get openID:" + openid);
                    GameDataManager.getInstance().LoginPlayerInfo.OpenID = openid;
                    StorageManager.SetOpenID(openid);
                    // WechatUtil.getIntance().wxSetStorageSync(WechatConstDefine.STORAGE_WECHAT_OPEN_ID, openid);
                    if (cb)
                        cb(openid);
                }, function (errmsg) {
                    Log.Debug("fail openID:" + errmsg);
                    GameDataManager.getInstance().LoginPlayerInfo.OpenID = null;
                    if (cb)
                        cb(null);
                });
            }
        }
        else {
            if (cb)
                cb(openID);
        }
    };
    //检测微信登录是否带参数
    WechatFuncManager.prototype.CheckLoginQuery = function () {
        Log.Debug("第一次到登录界面,登录检测是否点击分享进入游戏:");
        if (GameDataManager.ShareQueryData.LoginQuery) {
            Log.Debug("query at login:" + GameDataManager.ShareQueryData.LoginQuery);
        }
        var roomid = GameDataManager.ShareQueryData.ShareRoomID;
        if (roomid) {
            Log.Debug("query at login enterRoomID:" + roomid);
            return true;
        }
        return false;
    };
    WechatFuncManager.prototype.GetWechatShareInfo = function (cb) {
        var _this = this;
        //if (CommonUtil.OnMiniGame()) {
        //获取分享信息
        // if (!CommonUtil.OnMiniGame()) {
        //     this.InitShareInfoOnError();
        //     if (cb) cb();
        //     return;
        // }
        var ringversion = true;
        if (ringversion) {
            this.InitShareInfoOnError();
            if (cb)
                cb();
            return;
        }
        HttpManager.getIntance().GetJson(WechatConstDefine.WETCHAT_SHARE_CONFIG_URL + WechatConstDefine.WECHAT_APP_ID, function (data) {
            if (data.error > 0) {
                //没注册appid报错
                Log.Warn("获取分享配置 error:" + data.msg);
                _this.InitShareInfoOnError();
                if (cb)
                    cb();
            }
            else {
                //成功
                if (data.ShareList.length == 0) {
                    Log.Debug("配置没有分享图片和标题,使用默认配置");
                    HttpShareConfig.SetDefaultShareList(data);
                }
                Log.Debug("获取分享配置:" + data.showShareButton);
                //获取后初始化分享
                ConfigManager.GetInstance().SetShareConfig(data);
                // //wxb分享query
                // var query = WxbSDKUtil.GetSharePath();
                _this.InitTopRightCornerShare(data.ShareList[0].ShareImg, data.ShareList[0].ShareTitle); //,query);
                if (cb)
                    cb();
            }
        }, function (data) {
            _this.InitShareInfoOnError();
            Log.Debug("获取分享配置失败:" + data);
            if (cb)
                cb();
        });
    };
    WechatFuncManager.prototype.InitShareInfoOnError = function () {
        var defaultdata = new HttpShareConfig();
        defaultdata.InitDefault();
        //获取后初始化分享
        //自己的OpenID，用于邀请别人
        var query = WechatConstDefine.LOGIN_QUERY_KEY + "=" + GameDataManager.getInstance().PlatformData.OpenID;
        Log.Debug("WechatFuncManager 右上角分享附带query：", query);
        ConfigManager.GetInstance().SetShareConfig(defaultdata);
        this.InitTopRightCornerShare(defaultdata.ShareList[0].ShareImg, defaultdata.ShareList[0].ShareTitle, query);
    };
    /**
     * 启动初始化分享
     * @param onshow
     */
    WechatFuncManager.prototype.InitWeChatShare = function (onshow) {
        WechatUtil.getIntance().InitShare(onshow);
    };
    /**
     * 初始化右上角分享按钮
     * @param toprightPicUrl
     * @param title
     * @param query
     */
    WechatFuncManager.prototype.InitTopRightCornerShare = function (toprightPicUrl, title, query) {
        // WechatUtil.getIntance().InitShare();
        //初始化左上角的分享
        WechatUtil.getIntance().InitTopRightCornerShare(toprightPicUrl, title, function () {
            Log.Debug("r分享成功");
        }, function () {
            Log.Debug("r分享失败");
        }, query);
    };
    WechatFuncManager.prototype.RegOnShow = function (onshow) {
        WechatUtil.getIntance().RegOnShow(onshow);
    };
    WechatFuncManager.prototype.RegOnHide = function (onHide) {
        WechatUtil.getIntance().RegOnHide(onHide);
    };
    //检测是否需要授权获取用户信息
    WechatFuncManager.prototype.CheckUserInfoAuth = function (cb) {
        WechatUtil.getIntance().CheckUserAuth(function () { cb(true); }, function () { cb(false); });
    };
    //进行用户信息授权
    WechatFuncManager.prototype.UserInfoAuth = function (buttonInfo, onSuccess, onCancel) {
        WechatUtil.getIntance().CreateAuthButton(buttonInfo, onSuccess, onCancel);
    };
    //获取用户信息
    WechatFuncManager.prototype.GetUserInfo = function (onSuccess, onfail) {
        WechatUtil.getIntance().GetUserInfo(function (userInfo) {
            if (onSuccess)
                onSuccess(userInfo);
        }, function (msg) {
            if (onfail)
                onfail(msg);
        });
    };
    //获取openid
    WechatFuncManager.prototype.GetOpenID = function (onSuccess, onFail) {
        if (!CommonUtil.OnMiniGame() && onSuccess) {
            onSuccess("nominigameID");
            return;
        }
        WechatUtil.getIntance().GetLoginSessionCode(function (sessionCode) {
            var useScrete = false;
            if (useScrete) {
                //自己获取
                WechatUtil.getIntance().GetOpenID(WechatConstDefine.WECHAT_APP_ID, WechatConstDefine.WECHAT_APP_SECRETE, sessionCode, function (data) {
                    if (onSuccess)
                        onSuccess(data);
                }, function (errmsg) {
                    if (onFail)
                        onFail(errmsg);
                });
            }
            else {
                //从第三方url获取openid
                Log.Debug("从第三方获取OpenID");
                //2019-6-3 16:43:00 通过proto获取openid
                var msg = new com.msg.c_getOpenId_1100();
                msg.appid = WechatConstDefine.WECHAT_APP_ID;
                msg.sessionCode = sessionCode;
                var buffer = com.msg.c_getOpenId_1100.encode(msg).finish();
                HttpNetworkManager.GetInstance().SendHttpMsg(EnumNetMessage.C_GetOpenId_1100, buffer, onSuccess, onFail);
                Log.Debug("http 从第三方获取OpenID 发送 C_GetOpenId_1100");
            }
        });
    };
    WechatFuncManager.prototype.Share = function (picUrl, title, succeed, fail, query) {
        //非微信平台直接返回 成功
        if (!CommonUtil.OnMiniGame() && succeed) {
            succeed();
            return;
        }
        WechatUtil.getIntance().ShareWithPicAndTitle(picUrl, title, function (openGid) {
            //分享成功
            if (openGid) {
                var ret = true; //this.RecordOpenGID(openGid, GameDataManager.getInstance().GetLoginPlayerID())
                if (ret) {
                }
                else {
                    //分享同一个群, 失败
                    Log.Debug("share to same group, not count as succeed");
                }
            }
            else {
                //分享给个人 或者 分享群失败
                Log.Debug("share to person , or failed geting info of group");
            }
        }, function () {
            //分享失败
            //if (fail) fail();
        }, query);
        //if (succeed) Laya.timer.frameOnce(1, this, () => { succeed(); })
        if (succeed)
            TimeManager.getInst().once(1, cbhandler.gen_handler(function () { succeed(); }));
    };
    WechatFuncManager.prototype.ShowModal = function (title, content, cancelText, confirmText, onConfirmClick, OnCancelClick) {
        WechatUtil.getIntance().showModel(title, content, true, cancelText, confirmText, onConfirmClick, OnCancelClick);
    };
    WechatFuncManager.prototype.RecordWechatImage = function (imageurl) {
        var url = StorageManager.GetHeaderImage();
        if (url && url == imageurl) {
            Log.Debug("已经保存, 不重复本地保存image url:" + url);
            return false;
        }
        else {
            StorageManager.SetWechatImage(imageurl);
            return true;
        }
    };
    WechatFuncManager.prototype.RecordNickName = function (nickname) {
        var name = StorageManager.GetNickName();
        if (name && name == nickname) {
            Log.Debug("已经保存, 不重复本地保存nickname:" + name);
            return false;
        }
        else {
            StorageManager.SetNickName(nickname);
            return true;
        }
    };
    WechatFuncManager.prototype.GetHeaderUrl = function () {
        return StorageManager.GetHeaderImage();
    };
    WechatFuncManager.prototype.GetNickName = function () {
        return StorageManager.GetNickName();
    };
    //开房邀请好友
    WechatFuncManager.prototype.InviteFriend = function (roomID) {
        //Log.Debug("开始分享房间id:" + roomID + " 场景ID:" + GameDataManager.getInstance().MatchRoomInfo.SelectedSceneID)
        // WechatFuncManager.Instance.ShowModal("分享房间", "请分享给好友,点击加入房间", "取消", "分享",
        //     () => {
        //         //打开分享
        //         var sharecontentIndex = Math.floor(Math.random() * ConfigManager.GetInstance().GetShareConfig().ShareList.length);
        //         let sharecontent = ConfigManager.GetInstance().GetShareContent(sharecontentIndex);
        //         WechatFuncManager.Instance.Share(sharecontent.ShareImg, sharecontent.ShareTitle,
        //             () => {
        //                 //分享成功
        //             }, () => {
        //                 //分享失败
        //             }, ConstDefine.SHARE_ROOM_ID + "=" + roomID
        //             + "&" + ConstDefine.SHARE_SCENE_ID + "=" + GameDataManager.getInstance().MatchRoomInfo.SelectedSceneID
        //             + "&" + ConstDefine.SHARE_PLAYER_ID + "=" + GameDataManager.getInstance().GetLoginPlayerID())
        //     },
        //     () => {
        //         //取消分享
        //         Log.Debug("选择不分享")
        //     })
    };
    //记录群信息, 当前已经记录过, 返回false, 否返回true
    WechatFuncManager.prototype.RecordOpenGID = function (openGId, userID) {
        // let    key: userID,  value: time_groupID_groupid
        if (!openGId)
            return false;
        var seperator = "_";
        var userIDString = userID.toString();
        var openIDString = openGId.toString();
        var GID_KEY = "GID" + userIDString;
        var storageInfo = localStorage.getItem(GID_KEY);
        var date = new Date();
        var curDate = date.toDateString();
        //没有记录
        if (!storageInfo) {
            localStorage.setItem(GID_KEY, curDate + seperator + openIDString);
            return true;
        }
        //有记录不是当天的
        var recordDate = this.GetDateFromString(storageInfo, seperator);
        if (recordDate != curDate) {
            //localStorage.removeItem(GID_KEY)
            localStorage.setItem(GID_KEY, curDate + seperator + openIDString);
            return true;
        }
        //有记录是当前
        var hasGid = this.HasGroupIDInString(openIDString, storageInfo, seperator);
        if (hasGid) {
            return false; //gid已经记录
        }
        else {
            //gid没有记录
            //localStorage.removeItem(GID_KEY)
            localStorage.setItem(GID_KEY, storageInfo + seperator + openIDString);
            return true;
        }
    };
    WechatFuncManager.prototype.GetDateFromString = function (value, seperator) {
        var strlist = value.split(seperator);
        if (strlist && strlist.length > 0) {
            return strlist[0];
        }
        return null;
    };
    WechatFuncManager.prototype.GetGroupIDsFromString = function (value, seperator) {
        var gID = [];
        var strlist = value.split(seperator);
        if (strlist && strlist.length > 1) {
            for (var index = 1; index < strlist.length; index++) {
                var element = strlist[index];
                gID.push(element);
            }
        }
        return gID;
    };
    WechatFuncManager.prototype.HasGroupIDInString = function (gID, valueStrings, seperator) {
        var index = valueStrings.indexOf(gID);
        return index >= 0;
        // let gidList = this.GetGroupIDsFromString(valueStrings, seperator);
        // if(gidList && gidList.length > 0){
        //     for (let index = 0; index < gidList.length; index++) {
        //         let gid = gidList[index];
        //         if(gid == gID){
        //             return true;
        //         }
        //     }
        // }
        // return false;
    };
    //软键盘相关
    WechatFuncManager.prototype.RegOnKeyboardComplete = function (onComplete) {
        WechatUtil.getIntance().OnKeyboardComplete(onComplete);
    };
    WechatFuncManager.prototype.RegOnKeyboardConfirm = function (onConfirm) {
        WechatUtil.getIntance().OnKeyboardConfirm(onConfirm);
    };
    /**
     * 激励视频广告相关
     * @param loadSucceedCB 拉取成功的回调
     * @param loadFailedCB 拉取失败的回调
     * @param videoClosedCB 视频播放结束的回调，有参数res.isEnded，true 表示用户是在视频播放完以后关闭的视频，false 表示用户在视频播放过程中关闭了视频
     */
    WechatFuncManager.prototype.RegVideoAd = function (loadSucceedCB, loadFailedCB, videoClosedCB) {
        WechatUtil.getIntance().CreateVideoAd(loadSucceedCB, loadFailedCB, videoClosedCB);
    };
    return WechatFuncManager;
}());
WechatFuncManager._Instance = null;
//# sourceMappingURL=WechatFuncManager.js.map