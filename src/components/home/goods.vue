<template>
    <div class="banner">
        <mt-swipe  >
            <mt-swipe-item v-for="(item,index) in banner" :key="index" >
            <img :src=item.commoditycarousel alt=""  @click="$router.push('/product?key='+item.barcode)">
            </mt-swipe-item>
        </mt-swipe>
    </div>
</template>
<script>
import Vue from "vue"
import axios from "axios"
import common from '../common/common'
import { NavBar } from 'vant';
import { Toast } from 'mint-ui';
import { Indicator } from 'mint-ui';
export default {
    data(){
        return {
            banner:[]
        }
    },
    mounted() {
    axios({
        url: common.a() + '/api/api-bin/wjcm/entry/datalist/queryBannerPicture.action?shopcode=10000000',
            }).then(res => {
        // console.log(res.data)
            this.banner = res.data.result.Banner;
        })
    },
}
</script>

<style>

</style>
