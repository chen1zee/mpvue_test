/**
 * 商品类公用数据层
 * */

const namespaced = true
const state = {
    goodsName: 0
}

const mutations = {
    POST_GOODS_NAME(s, val) { s.goodsName = val },
    REST_GOODS_NAME(s) { s.goodsName = '' }
}

const actions = {

}

export default {
    namespaced,
    state,
    mutations,
    actions
}
