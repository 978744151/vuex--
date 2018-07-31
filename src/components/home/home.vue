<template>
    <transition :name="transitionName">

  <div>
      <!-- <van-nav-bar title="标题" left-text="返回" right-text="" left-arrow @click-left="onClickLeft" @click-right="onClickRight" /> -->
      <div class="header">
        <div class='lt_search_box'>
          <div class="lt_search">
            <img src="../../assets/Arrow.png" alt="">
            <img src="../../assets/Free_Chat_Typing.png" alt="" @click = "dosome">
            <i class='mui-icon mui-icon-search' style="color: white"></i>
            <input type="text" class="search_text" placeholder="请输入搜索关键字" >
          </div>
        </div>
      </div>
        <div class="Incontent">
          <div class="mescroll" id="mescroll">
          <goods></goods>
          <div class="goods-list">
            <div class='goods-item' v-for="(item,index) in goodlist" :key="index" @click="$router.push('/product?key='+item.barcode)">
              <div class='goods_item_img'>
                <img :src="item.commoditypic" alt="">
              </div>
              <div class='goods_item_p'>
                <p>{{item.commodityname}}</p>
              </div>
              <div class='goods_item_span'>
                <span>包邮</span>
                <!-- <span>推荐</span>
                  <span>新品</span> -->
              </div>
              <div class='goods_item_price'>
                <span style='color: #4038a9;'>￥{{item.buyprice}}</span>
                <span style="font-size: 12px;">
                  <sub>
                    <del>原价:{{item.saleprice}}</del>
                  </sub>
                </span>
                <span style="font-size: 12px;margin-top:3px;">销量{{item.totalsale}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- <tab :change="selected"></tab> -->
      
  </div>
   </transition>
  
</template>

<script>
import goods from '../../components/home/goods'
// import tab from '../common/tabbar'
import Vue from "vue"
import axios from "axios"
import common from '../common/common'
import { NavBar } from 'vant';
import { Toast } from 'mint-ui';
import { Indicator } from 'mint-ui';
Vue.use(NavBar)
import MeScroll from 'mescroll.js/mescroll.min'
import 'mescroll.js/mescroll.min.css'
export default {
  data() {
    return {
      banner: [],
      goodlist: [],
      selected: '1',
      mescroll: null,
      transitionName:''
    }
  },
  // beforeRouteLeave(to, from, next) {
  //   if (confirm('要离开吗')) {
  //     next()
  //   } else {
  //     next(false)
  //   }
  // },
  // mescroll 原理getListDataFromNet接受参数负责回调，
  methods: {
    dosome(){
      console.log(1)
      this.transitionName = 'slide-left';
      setTimeout(()=> {
        this.$router.push({path:"/user"})
      }, 200);
    },
    //上拉回调 page = {num:1, size:10}; num:当前页 ,默认从1开始; size:每页数据条数,默认10
    upCallback: function(page) {
      //联网加载数据
      var self = this;
      this.getListDataFromNet(page.num, page.size, function(curPageData, data) {


        // curPageData = []; //打开本行注释,可演示列表无任何数据empty的配置
        //如果是第一页需手动制空列表 (代替clearId和clearEmptyId的配置)
        // if(page.num == 1) self.pdlist = [];
        // self.render()

        // let data = {
        //   pageApp: page.num,
        //   shopcode: 10000000
        // }
        // axios.get(common.a() + '/api/api-bin/wjcm/entry/datalist/queryAllGoods.action', { params: data }
        // ).then(res => {
        //   console.log(res.data)
        //   self.goodlist = self.goodlist.concat(res.data.result.goods);
        console.log(data)
        if (!data.length) {
          self.mescroll.endSuccess(curPageData.length, false)
        } else {
          self.mescroll.endSuccess(curPageData.length)
        }
        // })

        // //更新列表数据
        // self.pdlist = self.pdlist.concat(curPageData);

        //联网成功的回调,隐藏下拉刷新和上拉加载的状态;
        //mescroll会根据传的参数,自动判断列表如果无任何数据,则提示空;列表无下一页数据,则提示无更多数据;
        // console.log("page.num="+page.num+", page.size="+page.size+", curPageData.length="+curPageData.length+", self.pdlist.length==" + self.pdlist.length);

        //方法一(推荐): 后台接口有返回列表的总页数 totalPage
        // self.mescroll.endByPage(curPageData.length, totalPage); //必传参数(当前页的数据个数, 总页数)

        //方法二(推荐): 后台接口有返回列表的总数据量 totalSize
        //self.mescroll.endBySize(curPageData.length, totalSize); //必传参数(当前页的数据个数, 总数据量)

        //方法三(推荐): 您有其他方式知道是否有下一页 hasNext
        //self.mescroll.endSuccess(curPageData.length, hasNext); //必传参数(当前页的数据个数, 是否有下一页true/false)

        //方法四 (不推荐),会存在一个小问题:比如列表共有20条数据,每页加载10条,共2页.如果只根据当前页的数据个数判断,则需翻到第三页才会知道无更多数据,如果传了hasNext,则翻到第二页即可显示无更多数据.

      }, function() {
        //联网失败的回调,隐藏下拉刷新和上拉加载的状态;
        self.mescroll.endErr();
      });
    },
    // 写方法的地方
    getListDataFromNet(pageNum, pageSize, successCallback, errorCallback) {
      //延时一秒,模拟联网
      let data = {
        pageApp: pageNum,
        shopcode: 10000000
      }
      console.log(data)
      axios.get(common.a() + '/api/api-bin/wjcm/entry/datalist/queryAllGoods.action', { params: data }
      ).then(res => {
        console.log(res.data)
        if (pageNum == 1) {
          this.goodlist = res.data.result.goods
        } else {
          this.goodlist = this.goodlist.concat(res.data.result.goods);
        }
        successCallback && successCallback(this.goodlist, res.data.result.goods);//成功回调  传参过去

      })
        .catch(function(error) {
          errorCallback && errorCallback(this.goodlist)//失败回调
        });
    },
    handleinput() {
      this.$router.push({ path: '/search' })
    },
    onClickLeft() {
      this.$router.back(-1)
    },
    onClickRight() {

    },

    render() {
      let data = {
        pageApp: this.pageAPP,
        shopcode: 10000000
      }
      // console.log(data)
      axios.get(common.a() + '/api/api-bin/wjcm/entry/datalist/queryAllGoods.action', { params: data }
      ).then(res => {
        // console.log(res.data)
        this.goodlist = this.goodlist.concat(res.data.result.goods);
        if (res.data.result.goods.length == 0) {
          Toast('没有更多数据了')
        }
      })
    }
  },
  mounted() {
    let $this = this;
    $this.mescroll = new MeScroll("mescroll", { //请至少在vue的mounted生命周期初始化mescroll,以确保您配置的id能够被找到
      up: {
        callback: $this.upCallback, //上拉回调
        //以下参数可删除,不配置
        isBounce: false, //此处禁止ios回弹,解析(务必认真阅读,特别是最后一点): http://www.mescroll.com/qa.html#q10
        //page:{size:8}, //可配置每页8条数据,默认10
        toTop: { //配置回到顶部按钮
          src: require("../../assets/mescroll-totop.png"), //默认滚动到1000px显示,可配置offset修改
          //html: null, //html标签内容,默认null; 如果同时设置了src,则优先取src
          //offset : 1000
        },
        offset: 100,
        empty: { //配置列表无任何数据的提示
          warpId: "dataList",
          icon: "@../../assets/mescroll-empty.png",
          //						  	tip : "亲,暂无相关数据哦~" , 
          //						  	btntext : "去逛逛 >" , 
          //						  	btnClick : function() {
          //						  		alert("点击了去逛逛按钮");
          //						  	} 
        },
        htmlLoading: '<p class="upwarp-progress mescroll-rotate"></p><p class="upwarp-tip">加载中..</p>', //上拉加载中的布局
        htmlNodata: '<p class="upwarp-nodata">更多精彩敬请期待</p>', //无数据的布局
        loadFull: {
          use: false, //列表数据过少,不足以滑动触发上拉加载,是否自动加载下一页,直到满屏或者无更多数据为止;默认false,因为可通过调高page.size避免这个情况
          delay: 500 //延时执行的毫秒数; 延时是为了保证列表数据或占位的图片都已初始化完成,且下拉刷新上拉加载中区域动画已执行完毕;
        },
        //vue的案例请勿配置clearId和clearEmptyId,否则列表的数据模板会被清空
        //vue的案例请勿配置clearId和clearEmptyId,否则列表的数据模板会被清空
        //						clearId: "dataList",
        //						clearEmptyId: "dataList"
      }
    });

  },
  components: {
    goods,
    // tab
  }

}
</script>

<style lang="less">
.lt_footer{
  display: block;
}
.mescroll {
    position: fixed;
    top: 47px;
    bottom: 45px;
    height: auto;
}

.van-nav-bar__left {

  span {
    color: black;
  }
  .van-icon {
    color: black;
  }
}

.lt_search_box {
  background: -webkit-linear-gradient(left, #7a55f3, #2ee2df);
  /* Safari 5.1 - 6.0 */
  background: -o-linear-gradient(right, #7a55f3, #2ee2df);
  /* Opera 11.1 - 12.0 */
  background: -moz-linear-gradient(right, #7a55f3, #2ee2df);
  /* Firefox 3.6 - 15 */
  background: linear-gradient(to right, #7a55f3, #2ee2df);
  width: 100%;
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
    top: 12px;
  }
  .lt_search {
    text-align: center;
    padding: 8px 0px;
    border-radius: 62px;
    width: 100%;
    .search_text::-webkit-input-placeholder {
      font-size: 14px;
      color: rgba(255, 254, 254, 0.5);
    }
    .search_text {
      border: none;
      width: 80%;
      margin: 0;
      border-radius: 32px;
      height: 30px;
      font-size: 14px;
      text-align: center;
      background: rgba(96, 25, 134, 0.3);
      color: #ffffff;
    }
    .mui-icon-search {
      position: absolute;
      margin-top: 4px;
      /* left: 20px; */
      margin-left: 10px;
      font-size: 20px;
    }
  }
  .query_list {
    background: #f5f5f5;
    z-index: 999; //display: none;
    p {
      margin: 0;
      padding: 0px 20px;
      border-bottom: 1px solid #c8c7cc;
      height: 32px;
      line-height: 32px;
      text-align: center;
      color: #4038a5;
    }
  }
}

.list {
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  a {
    text-decoration: none;
    color: #007aff;
    text-align: center;
    display: inline-block;
    width: 33.33%;
    img {
      height: 100px;
      width: 100%;
    }
  }
}

.Incontent {
  width: 100%;
  height: 100%;
  position: relative;
  background-color: #f5f5f5;
  .lt_sort {
    display: flex;
    text-align: center;
    margin-top: 5px;

    a {
      flex: 1;
      font-size: 14px;
      color: black;
    }
    .on {
      color: red;
    }
  }
  .banner {
    height: 140px;
    text-align: center;
  }
  .banner img {
    height: 100%;
    margin: 0 auto;
  }
  .goods-list {
    display: flex;
    flex-wrap: wrap;
    margin-top: 5px; //padding: 2px;
    .goods-item:nth-child(even) {
      margin-left: 1%;
    }
    .goods-item {
      position: relative;
      margin-top: 4px;
      width: 49.5%;
      background-color: #fff;
      /* border: 1px solid #ccc; */
      /* margin: 2px; */
      /* box-shadow: 0 0 2px #aaa; */
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .goods_item_img {
        width: 100%;
        height: 200px;
        img {
          width: 100%;
          border: 0;
          height: 100%;
        }
      }
      .goods_item_p {
        margin-top: 8px;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        P {
          padding-left: 10px;
          font-size: 14px;
          color: #666666;
          white-space: nowrap;
          overflow: hidden;
          margin: 0;
          text-overflow: ellipsis;
        }
      }
      .goods_item_span {
        margin-top: 6px;
        padding-left: 10px;
        span {
          font-size: 14px;
          /* width: 32px; */
          /* height: 16px; */
          border: 1px solid #f63279;
          padding: 2px 5px;
          border-radius: 15px;
          color: #f63279;
        }
      }
      .goods_item_price {
        display: flex;
        justify-content: space-between;
        padding: 0px 10px;
        margin-top: 6px;
        margin-bottom: 8px;
        span {
          white-space: nowrap;
        }
      }
    }
  }
}
</style>
