import Cookie from "js-cookie";
export default {
  namespaced: true,
  actions: {},
  mutations: {
    //设置Token，保存Token到Cookie val为mock中token
    setToken(state, val) {
      state.token = val;
      Cookie.set("token", val);
    },
    //清除vuex的Token，清除Cookie的Token
    clearToken(state) {
      state.token = "";
      Cookie.remove("token");
    },
    //获取token
    getToken(state) {
      state.token = state.token || Cookie.get("token");
    },
  },
  state: {
    token: "",
  },
};
