/*
* name;
*/
var CommonUtil = (function () {
    function CommonUtil() {
    }
    // 判断是否时复杂值（对象值）
    CommonUtil.isObject = function (m) {
        return (typeof m === 'function' || (typeof m === 'object' && m !== null));
    };
    // 判断是否是原始值
    CommonUtil.isNative = function (m) {
        return (m === null || (typeof m !== 'object' && typeof m !== 'function'));
    };
    /**
     * 获取文件名
     * @param path 文件路径
     * @param withSuffix 是否包含后缀
     */
    CommonUtil.GetFileName = function (path, withSuffix) {
        if (withSuffix === void 0) { withSuffix = false; }
        var startIndex = path.lastIndexOf('/') + 1;
        if (startIndex < 0)
            startIndex = 0;
        var endIndex = path.length;
        if (!withSuffix) {
            var indexOfDot = path.lastIndexOf('.');
            if (indexOfDot >= 0)
                endIndex = indexOfDot;
        }
        var len = endIndex - startIndex;
        var fileName = path.substr(startIndex, len);
        return fileName;
    };
    /**
     * 从路径中获取路径 返回 dir/dir2格式的目录
     * @param path 要获取目录的路径
     */
    CommonUtil.GetDirName = function (path) {
        var startIndex = 0;
        //去除首部 /
        while (path.charAt(startIndex) == '/') {
            startIndex++;
        }
        //不包含尾部的/
        var endIndex = path.lastIndexOf('/');
        if (endIndex < 0)
            endIndex = path.length;
        var len = endIndex - startIndex;
        var dirName = path.substr(startIndex, len); ///resInfo.filepath.substring(0, resInfo.filepath.indexOf('/'));
        return dirName;
    };
    /**
     *  加载二进制文件, 使用LittleEndian解析成Uint8Array
     * @param filePath
     * @param comFunc
     */
    CommonUtil.LoadProtoBytesFile = function (filePath, comFunc) {
        var _this = this;
        ResourceManager.GetInstance().loadBytesFile(filePath, function (callback) {
            if (callback.Ok) {
                //返回的proto消息体
                var bytes = _this.ConvertArrayBuffer(callback.Param);
                var mbuffer = bytes.getUint8Array(bytes.pos, bytes.length);
                comFunc(mbuffer);
            }
            else {
                comFunc(null);
            }
        });
    };
    /**
     * 转换arraybuffer成二进制数组
     * @param buffer
     */
    CommonUtil.ConvertArrayBuffer = function (buffer) {
        var recivBytes = new Laya.Byte();
        recivBytes.endian = Laya.Byte.LITTLE_ENDIAN; //Unity导出的字节配置默认是little endian. 网络消息是BigEndian
        recivBytes.clear();
        recivBytes.writeArrayBuffer(buffer);
        recivBytes.pos = 0;
        //返回二进制数组
        //let mbuffer: Uint8Array = recivBytes.getUint8Array(recivBytes.pos, recivBytes.length)
        return recivBytes;
    };
    CommonUtil.calcCurve = function (from, vel1, to, vel2, t) {
        return (1 - 3 * t * t + 2 * t * t * t) * from + t * (1 - t) * (1 - t) * vel1
            + (3 * t * t - 2 * t * t * t) * to - t * t * (1 - t) * vel2;
    };
    CommonUtil.lerp = function (from, to, t) {
        return to * t + from * (1 - t);
    };
    CommonUtil.LerpNum = function (from, to, t) {
        return this.lerp(from, to, t);
    };
    /**
     * 添加http头
     * @param url 需要添加http头的地址
     */
    CommonUtil.FormatURL = function (url) {
        if (this.IsUrlFormated(url))
            return url;
        if (ResPathConst.USE_WEB_RES) {
            if (url.url) {
                url.url = ResPathConst.RES_URL_HEADER + url.url;
            }
            else {
                url = ResPathConst.RES_URL_HEADER + url;
            }
            return url;
        }
        else {
            return url;
        }
    };
    CommonUtil.FormatURLArray = function (urls) {
        var urllist = [];
        for (var index = 0; index < urls.length; index++) {
            var element = urls[index];
            urllist.push(this.FormatURL(element));
        }
        return urllist;
    };
    /**
     * 去除url中添加的http头
     * @param url
     */
    CommonUtil.ReformatURL = function (url) {
        if (!this.IsUrlFormated(url))
            return url; //本身没有添加http头 直接返回
        if (ResPathConst.USE_WEB_RES) {
            var stringUrl = this.ConverUrlObject(url);
            stringUrl = stringUrl.substring(stringUrl.indexOf(ResPathConst.RES_URL_HEADER) + ResPathConst.RES_URL_HEADER.length);
            if (url.url) {
                url.url = stringUrl;
            }
            else {
                url = stringUrl;
            }
            return url;
        }
        else {
            return url;
        }
    };
    CommonUtil.ReformatURLArray = function (urls) {
        var urllist = [];
        for (var index = 0; index < urls.length; index++) {
            var element = urls[index];
            urllist.push(this.ReformatURL(element));
        }
        return urllist;
    };
    /**
     * 检测url是否添加了http路径头
     * @param urlToCheck
     */
    CommonUtil.IsUrlFormated = function (urlToCheck) {
        if (ResPathConst.USE_WEB_RES) {
            var url = this.ConverUrlObject(urlToCheck);
            return url.indexOf(ResPathConst.RES_URL_HEADER) >= 0;
        }
        else {
            return true;
        }
    };
    /**
     * 从Object中获取url string
     * @param urlObject
     */
    CommonUtil.ConverUrlObject = function (urlObject) {
        return urlObject.url ? urlObject.url : urlObject;
    };
    CommonUtil.OnWeiXin = function () {
        return Laya.Browser.onWeiXin;
    };
    CommonUtil.OnMiniGame = function () {
        return Laya.Browser.onMiniGame;
    };
    //两个矩形相交检测
    CommonUtil.isBoxCrossed = function (boxCenter1, boxSize1, boxCenter2, boxSize2) {
        var vectorCenter = boxCenter2.sub(boxCenter1); //重心的连线
        var boxCompareSize = boxSize1.add(boxSize2).mul(0.5); //用来对比的大小
        //1 x轴投影
        var xProj = Math.abs(vectorCenter.dot(Vec2.RIGHT));
        //1 y轴投影
        var yProj = Math.abs(vectorCenter.dot(Vec2.UP));
        if ((xProj <= boxCompareSize.x || boxCompareSize.x <= 0) && (yProj <= boxCompareSize.y || boxCompareSize.y <= 0)) {
            //2个方向的投影长度都<长宽/2[某个方向同轴不用比较], 就相交
            return true;
        }
        else {
            return false;
        }
    };
    CommonUtil.IsBoxCrossed = function (box1, box2) {
        return CollisionUtil.IsBoxCrossed(box1, box2);
    };
    CommonUtil.IsBoxPointCrossed = function (box1, point) {
        return CollisionUtil.IsBoxPointCrossed(box1, point);
    };
    /**
     * 检测点是否在扇形内 , 计算在正常坐标系内,  x右为正, y上为正, 默认扇形0度为y轴, sectorAngle左右各增加一半.
     * @param checkPoint 检测点
     * @param sectorCenter 扇形中心
     * @param radius 扇形半径
     * @param sectorAngle 扇形角度
     * @param rotation 扇形旋转角度
     * @param isLayaCo 是否laya2d坐标 laya y下为正//计算在正常坐标系内,  x右为正, y上为正
     */
    CommonUtil.IsPointInSector = function (checkPoint, sectorCenter, radius, sectorAngle, rotation, isLayaCo) {
        if (isLayaCo === void 0) { isLayaCo = true; }
        return CollisionUtil.IsPointInSector(checkPoint, sectorCenter, radius, sectorAngle, rotation, isLayaCo);
    };
    /**
     * 根据旋转角度,获取旋转后x轴,y轴的向量
     * @param rotationAngle 旋转角度
     * @param counterClockwise laya是顺时针为正, 设置false; 平常数学坐标系统逆时针旋转为正
     */
    CommonUtil.GetXAxisInNormalCoByAngle = function (rotationAngle, counterClockwise) {
        if (counterClockwise === void 0) { counterClockwise = false; }
        if (!counterClockwise)
            rotationAngle *= -1;
        var radian = rotationAngle / 180 * Math.PI; //转成弧度
        var axis1 = new Vec2(Math.cos(radian), Math.sin(radian)); //x
        return axis1;
    };
    /**
     * 根据旋转角度,获取旋转后y轴的向量
     * @param rotationAngle
     * @param counterClockwise
     */
    CommonUtil.GetYAxisInNormalCoByAngle = function (rotationAngle, counterClockwise) {
        if (counterClockwise === void 0) { counterClockwise = false; }
        if (!counterClockwise)
            rotationAngle *= -1;
        var radian = rotationAngle / 180 * Math.PI; //转成弧度
        var axis2 = new Vec2(-Math.sin(radian), Math.cos(radian)); //y
        return axis2;
    };
    /**
     * 直线和扇形是否相交
     * @param linePoint1 线段点
     * @param linePoint2
     * @param sectorCenter 扇形中心
     * @param radius 半径
     * @param sectorAngle 角度[0度朝向为 普通数字坐标系向上的y正轴]
     * @param rotation 扇形旋转角度[计算中使用逆时针为正]
     * @param isLayaCo 在laya坐标中: 顺时针旋转为正, 同时y向下为正.
     */
    CommonUtil.IsLineCrossedInSector = function (linePoint1, linePoint2, sectorCenter, radius, sectorAngle, rotation, isLayaCo) {
        if (isLayaCo === void 0) { isLayaCo = true; }
        return CollisionUtil.IsLineCrossedInSector(linePoint1, linePoint2, sectorCenter, radius, sectorAngle, rotation, isLayaCo);
    };
    /**
     * 检测矩形和扇形碰撞
     * @param collisionInfo
     * @param sectorCollisionInfo
     * @param isLayaCo
     */
    CommonUtil.IsBoxCrossedSector = function (collisionInfo, sectorCollisionInfo, isLayaCo) {
        if (isLayaCo === void 0) { isLayaCo = true; }
        return CollisionUtil.IsBoxCrossedSector(collisionInfo, sectorCollisionInfo, isLayaCo);
    };
    /**
     * 检测点是否在园内
     * @param checkPoint 检测点
     * @param sectorCenter 中心
     * @param radius 半径
     */
    CommonUtil.IsPointInCircle = function (checkPoint, sectorCenter, radius) {
        return CollisionUtil.IsPointInCircle(checkPoint, sectorCenter, radius);
    };
    /**
     * 获取点在线段上的投影
     * 在正常坐标系内计算
     * @param point
     * @param linePoint1
     * @param linePoint2
     */
    CommonUtil.GetProjectionPointToLine = function (point, linePoint1, linePoint2) {
        return CollisionUtil.GetProjectionPointToLine(point, linePoint1, linePoint2);
    };
    //直线 p1-p2 是否相交 p3-p4
    CommonUtil.LineLineCrossed = function (p1, p2, p3, p4) {
        return CollisionUtil.LineLineCrossed(p1, p2, p3, p4);
    };
    /**
     *
     * @param vec 向量
     * @param angle  旋转角度
     * @param counterClockwise 是否逆时针, laya默认逆时针
     */
    CommonUtil.RotateVector = function (vec, angle, counterClockwise) {
        if (counterClockwise === void 0) { counterClockwise = false; }
        angle *= counterClockwise ? 1 : -1;
        var radian = this.GetRadian(angle);
        var cos = Math.cos(radian);
        var sin = Math.sin(radian);
        var newX = cos * vec.x - sin * vec.y;
        var newY = sin * vec.x + cos * vec.y;
        return new Vec2(newX, newY);
    };
    CommonUtil.GetRadian = function (angle) {
        return angle / 180 * Math.PI; //转成弧度
    };
    /**
 * 屏幕保存成base64, 可以设置屏幕的截图位置
 * 也可以用sprite.drawToCanvas对sprite进行转base64
 */
    CommonUtil.SaveScreenToBase64 = function () {
        var htmlCanvas = Laya.stage.drawToCanvas(Laya.stage.width, Laya.stage.height, 0, 0);
        //var canvas = htmlCanvas.getCanvas();
        htmlCanvas.toBase64("image/png", 0.92, function (base64) {
            //trace(base64);//打印图片base64信息，可以发给服务器或者保存为图片
            // //pc 弹窗保存
            // var url = base64.replace("image/png", "image/octet-stream");
            // window.location.href = url; // 下载图片   
            // var canvas = htmlCanvas.getCanvas();
            // this.downLoadImage(canvas, "hah")
        });
        //laya 显示截图
        // var _texture:Laya.Texture = new Laya.Texture(htmlCanvas);
        //     //将截屏的texture进行draw绘制并显示到舞台
        //     var sp2:Laya.Sprite = new Laya.Sprite();
        //     sp2.x = 300; //sp2.pos();
        //     sp2.graphics.drawTexture(_texture,0,0,100,100);
        //     Laya.stage.addChild(sp2);
    };
    //pc 弹窗保存
    CommonUtil.downLoadImage = function (canvas, name) {
        var a = document.createElement("a");
        a.href = canvas.toDataURL();
        a.download = name; //pc打开窗口 保存成文件名
        a.click();
    };
    /**
     * 将data保存成文件
     * @param fileName 文件名
     * @param data 数据内容json/bytes
     *
     * let recivBytes = new Laya.Byte();
        recivBytes.writeInt16(12);
        let buffer = recivBytes.buffer;
        this.exportRaw("nametext.bin", buffer)
     */
    CommonUtil.exportRawText = function (fileName, data) {
        var urlObject = window.URL || window.webkitURL || window;
        var export_blob = new Blob([data]);
        var save_link = document.createElementNS("http://www.w3.org/1999/xhtml", "a");
        save_link.href = urlObject.createObjectURL(export_blob);
        save_link.download = fileName;
        this.fakeClick(save_link);
    };
    CommonUtil.fakeClick = function (obj) {
        var ev = document.createEvent("MouseEvents");
        ev.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        obj.dispatchEvent(ev);
    };
    //创建UI实例
    CommonUtil.CreateUICtrl = function (id, parent) {
        var uictrl = ui.UIFactory.Create(id);
        uictrl.Init(parent, id);
        return uictrl;
    };
    // /**
    //  * 检测texture上像素点是否透明
    //  * @param texture 
    //  * @param posOnTexture 
    //  */
    // public static IsTransparent(texture: Laya.Texture, posOnTexture: Laya.Vector2): boolean {
    //     if (texture) {
    //         let pixels = texture.getPixels(posOnTexture.x, posOnTexture.y, 1, 1);
    //         return pixels[3] == 0; //rgba a为0就是透明
    //     } else {
    //         Log.Warn("texture为空, 无法检测像素是否透明")
    //         return false;
    //     }
    // }
    // /**
    //  * 检测checkPoint是否在合法范围内
    //  * @param checkPoint 
    //  * @param regionTopleft 范围左上角 
    //  * @param regionSize 范围大小
    //  */
    // public static InRegion(checkPoint: Laya.Vector2, regionTopleft: Laya.Vector2, regionSize: Laya.Vector2) {
    //     return (checkPoint.x >= regionTopleft.x && checkPoint.x <= regionSize.x + regionTopleft.x
    //         && checkPoint.y >= regionTopleft.y && checkPoint.y <= regionTopleft.y + regionSize.y)
    // }
    // /**
    //  * 实际坐标转成本地坐标, 本地坐标原点左上角,x向右, y 向下为正
    //  * @param posInWorld 世界坐标位置
    //  * @param localOriginInWorld 本地坐标原点在世界坐标中位置 
    //  */
    // public static ConverToLocal(posInWorld: Laya.Vector2, localOriginInWorld: Laya.Vector2): Laya.Vector2 {
    //     return new Laya.Vector2(posInWorld.x - localOriginInWorld.x, posInWorld.y - localOriginInWorld.y)
    // }
    //去除重复id
    CommonUtil.RemoveRepeated = function (idList) {
        var idsToLoad = [];
        //去除重复id
        for (var index = 0; index < idList.length; index++) {
            var element = idList[index];
            if (idsToLoad.indexOf(element) < 0)
                idsToLoad.push(element);
        }
        return idsToLoad;
    };
    CommonUtil.GetUID = function () {
        return this.uid++;
    };
    //遍历enum
    CommonUtil.LoopEnum = function (enumType) {
        var allEnumNum = [];
        for (var a in enumType) {
            var ret = parseInt(a);
            if (ret) {
                allEnumNum.push(ret);
            }
        }
        return allEnumNum;
    };
    CommonUtil.GetRequest = function () {
        var url = location.search;
        var theRequest = new Object();
        var index = url.indexOf("?");
        if (index != -1) {
            var str = url.substr(index + 1);
            var strs = str.split("&");
            for (var i = 0; i < strs.length; i++) {
                theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
            }
        }
        return theRequest;
    };
    /**
      * 去除当前url中paramKey=xxx的参数
      * @param paramKey
      */
    CommonUtil.RemoveURLParam = function (paramKey) {
        var url = window.location.href; //页面url
        var urlParam = window.location.search.substr(1); //页面参数 ?后面
        var beforeUrl = url.substr(0, url.indexOf("?")); //页面主地址（参数之前地址）
        var nextUrl = "";
        var arr = new Array();
        if (urlParam != "") {
            var urlParamArr = urlParam.split("&"); //将参数按照&符分成数组
            for (var i = 0; i < urlParamArr.length; i++) {
                var paramArr = urlParamArr[i].split("="); //将参数键，值拆开
                //如果键雨要删除的不一致，则加入到参数中
                if (paramArr[0] != paramKey) {
                    arr.push(urlParamArr[i]);
                }
            }
        }
        if (arr.length > 0) {
            nextUrl = "?" + arr.join("&");
        }
        url = beforeUrl + nextUrl;
        return url;
        //window.history.pushState({},"Title",GameUtil.RemoveURLParam(ConstDefine.PAY_RES_KEY));//去除url中的参数,但不刷新页面
    };
    CommonUtil.ExchangeArray = function (array, index1, index2) {
        var temp = array[index1];
        array[index1] = array[index2];
        array[index2] = temp;
    };
    /**项目无关可以删除*************************************************************************/
    CommonUtil.CreateOfflineDummyPlayerInfo = function () {
        var playerID = ConstDefine.OFFLINE_PLAYER_ID;
        var nextStep = 1;
        var diamondNum = 30;
        var goldNum = 1;
        var pointNum = 1;
        var openID = ConstDefine.HTTP_OFFLINE_OPEN_ID + "_dummyHttp";
        var latestUnCompeleteLevel = -1;
        var coinSpawnLvl = 30;
        var diamondSpawnLvl = 1;
        var curSideWeaponId = 2;
        var intensityLvl = 1;
        var speedLvl = 1;
        var playerInfo = this.CreateDummyPlayerInfo(openID, nextStep, diamondNum, goldNum, pointNum, latestUnCompeleteLevel, coinSpawnLvl, diamondSpawnLvl, curSideWeaponId, intensityLvl, speedLvl);
        return playerInfo;
    };
    CommonUtil.CreateDummyPlayerInfo = function (openID, nextStep, diamondNum, goldNum, pointNum, latestUnCompeleteLevel, coinSpawnLvl, diamondSpawnLvl, curSideWeaponId, intensityLvl, speedLvl) {
        var playerInfo = new com.msg.playerInfo();
        playerInfo.openId = openID;
        //新手引导
        playerInfo.newbiGuideInfo = new com.msg.newbiGuideInfo();
        playerInfo.newbiGuideInfo.nextStep = -1;
        //钱袋
        playerInfo.moneyInfo = new com.msg.moneyInfo();
        playerInfo.moneyInfo.diamondNum = 1000;
        playerInfo.moneyInfo.goldNum = 100000000;
        playerInfo.moneyInfo.pointNum = 98;
        playerInfo.moneyInfo.latestPointRefreshTime = Math.floor(new Date().getTime() / 1000); //单位秒
        playerInfo.moneyInfo.lotteryNum = 0;
        //产能
        playerInfo.moneyInfo.spawnList = [];
        var spawn = new com.msg.moneySpawnInfo();
        playerInfo.moneyInfo.spawnList.push(spawn);
        spawn.spawnID = 1;
        spawn.moneyType = 1;
        spawn.spawnType = 1;
        spawn.moneyNum = 10;
        spawn.latestPointRefreshTime = Math.floor(new Date().getTime() / 1000); //单位秒
        spawn.createTime = Math.floor(new Date().getTime() / 1000); //单位秒
        //等级
        playerInfo.levelInfo = new com.msg.levelInfo();
        playerInfo.levelInfo.latestUnCompeleteLevel = 1;
        //武器
        playerInfo.playerWeaponInfo = new com.msg.playerWeaponInfo();
        playerInfo.playerWeaponInfo.spawnLvl = 1;
        // playerInfo.playerWeaponInfo.goldSpawnLvl = 10;
        // playerInfo.playerWeaponInfo.diamondSpawnLvl = 1;
        playerInfo.playerWeaponInfo.curSideWeaponId = EnumSideWeaponType.Missile;
        playerInfo.playerWeaponInfo.mainWeapon = new com.msg.weaponDetail();
        playerInfo.playerWeaponInfo.mainWeapon.id = 1;
        playerInfo.playerWeaponInfo.mainWeapon.level = 100;
        playerInfo.playerWeaponInfo.mainWeapon.evolveLevel = 9; //默认进阶等级1
        playerInfo.playerWeaponInfo.sideWeapons = [];
        //副武器编号2~7
        for (var i_1 = 2; i_1 < 7; i_1++) {
            var sideWeapon = new com.msg.weaponDetail();
            sideWeapon.id = i_1;
            sideWeapon.level = 1;
            playerInfo.playerWeaponInfo.sideWeapons.push(sideWeapon);
        }
        //好友
        playerInfo.inviteList = [];
        for (var i = 0; i < 6; i++) {
            var friend = new com.msg.inviteDetail();
            friend.friendOpenID = "Test Friend" + i;
            friend.rewardGained = i > 3 ? 3 : i;
            friend.picUrl = i > 1 ? ConstDefine.DEFAULT_USER_HEADER_URL : "http://img.qqzhi.com/uploads/2018-12-14/110256340.jpg";
            friend.rewardNum = 10 * (i + 1);
            friend.index = i + 1;
            playerInfo.inviteList.push(friend);
        }
        //手机绑定
        playerInfo.verifyInfo = new com.msg.verifyInfo();
        playerInfo.verifyInfo.state = 0;
        return playerInfo;
    };
    return CommonUtil;
}());
CommonUtil.uid = 0;
//# sourceMappingURL=CommonUtil.js.map