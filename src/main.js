import Vue from "vue";
import App from "./App.vue";
import Element from "element-ui";
// import {Button} from "element-ui";//ui按需引入
import "element-ui/lib/theme-chalk/index.css";

import router from "./router";
import "./assets/less/index.less";
import store from "./store";
// import axios from 'axios';
import "../api/mock";

Vue.config.productionTip = false;
Vue.use(Element);
// Vue.prototype.$axios = axios;

//token为空且不是登录页就跳转登录页
router.beforeEach((to, from, next) => {
  store.commit("user/getToken");
  const token = store.state.user.token;
  if (!token && to.name !== "login") {
    next({ name: "login" });
  } else if (token && to.name == "login") {
    next({ name: "home" });
  } else {
    next();
  }
});

new Vue({
  router,
  store,
  render: (h) => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this;
  },
  created() {
    //刷新页面重新渲染数据
    store.commit("tab/addMenu", router);
  },
}).$mount("#app");
