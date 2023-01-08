<template>
  <div id="user">
    <search-bar :searchBarData = userSearchBarData></search-bar>
    <div class="user-fromCard">
        <div class="user-fromCard-actionBar">
          <div class="user-fromCard-actionBar-left">
              <el-button type="primary" icon="el-icon-plus"
                  class="user-fromCard-actionBar-left-button"
                  @click="userInsert">
                  新增
              </el-button>
              <el-button type="success" icon="el-icon-edit-outline"
                  class="user-fromCard-actionBar-left-button"
                  :disabled="multipleSelection.length !== 1"
                  @click="handleEdit(multipleSelection[0])">
                  修改
              </el-button>
              <el-button type="danger" icon="el-icon-close"
                  class="user-fromCard-actionBar-left-button"
                  :disabled="multipleSelection.length === 0"
                  @click="userDelete(multipleSelection)">
                  删除
              </el-button>
              <el-button type="info" icon="el-icon-upload2"
                  class="user-fromCard-actionBar-left-button"
                  @click="userImport">
                  导入
              </el-button>
              <el-button type="warning" icon="el-icon-download"
                  class="user-fromCard-actionBar-left-button"
                  @click="userExport">
                  导出
              </el-button>
          </div>

          <div class="user-fromCard-actionBar-right">
            <el-button type="primary" icon="el-icon-search"
              class="user-fromCard-actionBar-right-button" @click.native="searchClick"></el-button>
            <el-button type="primary" icon="el-icon-refresh"
              class="user-fromCard-actionBar-right-button"></el-button>
            <el-button type="primary" icon="el-icon-document-copy"
              class="user-fromCard-actionBar-right-button"></el-button>
          </div>
        </div>

        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange">
          <el-table-column
            type="selection"
            min-width="10">
          </el-table-column>
          <el-table-column
            prop="id"
            label="用户ID"
            min-width="15">
          </el-table-column>
          <el-table-column
            prop="an"
            label="登录账号"
            min-width="20">
          </el-table-column>
          <el-table-column
            prop="name"
            label="用户名称"
            min-width="20">
          </el-table-column>
          <el-table-column
            prop="sex"
            label="性别"
            min-width="10">
            <template slot-scope="scope">
              <div>{{scope.row.sex === 0 ? '男' : '女'}}</div>
            </template>
          </el-table-column>
          <el-table-column
            prop="phoneNum"
            label="手机号"
            min-width="20">
          </el-table-column>
          <el-table-column label="用户状态" min-width="15">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.switchvalue"
                active-color="#13ce66"
                inactive-color="#ff4949">
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column
            prop="date"
            label="创建时间"
            min-width="20">
          </el-table-column>
          <el-table-column label="操作"  min-width="40">
            <template slot-scope="scope" class="tableRow">
              <el-button
                size="mini"
                @click="handleEdit(scope.row)">编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.row.id,scope.row)">删除</el-button>
              <div style="display: inline-block;
                  margin-left: 10px;
                  position: relative;
                  border: 1px solid red;">
                <el-button
                  size="mini"
                  type="danger">更多操作</el-button>
              </div>
              
            </template>
          </el-table-column>
        </el-table>

        <div class="user-fromCard-tip">显示第 1 到第 2 条记录，总共 2 条记录</div>

        <el-pagination
          background
          layout="prev, pager, next"
          :total="1000"
          class="user-fromCard-pagination">
        </el-pagination>
    </div>


    <el-dialog
      title="添加用户"
      :visible.sync="userInsertDialogVisible"
      :show-close=false
      width="50%"
      @close="userInsertDialogVisibleClose">
      <div class="userInserContent">
        <div class="userInserContent-eval">
          <div>
            <span class="userInserContent-eval-txt">用户名称：</span>
            <input type="text" placeholder="" v-model="userInserName"
                    class="userInserContent-eval-input">
          </div>
          <div class="userInserContent-eval-warning"
              :class="{userInserWarnActive: userInsertSubmitClickState && !userInserName}">
            <i class="el-icon-error"></i>用户名不能为空</div>
        </div>
        <div class="userInserContent-eval">
          <div>
            <span class="userInserContent-eval-txt">登录账号：</span>
            <input type="text" placeholder="" v-model="userInserAn"
                    class="userInserContent-eval-input">
          </div>
          <div class="userInserContent-eval-warning"
              :class="{userInserWarnActive: userInsertSubmitClickState && !userInserAn}">
            <i class="el-icon-error"></i>账号不能为空</div>
        </div>
        <div class="userInserContent-eval">
          <div>
            <span class="userInserContent-eval-txt">登录密码：</span>
            <input type="text" placeholder="" v-model="userInserPwd"
                    class="userInserContent-eval-input">
            <div class="userInserContent-eval-warning"
              :class="{userInserWarnActive: userInsertSubmitClickState && !userInserPwd}">
              <i class="el-icon-error"></i>密码不能为空</div>
          </div>
        </div>
        <div class="userInserContent-eval">
          <div>
            <span class="userInserContent-eval-txt">手机号：</span>
            <input type="text" placeholder="" v-model="userInserPhoneNum"
                    class="userInserContent-eval-input">
          </div>
          <div class="userInserContent-eval-warning"
              :class="{userInserWarnActive: userInsertSubmitClickState && !userInserPhoneNum}">
            <i class="el-icon-error"></i>手机号不能为空</div>
        </div>
        <div class="userInserContent-eval" style="margin-top: 0px; width: 270px;">
          <div style="height: 35px; line-height: 35px;">
            <span class="userInserContent-eval-txt">性别：</span>
            <el-radio v-model="userInserSex" label="0">男</el-radio>
            <el-radio v-model="userInserSex" label="1">女</el-radio>
          </div>
          <div class="userInserContent-eval-warning"
              :class="{userInserWarnActive: userInsertSubmitClickState && !userInserSex}">
            <i class="el-icon-error"></i>性别不能为空</div>
        </div>
        <div class="userInserContent-eval" style="margin-top: 10px;">
          <span class="userInserContent-eval-txt">用户状态：</span>
          <el-switch
            v-model="userInserSwitchValue"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="userInsertCancelClick">取 消</el-button>
        <el-button type="primary" @click="userInsertSubmitClick">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="修改用户"
      :visible.sync="userUpdateDialogVisible"
      :show-close=false
      width="50%">
      <div class="userInserContent">
        <div class="userInserContent-eval">
          <div>
            <span class="userInserContent-eval-txt">用户名称：</span>
            <input type="text" :placeholder="multipleSelection.name"
                    class="userInserContent-eval-input">
          </div>
        </div>
        <div class="userInserContent-eval">
          <div>
            <span class="userInserContent-eval-txt">登录账号：</span>
            <input type="text" :placeholder="multipleSelection.an"
                    class="userInserContent-eval-input">
          </div>
        </div>
        <div class="userInserContent-eval">
          <div>
            <span class="userInserContent-eval-txt">手机号：</span>
            <input type="text" :placeholder="multipleSelection.phoneNum"
                    class="userInserContent-eval-input">
          </div>
        </div>
        <div class="userInserContent-eval" style="margin-top: 0px; width: 270px;">
          <div style="height: 35px; line-height: 35px;">
            <span class="userInserContent-eval-txt">性别：</span>
            <el-radio v-model="multipleSelection.sex" label="0">男</el-radio>
            <el-radio v-model="multipleSelection.sex" label="1">女</el-radio>
          </div>
        </div>
        <div class="userInserContent-eval" style="margin-top: 10px;">
          <span class="userInserContent-eval-txt">用户状态：</span>
          <el-switch
            v-model="multipleSelection.switchvalue"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="userUpdateDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="userUpdataSubmitClick">确 定</el-button>
      </span>
    </el-dialog>




  </div>
</template>

<script>
import SearchBar from '@/components/SearchBar.vue'
import store from "@/store/index.js";
export default {
    name: 'User',
    components: { SearchBar, 
     },
    data() {
        return {
          userSearchBarData: {
            theme: "user",
            list: [
              {
                'txt': '登录名称',
                'type': 'input',
                'dataModel': 'name' 
              },
              {
                'txt': '手机号码',
                'type': 'input',
                'dataModel': 'phoneNum' 
              },
              {
                'txt': '用户状态',
                'type': 'select',
                'dataModel': 'userState', 
                'options': [
                  {
                      value: '选项1',
                      label: '正常'
                  }, 
                  {
                      value: '选项2',
                      label: '停用'
                  }, 
                ]
              },
              {
                'txt': '创建时间',
                'type': 'date',
                'dataModel': 'createTime' 
              },
            ]
          },


          userInsertDialogVisible: false,
          userInserSwitchValue: true,
          userInsertSubmitClickState: false,
          userInserName: "",
          userInserAn: "",
          userInserPwd: "",
          userInserPhoneNum: "",
          userInserSex: "",
          userUpdateDialogVisible: false,
          tableData: [
            {
              date: '2016-05-04',
              id: 0,
              name: '王小虎',
              switchvalue: true,
              an: '151515',
              sex: '0',
              phoneNum: '12365478951',
            }, 
            {
              date: '2016-05-04',
              id: 0,
              name: '王小虎',
              switchvalue: true,
              an: '151515',
              sex: '0',
              phoneNum: '12365478951',
            }, 
            {
              date: '2016-05-04',
              id: 0,
              name: '王小虎',
              switchvalue: true,
              an: '151515',
              sex: '0',
              phoneNum: '12365478951',
            }, 
            {
              date: '2016-05-04',
              id: 0,
              name: '王小虎',
              switchvalue: false,
              an: '151515',
              sex: '0',
              phoneNum: '12365478951',
            }, 
            {
              date: '2016-05-04',
              id: 0,
              name: '王小虎',
              switchvalue: true,
              an: '151515',
              sex: '1',
              phoneNum: '12365478951',
            }, 
            {
              date: '2016-05-04',
              id: 0,
              name: '王小虎',
              switchvalue: true,
              an: '151515',
              sex: '1',
              phoneNum: '12365478951',
            }, 
            {
              date: '2016-05-04',
              id: 0,
              name: '王小虎',
              switchvalue: true,
              an: '151515',
              sex: '0',
              phoneNum: '12365478951',
            }, 
            {
              date: '2016-05-04',
              id: 0,
              name: '王小虎',
              switchvalue: true,
              an: '151515',
              sex: '1',
              phoneNum: '12365478951',
            }, 
          ],
          multipleSelection: [],
        }
    },
    methods: {
      //搜索栏的显示与隐藏
      searchClick() {
        store.commit('GETUSERSEARCHSHOW')
      },
      //表格编辑/修改
      handleEdit(row) {
        this.multipleSelection = {...row}
        this.userUpdateDialogVisible = true
      },
      //修改用户信息弹出框的提交按钮
      userUpdataSubmitClick() {
        this.userUpdateDialogVisible = false
        this.$message({
          message: `修改用户信息成功，名字：${this.multipleSelection.name}账号：${this.multipleSelection.an}
                    性别：${this.multipleSelection.sex}手机号：${this.multipleSelection.phoneNum}状态：${this.multipleSelection.switchvalue}`,
          type: 'success'
        });
        
      },
      //表格删除
      handleDelete(index, row) {
        console.log(index, row);
        this.$message({
          message: '删除id为' + index + '的角色：' + row.name,
          type: 'warning'
        });
      },
      //新增用户
      userInsert() {
        this.userInsertDialogVisible = true
        console.log('增加用户')
      },
      userInsertDialogVisibleClose() {
        this.userInserName = ""
        this.userInserAn = ""
        this.userInserPwd = ""
        this.userInserPhoneNum = ""
        this.userInserSex = ""
        this.userInsertSubmitClickState = false
      },
      //新增用户弹出框的取消按钮
      userInsertCancelClick() {
        this.userInsertDialogVisible = false
      },
      //新增用户弹出框的提交按钮
      userInsertSubmitClick() {
        this.userInsertSubmitClickState = true
        if(!this.userInserName  || !this.userInserAn || !this.userInserPwd) {
          this.$message({
            message: '请完善用户信息',
            type: 'warning'
          });
        } else {
          console.log('添加用户，提交用户信息')
          this.$message({
            message: `添加用户成功，名字：${this.userInserName}账号：${this.userInserAn}密码：${this.userInserPwd}
                      性别：${this.userInserSex}手机号：${this.userInserPhoneNum}状态：${this.userInserSwitchValue}`,
            type: 'success'
          });
          this.userInsertDialogVisible = false
        }
      },
      //表格的多选框点击
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      //
      userUpdateCancelClick() {
        this.userUpdateDialogVisible = false
      },
      userUpdateSubmitClick() {
        this.userUpdateDialogVisible = false
      },
      userDelete() {
        console.log('删除用户：',this.multipleSelection)
        console.log('删除用户：',this.multipleSelection)
        let idArray = this.multipleSelection.map((x) => {
          return x.id
        })
        console.log('idArray:',idArray)
        this.$message({
            message:'删除id为：' + idArray + '的角色',
            type: 'warning'
          });
      },
      userImport() {
        console.log('导入用户')
      },
      userExport() {
        console.log('导出用户')
      }
    },

}
</script>

<style lang="scss" scoped>
.user-fromCard {
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 1px 1px 3px rgba(0,0,0,0.16);
  // height: 70vh;
  padding-bottom: 10px;
  &-actionBar {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 15px;
    &-left {
        display: flex;
        flex-wrap: wrap;
        &-button {
          height: 35px;
          padding: 10px;
        }
    }
    &-right {
      &-button {
        margin: 0px;
        border-radius: 0px;
        background-color: #fff;
        color: #000;
        border: 1px solid #DCDFE6;
        padding: 12px;
      }
    }
  }
  &-tip {
    margin: 10px 0px 10px 10px;
  }
  &-pagination {
    text-align: center;
  }
}
.userInserContent {
  display: flex;
  flex-wrap: wrap;
  &-eval {
    margin: 0px 20px 20px 0px;
    &-txt {
      width: 70px;
      display: inline-block;
    }
    &-warning {
      color: red;
      display: none;
    }
    &-input {
      outline: none;
      height: 33px;
      width: 200px;
      border: 1px solid #DCDFE6;
      border-radius: 3px;
    }
    input:focus{
      border: 1px solid #409EFF;
    }
  }
}
.userInserWarnActive {
  display: block;
}
</style>