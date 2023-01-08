<template>
  <div id="perpon">
    <div class="perpon-personData">
      <div class="perpon-personData-title">个人资料</div>
      <div class="perpon-personData-img">
        <div></div>
      </div>
      <div class="perpon-personData-txt">修改头像</div>
      <div class="perpon-personData-row">
        <div class="perpon-personData-row-label">
          <i class="el-icon-user-solid"></i>
          登录名称:
        </div>
        <div>{{personData.name}}</div>
      </div>

      <div class="perpon-personData-row">
        <div class="perpon-personData-row-label">
          <i class="el-icon-user-solid"></i>
          手机号码:
        </div>
        <div>{{personData.phoneNum}}</div>
      </div>

      <div class="perpon-personData-row">
        <div class="perpon-personData-row-label">
          <i class="el-icon-user-solid"></i>
          创建时间:
        </div>
        <div>{{personData.createData}}</div>
      </div>
    </div>
    <div class="perpon-basicData">
      <div class="perpon-basicData-title">基本资料</div>
      <div class="perpon-basicData-fromHead">
        <div class="perpon-basicData-fromHead-txt"
            :class="{perponFromHeadActive: fromHeadTxtIndex === 0}"
            @click="aa(0)">基本资料</div>
        <div class="perpon-basicData-fromHead-txt"
            :class="{perponFromHeadActive: fromHeadTxtIndex === 1}"
            @click="aa(1)">修改密码</div>
      </div>
      <div v-show="fromHeadTxtIndex === 0">
        <div class="perpon-basicData-fromHead-row">
          <div class="perpon-basicData-fromHead-row-txt">用户名称：</div>
          <input type="text" :placeholder=basicData.username v-model="username">
        </div>
        <div class="perpon-basicData-fromHead-row">
          <div class="perpon-basicData-fromHead-row-txt">手机号码：</div>
          <input type="text" :placeholder=basicData.phoneNum v-model="phoneNum">
        </div>
        <div class="perpon-basicData-fromHead-row">
          <div class="perpon-basicData-fromHead-row-txt">手机号码：</div>
          <el-radio v-model="sex" label='1'>男</el-radio>
          <el-radio v-model="sex" label='2'>女</el-radio>
        </div>
          <el-button type="primary" class="perpon-basicData-fromHead-button" @click.native="submitBasicData">保存</el-button>
      </div>
      <div v-show="fromHeadTxtIndex === 1">
        <div class="perpon-basicData-fromHead-row">
          <div class="perpon-basicData-fromHead-row-txt">旧密码：</div>
          <el-input placeholder="请输入密码" v-model="oldPwd" show-password></el-input>
          <!-- <input type="text" placeholder="" v-model="oldPwd"> -->
        </div>
        <div class="perpon-basicData-fromHead-row">
          <div class="perpon-basicData-fromHead-row-txt">新密码：</div>
          <el-input placeholder="请输入密码" v-model="newPwd" show-password></el-input>
          <!-- <input type="text" placeholder="" v-model="newPwd"> -->
        </div>
        <div class="perpon-basicData-fromHead-row">
          <div class="perpon-basicData-fromHead-row-txt">确认密码：</div>
          <el-input placeholder="请输入密码" v-model="confirmPwd" show-password></el-input>
          <!-- <input type="text" placeholder="" v-model="confirmPwd"> -->
        </div>
          <el-button type="primary" class="perpon-basicData-fromHead-button" @click.native="submitPwd">保存</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Perpon",
  data() {
    return {
      personData: {
        'name': 'admin',
        'phoneNum': '12345678945',
        'createData': '2022-10-19',
      },
      basicData: {
        'username': '随意',
        'phoneNum': '12345678945',
        'sex': '1',
      },
      fromHeadTxtIndex: 0,
      radio: '1',
      username: "",
      phoneNum: "",
      sex: "",
      oldPwd: "",
      newPwd: "",
      confirmPwd: "",
    }
  },
  computed: {
    
  },
  methods: {
    aa(num) {
      this.fromHeadTxtIndex = num
    },
    submitBasicData() {
      console.log(this.username)
      console.log(this.phoneNum)
      console.log(this.sex)
      console.log('提交修改')
    },
    submitPwd() {
      console.log(this.oldPwd)
      console.log(this.newPwd)
      console.log(this.confirmPwd)
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
        }
      }
    }
  },
  created() {
    console.log('111')
    this.sex = this.basicData.sex
  }
}
</script>

<style lang="scss" scoped>
#perpon {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.perpon-personData {
  background-color: #fff;
  border-radius: 5px;
  width: 25%;
  height: 500px;
  box-shadow: 1px 1px 3px rgba(0,0,0,0.16);
  &-title {
    background-color: #F0F3F4;
    height: 50px;
    font-size: 20px;
    line-height: 50px;
    padding-left: 15px;
  }
  &-img {
    display: flex;
    justify-content: center;
    padding: 15px 0px;
  }
  &-img > div {
    display: block;
    width: 140px;
    height: 140px;
    border-radius: 50%;
    background-color: pink;
  }
  &-txt {
    color: #337AB7;
    font-size: 18px;
    margin-bottom: 15px;
    text-align: center;
  }
  &-row {
    display: flex;
    justify-content: space-between;
    height: 50px;
    font-size: 18px;
    line-height: 50px;
    color: #676A6C;
    margin: 0px 20px;
    border-top: 1px solid #E7EAEC;
    border-bottom: 1px solid #E7EAEC;
    &-label {

    }
  }
}

.perpon-basicData {
  display: inline-block;
  background-color: #fff;
  border-radius: 5px;
  width: 74%;
  box-shadow: 1px 1px 3px rgba(0,0,0,0.16);
  &-title {
    background-color: #F0F3F4;
    height: 50px;
    font-size: 20px;
    line-height: 50px;
    padding-left: 15px;
  }
  &-fromHead {
    display: flex;
    margin: 15px 20px 10px 20px;
    border-bottom: 1px solid #F4F4F4;
    &-txt {
      // border: 1px solid red;
      height: 50px;
      width: 120px;
      font-size: 18px;
      line-height: 50px;
      text-align: center;
      border-top: 5px solid #fff;
    }
    &-row {
      display: flex;
      height: 40px;
      font-size: 18px;
      color: #676A6C;
      line-height: 40px;
      margin-right: 40px;
      margin-bottom: 20px;
      align-items: center;
      &-txt {
        width: 120px;
        margin-left: 50px;
        margin-right: 30px;
        display: flex;
        flex-direction: row-reverse;
      }
    }
    &-row > input {
      outline: none;
      width: 80%;
      margin-right: 30px;
      height: 40px;
      border: 1px solid #DCDFE6;
      border-radius: 3px;
      font-size: 16px;
    }
    &-row > input:focus {
      border: 1px solid #409EFF;
    }
    &-button {
      margin: 0 auto;
      display: flex;
    }
  }
}
.perponFromHeadActive {
  border-top: 5px solid #1890FF;
  border-left: 1px solid #F4F4F4;
  border-right: 1px solid #F4F4F4;
  border-bottom: 1px solid #fff !important;
}
</style>