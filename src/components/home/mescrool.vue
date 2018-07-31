<template>
  <div id="mescroll" class="mescroll">
    &lt;!&ndash;展示上拉加载的数据列表&ndash;&gt;
    <ul id="dataList" class="data-list" v-cloak>
      <li v-for="pd in pdlist">
        <img class="pd-img" :src="pd.pdImg"/>
        <p class="pd-name">{{pd.order.couponNum}}</p>
        <p class="pd-price">{{pd.pdPrice}} 元</p>
        <p class="pd-sold">已售{{pd.pdSold}}件</p>
      </li>
    </ul>
  </div>
</template>
<script>
  import "../../../../static/mescroll.m";

  export default {
    data() {
      return {
        mescroll: null,
        pdlist: [],
        userId: JSON.parse(sessionStorage.getItem("user")).id,
        role: JSON.parse(sessionStorage.getItem("user")).roleList[0].roleName,
        token: JSON.parse(sessionStorage.getItem("LoginToken")).LoginToken,
        orderHis: [],
      }
    },
    mounted() {


      this.mescroll = new MeScroll("mescroll", { //请至少在vue的mounted生命周期初始化mescroll,以确保您配置的id能够被找到
        up: {
          callback: this.upCallback, //上拉回调
          //以下参数可删除,不配置
          isBounce: false, //此处禁止ios回弹,解析(务必认真阅读,特别是最后一点): http://www.mescroll.com/qa.html#q10
          //page:{size:8}, //可配置每页8条数据,默认10
          toTop: { //配置回到顶部按钮
            src: "../res/img/mescroll-totop.png", //默认滚动到1000px显示,可配置offset修改
            //html: null, //html标签内容,默认null; 如果同时设置了src,则优先取src
            //offset : 1000
          },
          empty: { //配置列表无任何数据的提示
            warpId: "dataList",
            icon: "../res/img/mescroll-empty.png",
//         tip : "亲,暂无相关数据哦~" ,
//         btntext : "去逛逛 >" ,
//         btnClick : function() {
//          alert("点击了去逛逛按钮");
//         }
          },
          //vue的案例请勿配置clearId和clearEmptyId,否则列表的数据模板会被清空
          //vue的案例请勿配置clearId和clearEmptyId,否则列表的数据模板会被清空
//      clearId: "dataList",
//      clearEmptyId: "dataList"
        }
      });


    },
    methods: {

      upCallback(page) {
        // alert('上拉')
        //联网加载数据
        // var this = this;
        this.getListDataFromNet(page.num, page.size, (curPageData) => {
          console.log('curPageData', curPageData)
          //curPageData=[]; //打开本行注释,可演示列表无任何数据empty的配置

          // //如果是第一页需手动制空列表 (代替clearId和clearEmptyId的配置)
          if (page.num == 1) this.pdlist = [];

          //更新列表数据
          this.pdlist = this.pdlist.concat(curPageData.list);

          // //联网成功的回调,隐藏下拉刷新和上拉加载的状态;
          // //mescroll会根据传的参数,自动判断列表如果无任何数据,则提示空;列表无下一页数据,则提示无更多数据;
          // console.log("page.num=" + page.num + ", page.size=" + page.size + ", curPageData.length=" + curPageData.length + ", this.pdlist.length==" + this.pdlist.length);
          //
          // //方法一(推荐): 后台接口有返回列表的总页数 totalPage
          // //this.mescroll.endByPage(curPageData.length, totalPage); //必传参数(当前页的数据个数, 总页数)
          //
          // //方法二(推荐): 后台接口有返回列表的总数据量 totalSize
          // //this.mescroll.endBySize(curPageData.length, totalSize); //必传参数(当前页的数据个数, 总数据量)
          //
          // //方法三(推荐): 您有其他方式知道是否有下一页 hasNext
          // //this.mescroll.endSuccess(curPageData.length, hasNext); //必传参数(当前页的数据个数, 是否有下一页true/false)
          //
          // //方法四 (不推荐),会存在一个小问题:比如列表共有20条数据,每页加载10条,共2页.如果只根据当前页的数据个数判断,则需翻到第三页才会知道无更多数据,如果传了hasNext,则翻到第二页即可显示无更多数据.
          // this.mescroll.endSuccess(curPageData.length);
          this.mescroll.endSuccess(curPageData.list.length, curPageData.hasNext); //必传参数(当前页的数据个数, 是否有下一页true/false)


        }, () => {
          //联网失败的回调,隐藏下拉刷新和上拉加载的状态;
          this.mescroll.endErr();
        });
      },
      getListDataFromNet(pageNum, pageSize, successCallback, errorCallback) {
        //延时一秒,模拟联网
        setTimeout(() => {
          this.$axios({
            method: "get",
            params: {
              access_token: this.token,
              orderStatusList: [2],
              loginId: this.userId,
              pageSize: pageSize,
              pageNum: pageNum
            },
            url: "/order/queryPageOrderAndDtl"
          }).then((res) => {
            this.orderHis = res.data.resultList[0]
            console.log(this.orderHis)
            successCallback && successCallback(this.orderHis);//成功回调
          }, (err) => {

          })


        }, 500)
      }
    }
  }
</script>
<style>
  @import "../../../../static/mescroll.min.css";

  * {
    margin: 0;
    padding: 0;
     -webkit-touch-callout: none;
     -webkit-user-select: none;
     -webkit-tap-highlight-color: transparent;
  }

  body {
    background-color: white
  }

  ul {
    list-style-type: none
  }

  a {
    text-decoration: none;
    color: #18B4FE;
  }

  /*vue*/
  [v-cloak] {
    display: none;
  }

  /*模拟的标题*/
  .header {
    z-index: 9990;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 44px;
    line-height: 44px;
    text-align: center;
    border-bottom: 1px solid #eee;
    background-color: white;
  }

  .header .btn-left {
    position: absolute;
    top: 0;
    left: 0;
    padding: 12px;
    line-height: 22px;
  }

  /*mescroll滚动的区域*/
  .mescroll {
    position: fixed;
    top: 96px;
    bottom: 0px;
    height: auto;
  }

  /*展示上拉加载的数据列表*/
  .data-list li {
    position: relative;
    padding: 10px 8px 10px 120px;
    border-bottom: 1px solid #eee;
  }

  .data-list .pd-img {
    position: absolute;
    left: 18px;
    top: 18px;
    width: 80px;
    height: 80px;
  }

  .data-list .pd-name {
    font-size: 16px;
    line-height: 20px;
    height: 40px;
    overflow: hidden;
  }

  .data-list .pd-price {
    margin-top: 8px;
    color: red;
  }

  .data-list .pd-sold {
    font-size: 12px;
    margin-top: 8px;
    color: gray;
  }
</style>