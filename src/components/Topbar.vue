<template>
  <div id="topbar" :style="{backgroundColor: topicColor}">
    <div class="topbar-left">
      <img src="../../src/assets/img/layput/menu.png" alt=""
        class="topbar-left-menuIcon" @click="menuIconClick">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item
          v-for="item in breadcrumbList" :key=item.path
          @click.native="modifyNewMenu(item.path)"
          class="aaa"
          :to="{ path: item.path }">
          {{item.label}}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="topbar-right">
      <div class="topbar-right">
        <full-screen></full-screen>
        <el-dropdown  @command="handleCommand">
          <div class="topbar-right-user">
            <div class="topbar-right-user-img"></div>
            <div class="topbar-right-user-name">随意</div>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="perpon">个人中心</el-dropdown-item>
            <el-dropdown-item command="changePwd" @click.native="resetPwdDialogVisible = true">修改密码</el-dropdown-item>
            <el-dropdown-item command="toggleTopic" @click.native="toggleTopicDialogVisible = true">切换主题</el-dropdown-item>
            <el-dropdown-item command="back">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>

    <el-dialog
      title="切换主题"
      :visible.sync="toggleTopicDialogVisible"
      width="40%">
      <div class="toggleTopicDialog-content">
        <div class="toggleTopicDialog-content-eval"
            v-for="(item,index) in topicColorList" :key="index"
            @click="toggleTopicClick(item)">
          <div class="toggleTopicDialog-content-eval-block">
            <div class="toggleTopicDialog-content-eval-block-top"
              :style="{backgroundColor: item.color}"></div>
            <div class="toggleTopicDialog-content-eval-block-left"
              :style="{backgroundColor: item.color}">
            </div>
          </div>
          <div class="toggleTopicDialog-content-eval-txt">{{item.txt}}</div>
        </div>
      </div>
    </el-dialog>



    <el-dialog
      title="重置密码"
      :visible.sync="resetPwdDialogVisible"
      width="40%"
      @close="resetPwdDialogClose">
      <div class="resetPwdDialog-content">
        <div class="resetPwdDialog-content-row">
          <div class="resetPwdDialog-content-row-txt">旧密码：</div>
          <el-input placeholder="请输入密码" v-model="oldPwd" show-password></el-input>
          <!-- <input type="text" placeholder="" v-model="oldPwd"> -->
        </div>
        <div class="resetPwdDialog-content-row">
          <div class="resetPwdDialog-content-row-txt">新密码：</div>
          <el-input placeholder="请输入密码" v-model="newPwd" show-password></el-input>
          <!-- <input type="text" placeholder="" v-model="newPwd"> -->
        </div>
        <div class="resetPwdDialog-content-row">
          <div class="resetPwdDialog-content-row-txt">确认密码：</div>
          <el-input placeholder="请输入密码" v-model="confirmPwd" show-password></el-input>
          <!-- <input type="text" placeholder="" v-model="confirmPwd"> -->
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click.native="this.resetPwdDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click.native="submitPwd">确 定</el-button>
      </span>
    </el-dialog>


  </div>
</template>

<script>
import FullScreen from './FullScreen.vue';
import store from "@/store/index.js";
import { mapState } from 'vuex'
import Cookie from 'js-cookie'
export default {
  name: 'Topbar',
  data() {
      return {
        toggleTopicDialogVisible: false,
        resetPwdDialogVisible: false,
        oldPwd: "",
        newPwd: "",
        confirmPwd: "",
        topicColorList: [
          {
            'color': '#3C8DBC',
            'txt': '蓝'
          },
          {
            'color': '#00A65A',
            'txt': '绿'
          },
          {
            'color': '#D73925',
            'txt': '红'
          },
          {
            'color': '#E08E0B',
            'txt': '黄'
          },
          {
            'color': '#605CA8',
            'txt': '紫'
          },
          {
            'color': '#545c64',
            'txt': '灰'
          },
        ]
      }
  },
  components: { 
    FullScreen 
  },
  computed: {
    // ...mapState(['menuShow', 'breadcrumbList'])
    ...mapState({
      menuShow: state => state.layout.menuShow,
      breadcrumbList: state => state.layout.breadcrumbList,
      topicColor: state => state.layout.topicColor
    }),
    // breadcrumbList() {
    //   return JSON.parse(Cookie.get('breadcrumbList')) || store.state.layout.breadcrumbLists
    // }
  },
  methods: {
    toggleTopicClick(item) {
      store.commit('GETTOPICCOLOR', item.color)
    },
    handleCommand(command) {    
      if (command == "perpon") {
        this.$router.push('/perpon')
        store.commit('GETNEWSHOWMENU','/perpon')
        store.commit('GETBREADCRUMBLISTADD', {
          'path': '/perpon',
          "name": 'perpon',
          'label': '个人中心',
        })
        // this.$message('修改密码');
      } else if (command == "changePwd") {
        this.$message('修改密码');
      } else if (command == "toggleTopic") {
        this.$message('切换主题');
      } else if (command == "back") {
        Cookie.remove('token');
        Cookie.remove('menu');
        store.commit('GETBREADCRUMBLISTDELETE',[
            {
                'path': '/index',
                "name": 'index',
                'label': '首页',
            },
        ],)
        this.$router.push('/login')
      }
    },
    // handleCommand(command) {
    //   this.$message('click on item ' + command);
    // },
    menuIconClick() {
      // console.log('展开关闭')
      store.commit('GETMENUSHOW')
      // console.log(this.breadcrumbList)
    },
    modifyNewMenu(path) {
      console.log('1111111')
      store.commit('GETNEWSHOWMENU', path)
    },
    submitPwd() {
      if(!this.oldPwd || !this.newPwd || !this.confirmPwd) {
        this.$message({
          message: '请完善信息',
          type: 'warning'
        });
      } else {
        if(this.newPwd !== this.confirmPwd) {
          this.$message({
            message: '两次密码不一致',
            type: 'warning'
          });
        } else {
          this.$message({
            message: '修改成功',
            type: 'success'
          });
          this.resetPwdDialogVisible = false
        }
      }
    },
    resetPwdDialogClose() {
      this.oldPwd = ""
      this.newPwd = ""
      this.confirmPwd = ""
    },
  }
}
</script>

<style lang="scss" scoped>
/deep/.aaa {
  color: red;
}
#topbar {
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 30px;
}
.topbar-left {
  display: flex;
  align-items: center;
  &-menuIcon {
    width: 20px;
    height: 25px;
    margin-right: 20px;
  }
}

/deep/.el-breadcrumb__inner {
  color: #fff !important;
}
.topbar-right {
  display: flex;
  &-user {
    display: flex;
    align-items: center;
    margin-left: 30px;
    &-img {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      margin-right: 10px;
      background-color: pink;
    }
    &-name {
      color: #fff;
      font-size: 20px;
    }
  }
}
/deep/.el-dialog__header {
    background-color: #F8F8F8;
    border-bottom: 2px solid #E7EAEC;
}
.resetPwdDialog-content {
  margin: 0px 100px;
  &-row {
    display: flex;
    height: 40px;
    font-size: 18px;
    color: #676A6C;
    line-height: 40px;
    margin-bottom: 20px;
    align-items: center;
    &-txt {
      width: 120px;
      margin-right: 30px;
      display: flex;
      flex-direction: row-reverse;
    }
  }
}
.toggleTopicDialog-content {
  margin: 0px 0px 0px 30px;
  border: 1px solid pink;
  // height: 300px;
  display: flex;
  // justify-content: space-between;
  flex-wrap: wrap;
  &-eval {
    margin-right: 30px;
    margin-bottom: 30px;
    &-block {
      width: 200px;
      height: 60px;
      border: 1px solid #F3F3F4;
      &-top {
        height: 20px;
      }
      &-left {
        display: inline-block;
        width: 30px;
        height: 40px;
      }
    }
    &-block:hover {
      border: 1px solid blue;
    }
    &-txt {
      text-align: center;
    }
  }
}
</style>