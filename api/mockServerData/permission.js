import Mock from "mockjs";
export default {
  getMenu: (config) => {
    console.log(config);
    const { username, password } = JSON.parse(config.body);
    console.log(JSON.parse(config.body));
    // 先判断用户是否存在
    // 判断账号和密码是否对应
    if (username === "admin" && password === "admin") {
      return {
        code: 20000,
        data: {
          menu: [
            {
              path: "/home",
              name: "home",
              label: "首页",
              icon: "s-home",
              url: "Home",
            },
            {
              path: "/mall",
              name: "mall",
              label: "商品管理",
              icon: "video-play",
              url: "Mall",
            },
            {
              path: "/user",
              name: "user",
              label: "用户管理",
              icon: "user",
              url: "User",
            },
            {
              label: "其他",
              icon: "location",
              children: [
                {
                  path: "/pageOne",
                  name: "pageOne",
                  label: "页面1",
                  icon: "setting",
                  url: "Other/PageOne.vue",
                },
                {
                  path: "/pageTwo",
                  name: "pageTwo",
                  label: "页面2",
                  icon: "setting",
                  url: "Other/PageTwo.vue",
                },
              ],
            },
          ],
          token: Mock.Random.guid(),
          message: "获取成功",
        },
      };
    } else if (username === "drj" && password === "drj") {
      return {
        code: 20000,
        data: {
          menu: [
            {
              path: "/home",
              name: "home",
              label: "首页",
              icon: "s-home",
              url: "Home",
            },
            {
              path: "/mall",
              name: "mall",
              label: "商品管理",
              icon: "video-play",
              url: "Mall",
            },
          ],
          token: Mock.Random.guid(),
          message: "获取成功",
        },
      };
    } else {
      return {
        code: -999,
        data: {
          message: "密码错误",
        },
      };
    }
  },
};
