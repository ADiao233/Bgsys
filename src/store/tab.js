import Cookie from "js-cookie";
export default {
  namespaced: true,
  actions: {},
  mutations: {
    //控制左侧菜单是否收缩
    collapseMenu(state) {
      state.isCollapse = !state.isCollapse;
    },
    //选择左侧添加面包屑
    selectMenu(state, val) {
      if (val.name !== "home") {
        state.currentMenu = val;
        const result = state.tabList.findIndex(
          (item) => item.name === val.name
        );
        if (result === -1) {
          state.tabList.push(val);
        }
      } else {
        state.currentMenu = null;
      }
    },
    //首页标签删除
    closeTag(state, val) {
      const result = state.tabList.findIndex((item) => item.name === val.name);
      state.tabList.splice(result, 1);
    },
    //清除TabList
    clearTabList(state) {
      state.tabList ==
        [
          {
            path: "/home",
            name: "home",
            label: "首页",
            icon: "home",
          },
        ];
    },
    //清除vuex中menu和Cookie中menu
    clearMenu(state) {
      state.menu == [];
      Cookie.remove("menu");
    },
    //设置vuex中menu，保存Cookie中menu val是mock中menu
    setMenu(state, val) {
      state.menu = val;
      Cookie.set("menu", JSON.stringify(val));
    },
    //router为路由实例对象 根据权限菜单动态路由
    addMenu(state, router) {
      if (!Cookie.get("menu")) {
        return;
      }
      const menu = JSON.parse(Cookie.get("menu"));
      state.menu = menu;
      const menuArray = [];
      menu.forEach((item) => {
        if (item.children) {
          item.children = item.children.map((item) => {
            item.component = () => import(`../views/${item.url}`);
            return item;
          });
          menuArray.push(...item.children);
        } else {
          item.component = () => import(`../views/${item.url}`);
          menuArray.push(item);
        }
      });
      //路由动态添加
      menuArray.forEach((item) => {
        router.addRoute("main", item);
      });
    },
  },
  state: {
    //控制左侧导航栏的收缩
    isCollapse: false,
    //面包屑的导航
    tabList: [
      {
        path: "/home",
        name: "home",
        label: "首页",
        icon: "home",
      },
    ],
    //当前菜单导航
    currentMenu: null,
    //动态权限菜单初始化
    menu: [],
  },
};
