/*
* name;
*/
class GameUtil {

    //解析分布权重配置字符串1,10;2,20;3,40;4,20;5,10
    public static ParseDisConfigString(configString: string): DistConfigInfo[] {
        let totalWeight = 0;
        let distInfo: DistConfigInfo[] = [];
        let tempGroup = configString.split(";");
        for (let index = 0; index < tempGroup.length; index++) {
            let group = tempGroup[index];
            let distInfoString = group.split(",");
            if (distInfoString.length < 2) Log.Error("Dist的配置异常%s, 来自分布配置%s", group, configString)
            let info = new DistConfigInfo();
            info.Key = parseInt(distInfoString[0]);
            info.Weight = parseInt(distInfoString[1])
            totalWeight += info.Weight;
            distInfo.push(info);
        }

        //计算比例
        for (let index = 0; index < distInfo.length; index++) {
            let element = distInfo[index];
            element.Percentage = totalWeight == 0 ? 0 : element.Weight / totalWeight;
        }
        return distInfo;
    }


    /**
     * 根据字符串内容返回其字符长度（中文2/字符，英文1/字符）
     * @param str 字符串
     */
    public static StrLength(str: string): number {
        let length = 0;
        var charArray = str.split("");
        for (var i = 0; i < charArray.length; i++) {
            if (charArray[i].charCodeAt(0) < 299) {
                length++;
            } else {
                length += 2;
            }
        }
        return length;
    }

}