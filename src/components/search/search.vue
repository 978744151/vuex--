<template>
  <div class="">

    <div class="header">
        <span class='' style='margin-top: 10px;font-size:18px;' @click='$router.back(-1)'> < </span>
        <div class="ca_search">
            <form target="frameFile" id="search_from">
                <input type="text" class="search_text" placeholder="请输入搜索关键字" v-model="inputname" ref="input1">
                <button class='go' @click="go">go</button>
                <iframe name='frameFile' style="display: none;"></iframe>
            </form>
        </div>
    </div>
        <div class="se_countent">

        <div class="sear_hot">
            <p>热门搜索</p>
            <div class="sear_span">
                <span @click="$router.push('product.html?key=iphone')">iphone</span>
                <span @click="$router.push('product.html?key=黑人')">黑人</span>
                <span @click="$router.push('product.html?key=nike')">nike</span>
                <span @click="$router.push('product.html?key=adidas')">adidas</span>
            </div>
        </div>
        <div class="sear_more">
            <p>更多搜索</p>
            <div style="border-bottom:1px solid black;" v-for="(items,index) in spanlist" :key="index">
                <span style="display:inline-block; margin:5px;" @click = "$router.push('/searchlist?key='+items)">{{items}}</span>
                <span @click="del(index)">X</span>
            </div>
        </div>
        <div class='sear_clear'>
            <div id='confirmBtn' type="button" class=" sear_clear">清除搜索记录</div>
        </div>
        <div id="info"></div>
    </div>
  </div>
</template>

<script>

export default {
    data() {
        return {
            spanlist : [],
            inputname : '',
            result:[]
        }
    },
    methods: {
        go(){
            this.result = JSON.parse(localStorage.getItem('spanlist'))  || [];
            // // console.log(this.inputname)\
            console.log(this.result.length)
            if(this.result.length > 10){
              this.result.pop()
            }
            var index = this.result.indexOf(this.inputname)
            console.log(index)            
            if(index != -1){
              this.result.splice(index,1);
            }
            this.result.unshift(this.inputname);
            localStorage.setItem('spanlist',JSON.stringify(this.result));
            this.spanlist = this.result;
            this.$router.push({ path: 'searchlist', query: { key: this.inputname }})
        },
        del(index){
          this.spanlist = JSON.parse(localStorage.getItem('spanlist'))  || '[]';
          this.spanlist.splice(index,1);
          localStorage.setItem('spanlist',JSON.stringify(this.spanlist));
        }
    },
    mounted(){
        this.spanlist = JSON.parse(localStorage.getItem('spanlist'))  || '[]';
        // this.spans = JSON.parse(this.spanlist)
        // console.log(this.spans)
    }
}
</script>

<style lang="less">

.header{
  height: 45px;
  width: 100%;
  background: rgba(250,250,250,0.90);
  display: flex;
}
.ca_search {
  text-align: center;
  padding: 8px 0px;
  border-radius: 62px;
  width: 100%;
}

input {
  border: 1px solid rgba(0, 0, 0, .2);
  outline: 0;
  width: 94.7%;
  margin: 0;
  border-radius: 25px;
  height: 31px;
  font-size: 14px;
  text-align: center;
  box-sizing: border-box;
}
.se_countent{
  padding:10px 10px;
  .sear_hot{
    padding: 3px 10px;
    p{
      margin: 0;
    }
    .sear_span{
      padding: 10px 0px;
      font-size:14px;
      span{
        border: 1px solid #ccc;
        padding: 0px 10px;
        background: #eee;
      }
    }
  }
  #loader{
    position: absolute;
    left:50%;
    top:50%;
    -webkit-transform: translate(-50%);
    -moz-transform: translate(-50%);
    -ms-transform: translate(-50%);
    -o-transform: translate(-50%);
    transform: translate(-50%);
    z-index: 999;
  }
  .sear_more{
    padding: 3px 10px;
    p{
      margin: 0;
    }
    ul{
      font-size:14px;
      li{
        padding: 5px 0px;
        position: relative;
        .mui-icon-close{
          position: absolute;
          right:0px;
          font-size: 20px;
        }
      }
    }
  }
  .sear_clear{
    padding: 3px;
    font-size: 14px;
    text-align: center;
    margin-top: 20px;
    span{
      display: inline-block;
      border: 1px solid #ccc;
      padding: 3px 5px;
    }
  }
}
.mui-popup.mui-popup-in{
  display: none;
}
</style>
