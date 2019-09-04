/*
* name;
*/
class WechatUtil {
    private static _instanc: WechatUtil;

    public static getIntance(): WechatUtil {
        if (WechatUtil._instanc == null) {
            WechatUtil._instanc = new WechatUtil();
        }
        return WechatUtil._instanc;
    }

    public Vibrate() {
        if (CommonUtil.OnMiniGame()) {
            let wx = Laya.Browser.window.wx;
            if (wx == null) {
                Log.Debug("no wx")
                return;
            }
            //android iphon通用
            wx.vibrateLong({
                success: () => {
                    Log.Debug("vib  succeed: ")
                },
                fail: () => {
                    Log.Debug("vib fail: ")
                },
                complete: () => {
                    //成功或失败都执行
                    Log.Debug("vib complete: ")
                }
            })

            //只iphon7 和 android
            // wx.vibrateShort({
            //     success: () => {
            //         Log.Debug("vib  succeed: ")
            //         //Facade.getInstance().sendNotification(NotificationNames.SHARE_WECHAT_RESULT, true)
            //     },
            //     fail: () => {
            //         Log.Debug("vib fail: ")
            //         //Facade.getInstance().sendNotification(NotificationNames.SHARE_WECHAT_RESULT, false)
            //     },
            //     complete: () => {
            //         Log.Debug("vib complete: ")
            //         //Facade.getInstance().sendNotification(NotificationNames.SHARE_WECHAT_RESULT, false)
            //     }
            // })
        }
    }

    //必须在一开始就初始化, 如果是点击转发, 获取转发时候设置的query
    public InitShare(onshow: Function) {
        if (CommonUtil.OnMiniGame()) {
            let wx = Laya.Browser.window.wx;
            if (wx == null) {
                Log.Debug(" InitShare 没有 wx")
                return;
            }

            //let options1 = wx.getLaunchOptionsSync(); useless
            let onShowCallBack = onshow;
            wx.onShow(function (options) {
                //需要在onshow里面设置, 其他地方可能失效
                Log.Debug("wechat onshow activated!!!!!!!!!!!!!!!!!!!!!!!!!")
                wx.showShareMenu({
                    // shareTicket 是获取转发目标群信息的票据，只有拥有 shareTicket 才能拿到群信息，用户每次转发都会生成对应唯一的shareTicket 。
                    withShareTicket: true
                });
                onshow(options)
                //可以在option中获取分享时候设置的query
                // Log.Debug("onshow" + Object.getOwnPropertyNames(options))
                // Log.Debug("onshow:" + options.shareTicket + "  query:" + Object.getOwnPropertyNames(options.query) + " scene:" + options.scene);
                // if (options.query) {
                //     if (options.query[ConstDefine.LOGIN_QUERY_KEY]) {
                //         Log.Debug("query LOGIN_QUERY_KEY value:" + options.query[ConstDefine.LOGIN_QUERY_KEY]);
                //         GameDataManager.getInstance().LoginQuery = options.query[ConstDefine.LOGIN_QUERY_KEY]
                //     }
                //     let shareRoomID = options.query[ConstDefine.SHARE_ROOM_ID]
                //     if (shareRoomID) {
                //         Log.Debug("query SHARE_ROOM_ID value:" + shareRoomID);
                //         GameDataManager.getInstance().MatchRoomInfo.RoomID = shareRoomID
                //     }
                //     let shareSceneID = options.query[ConstDefine.SHARE_SCENE_ID]
                //     if (shareSceneID) {
                //         Log.Debug("query SHARE_SCENE_ID value:" + shareSceneID);
                //         GameDataManager.getInstance().MatchRoomInfo.SelectedSceneID = shareSceneID
                //     }
                //     let sharePlayerID = options.query[ConstDefine.SHARE_PLAYER_ID]
                //     if (sharePlayerID) {
                //         Log.Debug("query SHARE_PLAYER_ID value:" + sharePlayerID);
                //         GameDataManager.getInstance().MatchRoomInfo.RoomCreatorID = sharePlayerID
                //     }
                // }
            })


        }
    }

    public RegOnShow(onShow: Function) {
        if (CommonUtil.OnMiniGame()) {
            let wx = Laya.Browser.window.wx;
            if (wx == null) {
                Log.Debug(" init 没有 wx")
                return;
            }
            wx.onShow(function (options) {
                Log.Debug("wechat onshow regOnShow activated!!!!!!!!!!!!!!!!!!!!!!!!!")
                onShow(options)
            })
        }
    }
    public RegOnHide(onHide: Function) {
        if (CommonUtil.OnMiniGame()) {
            let wx = Laya.Browser.window.wx;
            if (wx == null) {
                Log.Debug(" init 没有 wx")
                return;
            }
            wx.onHide(function () {
                Log.Debug("wechat onshow RegOnHide activated!!!!!!!!!!!!!!!!!!!!!!!!!")
                onHide()
            })
        }
    }

    /**
     * InitTopRightCornerShare
     */
    public InitTopRightCornerShare(picUrl: string, title: string, succeed?: Function, fail?: Function, query?: string) {
        if (CommonUtil.OnMiniGame()) {
            let wx = Laya.Browser.window.wx;
            if (wx == null) {
                Log.Debug(" init 没有 wx")
                if (fail) fail();
                return;
            }

            wx.onShareAppMessage(function (shareRes) {
                // 用户点击了“转发”按钮
                Log.Debug("点击右上角转发，query：" + query)//+ Object.getOwnPropertyNames(shareRes))
                return {
                    title: title,
                    imageUrl: picUrl,
                    query: query,
                    success: (res) => {
                        //Log.Debug("sahre succeed: ")
                        if (res.errMsg == 'shareAppMessage:ok') {
                            //判断是否分享到群
                            if (res.hasOwnProperty('shareTickets')) {
                                Log.Debug("to group:" + res.shareTickets[0]);
                                //分享到群
                                this.GetShareInfo(res.shareTickets[0], (openGId) => {
                                    Log.Debug("get share info com" + openGId)
                                    if (succeed) succeed(openGId);
                                })
                            } else {
                                // 分享到个人
                                Log.Debug("to person:")
                                if (succeed) succeed();
                            }

                        }
                        //if (succeed) succeed();
                    },
                    fail: () => {
                        //Log.Debug("share fail/cancle: ")
                        if (fail) fail();
                    },
                    complete: function () {
                        //Log.Debug("share complet cancel com or share com: ");
                    },

                }
            })
        }
    }
    //**************************************************************************/
    // WechatUtil.getIntance().ShareWithPicAndTitle("res/layabox.png", "我在新球跑跑得分1000, 要来挑战吗?", ()=>{
    //             Log.Debug("分享成功")
    //         },
    //         ()=>{
    //             Log.Debug("分享失败")
    //         },
    //         query格式:key1=val1&key2=val2 )
    //**************************************************************************/
    public ShareWithPicAndTitle(picUrl: string, title: string, succeed?: Function, fail?: Function, query?: string) {
        if (CommonUtil.OnMiniGame()) {
            let wx = Laya.Browser.window.wx;
            if (wx == null) {
                Log.Debug("no wx")
                if (succeed) succeed();
                //Facade.getInstance().sendNotification(NotificationNames.SHARE_WECHAT_RESULT, true)
                return;
            }

            //1.选择联系人的时候只能选择一个目标，不能多选
            //2. 每次用户从这个消息卡片进入的时候，也会获得一个 shareTicket，
            //通过调用 wx.getShareInfo() 接口传入 shareTicket 可以获取群相关信息
            wx.showShareMenu({
                withShareTicket: true
            })

            wx.shareAppMessage(this.RetShareSetting(picUrl, title, query, succeed, fail))

            if (succeed) {
                TimeManager.getInst().once(1, cbhandler.gen_handler(() => {
                    succeed();
                }, this), true);
            }

        } else {
            if (succeed) succeed();
        }
    }

    /**
     * 截屏分享
     * @param uiTopLeftX ui左上角位置
     * @param uiTopLeftY 
     * @param uiwidth ui左上角宽高
     * @param uiheight 
     * @param title  标题
     * @param succeed  现在没有回调
     * @param fail 现在没有回调
     * @param query 
     */
    public ShareWithScreenShotAndTitle(uiTopLeftX: number, uiTopLeftY: number, uiwidth: number, uiheight: number, title: string, succeed?: Function, fail?: Function, query?: string) {
        if (CommonUtil.OnMiniGame()) {
            let wx = Laya.Browser.window.wx;
            if (wx == null) {
                Log.Debug("no wx")
                if (succeed) succeed();
                //Facade.getInstance().sendNotification(NotificationNames.SHARE_WECHAT_RESULT, true)
                return;
            }

            this.SaveCanvasToTemp(uiTopLeftX, uiTopLeftY, uiwidth, uiwidth, (path: string, error: string) => {
                if (path) {
                    this.ShareWithPicAndTitle(path, title, () => {
                        Log.Debug("ShareWithScreenShotAndTitle suceed")
                        if (succeed) succeed();
                    }, () => {
                        Log.Debug("ShareWithScreenShotAndTitle faile")
                        if (fail) fail();
                    }, query)
                } else {
                    Log.Debug("保存失败:" + error)
                    if (fail) fail();
                }
            })
        } else {
            if (succeed) succeed();
        }
    }

    /**
     * 创建离屏画面, 添加背景和文字,进行分享
     * @param idiom 成语
     * @param pronunctiation 拼音
     * @param bgImagePath 背景路径  "res/texture/btn_auth.png
     * @param succeed 
     * @param fail 
     * @param query 
     */
    public ShareWithTitleAndBgImage(idiom: string, pronunctiation: string, bgImagePath: string, succeed?: Function, fail?: Function, query?: string) {
        this.CreateShareImageAtOfflineCanvas(idiom, pronunctiation, bgImagePath, 300, 300,
            (path: string, error: string) => {
                if (path) {
                    this.ShareWithPicAndTitle(path, "", succeed, fail, query);
                } else {
                    Log.Debug("保存失败:" + error)
                    if (fail) fail();
                }
            })
    }

    private RetShareSetting(picUrl: string, title: string, query?: string, succeed?: Function, fail?: Function): any {
        if (query) Log.Debug("share with query:" + query)
        return {
            title: title,
            imageUrl: picUrl,
            query: query,
            success: (res) => {
                //Log.Debug("sahre succeed: ")
                if (res.errMsg == 'shareAppMessage:ok') {
                    //判断是否分享到群
                    if (res.hasOwnProperty('shareTickets')) {
                        Log.Debug("to group:" + res.shareTickets[0]);
                        //分享到群
                        this.GetShareInfo(res.shareTickets[0], (openGId) => {
                            Log.Debug("get share info com" + openGId)
                            if (succeed) succeed(openGId);
                        })
                    } else {
                        // 分享到个人
                        Log.Debug("to person:")
                        if (succeed) succeed();
                    }

                }
                //if (succeed) succeed();
            },
            fail: () => {
                //Log.Debug("share fail/cancle: ")
                if (fail) fail();
            },
            complete: function () {
                //Log.Debug("share complet cancel com or share com: ");
            },

        }
    }


    private GetShareInfo(shareTicket: any, onComplete?: Function) {
        if (CommonUtil.OnMiniGame()) {
            let wx = Laya.Browser.window.wx;
            if (wx == null) {
                Log.Debug("no wx")
                // if (succeed) succeed();
                // //Facade.getInstance().sendNotification(NotificationNames.SHARE_WECHAT_RESULT, true)
                return;
            }

            wx.getShareInfo({
                shareTicket: shareTicket,
                success: (res) => {
                },
                fail: () => {
                    //Log.Debug("share fail/cancle: ")
                    //if (fail) fail();
                    if (onComplete) onComplete(null)
                },
                complete(shareinfores) {
                    let keys = Object.getOwnPropertyNames(shareinfores);
                    Log.Debug(keys)
                    Log.Debug("encryptdata:" + shareinfores.encryptedData)
                    Log.Debug("iv:" + shareinfores.iv)

                    wx.login({
                        success: function (loginres) {
                            Log.Debug("logins seesion code:" + loginres.code)
                            let openGId = "123456789456431123"//暂时测试
                            if (onComplete) onComplete(openGId)
                            // wx.request({
                            //     url: 'https://dulei.mynatapp.cc/test/hello',//写上你后台服务器路径（用途：解析出Gopenid）
                            //     //解析出Gopenid需要session_key，encryptedData，iv。具体后台怎么写，//可以参照https://www.jianshu.com/p/856fe2195ffe
                            //     data: { 'sessionKey': loginres.code, 'encryptedData': shareinfores.encryptedData, "iv": shareinfores.iv },
                            //     header: {
                            //         'content-type': 'application/json' // 默认值
                            //     },
                            //     method: 'POST',
                            //     success: function (requestres) {
                            //         //let keys = Object.getOwnPropertyNames(shareinfores);
                            //         let obj = JSON.parse(requestres)
                            //         let keys = Object.getOwnPropertyNames(requestres);
                            //         Log.Debug(keys)
                            //         wx.showModal({
                            //             title: 'GopenId',
                            //             content: requestres.data.openGId
                            //         })
                            //         if (onComplete) onComplete(requestres.data.openGId)
                            //     }
                            // })
                            // wx.request({
                            //     url: 'xx',//写上你后台服务器路径（用途：解析出Gopenid）
                            //                       //解析出Gopenid需要session_key，encryptedData，iv。具体后台怎么写，
                            //                       //可以参照https://www.jianshu.com/p/856fe2195ffe
                            //     data: { 'code': code, 'encryptedData': encryptedData, "iv": iv },
                            //     header: {
                            //         'content-type': 'application/json' // 默认值
                            //     },
                            //     success: function (res) {
                            //         wx.showModal({
                            //             title: 'GopenId',
                            //             content: res.data.openGId
                            //         })
                            //     }
                            // })

                        }
                    })

                }
            })
        }

    }



    public GetLoginSessionCode(onSuccess: Function) {
        if (CommonUtil.OnMiniGame()) {
            let wx = Laya.Browser.window.wx;
            wx.login({
                success: function (res) {
                    Log.Debug("logins seesion code:" + res.code)
                    if (onSuccess) onSuccess(res.code)
                }
            })
        } else {
            onSuccess(null)
        }
    }

    //获取玩家的openID
    public GetOpenID(appid: string, appscrete: string, sessioncode: string, onSuccess?: Function, onFail?: Function) {
        if (CommonUtil.OnMiniGame()) {
            let url = "https://api.weixin.qq.com/sns/jscode2session?appid=" + appid + "&secret=" + appscrete + "&js_code=" + sessioncode + "&grant_type=authorization_code"
            HttpManager.getIntance().GetJson(url,
                (data) => {
                    if (data.errcode && data.errcode > 0) {
                        Log.Warn("get openid error:" + data.errMsg);
                        if (onFail) onFail(data.errmsg)
                    } else {
                        Log.Debug("opneid:" + data.openid);
                        if (onSuccess) onSuccess(data.openid)
                    }
                }, (errmsg) => {
                    Log.Debug("login error:" + errmsg);
                    if (onFail) onFail(errmsg)
                })
        } else {
            if (onFail) onFail("on on weixin ")
        }
    }

    public GetWXUserDataPath(): string {
        if (CommonUtil.OnMiniGame()) {
            let wx = Laya.Browser.window.wx;
            return wx.env.USER_DATA_PATH
        }
        return null
    }
    public DownloadFile(url: string, onSucess: Function, onFail: Function): any {
        if (CommonUtil.OnMiniGame()) {
            let wx = Laya.Browser.window.wx;
            let baseURL = ''
            //设置一个资源包的版本号，可以写死也可以联网热更新
            let bundleVer = '180826'
            // 组装资源包路径
            let bundleURI = wx.env.USER_DATA_PATH + '/dimian.lh';//wx.env.USER_DATA_PATH + '/bundle' + bundleVer + '.zip'
            let cacheURL = wx.env.USER_DATA_PATH + '/cache/'
            Log.Debug("begin download url:" + url)
            let downloadTask = wx.downloadFile({
                url: baseURL + url, //baseURL + 'zip/bundle' + bundleVer + '.zip',
                //filePath: bundleURI,
                success(res) {
                    if (res.statusCode === 200) {
                        let path = res.tempFilePath
                        Log.Debug('素材包下载完毕:' + url)
                        if (onSucess) onSucess(path)
                    } else {
                        Log.Warn('素材包下载网络出错, %o', res)
                        if (onFail) onFail("素材包下载网络出错 statusCode: " + res.statusCode)
                    }
                },
                fail(res) {
                    Log.Warn('素材包下载取消' + res.errMsg)
                    if (onFail) onFail(res.errMsg)
                }
            })

            return downloadTask
        } else {
            if (onFail) onFail("WxDownloadFile not on wechat")
            return null;
        }
    }

    public UnzipFile(zipfilePath: string, outputPath: string, onSucess: Function, onFail: Function) {
        if (CommonUtil.OnMiniGame()) {
            let wx = Laya.Browser.window.wx;
            let fs = wx.getFileSystemManager()
            fs.unzip({
                zipFilePath: zipfilePath,
                targetPath: outputPath,
                success() {
                    Log.Debug('资源包解压缩完毕')
                    if (onSucess) onSucess();
                },
                fail(err) {
                    Log.Debug('资源包解压缩errror:' + err.errMsg + Object.getOwnPropertyNames(err));
                    if (onFail) onFail(err.errMsg);
                }
            })


        }
    }

    public CreateDirectory(dirPath: string, recursive: boolean = true, onSuccess: Function) {
        if (CommonUtil.OnMiniGame()) {
            let wx = Laya.Browser.window.wx;
            let fs = wx.getFileSystemManager()
            fs.access({
                path: dirPath,
                success() {
                    //console.log('异步检测目录已经存在 ' + dirPath)
                    if (onSuccess) onSuccess();
                },
                fail() {
                    //console.log('异步检测目录不存在, 创建目录 ' + dirPath)
                    try {
                        fs.mkdirSync(dirPath, true)
                        //console.log('目录同步创建成功 ' + dirPath)
                        if (onSuccess) onSuccess();
                    } catch (error) {
                        //console.log('目录同步创建失败 ' + dirPath)
                        if (onSuccess) onSuccess();
                    }
                }
            })
        }
    }

    //
    /**
     * 同步创建文件夹
     * @param dirPath 
     * @param recursive 
     * @param onComplete onComplete(true)
     */
    public CreateDirectorySync(dirPath: string, recursive: boolean = true, onComplete?: Function): boolean {
        if (CommonUtil.OnMiniGame()) {
            let wx = Laya.Browser.window.wx;
            let fs = wx.getFileSystemManager()
            let isExist = this.HasFileSync(dirPath);
            if (isExist) {
                //console.log('同步创建目录已经存在, ' + dirPath)
                if (onComplete) onComplete(true);
                return true;
            } else {
                try {
                    fs.mkdirSync(dirPath, true)
                    //console.log('目录同步创建成功 ' + dirPath)
                    if (onComplete) onComplete(true);
                    return true;
                } catch (error) {
                    //console.log('目录同步创建失败 ' + dirPath)
                    if (onComplete) onComplete(false);
                    return false;
                }
            }
        }
    }

    //同步检测文件/文件夹是否存在
    public HasFileSync(fileurl: string): boolean {
        if (CommonUtil.OnMiniGame()) {
            let wx = Laya.Browser.window.wx;
            let fs = wx.getFileSystemManager()
            try {
                fs.accessSync(fileurl);
                //console.log('同步检测目录已存在 ' + fileurl)
                return true;
            } catch (error) {
                //console.log('同步检测目录不存在 ' + fileurl)
                return false;
            }
        } else {
            return false;
        }
    }


    public HasFile(fileurl: string, onSuccess: Function, onFail: Function) {
        if (CommonUtil.OnMiniGame()) {
            let wx = Laya.Browser.window.wx;
            let fs = wx.getFileSystemManager()
            fs.access({
                path: fileurl,
                success() {
                    //console.log('异步检测文件存在' + fileurl)
                    if (onSuccess) onSuccess();
                },
                fail() {
                    //console.log('异步检测文件不存在' + fileurl)
                    if (onFail) onFail();
                }
            })
        } else {
            if (onFail) onFail();
        }
    }

    /**
     * 读取微信
     * @param fileurl 
     * @param fileEncoding 
     * @param onSuccess 
     * @param onFail 
     */
    public ReadFile(fileurl: string, fileEncoding: string, onSuccess: Function, onFail: Function) {
        if (CommonUtil.OnMiniGame()) {
            let wx = Laya.Browser.window.wx;
            let fs = wx.getFileSystemManager()
            fs.readFile({
                filePath: fileurl,
                encoding: fileEncoding,
                success(res) {
                    //console.log('读取文件成功' + fileurl)
                    if (onSuccess) onSuccess(res.data);
                },
                fail(res) {
                    //console.log('读取文件失败' + fileurl)
                    if (onFail) onFail(res.errMsg);
                }
            })
        } else {
            if (onFail) onFail("not on wechat");
        }
    }



    public RemoveDir(dirPath: string, onSuccess: Function, onFail: Function) {
        //是否存在路径
        this.HasFile(dirPath,
            () => {
                this.RemoveDirSync(dirPath)
                //删除完
                if (onSuccess) onSuccess();
            },
            () => {
                //不存在 直接返回成功
                if (onSuccess) onSuccess();
            })
    }

    public RemoveDirSync(dirPath: string) {
        if (CommonUtil.OnMiniGame()) {
            if (!this.HasFileSync(dirPath)) return;//没有文件夹返回
            let wx = Laya.Browser.window.wx;
            let fs = wx.getFileSystemManager()
            let list = fs.readdirSync(dirPath)
            for (let i = 0; i < list.length; i++) {
                let path = dirPath + "/" + list[i]
                Log.Debug("删除文件:" + path)
                //删之前
                WechatUtil.getIntance().GetSavedFileList(null, null);
                let stats = fs.statSync(path);
                if (stats.isDirectory()) {
                    this.RemoveDirSync(path)
                } else {
                    fs.unlinkSync(path)
                    //删之后
                    WechatUtil.getIntance().GetSavedFileList(null, null);
                }
            }
            fs.rmdirSync(dirPath, true);
        }
    }

    public RemoveFileSyn(filePath: string) {
        if (CommonUtil.OnMiniGame()) {
            let wx = Laya.Browser.window.wx;
            let fs = wx.getFileSystemManager()
            fs.unlinkSync(filePath)
        }
    }

    public RemoveFile(filePath: string, onSuccess: Function, onFail: Function) {
        if (CommonUtil.OnMiniGame()) {
            let wx = Laya.Browser.window.wx;
            let fs = wx.getFileSystemManager()
            fs.unlink({
                filePath: filePath,
                success() {
                    Log.Debug("remove file success")
                    if (onSuccess) onSuccess();
                },
                fail(res) {
                    Log.Debug("remove file fail" + res.errMsg)
                    if (onFail) onFail(res.errMsg);
                }
            })
        } else {
            if (onFail) onFail();
        }
    }

    /**
     * 移动临时文件文件到新路径, 原来的临时文件路径不可用.
     * @param tempFilePath 
     * @param destFilePath 
     * @param onSuccess 
     * @param onFail 
     */
    public SaveTempFile(tempFilePath: string, destFilePath: string, onSuccess: Function, onFail: Function) {
        if (CommonUtil.OnMiniGame()) {
            let wx = Laya.Browser.window.wx;
            let fs = wx.getFileSystemManager()
            fs.saveFile({
                tempFilePath: tempFilePath,
                filePath: destFilePath,
                success() {
                    Log.Debug("save file success")
                    if (onSuccess) onSuccess();
                },
                fail(res) {
                    Log.Debug("save file fail" + res.errMsg)
                    if (onFail) onFail(res.errMsg);
                }
            })
        } else {
            if (onFail) onFail();
        }
    }

    public SaveTempFileSyn(tempFilePath: string, destFilePath: string): boolean {
        if (CommonUtil.OnMiniGame()) {
            let wx = Laya.Browser.window.wx;
            let fs = wx.getFileSystemManager()
            try {
                let ret = fs.saveFileSync(tempFilePath, destFilePath);
                return true;
            } catch (error) {
                Log.Error("save temp file fail:" + error.errmsg)
                return false;
            }
        } else {
            Log.Error("save temp file fail: not in wechat")
            return false;
        }
    }

    public WriteAndCreate(filePath: string, content: string, onSuccess: Function, onFail: Function) {
        this.HasFile(filePath,
            () => {
                //有文件
                this.RemoveFileSyn(filePath)
                this.WriteToFile(filePath, content, onSuccess, onFail)
            },
            () => {
                this.WriteToFile(filePath, content, onSuccess, onFail)
            })
    }

    private WriteToFile(filePath: string, content: string, onSuccess: Function, onFail: Function) {
        if (CommonUtil.OnMiniGame()) {
            let wx = Laya.Browser.window.wx;
            let fs = wx.getFileSystemManager()
            fs.writeFile({
                filePath: filePath,
                data: content,
                encoding: "utf8",
                success() {
                    Log.Debug("WriteToFile success")
                    if (onSuccess) onSuccess();
                },
                fail(res) {
                    Log.Debug("WriteToFile fail" + res.errMsg)
                    if (onFail) onFail(res.errMsg);
                }
            })
        } else {
            if (onFail) onFail();
        }


    }

    //获取该小程序下已保存的本地缓存文件列表
    public GetSavedFileList(onSuccess: Function, onFail: Function) {
        if (CommonUtil.OnMiniGame()) {
            Log.Debug("GetSavedFileList");
            let wx = Laya.Browser.window.wx;
            let fs = wx.getFileSystemManager()
            fs.getSavedFileList({
                success: (res) => {
                    Log.Debug("GetSavedFileList success " + res.fileList.length);
                    //成功回调参数的结构：https://developers.weixin.qq.com/minigame/dev/api/FileSystemManager.getSavedFileList.html
                    if (onSuccess) {
                        onSuccess(res.fileList);
                    }
                },
                fail: (obj) => {
                    Log.Debug("GetSavedFileList fail " + obj);
                    if (onFail) {
                        onFail();
                    }
                }
            });
        } else {
            if (onFail) {
                onFail();
            }
        }
    }


    // public NavigateToMiniProgram(appId: string, onSuccess: Function, onFail: Function) {
    //     if (CommonUtil.OnMiniGame()) {
    //         let wx = Laya.Browser.window.wx;
    //         wx.navigateToMiniProgram({
    //             appId: appId,	//目标小游戏的appId，必须与当前小游戏属于同一个公众号
    //             path: "",	//跳转后的场景，没研究过，我这里直接传空值跳主场景
    //             extraData: {
    //                 foo: 'bar'	//带参数跳转
    //             },
    //             envVersion: 'release',	//跳转的目标小游戏版本，develop（开发版），trial（体验版），release（正式版）
    //             success(res) {
    //                 Log.Debug(" navi sucdess:" + Object.getOwnPropertyNames(res))
    //                 //Log.Debug("my navigate", res)
    //                 if (onSuccess) onSuccess()
    //             },
    //             fail(res) {
    //                 Log.Debug(" navi faile:" + Object.getOwnPropertyNames(res))
    //                 if (onFail) onFail(res);
    //             }
    //         }
    //         )
    //     } else {
    //         if (onFail) onFail();
    //     }
    // }



    //微信开发者档案相关请参照 https://developers.weixin.qq.com/minigame/dev/tutorial/open-ability/open-data.html
    /**
     * 向开放域发送消息，并接收开放域返回过来的数据，
     * 可根据发送参数和接收数据在主域这边进行下步处理
     * @param message 消息内容，格式必带一个“cmd”，其他随意
     */
    public static wxPostMessage(message: any): void {
        let wx = Laya.Browser.window.wx;
        if (wx != undefined) {
            let openDataContext = wx.getOpenDataContext();
            openDataContext.postMessage(message);
            // if(callback!=null&&callback!=undefined){
            //     Laya.timer.once(400,this,function():void{
            //         //回调处理
            //         if(caller == null || caller == undefined){
            //             callback(message);
            //         }else{
            //             caller.callback(message);
            //         }
            //     });
            // }
        }
    }
    /**
     * 主域子域均可调用，向微信服务器发送存储信息
     * @param dataList 要修改的KV数据列表，格式[{key:key1,value:value1},{key:key2,value:value2},...]，key与value均要求是string
     * @param successCB 成功回调
     * @param failCB 失败回调
     * @param completeCB 接口调用结束的回调（调用成功、失败都会执行）
     */
    public static wxSetUserCloudStorage(dataList: any, successCB?: Handler, failCB?: Handler, completeCB?: Handler) {
        let wx = Laya.Browser.window.wx;
        if (wx != undefined) {
            wx.setUserCloudStorage({
                KVDataList: dataList,
                success: (res) => {
                    //console.log('setUserCloudStorage', 'success', res);
                    //回调处理
                    if (successCB != null && successCB != undefined) {
                        successCB.runWith(res);
                    }
                },
                fail: (res) => {
                    //console.log('setUserCloudStorage', 'fail', res);
                    //回调处理
                    if (failCB != null && failCB != undefined) {
                        failCB.runWith(res);
                    }
                },
                complete: (res) => {
                    //console.log('setUserCloudStorage', 'complete', res);
                    //回调处理
                    if (completeCB != null && completeCB != undefined) {
                        completeCB.runWith(res);
                    }
                }
            });
        }
    }

    /**
     * 主域子域均可调用，移除存储的角色信息
     * @param dataList 要移除的KV数据列表，格式[key1,key2...]，要求是string
     * @param successCB 成功回调
     * @param failCB 失败回调
     * @param completeCB 接口调用结束的回调（调用成功、失败都会执行）
     */
    public static wxRemoveUserCloudStorage(dataList: any, successCB?: Handler, failCB?: Handler, completeCB?: Handler) {
        let wx = Laya.Browser.window.wx;
        if (wx != undefined) {
            wx.removeUserCloudStorage({
                keyList: dataList,
                success: (res) => {
                    //console.log('removeUserCloudStorage', 'success', res);
                    //回调处理
                    if (successCB != null && successCB != undefined) {
                        successCB.runWith(res);
                    }
                },
                fail: (res) => {
                    //console.log('removeUserCloudStorage', 'fail', res);
                    //回调处理
                    if (failCB != null && failCB != undefined) {
                        failCB.runWith(res);
                    }
                },
                complete: (res) => {
                    //console.log('removeUserCloudStorage', 'complete', res);
                    //回调处理
                    if (completeCB != null && completeCB != undefined) {
                        completeCB.runWith(res);
                    }
                }
            });
        }
    }

    /**
     * 向本地发送存储信息
     * @param key key值，string格式
     * @param value value值，Object或string格式
     * @param successCB 成功回调
     * @param failCB 失败回调
     * @param completeCB 接口调用结束的回调（调用成功、失败都会执行）
     */
    public static wxSetStorage(key: string, value: any, successCB?: Handler, failCB?: Handler, completeCB?: Handler) {
        let wx = Laya.Browser.window.wx;
        if (wx != undefined) {
            wx.setStorage({
                key: key,
                data: value,
                success: (res) => {
                    //console.log('setLocalStorage', 'success', res);
                    //回调处理
                    if (successCB != null && successCB != undefined) {
                        successCB.runWith(res);
                    }
                },
                fail: (res) => {
                    //console.log('setLocalStorage', 'fail', res);
                    //回调处理
                    if (failCB != null && failCB != undefined) {
                        failCB.runWith(res);
                    }
                },
                complete: (res) => {
                    //console.log('setLocalStorage', 'complete', res);
                    //回调处理
                    if (completeCB != null && completeCB != undefined) {
                        completeCB.runWith(res);
                    }
                }
            });
        }
    }

    public wxSetStorageSync(key: string, value: any) {
        let wx = Laya.Browser.window.wx;
        if (wx != undefined) {
            try {
                wx.setStorageSync(key, value);
            } catch (e) {
                Log.Error("setStorageSync error:" + Object.getOwnPropertyNames(e) + " object:" + e)
            }
        }
    }

    /**
     * 从本地获取存储信息
     * @param key key值，string格式
     * @param successCB 成功回调，回传成功数据
     * @param failCB 失败回调
     * @param completeCB 接口调用结束的回调（调用成功、失败都会执行）
     */
    public static wxGetStorage(key: string, successCB?: Handler, failCB?: Handler, completeCB?: Handler) {
        let wx = Laya.Browser.window.wx;
        if (wx != undefined) {
            wx.getStorage({
                key: key,
                success: (res) => {
                    //console.log('setLocalStorage', 'success', res);
                    //回调处理
                    if (successCB != null && successCB != undefined) {
                        successCB.runWith(res.data);
                    }
                },
                fail: (res) => {
                    //console.log('setLocalStorage', 'fail', res);
                    //回调处理
                    if (failCB != null && failCB != undefined) {
                        failCB.runWith(res);
                    }
                },
                complete: (res) => {
                    //console.log('setLocalStorage', 'complete', res);
                    //回调处理
                    if (completeCB != null && completeCB != undefined) {
                        completeCB.runWith(res);
                    }
                }
            });
        }
    }

    public wxGetStorageSync(key: string): any {
        let wx = Laya.Browser.window.wx;
        if (wx != undefined) {
            try {
                return wx.getStorageSync(key)
            } catch (e) {
                // Do something when catch error
                Log.Error("wx.getStorageSync error" + Object.getOwnPropertyNames(e) + " object:" + e)
                return null;
            }
        }
        return null
    }
    /**
     * 主域可调用，转跳到其他小程序/小游戏
     * @param appId 小程序的appid，string格式
     * @param path 打开的页面路径，如果为空则打开首页
     * @param extraData 需要传递给目标小程序的数据，目标小程序可在 App.onLaunch，App.onShow 中获取到这份数据.
     * @param envVersion develop开发版,trial体验版,release正式版(默认值).仅在当前小程序为开发版或体验版时此参数有效.如果当前小程序是正式版,则打开的小程序必定是正式版.
     * @param successCB 成功回调，回传成功数据
     * @param failCB 失败回调
     * @param completeCB 接口调用结束的回调（调用成功、失败都会执行）
     */
    public static wxNavigateToMiniProgram(appId: string, path: string, extraData: any, envVersion: string, successCB?: Handler, failCB?: Handler, completeCB?: Handler) {
        let wx = Laya.Browser.window.wx;
        if (wx != undefined) {
            wx.navigateToMiniProgram({
                appId: appId,
                path: path,
                extraData: extraData,
                envVersion: envVersion,
                success: (res) => {
                    //console.log('navigateToMiniProgram', 'success', res);
                    //回调处理
                    if (successCB != null && successCB != undefined) {
                        successCB.runWith(res.data);
                    }
                },
                fail: (res) => {
                    //console.log('navigateToMiniProgram', 'fail', res);
                    //回调处理
                    if (failCB != null && failCB != undefined) {
                        failCB.runWith(res);
                    }
                },
                complete: (res) => {
                    //console.log('navigateToMiniProgram', 'complete', res);
                    //回调处理
                    if (completeCB != null && completeCB != undefined) {
                        completeCB.runWith(res);
                    }
                }
            });
        }
    }

    /**
     * 子域可调用，获取微信服务器的存储信息
     * @param keys 要提取的key值列表，格式[key1,key2...]，要求是string
     * @param successCB 成功回调
     * @param failCB 失败回调
     * @param completeCB 接口调用结束的回调（调用成功、失败都会执行）
     */
    public static wxGetUserCloudStorage(keys: any, successCB?: Handler, failCB?: Handler, completeCB?: Handler) {
        let wx = Laya.Browser.window.wx;
        if (wx != undefined) {
            wx.getUserCloudStorage({
                keyList: keys,
                success: (res) => {
                    //console.log('getUserCloudStorage', 'success', res);
                    //回调处理
                    if (successCB != null && successCB != undefined) {
                        successCB.runWith(res);
                    }
                },
                fail: (res) => {
                    //console.log('getUserCloudStorage', 'fail', res);
                    //回调处理
                    if (failCB != null && failCB != undefined) {
                        failCB.runWith(res);
                    }
                },
                complete: (res) => {
                    //console.log('getUserCloudStorage', 'complete', res);
                    //回调处理
                    if (completeCB != null && completeCB != undefined) {
                        completeCB.runWith(res);
                    }
                }
            });
        }
    }

    /**
     * 子域可调用，向微信服务器发送存储信息
     * @param keys 要提取的key值列表，格式[key1,key2...]
     * @param caller 定义域
     * @param successCB 成功回调，带一个res回调参数。res格式：https://developers.weixin.qq.com/minigame/dev/api/open-api/data/UserGameData.html
     * @param failCB 失败回调
     * @param completeCB 接口调用结束的回调（调用成功、失败都会执行）
     */
    public static wxGetFriendCloudStorage(keys: any, successCB?: Handler, failCB?: Handler, completeCB?: Handler) {
        let wx = Laya.Browser.window.wx;
        if (wx != undefined) {
            wx.getFriendCloudStorage({
                keyList: keys,
                success: (res) => {
                    //console.log('getFriendCloudStorage', 'success', res);
                    //回调处理
                    if (successCB != null && successCB != undefined) {
                        successCB.runWith(res);
                    }
                },
                fail: (res) => {
                    //console.log('getFriendCloudStorage', 'fail', res);
                    //回调处理
                    if (failCB != null && failCB != undefined) {
                        failCB.runWith(res);
                    }
                },
                complete: (res) => {
                    //console.log('getFriendCloudStorage', 'complete', res);
                    //回调处理
                    if (completeCB != null && completeCB != undefined) {
                        completeCB.runWith(res)();
                    }
                }
            });
        }
    }


    public showModel(title: string, content: string, showCancel: boolean, cancelText: string, confirmText: string, onConfirmClick: Function, OnCancelClick: Function) {
        if (CommonUtil.OnMiniGame()) {
            let wx = Laya.Browser.window.wx;
            if (wx == null) {
                Log.Debug("no wx")
                return;
            }

            wx.showModal({
                title: title,
                content: content,
                success(res) {
                    if (res.confirm) {
                        Log.Debug('用户点击确定')
                        if (onConfirmClick) onConfirmClick();
                    } else {
                        Log.Debug('用户点击取消')
                        if (OnCancelClick) OnCancelClick();
                    }
                    Log.Debug("测试检测res.cancel的值:" + res.cancel)
                }
            })
        }
    }

    public GetSystemInfoSync(): any {
        if (CommonUtil.OnMiniGame()) {
            let wx = Laya.Browser.window.wx;
            if (wx == null) {
                Log.Debug("no wx")
                return null;
            }

            try {
                const res = wx.getSystemInfoSync()
                //console.log(res.model)
                //console.log(res.pixelRatio)
                //console.log(res.windowWidth)
                //console.log(res.windowHeight)
                //console.log(res.language)
                //console.log(res.version)
                //console.log(res.platform)
                return res;
            } catch (e) {
                Log.Error("wx.getSystemInfoSync error:" + e)
            }
        }
    }

    //检测是否需要
    public CheckUserAuth(onAuthored: Function, onUnauthored: Function) {
        if (CommonUtil.OnMiniGame()) {
            let wx = Laya.Browser.window.wx;
            if (wx == null) {
                Log.Debug("CheckUserAuth no wx")
                if (onUnauthored) onUnauthored();//防止微信浏览器打开没回调
                return;
            }

            wx.getSetting({
                success(res) {
                    if (!res.authSetting['scope.userInfo']) {
                        if (onUnauthored) onUnauthored();
                        // this.createUserInfoButton(buttonInfo, onAuthored)
                    } else {
                        //已经授权过
                        if (onAuthored) onAuthored();
                    }
                }
            })
        } else {
            Log.Debug("非微信平台, 不需要授权")
            if (onAuthored) onAuthored();
        }
    }

    public CreateAuthButton(buttonInfo: any, onsucceed: Function, onFail: Function) {
        if (CommonUtil.OnMiniGame()) {
            let wx = Laya.Browser.window.wx;
            if (wx == null) {
                Log.Debug("no wx")
                return;
            }

            let button = wx.createUserInfoButton(buttonInfo)
            button.onTap((res) => {
                if (res.errMsg == "getUserInfo:ok") {
                    Log.Debug("on userinfo button tap ok:" + res)
                    if (onsucceed) onsucceed();
                } else {
                    Log.Debug("on userinfo button tap error:" + res.errMsg)
                    if (onFail) onFail(res.errMsg)
                }


                button.hide()
            })
        } else {
            if (onsucceed) onsucceed();
        }
    }

    public GetUserInfo(onSuccess: Function, onFail: Function) {
        if (CommonUtil.OnMiniGame()) {
            let wx = Laya.Browser.window.wx;
            if (wx == null) {
                Log.Debug("no wx")
                if (onFail) onFail("getUserInfo是微信平台, 不是小游戏no wx");
                return;
            }
            wx.getUserInfo({
                success: function (res) {
                    let userInfo = res.userInfo
                    // let nickName = userInfo.nickName
                    // let avatarUrl = userInfo.avatarUrl
                    // let gender = userInfo.gender //性别 0：未知、1：男、2：女
                    // let province = userInfo.province
                    // let city = userInfo.city
                    // let country = userInfo.country
                    if (onSuccess) onSuccess(res.userInfo);
                },

                fail: function (error) {
                    if (onFail) onFail("wx.getUserInfo fail" + error);
                }
            })
        } else {
            if (onFail) onFail("wx.getUserInfo fail, 不是微信平台");
        }
    }

    //广告相关
    //贴片广告
    private bannerAd: any;
    //广告初始化
    private CreateBannerAd() {
        if (CommonUtil.OnMiniGame()) {
            let wx = Laya.Browser.window.wx;
            if (wx == null) {
                Log.Debug("no wx")
                return;
            }
            //布局
            //屏幕信息
            let systemInfo = wx.getSystemInfoSync();
            //要根据图片宽度选择具体的位置
            let leftPos = (systemInfo.screenWidth - 300) / 2;
            // let topPos = (systemInfo.screenHeight - 104.34);

            this.bannerAd = wx.createBannerAd({
                adUnitId: WechatConstDefine.AD_Banner_ID,
                style: {
                    left: leftPos,
                    top: 0,
                    width: 300
                }
            });

            this.bannerAd.onError(err => {
                Log.Debug("banner 广告错误：" + err);
            });

            this.bannerAd.onResize(res => {
                Log.Debug("banner广告宽高" + res.width + " " + res.height)
                Log.Debug("banner广告实际宽高" + this.bannerAd.style.realWidth + " " + this.bannerAd.style.realHeight)
            })

            this.bannerAd.onLoad(() => {
                Log.Debug("banner 广告加载成功");
                this.bannerAd.style.top = systemInfo.screenHeight - this.bannerAd.style.realHeight;
            });
        }
    }
    //广告显示
    public ShowBannerAd() {
        if (CommonUtil.OnMiniGame()) {
            let wx = Laya.Browser.window.wx;
            if (wx == null) {
                Log.Debug("no wx")
                return;
            }

            //删除旧广告
            if (this.bannerAd != null) {
                Log.Debug("have bannerAd");
                this.bannerAd.destroy();
            }
            this.CreateBannerAd();

            Log.Debug("尝试显示banner广告");
            this.bannerAd.show()
                .catch(err => Log.Debug(err)).then(() => Log.Debug('banner 广告显示'))
        }
    }
    //广告隐藏
    public HideBannerAd() {
        if (CommonUtil.OnMiniGame()) {
            let wx = Laya.Browser.window.wx;
            if (wx == null) {
                Log.Debug("no wx")
                return;
            }
            if (this.bannerAd == null) {
                Log.Debug("no bannerAd");
                return;
            }

            this.bannerAd.hide()
        }
    }

    //视频广告
    private videoAd: any;
    private videoReady: boolean = false; //广告准备结束全局标志
    public get WxVideoAdReady() {
        return this.videoReady;
    }

    /**
     * 创建视频广告全局实例
     * @param loadSucceedCB 拉取成功的回调
     * @param loadFailedCB 拉取失败的回调
     * @param videoClosedCB 视频播放结束的回调，有参数res.isEnded，true 表示用户是在视频播放完以后关闭的视频，false 表示用户在视频播放过程中关闭了视频
     */
    public CreateVideoAd(loadSucceedCB: cbhandler, loadFailedCB: cbhandler, videoClosedCB: cbhandler) {
        if (!CommonUtil.OnMiniGame()) return;
        let wx = Laya.Browser.window.wx;
        if (wx == null) {
            Log.Debug("no wx")
            return;
        }
        let util = this;

        //创建广告单例
        if (!this.videoAd) {
            Log.Debug("wx 尝试创建视频广告单例！");
            this.videoAd = wx.createRewardedVideoAd({ adUnitId: WechatConstDefine.AD_Video_ID });
            //然后注册各种回调
            //视频创建后会自动拉取一次，视频播放完成后也会自动拉取一次
            Log.Debug("wx 注册视频广告拉取成功回调！");
            //注册拉取成功与失败的回调
            this.videoAd.onLoad(() => {
                Log.Debug("wx 视频拉取成功，执行传入的回调！");
                //console.log("wx 视频拉取成功，执行传入的回调！");
                util.videoReady = true;
                if (loadSucceedCB) loadSucceedCB.exec();
            });
            Log.Debug("wx 注册视频广告拉取失败回调！");
            this.videoAd.onError(err => {
                Log.Debug("wx 视频拉取失败，错误码：" + err.errCode + " 错误信息：" + err.errMsg);
                util.videoReady = false;
                if (loadFailedCB) loadFailedCB.exec();
            });
            Log.Debug("wx 注册视频播放结束回调");
            //2019-7-30 16:19:37 经验证，onClose是一个注册方法，只需要最开始的创建时注册即可！！！！
            this.videoAd.onClose((res) => {
                // 用户点击了【关闭广告】按钮
                // 小于 2.1.0 的基础库版本，res 是一个 undefined
                if (res && res.isEnded || res === undefined) {
                    // 正常播放结束，可以下发游戏奖励
                    Log.Debug("wx 视频广告正常播放结束")
                    if (videoClosedCB) videoClosedCB.exec(true);
                } else {
                    // 播放中途退出，不下发游戏奖励
                    Log.Debug("wx 视频广告播放中途退出")
                    if (videoClosedCB) videoClosedCB.exec(false);
                }
            });
        }

    }

    /**
     * 主域可调用，拉取广告（成功观看视频之后会自动拉取，视频提前结束后需要手动拉取）。流程为拉取视频→播放视频→结束播放
     */
    public LoadVideoAd() {
        if (!CommonUtil.OnMiniGame()) return
        let wx = Laya.Browser.window.wx;
        if (wx == null) {
            Log.Debug("no wx")
            return;
        }
        if (!this.videoAd) {
            Log.Debug("no ad instance")
            return;
        }
        if (this.videoReady) {
            Log.Debug("video ready,load no more");
            return;
        }
        //尝试一次手动拉取
        Log.Debug("wx 尝试拉取视频广告！");
        this.videoAd.load();
    }

    //拉取并显示视频广告
    public ShowVideoAd(videoBeforeShowCB: cbhandler) {
        if (CommonUtil.OnMiniGame()) {
            let wx = Laya.Browser.window.wx;
            if (wx == null) {
                Log.Debug("no wx")
                return;
            }
            if (!this.videoAd) {
                Log.Debug("no vidowAd")
                return;
            }
            //视频拉取成功
            Log.Debug("wx 执行播放前回调");
            if (videoBeforeShowCB) videoBeforeShowCB.exec();
            Log.Debug("wx 广告显示！");
            this.videoAd.show();
        }
    }

    /**
      * 保存当前canvas到临时文件
      * @param topLeftX ui中的左上角
      * @param toLeftY  ui中的左上角
      * @param width  ui中的宽
      * @param height 
      * @param callback  (path:string, error:string)
      */
    public SaveCanvasToTemp(uiTopLeftX: number, uiTopLeftY: number, uiwidth: number, uiheight: number, callback: Function) {
        if (CommonUtil.OnMiniGame()) {
            let wx = Laya.Browser.window.wx;
            if (wx == null) {
                Log.Debug("no wx")
                callback(null, "no wx");
                return;
            }


            let sysInfo = this.GetSystemInfoSync();
            // Log.Debug("width: " + Laya.stage.width + " " + Laya.Browser.width + " " + sysInfo.windowWidth);
            // Log.Debug("height: " + Laya.stage.height + " " + Laya.Browser.height + " " + sysInfo.windowHeight);
            // Log.Debug("ratio:" + sysInfo.pixelRatio + " " + Laya.Browser.pixelRatio);
            // Log.Debug("canvas width :" + canvas.width + " " + canvas.height);
            //根据canvas的宽高和ui design宽高进行换算
            let canvasWidth = canvas.width;
            let canvasHeight = canvas.height;
            let x = uiTopLeftX / Laya.stage.width * canvasWidth;
            let y = uiTopLeftY / Laya.stage.height * canvasHeight;
            let width = uiwidth / Laya.stage.width * canvasWidth;
            let height = uiheight / Laya.stage.height * canvasHeight;
            //Log.Debug("topX :" + x + " topY " + y + "width :" + width + " height " + height);

            canvas.toTempFilePath({//当前画布
                x: x,
                y: y,
                width: width,
                height: height,
                destWidth: width,
                destHeight: height,
                success: (res) => {
                    callback(res.tempFilePath)
                    // wx.shareAppMessage({
                    // 	imageUrl: res.tempFilePath
                    // });
                },
                fail: (err) => {
                    Log.Warn("canvas save to temp error;" + err.errMsg)
                    callback(null, err.errMsg)
                    // wx.shareAppMessage({
                    // 	imageUrl: res.tempFilePath
                    // });
                }
            });
        } else {
            callback(null, "not in wechat");
        }
    }

    /**
      * 在离线画布上创建一张背景+文字
      * 删除产生的临时文件, 移动到userdata路径'/MyLayaGameTemp/ShareImageAtOffCanvas.png'
      * @param idiom 
      * @param pronunctiation 
      * @param bgImagePath 背景图本地地址
      * @param canvasWidth 画布宽高
      * @param canvasHeight 
      * @param callback callback(tempPath, err.errMsg)
      */
    public CreateShareImageAtOfflineCanvas(idiom: string, pronunctiation: string, bgImagePath: string, canvasWidth: number, canvasHeight: number, callback: Function) {
        if (CommonUtil.OnMiniGame()) {
            let wx = Laya.Browser.window.wx;
            if (wx == null) {
                Log.Debug("no wx")
                callback(null, "no wx");
                return;
            }
            let width = canvasWidth;
            let height = canvasHeight;
            //创建离线画布
            let canvas1 = wx.createCanvas();
            canvas1.width = width
            canvas1.height = height
            let context = canvas1.getContext("2d");
            //加载背景
            let image = wx.createImage();
            image.src = bgImagePath;
            // let image_ = wx.createImage();
            // image_.src = bgImagePath;
            // image.width = 300;
            // image.height = 300;
            image.onerror = function (error) {
                Log.Debug("image error" + error.errMsg);
            }
            image.onload = () => {
                Log.Debug("image loaded");
                //先画图 防止字体被覆盖
                context.drawImage(image, 0, 0, width, height);
                // context.drawImage(image_, 100, 100, width + 20, height + 20);
                // context.drawImage("res/texture/btn2_auth.png", 100, 100, width + 10, height + 10)
                //添加字体
                context.font = '25px Arial' //宋体 黑体
                context.fillStyle = '#000000' //黑色字体
                context.textBaseline = 'top'//'middle' //垂直方向顶部对齐
                context.textAlign = 'center'//水平居中
                // let width = context.measureText("123") //文字的长度
                // Log.Debug("widht " + width.width)
                //
                context.fillText(pronunctiation, width / 2, height / 2 - (40 + 25) / 2);//context.fillText(idiom, width / 2, 0)// 添加第3个参数后 textbaseLine失去作用. context.fillText("testqq", 150, 50, 100);
                context.font = '40px Arial' //宋体 黑体
                context.fillStyle = '#000000' //黑色字体
                context.textBaseline = 'top'//'middle' //垂直方向顶部对齐
                context.textAlign = 'center'//水平居中
                context.fillText(idiom, width / 2, height / 2);//从顶部改成居中//context.fillText(idiom, width / 2, 60)
                //保存
                canvas1.toTempFilePath({//当前画布
                    x: 0,
                    y: 0,
                    width: width,
                    height: height,
                    destWidth: width,
                    destHeight: height,
                    success: (res) => {
                        let targetPath = this.GetWXUserDataPath() + '/MyLayaGameTemp/ShareImageAtOffCanvas.png'
                        let moved = this.MoveTempFileSync(res.tempFilePath, targetPath)
                        if (moved) {
                            callback(targetPath)
                        } else {
                            callback(res.tempFilePath)
                        }
                    },
                    fail: (err) => {
                        Log.Warn("canvas save to temp error;" + err.errMsg)
                        callback(null, err.errMsg)
                    }
                });
            }
        } else {
            callback(null, "not in wechat");
        }
    }

    /**
     * 移动temp文件到其他位置, 删除temp文件
     * @param fromTempPath temp全路径
     * @param toPath 全路径
     */
    public MoveTempFileSync(fromTempPath: string, toPath: string): boolean {
        Log.Debug("save to temp:" + fromTempPath + " move to " + toPath)
        let dir = toPath.substr(0, toPath.lastIndexOf('/') + 1);
        let targetDir = dir
        let targetPath = toPath
        let created = this.CreateDirectorySync(targetDir, true)
        Log.Debug("save to temp:" + fromTempPath + " move to " + targetPath)
        if (created && this.SaveTempFileSyn(fromTempPath, targetPath)) {
            if (this.HasFileSync(fromTempPath)) this.RemoveFileSyn(fromTempPath)
            return true;
        } else {
            return false;
        }
    }

    //初始化微信声音池
    public InitSoundPool(audioUrl: string, num: number) {
        if (CommonUtil.OnMiniGame()) {
            let wx = Laya.Browser.window.wx;
            if (wx == null) {
                Log.Debug("InitSoundPool no wx")
                return;
            }
            for (let index = 0; index < num; index++) {
                let sound = wx.createInnerAudioContext()
                sound.src = audioUrl;
                laya.utils.Pool.recover(audioUrl, sound);
            }
        }
    }

    public PlaySound(audioUrl: string, loops: boolean, onComplete: Function, volume: number = 1) {
        if (CommonUtil.OnMiniGame()) {
            let wx = Laya.Browser.window.wx;
            if (wx == null) {
                Log.Debug("PlaySound no wx")
                return;
            }
            var sound = laya.utils.Pool.getItem(audioUrl);
            if (sound == null) {
                sound = wx.createInnerAudioContext()
                sound.src = audioUrl;
            }
            sound.loop = loops;
            sound.volume = volume;
            sound.play();
            //Log.Debug("play audio %s", audioUrl)
            let cbFunc = () => {
                //Log.Debug("on wx audio end %s", audioUrl)
                laya.utils.Pool.recover(audioUrl, sound);
                sound.offEnded(cbFunc)//解除事件,否则重复监听, 会泄漏
                sound.offStop(cbOnStopFunc)//解除事件,否则重复监听, 会泄漏
                if (onComplete) onComplete();
            }

            let cbOnStopFunc = () => {
                //Log.Debug("on wx audio stoped %s", audioUrl)
                laya.utils.Pool.recover(audioUrl, sound);
                sound.offEnded(cbFunc)//解除事件,否则重复监听, 会泄漏
                sound.offStop(cbOnStopFunc)//解除事件,否则重复监听, 会泄漏
            }
            sound.onEnded(cbFunc) //自然播放结束
            sound.onStop(cbOnStopFunc) //停止播放结束

            return sound;
        }

        return null;
    }

    public StopSound(sound: any, audioUrl: string) {
        if (CommonUtil.OnMiniGame()) {
            let wx = Laya.Browser.window.wx;
            if (wx == null) {
                Log.Debug("StopSound no wx")
                return;
            }
            // let cbFunc = () => {
            //     laya.utils.Pool.recover(audioUrl, sound);
            //     sound.offStop(cbFunc)//解除事件,否则重复监听, 会泄漏
            // }
            // sound.onStop(cbFunc) //停止播放结束
            sound.stop();

        }
    }

    //是否iphone
    public IsPhonXModel(): boolean {
        if (CommonUtil.OnMiniGame()) {
            let wx = Laya.Browser.window.wx;
            if (wx == null) {
                Log.Debug("StopSound no wx")
                return false;
            }
            let systemInfo = this.GetSystemInfoSync();
            let model = systemInfo.model;
            if (model.search('iPhone X') != -1) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    //右上角胶囊按钮距离屏幕顶的距离
    public WechatTop(): number {
        if (CommonUtil.OnMiniGame()) {
            let wx = Laya.Browser.window.wx;
            if (wx == null) {
                Log.Debug("StopSound no wx")
                return 0;
            }

            let menuInfo = wx.getMenuButtonBoundingClientRect();//距离屏幕的左上角的屏幕坐标信息
            let systemInfo = this.GetSystemInfoSync();
            var paddingTop = Laya.stage.height * (menuInfo.top / systemInfo.windowHeight); //systemInfo.safeArea.top / systemInfo.windowHeight;//
            //console.log("paddingTop " + paddingTop);
            return paddingTop;
        } else {
            return 0;
        }
    }

    public OnKeyboardComplete(cb: Function) {
        if (CommonUtil.OnMiniGame()) {
            //小游戏环境
            let wx = Laya.Browser.window.wx;
            if (wx == null) {
                Log.Debug("no wx")
                return;
            }
            //此方法为注册监听，因此只需要调用一次
            wx.onKeyboardComplete((value) => {
                if (cb) {
                    cb.call(value);
                }
            });
        }
    }

    public OnKeyboardConfirm(cb: Function) {
        if (CommonUtil.OnMiniGame()) {
            //小游戏环境
            let wx = Laya.Browser.window.wx;
            if (wx == null) {
                Log.Debug("no wx")
                return;
            }
            //此方法为注册监听，因此只需要调用一次
            wx.onKeyboardConfirm((value) => {
                if (cb) {
                    cb.call(value);
                }
            });
        }
    }

    /**
     * 加快内存清理
     */
    public triggerGC() {
        if (CommonUtil.OnMiniGame()) {
            //小游戏环境
            let wx = Laya.Browser.window.wx;
            if (wx == null) {
                Log.Debug("no wx")
                return;
            }
            //此方法为注册监听，因此只需要调用一次
            wx.triggerGC();
        }
    }

}