<template>
  <div>
      <div class="header">
        <div class='lt_search_box'>
          <div class="lt_search">
            <img src="../../assets/Arrow.png" alt="" @click="$router.push('/home')">
            <img src="../../assets/Free_Chat_Typing.png" alt="">
            <i class='mui-icon mui-icon-search' style="color: white"></i>
            <input type="text" class="search_text" placeholder="请输入搜索关键字">
          </div>
        </div>
      </div>
    <van-nav-bar title="登陆" />
    <!-- <van-field
          v-model="username"
          label="用户名"
          placeholder="请输入用户名"
        />

        <van-field
          v-model="password"
          type="password"
          label="密码"
          placeholder="请输入密码"
        /> -->
    <mt-field label="用户名" placeholder="请输入用户名" v-model="username"></mt-field>
    <mt-field label="密码" placeholder="请输入邮箱" type="text" v-model="password"></mt-field>
    <div style="text-align:center">
      <van-button type="primary" @click="d_login">登陆</van-button>
      <van-button type="primary" @click="bind_yzm">{{bind_y}}</van-button>
    </div>
    <!-- <tab :change="selected"></tab> -->
  </div>
</template>

<script>
// import tab from '../common/tabbar'
import axios from "axios"
import Qs from 'qs'
import Vue from "vue"
import { Button } from 'vant';
import common from '../common/common'
Vue.use(Button);
import { Cell, CellGroup } from 'vant';
import { NavBar } from 'vant';

Vue.use(NavBar);
Vue.use(Cell).use(CellGroup);

import { Toast } from 'mint-ui';
import { Field } from 'mint-ui';

Vue.component(Field.name, Field);
export default {
  data() {
    return {
      username: '15115462101',
      password: "",
      selected: '4',
      yzm:'',
      bind_y:"发送验证码",
      show:''
    }
  },

  methods: {
   
    d_login() {
      if (this.username == '') {
        Toast('请输入用户名')
      }
      if (this.password == '') {
        Toast('请输入密码')
      }
      var data = {
          phonenumber: this.username,
          deviceid: '1111',
          type: '2',
          yzm:this.password
      }
      axios.get(common.a() + '/api/api-bin/wyy/entry/userLogin.action',{params:data}
      ).then(res => {
        console.log(res)
        if (res.data.success == 1) {
          localStorage.setItem('user', res.data.result.access_code);
          localStorage.setItem('userid', res.data.result.user_info.userid);
          localStorage.setItem('username', res.data.result.user_info.nickname);
          localStorage.setItem('portraiturl', res.data.result.user_info.portraiturl);
          Toast('登陆成功')
          setTimeout(() => {
            this.$router.push({ path: 'home' })
          }, 1000)
        } else {
          Toast('请输入正确用户名和密码')
        }
      }).catch(error => {
        console.log(error)
      })
    },
    bind_yzm() {
            console.log(1)
            // if (!this.phone.trim()) {
            //     Toast({
            //         message: '请输入正确的手机号',
            //         position: 'bottom',
            //         duration: 3000
            //     });
            //     return false;
            // }
            var time;
            this.bind_y = 60;
            time = setInterval(() => {
                this.bind_y--
                if (this.bind_y == 0) {
                    this.bind_y = '获取验证码';
                    clearInterval(time)
                }
            }, 1000)
            
            axios({
                method: 'post',
                transformRequest: [data => Qs.stringify(data)],
                url: common.a() + '/api/api-bin/wyy/entry/sendSmsCode.action',
                data: {
                    type: 1,
                    phonenumber: this.username,
                    deviceid: 1212
                }
            }).then(res => {
                console.log(res)
                if (res.data.success == 1) {
                    this.yzm = res.data.result.yzm
                    this.password = res.data.result.yzm
                }else{
                    Toast({
                    message: res.data.errmsg,
                    position: 'bottom',
                    duration: 3000
                });
                }
            }).catch(error => {
                Toast({
                    message: '请求出错',
                    position: 'bottom',
                    duration: 3000
                });
            })
        }
  },
   watch: {//使用watch 监听$router的变化
    $route(to, from) {
      //如果to索引大于from索引,判断为前进状态,反之则为后退状态
      if(to.meta.index > from.meta.index){
        //设置动画名称
         this.show = false
      }else{
        
      }
    }
  },
  components: {
    Field,
    // tab
  }
}
</script>

<style>
.lt_footer{
  /* display: none; */
}
</style>
