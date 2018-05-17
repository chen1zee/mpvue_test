import Vue from 'vue'
import Index from './index.vue'

Vue.config.productionTip = false

const app = new Vue(Index)
app.$mount()

export default {}
