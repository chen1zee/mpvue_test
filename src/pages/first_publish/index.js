import Vue from 'vue'
import Index from './index.vue'

const app = new Vue(Index)
app.$mount()

export default {
    config: {
        navigationBarTitleText: '新品首发'
    }
}
