<template>
  <div>
      <h2>product-list-two</h2>
      <ul>
           <li v-for="(item,index) in products" :key="index"><span>{{item.name}}</span><span>{{item.price}}</span></li>
          <button >asd</button>
      </ul>
  </div>
</template>

<script>

export default {
       
    computed:{
             products(){
                 return this.$store.state.a.products
             },
            //  saleproduct(){
            //      const saleproducts = this.$store.state.products.map((i)=>{
            //          return {
            //              name:'**'+i.name+'**',
            //              price:i.price
            //          }
            //      })
            //      return saleproducts
            //  }
         }  ,
    
}
</script>

<style>

</style>
