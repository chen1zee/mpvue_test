import Vue from 'vue'
import Vuex from 'vuex'
import goods from "src/store/modules/goods"

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        goods
    }
})

export default store
