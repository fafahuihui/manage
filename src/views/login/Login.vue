<template>
  <div id="login">
    <div class="login-content">
      <div class="login-content-row">
        <input type="text" placeholder="请输入账号"
           class="login-content-row-input" v-model="name">
      </div>
      <div class="login-content-row">
        <input type="text" placeholder="请输入密码"
          class="login-content-row-input" v-model="pwd">
      </div>

      <div>
        <button @click="login">登录</button>
      </div>
    </div>
  </div>
</template>

<script>
import Cookie from 'js-cookie'
import store from "@/store/index.js";
export default {
  name: 'Login',
    data() {
      return {
        name: '',
        pwd: '',
      }
    },
    methods: {
      login() {
        const token = '113254'
        Cookie.set('token',token)
        if(this.name=='admin' && this.pwd == "admin123") {
          store.commit('GETMENU', 
          [
            {
              'path': '/index',
              "name": 'index',
              'label': '首页',
              'icon': 's-home',
              'url': 'home/Home'
            },
            {
              'path': '/user',
              "name": 'user',
              'label': '用户管理',
              'icon': 'user',
              'url': 'user/User'
            },
            {
              'path': '/role',
              "name": 'role',
              'label': '角色管理',
              'icon': 'document',
              'url': 'role/Role'
            },
            {
              'path': '/menu',
              "name": 'menu',
              'label': '菜单管理',
              'icon': 'video-play',
              'url': 'menu/Menu'
            },
            {
              'label': '其他',
              'icon': 'location',
              'children': [
                {
                  'path': '/otherOne',
                  'name': 'otherOne',
                  'label': '其他页面一',
                  'icon': 'setting',
                  'url': 'other/OtherOne'
                },
                {
                  'path': '/otherTwo',
                  'name': 'otherTwo',
                  'label': '其他页面二',
                  'icon': 'setting',
                  'url': 'other/OtherTwo'
                }
              ]
            }
          ])
        } else if(this.name=='cs' && this.pwd == "cs123") {
          store.commit('GETMENU', 
          [
            {
              'path': '/index',
              "name": 'index',
              'label': '首页',
              'icon': 's-home',
              'url': 'home/Home'
            },
            {
              'label': '其他',
              'icon': 'location',
              'children': [
                {
                  'path': '/otherOne',
                  'name': 'otherOne',
                  'label': '其他页面一',
                  'icon': 'setting',
                  'url': 'other/OtherOne'
                },
                {
                  'path': '/otherTwo',
                  'name': 'otherTwo',
                  'label': '其他页面二',
                  'icon': 'setting',
                  'url': 'other/OtherTwo'
                }
              ]
            }
          ])
        }
        this.$router.push('/index')
      }
    }
  }
</script>

<style lang="scss" scoped>
#login {
  // border: 1px solid red;
  width: 100vw;
  display: flex;
  justify-content: center;
  
}
.login-content {
  border: 1px solid pink;
  background-color:#F1F3F4;
  margin-top: 30vh;
  padding-top: 40px;
  width: 560px;
  height: 320px;
  text-align: center;
  &-row {
    font-size: 26px;
    height: 40px;
    line-height: 40px;
    margin: 40px 0px 40px 0px;
    // margin-bottom: 40px;
    &-txt {

    }
    &-input {
      width: 55%;
      height: 40px;
      padding-left: 15px;
      outline: none;
    }
  }
}
</style>