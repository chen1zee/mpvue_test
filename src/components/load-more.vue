<template>
    <view class="comp__load--more">
        <block v-if="noMore">
            <view class="line"></view>
            <view class="empty-tip text-middle-line">
                <text class="text">{{noMoreTxt}}</text>
            </view>
            <view class="line"></view>
        </block>
        <view class="loading-tip" wx:else>
            <image class="loading-image" src="/images/loading.gif" alt="" />
            正在加载，请稍候…
        </view>
    </view>
</template>

<script>
    export default {
        props: {
            noMore: { type: Boolean, default: false }
        },
        name: 'load-more',
    }
</script>

<style lang="less">
@import "src/style/index";
@import "src/style/color";

.comp__load--more{
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: @silver-light;
    opacity: 0.9;
    &.smoke {
        background-color: @smoke-light;
    }
    .line {
        width: 40rpx;
        height: 1rpx;
        background-color: @silver-light;
    }
    .empty-tip{
        padding: 0 20rpx;
        height: 78rpx;
        line-height: 78rpx;
        font-size: 28rpx;
        .text{
            color: rgba(153,153,153,0.9);
        }
    }
    .loading-tip{
        font-size: 28rpx;
        text-align: center;
        color: @gray-light;
        padding: 20rpx 0;
        .loading-image{
            height: 28rpx;
            width: 28rpx;
            margin-right: 10rpx;
        }
    }
}
</style>
