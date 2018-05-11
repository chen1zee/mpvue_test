<template>
<view>
    <view>firstLevel: {{val.firstLevelId}}</view>

    <SecondLevel v-for="(home_f_l_item, home_f_l_index) in val.data.list"
                 :val="home_f_l_item" :key="home_f_l_item.skuId" />
</view>
</template>

<script>
import SecondLevel from './second-level'

export default {
    name: "FirstLevel",
    props: {
        val: {
            type: Object,
            default: {}
        }
    },
    components: {
        SecondLevel
    }
}
</script>

<style scoped>
</style>
