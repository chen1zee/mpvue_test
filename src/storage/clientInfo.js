/**
 * 内存缓存 设备信息
 * */
const _clientInfo = {
    // lbs位置
    lbs: ',',
    // 机型
    phoneType: '',
    // app版本号
    appVersion: '',
    // 设备号 imei号
    deviceId: '',
    // 操作系统版本
    sysCode: '',
    // 浏览器类型
    browserType: '' || '',
    // 操作系统类型
    sysType: '' || '',
    // 渠道包SID
    channelId: '',
    // 平台ID
    platformId: '',
    // 预订渠道SID （比如微信菜单入口、扫码下单等）
    sid: '',
    // 活动ID
    activityId: '',
    // 渠道
    channel: '' // 小程序 具体看 config 配置
}

/**
 * .set(key)
 * @param {null} val 值
 * @param {String} key 要设置的key
 * @param {Object} key 要替换的key
 *
 * */
const clientInfo = {
    get(key) {
        if (key) {
            const val = _clientInfo[key]
            if (val == undefined) return '' // 无对应key
            return val
        }
        return _clientInfo
    },
    set(key, val) {
        if (typeof key != 'object') {
            _clientInfo[key] = val
        } else { // object
            Object.keys(key).forEach(i => {
                _clientInfo[i] = key[i]
            })
        }
    }
}

export default clientInfo
