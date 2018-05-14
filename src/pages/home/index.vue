<template>
<view class="container">

</view>
</template>

<script>
import alertModal from "src/utils/alert-modal"
import { getMemberValidMember } from 'src/api/index'
import One from './components/one'

/**
 * 使用 home/store
 * */
export default {
    name: "index",
    computed: {
        count() { return this.$store.state.home.count }
    },
    methods: {
        add() {
            this.$store.commit('POST_HOME_COUNT', this.count + 1)
        },
        goOther() {
            wx.navigateTo({ url: '/pages/home/other' })
        },
        alertModal() {
            alertModal('sdsajodajdiosjdio')
        },
        async testRequest() {
            try {
                const res = await getMemberValidMember({ type: 1 })
            } finally {
                console.log('trackChen1')
            }
        }
    },
    onLoad() {
        console.log(this)
    },
    components: {
        One
    }

}
</script>

<style lang="less" scoped>
@import "../../style/color";

page{
    background-color: @silver-light;
    min-height: 100%;
    overflow-x: hidden;
}
</style>
