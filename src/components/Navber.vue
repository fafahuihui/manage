<template>
  <div id="navber">
    <el-menu
      default-active="1-4-1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="menuShow"
      :background-color=topicColor
      text-color="#fff"
      active-text-color="#ffd04b"
      collapse-transition: true>
      <div class="navber-title" :style="{backgroundColor: topicColor}">
        {{menuShow ? '后台' : '后台管理系统'}}
      </div>
      <el-menu-item v-for="item in onSubmenu" :key="item.name"
        :index="item.name" @click="pathJump(item)">
        <i :class="`el-icon-${item.icon}`"></i>
        <span slot="title">{{item.label}}</span>
      </el-menu-item>

      <el-submenu :index="item.label"
        v-for="item in submenu" :key="item.label">
        <template slot="title">
          <i :class="`el-icon-${item.icon}`"></i>
          <span slot="title">{{item.label}}</span>
        </template>
        <el-menu-item-group v-for="it in item.children" :key="it.path">
          <el-menu-item :index="it.path" @click="pathJump(it)">{{it.label}}</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      
    </el-menu>
  </div>
</template>

<script>
import Cookie from 'js-cookie';
import {mapState} from 'vuex'
import store from "@/store/index.js";
export default {
    name: 'Navber',
    data() {
        return {

        }
    },
    computed: {
      ...mapState({
          menuShow: state => state.layout.menuShow,
          topicColor: state => state.layout.topicColor
      }),
      menuData() {
        return JSON.parse(Cookie.get('menu')) || store.state.layout.menu
      },
      submenu() {
        return this.menuData.filter(item => 
          item['children']
        )
      },
      onSubmenu() {
        return this.menuData.filter(item => 
          !item['children']
        )
      },
      menuShow() {
        console.log(this.$store.state.layout.menuShow)
        return this.$store.state.layout.menuShow
      }
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      pathJump(item) {
        this.$router.push(item.path)
        store.commit('GETNEWSHOWMENU',item.path)
        // console.log('klk:',Cookie.get('breadcrumbList'))
        store.commit('GETBREADCRUMBLISTADD', {
          'path': item.path,
          "name": item.name,
          'label': item.label,
        })
      }
    }
}
</script>

<style lang="scss" scoped>
#navber {
    height: 100vh;
}
.navber-title {
    height: 60px;
    font-size: 20px;
    line-height: 60px;
    color: #fff;
    font-weight: bolder;
    text-align: center;
    background-color: #545C64;
}
.el-menu {
    height: 100vh;
    border: none;
    &-item {
      font-size: 16px;
    }
}
/deep/.el-submenu__title {
  font-size: 16px;
  width: 200px;
}
.el-icon-menu {
  font-size: 20px;
}
</style>