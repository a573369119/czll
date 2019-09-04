/*
* name;
*/
var GameUtil = (function () {
    function GameUtil() {
    }
    //解析分布权重配置字符串1,10;2,20;3,40;4,20;5,10
    GameUtil.ParseDisConfigString = function (configString) {
        var totalWeight = 0;
        var distInfo = [];
        var tempGroup = configString.split(";");
        for (var index = 0; index < tempGroup.length; index++) {
            var group = tempGroup[index];
            var distInfoString = group.split(",");
            if (distInfoString.length < 2)
                Log.Error("Dist的配置异常%s, 来自分布配置%s", group, configString);
            var info = new DistConfigInfo();
            info.Key = parseInt(distInfoString[0]);
            info.Weight = parseInt(distInfoString[1]);
            totalWeight += info.Weight;
            distInfo.push(info);
        }
        //计算比例
        for (var index = 0; index < distInfo.length; index++) {
            var element = distInfo[index];
            element.Percentage = totalWeight == 0 ? 0 : element.Weight / totalWeight;
        }
        return distInfo;
    };
    /**
     * 根据字符串内容返回其字符长度（中文2/字符，英文1/字符）
     * @param str 字符串
     */
    GameUtil.StrLength = function (str) {
        var length = 0;
        var charArray = str.split("");
        for (var i = 0; i < charArray.length; i++) {
            if (charArray[i].charCodeAt(0) < 299) {
                length++;
            }
            else {
                length += 2;
            }
        }
        return length;
    };
    return GameUtil;
}());
//# sourceMappingURL=GameUtil.js.map