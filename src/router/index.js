import VueRouter from "vue-router";
import Vue from "vue";
import Main from "../views/Main";
import Login from "../views/Login";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "main",
    component: Main,
    redirect: "/home",
    children: [],
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
];
export default new VueRouter({
  mode: "history",
  routes,
});
