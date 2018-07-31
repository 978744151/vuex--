// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/index'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import './lib/fa/css/font-awesome.min.css'
import common from './components/common/common.js'
import {store} from './components/product/store.js'
Vue.config.productionTip = false
Vue.use(MintUI)

// router.beforeEach((to, from, next) => {
//   console.log(to)
//   if(to.fullPath == '/product' || to.fullPath == '/home'){
//     console.log(next())
//     next()
//   }else{
//     console.log(1)
//   }
// })
/* eslint-disable no-new */

new Vue({
  store,
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
