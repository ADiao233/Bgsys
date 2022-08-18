<template>
  <el-form
    :model="form"
    status-icon
    :rule="rules"
    ref="form"
    label-width="100px"
    class="login-container"
  >
    <h3 class="login_title">系统登陆</h3>
    <el-form-item label="用户名" prop="username" label-width="100px" class="name">
      <el-input
        v-model="form.username"
        type="input"
        autocomplete="off"
        placeholder="请输入用户名"
      ></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password" label-width="100px">
      <el-input
        type="password"
        v-model="form.password"
        autocomplete="off"
        placeholder="请输入密码"
      ></el-input>
    </el-form-item>
    <el-form-item class="login_submit">
      <el-button type="primary" @click="login()" class="login_submit"
        >登录</el-button
      >
    </el-form-item>
  </el-form>
</template>

<script>
import { getMenu } from "../../../api/data";
export default {
  data() {
    return {
      form: {
        password: "",
        username: "",
      },
      //登录规则
      rules: {
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
        ],
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, message: "用户名长度不小于3位", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    //登录按钮
    login() {
      //请求权限菜单
      getMenu(this.form).then((res) => {
        console.log(res);
        if (res.code === 20000) {
          this.$store.commit("tab/clearMenu");
          this.$store.commit("tab/setMenu", res.data.menu);
          this.$store.commit("user/setToken", res.data.token);
          this.$store.commit("tab/addMenu", this.$router);
          this.$router.push({ name: "home" });
        } else {
          this.$message.warning(res.data.message);
        }
      });
    },
  },
};
</script>

<style scoped lang="css">
.login-container {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 180px auto ; 
  width: 350px;
  padding: 35px 35px 15px 35px;
  background-color: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
.login_title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}
.login_submit {
  margin: 10px auto 0px auto;
}
</style>
