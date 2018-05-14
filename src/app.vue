<script>
export default {
    created() {

    }
}
</script>

<style lang="less">
@import "./style/color";

page{
    height: 100%;
    line-height: 1.5;
    color: #333;
    outline: 0;
    font-family: PingFangSC-Light, helvetica, "Heiti SC";
}
.hidden{
    display: none;
}
/* 隐藏滚动条 */
::-webkit-scrollbar {
    width: 0;
    height: 0;
    color: transparent;
    background-color: transparent;
    overflow: hidden;
}
</style>
