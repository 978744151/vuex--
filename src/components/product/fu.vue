<template>
    <div id="counter-event-example">
      <p>{{ total }}</p>
      <!-- v-on事件  -->
      <zi @increment="incrementTotal"></zi>
</div>
</template>
<script>
    import zi from '../product/zi'
    export default {
        components: {
            zi
        },
        data () {
            return {
                total: 0
            }
        },
        methods: {
            incrementTotal (num) {
                // 子组件想操作父组件数据 要@事件  子组件触发事件
                this.total++
                console.log(num)
            }
        }
    }
</script>
<style>

</style>
