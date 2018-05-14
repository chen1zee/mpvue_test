/**
 * 警告性 弹窗封装
 * @param {String|Object} params
 * */

const alertModal = (params) => {
    const opt = typeof params === 'string' ? { content: params } : params
    /**
     * 这里算一个坑，不要用 wepy.showModal,
     * wepy 的封装让success回调变为Promise的then->返回，
     * 所以用 wepy 处理 回调用 .then()
     * 用 wx 处理 用 success() {}
     * */
    return new Promise(resolve => {
        wx.showModal({
            title: opt.title || '温馨提示',
            content: opt.content,
            showCancel: false,
            confirmColor: '#cc3232',
            success() {
                if (params.success) params.success()
                resolve()
            }
        })
    })
}

export default alertModal
