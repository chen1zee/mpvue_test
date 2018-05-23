<template>
    <view class="first-publish__index">
        <view class="border-top"></view>
        <CompBlockTitle title="为你推荐" />
        <view class="list">

        </view>
    </view>
</template>

<script>
import CompBlockTitle from 'src/components/comp-block-title'
export default {
    name: 'FirstPublishIndex',
    components: {
        CompBlockTitle
    }
}
</script>

<style lang="less">
@import "src/style/color";

.first-publish__index {
    .border-top {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        border-top: 1rpx solid @silver-dark;
    }
}
</style>
