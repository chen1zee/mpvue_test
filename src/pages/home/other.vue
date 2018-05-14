<template>
    <view>
        <view>count {{count}}</view>
        <view @tap="add">add</view>
        <view @tap="navigateBack">back</view>
    </view>
</template>

<script>
export default {
    name: "other",
    computed: {
        count() { return this.$store.state.home.count }
    },
    methods: {
        navigateBack() {
            wx.navigateBack()
        },
        add() {
            this.$store.commit('POST_HOME_COUNT', this.count + 1)
        }
    },
    onLoad() {
        console.log(this)
    }
}
</script>

<style scoped>

</style>
