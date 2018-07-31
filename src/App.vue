<template>
  <div class="contanier">
     <div style="width:100% height:46px;" class="lt_footer" v-cloak v-show="show" >
      <router-link to="/home">
        <li >
            <span class="iframe_index"></span>
            <p >首页</p>
        </li>
      </router-link>
      <router-link to="/category">
        <li >
            <span class="iframe_category" ></span>
            <p >分类</p>
        </li>
      </router-link>
      <router-link to="/cart">
        <li>
            <span class="iframe_cart" ></span>
            <p>购物车</p>
        </li>
      </router-link>
      <router-link to="/user">
        <li>
            <span class="iframe_user"></span>
            <p >我的</p>
        </li>
      </router-link>
    </div>
    <transition :name="transitionName">
        <router-view  ></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
     transitionName:'',
     show:true,
    }
  },
 watch: {//使用watch 监听$router的变化
    $route(to, from) {
      //如果to索引大于from索引,判断为前进状态,反之则为后退状态
      console.log(to)
      this.show = true
      if(to.meta.index == 3){
        this.show = false
      }
      else if(to.meta.index == 1){
        this.transitionName = ''; 
      }
      else if(to.meta.index > from.meta.index){
        //设置动画名称
        this.transitionName = 'slide-left';
      }else{
        this.transitionName = 'slide-right';
      }
    }
  }
}
</script>

<style lang="less">
html,
body {
  padding: 0;
  margin: 0;
  height: 100%;
  background-color: #fff;
  width: 100%;
  overflow: hidden;
}

.contanier {
  width: 100%;
  height: 100%;
  max-width: 750px;
  min-width: 320px;
  margin: 0 auto;

  background: #f5f5f5;
  z-index: 1;
}

.header {
  height: 45px;
  width: 100%;
  background: -webkit-linear-gradient(left, #7a55f3, #2ee2df);
  /* Safari 5.1 - 6.0 */
  background: -o-linear-gradient(right, #7a55f3, #2ee2df);
  /* Opera 11.1 - 12.0 */
  background: -moz-linear-gradient(right, #7a55f3, #2ee2df);
  /* Firefox 3.6 - 15 */
  background: linear-gradient(to right, #7a55f3, #2ee2df);
  width: 100%;
  position: absolute;
  top: 0;
  max-width: 750px;
  z-index: 9999;
  img:nth-child(1) {
    width: 10px;
    height: 18px;
    position: absolute;
    left: 10px;
    top: 14px;
  }
  img:nth-child(2) {
    width: 24px;
    height: 22px;
    position: absolute;
    right: 8px;
    top: 10px;
  }
  .sitesave {
    position: absolute;
    right: 10px;
    line-height: 45px;
    top: 0px;
    color: white;
    font-size: 16px;
  }
  h4 {
    font-size: 16px;
    width: 100%;
    height: 45px;
    font-weight: 400;
    color: white;
    text-align: center;
    line-height: 45px;
    margin: 0;
  }
}
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all 500ms;
  position: absolute;
  width: 100%;
  height: 100%;
}
.slide-right-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.slide-right-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-enter {
  opacity: 1;
  transform: translate3d(100%, 0, 0);
}
.slide-left-leave-active {
  opacity: 1;
  transform: translate3d(-100%, 0, 0);
}
li {
  list-style: none;
}

.fa {
  font-size: 20px;
}

.mint-tab-item span {
  display: block;
}
.lt_footer li {
  float: left;
  width: 25%;
  text-align: center;
  padding-top: 10px;
  img{

  }
}
.lt_footer li.now p {
  color: #4038a5;
}
.lt_footer a {
  color: black;
}

.lt_footer p{
  color: black;
  font-size: 12px;
  margin-top: 0;
}
.lt_footer p.now{
  color: #4038a5;
  margin-bottom: 0;
  font-size: 12px;
}
.lt_footer {
  height: 55px;
  width: 100%;
  background: rgb(250, 250, 250);
  position: absolute;
  bottom: 0;
  max-width: 750px;
  z-index: 999;
  .iframe_index {
    width: 21px;
    height: 21px;
    background: url('./assets/home1.png');
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    display: inline-block;
  }
  .iframe_category {
    width: 21px;
    height: 21px;
    background: url('./assets/list1.png');
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    display: inline-block;
  }
  .iframe_cart {
    width: 21px;
    height: 21px;
    background: url('./assets/ShoppingCart1.png');
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    display: inline-block;
  }
  .iframe_user {
    width: 21px;
    height: 21px;
    background: url('./assets/user1.png');
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    display: inline-block;
  }
  .iframe_index.now {
    width: 21px;
    height: 21px;
    background: url('./assets/home.png');
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    display: inline-block;
  }
  .iframe_category.now {
    width: 21px;
    height: 21px;
    background: url('./assets/list.png');
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    display: inline-block;
  }
  .iframe_cart.now {
    width: 21px;
    height: 21px;
    background: url('./assets/ShoppingCart.png');
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    display: inline-block;
  }
  .iframe_user.now {
    width: 21px;
    height: 21px;
    background: url('./assets/user.png');
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    display: inline-block;
  }
}
</style>
