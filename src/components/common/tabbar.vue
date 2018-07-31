<template>
    <div style="width:100% height:46px;" class="lt_footer" v-cloak>
      <router-link to="/home">
        <li >
            <span class="iframe_index" :class="{'now' :selected =='1'}" @click="changes()"></span>
            <p :class="{'now' :selected =='1'}" @click="changes()">首页</p>
        </li>
      </router-link>
      <router-link to="/category">
        <li >
            <span class="iframe_category" :class="{'now' :selected =='2'}" @click="changes()"></span>
            <p :class="{'now' :selected =='2'}" @click="changes()">分类</p>
        </li>
      </router-link>
      <router-link to="/cart">
        <li>
            <span class="iframe_cart" :class="{'now' :selected =='3'}" @click="changes()"></span>
            <p :class="{'now' :selected =='3'}" @click="changes()">购物车</p>
        </li>
      </router-link>
      <router-link to="/user">
        <li>
            <span class="iframe_user" :class="{'now' :selected =='4'}" @click="changes()"></span>
            <p :class="{'now' :selected =='4'}" @click="changes()">我的</p>
        </li>
      </router-link>
    </div>
</template>

<script>
export default {
data() {
    return {
        selected:'',
    }
  },
  props:['change'],
  methods:{
    changes(){
        // console.log(this.change)
    }
  },
  mounted() {
      this.selected = this.change
  },
  
}
</script>

<style lang="less">
[v-cloak] {
  display: none;
}

</style>
