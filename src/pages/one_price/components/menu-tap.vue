<template>
    <view class="one-price__menu-tap">
        <view class="border-bottom"></view>
        <scroll-view  class="scroll" scroll-x scroll-with-animation
                      :scrollLeft="scrollLeft">
            <view class="cell-wrap" :style="{width: scrollWidth + 'rpx'}">
                <view v-for="(o_p_m_t_item, o_p_m_t_index) in categoryList"
                      class="cell" :key="o_p_m_t_index"
                      @tap="changeIndex(o_p_m_t_index)">
                    <view class="title" :class="{active: categoryIndex == o_p_m_t_index}">
                        <text class="icon-price" /><text>100选3</text>
                    </view>
                </view>
            </view>
        </scroll-view>
    </view>
</template>

<script>
const CELL_WIDTH = 210 // cell 宽度
const RIGHT_EMPTY_WIDTH = 60 // wrap 右侧预留空白

/**
 * events:
 * @changeIndex(index): 改变下标
 * */
export default {
    name: 'menu-tap',
    props: {
        categoryList: { type: Array, default: [] },
        categoryIndex: { type: null, default: 0 },
        windowWidth: { type: null, default: 750 }
    },
    computed: {
        scrollWidth() {
            return this.categoryList.length * CELL_WIDTH + RIGHT_EMPTY_WIDTH
        },
        scrollLeft() {
            const cellLeft = this.categoryIndex * CELL_WIDTH // 对应 cell 的 left 值
            const minCellMiddleLeft = (750 - CELL_WIDTH) / 2 // cell 应处于中间的 min left
            if (cellLeft < minCellMiddleLeft) return 0 // 不过半屏
            // 过半屏
            const scrollLeftRpx = cellLeft - minCellMiddleLeft
            // src/pages/menu/index.wpy line:52 换算公式
            console.log(this.windowWidth * scrollLeftRpx / 750)
            return this.windowWidth * scrollLeftRpx / 750
        }
    },
    methods: {
        changeIndex(index) {
            if (index == this.categoryIndex) return
            this.$emit('changeIndex', index)
        }
    }
}
</script>

<style lang="less">
@import "src/style/color";
@import "src/style/iconfont";

@menuHeight: 70rpx;
@cellWidth: 210rpx;
.one-price__menu-tap {
    .usualOne(@menuHeight);
    border-top: 1rpx solid @silver-dark;
    overflow: hidden;
    background-color: @white;
    .border-bottom {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        border-top: 1rpx solid @silver-lighter;
    }
    .scroll {
        .usualOne(@menuHeight + 50);
        .cell-wrap {
            display: flex;
            justify-content: flex-start;
            min-width: 100%;
            .cell {
                width: @cellWidth;
                height: @menuHeight;
                text-align: center;
                @borderWidth: 4rpx;
                .title {
                    display: inline-block;
                    box-sizing: border-box;
                    border-bottom: @borderWidth solid transparent;
                    color: @gray-fade;
                    font-size: 26rpx;
                    line-height: @menuHeight - @borderWidth;
                    height: @menuHeight;
                    .icon-price {
                        &::before {
                            .iconfont();
                            content: "\e621";
                        }
                    }
                    &.active {
                        border-bottom-color: @red;
                        color: @red;
                    }
                }
            }
        }
    }
}


/* 常用函数封装 */
.usualOne(@height) {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: @height;
}
</style>
