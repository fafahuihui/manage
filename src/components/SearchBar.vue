<template>
  <div id="searchBar">
    <div class="searchBar-content" v-show="userSearchShow"
        :class="{'searchBarGo': userSearchShow,'searchBarWray': !userSearchShow}">
        <div class="searchBar-content-eval" 
            v-for="(item, index) in searchBarData.list" 
            :key="index">
            <!-- <div>{{item}}</div> -->
            <span class="searchBar-content-eval-txt" v-show="item.type == 'input'">
                {{item.txt}}:
            </span>
            <input type="text" placeholder=""  v-show="item.type == 'input'"
                class="searchBar-content-eval-input">

            <span class="searchBar-content-eval-txt" v-show="item.type == 'select'">
                {{item.txt}}:
            </span>
            <el-select v-model="selectValue" placeholder="请选择" v-show="item.type == 'select'">
                <el-option
                    v-for="it in item.options"
                    :key="it.value"
                    :label="it.label"
                    :value="it.value">
                </el-option>
            </el-select>

            <span class="searchBar-content-eval-txt" v-show="item.type == 'date'">
                {{item.txt}}:
            </span>
            <el-date-picker
                v-model="dateValue1"
                type="date"
                placeholder="选择日期"
                v-show="item.type == 'date'">
            </el-date-picker>
            <span v-show="item.type == 'date'"> - </span>
            <el-date-picker
                v-model="dateValue2"
                type="date"
                placeholder="选择日期"
                v-show="item.type == 'date'">
            </el-date-picker>
        </div>
        <!-- <div class="searchBar-content-eval">
            <span class="searchBar-content-eval-txt">
                登录名称:
            </span>
            <input type="text" placeholder=""
                class="searchBar-content-eval-input">
        </div>
        <div class="searchBar-content-eval">
            <span class="searchBar-content-eval-txt">
                手机号码:
            </span>
            <input type="text" placeholder=""
                class="searchBar-content-eval-input">
        </div>
        <div class="searchBar-content-eval">
            <span class="searchBar-content-eval-txt">
                用户状态:
            </span>
            <el-select v-model="value" placeholder="请选择">
                <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>
        </div>
        <div class="searchBar-content-eval">
            <span class="searchBar-content-eval-txt">
                创建时间:
            </span>
            <el-date-picker
                v-model="value1"
                type="date"
                placeholder="选择日期">
            </el-date-picker>
            -
            <el-date-picker
                v-model="value2"
                type="date"
                placeholder="选择日期">
            </el-date-picker>
        </div> -->
        <el-button type="primary" icon="el-icon-search" round
            @click.native="searchClick(searchBarData.theme, dataArray)">
            搜索
        </el-button>
        <el-button type="warning" icon="el-icon-refresh" round
            @click.native="refreshClick(searchBarData.theme, dataArray)">
            重置
        </el-button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'SearchBar',
    data() {
        return {
            searchBarShow: true,
            input: "",
            options: [
                {
                    value: '选项1',
                    label: '黄金糕'
                }, 
                {
                    value: '选项2',
                    label: '双皮奶'
                }, 
                {
                    value: '选项3',
                    label: '蚵仔煎'
                }, 
                {
                    value: '选项4',
                    label: '龙须面'
                }, 
                {
                    value: '选项5',
                    label: '北京烤鸭'
                }
            ],
            selectValue: '',
            dateValue1: '',
            dateValue2: '',
            name: '',
        }
    },
    computed: {
      ...mapState({
        userSearchShow: state => state.user.userSearchShow,
      }),
      dataArray() {
        return this.userSearchBarData.list.map( (x) => {
            return x.dataModel
        })
      }
    },
    methods: {
        searchClick(fromName, dataArray) {
            console.log('点击搜索:',fromName)
            console.log('dataArray:',dataArray)
            // console.log('this.dataArray[0]:',this.name)
            // console.log('this.dataArray[0]:',this.selectValue)
            // console.log('this.dataArray[0]:',this.dateValue1)
            // console.log('this.dataArray[0]:',this.dateValue2)
        },
        refreshClick(fromName, dataArray) {
            console.log('点击重置:',fromName)
            console.log('dataArray:',dataArray)
        },
    },
    props: {
        searchBarData: {
            type: Object,
            default: () => []
        },
    }
}
</script>

<style lang="scss" scoped>
@keyframes go {
    0% {
        // transform: translateY(-100%);
        height: 0%;
    }
    100% {
    //    transform: translateY(0);
        height: 100%;
    }
}
@keyframes wray {
    0% {
        transform: translateY(0%);
    }
    100% {
       transform: translateY(-100%);
    }
}
#searchBar {
    margin-bottom: 15px;
}
.searchBarGo {
    animation-name: go;
    animation-duration: 0.5s;
    /* 动画速度曲线 */
    animation-timing-function: linear;
    /* 动画开始时间 */
    animation-itertion-count: 1;
    -webkit-animation-iteration-count:1;
    animation-delay: 0s;
    animation-fill-mode: forwards;
}
.searchBarWray {
    animation-name: wray;
    animation-duration: 0.5s;
    /* 动画速度曲线 */
    animation-timing-function: linear;
    /* 动画开始时间 */
    animation-itertion-count: 1;
    -webkit-animation-iteration-count:1;
    animation-delay: 0s;
    animation-fill-mode: forwards;
}

.searchBar-content {
  padding: 15px 15px 0px 15px;
  display: flex;
  flex-wrap: wrap;
  box-shadow: 1px 1px 3px rgba(0,0,0,0.16);
  border-radius: 5px;
  background-color: #fff;
  &-eval {
    // height: 40px;
    margin: 0px 15px 15px 0px;
    &-txt {
        font-size: 14px;
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
/deep/.el-button {
    height: 40px;
}
.option {
    height: 40px;
    width:40px;
    border: 2px solid #CCCCCC;
    background-color: #fff;
}
.el-icon-search {
    width: 100%;
    text-align: center;
    line-height: 40px;
}
</style>