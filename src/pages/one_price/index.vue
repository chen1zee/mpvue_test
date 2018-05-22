<template>
    <view class="one-price__index">
        <!-- 上方 分类tap -->
        <MenuTap :categoryList="categoryList"
                 :categoryIndex="categoryIndex"
                 :windowWidth="windowWidth"
                 @changeIndex="changeIndex" />
        <!-- 下方列表 -->
        <swiper class="swiper"
                :current="categoryIndex"
                @change="swiperChange">
            <swiper-item
                v-for="(o_p_i_page, o_p_i_index) in goodsPages"
                class="goods-wrap" :key="o_p_i_index">
                <Page :page="o_p_i_page" />
            </swiper-item>
        </swiper>
    </view>
</template>

<script>
// TODO
import { goodsMock } from 'src/mock/index'
import MenuTap from './components/menu-tap'
import Page from './components/page'

export default {
    name: 'index',
    data() {
        return {
            categoryList: [0, 1, 2, 3, 4, 5, 6, 7, 8],
            categoryIndex: 0,
            goodsPages: [
                // {
                //     goods: [],
                //     noMore: false,
                //     request: {
                //         page: 1,
                //         size: 20
                //     },
                //     pending: false
                // }
            ],
            windowWidth: 750,
            // menu index 变化 而 引起的 swiperChange 事件
            caseSwiperChangeByMenu: false
        }
    },
    methods: {
        changeIndex(index) {
            this.caseSwiperChangeByMenu = true
            this.categoryIndex = index
        },
        swiperChange(e) {
            if (this.caseSwiperChangeByMenu) {
                this.caseSwiperChangeByMenu = false
                return
            }
            console.log('swiperChange', e)
        },
        initGoodsPages() {
            for (let i = 4; i--;) {
                this.goodsPages.push({
                    goods: goodsMock,
                    noMore: false,
                    request: { page: 1, size: 20 },
                    pending: false
                })
            }
        }
    },
    onLoad() {
        this.initGoodsPages()
        try {
            const sysInfo = wx.getSystemInfoSync()
            this.windowWidth = sysInfo.windowWidth || 750
        } catch (e) {
            console.log(e)
        }
    },
    components: {
        MenuTap,
        Page
    }
}
</script>

<style lang="less">
.one-price__index {
    box-sizing: border-box;
    padding-top: 70rpx;
    height: 100%;
    .swiper {
        width: 100%;
        height: 100%;
    }
}
</style>
