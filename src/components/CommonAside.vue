<template>
  <el-menu
    default-active="1-4-1"
    class="el-menu-vertical-demo el-menu"
    :collapse="isCollapse"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <h3>{{ isCollapse ? "后台" : "后台管理系统" }}</h3>
    <el-menu-item
      v-for="item in noChildren"
      :key="item.path"
      :index="item.path"
      @click="clickMenu(item)"
    >
      <i :class="'el-icon-' + item.icon"></i>
      <span slot="title">{{ item.label }}</span>
    </el-menu-item>
    <el-submenu
      :index="item.path + ''"
      v-for="item in hasChildren"
      :key="item.path"
    >
      <template slot="title">
        <i :class="'el-icon-' + item.icon"></i>
        <span>{{ item.label }}</span>
      </template>
      <el-menu-item-group v-for="subItem in item.children" :key="subItem.path">
        <el-menu-item @click="clickMenu(subItem)">{{
          subItem.label
        }}</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  methods: {
    //菜单路由跳转
    clickMenu(item) {
      this.$router.push({
        name: item.name,
      });
      //添加面包屑导航
      this.$store.commit("tab/selectMenu", item);
    },
  },
  computed: {
    //过滤一级菜单
    noChildren() {
      return this.asyncMenu.filter((item) => {
        return !item.children;
      });
    },
    //过滤二级菜单
    hasChildren() {
      return this.asyncMenu.filter((item) => {
        return item.children;
      });
    },
    //控制侧边菜单展开收起
    isCollapse() {
      return this.$store.state.tab.isCollapse;
    },
    //动态添加权限菜单
    asyncMenu() {
      return this.$store.state.tab.menu;
    },
  },
};
</script>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu {
  height: 100vh;
  border: none;
}
h3 {
  color: #fff;
  text-align: center;
  line-height: 48px;
}
</style>
