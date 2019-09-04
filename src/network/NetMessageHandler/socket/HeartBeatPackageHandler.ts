class HeartBeatPackageHandler extends BaseMsgHandler {
    public BaseMsgHandler(data: Uint8Array) {
        let message: com.msg.s_heartBeatPackage_7001 = com.msg.s_heartBeatPackage_7001.decode(data)
        
    }
}
