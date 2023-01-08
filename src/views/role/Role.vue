<template>
  <div id="role">
    <search-bar :searchBarData = roleSearchBarData></search-bar>

    <div class="role-fromCard">
      <div class="role-fromCard-actionBar">
          <div class="role-fromCard-actionBar-left">
              <el-button type="primary" icon="el-icon-plus"
                  class="role-fromCard-actionBar-left-button"
                  @click="roleInsert">
                  新增
              </el-button>
              <el-button type="success" icon="el-icon-edit-outline"
                  class="role-fromCard-actionBar-left-button"
                  :disabled="multipleSelection.length !== 1"
                  @click="handleEdit(multipleSelection[0])">
                  修改
              </el-button>
              <el-button type="danger" icon="el-icon-close"
                  class="role-fromCard-actionBar-left-button"
                  :disabled="multipleSelection.length === 0"
                  @click="roleDelete">
                  删除
              </el-button>
              <el-button type="warning" icon="el-icon-download"
                  class="role-fromCard-actionBar-left-button"
                  @click="roleExport">
                  导出
              </el-button>
          </div>

          <div class="role-fromCard-actionBar-right">
            <el-button type="primary" icon="el-icon-search"
              class="role-fromCard-actionBar-right-button" @click.native="searchClick"></el-button>
            <el-button type="primary" icon="el-icon-refresh"
              class="role-fromCard-actionBar-right-button"></el-button>
            <el-button type="primary" icon="el-icon-document-copy"
              class="role-fromCard-actionBar-right-button"></el-button>
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
          label="角色编号"
          min-width="15">
        </el-table-column>
        <el-table-column
          prop="roleName"
          label="角色名称"
          min-width="20">
        </el-table-column>
        <el-table-column
          prop="purview"
          label="权限字符"
          min-width="20">
        </el-table-column>
        <el-table-column label="用户状态" min-width="15">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.roleState"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="roleStateClick(scope.row.id,scope.row.roleState)">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column
          prop="date"
          label="创建时间"
          min-width="20">
        </el-table-column>
        <el-table-column label="操作"  min-width="40">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row.id,scope.row)">删除</el-button>
              <el-button
              size="mini"
              type="danger">更多操作</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="role-fromCard-tip">显示第 1 到第 2 条记录，总共 2 条记录</div>

      <el-pagination
          background
          layout="prev, pager, next"
          :total="1000"
          class="role-fromCard-pagination">
        </el-pagination>
    </div>

    <el-dialog
      title="添加角色"
      :visible.sync="roleInsertDialogVisible"
      :show-close=false
      width="50%"
      @close="roleInsertDateClear">
      <div class="roleInserContent">
        <div class="roleInserContent-eval">
          <div>
            <span class="roleInserContent-eval-txt">角色名称：</span>
            <input type="text" placeholder="" v-model="roleInserName"
                    class="roleInserContent-eval-input">
          </div>
          <div class="roleInserContent-eval-warning"
              :class="{roleInserWarnActive: roleInsertSubmitClickState && !roleInserName}">
            <i class="el-icon-error"></i>角色名不能为空</div>
        </div>
        <div class="roleInserContent-eval">
          <div>
            <span class="roleInserContent-eval-txt">权限字符：</span>
            <input type="text" placeholder="" v-model="roleInserPurview"
                    class="roleInserContent-eval-input">
          </div>
          <div class="roleInserContent-eval-warning"
              :class="{roleInserWarnActive: roleInsertSubmitClickState && !roleInserPurview}">
            <i class="el-icon-error"></i>权限字符不能为空</div>
        </div>
        <div class="roleInserContent-eval" style="margin-top: 10px;">
          <span class="roleInserContent-eval-txt">状态：</span>
          <el-switch
            v-model="roleInserSwitchValue"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="roleInsertCancelClick">取 消</el-button>
        <el-button type="primary" @click="roleInsertSubmitClick">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="修改用户"
      :visible.sync="roleUpdateDialogVisible"
      :show-close=false
      width="50%">
      <div class="roleInserContent">
        <div class="roleInserContent-eval">
          <div>
            <span class="roleInserContent-eval-txt">角色名称：</span>
            <input type="text" :placeholder="multipleSelection.roleName"
                    v-model="multipleSelection.roleName"
                    class="roleInserContent-eval-input">
          </div>
        </div>
        <div class="roleInserContent-eval">
          <div>
            <span class="roleInserContent-eval-txt">权限字符：</span>
            <input type="text" :placeholder="multipleSelection.purview"
                    v-model="multipleSelection.purview"
                    class="roleInserContent-eval-input">
          </div>
        </div>
        <div class="roleInserContent-eval" style="margin-top: 10px;">
          <span class="roleInserContent-eval-txt">用户状态：</span>
          <el-switch
            v-model="multipleSelection.roleState"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="roleUpdateDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="roleUpdataSubmitClick">确 定</el-button>
      </span>
    </el-dialog>


  </div>
</template>

<script>
import SearchBar from '@/components/SearchBar.vue'
import store from "@/store/index.js";
export default {
  name: 'Role',
  components: { SearchBar },
  data() {
    return {
      roleSearchBarData: {
        theme: "user",
        list: [
          {
            'txt': '角色名称',
            'type': 'input',
            'dataModel': 'name' 
          },
          {
            'txt': '权限字符',
            'type': 'input',
            'dataModel': 'purview' 
          },
          {
            'txt': '角色状态',
            'type': 'select',
            'dataModel': 'userState', 
            'options': [
              {
                  value: '选项1',
                  label: '所有'
              }, 
              {
                  value: '选项2',
                  label: '正常'
              }, 
              {
                  value: '选项3',
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


      roleInsertDialogVisible: false,
      roleInserSwitchValue: true,
      roleInsertSubmitClickState: false,
      roleInserName: "",
      roleInserPurview: "",
      roleUpdateDialogVisible: false,
      tableData: [
        {
          id: 1,
          roleName: '管理员',
          purview: 'admin',
          roleState: true,
          date: '2016-05-04',
        }, 
        {
          id: 2,
          roleName: '普通用户',
          purview: 'common',
          roleState: true,
          date: '2016-05-04',
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
      console.log('row111:',row);
      this.multipleSelection = {...row}
      this.roleUpdateDialogVisible = true
    },
    //修改用户信息弹出框的提交按钮
    roleUpdataSubmitClick() {
      alert(this.multipleSelection.roleName + ";" + this.multipleSelection.purview + ';' + this.multipleSelection.roleState)
      this.roleUpdateDialogVisible = false
    },
    //表格删除
    handleDelete(index, row) {
      console.log(index, row);
      this.$message({
        message: '删除id为' + index + '的角色：' + row.roleName,
        type: 'warning'
      });
    },
    //新增用户
    roleInsert() {
      this.roleInsertDialogVisible = true
    },
    //新增用户弹出框的取消按钮
    roleInsertCancelClick() {
      this.roleInsertDialogVisible = false
    },
    //新增用户弹出框的提交按钮
    roleInsertSubmitClick() {
      this.roleInsertSubmitClickState = true
      if(!this.roleInserName  || !this.roleInserPurview) {
        this.$message({
          message: '请完善角色信息',
          type: 'warning'
        });
      } else {
        this.roleInsertDialogVisible = false
        alert('角色添加成功'+'角色名：'+this.roleInserName+'权限字符：'+this.roleInserPurview+'状态：'+this.roleInserSwitchValue)
      }
    },
    //表格的多选框点击
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    roleUpdateCancelClick() {
      this.roleUpdateDialogVisible = false
    },
    roleUpdateSubmitClick() {
      this.roleUpdateDialogVisible = false
    },
    roleDelete() {
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
    roleExport() {
      console.log('导出用户')
    },
    roleInsertDateClear() {
      this.roleInserName = ""
      this.roleInserPurview = ""
      this.roleInsertSubmitClickState = false
    },
    roleStateClick(id,val) {
      console.log('id:',id)
      console.log('val:',val)
    }
  }
}
</script>

<style lang="scss" scoped>
.role-fromCard {
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
.roleInserContent {
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
.roleInserWarnActive {
  display: block;
}
</style>