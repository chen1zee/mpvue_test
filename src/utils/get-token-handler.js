import localToken from 'src/storage/local-token'
import config from 'src/config'
import fetch from 'src/api/fetch'
/**
 * 获取token并将token存储在 本地 中
 *
 * @param  {Boolean} isRedirect 是否跳去登录页
 * @callback resolve(token)
 * @callback reject(errorNumber) -> -3: 用户拒绝授权 | -1: 微信api 无返回 服务器 | -2: 本服务器请求错误 | -3: 用户不允许自动登录 | -100 用户不是会员
 * */
let pending = false // 请求中
const queue = [] // 非第一次请求，推入队列 并在 第一次请求完成后，推出

function getTokenHandler(isRedirect = true) {
    return new Promise((resolve, reject) => {
        // 小程序缓存
        const token = localToken.get()
        if (token) return resolve(token)
        // 需要调起请求
        if (pending) return queue.push({ resolve, reject })
        pending = true // 确保 只调起一次后台请求
        loginHandler(isRedirect, resolve, reject)
    })
}

// 如果storage没有token 微信登录获取code
function loginHandler(isRedirect, resolve, reject) {
    wx.showLoading({ title: '加载中' })
    wx.login({
        complete(wxres) {
            if (!wxres || !wxres.code) {
                wx.hideLoading()
                reject(-1)
                pending = false
                releaseQueue('reject', -1)
                return
            }
            const fetchConfig = {
                baseUrl: config.api,
                reqSuccessKey: 'code',
                reqSuccessValue: [200],
                msgKey: 'msg'
            }
            const api = '/wechat/smallProgram/login'
            // 检测登录态 是否已有token
            fetch.call(fetchConfig, {
                url: api,
                params: { code: wxres.code },
                method: 'POST'
            })
                .then(res => {
                    wx.hideLoading()
                    const pages = getCurrentPages()
                    const nowPage = pages[pages.length - 1]
                    // 当前已在登录页
                    const alreadyInLogin = nowPage.route.indexOf('login/index') > -1
                    if (res.code != 200) {
                        if (isRedirect && !alreadyInLogin) wx.navigateTo({ url: '/pages/login/index' })
                        reject(-100)
                        pending = false
                        releaseQueue('reject', -100)
                        return
                    }
                    // 如果拿到token 存进storage
                    if (res && res.data) {
                        localToken.set(res.data)
                        resolve(res.data)
                        pending = false
                        releaseQueue('resolve', res.data)
                    } else {
                        reject(-100)
                        pending = false
                        releaseQueue('reject', -100)
                        // 如果服务器返回没有token跳去绑定手机页 理论上是第一次登录小程序会出现这个情况
                        if (isRedirect && !alreadyInLogin) wx.navigateTo({ url: '/pages/login/index' })
                    }
                })
                .catch(err => {
                    wx.hideLoading()
                    console.log(err)
                    reject(-2)
                    pending = false
                    releaseQueue('reject', -2)
                })
            // wepy.showModal({
            //     title: '微信授权失败',
            //     content: '请在小程序列表完全删除铂物馆，然后再次扫描二维码进入，允许小程序获取您的用户信息',
            //     showCancel: false
            // })
        }
    })
}

/**
 * @func 释放队列
 * @param {String} action 'resolve'||'reject'
 * @param {null} result 结果
 * */
function releaseQueue(action, result) {
    for (let i = queue.length; i--;) {
        const tem = queue.shift()
        tem[action](result)
    }
}

export default getTokenHandler
