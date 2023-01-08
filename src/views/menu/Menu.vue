<template>
  <div id="menu">
    <search-bar :searchBarData = menuSearchBarData></search-bar>

    <div class="menu-fromCard">
      <div class="menu-fromCard-actionBar">
          <div class="menu-fromCard-actionBar-left">
            <el-button type="success" icon="el-icon-s-operation"
                class="menu-fromCard-actionBar-left-button"
                @click.native="menufromCardExpandClick">
                {{menufromCardExpand ? '折叠' : '展开'}}
            </el-button>
        </div>

        <div class="menu-fromCard-actionBar-right">
          <el-button type="primary" icon="el-icon-search" @click.native="searchClick"
            class="menu-fromCard-actionBar-right-button"></el-button>
          <el-button type="primary" icon="el-icon-refresh"
            class="menu-fromCard-actionBar-right-button"></el-button>
          <el-button type="primary" icon="el-icon-document-copy"
            class="menu-fromCard-actionBar-right-button"></el-button>
        </div>
      </div>


      <div class="menu-fromCard-content">
        <el-table
          :data="tableData"
          ref="table"
          style="width: 100%;margin-bottom: 20px;"
          row-key="id"
          highlight-current-row
          @current-change="handleCurrentChange"
          :default-expand-all= menufromCardExpand
          :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
          <el-table-column
            prop="menuName"
            label="菜单名称"
            sortable
            min-width="40">
          </el-table-column>
          <el-table-column
            prop="id"
            label="排序"
            sortable
            min-width="20">
            <template slot-scope="scope">
              <span>
                {{(scope.row.id%10)}}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            prop="menuType"
            label="类型"
            min-width="20">
            <template slot-scope="scope">
              <span class="menu-label" v-if="scope.row.menuType === 'M'"
                style="background-color: #1C84C6;">
                目录
              </span>
              <span class="menu-label" v-else-if="scope.row.menuType === 'C'"
                style="background-color: #1AB394;">
                菜单
              </span>
              <span class="menu-label" v-else
                style="background-color: #F8AC59;">
                按钮
              </span>
            </template>
          </el-table-column>
          <el-table-column
            prop="visible"
            label="可见"
            min-width="20">
            <template slot-scope="scope">
              <span class="menu-labelTwo" v-if="scope.row.visible === '1'"
                style="background-color: #1AB394;">
                显示
              </span>
              <span class="menu-labelTwo" v-else
                style="background-color: red;">
                隐藏
              </span>
            </template>
          </el-table-column>
          <el-table-column label="操作"  min-width="40">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.row)">编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.row)">删除</el-button>
                <el-button
                size="mini"
                type="danger">更多操作</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import SearchBar from '@/components/SearchBar.vue'
import store from "@/store/index.js";
export default {
    name: 'Menu',
    components: { SearchBar, 
     },
    data() {
        return {
          menuSearchBarData: {
            theme: "menu",
            list: [
              {
                'txt': '菜单名称',
                'type': 'input',
                'dataModel': 'name' 
              },
              {
                'txt': '菜单状态',
                'type': 'select',
                'dataModel': 'userState', 
                'options': [
                  {
                      value: '选项1',
                      label: '所有'
                  }, 
                  {
                      value: '选项2',
                      label: '显示'
                  }, 
                  {
                      value: '选项3',
                      label: '隐藏'
                  }, 
                ]
              },
            ]
          },

          menufromCardExpand: true,
          // tableData: [],
          tableData: [
            {
              id: 1,
              date: '2016-05-02',
              menuName: '用户管理',
              menuType: 'M',
              visible: '1',
              children: [
                {
                  id: 11,
                  date: '2016-05-01',
                  menuName: '用户查询',
                  menuType: 'F',
                  visible: '1',
                }, 
                {
                  id: 12,
                  date: '2016-05-01',
                  menuName: '用户新增',
                  menuType: 'F',
                  visible: '1',
                },
                {
                  id: 13,
                  date: '2016-05-01',
                  menuName: '用户修改',
                  menuType: 'F',
                  visible: '1',
                }, 
                {
                  id: 14,
                  date: '2016-05-01',
                  menuName: '用户导出',
                  menuType: 'F',
                  visible: '1',
                },
                {
                  id: 15,
                  date: '2016-05-01',
                  menuName: '用户导入',
                  menuType: 'F',
                  visible: '1',
                }, 
                {
                  id: 16,
                  date: '2016-05-01',
                  menuName: '重置密码',
                  menuType: 'F',
                  visible: '1',
                }
              ]
            }, 
            {
              id: 2,
              date: '2016-05-04',
              menuName: '菜单管理',
              menuType: 'M',
              visible: '1',
            }, 
            {
              id: 3,
              date: '2016-05-01',
              menuName: '其他',
              menuType: 'M',
              visible: '1',
              children: [
                {
                  id: 31,
                  date: '2016-05-01',
                  menuName: '其他一',
                  menuType: 'C',
                  visible: '1',
                }, {
                  id: 32,
                  date: '2016-05-01',
                  menuName: '其他二',
                  menuType: 'C',
                  visible: '1',
                }
              ]
            },
          ],
        }
    },
    methods: {
      searchClick() {
        store.commit('GETUSERSEARCHSHOW')
      },
      handleEdit(row) {
        console.log('row111:',row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      },
      menufromCardExpandClick() {
        if(this.menufromCardExpand) {
          this.packUp()
        }else {
          this.expand()
        }
        this.menufromCardExpand = !this.menufromCardExpand
      },
      forTableData(arr,isExpand){
        arr.forEach(i =>{
            this.$refs.table.toggleRowExpansion(i,isExpand);
            if(i.children){
                this.forTableData(i.children,isExpand)
            }
        })
      },
      //展开
      expand() {
          this.forTableData(this.tableData,true)
      },
      // 收起
      packUp() {
          this.forTableData(this.tableData,false)
      },
      handleCurrentChange(val) {
        this.currentRow = val;
        console.log('val:',val)
      }
    }
}
</script>

<style lang="scss" scoped>
.menu-fromCard {
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 1px 1px 3px rgba(0,0,0,0.16);
  padding-bottom: 10px;
  height: 70vh;
  overflow: auto;
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
}
.menu-label {
  display: inline-block;
  width: 50px;
  text-align: center;
  border-radius: 5px;
  color: #fff;
  font-weight: bolder;
}

.menu-labelTwo {
  display: inline-block;
  width: 50px;
  text-align: center;
  border-radius: 20px;
  color: #fff;
  font-weight: bolder;
}
</style>