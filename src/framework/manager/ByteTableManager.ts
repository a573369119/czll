/*
* name;
*/
interface IByteConfig {
    LoadRowBytes(buffer: Laya.Byte) //加载一行配置表
    GetID(): number;

    //辅助方法
    GetTableName(): string;
    Print(): string
}

/**
 * 二进制配置表类
 */
class ConfigTable<T extends IByteConfig>{
    private configDic: Laya.Dictionary = new Laya.Dictionary();
    protected curType: { new (): T } //当前脚本类型 typescript 无法new T();

    //配置表加载完后解析
    public Load(buffer: ArrayBuffer, type: new () => T) {
        this.curType = type;
        let bytes = CommonUtil.ConvertArrayBuffer(buffer);
        //按行解析s
        let rowNum = bytes.getInt32();//java工具使用int4字节
        //解析行
        for (let index = 0; index < rowNum; index++) {
            let configData = new this.curType();
            configData.LoadRowBytes(bytes);
            if (this.configDic.get(configData.GetID())) {
                Log.Error("配置表 %s ID %s 重复", configData.GetTableName(), configData.GetID())
                continue;
            }
            this.configDic.set(configData.GetID(), configData)
        }
    }

    //根据id获取
    public GetByID(id: number): T {
        let data = this.configDic.get(id)
        return data;
    }

    //获取总数
    public GetAll(): Array<T> {
        return this.configDic.values as Array<T>;
    }

    //获取表数据总数
    public GetCount(): number {
        return this.configDic.keys.length
    }

    public PrintTable() {
        let allRows = this.configDic.values;
        let tableString = "\n";
        for (let index = 0; index < allRows.length; index++) {
            let row = allRows[index] as IByteConfig;
            if (index == 0) {
                tableString += "打印表 " + row.GetTableName() + "=========================================================================\n";
            }
            tableString += row.Print();
        }
        tableString += "表尾=========================================================================\n";
        Log.Debug(tableString)
    }

    public GetTableName() {
        let allRows = this.configDic.values;
        let tableString = allRows.length > 0 ? (allRows[0] as IByteConfig).GetTableName() : "";
        return tableString;
    }
}


/**
 * 二进制配置表管理类
 */
class ByteTableManager {
    private m_configDic: Laya.Dictionary = new Laya.Dictionary();

    /**
     * 使用加载的二进制数据初始化表格
     * @param type 
     * @param buffer 
     */
    public OnTableLoaded<T extends IByteConfig>(type: new () => T, buffer: ArrayBuffer) {
        if (this.m_configDic.get(type)) {
            Log.Error("表格重复添加, %s 已经存在", type.toString())
            return;
        }
        let configTable = new ConfigTable<T>();
        configTable.Load(buffer, type);
        this.m_configDic.set(type, configTable)
        // configTable.PrintTable();
        // console.log(this.m_configDic);
    }
    /**
     * 根据id获取
     * @param id 
     * @param type 
     */
    public GetConfigByID<T extends IByteConfig>(id: number, type: new () => T): T {
        // console.log(type);
        let table = this.m_configDic.get(type) as ConfigTable<T>;
        if (table) {
            let config = table.GetByID(id);
            if (config == null) Log.Warn("配置表 %s中id %d 不存在", table.GetTableName(), id)
            return config;
        } else {
            Log.Warn("配置表不存在 %s", type.toString())
            return null;
        }
    }

    //获取总数
    public GetAll<T extends IByteConfig>(type: new () => T): Array<T> {
        let table = this.m_configDic.get(type) as ConfigTable<T>;
        if (table) {
            return table.GetAll();
        } else {
            Log.Warn("配置表不存在 %s", type.toString())
            return null;
        }
    }

    //获取表数据总数
    public GetCount<T extends IByteConfig>(type: new () => T): number {
        let table = this.m_configDic.get(type) as ConfigTable<T>;
        if (table) {
            return table.GetCount();
        } else {
            Log.Warn("配置表不存在 %s", type.toString())
            return null;
        }
    }

    // public static Load<T extends IByteConfig>(filePath: string, type: new () => T, comFunc: Function) {
    //     ResourceManager.GetInstance().loadBytesFile(filePath,
    //         (callback: LoadTaskCallbackParam) => {
    //             if (callback.Ok) {
    //                 let configTable = new ConfigTable<T>();
    //                 configTable.Load(callback.Param, type);
    //                 configTable.PrintTable();
    //                 comFunc(true)
    //             } else {
    //                 comFunc(false)
    //             }
    //         })
    // }

    /**
     * 卸载二进制关卡配置
     * @param path 
     */
    private UnLoadLevelFile(path: string) {
        ResourceManager.GetInstance().release(path);
    }

}