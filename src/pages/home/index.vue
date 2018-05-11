<template>
<view class="container">
    <view>goods.a:{{goodsName}}</view>
    <view @tap="add">add</view>
</view>
</template>

<script>
import { POST_GOODS_NAME } from 'src/store/modules/goods/mutation-types'
export default {
    name: "index",
    computed: {
        goodsName() { return this.$store.state.goods.goodsName }
    },
    methods: {
        add() {
            this.$store.commit('goods/' + 'POST_GOODS_NAME', this.goodsName + 1)
        }
    }

}
</script>

<style scoped>
</style>
