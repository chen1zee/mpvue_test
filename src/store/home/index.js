/**
 * _$XXX 在 config/word-replace.js
 * 通过webpack.DefinePlugin()替换
 * 因DefinePlugin 为编译时读入
 * 可先定义 CONST 再在不编译时 在 config/word-replace.js 进行添加
 * */
const state = {
    count: _$COUNT
}
/**
 * POST 改
 * REST 恢复
 * 命名规则: [curd]_[moduleName]_[propertyName]
 * */
const mutations = {
    POST_HOME_COUNT(s, val) { s.count = val },
    REST_HOME_COUNT(s) { s.count = _$COUNT }
}
const actions = {
}
export default {
    state,
    mutations,
    actions
}
