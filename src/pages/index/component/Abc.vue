<template>
    <view class="aaa">
        <view v-for="(Abc_item, Abc_index) in list">
            <view @tap="toggle">(o: {{Abc_item.o}})(t: {{Abc_item.t}})</view>
            <view class="ccc" :class="className">{{aaa}}</view>
        </view>
    </view>
</template>

<script>
    export default {
        name: "Abc",
        props: {
            list: { type: Array, default: [] }
        },
        data() {
            return {
                aaa: '123',
                className: 'para'
            }
        },
        methods: {
            toggle() {
                this.className = this.className == 'para' ? 'cyan' : 'para'
            }
        }
    }
</script>

<style lang="less" scoped>
    @import "../../../style/color";
    .aaa {
        .ccc {
            color: white;
        }
        .para {
            background-color: @aaa;
        }
        .cyan {
            background-color: @cyan;
        }
    }
</style>
