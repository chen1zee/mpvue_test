<template>
<view class="comp__item">
    <view class="img-wrapper">
        <view class="img-wrap">
            <image class="image" mode="aspectFit"
                   src="/images/placeholder.png" />
        </view>
    </view>
    <view class="title">视窗储物收纳箱纳箱</view>
    <view class="price-wrapper">
        <text class="icon-price" />
        <text class="price">123</text>
    </view>
</view>
</template>

<script>
    export default {
        props: {
            itemData: { type: Object, default: {} }
        },
        data() {
            return {
                img: ''
            }
        },
        watch: {
            itemData(val) {
                if (!val.imgPath || !val.markImg) {
                    this.img = _$PLACEHOLDER
                    return
                }
                return val.imgPath || val.markImg
            }
        },
        name: 'item'
    }
</script>

<style lang="less">
@import "src/style/price";
@import "src/style/color";
@import "src/style/util";

.comp__item {
    display: inline-block;
    width: 375rpx;
    height: 375rpx;
    background-color: @white;
    .img-wrapper {
        padding-top: 24rpx;
        padding-bottom: 9rpx;
        .img-wrap {
            position: relative;
            margin: 0 auto;
            width: 250rpx;
            height: 250rpx;
            overflow: hidden;
            .image {
                position: absolute;
                top: 0;
                left: 50%;
                transform: translateX(-50%);
                height: 100%;
            }
        }
    }
    .title {
        width: 350rpx;
        margin: 0 auto;
        .text-ellipsis();
        height: 30rpx;
        font-size: 30rpx;
        line-height: 30rpx;
        text-align: center;
        color: @gray-dark;
    }
    .price-wrapper {
        padding-top: 10rpx;
        ._price(30rpx, @red);
    }
}
</style>
