const path = require('path')
// 相对 本项目根文件夹
function resolve(dir) {
    return path.join(__dirname, '../', dir)
}

module.exports = {
    // 本项目根文件夹 || wepy项目根文件夹
    paths: [resolve('../mall-wxapp/'), resolve('./')]
}
