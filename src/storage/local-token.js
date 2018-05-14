/**
 * 内存缓存 token 的 get, set
 * (token使用频率极高，将其放在内存中，合理)
 * */
let _token = ''

const localToken = {
    get() {
        return _token
    },
    set(str) {
        _token = str
    }
}

export default localToken
