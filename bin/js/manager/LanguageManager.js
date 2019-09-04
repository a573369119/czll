/**
* name
*/
var ui;
(function (ui) {
    var LanguageEnum;
    (function (LanguageEnum) {
        LanguageEnum[LanguageEnum["CHN"] = 0] = "CHN";
        LanguageEnum[LanguageEnum["ENG"] = 1] = "ENG";
    })(LanguageEnum = ui.LanguageEnum || (ui.LanguageEnum = {}));
    var LanguageManager = (function () {
        function LanguageManager() {
            this.curLanageTye = LanguageEnum.CHN;
        }
        LanguageManager.GetInstance = function () {
            if (LanguageManager._instance == null) {
                LanguageManager._instance = new LanguageManager();
            }
            return LanguageManager._instance;
        };
        LanguageManager.prototype.ChangeLanguage = function (newLanguage) {
            this.curLanageTye = newLanguage;
        };
        //根据id获取语言
        LanguageManager.prototype.GetTxt = function (id) {
            var config = ConfigManager.GetInstance().GetLocalizationConfig(id);
            if (config != null) {
                switch (this.curLanageTye) {
                    case LanguageEnum.CHN:
                        return config.CHN;
                    case LanguageEnum.ENG:
                        return config.ENG;
                }
            }
            else {
                console.error("ID对应语言配置不存在:" + id);
                return "";
            }
        };
        return LanguageManager;
    }());
    ui.LanguageManager = LanguageManager;
})(ui || (ui = {}));
//# sourceMappingURL=LanguageManager.js.map