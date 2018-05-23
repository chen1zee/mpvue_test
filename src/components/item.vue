<template>
<view class="comp__item" @tap="goDetail">
    <view class="img-wrapper">
        <view class="img-wrap">
            <image class="image" mode="aspectFit"
                   :src="img" @error="imgFail" />
        </view>
    </view>
    <view class="title">{{itemData.title || itemData.name}}</view>
    <view class="footer">
        <!-- 价格 -->
        <view class="price-wrapper" :class="{ hidden: hidePrice }">
            <text class="icon-price" />
            <text class="price">{{nowPrice}}</text>
        </view>

        <!-- [价格] 原价 -->
        <view class="price-disable-wrapper" v-if="showOriginalPrice">
            <text class="icon-price" />
            <text class="price">{{ itemData.regularPrice/100 }}</text>
        </view>

        <!-- 积分 -->
        <view class="point-wrapper"
              :class="{ active: pointActiveStyle }"
              v-if="showPoint">
            <text class="icon-point"
                  :class="{hidden: itemData.sellPrice == 0 && itemData.favorPoints > 0}" />
            <text class="point">{{ itemData.channel == 2 ? itemData.points : itemData.favorPoints }}</text>
            <text class="point-label">积分</text>
        </view>
        <!-- [标签] 积分兑换 搜索结果页 区分铂物馆和积分商城商品 -->
        <text v-if="itemData.isMatch && itemData.isMatch == 1"
              class="tag comp__item-tag-pad">积分兑换</text>

        <!-- [标签] 耀卡标签 积分商城专区耀卡标签 -->
        <view class="tag-vip comp__item-tag-pad"
            v-if="showVipTag">耀卡专享</view>

        <!-- [标签] 非耀卡价标签 积分商城专区标签 -->
        <view class="tag-solid comp__item-tag-pad"
            v-if="showPureTag">
            {{ itemData.plus > 0 && !itemData.plusPrice ? '下单92折' : itemData.pointActivityTag }}
        </view>
    </view>
    <FormGetId />
</view>
</template>

<script>
import FormGetId from './form-get-id'
/**
 * events:
 *      @detail(query): 点击跳转商品详情  query:跳转参数
 * */
export default {
    name: 'item',
    props: {
        itemData: { type: Object, default: {} }
    },
    data() {
        return {
            imgFailFlag: false // 图片加载失败 flag
        }
    },
    computed: {
        img() {
            const itemData = this.itemData
            if (!itemData) return _$PLACEHOLDER
            if (this.imgFailFlag) return _$PLACEHOLDER
            if (itemData.imgPath || itemData.markImg) {
                return itemData.imgPath || itemData.markImg
            }
            return _$PLACEHOLDER
        },
        hidePrice() { // 隐藏价格
            const itemData = this.itemData
            if (!itemData) return true
            // 当前价格==0 && 非耀卡商品 || 积分商城商品
            return itemData.sellPrice == 0 && !itemData.plus || itemData.channel == 2
        },
        nowPrice() { // 当前价钱
            const itemData = this.itemData
            if (!itemData) return 0
            if (itemData.plus > 0) { // 耀卡
                if (itemData.plusPrice) return itemData.plusPrice / 100 // 耀卡价
                return itemData.regularPrice / 100
            }
            // 非耀卡
            return itemData.sellPrice / 100 // 显示 当前价格
        },
        showOriginalPrice() { // 显示原价 flag
            const itemData = this.itemData
            if (!itemData) return false
            // 耀卡 && 耀卡价 && 有常售价 && 非积分商城商品
            return itemData.plus > 0 && itemData.plusPrice && itemData.regularPrice && itemData.channel != 2
        },
        pointActiveStyle() { // 显示积分active样式flag
            const itemData = this.itemData
            if (!itemData) return false
            // 积分商城商品 && 积分 > 0 || 当前价==0 && 积分字段favorPoints > 0
            return itemData.channel == 2 && itemData.points > 0 || itemData.sellPrice == 0 && itemData.favorPoints > 0
        },
        showPoint() { // 显示积分flag
            const itemData = this.itemData
            if (!itemData) return false
            // 积分商城商品 && 积分>0 || 积分+钱购&&积分>0
            return itemData.channel == 2 && itemData.points > 0 || itemData.priceType == 2 && itemData.favorPoints
        },
        showVipTag() { // 显示 耀卡标签
            const itemData = this.itemData
            if (!itemData) return false
            // 耀卡&&耀卡价 || 积分商城&&耀卡专享标签
            return itemData.plus > 0 && itemData.plusPrice > 0 || itemData.channel == 2 && itemData.pointActivityTag == '耀卡专享'
        },
        showPureTag() { // 显示纯色标签
            const itemData = this.itemData
            if (!itemData) return false
            // 耀卡&&无耀卡价 || 积分商城&&有tag && tag!=耀卡专享
            return itemData.plus > 0 && !itemData.plusPrice || itemData.channel == 2 && itemData.pointActivityTag && itemData.pointActivityTag != '耀卡专享'
        }
    },
    methods: {
        imgFail() { this.imgFailFlag = true },
        goDetail() {
            if (!this.itemData.productId) return // 断言
            // 有商品id 去商品详情
            const query = { id: this.itemData.productId }
            // 积分商城 && 有积分专区Id
            if (this.itemData.channel && this.itemData.channel == 2 && this.itemData.pointActivityId) {
                query.priceStrategyId = this.itemData.pointActivityId
            }
            // 活动Id
            if (this.itemData.priceStrategy) query.priceStrategy = this.itemData.priceStrategy
            this.$emit('detail', query)
        }
    },
    components: {
        FormGetId
    }
}
</script>

<style lang="less">
@import "src/style/color";
@import "src/style/iconfont";
@import "src/style/index";
@import "src/style/util";

.comp__item {
    position: relative;
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
    .footer {
        padding-top: 10rpx;
        height: 42rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        .price-wrapper {
            ._price(30rpx, @red);
        }
        .price-disable-wrapper{
            ._price(24rpx, @gray-fade, false, true);
        }
        .point-wrapper{
            ._point(24rpx, @red, 15rpx, 5rpx);

            &.active{
                ._point(30rpx, @red, 0, 0);
            }
        }
        /*线条标签*/
        .tag{
            ._tag(20rpx, @red, false, 5rpx, 0, 2rpx);
        }
        /*纯色标签*/
        .tag-solid{
            ._tag(20rpx, @orange, true, 5rpx, 0, 2rpx);
        }
        // 耀卡专享
        .tag-vip{
            ._tag-vip(20rpx, 5rpx, 0, 2rpx);
        }
        .comp__item-tag-pad{
            margin-left: 10rpx;
        }
    }

    .hidden {
        display: none;
    }
}
</style>
