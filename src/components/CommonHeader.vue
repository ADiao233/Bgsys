<template>
  <header>
    <div class="l-content">
      <el-button
        plain
        icon="el-icon-menu"
        size="mini"
        @click="handleMenu"
      ></el-button>
      <el-breadcrumb separator-class="el-icon-caret-right">
        <!-- 面包屑导航 -->
        <el-breadcrumb-item
          v-for="item in tags"
          :key="item.path"
          :to="{ path: item.path }"
          >{{ item.label }}</el-breadcrumb-item
        >
      </el-breadcrumb>
    </div>
    <div class="r-content">
      <el-dropdown trigger="click" size="mini">
        <span><img :src="userImg" class="user" /></span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item icon="el-icon-plus">个人中心</el-dropdown-item>
          <el-dropdown-item icon="el-icon-circle-plus" @click.native="logOut"
            >退出</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "CommonHeader",
  data() {
    return {
      userImg: require("../assets/images/user.png"),
    };
  },
  computed: {
    ...mapState("tab", { tags: "tabList" }),
  },
  methods: {
    //vuex
    handleMenu() {
      this.$store.commit("tab/collapseMenu");
    },
    //退出模块
    logOut() {
      this.$store.commit("user/clearToken");
      this.$store.commit("tab/clearMenu");
      this.$store.commit("tab/clearTabList");
      this.$router.push({ name: "login" });
    },
  },
};
</script>

<style lang="less" scoped>
header {
  display: flex;
  height: 100%;
  justify-content: space-between;
  align-items: center;
}
.l-content {
  display: flex;
  align-items: center;
  .el-button {
    margin-right: 20px;
  }
}
.r-content {
  .user {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
}
</style>
