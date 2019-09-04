/**
* name 
*/
module ui {
	export enum LanguageEnum {
		CHN,
		ENG,
	}

	export class LanguageManager {
		private static _instance: LanguageManager;
		private curLanageTye: LanguageEnum = LanguageEnum.CHN;
		public static GetInstance(): LanguageManager {
			if (LanguageManager._instance == null) {
				LanguageManager._instance = new LanguageManager();
			}
			return LanguageManager._instance;
		}

		constructor() {
		}

		public ChangeLanguage(newLanguage: LanguageEnum) {
			this.curLanageTye = newLanguage;
		}

		//根据id获取语言
		public GetTxt(id: number): string {
			let config = ConfigManager.GetInstance().GetLocalizationConfig(id)
			if (config != null) {
				switch (this.curLanageTye) {
					case LanguageEnum.CHN:
						return config.CHN;
					case LanguageEnum.ENG:
						return config.ENG;
				}
			}
			else {
				console.error("ID对应语言配置不存在:" + id)
				return "";
			}
		}
	}
}