<template>
  <div>
      <h2>product-list-one</h2>
      <ul>
<li v-for="(item,index) in products" :key="index"><span>{{item.name}}</span><span>{{item.price}}</span></li>
        <button @click="reduce(200)">123123</button>
      </ul>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {mapActions} from 'vuex'
import {mapMutations} from 'vuex'
export default {
    computed:{
            products(){
                return this.$store.state.a.products
            },
            // saleproduct(){
            //     return this.$store.getters.saleproduct
            // },
           ...mapGetters([
               "saleproduct"
           ]),
           ...mapMutations([
                'returnPrice'
            ])
            // get(){
            //     return this.$store.getters.get
            // },
           
        },
        methods:{
            // reduce(amount){
            //     this.$store.dispatch('reduce',amount)
            // },
            
            // ...mapActions([
            //     "reduce"
            //     ])
        //    reduce(amount){
        //         this.$store.commit('returnPrice',amount)
        //     }
        }
           
}
</script>

<style>

</style>
