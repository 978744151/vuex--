<template>
<div>
    <div class="home_content"   v-infinite-scroll="loadMore"
  infinite-scroll-disabled="loading"
  infinite-scroll-distance="10">
    <van-nav-bar
    title="标题"
    left-text="返回"
    right-text=""
    left-arrow
    @click-left="onClickLeft"
    @click-right="onClickRight"
    /> 
    <div class="lt_search">
      <i class='mui-icon mui-icon-search'></i>
      <input type="text" class="search_text" placeholder="请输入搜索关键字" @focus="handleinput()">
    </div>
    <div class="home_content">
      <div class="banner">
        <mt-swipe :auto="4000">
          <mt-swipe-item v-for="(item,index) in banner" :key="index" @click="$router.push('product.html'+item.barcode)">
            <img :src=item.commoditycarousel alt="" @click="$router.push('product.html?key='+item.barcode)">
          </mt-swipe-item>
        </mt-swipe>
      </div>
      <div class="goods-list">
        <div class="goods-item" v-for="(item,index) in goodlist" :key="index" @click="$router.push('/product?key='+item.barcode)">
          <img :src="item.commoditypic">
          <h4></h4>
          <div class="info">
            <p class="price">
              <span class="nowPrice">￥{{item.buyprice}}</span>
              <span>
                <del>￥{{item.saleprice}}</del>
              </span>
            </p>
            <p class="sale">
              <span>热卖中</span>
              <span>销量{{item.totalsale}}</span>
            </p>
          </div>
        </div>
      </div>
        <p v-show="loading" class="page-infinite-loading">
        <mt-spinner type="fading-circle"></mt-spinner>
        加载中...
      </p>
    </div>
 
  </div>
   <div style="width:100% height:46px;">
    <mt-tabbar v-model="selected" fixed>
      <mt-tab-item id="首页">
        <div @click="$router.push('/home')">
          <span class="fa fa-home"></span>
          <span>首页</span>
        </div>
      </mt-tab-item>
      <mt-tab-item id="分类">
        <div @click="$router.push('/category')">
        <span class="fa fa-bars"></span>
        <span>分类</span>
        </div>
      </mt-tab-item>
      <mt-tab-item id="购物车" >
        <div @click="$router.push('/cart')">
        <span class="fa fa-shopping-cart"></span>
        <span>购物车</span>
        </div>
      </mt-tab-item>
      <mt-tab-item id="我的" >
        <div @click="$router.push('/user')">
        <span class="fa fa-user"></span>
        <span>我的</span>
        </div>
      </mt-tab-item>
    </mt-tabbar>
 </div>
</div>

</template>

<script>
import Vue from "vue"
import axios from "axios"
import common from '../common/common'
import { NavBar } from 'vant';
import { InfiniteScroll } from 'mint-ui';
import { Toast } from 'mint-ui';
import { Indicator } from 'mint-ui';
Vue.use(InfiniteScroll);
Vue.use(NavBar);
export default {
  data() {
    return {
      banner: [],
      goodlist: [],
      selected: '首页',
      pageAPP: 1,
      loading: false
    }
  },
  methods: {
    handleinput() {
      this.$router.push({path: '/search'})
    },
    onClickLeft() {
      this.$router.back(-1)
    },
    onClickRight() {
    
    },
    loadMore() {
      setTimeout(() => {
        this.loading = true;
      },1000);
      let data = {pageApp : this.pageAPP,
                  shopcode : 10000000
      }
        console.log(data)
          axios.get(common.a() + '/api/api-bin/wjcm/entry/datalist/queryAllGoods.action',{params:data}
          ).then(res => {
            console.log(res.data)
            this.loading = false; 
            this.goodlist = this.goodlist.concat(res.data.result.goods);
            if(res.data.result.goods.length == 0){
                Toast('没有数据了')
            } 
          })    
      this.pageAPP += 1
     
    }
  },
  created() {
   axios({
      url: common.a() + '/api/api-bin/wjcm/entry/datalist/queryBannerPicture.action?shopcode=10000000',
    }).then(res => {
      console.log(res.data)
      this.banner = res.data.result.Banner;
    })
    // axios({
    //   url: common.a() + '/api/api-bin/wjcm/entry/datalist/queryAllGoods.action?shopcode=10000000',
    //   type: 'get'
    // }).then(res => {
    //   console.log(res.data.result)
    //   this.goodlist = res.data.result.goods;
    // })
  }
}
</script>

<style lang="less">

.lt_search {
  text-align: center;
  padding: 8px 0px;
  border-radius: 62px;
  width: 100%;
}
.van-nav-bar__left{

    span{
    color: black;

    }
    .van-icon{
        color: black;
    }
}
.lt_search>input {
  border: 1px solid rgba(0, 0, 0, .2);
  outline: 0;
  width: 94.7%;
  margin: 0;
  border-radius: 25px;
  height: 31px;
  font-size: 14px;
  text-align: center;
}



.home_content .banner {
  width: 100%;
  height: 200px;
}

.home_content .banner img {
  width: 100%;
  height: 100%;
}

.home_content .goods-list {
  display: flex;
  flex-wrap: wrap;
  padding: 2px;
}

.home_content .goods-list .goods-item {
  width: 46%;
  border: 1px solid #ccc;
  margin: 1%;
  box-shadow: 0 0 7px #aaa;
  padding: 2px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.home_content .goods-list .goods-item img {
  width: 100%;
  border: 0;
}

.home_content .goods-list .goods-item .info {
  background-color: #eee;
}

.home_content .goods-list .goods-item h4 {
  font-size: 14px;
}

.home_content .goods-list .goods-item .info p {
  margin: 0;
  margin-top: 10px;
  font-size: 13px;
}

.home_content .goods-list .goods-item .info p:nth-child(2) {
  display: flex;
  justify-content: space-between;
}

.home_content .goods-list .goods-item .info p:nth-child(1) .nowPrice {
  color: red;
  font-size: 15px;
  margin-right: 8px;
}
.page-infinite-loading{
  display: flex;
  position: absolute;
  left:50%;
  bottom: 50px;
  transform: translateX(-50%)
}
</style>
