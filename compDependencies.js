const _dep = { // 组件依赖map
}

const _hash = { // 文件 hash name
    // 'D:\\work\\mpvue_test\\src\\pages\\bbb\\index.vue': 'index$5f87534d'
}

function setDep(key, val) {
    _dep[key] = val
}
function getDep(key) {
    if (key) return _dep[key]
    return _dep
}

function setHash(key, val) {
    _hash[key] = val
}
function getHash(key) {
    if (key) return _hash[key]
    return _hash[key]
}

module.exports = {
    setDep,
    getDep,
    setHash,
    getHash
}
