<template>
<div>
    <button @click="incrementCounter">{{counter}}</button>

</div>
</template>
<script>
    export default {
        data () {
            return {
                counter: 0,
                data:1
            }
        },
        methods: {
            incrementCounter () {
                // 改变数据
                // $emit 触发
                this.$emit('increment',this.data)
                this.counter++
            }
        },
        mounted() {

        },
    }
</script>
<style>

</style>