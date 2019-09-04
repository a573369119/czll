/*
* name;
*/
class LotteryItem extends ui.PrefabUI.LotteryItemPrefabUI {

    constructor() {
        super();
    }

    public InitItem(skin: string, num: number, width = 120, discr?: string) {
        //图片
        this.UI_Img_Icon.skin = skin;
        this.UI_Img_Icon.width = width;
        this.UI_Img_Icon.height = width;
        //文字
        this.UI_Txt_Num.visible = num > 1;
        this.UI_Txt_Num.text = num.toString();
        //文字
        this.lab_descr.text = "";
    }

}