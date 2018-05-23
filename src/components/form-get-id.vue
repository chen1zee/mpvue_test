<template>
    <form class="comp__form-get-id" report-submit @submit="submit">
        <button class="btn" form-type="submit"></button>
    </form>
</template>

<script>
import { sendFormId } from 'actions/send-id-action'

export default {
    name: 'form-get-id',
    methods: {
        submit(e) {
            const formId = e.mp.detail.formId
            // this formId is mock one
            if (formId.indexOf('mock') > -1) return
            sendFormId(formId)
        }
    }
}
</script>

<style lang="less">
.comp__form-get-id {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    .btn {
        display: block;
        width: 100%;
        height: 100%;
    }
}
</style>
