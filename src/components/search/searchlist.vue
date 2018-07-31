<template>
    <div>
        <div class="mui-card goods-list" v-for="(items,index) in goodslist" :key="index"@click="$router.push('/product?key='+items.barcode)">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <img :src='items.commoditypic' class="thumb_img">
                    <div class="info">
                        <span>{{items.commodityname}}</span>
                        <div class="box">
                            <span class="price">{{items.buyprice}}</span>

                            <span href="#">销量:{{items.totalsale}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import common from '../common/common'
import Vue from "vue"
export default {
    data(){
        return {
            goodslist :[]
        }
    },
    created(){
        let name = encodeURI(this.$route.query.key)
        console.log(this.$route.query.key)
        let data = {

        }
        axios({
            url:common.a()+'/api/api-bin/wjcm/entry/datalist/queryGoods.action?shopcode=10000000&name='+this.$route.query.key
        }).then(res=>{
            console.log(res.data)
            this.goodslist = res.data.result.goods
        })
    }
}
</script>

<style lang="less">
  .goods-list {
    padding: 5px;
    border: 1px solid #ccc;
  }

  .goods-list .mui-card-content-inner .thumb_img {
    width: 60px;
    height: 60px;
  }

  .goods-list .mui-card-content-inner .info {
    margin-left:10px;
    flex: 1;
  }

  .goods-list .mui-card-content-inner .info h4 {
    font-size: 14px;
  }

  .goods-list .mui-card-content-inner .info .box {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .goods-list .mui-card-content-inner .info .box .price {
    font-size: 16px;
    color: red;
  }

  .goods-list .mui-card-content-inner {
    display: flex;
  }

  .mui-card-content-inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .mui-card-content-inner .amount {
    flex: 1;
  }

  .mui-card-content-inner .red {
    color: red;
    font-size: 16px;
    font-weight: bold;
  }

  .mui-card-content-inner .red {
    color: red;
    font-size: 16px;
    font-weight: bold;
  }
</style>
