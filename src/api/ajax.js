import localToken from 'src/storage/local-token'
import getTokenHandler from 'src/utils/get-token-handler'
import fetch from './fetch'

class AJAX {
    constructor(cfg) {
        this.baseUrl = cfg.baseUrl
        // 成功标志key
        this.reqSuccessKey = cfg.reqSuccessKey
        // 成功标志value
        this.reqSuccessValue = cfg.reqSuccessValue
        // 消息key
        this.msgKey = cfg.msgKey
    }

    get(url, errAlert) {
        return this.fetch(url, null, 'GET', errAlert)
    }

    post(url, params, errAlert) {
        return this.fetch(url, params, 'POST', errAlert)
    }

    fetch(url, params, method, errAlert) {
        return fetch.call(this, {
            url,
            params,
            method,
            errAlert,
            tokenExpireCB: async () => {
                localToken.set('')
                await getTokenHandler()
                const res = await this.fetch(url, params, method, errAlert)
                return res
            }
        })
    }
}

export default AJAX
