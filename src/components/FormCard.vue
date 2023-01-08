<template>
  <div id="formCard">
    <div class="formCard-actionBar">
        <div class="formCard-actionBar-left">
            <el-button type="primary" icon="el-icon-search"
                @click.native="searchClick">
                搜索
            </el-button>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'FormCard',
    data() {
        return {

        }
    }
}
</script>

<style lang="scss" scoped>
#formCard {
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 1px 1px 3px rgba(0,0,0,0.16);
}
.formCard-actionBar {
    border: 1px solid pink;
    display: flex;
    justify-content: space-between;
    &-left {
        display: flex;
    }
}
</style>