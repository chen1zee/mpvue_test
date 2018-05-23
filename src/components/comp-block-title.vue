<template>
<view class="comp__block-title">
    <view class="short-line"></view>
    <view class="block-title">{{title}}</view>
    <view class="short-line"></view>
</view>
</template>

<script>
export default {
    name: 'comp-block-title',
    props: {
        title: { type: String, default: '' }
    }
}
</script>

<style lang="less">
@import "src/style/color";

.comp__block-title {
    height: 100rpx;
    background-color: @white;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1rpx solid @silver;
    .short-line {
        height: 1rpx;
        width: 40rpx;
        border-left: 20rpx solid transparent;
        border-right: 20rpx solid transparent;
        background-color: @gray-light-fade;
    }
    @titleHeight: 32rpx;
    .block-title {
        height: @titleHeight;
        font-size: @titleHeight;
        line-height: @titleHeight;
        color: @gray-fade;
    }
}
</style>
