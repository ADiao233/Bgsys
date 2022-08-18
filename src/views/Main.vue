<template>
  <!--采用Container 布局-->
  <el-container style="height: 100%">
    <el-aside width="auto"><common-aside></common-aside></el-aside>
    <el-container>
      <el-header style="background-color: #ebeef5"
        ><common-header></common-header
      ></el-header>
      <common-tag></common-tag>
      <!-- 通过common-aside组件导航菜单进行路由切换 -->
      <el-main><router-view></router-view></el-main>
    </el-container>
  </el-container>
</template>

<script>
import CommonAside from "../components/CommonAside.vue";
import CommonHeader from "../components/CommonHeader.vue";
import CommonTag from "../components/CommonTag.vue";
export default {
  name: "Main",
  data() {
    return {};
  },
  components: {
    CommonHeader,
    CommonAside,
    CommonTag,
  },
};
</script>

<style lang="less" scoped>
.el-header {
  background-color: #333;
}
.el-main {
  padding-top: 0;
}
</style>
