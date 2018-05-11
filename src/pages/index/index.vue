<template>
    <div class="container">
        <Abc v-for="(Index_item, Index_index) in list" :list="Index_item" :key="Index_item" />
    </div>
</template>

<script>
import Abc from './component/Abc'

export default {
    name: 'Index',
    data() {
        return {
            list: [],
            motto: 'Hello World',
            userInfo: {},
        }
    },
    components: {
        Abc
    },
    onLoad() {
        for (let i = 0; i < 3; i++) {
            this.list.push([])
            for (let j = 0; j < 3; j++) {
                this.list[i].push({ o: i, t: j })
            }
        }
    }
}
</script>

<style scoped>
</style>
