<template>
  <div class="manage">
    <!-- 对话弹窗，表单 -->
    <el-dialog
      :title="operateType === 'add' ? '新增用户' : '更新用户'"
      :visible.syne="isShow"
    >
      <!-- 表单标签 传递用户数据和表单配置-->
      <common-form
        :formLabel="opertateFormLabel"
        :form="opertateForm"
        :inline="true"
        ref="form"
      ></common-form>
      <!-- 表单标签的按钮（插槽） isShow:是否显示弹窗 comfirm：提交数据-->
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShow = false">取消</el-button>
        <el-button @click="comfirm" type="primary">确定</el-button>
      </div>
    </el-dialog>
    <!-- header标签 -->
    <div class="manage-header">
      <!-- header左侧增加用户按钮 addUser：新增用户-->
      <el-button type="primary" @click="addUser">+新增</el-button>
      <!-- header右侧搜索框（传递表单配置和搜索索引）和搜索按钮 getList：获取列表数据 -->
      <common-form :formLabel="formLabel" :form="searchFrom" :inline="true">
        <el-button type="primary" @click="getList(searchFrom.keyword)"
          >搜索</el-button
        >
      </common-form>
    </div>
    <!-- 表格标签 传递表格数据、表头标签数据、页码配置
    自定义事件：
    getList：当页码变换时更新页面
    editUser：编辑用户
    delUser：删除用户
    -->
    <common-table
      :tableData="tableData"
      :tableLabel="tableLabel"
      :config="config"
      @changePage="getList"
      @edit="editUser"
      @delect="delUser"
    ></common-table>
  </div>
</template>

<script>
import CommonForm from "../../components/CommonForm";
import CommonTable from "../../components/CommonTable";
import axios from "axios";
import { getUser } from "../../../api/data";
export default {
  name: "user",
  components: { CommonForm, CommonTable },
  data() {
    return {
      //判断表单类型【add或edit】
      operateType: "add",
      //控制表单的显示与隐藏
      isShow: false,
      //表单配置项
      opertateFormLabel: [
        {
          model: "name",
          label: "姓名",
          type: "input",
        },
        {
          model: "age",
          label: "年龄",
          type: "input",
        },
        {
          model: "sex",
          label: "性别",
          type: "select",
          opts: [
            {
              label: "男",
              value: '男',
            },
            {
              label: "女",
              value: '女',
            },
          ],
        },
        {
          model: "birth",
          label: "出生日期",
          type: "date",
        },
        {
          model: "addr",
          label: "地址",
          type: "input",
        },
      ],
      //表单初始化数据
      opertateForm: {
        name: "",
        addr: "",
        age: "",
        birth: "",
        sex: "",
      },
      //搜索框配置
      formLabel: [
        {
          model: "keyword",
          label: "",
          type: "input",
        },
      ],
      //搜索索引
      searchFrom: {
        keyword: "",
      },
      //表格数据
      tableData: [],
      //表头配置
      tableLabel: [
        {
          prop: "name",
          label: "姓名",
        },
        {
          prop: "age",
          label: "年龄",
        },
        {
          prop: "sexLabel",
          label: "性别",
        },
        {
          prop: "birth",
          label: "出生日期",
          width: 200,
        },
        {
          prop: "addr",
          label: "地址",
          width: 320,
        },
      ],
      //页码配置 page:当前页码数 total：数据总条数  loading：？
      config: {
        page: 1,
        total: 200,
        loading: "",
      },
    };
  },
  methods: {
    //表单提交数据,发送请求更新后台数据,表格数据更新
    comfirm() {
      if (this.operateType === "edit") {
        axios.post("/user/edit", this.opertateForm).then((res) => {
          console.log(res, "edit修改成功");
          this.isShow = false;
          this.getList();
        });
      } else {
        axios.post("/user/add", this.opertateForm).then((res) => {
          console.log(res, "add增加成功");
          this.isShow = false;
          this.getList();
        });
      }
    },
    //新增按钮：添加用户，初始化用户数据
    addUser() {
      this.isShow = true;
      this.operateType = "add";
      this.opertateForm = {
        name: "",
        addr: "",
        age: "",
        birth: "",
        sex: "",
      };
    },
    //获取表格数据
    getList(name = "") {
      //搜索
      this.config.loading = true;
      name ? (this.config.page = 1) : "";
      //发送接口请求
      getUser({ page: this.config.page, name }).then((res) => {
        this.tableData = res.list.map((item) => {
          item.sexLabel = item.sex === 0 ? "女" : "男";
          return item;
        });
        this.config.total = res.count;
        this.config.loading = false;
      });
    },
    //编辑用户数据
    editUser(row) {
      this.operateType = "edit";
      this.opertateForm = { ...row };
      this.isShow = true;
    },
    //删除用户数据
    delUser(row) {
      this.$confirm("此操作将永久删除该文件，是否继续？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        const id = row.id;
        axios
          .get("/user/del", {
        
            params: { id },
          })
          .then(() => {
            this.$message({
              type: "success",
              message: "删除成功",
            });
            this.getList();
          });
      });
    },
  },
  created() {
    //页面初始化获取表格数据
    this.getList();
  },
};
</script>

<style scoped lang="css">
.manage-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
