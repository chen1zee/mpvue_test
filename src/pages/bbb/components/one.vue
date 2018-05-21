<template>
    <view>one: {{count}}</view>
</template>

<script>
export default {
    name: "one",
    computed: {
        count() { return this.$store.state.home.count }
    }
}
</script>

<style scoped>

</style>
