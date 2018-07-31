<template>
  <div>
    <van-popup v-model="show" position="bottom" :overlay="true">
      <div class="cart_menu-wrapper" ref="menuWrapper">
        <div class="cart_sku">
          <div>
            <div class="">价格：
              <span>{{price}}</span>
            </div>
            <div class="" style="margin-bottom:10px;">库存：
              <span>{{storage}}</span>
              
            </div>
          </div>
          <div class="van-sku-row__title" v-for="(items,index) in pro_goods" :key="index"> {{index}}
            <div @click="changenumber(item,items)" class="spec" :class="{'red' : active == item.active}" v-for="(item,index) in items" :key="index">
              <span>{{item.name}}</span>
            </div>
          </div>

        </div>
      </div>
      <div>
        <div v-if="storage == 0 ">
          <van-button type="primary" bottom-action @click="cart_button" disabled>购物</van-button>
        </div>
        <div v-else>
          <van-button type="primary" bottom-action @click="cart_button">购物</van-button>
        </div>
      </div>
    </van-popup>
    <div class="goodlist">
      <div class="cart_list" v-for="(items,index) in goodlist" :key="index">
        <div class="cart_checkbox" v-if="items.morespec == 0">
          <van-checkbox v-model="items.checked" @change="changecheck(items,items.specstorage,items.goodsnum)"></van-checkbox>
          <!-- <input type="checkbox" v-model="items.checked" @change="changecheck(items,items.specstorage,items.goodsnum)" ref="input"> -->
        </div>
        <div class="cart_checkbox" v-else>
          <van-checkbox v-model="items.checked" @change="changecheck(items,items.storage,items.goodsnum)"></van-checkbox>
          <!-- <input type="checkbox" v-model="items.checked" @change="changecheck(items,items.storage,items.goodsnum)" ref="input"> -->
        </div>
        <div class="cart_img">
          <img :src="items.commoditypic" alt="">
        </div>
        <div class="cart_content">
          <span style="font-size : 14px;word-break: break-all; ">{{items.commodityname}}({{items.speckeyname}})</span>
          <div style="display:flex;justify-content: space-between;">
            <p>￥
              <span>{{(items.goodsprice * items.goodsnum).toFixed(2)}}
                <span style="font-size:12px;"></span>
              </span>
            </p>

            <div class="cart_stepper" v-if="items.morespec == 0">
              <van-stepper v-model="items.goodsnum" @change="changemore(items.cartid,items.sku,items.goodsnum,items.morespec,items.specstorage)" />
            </div>
            <div class="cart_stepper" v-else>
              <van-stepper v-model="items.goodsnum" @change="change(items.cartid,items.sku,items.goodsnum,items.storage)" />
            </div>
          </div>
          <div v-if="items.morespec == 1">
            <van-button size="mini" @click="del(items.cartid)">删除</van-button>
            库存{{items.storage}}
          </div>
          <div v-else>
            <van-button size="mini" @click="update(items.cartid,items.morespec,items.barcode,items.goodsprice,items.storage,items.goodsnum)">编辑</van-button>
            <van-button size="mini" @click="del(items.cartid)">删除</van-button>
            库存{{items.specstorage}}
          </div>
        </div>
      </div>
    </div>
    <div class="cart_buttom">
      <div>
        <div class="cart_quanxuan">
          <input type="checkbox" @click="all_check" v-model="quanxuan" width="15px" height="25px;">
          <span :class="[ quanxuan == false ? 'check_span_nor' : 'check_span_sel']"></span>
          <!-- <van-checkbox  ></van-checkbox> -->
        </div>
        <span class="cart_check_qx">全选</span>
      </div>
      <p>合计: ￥
        <span style="color:red;">{{total.toFixed(2)}}</span>
      </p>
      <div v-if=" parseInt(jiesuannum) <=  parseInt(jiesuanstroage)">
        <!-- <van-button type="danger" @click="jiesuan" >结算</van-button> -->
        <button @click="jiesuan" ref="reference">结算</button>

      </div>
      <div v-else>
        <button disabled ref="reference">结算</button>
        <!-- <van-button type="danger"  disabled>结算</van-button> -->

      </div>
    </div>
    <!-- <tab :change="selected"></tab> -->
  </div>
</template>

<script>
// import tab from '../common/tabbar'
import axios from "axios"
import Qs from 'qs'
import common from '../common/common'
import Vue from "vue"
import { Toast } from 'mint-ui';
import { Button, Stepper, Icon, Swipe, SwipeItem, Popup } from 'vant';
import { Card } from 'vant';
Vue.use(Card);
Vue.use(Button);
Vue.use(Icon);
Vue.use(Swipe).use(SwipeItem);
Vue.use(Popup);
Vue.use(Stepper);
import { Checklist } from 'mint-ui';
Vue.component(Checklist.name, Checklist);
import { Checkbox, CheckboxGroup } from 'vant';
Vue.use(Checkbox).use(CheckboxGroup);
export default {
  data() {
    return {
      goodsnum: '',
      active: true,
      value: '',
      access_code: '',
      userid: '',
      goodlist: [],
      quanxuan: false,
      selected: '3',
      total: 0,
      show: false,
      goodspec: [],
      // 固定返回前3条为true
      pro_goods: {
        内存: [{ name: '8G', active: false }, { name: '16G', active: false }, { name: '32G', active: false }],
        颜色: [{ name: '蓝色', active: false }, { name: '黄色', active: false }, { name: '黑色', active: false }],
        屏幕: [{ name: '高清屏', active: false }, { name: '文字屏', active: false }]
      },
      returnspec: [],
      new_goodspec: '',
      barcode: '',
      goodspecs: [],
      defaultspec: [],
      price: '',
      storage: '',
      speclist: [],
      layer_arr: [],
      jiesuannum: 0,
      jiesuanstroage: 0,
    }
  },
  components:{
    // tab
  },
  methods: {
    getspec() {
      for (let k in this.pro_goods) {
        for (let i in this.pro_goods[k]) {
          if (this.pro_goods[k][i].active == true) {
            this.goodspecs.push(this.pro_goods[k][i].name)
          }
        }
      }
      this.new_goodspec = this.goodspecs.join(',')
      console.log(this.new_goodspec)
      this.goodspecs = []
    },
    cart_button() {
      var data = {
        barcode: this.barcode,
        keyname: this.new_goodspec,
        userid: this.userid,
        goodsnum: this.goodsnum,
        cartid: this.cartid,
        access_code: this.access_code
      }
      axios.get(common.a() + '/api/api-bin/wjcm/datalist/updateCartSpec.action', { params: data }).then(res => {
        if (res.data.success == 1) {
          this.show = false
          this.render()
        }
      }).catch(error => {
        Toast({
          message: '请求出错',
          position: 'bottom',
          duration: 5000
        });
      })
    },
    // 点击编辑
    update(id, morespec, barcode, pirce, storage, num) {

      this.layer_arr = []
      this.price = pirce
      this.storage = storage
      this.barcode = barcode
      this.cartid = id;
      this.goodsnum = num
      for (let k in this.pro_goods) {
        for (let i in this.pro_goods[k]) {
          this.pro_goods[k][i].active = false
        }
      }
      var data = {
        userid: this.userid,
        cartid: id,
        access_code: this.access_code
      }
      this.show = true;
      axios.get(common.a() + '/api/api-bin/wjcm/datalist/queryCarGoodsSpec.action',
        {
          params: data = data
        }).then(res => {
          console.log(res)
          this.goodspec = res.data.goodspec
          this.defaultspec = res.data.defaultspec
          for (var n in this.defaultspec) {
            this.layer_arr.push(this.defaultspec[n])
          }
          for (let k in this.pro_goods) {
            for (let i in this.pro_goods[k]) {
              var index = this.layer_arr.indexOf(this.pro_goods[k][i].name)
              if (index != -1) {
                this.pro_goods[k][i].active = true
              }
            }
          }
        })
    },
    // 改变规格
    changenumber(item, items) {
      items.forEach((items, index) => {
        items.active = false;
      })
      item.active = true
      this.getspec()
      axios({
        method: 'post',
        transformRequest: [data => Qs.stringify(data)],
        url: common.a() + '/api/api-bin/wjcm/entry/datalist/querySpecPrice.action',
        data: {
          keyname: this.new_goodspec,
          barcode: this.barcode
        }
      }).then(res => {
        console.log(res.data)
        if (res.data.success == 1) {
          this.price = res.data.result.goodspec.price
          this.storage = res.data.result.goodspec.storecount
        }
      })
    },
    // 结算
    jiesuan() {
      var cartarr = []
      var checkedtrue = 0;
      this.goodlist.forEach((value, index) => {
        if (value.checked == false) {
          checkedtrue++
        }
      })
      if (checkedtrue == this.goodlist.length) {
        Toast({
          message: '请选择物品',
          position: 'bottom',
          duration: 2000,
        });
      } else {
          this.goodlist.forEach((value, index) => {
          if (value.checked == true) {
            cartarr.push(value.cartid)
          }
        })
        cartarr = cartarr.join(',')
        this.$router.push({ path: '/white_order', query: { key:  cartarr,price:this.total.toFixed(2)}})
      }
    },
    // 改变全选
    all_check() {
      if (!this.quanxuan == true) {
        let totalpri = 0;
        this.goodlist.forEach((value, index) => {
          if (typeof value.checked == 'undefined') {
            Vue.set(value, "checked", true)
          }
          if (value.morespec == 0) {
            if (parseInt(value.goodsnum) > parseInt(value.specstorage)) {
              Toast({
                message: '库存不足',
                position: 'bottom',
                duration: 2000,
              });
              this.$refs.reference.setAttribute('disabled', 'disabled')
            }
          } else {
            if (parseInt(value.goodsnum) > parseInt(value.storage)) {
              Toast({
                message: '库存不足',
                position: 'bottom',
                duration: 2000,
              });
              this.$refs.reference.setAttribute('disabled', 'disabled')
            }
          }
          totalpri += value.goodsnum * value.goodsprice
          value.checked = true
        })
        this.total = totalpri
      }
      else if (!this.quanxuan == false) {
        this.total = 0
        this.goodlist.forEach((value, index) => {
          value.checked = false
        })
      }
    },
    // 删除购物车
    del(id) {
      axios({
        method: 'post',
        transformRequest: [data => Qs.stringify(data)],
        url: common.a() + '/api/api-bin/wjcm/datalist/deleteUserCarGood.action',
        data: {
          userid: this.userid,
          cartid: id,
          access_code: this.access_code
        }
      }).then(res => {
        if (res.data.success == 1) {
          Toast('删除成功');
          this.render()
        }
      })
    },
    goNull() {
      this.goodlist.forEach((value, index) => {
        value.checked = false
      })
      this.quanxuan = false
    },
    // 改变步进器 morespec = 0
    changemore(cartid, sku, num, morespec, stroage) {
      this.jiesuannum = num
      this.jiesuanstroage = stroage
      if (parseInt(num) > parseInt(stroage)) {
        Toast({
          message: '库存不足',
          position: 'bottom',
          duration: 2000,
        });
        this.goNull()

      }
      axios({
        method: 'post',
        transformRequest: [data => Qs.stringify(data)],
        url: common.a() + '/api/api-bin/wjcm/datalist/updateUserCarGoods.action',
        data: {
          userid: this.userid,
          cartid: cartid,
          goodsnum: num,
          sku: sku,
          access_code: this.access_code
        },
      }).then(res => {
        if (res.data.success == 1) {
          var totalbuy = 0
          this.goodlist.forEach((value, index) => {
            if (value.checked == true) {
              totalbuy += value.goodsnum * value.goodsprice
            }
          })
          this.total = totalbuy
        }
      })
    },
    // 改变步进器 morespec = 1
    change(cartid, sku, num, stroage) {
      this.jiesuannum = parseInt(num)
      this.jiesuanstroage = parseInt(stroage)
      if (parseInt(num) > parseInt(stroage)) {
        Toast({
          message: '库存不足',
          position: 'bottom',
          duration: 2000,
        });
        this.goNull()
      }
      axios({
        method: 'post',
        transformRequest: [data => Qs.stringify(data)],
        url: common.a() + '/api/api-bin/wjcm/datalist/updateUserCarGoods.action',
        data: {
          userid: this.userid,
          cartid: cartid,
          goodsnum: num,
          sku: sku,
          access_code: this.access_code
        },
      }).then(res => {
        if (res.data.success == 1) {
          var totalbuy = 0
          this.goodlist.forEach((value, index) => {
            if (value.checked == true) {
              totalbuy += value.goodsnum * value.goodsprice
            }
          })
          this.total = totalbuy
        }
      })
    },
    // 单独改变选择
    changecheck(items, stroage, num) {
      this.jiesuannum = parseInt(num)
      this.jiesuanstroage = parseInt(stroage)
      if (parseInt(num) > parseInt(stroage)) {
        Toast({
          message: '库存不足',
          position: 'bottom',
          duration: 2000,
        });
        this.goNull()
      }
      var totalbuy = 0
      let checkboxlength = []
      this.goodlist.forEach((value, index) => {
        if (value.checked == true) {
          checkboxlength.length++
          totalbuy += value.goodsnum * value.goodsprice
        }
      })
      this.total = totalbuy
      if (checkboxlength.length == this.goodlist.length) {
        this.quanxuan = true;
      } else {
        this.quanxuan = false;
      }
    },
    render() {
      let data = {
        access_code: this.access_code,
        userid: this.userid
      }
      axios({
        method: 'post',
        transformRequest: [data => Qs.stringify(data)],
        url: common.a() + '/api/api-bin/wjcm/datalist/queryUserCarGoods.action',
        data: data,
      }).then(res => {
        console.log(res.data)
        if (res.data.success == 1) {
          this.goodlist = res.data.result.record;
          this.goodlist.forEach((value, index) => {
            // this.value = val.goodsnum
            if (typeof value.checked == 'undefined') {
              Vue.set(value, "checked", false)
            }
          })
        } else if (res.data.success == 0) {
          Toast('请重新进行登陆')
          setTimeout(() => {
            this.$router.push({ path: 'user' })
          }, 500)
        } else {
          Toast('你没有登陆')
        }
      })
    }
  },
  created() {
    this.access_code = localStorage.getItem('user');
    this.userid = localStorage.getItem('userid');
    if (this.access_code == false) {
      Toast('你没有登陆')
      setTimeout(() => {
        this.$router.push({ path: 'user' })
      }, 500)
    }
    this.render()
  }
}
</script>

<style lang="less">
.cart_list {
  display: flex;
  padding: 10px 8px 10px 8px;
  background-color: rgb(245, 245, 245);
  margin-bottom: 10px;
}
.lt_footer{
  display: block;
}
.cart_img {
  height: 100px;
  width: 20%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.cart_img img {
  max-width: 100%;
  -webkit-transform: translateZ(0);
  transform: translateZ(0);
}

.cart_checkbox {
  width: 10%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.van-checkbox {
  text-align: center;
}

.cart_content {
  width: 65%;
  padding: 5px 10px;
}

.cart_stepper {
  margin-top: 10px;
}

.van-stepper__stepper {
  height: 29px;
}

.van-stepper__input {
  height: 25px;
}

.cart_buttom {
  border-top: 1px solid #ccc;
  height: 46px;
  /* background: red; */
  position: fixed;
  bottom: 46px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  background: white;
}

.cart_quanxuan {
  position: absolute;
  top: 12px;
  left: 15px;
}

.cart_quanxuan>input {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999;
  opacity: 0.1;
}

.cart_check_qx {
  position: absolute;
  top: 12px;
  left: 40px;
}

.cart_buttom p {
  font-size: 14px;
}

.check_span_nor {
  width: 18px;
  height: 18px;
  background: url('../../assets/nor.png');
  display: inline-block;
  background-size: 100% 100%;
  position: absolute;
  top: 0;
  left: 0;
}

.check_span_sel {
  width: 18px;
  height: 18px;
  background: url('../../assets/sel.png');
  display: inline-block;
  background-size: 100% 100%;
  position: absolute;
  top: 0;
  left: 0;
}

.cart_sku {
  padding: 20px 20px 100px 20px;
  overflow: scroll;
  .pro_price {
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
  .red {
    color: red!;
    border: 1px solid red;
    background: red;
  }
  .spec {
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
  .pro_num {}
  .pro_stepper {
    margin-bottom: 100px;
  }
}

.mint-toast {
  z-index: 99999;
}
</style>
