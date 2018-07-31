<template>
    <div>
        <van-nav-bar
        title="标题"
        left-text="返回"
        right-text=""
        left-arrow
        @click-left="onClickLeft"
        @click-right="onClickRight"
        />
        <van-popup v-model="show" position="bottom" :overlay="true">
            <div  class="menu-wrapper" ref="menuWrapper">
            <div class="sku">
                <div v-if = "this.goods.morespec == 1">
                    <div class="">价格：<span>{{this.goods.buyprice}}</span></div>
                    <div class="">库存：<span>{{this.goods.storage}}</span></div>
                </div>
                <div v-if = "this.goods.morespec == 0">
                    <div  v-if = "this.returnspec.price">
                        <div class="van-sku-row__title">价格：<span>{{this.returnspec.price}}</span></div>
                        <div class="van-sku-row__title">库存：<span>{{this.returnspec.storecount}}</span></div>
                    </div>
                   <div v-else> 
                        <div class="van-sku-row__title" >价格：<span>{{this.morespec.price}}</span></span></div>
                        <div class="van-sku-row__title">库存：<span>{{this.morespec.storecount}}</span></div>
                   </div>
                   
                   
                    <!-- red指的是定义的类名， red等于item.active  click事件引入this 先全部遍历一边， items.active 为false = ！ items.active 为true 实现效果-->
                    <div class="van-sku-row__title"  v-for="(item,index) in pro_goods" :key="index" > {{index}} 
                        <!-- <div class="spec" v-for="(k,v) in items" :key="v"  :class="{'active':active == k}"  @click="(active = k)  @click="changeItem(active,items,index)"><span></span></div> -->
                          <div class="spec" v-for="(items,index) in item" ref="pagespec" :key="index" :class="{'red' :red == items.active}" @click="changeItem(items,index,item)" >{{items.name}}<span>
                            </span></div>
                    </div>
                </div>
                <div class="pro_num">
                <div style="margin-top:20px;">购买数量：</div>
                <div class="pro_stepper">
                    <van-stepper v-model="value" />
                </div>
                </div>
            </div>
            </div>

            <div v-if = "this.goods.morespec == 0" >
                <div v-if = "this.returnspec.storecount == 0 || this.morespec.storecount ==0" >
                    <van-button type="primary" bottom-action @click="cart_button_0" disabled ref = input>购物</van-button>
                </div>
                <div v-else>
                    <van-button type="primary" bottom-action @click="cart_button_0">购物</van-button>
                </div>
            </div>
             <div v-if = "this.goods.morespec == 1">
                <div v-if = "this.goods.storage == 0">
                    <van-button type="primary" bottom-action @click="cart_button_1" disabled>购物</van-button>
                </div>
                <div v-else>
                    <van-button type="primary" bottom-action @click="cart_button_1">购物</van-button>
                </div>
            </div>
           
        </van-popup>
        <div class="pro_content">
            <pic :pic = "banner"></pic>
            <div class="pro_layer">
                <p>已选
                    <span>{{this.goods.buyprice}}</span>
                </p>
                <span>已选
                    <span>{{this.goods.commodityname}}</span>
                </span>
                <div class="pro_bottom"></div>
                <p @click="popup">已选
                    <span >{{this.goods.commodityname}}
                    </span>
                </p>

            </div>
            <div class="details_img">
                <div v-for="(items,index) in banner" :key="index" style="text-align:center">
                    <img :src="items" alt="">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios"
import Qs from 'qs'
import common from '../common/common'
import Vue from "vue"
import { Toast } from 'mint-ui';
import pic from '../../components/product/pic'
import { Button,Stepper ,Icon,Swipe, SwipeItem,Popup} from 'vant';
Vue.use(Button);
Vue.use(Icon);
Vue.use(Swipe).use(SwipeItem);
Vue.use(Popup);
Vue.use(Stepper);
import { Checklist } from 'mint-ui';
Vue.component(Checklist.name, Checklist);
import { Checkbox, CheckboxGroup } from 'vant';
Vue.use(Checkbox).use(CheckboxGroup);
import { SubmitBar } from 'vant';

Vue.use(SubmitBar);
export default {
    data() {
        return {
            red:true,
            banner: [],
            goods: [],
            show: false,
            value: 1,
            active: '1',
            morespec : [],
            barcode : '',
            goodspec: [],
            new_goodspec: '',
            pro_goods:{
                内存:[{ name: 8 , active : false}, { name: 16 , active : false},{ name: 32 , active : true}],
                颜色:[{ name: '蓝色' , active : false},{ name: '黄色' , active : true},{ name: '黑色',active:false}],
                屏幕:[{ name: '高清屏', active : false}, { name: '文字屏', active : true}]
            },
            returnspec : [],
            access_code: '',
            userid: '',
            com_arr: ''
        }
    },
    methods: {
        changeItem(items,index,item){
            item.forEach(function(e,i){
                   item[i].active = false
            })
            items.active = true
            

            this.getspec()
            axios({
                method: 'post',
                transformRequest: [data => Qs.stringify(data)],
                url: common.a()+'/api/api-bin/wjcm/entry/datalist/querySpecPrice.action',
                data: {
                    keyname: this.new_goodspec,
                     barcode: this.$route.query.key
                }
            }).then(res=>{
                console.log(res.data)
                this.returnspec = res.data.result.goodspec
                this.morespec.storecount  = this.returnspec.storecount
                console.log(this.morespec.storecount)
            })
        },
        getspec(){
            for( let k in this.pro_goods){
                for( let i in this.pro_goods[k]){
                    if(this.pro_goods[k][i].active == true){
                        this.goodspec.push(this.pro_goods[k][i].name)
                    }
                }
            }
            this.new_goodspec = this.goodspec.join(',')
            console.log(this.new_goodspec)
            this.goodspec = []
        },
        cart_button(){
            let data ={
                    userid: this.userid,
                    barcode: this.$route.query.key,
                    commodityname: this.goods.commodityname,
                    commoditypic: this.com_arr,
                    marketprice: this.goods.saleprice,
                    goodsprice: this.returnspec.price || this.goods.buyprice,
                    goodsnum: this.value,
                    speckeyname: this.new_goodspec || this.goods.spec,
                    sku: this.returnspec.sku || 0,
                    morespec: this.goods.morespec,
                    defaultspec: this.morespec,
                    access_code: this.access_code
            }
            console.log(data)
            axios({
                method: 'post',
                transformRequest: [data => Qs.stringify(data)],
                url: common.a() + '/api/api-bin/wjcm/datalist/addCarGoods.action',
                data:data
            }).then(res=>{
                console.log(res.data)
                if(res.data.success == 1){
                    // this.$router.push({ path: 'cart'})
                }
            })
        },
        cart_button_0(){
           
          this.getspec()
            if(this.value >  this.returnspec.storecount){
                    Toast({
                    message: '库存不足',
                    position: 'bottom',
                    duration: 2000,
                    });
                    return false
                }
            
            this.cart_button()
        },

        cart_button_1(){
            if(this.value > this.goods.storage){
              Toast({
                    message: '库存不足',
                    position: 'bottom',
                    duration: 5000,
                    })
                    return false
            }
            this.cart_button()
        },
        popup() {
            this.show = true
        },
        onClickLeft() {
            this.$router.back(-1)
        },
        onClickRight() {
        
        }
    },
    mounted() {
        this.access_code = localStorage.getItem('user');
        this.userid = localStorage.getItem('userid');
        if(this.access_code == false){
            Toast('你没有登陆')
            setTimeout(()=>{
            this.$router.push({ path: 'user'})
            },500)
        }
        axios({
            method: 'post',
            transformRequest: [data => Qs.stringify(data)],
            url: common.a() + '/api/api-bin/wjcm/entry/datalist/queryOneGoods.action',
            data: {
                shopcode: 10000000,
                userid: 86,
                barcode: this.$route.query.key
            }
        }).then(res => {
            console.log(res.data)
            this.goods = res.data.result.goods
            let pro_img = res.data.result.goods.commoditysmallpic
            this.banner = pro_img.split(';')
            this.morespec = res.data.result.defaultspec
            this.barcode = res.data.result.goods.barcode
            this.com_arr = res.data.result.goods.commoditypic.split('com')[1];
             console.log(this.morespec.storecount)
        })
    },
    components: {
        Button,
        Icon,
        pic
    }
}
</script>

<style lang="less">
.banner {
    width: 100%;
    height: 200px;
}

.banner img {}

.van-swipe-item {
    height: 300px;
    text-align: center;
}

.pro_layer {
    padding: 5px 10px;
}

.pro_bottom {
    width: 100%;
    height: 20px;
    background-color: #eee;
}
.van-popup--bottom{
  
}

.sku{
    padding: 20px;
    overflow: scroll;
}
.pro_price{
    display: inline-block;
    padding: 5px 9px;
    margin: 0 10px 10px 0;
    height: 28px;
    min-width: 52px;
    line-height: 16px;
    font-size: 12px;
    color: #333;
    text-align: center;
    border: 1px solid #999;
    border-radius: 3px;
    box-sizing: border-box;
}
.red{
    color: red!;
    border: 1px solid red;
    background: red;
}
.spec{
    display: inline-block;
    padding: 5px 9px;
    margin: 0 10px 10px 0;
    height: 28px;
    min-width: 52px;
    line-height: 16px;
    font-size: 12px;
    color: #333;
    text-align: center;
    border: 1px solid #999;
    border-radius: 3px;
    box-sizing: border-box;
}
.pro_num{
  
}
.pro_stepper{
    margin-bottom: 100px;
}
.mint-toast{
    z-index: 99999;
}
</style>
