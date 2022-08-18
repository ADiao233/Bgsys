<template>
  <div class="common-table">
    <!-- 表格 -->
    <el-table :data="tableData" height="80%" stripe>
      <!-- 表格数据 -->
      <el-table-column
        v-for="item in tableLabel"
        :key="item.prop"
        :label="item.label"
        :width="item.width ? item.width : 125"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <!-- 通过scope拿到当前行对应数据-->
          <span style="margin-left: 10px">{{ scope.row[item.prop] }}</span>
        </template>
      </el-table-column>
      <!-- 操作按钮 通过scope拿到当前行数据-->
      <el-table-column label="操作" min-width="180">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelect(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!--页码标签  total：数据总条数 
    currernt-pag：当前页数
    @current-change：页码发生变化调用，返回页码数 
    page-size：	每页显示条目个数-->
    <el-pagination
      class="pager"
      layout="prev,pager,next"
      :total="config.total"
      :currernt-page.sync="config.page"
      @current-change="changePage"
      :page-size="20"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  naem: "CommonTable",
  props: {
    tableData: Array, //表格数据
    tableLabel: Array, //表头标签
    config: Object, //页码配置
  },
  methods: {
    //编辑数据，参数当前行
    handleEdit(row) {
      this.$emit("edit", row);
    },
    //删除数据，参数为当前行
    handleDelect(row) {
      this.$emit("delect", row);
    },
    //改变页码，参数为页码
    changePage(page) {
      this.config.page = page;
      this.$emit("changePage");
    },
  },
};
</script>
<style scoped lang="css">
.common-table {
  height: calc (100% - 62px);
  background-color: #ffff;
  position: relative;
  height: 650px;
}
.pager {
  position: absolute;
  right: 20px;
  bottom: 80px;
}
</style>
