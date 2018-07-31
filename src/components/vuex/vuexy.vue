<template>
  <div >
      <productListOne></productListOne>
      <productListTwo></productListTwo>
  </div>
</template>

<script>
import productListOne from '../vuex/product_one.vue'
import productListTwo from '../vuex/product_two.vue'
export default {
  data() {
    return {

    }
  },
    components:{
      productListOne,
      productListTwo
  }
}
</script>

<style lang="less">



</style>
