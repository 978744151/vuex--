import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
// export const store = new Vuex.Store({
const moduleA = {
    state:{
        products:[
            {name:'马云',price:200},
            {name:'马化腾',price:140},
            {name:'马冬梅',price:20},
            {name:'马蓉',price:10}
        ]
       },
       getters:{
        saleproduct: (state)=> {
            const saleproduct = state.products.map((i)=>{
                return {
                    name:'**'+i.name+'**',
                    price:i.price * 2
                }
            })
            return saleproduct
        },
        get(state,getters){
            const get = getters.saleproduct.map((e)=>{
                return {
                    name:'**'+e.name+'**',
                    price:e.price * 20000
                }
            })
            return get
            console.log(get)
        }
       },
       mutations:{
        returnPrice(state,amount){
            console.log(amount)
            state.products.forEach( e => {
                e.price -= 10
              });
        }
       },
       actions:{
        reduce(context,amount){
            console.log(amount)
            setTimeout(function() {
                context.commit('returnPrice',amount)
            },1000);
        }
    }
}
// })
export const store = new Vuex.Store({
    modules: {
        a: moduleA
      }
  })
  console.log(store)