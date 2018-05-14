/**
 * 因为 有 token 请求，可能出现 token 过期情况,（调用getTokenHandler）
 * 若 import { getToken } from '../api/index'
 * 而 ajax import getTokenHandler
 * 循环调用 -> 栈溢出 -> 故 此处 写一个 fetch 封装
 * */

import localToken from 'src/storage/local-token'
import alertModal from 'src/utils/alert-modal'
import clientInfo from 'src/storage/clientInfo'

/**
 * 此函数需 .call(this) -> 绑定函数上下文
 *
 * @param {String} url
 * @param {Object} params
 * @param {String} method
 * @param {Function} tokenExpireCB token失效 回调
 * @param {Boolean} errAlert 错误弹窗 默认 true
 * */

function fetch({ url, params, method, tokenExpireCB, errAlert = true }) {
    // 显示小程序官方标题loading
    wx.showNavigationBarLoading()
    const requestPromise = new Promise((resolve, reject) => {
        wx.request({
            url: this.baseUrl + url,
            data: {
                authority: { token: localToken.get() },
                clientInfo: clientInfo.get(),
                ...params
            },
            method,
            dataType: 'json',
            success() { resolve() },
            fail() { reject() }
        })
    })
    return new Promise((resolve, reject) => {
        requestPromise.then((res) => {
            // 隐藏小程序官方标题loading
            wx.hideNavigationBarLoading()
            res = res.data
            const code = res && res[this.reqSuccessKey]
            if (this.reqSuccessValue.indexOf(code) > -1) {
                // 与接口请求成功key配置，返回数据
                resolve(res)
            } else {
                /*   出错，将loadingMask 关闭   */
                wx.hideLoading()
                if (res.code == 405 && tokenExpireCB) { // token失效，清除token并获取token并重新请求
                    tokenExpireCB().then(res2 => resolve(res2))
                } else { // 其他情况作为错误处理
                    const msg = res && res[this.msgKey] || '小铂需要缓一缓,稍后再试试~~'
                    if (errAlert) { // 提示错误
                        const opt = {
                            title: '温馨提示',
                            content: msg,
                            success: (r) => {
                                r.confirm && reject(res)
                            }
                        }
                        // 因样式 不同  fill_order 免单资格 判断 弹窗按钮
                        if (res && res.msg && res.msg.indexOf('未获得专享资格') > -1) {
                            // 无免单资格 弹窗定制
                            const newRes = {
                                code: res.code,
                                data: null,
                                msg: `您暂无专享资格。获取方法：6天内成功支付订单（虚拟商品除外）`
                            }
                            opt.confirmText = `马上下单`
                            opt.content = newRes.msg
                            opt.success = (r) => {
                                r.confirm && reject(newRes)
                            }
                        }
                        alertModal(opt)
                    } else {
                        reject(res)
                    }
                    console.log('fetch error: ', {
                        url,
                        errorResponse: res
                    })
                }
            }
        }).catch((error) => {
            wx.hideLoading()
            wx.hideNavigationBarLoading()
            alertModal({
                title: '温馨提示',
                content: '小铂需要缓一缓,稍后再试试~~',
                success(r) {
                    r.confirm && reject(error)
                }
            })
            reject(error)
        })
    })
}

export default fetch
