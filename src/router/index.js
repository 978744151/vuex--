import Vue from 'vue'
import Router from 'vue-router'

import Home from '../components/home/home.vue'
import category from '../components/home/category.vue'
import cart from '../components/home/cart.vue'
import user from '../components/home/user.vue'
import search from '../components/search/search.vue'
import searchlist from '../components/search/searchlist'
import product from '../components/product/product'
import vuex from '../components/product/vuex'
import fu from '../components/product/fu'
import whiteorder from '../components/order/whiteOrder'
import goods from '../components/home/goods'
// import tab from '../components/common/tabbar'
import vuexy from '../components/vuex/vuexy'
Vue.use(Router)
export default new Router({
  routes: [
    { path: "/cart", component: cart,meta:{index:2}},
    { path: "/home", component: Home,meta:{index:0} },
    { path: "/category", component: category,meta:{index:1} },
    { path: "/user", component: user ,meta:{index:3}},
    { path: "/search", component: search },
    { path: "/searchlist", component: searchlist },
    { path: "/product", component: product},
    { path: "/whiteorder", component: whiteorder},
    { path: "/goods", component: goods},
    // { path: "/tab", component: tab},
    { path: "/fu", component: fu},
    { path: "/vuex", component: vuex},
    { path: "/vuexy", component: vuexy},
    { path: "/", redirect: "/home" },
  ]
})
