<template>
<scroll-view class="one-price__page" scroll-y>
    <view class="wrap">
        <Item v-for="(o_p_p_item, o_p_p_index) in goods"
              :key="o_p_p_index"
              :itemData="o_p_p_item" />
    </view>
    <LoadMore :noMore="noMore" />
</scroll-view>
</template>

<script>
import Item from 'src/components/item'
import LoadMore from 'src/components/load-more'

export default {
    name: 'page',
    props: {
        page: { type: Object, default: {} }
    },
    computed: {
        goods() { return this.page.goods },
        noMore() { return this.page.noMore }
    },
    components: {
        Item,
        LoadMore
    }
}
</script>

<style class="less">

.one-price__page {
    height: 100%;
}
</style>
