/**
 * 二进制配置表类
 */
var ConfigTable = (function () {
    function ConfigTable() {
        this.configDic = new Laya.Dictionary();
    }
    //配置表加载完后解析
    ConfigTable.prototype.Load = function (buffer, type) {
        this.curType = type;
        var bytes = CommonUtil.ConvertArrayBuffer(buffer);
        //按行解析s
        var rowNum = bytes.getInt32(); //java工具使用int4字节
        //解析行
        for (var index = 0; index < rowNum; index++) {
            var configData = new this.curType();
            configData.LoadRowBytes(bytes);
            if (this.configDic.get(configData.GetID())) {
                Log.Error("配置表 %s ID %s 重复", configData.GetTableName(), configData.GetID());
                continue;
            }
            this.configDic.set(configData.GetID(), configData);
        }
    };
    //根据id获取
    ConfigTable.prototype.GetByID = function (id) {
        var data = this.configDic.get(id);
        return data;
    };
    //获取总数
    ConfigTable.prototype.GetAll = function () {
        return this.configDic.values;
    };
    //获取表数据总数
    ConfigTable.prototype.GetCount = function () {
        return this.configDic.keys.length;
    };
    ConfigTable.prototype.PrintTable = function () {
        var allRows = this.configDic.values;
        var tableString = "\n";
        for (var index = 0; index < allRows.length; index++) {
            var row = allRows[index];
            if (index == 0) {
                tableString += "打印表 " + row.GetTableName() + "=========================================================================\n";
            }
            tableString += row.Print();
        }
        tableString += "表尾=========================================================================\n";
        Log.Debug(tableString);
    };
    ConfigTable.prototype.GetTableName = function () {
        var allRows = this.configDic.values;
        var tableString = allRows.length > 0 ? allRows[0].GetTableName() : "";
        return tableString;
    };
    return ConfigTable;
}());
/**
 * 二进制配置表管理类
 */
var ByteTableManager = (function () {
    function ByteTableManager() {
        this.m_configDic = new Laya.Dictionary();
    }
    /**
     * 使用加载的二进制数据初始化表格
     * @param type
     * @param buffer
     */
    ByteTableManager.prototype.OnTableLoaded = function (type, buffer) {
        if (this.m_configDic.get(type)) {
            Log.Error("表格重复添加, %s 已经存在", type.toString());
            return;
        }
        var configTable = new ConfigTable();
        configTable.Load(buffer, type);
        this.m_configDic.set(type, configTable);
        // configTable.PrintTable();
        // console.log(this.m_configDic);
    };
    /**
     * 根据id获取
     * @param id
     * @param type
     */
    ByteTableManager.prototype.GetConfigByID = function (id, type) {
        // console.log(type);
        var table = this.m_configDic.get(type);
        if (table) {
            var config = table.GetByID(id);
            if (config == null)
                Log.Warn("配置表 %s中id %d 不存在", table.GetTableName(), id);
            return config;
        }
        else {
            Log.Warn("配置表不存在 %s", type.toString());
            return null;
        }
    };
    //获取总数
    ByteTableManager.prototype.GetAll = function (type) {
        var table = this.m_configDic.get(type);
        if (table) {
            return table.GetAll();
        }
        else {
            Log.Warn("配置表不存在 %s", type.toString());
            return null;
        }
    };
    //获取表数据总数
    ByteTableManager.prototype.GetCount = function (type) {
        var table = this.m_configDic.get(type);
        if (table) {
            return table.GetCount();
        }
        else {
            Log.Warn("配置表不存在 %s", type.toString());
            return null;
        }
    };
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
    ByteTableManager.prototype.UnLoadLevelFile = function (path) {
        ResourceManager.GetInstance().release(path);
    };
    return ByteTableManager;
}());
//# sourceMappingURL=ByteTableManager.js.map