<template>
    <div>
    </div>
</template>

<script>
// export default {
//     props: ['text'],
//     methods: {
//         aaa() {
//             const a = 1
//             const b = 2
//         }
//     }
// }
    export default {
        props: ['text'],
        methods: {
            aaa() {
                const a = 1
                console.log(a)
            },
            bbb() {
                this.aaa()
                console.log(1232131)
                console.log('asdsadasd')
                console.log(1232)
            }
        }
    }
</script>

<style>
.card {
  padding: 10px;
}
</style>
