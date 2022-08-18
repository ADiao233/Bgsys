<template>
  <div class="tabs">
    <el-tag
      class="el-tag"
      size="medium"
      v-for="(tag, index) in tags"
      :key="tag.name"
      :closable="tag.name !== 'home'"
      :effect="$route.name === tag.name ? 'dark' : 'plain'"
      @click="changMenu(tag)"
      @close="handleClose(tag, index)"
      >{{ tag.label }}</el-tag
    >
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "commontag",
  methods: {
    ...mapMutations("tab", { close: "closeTag" }),
    //标签路由跳转
    changMenu(tag) {
      this.$router.push({ path: tag.path });
    },
    //删除标签完成路由跳转
    handleClose(tag, index) {
      this.close(tag);
      if (tag.name !== this.$route.name) {
        return;
      }
      if (index == this.tags.length) {
        this.$router.push({ name: this.tags[index - 1].name });
      } else {
        this.$router.push({ name: this.tags[index].name });
      }
    },
  },
  computed: {
    //获取标签列表
    ...mapState("tab", { tags: "tabList" }),
  },
};
</script>

<style scoped lang="css">
.tabs {
  padding: 15px;
  margin-bottom: -15px;
}
.el-tag {
  margin-right: 15px;
  cursor: pointer;
}
</style>
