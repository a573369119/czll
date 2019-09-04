/*
* name;
*/
class ClipFontUtli{

    public clipArray:Array<Laya.Clip>;
    private space:number=0;

    constructor(space?:number){
        this.clipArray = new Array<Laya.Clip>();
        if(space!=undefined&&space!=null){
            this.space = space;
        }else{
            this.space = 0;
        }
    }

    setClipNumber(count :number ,align : FontClipAlign = FontClipAlign.center):number{

        //部位0的位数
        var numberCount:number = 0;

        if( this.clipArray == undefined || this.clipArray == null || this.clipArray.length == 0 ){
            Log.Debug("clipArray is error")
            return ;
        }
        var clipCount :number = this.clipArray.length;
        var noNumberClipCount :number  = 0;

        for (var index = clipCount-1 ; index >= 0; index--) {
            if( index == 0 ){
                 this.clipArray[index].index =  count % 10 ; 
            }else{
                if(  count >= (10 ** index) ){
                 numberCount = index ;
                 this.clipArray[index].index =  Math.floor(count / (10 ** index)) ;
                 count -= Math.floor(count / (10 ** index)) * (10**index);
                }else if( index < numberCount ){
                    //如果在前面存在数字那么这里显示0
                    this.clipArray[index].index = 0;
                }
                else{
                 // 这里为了不显示确保有不显示的索引
                  this.clipArray[index].index =  10; 
                      ++noNumberClipCount;
                }

            }
        }
        //
        return  this.getAlginCorrection(noNumberClipCount,align);
        
    }

    private getAlginCorrection(noNumberClipCount :number ,align : FontClipAlign = FontClipAlign.center ):number{

        var AlginCorrectio:number = 0;
            switch(align)
            {
            case  FontClipAlign.center :{
                AlginCorrectio = noNumberClipCount *( this.clipArray[0].width + this.space )/ 2 ;
                break;
            }
            case FontClipAlign.left :{
                AlginCorrectio = noNumberClipCount *( this.clipArray[0].width + this.space);
            }
        }
        return AlginCorrectio;
    }


}

enum FontClipAlign{
    center,
    left
}
