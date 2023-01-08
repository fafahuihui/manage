<template>
  <div id="layout">
    <!-- <navber></navber>
    <div>
      <topbar></topbar>
      <router-view></router-view>
    </div> -->

    <el-container>
      <el-aside width='auto'>
        <navber></navber>
      </el-aside>
      <el-container>
        <el-header>
          <topbar></topbar>
        </el-header>
        <el-main>
          <div class="layout-tagList">
            <el-tag
              :effect="newShowMenu === item.path ? 'dark' : 'light'"
              v-for="item in breadcrumbList"
              :key="item.label"
              @click="pathJump(item.path)"
              @close="handleClose(item)"
              :closable="item.name === 'index' ? false : true">
              {{item.label}}
            </el-tag>
          </div>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>


  </div>
</template>

<script>
import Navber from '@/components/Navber.vue'
import Topbar from '@/components/Topbar.vue'
import store from "@/store/index.js";
import { mapState } from 'vuex'
// import Cookie from 'js-cookie'
export default {
  name: 'Layout',
  data() {
    return {

    }
  },
  components: {
    Navber,
    Topbar,
  },
  computed: {
    ...mapState({
      menuShow: state => state.layout.menuShow,
      breadcrumbList: state => state.layout.breadcrumbList,
      newShowMenu: state => state.layout.newShowMenu
    }),
    // breadcrumbList() {
    //   return JSON.parse(Cookie.get('breadcrumbList')) || store.state.layout.breadcrumbList
    // }
  },
  methods: {
    handleClose(item) {
      const index = this.breadcrumbList.indexOf(item)
      const listLength = this.breadcrumbList.length
      const temp = this.breadcrumbList
      temp.splice(index, 1)
      // console.log('index:',index)
      // console.log('length:',length)
      // console.log('temp:',temp)
      if(index !== 0) {
        //如果点击的不是首页
        // console.log('index !== 0')
        store.commit('GETBREADCRUMBLISTDELETE',temp)
        if(index + 1 === listLength) {
          //如果点击的是最后一个就进行路由跳转
          console.log('index + 1 === listLength')
          // console.log(this.breadcrumbList.slice(-1)[0].label)
          this.$router.push(this.breadcrumbList.slice(-1)[0].path)
          store.commit('GETNEWSHOWMENU', this.breadcrumbList.slice(-1)[0].path)
        } else {
          console.log('index:',index)
          console.log('item[index]:',this.breadcrumbList[index])
          this.$router.push(this.breadcrumbList[index].path)
          store.commit('GETNEWSHOWMENU', this.breadcrumbList[index].path)
        }
      }


    },
    pathJump(path) {
      store.commit('GETNEWSHOWMENU', path)
      this.$router.push(path)
      
    }
  }
}
</script>

<style lang="scss" scoped>
#layout {
  display: flex;
  background-color: #F3F3F4;
}
.el-header {
  padding: 0px;
}
.layout-tagList {
  margin-bottom: 15px;
  height: 30px;
}
/deep/.el-tag {
  margin-right: 15px;
}
</style>